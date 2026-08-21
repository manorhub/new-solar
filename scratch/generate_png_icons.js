import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

// CRC32 calculation table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function writeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  
  const crcBuf = Buffer.alloc(4 + len);
  buf.copy(crcBuf, 0, 4, 8 + len);
  const crcVal = crc32(crcBuf);
  buf.writeUInt32BE(crcVal, 8 + len);
  return buf;
}

function createSolarIconPng(size) {
  const width = size;
  const height = size;
  const scanlines = Buffer.alloc((width * 4 + 1) * height);
  
  const center = size / 2;
  const sunRadius = size * 0.22;
  const gridOuterRadius = size * 0.44;
  
  let offset = 0;
  for (let y = 0; y < height; y++) {
    scanlines[offset++] = 0; // Filter byte: 0 (None)
    for (let x = 0; x < width; x++) {
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Default Background: Deep Slate Blue (#0f172a)
      let r = 15, g = 23, b = 42, a = 255;
      
      // Rounded corner container shape
      const cornerRadius = size * 0.22;
      const inX = Math.abs(x - center) > (center - cornerRadius);
      const inY = Math.abs(y - center) > (center - cornerRadius);
      if (inX && inY) {
        const cx = Math.abs(x - center) - (center - cornerRadius);
        const cy = Math.abs(y - center) - (center - cornerRadius);
        if (Math.sqrt(cx * cx + cy * cy) > cornerRadius) {
          a = 0; // Transparent outside rounded container
        }
      }

      if (a > 0) {
        // Golden Sun Disc (#f59e0b)
        if (dist <= sunRadius) {
          r = 245; g = 158; b = 11; // Amber Gold
        } else if (dist <= sunRadius + size * 0.04) {
          // Glow ring
          r = 251; g = 191; b = 36;
        } else {
          // Solar panel grid pattern lines
          const isHorizontalLine = Math.abs(dy) % (size * 0.12) < (size * 0.018);
          const isVerticalLine = Math.abs(dx) % (size * 0.12) < (size * 0.018);
          
          if ((isHorizontalLine || isVerticalLine) && dist <= gridOuterRadius) {
            r = 56; g = 189; b = 248; // Bright Cyan Grid Lines (#38bdf8)
          } else if (dist <= gridOuterRadius) {
            // Solar Cell Panel Blue (#1e293b / #0284c7)
            r = 2, g = 132, b = 199;
          }
        }
      }

      scanlines[offset++] = r;
      scanlines[offset++] = g;
      scanlines[offset++] = b;
      scanlines[offset++] = a;
    }
  }

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type 6 (RGBA)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  
  const ihdrChunk = writeChunk('IHDR', ihdr);
  const idatCompressed = zlib.deflateSync(scanlines);
  const idatChunk = writeChunk('IDAT', idatCompressed);
  const iendChunk = writeChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.join(process.cwd(), 'public');

const sizes = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-16x16.png', size: 16 },
];

for (const s of sizes) {
  const pngBuf = createSolarIconPng(s.size);
  const filePath = path.join(publicDir, s.name);
  fs.writeFileSync(filePath, pngBuf);
  console.log(`Generated PNG Icon: ${s.name} (${s.size}x${s.size}, ${pngBuf.length} bytes)`);
}
