import { getStorageData, setStorageData } from './utils/storage.js';
import { sendMessageToTab, getCurrentTab } from './utils/messaging.js';

class PopupManager {
  constructor() {
    this.elements = {
      readerMode: document.getElementById('readerMode'),
      removeAds: document.getElementById('removeAds'),
      fontCustomization: document.getElementById('fontCustomization')
    };
    
    this.initializeListeners();
    this.loadSettings();
  }

  async loadSettings() {
    const settings = await getStorageData([
      'readerMode',
      'removeAds',
      'fontCustomization'
    ]);

    Object.entries(settings).forEach(([key, value]) => {
      if (this.elements[key]) {
        this.elements[key].checked = value || false;
      }
    });
  }

  async updateSetting(setting, value) {
    await setStorageData({ [setting]: value });
    const currentTab = await getCurrentTab();
    
    if (currentTab?.id) {
      await sendMessageToTab(currentTab.id, {
        type: 'configUpdate',
        config: { [setting]: value }
      });
    }
  }

  initializeListeners() {
    Object.entries(this.elements).forEach(([setting, element]) => {
      element.addEventListener('change', (e) => {
        this.updateSetting(setting, e.target.checked);
      });
    });
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupManager();
});