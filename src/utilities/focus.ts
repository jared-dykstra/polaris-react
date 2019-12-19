import {FOCUSABLE_SELECTOR} from '@shopify/javascript-utilities/focus';
import {isElementInViewport} from './is-element-in-viewport';

type Filter = (element: Element) => void;

const KEYBOARD_FOCUSABLE_SELECTORS =
  'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]:not([tabindex="-1"])';

export function handleMouseUpByBlurring({
  currentTarget,
}: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  currentTarget.blur();
}

export function nextFocusableNode(
  node: HTMLElement,
  filter?: Filter,
): HTMLElement | Element | null {
  const allFocusableElements = [
    ...document.querySelectorAll(FOCUSABLE_SELECTOR),
  ];
  const sliceLocation = allFocusableElements.indexOf(node) + 1;
  const focusableElementsAfterNode = allFocusableElements.slice(sliceLocation);

  for (const focusableElement of focusableElementsAfterNode) {
    if (
      isElementInViewport(focusableElement) &&
      (!filter || (filter && filter(focusableElement)))
    ) {
      return focusableElement;
    }
  }

  return null;
}

export function focusNextFocusableNode(node: HTMLElement, filter?: Filter) {
  const nextFocusable = nextFocusableNode(node, filter);
  if (nextFocusable && nextFocusable instanceof HTMLElement) {
    nextFocusable.focus();
    return true;
  }

  return false;
}

// https://github.com/Shopify/javascript-utilities/blob/1e705564643d6fe7ffea5ebfbbf3e6b759a66c9b/src/focus.ts
export function findFirstKeyboardFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
): HTMLElement | null {
  if (!onlyDescendants && matches(element, KEYBOARD_FOCUSABLE_SELECTORS)) {
    return element;
  }
  return element.querySelector(KEYBOARD_FOCUSABLE_SELECTORS);
}

export function focusFirstKeyboardFocusableNode(
  element: HTMLElement,
  onlyDescendants = true,
) {
  const firstFocusable = findFirstKeyboardFocusableNode(
    element,
    onlyDescendants,
  );
  if (firstFocusable) {
    firstFocusable.focus();
  }
}

function matches(node: HTMLElement, selector: string) {
  if (node.matches) {
    return node.matches(selector);
  }

  const matches = (node.ownerDocument || document).querySelectorAll(selector);
  let i = matches.length;
  while (--i >= 0 && matches.item(i) !== node) {}
  return i > -1;
}
