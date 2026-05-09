class Storage {
  static set(key, data) {
    try {
      wx.setStorageSync(key, data);
    } catch (e) {
      console.error('Storage set error:', e);
    }
  }
  
  static get(key, defaultValue = null) {
    try {
      const data = wx.getStorageSync(key);
      return data !== '' && data !== null && data !== undefined ? data : defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  }
  
  static remove(key) {
    try {
      wx.removeStorageSync(key);
    } catch (e) {
      console.error('Storage remove error:', e);
    }
  }
  
  static clear() {
    try {
      wx.clearStorageSync();
    } catch (e) {
      console.error('Storage clear error:', e);
    }
  }
}

const STORAGE_KEYS = {
  TODO_LIST: 'todo_list',
  SUPPLIER_LIST: 'supplier_list',
  BUDGET: 'budget',
  GUEST_LIST: 'guest_list',
  SETTINGS: 'wedding_settings',
  ONBOARDING: 'onboarding_completed'
};

module.exports = {
  Storage,
  STORAGE_KEYS
};
