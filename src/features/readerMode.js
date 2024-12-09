import { getArticleElement, applyStyles } from '../utils/dom.js';

const READER_MODE_CLASS = 'kompas-reader-mode';
let originalStyles = null;

export const enableReaderMode = () => {
  const article = getArticleElement();
  if (!article) return;

  if (!originalStyles) {
    originalStyles = {
      width: article.style.width,
      margin: article.style.margin,
      padding: article.style.padding,
      fontSize: article.style.fontSize,
      lineHeight: article.style.lineHeight
    };
  }

  document.body.classList.add(READER_MODE_CLASS);
  applyStyles(article, {
    width: '700px',
    margin: '0 auto',
    padding: '20px',
    fontSize: '18px',
    lineHeight: '1.8'
  });
};

export const disableReaderMode = () => {
  const article = getArticleElement();
  if (!article || !originalStyles) return;

  document.body.classList.remove(READER_MODE_CLASS);
  applyStyles(article, originalStyles);
};