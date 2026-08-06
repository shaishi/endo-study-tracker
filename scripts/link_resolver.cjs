const fs = require('fs');
const path = require('path');
const https = require('https');

const SOURCE_PATH = '/Users/shai_shilo/Library/Application Support/Claude/local-agent-mode-sessions/ac69fa4c-7645-4a40-b48a-6d5c79aeb736/2d87e535-8983-4fb7-a48a-c75305e0e6bd/local_c6d2a4cf-6b34-4a31-8d6f-a69288446744/outputs/endo_data.json';
const OUTPUT_DATA_PATH = path.join(__dirname, '../src/data/endo_data.json');
const OUTPUT_REPORT_PATH = path.join(__dirname, '../link_resolution_report.json');

// Ensure target directories exist
fs.mkdirSync(path.dirname(OUTPUT_DATA_PATH), { recursive: true });

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'EndoTrackerResolver/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function cleanCitationForQuery(citation) {
  // Remove volume/issue info, page numbers, trailing dots
  let cleaned = citation
    .replace(/Vol\.\d+/gi, '')
    .replace(/Issue\d+/gi, '')
    .replace(/pp?\.\s*\d+-\d+/gi, '')
    .replace(/\[.*?\]/g, '')
    .replace(/[–—]/g, '-')
    .trim();
  
  // Extract potential title after hyphen or colon if present
  const parts = cleaned.split(/\s*[-–—]\s*/);
  if (parts.length > 1 && parts[1].length > 15) {
    cleaned = parts[1];
  }
  return cleaned.substring(0, 120);
}

function getGoogleScholarUrl(citation) {
  const query = citation.replace(/\s+/g, ' ').trim();
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
}

function getPubMedSearchUrl(citation) {
  const query = cleanCitationForQuery(citation);
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`;
}

async function resolveLinks() {
  console.log('Loading source data...');
  const rawData = fs.readFileSync(SOURCE_PATH, 'utf8');
  const data = JSON.parse(rawData);

  const report = {
    total_items: data.literature.length,
    direct_pmid_found: 0,
    fallback_search_used: 0,
    manual_placeholders: 0,
    items: []
  };

  console.log(`Processing ${data.literature.length} literature items...`);

  for (let i = 0; i < data.literature.length; i++) {
    const item = data.literature[i];
    const citation = item.citation;
    const cleanQuery = cleanCitationForQuery(citation);
    
    let resolvedLink = '';
    let resolutionType = '';
    let pmid = null;

    // Layer B: Try PubMed E-Utilities search
    try {
      const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(cleanQuery)}&retmode=json&retmax=1`;
      const searchRes = await fetchJson(searchUrl);
      
      if (searchRes && searchRes.esearchresult && searchRes.esearchresult.idlist && searchRes.esearchresult.idlist.length > 0) {
        pmid = searchRes.esearchresult.idlist[0];
        resolvedLink = `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
        resolutionType = 'direct_pmid';
        report.direct_pmid_found++;
      }
    } catch (err) {
      // API lookup failed or offline, fall back to Layer A
    }

    // Layer A fallback if no PMID found
    if (!resolvedLink) {
      // Check if it's a guideline document or organizational statement that might need manual upload
      if (item.type === 'guideline' && (citation.includes('AAE') || citation.includes('ESE') || citation.includes('AAOMS'))) {
        resolvedLink = getPubMedSearchUrl(citation);
        resolutionType = 'fallback_search_guideline';
        report.fallback_search_used++;
      } else {
        resolvedLink = getPubMedSearchUrl(citation);
        resolutionType = 'fallback_search_pubmed';
        report.fallback_search_used++;
      }
    }

    // Set enriched link field
    item.link = resolvedLink;
    item.link_type = resolutionType;
    if (pmid) item.pmid = pmid;

    report.items.push({
      id: item.id,
      category: item.category,
      citation: citation,
      resolved_link: resolvedLink,
      resolution_type: resolutionType,
      pmid: pmid || null
    });

    // Small delay to be polite to NCBI API
    if (i % 5 === 0) {
      process.stdout.write(`\rResolved ${i + 1}/${data.literature.length} items... (${report.direct_pmid_found} PMIDs found)`);
      await new Promise(res => setTimeout(res, 80));
    }
  }

  console.log(`\nResolution complete!`);
  console.log(`- Direct PubMed IDs found: ${report.direct_pmid_found}`);
  console.log(`- Fallback search links generated: ${report.fallback_search_used}`);

  // Write outputs
  fs.writeFileSync(OUTPUT_DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  fs.writeFileSync(OUTPUT_REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Saved enriched data to ${OUTPUT_DATA_PATH}`);
  console.log(`Saved report to ${OUTPUT_REPORT_PATH}`);
}

resolveLinks().catch(err => {
  console.error('Error resolving links:', err);
  process.exit(1);
});
