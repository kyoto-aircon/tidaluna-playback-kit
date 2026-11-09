var Aa=Object.create;var yn=Object.defineProperty;var Ia=Object.getOwnPropertyDescriptor;var Ra=Object.getOwnPropertyNames;var Ba=Object.getPrototypeOf,Ha=Object.prototype.hasOwnProperty;var rt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var _a=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Ra(t))!Ha.call(e,r)&&r!==n&&yn(e,r,{get:()=>t[r],enumerable:!(a=Ia(t,r))||a.enumerable});return e};var Ae=(e,t,n)=>(n=e!=null?Aa(Ba(e)):{},_a(t||!e||!e.__esModule?yn(n,"default",{value:e,enumerable:!0}):n,e));var vn=rt((ai,Lt)=>{Lt.exports=luna?.core?.modules?.["@luna/core"];if(Lt.exports===void 0)throw new Error("Cannot find module @luna/core in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/core")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Dt=rt((ri,Ct)=>{Ct.exports=luna?.core?.modules?.["@luna/lib"];if(Ct.exports===void 0)throw new Error("Cannot find module @luna/lib in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/lib")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var rn=rt((Qi,an)=>{an.exports=luna?.core?.modules?.react;if(an.exports===void 0)throw new Error("Cannot find module react in luna.core.modules");luna.core.LunaPlugin.getByName("react")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var ca=rt((Ji,on)=>{on.exports=luna?.core?.modules?.["@luna/ui"];if(on.exports===void 0)throw new Error("Cannot find module @luna/ui in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/ui")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Pe=Ae(vn(),1),me=Ae(Dt(),1);var Ie=[62,125,250,500,1e3,2e3,4e3,8e3],je=Ie.length,be=-12,Z=12,P={eq:{enabled:!1,bands:Array.from({length:je},()=>0)},bass:{enabled:!1,boost:6,sub:3,drive:.2,mix:.6},eightD:{enabled:!1,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},delay:{enabled:!1,timeMs:250,feedback:.25,mix:.25},reverb:{enabled:!1,decay:2,mix:.25}},D=(e,t,n,a)=>{let r=typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(r)?Math.min(n,Math.max(t,r)):a},Ve=(e,t)=>typeof e=="boolean"?e:t,Oa=e=>{let t=Array.from({length:je},()=>0);if(Array.isArray(e.bands)){for(let i=0;i<je;i+=1)t[i]=D(e.bands[i],be,Z,0);return t}let n=D(e.low,be,Z,0),a=D(e.mid,be,Z,0),r=D(e.high,be,Z,0);return[n,n,a,a,a,r,r,r]},G=e=>{let t=typeof e=="object"&&e!==null?e:{},n=typeof t.eq=="object"&&t.eq!==null?t.eq:{},a=typeof t.eightD=="object"&&t.eightD!==null?t.eightD:{},r=typeof t.bass=="object"&&t.bass!==null?t.bass:{},i=typeof t.delay=="object"&&t.delay!==null?t.delay:{},c=typeof t.reverb=="object"&&t.reverb!==null?t.reverb:{};return{eq:{enabled:Ve(n.enabled,P.eq.enabled),bands:Oa(n)},eightD:{enabled:Ve(a.enabled,P.eightD.enabled),rate:D(a.rate,.02,2,P.eightD.rate),panDepth:D(a.panDepth,0,1,P.eightD.panDepth),pitchRate:D(a.pitchRate,.02,2,P.eightD.pitchRate),pitchDepth:D(a.pitchDepth,0,12,P.eightD.pitchDepth),mix:D(a.mix,0,1,P.eightD.mix)},bass:{enabled:Ve(r.enabled,P.bass.enabled),boost:D(r.boost,0,24,P.bass.boost),sub:D(r.sub,0,12,P.bass.sub),drive:D(r.drive,0,1,P.bass.drive),mix:D(r.mix,0,1,P.bass.mix)},delay:{enabled:Ve(i.enabled,P.delay.enabled),timeMs:D(i.timeMs,20,2e3,P.delay.timeMs),feedback:D(i.feedback,0,.9,P.delay.feedback),mix:D(i.mix,0,1,P.delay.mix)},reverb:{enabled:Ve(c.enabled,P.reverb.enabled),decay:D(c.decay,.2,8,P.reverb.decay),mix:D(c.mix,0,1,P.reverb.mix)}}},it=e=>e.eq.enabled||e.bass.enabled||e.eightD.enabled||e.delay.enabled||e.reverb.enabled,ot=e=>{let t=[];return e.eq.enabled&&t.push("EQ 8-band"),e.eightD.enabled&&t.push(`8D ${e.eightD.rate.toFixed(2)} Hz`),e.bass.enabled&&t.push(`Bass +${Math.round(e.bass.boost)} dB`),e.delay.enabled&&t.push(`Delay ${Math.round(e.delay.timeMs)} ms`),e.reverb.enabled&&t.push(`Reverb ${e.reverb.decay.toFixed(1)} s`),t.length===0?"No effects enabled":t.join(" \xB7 ")};var ee=e=>Number.isFinite(e)?Math.max(-12,Math.min(12,Math.round(e))):0,Sn=e=>2**(ee(e)/12),We=e=>{let t=ee(e);return`${t>0?"+":""}${t}`};var Qe={min:.05,max:10,step:.05},Ye=1;var qa=6,Re=(e,t=qa)=>{let n=10**t;return Math.round(e*n)/n},st=(e,t,n)=>Math.min(n,Math.max(t,e)),ve=e=>{let t=Number(e?.min),n=Number.isFinite(t)?Re(Math.max(.01,t)):Qe.min,a=Number(e?.max),r=Number.isFinite(a)?Re(Math.max(n+.01,a)):Math.max(n+.01,Qe.max),i=Number(e?.step),c=Number.isFinite(i)&&i>0?Re(i):Qe.step;return{min:n,max:r,step:c}},$a=(e,t)=>{let{min:n,step:a}=t,r=n+Math.round((e-n)/a)*a;return Re(r)},ye=(e,t)=>{let n=ve(t),a=Number.isFinite(e)?e:Ye,r=$a(a,n);return st(Re(r),n.min,n.max)},xn=(e,t,n)=>{let a=ve(n),r=ye(e,a);return ye(r+t*a.step,a)},Fa=e=>{let t=e.includes(".")?e.replace(/0+$/,"").replace(/\.$/,""):e;return t===""||t==="-0"?"0":t},te=e=>Number.isFinite(e)?Fa(e.toFixed(4)):String(Ye),Be=e=>`${te(e)}\xD7`,Je=(e,t)=>{let{min:n,max:a}=ve(t);if(!(a>n))return 0;let r=Math.log(st(e,n,a)/n)/Math.log(a/n);return st(Number.isFinite(r)?r:0,0,1)},kn=(e,t)=>{let n=ve(t),a=n.min*Math.pow(n.max/n.min,st(e,0,1));return ye(a,n)},En=e=>{let{min:t,max:n}=ve(e),a=[t,1,2,5,10,n],r=new Set,i=[];for(let s of a.sort((l,f)=>l-f)){if(s<t||s>n)continue;let l=te(s);r.has(l)||(r.add(l),i.push(Re(s)))}let c=[];for(let s of i){let l=c[c.length-1];l!==void 0&&Je(s,e)-Je(l,e)<.07||c.push(s)}return c};var Ga="tidaluna.playback-kit.v1",Ka="tidaluna.playback-speed.v1",Xe=()=>({speed:Ye,pitchShifts:!1,pitchSemitones:0,presetId:null,developerMode:!1,builtinPresets:!0,effects:G(void 0),bounds:{...Qe}}),Pn=e=>{if(e===null)return Xe();let t;try{t=JSON.parse(e)}catch{return Xe()}if(typeof t!="object"||t===null)return Xe();let n=t,a=ve(n.bounds),r=ee(typeof n.pitchSemitones=="number"?n.pitchSemitones:0);return{speed:ye(typeof n.speed=="number"?n.speed:Ye,a),pitchShifts:r===0&&n.pitchShifts===!0,pitchSemitones:r,presetId:typeof n.presetId=="string"?n.presetId:null,developerMode:n.developerMode===!0,builtinPresets:n.builtinPresets!==!1,effects:G(n.effects),bounds:a}},Ua=(e,t)=>{let n=e.getItem(t);if(n!==null)return Pn(n);let a=e.getItem(Ka);if(a===null)return Xe();let r=Pn(a);return r.presetId=null,r},Va=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&e.presetId===t.presetId&&e.developerMode===t.developerMode&&e.builtinPresets===t.builtinPresets&&JSON.stringify(e.effects)===JSON.stringify(t.effects)&&e.bounds.min===t.bounds.min&&e.bounds.max===t.bounds.max&&e.bounds.step===t.bounds.step,Nt=(e,t=Ga)=>{let n=Ua(e,t),a=new Set,r=()=>({...n,bounds:{...n.bounds}}),i=s=>{if(Va(n,s))return;n=s;try{e.setItem(t,JSON.stringify(n))}catch{}let l=r();for(let f of[...a])try{f(l)}catch(b){console.error("[PlaybackKit] listener failed",b)}},c=s=>({...n,...s});return{get:r,subscribe(s){return a.add(s),()=>a.delete(s)},setSpeed(s){i(c({speed:ye(s,n.bounds)}))},step(s){i(c({speed:xn(n.speed,s,n.bounds)}))},setPitchShifts(s){i(c({pitchShifts:s,pitchSemitones:s?0:n.pitchSemitones}))},setPitchSemitones(s){let l=ee(s);i(c({pitchSemitones:l,pitchShifts:l===0?n.pitchShifts:!1}))},setBounds(s){let l=ve({...n.bounds,...s});i({...n,bounds:l,speed:ye(n.speed,l)})},applyPreset(s){let l=ee(s.pitchSemitones);i({...n,speed:ye(s.speed,n.bounds),pitchShifts:l===0&&s.pitchShifts===!0,pitchSemitones:l,effects:G(s.effects),presetId:s.id})},setEffects(s){i({...n,effects:G(s)})},setDeveloperMode(s){i({...n,developerMode:s})},setBuiltinPresets(s){i({...n,builtinPresets:s})},clearPreset(){i({...n,presetId:null})},replace(s){let l=ve(s.bounds),f=ee(s.pitchSemitones);i({speed:ye(s.speed,l),pitchShifts:f===0&&s.pitchShifts===!0,pitchSemitones:f,presetId:typeof s.presetId=="string"?s.presetId:null,developerMode:s.developerMode===!0,builtinPresets:s.builtinPresets!==!1,effects:G(s.effects),bounds:l})},reset(){i({...Xe(),developerMode:n.developerMode,builtinPresets:n.builtinPresets,presetId:null,bounds:{...n.bounds}})},destroy(){a.clear()}}},wn=new Map,At=()=>{try{if(typeof localStorage<"u"){let e="__lunakit_probe__";return localStorage.setItem(e,"1"),localStorage.removeItem(e),localStorage}}catch{}return{getItem:e=>wn.get(e)??null,setItem:(e,t)=>{wn.set(e,t)}}},v=Nt(At());var ja="tidaluna.playback-kit.presets.v1",Bt="nightcore",ce=e=>G({...P,...e,eq:{...P.eq,...e.eq??{}},bass:{...P.bass,...e.bass??{}},eightD:{...P.eightD,...e.eightD??{}},delay:{...P.delay,...e.delay??{}},reverb:{...P.reverb,...e.reverb??{}}}),Wa={id:Bt,name:"Nightcore",speed:1.35,pitchShifts:!0,pitchSemitones:0,effects:ce({}),builtin:!0},Qa={id:"slowcore",name:"Slowcore",speed:.8,pitchShifts:!0,pitchSemitones:0,effects:ce({reverb:{enabled:!0,decay:4,mix:.35}}),builtin:!0},Ja={id:"big-bass",name:"Big Bass",speed:1,pitchShifts:!1,pitchSemitones:0,effects:ce({eq:{enabled:!0,bands:[3,2,0,0,0,0,0,1]},bass:{enabled:!0,boost:14,sub:6,drive:.5,mix:1}}),builtin:!0},Ya={id:"eight-d",name:"8D Orbit",speed:1,pitchShifts:!1,pitchSemitones:0,effects:ce({eightD:{enabled:!0,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},Xa={id:"dub-echo",name:"Dub Echo",speed:1,pitchShifts:!1,pitchSemitones:0,effects:ce({delay:{enabled:!0,timeMs:450,feedback:.45,mix:.28}}),builtin:!0},Za={id:"daycore",name:"Daycore",speed:.85,pitchShifts:!0,pitchSemitones:0,effects:ce({reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},er={id:"chipmunk",name:"Chipmunk",speed:1.6,pitchShifts:!0,pitchSemitones:0,effects:ce({}),builtin:!0},tr={id:"vaporwave",name:"Vaporwave",speed:.7,pitchShifts:!0,pitchSemitones:0,effects:ce({reverb:{enabled:!0,decay:5,mix:.35},delay:{enabled:!0,timeMs:300,feedback:.3,mix:.2}}),builtin:!0},nr={id:"submerge",name:"Submerge",speed:.95,pitchShifts:!1,pitchSemitones:0,effects:ce({bass:{enabled:!0,boost:10,sub:5,drive:.3,mix:.6},eightD:{enabled:!0,rate:.1,panDepth:.75,pitchRate:.25,pitchDepth:2,mix:.85}}),builtin:!0},ar={id:"clear-voice",name:"Clear Voice",speed:1.15,pitchShifts:!1,pitchSemitones:0,effects:ce({eq:{enabled:!0,bands:[-4,-2,1,2,2,1,0,0]}}),builtin:!0},Tn=[Wa,Za,Qa,er,tr,Ja,nr,Ya,Xa,ar],Ze=new Set(Tn.map(e=>e.id)),rr=24,ir=.05,or=16,It=e=>{if(typeof e!="string")return;let t=e.trim().slice(0,rr);return t===""?void 0:t},Rt=e=>{let t=Number(e);return Number.isFinite(t)?Math.max(ir,Math.min(or,t)):1},Mn=(e,t)=>{if(typeof e!="object"||e===null)return;let n=e,a=typeof n.id=="string"?n.id:void 0,r=It(n.name);if(!(a===void 0||r===void 0||Ze.has(a)||t.has(a)))return t.add(a),{id:a,name:r,speed:Rt(n.speed),pitchShifts:n.pitchShifts===!0,pitchSemitones:ee(typeof n.pitchSemitones=="number"?n.pitchSemitones:0),effects:G(n.effects)}},sr=e=>{if(e===null)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(!Array.isArray(t))return[];let n=new Set,a=[];for(let r of t){let i=Mn(r,n);i!==void 0&&a.push(i)}return a},lr=(e,t)=>{if(e.eq.enabled!==t.eq.enabled||e.eq.bands.length!==t.eq.bands.length)return!1;for(let i=0;i<e.eq.bands.length;i+=1)if(e.eq.bands[i]!==t.eq.bands[i])return!1;let n=["enabled","boost","sub","drive","mix"];for(let i of n)if(e.bass[i]!==t.bass[i])return!1;let a=["enabled","rate","panDepth","pitchRate","pitchDepth"];for(let i of a)if(e.eightD[i]!==t.eightD[i])return!1;let r=["enabled","timeMs","feedback","mix"];for(let i of r)if(e.delay[i]!==t.delay[i])return!1;return e.reverb.enabled===t.reverb.enabled&&e.reverb.decay===t.reverb.decay&&e.reverb.mix===t.reverb.mix},et=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&lr(e.effects,t.effects),Ht=(e,t=ja)=>{let n=sr(e.getItem(t)),a=new Set,r=0,i=()=>{try{e.setItem(t,JSON.stringify(n))}catch{}},c=()=>{for(let l of[...a])try{l()}catch{}},s=()=>[...Tn.map(l=>({...l})),...n.map(l=>({...l}))];return{get:s,getById(l){return s().find(f=>f.id===l)},save(l,f){let b=It(l);if(b===void 0)return;r+=1;let k={id:`custom-${Date.now().toString(36)}-${r}`,name:b,speed:Rt(f.speed),pitchShifts:f.pitchShifts===!0,pitchSemitones:ee(f.pitchSemitones),effects:G(f.effects)};return n.push(k),i(),c(),{...k}},remove(l){if(Ze.has(l))return!1;let f=n.filter(b=>b.id!==l);return f.length===n.length?!1:(n=f,i(),c(),!0)},rename(l,f){if(Ze.has(l))return!1;let b=It(f),k=n.find(E=>E.id===l);return b===void 0||k===void 0?!1:(k.name=b,i(),c(),!0)},update(l,f){if(Ze.has(l))return!1;let b=n.find(k=>k.id===l);return b===void 0?!1:(b.speed=Rt(f.speed),b.pitchShifts=f.pitchShifts===!0,b.pitchSemitones=ee(f.pitchSemitones),b.effects=G(f.effects),i(),c(),!0)},move(l,f){if(Ze.has(l))return!1;let b=n.findIndex(g=>g.id===l),k=b+Math.sign(f);if(b<0||k<0||k>=n.length)return!1;let[E]=n.splice(b,1);return n.splice(k,0,E),i(),c(),!0},replace(l){let f=new Set;n=l.filter(b=>b.builtin!==!0).map(b=>Mn(b,f)).filter(b=>b!==void 0),i(),c()},subscribe(l){return a.add(l),()=>a.delete(l)}}},T=Ht(At());var _t=1,Ln=e=>({getItem:()=>e,setItem:()=>{}}),lt=e=>{if(e==null)return;let t;try{t=JSON.parse(e)}catch{return}if(typeof t!="object"||t===null)return;let n=t;if(n.version!==_t)return;let a=Nt(Ln(JSON.stringify(n.settings??{}))).get(),r=Ht(Ln(JSON.stringify(n.presets??[]))).get().filter(c=>c.builtin!==!0),i=new Set([Bt,...r.map(c=>c.id)]);return a.presetId!==null&&!i.has(a.presetId)&&(a.presetId=null),{version:_t,settings:a,presets:r}},tt=(e,t)=>`${JSON.stringify({version:_t,settings:e,presets:t.filter(n=>n.builtin!==!0)},null,2)}
`;var we=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/config.native.ts",'"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var P=(e,n)=>{for(var t in n)p(e,t,{get:n[t],enumerable:!0})},w=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of m(n))!h.call(e,s)&&s!==t&&p(e,s,{get:()=>n[s],enumerable:!(o=d(n,s))||o.enumerable});return e};var y=e=>w(p({},"__esModule",{value:!0}),e);var A={};P(A,{exportConfig:()=>F,getConfigPath:()=>k,importConfig:()=>S,readConfig:()=>v,revealConfig:()=>D,writeConfig:()=>x});module.exports=y(A);var l=require,i=l("path"),r=()=>l("fs/promises"),b=()=>l("fs"),u=()=>l("electron"),g=()=>process.env.HOME??process.env.USERPROFILE??"",f=()=>process.platform==="win32"?process.env.APPDATA??i.join(g(),"AppData","Roaming"):process.platform==="darwin"?i.join(g(),"Library","Application Support"):i.join(g(),".config"),j=()=>{let e=f(),n=b(),t=[],o=process.resourcesPath;o!==void 0&&(t.push(i.basename(i.dirname(i.dirname(o)))),t.push(i.basename(i.dirname(o)))),t.push("TIDAL","Tidal","tidal","tidal-hifi");for(let s of t)if(!(s===""||s==="Contents"||s==="resources")&&n.existsSync(i.join(e,s)))return s;return"TIDAL"},c=()=>i.join(f(),j(),"playback-kit"),a=()=>i.join(c(),"config.json"),k=async()=>a(),v=async()=>{try{return await r().readFile(a(),"utf8")}catch{return null}},x=async e=>{await r().mkdir(c(),{recursive:!0});let n=`${a()}.tmp`;return await r().writeFile(n,e,"utf8"),await r().rename(n,a()),a()},F=async e=>{let t=await u().dialog.showSaveDialog({title:"Export Playback Kit config",defaultPath:i.join(f(),"playback-kit.json"),filters:[{name:"JSON",extensions:["json"]}]});return t.canceled||t.filePath===void 0?null:(await r().writeFile(t.filePath,e,"utf8"),t.filePath)},S=async()=>{let n=await u().dialog.showOpenDialog({title:"Import Playback Kit config",properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]}),t=n.filePaths[0];return n.canceled||t===void 0?null:{path:t,json:await r().readFile(t,"utf8")}},D=async()=>{await r().mkdir(c(),{recursive:!0}),await u().shell.openPath(c())};0&&(module.exports={exportConfig,getConfigPath,importConfig,readConfig,revealConfig,writeConfig});\n');if(we===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/config.native.ts");var Cn=(...e)=>__ipcRenderer.invoke(we,"exportConfig",...e),dt=(...e)=>__ipcRenderer.invoke(we,"getConfigPath",...e),Dn=(...e)=>__ipcRenderer.invoke(we,"importConfig",...e),ct=(...e)=>__ipcRenderer.invoke(we,"readConfig",...e),Nn=(...e)=>__ipcRenderer.invoke(we,"revealConfig",...e),He=(...e)=>__ipcRenderer.invoke(we,"writeConfig",...e);var _e="2.14.0";var Ee=[],An=!0,In=!1,Rn=e=>{if(e!==void 0)try{return JSON.parse(JSON.stringify(e))}catch{try{return String(e)}catch{return"[unserialisable]"}}},Ot=e=>{In=e,e||(Ee.length=0)};var h=(e,t,n)=>{if(!In)return;let a={at:Date.now(),level:e,message:t,data:Rn(n)};if(Ee.push(a),Ee.length>500&&Ee.shift(),!(e==="debug"&&!An))try{let r=e==="error"?console.error:e==="warn"?console.warn:console.debug;n===void 0?r(`[PlaybackKit] ${t}`):r(`[PlaybackKit] ${t}`,n)}catch{}},Bn=()=>Ee.map(e=>({...e})),qt=()=>Ee.map(e=>`${new Date(e.at).toISOString()} ${e.level.toUpperCase().padEnd(5)} ${e.message}${e.data===void 0?"":` ${JSON.stringify(e.data)}`}`).join(`
`),Hn=()=>{Ee.length=0},_n=e=>{An=e};var dr=e=>({tag:e.tagName.toLowerCase(),id:e.id,class:typeof e.className=="string"?e.className:"",src:(e.currentSrc||e.src||"").slice(0,140),paused:e.paused,readyState:e.readyState,networkState:e.networkState,currentTime:Number(e.currentTime.toFixed(3)),duration:Number.isFinite(e.duration)?Number(e.duration.toFixed(3)):e.duration,playbackRate:e.playbackRate,defaultPlaybackRate:e.defaultPlaybackRate,preservesPitch:e.preservesPitch,muted:e.muted,volume:e.volume,connected:e.isConnected,parent:e.parentElement===null?null:e.parentElement.id||e.parentElement.className}),cr=()=>typeof document>"u"?[]:[...document.querySelectorAll("video,audio")].map(dr),ut=()=>{if(typeof document>"u")return{};let e=document.getElementById("tidal-player-root");return{playerRoot:e!==null,rootChildCount:e?.children.length??0,rootChildren:e===null?[]:[...e.children].map(t=>`${t.tagName.toLowerCase()}#${t.id||"-"}`),scopedMedia:document.querySelectorAll("#tidal-player-root video, #tidal-player-root audio").length,videoOne:document.getElementById("video-one")!==null,videoTwo:document.getElementById("video-two")!==null,allMedia:document.querySelectorAll("video,audio").length,footer:document.querySelector('[data-test="footer-player"]')!==null}},ur=e=>new Promise(t=>setTimeout(t,e)),pr=async(e=1500)=>{if(typeof document>"u")return[];let t=[...document.querySelectorAll("video,audio")],n=t.map(a=>({id:a.id,tag:a.tagName.toLowerCase(),time:a.currentTime,paused:a.paused}));return await ur(e),t.map((a,r)=>{let i=n[r],c=a.currentTime-i.time,s=e/1e3;return{id:i.id,tag:i.tag,paused:a.paused,deltaSeconds:Number(c.toFixed(3)),observedRate:Number((c/s).toFixed(3)),expectedRate:a.playbackRate}})},On,qn=e=>{On=e},$n,Fn=e=>{$n=e},fr=()=>{try{return $n?.()??{}}catch(e){return{error:String(e)}}},mr=()=>{try{return On?.()??{registered:!1}}catch(e){return{error:String(e)}}},gr=["--wave-color-solid-accent-fill","--wave-color-solid-accent-bright","--wave-color-solid-base-fill","--wave-color-solid-base-brighter","--wave-color-solid-base-brightest","--wave-color-solid-contrast-fill","--wave-color-solid-contrast-dark","--wave-color-opacity-contrast-fill-ultra-thin","--wave-color-opacity-contrast-fill-thin","--wave-color-opacity-contrast-fill-thick","--wave-color-solid-warning-fill","--wave-color-text-danger","--market-core-text-10-color","--market-core-text-20-color","--market-core-fill-white-color","--baseFontSize","--baseLineHeight","--remRatio"],hr=()=>{if(typeof document>"u")return{};let e=document.getElementById("wimp")??document.querySelector('[data-test="footer-player"]')??document.documentElement,t=getComputedStyle(e),n={};for(let r of gr){let i=t.getPropertyValue(r).trim();i!==""&&(n[r]=i)}let a=r=>{let i=document.querySelector(r);if(i===null)return null;let c=getComputedStyle(i);return{color:c.color,background:c.backgroundColor,fontFamily:c.fontFamily,fontSize:c.fontSize,lineHeight:c.lineHeight,borderRadius:c.borderRadius,height:c.height}};return{root:e.id!==""?`#${e.id}`:e.tagName.toLowerCase(),fontSize:t.fontSize,fontFamily:t.fontFamily,tokens:n,elements:{footer:a('[data-test="footer-player"]'),utilityButtons:a('[data-test="footer-player"] [class*="utilityButtons"]'),volume:a('[data-test="footer-player"] [class*="sliderContainer"]'),qualityBadge:a("[data-test-quality-badge-streaming-quality]"),progressBar:a('[data-test="progress-bar"]')}}},$t=async e=>{h("info","building diagnostics report");let t=await pr();return[`Playback Kit v${_e}`,`at: ${new Date().toISOString()}`,`url: ${typeof location>"u"?"?":location.href}`,`ua: ${typeof navigator>"u"?"?":navigator.userAgent}`,`visibility: ${typeof document>"u"?"?":document.visibilityState}`,`settings: ${JSON.stringify(Rn(e))}`,`selectors: ${JSON.stringify(ut())}`,`player: ${JSON.stringify(fr())}`,`tidal: ${JSON.stringify(mr())}`,`progression: ${JSON.stringify(t)}`,`media: ${JSON.stringify(cr())}`,`theme: ${JSON.stringify(hr())}`,"",`--- logs (${Ee.length}) ---`,qt()].join(`
`)},Oe=async e=>Ft(await $t(e)),Ft=async e=>{try{if(typeof navigator<"u"&&navigator.clipboard?.writeText!==void 0)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}catch{return!1}};var br=400,zn=100,yr=5e-4,ue,qe,Te,$e,ne=[],Gn=new WeakMap,zt=0,pt=new Map,Kn=e=>new Promise(t=>setTimeout(t,e)),pe=async()=>{if(ue===void 0){let e=window.AudioContext??window.webkitAudioContext;if(e===void 0)throw new Error("Web Audio is unavailable");ue=new e({latencyHint:"playback"}),h("info","audio context created",{sampleRate:ue.sampleRate,state:ue.state})}if(ue.state==="suspended")try{await Promise.race([ue.resume(),Kn(250)])}catch{}return ue},Gt=()=>{if(qe===void 0||Te===void 0)return;qe.disconnect();for(let t of ne)try{t.output.disconnect()}catch{}let e=qe;for(let t of ne)e.connect(t.input),e=t.output;e.connect(Te)},ft=async()=>{let e=await pe();return(qe===void 0||Te===void 0)&&(qe=e.createGain(),Te=e.createGain(),$e=e.createAnalyser(),$e.fftSize=2048,Te.connect($e),Te.connect(e.destination)),Gt(),{ctx:e,input:qe,output:Te}},Kt=async(e,t)=>{if(pt.has(t))return pt.get(t);let n=await pe(),a=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),r=(async()=>{let i;try{await Promise.race([n.audioWorklet.addModule(a),new Promise((c,s)=>{i=setTimeout(()=>s(new Error(`Timed out loading worklet ${t}`)),br*10)})])}finally{i!==void 0&&clearTimeout(i),URL.revokeObjectURL(a)}})();pt.set(t,r);try{await r}catch(i){throw pt.delete(t),i}},Me=async e=>{let{ctx:t,input:n}=await ft();if(Gn.has(e))return;if(e.mediaKeys!==null&&e.mediaKeys!==void 0)throw new Error("protected media (DRM) cannot be routed through Web Audio");let a=t.createMediaElementSource(e);a.connect(n),Gn.set(e,a),zt+=1,h("info","audio engine attached element",{id:e.id,sources:zt})},Ut=async(e,t)=>{await mt(e,e,t)},mt=async(e,t,n)=>{if(await ft(),ne.some(r=>r.input===e))return;let a=n===void 0?ne.length:Math.max(0,Math.min(ne.length,n));ne.splice(a,0,{input:e,output:t}),Gt(),h("debug","audio engine inserted group",{index:a,nodes:ne.length})},vr=async e=>{await ft();let t=ne.findIndex(a=>a.input===e||a.output===e);if(t<0)return!1;let[n]=ne.splice(t,1);try{n.output.disconnect()}catch{}return Gt(),!0},Sr=()=>ne.map(e=>e.input),I=()=>({context:ue===void 0?"none":ue.state,sampleRate:ue?.sampleRate,sources:zt,nodes:ne.length}),Vt=async(e=1200)=>{let{ctx:t}=await ft();if($e===void 0)throw new Error("analyser unavailable");let n=Math.max(1,Math.round(e/zn)),a=new Float32Array($e.fftSize),r=0,i=0,c=0;for(let l=0;l<n;l+=1){if(await Kn(zn),t.state!=="running")continue;$e.getFloatTimeDomainData(a);let f=0,b=0;for(let k of a){let E=Math.abs(k);E>f&&(f=E),b+=k*k}r=Math.max(r,f),i+=b/a.length,c+=1}let s=c===0?0:Math.sqrt(i/c);return{rms:s,peak:r,samples:c,silent:s<yr,durationMs:e}},xr=()=>({version:1,ensureContext:pe,loadWorklet:Kt,attach:Me,insert:Ut,insertGroup:mt,remove:vr,list:Sr,status:I,measureRms:Vt}),Un=()=>{let e=xr();return globalThis.__playbackKitAudio=e,e},Vn=e=>{globalThis.__playbackKitAudio===e&&delete globalThis.__playbackKitAudio};var Qn=Ae(Dt(),1);var jn=`
/* Typography uses rem against TIDAL's 14px base (html font-size = --baseFontSize). */
.lunaspeed-ctl,
.lunaspeed-popover {
	--lunaspeed-accent: var(--wave-color-solid-accent-fill, currentColor);
	--lunaspeed-fg: var(--wave-color-solid-contrast-fill, currentColor);
	--lunaspeed-surface: var(--wave-color-solid-base-brighter, Canvas);
	--lunaspeed-border: var(--wave-color-opacity-contrast-fill-thin, color-mix(in srgb, currentColor 20%, transparent));
	--lunaspeed-muted: color-mix(in srgb, var(--lunaspeed-fg) 58%, transparent);
	--lunaspeed-faint: color-mix(in srgb, var(--lunaspeed-fg) 38%, transparent);
	--lunaspeed-hover: color-mix(in srgb, var(--lunaspeed-fg) 8%, transparent);
}

.lunaspeed-ctl {
	display: inline-flex;
	align-items: center;
	height: 34px;
	border-radius: 9px;
	background: var(--lunaspeed-hover);
	border: 1px solid var(--lunaspeed-border);
	font-family: inherit;
	color: var(--lunaspeed-fg);
}
.lunaspeed-ctl button {
	margin: 0;
	padding: 0;
	border: 0;
	background: transparent;
	font-family: inherit;
	color: inherit;
	cursor: pointer;
	-webkit-appearance: none;
	appearance: none;
}
.lunaspeed-step {
	width: 26px;
	height: 32px;
	display: grid;
	place-items: center;
	border-radius: 8px;
	color: var(--lunaspeed-muted);
	font-size: 1.143rem;
	font-weight: 500;
	line-height: 1;
}
.lunaspeed-step:hover {
	background: var(--lunaspeed-hover);
	color: var(--lunaspeed-fg);
}
.lunaspeed-step:focus-visible {
	outline: 2px solid var(--lunaspeed-accent);
	outline-offset: -3px;
}
.lunaspeed-pill {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
	min-width: 62px;
	height: 32px;
	padding: 0 8px;
	border-radius: 7px;
	border: 1px solid transparent;
	color: var(--lunaspeed-fg);
	font-size: 0.929rem;
	font-weight: 600;
	letter-spacing: 0.01em;
	font-variant-numeric: tabular-nums;
}
.lunaspeed-pill:hover {
	background: var(--lunaspeed-hover);
}
.lunaspeed-pill:focus-visible {
	outline: 2px solid var(--lunaspeed-accent);
	outline-offset: -3px;
}
.lunaspeed-pill[data-active="true"] {
	color: var(--lunaspeed-accent);
	background: color-mix(in srgb, var(--lunaspeed-accent) 14%, transparent);
}
.lunaspeed-pill[data-open="true"] {
	background: var(--lunaspeed-hover);
	border-color: var(--lunaspeed-border);
}
.lunaspeed-gauge {
	width: 13px;
	height: 13px;
	opacity: 0.55;
	flex: none;
}
.lunaspeed-pill[data-active="true"] .lunaspeed-gauge {
	opacity: 1;
}

.lunaspeed-popover {
	position: fixed;
	z-index: 2147483000;
	width: 348px;
	max-width: calc(100vw - 16px);
	box-sizing: border-box;
	padding: 18px;
	border-radius: 16px;
	border: 1px solid var(--lunaspeed-border);
	background: var(--lunaspeed-surface);
	color: var(--lunaspeed-fg);
	font-family: inherit;
	line-height: var(--baseLineHeight, 1.43);
	box-shadow: 0 30px 74px rgba(0, 0, 0, 0.55), 0 1px 0 color-mix(in srgb, var(--lunaspeed-fg) 5%, transparent) inset;
}
.lunaspeed-popover[hidden] {
	display: none;
}
.lunaspeed-pop-head {
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: 12px;
}
.lunaspeed-pop-title {
	font-size: 0.786rem;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--lunaspeed-muted);
	font-weight: 600;
}
.lunaspeed-reset {
	margin: 0;
	padding: 0;
	border: 0;
	background: transparent;
	font-family: inherit;
	font-size: 0.857rem;
	color: var(--lunaspeed-faint);
	cursor: pointer;
}
.lunaspeed-reset:hover {
	color: var(--lunaspeed-fg);
}
.lunaspeed-readout {
	display: flex;
	align-items: flex-end;
	gap: 6px;
	margin: 10px 0 18px;
}
.lunaspeed-value {
	font-size: 2.5rem;
	line-height: 0.95;
	font-weight: 600;
	letter-spacing: -0.035em;
	color: var(--lunaspeed-accent);
	font-variant-numeric: tabular-nums;
}
.lunaspeed-unit {
	font-size: 1.5rem;
	line-height: 1.1;
	color: var(--lunaspeed-accent);
	opacity: 0.85;
	font-weight: 500;
}

.lunaspeed-slider {
	position: relative;
	height: 26px;
	margin: 0 2px;
}
.lunaspeed-slider-rail,
.lunaspeed-slider-fill {
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	height: 5px;
	border-radius: 999px;
}
.lunaspeed-slider-rail {
	right: 0;
	background: color-mix(in srgb, var(--lunaspeed-fg) 14%, transparent);
}
.lunaspeed-slider-fill {
	width: calc(8px + (100% - 16px) * var(--lunaspeed-pos, 0));
	background: var(--lunaspeed-accent);
}
.lunaspeed-slider-fill,
.lunaspeed-slider-thumb {
	transition: none;
}
.lunaspeed-slider[data-settling="true"] .lunaspeed-slider-fill,
.lunaspeed-slider[data-settling="true"] .lunaspeed-slider-thumb {
	transition: left 0.14s ease, width 0.14s ease;
}
.lunaspeed-slider-thumb {
	position: absolute;
	left: calc(8px + (100% - 16px) * var(--lunaspeed-pos, 0));
	top: 50%;
	width: 16px;
	height: 16px;
	transform: translate(-50%, -50%);
	border-radius: 50%;
	background: var(--lunaspeed-fg);
	box-shadow: 0 0 0 4px color-mix(in srgb, var(--lunaspeed-accent) 22%, transparent), 0 2px 6px rgba(0, 0, 0, 0.45);
	pointer-events: none;
}
.lunaspeed-range {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	opacity: 0;
	cursor: pointer;
	-webkit-appearance: none;
	appearance: none;
}
.lunaspeed-slider:focus-within {
	outline: 2px solid var(--lunaspeed-accent);
	outline-offset: 2px;
	border-radius: 999px;
}
.lunaspeed-ticks {
	position: relative;
	height: 24px;
	margin: 6px 2px 0;
}
.lunaspeed-ticks::before {
	content: "";
	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	height: 1px;
	margin-top: -0.5px;
	background: color-mix(in srgb, var(--lunaspeed-fg) 16%, transparent);
}
.lunaspeed-tick {
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	font-size: 0.714rem;
	color: var(--lunaspeed-faint);
	font-variant-numeric: tabular-nums;
	background: var(--lunaspeed-surface);
	padding: 0 6px;
	line-height: 1.1;
	box-shadow: 0 0 6px 3px var(--lunaspeed-surface);
}
.lunaspeed-tick:first-child {
	transform: translate(0, -50%);
}
.lunaspeed-tick:last-child {
	transform: translate(-100%, -50%);
}
.lunaspeed-switch-row {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-top: 12px;
}
.lunaspeed-switch-label {
	flex: 1;
	font-size: 0.929rem;
	font-weight: 600;
	color: var(--lunaspeed-fg);
}
.lunaspeed-switch {
	position: relative;
	flex: none;
	width: 38px;
	height: 22px;
	padding: 0;
	border: 0;
	border-radius: 999px;
	background: color-mix(in srgb, var(--lunaspeed-fg) 16%, transparent);
	cursor: pointer;
	-webkit-appearance: none;
	appearance: none;
}
.lunaspeed-switch[aria-checked="true"] {
	background: var(--lunaspeed-accent);
}
.lunaspeed-switch::after {
	content: "";
	position: absolute;
	top: 3px;
	left: 3px;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: var(--lunaspeed-fg);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	transition: left 0.15s ease;
}
.lunaspeed-switch[aria-checked="true"]::after {
	left: 19px;
}
.lunaspeed-switch:focus-visible {
	outline: 2px solid var(--lunaspeed-accent);
	outline-offset: 2px;
}
.lunaspeed-warning,
.lunaspeed-quality {
	display: flex;
	flex-direction: column;
	gap: 4px;
	margin-top: 12px;
	padding: 10px 12px;
	border-radius: 10px;
	border: 1px solid color-mix(in srgb, var(--lunaspeed-fg) 16%, transparent);
	background: color-mix(in srgb, var(--lunaspeed-fg) 6%, transparent);
}
.lunaspeed-warning[hidden],
.lunaspeed-quality[hidden] {
	display: none;
}
.lunaspeed-warning-title {
	font-size: 0.857rem;
	font-weight: 600;
	color: var(--lunaspeed-fg);
}
.lunaspeed-warning-text,
.lunaspeed-quality-text {
	font-size: 0.786rem;
	line-height: 1.45;
	color: var(--lunaspeed-muted);
}
.lunaspeed-warning-action,
.lunaspeed-quality-action {
	align-self: flex-start;
	margin: 4px 0 0;
	padding: 0;
	border: 0;
	background: transparent;
	color: var(--lunaspeed-accent);
	font-family: inherit;
	font-size: 0.786rem;
	font-weight: 600;
	cursor: pointer;
	text-decoration: underline;
	text-underline-offset: 2px;
}
.lunaspeed-warning-action:hover,
.lunaspeed-quality-action:hover {
	filter: brightness(1.2);
}
.lunaspeed-warning-action:disabled,
.lunaspeed-quality-action:disabled {
	color: var(--lunaspeed-faint);
	cursor: default;
	text-decoration: none;
}
.lunaspeed-foot-actions {
	display: flex;
	align-items: center;
	gap: 12px;
}
.lunaspeed-foot {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	margin-top: 10px;
	padding-top: 10px;
	border-top: 1px solid var(--lunaspeed-border);
}
.lunaspeed-version {
	font-size: 0.714rem;
	color: var(--lunaspeed-faint);
	font-variant-numeric: tabular-nums;
}
.lunaspeed-copy,
.lunaspeed-settings {
	margin: 0;
	padding: 0;
	border: 0;
	background: transparent;
	font-family: inherit;
	font-size: 0.786rem;
	color: var(--lunaspeed-muted);
	cursor: pointer;
}
.lunaspeed-copy:hover,
.lunaspeed-settings:hover {
	color: var(--lunaspeed-fg);
}
.lunaspeed-copy:disabled {
	color: var(--lunaspeed-faint);
	cursor: default;
}
.lunaspeed-copy:focus-visible,
.lunaspeed-settings:focus-visible {
	outline: 2px solid var(--lunaspeed-accent);
	outline-offset: 2px;
}
.lunaspeed-presets {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
	margin: 0 0 8px;
}
.lunaspeed-presets::-webkit-scrollbar {
	display: none;
}
.lunaspeed-presets[hidden] {
	display: none;
}
.lunaspeed-preset,
.lunaspeed-save-toggle {
	flex: 0 0 auto;
	border: 1px solid var(--lunaspeed-border);
	background: transparent;
	color: var(--lunaspeed-muted);
	font-family: inherit;
	font-size: 0.786rem;
	font-weight: 600;
	padding: 5px 10px;
	border-radius: 999px;
	cursor: pointer;
}
.lunaspeed-preset:hover,
.lunaspeed-save-toggle:hover {
	color: var(--lunaspeed-fg);
	background: var(--lunaspeed-hover);
}
.lunaspeed-preset[data-active="true"] {
	color: var(--lunaspeed-accent);
	border-color: color-mix(in srgb, var(--lunaspeed-accent) 55%, transparent);
	background: color-mix(in srgb, var(--lunaspeed-accent) 12%, transparent);
}
.lunaspeed-save-toggle {
	align-self: flex-start;
	margin: 0 0 14px;
	border-style: dashed;
}
.lunaspeed-save {
	display: flex;
	gap: 6px;
	margin: 0 0 14px;
}
.lunaspeed-save[hidden] {
	display: none;
}
.lunaspeed-save-input {
	flex: 1;
	min-width: 0;
	height: 28px;
	border-radius: 8px;
	border: 1px solid var(--lunaspeed-border);
	background: color-mix(in srgb, var(--lunaspeed-fg) 5%, transparent);
	color: var(--lunaspeed-fg);
	font-family: inherit;
	font-size: 0.857rem;
	padding: 0 8px;
}
.lunaspeed-save-input::placeholder {
	color: var(--lunaspeed-faint);
}
.lunaspeed-save-ok,
.lunaspeed-save-cancel {
	border: 1px solid var(--lunaspeed-border);
	background: transparent;
	color: var(--lunaspeed-fg);
	font-family: inherit;
	font-size: 0.786rem;
	border-radius: 8px;
	padding: 0 10px;
	cursor: pointer;
}
.lunaspeed-save-ok:hover,
.lunaspeed-save-cancel:hover {
	background: var(--lunaspeed-hover);
}
.lunaspeed-pitch-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	margin-top: 14px;
}
.lunaspeed-pitch-label {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	font-size: 0.929rem;
	font-weight: 600;
	color: var(--lunaspeed-fg);
}
.lunaspeed-pitch-dot {
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: var(--lunaspeed-faint);
	opacity: 0;
}
.lunaspeed-pitch-dot[data-status="ready"],
.lunaspeed-pitch-dot[data-status="running"],
.lunaspeed-pitch-dot[data-status="waiting"],
.lunaspeed-pitch-dot[data-status="unavailable"] {
	opacity: 1;
}
.lunaspeed-pitch-dot[data-status="running"] {
	background: var(--lunaspeed-accent);
}
.lunaspeed-pitch-dot[data-status="waiting"] {
	background: var(--wave-color-solid-warning-fill, currentColor);
}
.lunaspeed-pitch-dot[data-status="unavailable"] {
	background: var(--wave-color-text-danger, currentColor);
}
.lunaspeed-pitch {
	display: inline-flex;
	align-items: center;
	gap: 2px;
	border: 1px solid var(--lunaspeed-border);
	border-radius: 8px;
	padding: 2px;
}
.lunaspeed-pitch-step {
	width: 26px;
	height: 24px;
	border: 0;
	background: transparent;
	color: var(--lunaspeed-muted);
	font-family: inherit;
	font-size: 1.071rem;
	font-weight: 500;
	line-height: 1;
	border-radius: 6px;
	cursor: pointer;
}
.lunaspeed-pitch-step:hover:not(:disabled) {
	background: var(--lunaspeed-hover);
	color: var(--lunaspeed-fg);
}
.lunaspeed-pitch-step:disabled {
	opacity: 0.35;
	cursor: default;
}
.lunaspeed-pitch-value {
	min-width: 44px;
	text-align: center;
	font-size: 0.857rem;
	color: var(--lunaspeed-fg);
	font-variant-numeric: tabular-nums;
}
.lunaspeed-slider[data-locked="true"] {
	opacity: 0.45;
}
.lunaspeed-slider[data-locked="true"] .lunaspeed-range {
	cursor: default;
}
.lunaspeed-range:disabled {
	pointer-events: none;
}
.lunaspeed-ctl button:disabled,
.lunaspeed-popover button:disabled {
	opacity: 0.4;
	cursor: default;
}
`;var jt=1e4,Wn=12,gt=8,Pr=1e3,wr='<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>',Wt=(e,t,n)=>Math.min(n,Math.max(t,e)),Tr=()=>document.querySelector('[data-test="footer-player"] [class*="utilityButtons"]'),Mr=e=>{switch(e){case"HI_RES_LOSSLESS":return"Max";case"HI_RES":return"Hi-Res";case"LOSSLESS":return"Lossless";case"HIGH":return"High";case"LOW":return"Low";default:return e}},Jn=(e,t,n={})=>{new Qn.StyleTag("lunaspeed-styles",e,jn);let a=document.createElement("div");a.className="lunaspeed-ctl",a.dataset.lunaspeed="control";let r=document.createElement("button");r.type="button",r.className="lunaspeed-step",r.textContent="\u2212",r.setAttribute("aria-label","Slower");let i=document.createElement("button");i.type="button",i.className="lunaspeed-pill",i.setAttribute("aria-label","Playback speed"),i.setAttribute("aria-haspopup","dialog"),i.innerHTML=`${wr}<span class="lunaspeed-pill-label"></span>`;let c=i.querySelector(".lunaspeed-pill-label"),s=document.createElement("button");s.type="button",s.className="lunaspeed-step",s.textContent="+",s.setAttribute("aria-label","Faster"),a.append(r,i,s);let l=document.createElement("div");l.className="lunaspeed-popover",l.setAttribute("role","dialog"),l.setAttribute("aria-label","Playback settings"),l.hidden=!0,l.innerHTML=`
		<div class="lunaspeed-pop-head">
			<span class="lunaspeed-pop-title">Playback</span>
			<button class="lunaspeed-reset" type="button">Reset</button>
		</div>
		<div class="lunaspeed-readout">
			<span class="lunaspeed-value">1</span><span class="lunaspeed-unit">\xD7</span>
		</div>
		<div class="lunaspeed-presets" role="group" aria-label="Presets"></div>
		<button class="lunaspeed-save-toggle" type="button">Save preset</button>
		<form class="lunaspeed-save" hidden>
			<input class="lunaspeed-save-input" type="text" maxlength="24" placeholder="Preset name" aria-label="Preset name" />
			<button class="lunaspeed-save-ok" type="submit">Save</button>
			<button class="lunaspeed-save-cancel" type="button">Cancel</button>
		</form>
		<div class="lunaspeed-slider">
			<div class="lunaspeed-slider-rail"></div>
			<div class="lunaspeed-slider-fill"></div>
			<div class="lunaspeed-slider-thumb"></div>
			<input class="lunaspeed-range" type="range" min="0" max="${jt}" step="1" aria-label="Playback speed slider" />
		</div>
		<div class="lunaspeed-ticks"></div>
		<div class="lunaspeed-pitch-row">
			<span class="lunaspeed-pitch-label">Pitch shift<span class="lunaspeed-pitch-dot" data-status="idle"></span></span>
			<div class="lunaspeed-pitch">
				<button class="lunaspeed-pitch-step" type="button" data-delta="-1" aria-label="Lower pitch">\u2212</button>
				<span class="lunaspeed-pitch-value">0 st</span>
				<button class="lunaspeed-pitch-step" type="button" data-delta="1" aria-label="Raise pitch">+</button>
			</div>
		</div>
		<div class="lunaspeed-switch-row">
			<span class="lunaspeed-switch-label">Pitch follows speed</span>
			<button class="lunaspeed-switch" type="button" role="switch" aria-checked="false" aria-label="Pitch follows speed"></button>
		</div>
		<div class="lunaspeed-warning" hidden>
			<span class="lunaspeed-warning-title">Native (lossless) player</span>
			<span class="lunaspeed-warning-text">TIDAL ignores speed and pitch here. They need the browser player.</span>
			<button class="lunaspeed-warning-action" type="button">Use browser player</button>
		</div>
		<div class="lunaspeed-quality" hidden>
			<span class="lunaspeed-quality-text">TIDAL is on High quality so speed can work.</span>
			<button class="lunaspeed-quality-action" type="button">Restore lossless</button>
		</div>
		<div class="lunaspeed-foot">
			<span class="lunaspeed-version">v${_e}</span>
			<span class="lunaspeed-foot-actions">
				<button class="lunaspeed-settings" type="button">Luna settings</button>
				<button class="lunaspeed-copy" type="button">Copy diagnostics</button>
			</span>
		</div>`;let f=l.querySelector(".lunaspeed-value"),b=l.querySelector(".lunaspeed-presets"),k=l.querySelector(".lunaspeed-save-toggle"),E=l.querySelector(".lunaspeed-save"),g=l.querySelector(".lunaspeed-save-input"),N=l.querySelector(".lunaspeed-save-cancel"),L=l.querySelector(".lunaspeed-slider"),M=l.querySelector(".lunaspeed-range"),xe=l.querySelector(".lunaspeed-ticks"),W=l.querySelector(".lunaspeed-pitch-value"),S=[...l.querySelectorAll(".lunaspeed-pitch-step")],re=l.querySelector(".lunaspeed-switch"),ie=l.querySelector(".lunaspeed-reset"),H=l.querySelector(".lunaspeed-copy"),Q=l.querySelector(".lunaspeed-settings"),R=l.querySelector(".lunaspeed-pitch-dot"),_=l.querySelector(".lunaspeed-warning"),B=l.querySelector(".lunaspeed-warning-action"),z=l.querySelector(".lunaspeed-quality"),oe=l.querySelector(".lunaspeed-quality-action"),ge="",J="",O=!1,se=!1,le,o,p=u=>{L.style.setProperty("--lunaspeed-pos",String(Wt(u,0,1)))},A=(u,y)=>{let x=Je(u,y);M.value=String(Math.round(x*jt)),p(x)},De=()=>{let{bounds:u}=t.get(),y=`${u.min}:${u.max}`;y!==ge&&(ge=y,xe.replaceChildren(...En(u).map(x=>{let w=document.createElement("span");return w.className="lunaspeed-tick",w.style.left=`${(Je(x,u)*100).toFixed(3)}%`,w.textContent=Be(x),w})))},ke=u=>u===null?"Custom":n.presets?.list().find(y=>y.id===u)?.name??"Custom",un=()=>{let u=n.presets;if(u===void 0){b.hidden=!0,E.hidden=!0;return}let y=u.list(),x=t.get(),w=x.presetId,q=y.find(C=>C.id===w),Y=q!==void 0&&!et(q,x),de=`${y.map(C=>`${C.id}:${C.name}`).join("|")}::${w??""}::${Y}`;if(de===J)return;J=de;let X=[],$=document.createElement("button");$.type="button",$.className="lunaspeed-preset",$.textContent="Custom",$.dataset.active=String(w===null),$.setAttribute("aria-pressed",String(w===null)),$.addEventListener("click",()=>u.clear()),X.push($);for(let C of y){let he=document.createElement("button");he.type="button",he.className="lunaspeed-preset";let Mt=w===C.id;he.textContent=Mt&&Y?`${C.name} *`:C.name,he.dataset.active=String(Mt),he.setAttribute("aria-pressed",String(Mt)),he.dataset.builtin=String(C.builtin===!0),he.title=`${C.name} \u2014 ${Be(C.speed)} \xB7 ${C.pitchShifts?"pitch follows speed":C.pitchSemitones!==0?`pitch ${We(C.pitchSemitones)} st`:"pitch preserved"} \xB7 ${ot(C.effects)}`,he.addEventListener("click",()=>u.apply(C)),X.push(he)}b.replaceChildren(...X)},La=(u,y)=>{W.textContent=`${We(u)} st`;for(let x of S){let w=Number(x.dataset.delta);x.disabled=w<0?u<=-12:u>=12,x.title=w<0?"Lower pitch by 1 semitone":"Raise pitch by 1 semitone"}re.setAttribute("aria-checked",String(y))},pn=u=>{let y=n.getPitchEngineState?.(),x=u===0?"idle":y?.status??"idle";R.dataset.status=x;let w=x==="running"?"Pitch engine active":x==="waiting"?"Pitch engine waiting for the audio element":x==="unavailable"?"Pitch engine unavailable"+(y?.reason===void 0?"":": "+y.reason):x==="ready"?"Pitch engine ready":"Pitch engine idle";R.title=u===0?"":w,R.setAttribute("aria-label",u===0?"":w)},Pt=u=>{_.hidden=u!=="native";let y=n.previousQuality?.()??null,x=u!=="native"&&y!==null;z.hidden=!x,x&&y!==null&&(oe.textContent=`Restore ${Mr(y)}`)},wt=()=>{let u=t.get(),{speed:y,pitchShifts:x,pitchSemitones:w,bounds:q,presetId:Y}=u,de=Be(y);c.textContent=de,i.dataset.active=String(y!==1||x||w!==0);let X=n.presets?.list().find(C=>C.id===Y),$=X!==void 0&&!et(X,u);i.title=`Playback ${de}${Y===null?"":` \xB7 ${ke(Y)}${$?" *":""}`}`,r.setAttribute("aria-label",`Slower by ${Be(q.step)}`),s.setAttribute("aria-label",`Faster by ${Be(q.step)}`),r.title=`\u2212${te(q.step)}\xD7`,s.title=`+${te(q.step)}\xD7`,f.textContent=te(y),se||A(y,q),M.setAttribute("aria-valuetext",de),De(),un(),La(w,x),pn(w),H.hidden=!u.developerMode,O&&Tt()},Tt=()=>{let u=i.getBoundingClientRect(),y=l.offsetWidth||348,x=l.offsetHeight||240,w=Wt(u.left+u.width/2-y/2,gt,window.innerWidth-y-gt),q=u.top-x-Wn,Y="top";q<gt&&(q=Math.min(u.bottom+Wn,window.innerHeight-x-gt),Y="bottom"),l.style.left=`${Math.round(w)}px`,l.style.top=`${Math.round(q)}px`,l.dataset.side=Y;let de=Wt(u.left+u.width/2-w,18,y-18);l.style.setProperty("--lunaspeed-caret",`${Math.round(de)}px`)},fn=u=>{let y=u.target;y!==null&&(l.contains(y)||a.contains(y)||Ne())},mn=u=>{u.key==="Escape"&&(u.preventDefault(),Ne(),i.focus())},gn=()=>{O&&Tt()},Ca=()=>{O||(O=!0,l.hidden=!1,i.dataset.open="true",wt(),Pt(n.getPlayerKind?.()??"unknown"),Tt(),n.onOpen?.(),document.addEventListener("pointerdown",fn,!0),document.addEventListener("keydown",mn,!0),window.addEventListener("resize",gn),le=setInterval(()=>pn(t.get().pitchSemitones),500),h("debug","popover open"))},Ne=()=>{O&&(O=!1,l.hidden=!0,delete i.dataset.open,E.hidden=!0,le!==void 0&&(clearInterval(le),le=void 0),document.removeEventListener("pointerdown",fn,!0),document.removeEventListener("keydown",mn,!0),window.removeEventListener("resize",gn))},Da=()=>O?Ne():Ca(),hn=()=>{if(!a.isConnected){O&&Ne();let y=Tr();if(y===null)return;let x=y.querySelector('[class*="sliderContainer"]');x!==null&&x.parentElement===y?y.insertBefore(a,x):y.appendChild(a)}let u=document.getElementById("wimp")??document.body;l.parentElement!==u&&u.appendChild(l)};k.addEventListener("click",()=>{if(E.hidden=!E.hidden,E.hidden)return;let u=n.presets?.list().find(y=>y.id===t.get().presetId);g.value=u===void 0?"":u.builtin===!0?`${u.name} (edited)`:u.name,g.focus(),g.select()}),r.addEventListener("click",()=>t.step(-1)),s.addEventListener("click",()=>t.step(1)),i.addEventListener("click",Da),M.addEventListener("pointerdown",()=>{se=!0,o!==void 0&&clearTimeout(o),delete L.dataset.settling});let Ge=()=>{if(!se)return;se=!1;let{speed:u,bounds:y}=t.get();L.dataset.settling="true",A(u,y),o!==void 0&&clearTimeout(o),o=setTimeout(()=>{o=void 0,delete L.dataset.settling},160)};M.addEventListener("change",Ge),window.addEventListener("pointerup",Ge),window.addEventListener("pointercancel",Ge),M.addEventListener("input",()=>{if(M.disabled)return;let u=Number(M.value)/jt,y=t.get().bounds;p(u),t.setSpeed(kn(u,y))}),l.addEventListener("keydown",u=>{u.key==="ArrowLeft"||u.key==="ArrowDown"?(u.preventDefault(),t.step(-1)):(u.key==="ArrowRight"||u.key==="ArrowUp")&&(u.preventDefault(),t.step(1))});for(let u of S)u.addEventListener("click",()=>{let y=Number(u.dataset.delta);t.setPitchSemitones(t.get().pitchSemitones+y)});re.addEventListener("click",()=>t.setPitchShifts(!t.get().pitchShifts)),ie.addEventListener("click",()=>t.reset()),E.addEventListener("submit",u=>{u.preventDefault();let y=n.presets;if(y===void 0)return;let x=g.value.trim();if(x==="")return;let{speed:w,pitchShifts:q,pitchSemitones:Y,effects:de}=t.get(),X=y.list().find($=>$.id===t.get().presetId);if(X!==void 0&&X.builtin!==!0&&x===X.name)y.saveActive(X);else{let $=y.save(x,{speed:w,pitchShifts:q,pitchSemitones:Y,effects:de});if($===void 0)return;y.apply($)}g.value="",E.hidden=!0,J="",un(),h("info","preset saved",{name:x})}),N.addEventListener("click",()=>{E.hidden=!0,g.value=""}),Q.hidden=n.openSettings===void 0,Q.addEventListener("click",()=>{n.openSettings?.(),Ne()});let Ke;H.addEventListener("click",async()=>{Ke!==void 0&&clearTimeout(Ke),H.disabled=!0,H.textContent="Copying\u2026";let u=await Oe(t.get());h(u?"info":"error","diagnostics copied",{copied:u}),H.textContent=u?"Copied":"Copy failed",Ke=setTimeout(()=>{H.textContent="Copy diagnostics",H.disabled=!1},1800)});let Ue;B.addEventListener("click",()=>{n.useBrowserPlayer!==void 0&&(Ue!==void 0&&clearTimeout(Ue),B.disabled=!0,B.textContent="Switching\u2026",n.useBrowserPlayer(),h("info","requested browser player from warning"),Ue=setTimeout(()=>{B.disabled=!1,B.textContent="Use browser player"},2500))}),oe.addEventListener("click",()=>{n.restoreQuality!==void 0&&(n.restoreQuality(),z.hidden=!0,h("info","restored original streaming quality"))}),Pt(n.getPlayerKind?.()??"unknown");let bn=n.subscribePlayerKind?.(Pt);bn!==void 0&&e.add(bn),hn(),wt(),e.add(t.subscribe(wt));let Na=setInterval(hn,Pr);e.add(()=>{clearInterval(Na),window.removeEventListener("pointerup",Ge),window.removeEventListener("pointercancel",Ge),Ke!==void 0&&clearTimeout(Ke),Ue!==void 0&&clearTimeout(Ue),o!==void 0&&clearTimeout(o),Ne(),l.remove(),a.remove()})};var Se,Fe={built:!1,active:[],attached:0},Yn=()=>({...Fe}),Lr=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Cr=(e,t)=>{let n=Math.max(1,Math.floor(e.sampleRate*t)),a=e.createBuffer(2,n,e.sampleRate);for(let r=0;r<2;r+=1){let i=a.getChannelData(r);for(let c=0;c<n;c+=1){let s=Math.pow(1-c/n,2.2);i[c]=(Math.random()*2-1)*s}}return a},Dr=async()=>{let e=await pe();if(Se!==void 0)return Se;let t=e.createGain(),n=Ie.map((A,De)=>{let ke=e.createBiquadFilter();return ke.frequency.value=A,De===0?ke.type="lowshelf":De===Ie.length-1?ke.type="highshelf":(ke.type="peaking",ke.Q.value=1.2),ke}),a=e.createGain(),r=e.createDelay(2),i=e.createGain(),c=e.createGain(),s=e.createGain(),l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=220,l.Q.value=.7;let f=e.createBiquadFilter();f.type="lowshelf",f.frequency.value=45;let b=e.createBiquadFilter();b.type="lowshelf",b.frequency.value=90;let k=e.createGain(),E=e.createWaveShaper(),g=new Float32Array(2048);for(let A=0;A<g.length;A+=1){let De=A/(g.length-1)*2-1;g[A]=Math.tanh(3*De)/Math.tanh(3)}E.curve=g,E.oversample="4x";let N=e.createGain(),L=e.createDynamicsCompressor();L.threshold.value=-3,L.knee.value=0,L.ratio.value=20,L.attack.value=.003,L.release.value=.25;let M=e.createGain(),xe=e.createChannelSplitter(2),W=e.createDelay(.05);W.delayTime.value=.015;let S=e.createDelay(.05);S.delayTime.value=.015;let re=e.createChannelMerger(2),ie=e.createStereoPanner(),H=e.createGain();H.gain.value=1;let Q=e.createGain();Q.gain.value=0;let R=e.createGain(),_=e.createOscillator();_.type="sine",_.frequency.value=.12;let B=e.createGain();B.gain.value=0;let z=e.createOscillator();z.type="sine",z.frequency.value=.35;let oe=e.createGain();oe.gain.value=0;let ge=e.createGain();ge.gain.value=0,_.connect(B),B.connect(ie.pan),z.connect(oe),z.connect(ge),oe.connect(W.delayTime),ge.connect(S.delayTime),_.start(),z.start(),M.connect(H),H.connect(R),M.connect(xe),xe.connect(W,0),xe.connect(S,1),W.connect(re,0,0),S.connect(re,0,1),re.connect(ie),ie.connect(Q),Q.connect(R);let J=e.createGain(),O=e.createGain(),se=e.createConvolver(),le=e.createGain(),o=e.createGain();t.connect(n[0]);for(let A=1;A<n.length;A+=1)n[A-1].connect(n[A]);let p=n[n.length-1];return p.connect(s),s.connect(M),p.connect(l),l.connect(f),f.connect(b),b.connect(k),k.connect(E),E.connect(N),N.connect(M),R.connect(a),R.connect(r),a.connect(J),r.connect(i),i.connect(J),r.connect(c),c.connect(r),J.connect(O),O.connect(L),J.connect(se),se.connect(le),le.connect(L),L.connect(o),Se={fxIn:t,eqFilters:n,delayDry:a,delayNode:r,delayWet:i,delayFeedback:c,bassDry:s,bassLowpass:l,bassSub:f,bassBoost:b,bassDrive:k,bassShaper:E,bassWet:N,eightDInput:M,eightDSplitter:xe,eightDDelayL:W,eightDDelayR:S,eightDMerger:re,eightDPanner:ie,eightDDry:H,eightDWet:Q,eightDOut:R,panLfo:_,panDepth:B,pitchLfo:z,pitchDepthL:oe,pitchDepthR:ge,limiter:L,reverbIn:J,reverbDry:O,convolver:se,reverbWet:le,fxOut:o,decay:0},await mt(t,o),h("info","effects graph inserted"),Se},Nr=(e,t)=>{if(Se===void 0)return;let n=e.currentTime,a=.06,r=Se;for(let b=0;b<r.eqFilters.length;b+=1){let k=t.eq.enabled?t.eq.bands[b]??0:0;r.eqFilters[b].gain.setTargetAtTime(k,n,a)}let i=t.bass.enabled?t.bass.mix:0;r.bassDry.gain.setTargetAtTime(1,n,a),r.bassWet.gain.setTargetAtTime(i,n,a),r.bassSub.gain.setTargetAtTime(t.bass.enabled?t.bass.sub:0,n,a),r.bassBoost.gain.setTargetAtTime(t.bass.enabled?t.bass.boost:0,n,a),r.bassDrive.gain.setTargetAtTime(t.bass.enabled?1+t.bass.drive*3:1,n,a),r.panLfo.frequency.setTargetAtTime(t.eightD.rate,n,a),r.panDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.panDepth:0,n,a),r.pitchLfo.frequency.setTargetAtTime(t.eightD.pitchRate,n,a);let c=t.eightD.enabled?t.eightD.pitchDepth/1e3:0;r.pitchDepthL.gain.setTargetAtTime(c,n,a),r.pitchDepthR.gain.setTargetAtTime(-c,n,a);let s=t.eightD.enabled?t.eightD.mix:0;r.eightDDry.gain.setTargetAtTime(1-s,n,a),r.eightDWet.gain.setTargetAtTime(s,n,a);let l=t.delay.enabled?t.delay.mix:0;r.delayNode.delayTime.setTargetAtTime(Math.min(2,Math.max(.02,t.delay.timeMs/1e3)),n,a),r.delayFeedback.gain.setTargetAtTime(t.delay.enabled?t.delay.feedback:0,n,a),r.delayWet.gain.setTargetAtTime(l,n,a),r.delayDry.gain.setTargetAtTime(1-l,n,a);let f=t.reverb.enabled?t.reverb.mix:0;Math.abs(r.decay-t.reverb.decay)>.05&&(r.convolver.buffer=Cr(e,t.reverb.decay),r.decay=t.reverb.decay),r.reverbWet.gain.setTargetAtTime(f,n,a),r.reverbDry.gain.setTargetAtTime(1-f,n,a)},Qt=async(e,t)=>{let n=G(e),a=it(n);if(!a&&Se===void 0){Fe={...Fe,active:[]};return}try{let r=await pe();if(r.state!=="running"){Fe={built:Se!==void 0,context:r.state,active:[],error:"audio context suspended (interact with the page)",attached:I().sources};return}if(a){let c=Lr(t);c!==void 0&&await Me(c)}let i=await Dr();Nr(r,n),Fe={built:!0,context:r.state,active:[n.eq.enabled?"eq":"",n.bass.enabled?"bass":"",n.eightD.enabled?"8d":"",n.delay.enabled?"delay":"",n.reverb.enabled?"reverb":""].filter(c=>c!==""),attached:I().sources},i.decay===0&&n.reverb.enabled&&(i.decay=n.reverb.decay)}catch(r){let i=r instanceof Error?r.message:String(r);Fe={built:Se!==void 0,context:I().context,active:[],error:i,attached:I().sources},h("warn","effects engine unavailable",{error:i})}};var ea="#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two",Xn=["loadstart","loadedmetadata","canplay","playing","play","emptied","ratechange","seeked"],ht=.001,Zn=1,Ar=150,bt=e=>{let t=e.id;return typeof t=="string"?t:e.constructor.name},ae=()=>typeof document>"u"?[]:[...document.querySelectorAll(ea)],yt=class{constructor(t,n){this.getElements=t;this.source=n}getElements;source;attachments=new Map;timers=new Set;start(){this.scan()}scan(){let t=this.getElements(),n=0;for(let a of t)this.attachments.has(a)||(this.attach(a),n+=1);n>0?h("info","attached media elements",{added:n,total:this.attachments.size,found:t.length}):t.length===0&&h("debug","no media elements found",{selector:ea})}apply(){this.scan();for(let t of this.attachments.keys())this.applyTo(t,"settings-change")}stop(){for(let t of this.timers)clearTimeout(t);this.timers.clear();for(let[t,n]of this.attachments)n(),this.restore(t);this.attachments.clear(),h("info","controller stopped")}attach(t){let n=a=>{let r=this.source.get().speed,i=t.playbackRate;Math.abs(i-r)>ht&&h("warn","TIDAL reset the rate",{id:bt(t),event:a.type,before:i,desired:r,currentTime:t.currentTime}),this.applyTo(t,a.type),(a.type==="loadstart"||a.type==="emptied")&&this.scheduleReapply(t)};for(let a of Xn)t.addEventListener(a,n);this.attachments.set(t,()=>{for(let a of Xn)t.removeEventListener(a,n)}),h("info","attached",{id:bt(t),tag:t.constructor.name,rate:t.playbackRate}),this.applyTo(t,"attach")}applyTo(t,n){let{speed:a,pitchShifts:r}=this.source.get(),i=t.playbackRate;try{Math.abs(i-a)>ht&&(t.playbackRate=a),t.defaultPlaybackRate!==void 0&&Math.abs(t.defaultPlaybackRate-a)>ht&&(t.defaultPlaybackRate=a);let s=!r;t.preservesPitch!==void 0&&t.preservesPitch!==s&&(t.preservesPitch=s),t.webkitPreservesPitch!==void 0&&t.webkitPreservesPitch!==s&&(t.webkitPreservesPitch=s)}catch(s){h("error","failed to apply rate",{id:bt(t),reason:n,error:String(s)});return}let c=t.playbackRate;Math.abs(c-i)>ht&&h("debug","applied rate",{id:bt(t),reason:n,before:i,after:c,readback:c,defaultRate:t.defaultPlaybackRate})}scheduleReapply(t){let n=setTimeout(()=>{this.timers.delete(n),this.attachments.has(t)&&this.applyTo(t,"delayed-reapply")},Ar);this.timers.add(n)}restore(t){try{t.playbackRate=Zn,t.defaultPlaybackRate!==void 0&&(t.defaultPlaybackRate=Zn),t.preservesPitch!==void 0&&(t.preservesPitch=!0),t.webkitPreservesPitch!==void 0&&(t.webkitPreservesPitch=!0)}catch{}}};var vt="__lunaspeedPatched",V,U,ta=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||t.Player===void 0||t.Player.prototype===void 0))return t},Jt=e=>{let t=new Set,n=e,a=0;for(;n!==null&&a<4;){for(let r of Object.getOwnPropertyNames(n))t.add(r);n=Object.getPrototypeOf(n),a+=1}return[...t]},na=e=>{let t=Jt(e),n=t.find(a=>/^set(playback|audio)?(rate|speed|tempo)$/i.test(a));return n!==void 0&&typeof e[n]=="function"?n:typeof e.playbackRate=="number"?"playbackRate":t.find(a=>/^(playbackRate|rate|speed)$/i.test(a)&&typeof e[a]=="number")},Ir=e=>{V!==e&&(V=e,U=na(e),h("info","native player instance captured",{rateMember:U??null,ownKeys:Object.keys(e).slice(0,40),methods:Jt(e).slice(0,80)}))},Yt=()=>{let e=ta();if(e===void 0)return!1;let t=e.Player?.prototype;if(t===void 0)return!1;if(t[vt]===!0)return!0;try{Object.defineProperty(t,vt,{value:!0,enumerable:!1})}catch{return!1}for(let n of["play","load","pause","seek"]){let a=t[n];typeof a=="function"&&(t[n]=function(...i){try{Ir(this)}catch(c){h("error","native capture failed",{error:String(c)})}return a.apply(this,i)})}return h("info","native player component patched"),!0},aa=()=>V!==void 0,Xt=e=>{if(V===void 0||(U===void 0&&(U=na(V)),U===void 0))return!1;try{let t=V[U];if(U==="playbackRate"){if(t===e)return!0;V.playbackRate=e}else V[U](e);return h("info","native rate applied",{rate:e,member:U,readback:V[U]}),!0}catch(t){return h("error","native rate failed",{rate:e,member:U,error:String(t)}),!1}},St=()=>{let e=ta();if(e===void 0)return{present:!1};let t=e.Player?.prototype,n=t===void 0?[]:Object.getOwnPropertyNames(t).filter(a=>a!==vt);return{present:!0,patched:t!==void 0&&t[vt]===!0,playerMethods:n.slice(0,100),rateMethods:n.filter(a=>/rate|speed|tempo|pitch/i.test(a)),instanceCaptured:V!==void 0,rateMember:U??null,instanceMethods:V===void 0?[]:Jt(V).slice(0,100)}};var ra=`
class PlaybackKitPitch extends AudioWorkletProcessor {
	static get parameterDescriptors() {
		return [{ name: "ratio", defaultValue: 1, minValue: 0.25, maxValue: 4, automationRate: "k-rate" }];
	}

	constructor() {
		super();
		this.size = Math.ceil(sampleRate * 0.25);
		this.maxDelay = Math.floor(sampleRate * 0.06);
		this.buffers = [];
		this.write = 0;
		this.phase = 0;
		this.ratio = 1;
	}

	buffer(channel) {
		if (this.buffers[channel] === undefined) this.buffers[channel] = new Float32Array(this.size);
		return this.buffers[channel];
	}

	read(buffer, delay) {
		let index = this.write - delay;
		while (index < 0) index += this.size;
		const base = Math.floor(index);
		const i0 = base % this.size;
		const i1 = (i0 + 1) % this.size;
		const frac = index - base;
		return buffer[i0] * (1 - frac) + buffer[i1] * frac;
	}

	process(inputs, outputs, parameters) {
		const input = inputs[0];
		const output = outputs[0];
		if (input === undefined || input.length === 0) return true;

		const target = parameters.ratio[0];
		const channels = Math.min(input.length, output.length);
		const frames = input[0].length;

		for (let frame = 0; frame < frames; frame++) {
			for (let channel = 0; channel < channels; channel++) {
				this.buffer(channel)[this.write] = input[channel][frame];
			}

			this.ratio += (target - this.ratio) * 0.0008;
			const ratio = Math.abs(this.ratio - 1) < 0.0002 ? 1 : this.ratio;

			if (ratio === 1) {
				for (let channel = 0; channel < channels; channel++) output[channel][frame] = input[channel][frame];
			} else {
				const maxDelay = this.maxDelay;
				const phaseStep = Math.abs(ratio - 1) / maxDelay;
				const up = ratio > 1;

				const p1 = this.phase;
				const p2 = (this.phase + 0.5) % 1;
				const delay1 = Math.max(1, maxDelay * (up ? 1 - p1 : p1));
				const delay2 = Math.max(1, maxDelay * (up ? 1 - p2 : p2));
				const w1 = 1 - Math.abs(2 * p1 - 1);
				const w2 = 1 - w1;

				for (let channel = 0; channel < channels; channel++) {
					const buffer = this.buffer(channel);
					output[channel][frame] = w1 * this.read(buffer, delay1) + w2 * this.read(buffer, delay2);
				}

				this.phase += phaseStep;
				if (this.phase >= 1) this.phase -= 1;
			}

			this.write = (this.write + 1) % this.size;
		}

		return true;
	}
}

registerProcessor("playback-kit-pitch", PlaybackKitPitch);
`;var ia="playback-kit-pitch",fe,j={status:"idle",semitones:0,attached:0},Zt=()=>({...j}),Rr=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Br=async e=>(await Kt(ra,ia),fe===void 0&&(fe=new AudioWorkletNode(e,ia,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]}),await Ut(fe,0),h("info","pitch node inserted into audio engine")),fe),Hr=async(e,t)=>{let n=await pe();if(n.state!=="running"){j={status:"waiting",reason:"audio context suspended (interact with the page)",semitones:e,context:n.state,attached:j.attached};return}let a=Rr(t);if(a===void 0){j={status:"waiting",reason:"no playing media element",semitones:e,context:n.state,attached:j.attached};return}await Me(a);let i=(await Br(n)).parameters.get("ratio");i!==void 0&&(i.value=Sn(e)),j={status:"running",semitones:e,context:n.state,attached:I().sources}},xt=async(e,t)=>{if(e===0){if(fe!==void 0){let n=fe.parameters.get("ratio");n!==void 0&&(n.value=1)}j={...j,status:fe===void 0?"idle":"ready",semitones:0,reason:void 0};return}try{await Hr(e,t)}catch(n){let a=n instanceof Error?n.message:String(n);j={status:"unavailable",reason:a,semitones:e,attached:j.attached},h("error","pitch engine unavailable",{error:a})}},oa=()=>{if(fe!==void 0){let e=fe.parameters.get("ratio");e!==void 0&&(e.value=1)}j={...j,status:fe===void 0?"idle":"ready",semitones:0,reason:void 0}};var kt="unknown",en=new Set,Le=()=>kt,tn=e=>{if(e!==kt){h("info","player kind changed",{from:kt,to:e}),kt=e;for(let t of[...en])try{t(e)}catch(n){h("error","player kind listener failed",{error:String(n)})}}},sa=e=>(en.add(e),()=>en.delete(e));var _r=(e,t)=>{let n=new Set(e.get().map(r=>r.name));if(!n.has(t))return t;let a=2;for(;n.has(`${t} ${a}`);)a+=1;return`${t} ${a}`},la=(e,t,n)=>{let a=e.get(),r={speed:a.speed,pitchShifts:a.pitchShifts,pitchSemitones:a.pitchSemitones,effects:a.effects};if(n.builtin===!0){let i=t.save(_r(t,`${n.name} (edited)`),r);return i!==void 0&&e.applyPreset(i),i}return t.update(n.id,r),n},nt=(e,t)=>{let n=e.get();n.builtinPresets||n.presetId===null||t.getById(n.presetId)?.builtin===!0&&e.clearPreset()};var Or=e=>Math.abs(e-1)>.001,nn=e=>{if(!Or(e.getSpeed())||!e.isPlaying())return!1;let t=e.getPosition();return t===null||!Number.isFinite(t)||t<0?!1:(e.dispatchTimeUpdate(t),!0)},da=(e,t=100)=>{let n=setInterval(()=>nn(e),t);return()=>clearInterval(n)};var d=Ae(rn(),1),m=Ae(ca(),1);var ua=e=>({id:e.id,paused:e.paused,readyState:e.readyState,currentTime:Number(e.currentTime.toFixed(2)),playbackRate:e.playbackRate}),pa=async(e=1200)=>{let t=Date.now(),n=I(),a=ae(),r=a.find(g=>!g.paused&&g.readyState>0)??a[0];if(r===void 0){let g={at:t,ok:!1,reason:"no media element",context:n.context,engine:n};return h("warn","audio self-test: no media element"),g}let i=r.currentTime;try{await Me(r)}catch(g){let N={at:t,ok:!1,reason:g instanceof Error?g.message:String(g),context:I().context,element:ua(r),engine:I()};return h("warn","audio self-test failed to attach",N),N}let c=await pe(),s=0,l=0,f=!0;try{let g=await Vt(e);s=g.rms,l=g.peak,f=g.silent}catch(g){h("error","audio self-test measurement failed",{error:String(g)})}let b=Number((r.currentTime-i).toFixed(2)),k=c.state!=="running"?`audio context ${c.state}`:r.paused?"playback is paused":f&&b>.2?"captured audio is silent (DRM-protected or already routed elsewhere)":f?"no audio measured":void 0,E={at:t,ok:k===void 0,reason:k,context:c.state,element:ua(r),progressionSeconds:b,rms:Number(s.toFixed(5)),peak:Number(l.toFixed(5)),silent:f,engine:I()};return h(E.ok?"info":"warn","audio self-test",E),E};var K=Ae(rn(),1);var qr=132,fa=Z-be,sn=e=>Math.max(be,Math.min(Z,e)),ma=e=>`${e>0?"+":""}${e}`,ga=e=>e>=1e3?`${e/1e3}k`:String(e),$r=({frequency:e,value:t,disabled:n,onChange:a})=>{let r=K.default.useRef(null),[i,c]=K.default.useState(null),s=g=>{let N=r.current;if(N===null)return;let L=N.getBoundingClientRect(),M=Math.max(0,Math.min(1,(g-L.top)/L.height));c(M*100),a(sn(Math.round(Z-M*fa)))},l=i??(Z-t)/fa*100,f=50,b=Math.min(l,f),k=Math.abs(l-f),E=i===null;return K.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:30,opacity:n?.4:1}},K.default.createElement("span",{style:{fontSize:10,fontVariantNumeric:"tabular-nums",color:"currentColor",opacity:.8}},ma(t)),K.default.createElement("div",{ref:r,role:"slider",tabIndex:n?-1:0,"aria-label":`${ga(e)} Hz`,"aria-valuemin":be,"aria-valuemax":Z,"aria-valuenow":t,"aria-valuetext":`${ma(t)} dB`,"aria-disabled":n,onPointerDown:g=>{n||(g.preventDefault(),g.currentTarget.setPointerCapture(g.pointerId),s(g.clientY))},onPointerMove:g=>{n||!g.currentTarget.hasPointerCapture(g.pointerId)||s(g.clientY)},onPointerUp:g=>{g.currentTarget.hasPointerCapture(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),c(null)},onPointerCancel:g=>{g.currentTarget.hasPointerCapture(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),c(null)},onDoubleClick:()=>{n||a(0)},onKeyDown:g=>{if(n)return;let N=g.shiftKey?3:1;if(g.key==="ArrowUp"||g.key==="ArrowRight")a(sn(t+N));else if(g.key==="ArrowDown"||g.key==="ArrowLeft")a(sn(t-N));else if(g.key==="Home")a(be);else if(g.key==="End")a(Z);else return;g.preventDefault()},style:{position:"relative",width:18,height:qr,cursor:n?"default":"pointer",touchAction:"none",outline:"none"}},K.default.createElement("div",{style:{position:"absolute",left:"50%",top:0,bottom:0,width:5,transform:"translateX(-50%)",borderRadius:999,background:"color-mix(in srgb, currentColor 16%, transparent)"}}),K.default.createElement("div",{style:{position:"absolute",left:0,right:0,top:`${f}%`,height:1,background:"color-mix(in srgb, currentColor 28%, transparent)"}}),K.default.createElement("div",{style:{position:"absolute",left:"50%",width:5,transform:"translateX(-50%)",borderRadius:999,top:`${b}%`,height:`${k}%`,background:"var(--wave-color-solid-accent-fill, currentColor)",transition:E?"top 120ms ease, height 120ms ease":"none"}}),K.default.createElement("div",{style:{position:"absolute",left:"50%",top:`${l}%`,width:12,height:12,transform:"translate(-50%, -50%)",borderRadius:"50%",background:"currentColor",boxShadow:"0 0 0 3px color-mix(in srgb, var(--wave-color-solid-accent-fill, currentColor) 22%, transparent), 0 1px 3px rgba(0,0,0,.5)",transition:E?"top 120ms ease":"none"}})),K.default.createElement("span",{style:{fontSize:9,opacity:.6,letterSpacing:"-0.02em"}},ga(e)))},ha=({eq:e,disabled:t,onChange:n})=>K.default.createElement("div",{style:{display:"flex",gap:8,alignItems:"flex-end",marginLeft:"auto",padding:"2px 0"}},Ie.map((a,r)=>K.default.createElement($r,{key:a,frequency:a,value:e.bands[r]??0,disabled:t,onChange:i=>{let c=[...e.bands];c[r]=i,n(c)}})));var ln=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)&&t>0?t:void 0},F=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)?t:void 0},Fr=e=>{let t=e.pitchShifts?"pitch follows speed":e.pitchSemitones===0?"pitch preserved":`pitch ${We(e.pitchSemitones)} st`;return`${te(e.speed)}\xD7 \xB7 ${t} \xB7 ${ot(e.effects)}`},Ce={display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:6,marginLeft:"auto"},at=({children:e})=>d.default.createElement("div",{style:{marginBottom:16}},e),zr=()=>{let[e,t]=d.default.useState(v.get),[n,a]=d.default.useState(T.get),[r,i]=d.default.useState("Copy diagnostics"),[c,s]=d.default.useState("Resolving\u2026"),[l,f]=d.default.useState(""),[b,k]=d.default.useState(null),[E,g]=d.default.useState(!1),[N,L]=d.default.useState("Attaches the playing element, measures captured RMS and reports blocked/silent reasons. May silence playback if capture fails; restart TIDAL to undo.");d.default.useEffect(()=>v.subscribe(t),[]),d.default.useEffect(()=>T.subscribe(()=>a(T.get())),[]),d.default.useEffect(()=>{dt().then(s).catch(()=>s("unavailable"))},[]),d.default.useEffect(()=>{if(r==="Copy diagnostics")return;let o=setTimeout(()=>i("Copy diagnostics"),1800);return()=>clearTimeout(o)},[r]),d.default.useEffect(()=>{if(l==="")return;let o=setTimeout(()=>f(""),4e3);return()=>clearTimeout(o)},[l]);let{bounds:M,pitchShifts:xe,developerMode:W,effects:S,builtinPresets:re}=e,ie=re?n:n.filter(o=>o.builtin!==!0),H=ie.findIndex(o=>o.builtin!==!0),Q=o=>v.setEffects({...S,eq:{...S.eq,...o}}),R=o=>v.setEffects({...S,bass:{...S.bass,...o}}),_=o=>v.setEffects({...S,eightD:{...S.eightD,...o}}),B=o=>v.setEffects({...S,delay:{...S.delay,...o}}),z=o=>v.setEffects({...S,reverb:{...S.reverb,...o}}),oe=async o=>{let p=lt(o);return p===void 0?!1:(v.replace(p.settings),T.replace(p.presets),nt(v,T),await He(tt(p.settings,p.presets)),!0)},ge=async()=>{try{let o=await Dn();if(o===null)return f("Import cancelled");let p=await oe(o.json);f(p?`Imported ${o.path}`:"Import failed: invalid config")}catch(o){f(`Import failed: ${String(o)}`)}},J=async()=>{try{let o=await Cn(tt(v.get(),T.get()));f(o===null?"Export cancelled":`Exported ${o}`)}catch(o){f(`Export failed: ${String(o)}`)}},O=async()=>{try{let o=await ct();if(o===null)return f("Config file not found");let p=await oe(o);f(p?"Reloaded from config file":"Reload failed: invalid config")}catch(o){f(`Reload failed: ${String(o)}`)}},se=o=>{window.confirm(`Overwrite "${o.name}" with the current speed, pitch and effects?`)&&(T.update(o.id,{speed:e.speed,pitchShifts:e.pitchShifts,pitchSemitones:e.pitchSemitones,effects:e.effects}),f(`Updated "${o.name}"`))},le=o=>{window.confirm(`Delete preset "${o.name}"?`)&&(T.remove(o.id),f(`Deleted "${o.name}"`))};return d.default.createElement("div",{style:{paddingBottom:8}},d.default.createElement(at,null,d.default.createElement(m.LunaSettings,{title:"Playback",desc:"Speed and pitch. Effects live in their own section below."},d.default.createElement(m.LunaTextSetting,{title:"Minimum speed",desc:"Below 0.0625\xD7 Chromium plays at its floor.",defaultValue:te(M.min),inputProps:{inputMode:"decimal"},onChange:o=>{let p=ln(o.target.value);p!==void 0&&v.setBounds({min:p})}}),d.default.createElement(m.LunaTextSetting,{title:"Maximum speed",defaultValue:te(M.max),inputProps:{inputMode:"decimal"},onChange:o=>{let p=ln(o.target.value);p!==void 0&&v.setBounds({max:p})}}),d.default.createElement(m.LunaTextSetting,{title:"Snap step",desc:"Slider snapping and the \u2212 / + step size.",defaultValue:te(M.step),inputProps:{inputMode:"decimal"},onChange:o=>{let p=ln(o.target.value);p!==void 0&&v.setBounds({step:p})}}),d.default.createElement(m.LunaSwitchSetting,{title:"Pitch follows speed",desc:"Chipmunk / slow-mo. Clears any custom pitch shift.",checked:xe,onChange:o=>v.setPitchShifts(o.target.checked)}),d.default.createElement(m.LunaSetting,{title:"Reset",desc:"Back to 1.00\xD7, pitch shift off, all effects off."},d.default.createElement("div",{style:Ce},d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>v.reset()},"Reset playback"))))),d.default.createElement(at,null,d.default.createElement(m.LunaSettings,{title:"Presets",desc:"Capture speed, pitch and effects. Built-ins are fixed; custom presets can be applied, renamed, updated, reordered and deleted."},d.default.createElement(m.LunaSwitchSetting,{title:"Built-in presets",desc:"Show the built-in presets.",checked:re,onChange:o=>{let p=o.target.checked;v.setBuiltinPresets(p),nt(v,T)}}),ie.map((o,p)=>{let A=e.presetId===o.id&&!et(o,e);return d.default.createElement(m.LunaSetting,{key:o.id,title:`${o.name}${A?" *":""}`,desc:Fr(o)},d.default.createElement("div",{style:Ce},e.presetId===o.id?d.default.createElement("span",{style:{fontSize:12,opacity:.7}},"Active"):d.default.createElement(m.LunaButton,{size:"small",onClick:()=>v.applyPreset(o)},"Use"),o.builtin===!0?d.default.createElement("span",{style:{fontSize:12,opacity:.6}},"Built-in"):d.default.createElement(d.default.Fragment,null,d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>k({id:o.id,name:o.name,value:o.name})},"Rename"),d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>se(o)},"Update"),d.default.createElement(m.LunaButton,{size:"small",variant:"text",disabled:p<=H,title:"Move up",onClick:()=>T.move(o.id,-1)},"\u2191"),d.default.createElement(m.LunaButton,{size:"small",variant:"text",disabled:p>=ie.length-1,title:"Move down",onClick:()=>T.move(o.id,1)},"\u2193"),d.default.createElement(m.LunaButton,{size:"small",variant:"text",color:"error",onClick:()=>le(o)},"Delete"))))}),b!==null&&d.default.createElement(d.default.Fragment,null,d.default.createElement(m.LunaTextSetting,{title:`Rename ${b.name}`,defaultValue:b.value,onChange:o=>k({...b,value:o.target.value})}),d.default.createElement(m.LunaSetting,{title:" "},d.default.createElement("div",{style:Ce},d.default.createElement(m.LunaButton,{size:"small",onClick:()=>{T.rename(b.id,b.value),k(null)}},"Save"),d.default.createElement(m.LunaButton,{size:"small",variant:"text",onClick:()=>k(null)},"Cancel")))))),d.default.createElement(at,null,d.default.createElement(m.LunaSettings,{title:"Effects",desc:"Same Web Audio chain as pitch. Needs audio capture \u2014 use the dev-mode self-test if nothing changes."},d.default.createElement(m.LunaSwitchSetting,{title:"Equalizer",desc:"8 bands, 62 Hz to 8 kHz, \xB112 dB. Drag a band; double-click resets it.",checked:S.eq.enabled,onChange:o=>Q({enabled:o.target.checked})}),d.default.createElement(m.LunaSetting,{title:"Bands",desc:"Shift+arrow for 3 dB steps."},d.default.createElement(ha,{eq:S.eq,disabled:!S.eq.enabled,onChange:o=>Q({bands:o})})),d.default.createElement(m.LunaSetting,{title:"Flatten",desc:"Set every band to 0 dB."},d.default.createElement("div",{style:Ce},d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",disabled:!S.eq.enabled,onClick:()=>Q({bands:Array.from({length:je},()=>0)})},"Flatten EQ"))),d.default.createElement(m.LunaSwitchSetting,{title:"Bass boost",desc:"Parallel low-shelf sub boost with saturation for dirty kicks. Added on top of the dry signal.",checked:S.bass.enabled,onChange:o=>R({enabled:o.target.checked})}),d.default.createElement(m.LunaTextSetting,{title:"Bass boost (dB)",desc:"Low shelf at 90 Hz, 0\u201324 dB.",defaultValue:String(Math.round(S.bass.boost)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=F(o.target.value);p!==void 0&&R({boost:Math.max(0,Math.min(24,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"Sub (dB)",desc:"Extra shelf at 45 Hz, 0\u201312 dB.",defaultValue:String(Math.round(S.bass.sub)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=F(o.target.value);p!==void 0&&R({sub:Math.max(0,Math.min(12,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"Drive (%)",desc:"Saturation on the bass path; more harmonics, dirtier kicks.",defaultValue:String(Math.round(S.bass.drive*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=F(o.target.value);p!==void 0&&R({drive:Math.max(0,Math.min(100,p))/100})}}),d.default.createElement(m.LunaTextSetting,{title:"Bass amount (%)",desc:"How much of the boosted bass is added back.",defaultValue:String(Math.round(S.bass.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=F(o.target.value);p!==void 0&&R({mix:Math.max(0,Math.min(100,p))/100})}}),d.default.createElement(m.LunaSwitchSetting,{title:"8D audio",desc:"LFO panning plus a constant pitch wobble, so the mix moves around your head.",checked:S.eightD.enabled,onChange:o=>_({enabled:o.target.checked})}),d.default.createElement(m.LunaTextSetting,{title:"8D pan rate (Hz)",desc:"How fast the sound travels left/right.",defaultValue:String(S.eightD.rate),inputProps:{inputMode:"decimal"},onChange:o=>{let p=F(o.target.value);p!==void 0&&_({rate:Math.max(.02,Math.min(2,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"8D pan depth (%)",defaultValue:String(Math.round(S.eightD.panDepth*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=F(o.target.value);p!==void 0&&_({panDepth:Math.max(0,Math.min(100,p))/100})}}),d.default.createElement(m.LunaTextSetting,{title:"8D pitch rate (Hz)",desc:"Speed of the constant pitch wobble.",defaultValue:String(S.eightD.pitchRate),inputProps:{inputMode:"decimal"},onChange:o=>{let p=F(o.target.value);p!==void 0&&_({pitchRate:Math.max(.02,Math.min(2,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"8D pitch depth (ms)",desc:"Delay modulation depth; higher = wider pitch smear.",defaultValue:String(S.eightD.pitchDepth),inputProps:{inputMode:"decimal"},onChange:o=>{let p=F(o.target.value);p!==void 0&&_({pitchDepth:Math.max(0,Math.min(12,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"8D mix (%)",desc:"Dry/wet amount; higher is more immersive.",defaultValue:String(Math.round(S.eightD.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=F(o.target.value);p!==void 0&&_({mix:Math.max(0,Math.min(100,p))/100})}}),d.default.createElement(m.LunaSwitchSetting,{title:"Delay",desc:"Feedback delay.",checked:S.delay.enabled,onChange:o=>B({enabled:o.target.checked})}),d.default.createElement(m.LunaTextSetting,{title:"Delay time (ms)",defaultValue:String(Math.round(S.delay.timeMs)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=F(o.target.value);p!==void 0&&B({timeMs:Math.max(20,Math.min(2e3,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"Delay feedback (%)",defaultValue:String(Math.round(S.delay.feedback*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=F(o.target.value);p!==void 0&&B({feedback:Math.max(0,Math.min(90,p))/100})}}),d.default.createElement(m.LunaTextSetting,{title:"Delay mix (%)",defaultValue:String(Math.round(S.delay.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=F(o.target.value);p!==void 0&&B({mix:Math.max(0,Math.min(100,p))/100})}}),d.default.createElement(m.LunaSwitchSetting,{title:"Reverb",desc:"Generated impulse response.",checked:S.reverb.enabled,onChange:o=>z({enabled:o.target.checked})}),d.default.createElement(m.LunaTextSetting,{title:"Reverb decay (s)",defaultValue:String(S.reverb.decay),inputProps:{inputMode:"decimal"},onChange:o=>{let p=F(o.target.value);p!==void 0&&z({decay:Math.max(.2,Math.min(8,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"Reverb mix (%)",defaultValue:String(Math.round(S.reverb.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=F(o.target.value);p!==void 0&&z({mix:Math.max(0,Math.min(100,p))/100})}}))),d.default.createElement(at,null,d.default.createElement(m.LunaSettings,{title:"Config file",desc:"Versioned JSON, editable outside Luna. Autosaves 300 ms after changes."},d.default.createElement(m.LunaSetting,{title:"Path",desc:c},d.default.createElement("div",{style:Ce},d.default.createElement(m.LunaButton,{size:"small",variant:"text",onClick:()=>{Ft(c)}},"Copy path"))),d.default.createElement(m.LunaSetting,{title:"Actions",desc:l===""?void 0:l},d.default.createElement("div",{style:Ce},d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Nn()}},"Show folder"),d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{O()}},"Reload"),d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{ge()}},"Import\u2026"),d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{J()}},"Export\u2026"))))),d.default.createElement(at,null,d.default.createElement(m.LunaSettings,{title:"Developer",desc:"Logs and test tools are off unless you need to report a bug."},d.default.createElement(m.LunaSwitchSetting,{title:"Developer mode",desc:"Write diagnostics logs and show the Copy diagnostics action.",checked:W,onChange:o=>v.setDeveloperMode(o.target.checked)}),W&&d.default.createElement(m.LunaSetting,{title:"Audio engine self-test",desc:N},d.default.createElement("div",{style:Ce},d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",disabled:E,onClick:async()=>{g(!0);try{let o=await pa();L(o.ok?`OK \xB7 ${o.context} \xB7 rms ${o.rms} \xB7 peak ${o.peak} \xB7 \u0394${o.progressionSeconds}s`:`Failed \xB7 ${o.reason??"unknown"} \xB7 context ${o.context}`)}finally{g(!1)}}},E?"Testing\u2026":"Run test"))),W&&d.default.createElement(m.LunaButtonSetting,{title:"Diagnostics",desc:"Copy player, pitch-engine, effects, theme and media state plus recent logs.",children:r,onClick:async()=>{i("Copying\u2026");let o=await Oe(v.get());i(o?"Copied":"Copy failed")}}))))};var Et=new Set,{trace:ba}=(0,Pe.Tracer)("[PlaybackKit]"),Gr=1e3,Kr=1500,dn="tidaluna.playback-speed.previous-quality",Ea=()=>{try{return localStorage.getItem(dn)}catch{return null}},Ur=e=>{try{localStorage.setItem(dn,e)}catch{}},Pa=()=>{try{localStorage.removeItem(dn)}catch{}},wa=e=>{let t=me.redux.actions["settings/SET_STREAMING_QUALITY"];typeof t=="function"?t(e):me.redux.store.dispatch({type:"settings/SET_STREAMING_QUALITY",payload:e})},ya=()=>{let t=(0,Pe.findModuleByProperty)((n,a)=>n==="activePlayer"&&typeof a=="object"&&a!==null)?.activePlayer;if(t===void 0)return{found:!1};try{let n=Object.getPrototypeOf(t),a=n===null?[]:Object.getOwnPropertyNames(n).filter(i=>{try{return typeof t[i]=="function"}catch{return!1}}).slice(0,60),r=i=>{try{return t[i]}catch{return}};return{found:!0,name:r("name"),constructor:t.constructor?.name,state:r("playbackState")??r("state"),currentTime:r("currentTime"),methods:a,hasSetPlaybackRate:a.includes("setPlaybackRate"),hasMediaElement:!!(r("mediaElement")??r("video")??r("element"))}}catch(n){return{found:!0,error:String(n)}}},va=()=>{let t=(0,Pe.findModuleByProperty)((n,a)=>n==="activePlayer"&&typeof a=="object"&&a!==null)?.activePlayer?.name;return t==="nativePlayer"?"native":t==="shakaPlayer"?"shaka":t==="browserPlayer"?"browser":"unknown"},Sa,Vr=()=>(Sa??=(0,Pe.findModuleByProperty)((e,t)=>e==="activePlayer"&&typeof t=="object"&&t!==null),Sa?.activePlayer),Ta=()=>{if(Le()==="native"){let n=Vr()?.currentTime;return typeof n=="number"&&Number.isFinite(n)?n:null}let e=ae(),t=e.find(n=>!n.paused&&n.readyState>0)??e.find(n=>n.readyState>0);return t===void 0?null:t.currentTime},jr=()=>{try{return me.redux.store.getState().playbackControls?.playbackState==="PLAYING"}catch{return!1}},Wr=e=>{let t=me.redux.actions["playbackControls/TIME_UPDATE"];typeof t=="function"?t(e):me.redux.store.dispatch({type:"playbackControls/TIME_UPDATE",payload:e})},Qr=()=>{try{let e=me.redux.store.getState().playbackControls;if(e===void 0)return null;let t=e.latestCurrentTime??0;return e.playbackState!=="PLAYING"?t:t+Math.abs(Date.now()-(e.latestCurrentTimeSyncTimestamp??Date.now()))/1e3}catch{return null}},xa={getSpeed:()=>v.get().speed,isPlaying:jr,getPosition:Ta,dispatchTimeUpdate:Wr},Jr=()=>{try{let e=me.redux.store.getState(),t=e.playQueue,n=t?.elements?.[t.currentIndex??-1]?.mediaItemId;if(n===void 0)return null;let a=e.content?.mediaItems?.[String(n)];return a===void 0?{id:n,found:!1}:{id:n,found:!0,title:a.title,bpm:a.bpm??null,key:a.key??a.keyScale??null,metadataKeys:Object.keys(a).filter(r=>/bpm|key|tempo|tone/i.test(r))}}catch(e){return{error:String(e)}}},Ma=!1,ze,cn=()=>tt(v.get(),T.get()),ka=()=>{Ma&&(ze!==void 0&&clearTimeout(ze),ze=setTimeout(()=>{ze=void 0,He(cn()).catch(e=>h("error","config save failed",{error:String(e)}))},300))},Yr=async()=>{try{let e=await ct(),t=e===null?void 0:lt(e),n=await dt();t!==void 0?(v.replace(t.settings),T.replace(t.presets),nt(v,T),h("info","config loaded",{path:n,speed:t.settings.speed,presets:t.presets.length})):(await He(cn()),h("info",e===null?"config created":"config invalid, rewrote defaults",{path:n}))}catch(e){h("warn","config file unavailable; using browser storage only",{error:String(e)})}finally{Ma=!0}},Xr=()=>{try{let e=me.redux.actions["router/PUSH"];if(typeof e!="function")throw new Error("router/PUSH is unavailable");e({pathname:"/not-found",search:"LunaSettings",replace:!0}),h("info","opening Luna settings"),setTimeout(()=>{let n=[...document.querySelectorAll('[role="tab"]')].find(a=>(a.textContent??"").trim()==="Plugins");n!==void 0&&n.getAttribute("aria-selected")!=="true"&&n.click(),setTimeout(()=>{[...document.querySelectorAll("h1,h2,h3,h4,h5,h6,span,p,div")].find(i=>(i.textContent??"").trim()==="@kyoto-aircon/playback-kit")?.scrollIntoView({block:"center",behavior:"smooth"})},250)},250)}catch(e){h("error","open Luna settings failed",{error:String(e)})}},Zr=()=>{try{let t=me.redux.store.getState().settings?.quality?.streaming;if(t==="HIGH"){h("info","already on the browser player quality");return}h("info","switching streaming quality to HIGH",{from:t}),typeof t=="string"&&Ur(t),wa("HIGH")}catch(e){h("error","quality switch failed",{error:String(e)})}},ei=()=>{let e=Ea();e!==null&&(h("info","restoring streaming quality",{to:e}),wa(e),Pa())},ti=e=>{let t={version:_e,logs:Bn,logText:qt,report:()=>$t(v.get()),copy:()=>Oe(v.get()),clear:Hn,setVerbose:_n,selectors:ut,playerKind:Le,audioEngine:I,native:St,store:v,controller:e};globalThis.__playbackSpeed=t,Et.add(()=>{globalThis.__playbackSpeed===t&&delete globalThis.__playbackSpeed})};try{Ot(v.get().developerMode),qn(ya);try{let s=Pe.LunaPlugin.getByName("@kyoto-aircon/playback-speed");s!==void 0&&h("warn","old Playback Speed plugin is still installed",{enabled:s.store?.enabled})}catch{}Fn(()=>({kind:Le(),native:St(),nativeInstance:aa(),speed:v.get().speed,track:Jr(),audioEngine:I(),effects:Yn(),pitchSemitones:v.get().pitchSemitones,pitchEngine:Zt(),presetId:v.get().presetId,uiTime:Qr(),actualTime:Ta()})),Yt(),h("info","loading",{version:_e,selectors:ut(),media:ae().length,settings:v.get(),tidal:ya(),native:St()});let e=Un();Et.add(()=>Vn(e));let t=new yt(ae,v);t.start();let n=v.subscribe(s=>{Ot(s.developerMode),ka(),h("info","settings changed",{speed:s.speed,pitchShifts:s.pitchShifts,bounds:s.bounds}),t.apply(),Le()==="native"&&Xt(s.speed),nn(xa),xt(s.pitchSemitones,ae()),Qt(s.effects,ae())});T.subscribe(ka),Yr(),Jn(Et,v,{getPlayerKind:Le,subscribePlayerKind:sa,useBrowserPlayer:Zr,previousQuality:Ea,restoreQuality:ei,presets:{list:()=>T.get().filter(s=>v.get().builtinPresets||s.builtin!==!0),apply:s=>{v.applyPreset(s),h("info","preset applied",{id:s.id,name:s.name})},clear:()=>v.clearPreset(),save:(s,l)=>T.save(s,l),saveActive:s=>{let l=la(v,T,s);h("info","saved preset from live state",{id:l?.id,builtin:s.builtin===!0})}},getPitchEngineState:Zt,openSettings:Xr,onOpen:()=>{let s=v.get().pitchSemitones;s!==0&&xt(s,ae())}}),ti(t);let r=setInterval(()=>{t.scan();let s=v.get().pitchSemitones;s!==0&&xt(s,ae());let l=v.get().effects;it(l)&&Qt(l,ae())},Gr),i=da(xa);tn(va());let c=setInterval(()=>{Yt();let s=va(),l=Le();tn(s),s!==l&&s==="native"&&(Xt(v.get().speed),Pa())},Kr);Et.add(()=>{ze!==void 0&&(clearTimeout(ze),He(cn()).catch(()=>{})),clearInterval(r),clearInterval(c),i(),n(),t.stop(),oa()}),ba.log("loaded")}catch(e){h("error","failed to load",{error:String(e),stack:e?.stack}),ba.err("Failed to load:",e)}export{zr as Settings,Et as unloads};
//# sourceMappingURL=kyoto-aircon.playback-kit.mjs.map
