const app = getApp();

Page({
  data: {
    settings as any,
    weddingDate: '',
    groomName: '',
    brideName: '',
    weddingVenue: '',
    editingField: '',
    tempValue: '',
    showDatePicker: false,
    loading: true
  },

  onLoad(options) {
    this.loadSettings();
    
    if (options && options.action === 'setup') {
      this.setData({ editingField: 'weddingDate' });
    }
  },

  onShow() {
    this.loadSettings();
  },

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  loadSettings() {
    this.setData({ loading: true });
    
    const settings = wx.getStorageSync('wedding_settings') || {
      weddingDate: '',
      weddingVenue: '',
      groomName: '',
      brideName: '',
      enableReminder: true,
      reminderDays: [7, 30]
    };
    
    this.setData({
      settings,
      weddingDate: settings.weddingDate || '',
      groomName: settings.groomName || '',
      brideName: settings.brideName || '',
      weddingVenue: settings.weddingVenue || '',
      loading: false
    });
  },

  saveSettings() {
    const settings = {
      ...this.data.settings,
      weddingDate: this.data.weddingDate,
      groomName: this.data.groomName,
      brideName: this.data.brideName,
      weddingVenue: this.data.weddingVenue
    };
    
    wx.setStorageSync('wedding_settings', settings);
    
    const completed = wx.getStorageSync('onboarding_completed');
    if (!completed) {
      wx.setStorageSync('onboarding_completed', true);
    }
    
    this.setData({ editingField: '' });
    
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
  },

  startEdit(field) {
    this.setData({
      editingField: field,
      tempValue: this.data[field as keyof typeof this.data] as string
    });
  },

  cancelEdit() {
    this.setData({ editingField: '' });
  },

  onInputChange(e) {
    this.setData({ tempValue: e.detail.value });
  },

  onInputBlur(field) {
    this.setData({ [field]: this.data.tempValue });
  },

  onDateChange(e) {
    this.setData({
      weddingDate: e.detail.value,
      editingField: ''
    });
    this.saveSettings();
  },

  saveField(field) {
    this.setData({ [field]: this.data.tempValue });
    this.saveSettings();
  },

  clearAllData() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有数据吗？此操作不可恢复！',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          
          wx.showToast({
            title: '数据已清除',
            icon: 'success'
          });
          
          setTimeout(() => {
            this.loadSettings();
          }, 1500);
        }
      }
    });
  },

  exportData() {
    const data = {
      settings: wx.getStorageSync('wedding_settings'),
      todos: wx.getStorageSync('todo_list'),
      suppliers: wx.getStorageSync('supplier_list'),
      budget: wx.getStorageSync('budget'),
      guests: wx.getStorageSync('guest_list'),
      exportTime: this.formatDate(new Date())
    };
    
    wx.setClipboardData({
      data: JSON.stringify(data, null, 2),
      success: () => {
        wx.showToast({
          title: '数据已复制',
          icon: 'success'
        });
      }
    });
  },

  aboutApp() {
    wx.showModal({
      title: '关于备婚助手',
      content: '备婚助手 v1.0.0\n\n专为备婚情侣打造的一站式待办管理工具。\n\n帮助新人轻松规划完美婚礼！',
      showCancel: false
    });
  },

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
});
