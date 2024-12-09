// Content script for Kompas.id Reader

const READER_MODE_CLASS = 'kompas-reader-mode';

// Store the original styles before modifications
let originalStyles = null;

// Configuration state
let config = {
  readerMode: false,
  removeAds: true,
  fontCustomization: false
};

// Load saved configuration
chrome.storage.sync.get(['readerMode', 'removeAds', 'fontCustomization'], (result) => {
  config = { ...config, ...result };
  applySettings();
});

// Listen for configuration changes
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'configUpdate') {
    config = { ...config, ...request.config };
    applySettings();
  }
});

function applySettings() {
  if (config.readerMode) {
    enableReaderMode();
  } else {
    disableReaderMode();
  }
  
  if (config.removeAds) {
    removeAdvertisements();
  }
  
  if (config.fontCustomization) {
    customizeFonts();
  }
}

function enableReaderMode() {
  const article = document.querySelector('article');
  if (!article) return;

  // Save original styles if not already saved
  if (!originalStyles) {
    originalStyles = {
      width: article.style.width,
      margin: article.style.margin,
      padding: article.style.padding,
      fontSize: article.style.fontSize,
      lineHeight: article.style.lineHeight
    };
  }

  // Apply reader mode styles
  document.body.classList.add(READER_MODE_CLASS);
  article.style.width = '700px';
  article.style.margin = '0 auto';
  article.style.padding = '20px';
  article.style.fontSize = '18px';
  article.style.lineHeight = '1.8';
}

function disableReaderMode() {
  const article = document.querySelector('article');
  if (!article || !originalStyles) return;

  document.body.classList.remove(READER_MODE_CLASS);
  
  // Restore original styles
  Object.entries(originalStyles).forEach(([property, value]) => {
    article.style[property] = value;
  });
}

function removeAdvertisements() {
  const adSelectors = [
    '.advertisement',
    '.ad-container',
    '[class*="ads"]',
    '[id*="ads"]',
    '.promoted-content'
  ];
  
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.style.display = 'none';
    });
  });
}

function customizeFonts() {
  const article = document.querySelector('article');
  if (!article) return;
  
  const paragraphs = article.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.style.fontSize = '18px';
    p.style.lineHeight = '1.8';
    p.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  });
}