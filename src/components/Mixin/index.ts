import { Component2 } from "../Component2";
import { PageComponent2 } from "../PageComponent2";

type MixinConstructor<T = {}> = new (...args: any[]) => T;
type MixinType3 = MixinConstructor<{ $element: HTMLElement | null }>;

export interface IMixin {
  render(): void;
  add($child: HTMLElement | null): void;
  attachTo($parent: HTMLElement): void;
}

function mixinElement<T extends MixinType3>(Class: T) {
  return class Mixin extends Class implements IMixin {
    render() {
      return this.$element;
    }

    add($child: HTMLElement | null) {
      if ($child) this.$element?.appendChild($child);
    }

    attachTo($parent: HTMLElement) {
      if (this.$element) $parent.appendChild(this.$element);
    }
  };
}

export const MixinComponent = mixinElement(Component2);
export const MixinPageComponent = mixinElement(PageComponent2);
