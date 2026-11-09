var Va=Object.create;var lr=Object.defineProperty;var ja=Object.getOwnPropertyDescriptor;var Wa=Object.getOwnPropertyNames;var Qa=Object.getPrototypeOf,Ja=Object.prototype.hasOwnProperty;var Ct=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var Ya=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Wa(t))!Ja.call(e,a)&&a!==n&&lr(e,a,{get:()=>t[a],enumerable:!(r=ja(t,a))||r.enumerable});return e};var We=(e,t,n)=>(n=e!=null?Va(Qa(e)):{},Ya(t||!e||!e.__esModule?lr(n,"default",{value:e,enumerable:!0}):n,e));var dr=Ct((_o,rn)=>{rn.exports=luna?.core?.modules?.["@luna/core"];if(rn.exports===void 0)throw new Error("Cannot find module @luna/core in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/core")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var on=Ct((Bo,an)=>{an.exports=luna?.core?.modules?.["@luna/lib"];if(an.exports===void 0)throw new Error("Cannot find module @luna/lib in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/lib")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var jn=Ct((zs,Vn)=>{Vn.exports=luna?.core?.modules?.react;if(Vn.exports===void 0)throw new Error("Cannot find module react in luna.core.modules");luna.core.LunaPlugin.getByName("react")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Sa=Ct((Ks,Wn)=>{Wn.exports=luna?.core?.modules?.["@luna/ui"];if(Wn.exports===void 0)throw new Error("Cannot find module @luna/ui in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/ui")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var qe=We(dr(),1),ue=We(on(),1);var Qe=[62,125,250,500,1e3,2e3,4e3,8e3],ct=Qe.length,Te=-12,re=12,M={eq:{enabled:!1,bands:Array.from({length:ct},()=>0)},bass:{enabled:!1,boost:6,sub:3,drive:.2,mix:.6},eightD:{enabled:!1,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},delay:{enabled:!1,timeMs:250,feedback:.25,mix:.25},reverb:{enabled:!1,decay:2,mix:.25}},I=(e,t,n,r)=>{let a=typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(a)?Math.min(n,Math.max(t,a)):r},ut=(e,t)=>typeof e=="boolean"?e:t,Xa=e=>{let t=Array.from({length:ct},()=>0);if(Array.isArray(e.bands)){for(let i=0;i<ct;i+=1)t[i]=I(e.bands[i],Te,re,0);return t}let n=I(e.low,Te,re,0),r=I(e.mid,Te,re,0),a=I(e.high,Te,re,0);return[n,n,r,r,r,a,a,a]},W=e=>{let t=typeof e=="object"&&e!==null?e:{},n=typeof t.eq=="object"&&t.eq!==null?t.eq:{},r=typeof t.eightD=="object"&&t.eightD!==null?t.eightD:{},a=typeof t.bass=="object"&&t.bass!==null?t.bass:{},i=typeof t.delay=="object"&&t.delay!==null?t.delay:{},d=typeof t.reverb=="object"&&t.reverb!==null?t.reverb:{};return{eq:{enabled:ut(n.enabled,M.eq.enabled),bands:Xa(n)},eightD:{enabled:ut(r.enabled,M.eightD.enabled),rate:I(r.rate,.02,2,M.eightD.rate),panDepth:I(r.panDepth,0,1,M.eightD.panDepth),pitchRate:I(r.pitchRate,.02,2,M.eightD.pitchRate),pitchDepth:I(r.pitchDepth,0,12,M.eightD.pitchDepth),mix:I(r.mix,0,1,M.eightD.mix)},bass:{enabled:ut(a.enabled,M.bass.enabled),boost:I(a.boost,0,24,M.bass.boost),sub:I(a.sub,0,12,M.bass.sub),drive:I(a.drive,0,1,M.bass.drive),mix:I(a.mix,0,1,M.bass.mix)},delay:{enabled:ut(i.enabled,M.delay.enabled),timeMs:I(i.timeMs,20,2e3,M.delay.timeMs),feedback:I(i.feedback,0,.9,M.delay.feedback),mix:I(i.mix,0,1,M.delay.mix)},reverb:{enabled:ut(d.enabled,M.reverb.enabled),decay:I(d.decay,.2,8,M.reverb.decay),mix:I(d.mix,0,1,M.reverb.mix)}}},Je=e=>e.eq.enabled||e.bass.enabled||e.eightD.enabled||e.delay.enabled||e.reverb.enabled,Nt=e=>{let t=[];return e.eq.enabled&&t.push("EQ 8-band"),e.eightD.enabled&&t.push(`8D ${e.eightD.rate.toFixed(2)} Hz`),e.bass.enabled&&t.push(`Bass +${Math.round(e.bass.boost)} dB`),e.delay.enabled&&t.push(`Delay ${Math.round(e.delay.timeMs)} ms`),e.reverb.enabled&&t.push(`Reverb ${e.reverb.decay.toFixed(1)} s`),t.length===0?"No effects enabled":t.join(" \xB7 ")};var he=e=>Number.isFinite(e)?Math.max(-12,Math.min(12,Math.round(e))):0;var pt=e=>{let t=he(e);return`${t>0?"+":""}${t}`};var ft={min:.05,max:10,step:.05},gt=1;var Za=6,Ye=(e,t=Za)=>{let n=10**t;return Math.round(e*n)/n},Dt=(e,t,n)=>Math.min(n,Math.max(t,e)),Le=e=>{let t=Number(e?.min),n=Number.isFinite(t)?Ye(Math.max(.01,t)):ft.min,r=Number(e?.max),a=Number.isFinite(r)?Ye(Math.max(n+.01,r)):Math.max(n+.01,ft.max),i=Number(e?.step),d=Number.isFinite(i)&&i>0?Ye(i):ft.step;return{min:n,max:a,step:d}},ei=(e,t)=>{let{min:n,step:r}=t,a=n+Math.round((e-n)/r)*r;return Ye(a)},Me=(e,t)=>{let n=Le(t),r=Number.isFinite(e)?e:gt,a=ei(r,n);return Dt(Ye(a),n.min,n.max)},ur=(e,t,n)=>{let r=Le(n),a=Me(e,r);return Me(a+t*r.step,r)},ti=e=>{let t=e.includes(".")?e.replace(/0+$/,"").replace(/\.$/,""):e;return t===""||t==="-0"?"0":t},ae=e=>Number.isFinite(e)?ti(e.toFixed(4)):String(gt),Xe=e=>`${ae(e)}\xD7`,mt=(e,t)=>{let{min:n,max:r}=Le(t);if(!(r>n))return 0;let a=Math.log(Dt(e,n,r)/n)/Math.log(r/n);return Dt(Number.isFinite(a)?a:0,0,1)},cr=(e,t)=>{let n=Le(t),r=n.min*Math.pow(n.max/n.min,Dt(e,0,1));return Me(r,n)},pr=e=>{let{min:t,max:n}=Le(e),r=[t,1,2,5,10,n],a=new Set,i=[];for(let o of r.sort((l,u)=>l-u)){if(o<t||o>n)continue;let l=ae(o);a.has(l)||(a.add(l),i.push(Ye(o)))}let d=[];for(let o of i){let l=d[d.length-1];l!==void 0&&mt(o,e)-mt(l,e)<.07||d.push(o)}return d};var ri="tidaluna.playback-kit.v1",ai="tidaluna.playback-speed.v1",ht=()=>({speed:gt,pitchShifts:!1,pitchSemitones:0,presetId:null,developerMode:!1,builtinPresets:!0,nativeEffects:!1,effects:W(void 0),bounds:{...ft}}),fr=e=>{if(e===null)return ht();let t;try{t=JSON.parse(e)}catch{return ht()}if(typeof t!="object"||t===null)return ht();let n=t,r=Le(n.bounds),a=he(typeof n.pitchSemitones=="number"?n.pitchSemitones:0);return{speed:Me(typeof n.speed=="number"?n.speed:gt,r),pitchShifts:a===0&&n.pitchShifts===!0,pitchSemitones:a,presetId:typeof n.presetId=="string"?n.presetId:null,developerMode:n.developerMode===!0,builtinPresets:n.builtinPresets!==!1,nativeEffects:n.nativeEffects===!0,effects:W(n.effects),bounds:r}},ii=(e,t)=>{let n=e.getItem(t);if(n!==null)return fr(n);let r=e.getItem(ai);if(r===null)return ht();let a=fr(r);return a.presetId=null,a},oi=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&e.presetId===t.presetId&&e.developerMode===t.developerMode&&e.builtinPresets===t.builtinPresets&&e.nativeEffects===t.nativeEffects&&JSON.stringify(e.effects)===JSON.stringify(t.effects)&&e.bounds.min===t.bounds.min&&e.bounds.max===t.bounds.max&&e.bounds.step===t.bounds.step,sn=(e,t=ri)=>{let n=ii(e,t),r=new Set,a=()=>({...n,bounds:{...n.bounds}}),i=o=>{if(oi(n,o))return;n=o;try{e.setItem(t,JSON.stringify(n))}catch{}let l=a();for(let u of[...r])try{u(l)}catch(b){console.error("[PlaybackKit] listener failed",b)}},d=o=>({...n,...o});return{get:a,subscribe(o){return r.add(o),()=>r.delete(o)},setSpeed(o){i(d({speed:Me(o,n.bounds)}))},step(o){i(d({speed:ur(n.speed,o,n.bounds)}))},setPitchShifts(o){i(d({pitchShifts:o,pitchSemitones:o?0:n.pitchSemitones}))},setPitchSemitones(o){let l=he(o);i(d({pitchSemitones:l,pitchShifts:l===0?n.pitchShifts:!1}))},setBounds(o){let l=Le({...n.bounds,...o});i({...n,bounds:l,speed:Me(n.speed,l)})},applyPreset(o){let l=he(o.pitchSemitones);i({...n,speed:Me(o.speed,n.bounds),pitchShifts:l===0&&o.pitchShifts===!0,pitchSemitones:l,effects:W(o.effects),presetId:o.id})},setEffects(o){i({...n,effects:W(o)})},setDeveloperMode(o){i({...n,developerMode:o})},setBuiltinPresets(o){i({...n,builtinPresets:o})},setNativeEffects(o){i({...n,nativeEffects:o})},clearPreset(){i({...n,presetId:null})},replace(o){let l=Le(o.bounds),u=he(o.pitchSemitones);i({speed:Me(o.speed,l),pitchShifts:u===0&&o.pitchShifts===!0,pitchSemitones:u,presetId:typeof o.presetId=="string"?o.presetId:null,developerMode:o.developerMode===!0,builtinPresets:o.builtinPresets!==!1,nativeEffects:o.nativeEffects===!0,effects:W(o.effects),bounds:l})},reset(){i({...ht(),developerMode:n.developerMode,builtinPresets:n.builtinPresets,presetId:null,bounds:{...n.bounds}})},destroy(){r.clear()}}},mr=new Map,ln=()=>{try{if(typeof localStorage<"u"){let e="__lunakit_probe__";return localStorage.setItem(e,"1"),localStorage.removeItem(e),localStorage}}catch{}return{getItem:e=>mr.get(e)??null,setItem:(e,t)=>{mr.set(e,t)}}},v=sn(ln());var si="tidaluna.playback-kit.presets.v1",cn="nightcore",be=e=>W({...M,...e,eq:{...M.eq,...e.eq??{}},bass:{...M.bass,...e.bass??{}},eightD:{...M.eightD,...e.eightD??{}},delay:{...M.delay,...e.delay??{}},reverb:{...M.reverb,...e.reverb??{}}}),li={id:cn,name:"Nightcore",speed:1.35,pitchShifts:!0,pitchSemitones:0,effects:be({}),builtin:!0},di={id:"slowcore",name:"Slowcore",speed:.8,pitchShifts:!0,pitchSemitones:0,effects:be({reverb:{enabled:!0,decay:4,mix:.35}}),builtin:!0},ui={id:"big-bass",name:"Big Bass",speed:1,pitchShifts:!1,pitchSemitones:0,effects:be({eq:{enabled:!0,bands:[3,2,0,0,0,0,0,1]},bass:{enabled:!0,boost:14,sub:6,drive:.5,mix:1}}),builtin:!0},ci={id:"eight-d",name:"8D Orbit",speed:1,pitchShifts:!1,pitchSemitones:0,effects:be({eightD:{enabled:!0,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},pi={id:"dub-echo",name:"Dub Echo",speed:1,pitchShifts:!1,pitchSemitones:0,effects:be({delay:{enabled:!0,timeMs:450,feedback:.45,mix:.28}}),builtin:!0},fi={id:"daycore",name:"Daycore",speed:.85,pitchShifts:!0,pitchSemitones:0,effects:be({reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},mi={id:"chipmunk",name:"Chipmunk",speed:1.6,pitchShifts:!0,pitchSemitones:0,effects:be({}),builtin:!0},gi={id:"vaporwave",name:"Vaporwave",speed:.7,pitchShifts:!0,pitchSemitones:0,effects:be({reverb:{enabled:!0,decay:5,mix:.35},delay:{enabled:!0,timeMs:300,feedback:.3,mix:.2}}),builtin:!0},hi={id:"submerge",name:"Submerge",speed:.95,pitchShifts:!1,pitchSemitones:0,effects:be({bass:{enabled:!0,boost:10,sub:5,drive:.3,mix:.6},eightD:{enabled:!0,rate:.1,panDepth:.75,pitchRate:.25,pitchDepth:2,mix:.85}}),builtin:!0},bi={id:"clear-voice",name:"Clear Voice",speed:1.15,pitchShifts:!1,pitchSemitones:0,effects:be({eq:{enabled:!0,bands:[-4,-2,1,2,2,1,0,0]}}),builtin:!0},gr=[li,fi,di,mi,gi,ui,hi,ci,pi,bi],bt=new Set(gr.map(e=>e.id)),yi=24,vi=.05,Si=16,dn=e=>{if(typeof e!="string")return;let t=e.trim().slice(0,yi);return t===""?void 0:t},un=e=>{let t=Number(e);return Number.isFinite(t)?Math.max(vi,Math.min(Si,t)):1},hr=(e,t)=>{if(typeof e!="object"||e===null)return;let n=e,r=typeof n.id=="string"?n.id:void 0,a=dn(n.name);if(!(r===void 0||a===void 0||bt.has(r)||t.has(r)))return t.add(r),{id:r,name:a,speed:un(n.speed),pitchShifts:n.pitchShifts===!0,pitchSemitones:he(typeof n.pitchSemitones=="number"?n.pitchSemitones:0),effects:W(n.effects)}},xi=e=>{if(e===null)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(!Array.isArray(t))return[];let n=new Set,r=[];for(let a of t){let i=hr(a,n);i!==void 0&&r.push(i)}return r},ki=(e,t)=>{if(e.eq.enabled!==t.eq.enabled||e.eq.bands.length!==t.eq.bands.length)return!1;for(let i=0;i<e.eq.bands.length;i+=1)if(e.eq.bands[i]!==t.eq.bands[i])return!1;let n=["enabled","boost","sub","drive","mix"];for(let i of n)if(e.bass[i]!==t.bass[i])return!1;let r=["enabled","rate","panDepth","pitchRate","pitchDepth"];for(let i of r)if(e.eightD[i]!==t.eightD[i])return!1;let a=["enabled","timeMs","feedback","mix"];for(let i of a)if(e.delay[i]!==t.delay[i])return!1;return e.reverb.enabled===t.reverb.enabled&&e.reverb.decay===t.reverb.decay&&e.reverb.mix===t.reverb.mix},yt=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&ki(e.effects,t.effects),pn=(e,t=si)=>{let n=xi(e.getItem(t)),r=new Set,a=0,i=()=>{try{e.setItem(t,JSON.stringify(n))}catch{}},d=()=>{for(let l of[...r])try{l()}catch{}},o=()=>[...gr.map(l=>({...l})),...n.map(l=>({...l}))];return{get:o,getById(l){return o().find(u=>u.id===l)},save(l,u){let b=dn(l);if(b===void 0)return;a+=1;let S={id:`custom-${Date.now().toString(36)}-${a}`,name:b,speed:un(u.speed),pitchShifts:u.pitchShifts===!0,pitchSemitones:he(u.pitchSemitones),effects:W(u.effects)};return n.push(S),i(),d(),{...S}},remove(l){if(bt.has(l))return!1;let u=n.filter(b=>b.id!==l);return u.length===n.length?!1:(n=u,i(),d(),!0)},rename(l,u){if(bt.has(l))return!1;let b=dn(u),S=n.find(w=>w.id===l);return b===void 0||S===void 0?!1:(S.name=b,i(),d(),!0)},update(l,u){if(bt.has(l))return!1;let b=n.find(S=>S.id===l);return b===void 0?!1:(b.speed=un(u.speed),b.pitchShifts=u.pitchShifts===!0,b.pitchSemitones=he(u.pitchSemitones),b.effects=W(u.effects),i(),d(),!0)},move(l,u){if(bt.has(l))return!1;let b=n.findIndex(h=>h.id===l),S=b+Math.sign(u);if(b<0||S<0||S>=n.length)return!1;let[w]=n.splice(b,1);return n.splice(S,0,w),i(),d(),!0},replace(l){let u=new Set;n=l.filter(b=>b.builtin!==!0).map(b=>hr(b,u)).filter(b=>b!==void 0),i(),d()},subscribe(l){return r.add(l),()=>r.delete(l)}}},L=pn(ln());var fn=1,br=e=>({getItem:()=>e,setItem:()=>{}}),At=e=>{if(e==null)return;let t;try{t=JSON.parse(e)}catch{return}if(typeof t!="object"||t===null)return;let n=t;if(n.version!==fn)return;let r=sn(br(JSON.stringify(n.settings??{}))).get(),a=pn(br(JSON.stringify(n.presets??[]))).get().filter(d=>d.builtin!==!0),i=new Set([cn,...a.map(d=>d.id)]);return r.presetId!==null&&!i.has(r.presetId)&&(r.presetId=null),{version:fn,settings:r,presets:a}},vt=(e,t)=>`${JSON.stringify({version:fn,settings:e,presets:t.filter(n=>n.builtin!==!0)},null,2)}
`;var Fe=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/config.native.ts",'"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var P=(e,n)=>{for(var t in n)p(e,t,{get:n[t],enumerable:!0})},w=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of m(n))!h.call(e,s)&&s!==t&&p(e,s,{get:()=>n[s],enumerable:!(o=d(n,s))||o.enumerable});return e};var y=e=>w(p({},"__esModule",{value:!0}),e);var A={};P(A,{exportConfig:()=>F,getConfigPath:()=>k,importConfig:()=>S,readConfig:()=>v,revealConfig:()=>D,writeConfig:()=>x});module.exports=y(A);var l=require,i=l("path"),r=()=>l("fs/promises"),b=()=>l("fs"),u=()=>l("electron"),g=()=>process.env.HOME??process.env.USERPROFILE??"",f=()=>process.platform==="win32"?process.env.APPDATA??i.join(g(),"AppData","Roaming"):process.platform==="darwin"?i.join(g(),"Library","Application Support"):i.join(g(),".config"),j=()=>{let e=f(),n=b(),t=[],o=process.resourcesPath;o!==void 0&&(t.push(i.basename(i.dirname(i.dirname(o)))),t.push(i.basename(i.dirname(o)))),t.push("TIDAL","Tidal","tidal","tidal-hifi");for(let s of t)if(!(s===""||s==="Contents"||s==="resources")&&n.existsSync(i.join(e,s)))return s;return"TIDAL"},c=()=>i.join(f(),j(),"playback-kit"),a=()=>i.join(c(),"config.json"),k=async()=>a(),v=async()=>{try{return await r().readFile(a(),"utf8")}catch{return null}},x=async e=>{await r().mkdir(c(),{recursive:!0});let n=`${a()}.tmp`;return await r().writeFile(n,e,"utf8"),await r().rename(n,a()),a()},F=async e=>{let t=await u().dialog.showSaveDialog({title:"Export Playback Kit config",defaultPath:i.join(f(),"playback-kit.json"),filters:[{name:"JSON",extensions:["json"]}]});return t.canceled||t.filePath===void 0?null:(await r().writeFile(t.filePath,e,"utf8"),t.filePath)},S=async()=>{let n=await u().dialog.showOpenDialog({title:"Import Playback Kit config",properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]}),t=n.filePaths[0];return n.canceled||t===void 0?null:{path:t,json:await r().readFile(t,"utf8")}},D=async()=>{await r().mkdir(c(),{recursive:!0}),await u().shell.openPath(c())};0&&(module.exports={exportConfig,getConfigPath,importConfig,readConfig,revealConfig,writeConfig});\n');if(Fe===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/config.native.ts");var yr=(...e)=>__ipcRenderer.invoke(Fe,"exportConfig",...e),It=(...e)=>__ipcRenderer.invoke(Fe,"getConfigPath",...e),vr=(...e)=>__ipcRenderer.invoke(Fe,"importConfig",...e),Rt=(...e)=>__ipcRenderer.invoke(Fe,"readConfig",...e),Sr=(...e)=>__ipcRenderer.invoke(Fe,"revealConfig",...e),Ze=(...e)=>__ipcRenderer.invoke(Fe,"writeConfig",...e);var et="2.17.0";var Ie=[],xr=!0,kr=!1,wr=e=>{if(e!==void 0)try{return JSON.parse(JSON.stringify(e))}catch{try{return String(e)}catch{return"[unserialisable]"}}},gn=e=>{kr=e,e||(Ie.length=0)};var m=(e,t,n)=>{if(!kr)return;let r={at:Date.now(),level:e,message:t,data:wr(n)};if(Ie.push(r),Ie.length>500&&Ie.shift(),!(e==="debug"&&!xr))try{let a=e==="error"?console.error:e==="warn"?console.warn:console.debug;n===void 0?a(`[PlaybackKit] ${t}`):a(`[PlaybackKit] ${t}`,n)}catch{}},Pr=()=>Ie.map(e=>({...e})),hn=()=>Ie.map(e=>`${new Date(e.at).toISOString()} ${e.level.toUpperCase().padEnd(5)} ${e.message}${e.data===void 0?"":` ${JSON.stringify(e.data)}`}`).join(`
`),Er=()=>{Ie.length=0},Tr=e=>{xr=e};var wi=e=>({tag:e.tagName.toLowerCase(),id:e.id,class:typeof e.className=="string"?e.className:"",src:(e.currentSrc||e.src||"").slice(0,140),paused:e.paused,readyState:e.readyState,networkState:e.networkState,currentTime:Number(e.currentTime.toFixed(3)),duration:Number.isFinite(e.duration)?Number(e.duration.toFixed(3)):e.duration,playbackRate:e.playbackRate,defaultPlaybackRate:e.defaultPlaybackRate,preservesPitch:e.preservesPitch,muted:e.muted,volume:e.volume,connected:e.isConnected,parent:e.parentElement===null?null:e.parentElement.id||e.parentElement.className}),Pi=()=>typeof document>"u"?[]:[...document.querySelectorAll("video,audio")].map(wi),_t=()=>{if(typeof document>"u")return{};let e=document.getElementById("tidal-player-root");return{playerRoot:e!==null,rootChildCount:e?.children.length??0,rootChildren:e===null?[]:[...e.children].map(t=>`${t.tagName.toLowerCase()}#${t.id||"-"}`),scopedMedia:document.querySelectorAll("#tidal-player-root video, #tidal-player-root audio").length,videoOne:document.getElementById("video-one")!==null,videoTwo:document.getElementById("video-two")!==null,allMedia:document.querySelectorAll("video,audio").length,footer:document.querySelector('[data-test="footer-player"]')!==null}},Ei=e=>new Promise(t=>setTimeout(t,e)),Ti=async(e=1500)=>{if(typeof document>"u")return[];let t=[...document.querySelectorAll("video,audio")],n=t.map(r=>({id:r.id,tag:r.tagName.toLowerCase(),time:r.currentTime,paused:r.paused}));return await Ei(e),t.map((r,a)=>{let i=n[a],d=r.currentTime-i.time,o=e/1e3;return{id:i.id,tag:i.tag,paused:r.paused,deltaSeconds:Number(d.toFixed(3)),observedRate:Number((d/o).toFixed(3)),expectedRate:r.playbackRate}})},Mr,Lr=e=>{Mr=e},Cr,Nr=e=>{Cr=e},mn,Dr=e=>{mn=e},Mi=4e3,Li=async()=>{if(mn===void 0)return{registered:!1};try{return await Promise.race([mn(),new Promise((e,t)=>setTimeout(()=>t(new Error("native probe timed out")),Mi))])}catch(e){return{error:String(e)}}},Ci=()=>{try{return Cr?.()??{}}catch(e){return{error:String(e)}}},Ni=()=>{try{return Mr?.()??{registered:!1}}catch(e){return{error:String(e)}}},Di=["--wave-color-solid-accent-fill","--wave-color-solid-accent-bright","--wave-color-solid-base-fill","--wave-color-solid-base-brighter","--wave-color-solid-base-brightest","--wave-color-solid-contrast-fill","--wave-color-solid-contrast-dark","--wave-color-opacity-contrast-fill-ultra-thin","--wave-color-opacity-contrast-fill-thin","--wave-color-opacity-contrast-fill-thick","--wave-color-solid-warning-fill","--wave-color-text-danger","--market-core-text-10-color","--market-core-text-20-color","--market-core-fill-white-color","--baseFontSize","--baseLineHeight","--remRatio"],Ai=()=>{if(typeof document>"u")return{};let e=document.getElementById("wimp")??document.querySelector('[data-test="footer-player"]')??document.documentElement,t=getComputedStyle(e),n={};for(let a of Di){let i=t.getPropertyValue(a).trim();i!==""&&(n[a]=i)}let r=a=>{let i=document.querySelector(a);if(i===null)return null;let d=getComputedStyle(i);return{color:d.color,background:d.backgroundColor,fontFamily:d.fontFamily,fontSize:d.fontSize,lineHeight:d.lineHeight,borderRadius:d.borderRadius,height:d.height}};return{root:e.id!==""?`#${e.id}`:e.tagName.toLowerCase(),fontSize:t.fontSize,fontFamily:t.fontFamily,tokens:n,elements:{footer:r('[data-test="footer-player"]'),utilityButtons:r('[data-test="footer-player"] [class*="utilityButtons"]'),volume:r('[data-test="footer-player"] [class*="sliderContainer"]'),qualityBadge:r("[data-test-quality-badge-streaming-quality]"),progressBar:r('[data-test="progress-bar"]')}}},bn=async e=>{m("info","building diagnostics report");let t=await Ti(),n=await Li();return[`Playback Kit v${et}`,`at: ${new Date().toISOString()}`,`url: ${typeof location>"u"?"?":location.href}`,`ua: ${typeof navigator>"u"?"?":navigator.userAgent}`,`visibility: ${typeof document>"u"?"?":document.visibilityState}`,`settings: ${JSON.stringify(wr(e))}`,`selectors: ${JSON.stringify(_t())}`,`player: ${JSON.stringify(Ci())}`,`nativeProbe: ${JSON.stringify(n)}`,`tidal: ${JSON.stringify(Ni())}`,`progression: ${JSON.stringify(t)}`,`media: ${JSON.stringify(Pi())}`,`theme: ${JSON.stringify(Ai())}`,"",`--- logs (${Ie.length}) ---`,hn()].join(`
`)},tt=async e=>yn(await bn(e)),yn=async e=>{try{if(typeof navigator<"u"&&navigator.clipboard?.writeText!==void 0)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}catch{return!1}};var Ii=400,Ar=100,Ri=5e-4,_i="__playbackKitAudioState",vn=globalThis[_i]??={sources:new Map},ie=vn.context,ze,$e,nt,oe=[],St=vn.sources,Bt=new Map,Bi="__playbackKitWorklets",Ir=globalThis[Bi]??=new Set,Rr=e=>new Promise(t=>setTimeout(t,e)),Q=async()=>{if(ie===void 0){let e=window.AudioContext??window.webkitAudioContext;if(e===void 0)throw new Error("Web Audio is unavailable");ie=new e({latencyHint:"playback"}),vn.context=ie,m("info","audio context created",{sampleRate:ie.sampleRate,state:ie.state})}if(ie.state==="suspended")try{await Promise.race([ie.resume(),Rr(250)])}catch{}return ie},Sn=()=>{if(ze===void 0||$e===void 0)return;ze.disconnect();for(let t of oe)try{t.output.disconnect()}catch{}let e=ze;for(let t of oe)e.connect(t.input),e=t.output;e.connect($e)},xt=async()=>{let e=await Q();if(ze===void 0||$e===void 0){ze=e.createGain(),$e=e.createGain(),nt=e.createAnalyser(),nt.fftSize=2048,$e.connect(nt),$e.connect(e.destination);for(let t of St.values()){try{t.disconnect()}catch{}t.connect(ze)}}return Sn(),{ctx:e,input:ze,output:$e}},xn=async(e,t)=>{if(Bt.has(t))return Bt.get(t);if(Ir.has(t))return;let n=await Q(),r=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),a=(async()=>{let i;try{await Promise.race([n.audioWorklet.addModule(r),new Promise((d,o)=>{i=setTimeout(()=>o(new Error(`Timed out loading worklet ${t}`)),Ii*10)})])}finally{i!==void 0&&clearTimeout(i),URL.revokeObjectURL(r)}})();Bt.set(t,a);try{await a,Ir.add(t)}catch(i){throw Bt.delete(t),i}},Ke=async e=>{let{ctx:t,input:n}=await xt();if(St.has(e))return;if(e.mediaKeys!==null&&e.mediaKeys!==void 0)throw new Error("protected media (DRM) cannot be routed through Web Audio");let r=t.createMediaElementSource(e);r.connect(n),St.set(e,r),m("info","audio engine attached element",{id:e.id,sources:St.size})},Ht=new Set,kn=async e=>{let{input:t}=await xt();Ht.has(e)||(e.connect(t),Ht.add(e),m("info","audio engine connected external source",{inputs:Ht.size}))},Ot=e=>{Ht.delete(e);try{e.disconnect()}catch{}},wn=async(e,t)=>{await qt(e,e,t)},qt=async(e,t,n)=>{if(await xt(),oe.some(a=>a.input===e))return;let r=n===void 0?oe.length:Math.max(0,Math.min(oe.length,n));oe.splice(r,0,{input:e,output:t}),Sn(),m("debug","audio engine inserted group",{index:r,nodes:oe.length})},Hi=async e=>{await xt();let t=oe.findIndex(r=>r.input===e||r.output===e);if(t<0)return!1;let[n]=oe.splice(t,1);try{n.output.disconnect()}catch{}return Sn(),!0},Oi=()=>oe.map(e=>e.input),H=()=>({context:ie===void 0?"none":ie.state,sampleRate:ie?.sampleRate,sources:St.size,nodes:oe.length}),Pn=async(e=1200)=>{let{ctx:t}=await xt();if(nt===void 0)throw new Error("analyser unavailable");let n=Math.max(1,Math.round(e/Ar)),r=new Float32Array(nt.fftSize),a=0,i=0,d=0;for(let l=0;l<n;l+=1){if(await Rr(Ar),t.state!=="running")continue;nt.getFloatTimeDomainData(r);let u=0,b=0;for(let S of r){let w=Math.abs(S);w>u&&(u=w),b+=S*S}a=Math.max(a,u),i+=b/r.length,d+=1}let o=d===0?0:Math.sqrt(i/d);return{rms:o,peak:a,samples:d,silent:o<Ri,durationMs:e}},qi=()=>({version:1,ensureContext:Q,loadWorklet:xn,attach:Ke,connectSource:kn,disconnectSource:Ot,insert:wn,insertGroup:qt,remove:Hi,list:Oi,status:H,measureRms:Pn}),_r=()=>{let e=qi();return globalThis.__playbackKitAudio=e,e},Br=e=>{globalThis.__playbackKitAudio===e&&delete globalThis.__playbackKitAudio};var qr=We(on(),1);var Hr=`
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
.lunaspeed-warning-effects,
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
.lunaspeed-warning-effects:hover,
.lunaspeed-quality-action:hover {
	filter: brightness(1.2);
}
.lunaspeed-warning-action:disabled,
.lunaspeed-warning-effects:disabled,
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
`;var En=1e4,Or=12,Ft=8,zi=1e3,Ki='<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>',Tn=(e,t,n)=>Math.min(n,Math.max(t,e)),Gi=()=>document.querySelector('[data-test="footer-player"] [class*="utilityButtons"]'),Ui=e=>{switch(e){case"HI_RES_LOSSLESS":return"Max";case"HI_RES":return"Hi-Res";case"LOSSLESS":return"Lossless";case"HIGH":return"High";case"LOW":return"Low";default:return e}},Fr=(e,t,n={})=>{new qr.StyleTag("lunaspeed-styles",e,Hr);let r=document.createElement("div");r.className="lunaspeed-ctl",r.dataset.lunaspeed="control";let a=document.createElement("button");a.type="button",a.className="lunaspeed-step",a.textContent="\u2212",a.setAttribute("aria-label","Slower");let i=document.createElement("button");i.type="button",i.className="lunaspeed-pill",i.setAttribute("aria-label","Playback speed"),i.setAttribute("aria-haspopup","dialog"),i.innerHTML=`${Ki}<span class="lunaspeed-pill-label"></span>`;let d=i.querySelector(".lunaspeed-pill-label"),o=document.createElement("button");o.type="button",o.className="lunaspeed-step",o.textContent="+",o.setAttribute("aria-label","Faster"),r.append(a,i,o);let l=document.createElement("div");l.className="lunaspeed-popover",l.setAttribute("role","dialog"),l.setAttribute("aria-label","Playback settings"),l.hidden=!0,l.innerHTML=`
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
			<input class="lunaspeed-range" type="range" min="0" max="${En}" step="1" aria-label="Playback speed slider" />
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
			<span class="lunaspeed-warning-text">TIDAL ignores effects, speed and pitch here. Enable effects or use the browser player.</span>
			<button class="lunaspeed-warning-effects" type="button">Enable effects</button>
			<button class="lunaspeed-warning-action" type="button">Use browser player</button>
		</div>
		<div class="lunaspeed-quality" hidden>
			<span class="lunaspeed-quality-text">TIDAL is on High quality so speed can work.</span>
			<button class="lunaspeed-quality-action" type="button">Restore lossless</button>
		</div>
		<div class="lunaspeed-foot">
			<span class="lunaspeed-version">v${et}</span>
			<span class="lunaspeed-foot-actions">
				<button class="lunaspeed-settings" type="button">Luna settings</button>
				<button class="lunaspeed-copy" type="button">Copy diagnostics</button>
			</span>
		</div>`;let u=l.querySelector(".lunaspeed-value"),b=l.querySelector(".lunaspeed-presets"),S=l.querySelector(".lunaspeed-save-toggle"),w=l.querySelector(".lunaspeed-save"),h=l.querySelector(".lunaspeed-save-input"),_=l.querySelector(".lunaspeed-save-cancel"),N=l.querySelector(".lunaspeed-slider"),C=l.querySelector(".lunaspeed-range"),Ne=l.querySelector(".lunaspeed-ticks"),ee=l.querySelector(".lunaspeed-pitch-value"),x=[...l.querySelectorAll(".lunaspeed-pitch-step")],ce=l.querySelector(".lunaspeed-switch"),De=l.querySelector(".lunaspeed-reset"),B=l.querySelector(".lunaspeed-copy"),xe=l.querySelector(".lunaspeed-settings"),U=l.querySelector(".lunaspeed-pitch-dot"),V=l.querySelector(".lunaspeed-warning"),j=l.querySelector(".lunaspeed-warning-text"),D=l.querySelector(".lunaspeed-warning-effects"),O=l.querySelector(".lunaspeed-warning-action"),pe=l.querySelector(".lunaspeed-quality"),fe=l.querySelector(".lunaspeed-quality-action"),Ae="",ke="",q=!1,me=!1,s,p,we=f=>{N.style.setProperty("--lunaspeed-pos",String(Tn(f,0,1)))},Pe=(f,y)=>{let k=mt(f,y);C.value=String(Math.round(k*En)),we(k)},Fa=()=>{let{bounds:f}=t.get(),y=`${f.min}:${f.max}`;y!==Ae&&(Ae=y,Ne.replaceChildren(...pr(f).map(k=>{let P=document.createElement("span");return P.className="lunaspeed-tick",P.style.left=`${(mt(k,f)*100).toFixed(3)}%`,P.textContent=Xe(k),P})))},$a=f=>f===null?"Custom":n.presets?.list().find(y=>y.id===f)?.name??"Custom",tr=()=>{let f=n.presets;if(f===void 0){b.hidden=!0,w.hidden=!0;return}let y=f.list(),k=t.get(),P=k.presetId,F=y.find(A=>A.id===P),te=F!==void 0&&!yt(F,k),ge=`${y.map(A=>`${A.id}:${A.name}`).join("|")}::${P??""}::${te}`;if(ge===ke)return;ke=ge;let ne=[],$=document.createElement("button");$.type="button",$.className="lunaspeed-preset",$.textContent="Custom",$.dataset.active=String(P===null),$.setAttribute("aria-pressed",String(P===null)),$.addEventListener("click",()=>f.clear()),ne.push($);for(let A of y){let Ee=document.createElement("button");Ee.type="button",Ee.className="lunaspeed-preset";let nn=P===A.id;Ee.textContent=nn&&te?`${A.name} *`:A.name,Ee.dataset.active=String(nn),Ee.setAttribute("aria-pressed",String(nn)),Ee.dataset.builtin=String(A.builtin===!0),Ee.title=`${A.name} \u2014 ${Xe(A.speed)} \xB7 ${A.pitchShifts?"pitch follows speed":A.pitchSemitones!==0?`pitch ${pt(A.pitchSemitones)} st`:"pitch preserved"} \xB7 ${Nt(A.effects)}`,Ee.addEventListener("click",()=>f.apply(A)),ne.push(Ee)}b.replaceChildren(...ne)},za=(f,y)=>{ee.textContent=`${pt(f)} st`;for(let k of x){let P=Number(k.dataset.delta);k.disabled=P<0?f<=-12:f>=12,k.title=P<0?"Lower pitch by 1 semitone":"Raise pitch by 1 semitone"}ce.setAttribute("aria-checked",String(y))},nr=f=>{let y=n.getPitchEngineState?.(),k=f===0?"idle":y?.status??"idle";U.dataset.status=k;let P=k==="running"?"Pitch engine active":k==="waiting"?"Pitch engine waiting for the audio element":k==="unavailable"?"Pitch engine unavailable"+(y?.reason===void 0?"":": "+y.reason):k==="ready"?"Pitch engine ready":"Pitch engine idle";U.title=f===0?"":P,U.setAttribute("aria-label",f===0?"":P)},Lt=f=>{V.hidden=f!=="native";let y=t.get().nativeEffects;j.textContent=y?"Speed, pitch and effects run through Playback Kit. TIDAL's native renderer is paused at other speeds.":"TIDAL ignores effects, speed and pitch here. Enable them in Playback Kit or use the browser player.",D.hidden=y,D.disabled=!1,D.textContent="Enable in Playback Kit";let k=n.previousQuality?.()??null,P=f!=="native"&&k!==null;pe.hidden=!P,P&&k!==null&&(fe.textContent=`Restore ${Ui(k)}`)},en=()=>{let f=t.get(),{speed:y,pitchShifts:k,pitchSemitones:P,bounds:F,presetId:te}=f,ge=Xe(y);d.textContent=ge,i.dataset.active=String(y!==1||k||P!==0);let ne=n.presets?.list().find(A=>A.id===te),$=ne!==void 0&&!yt(ne,f);i.title=`Playback ${ge}${te===null?"":` \xB7 ${$a(te)}${$?" *":""}`}`,a.setAttribute("aria-label",`Slower by ${Xe(F.step)}`),o.setAttribute("aria-label",`Faster by ${Xe(F.step)}`),a.title=`\u2212${ae(F.step)}\xD7`,o.title=`+${ae(F.step)}\xD7`,u.textContent=ae(y),me||Pe(y,F),C.setAttribute("aria-valuetext",ge),Fa(),tr(),za(P,k),nr(P),B.hidden=!f.developerMode,Lt(n.getPlayerKind?.()??"unknown"),q&&tn()},tn=()=>{let f=i.getBoundingClientRect(),y=l.offsetWidth||348,k=l.offsetHeight||240,P=Tn(f.left+f.width/2-y/2,Ft,window.innerWidth-y-Ft),F=f.top-k-Or,te="top";F<Ft&&(F=Math.min(f.bottom+Or,window.innerHeight-k-Ft),te="bottom"),l.style.left=`${Math.round(P)}px`,l.style.top=`${Math.round(F)}px`,l.dataset.side=te;let ge=Tn(f.left+f.width/2-P,18,y-18);l.style.setProperty("--lunaspeed-caret",`${Math.round(ge)}px`)},rr=f=>{let y=f.target;y!==null&&(l.contains(y)||r.contains(y)||je())},ar=f=>{f.key==="Escape"&&(f.preventDefault(),je(),i.focus())},ir=()=>{q&&tn()},Ka=()=>{q||(q=!0,l.hidden=!1,i.dataset.open="true",en(),Lt(n.getPlayerKind?.()??"unknown"),tn(),n.onOpen?.(),document.addEventListener("pointerdown",rr,!0),document.addEventListener("keydown",ar,!0),window.addEventListener("resize",ir),s=setInterval(()=>nr(t.get().pitchSemitones),500),m("debug","popover open"))},je=()=>{q&&(q=!1,l.hidden=!0,delete i.dataset.open,w.hidden=!0,s!==void 0&&(clearInterval(s),s=void 0),document.removeEventListener("pointerdown",rr,!0),document.removeEventListener("keydown",ar,!0),window.removeEventListener("resize",ir))},Ga=()=>q?je():Ka(),or=()=>{if(!r.isConnected){q&&je();let y=Gi();if(y===null)return;let k=y.querySelector('[class*="sliderContainer"]');k!==null&&k.parentElement===y?y.insertBefore(r,k):y.appendChild(r)}let f=document.getElementById("wimp")??document.body;l.parentElement!==f&&f.appendChild(l)};S.addEventListener("click",()=>{if(w.hidden=!w.hidden,w.hidden)return;let f=n.presets?.list().find(y=>y.id===t.get().presetId);h.value=f===void 0?"":f.builtin===!0?`${f.name} (edited)`:f.name,h.focus(),h.select()}),a.addEventListener("click",()=>t.step(-1)),o.addEventListener("click",()=>t.step(1)),i.addEventListener("click",Ga),C.addEventListener("pointerdown",()=>{me=!0,p!==void 0&&clearTimeout(p),delete N.dataset.settling});let st=()=>{if(!me)return;me=!1;let{speed:f,bounds:y}=t.get();N.dataset.settling="true",Pe(f,y),p!==void 0&&clearTimeout(p),p=setTimeout(()=>{p=void 0,delete N.dataset.settling},160)};C.addEventListener("change",st),window.addEventListener("pointerup",st),window.addEventListener("pointercancel",st),C.addEventListener("input",()=>{if(C.disabled)return;let f=Number(C.value)/En,y=t.get().bounds;we(f),t.setSpeed(cr(f,y))}),l.addEventListener("keydown",f=>{f.key==="ArrowLeft"||f.key==="ArrowDown"?(f.preventDefault(),t.step(-1)):(f.key==="ArrowRight"||f.key==="ArrowUp")&&(f.preventDefault(),t.step(1))});for(let f of x)f.addEventListener("click",()=>{let y=Number(f.dataset.delta);t.setPitchSemitones(t.get().pitchSemitones+y)});ce.addEventListener("click",()=>t.setPitchShifts(!t.get().pitchShifts)),De.addEventListener("click",()=>t.reset()),w.addEventListener("submit",f=>{f.preventDefault();let y=n.presets;if(y===void 0)return;let k=h.value.trim();if(k==="")return;let{speed:P,pitchShifts:F,pitchSemitones:te,effects:ge}=t.get(),ne=y.list().find($=>$.id===t.get().presetId);if(ne!==void 0&&ne.builtin!==!0&&k===ne.name)y.saveActive(ne);else{let $=y.save(k,{speed:P,pitchShifts:F,pitchSemitones:te,effects:ge});if($===void 0)return;y.apply($)}h.value="",w.hidden=!0,ke="",tr(),m("info","preset saved",{name:k})}),_.addEventListener("click",()=>{w.hidden=!0,h.value=""}),xe.hidden=n.openSettings===void 0,xe.addEventListener("click",()=>{n.openSettings?.(),je()});let lt;B.addEventListener("click",async()=>{lt!==void 0&&clearTimeout(lt),B.disabled=!0,B.textContent="Copying\u2026";let f=await tt(t.get());m(f?"info":"error","diagnostics copied",{copied:f}),B.textContent=f?"Copied":"Copy failed",lt=setTimeout(()=>{B.textContent="Copy diagnostics",B.disabled=!1},1800)});let dt;D.addEventListener("click",()=>{n.enableNativeEffects?.(),D.disabled=!0,D.textContent="Enabled",m("info","enabled native effects from warning")}),O.addEventListener("click",()=>{n.useBrowserPlayer!==void 0&&(dt!==void 0&&clearTimeout(dt),O.disabled=!0,O.textContent="Switching\u2026",n.useBrowserPlayer(),m("info","requested browser player from warning"),dt=setTimeout(()=>{O.disabled=!1,O.textContent="Use browser player"},2500))}),fe.addEventListener("click",()=>{n.restoreQuality!==void 0&&(n.restoreQuality(),pe.hidden=!0,m("info","restored original streaming quality"))}),Lt(n.getPlayerKind?.()??"unknown");let sr=n.subscribePlayerKind?.(Lt);sr!==void 0&&e.add(sr),or(),en(),e.add(t.subscribe(en));let Ua=setInterval(or,zi);e.add(()=>{clearInterval(Ua),window.removeEventListener("pointerup",st),window.removeEventListener("pointercancel",st),lt!==void 0&&clearTimeout(lt),dt!==void 0&&clearTimeout(dt),p!==void 0&&clearTimeout(p),je(),l.remove(),r.remove()})};var T,Re={built:!1,active:[],attached:0},$r=()=>({...Re}),Vi=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),ji=(e,t)=>{let n=Math.max(1,Math.floor(e.sampleRate*t)),r=e.createBuffer(2,n,e.sampleRate);for(let a=0;a<2;a+=1){let i=r.getChannelData(a);for(let d=0;d<n;d+=1){let o=Math.pow(1-d/n,2.2);i[d]=(Math.random()*2-1)*o}}return r},Wi=async()=>{let e=await Q();if(T!==void 0)return T;let t=e.createGain(),n=Qe.map((p,we)=>{let Pe=e.createBiquadFilter();return Pe.frequency.value=p,we===0?Pe.type="lowshelf":we===Qe.length-1?Pe.type="highshelf":(Pe.type="peaking",Pe.Q.value=1.2),Pe}),r=e.createGain(),a=e.createDelay(2),i=e.createGain(),d=e.createGain(),o=e.createGain(),l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=220,l.Q.value=.7;let u=e.createBiquadFilter();u.type="lowshelf",u.frequency.value=45;let b=e.createBiquadFilter();b.type="lowshelf",b.frequency.value=90;let S=e.createGain(),w=e.createWaveShaper(),h=new Float32Array(2048);for(let p=0;p<h.length;p+=1){let we=p/(h.length-1)*2-1;h[p]=Math.tanh(3*we)/Math.tanh(3)}w.curve=h,w.oversample="4x";let _=e.createGain(),N=e.createDynamicsCompressor();N.threshold.value=-3,N.knee.value=0,N.ratio.value=20,N.attack.value=.003,N.release.value=.25;let C=e.createGain(),Ne=e.createChannelSplitter(2),ee=e.createDelay(.05);ee.delayTime.value=.015;let x=e.createDelay(.05);x.delayTime.value=.015;let ce=e.createChannelMerger(2),De=e.createStereoPanner(),B=e.createGain();B.gain.value=1;let xe=e.createGain();xe.gain.value=0;let U=e.createGain(),V=e.createOscillator();V.type="sine",V.frequency.value=.12;let j=e.createGain();j.gain.value=0;let D=e.createOscillator();D.type="sine",D.frequency.value=.35;let O=e.createGain();O.gain.value=0;let pe=e.createGain();pe.gain.value=0,V.connect(j),j.connect(De.pan),D.connect(O),D.connect(pe),O.connect(ee.delayTime),pe.connect(x.delayTime),V.start(),D.start(),C.connect(B),B.connect(U),C.connect(Ne),Ne.connect(ee,0),Ne.connect(x,1),ee.connect(ce,0,0),x.connect(ce,0,1),ce.connect(De),De.connect(xe),xe.connect(U);let fe=e.createGain(),Ae=e.createGain(),ke=e.createConvolver(),q=e.createGain(),me=e.createGain();t.connect(n[0]);for(let p=1;p<n.length;p+=1)n[p-1].connect(n[p]);let s=n[n.length-1];return s.connect(o),o.connect(C),s.connect(l),l.connect(u),u.connect(b),b.connect(S),S.connect(w),w.connect(_),_.connect(C),U.connect(r),U.connect(a),r.connect(fe),a.connect(i),i.connect(fe),a.connect(d),d.connect(a),fe.connect(Ae),Ae.connect(N),fe.connect(ke),ke.connect(q),q.connect(N),N.connect(me),T={fxIn:t,eqFilters:n,delayDry:r,delayNode:a,delayWet:i,delayFeedback:d,bassDry:o,bassLowpass:l,bassSub:u,bassBoost:b,bassDrive:S,bassShaper:w,bassWet:_,eightDInput:C,eightDSplitter:Ne,eightDDelayL:ee,eightDDelayR:x,eightDMerger:ce,eightDPanner:De,eightDDry:B,eightDWet:xe,eightDOut:U,panLfo:V,panDepth:j,pitchLfo:D,pitchDepthL:O,pitchDepthR:pe,limiter:N,reverbIn:fe,reverbDry:Ae,convolver:ke,reverbWet:q,fxOut:me,decay:0},await qt(t,me),m("info","effects graph inserted"),T},Qi=(e,t)=>{if(T===void 0)return;let n=e.currentTime,r=.06,a=T;for(let b=0;b<a.eqFilters.length;b+=1){let S=t.eq.enabled?t.eq.bands[b]??0:0;a.eqFilters[b].gain.setTargetAtTime(S,n,r)}let i=t.bass.enabled?t.bass.mix:0;a.bassDry.gain.setTargetAtTime(1,n,r),a.bassWet.gain.setTargetAtTime(i,n,r),a.bassSub.gain.setTargetAtTime(t.bass.enabled?t.bass.sub:0,n,r),a.bassBoost.gain.setTargetAtTime(t.bass.enabled?t.bass.boost:0,n,r),a.bassDrive.gain.setTargetAtTime(t.bass.enabled?1+t.bass.drive*3:1,n,r),a.panLfo.frequency.setTargetAtTime(t.eightD.rate,n,r),a.panDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.panDepth:0,n,r),a.pitchLfo.frequency.setTargetAtTime(t.eightD.pitchRate,n,r);let d=t.eightD.enabled?t.eightD.pitchDepth/1e3:0;a.pitchDepthL.gain.setTargetAtTime(d,n,r),a.pitchDepthR.gain.setTargetAtTime(-d,n,r);let o=t.eightD.enabled?t.eightD.mix:0;a.eightDDry.gain.setTargetAtTime(1-o,n,r),a.eightDWet.gain.setTargetAtTime(o,n,r);let l=t.delay.enabled?t.delay.mix:0;a.delayNode.delayTime.setTargetAtTime(Math.min(2,Math.max(.02,t.delay.timeMs/1e3)),n,r),a.delayFeedback.gain.setTargetAtTime(t.delay.enabled?t.delay.feedback:0,n,r),a.delayWet.gain.setTargetAtTime(l,n,r),a.delayDry.gain.setTargetAtTime(1-l,n,r);let u=t.reverb.enabled?t.reverb.mix:0;Math.abs(a.decay-t.reverb.decay)>.05&&(a.convolver.buffer=ji(e,t.reverb.decay),a.decay=t.reverb.decay),a.reverbWet.gain.setTargetAtTime(u,n,r),a.reverbDry.gain.setTargetAtTime(1-u,n,r)},Mn=async(e,t)=>{let n=W(e),r=Je(n);if(!r&&T===void 0){Re={...Re,active:[]};return}try{let a=await Q();if(a.state!=="running"&&r){Re={built:T!==void 0,context:a.state,active:[],error:"audio context suspended (interact with the page)",attached:H().sources};return}if(r){let d=Vi(t);d!==void 0&&await Ke(d)}let i=await Wi();Qi(a,n),Re={built:!0,context:a.state,active:[n.eq.enabled?"eq":"",n.bass.enabled?"bass":"",n.eightD.enabled?"8d":"",n.delay.enabled?"delay":"",n.reverb.enabled?"reverb":""].filter(d=>d!==""),attached:H().sources},i.decay===0&&n.reverb.enabled&&(i.decay=n.reverb.decay)}catch(a){let i=a instanceof Error?a.message:String(a);Re={built:T!==void 0,context:H().context,active:[],error:i,attached:H().sources},m("warn","effects engine unavailable",{error:i})}},zr=()=>{if(T!==void 0){let e=T.eqFilters[0].context.currentTime,t=.03;for(let n of T.eqFilters)n.gain.setTargetAtTime(0,e,t);T.bassWet.gain.setTargetAtTime(0,e,t),T.bassDry.gain.setTargetAtTime(1,e,t),T.bassSub.gain.setTargetAtTime(0,e,t),T.bassBoost.gain.setTargetAtTime(0,e,t),T.bassDrive.gain.setTargetAtTime(1,e,t),T.eightDWet.gain.setTargetAtTime(0,e,t),T.eightDDry.gain.setTargetAtTime(1,e,t),T.panDepth.gain.setTargetAtTime(0,e,t),T.pitchDepthL.gain.setTargetAtTime(0,e,t),T.pitchDepthR.gain.setTargetAtTime(0,e,t),T.delayWet.gain.setTargetAtTime(0,e,t),T.delayDry.gain.setTargetAtTime(1,e,t),T.delayFeedback.gain.setTargetAtTime(0,e,t),T.reverbWet.gain.setTargetAtTime(0,e,t),T.reverbDry.gain.setTargetAtTime(1,e,t)}Re={...Re,active:[],error:void 0}};var Ur="#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two",Kr=["loadstart","loadedmetadata","canplay","playing","play","emptied","ratechange","seeked"],$t=.001,Gr=1,Ji=150,zt=e=>{let t=e.id;return typeof t=="string"?t:e.constructor.name},se=()=>typeof document>"u"?[]:[...document.querySelectorAll(Ur)],Kt=class{constructor(t,n){this.getElements=t;this.source=n}getElements;source;attachments=new Map;timers=new Set;start(){this.scan()}scan(){let t=this.getElements(),n=0;for(let r of t)this.attachments.has(r)||(this.attach(r),n+=1);n>0?m("info","attached media elements",{added:n,total:this.attachments.size,found:t.length}):t.length===0&&m("debug","no media elements found",{selector:Ur})}apply(){this.scan();for(let t of this.attachments.keys())this.applyTo(t,"settings-change")}stop(){for(let t of this.timers)clearTimeout(t);this.timers.clear();for(let[t,n]of this.attachments)n(),this.restore(t);this.attachments.clear(),m("info","controller stopped")}attach(t){let n=r=>{let a=this.source.get().speed,i=t.playbackRate;Math.abs(i-a)>$t&&m("warn","TIDAL reset the rate",{id:zt(t),event:r.type,before:i,desired:a,currentTime:t.currentTime}),this.applyTo(t,r.type),(r.type==="loadstart"||r.type==="emptied")&&this.scheduleReapply(t)};for(let r of Kr)t.addEventListener(r,n);this.attachments.set(t,()=>{for(let r of Kr)t.removeEventListener(r,n)}),m("info","attached",{id:zt(t),tag:t.constructor.name,rate:t.playbackRate}),this.applyTo(t,"attach")}applyTo(t,n){let{speed:r,pitchShifts:a}=this.source.get(),i=t.playbackRate;try{Math.abs(i-r)>$t&&(t.playbackRate=r),t.defaultPlaybackRate!==void 0&&Math.abs(t.defaultPlaybackRate-r)>$t&&(t.defaultPlaybackRate=r);let o=!a;t.preservesPitch!==void 0&&t.preservesPitch!==o&&(t.preservesPitch=o),t.webkitPreservesPitch!==void 0&&t.webkitPreservesPitch!==o&&(t.webkitPreservesPitch=o)}catch(o){m("error","failed to apply rate",{id:zt(t),reason:n,error:String(o)});return}let d=t.playbackRate;Math.abs(d-i)>$t&&m("debug","applied rate",{id:zt(t),reason:n,before:i,after:d,readback:d,defaultRate:t.defaultPlaybackRate})}scheduleReapply(t){let n=setTimeout(()=>{this.timers.delete(n),this.attachments.has(t)&&this.applyTo(t,"delayed-reapply")},Ji);this.timers.add(n)}restore(t){try{t.playbackRate=Gr,t.defaultPlaybackRate!==void 0&&(t.defaultPlaybackRate=Gr),t.preservesPitch!==void 0&&(t.preservesPitch=!0),t.webkitPreservesPitch!==void 0&&(t.webkitPreservesPitch=!0)}catch{}}};var Yi=new Set(["media.load","media.preload"]),Xi=e=>{let t={origin:null,extension:null,pathLength:0,queryKeys:[],urlLength:e.length};try{let n=new URL(e);if(n.protocol!=="https:"&&n.protocol!=="http:")return t;t.origin=n.origin,t.pathLength=n.pathname.length;let r=n.pathname.slice(n.pathname.lastIndexOf("/")+1),a=r.lastIndexOf(".");a>0&&a<r.length-1&&(t.extension=r.slice(a+1).toLowerCase()),t.queryKeys=[...n.searchParams.keys()].sort()}catch{}return t},Vr=(e,t=Date.now())=>{if(typeof e!="string")return null;let n;try{n=JSON.parse(e)}catch{return null}if(typeof n!="object"||n===null)return null;let r=n,a=typeof r.command=="string"?r.command:null;if(a===null||!Yi.has(a))return null;let i=typeof r.url=="string"?r.url:null;return{at:t,command:a,format:typeof r.streamFormat=="string"?r.streamFormat:null,encrypted:typeof r.encryptionKey=="string"&&r.encryptionKey.length>0,...i===null?{origin:null,extension:null,pathLength:0,queryKeys:[],urlLength:0}:Xi(i)}};var jr=(e,t=Date.now())=>{if(typeof e!="object"||e===null)return null;let n=e.streamInfo;if(typeof n!="object"||n===null)return null;let r=n,a=typeof r.streamUrl=="string"?r.streamUrl:null;return a===null||!/^https?:\/\//i.test(a)?null:{url:a,format:typeof r.streamFormat=="string"?r.streamFormat:null,key:typeof r.securityToken=="string"?r.securityToken:"",at:t}},Ln=e=>Vr(JSON.stringify({command:"media.load",url:e.url,streamFormat:e.format,encryptionKey:e.key}),e.at)??void 0;var Gt="__lunaspeedPatched",X,Y,Wr=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||t.Player===void 0||t.Player.prototype===void 0))return t},Dn=e=>{let t=new Set,n=e,r=0;for(;n!==null&&r<4;){for(let a of Object.getOwnPropertyNames(n))t.add(a);n=Object.getPrototypeOf(n),r+=1}return[...t]},Qr=e=>{let t=Dn(e),n=t.find(r=>/^set(playback|audio)?(rate|speed|tempo)$/i.test(r));return n!==void 0&&typeof e[n]=="function"?n:typeof e.playbackRate=="number"?"playbackRate":t.find(r=>/^(playbackRate|rate|speed)$/i.test(r)&&typeof e[r]=="number")},Zi=e=>{X!==e&&(X=e,Y=Qr(e),m("info","native player instance captured",{rateMember:Y??null,ownKeys:Object.keys(e).slice(0,40),methods:Dn(e).slice(0,80)}))},Nn,Jr=e=>{Nn=e},eo="__playbackKitNativeStreams",_e=globalThis[eo]??={},kt=()=>({load:_e.load===void 0?void 0:{..._e.load},preload:_e.preload===void 0?void 0:{..._e.preload},seek:_e.seek===void 0?void 0:{..._e.seek}}),to=e=>{let t=Object.getPrototypeOf(e);if(t===null||t===Object.prototype||t.__pbkStreamPatched===!0)return;let n=(a,i)=>{let d=t[a];typeof d=="function"&&(t[a]=function(...l){try{let u=jr(l[0]);u!==null&&(_e[i]=u)}catch(u){m("debug","native stream capture failed",{error:String(u)})}return d.apply(this,l)})};try{Object.defineProperty(t,"__pbkStreamPatched",{value:!0,enumerable:!1})}catch{return}n("load","load"),n("next","preload");let r=t.seek;typeof r=="function"&&(t.seek=function(...i){let d=Number(i[0]);return Number.isFinite(d)&&(_e.seek={time:Math.max(0,d),at:Date.now()}),r.apply(this,i)}),m("info","native stream capture patched",{methods:["load","next","seek"]})},no=()=>{if(Nn!==void 0)try{let e=Nn();e!==void 0&&to(e)}catch(e){m("debug","native stream patch failed",{error:String(e)})}},An=()=>{no();let e=Wr();if(e===void 0)return!1;let t=e.Player?.prototype;if(t===void 0)return!1;if(t[Gt]===!0)return!0;try{Object.defineProperty(t,Gt,{value:!0,enumerable:!1})}catch{return!1}for(let n of["play","load","pause","seek"]){let r=t[n];typeof r=="function"&&(t[n]=function(...i){try{Zi(this)}catch(d){m("error","native capture failed",{error:String(d)})}return r.apply(this,i)})}return m("info","native player component patched"),!0},Yr=()=>X!==void 0,Cn,wt=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||typeof t.Player!="function")){if(Cn===void 0)try{Cn=t.Player()}catch(n){m("error","native volume control unavailable",{error:String(n)});return}return Cn}},Xr=e=>{let t=wt();if(!(t===void 0||typeof t.setVolume!="function"))try{t.setVolume(Math.round(Math.max(0,Math.min(1,e))*100))}catch(n){m("error","native volume set failed",{error:String(n)})}},Ut=()=>{let t=wt()?.volume;if(!(typeof t!="number"||!Number.isFinite(t)))return Math.max(0,Math.min(1,t))},Zr=()=>{let e=wt();if(e?.pause!==void 0)try{e.pause()}catch(t){m("error","native pause failed",{error:String(t)})}},ea=e=>{let t=wt();if(t?.seek!==void 0)try{t.seek(Math.max(0,e))}catch(n){m("error","native seek failed",{error:String(n)})}},ta=(e,t)=>{let n=wt();if(n!==void 0)try{typeof n.setVolume=="function"&&n.setVolume(Math.round(Math.max(0,Math.min(1,t))*100)),typeof n.seek=="function"&&n.seek(Math.max(0,e)),typeof n.play=="function"&&n.play()}catch(r){m("error","native seek/play failed",{error:String(r)})}},In=e=>{if(X===void 0||(Y===void 0&&(Y=Qr(X)),Y===void 0))return!1;try{let t=X[Y];if(Y==="playbackRate"){if(t===e)return!0;X.playbackRate=e}else X[Y](e);return m("info","native rate applied",{rate:e,member:Y,readback:X[Y]}),!0}catch(t){return m("error","native rate failed",{rate:e,member:Y,error:String(t)}),!1}},Vt=()=>{let e=Wr();if(e===void 0)return{present:!1};let t=e.Player?.prototype,n=t===void 0?[]:Object.getOwnPropertyNames(t).filter(r=>r!==Gt);return{present:!0,patched:t!==void 0&&t[Gt]===!0,playerMethods:n.slice(0,100),rateMethods:n.filter(r=>/rate|speed|tempo|pitch/i.test(r)),instanceCaptured:X!==void 0,rateMember:Y??null,instanceMethods:X===void 0?[]:Dn(X).slice(0,100)}};var rt=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/nativeProbe.native.ts",'"use strict";var w=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames;var _=Object.prototype.hasOwnProperty;var v=(e,n)=>{for(var r in n)w(e,r,{get:n[r],enumerable:!0})},B=(e,n,r,t)=>{if(n&&typeof n=="object"||typeof n=="function")for(let a of L(n))!_.call(e,a)&&a!==r&&w(e,a,{get:()=>n[a],enumerable:!(t=D(n,a))||t.enumerable});return e};var H=e=>B(w({},"__esModule",{value:!0}),e);var Y={};v(Y,{preparePreload:()=>z,prepareStream:()=>F,readBridge:()=>W,readTrack:()=>j,releaseTrack:()=>G});module.exports=H(Y);var h=require("node:crypto"),K="UIlTTEMmmLfGowo/UC60x2H45W6MdGgTRfo/umg4754=",A=(e,n=K)=>{let r=Buffer.from(e,"base64");if(r.length<32||(r.length-16)%16!==0)throw new Error("encryption key is not an OLD_AES token");let t=Buffer.from(n,"base64");if(t.length!==32)throw new Error("invalid master key length");let a=(0,h.createDecipheriv)("aes-256-cbc",t,r.subarray(0,16));a.setAutoPadding(!1);let s=Buffer.concat([a.update(r.subarray(16)),a.final()]);if(s.length<24)throw new Error("unwrapped key is too short");return{key:new Uint8Array(s.subarray(0,16)),nonce:new Uint8Array(s.subarray(16,24))}},S=(e,n)=>{if(e.length!==16)throw new Error("lossless key must be 16 bytes");if(n.length!==8)throw new Error("lossless nonce must be 8 bytes");let r=new Uint8Array(16);r.set(n,0);let t=(0,h.createDecipheriv)("aes-128-ctr",e,r);return{update(a){return new Uint8Array(t.update(a))},destroy(){t.destroy()}}},T=e=>e.length>=4&&e[0]===102&&e[1]===76&&e[2]===97&&e[3]===67,U=(e,n=8)=>Array.from(e.subarray(0,n)).map(r=>r.toString(16).padStart(2,"0")).join(" ");var N=18e4,E=200*1024*1024,C=2*1024*1024,I=1,o,i,d=e=>e===void 0?void 0:{...e.info},O=(e,n)=>{let r=String(e);return n===""?r:r.split(n).join("[url]")},R=(e,n)=>{if(e!==null){let r=/\\/(\\d+)\\s*$/.exec(e);if(r!==null)return Number(r[1])}if(n!==null){let r=Number(n);if(Number.isFinite(r)&&r>0)return r}return null},y=e=>{if(o?.info.id===e)return o;if(i?.info.id===e)return i},$=async e=>{let n=Date.now(),r=new AbortController,t=setTimeout(()=>r.abort(),N);try{let a=e.key===""?void 0:A(e.key),s=a===void 0?void 0:S(a.key,a.nonce),u=await fetch(e.url,{headers:{Range:"bytes=0-"},signal:r.signal});if(!u.ok)throw new Error(`HTTP ${u.status}`);e.info.total=R(u.headers.get("content-range"),u.headers.get("content-length"));let g=u.body;if(g===null)throw new Error("empty response body");let k=g.getReader(),m=[],l=0;try{for(;;){let{done:c,value:p}=await k.read();if(c)break;if(p===void 0)continue;let x=s===void 0?p:s.update(p);if(m.push(x),l+=x.length,e.info.bytes=l,l>E)throw new Error(`track exceeds ${E} bytes`)}}finally{try{await k.cancel()}catch{}}let f=new Uint8Array(l),b=0;for(let c of m)f.set(c,b),b+=c.length;if(!T(f))throw new Error(`decrypted stream is not FLAC (head ${U(f)})`);if(y(e.info.id)!==e)return;e.info.flac=!0,e.info.bytes=f.length,e.info.total=e.info.total??f.length,e.info.state="ready",e.info.elapsedMs=Date.now()-n,e.data=f}catch(a){if(y(e.info.id)!==e)return;e.info.state="error",e.info.error=O(a,e.url),e.info.elapsedMs=Date.now()-n}finally{clearTimeout(t)}},P=(e,n,r)=>{let t={info:{id:I++,state:"downloading",format:n,encrypted:r!=="",bytes:0,total:null,flac:!1,elapsedMs:0},url:e,key:r};return $(t),t},M=(e,n,r)=>{if(!(typeof e!="string"||!/^https?:\\/\\//i.test(e)))return{url:e,format:typeof n=="string"?n:null,key:typeof r=="string"?r:""}},F=async(e,n,r)=>{let t=M(e,n,r);if(t!==void 0)return i!==void 0&&i.url===t.url&&i.key===t.key&&i.info.state!=="error"?(o!==void 0&&o!==i&&(o.data=void 0),o=i,i=void 0,d(o)):(o!==void 0&&o.url===t.url&&o.key===t.key&&o.info.state!=="released"&&o.info.state!=="error"||(o!==void 0&&(o.data=void 0),o=P(t.url,t.format,t.key)),d(o))},z=async(e,n,r)=>{let t=M(e,n,r);if(t!==void 0)return o!==void 0&&o.url===t.url&&o.key===t.key?d(o):(i!==void 0&&i.url===t.url&&i.key===t.key&&i.info.state!=="released"&&i.info.state!=="error"||(i!==void 0&&(i.data=void 0),i=P(t.url,t.format,t.key)),d(i))},j=async(e,n,r)=>{let t=y(e);if(t===void 0)throw new Error("unknown track");if(t.data===void 0)throw new Error(`track is ${t.info.state}`);let a=Math.max(0,Math.floor(n)),s=Math.max(0,Math.min(Math.floor(r),C)),u=Math.min(t.data.length,a+s);return t.data.slice(a,u)},G=async e=>{let n=y(e);n!==void 0&&(n.data=void 0,n.info.state==="ready"&&(n.info.state="released"))},W=async()=>({load:d(o),preload:d(i)});0&&(module.exports={preparePreload,prepareStream,readBridge,readTrack,releaseTrack});\n');if(rt===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/nativeProbe.native.ts");var na=(...e)=>__ipcRenderer.invoke(rt,"preparePreload",...e),ra=(...e)=>__ipcRenderer.invoke(rt,"prepareStream",...e),Pt=(...e)=>__ipcRenderer.invoke(rt,"readBridge",...e),aa=(...e)=>__ipcRenderer.invoke(rt,"readTrack",...e),ia=(...e)=>__ipcRenderer.invoke(rt,"releaseTrack",...e);var oa=`
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
`;var sa="playback-kit-pitch",ve,ye={status:"idle",semitones:0,attached:0},Rn=()=>({...ye}),ro=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),ao=async e=>(await xn(oa,sa),ve===void 0&&(ve=new AudioWorkletNode(e,sa,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]}),await wn(ve,0),m("info","pitch node inserted into audio engine")),ve),jt=async(e,t,n)=>{let r=Math.max(.25,Math.min(4,Number.isFinite(e)?e:1));if(Math.abs(r-1)<2e-4){if(ve!==void 0){let a=ve.parameters.get("ratio");a!==void 0&&(a.value=1)}ye={...ye,status:ve===void 0?"idle":"ready",semitones:t,reason:void 0};return}try{let a=await Q();if(a.state!=="running"){ye={status:"waiting",reason:"audio context suspended (interact with the page)",semitones:t,context:a.state,attached:ye.attached};return}let d=(await ao(a)).parameters.get("ratio");d!==void 0&&(d.value=r);let o=ro(n);o!==void 0&&await Ke(o),ye={status:"running",semitones:t,context:a.state,attached:H().sources}}catch(a){let i=a instanceof Error?a.message:String(a);ye={status:"unavailable",reason:i,semitones:t,attached:ye.attached},m("error","pitch engine unavailable",{error:i})}};var la=()=>{if(ve!==void 0){let e=ve.parameters.get("ratio");e!==void 0&&(e.value=1)}ye={...ye,status:ve===void 0?"idle":"ready",semitones:0,reason:void 0}};var Wt="unknown",_n=new Set,Se=()=>Wt,Bn=e=>{if(e!==Wt){m("info","player kind changed",{from:Wt,to:e}),Wt=e;for(let t of[..._n])try{t(e)}catch(n){m("error","player kind listener failed",{error:String(n)})}}},da=e=>(_n.add(e),()=>_n.delete(e));var io=(e,t)=>{let n=new Set(e.get().map(a=>a.name));if(!n.has(t))return t;let r=2;for(;n.has(`${t} ${r}`);)r+=1;return`${t} ${r}`},ua=(e,t,n)=>{let r=e.get(),a={speed:r.speed,pitchShifts:r.pitchShifts,pitchSemitones:r.pitchSemitones,effects:r.effects};if(n.builtin===!0){let i=t.save(io(t,`${n.name} (edited)`),a);return i!==void 0&&e.applyPreset(i),i}return t.update(n.id,a),n},Et=(e,t)=>{let n=e.get();n.builtinPresets||n.presetId===null||t.getById(n.presetId)?.builtin===!0&&e.clearPreset()};var ca=(e,t,n,r)=>{let a=2**(e/12);return r?n?1:Math.abs(t-1)<.001?a:Math.max(.25,Math.min(4,a/t)):a},pa=(e,t,n)=>Math.max(0,e*t+n);var oo=250,so=800,lo=1024*1024,uo=.4,co=420*1024*1024,E,Qt,Hn=!1,ha=!1,at=null,On=null,Ge="idle",fa=null,R=null,Z=null,le,$n=0,de=0,Tt=1,z=!1,Ue=!1,K=!1,Xt=!1,ma=0,qn=0,Zt,Yt=null,Oe=1,Ce=()=>Z===null||!z?de:pa(Z.context.currentTime-$n,Tt,de),Be=()=>{if(Z===null)return;let e=Z;Z=null,z=!1;try{e.stop()}catch{}Ot(e)},po=async e=>((le===void 0||le.context!==e)&&(le=e.createGain(),await kn(le)),le.gain.value=Oe,le),He=e=>{if(E!==void 0){if(e&&!Ue)E.setNativeVolume(0),Ue=!0;else if(!e&&Ue){let t=E.getDesiredVolume?.();t!==void 0&&(Oe=t),E.setNativeVolume(Oe),Ue=!1}}},zn=()=>{if(!K||E===void 0)return;let e=R!==null?Ce():E.getNativePosition()??0;E.seekNative?.(e),E.isPlaying()?E.playNativeAt?.(e,Oe):E.setNativeVolume(Oe),K=!1},Jt=async(e,t=!0)=>{if(R===null)return;let n=await Q();if(n.state!=="running")throw new Error(`audio context is ${n.state}`);let r=R.duration;if(!Number.isFinite(r)||r<=0)return;let a=E?.getSettings().speed??1,i=Math.min(Math.max(0,e),Math.max(0,r-.02));Be(),Xt=!1;let d=n.createBufferSource();d.buffer=R,d.playbackRate.value=a,Tt=a,d.onended=()=>{Z===d&&(z=!1,Xt=!0,Math.abs(Tt-1)>.001&&R!==null&&(E?.playNativeAt?.(Math.max(0,R.duration-.25),0),K=!1))};let o=await po(n);d.connect(o),Z=d;let l=t?E?.getNativePosition()??null:null,u=l===null?i:Math.max(0,Math.min(l+.02,Math.max(0,r-.02)));de=u,$n=n.currentTime,z=!0,d.start(0,u),He(!0),Math.abs(a-1)>.001?K||(E?.pauseNative?.(),K=!0):K&&(E?.playNativeAt?.(u,0),K=!1),m("info","shadow source started",{offset:Number(u.toFixed(3)),rate:a})},fo=async(e,t)=>{let n=[],r=0;for(;r<t;){let d=await aa(e,r,Math.min(lo,t-r));if(!(d instanceof Uint8Array)||d.length===0)throw new Error("native bridge returned an empty chunk");n.push(d),r+=d.length}let a=new Uint8Array(r),i=0;for(let d of n)a.set(d,i),i+=d.length;return a},mo=async(e,t)=>{let n=await fo(e,t);await ia(e);let r=await Q(),a=new ArrayBuffer(n.byteLength);new Uint8Array(a).set(n);let i=await r.decodeAudioData(a),d=i.length*i.numberOfChannels*4;if(d>co)throw new Error(`decoded track is too large (${Math.round(d/1024/1024)} MB)`);R=i,Ge="ready",m("info","shadow track decoded",{seconds:Number(i.duration.toFixed(2)),channels:i.numberOfChannels})},Fn=e=>{Zt=String(e),Ge="failed",Yt=at,z&&(de=Ce()),Be(),zn(),R=null,He(!1),m("error","shadow player failed",{error:Zt})},go=e=>e.nativeEffects&&(Je(e.effects)||e.pitchSemitones!==0||Math.abs(e.speed-1)>.001),ho=async()=>{if(E===void 0)return;let e=E.getSettings();if(!(ha&&Se()==="native"&&go(e))){(Z!==null||R!==null||Ue||K)&&(z&&(de=Ce()),Be(),zn(),R=null,Ge="idle",He(!1)),at=null,On=null,Yt=null;return}let n=E.getDesiredVolume?.();n!==void 0&&Number.isFinite(n)&&(Oe=Math.max(0,Math.min(1,n)),le!==void 0&&(le.gain.value=Oe));let r=Date.now();if(r-ma>=so){ma=r;let u=kt();if(u.preload!==void 0&&u.preload.at!==On&&(On=u.preload.at,na(u.preload.url,u.preload.format,u.preload.key)),u.load!==void 0&&u.load.at!==at){at=u.load.at,Yt=null,Zt=void 0,R=null,Ge="preparing",Xt=!1,K=!1,qn=u.seek?.at??0,Be(),He(!1),fa=(await ra(u.load.url,u.load.format,u.load.key))?.id??null;return}if(Ge==="preparing"){let S=(await Pt()).load;if(S!==void 0&&S.state==="error"){Fn(S.error??"native stream could not be prepared");return}if(S!==void 0&&S.state==="ready"&&S.id===fa)try{await mo(S.id,S.bytes)}catch(w){Fn(w);return}}}if(Ge==="failed"&&at===Yt)return;let a=E.getSettings().speed,i=Math.abs(a-1)>.001,o=kt().seek;if(o!==void 0&&o.at!==qn&&(qn=o.at,R!==null)){E.isPlaying()?await Jt(o.time,!1):(z&&Be(),de=Math.max(0,o.time));return}if(R===null||(Ue&&E.setNativeVolume(0),Xt))return;if(Z!==null&&z&&Math.abs(Z.playbackRate.value-a)>1e-4){let u=Ce();Z.playbackRate.value=a,Tt=a,de=u,$n=Z.context.currentTime,i&&!K?(He(!0),E.pauseNative?.(),K=!0):!i&&K&&(E.playNativeAt?.(u,0),K=!1)}if(!E.isPlaying()){if(z&&(de=Ce(),Be()),He(!1),!i){let u=E.getNativePosition();u!==null&&(de=u)}return}if(!i){let u=E.getNativePosition();if(u===null)return;if(u>=R.duration-.05){z&&Be();return}if(He(!0),!z){await Jt(u+.05);return}Math.abs(Ce()-u)>uo&&(m("info","shadow resync",{ours:Number(Ce().toFixed(3)),native:Number(u.toFixed(3))}),await Jt(u+.05));return}z||await Jt(de,!1)},ba=()=>R===null?null:Ce(),ga=()=>{Hn||(Hn=!0,ho().catch(e=>{m("error","shadow tick failed",{error:String(e)}),Fn(e)}).finally(()=>{Hn=!1}))},Kn=e=>{ha=e.nativeEffects},Gn=()=>({state:Ge,bufferSeconds:R===null?null:Number(R.duration.toFixed(2)),playing:z,muted:Ue,nativePaused:K,rate:Tt,loadAt:at,error:Zt}),ya=(e,t)=>{E=t;let n=t.getDesiredVolume?.();Oe=n!==void 0&&Number.isFinite(n)?Math.max(0,Math.min(1,n)):1,Qt=setInterval(ga,oo),ga(),e.add(()=>{Qt!==void 0&&clearInterval(Qt),Qt=void 0,z&&(de=Ce()),Be(),zn(),le!==void 0&&(Ot(le),le=void 0),R=null,He(!1),E=void 0})};var bo=e=>Math.abs(e-1)>.001,Un=e=>{if(!bo(e.getSpeed())||!e.isPlaying())return!1;let t=e.getPosition();return t===null||!Number.isFinite(t)||t<0?!1:(e.dispatchTimeUpdate(t),!0)},va=(e,t=100)=>{let n=setInterval(()=>Un(e),t);return()=>clearInterval(n)};var c=We(jn(),1),g=We(Sa(),1);var xa=e=>({id:e.id,paused:e.paused,readyState:e.readyState,currentTime:Number(e.currentTime.toFixed(2)),playbackRate:e.playbackRate}),ka=async(e=1200)=>{let t=Date.now(),n=H(),r=se(),a=r.find(h=>!h.paused&&h.readyState>0)??r[0];if(a===void 0){let h={at:t,ok:!1,reason:"no media element",context:n.context,engine:n};return m("warn","audio self-test: no media element"),h}let i=a.currentTime;try{await Ke(a)}catch(h){let _={at:t,ok:!1,reason:h instanceof Error?h.message:String(h),context:H().context,element:xa(a),engine:H()};return m("warn","audio self-test failed to attach",_),_}let d=await Q(),o=0,l=0,u=!0;try{let h=await Pn(e);o=h.rms,l=h.peak,u=h.silent}catch(h){m("error","audio self-test measurement failed",{error:String(h)})}let b=Number((a.currentTime-i).toFixed(2)),S=d.state!=="running"?`audio context ${d.state}`:a.paused?"playback is paused":u&&b>.2?"captured audio is silent (DRM-protected or already routed elsewhere)":u?"no audio measured":void 0,w={at:t,ok:S===void 0,reason:S,context:d.state,element:xa(a),progressionSeconds:b,rms:Number(o.toFixed(5)),peak:Number(l.toFixed(5)),silent:u,engine:H()};return m(w.ok?"info":"warn","audio self-test",w),w};var J=We(jn(),1);var yo=132,wa=re-Te,Qn=e=>Math.max(Te,Math.min(re,e)),Pa=e=>`${e>0?"+":""}${e}`,Ea=e=>e>=1e3?`${e/1e3}k`:String(e),vo=({frequency:e,value:t,disabled:n,onChange:r})=>{let a=J.default.useRef(null),[i,d]=J.default.useState(null),o=h=>{let _=a.current;if(_===null)return;let N=_.getBoundingClientRect(),C=Math.max(0,Math.min(1,(h-N.top)/N.height));d(C*100),r(Qn(Math.round(re-C*wa)))},l=i??(re-t)/wa*100,u=50,b=Math.min(l,u),S=Math.abs(l-u),w=i===null;return J.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:30,opacity:n?.4:1}},J.default.createElement("span",{style:{fontSize:10,fontVariantNumeric:"tabular-nums",color:"currentColor",opacity:.8}},Pa(t)),J.default.createElement("div",{ref:a,role:"slider",tabIndex:n?-1:0,"aria-label":`${Ea(e)} Hz`,"aria-valuemin":Te,"aria-valuemax":re,"aria-valuenow":t,"aria-valuetext":`${Pa(t)} dB`,"aria-disabled":n,onPointerDown:h=>{n||(h.preventDefault(),h.currentTarget.setPointerCapture(h.pointerId),o(h.clientY))},onPointerMove:h=>{n||!h.currentTarget.hasPointerCapture(h.pointerId)||o(h.clientY)},onPointerUp:h=>{h.currentTarget.hasPointerCapture(h.pointerId)&&h.currentTarget.releasePointerCapture(h.pointerId),d(null)},onPointerCancel:h=>{h.currentTarget.hasPointerCapture(h.pointerId)&&h.currentTarget.releasePointerCapture(h.pointerId),d(null)},onDoubleClick:()=>{n||r(0)},onKeyDown:h=>{if(n)return;let _=h.shiftKey?3:1;if(h.key==="ArrowUp"||h.key==="ArrowRight")r(Qn(t+_));else if(h.key==="ArrowDown"||h.key==="ArrowLeft")r(Qn(t-_));else if(h.key==="Home")r(Te);else if(h.key==="End")r(re);else return;h.preventDefault()},style:{position:"relative",width:18,height:yo,cursor:n?"default":"pointer",touchAction:"none",outline:"none"}},J.default.createElement("div",{style:{position:"absolute",left:"50%",top:0,bottom:0,width:5,transform:"translateX(-50%)",borderRadius:999,background:"color-mix(in srgb, currentColor 16%, transparent)"}}),J.default.createElement("div",{style:{position:"absolute",left:0,right:0,top:`${u}%`,height:1,background:"color-mix(in srgb, currentColor 28%, transparent)"}}),J.default.createElement("div",{style:{position:"absolute",left:"50%",width:5,transform:"translateX(-50%)",borderRadius:999,top:`${b}%`,height:`${S}%`,background:"var(--wave-color-solid-accent-fill, currentColor)",transition:w?"top 120ms ease, height 120ms ease":"none"}}),J.default.createElement("div",{style:{position:"absolute",left:"50%",top:`${l}%`,width:12,height:12,transform:"translate(-50%, -50%)",borderRadius:"50%",background:"currentColor",boxShadow:"0 0 0 3px color-mix(in srgb, var(--wave-color-solid-accent-fill, currentColor) 22%, transparent), 0 1px 3px rgba(0,0,0,.5)",transition:w?"top 120ms ease":"none"}})),J.default.createElement("span",{style:{fontSize:9,opacity:.6,letterSpacing:"-0.02em"}},Ea(e)))},Ta=({eq:e,disabled:t,onChange:n})=>J.default.createElement("div",{style:{display:"flex",gap:8,alignItems:"flex-end",marginLeft:"auto",padding:"2px 0"}},Qe.map((r,a)=>J.default.createElement(vo,{key:r,frequency:r,value:e.bands[a]??0,disabled:t,onChange:i=>{let d=[...e.bands];d[a]=i,n(d)}})));var Jn=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)&&t>0?t:void 0},G=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)?t:void 0},So=e=>{let t=e.pitchShifts?"pitch follows speed":e.pitchSemitones===0?"pitch preserved":`pitch ${pt(e.pitchSemitones)} st`;return`${ae(e.speed)}\xD7 \xB7 ${t} \xB7 ${Nt(e.effects)}`},Ve={display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:6,marginLeft:"auto"},it=({children:e})=>c.default.createElement("div",{style:{marginBottom:16}},e),xo=()=>{let[e,t]=c.default.useState(v.get),[n,r]=c.default.useState(L.get),[a,i]=c.default.useState("Copy diagnostics"),[d,o]=c.default.useState("Resolving\u2026"),[l,u]=c.default.useState(""),[b,S]=c.default.useState(null),[w,h]=c.default.useState(!1),[_,N]=c.default.useState("Attaches the playing element, measures captured RMS and reports blocked/silent reasons. May silence playback if capture fails; restart TIDAL to undo.");c.default.useEffect(()=>v.subscribe(t),[]),c.default.useEffect(()=>L.subscribe(()=>r(L.get())),[]),c.default.useEffect(()=>{It().then(o).catch(()=>o("unavailable"))},[]),c.default.useEffect(()=>{if(a==="Copy diagnostics")return;let s=setTimeout(()=>i("Copy diagnostics"),1800);return()=>clearTimeout(s)},[a]),c.default.useEffect(()=>{if(l==="")return;let s=setTimeout(()=>u(""),4e3);return()=>clearTimeout(s)},[l]);let{bounds:C,pitchShifts:Ne,developerMode:ee,effects:x,builtinPresets:ce,nativeEffects:De}=e,B=ce?n:n.filter(s=>s.builtin!==!0),xe=B.findIndex(s=>s.builtin!==!0),U=s=>v.setEffects({...x,eq:{...x.eq,...s}}),V=s=>v.setEffects({...x,bass:{...x.bass,...s}}),j=s=>v.setEffects({...x,eightD:{...x.eightD,...s}}),D=s=>v.setEffects({...x,delay:{...x.delay,...s}}),O=s=>v.setEffects({...x,reverb:{...x.reverb,...s}}),pe=async s=>{let p=At(s);return p===void 0?!1:(v.replace(p.settings),L.replace(p.presets),Et(v,L),await Ze(vt(p.settings,p.presets)),!0)},fe=async()=>{try{let s=await vr();if(s===null)return u("Import cancelled");let p=await pe(s.json);u(p?`Imported ${s.path}`:"Import failed: invalid config")}catch(s){u(`Import failed: ${String(s)}`)}},Ae=async()=>{try{let s=await yr(vt(v.get(),L.get()));u(s===null?"Export cancelled":`Exported ${s}`)}catch(s){u(`Export failed: ${String(s)}`)}},ke=async()=>{try{let s=await Rt();if(s===null)return u("Config file not found");let p=await pe(s);u(p?"Reloaded from config file":"Reload failed: invalid config")}catch(s){u(`Reload failed: ${String(s)}`)}},q=s=>{window.confirm(`Overwrite "${s.name}" with the current speed, pitch and effects?`)&&(L.update(s.id,{speed:e.speed,pitchShifts:e.pitchShifts,pitchSemitones:e.pitchSemitones,effects:e.effects}),u(`Updated "${s.name}"`))},me=s=>{window.confirm(`Delete preset "${s.name}"?`)&&(L.remove(s.id),u(`Deleted "${s.name}"`))};return c.default.createElement("div",{style:{paddingBottom:8}},c.default.createElement(it,null,c.default.createElement(g.LunaSettings,{title:"Playback",desc:"Speed and pitch. Effects live in their own section below."},c.default.createElement(g.LunaTextSetting,{title:"Minimum speed",desc:"Below 0.0625\xD7 Chromium plays at its floor.",defaultValue:ae(C.min),inputProps:{inputMode:"decimal"},onChange:s=>{let p=Jn(s.target.value);p!==void 0&&v.setBounds({min:p})}}),c.default.createElement(g.LunaTextSetting,{title:"Maximum speed",defaultValue:ae(C.max),inputProps:{inputMode:"decimal"},onChange:s=>{let p=Jn(s.target.value);p!==void 0&&v.setBounds({max:p})}}),c.default.createElement(g.LunaTextSetting,{title:"Snap step",desc:"Slider snapping and the \u2212 / + step size.",defaultValue:ae(C.step),inputProps:{inputMode:"decimal"},onChange:s=>{let p=Jn(s.target.value);p!==void 0&&v.setBounds({step:p})}}),c.default.createElement(g.LunaSwitchSetting,{title:"Pitch follows speed",desc:"Chipmunk / slow-mo. Clears any custom pitch shift.",checked:Ne,onChange:s=>v.setPitchShifts(s.target.checked)}),c.default.createElement(g.LunaSetting,{title:"Reset",desc:"Back to 1.00\xD7, pitch shift off, all effects off."},c.default.createElement("div",{style:Ve},c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>v.reset()},"Reset playback"))))),c.default.createElement(it,null,c.default.createElement(g.LunaSettings,{title:"Presets",desc:"Capture speed, pitch and effects. Built-ins are fixed; custom presets can be applied, renamed, updated, reordered and deleted."},c.default.createElement(g.LunaSwitchSetting,{title:"Built-in presets",desc:"Show the built-in presets.",checked:ce,onChange:s=>{let p=s.target.checked;v.setBuiltinPresets(p),Et(v,L)}}),B.map((s,p)=>{let we=e.presetId===s.id&&!yt(s,e);return c.default.createElement(g.LunaSetting,{key:s.id,title:`${s.name}${we?" *":""}`,desc:So(s)},c.default.createElement("div",{style:Ve},e.presetId===s.id?c.default.createElement("span",{style:{fontSize:12,opacity:.7}},"Active"):c.default.createElement(g.LunaButton,{size:"small",onClick:()=>v.applyPreset(s)},"Use"),s.builtin===!0?c.default.createElement("span",{style:{fontSize:12,opacity:.6}},"Built-in"):c.default.createElement(c.default.Fragment,null,c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>S({id:s.id,name:s.name,value:s.name})},"Rename"),c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>q(s)},"Update"),c.default.createElement(g.LunaButton,{size:"small",variant:"text",disabled:p<=xe,title:"Move up",onClick:()=>L.move(s.id,-1)},"\u2191"),c.default.createElement(g.LunaButton,{size:"small",variant:"text",disabled:p>=B.length-1,title:"Move down",onClick:()=>L.move(s.id,1)},"\u2193"),c.default.createElement(g.LunaButton,{size:"small",variant:"text",color:"error",onClick:()=>me(s)},"Delete"))))}),b!==null&&c.default.createElement(c.default.Fragment,null,c.default.createElement(g.LunaTextSetting,{title:`Rename ${b.name}`,defaultValue:b.value,onChange:s=>S({...b,value:s.target.value})}),c.default.createElement(g.LunaSetting,{title:" "},c.default.createElement("div",{style:Ve},c.default.createElement(g.LunaButton,{size:"small",onClick:()=>{L.rename(b.id,b.value),S(null)}},"Save"),c.default.createElement(g.LunaButton,{size:"small",variant:"text",onClick:()=>S(null)},"Cancel")))))),c.default.createElement(it,null,c.default.createElement(g.LunaSettings,{title:"Native player",desc:"TIDAL's lossless player runs in a separate process. This plays the same stream through the effects chain."},c.default.createElement(g.LunaSwitchSetting,{title:"Effects on native lossless",desc:"Experimental. Speed, pitch and effects run through the shadow player; TIDAL's native renderer keeps the clock at 1\xD7 and is paused for other speeds. Downloads the track a second time (prefetched where possible).",checked:De,onChange:s=>v.setNativeEffects(s.target.checked)}))),c.default.createElement(it,null,c.default.createElement(g.LunaSettings,{title:"Effects",desc:"Same Web Audio chain as pitch. Needs audio capture \u2014 use the dev-mode self-test if nothing changes."},c.default.createElement(g.LunaSwitchSetting,{title:"Equalizer",desc:"8 bands, 62 Hz to 8 kHz, \xB112 dB. Drag a band; double-click resets it.",checked:x.eq.enabled,onChange:s=>U({enabled:s.target.checked})}),c.default.createElement(g.LunaSetting,{title:"Bands",desc:"Shift+arrow for 3 dB steps."},c.default.createElement(Ta,{eq:x.eq,disabled:!x.eq.enabled,onChange:s=>U({bands:s})})),c.default.createElement(g.LunaSetting,{title:"Flatten",desc:"Set every band to 0 dB."},c.default.createElement("div",{style:Ve},c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",disabled:!x.eq.enabled,onClick:()=>U({bands:Array.from({length:ct},()=>0)})},"Flatten EQ"))),c.default.createElement(g.LunaSwitchSetting,{title:"Bass boost",desc:"Parallel low-shelf sub boost with saturation for dirty kicks. Added on top of the dry signal.",checked:x.bass.enabled,onChange:s=>V({enabled:s.target.checked})}),c.default.createElement(g.LunaTextSetting,{title:"Bass boost (dB)",desc:"Low shelf at 90 Hz, 0\u201324 dB.",defaultValue:String(Math.round(x.bass.boost)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=G(s.target.value);p!==void 0&&V({boost:Math.max(0,Math.min(24,p))})}}),c.default.createElement(g.LunaTextSetting,{title:"Sub (dB)",desc:"Extra shelf at 45 Hz, 0\u201312 dB.",defaultValue:String(Math.round(x.bass.sub)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=G(s.target.value);p!==void 0&&V({sub:Math.max(0,Math.min(12,p))})}}),c.default.createElement(g.LunaTextSetting,{title:"Drive (%)",desc:"Saturation on the bass path; more harmonics, dirtier kicks.",defaultValue:String(Math.round(x.bass.drive*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=G(s.target.value);p!==void 0&&V({drive:Math.max(0,Math.min(100,p))/100})}}),c.default.createElement(g.LunaTextSetting,{title:"Bass amount (%)",desc:"How much of the boosted bass is added back.",defaultValue:String(Math.round(x.bass.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=G(s.target.value);p!==void 0&&V({mix:Math.max(0,Math.min(100,p))/100})}}),c.default.createElement(g.LunaSwitchSetting,{title:"8D audio",desc:"LFO panning plus a constant pitch wobble, so the mix moves around your head.",checked:x.eightD.enabled,onChange:s=>j({enabled:s.target.checked})}),c.default.createElement(g.LunaTextSetting,{title:"8D pan rate (Hz)",desc:"How fast the sound travels left/right.",defaultValue:String(x.eightD.rate),inputProps:{inputMode:"decimal"},onChange:s=>{let p=G(s.target.value);p!==void 0&&j({rate:Math.max(.02,Math.min(2,p))})}}),c.default.createElement(g.LunaTextSetting,{title:"8D pan depth (%)",defaultValue:String(Math.round(x.eightD.panDepth*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=G(s.target.value);p!==void 0&&j({panDepth:Math.max(0,Math.min(100,p))/100})}}),c.default.createElement(g.LunaTextSetting,{title:"8D pitch rate (Hz)",desc:"Speed of the constant pitch wobble.",defaultValue:String(x.eightD.pitchRate),inputProps:{inputMode:"decimal"},onChange:s=>{let p=G(s.target.value);p!==void 0&&j({pitchRate:Math.max(.02,Math.min(2,p))})}}),c.default.createElement(g.LunaTextSetting,{title:"8D pitch depth (ms)",desc:"Delay modulation depth; higher = wider pitch smear.",defaultValue:String(x.eightD.pitchDepth),inputProps:{inputMode:"decimal"},onChange:s=>{let p=G(s.target.value);p!==void 0&&j({pitchDepth:Math.max(0,Math.min(12,p))})}}),c.default.createElement(g.LunaTextSetting,{title:"8D mix (%)",desc:"Dry/wet amount; higher is more immersive.",defaultValue:String(Math.round(x.eightD.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=G(s.target.value);p!==void 0&&j({mix:Math.max(0,Math.min(100,p))/100})}}),c.default.createElement(g.LunaSwitchSetting,{title:"Delay",desc:"Feedback delay.",checked:x.delay.enabled,onChange:s=>D({enabled:s.target.checked})}),c.default.createElement(g.LunaTextSetting,{title:"Delay time (ms)",defaultValue:String(Math.round(x.delay.timeMs)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=G(s.target.value);p!==void 0&&D({timeMs:Math.max(20,Math.min(2e3,p))})}}),c.default.createElement(g.LunaTextSetting,{title:"Delay feedback (%)",defaultValue:String(Math.round(x.delay.feedback*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=G(s.target.value);p!==void 0&&D({feedback:Math.max(0,Math.min(90,p))/100})}}),c.default.createElement(g.LunaTextSetting,{title:"Delay mix (%)",defaultValue:String(Math.round(x.delay.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=G(s.target.value);p!==void 0&&D({mix:Math.max(0,Math.min(100,p))/100})}}),c.default.createElement(g.LunaSwitchSetting,{title:"Reverb",desc:"Generated impulse response.",checked:x.reverb.enabled,onChange:s=>O({enabled:s.target.checked})}),c.default.createElement(g.LunaTextSetting,{title:"Reverb decay (s)",defaultValue:String(x.reverb.decay),inputProps:{inputMode:"decimal"},onChange:s=>{let p=G(s.target.value);p!==void 0&&O({decay:Math.max(.2,Math.min(8,p))})}}),c.default.createElement(g.LunaTextSetting,{title:"Reverb mix (%)",defaultValue:String(Math.round(x.reverb.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=G(s.target.value);p!==void 0&&O({mix:Math.max(0,Math.min(100,p))/100})}}))),c.default.createElement(it,null,c.default.createElement(g.LunaSettings,{title:"Config file",desc:"Versioned JSON, editable outside Luna. Autosaves 300 ms after changes."},c.default.createElement(g.LunaSetting,{title:"Path",desc:d},c.default.createElement("div",{style:Ve},c.default.createElement(g.LunaButton,{size:"small",variant:"text",onClick:()=>{yn(d)}},"Copy path"))),c.default.createElement(g.LunaSetting,{title:"Actions",desc:l===""?void 0:l},c.default.createElement("div",{style:Ve},c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Sr()}},"Show folder"),c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{ke()}},"Reload"),c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{fe()}},"Import\u2026"),c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Ae()}},"Export\u2026"))))),c.default.createElement(it,null,c.default.createElement(g.LunaSettings,{title:"Developer",desc:"Logs and test tools are off unless you need to report a bug."},c.default.createElement(g.LunaSwitchSetting,{title:"Developer mode",desc:"Write diagnostics logs and show the Copy diagnostics action.",checked:ee,onChange:s=>v.setDeveloperMode(s.target.checked)}),ee&&c.default.createElement(g.LunaSetting,{title:"Audio engine self-test",desc:_},c.default.createElement("div",{style:Ve},c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",disabled:w,onClick:async()=>{h(!0);try{let s=await ka();N(s.ok?`OK \xB7 ${s.context} \xB7 rms ${s.rms} \xB7 peak ${s.peak} \xB7 \u0394${s.progressionSeconds}s`:`Failed \xB7 ${s.reason??"unknown"} \xB7 context ${s.context}`)}finally{h(!1)}}},w?"Testing\u2026":"Run test"))),ee&&c.default.createElement(g.LunaButtonSetting,{title:"Diagnostics",desc:"Copy player, pitch-engine, effects, theme and media state plus recent logs.",children:a,onClick:async()=>{i("Copying\u2026");let s=await tt(v.get());i(s?"Copied":"Copy failed")}}))))};var Mt=new Set,{trace:Ma}=(0,qe.Tracer)("[PlaybackKit]"),ko=1e3,wo=1500,Zn="tidaluna.playback-speed.previous-quality",Ia=()=>{try{return localStorage.getItem(Zn)}catch{return null}},Po=e=>{try{localStorage.setItem(Zn,e)}catch{}},Ra=()=>{try{localStorage.removeItem(Zn)}catch{}},_a=e=>{let t={to:e},n=ue.redux.actions["settings/SET_STREAMING_QUALITY"];typeof n=="function"?n(t):ue.redux.store.dispatch({type:"settings/SET_STREAMING_QUALITY",payload:t})},La=()=>{let t=(0,qe.findModuleByProperty)((n,r)=>n==="activePlayer"&&typeof r=="object"&&r!==null)?.activePlayer;if(t===void 0)return{found:!1};try{let n=Object.getPrototypeOf(t),r=n===null?[]:Object.getOwnPropertyNames(n).filter(i=>{try{return typeof t[i]=="function"}catch{return!1}}).slice(0,60),a=i=>{try{return t[i]}catch{return}};return{found:!0,name:a("name"),constructor:t.constructor?.name,state:a("playbackState")??a("state"),currentTime:a("currentTime"),methods:r,hasSetPlaybackRate:r.includes("setPlaybackRate"),hasMediaElement:!!(a("mediaElement")??a("video")??a("element"))}}catch(n){return{found:!0,error:String(n)}}},Ca=()=>{let t=(0,qe.findModuleByProperty)((n,r)=>n==="activePlayer"&&typeof r=="object"&&r!==null)?.activePlayer?.name;return t==="nativePlayer"?"native":t==="shakaPlayer"?"shaka":t==="browserPlayer"?"browser":"unknown"},Na,Ba=()=>(Na??=(0,qe.findModuleByProperty)((e,t)=>e==="activePlayer"&&typeof t=="object"&&t!==null),Na?.activePlayer),Xn=()=>{if(Math.abs(v.get().speed-1)>.001){let n=ba();if(n!==null)return n}if(Se()==="native"){let n=Ba()?.currentTime;return typeof n=="number"&&Number.isFinite(n)?n:null}let e=se(),t=e.find(n=>!n.paused&&n.readyState>0)??e.find(n=>n.readyState>0);return t===void 0?null:t.currentTime},Ha=()=>{try{return ue.redux.store.getState().playbackControls?.playbackState==="PLAYING"}catch{return!1}},Eo=e=>{let t=ue.redux.actions["playbackControls/TIME_UPDATE"];typeof t=="function"?t(e):ue.redux.store.dispatch({type:"playbackControls/TIME_UPDATE",payload:e})},To=()=>{try{let e=ue.redux.store.getState().playbackControls;if(e===void 0)return null;let t=e.latestCurrentTime??0;return e.playbackState!=="PLAYING"?t:t+Math.abs(Date.now()-(e.latestCurrentTimeSyncTimestamp??Date.now()))/1e3}catch{return null}},Da={getSpeed:()=>v.get().speed,isPlaying:Ha,getPosition:Xn,dispatchTimeUpdate:Eo},Yn=e=>ca(e.pitchSemitones,e.speed,e.pitchShifts,Se()==="native"&&e.nativeEffects),Mo=()=>{try{let e=ue.redux.store.getState(),t=e.playQueue?.elements?.[e.playQueue.currentIndex??-1]?.mediaItemId,n=t===void 0?void 0:e.content?.mediaItems?.[String(t)];return{setting:e.settings?.quality?.streaming??null,track:n?.audioQuality??null,actual:e.playbackControls?.playbackContext?.actualAudioQuality??null,streamType:e.playbackControls?.playbackContext?.actualStreamType??null,codec:e.playbackControls?.playbackContext?.codec??null,sampleRate:e.playbackControls?.playbackContext?.sampleRate??null,bitDepth:e.playbackControls?.playbackContext?.bitDepth??null}}catch(e){return{error:String(e)}}},Lo=()=>{try{let e=ue.redux.store.getState(),t=e.playQueue,n=t?.elements?.[t.currentIndex??-1]?.mediaItemId;if(n===void 0)return null;let r=e.content?.mediaItems?.[String(n)];return r===void 0?{id:n,found:!1}:{id:n,found:!0,title:r.title,bpm:r.bpm??null,key:r.key??r.keyScale??null,metadataKeys:Object.keys(r).filter(a=>/bpm|key|tempo|tone/i.test(a))}}catch(e){return{error:String(e)}}},Oa=!1,ot,er=()=>vt(v.get(),L.get()),Aa=()=>{Oa&&(ot!==void 0&&clearTimeout(ot),ot=setTimeout(()=>{ot=void 0,Ze(er()).catch(e=>m("error","config save failed",{error:String(e)}))},300))},Co=async()=>{try{let e=await Rt(),t=e===null?void 0:At(e),n=await It();t!==void 0?(v.replace(t.settings),L.replace(t.presets),Et(v,L),m("info","config loaded",{path:n,speed:t.settings.speed,presets:t.presets.length})):(await Ze(er()),m("info",e===null?"config created":"config invalid, rewrote defaults",{path:n}))}catch(e){m("warn","config file unavailable; using browser storage only",{error:String(e)})}finally{Oa=!0}},No=()=>{try{let e=ue.redux.actions["router/PUSH"];if(typeof e!="function")throw new Error("router/PUSH is unavailable");e({pathname:"/not-found",search:"LunaSettings",replace:!0}),m("info","opening Luna settings"),setTimeout(()=>{let n=[...document.querySelectorAll('[role="tab"]')].find(r=>(r.textContent??"").trim()==="Plugins");n!==void 0&&n.getAttribute("aria-selected")!=="true"&&n.click(),setTimeout(()=>{[...document.querySelectorAll("h1,h2,h3,h4,h5,h6,span,p,div")].find(i=>(i.textContent??"").trim()==="@kyoto-aircon/playback-kit")?.scrollIntoView({block:"center",behavior:"smooth"})},250)},250)}catch(e){m("error","open Luna settings failed",{error:String(e)})}},Do=()=>{try{let t=ue.redux.store.getState().settings?.quality?.streaming;if(t==="HIGH"){m("info","already on the browser player quality");return}m("info","switching streaming quality to HIGH",{from:t}),typeof t=="string"&&Po(t),_a("HIGH")}catch(e){m("error","quality switch failed",{error:String(e)})}},Ao=()=>{let e=Ia();e!==null&&(m("info","restoring streaming quality",{to:e}),_a(e),Ra())},qa=()=>{let e=kt();return{load:e.load===void 0?void 0:Ln(e.load),preload:e.preload===void 0?void 0:Ln(e.preload)}},Io=e=>{let t={version:et,logs:Pr,logText:hn,report:()=>bn(v.get()),copy:()=>tt(v.get()),clear:Er,setVerbose:Tr,selectors:_t,playerKind:Se,audioEngine:H,native:Vt,nativeBridge:Pt,nativeStream:qa,nativeVolume:Ut,shadow:Gn,store:v,controller:e};globalThis.__playbackSpeed=t,Mt.add(()=>{globalThis.__playbackSpeed===t&&delete globalThis.__playbackSpeed})};try{gn(v.get().developerMode),Dr(()=>Pt()),Lr(La);try{let o=qe.LunaPlugin.getByName("@kyoto-aircon/playback-speed");o!==void 0&&m("warn","old Playback Speed plugin is still installed",{enabled:o.store?.enabled})}catch{}Nr(()=>({kind:Se(),native:Vt(),nativeInstance:Yr(),nativeVolume:Ut(),speed:v.get().speed,track:Lo(),audioEngine:H(),quality:Mo(),effects:$r(),pitchSemitones:v.get().pitchSemitones,pitchEngine:Rn(),presetId:v.get().presetId,uiTime:To(),actualTime:Xn(),shadow:Gn(),nativeStream:qa()})),Jr(()=>Ba()),An(),m("info","loading",{version:et,selectors:_t(),media:se().length,settings:v.get(),tidal:La(),native:Vt()});let e=_r();Mt.add(()=>Br(e));let t=new Kt(se,v);t.start(),ya(Mt,{getNativePosition:Xn,isPlaying:Ha,setNativeVolume:Xr,getDesiredVolume:Ut,pauseNative:Zr,playNativeAt:ta,seekNative:ea,getSettings:()=>v.get()}),Kn(v.get());let n=v.subscribe(o=>{gn(o.developerMode),Kn(o),Aa(),m("info","settings changed",{speed:o.speed,pitchShifts:o.pitchShifts,bounds:o.bounds}),t.apply(),Se()==="native"&&In(o.speed),Un(Da),jt(Yn(o),o.pitchSemitones,se()),Mn(o.effects,se())});L.subscribe(Aa),Co(),Fr(Mt,v,{getPlayerKind:Se,subscribePlayerKind:da,useBrowserPlayer:Do,previousQuality:Ia,restoreQuality:Ao,presets:{list:()=>L.get().filter(o=>v.get().builtinPresets||o.builtin!==!0),apply:o=>{v.applyPreset(o),m("info","preset applied",{id:o.id,name:o.name})},clear:()=>v.clearPreset(),save:(o,l)=>L.save(o,l),saveActive:o=>{let l=ua(v,L,o);m("info","saved preset from live state",{id:l?.id,builtin:o.builtin===!0})}},getPitchEngineState:Rn,openSettings:No,enableNativeEffects:()=>v.setNativeEffects(!0),onOpen:()=>{let o=v.get();jt(Yn(o),o.pitchSemitones,se())}}),Io(t);let a=setInterval(()=>{t.scan();let o=v.get();jt(Yn(o),o.pitchSemitones,se()),Je(o.effects)&&Mn(o.effects,se())},ko),i=va(Da);Bn(Ca());let d=setInterval(()=>{An();let o=Ca(),l=Se();Bn(o),o!==l&&o==="native"&&(In(v.get().speed),Ra())},wo);Mt.add(()=>{ot!==void 0&&(clearTimeout(ot),Ze(er()).catch(()=>{})),clearInterval(a),clearInterval(d),i(),n(),t.stop(),la(),zr()}),Ma.log("loaded")}catch(e){m("error","failed to load",{error:String(e),stack:e?.stack}),Ma.err("Failed to load:",e)}export{xo as Settings,Mt as unloads};
//# sourceMappingURL=kyoto-aircon.playback-kit.mjs.map
