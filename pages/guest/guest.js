const app = getApp();
const { GUEST_GROUPS, INVITE_STATUS } = require('../../data/categories');
const { generateId } = require('../../utils/id');

Page({
  data: {
    guests,
    filteredGuests,
    groups: GUEST_GROUPS,
    statuses: INVITE_STATUS,
    selectedGroup: 'all',
    selectedStatus: 'all',
    searchKeyword: '',
    showAddModal: false,
    editingGuest,
    newGuest: {
      name: '',
      title: '',
      phone: '',
      relation: '',
      group: 'friend',
      status: 'pending',
      table: '',
      dietary: '',
      isAttendant: false,
      notes: ''
    },
    stats: {
      total: 0,
      confirmed: 0,
      declined: 0,
      pending: 0
    },
    loading: true
  },

  onLoad() {
    this.loadGuests();
  },

  onShow() {
    this.loadGuests();
  },

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  loadGuests() {
    this.setData({ loading: true });
    
    const guestList = wx.getStorageSync('guest_list') || [];
    
    const guestsWithInfo = guestList.map((guest) => {
      const group = GUEST_GROUPS.find(g => g.id === guest.group);
      const status = INVITE_STATUS.find(s => s.id === guest.status);
      return {
        ...guest,
        groupName: group ? group.name : '其他',
        statusName: status ? status.name : '未知',
        statusColor: status ? status.color : '#999999'
      };
    });
    
    const stats = {
      total: guestsWithInfo.length,
      confirmed: guestsWithInfo.filter(g => g.status === 'confirmed').length,
      declined: guestsWithInfo.filter(g => g.status === 'declined').length,
      pending: guestsWithInfo.filter(g => g.status === 'pending' || g.status === 'sent').length
    };
    
    this.setData({
      guests: guestsWithInfo,
      stats,
      loading: false
    });
    
    this.applyFilters();
  },

  applyFilters() {
    let filtered = [...this.data.guests];
    
    if (this.data.selectedGroup !== 'all') {
      filtered = filtered.filter(g => g.group === this.data.selectedGroup);
    }
    
    if (this.data.selectedStatus !== 'all') {
      filtered = filtered.filter(g => g.status === this.data.selectedStatus);
    }
    
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filtered = filtered.filter(g => 
        g.name.toLowerCase().includes(keyword) ||
        g.phone.includes(keyword)
      );
    }
    
    this.setData({ filteredGuests: filtered });
  },

  onSearch(e) {
    this.setData({ searchKeyword: e.detail.value });
    this.applyFilters();
  },

  selectGroup(e) {
    const group = e.currentTarget.dataset.group;
    this.setData({ selectedGroup: group });
    this.applyFilters();
  },

  selectStatus(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({ selectedStatus: status });
    this.applyFilters();
  },

  openAddModal() {
    this.setData({
      showAddModal: true,
      editingGuest,
      newGuest: {
        name: '',
        title: '',
        phone: '',
        relation: '',
        group: 'friend',
        status: 'pending',
        table: '',
        dietary: '',
        isAttendant: false,
        notes: ''
      }
    });
  },

  closeAddModal() {
    this.setData({ showAddModal: false });
  },

  onNameInput(e) {
    this.setData({ 'newGuest.name': e.detail.value });
  },

  onTitleInput(e) {
    this.setData({ 'newGuest.title': e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ 'newGuest.phone': e.detail.value });
  },

  onRelationInput(e) {
    this.setData({ 'newGuest.relation': e.detail.value });
  },

  onDietaryInput(e) {
    this.setData({ 'newGuest.dietary': e.detail.value });
  },

  onNotesInput(e) {
    this.setData({ 'newGuest.notes': e.detail.value });
  },

  selectGroupNew(e) {
    this.setData({ 'newGuest.group': e.currentTarget.dataset.group });
  },

  selectStatusNew(e) {
    this.setData({ 'newGuest.status': e.currentTarget.dataset.status });
  },

  toggleAttendant() {
    this.setData({ 'newGuest.isAttendant': !this.data.newGuest.isAttendant });
  },

  saveGuest() {
    const { newGuest } = this.data;
    
    if (!newGuest.name.trim()) {
      wx.showToast({ title: '请输入宾客姓名', icon: 'none' });
      return;
    }
    
    const guestList = wx.getStorageSync('guest_list') || [];
    const now = this.formatDate(new Date());
    
    if (this.data.editingGuest) {
      const index = guestList.findIndex((g) => g.id === this.data.editingGuest.id);
      if (index !== -1) {
        guestList[index] = {
          ...guestList[index],
          name: newGuest.name.trim(),
          title: newGuest.title,
          phone: newGuest.phone,
          relation: newGuest.relation,
          group: newGuest.group,
          status: newGuest.status,
          table: newGuest.table,
          dietary: newGuest.dietary,
          isAttendant: newGuest.isAttendant,
          notes: newGuest.notes,
          updatedAt: now
        };
      }
    } else {
      const newGuestItem = {
        id: generateId(),
        name: newGuest.name.trim(),
        title: newGuest.title,
        phone: newGuest.phone,
        relation: newGuest.relation,
        group: newGuest.group,
        status: newGuest.status,
        table: newGuest.table || '',
        seatNumber,
        dietary: newGuest.dietary,
        isAttendant: newGuest.isAttendant,
        notes: newGuest.notes,
        createdAt: now,
        updatedAt: now
      };
      guestList.push(newGuestItem);
    }
    
    wx.setStorageSync('guest_list', guestList);
    this.loadGuests();
    this.closeAddModal();
    
    wx.showToast({
      title: this.data.editingGuest ? '更新成功' : '添加成功',
      icon: 'success'
    });
  },

  editGuest(e) {
    const guestId = e.currentTarget.dataset.id;
    const guest = this.data.guests.find((g) => g.id === guestId);
    
    if (guest) {
      this.setData({
        showAddModal: true,
        editingGuest: guest,
        newGuest: {
          name: guest.name,
          title: guest.title,
          phone: guest.phone,
          relation: guest.relation,
          group: guest.group,
          status: guest.status,
          table: guest.table || '',
          dietary: guest.dietary,
          isAttendant: guest.isAttendant,
          notes: guest.notes || ''
        }
      });
    }
  },

  deleteGuest(e) {
    const guestId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这位宾客吗？',
      success: (res) => {
        if (res.confirm) {
          const guestList = wx.getStorageSync('guest_list') || [];
          const updatedList = guestList.filter((g) => g.id !== guestId);
          wx.setStorageSync('guest_list', updatedList);
          this.loadGuests();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  toggleGuestStatus(e) {
    const guestId = e.currentTarget.dataset.id;
    const guestList = wx.getStorageSync('guest_list') || [];
    
    const statusFlow = ['pending', 'sent', 'confirmed'];
    const currentGuest = guestList.find((g) => g.id === guestId);
    
    if (currentGuest) {
      const currentIndex = statusFlow.indexOf(currentGuest.status);
      const nextStatus = currentIndex < statusFlow.length - 1 
        ? statusFlow[currentIndex + 1] 
        : 'confirmed';
      
      const updatedList = guestList.map((g) => {
        if (g.id === guestId) {
          return { ...g, status: nextStatus };
        }
        return g;
      });
      
      wx.setStorageSync('guest_list', updatedList);
      this.loadGuests();
    }
  }
});
