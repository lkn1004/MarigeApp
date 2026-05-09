const app = getApp<IAppOption>();

Page({
  data: {
    recordId: '',
    record: null,
    formData: {
      description: '',
      amount: '',
      category: 'other',
      date: '',
      status: 'paid'
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ recordId: options.id });
      this.loadRecord();
    }
  },

  loadRecord() {
    const budget = wx.getStorageSync('budget') || {};
    const record = budget.records.find(r => r.id === this.data.recordId);
    if (record) {
      this.setData({
        record,
        formData: {
          description: record.description || '',
          amount: record.amount ? String(record.amount) : '',
          category: record.category || 'other',
          date: record.date || '',
          status: record.status || 'paid'
        }
      });
    }
  },

  onDescriptionInput(e) {
    this.setData({ 'formData.description': e.detail.value });
  },

  onAmountInput(e) {
    this.setData({ 'formData.amount': e.detail.value });
  },

  onDateChange(e) {
    this.setData({ 'formData.date': e.detail.value });
  },

  selectCategory(e) {
    this.setData({ 'formData.category': e.currentTarget.dataset.category });
  },

  selectStatus(e) {
    this.setData({ 'formData.status': e.currentTarget.dataset.status });
  },

  saveRecord() {
    const { formData } = this.data;
    if (!formData.description.trim()) {
      wx.showToast({ title: '请输入描述', icon: 'none' });
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      wx.showToast({ title: '请输入金额', icon: 'none' });
      return;
    }
    
    const budget = wx.getStorageSync('budget') || {};
    if (this.data.recordId) {
      const index = budget.records.findIndex(r => r.id === this.data.recordId);
      if (index !== -1) {
        const oldAmount = budget.records[index].amount;
        budget.records[index] = {
          ...budget.records[index],
          ...formData,
          amount: parseFloat(formData.amount)
        };
        budget.totalSpent = (budget.totalSpent || 0) - oldAmount + parseFloat(formData.amount);
      }
    }
    
    wx.setStorageSync('budget', budget);
    wx.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 1500);
  }
});
