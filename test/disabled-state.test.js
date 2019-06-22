import { fixture, expect } from '@open-wc/testing';
import './test-elements.js';

describe('Disabled state tests', function() {
  async function trivialDisabledState() {
    return (await fixture(`<test-control></test-control>`));
  }
  async function initiallyDisabledState() {
    return (await fixture(`<test-control disabled></test-control>`));
  }
  async function initiallyWithoutTabIndex() {
    return (await fixture(`<test-control></test-control>`));
  }
  async function initiallyWithTabIndex() {
    return (await fixture(`<test-control tabindex="0"></test-control>`));
  }

  describe('disabled-state', function() {
    let disableTarget;

    describe('a trivial disabled state', function() {
      beforeEach(async () => {
        disableTarget = await trivialDisabledState();
      });

      describe('when disabled is true', function() {
        it('receives a disabled attribute', function() {
          disableTarget.disabled = true;
          expect(disableTarget.hasAttribute('disabled')).to.be.eql(true);
        });

        it('receives an appropriate aria attribute', function() {
          disableTarget.disabled = true;
          expect(disableTarget.getAttribute('aria-disabled')).to.be.eql('true');
        });
      });

      describe('when disabled is false', function() {
        it('loses the disabled attribute', function() {
          disableTarget.disabled = true;
          expect(disableTarget.hasAttribute('disabled')).to.be.eql(true);
          disableTarget.disabled = false;
          expect(disableTarget.hasAttribute('disabled')).to.be.eql(false);
        });
      });
    });

    describe('a state with an initially disabled target', function() {
      beforeEach(async () => {
        disableTarget = await initiallyDisabledState();
      });

      it('preserves the disabled attribute on target', function() {
        expect(disableTarget.hasAttribute('disabled')).to.be.eql(true);
        expect(disableTarget.disabled).to.be.eql(true);
      });

      it('adds `aria-disabled` to the target', function() {
        expect(disableTarget.getAttribute('aria-disabled')).to.be.eql('true');
      });
    });

    describe('`tabindex` attribute handling', function() {
      describe('without `tabindex`', function() {
        beforeEach(async () => {
          disableTarget = await initiallyWithoutTabIndex();
        });

        it('adds `tabindex = -1` when disabled', function() {
          disableTarget.disabled = true;
          expect(disableTarget.getAttribute('tabindex')).to.be.eql('-1');
        });

        it('removed `tabindex` when re-enabled', function() {
          disableTarget.disabled = true;
          disableTarget.disabled = false;
          expect(disableTarget.getAttribute('tabindex')).to.be.eql(null);
        });
      });

      describe('with `tabindex`', function() {
        beforeEach(async () => {
          disableTarget = await initiallyWithTabIndex();
        });

        it('adds `tabindex = -1` when disabled', function() {
          disableTarget.disabled = true;
          expect(disableTarget.getAttribute('tabindex')).to.be.eql('-1');
        });

        it('restores `tabindex = 0` when re-enabled', function() {
          disableTarget.disabled = true;
          disableTarget.disabled = false;
          expect(disableTarget.getAttribute('tabindex')).to.be.eql('0');
        });
      });
    });
  });
});
