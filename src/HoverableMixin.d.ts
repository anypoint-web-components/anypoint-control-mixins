declare function HoverableMixin<T extends new (...args: any[]) => {}>(base: T): T & HoverableMixinConstructor;
interface HoverableMixinConstructor {
  new(...args: any[]): HoverableMixin;
}

interface HoverableMixin {
  /**
   * True when the element is currently hovered by a pointing device.
   */
  readonly hovered: boolean;
  _hovered: boolean;

  _hoverCallback(): void;
  _leaveCallback(): void;
  _notifyHovered(value: boolean): void;
}
export {HoverableMixinConstructor};
export {HoverableMixin};
