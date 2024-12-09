// Utility functions for Chrome storage operations
export const getStorageData = (keys) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (result) => {
      resolve(result);
    });
  });
};

export const setStorageData = (data) => {
  return new Promise((resolve) => {
    chrome.storage.sync.set(data, resolve);
  });
};