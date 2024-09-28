chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    const currentVersion = chrome.runtime.getManifest().version;
    chrome.tabs.create({
      url: `../pages/welcome.html?version=${currentVersion}`
    });
  } else if (details.reason === 'update') {
    const currentVersion = chrome.runtime.getManifest().version;
    const previousVersion = details.previousVersion;
    if (currentVersion !== previousVersion) {
      chrome.tabs.create({
        url: `../pages/updates.html?from=${previousVersion}&to=${currentVersion}`
      });
    }
  }
});
