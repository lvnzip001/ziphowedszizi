const sharp = require('sharp');

function hex(h){ return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]; }

async function duotone(inputPath, darkHex, lightHex, outPath) {
  const [dr,dg,db] = hex(darkHex);
  const [lr,lg,lb] = hex(lightHex);
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const lum = (data[i] + data[i+1] + data[i+2]) / 3 / 255;
    out[i]   = Math.round(dr + (lr - dr) * lum);
    out[i+1] = Math.round(dg + (lg - dg) * lum);
    out[i+2] = Math.round(db + (lb - db) * lum);
    out[i+3] = data[i+3];
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(outPath);
  console.log(outPath, 'done', info.width, info.height);
}

(async () => {
  await duotone('icon-src.png', '#6B4E28', '#C9A66B', 'couple-gold.png');       // hero, on champagne
  await duotone('icon-src.png', '#B99F76', '#FBF8F3', 'couple-champagne.png');  // footer, on charcoal
  await duotone('icon-src.png', '#3A2E22', '#A8824F', 'couple-favicon.png');    // favicon/apple-touch, on ivory
})();
