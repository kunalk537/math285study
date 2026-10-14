// The authored content is tracked; deploys do not need local source paths/Python.
const fs=require('fs');const {execFileSync}=require('child_process');
fs.cpSync('node_modules/katex/dist','dist/katex',{recursive:true});
fs.copyFileSync('node_modules/katex/LICENSE','dist/katex-LICENSE.txt');
execFileSync(process.execPath,['enrich-content.cjs'],{stdio:'inherit'});
execFileSync(process.execPath,['verify.cjs'],{stdio:'inherit'});
execFileSync(process.execPath,['verify-math.cjs'],{stdio:'inherit'});
console.log('Static study guide ready in dist/.');
