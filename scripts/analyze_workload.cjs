const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/endo_data.json'), 'utf8'));

console.log('=== WORKLOAD ANALYSIS PER WEEK ===');
let totalArticles = 0;

data.weeks.forEach(w => {
  const articleCount = w.article_ids ? w.article_ids.length : 0;
  totalArticles += articleCount;
  console.log(`Week ${w.week} (${w.dates}): ${w.topic}`);
  console.log(`   Book Ref: ${w.book_ref}`);
  console.log(`   Articles Count: ${articleCount}`);
  console.log(`   Total Units (Articles + Book Chapter): ${articleCount + 1}`);
  console.log('----------------------------------------------------');
});

console.log(`Total Articles Assigned to Weeks: ${totalArticles}`);
console.log(`Total Literature Database Items: ${data.literature.length}`);
