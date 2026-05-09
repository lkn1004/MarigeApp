const app = getApp<IAppOption>();

Page({
  data: {
    guestId: '',
    guest: null
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ guestId: options.id });
      this.loadGuest();
    }
  },

  loadGuest() {
    const guestList = wx.getStorageSync('guest_list') || [];
    const guest = guestList.find(g => g.id === this.data.guestId);
    this.setData({ guest });
  }
});
