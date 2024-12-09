import { getArticleElement } from '../utils/dom.js';

const CUSTOM_FONT_STYLES = {
  fontSize: '18px',
  lineHeight: '1.8',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
};

export const customizeFonts = () => {
  const article = getArticleElement();
  if (!article) return;
  
  const paragraphs = article.querySelectorAll('p');
  paragraphs.forEach(p => {
    Object.entries(CUSTOM_FONT_STYLES).forEach(([property, value]) => {
      p.style[property] = value;
    });
  });
};