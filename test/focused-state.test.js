import { fixture, expect, nextFrame } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import './test-elements.js';
import '@polymer/iron-test-helpers/mock-interactions.js';

/* global MockInteractions  */

describe('Focused state tests', function() {
  async function trivialFocusedState() {
    return (await fixture(`<test-control tabindex="-1"></test-control>`));
  }

  async function nestedFocusedState() {
    return (await fixture(`<nested-focusable></nested-focusable>`));
  }

  async function lightDOMFixture() {
    return (await fixture(`<test-light-dom>
        <input id="input">
        <nested-focusable></nested-focusable>
      </test-light-dom>`));
  }

  describe('focused-state', function() {
    let focusTarget;
    beforeEach(async () => {
      focusTarget = await trivialFocusedState();
    });

    describe('when is focused', function() {
      it('receives a focused attribute', function() {
        expect(focusTarget.hasAttribute('focused')).to.be.eql(false);
        MockInteractions.focus(focusTarget);
        expect(focusTarget.hasAttribute('focused')).to.be.eql(true);
      });

      it('focused property is true', function() {
        expect(focusTarget.focused).to.not.be.eql(true);
        MockInteractions.focus(focusTarget);
        expect(focusTarget.focused).to.be.eql(true);
      });
    });

    describe('when is blurred', function() {
      it('loses the focused attribute', function() {
        MockInteractions.focus(focusTarget);
        expect(focusTarget.hasAttribute('focused')).to.be.eql(true);
        MockInteractions.blur(focusTarget);
        expect(focusTarget.hasAttribute('focused')).to.be.eql(false);
      });

      it('focused property is false', function() {
        MockInteractions.focus(focusTarget);
        expect(focusTarget.focused).to.be.eql(true);
        MockInteractions.blur(focusTarget);
        expect(focusTarget.focused).to.be.eql(false);
      });
    });

    describe('when the focused state is disabled', function() {
      it('will not be focusable', function() {
        const blurSpy = sinon.spy(focusTarget, 'blur');
        MockInteractions.focus(focusTarget);
        focusTarget.disabled = true;
        expect(focusTarget.getAttribute('tabindex')).to.be.eql('-1');
        expect(blurSpy.called).to.be.eql(true);
      });
    });
  });

  describe('nested focusable', function() {
    let focusable;
    beforeEach(async () => {
      focusable = await nestedFocusedState();
      await nextFrame();
      await nextFrame();
      await nextFrame();
    });

    it('focus/blur events fired on host element', function() {
      let nFocusEvents = 0;
      let nBlurEvents = 0;
      const input = focusable.shadowRoot.querySelector('#input');
      focusable.addEventListener('focus', function() {
        nFocusEvents += 1;
        expect(focusable.focused).to.be.equal(true);
        MockInteractions.blur(input);
      });

      focusable.addEventListener('blur', function() {
        expect(focusable.focused).to.be.equal(false);
        nBlurEvents += 1;
      });
      MockInteractions.focus(input);
      expect(nBlurEvents).to.be.greaterThan(0);
      expect(nFocusEvents).to.be.greaterThan(0);
    });
  });

  describe('elements in the light dom', function() {
    let lightDOM;
    let input;
    let lightDescendantShadowInput;

    beforeEach(async () => {
      lightDOM = await lightDOMFixture();
      input = lightDOM.querySelector('#input');
      lightDescendantShadowInput = lightDOM.querySelector('nested-focusable')
        .shadowRoot.querySelector('#input');
    });

    it('should not fire the focus event', function() {
      let nFocusEvents = 0;
      lightDOM.addEventListener('focus', function() {
        nFocusEvents += 1;
      });
      MockInteractions.focus(input);
      expect(nFocusEvents).to.be.equal(0);
    });
    it('should not fire the focus event from shadow descendants', function() {
      let nFocusEvents = 0;
      lightDOM.addEventListener('focus', function() {
        nFocusEvents += 1;
      });
      MockInteractions.focus(lightDescendantShadowInput);
      expect(nFocusEvents).to.be.equal(0);
    });
  });
});
