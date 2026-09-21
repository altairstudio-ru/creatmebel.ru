const fs = require('fs');
const xml = fs.readFileSync('K:\\creatmebel-ru-20\\prototype\\source\\products.xml', 'utf8');

const offers = [];
const offerRegex = /<offer\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/offer>/g;
let m;
while ((m = offerRegex.exec(xml)) !== null) {
  const id = m[1];
  const body = m[2];
  const nameM = body.match(/<name>([^<]+)<\/name>/);
  const picsM = body.match(/<picture>([^<]+)<\/picture>/g);
  const pictures = picsM ? picsM.map(p => p.replace(/<\/?picture>/g, '')) : [];
  if (nameM && pictures.length > 0) {
    offers.push({ id, name: nameM[1], pictures: pictures.slice(0, 3) });
  }
}

console.log('Total offers with photos:', offers.length);

// Our 15 SKU slugs to match
const skuSlugs = [
  'divan-evroknizhka-oskar',
  'divan-akkordeon-space-2',
  'divan-uglovoy-richards',
  'divan-uglovoy-lotter',
  'divan-detskiy-yulechka-100-5',
  'kreslo-solo',
  'shkaf-kupe-premium-3',
  'shkaf-kupe-trend-m',
  'komod-street-3',
  'tumba-pod-tv-solo',
  'prihozhaya-malevich-5',
  'krovat-trento-1',
  'krovat-fokus',
  'obedennaya-gruppa-nord',
  'komod-detskiy-klass-det'
];

const skuNames = [
  'Диван еврокнижка «Оскар»',
  'Диван-аккордеон «Спейс-2»',
  'Диван угловой «Ричардс»',
  'Диван угловой «Лофтер»',
  'Диван детский «Юлечка 100-5 МП»',
  'Кресло «Соло»',
  'Шкаф-купе «Премиум-3»',
  'Шкаф-купе «Тренд-М»',
  'Комод «Стрит-3»',
  'Тумба под ТВ «Соло»',
  'Прихожая «Малевич-5»',
  'Кровать «Тренто-1»',
  'Кровать «Фокус»',
  'Обеденная группа «Норд»',
  'Комод детский «Класс-Дет»'
];

// Simple name similarity: check if key words from our name appear in YML name
function normalize(s) {
  return s.toLowerCase()
    .replace(/[«»"'\.\,\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function similarity(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  const wordsA = na.split(' ').filter(w => w.length > 2);
  let matches = 0;
  for (const w of wordsA) {
    if (nb.includes(w)) matches++;
  }
  return wordsA.length > 0 ? matches / wordsA.length : 0;
}

const results = [];

for (let i = 0; i < skuSlugs.length; i++) {
  const slug = skuSlugs[i];
  const ourName = skuNames[i];
  
  let bestOffer = null;
  let bestScore = 0;
  
  for (const offer of offers) {
    const score = similarity(ourName, offer.name);
    if (score > bestScore) {
      bestScore = score;
      bestOffer = offer;
    }
  }
  
  if (bestOffer && bestScore >= 0.3) {
    results.push({
      slug,
      ourName,
      matchedName: bestOffer.name,
      matchScore: Math.round(bestScore * 100) + '%',
      ymlId: bestOffer.id,
      pictures: bestOffer.pictures
    });
  } else {
    results.push({
      slug,
      ourName,
      matchedName: null,
      matchScore: '0%',
      ymlId: null,
      pictures: []
    });
  }
}

console.log('\n=== MATCHING RESULTS ===');
results.forEach(r => {
  const status = r.matchedName ? '✅' : '❌';
  console.log(`${status} ${r.slug}`);
  if (r.matchedName) {
    console.log(`   YML: ${r.matchedName} (${r.matchScore})`);
    console.log(`   Pics: ${r.pictures.length} — ${r.pictures[0]}`);
  } else {
    console.log(`   NO MATCH FOUND`);
  }
});

// Save JSON for data.js update
fs.writeFileSync('K:\\creatmebel-ru-20\\prototype\\source\\image-map.json', JSON.stringify(results, null, 2));
console.log('\nSaved to image-map.json');
