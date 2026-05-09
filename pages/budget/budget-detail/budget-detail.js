const app = getApp();

Page({
  data: {
    budget,
    percentage: 0,
    records
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const budget = wx.getStorageSync('budget') || {};
    const totalBudget = budget.totalBudget || 0;
    const totalSpent = budget.totalSpent || 0;
    const percentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
    
    this.setData({
      budget,
      percentage,
      records: budget.records || []
    });
  }
});
