const fs = require('fs');
const path = require('path');

// 创建简单的81x81 PNG图标（纯色方块作为占位符）
function createSimplePNG(width, height, r, g, b) {
  // PNG文件结构
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);  // width
  ihdrData.writeUInt32BE(height, 4); // height
  ihdrData.writeUInt8(8, 8);         // bit depth
  ihdrData.writeUInt8(6, 9);         // color type (RGBA)
  ihdrData.writeUInt8(0, 10);        // compression
  ihdrData.writeUInt8(0, 11);        // filter
  ihdrData.writeUInt8(0, 12);        // interlace
  
  const ihdrCrc = crc32(Buffer.concat([Buffer.from('IHDR'), ihdrData]));
  const ihdr = Buffer.concat([
    Buffer.from([0x00, 0x00, 0x00, 0x0D]), // length
    Buffer.from('IHDR'),
    ihdrData,
    ihdrCrc
  ]);
  
  // IDAT chunk - 创建原始图像数据
  const rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0); // filter byte
    for (let x = 0; x < width; x++) {
      // 创建简单的圆形图标效果
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = width / 2 - 10;
      const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      
      if (dist < radius) {
        rawData.push(r, g, b, 255); // 圆内：彩色
      } else if (dist < radius + 3) {
        rawData.push(r - 30, g - 30, b - 30, 255); // 边缘
      } else {
        rawData.push(0, 0, 0, 0); // 圆外：透明
      }
    }
  }
  
  // 简单压缩（使用deflate原始格式）
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(Buffer.from(rawData));
  
  const idatCrc = crc32(Buffer.concat([Buffer.from('IDAT'), compressed]));
  const idatLength = Buffer.alloc(4);
  idatLength.writeUInt32BE(compressed.length, 0);
  const idat = Buffer.concat([
    idatLength,
    Buffer.from('IDAT'),
    compressed,
    idatCrc
  ]);
  
  // IEND chunk
  const iendCrc = crc32(Buffer.from('IEND'));
  const iend = Buffer.concat([
    Buffer.from([0x00, 0x00, 0x00, 0x00]),
    Buffer.from('IEND'),
    iendCrc
  ]);
  
  return Buffer.concat([signature, ihdr, idat, iend]);
}

// CRC32计算
function crc32(data) {
  let crc = 0xFFFFFFFF;
  const table = [];
  
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  
  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  
  const result = Buffer.alloc(4);
  result.writeUInt32BE((crc ^ 0xFFFFFFFF) >>> 0, 0);
  return result;
}

// 创建图标
const iconsDir = path.join(__dirname, 'assets', 'icons');

// 确保目录存在
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 普通状态图标 - 灰色
const normalColor = { r: 153, g: 153, b: 153 };
// 选中状态图标 - 玫瑰金
const activeColor = { r: 232, g: 180, b: 184 };

const iconNames = [
  { name: 'home', color: normalColor },
  { name: 'home-active', color: activeColor },
  { name: 'todo', color: normalColor },
  { name: 'todo-active', color: activeColor },
  { name: 'calendar', color: normalColor },
  { name: 'calendar-active', color: activeColor },
  { name: 'budget', color: normalColor },
  { name: 'budget-active', color: activeColor },
  { name: 'settings', color: normalColor },
  { name: 'settings-active', color: activeColor }
];

iconNames.forEach(icon => {
  const png = createSimplePNG(81, 81, icon.color.r, icon.color.g, icon.color.b);
  const filepath = path.join(iconsDir, `${icon.name}.png`);
  fs.writeFileSync(filepath, png);
  console.log(`Created: ${filepath}`);
});

console.log('\nAll icons created successfully!');
