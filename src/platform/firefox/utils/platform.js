require("../manifest.json");
require.context("_locales", true, /.*\.json/);
require.context("assets", false, /icon_.*\.png/);

export function getExtensionManifest() {
  return window.browser.runtime.getManifest();
}

export function getExtensionUrl() {
  return window.browser.extension.getURL.apply(
    window.browser.extension,
    arguments
  );
}

export function getI18nMessage() {
  return window.browser.i18n.getMessage.apply(window.browser.i18n, arguments);
}

function getStorage() {
  return window.browser.storage.sync || window.browser.storage.local;
}

export function getItems(defaults, callback) {
  const storage = getStorage();
  storage.get(defaults, callback);
}

export function setItems(items, callback) {
  const storage = getStorage();
  storage.set(items, callback);
}

export function onChangeItems(callback) {
  window.browser.storage.onChanged.addListener(callback);
}

export function onBeforeRequest(callback) {
  const urls = ["<all_urls>"];
  window.browser.webRequest.onBeforeRequest.addListener(callback, { urls }, [
    "blocking",
  ]);
}

export function updateTab(id, url) {
  url = getExtensionUrl(url);

  window.browser.tabs.update(id, { url });
}
