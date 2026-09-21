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

// Search for remaining problem products
const searches = [
  'кресло', 'детский комод', 'детский диван', 'обеденный стол',
  'обеденная', 'обед', 'кухонный', 'стол обеденный',
  'тумба тв', 'тумба под телевизор', 'столик тв'
];

for (const term of searches) {
  const found = offers.filter(o => o.name.toLowerCase().includes(term.toLowerCase()));
  console.log(`\n--- "${term}" (${found.length}) ---`);
  found.slice(0, 5).forEach(o => {
    console.log(`  [${o.id}] ${o.name}`);
    if (o.pictures[0]) console.log(`    ${o.pictures[0]}`);
  });
}

// Specifically look for children's products
console.log('\n--- ALL "детск" products with pics ---');
offers.filter(o => o.name.toLowerCase().includes('детск') && o.pictures.length > 0).forEach(o => {
  console.log(`  [${o.id}] ${o.name}`);
});
