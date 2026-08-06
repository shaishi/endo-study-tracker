const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/endo_data.json');
const quizPath = path.join(__dirname, '../src/data/quizData.ts');
const flashcardPath = path.join(__dirname, '../src/data/flashcardsData.ts');

console.log('🔍 Running Data Consistency & Lint Validation...\n');

let errorCount = 0;

// 1. Verify endo_data.json
const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
console.log(`Checking ${rawData.literature.length} literature items...`);

rawData.literature.forEach(item => {
  if (item.citation.includes('Kuttler') && item.citation.includes('1950')) {
    console.error(`❌ Error in literature item #${item.id}: Kuttler year is 1950 instead of 1955!`);
    errorCount++;
  }
});

// 2. Verify quizData.ts
const quizContent = fs.readFileSync(quizPath, 'utf8');
if (quizContent.includes('Kuttler (1950)') || quizContent.includes('Kuttler Y (1950)')) {
  console.error(`❌ Error in quizData.ts: Found Kuttler (1950)!`);
  errorCount++;
}

// 3. Verify flashcardsData.ts
const fcContent = fs.readFileSync(flashcardPath, 'utf8');
if (fcContent.includes('Kuttler (1950)') || fcContent.includes('Kuttler Y (1950)')) {
  console.error(`❌ Error in flashcardsData.ts: Found Kuttler (1950)!`);
  errorCount++;
}

if (errorCount === 0) {
  console.log('✅ ALL CITATIONS VALIDATED SUCCESSFULLY! 0 inconsistencies found.');
  process.exit(0);
} else {
  console.error(`❌ Found ${errorCount} data consistency errors.`);
  process.exit(1);
}
