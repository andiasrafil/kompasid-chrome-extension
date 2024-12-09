// Popup script for Kompas.id Reader

document.addEventListener('DOMContentLoaded', () => {
  const readerModeToggle = document.getElementById('readerMode');
  const removeAdsToggle = document.getElementById('removeAds');
  const fontCustomizationToggle = document.getElementById('fontCustomization');

  // Load saved settings
  chrome.storage.sync.get(
    ['readerMode', 'removeAds', 'fontCustomization'],
    (result) => {
      readerModeToggle.checked = result.readerMode || false;
      removeAdsToggle.checked = result.removeAds || false;
      fontCustomizationToggle.checked = result.fontCustomization || false;
    }
  );

  // Handle setting changes
  function updateSettings(setting, value) {
    chrome.storage.sync.set({ [setting]: value }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'configUpdate',
          config: { [setting]: value }
        });
      });
    });
  }

  readerModeToggle.addEventListener('change', (e) => {
    updateSettings('readerMode', e.target.checked);
  });

  removeAdsToggle.addEventListener('change', (e) => {
    updateSettings('removeAds', e.target.checked);
  });

  fontCustomizationToggle.addEventListener('change', (e) => {
    updateSettings('fontCustomization', e.target.checked);
  });
});