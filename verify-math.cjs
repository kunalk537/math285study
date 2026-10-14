const assert=require('assert');
const d=(f,t)=>(f(t+1e-5)-f(t-1e-5))/2e-5;
const dd=(f,t)=>(f(t+1e-4)-2*f(t)+f(t-1e-4))/1e-8;
const tests=[
['1.2.4(f)',t=>2*Math.exp(t+Math.sin(t)),(f,t)=>d(f,t)-(1+Math.cos(t))*f(t)],
['1.2.4(h)',t=>1/(.5-Math.log(1+t)),(f,t)=>d(f,t)-f(t)**2/(1+t)],
['1.5.2(a)',t=>t/2+.25-.25*Math.exp(-2*t),(f,t)=>d(f,t)+2*f(t)-1-t],
['1.5.2(d)',t=>(1+Math.sin(t))/(1+t*t),(f,t)=>d(f,t)+2*t*f(t)/(1+t*t)-Math.cos(t)/(1+t*t)],
['1.5.1',t=>.005*(t+20)+198/(t+20),(f,t)=>d(f,t)-.01+f(t)/(t+20)],
['1.6.6(a)',t=>Math.sqrt(t-.5+2*Math.exp(-2*t)),(f,t)=>d(f,t)+f(t)-t/f(t)],
['1.6.7(d)',t=>1/(1-Math.log(1+t)),(f,t)=>(1+t)*d(f,t)-f(t)**2],
['1.7 phase line',t=>-Math.tanh(t),(f,t)=>d(f,t)-f(t)**2+1],
['2.5 exponential',t=>.5*Math.exp(t),(f,t)=>d(f,t)+f(t)-Math.exp(t)],
['2.5 resonance',t=>3*t*Math.cos(t)+2*t*Math.sin(t),(f,t)=>dd(f,t)+f(t)-4*Math.cos(t)+6*Math.sin(t)],
['2.6 resonance',t=>-.5*t*Math.cos(t),(f,t)=>dd(f,t)+f(t)-Math.sin(t)],
['2.7 VOP',t=>Math.cos(t)*Math.log(Math.cos(t))+t*Math.sin(t),(f,t)=>dd(f,t)+f(t)-1/Math.cos(t)],
['2.8.3(a)',t=>Math.exp(t)+Math.exp(3*t)-Math.exp(2*t),(f,t)=>dd(f,t)-4*d(f,t)+3*f(t)-Math.exp(2*t)],
['3.1.8(a)',t=>(Math.cos(t)-Math.cos(2*t))/3,(f,t)=>dd(f,t)+4*f(t)-Math.cos(t)],
['3.1.7(a)',t=>t*Math.exp(-t),(f,t)=>dd(f,t)+2*d(f,t)+f(t)],
['3.2 RC',t=>5*(1-Math.exp(-t)),(f,t)=>d(f,t)+f(t)-5],
['3.2 RLC',t=>-.12*Math.cos(2*t)+.16*Math.sin(2*t),(f,t)=>dd(f,t)+2*d(f,t)+f(t)-Math.cos(2*t)],
];
for(const [name,f,res] of tests)for(const t of [.05,.2,.4])assert(Math.abs(res(f,t))<3e-5,name+' at '+t);
const near=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
near(tank(0),10);function tank(t){return .005*(t+20)+198/(t+20)}
near(.005-198/39600,0);
near(Math.exp(0)+Math.exp(0)-Math.exp(0),1);near(1+3-2,2);
const mv=(A,v)=>A.map(row=>row.reduce((s,x,i)=>s+x*v[i],0));
assert.deepEqual(mv([[3,2],[2,3]],[1,1]),[5,5]);assert.deepEqual(mv([[3,2],[2,3]],[1,-1]),[1,-1]);
const integral=f=>{const n=4000,h=3/n;let sum=f(0)+f(3);for(let i=1;i<n;i++)sum+=(i%2?4:2)*f(i*h);return sum*h/3};
for(let n=1;n<=5;n++){near((2/3)*integral(x=>(5-2*x)*Math.sin(n*Math.PI*x/3)),2*(5+(-1)**n)/(n*Math.PI));near((2/3)*integral(x=>(5-2*x)*Math.cos(n*Math.PI*x/3)),12*(1-(-1)**n)/(n*n*Math.PI*Math.PI))}
for(let n=1;n<=3;n++){const k=n*Math.PI/5;near(-k*Math.sin(k*5),0);const mixed=(n-.5)*Math.PI/3;near(Math.cos(3*mixed),0)}
console.log('Math checks passed: numerical ODE residuals, IVP data, salt minimum, matrix eigenpairs, Fourier integrals, and boundary eigenvalues.');
