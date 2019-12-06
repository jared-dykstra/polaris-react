import React, {useState, useRef, useEffect} from 'react';
import {
  focusFirstFocusableNode,
  findFirstFocusableNode,
  focusLastFocusableNode,
  findLastFocusableNode,
} from '@shopify/javascript-utilities/focus';

import {Key} from '../../types';
import {useComponentDidMount} from '../../utilities/use-component-did-mount';
import {EventListener} from '../EventListener';
import {Focus} from '../Focus';

export interface TrapFocusProps {
  trapping?: boolean;
  children?: React.ReactNode;
}

export function TrapFocus({trapping = true, children}: TrapFocusProps) {
  const [shouldFocusSelf, setFocusSelf] = useState<boolean | undefined>(
    undefined,
  );

  const focusTrapWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', handleKeyDownLastElement);
      document.removeEventListener('keydown', handleKeyDownFirstElement);
    };
  });

  const handleTrappingChange = () => {
    if (
      focusTrapWrapper.current &&
      focusTrapWrapper.current.contains(document.activeElement)
    ) {
      return false;
    }
    return trapping;
  };

  useComponentDidMount(() => setFocusSelf(handleTrappingChange()));

  const shouldDisable = () => {
    if (shouldFocusSelf === undefined) {
      return true;
    }

    return shouldFocusSelf ? !trapping : !shouldFocusSelf;
  };

  const handleKeyDownLastElement = (event: any) => {
    if (
      event.keyCode === Key.Tab &&
      !event.shiftKey &&
      focusTrapWrapper.current != null
    ) {
      event.preventDefault();
      focusFirstFocusableNode(focusTrapWrapper.current);
    }
    document.removeEventListener('keydown', handleKeyDownLastElement);
  };

  const handleKeyDownFirstElement = (event: any) => {
    console.log(event.keyCode === Key.Tab);
    console.log(event);
    console.log(event.shiftKey);
    console.log(focusTrapWrapper.current != null);
    if (
      event.keyCode === Key.Tab &&
      event.shiftKey &&
      focusTrapWrapper.current != null
    ) {
      event.preventDefault();
      focusLastFocusableNode(focusTrapWrapper.current);
    }
    document.removeEventListener('keydown', handleKeyDownFirstElement);
  };

  const handleBlur = (event: FocusEvent) => {
    if (trapping === false || !focusTrapWrapper.current) {
      return;
    }

    const {relatedTarget} = event;

    if (
      relatedTarget &&
      !focusTrapWrapper.current.contains(event.target as Node)
    ) {
      focusFirstFocusableNode(focusTrapWrapper.current);
    }

    if (relatedTarget === findLastFocusableNode(focusTrapWrapper.current)) {
      document.addEventListener('keydown', handleKeyDownLastElement);
    }

    if (relatedTarget === findFirstFocusableNode(focusTrapWrapper.current)) {
      document.addEventListener('keydown', handleKeyDownFirstElement);
    }
  };

  const handleFocusIn = (event: FocusEvent) => {
    if (trapping === false || !focusTrapWrapper.current) {
      return;
    }

    const {relatedTarget} = event;

    if (relatedTarget == null) {
      focusFirstFocusableNode(focusTrapWrapper.current);
    }
  };

  return (
    <Focus disabled={shouldDisable()} root={focusTrapWrapper.current}>
      <div ref={focusTrapWrapper}>
        <EventListener event="focusout" handler={handleBlur} />
        <EventListener event="focusin" handler={handleFocusIn} />
        {children}
      </div>
    </Focus>
  );
}
