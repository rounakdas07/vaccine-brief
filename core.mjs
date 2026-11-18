import {STUDIES, VISTA, SOURCES, REVIEWED} from './data.mjs';
export const getStudy = id => STUDIES.find(s => s.id === id) || STUDIES[0];
export function fromHash(hash) { return getStudy(new URLSearchParams(String(hash).replace(/^#/, '')).get('study')); }
export function differences(s) {
 return [
 ['Patients', s.population, VISTA.population],
 ['Vaccine approach', s.platform, VISTA.platform],
 ['Timing', s.timing, VISTA.timing],
 ['Treatment comparison', s.regimen, VISTA.regimen],
 ['Study design', s.design, VISTA.design],
 ['Main evidence shown', s.endpoint, VISTA.endpoint]
 ];
}
export function sourceText(id) { const s=SOURCES[id]; return `${s.title} — ${s.publisher}\n${s.kind} | ${s.date}\n${s.url}\nLocation: ${s.locator}\nAccess: ${s.access}`; }
export function briefText(s) {
 return `# ${s.name} — comparison with VISTA\n\nVaccine Brief | Rounak Das | Evidence reviewed ${REVIEWED}\nIndependent research prototype. Not affiliated with Infinitopes.\n\n## Reported evidence\n${s.product} | ${s.phase} | ${s.kind}\n${s.population}\n${s.metricLabel}: ${s.metric}\n${s.interval}\nPopulation: ${s.denominator}\nFollow-up: ${s.followup}\n${s.finding}\n\n## Before quoting this result\n${s.cautionTitle}\n${s.caution}\n\n## Interpretation for a VISTA discussion (author appraisal)\n${s.implication}\n${s.takeHome}\n\n## Design differences\n${differences(s).map(([k,a,b])=>`${k}\n  ${s.name}: ${a}\n  VISTA: ${b}`).join('\n\n')}\n\n## VISTA evidence maturity\n${VISTA.nLabel}. ${VISTA.result}\n${VISTA.milestone}\nSource reconciliation: ${VISTA.discrepancy}\n\n## Question for the team\n${s.question}\n\n## Sources\n${[...new Set([...s.sourceIds,...VISTA.sourceIds])].map(sourceText).join('\n\n')}\n\n## Scope and limits\nFive selected comparator studies plus the VISTA reference; not a systematic review or a complete market landscape. No head-to-head comparison, pooled effect estimate or efficacy ranking is valid from this display. Follow-up, endpoints, populations and analysis sets differ. Hazard ratios are not absolute risk reductions. RFS/DFS are not overall survival. No outcome, recruitment or approval status is monitored live. Recheck original sources and current protocols before external use.\n\nPrepared with AI-assisted research and development; clinical review is required before professional use.\n`;
}
export function allBriefs() { return `# Vaccine Brief — selected evidence pack\n\nReviewed ${REVIEWED}. Five comparator studies; one VISTA reference.\n\n${STUDIES.map(briefText).join('\n\n---\n\n')}`; }
export function csvText() {
 const headers=['study','product','phase','source_type','population','timing','regimen','analysis_population','metric','metric_value','uncertainty','followup','caveat','source_urls','reviewed'];
 const cell=v => { let t=String(v??''); if (/^[=+@\-\t\r]/.test(t)) t="'"+t; return '"'+t.replaceAll('"','""')+'"'; };
 return [headers,...STUDIES.map(s=>[s.name,s.product,s.phase,s.kind,s.population,s.timing,s.regimen,s.denominator,s.metricLabel,s.metric,s.interval,s.followup,`${s.cautionTitle} ${s.caution}`,s.sourceIds.map(id=>SOURCES[id].url).join(' | '),REVIEWED])].map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
}
