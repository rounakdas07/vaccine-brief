import test from 'node:test';
import assert from 'node:assert/strict';
import {STUDIES,SOURCES,VISTA,REVIEWED} from '../data.mjs';
import {fromHash,briefText,allBriefs,csvText,differences} from '../core.mjs';
test('Every evidence record has a unique id and traceable primary sources',()=>{
 assert.equal(new Set(STUDIES.map(s=>s.id)).size,STUDIES.length);
 for(const s of STUDIES){assert(s.sourceIds.length);for(const id of s.sourceIds){assert(SOURCES[id],`${s.id}: ${id}`);assert.equal(new URL(SOURCES[id].url).protocol,'https:');assert(SOURCES[id].locator);assert(SOURCES[id].access);}}
});
test('Missing VISTA results remain missing, not a zero-event result',()=>{
 assert.match(VISTA.result,/No clinical outcome results identified/);assert.match(VISTA.nLabel,/planned/);for(const s of STUDIES){const text=briefText(s);assert(text.includes(VISTA.result));assert(text.includes(VISTA.discrepancy));}
});
test('Exports preserve the analysis population, uncertainty, caveat and source kind',()=>{
 for(const s of STUDIES){const text=briefText(s);for(const value of [s.denominator,s.interval,s.followup,s.caution,s.kind,REVIEWED])assert(text.includes(value),`${s.id} omits ${value}`);for(const id of s.sourceIds)assert(text.includes(SOURCES[id].url));}
});
test('Phase 3 brief uses ITT estimate, not the more favourable mITT estimate',()=>{
 const s=STUDIES.find(s=>s.id==='interpath');assert.equal(s.metric,'0.58');assert.match(s.denominator,/intention-to-treat/);assert.match(s.caution,/modified-ITT/);assert.equal(s.kind,'Sponsor report');
});
test('TG4050 denominator exclusion is inseparable from its brief',()=>{
 const s=STUDIES.find(s=>s.id==='tg4050');assert.match(s.design,/33 randomised/);assert.match(s.design,/32.*per-protocol/);assert.match(briefText(s),/relapsed after two doses/);assert.match(s.denominator,/not all 33/);
});
test('Pancreatic responder analysis is not labelled randomised',()=>{
 const s=STUDIES.find(s=>s.id==='pancreas');assert.equal(s.randomised,false);assert.match(briefText(s),/association within a treated cohort/);assert.match(s.denominator,/no randomised/);
});
test('Unknown or malicious hash input cannot create a study or inject content',()=>{
 for(const h of ['#study=unknown','#study=%3Cscript%3E','#study=%ZZ','#',''])assert.equal(fromHash(h).id,STUDIES[0].id);
 assert.equal(fromHash('#study=tg4050').id,'tg4050');
});
test('Comparison retains both regimens and separates result from study plan',()=>{
 for(const s of STUDIES){const rows=differences(s);assert(rows.some(row=>row[1]===s.regimen&&row[2]===VISTA.regimen));assert(rows.some(row=>row[1]===s.design&&row[2]===VISTA.design));}
});
test('CSV round-trip keeps columns aligned and caveats intact',()=>{
 const rows=csvText().trim().split('\r\n').map(row=>[...row.matchAll(/"((?:[^"]|"")*)"(?:,|$)/g)].map(m=>m[1].replaceAll('""','"')));
 assert.equal(rows.length,STUDIES.length+1);assert(rows.every(row=>row.length===15));for(const [i,s]of STUDIES.entries()){assert.equal(rows[i+1][0],s.name);assert(rows[i+1][12].includes(s.caution));assert(rows[i+1][13].includes(SOURCES[s.sourceIds[0]].url));}
});
test('Full pack includes negative evidence and limits for every comparator',()=>{
 const text=allBriefs();for(const s of STUDIES)assert(text.includes(`# ${s.name}`));assert(text.includes('did not demonstrate'));assert.equal(text.match(/No head-to-head comparison/g).length,STUDIES.length);
});
