export const REVIEWED = '2026-11-18';
export const SOURCES = {
 vistaRegistry: { title: 'VISTA · ISRCTN12981444', publisher: 'ISRCTN', kind: 'Trial registry', date: 'Record edited 16 Apr 2026', url: 'https://www.isrctn.com/pdf/ISRCTN12981444', locator: 'Pages 3–5: design, intervention and outcomes', access: 'Registry PDF reviewed' },
 vistaUpdate: { title: 'ITOP1 first patient dosed', publisher: 'Infinitopes', kind: 'Sponsor announcement', date: '23 Jul 2026', url: 'https://www.infinitopes.com/news/infinitopes-doses-first-patient-with-precision-off-the-shelf-therapeutic-cancer-vaccine-itop1', locator: 'VISTA design; Phase 1 lead-in and planned readout', access: 'Full announcement reviewed' },
 interpath: { title: 'Recapping the Phase 3 INTerpath-001 Results', publisher: 'Moderna', kind: 'Sponsor report', date: '24 Oct 2026', url: 'https://www.modernatx.com/en-US/recapping-the-phase-three-interpath-results', locator: '“A Closer Look”: ITT analysis and follow-up', access: 'Full sponsor report reviewed; journal article not independently reviewed' },
 keynote: { title: 'KEYNOTE-942 · five-year update', publisher: 'Khattak et al. · Journal of Clinical Oncology', kind: 'Journal publication', date: '2026 · five-year analysis', url: 'https://ascopubs.org/doi/10.1200/JCO-26-00835', locator: 'Abstract: Methods and Results', access: 'Indexed primary-paper abstract reviewed; full publisher page was inaccessible' },
 tg4050: { title: 'Adjuvant TG4050 in resected head and neck cancer', publisher: 'Nature Communications · 17, 9863', kind: 'Journal publication', date: '2026 · Phase 1 report', url: 'https://www.nature.com/articles/s41467-026-76667-1', locator: 'Results → Clinical outcomes; Methods → Efficacy', access: 'Indexed primary-paper sections reviewed; direct publisher page was inaccessible' },
 tgAbstract: { title: 'TG4050 · ASCO 2025 abstract 6016', publisher: 'Le Tourneau et al. · ASCO', kind: 'Conference abstract', date: '2025', url: 'https://www.asco.org/abstracts-presentations/243809', locator: 'Results: 33 randomised, 17 immediate / 16 deferred', access: 'Indexed primary abstract reviewed' },
 pancreas: { title: 'RNA neoantigen vaccines prime long-lived CD8+ T cells in pancreatic cancer', publisher: 'Sethna et al. · Nature 639, 1042–1051', kind: 'Journal publication', date: '19 Feb 2025', url: 'https://doi.org/10.1038/s41586-024-08508-4', locator: 'Abstract and opening Results; NCT04161755', access: 'Indexed primary-paper abstract and sections reviewed' },
 magrit: { title: 'MAGRIT · adjuvant MAGE-A3 in resected NSCLC', publisher: 'Vansteenkiste et al. · The Lancet Oncology', kind: 'Journal publication', date: 'Jun 2016', url: 'https://pubmed.ncbi.nlm.nih.gov/27132212/', locator: 'Abstract: Methods and Findings', access: 'Indexed primary-paper abstract reviewed' }
};
export const VISTA = {
 id: 'vista', name: 'VISTA', product: 'ITOP1', phase: 'Phase 1/2a',
 population: 'Resectable oesophageal / gastro-oesophageal junction adenocarcinoma',
 timing: 'Prime before surgery; boost after surgery',
 platform: 'Shared antigens · viral vector',
 regimen: 'Alongside perioperative standard care; saline control in Phase 2a',
 design: '8-person safety lead-in, then 52 planned in a 3:1 randomised comparison',
 endpoint: 'Primary: safety and tolerability. Immunogenicity and preliminary efficacy are secondary.',
 n: 60, nLabel: '60 planned; not an outcomes denominator',
 result: 'No clinical outcome results identified in the sources reviewed.',
 milestone: 'First patient dosed announced in July 2026; sponsor anticipated initial safety and immunological data from early 2027.',
 sourceIds: ['vistaRegistry', 'vistaUpdate'],
 discrepancy: 'The April registry describes FLOT chemotherapy; the July company update also describes durvalumab. Confirm the applicable protocol version before quoting the treatment backbone. Registry recruitment metadata and company milestones are not reconciled here; this is not a live recruitment tracker.'
};
export const STUDIES = [
 {
 id: 'interpath', name: 'INTerpath-001', product: 'Intismeran autogene · V940', indication: 'Melanoma', phase: 'Phase 3', kind: 'Sponsor report', year: '2026', category: 'Randomised efficacy',
 population: 'Completely resected stage IIB–IV melanoma', platform: 'Individualised antigens · mRNA', timing: 'After surgery', regimen: 'Vaccine + pembrolizumab vs placebo + pembrolizumab', design: 'Randomised, double-blind; 1,137 patients', endpoint: 'Recurrence-free survival (RFS)',
 metric: '0.58', metricLabel: 'RFS hazard ratio', interval: '95% CI 0.45–0.75', denominator: '1,137 patients · intention-to-treat', followup: '24.6 months median follow-up',
 finding: 'Moderna reports a lower hazard of recurrence or death with vaccine + pembrolizumab versus the control regimen.',
 cautionTitle: '42% is a relative hazard reduction.', caution: 'It is not a 42-percentage-point absolute benefit. This brief uses the ITT estimate; the sponsor separately reports a more favourable modified-ITT estimate.',
 implication: 'Useful evidence for the cancer-vaccine field. It does not establish ITOP1 efficacy or show that shared antigens outperform individualised vaccines.',
 question: 'Which VISTA data would be needed to support a claim in oesophageal cancer, beyond the melanoma precedent?',
 takeHome: 'A positive randomised melanoma result is a field precedent, not a transferable effect size for ITOP1.',
 evidence: 'Sponsor-reported Phase 3 analysis', hasResults: true, randomised: true, sourceIds: ['interpath'],
 flags: ['Different cancer', 'Different timing', 'Different platform', 'Checkpoint-inhibitor combination']
 },
 {
 id: 'keynote', name: 'KEYNOTE-942', product: 'Intismeran autogene · V940', indication: 'Melanoma', phase: 'Phase 2b', kind: 'Journal publication', year: '2026', category: 'Longer follow-up',
 population: 'Resected high-risk stage III/IV melanoma', platform: 'Individualised antigens · mRNA', timing: 'After surgery', regimen: 'Vaccine + pembrolizumab vs pembrolizumab alone', design: 'Randomised; 157 patients (107 vs 50)', endpoint: 'Recurrence-free survival (RFS)',
 metric: '0.510', metricLabel: 'RFS hazard ratio', interval: '95% CI 0.294–0.887', denominator: '157 randomised · 107 combination / 50 control', followup: '60.3 months median planned follow-up',
 finding: 'The five-year update reports continued separation in RFS for the combination. The analyses were descriptive.',
 cautionTitle: 'Long follow-up does not make every endpoint conclusive.', caution: 'The overall-survival estimate had a confidence interval spanning 1. Do not convert a recurrence finding into a proven survival benefit.',
 implication: 'A useful durability reference for discussions about follow-up. Its population, platform and pembrolizumab backbone differ from VISTA.',
 question: 'Which immune and recurrence follow-up measures should remain visible alongside an early VISTA safety readout?',
 takeHome: 'The five-year melanoma update informs durability discussions, with descriptive analyses and uncertain overall survival.',
 evidence: 'Peer-reviewed five-year update', hasResults: true, randomised: true, sourceIds: ['keynote'],
 flags: ['Different cancer', 'Different timing', 'Different platform', 'Descriptive follow-up analysis']
 },
 {
 id: 'tg4050', name: 'TG4050 · Phase 1', product: 'TG4050', indication: 'Head & neck cancer', phase: 'Phase 1', kind: 'Journal publication', year: '2026', category: 'Denominator check',
 population: 'Resected HPV-negative head and neck squamous cell carcinoma', platform: 'Individualised antigens · MVA viral vector', timing: 'After surgery and adjuvant treatment', regimen: 'Immediate vaccination vs observation with vaccination offered at relapse', design: '33 randomised (17 vs 16); 32 in the reported per-protocol analysis', endpoint: 'Early safety / feasibility; exploratory disease-free survival',
 metric: '0 / 16', metricLabel: 'Relapses in the immediate-vaccine per-protocol group', interval: 'Control group: 3 / 16', denominator: 'Per-protocol analysis · not all 33 randomised patients', followup: '30 months median; no additional relapses at 41-month update',
 finding: 'The reported per-protocol analysis found no relapses in the immediate-vaccine group.',
 cautionTitle: 'One early relapse was excluded from that denominator.', caution: 'A vaccinated patient who relapsed after two doses did not meet the minimum-exposure rule. “No vaccinated patient relapsed” would misstate this result.',
 implication: 'A relevant viral-vector precedent, but individualised targets and a postoperative setting differ from ITOP1. The small study cannot establish comparative efficacy.',
 question: 'Will early relapses and patients missing vaccine doses remain visible in future efficacy summaries?',
 takeHome: 'An encouraging early signal whose per-protocol denominator must travel with the headline.',
 evidence: 'Peer-reviewed Phase 1 report', hasResults: true, randomised: true, sourceIds: ['tg4050', 'tgAbstract'],
 flags: ['Different cancer', 'Different timing', 'Per-protocol exclusion', 'Small early-phase study']
 },
 {
 id: 'pancreas', name: 'Autogene cevumeran', product: 'Autogene cevumeran · BNT122', indication: 'Pancreatic cancer', phase: 'Phase 1', kind: 'Journal publication', year: '2025', category: 'Immune-response signal',
 population: 'Resected pancreatic ductal adenocarcinoma', platform: 'Individualised antigens · mRNA', timing: 'After surgery', regimen: 'Sequential atezolizumab, vaccine and mFOLFIRINOX', design: 'Single-arm study; 16 vaccinated patients in the immune-response comparison', endpoint: 'Immune persistence and recurrence association',
 metric: '8 / 16', metricLabel: 'Vaccinated patients with induced T-cell responses', interval: 'Responders vs non-responders: 8 vs 8', denominator: '16 vaccinated · no randomised unvaccinated comparator', followup: '3.2 years median follow-up',
 finding: 'Vaccine-induced T cells persisted, and immune responders had longer RFS than non-responders.',
 cautionTitle: 'Immune response was not randomly assigned.', caution: 'The responder comparison is an association within a treated cohort. It cannot isolate the vaccine’s effect from patient differences or other treatments.',
 implication: 'Supports investigating durable immune responses in a gastrointestinal cancer. It does not supply a causal recurrence-benefit estimate for ITOP1.',
 question: 'How will VISTA distinguish an immune correlate from evidence that vaccination changes clinical outcomes?',
 takeHome: 'Durable immune responses are a biological signal; the responder analysis is not a randomised efficacy comparison.',
 evidence: 'Peer-reviewed Phase 1 follow-up', hasResults: true, randomised: false, sourceIds: ['pancreas'],
 flags: ['Different cancer', 'Different timing', 'No randomised control', 'Responder-selection bias']
 },
 {
 id: 'magrit', name: 'MAGRIT', product: 'MAGE-A3 immunotherapeutic', indication: 'Lung cancer', phase: 'Phase 3', kind: 'Journal publication', year: '2016', category: 'Historical negative result',
 population: 'Resected stage IB–IIIA MAGE-A3-positive non-small-cell lung cancer', platform: 'Shared antigen · recombinant protein immunotherapeutic', timing: 'After surgery', regimen: 'MAGE-A3 immunotherapeutic vs placebo; with or without prior adjuvant chemotherapy', design: 'Randomised, double-blind; 2,312 assigned, 2,272 received treatment', endpoint: 'Disease-free survival (DFS)',
 metric: '1.02', metricLabel: 'DFS hazard ratio', interval: '95% CI 0.89–1.18 · p = 0.74', denominator: '2,312 randomised · 2,272 treated', followup: 'Historical Phase 3 report · 2016',
 finding: 'The trial did not demonstrate a disease-free-survival benefit.',
 cautionTitle: 'A negative programme is not a verdict on every shared-antigen vaccine.', caution: 'Its antigen, delivery platform, cancer and treatment era differ from ITOP1. Keep it in the evidence set without generalising its outcome to the entire class.',
 implication: 'A useful counterweight to positive-only narratives. ITOP1 still needs its own clinical evidence, even with a distinct antigen-discovery and vector strategy.',
 question: 'What clinical evidence would demonstrate that the differences in the ITOP1 approach matter to patients?',
 takeHome: 'Include negative precedent and explain the biological differences; do not infer a class-wide effect.',
 evidence: 'Peer-reviewed historical Phase 3 result', hasResults: true, randomised: true, sourceIds: ['magrit'],
 flags: ['Different cancer', 'Different timing', 'Different platform', 'Historical treatment context']
 }
];

// Editorial opening: inspect the denominator before exploring larger studies.
STUDIES.unshift(STUDIES.splice(STUDIES.findIndex(s => s.id === "tg4050"), 1)[0]);
