// This is a placeholder file for the budget detail page
const app = getApp<IAppOption>();

Page({
  data: {
    budget: null,
    categoryStats: [],
    loading: true
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const budget = wx.getStorageSync('budget') || {};
    this.setData({ budget, loading: false });
  }
});
