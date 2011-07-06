(function() {
  var STATE_LOCKED, STATE_UNLOCKED, addFilterEntry, createFilterEntry, displayFilterInvalidError, enableFilterOptions, filterAddElem, filterEnabledElem, filterEntriesElem, filterInvalidErrorElem, filterNewElem, init, initControls, initParams, onFilterAddClicked, onFilterEnabledChanged, onFilterRemoveClicked, onResetButtonClicked, onSaveButtonClicked, removeFilterEntry, resetButtonElem, resetOptions, saveButtonElem, saveOptions, setState, wrapperElem;
  STATE_LOCKED = 'locked';
  STATE_UNLOCKED = 'unlocked';
  wrapperElem = null;
  filterEnabledElem = null;
  filterNewElem = null;
  filterAddElem = null;
  filterInvalidErrorElem = null;
  filterEntriesElem = null;
  resetButtonElem = null;
  saveButtonElem = null;
  init = function(event) {
    initParams();
    initControls();
    return setState(STATE_UNLOCKED);
  };
  initParams = function() {};
  initControls = function() {
    var _i, _len, _ref, entry;
    wrapperElem = document.getElementById('wrapper');
    filterEnabledElem = document.getElementById('filter_enabled');
    filterNewElem = document.getElementById('filter_new');
    filterAddElem = document.getElementById('filter_add');
    filterInvalidErrorElem = document.getElementById('filter_invalid_error');
    filterEntriesElem = document.getElementById('filter_entries');
    filterEnabledElem.checked = Config.isFilterEnabled();
    Utils.clearElement(filterEntriesElem);
    _ref = Config.getFilterEntries();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      entry = _ref[_i];
      addFilterEntry(entry);
    }
    filterEnabledElem.addEventListener('change', onFilterEnabledChanged, true);
    Utils.fireEvent(filterEnabledElem, 'change');
    filterAddElem.addEventListener('click', onFilterAddClicked, true);
    resetButtonElem = document.getElementById('options_reset');
    saveButtonElem = document.getElementById('options_save');
    resetButtonElem.addEventListener('click', onResetButtonClicked, true);
    return saveButtonElem.addEventListener('click', onSaveButtonClicked, true);
  };
  setState = function(state) {
    return (wrapperElem.className = state);
  };
  onFilterEnabledChanged = function(event) {
    return enableFilterOptions(event.target.checked);
  };
  onFilterRemoveClicked = function(event) {
    return removeFilterEntry(event.target.parentNode);
  };
  onFilterAddClicked = function(event) {
    return addFilterEntry(filterNewElem.value);
  };
  onResetButtonClicked = function(event) {
    return resetOptions();
  };
  onSaveButtonClicked = function(event) {
    return saveOptions();
  };
  enableFilterOptions = function(enable) {
    filterNewElem.disabled = !enable;
    filterAddElem.disabled = !enable;
    return !enable ? (filterNewElem.value = '') : undefined;
  };
  displayFilterInvalidError = function(display) {
    return Utils.displayElement(filterInvalidErrorElem, display);
  };
  removeFilterEntry = function(elem) {
    return filterEntriesElem.removeChild(elem);
  };
  addFilterEntry = function(entry) {
    var entryElem;
    entry = entry || '';
    entry = entry.trim();
    if (!entry) {
      displayFilterInvalidError(true);
      return null;
    }
    try {
      new Globber(entry).compile();
    } catch (error) {
      displayFilterInvalidError(true);
      return null;
    }
    displayFilterInvalidError(false);
    entryElem = createFilterEntry(entry);
    filterEntriesElem.appendChild(entryElem);
    filterNewElem.value = null;
    return entryElem;
  };
  createFilterEntry = function(entry) {
    var entryElem, handleElem, removeElem;
    handleElem = Utils.createElement({
      'tagName': 'span',
      'className': 'handle',
      'textContent': entry
    });
    removeElem = Utils.createElement({
      'tagName': 'span',
      'className': 'remove',
      'textContent': '×'
    });
    removeElem.addEventListener('click', onFilterRemoveClicked, true);
    entryElem = Utils.createElement({
      'tagName': 'li',
      'className': 'filter_entry'
    });
    entryElem.appendChild(handleElem);
    entryElem.appendChild(removeElem);
    return entryElem;
  };
  resetOptions = function() {
    return Utils.reload();
  };
  saveOptions = function() {
    var _i, _len, _ref, entry, filterEnabled, filterEntries;
    filterEnabled = filterEnabledElem.checked;
    filterEntries = [];
    _ref = filterEntriesElem.querySelectorAll('.handle');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      entry = _ref[_i];
      filterEntries.push(entry.textContent);
    }
    Config.setFilterEnabled(filterEnabled);
    return Config.setFilterEntries(filterEntries);
  };
  window.addEventListener('load', init, true);
}).call(this);
