const WEDDING_CHECKLISTS = {
  twelveMonths: [
    { title: '确定婚礼日期和大致预算', category: 'other', priority: 'high' },
    { title: '确定婚礼形式（中式/西式/户外）', category: 'planner', priority: 'high' },
    { title: '收集婚礼灵感和参考图片', category: 'planner', priority: 'medium' },
    { title: '确定婚礼举办城市或地区', category: 'venue', priority: 'high' },
    { title: '预约婚纱照摄影工作室', category: 'photo', priority: 'high' },
    { title: '开始了解婚宴场地', category: 'venue', priority: 'high' },
    { title: '确定婚宴酒店档期', category: 'venue', priority: 'high' },
    { title: '预约婚庆策划公司咨询', category: 'planner', priority: 'medium' },
    { title: '开始关注珠宝品牌', category: 'jewelry', priority: 'medium' },
    { title: '办理婚姻登记预约', category: 'legal', priority: 'high' },
    { title: '预订婚礼摄影摄像团队', category: 'photo', priority: 'high' },
    { title: '了解蜜月目的地', category: 'honeymoon', priority: 'low' }
  ],
  
  tenMonths: [
    { title: '确定婚宴酒店并签订合同', category: 'venue', priority: 'high' },
    { title: '确定婚纱照拍摄时间', category: 'photo', priority: 'high' },
    { title: '开始选购婚纱和礼服', category: 'dress', priority: 'high' },
    { title: '确定婚庆策划公司', category: 'planner', priority: 'high' },
    { title: '与婚庆策划师初次沟通', category: 'planner', priority: 'high' },
    { title: '确定婚礼主题和风格', category: 'planner', priority: 'medium' },
    { title: '开始了解钻戒和对戒', category: 'jewelry', priority: 'medium' },
    { title: '预约化妆造型师试妆', category: 'planner', priority: 'medium' },
    { title: '预订婚车租赁', category: 'other', priority: 'medium' },
    { title: '开始制作婚礼宾客名单', category: 'guest', priority: 'medium' }
  ],
  
  eightMonths: [
    { title: '确定婚礼布置方案', category: 'planner', priority: 'high' },
    { title: '确定婚礼流程和时间表', category: 'planner', priority: 'high' },
    { title: '拍摄婚纱照', category: 'photo', priority: 'high' },
    { title: '选购新娘婚纱', category: 'dress', priority: 'high' },
    { title: '选购新郎西装/礼服', category: 'dress', priority: 'high' },
    { title: '确定伴郎伴娘人选', category: 'other', priority: 'medium' },
    { title: '预订婚礼主持人/司仪', category: 'planner', priority: 'high' },
    { title: '确定花艺设计方案', category: 'planner', priority: 'medium' },
    { title: '预订婚礼甜品台', category: 'banquet', priority: 'medium' },
    { title: '选购婚鞋和配饰', category: 'dress', priority: 'low' }
  ],
  
  sixMonths: [
    { title: '确定婚礼请柬设计', category: 'guest', priority: 'high' },
    { title: '发送婚礼请柬', category: 'guest', priority: 'high' },
    { title: '确定婚宴菜单', category: 'banquet', priority: 'high' },
    { title: '确定婚宴酒水方案', category: 'banquet', priority: 'medium' },
    { title: '预订婚礼蛋糕', category: 'banquet', priority: 'medium' },
    { title: '确定伴娘礼服', category: 'dress', priority: 'medium' },
    { title: '确定伴郎服装', category: 'dress', priority: 'medium' },
    { title: '预约婚前体检', category: 'legal', priority: 'high' },
    { title: '开始计划蜜月行程', category: 'honeymoon', priority: 'medium' },
    { title: '预订蜜月机票和酒店', category: 'honeymoon', priority: 'medium' },
    { title: '购买婚礼保险（如需要）', category: 'other', priority: 'low' },
    { title: '确定婚礼音乐播放列表', category: 'planner', priority: 'low' }
  ],
  
  fourMonths: [
    { title: '确认宾客出席情况', category: 'guest', priority: 'high' },
    { title: '制作婚礼座位表', category: 'guest', priority: 'high' },
    { title: '确定婚宴桌位安排', category: 'guest', priority: 'high' },
    { title: '预订婚房/新房布置', category: 'other', priority: 'medium' },
    { title: '确定接亲路线', category: 'planner', priority: 'medium' },
    { title: '安排婚礼当天车辆', category: 'other', priority: 'medium' },
    { title: '制作婚礼电子相册/视频', category: 'photo', priority: 'low' },
    { title: '预订婚礼小礼物/回礼', category: 'other', priority: 'low' },
    { title: '确定婚礼当天流程细节', category: 'planner', priority: 'high' },
    { title: '与婚庆公司最终确认', category: 'planner', priority: 'high' }
  ],
  
  threeMonths: [
    { title: '最终确认宾客名单', category: 'guest', priority: 'high' },
    { title: '确定婚宴桌数', category: 'banquet', priority: 'high' },
    { title: '与酒店最终确认菜单', category: 'banquet', priority: 'high' },
    { title: '确定婚礼誓词内容', category: 'planner', priority: 'medium' },
    { title: '预约新娘美甲', category: 'dress', priority: 'low' },
    { title: '确定婚礼当天新娘造型', category: 'planner', priority: 'medium' },
    { title: '预订蜜月行李', category: 'honeymoon', priority: 'low' },
    { title: '安排婚礼前单身派对', category: 'other', priority: 'low' },
    { title: '确认婚礼摄影摄像细节', category: 'photo', priority: 'medium' },
    { title: '准备婚礼急救包', category: 'other', priority: 'low' }
  ],
  
  twoMonths: [
    { title: '制作婚礼席位牌', category: 'guest', priority: 'medium' },
    { title: '制作婚礼桌号牌', category: 'guest', priority: 'medium' },
    { title: '确定婚礼签到方式', category: 'planner', priority: 'medium' },
    { title: '准备红包（给工作人员）', category: 'other', priority: 'high' },
    { title: '准备大额红包（给父母）', category: 'other', priority: 'high' },
    { title: '确认伴郎伴娘服装', category: 'dress', priority: 'medium' },
    { title: '安排婚礼彩排时间', category: 'planner', priority: 'high' },
    { title: '确认婚礼音乐', category: 'planner', priority: 'medium' },
    { title: '准备新郎婚礼当天造型', category: 'dress', priority: 'medium' }
  ],
  
  oneMonth: [
    { title: '婚礼彩排', category: 'planner', priority: 'high' },
    { title: '最终确认所有供应商', category: 'supplier', priority: 'high' },
    { title: '与婚庆策划最终对接', category: 'planner', priority: 'high' },
    { title: '打印婚礼流程表', category: 'planner', priority: 'medium' },
    { title: '准备新娘婚礼当天物品清单', category: 'dress', priority: 'high' },
    { title: '准备新郎婚礼当天物品清单', category: 'dress', priority: 'high' },
    { title: '安排婚礼当天接送亲友车辆', category: 'other', priority: 'medium' },
    { title: '确认蜜月行程和文件', category: 'honeymoon', priority: 'high' },
    { title: '准备婚礼第一支舞（如有）', category: 'planner', priority: 'low' },
    { title: '安排婚礼后蜜月请假事宜', category: 'honeymoon', priority: 'medium' }
  ],
  
  twoWeeks: [
    { title: '新娘美甲美睫', category: 'dress', priority: 'medium' },
    { title: '整理婚纱并检查', category: 'dress', priority: 'high' },
    { title: '整理礼服并熨烫', category: 'dress', priority: 'high' },
    { title: '确认婚礼当天时间表', category: 'planner', priority: 'high' },
    { title: '通知所有亲友婚礼安排', category: 'guest', priority: 'high' },
    { title: '准备礼金账本', category: 'other', priority: 'medium' },
    { title: '准备来宾接待处', category: 'guest', priority: 'medium' },
    { title: '确认接亲游戏道具', category: 'planner', priority: 'low' },
    { title: '准备父母感恩环节', category: 'planner', priority: 'medium' },
    { title: '预订婚礼前夜的住宿', category: 'other', priority: 'medium' }
  ],
  
  oneWeek: [
    { title: '婚礼彩排和走位', category: 'planner', priority: 'high' },
    { title: '新娘做SPA放松', category: 'dress', priority: 'low' },
    { title: '准备婚礼誓言', category: 'planner', priority: 'high' },
    { title: '整理婚礼当天衣物', category: 'dress', priority: 'high' },
    { title: '准备婚礼急救包', category: 'other', priority: 'medium' },
    { title: '确认所有红包金额', category: 'other', priority: 'high' },
    { title: '给工作人员发送最终通知', category: 'planner', priority: 'high' },
    { title: '确认婚车装饰', category: 'other', priority: 'medium' },
    { title: '准备新娘私密物品', category: 'dress', priority: 'medium' },
    { title: '确认蜜月行李', category: 'honeymoon', priority: 'medium' }
  ],
  
  threeDays: [
    { title: '新娘做头发护理', category: 'dress', priority: 'medium' },
    { title: '再次确认所有供应商', category: 'supplier', priority: 'high' },
    { title: '检查婚礼礼服合身度', category: 'dress', priority: 'high' },
    { title: '打印婚礼誓言卡', category: 'planner', priority: 'medium' },
    { title: '准备婚礼当天手机充电宝', category: 'other', priority: 'medium' },
    { title: '确认婚礼音乐U盘备份', category: 'planner', priority: 'medium' },
    { title: '准备好婚礼戒指', category: 'jewelry', priority: 'high' },
    { title: '准备好结婚证', category: 'legal', priority: 'high' }
  ],
  
  oneDay: [
    { title: '美甲做好', category: 'dress', priority: 'medium' },
    { title: '整理房间和新房', category: 'other', priority: 'high' },
    { title: '准备好婚礼当天的服装', category: 'dress', priority: 'high' },
    { title: '准备好新娘婚纱', category: 'dress', priority: 'high' },
    { title: '准备好婚礼配饰', category: 'dress', priority: 'medium' },
    { title: '准备好红包和礼金袋', category: 'other', priority: 'high' },
    { title: '准备好婚礼戒指', category: 'jewelry', priority: 'high' },
    { title: '通知婚车到达时间', category: 'other', priority: 'high' },
    { title: '确认婚礼当天时间表', category: 'planner', priority: 'high' },
    { title: '早点休息，保持充足睡眠', category: 'other', priority: 'high' }
  ],
  
  weddingDay: [
    { title: '早起洗漱，享用早餐', category: 'other', priority: 'high' },
    { title: '新娘化妆造型', category: 'dress', priority: 'high' },
    { title: '新郎整理着装', category: 'dress', priority: 'high' },
    { title: '接亲游戏环节', category: 'planner', priority: 'high' },
    { title: '出门敬茶', category: 'planner', priority: 'high' },
    { title: '外景拍摄', category: 'photo', priority: 'high' },
    { title: '到达婚宴现场', category: 'planner', priority: 'high' },
    { title: '婚礼仪式', category: 'planner', priority: 'high' },
    { title: '婚礼合影', category: 'photo', priority: 'high' },
    { title: '婚宴开始', category: 'banquet', priority: 'high' },
    { title: '敬酒环节', category: 'banquet', priority: 'high' },
    { title: '送客', category: 'guest', priority: 'high' },
    { title: '收拾物品，准备婚房', category: 'other', priority: 'medium' },
    { title: '好好休息', category: 'other', priority: 'medium' }
  ],
  
  afterWedding: [
    { title: '整理礼金', category: 'other', priority: 'high' },
    { title: '感谢亲友的帮助', category: 'guest', priority: 'medium' },
    { title: '处理婚礼剩余物品', category: 'other', priority: 'low' },
    { title: '归还租借的物品', category: 'other', priority: 'medium' },
    { title: '发送感谢短信/礼物', category: 'guest', priority: 'medium' },
    { title: '整理婚礼照片和视频', category: 'photo', priority: 'high' },
    { title: '制作婚礼相册', category: 'photo', priority: 'medium' },
    { title: '更新户口本婚姻状态', category: 'legal', priority: 'high' },
    { title: '准备蜜月出发', category: 'honeymoon', priority: 'high' },
    { title: '开始新生活！', category: 'other', priority: 'medium' }
  ]
};

