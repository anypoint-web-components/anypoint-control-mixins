import { fixture, expect, aTimeout } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import './test-elements.js';
import '@polymer/iron-test-helpers/mock-interactions.js';
import '@polymer/paper-input/paper-input.js';

/* global MockInteractions  */

describe('Active state tests', function() {
  async function trivialActiveState() {
    return (await fixture(`<test-button></test-button>`));
  }

  async function toggleActiveState() {
    return (await fixture(`<test-button toggles></test-button>`));
  }

  async function buttonWithNativeInput() {
    return (await fixture(`<test-light-dom><input id="input"></test-light-dom>`));
  }

  async function buttonWithPaperInput() {
    return (await fixture(`<test-light-dom><paper-input id="input"></paper-input></test-light-dom>`));
  }

  describe('active-state', function() {
    let activeTarget;
    beforeEach(async () => {
      activeTarget = await trivialActiveState();
    });

    describe('active state with toggles attribute', function() {
      beforeEach(async () => {
        activeTarget = await toggleActiveState();
      });

      describe('when down', function() {
        it('is pressed', function() {
          MockInteractions.down(activeTarget);
          expect(activeTarget.hasAttribute('pressed')).to.be.eql(true);
        });
      });

      describe('when clicked', function() {
        it('is activated', function(done) {
          MockInteractions.downAndUp(activeTarget, function() {
            try {
              expect(activeTarget.hasAttribute('active')).to.be.eql(true);
              expect(activeTarget.hasAttribute('aria-pressed')).to.be.eql(true);
              expect(activeTarget.getAttribute('aria-pressed')).to.be.eql('true');
              done();
            } catch (e) {
              done(e);
            }
          });
        });

        it('is deactivated by a subsequent click', function(done) {
          MockInteractions.downAndUp(activeTarget, function() {
            MockInteractions.downAndUp(activeTarget, function() {
              try {
                expect(activeTarget.hasAttribute('active')).to.be.eql(false);
                expect(activeTarget.hasAttribute('aria-pressed')).to.be.eql(true);
                expect(activeTarget.getAttribute('aria-pressed'))
                    .to.be.eql('false');
                done();
              } catch (e) {
                done(e);
              }
            });
          });
        });

        it('the correct aria attribute is set', function(done) {
          activeTarget.ariaActiveAttribute = 'aria-checked';
          MockInteractions.downAndUp(activeTarget, function() {
            try {
              expect(activeTarget.hasAttribute('active')).to.be.eql(true);
              expect(activeTarget.hasAttribute('aria-checked')).to.be.eql(true);
              expect(activeTarget.getAttribute('aria-checked')).to.be.eql('true');
              done();
            } catch (e) {
              done(e);
            }
          });
        });

        it('the aria attribute is updated correctly', function(done) {
          activeTarget.ariaActiveAttribute = 'aria-checked';
          MockInteractions.downAndUp(activeTarget, function() {
            try {
              expect(activeTarget.hasAttribute('active')).to.be.eql(true);
              expect(activeTarget.hasAttribute('aria-checked')).to.be.eql(true);
              expect(activeTarget.getAttribute('aria-checked')).to.be.eql('true');
              activeTarget.ariaActiveAttribute = 'aria-pressed';
              expect(activeTarget.hasAttribute('aria-checked')).to.be.eql(false);
              expect(activeTarget.hasAttribute('aria-pressed')).to.be.eql(true);
              expect(activeTarget.getAttribute('aria-pressed')).to.be.eql('true');
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });

      describe('on blur', function() {
        it('the pressed property becomes false', function() {
          MockInteractions.focus(activeTarget);
          MockInteractions.down(activeTarget);
          expect(activeTarget.hasAttribute('pressed')).to.be.eql(true);
          MockInteractions.blur(activeTarget);
          expect(activeTarget.hasAttribute('pressed')).to.be.eql(false);
        });
      });
    });

    describe('without toggles attribute', function() {
      describe('when mouse is down', function() {
        it('does not get an active attribute', function() {
          expect(activeTarget.hasAttribute('active')).to.be.eql(false);
          MockInteractions.down(activeTarget);
          expect(activeTarget.hasAttribute('active')).to.be.eql(false);
        });
      });
      describe('when mouse is up', function() {
        it('does not get an active attribute', function() {
          MockInteractions.down(activeTarget);
          expect(activeTarget.hasAttribute('active')).to.be.eql(false);
          MockInteractions.up(activeTarget);
          expect(activeTarget.hasAttribute('active')).to.be.eql(false);
        });
      });
    });

    describe('when space is pressed', function() {
      it('triggers a click event', function(done) {
        activeTarget.addEventListener('click', function() {
          done();
        });
        MockInteractions.pressSpace(activeTarget);
      });

      it('only triggers click after the key is released', function(done) {
        let keyupTriggered = false;
        activeTarget.addEventListener('keyup', function() {
          keyupTriggered = true;
        });
        activeTarget.addEventListener('click', function() {
          try {
            expect(keyupTriggered).to.be.eql(true);
            done();
          } catch (e) {
            done(e);
          }
        });
        MockInteractions.pressSpace(activeTarget);
      });
    });

    describe('when enter is pressed', function() {
      it('triggers a click event', function(done) {
        activeTarget.addEventListener('click', function() {
          done();
        });
        MockInteractions.pressEnter(activeTarget);
      });

      it('only triggers click before the key is released', function(done) {
        let keyupTriggered = false;
        activeTarget.addEventListener('keyup', function() {
          keyupTriggered = true;
        });
        activeTarget.addEventListener('click', function() {
          try {
            expect(keyupTriggered).to.be.eql(false);
            done();
          } catch (e) {
            done(e);
          }
        });
        MockInteractions.pressEnter(activeTarget);
      });
    });

    describe('nested native input inside button', function() {
      it('space in light child input does not trigger a button click event', async () => {
        const item = await buttonWithNativeInput();
        const input = item.querySelector('#input');
        const itemClickHandler = sinon.spy();
        item.addEventListener('click', itemClickHandler);
        input.focus();
        MockInteractions.pressSpace(input);
        await aTimeout(20);
        expect(itemClickHandler.callCount).to.be.equal(0);
      });

      it('space in button triggers a button click event', async () => {
        const item = await buttonWithNativeInput();
        const itemClickHandler = sinon.spy();
        item.addEventListener('click', itemClickHandler);
        MockInteractions.pressSpace(item);
        await aTimeout(40);
        expect(itemClickHandler.callCount).to.be.equal(1);
      });
    });
    describe('nested paper-input inside button', function() {
      it('space in light child input does not trigger a button click event', async () => {
        const item = await buttonWithPaperInput();
        const input = item.querySelector('#input');
        const itemClickHandler = sinon.spy();
        item.addEventListener('click', itemClickHandler);
        input.focus();
        MockInteractions.pressSpace(input);
        await aTimeout(20);
        expect(itemClickHandler.callCount).to.be.equal(0);
      });

      it('space in button triggers a button click event', async () => {
        const item = await buttonWithPaperInput();
        const itemClickHandler = sinon.spy();
        item.addEventListener('click', itemClickHandler);
        MockInteractions.pressSpace(item);
        await aTimeout(40);
        expect(itemClickHandler.callCount).to.be.equal(1);
      });
    });
  });
});
