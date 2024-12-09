import { removeElements } from '../utils/dom.js';

const AD_SELECTORS = [
  '.advertisement',
  '.ad-container',
  '[class*="ads"]',
  '[id*="ads"]',
  '.promoted-content'
];

export const removeAdvertisements = () => {
  removeElements(AD_SELECTORS);
};