const TIMELINE_INFO = [
  { id: 'twelveMonths', name: '12个月倒计时', days: 365, icon: 'calendar' },
  { id: 'tenMonths', name: '10个月倒计时', days: 300, icon: 'calendar' },
  { id: 'eightMonths', name: '8个月倒计时', days: 240, icon: 'calendar' },
  { id: 'sixMonths', name: '6个月倒计时', days: 180, icon: 'calendar' },
  { id: 'fourMonths', name: '4个月倒计时', days: 120, icon: 'calendar' },
  { id: 'threeMonths', name: '3个月倒计时', days: 90, icon: 'calendar' },
  { id: 'twoMonths', name: '2个月倒计时', days: 60, icon: 'calendar' },
  { id: 'oneMonth', name: '1个月倒计时', days: 30, icon: 'calendar' },
  { id: 'twoWeeks', name: '2周倒计时', days: 14, icon: 'calendar' },
  { id: 'oneWeek', name: '1周倒计时', days: 7, icon: 'calendar' },
  { id: 'threeDays', name: '3天倒计时', days: 3, icon: 'calendar' },
  { id: 'oneDay', name: '婚礼前一天', days: 1, icon: 'star' },
  { id: 'weddingDay', name: '婚礼当天', days: 0, icon: 'heart' },
  { id: 'afterWedding', name: '婚礼之后', days: -1, icon: 'gift' }
];

const BUDGET_TEMPLATES = [
  {
    id: 'economy',
    name: '经济型婚礼',
    total: 100000,
    categories: {
      venue: 30000,
      planner: 15000,
      photo: 8000,
      dress: 8000,
      jewelry: 10000,
      banquet: 20000,
      other: 14000
    }
  },
  {
    id: 'standard',
    name: '标准型婚礼',
    total: 200000,
    categories: {
      venue: 60000,
      planner: 30000,
      photo: 15000,
      dress: 15000,
      jewelry: 20000,
      banquet: 40000,
      other: 20000
    }
  },
  {
    id: 'luxury',
    name: '豪华型婚礼',
    total: 500000,
    categories: {
      venue: 150000,
      planner: 80000,
      photo: 40000,
      dress: 40000,
      jewelry: 50000,
      banquet: 100000,
      other: 40000
    }
  }
];

module.exports = {
  WEDDING_CHECKLISTS,
  TIMELINE_INFO,
  BUDGET_TEMPLATES
};
