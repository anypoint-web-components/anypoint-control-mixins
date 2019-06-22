/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   control-state-mixin.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

export {ControlStateMixin};

declare class ControlStateMixin extends base {
  focused: Boolean|null;
  disabled: any;
  constructor();
  _setChanged(prop: any, value: any): any;

  /**
   * Registers hover listeners
   */
  connectedCallback(): void;

  /**
   * Removes hover listeners
   */
  disconnectedCallback(): void;
  _focusBlurHandler(e: any): void;
  _disabledChanged(disabled: any): void;
  _changedControlState(): void;
}
