import { LitElement, html, css } from 'lit-element';
import { ButtonStateMixin } from '../button-state-mixin.js';
import { ControlStateMixin } from '../control-state-mixin.js';

class SimpleButton extends ControlStateMixin(ButtonStateMixin(LitElement)) {
  get styles() {
    return css`
    :host {
      display: inline-block;
      background-color: #4285F4;
      color: #fff;
      min-height: 8px;
      min-width: 8px;
      padding: 16px;
      text-transform: uppercase;
      border-radius: 3px;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
    }

    :host([disabled]) {
      opacity: 0.3;
      pointer-events: none;
    }

    :host([active]),
    :host([pressed]) {
      background-color: #3367D6;
      box-shadow: inset 0 3px 5px rgba(0,0,0,.2);
    }

    :host([focused]) {
      box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                  0  6px 30px 5px rgba(0, 0, 0, 0.12),
                  0  8px 10px -5px rgba(0, 0, 0, 0.4);
    }`;
  }

  render() {
    return html`<style>${this.styles}</style><slot></slot>`;
  }
}
window.customElements.define('simple-button', SimpleButton);
