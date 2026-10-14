const assert=require('assert');const fs=require('fs');const katex=require('katex');
const data=JSON.parse(fs.readFileSync('dist/content.json','utf8'));
assert.equal(data.lectures.length,40);assert.equal(new Set(data.lectures.map(l=>l.number)).size,40);
assert.equal(data.lectures[39].section,'tbd');assert.equal(data.lectures[38].section,'7.3');
const problems=Object.values(data.sections).flatMap(s=>s.problems);assert.equal(new Set(problems.map(p=>p.id)).size,problems.length);
for(const l of data.lectures){if(l.section!=='tbd')assert(data.sections[l.section],l.section)}
let mathCount=0;
for(const s of Object.values(data.sections)){
  assert(s.problems.length>=4,s.id+' needs multiple practice problems');
  assert(s.problems.filter(p=>p.kind==='concept').length>=2,s.id+' reasoning practice');
  assert(s.problems.filter(p=>p.kind!=='concept').length>=2,s.id+' calculation practice');
  const l=s.lesson;assert(l&&l.understand.length>=2&&l.method.length>=3&&l.example&&l.why&&l.connection,s.id+' complete lesson');
  assert(l.understand.join(' ').split(/\s+/).length>=65,s.id+' substantial conceptual explanation');
  for(const t of [l.bigIdea,...l.understand,l.why,...l.method,l.example.prompt,l.example.explanation,l.connection])for(const m of t.matchAll(/\\\(([\s\S]*?)\\\)/g)){katex.renderToString(m[1],{throwOnError:true,strict:'ignore'});mathCount++}
  katex.renderToString(l.example.math,{throwOnError:true,strict:'ignore'});mathCount++;
  katex.renderToString(s.formula,{throwOnError:true,strict:'ignore'});mathCount++;
  for(const p of s.problems){assert(p.hints.length&&p.steps.length&&p.answer&&p.check);assert(p.page>=1&&p.page<=213);katex.renderToString(p.answer,{throwOnError:true,strict:'ignore'});mathCount++;
    for(const text of [p.prompt,...p.steps,...p.hints,p.check])for(const m of text.matchAll(/\\\(([\s\S]*?)\\\)/g)){katex.renderToString(m[1],{throwOnError:true,strict:'ignore'});mathCount++}
  }
}
for(const e of data.exams)for(const k of e.keys){assert(data.sections[k]);assert(k.startsWith(e.id==='m1'?'1.':e.id==='m2'?'2.':'4.')||k.startsWith(e.id==='m2'?'3.':'5.')||e.id==='m3'&&k.startsWith('6.'))}
console.log(`Verified ${data.lectures.length} lectures, ${problems.length} complete worked problems, ${mathCount} math expressions, and exam scope.`);
