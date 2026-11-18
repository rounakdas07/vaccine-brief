import {STUDIES, VISTA, SOURCES} from './data.mjs';
import {fromHash, getStudy, differences, briefText, allBriefs, csvText} from './core.mjs';
const $=s=>document.querySelector(s);
let selected=fromHash(location.hash), timer;
const studyTitle=s=>s.id==='tg4050'?'TG4050':s.name;
function node(tag,text,cls){const n=document.createElement(tag);if(text!=null)n.textContent=text;if(cls)n.className=cls;return n;}
function notify(text){$('#status').textContent=text;$('#status').classList.add('visible');clearTimeout(timer);timer=setTimeout(()=>$('#status').classList.remove('visible'),3300);}
function sources(ids,container){container.replaceChildren();for(const id of ids){const s=SOURCES[id],el=node('div',null,'source-item'),a=node('a',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';el.append(a,node('p',`${s.publisher} · ${s.kind} · ${s.date}`),node('p',s.locator),node('small',s.access));container.append(el);}}
function render(){const s=selected;for(const b of document.querySelectorAll('.study-button'))b.setAttribute('aria-current',String(b.dataset.id===s.id));$('#study-select').value=s.id;
 const values={'study-title':studyTitle(s),'study-phase':s.phase,'source-kind':s.kind,'source-year':s.year,'study-subtitle':s.indication,'metric':s.metric,'metric-label':s.metricLabel,'interval':s.interval,'denominator':s.denominator,'followup':s.followup,'finding':s.finding,'caveat-title':s.cautionTitle,'caveat':s.caution,'implication':s.implication,'question':s.question,'comparison-title':studyTitle(s),'source-count':s.sourceIds.length};for(const [id,value]of Object.entries(values))$('#'+id).textContent=value;
 $('#source-kind').classList.toggle('sponsor',s.kind==='Sponsor report');$('#result-source').href=SOURCES[s.sourceIds[0]].url;
 $('#comparison-rows').replaceChildren();for(const [label,a,b]of differences(s)){const row=node('tr'),h=node('th',label);h.scope='row';row.append(h,node('td',a),node('td',b));$('#comparison-rows').append(row);}sources(s.sourceIds,$('#source-list'));
 document.title=`${s.name} | Vaccine Brief`;
}
function choose(id){selected=getStudy(id);history.replaceState(null,'',`#study=${selected.id}`);render();}
for(const s of STUDIES){const b=node('button',null,'study-button');b.type='button';b.dataset.id=s.id;b.append(node('span',studyTitle(s),'title'),node('span',s.indication,'subtitle'));b.addEventListener('click',()=>choose(s.id));$('#study-list').append(b);const option=node('option',`${studyTitle(s)} · ${s.phase}`);option.value=s.id;$('#study-select').append(option);}
$('#study-select').addEventListener('change',e=>choose(e.target.value));window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#study=')){selected=fromHash(location.hash);render();}});
const tabs=[...document.querySelectorAll('[role=tab]')];
function showTab(name){for(const tab of tabs){const active=tab.dataset.tab===name;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;$('#panel-'+tab.dataset.tab).hidden=!active;}}
for(const [i,tab]of tabs.entries()){tab.addEventListener('click',()=>showTab(tab.dataset.tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();showTab(tabs[next].dataset.tab);tabs[next].focus();});}
const facts=[['Patients',VISTA.population],['Vaccine',VISTA.platform],['Timing',VISTA.timing],['Study plan',VISTA.design],['Outcomes',VISTA.endpoint]];for(const [k,v]of facts)$('#reference-facts').append(node('dt',k),node('dd',v));$('#reference-result').textContent=VISTA.result+' '+VISTA.milestone;$('#reference-discrepancy').textContent=VISTA.discrepancy;sources(VISTA.sourceIds,$('#reference-sources'));
$('#open-reference').addEventListener('click',()=>$('#reference-dialog').showModal());$('#close-reference').addEventListener('click',()=>$('#reference-dialog').close());$('#close-copy').addEventListener('click',()=>$('#copy-dialog').close());
$('#design-reference').addEventListener('click',()=>$('#reference-dialog').showModal());
$('#open-method').addEventListener('click',()=>$('#method-dialog').showModal());$('#close-method').addEventListener('click',()=>$('#method-dialog').close());
function download(content,filename,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notify('Downloaded. Sources and caveats are included.');}
$('#download-brief').addEventListener('click',()=>download(briefText(selected),`vaccine-brief-${selected.id}.txt`,'text/plain;charset=utf-8'));
$('#download-all').addEventListener('click',()=>download(allBriefs(),'vaccine-brief-evidence-pack.txt','text/plain;charset=utf-8'));
$('#download-csv').addEventListener('click',()=>download(csvText(),'vaccine-brief-evidence.csv','text/csv;charset=utf-8'));
$('#copy-brief').addEventListener('click',()=>{$('#copy-text').value=briefText(selected);$('#copy-dialog').showModal();$('#copy-text').focus();$('#copy-text').select();});
render();
