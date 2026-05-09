const app = getApp();

Page({
  data: {
    supplierId: '',
    supplier
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
    this.setData({ supplier });
  }
});
