const app = getApp();
const { SUPPLIER_TYPES } = require('../../../data/categories');

Page({
  data: {
    supplierId: '',
    supplier,
    types: SUPPLIER_TYPES,
    formData: {
      name: '',
      type: 'hotel',
      contact: '',
      phone: '',
      price: '',
      deposit: '',
      schedule: '',
      notes: ''
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ supplierId: options.id });
      this.loadSupplier();
    }
  },

  loadSupplier() {
    const supplierList = wx.getStorageSync('supplier_list') || [];
    const supplier = supplierList.find(s => s.id === this.data.supplierId);
    if (supplier) {
      this.setData({
        supplier,
        formData: {
          name: supplier.name || '',
          type: supplier.type || 'hotel',
          contact: supplier.contact || '',
          phone: supplier.phone || '',
          price: supplier.price ? String(supplier.price) : '',
          deposit: supplier.deposit ? String(supplier.deposit) : '',
          schedule: supplier.schedule || '',
          notes: supplier.notes || ''
        }
      });
    }
  },

  onNameInput(e) {
    this.setData({ 'formData.name': e.detail.value });
  },

  onContactInput(e) {
    this.setData({ 'formData.contact': e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ 'formData.phone': e.detail.value });
  },

  onPriceInput(e) {
    this.setData({ 'formData.price': e.detail.value });
  },

  onDepositInput(e) {
    this.setData({ 'formData.deposit': e.detail.value });
  },

  onNotesInput(e) {
    this.setData({ 'formData.notes': e.detail.value });
  },

  selectType(e) {
    this.setData({ 'formData.type': e.currentTarget.dataset.type });
  },

  onScheduleChange(e) {
    this.setData({ 'formData.schedule': e.detail.value });
  },

  saveSupplier() {
    const { formData } = this.data;
    if (!formData.name.trim()) {
      wx.showToast({ title: '请输入供应商名称', icon: 'none' });
      return;
    }

    const supplierList = wx.getStorageSync('supplier_list') || [];
    const now = new Date().toISOString().split('T')[0];

    if (this.data.supplierId) {
      const index = supplierList.findIndex(s => s.id === this.data.supplierId);
      if (index !== -1) {
        supplierList[index] = {
          ...supplierList[index],
          ...formData,
          price: formData.price ? parseFloat(formData.price) : 0,
          deposit: formData.deposit ? parseFloat(formData.deposit) : 0,
          updatedAt: now
        };
      }
    } else {
      supplierList.push({
        id.now().toString(),
        ...formData,
        price: formData.price ? parseFloat(formData.price) : 0,
        deposit: formData.deposit ? parseFloat(formData.deposit) : 0,
        balance: formData.price ? parseFloat(formData.price) : 0,
        rating: 0,
        createdAt: now,
        updatedAt: now
      });
    }

    wx.setStorageSync('supplier_list', supplierList);
    wx.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 1500);
  }
});
