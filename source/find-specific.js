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
    offers.push({ id, name: nameM[1], pictures });
  }
}

// Search for specific keywords
const searches = [
  'спейс', 'кресло соло', 'тумба соло', 'норд обед', 'класс-дет',
  'оскар', 'виктория', 'василиса', 'простой', 'панда', 'аля'
];

for (const term of searches) {
  const found = offers.filter(o => o.name.toLowerCase().includes(term.toLowerCase()));
  console.log(`\n--- "${term}" (${found.length} results) ---`);
  found.forEach(o => {
    console.log(`  [${o.id}] ${o.name} — ${o.pictures.length} pics`);
    if (o.pictures.length > 0) console.log(`    ${o.pictures[0]}`);
  });
}

// Also list ALL "Соло" products
console.log('\n--- ALL "Соло" products ---');
offers.filter(o => o.name.toLowerCase().includes('соло')).forEach(o => {
  console.log(`  [${o.id}] ${o.name} — ${o.pictures[0] || 'no pics'}`);
});

// List ALL "Малевич"
console.log('\n--- ALL "Малевич" products ---');
offers.filter(o => o.name.toLowerCase().includes('малевич')).forEach(o => {
  console.log(`  [${o.id}] ${o.name} — ${o.pictures[0] || 'no pics'}`);
});

// List ALL "Норд"
console.log('\n--- ALL "Норд" products ---');
offers.filter(o => o.name.toLowerCase().includes('норд')).forEach(o => {
  console.log(`  [${o.id}] ${o.name} — ${o.pictures[0] || 'no pics'}`);
});

// List ALL "Стрит"
console.log('\n--- ALL "Стрит" products ---');
offers.filter(o => o.name.toLowerCase().includes('стрит')).forEach(o => {
  console.log(`  [${o.id}] ${o.name} — ${o.pictures[0] || 'no pics'}`);
});
