App<IAppOption>({
  globalData: {
    userInfo,
    hasUserInfo: false
  },
  
  onLaunch() {
    this.checkOnboarding();
    this.initDefaultData();
  },
  
  checkOnboarding() {
    const completed = wx.getStorageSync('onboarding_completed');
    if (!completed) {
      wx.setStorageSync('onboarding_completed', false);
    }
  },
  
  initDefaultData() {
    const settings = wx.getStorageSync('wedding_settings');
    if (!settings) {
      wx.setStorageSync('wedding_settings', {
        weddingDate: '',
        weddingVenue: '',
        groomName: '',
        brideName: '',
        coverImage: '',
        countdownEvents,
        enableReminder: true,
        reminderDays: [7, 30]
      });
    }
    
    const todoList = wx.getStorageSync('todo_list');
    if (!todoList) {
      wx.setStorageSync('todo_list', []);
    }
    
    const supplierList = wx.getStorageSync('supplier_list');
    if (!supplierList) {
      wx.setStorageSync('supplier_list', []);
    }
    
    const budget = wx.getStorageSync('budget');
    if (!budget) {
      wx.setStorageSync('budget', {
        totalBudget: 0,
        totalSpent: 0,
        warningThreshold: 80,
        records
      });
    }
    
    const guestList = wx.getStorageSync('guest_list');
    if (!guestList) {
      wx.setStorageSync('guest_list', []);
    }
  },
  
  onShow() {
    console.log('App Show');
  },
  
  onHide() {
    console.log('App Hide');
  }
});
