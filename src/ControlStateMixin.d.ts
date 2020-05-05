declare function ControlStateMixin<T extends new (...args: any[]) => {}>(base: T): T & ControlStateMixinConstructor;
interface ControlStateMixinConstructor {
  new(...args: any[]): ControlStateMixin;
}

interface ControlStateMixin {
  /**
   * If true the button is a toggle and is currently in the active state.
   */
  disabled: boolean;
  /**
   * If true the element currently has focus.
   */
  focused: boolean;

  _focusBlurHandler(e: FocusEvent): void;
  _disabledChanged(disabled: boolean): void;
  _changedControlState(): void;
  _notifyFocus(value: boolean): void;
  _notifyDisabled(value: boolean): void;
}
export {ControlStateMixinConstructor};
export {ControlStateMixin};
