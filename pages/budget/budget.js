const app = getApp();
const { TODO_CATEGORIES } = require('../../data/categories');
const { BUDGET_TEMPLATES } = require('../../data/templates');
const { generateId } = require('../../utils/id');

Page({
  data: {
    budget,
    totalBudget: 0,
    totalSpent: 0,
    remaining: 0,
    percentage: 0,
    categoryStats,
    recentRecords,
    showAddModal: false,
    showTemplateModal: false,
    selectedTemplate,
    newRecord: {
      description: '',
      amount: '',
      category: 'other',
      date: '',
      status: 'paid'
    },
    categories: TODO_CATEGORIES,
    templates: BUDGET_TEMPLATES,
    loading: true
  },

  onLoad() {
    this.loadBudget();
  },

  onShow() {
    this.loadBudget();
  },

  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  loadBudget() {
    this.setData({ loading: true });
    
    const budget = wx.getStorageSync('budget') || {};
    const todoList = wx.getStorageSync('todo_list') || [];
    
    const totalBudget = budget.totalBudget || 0;
    const totalSpent = budget.totalSpent || 0;
    const remaining = totalBudget - totalSpent;
    const percentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
    
    const categoryStats = this.calculateCategoryStats(budget.records || [], todoList);
    const recentRecords = (budget.records || []).slice(-10).reverse();
    
    this.setData({
      budget,
      totalBudget,
      totalSpent,
      remaining,
      percentage,
      categoryStats,
      recentRecords,
      loading: false
    });
  },

  calculateCategoryStats(records, todoList) {
    const stats = [];
    
    TODO_CATEGORIES.forEach(category => {
      const categoryRecords = records.filter(r => r.category === category.id);
      const spent = categoryRecords.reduce((sum, r) => sum + r.amount, 0);
      
      const todoBudgets = todoList
        .filter(t => t.category === category.id && t.budget && !t.completed)
        .reduce((sum, t) => sum + t.budget, 0);
      
      stats.push({
        ...category,
        spent,
        planned: todoBudgets,
        recordCount: categoryRecords.length
      });
    });
    
    return stats.sort((a, b) => b.spent - a.spent);
  },

  openAddModal() {
    this.setData({
      showAddModal: true,
      newRecord: {
        description: '',
        amount: '',
        category: 'other',
        date: this.formatDate(new Date()),
        status: 'paid'
      }
    });
  },

  closeAddModal() {
    this.setData({ showAddModal: false });
  },

  openTemplateModal() {
    this.setData({ showTemplateModal: true });
  },

  closeTemplateModal() {
    this.setData({ showTemplateModal: false });
  },

  onDescriptionInput(e) {
    this.setData({
      'newRecord.description': e.detail.value
    });
  },

  onAmountInput(e) {
    this.setData({
      'newRecord.amount': e.detail.value
    });
  },

  selectCategory(e) {
    this.setData({
      'newRecord.category': e.currentTarget.dataset.category
    });
  },

  onDateChange(e) {
    this.setData({
      'newRecord.date': e.detail.value
    });
  },

  selectStatus(e) {
    this.setData({
      'newRecord.status': e.currentTarget.dataset.status
    });
  },

  saveRecord() {
    const { newRecord } = this.data;
    
    if (!newRecord.description.trim()) {
      wx.showToast({ title: '请输入描述', icon: 'none' });
      return;
    }
    
    if (!newRecord.amount || parseFloat(newRecord.amount) <= 0) {
      wx.showToast({ title: '请输入有效金额', icon: 'none' });
      return;
    }
    
    const budget = wx.getStorageSync('budget') || {};
    const now = this.formatDate(new Date());
    
    const newRecordItem = {
      id: generateId(),
      description: newRecord.description.trim(),
      amount: parseFloat(newRecord.amount),
      category: newRecord.category,
      date: newRecord.date || now,
      status: newRecord.status,
      createdAt: now
    };
    
    budget.records = [...(budget.records || []), newRecordItem];
    budget.totalSpent = (budget.totalSpent || 0) + parseFloat(newRecord.amount);
    
    wx.setStorageSync('budget', budget);
    this.loadBudget();
    this.closeAddModal();
    
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });
  },

  selectTemplate(e) {
    const templateId = e.currentTarget.dataset.id;
    const template = BUDGET_TEMPLATES.find(t => t.id === templateId);
    
    if (template) {
      this.setData({ selectedTemplate: template });
    }
  },

  applyTemplate() {
    if (!this.data.selectedTemplate) {
      wx.showToast({ title: '请选择预算模板', icon: 'none' });
      return;
    }
    
    const budget = wx.getStorageSync('budget') || {};
    budget.totalBudget = this.data.selectedTemplate.total;
    
    wx.setStorageSync('budget', budget);
    this.loadBudget();
    this.closeTemplateModal();
    
    wx.showToast({
      title: '应用成功',
      icon: 'success'
    });
  },

  setTotalBudget() {
    wx.showModal({
      title: '设置总预算',
      editable: true,
      placeholderText: '请输入总预算金额',
      success: (res) => {
        if (res.confirm && res.content) {
          const amount = parseFloat(res.content);
          if (isNaN(amount) || amount <= 0) {
            wx.showToast({ title: '请输入有效金额', icon: 'none' });
            return;
          }
          
          const budget = wx.getStorageSync('budget') || {};
          budget.totalBudget = amount;
          wx.setStorageSync('budget', budget);
          this.loadBudget();
          
          wx.showToast({ title: '设置成功', icon: 'success' });
        }
      }
    });
  },

  deleteRecord(e) {
    const recordId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条支出记录吗？',
      success: (res) => {
        if (res.confirm) {
          const budget = wx.getStorageSync('budget') || {};
          const record = budget.records.find(r => r.id === recordId);
          
          if (record) {
            budget.records = budget.records.filter(r => r.id !== recordId);
            budget.totalSpent = Math.max(0, (budget.totalSpent || 0) - record.amount);
            wx.setStorageSync('budget', budget);
            this.loadBudget();
            
            wx.showToast({ title: '删除成功', icon: 'success' });
          }
        }
      }
    });
  },

  goToDetail() {
    wx.navigateTo({
      url: '/pages/budget/budget-detail/budget-detail'
    });
  },

  formatCurrency(amount) {
    return `¥${Number(amount || 0).toLocaleString('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  }
});
