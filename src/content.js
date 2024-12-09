import { getStorageData } from './utils/storage.js';
import { enableReaderMode, disableReaderMode } from './features/readerMode.js';
import { removeAdvertisements } from './features/adBlocker.js';
import { customizeFonts } from './features/fontCustomizer.js';

// Configuration state
let config = {
  readerMode: false,
  removeAds: true,
  fontCustomization: false
};

// Initialize configuration
const initializeConfig = async () => {
  const result = await getStorageData(['readerMode', 'removeAds', 'fontCustomization']);
  config = { ...config, ...result };
  applySettings();
};

const applySettings = () => {
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
};

// Listen for configuration changes
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'configUpdate') {
    config = { ...config, ...request.config };
    applySettings();
  }
});

// Initialize on load
initializeConfig();