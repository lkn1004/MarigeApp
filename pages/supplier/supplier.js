const app = getApp<IAppOption>();
const { SUPPLIER_TYPES } = require('../../data/categories');
const { generateId } = require('../../utils/id');

Page({
  data: {
    suppliers: [] as any[],
    filteredSuppliers: [] as any[],
    types: SUPPLIER_TYPES,
    selectedType: 'all',
    searchKeyword: '',
    showAddModal: false,
    editingSupplier: null as any,
    newSupplier: {
      name: '',
      type: 'hotel',
      contact: '',
      phone: '',
      price: '',
      deposit: '',
      schedule: '',
      notes: ''
    },
    loading: true
  },

  onLoad() {
    this.loadSuppliers();
  },

  onShow() {
    this.loadSuppliers();
  },

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  loadSuppliers() {
    this.setData({ loading: true });
    
    const supplierList = wx.getStorageSync('supplier_list') || [];
    
    const suppliersWithType = supplierList.map((supplier: any) => {
      const type = SUPPLIER_TYPES.find(t => t.id === supplier.type);
      return {
        ...supplier,
        typeName: type ? type.name : '其他'
      };
    });
    
    this.setData({
      suppliers: suppliersWithType,
      loading: false
    });
    
    this.applyFilters();
  },

  applyFilters() {
    let filtered = [...this.data.suppliers];
    
    if (this.data.selectedType !== 'all') {
      filtered = filtered.filter(s => s.type === this.data.selectedType);
    }
    
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(keyword) ||
        s.contact.toLowerCase().includes(keyword)
      );
    }
    
    this.setData({ filteredSuppliers: filtered });
  },

  onSearch(e: any) {
    this.setData({ searchKeyword: e.detail.value });
    this.applyFilters();
  },

  selectType(e: any) {
    const type = e.currentTarget.dataset.type;
    this.setData({ selectedType: type });
    this.applyFilters();
  },

  openAddModal() {
    this.setData({
      showAddModal: true,
      editingSupplier: null,
      newSupplier: {
        name: '',
        type: 'hotel',
        contact: '',
        phone: '',
        price: '',
        deposit: '',
        schedule: '',
        notes: ''
      }
    });
  },

  closeAddModal() {
    this.setData({ showAddModal: false });
  },

  onNameInput(e: any) {
    this.setData({ 'newSupplier.name': e.detail.value });
  },

  onContactInput(e: any) {
    this.setData({ 'newSupplier.contact': e.detail.value });
  },

  onPhoneInput(e: any) {
    this.setData({ 'newSupplier.phone': e.detail.value });
  },

  onPriceInput(e: any) {
    this.setData({ 'newSupplier.price': e.detail.value });
  },

  onDepositInput(e: any) {
    this.setData({ 'newSupplier.deposit': e.detail.value });
  },

  onNotesInput(e: any) {
    this.setData({ 'newSupplier.notes': e.detail.value });
  },

  selectSupplierType(e: any) {
    this.setData({ 'newSupplier.type': e.currentTarget.dataset.type });
  },

  onScheduleChange(e: any) {
    this.setData({ 'newSupplier.schedule': e.detail.value });
  },

  saveSupplier() {
    const { newSupplier } = this.data;
    
    if (!newSupplier.name.trim()) {
      wx.showToast({ title: '请输入供应商名称', icon: 'none' });
      return;
    }
    
    const supplierList = wx.getStorageSync('supplier_list') || [];
    const now = this.formatDate(new Date());
    
    if (this.data.editingSupplier) {
      const index = supplierList.findIndex((s: any) => s.id === this.data.editingSupplier.id);
      if (index !== -1) {
        supplierList[index] = {
          ...supplierList[index],
          name: newSupplier.name.trim(),
          type: newSupplier.type,
          contact: newSupplier.contact,
          phone: newSupplier.phone,
          price: newSupplier.price ? parseFloat(newSupplier.price) : 0,
          deposit: newSupplier.deposit ? parseFloat(newSupplier.deposit) : 0,
          schedule: newSupplier.schedule,
          notes: newSupplier.notes,
          updatedAt: now
        };
      }
    } else {
      const newSupplierItem = {
        id: generateId(),
        name: newSupplier.name.trim(),
        type: newSupplier.type,
        contact: newSupplier.contact,
        phone: newSupplier.phone,
        price: newSupplier.price ? parseFloat(newSupplier.price) : 0,
        deposit: newSupplier.deposit ? parseFloat(newSupplier.deposit) : 0,
        balance: newSupplier.price ? parseFloat(newSupplier.price) : 0,
        schedule: newSupplier.schedule,
        rating: 0,
        notes: newSupplier.notes,
        createdAt: now,
        updatedAt: now
      };
      supplierList.push(newSupplierItem);
    }
    
    wx.setStorageSync('supplier_list', supplierList);
    this.loadSuppliers();
    this.closeAddModal();
    
    wx.showToast({
      title: this.data.editingSupplier ? '更新成功' : '添加成功',
      icon: 'success'
    });
  },

  editSupplier(e: any) {
    const supplierId = e.currentTarget.dataset.id;
    const supplier = this.data.suppliers.find((s: any) => s.id === supplierId);
    
    if (supplier) {
      this.setData({
        showAddModal: true,
        editingSupplier: supplier,
        newSupplier: {
          name: supplier.name,
          type: supplier.type,
          contact: supplier.contact,
          phone: supplier.phone,
          price: supplier.price ? String(supplier.price) : '',
          deposit: supplier.deposit ? String(supplier.deposit) : '',
          schedule: supplier.schedule || '',
          notes: supplier.notes || ''
        }
      });
    }
  },

  deleteSupplier(e: any) {
    const supplierId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个供应商吗？',
      success: (res) => {
        if (res.confirm) {
          const supplierList = wx.getStorageSync('supplier_list') || [];
          const updatedList = supplierList.filter((s: any) => s.id !== supplierId);
          wx.setStorageSync('supplier_list', updatedList);
          this.loadSuppliers();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  goToDetail(e: any) {
    const supplierId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/supplier/supplier-detail/supplier-detail?id=${supplierId}`
    });
  },

  formatCurrency(amount: number): string {
    return `¥${Number(amount || 0).toLocaleString('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  }
});
