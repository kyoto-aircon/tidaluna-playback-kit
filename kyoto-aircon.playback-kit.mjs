var Ra=Object.create;var vn=Object.defineProperty;var Ba=Object.getOwnPropertyDescriptor;var _a=Object.getOwnPropertyNames;var Ha=Object.getPrototypeOf,Oa=Object.prototype.hasOwnProperty;var it=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var qa=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of _a(t))!Oa.call(e,r)&&r!==n&&vn(e,r,{get:()=>t[r],enumerable:!(a=Ba(t,r))||a.enumerable});return e};var Re=(e,t,n)=>(n=e!=null?Ra(Ha(e)):{},qa(t||!e||!e.__esModule?vn(n,"default",{value:e,enumerable:!0}):n,e));var Sn=it((li,Ct)=>{Ct.exports=luna?.core?.modules?.["@luna/core"];if(Ct.exports===void 0)throw new Error("Cannot find module @luna/core in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/core")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var At=it((di,Dt)=>{Dt.exports=luna?.core?.modules?.["@luna/lib"];if(Dt.exports===void 0)throw new Error("Cannot find module @luna/lib in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/lib")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var sn=it((es,rn)=>{rn.exports=luna?.core?.modules?.react;if(rn.exports===void 0)throw new Error("Cannot find module react in luna.core.modules");luna.core.LunaPlugin.getByName("react")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var pa=it((ts,on)=>{on.exports=luna?.core?.modules?.["@luna/ui"];if(on.exports===void 0)throw new Error("Cannot find module @luna/ui in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/ui")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var we=Re(Sn(),1),se=Re(At(),1);var Be=[62,125,250,500,1e3,2e3,4e3,8e3],je=Be.length,ye=-12,ee=12,w={eq:{enabled:!1,bands:Array.from({length:je},()=>0)},bass:{enabled:!1,boost:6,sub:3,drive:.2,mix:.6},eightD:{enabled:!1,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},delay:{enabled:!1,timeMs:250,feedback:.25,mix:.25},reverb:{enabled:!1,decay:2,mix:.25}},A=(e,t,n,a)=>{let r=typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(r)?Math.min(n,Math.max(t,r)):a},Ve=(e,t)=>typeof e=="boolean"?e:t,$a=e=>{let t=Array.from({length:je},()=>0);if(Array.isArray(e.bands)){for(let i=0;i<je;i+=1)t[i]=A(e.bands[i],ye,ee,0);return t}let n=A(e.low,ye,ee,0),a=A(e.mid,ye,ee,0),r=A(e.high,ye,ee,0);return[n,n,a,a,a,r,r,r]},K=e=>{let t=typeof e=="object"&&e!==null?e:{},n=typeof t.eq=="object"&&t.eq!==null?t.eq:{},a=typeof t.eightD=="object"&&t.eightD!==null?t.eightD:{},r=typeof t.bass=="object"&&t.bass!==null?t.bass:{},i=typeof t.delay=="object"&&t.delay!==null?t.delay:{},c=typeof t.reverb=="object"&&t.reverb!==null?t.reverb:{};return{eq:{enabled:Ve(n.enabled,w.eq.enabled),bands:$a(n)},eightD:{enabled:Ve(a.enabled,w.eightD.enabled),rate:A(a.rate,.02,2,w.eightD.rate),panDepth:A(a.panDepth,0,1,w.eightD.panDepth),pitchRate:A(a.pitchRate,.02,2,w.eightD.pitchRate),pitchDepth:A(a.pitchDepth,0,12,w.eightD.pitchDepth),mix:A(a.mix,0,1,w.eightD.mix)},bass:{enabled:Ve(r.enabled,w.bass.enabled),boost:A(r.boost,0,24,w.bass.boost),sub:A(r.sub,0,12,w.bass.sub),drive:A(r.drive,0,1,w.bass.drive),mix:A(r.mix,0,1,w.bass.mix)},delay:{enabled:Ve(i.enabled,w.delay.enabled),timeMs:A(i.timeMs,20,2e3,w.delay.timeMs),feedback:A(i.feedback,0,.9,w.delay.feedback),mix:A(i.mix,0,1,w.delay.mix)},reverb:{enabled:Ve(c.enabled,w.reverb.enabled),decay:A(c.decay,.2,8,w.reverb.decay),mix:A(c.mix,0,1,w.reverb.mix)}}},st=e=>e.eq.enabled||e.bass.enabled||e.eightD.enabled||e.delay.enabled||e.reverb.enabled,ot=e=>{let t=[];return e.eq.enabled&&t.push("EQ 8-band"),e.eightD.enabled&&t.push(`8D ${e.eightD.rate.toFixed(2)} Hz`),e.bass.enabled&&t.push(`Bass +${Math.round(e.bass.boost)} dB`),e.delay.enabled&&t.push(`Delay ${Math.round(e.delay.timeMs)} ms`),e.reverb.enabled&&t.push(`Reverb ${e.reverb.decay.toFixed(1)} s`),t.length===0?"No effects enabled":t.join(" \xB7 ")};var te=e=>Number.isFinite(e)?Math.max(-12,Math.min(12,Math.round(e))):0,xn=e=>2**(te(e)/12),We=e=>{let t=te(e);return`${t>0?"+":""}${t}`};var Qe={min:.05,max:10,step:.05},Ye=1;var Fa=6,_e=(e,t=Fa)=>{let n=10**t;return Math.round(e*n)/n},lt=(e,t,n)=>Math.min(n,Math.max(t,e)),Se=e=>{let t=Number(e?.min),n=Number.isFinite(t)?_e(Math.max(.01,t)):Qe.min,a=Number(e?.max),r=Number.isFinite(a)?_e(Math.max(n+.01,a)):Math.max(n+.01,Qe.max),i=Number(e?.step),c=Number.isFinite(i)&&i>0?_e(i):Qe.step;return{min:n,max:r,step:c}},za=(e,t)=>{let{min:n,step:a}=t,r=n+Math.round((e-n)/a)*a;return _e(r)},ve=(e,t)=>{let n=Se(t),a=Number.isFinite(e)?e:Ye,r=za(a,n);return lt(_e(r),n.min,n.max)},kn=(e,t,n)=>{let a=Se(n),r=ve(e,a);return ve(r+t*a.step,a)},Ga=e=>{let t=e.includes(".")?e.replace(/0+$/,"").replace(/\.$/,""):e;return t===""||t==="-0"?"0":t},ne=e=>Number.isFinite(e)?Ga(e.toFixed(4)):String(Ye),He=e=>`${ne(e)}\xD7`,Je=(e,t)=>{let{min:n,max:a}=Se(t);if(!(a>n))return 0;let r=Math.log(lt(e,n,a)/n)/Math.log(a/n);return lt(Number.isFinite(r)?r:0,0,1)},En=(e,t)=>{let n=Se(t),a=n.min*Math.pow(n.max/n.min,lt(e,0,1));return ve(a,n)},Pn=e=>{let{min:t,max:n}=Se(e),a=[t,1,2,5,10,n],r=new Set,i=[];for(let o of a.sort((l,f)=>l-f)){if(o<t||o>n)continue;let l=ne(o);r.has(l)||(r.add(l),i.push(_e(o)))}let c=[];for(let o of i){let l=c[c.length-1];l!==void 0&&Je(o,e)-Je(l,e)<.07||c.push(o)}return c};var Ua="tidaluna.playback-kit.v1",Va="tidaluna.playback-speed.v1",Xe=()=>({speed:Ye,pitchShifts:!1,pitchSemitones:0,presetId:null,developerMode:!1,builtinPresets:!0,effects:K(void 0),bounds:{...Qe}}),wn=e=>{if(e===null)return Xe();let t;try{t=JSON.parse(e)}catch{return Xe()}if(typeof t!="object"||t===null)return Xe();let n=t,a=Se(n.bounds),r=te(typeof n.pitchSemitones=="number"?n.pitchSemitones:0);return{speed:ve(typeof n.speed=="number"?n.speed:Ye,a),pitchShifts:r===0&&n.pitchShifts===!0,pitchSemitones:r,presetId:typeof n.presetId=="string"?n.presetId:null,developerMode:n.developerMode===!0,builtinPresets:n.builtinPresets!==!1,effects:K(n.effects),bounds:a}},ja=(e,t)=>{let n=e.getItem(t);if(n!==null)return wn(n);let a=e.getItem(Va);if(a===null)return Xe();let r=wn(a);return r.presetId=null,r},Wa=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&e.presetId===t.presetId&&e.developerMode===t.developerMode&&e.builtinPresets===t.builtinPresets&&JSON.stringify(e.effects)===JSON.stringify(t.effects)&&e.bounds.min===t.bounds.min&&e.bounds.max===t.bounds.max&&e.bounds.step===t.bounds.step,It=(e,t=Ua)=>{let n=ja(e,t),a=new Set,r=()=>({...n,bounds:{...n.bounds}}),i=o=>{if(Wa(n,o))return;n=o;try{e.setItem(t,JSON.stringify(n))}catch{}let l=r();for(let f of[...a])try{f(l)}catch(b){console.error("[PlaybackKit] listener failed",b)}},c=o=>({...n,...o});return{get:r,subscribe(o){return a.add(o),()=>a.delete(o)},setSpeed(o){i(c({speed:ve(o,n.bounds)}))},step(o){i(c({speed:kn(n.speed,o,n.bounds)}))},setPitchShifts(o){i(c({pitchShifts:o,pitchSemitones:o?0:n.pitchSemitones}))},setPitchSemitones(o){let l=te(o);i(c({pitchSemitones:l,pitchShifts:l===0?n.pitchShifts:!1}))},setBounds(o){let l=Se({...n.bounds,...o});i({...n,bounds:l,speed:ve(n.speed,l)})},applyPreset(o){let l=te(o.pitchSemitones);i({...n,speed:ve(o.speed,n.bounds),pitchShifts:l===0&&o.pitchShifts===!0,pitchSemitones:l,effects:K(o.effects),presetId:o.id})},setEffects(o){i({...n,effects:K(o)})},setDeveloperMode(o){i({...n,developerMode:o})},setBuiltinPresets(o){i({...n,builtinPresets:o})},clearPreset(){i({...n,presetId:null})},replace(o){let l=Se(o.bounds),f=te(o.pitchSemitones);i({speed:ve(o.speed,l),pitchShifts:f===0&&o.pitchShifts===!0,pitchSemitones:f,presetId:typeof o.presetId=="string"?o.presetId:null,developerMode:o.developerMode===!0,builtinPresets:o.builtinPresets!==!1,effects:K(o.effects),bounds:l})},reset(){i({...Xe(),developerMode:n.developerMode,builtinPresets:n.builtinPresets,presetId:null,bounds:{...n.bounds}})},destroy(){a.clear()}}},Tn=new Map,Nt=()=>{try{if(typeof localStorage<"u"){let e="__lunakit_probe__";return localStorage.setItem(e,"1"),localStorage.removeItem(e),localStorage}}catch{}return{getItem:e=>Tn.get(e)??null,setItem:(e,t)=>{Tn.set(e,t)}}},v=It(Nt());var Qa="tidaluna.playback-kit.presets.v1",_t="nightcore",fe=e=>K({...w,...e,eq:{...w.eq,...e.eq??{}},bass:{...w.bass,...e.bass??{}},eightD:{...w.eightD,...e.eightD??{}},delay:{...w.delay,...e.delay??{}},reverb:{...w.reverb,...e.reverb??{}}}),Ja={id:_t,name:"Nightcore",speed:1.35,pitchShifts:!0,pitchSemitones:0,effects:fe({}),builtin:!0},Ya={id:"slowcore",name:"Slowcore",speed:.8,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:4,mix:.35}}),builtin:!0},Xa={id:"big-bass",name:"Big Bass",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({eq:{enabled:!0,bands:[3,2,0,0,0,0,0,1]},bass:{enabled:!0,boost:14,sub:6,drive:.5,mix:1}}),builtin:!0},Za={id:"eight-d",name:"8D Orbit",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({eightD:{enabled:!0,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},er={id:"dub-echo",name:"Dub Echo",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({delay:{enabled:!0,timeMs:450,feedback:.45,mix:.28}}),builtin:!0},tr={id:"daycore",name:"Daycore",speed:.85,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},nr={id:"chipmunk",name:"Chipmunk",speed:1.6,pitchShifts:!0,pitchSemitones:0,effects:fe({}),builtin:!0},ar={id:"vaporwave",name:"Vaporwave",speed:.7,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:5,mix:.35},delay:{enabled:!0,timeMs:300,feedback:.3,mix:.2}}),builtin:!0},rr={id:"submerge",name:"Submerge",speed:.95,pitchShifts:!1,pitchSemitones:0,effects:fe({bass:{enabled:!0,boost:10,sub:5,drive:.3,mix:.6},eightD:{enabled:!0,rate:.1,panDepth:.75,pitchRate:.25,pitchDepth:2,mix:.85}}),builtin:!0},ir={id:"clear-voice",name:"Clear Voice",speed:1.15,pitchShifts:!1,pitchSemitones:0,effects:fe({eq:{enabled:!0,bands:[-4,-2,1,2,2,1,0,0]}}),builtin:!0},Mn=[Ja,tr,Ya,nr,ar,Xa,rr,Za,er,ir],Ze=new Set(Mn.map(e=>e.id)),sr=24,or=.05,lr=16,Rt=e=>{if(typeof e!="string")return;let t=e.trim().slice(0,sr);return t===""?void 0:t},Bt=e=>{let t=Number(e);return Number.isFinite(t)?Math.max(or,Math.min(lr,t)):1},Ln=(e,t)=>{if(typeof e!="object"||e===null)return;let n=e,a=typeof n.id=="string"?n.id:void 0,r=Rt(n.name);if(!(a===void 0||r===void 0||Ze.has(a)||t.has(a)))return t.add(a),{id:a,name:r,speed:Bt(n.speed),pitchShifts:n.pitchShifts===!0,pitchSemitones:te(typeof n.pitchSemitones=="number"?n.pitchSemitones:0),effects:K(n.effects)}},dr=e=>{if(e===null)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(!Array.isArray(t))return[];let n=new Set,a=[];for(let r of t){let i=Ln(r,n);i!==void 0&&a.push(i)}return a},cr=(e,t)=>{if(e.eq.enabled!==t.eq.enabled||e.eq.bands.length!==t.eq.bands.length)return!1;for(let i=0;i<e.eq.bands.length;i+=1)if(e.eq.bands[i]!==t.eq.bands[i])return!1;let n=["enabled","boost","sub","drive","mix"];for(let i of n)if(e.bass[i]!==t.bass[i])return!1;let a=["enabled","rate","panDepth","pitchRate","pitchDepth"];for(let i of a)if(e.eightD[i]!==t.eightD[i])return!1;let r=["enabled","timeMs","feedback","mix"];for(let i of r)if(e.delay[i]!==t.delay[i])return!1;return e.reverb.enabled===t.reverb.enabled&&e.reverb.decay===t.reverb.decay&&e.reverb.mix===t.reverb.mix},et=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&cr(e.effects,t.effects),Ht=(e,t=Qa)=>{let n=dr(e.getItem(t)),a=new Set,r=0,i=()=>{try{e.setItem(t,JSON.stringify(n))}catch{}},c=()=>{for(let l of[...a])try{l()}catch{}},o=()=>[...Mn.map(l=>({...l})),...n.map(l=>({...l}))];return{get:o,getById(l){return o().find(f=>f.id===l)},save(l,f){let b=Rt(l);if(b===void 0)return;r+=1;let k={id:`custom-${Date.now().toString(36)}-${r}`,name:b,speed:Bt(f.speed),pitchShifts:f.pitchShifts===!0,pitchSemitones:te(f.pitchSemitones),effects:K(f.effects)};return n.push(k),i(),c(),{...k}},remove(l){if(Ze.has(l))return!1;let f=n.filter(b=>b.id!==l);return f.length===n.length?!1:(n=f,i(),c(),!0)},rename(l,f){if(Ze.has(l))return!1;let b=Rt(f),k=n.find(E=>E.id===l);return b===void 0||k===void 0?!1:(k.name=b,i(),c(),!0)},update(l,f){if(Ze.has(l))return!1;let b=n.find(k=>k.id===l);return b===void 0?!1:(b.speed=Bt(f.speed),b.pitchShifts=f.pitchShifts===!0,b.pitchSemitones=te(f.pitchSemitones),b.effects=K(f.effects),i(),c(),!0)},move(l,f){if(Ze.has(l))return!1;let b=n.findIndex(g=>g.id===l),k=b+Math.sign(f);if(b<0||k<0||k>=n.length)return!1;let[E]=n.splice(b,1);return n.splice(k,0,E),i(),c(),!0},replace(l){let f=new Set;n=l.filter(b=>b.builtin!==!0).map(b=>Ln(b,f)).filter(b=>b!==void 0),i(),c()},subscribe(l){return a.add(l),()=>a.delete(l)}}},M=Ht(Nt());var Ot=1,Cn=e=>({getItem:()=>e,setItem:()=>{}}),dt=e=>{if(e==null)return;let t;try{t=JSON.parse(e)}catch{return}if(typeof t!="object"||t===null)return;let n=t;if(n.version!==Ot)return;let a=It(Cn(JSON.stringify(n.settings??{}))).get(),r=Ht(Cn(JSON.stringify(n.presets??[]))).get().filter(c=>c.builtin!==!0),i=new Set([_t,...r.map(c=>c.id)]);return a.presetId!==null&&!i.has(a.presetId)&&(a.presetId=null),{version:Ot,settings:a,presets:r}},tt=(e,t)=>`${JSON.stringify({version:Ot,settings:e,presets:t.filter(n=>n.builtin!==!0)},null,2)}
`;var Te=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/config.native.ts",'"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var P=(e,n)=>{for(var t in n)p(e,t,{get:n[t],enumerable:!0})},w=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of m(n))!h.call(e,s)&&s!==t&&p(e,s,{get:()=>n[s],enumerable:!(o=d(n,s))||o.enumerable});return e};var y=e=>w(p({},"__esModule",{value:!0}),e);var A={};P(A,{exportConfig:()=>F,getConfigPath:()=>k,importConfig:()=>S,readConfig:()=>v,revealConfig:()=>D,writeConfig:()=>x});module.exports=y(A);var l=require,i=l("path"),r=()=>l("fs/promises"),b=()=>l("fs"),u=()=>l("electron"),g=()=>process.env.HOME??process.env.USERPROFILE??"",f=()=>process.platform==="win32"?process.env.APPDATA??i.join(g(),"AppData","Roaming"):process.platform==="darwin"?i.join(g(),"Library","Application Support"):i.join(g(),".config"),j=()=>{let e=f(),n=b(),t=[],o=process.resourcesPath;o!==void 0&&(t.push(i.basename(i.dirname(i.dirname(o)))),t.push(i.basename(i.dirname(o)))),t.push("TIDAL","Tidal","tidal","tidal-hifi");for(let s of t)if(!(s===""||s==="Contents"||s==="resources")&&n.existsSync(i.join(e,s)))return s;return"TIDAL"},c=()=>i.join(f(),j(),"playback-kit"),a=()=>i.join(c(),"config.json"),k=async()=>a(),v=async()=>{try{return await r().readFile(a(),"utf8")}catch{return null}},x=async e=>{await r().mkdir(c(),{recursive:!0});let n=`${a()}.tmp`;return await r().writeFile(n,e,"utf8"),await r().rename(n,a()),a()},F=async e=>{let t=await u().dialog.showSaveDialog({title:"Export Playback Kit config",defaultPath:i.join(f(),"playback-kit.json"),filters:[{name:"JSON",extensions:["json"]}]});return t.canceled||t.filePath===void 0?null:(await r().writeFile(t.filePath,e,"utf8"),t.filePath)},S=async()=>{let n=await u().dialog.showOpenDialog({title:"Import Playback Kit config",properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]}),t=n.filePaths[0];return n.canceled||t===void 0?null:{path:t,json:await r().readFile(t,"utf8")}},D=async()=>{await r().mkdir(c(),{recursive:!0}),await u().shell.openPath(c())};0&&(module.exports={exportConfig,getConfigPath,importConfig,readConfig,revealConfig,writeConfig});\n');if(Te===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/config.native.ts");var Dn=(...e)=>__ipcRenderer.invoke(Te,"exportConfig",...e),ct=(...e)=>__ipcRenderer.invoke(Te,"getConfigPath",...e),An=(...e)=>__ipcRenderer.invoke(Te,"importConfig",...e),ut=(...e)=>__ipcRenderer.invoke(Te,"readConfig",...e),In=(...e)=>__ipcRenderer.invoke(Te,"revealConfig",...e),Oe=(...e)=>__ipcRenderer.invoke(Te,"writeConfig",...e);var qe="2.14.2";var Ee=[],Nn=!0,Rn=!1,Bn=e=>{if(e!==void 0)try{return JSON.parse(JSON.stringify(e))}catch{try{return String(e)}catch{return"[unserialisable]"}}},qt=e=>{Rn=e,e||(Ee.length=0)};var h=(e,t,n)=>{if(!Rn)return;let a={at:Date.now(),level:e,message:t,data:Bn(n)};if(Ee.push(a),Ee.length>500&&Ee.shift(),!(e==="debug"&&!Nn))try{let r=e==="error"?console.error:e==="warn"?console.warn:console.debug;n===void 0?r(`[PlaybackKit] ${t}`):r(`[PlaybackKit] ${t}`,n)}catch{}},_n=()=>Ee.map(e=>({...e})),$t=()=>Ee.map(e=>`${new Date(e.at).toISOString()} ${e.level.toUpperCase().padEnd(5)} ${e.message}${e.data===void 0?"":` ${JSON.stringify(e.data)}`}`).join(`
`),Hn=()=>{Ee.length=0},On=e=>{Nn=e};var ur=e=>({tag:e.tagName.toLowerCase(),id:e.id,class:typeof e.className=="string"?e.className:"",src:(e.currentSrc||e.src||"").slice(0,140),paused:e.paused,readyState:e.readyState,networkState:e.networkState,currentTime:Number(e.currentTime.toFixed(3)),duration:Number.isFinite(e.duration)?Number(e.duration.toFixed(3)):e.duration,playbackRate:e.playbackRate,defaultPlaybackRate:e.defaultPlaybackRate,preservesPitch:e.preservesPitch,muted:e.muted,volume:e.volume,connected:e.isConnected,parent:e.parentElement===null?null:e.parentElement.id||e.parentElement.className}),pr=()=>typeof document>"u"?[]:[...document.querySelectorAll("video,audio")].map(ur),pt=()=>{if(typeof document>"u")return{};let e=document.getElementById("tidal-player-root");return{playerRoot:e!==null,rootChildCount:e?.children.length??0,rootChildren:e===null?[]:[...e.children].map(t=>`${t.tagName.toLowerCase()}#${t.id||"-"}`),scopedMedia:document.querySelectorAll("#tidal-player-root video, #tidal-player-root audio").length,videoOne:document.getElementById("video-one")!==null,videoTwo:document.getElementById("video-two")!==null,allMedia:document.querySelectorAll("video,audio").length,footer:document.querySelector('[data-test="footer-player"]')!==null}},fr=e=>new Promise(t=>setTimeout(t,e)),mr=async(e=1500)=>{if(typeof document>"u")return[];let t=[...document.querySelectorAll("video,audio")],n=t.map(a=>({id:a.id,tag:a.tagName.toLowerCase(),time:a.currentTime,paused:a.paused}));return await fr(e),t.map((a,r)=>{let i=n[r],c=a.currentTime-i.time,o=e/1e3;return{id:i.id,tag:i.tag,paused:a.paused,deltaSeconds:Number(c.toFixed(3)),observedRate:Number((c/o).toFixed(3)),expectedRate:a.playbackRate}})},qn,$n=e=>{qn=e},Fn,zn=e=>{Fn=e},gr=()=>{try{return Fn?.()??{}}catch(e){return{error:String(e)}}},hr=()=>{try{return qn?.()??{registered:!1}}catch(e){return{error:String(e)}}},br=["--wave-color-solid-accent-fill","--wave-color-solid-accent-bright","--wave-color-solid-base-fill","--wave-color-solid-base-brighter","--wave-color-solid-base-brightest","--wave-color-solid-contrast-fill","--wave-color-solid-contrast-dark","--wave-color-opacity-contrast-fill-ultra-thin","--wave-color-opacity-contrast-fill-thin","--wave-color-opacity-contrast-fill-thick","--wave-color-solid-warning-fill","--wave-color-text-danger","--market-core-text-10-color","--market-core-text-20-color","--market-core-fill-white-color","--baseFontSize","--baseLineHeight","--remRatio"],yr=()=>{if(typeof document>"u")return{};let e=document.getElementById("wimp")??document.querySelector('[data-test="footer-player"]')??document.documentElement,t=getComputedStyle(e),n={};for(let r of br){let i=t.getPropertyValue(r).trim();i!==""&&(n[r]=i)}let a=r=>{let i=document.querySelector(r);if(i===null)return null;let c=getComputedStyle(i);return{color:c.color,background:c.backgroundColor,fontFamily:c.fontFamily,fontSize:c.fontSize,lineHeight:c.lineHeight,borderRadius:c.borderRadius,height:c.height}};return{root:e.id!==""?`#${e.id}`:e.tagName.toLowerCase(),fontSize:t.fontSize,fontFamily:t.fontFamily,tokens:n,elements:{footer:a('[data-test="footer-player"]'),utilityButtons:a('[data-test="footer-player"] [class*="utilityButtons"]'),volume:a('[data-test="footer-player"] [class*="sliderContainer"]'),qualityBadge:a("[data-test-quality-badge-streaming-quality]"),progressBar:a('[data-test="progress-bar"]')}}},Ft=async e=>{h("info","building diagnostics report");let t=await mr();return[`Playback Kit v${qe}`,`at: ${new Date().toISOString()}`,`url: ${typeof location>"u"?"?":location.href}`,`ua: ${typeof navigator>"u"?"?":navigator.userAgent}`,`visibility: ${typeof document>"u"?"?":document.visibilityState}`,`settings: ${JSON.stringify(Bn(e))}`,`selectors: ${JSON.stringify(pt())}`,`player: ${JSON.stringify(gr())}`,`tidal: ${JSON.stringify(hr())}`,`progression: ${JSON.stringify(t)}`,`media: ${JSON.stringify(pr())}`,`theme: ${JSON.stringify(yr())}`,"",`--- logs (${Ee.length}) ---`,$t()].join(`
`)},$e=async e=>zt(await Ft(e)),zt=async e=>{try{if(typeof navigator<"u"&&navigator.clipboard?.writeText!==void 0)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}catch{return!1}};var vr=400,Gn=100,Sr=5e-4,xr="__playbackKitAudioState",Gt=globalThis[xr]??={sources:new Map},ae=Gt.context,Le,Me,Fe,re=[],nt=Gt.sources,ft=new Map,kr="__playbackKitWorklets",Kn=globalThis[kr]??=new Set,Un=e=>new Promise(t=>setTimeout(t,e)),me=async()=>{if(ae===void 0){let e=window.AudioContext??window.webkitAudioContext;if(e===void 0)throw new Error("Web Audio is unavailable");ae=new e({latencyHint:"playback"}),Gt.context=ae,h("info","audio context created",{sampleRate:ae.sampleRate,state:ae.state})}if(ae.state==="suspended")try{await Promise.race([ae.resume(),Un(250)])}catch{}return ae},Kt=()=>{if(Le===void 0||Me===void 0)return;Le.disconnect();for(let t of re)try{t.output.disconnect()}catch{}let e=Le;for(let t of re)e.connect(t.input),e=t.output;e.connect(Me)},mt=async()=>{let e=await me();if(Le===void 0||Me===void 0){Le=e.createGain(),Me=e.createGain(),Fe=e.createAnalyser(),Fe.fftSize=2048,Me.connect(Fe),Me.connect(e.destination);for(let t of nt.values()){try{t.disconnect()}catch{}t.connect(Le)}}return Kt(),{ctx:e,input:Le,output:Me}},Ut=async(e,t)=>{if(ft.has(t))return ft.get(t);if(Kn.has(t))return;let n=await me(),a=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),r=(async()=>{let i;try{await Promise.race([n.audioWorklet.addModule(a),new Promise((c,o)=>{i=setTimeout(()=>o(new Error(`Timed out loading worklet ${t}`)),vr*10)})])}finally{i!==void 0&&clearTimeout(i),URL.revokeObjectURL(a)}})();ft.set(t,r);try{await r,Kn.add(t)}catch(i){throw ft.delete(t),i}},Ce=async e=>{let{ctx:t,input:n}=await mt();if(nt.has(e))return;if(e.mediaKeys!==null&&e.mediaKeys!==void 0)throw new Error("protected media (DRM) cannot be routed through Web Audio");let a=t.createMediaElementSource(e);a.connect(n),nt.set(e,a),h("info","audio engine attached element",{id:e.id,sources:nt.size})},Vt=async(e,t)=>{await gt(e,e,t)},gt=async(e,t,n)=>{if(await mt(),re.some(r=>r.input===e))return;let a=n===void 0?re.length:Math.max(0,Math.min(re.length,n));re.splice(a,0,{input:e,output:t}),Kt(),h("debug","audio engine inserted group",{index:a,nodes:re.length})},Er=async e=>{await mt();let t=re.findIndex(a=>a.input===e||a.output===e);if(t<0)return!1;let[n]=re.splice(t,1);try{n.output.disconnect()}catch{}return Kt(),!0},Pr=()=>re.map(e=>e.input),R=()=>({context:ae===void 0?"none":ae.state,sampleRate:ae?.sampleRate,sources:nt.size,nodes:re.length}),jt=async(e=1200)=>{let{ctx:t}=await mt();if(Fe===void 0)throw new Error("analyser unavailable");let n=Math.max(1,Math.round(e/Gn)),a=new Float32Array(Fe.fftSize),r=0,i=0,c=0;for(let l=0;l<n;l+=1){if(await Un(Gn),t.state!=="running")continue;Fe.getFloatTimeDomainData(a);let f=0,b=0;for(let k of a){let E=Math.abs(k);E>f&&(f=E),b+=k*k}r=Math.max(r,f),i+=b/a.length,c+=1}let o=c===0?0:Math.sqrt(i/c);return{rms:o,peak:r,samples:c,silent:o<Sr,durationMs:e}},wr=()=>({version:1,ensureContext:me,loadWorklet:Ut,attach:Ce,insert:Vt,insertGroup:gt,remove:Er,list:Pr,status:R,measureRms:jt}),Vn=()=>{let e=wr();return globalThis.__playbackKitAudio=e,e},jn=e=>{globalThis.__playbackKitAudio===e&&delete globalThis.__playbackKitAudio};var Jn=Re(At(),1);var Wn=`
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
`;var Wt=1e4,Qn=12,ht=8,Lr=1e3,Cr='<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>',Qt=(e,t,n)=>Math.min(n,Math.max(t,e)),Dr=()=>document.querySelector('[data-test="footer-player"] [class*="utilityButtons"]'),Ar=e=>{switch(e){case"HI_RES_LOSSLESS":return"Max";case"HI_RES":return"Hi-Res";case"LOSSLESS":return"Lossless";case"HIGH":return"High";case"LOW":return"Low";default:return e}},Yn=(e,t,n={})=>{new Jn.StyleTag("lunaspeed-styles",e,Wn);let a=document.createElement("div");a.className="lunaspeed-ctl",a.dataset.lunaspeed="control";let r=document.createElement("button");r.type="button",r.className="lunaspeed-step",r.textContent="\u2212",r.setAttribute("aria-label","Slower");let i=document.createElement("button");i.type="button",i.className="lunaspeed-pill",i.setAttribute("aria-label","Playback speed"),i.setAttribute("aria-haspopup","dialog"),i.innerHTML=`${Cr}<span class="lunaspeed-pill-label"></span>`;let c=i.querySelector(".lunaspeed-pill-label"),o=document.createElement("button");o.type="button",o.className="lunaspeed-step",o.textContent="+",o.setAttribute("aria-label","Faster"),a.append(r,i,o);let l=document.createElement("div");l.className="lunaspeed-popover",l.setAttribute("role","dialog"),l.setAttribute("aria-label","Playback settings"),l.hidden=!0,l.innerHTML=`
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
			<input class="lunaspeed-range" type="range" min="0" max="${Wt}" step="1" aria-label="Playback speed slider" />
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
			<span class="lunaspeed-version">v${qe}</span>
			<span class="lunaspeed-foot-actions">
				<button class="lunaspeed-settings" type="button">Luna settings</button>
				<button class="lunaspeed-copy" type="button">Copy diagnostics</button>
			</span>
		</div>`;let f=l.querySelector(".lunaspeed-value"),b=l.querySelector(".lunaspeed-presets"),k=l.querySelector(".lunaspeed-save-toggle"),E=l.querySelector(".lunaspeed-save"),g=l.querySelector(".lunaspeed-save-input"),I=l.querySelector(".lunaspeed-save-cancel"),C=l.querySelector(".lunaspeed-slider"),L=l.querySelector(".lunaspeed-range"),xe=l.querySelector(".lunaspeed-ticks"),Q=l.querySelector(".lunaspeed-pitch-value"),S=[...l.querySelectorAll(".lunaspeed-pitch-step")],oe=l.querySelector(".lunaspeed-switch"),le=l.querySelector(".lunaspeed-reset"),H=l.querySelector(".lunaspeed-copy"),J=l.querySelector(".lunaspeed-settings"),B=l.querySelector(".lunaspeed-pitch-dot"),O=l.querySelector(".lunaspeed-warning"),_=l.querySelector(".lunaspeed-warning-action"),G=l.querySelector(".lunaspeed-quality"),de=l.querySelector(".lunaspeed-quality-action"),he="",Y="",q=!1,ce=!1,ue,s,p=u=>{C.style.setProperty("--lunaspeed-pos",String(Qt(u,0,1)))},N=(u,y)=>{let x=Je(u,y);L.value=String(Math.round(x*Wt)),p(x)},Ie=()=>{let{bounds:u}=t.get(),y=`${u.min}:${u.max}`;y!==he&&(he=y,xe.replaceChildren(...Pn(u).map(x=>{let T=document.createElement("span");return T.className="lunaspeed-tick",T.style.left=`${(Je(x,u)*100).toFixed(3)}%`,T.textContent=He(x),T})))},ke=u=>u===null?"Custom":n.presets?.list().find(y=>y.id===u)?.name??"Custom",pn=()=>{let u=n.presets;if(u===void 0){b.hidden=!0,E.hidden=!0;return}let y=u.list(),x=t.get(),T=x.presetId,$=y.find(D=>D.id===T),X=$!==void 0&&!et($,x),pe=`${y.map(D=>`${D.id}:${D.name}`).join("|")}::${T??""}::${X}`;if(pe===Y)return;Y=pe;let Z=[],F=document.createElement("button");F.type="button",F.className="lunaspeed-preset",F.textContent="Custom",F.dataset.active=String(T===null),F.setAttribute("aria-pressed",String(T===null)),F.addEventListener("click",()=>u.clear()),Z.push(F);for(let D of y){let be=document.createElement("button");be.type="button",be.className="lunaspeed-preset";let Lt=T===D.id;be.textContent=Lt&&X?`${D.name} *`:D.name,be.dataset.active=String(Lt),be.setAttribute("aria-pressed",String(Lt)),be.dataset.builtin=String(D.builtin===!0),be.title=`${D.name} \u2014 ${He(D.speed)} \xB7 ${D.pitchShifts?"pitch follows speed":D.pitchSemitones!==0?`pitch ${We(D.pitchSemitones)} st`:"pitch preserved"} \xB7 ${ot(D.effects)}`,be.addEventListener("click",()=>u.apply(D)),Z.push(be)}b.replaceChildren(...Z)},Da=(u,y)=>{Q.textContent=`${We(u)} st`;for(let x of S){let T=Number(x.dataset.delta);x.disabled=T<0?u<=-12:u>=12,x.title=T<0?"Lower pitch by 1 semitone":"Raise pitch by 1 semitone"}oe.setAttribute("aria-checked",String(y))},fn=u=>{let y=n.getPitchEngineState?.(),x=u===0?"idle":y?.status??"idle";B.dataset.status=x;let T=x==="running"?"Pitch engine active":x==="waiting"?"Pitch engine waiting for the audio element":x==="unavailable"?"Pitch engine unavailable"+(y?.reason===void 0?"":": "+y.reason):x==="ready"?"Pitch engine ready":"Pitch engine idle";B.title=u===0?"":T,B.setAttribute("aria-label",u===0?"":T)},wt=u=>{O.hidden=u!=="native";let y=n.previousQuality?.()??null,x=u!=="native"&&y!==null;G.hidden=!x,x&&y!==null&&(de.textContent=`Restore ${Ar(y)}`)},Tt=()=>{let u=t.get(),{speed:y,pitchShifts:x,pitchSemitones:T,bounds:$,presetId:X}=u,pe=He(y);c.textContent=pe,i.dataset.active=String(y!==1||x||T!==0);let Z=n.presets?.list().find(D=>D.id===X),F=Z!==void 0&&!et(Z,u);i.title=`Playback ${pe}${X===null?"":` \xB7 ${ke(X)}${F?" *":""}`}`,r.setAttribute("aria-label",`Slower by ${He($.step)}`),o.setAttribute("aria-label",`Faster by ${He($.step)}`),r.title=`\u2212${ne($.step)}\xD7`,o.title=`+${ne($.step)}\xD7`,f.textContent=ne(y),ce||N(y,$),L.setAttribute("aria-valuetext",pe),Ie(),pn(),Da(T,x),fn(T),H.hidden=!u.developerMode,q&&Mt()},Mt=()=>{let u=i.getBoundingClientRect(),y=l.offsetWidth||348,x=l.offsetHeight||240,T=Qt(u.left+u.width/2-y/2,ht,window.innerWidth-y-ht),$=u.top-x-Qn,X="top";$<ht&&($=Math.min(u.bottom+Qn,window.innerHeight-x-ht),X="bottom"),l.style.left=`${Math.round(T)}px`,l.style.top=`${Math.round($)}px`,l.dataset.side=X;let pe=Qt(u.left+u.width/2-T,18,y-18);l.style.setProperty("--lunaspeed-caret",`${Math.round(pe)}px`)},mn=u=>{let y=u.target;y!==null&&(l.contains(y)||a.contains(y)||Ne())},gn=u=>{u.key==="Escape"&&(u.preventDefault(),Ne(),i.focus())},hn=()=>{q&&Mt()},Aa=()=>{q||(q=!0,l.hidden=!1,i.dataset.open="true",Tt(),wt(n.getPlayerKind?.()??"unknown"),Mt(),n.onOpen?.(),document.addEventListener("pointerdown",mn,!0),document.addEventListener("keydown",gn,!0),window.addEventListener("resize",hn),ue=setInterval(()=>fn(t.get().pitchSemitones),500),h("debug","popover open"))},Ne=()=>{q&&(q=!1,l.hidden=!0,delete i.dataset.open,E.hidden=!0,ue!==void 0&&(clearInterval(ue),ue=void 0),document.removeEventListener("pointerdown",mn,!0),document.removeEventListener("keydown",gn,!0),window.removeEventListener("resize",hn))},Ia=()=>q?Ne():Aa(),bn=()=>{if(!a.isConnected){q&&Ne();let y=Dr();if(y===null)return;let x=y.querySelector('[class*="sliderContainer"]');x!==null&&x.parentElement===y?y.insertBefore(a,x):y.appendChild(a)}let u=document.getElementById("wimp")??document.body;l.parentElement!==u&&u.appendChild(l)};k.addEventListener("click",()=>{if(E.hidden=!E.hidden,E.hidden)return;let u=n.presets?.list().find(y=>y.id===t.get().presetId);g.value=u===void 0?"":u.builtin===!0?`${u.name} (edited)`:u.name,g.focus(),g.select()}),r.addEventListener("click",()=>t.step(-1)),o.addEventListener("click",()=>t.step(1)),i.addEventListener("click",Ia),L.addEventListener("pointerdown",()=>{ce=!0,s!==void 0&&clearTimeout(s),delete C.dataset.settling});let Ge=()=>{if(!ce)return;ce=!1;let{speed:u,bounds:y}=t.get();C.dataset.settling="true",N(u,y),s!==void 0&&clearTimeout(s),s=setTimeout(()=>{s=void 0,delete C.dataset.settling},160)};L.addEventListener("change",Ge),window.addEventListener("pointerup",Ge),window.addEventListener("pointercancel",Ge),L.addEventListener("input",()=>{if(L.disabled)return;let u=Number(L.value)/Wt,y=t.get().bounds;p(u),t.setSpeed(En(u,y))}),l.addEventListener("keydown",u=>{u.key==="ArrowLeft"||u.key==="ArrowDown"?(u.preventDefault(),t.step(-1)):(u.key==="ArrowRight"||u.key==="ArrowUp")&&(u.preventDefault(),t.step(1))});for(let u of S)u.addEventListener("click",()=>{let y=Number(u.dataset.delta);t.setPitchSemitones(t.get().pitchSemitones+y)});oe.addEventListener("click",()=>t.setPitchShifts(!t.get().pitchShifts)),le.addEventListener("click",()=>t.reset()),E.addEventListener("submit",u=>{u.preventDefault();let y=n.presets;if(y===void 0)return;let x=g.value.trim();if(x==="")return;let{speed:T,pitchShifts:$,pitchSemitones:X,effects:pe}=t.get(),Z=y.list().find(F=>F.id===t.get().presetId);if(Z!==void 0&&Z.builtin!==!0&&x===Z.name)y.saveActive(Z);else{let F=y.save(x,{speed:T,pitchShifts:$,pitchSemitones:X,effects:pe});if(F===void 0)return;y.apply(F)}g.value="",E.hidden=!0,Y="",pn(),h("info","preset saved",{name:x})}),I.addEventListener("click",()=>{E.hidden=!0,g.value=""}),J.hidden=n.openSettings===void 0,J.addEventListener("click",()=>{n.openSettings?.(),Ne()});let Ke;H.addEventListener("click",async()=>{Ke!==void 0&&clearTimeout(Ke),H.disabled=!0,H.textContent="Copying\u2026";let u=await $e(t.get());h(u?"info":"error","diagnostics copied",{copied:u}),H.textContent=u?"Copied":"Copy failed",Ke=setTimeout(()=>{H.textContent="Copy diagnostics",H.disabled=!1},1800)});let Ue;_.addEventListener("click",()=>{n.useBrowserPlayer!==void 0&&(Ue!==void 0&&clearTimeout(Ue),_.disabled=!0,_.textContent="Switching\u2026",n.useBrowserPlayer(),h("info","requested browser player from warning"),Ue=setTimeout(()=>{_.disabled=!1,_.textContent="Use browser player"},2500))}),de.addEventListener("click",()=>{n.restoreQuality!==void 0&&(n.restoreQuality(),G.hidden=!0,h("info","restored original streaming quality"))}),wt(n.getPlayerKind?.()??"unknown");let yn=n.subscribePlayerKind?.(wt);yn!==void 0&&e.add(yn),bn(),Tt(),e.add(t.subscribe(Tt));let Na=setInterval(bn,Lr);e.add(()=>{clearInterval(Na),window.removeEventListener("pointerup",Ge),window.removeEventListener("pointercancel",Ge),Ke!==void 0&&clearTimeout(Ke),Ue!==void 0&&clearTimeout(Ue),s!==void 0&&clearTimeout(s),Ne(),l.remove(),a.remove()})};var P,Pe={built:!1,active:[],attached:0},Xn=()=>({...Pe}),Ir=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Nr=(e,t)=>{let n=Math.max(1,Math.floor(e.sampleRate*t)),a=e.createBuffer(2,n,e.sampleRate);for(let r=0;r<2;r+=1){let i=a.getChannelData(r);for(let c=0;c<n;c+=1){let o=Math.pow(1-c/n,2.2);i[c]=(Math.random()*2-1)*o}}return a},Rr=async()=>{let e=await me();if(P!==void 0)return P;let t=e.createGain(),n=Be.map((N,Ie)=>{let ke=e.createBiquadFilter();return ke.frequency.value=N,Ie===0?ke.type="lowshelf":Ie===Be.length-1?ke.type="highshelf":(ke.type="peaking",ke.Q.value=1.2),ke}),a=e.createGain(),r=e.createDelay(2),i=e.createGain(),c=e.createGain(),o=e.createGain(),l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=220,l.Q.value=.7;let f=e.createBiquadFilter();f.type="lowshelf",f.frequency.value=45;let b=e.createBiquadFilter();b.type="lowshelf",b.frequency.value=90;let k=e.createGain(),E=e.createWaveShaper(),g=new Float32Array(2048);for(let N=0;N<g.length;N+=1){let Ie=N/(g.length-1)*2-1;g[N]=Math.tanh(3*Ie)/Math.tanh(3)}E.curve=g,E.oversample="4x";let I=e.createGain(),C=e.createDynamicsCompressor();C.threshold.value=-3,C.knee.value=0,C.ratio.value=20,C.attack.value=.003,C.release.value=.25;let L=e.createGain(),xe=e.createChannelSplitter(2),Q=e.createDelay(.05);Q.delayTime.value=.015;let S=e.createDelay(.05);S.delayTime.value=.015;let oe=e.createChannelMerger(2),le=e.createStereoPanner(),H=e.createGain();H.gain.value=1;let J=e.createGain();J.gain.value=0;let B=e.createGain(),O=e.createOscillator();O.type="sine",O.frequency.value=.12;let _=e.createGain();_.gain.value=0;let G=e.createOscillator();G.type="sine",G.frequency.value=.35;let de=e.createGain();de.gain.value=0;let he=e.createGain();he.gain.value=0,O.connect(_),_.connect(le.pan),G.connect(de),G.connect(he),de.connect(Q.delayTime),he.connect(S.delayTime),O.start(),G.start(),L.connect(H),H.connect(B),L.connect(xe),xe.connect(Q,0),xe.connect(S,1),Q.connect(oe,0,0),S.connect(oe,0,1),oe.connect(le),le.connect(J),J.connect(B);let Y=e.createGain(),q=e.createGain(),ce=e.createConvolver(),ue=e.createGain(),s=e.createGain();t.connect(n[0]);for(let N=1;N<n.length;N+=1)n[N-1].connect(n[N]);let p=n[n.length-1];return p.connect(o),o.connect(L),p.connect(l),l.connect(f),f.connect(b),b.connect(k),k.connect(E),E.connect(I),I.connect(L),B.connect(a),B.connect(r),a.connect(Y),r.connect(i),i.connect(Y),r.connect(c),c.connect(r),Y.connect(q),q.connect(C),Y.connect(ce),ce.connect(ue),ue.connect(C),C.connect(s),P={fxIn:t,eqFilters:n,delayDry:a,delayNode:r,delayWet:i,delayFeedback:c,bassDry:o,bassLowpass:l,bassSub:f,bassBoost:b,bassDrive:k,bassShaper:E,bassWet:I,eightDInput:L,eightDSplitter:xe,eightDDelayL:Q,eightDDelayR:S,eightDMerger:oe,eightDPanner:le,eightDDry:H,eightDWet:J,eightDOut:B,panLfo:O,panDepth:_,pitchLfo:G,pitchDepthL:de,pitchDepthR:he,limiter:C,reverbIn:Y,reverbDry:q,convolver:ce,reverbWet:ue,fxOut:s,decay:0},await gt(t,s),h("info","effects graph inserted"),P},Br=(e,t)=>{if(P===void 0)return;let n=e.currentTime,a=.06,r=P;for(let b=0;b<r.eqFilters.length;b+=1){let k=t.eq.enabled?t.eq.bands[b]??0:0;r.eqFilters[b].gain.setTargetAtTime(k,n,a)}let i=t.bass.enabled?t.bass.mix:0;r.bassDry.gain.setTargetAtTime(1,n,a),r.bassWet.gain.setTargetAtTime(i,n,a),r.bassSub.gain.setTargetAtTime(t.bass.enabled?t.bass.sub:0,n,a),r.bassBoost.gain.setTargetAtTime(t.bass.enabled?t.bass.boost:0,n,a),r.bassDrive.gain.setTargetAtTime(t.bass.enabled?1+t.bass.drive*3:1,n,a),r.panLfo.frequency.setTargetAtTime(t.eightD.rate,n,a),r.panDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.panDepth:0,n,a),r.pitchLfo.frequency.setTargetAtTime(t.eightD.pitchRate,n,a);let c=t.eightD.enabled?t.eightD.pitchDepth/1e3:0;r.pitchDepthL.gain.setTargetAtTime(c,n,a),r.pitchDepthR.gain.setTargetAtTime(-c,n,a);let o=t.eightD.enabled?t.eightD.mix:0;r.eightDDry.gain.setTargetAtTime(1-o,n,a),r.eightDWet.gain.setTargetAtTime(o,n,a);let l=t.delay.enabled?t.delay.mix:0;r.delayNode.delayTime.setTargetAtTime(Math.min(2,Math.max(.02,t.delay.timeMs/1e3)),n,a),r.delayFeedback.gain.setTargetAtTime(t.delay.enabled?t.delay.feedback:0,n,a),r.delayWet.gain.setTargetAtTime(l,n,a),r.delayDry.gain.setTargetAtTime(1-l,n,a);let f=t.reverb.enabled?t.reverb.mix:0;Math.abs(r.decay-t.reverb.decay)>.05&&(r.convolver.buffer=Nr(e,t.reverb.decay),r.decay=t.reverb.decay),r.reverbWet.gain.setTargetAtTime(f,n,a),r.reverbDry.gain.setTargetAtTime(1-f,n,a)},Jt=async(e,t)=>{let n=K(e),a=st(n);if(!a&&P===void 0){Pe={...Pe,active:[]};return}try{let r=await me();if(r.state!=="running"&&a){Pe={built:P!==void 0,context:r.state,active:[],error:"audio context suspended (interact with the page)",attached:R().sources};return}if(a){let c=Ir(t);c!==void 0&&await Ce(c)}let i=await Rr();Br(r,n),Pe={built:!0,context:r.state,active:[n.eq.enabled?"eq":"",n.bass.enabled?"bass":"",n.eightD.enabled?"8d":"",n.delay.enabled?"delay":"",n.reverb.enabled?"reverb":""].filter(c=>c!==""),attached:R().sources},i.decay===0&&n.reverb.enabled&&(i.decay=n.reverb.decay)}catch(r){let i=r instanceof Error?r.message:String(r);Pe={built:P!==void 0,context:R().context,active:[],error:i,attached:R().sources},h("warn","effects engine unavailable",{error:i})}},Zn=()=>{if(P!==void 0){let e=P.eqFilters[0].context.currentTime,t=.03;for(let n of P.eqFilters)n.gain.setTargetAtTime(0,e,t);P.bassWet.gain.setTargetAtTime(0,e,t),P.bassDry.gain.setTargetAtTime(1,e,t),P.bassSub.gain.setTargetAtTime(0,e,t),P.bassBoost.gain.setTargetAtTime(0,e,t),P.bassDrive.gain.setTargetAtTime(1,e,t),P.eightDWet.gain.setTargetAtTime(0,e,t),P.eightDDry.gain.setTargetAtTime(1,e,t),P.panDepth.gain.setTargetAtTime(0,e,t),P.pitchDepthL.gain.setTargetAtTime(0,e,t),P.pitchDepthR.gain.setTargetAtTime(0,e,t),P.delayWet.gain.setTargetAtTime(0,e,t),P.delayDry.gain.setTargetAtTime(1,e,t),P.delayFeedback.gain.setTargetAtTime(0,e,t),P.reverbWet.gain.setTargetAtTime(0,e,t),P.reverbDry.gain.setTargetAtTime(1,e,t)}Pe={...Pe,active:[],error:void 0}};var na="#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two",ea=["loadstart","loadedmetadata","canplay","playing","play","emptied","ratechange","seeked"],bt=.001,ta=1,_r=150,yt=e=>{let t=e.id;return typeof t=="string"?t:e.constructor.name},ie=()=>typeof document>"u"?[]:[...document.querySelectorAll(na)],vt=class{constructor(t,n){this.getElements=t;this.source=n}getElements;source;attachments=new Map;timers=new Set;start(){this.scan()}scan(){let t=this.getElements(),n=0;for(let a of t)this.attachments.has(a)||(this.attach(a),n+=1);n>0?h("info","attached media elements",{added:n,total:this.attachments.size,found:t.length}):t.length===0&&h("debug","no media elements found",{selector:na})}apply(){this.scan();for(let t of this.attachments.keys())this.applyTo(t,"settings-change")}stop(){for(let t of this.timers)clearTimeout(t);this.timers.clear();for(let[t,n]of this.attachments)n(),this.restore(t);this.attachments.clear(),h("info","controller stopped")}attach(t){let n=a=>{let r=this.source.get().speed,i=t.playbackRate;Math.abs(i-r)>bt&&h("warn","TIDAL reset the rate",{id:yt(t),event:a.type,before:i,desired:r,currentTime:t.currentTime}),this.applyTo(t,a.type),(a.type==="loadstart"||a.type==="emptied")&&this.scheduleReapply(t)};for(let a of ea)t.addEventListener(a,n);this.attachments.set(t,()=>{for(let a of ea)t.removeEventListener(a,n)}),h("info","attached",{id:yt(t),tag:t.constructor.name,rate:t.playbackRate}),this.applyTo(t,"attach")}applyTo(t,n){let{speed:a,pitchShifts:r}=this.source.get(),i=t.playbackRate;try{Math.abs(i-a)>bt&&(t.playbackRate=a),t.defaultPlaybackRate!==void 0&&Math.abs(t.defaultPlaybackRate-a)>bt&&(t.defaultPlaybackRate=a);let o=!r;t.preservesPitch!==void 0&&t.preservesPitch!==o&&(t.preservesPitch=o),t.webkitPreservesPitch!==void 0&&t.webkitPreservesPitch!==o&&(t.webkitPreservesPitch=o)}catch(o){h("error","failed to apply rate",{id:yt(t),reason:n,error:String(o)});return}let c=t.playbackRate;Math.abs(c-i)>bt&&h("debug","applied rate",{id:yt(t),reason:n,before:i,after:c,readback:c,defaultRate:t.defaultPlaybackRate})}scheduleReapply(t){let n=setTimeout(()=>{this.timers.delete(n),this.attachments.has(t)&&this.applyTo(t,"delayed-reapply")},_r);this.timers.add(n)}restore(t){try{t.playbackRate=ta,t.defaultPlaybackRate!==void 0&&(t.defaultPlaybackRate=ta),t.preservesPitch!==void 0&&(t.preservesPitch=!0),t.webkitPreservesPitch!==void 0&&(t.webkitPreservesPitch=!0)}catch{}}};var St="__lunaspeedPatched",j,V,aa=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||t.Player===void 0||t.Player.prototype===void 0))return t},Yt=e=>{let t=new Set,n=e,a=0;for(;n!==null&&a<4;){for(let r of Object.getOwnPropertyNames(n))t.add(r);n=Object.getPrototypeOf(n),a+=1}return[...t]},ra=e=>{let t=Yt(e),n=t.find(a=>/^set(playback|audio)?(rate|speed|tempo)$/i.test(a));return n!==void 0&&typeof e[n]=="function"?n:typeof e.playbackRate=="number"?"playbackRate":t.find(a=>/^(playbackRate|rate|speed)$/i.test(a)&&typeof e[a]=="number")},Hr=e=>{j!==e&&(j=e,V=ra(e),h("info","native player instance captured",{rateMember:V??null,ownKeys:Object.keys(e).slice(0,40),methods:Yt(e).slice(0,80)}))},Xt=()=>{let e=aa();if(e===void 0)return!1;let t=e.Player?.prototype;if(t===void 0)return!1;if(t[St]===!0)return!0;try{Object.defineProperty(t,St,{value:!0,enumerable:!1})}catch{return!1}for(let n of["play","load","pause","seek"]){let a=t[n];typeof a=="function"&&(t[n]=function(...i){try{Hr(this)}catch(c){h("error","native capture failed",{error:String(c)})}return a.apply(this,i)})}return h("info","native player component patched"),!0},ia=()=>j!==void 0,Zt=e=>{if(j===void 0||(V===void 0&&(V=ra(j)),V===void 0))return!1;try{let t=j[V];if(V==="playbackRate"){if(t===e)return!0;j.playbackRate=e}else j[V](e);return h("info","native rate applied",{rate:e,member:V,readback:j[V]}),!0}catch(t){return h("error","native rate failed",{rate:e,member:V,error:String(t)}),!1}},xt=()=>{let e=aa();if(e===void 0)return{present:!1};let t=e.Player?.prototype,n=t===void 0?[]:Object.getOwnPropertyNames(t).filter(a=>a!==St);return{present:!0,patched:t!==void 0&&t[St]===!0,playerMethods:n.slice(0,100),rateMethods:n.filter(a=>/rate|speed|tempo|pitch/i.test(a)),instanceCaptured:j!==void 0,rateMember:V??null,instanceMethods:j===void 0?[]:Yt(j).slice(0,100)}};var sa=`
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
`;var oa="playback-kit-pitch",ge,W={status:"idle",semitones:0,attached:0},en=()=>({...W}),Or=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),qr=async e=>(await Ut(sa,oa),ge===void 0&&(ge=new AudioWorkletNode(e,oa,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]}),await Vt(ge,0),h("info","pitch node inserted into audio engine")),ge),$r=async(e,t)=>{let n=await me();if(n.state!=="running"){W={status:"waiting",reason:"audio context suspended (interact with the page)",semitones:e,context:n.state,attached:W.attached};return}let a=Or(t);if(a===void 0){W={status:"waiting",reason:"no playing media element",semitones:e,context:n.state,attached:W.attached};return}await Ce(a);let i=(await qr(n)).parameters.get("ratio");i!==void 0&&(i.value=xn(e)),W={status:"running",semitones:e,context:n.state,attached:R().sources}},kt=async(e,t)=>{if(e===0){if(ge!==void 0){let n=ge.parameters.get("ratio");n!==void 0&&(n.value=1)}W={...W,status:ge===void 0?"idle":"ready",semitones:0,reason:void 0};return}try{await $r(e,t)}catch(n){let a=n instanceof Error?n.message:String(n);W={status:"unavailable",reason:a,semitones:e,attached:W.attached},h("error","pitch engine unavailable",{error:a})}},la=()=>{if(ge!==void 0){let e=ge.parameters.get("ratio");e!==void 0&&(e.value=1)}W={...W,status:ge===void 0?"idle":"ready",semitones:0,reason:void 0}};var Et="unknown",tn=new Set,De=()=>Et,nn=e=>{if(e!==Et){h("info","player kind changed",{from:Et,to:e}),Et=e;for(let t of[...tn])try{t(e)}catch(n){h("error","player kind listener failed",{error:String(n)})}}},da=e=>(tn.add(e),()=>tn.delete(e));var Fr=(e,t)=>{let n=new Set(e.get().map(r=>r.name));if(!n.has(t))return t;let a=2;for(;n.has(`${t} ${a}`);)a+=1;return`${t} ${a}`},ca=(e,t,n)=>{let a=e.get(),r={speed:a.speed,pitchShifts:a.pitchShifts,pitchSemitones:a.pitchSemitones,effects:a.effects};if(n.builtin===!0){let i=t.save(Fr(t,`${n.name} (edited)`),r);return i!==void 0&&e.applyPreset(i),i}return t.update(n.id,r),n},at=(e,t)=>{let n=e.get();n.builtinPresets||n.presetId===null||t.getById(n.presetId)?.builtin===!0&&e.clearPreset()};var zr=e=>Math.abs(e-1)>.001,an=e=>{if(!zr(e.getSpeed())||!e.isPlaying())return!1;let t=e.getPosition();return t===null||!Number.isFinite(t)||t<0?!1:(e.dispatchTimeUpdate(t),!0)},ua=(e,t=100)=>{let n=setInterval(()=>an(e),t);return()=>clearInterval(n)};var d=Re(sn(),1),m=Re(pa(),1);var fa=e=>({id:e.id,paused:e.paused,readyState:e.readyState,currentTime:Number(e.currentTime.toFixed(2)),playbackRate:e.playbackRate}),ma=async(e=1200)=>{let t=Date.now(),n=R(),a=ie(),r=a.find(g=>!g.paused&&g.readyState>0)??a[0];if(r===void 0){let g={at:t,ok:!1,reason:"no media element",context:n.context,engine:n};return h("warn","audio self-test: no media element"),g}let i=r.currentTime;try{await Ce(r)}catch(g){let I={at:t,ok:!1,reason:g instanceof Error?g.message:String(g),context:R().context,element:fa(r),engine:R()};return h("warn","audio self-test failed to attach",I),I}let c=await me(),o=0,l=0,f=!0;try{let g=await jt(e);o=g.rms,l=g.peak,f=g.silent}catch(g){h("error","audio self-test measurement failed",{error:String(g)})}let b=Number((r.currentTime-i).toFixed(2)),k=c.state!=="running"?`audio context ${c.state}`:r.paused?"playback is paused":f&&b>.2?"captured audio is silent (DRM-protected or already routed elsewhere)":f?"no audio measured":void 0,E={at:t,ok:k===void 0,reason:k,context:c.state,element:fa(r),progressionSeconds:b,rms:Number(o.toFixed(5)),peak:Number(l.toFixed(5)),silent:f,engine:R()};return h(E.ok?"info":"warn","audio self-test",E),E};var U=Re(sn(),1);var Gr=132,ga=ee-ye,ln=e=>Math.max(ye,Math.min(ee,e)),ha=e=>`${e>0?"+":""}${e}`,ba=e=>e>=1e3?`${e/1e3}k`:String(e),Kr=({frequency:e,value:t,disabled:n,onChange:a})=>{let r=U.default.useRef(null),[i,c]=U.default.useState(null),o=g=>{let I=r.current;if(I===null)return;let C=I.getBoundingClientRect(),L=Math.max(0,Math.min(1,(g-C.top)/C.height));c(L*100),a(ln(Math.round(ee-L*ga)))},l=i??(ee-t)/ga*100,f=50,b=Math.min(l,f),k=Math.abs(l-f),E=i===null;return U.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:30,opacity:n?.4:1}},U.default.createElement("span",{style:{fontSize:10,fontVariantNumeric:"tabular-nums",color:"currentColor",opacity:.8}},ha(t)),U.default.createElement("div",{ref:r,role:"slider",tabIndex:n?-1:0,"aria-label":`${ba(e)} Hz`,"aria-valuemin":ye,"aria-valuemax":ee,"aria-valuenow":t,"aria-valuetext":`${ha(t)} dB`,"aria-disabled":n,onPointerDown:g=>{n||(g.preventDefault(),g.currentTarget.setPointerCapture(g.pointerId),o(g.clientY))},onPointerMove:g=>{n||!g.currentTarget.hasPointerCapture(g.pointerId)||o(g.clientY)},onPointerUp:g=>{g.currentTarget.hasPointerCapture(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),c(null)},onPointerCancel:g=>{g.currentTarget.hasPointerCapture(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),c(null)},onDoubleClick:()=>{n||a(0)},onKeyDown:g=>{if(n)return;let I=g.shiftKey?3:1;if(g.key==="ArrowUp"||g.key==="ArrowRight")a(ln(t+I));else if(g.key==="ArrowDown"||g.key==="ArrowLeft")a(ln(t-I));else if(g.key==="Home")a(ye);else if(g.key==="End")a(ee);else return;g.preventDefault()},style:{position:"relative",width:18,height:Gr,cursor:n?"default":"pointer",touchAction:"none",outline:"none"}},U.default.createElement("div",{style:{position:"absolute",left:"50%",top:0,bottom:0,width:5,transform:"translateX(-50%)",borderRadius:999,background:"color-mix(in srgb, currentColor 16%, transparent)"}}),U.default.createElement("div",{style:{position:"absolute",left:0,right:0,top:`${f}%`,height:1,background:"color-mix(in srgb, currentColor 28%, transparent)"}}),U.default.createElement("div",{style:{position:"absolute",left:"50%",width:5,transform:"translateX(-50%)",borderRadius:999,top:`${b}%`,height:`${k}%`,background:"var(--wave-color-solid-accent-fill, currentColor)",transition:E?"top 120ms ease, height 120ms ease":"none"}}),U.default.createElement("div",{style:{position:"absolute",left:"50%",top:`${l}%`,width:12,height:12,transform:"translate(-50%, -50%)",borderRadius:"50%",background:"currentColor",boxShadow:"0 0 0 3px color-mix(in srgb, var(--wave-color-solid-accent-fill, currentColor) 22%, transparent), 0 1px 3px rgba(0,0,0,.5)",transition:E?"top 120ms ease":"none"}})),U.default.createElement("span",{style:{fontSize:9,opacity:.6,letterSpacing:"-0.02em"}},ba(e)))},ya=({eq:e,disabled:t,onChange:n})=>U.default.createElement("div",{style:{display:"flex",gap:8,alignItems:"flex-end",marginLeft:"auto",padding:"2px 0"}},Be.map((a,r)=>U.default.createElement(Kr,{key:a,frequency:a,value:e.bands[r]??0,disabled:t,onChange:i=>{let c=[...e.bands];c[r]=i,n(c)}})));var dn=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)&&t>0?t:void 0},z=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)?t:void 0},Ur=e=>{let t=e.pitchShifts?"pitch follows speed":e.pitchSemitones===0?"pitch preserved":`pitch ${We(e.pitchSemitones)} st`;return`${ne(e.speed)}\xD7 \xB7 ${t} \xB7 ${ot(e.effects)}`},Ae={display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:6,marginLeft:"auto"},rt=({children:e})=>d.default.createElement("div",{style:{marginBottom:16}},e),Vr=()=>{let[e,t]=d.default.useState(v.get),[n,a]=d.default.useState(M.get),[r,i]=d.default.useState("Copy diagnostics"),[c,o]=d.default.useState("Resolving\u2026"),[l,f]=d.default.useState(""),[b,k]=d.default.useState(null),[E,g]=d.default.useState(!1),[I,C]=d.default.useState("Attaches the playing element, measures captured RMS and reports blocked/silent reasons. May silence playback if capture fails; restart TIDAL to undo.");d.default.useEffect(()=>v.subscribe(t),[]),d.default.useEffect(()=>M.subscribe(()=>a(M.get())),[]),d.default.useEffect(()=>{ct().then(o).catch(()=>o("unavailable"))},[]),d.default.useEffect(()=>{if(r==="Copy diagnostics")return;let s=setTimeout(()=>i("Copy diagnostics"),1800);return()=>clearTimeout(s)},[r]),d.default.useEffect(()=>{if(l==="")return;let s=setTimeout(()=>f(""),4e3);return()=>clearTimeout(s)},[l]);let{bounds:L,pitchShifts:xe,developerMode:Q,effects:S,builtinPresets:oe}=e,le=oe?n:n.filter(s=>s.builtin!==!0),H=le.findIndex(s=>s.builtin!==!0),J=s=>v.setEffects({...S,eq:{...S.eq,...s}}),B=s=>v.setEffects({...S,bass:{...S.bass,...s}}),O=s=>v.setEffects({...S,eightD:{...S.eightD,...s}}),_=s=>v.setEffects({...S,delay:{...S.delay,...s}}),G=s=>v.setEffects({...S,reverb:{...S.reverb,...s}}),de=async s=>{let p=dt(s);return p===void 0?!1:(v.replace(p.settings),M.replace(p.presets),at(v,M),await Oe(tt(p.settings,p.presets)),!0)},he=async()=>{try{let s=await An();if(s===null)return f("Import cancelled");let p=await de(s.json);f(p?`Imported ${s.path}`:"Import failed: invalid config")}catch(s){f(`Import failed: ${String(s)}`)}},Y=async()=>{try{let s=await Dn(tt(v.get(),M.get()));f(s===null?"Export cancelled":`Exported ${s}`)}catch(s){f(`Export failed: ${String(s)}`)}},q=async()=>{try{let s=await ut();if(s===null)return f("Config file not found");let p=await de(s);f(p?"Reloaded from config file":"Reload failed: invalid config")}catch(s){f(`Reload failed: ${String(s)}`)}},ce=s=>{window.confirm(`Overwrite "${s.name}" with the current speed, pitch and effects?`)&&(M.update(s.id,{speed:e.speed,pitchShifts:e.pitchShifts,pitchSemitones:e.pitchSemitones,effects:e.effects}),f(`Updated "${s.name}"`))},ue=s=>{window.confirm(`Delete preset "${s.name}"?`)&&(M.remove(s.id),f(`Deleted "${s.name}"`))};return d.default.createElement("div",{style:{paddingBottom:8}},d.default.createElement(rt,null,d.default.createElement(m.LunaSettings,{title:"Playback",desc:"Speed and pitch. Effects live in their own section below."},d.default.createElement(m.LunaTextSetting,{title:"Minimum speed",desc:"Below 0.0625\xD7 Chromium plays at its floor.",defaultValue:ne(L.min),inputProps:{inputMode:"decimal"},onChange:s=>{let p=dn(s.target.value);p!==void 0&&v.setBounds({min:p})}}),d.default.createElement(m.LunaTextSetting,{title:"Maximum speed",defaultValue:ne(L.max),inputProps:{inputMode:"decimal"},onChange:s=>{let p=dn(s.target.value);p!==void 0&&v.setBounds({max:p})}}),d.default.createElement(m.LunaTextSetting,{title:"Snap step",desc:"Slider snapping and the \u2212 / + step size.",defaultValue:ne(L.step),inputProps:{inputMode:"decimal"},onChange:s=>{let p=dn(s.target.value);p!==void 0&&v.setBounds({step:p})}}),d.default.createElement(m.LunaSwitchSetting,{title:"Pitch follows speed",desc:"Chipmunk / slow-mo. Clears any custom pitch shift.",checked:xe,onChange:s=>v.setPitchShifts(s.target.checked)}),d.default.createElement(m.LunaSetting,{title:"Reset",desc:"Back to 1.00\xD7, pitch shift off, all effects off."},d.default.createElement("div",{style:Ae},d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>v.reset()},"Reset playback"))))),d.default.createElement(rt,null,d.default.createElement(m.LunaSettings,{title:"Presets",desc:"Capture speed, pitch and effects. Built-ins are fixed; custom presets can be applied, renamed, updated, reordered and deleted."},d.default.createElement(m.LunaSwitchSetting,{title:"Built-in presets",desc:"Show the built-in presets.",checked:oe,onChange:s=>{let p=s.target.checked;v.setBuiltinPresets(p),at(v,M)}}),le.map((s,p)=>{let N=e.presetId===s.id&&!et(s,e);return d.default.createElement(m.LunaSetting,{key:s.id,title:`${s.name}${N?" *":""}`,desc:Ur(s)},d.default.createElement("div",{style:Ae},e.presetId===s.id?d.default.createElement("span",{style:{fontSize:12,opacity:.7}},"Active"):d.default.createElement(m.LunaButton,{size:"small",onClick:()=>v.applyPreset(s)},"Use"),s.builtin===!0?d.default.createElement("span",{style:{fontSize:12,opacity:.6}},"Built-in"):d.default.createElement(d.default.Fragment,null,d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>k({id:s.id,name:s.name,value:s.name})},"Rename"),d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>ce(s)},"Update"),d.default.createElement(m.LunaButton,{size:"small",variant:"text",disabled:p<=H,title:"Move up",onClick:()=>M.move(s.id,-1)},"\u2191"),d.default.createElement(m.LunaButton,{size:"small",variant:"text",disabled:p>=le.length-1,title:"Move down",onClick:()=>M.move(s.id,1)},"\u2193"),d.default.createElement(m.LunaButton,{size:"small",variant:"text",color:"error",onClick:()=>ue(s)},"Delete"))))}),b!==null&&d.default.createElement(d.default.Fragment,null,d.default.createElement(m.LunaTextSetting,{title:`Rename ${b.name}`,defaultValue:b.value,onChange:s=>k({...b,value:s.target.value})}),d.default.createElement(m.LunaSetting,{title:" "},d.default.createElement("div",{style:Ae},d.default.createElement(m.LunaButton,{size:"small",onClick:()=>{M.rename(b.id,b.value),k(null)}},"Save"),d.default.createElement(m.LunaButton,{size:"small",variant:"text",onClick:()=>k(null)},"Cancel")))))),d.default.createElement(rt,null,d.default.createElement(m.LunaSettings,{title:"Effects",desc:"Same Web Audio chain as pitch. Needs audio capture \u2014 use the dev-mode self-test if nothing changes."},d.default.createElement(m.LunaSwitchSetting,{title:"Equalizer",desc:"8 bands, 62 Hz to 8 kHz, \xB112 dB. Drag a band; double-click resets it.",checked:S.eq.enabled,onChange:s=>J({enabled:s.target.checked})}),d.default.createElement(m.LunaSetting,{title:"Bands",desc:"Shift+arrow for 3 dB steps."},d.default.createElement(ya,{eq:S.eq,disabled:!S.eq.enabled,onChange:s=>J({bands:s})})),d.default.createElement(m.LunaSetting,{title:"Flatten",desc:"Set every band to 0 dB."},d.default.createElement("div",{style:Ae},d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",disabled:!S.eq.enabled,onClick:()=>J({bands:Array.from({length:je},()=>0)})},"Flatten EQ"))),d.default.createElement(m.LunaSwitchSetting,{title:"Bass boost",desc:"Parallel low-shelf sub boost with saturation for dirty kicks. Added on top of the dry signal.",checked:S.bass.enabled,onChange:s=>B({enabled:s.target.checked})}),d.default.createElement(m.LunaTextSetting,{title:"Bass boost (dB)",desc:"Low shelf at 90 Hz, 0\u201324 dB.",defaultValue:String(Math.round(S.bass.boost)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&B({boost:Math.max(0,Math.min(24,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"Sub (dB)",desc:"Extra shelf at 45 Hz, 0\u201312 dB.",defaultValue:String(Math.round(S.bass.sub)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&B({sub:Math.max(0,Math.min(12,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"Drive (%)",desc:"Saturation on the bass path; more harmonics, dirtier kicks.",defaultValue:String(Math.round(S.bass.drive*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&B({drive:Math.max(0,Math.min(100,p))/100})}}),d.default.createElement(m.LunaTextSetting,{title:"Bass amount (%)",desc:"How much of the boosted bass is added back.",defaultValue:String(Math.round(S.bass.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&B({mix:Math.max(0,Math.min(100,p))/100})}}),d.default.createElement(m.LunaSwitchSetting,{title:"8D audio",desc:"LFO panning plus a constant pitch wobble, so the mix moves around your head.",checked:S.eightD.enabled,onChange:s=>O({enabled:s.target.checked})}),d.default.createElement(m.LunaTextSetting,{title:"8D pan rate (Hz)",desc:"How fast the sound travels left/right.",defaultValue:String(S.eightD.rate),inputProps:{inputMode:"decimal"},onChange:s=>{let p=z(s.target.value);p!==void 0&&O({rate:Math.max(.02,Math.min(2,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"8D pan depth (%)",defaultValue:String(Math.round(S.eightD.panDepth*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&O({panDepth:Math.max(0,Math.min(100,p))/100})}}),d.default.createElement(m.LunaTextSetting,{title:"8D pitch rate (Hz)",desc:"Speed of the constant pitch wobble.",defaultValue:String(S.eightD.pitchRate),inputProps:{inputMode:"decimal"},onChange:s=>{let p=z(s.target.value);p!==void 0&&O({pitchRate:Math.max(.02,Math.min(2,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"8D pitch depth (ms)",desc:"Delay modulation depth; higher = wider pitch smear.",defaultValue:String(S.eightD.pitchDepth),inputProps:{inputMode:"decimal"},onChange:s=>{let p=z(s.target.value);p!==void 0&&O({pitchDepth:Math.max(0,Math.min(12,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"8D mix (%)",desc:"Dry/wet amount; higher is more immersive.",defaultValue:String(Math.round(S.eightD.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&O({mix:Math.max(0,Math.min(100,p))/100})}}),d.default.createElement(m.LunaSwitchSetting,{title:"Delay",desc:"Feedback delay.",checked:S.delay.enabled,onChange:s=>_({enabled:s.target.checked})}),d.default.createElement(m.LunaTextSetting,{title:"Delay time (ms)",defaultValue:String(Math.round(S.delay.timeMs)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&_({timeMs:Math.max(20,Math.min(2e3,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"Delay feedback (%)",defaultValue:String(Math.round(S.delay.feedback*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&_({feedback:Math.max(0,Math.min(90,p))/100})}}),d.default.createElement(m.LunaTextSetting,{title:"Delay mix (%)",defaultValue:String(Math.round(S.delay.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&_({mix:Math.max(0,Math.min(100,p))/100})}}),d.default.createElement(m.LunaSwitchSetting,{title:"Reverb",desc:"Generated impulse response.",checked:S.reverb.enabled,onChange:s=>G({enabled:s.target.checked})}),d.default.createElement(m.LunaTextSetting,{title:"Reverb decay (s)",defaultValue:String(S.reverb.decay),inputProps:{inputMode:"decimal"},onChange:s=>{let p=z(s.target.value);p!==void 0&&G({decay:Math.max(.2,Math.min(8,p))})}}),d.default.createElement(m.LunaTextSetting,{title:"Reverb mix (%)",defaultValue:String(Math.round(S.reverb.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&G({mix:Math.max(0,Math.min(100,p))/100})}}))),d.default.createElement(rt,null,d.default.createElement(m.LunaSettings,{title:"Config file",desc:"Versioned JSON, editable outside Luna. Autosaves 300 ms after changes."},d.default.createElement(m.LunaSetting,{title:"Path",desc:c},d.default.createElement("div",{style:Ae},d.default.createElement(m.LunaButton,{size:"small",variant:"text",onClick:()=>{zt(c)}},"Copy path"))),d.default.createElement(m.LunaSetting,{title:"Actions",desc:l===""?void 0:l},d.default.createElement("div",{style:Ae},d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{In()}},"Show folder"),d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{q()}},"Reload"),d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{he()}},"Import\u2026"),d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Y()}},"Export\u2026"))))),d.default.createElement(rt,null,d.default.createElement(m.LunaSettings,{title:"Developer",desc:"Logs and test tools are off unless you need to report a bug."},d.default.createElement(m.LunaSwitchSetting,{title:"Developer mode",desc:"Write diagnostics logs and show the Copy diagnostics action.",checked:Q,onChange:s=>v.setDeveloperMode(s.target.checked)}),Q&&d.default.createElement(m.LunaSetting,{title:"Audio engine self-test",desc:I},d.default.createElement("div",{style:Ae},d.default.createElement(m.LunaButton,{size:"small",variant:"outlined",disabled:E,onClick:async()=>{g(!0);try{let s=await ma();C(s.ok?`OK \xB7 ${s.context} \xB7 rms ${s.rms} \xB7 peak ${s.peak} \xB7 \u0394${s.progressionSeconds}s`:`Failed \xB7 ${s.reason??"unknown"} \xB7 context ${s.context}`)}finally{g(!1)}}},E?"Testing\u2026":"Run test"))),Q&&d.default.createElement(m.LunaButtonSetting,{title:"Diagnostics",desc:"Copy player, pitch-engine, effects, theme and media state plus recent logs.",children:r,onClick:async()=>{i("Copying\u2026");let s=await $e(v.get());i(s?"Copied":"Copy failed")}}))))};var Pt=new Set,{trace:va}=(0,we.Tracer)("[PlaybackKit]"),jr=1e3,Wr=1500,cn="tidaluna.playback-speed.previous-quality",wa=()=>{try{return localStorage.getItem(cn)}catch{return null}},Qr=e=>{try{localStorage.setItem(cn,e)}catch{}},Ta=()=>{try{localStorage.removeItem(cn)}catch{}},Ma=e=>{let t={to:e},n=se.redux.actions["settings/SET_STREAMING_QUALITY"];typeof n=="function"?n(t):se.redux.store.dispatch({type:"settings/SET_STREAMING_QUALITY",payload:t})},Sa=()=>{let t=(0,we.findModuleByProperty)((n,a)=>n==="activePlayer"&&typeof a=="object"&&a!==null)?.activePlayer;if(t===void 0)return{found:!1};try{let n=Object.getPrototypeOf(t),a=n===null?[]:Object.getOwnPropertyNames(n).filter(i=>{try{return typeof t[i]=="function"}catch{return!1}}).slice(0,60),r=i=>{try{return t[i]}catch{return}};return{found:!0,name:r("name"),constructor:t.constructor?.name,state:r("playbackState")??r("state"),currentTime:r("currentTime"),methods:a,hasSetPlaybackRate:a.includes("setPlaybackRate"),hasMediaElement:!!(r("mediaElement")??r("video")??r("element"))}}catch(n){return{found:!0,error:String(n)}}},xa=()=>{let t=(0,we.findModuleByProperty)((n,a)=>n==="activePlayer"&&typeof a=="object"&&a!==null)?.activePlayer?.name;return t==="nativePlayer"?"native":t==="shakaPlayer"?"shaka":t==="browserPlayer"?"browser":"unknown"},ka,Jr=()=>(ka??=(0,we.findModuleByProperty)((e,t)=>e==="activePlayer"&&typeof t=="object"&&t!==null),ka?.activePlayer),La=()=>{if(De()==="native"){let n=Jr()?.currentTime;return typeof n=="number"&&Number.isFinite(n)?n:null}let e=ie(),t=e.find(n=>!n.paused&&n.readyState>0)??e.find(n=>n.readyState>0);return t===void 0?null:t.currentTime},Yr=()=>{try{return se.redux.store.getState().playbackControls?.playbackState==="PLAYING"}catch{return!1}},Xr=e=>{let t=se.redux.actions["playbackControls/TIME_UPDATE"];typeof t=="function"?t(e):se.redux.store.dispatch({type:"playbackControls/TIME_UPDATE",payload:e})},Zr=()=>{try{let e=se.redux.store.getState().playbackControls;if(e===void 0)return null;let t=e.latestCurrentTime??0;return e.playbackState!=="PLAYING"?t:t+Math.abs(Date.now()-(e.latestCurrentTimeSyncTimestamp??Date.now()))/1e3}catch{return null}},Ea={getSpeed:()=>v.get().speed,isPlaying:Yr,getPosition:La,dispatchTimeUpdate:Xr},ei=()=>{try{let e=se.redux.store.getState(),t=e.playQueue?.elements?.[e.playQueue.currentIndex??-1]?.mediaItemId,n=t===void 0?void 0:e.content?.mediaItems?.[String(t)];return{setting:e.settings?.quality?.streaming??null,track:n?.audioQuality??null,actual:e.playbackControls?.playbackContext?.actualAudioQuality??null,streamType:e.playbackControls?.playbackContext?.actualStreamType??null,codec:e.playbackControls?.playbackContext?.codec??null,sampleRate:e.playbackControls?.playbackContext?.sampleRate??null,bitDepth:e.playbackControls?.playbackContext?.bitDepth??null}}catch(e){return{error:String(e)}}},ti=()=>{try{let e=se.redux.store.getState(),t=e.playQueue,n=t?.elements?.[t.currentIndex??-1]?.mediaItemId;if(n===void 0)return null;let a=e.content?.mediaItems?.[String(n)];return a===void 0?{id:n,found:!1}:{id:n,found:!0,title:a.title,bpm:a.bpm??null,key:a.key??a.keyScale??null,metadataKeys:Object.keys(a).filter(r=>/bpm|key|tempo|tone/i.test(r))}}catch(e){return{error:String(e)}}},Ca=!1,ze,un=()=>tt(v.get(),M.get()),Pa=()=>{Ca&&(ze!==void 0&&clearTimeout(ze),ze=setTimeout(()=>{ze=void 0,Oe(un()).catch(e=>h("error","config save failed",{error:String(e)}))},300))},ni=async()=>{try{let e=await ut(),t=e===null?void 0:dt(e),n=await ct();t!==void 0?(v.replace(t.settings),M.replace(t.presets),at(v,M),h("info","config loaded",{path:n,speed:t.settings.speed,presets:t.presets.length})):(await Oe(un()),h("info",e===null?"config created":"config invalid, rewrote defaults",{path:n}))}catch(e){h("warn","config file unavailable; using browser storage only",{error:String(e)})}finally{Ca=!0}},ai=()=>{try{let e=se.redux.actions["router/PUSH"];if(typeof e!="function")throw new Error("router/PUSH is unavailable");e({pathname:"/not-found",search:"LunaSettings",replace:!0}),h("info","opening Luna settings"),setTimeout(()=>{let n=[...document.querySelectorAll('[role="tab"]')].find(a=>(a.textContent??"").trim()==="Plugins");n!==void 0&&n.getAttribute("aria-selected")!=="true"&&n.click(),setTimeout(()=>{[...document.querySelectorAll("h1,h2,h3,h4,h5,h6,span,p,div")].find(i=>(i.textContent??"").trim()==="@kyoto-aircon/playback-kit")?.scrollIntoView({block:"center",behavior:"smooth"})},250)},250)}catch(e){h("error","open Luna settings failed",{error:String(e)})}},ri=()=>{try{let t=se.redux.store.getState().settings?.quality?.streaming;if(t==="HIGH"){h("info","already on the browser player quality");return}h("info","switching streaming quality to HIGH",{from:t}),typeof t=="string"&&Qr(t),Ma("HIGH")}catch(e){h("error","quality switch failed",{error:String(e)})}},ii=()=>{let e=wa();e!==null&&(h("info","restoring streaming quality",{to:e}),Ma(e),Ta())},si=e=>{let t={version:qe,logs:_n,logText:$t,report:()=>Ft(v.get()),copy:()=>$e(v.get()),clear:Hn,setVerbose:On,selectors:pt,playerKind:De,audioEngine:R,native:xt,store:v,controller:e};globalThis.__playbackSpeed=t,Pt.add(()=>{globalThis.__playbackSpeed===t&&delete globalThis.__playbackSpeed})};try{qt(v.get().developerMode),$n(Sa);try{let o=we.LunaPlugin.getByName("@kyoto-aircon/playback-speed");o!==void 0&&h("warn","old Playback Speed plugin is still installed",{enabled:o.store?.enabled})}catch{}zn(()=>({kind:De(),native:xt(),nativeInstance:ia(),speed:v.get().speed,track:ti(),audioEngine:R(),quality:ei(),effects:Xn(),pitchSemitones:v.get().pitchSemitones,pitchEngine:en(),presetId:v.get().presetId,uiTime:Zr(),actualTime:La()})),Xt(),h("info","loading",{version:qe,selectors:pt(),media:ie().length,settings:v.get(),tidal:Sa(),native:xt()});let e=Vn();Pt.add(()=>jn(e));let t=new vt(ie,v);t.start();let n=v.subscribe(o=>{qt(o.developerMode),Pa(),h("info","settings changed",{speed:o.speed,pitchShifts:o.pitchShifts,bounds:o.bounds}),t.apply(),De()==="native"&&Zt(o.speed),an(Ea),kt(o.pitchSemitones,ie()),Jt(o.effects,ie())});M.subscribe(Pa),ni(),Yn(Pt,v,{getPlayerKind:De,subscribePlayerKind:da,useBrowserPlayer:ri,previousQuality:wa,restoreQuality:ii,presets:{list:()=>M.get().filter(o=>v.get().builtinPresets||o.builtin!==!0),apply:o=>{v.applyPreset(o),h("info","preset applied",{id:o.id,name:o.name})},clear:()=>v.clearPreset(),save:(o,l)=>M.save(o,l),saveActive:o=>{let l=ca(v,M,o);h("info","saved preset from live state",{id:l?.id,builtin:o.builtin===!0})}},getPitchEngineState:en,openSettings:ai,onOpen:()=>{let o=v.get().pitchSemitones;o!==0&&kt(o,ie())}}),si(t);let r=setInterval(()=>{t.scan();let o=v.get().pitchSemitones;o!==0&&kt(o,ie());let l=v.get().effects;st(l)&&Jt(l,ie())},jr),i=ua(Ea);nn(xa());let c=setInterval(()=>{Xt();let o=xa(),l=De();nn(o),o!==l&&o==="native"&&(Zt(v.get().speed),Ta())},Wr);Pt.add(()=>{ze!==void 0&&(clearTimeout(ze),Oe(un()).catch(()=>{})),clearInterval(r),clearInterval(c),i(),n(),t.stop(),la(),Zn()}),va.log("loaded")}catch(e){h("error","failed to load",{error:String(e),stack:e?.stack}),va.err("Failed to load:",e)}export{Vr as Settings,Pt as unloads};
//# sourceMappingURL=kyoto-aircon.playback-kit.mjs.map
