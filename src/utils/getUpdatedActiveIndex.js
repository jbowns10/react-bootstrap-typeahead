// @flow

import { DOWN, UP } from '../constants';
import type { Option } from '../types';

function skipDisabledOptions(
  currentIndex: number,
  keyCode: DOWN | UP,
  items: Option[]
): number {
  let newIndex = currentIndex;

  while (items[newIndex] && items[newIndex].disabled) {
    newIndex += keyCode === UP ? -1 : 1;
  }

  return newIndex;
}

export default function getUpdatedActiveIndex(
  currentIndex: number,
  keyCode: DOWN | UP,
  items: Option[]
): number {
  let newIndex = currentIndex;

  // Increment or decrement index based on user keystroke.
  newIndex += keyCode === UP ? -1 : 1;

  // Skip over any disabled options.
  newIndex = skipDisabledOptions(newIndex, keyCode, items);

  // If we've reached the end, go back to the beginning or vice-versa.
  if (newIndex === items.length) {
    newIndex = -1;
  } else if (newIndex === -2) {
    newIndex = items.length - 1;

    // Skip over any disabled options.
    newIndex = skipDisabledOptions(newIndex, keyCode, items);
  }

  return newIndex;
}
