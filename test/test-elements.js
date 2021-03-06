/* eslint-disable max-classes-per-file */

import { LitElement, html } from 'lit-element';
import { ButtonStateMixin } from '../button-state-mixin.js';
import { ControlStateMixin } from '../control-state-mixin.js';

class TestControl extends ControlStateMixin(LitElement) {}
window.customElements.define('test-control', TestControl);

class TestButton extends ButtonStateMixin(ControlStateMixin(LitElement)) {
  _buttonStateChanged() {}
}
window.customElements.define('test-button', TestButton);

class NestedFocusable extends ControlStateMixin(LitElement) {
  render() {
    return html`<input id="input" />`;
  }
}
window.customElements.define('nested-focusable', NestedFocusable);

class TestLightDom extends ButtonStateMixin(ControlStateMixin(LitElement)) {
  render() {
    return html`<slot></slot>`;
  }
}
window.customElements.define('test-light-dom', TestLightDom);
