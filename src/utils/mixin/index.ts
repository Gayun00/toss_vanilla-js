import { IComponent } from "../interfaces";

type MixinConstructor<T = {}> = new (...args: any[]) => T;
type MixinType = MixinConstructor<IComponent>;

export interface IMixin {
  render(): HTMLElement;
  add($child: HTMLElement): void;
  attachTo($parent: HTMLElement): void;
}

export function mixinElementMethods<T extends MixinType>(Class: T) {
  return class Mixin extends Class implements IMixin {
    render() {
      return this.$element;
    }

    add($child: HTMLElement) {
      if ($child) this.$element?.appendChild($child);
    }

    attachTo($parent: HTMLElement) {
      if (this.$element) $parent.appendChild(this.$element);
    }
  };
}
