// DOM manipulation utilities
export const getArticleElement = () => document.querySelector('article');

export const applyStyles = (element, styles) => {
  Object.entries(styles).forEach(([property, value]) => {
    element.style[property] = value;
  });
};

export const removeElements = (selectors) => {
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.style.display = 'none';
    });
  });
};