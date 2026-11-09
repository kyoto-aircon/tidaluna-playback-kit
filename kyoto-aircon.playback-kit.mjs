var $r=Object.create;var Pn=Object.defineProperty;var Fr=Object.getOwnPropertyDescriptor;var zr=Object.getOwnPropertyNames;var Gr=Object.getPrototypeOf,Kr=Object.prototype.hasOwnProperty;var it=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var jr=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of zr(t))!Kr.call(e,a)&&a!==n&&Pn(e,a,{get:()=>t[a],enumerable:!(r=Fr(t,a))||r.enumerable});return e};var Re=(e,t,n)=>(n=e!=null?$r(Gr(e)):{},jr(t||!e||!e.__esModule?Pn(n,"default",{value:e,enumerable:!0}):n,e));var wn=it((hi,Dt)=>{Dt.exports=luna?.core?.modules?.["@luna/core"];if(Dt.exports===void 0)throw new Error("Cannot find module @luna/core in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/core")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Nt=it((bi,At)=>{At.exports=luna?.core?.modules?.["@luna/lib"];if(At.exports===void 0)throw new Error("Cannot find module @luna/lib in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/lib")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var cn=it((co,dn)=>{dn.exports=luna?.core?.modules?.react;if(dn.exports===void 0)throw new Error("Cannot find module react in luna.core.modules");luna.core.LunaPlugin.getByName("react")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var yr=it((uo,un)=>{un.exports=luna?.core?.modules?.["@luna/ui"];if(un.exports===void 0)throw new Error("Cannot find module @luna/ui in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/ui")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Ee=Re(wn(),1),oe=Re(Nt(),1);var _e=[62,125,250,500,1e3,2e3,4e3,8e3],Ve=_e.length,ye=-12,ee=12,E={eq:{enabled:!1,bands:Array.from({length:Ve},()=>0)},bass:{enabled:!1,boost:6,sub:3,drive:.2,mix:.6},eightD:{enabled:!1,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},delay:{enabled:!1,timeMs:250,feedback:.25,mix:.25},reverb:{enabled:!1,decay:2,mix:.25}},A=(e,t,n,r)=>{let a=typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(a)?Math.min(n,Math.max(t,a)):r},Ue=(e,t)=>typeof e=="boolean"?e:t,Ur=e=>{let t=Array.from({length:Ve},()=>0);if(Array.isArray(e.bands)){for(let i=0;i<Ve;i+=1)t[i]=A(e.bands[i],ye,ee,0);return t}let n=A(e.low,ye,ee,0),r=A(e.mid,ye,ee,0),a=A(e.high,ye,ee,0);return[n,n,r,r,r,a,a,a]},K=e=>{let t=typeof e=="object"&&e!==null?e:{},n=typeof t.eq=="object"&&t.eq!==null?t.eq:{},r=typeof t.eightD=="object"&&t.eightD!==null?t.eightD:{},a=typeof t.bass=="object"&&t.bass!==null?t.bass:{},i=typeof t.delay=="object"&&t.delay!==null?t.delay:{},u=typeof t.reverb=="object"&&t.reverb!==null?t.reverb:{};return{eq:{enabled:Ue(n.enabled,E.eq.enabled),bands:Ur(n)},eightD:{enabled:Ue(r.enabled,E.eightD.enabled),rate:A(r.rate,.02,2,E.eightD.rate),panDepth:A(r.panDepth,0,1,E.eightD.panDepth),pitchRate:A(r.pitchRate,.02,2,E.eightD.pitchRate),pitchDepth:A(r.pitchDepth,0,12,E.eightD.pitchDepth),mix:A(r.mix,0,1,E.eightD.mix)},bass:{enabled:Ue(a.enabled,E.bass.enabled),boost:A(a.boost,0,24,E.bass.boost),sub:A(a.sub,0,12,E.bass.sub),drive:A(a.drive,0,1,E.bass.drive),mix:A(a.mix,0,1,E.bass.mix)},delay:{enabled:Ue(i.enabled,E.delay.enabled),timeMs:A(i.timeMs,20,2e3,E.delay.timeMs),feedback:A(i.feedback,0,.9,E.delay.feedback),mix:A(i.mix,0,1,E.delay.mix)},reverb:{enabled:Ue(u.enabled,E.reverb.enabled),decay:A(u.decay,.2,8,E.reverb.decay),mix:A(u.mix,0,1,E.reverb.mix)}}},ot=e=>e.eq.enabled||e.bass.enabled||e.eightD.enabled||e.delay.enabled||e.reverb.enabled,st=e=>{let t=[];return e.eq.enabled&&t.push("EQ 8-band"),e.eightD.enabled&&t.push(`8D ${e.eightD.rate.toFixed(2)} Hz`),e.bass.enabled&&t.push(`Bass +${Math.round(e.bass.boost)} dB`),e.delay.enabled&&t.push(`Delay ${Math.round(e.delay.timeMs)} ms`),e.reverb.enabled&&t.push(`Reverb ${e.reverb.decay.toFixed(1)} s`),t.length===0?"No effects enabled":t.join(" \xB7 ")};var te=e=>Number.isFinite(e)?Math.max(-12,Math.min(12,Math.round(e))):0,En=e=>2**(te(e)/12),We=e=>{let t=te(e);return`${t>0?"+":""}${t}`};var Qe={min:.05,max:10,step:.05},Ye=1;var Vr=6,Be=(e,t=Vr)=>{let n=10**t;return Math.round(e*n)/n},lt=(e,t,n)=>Math.min(n,Math.max(t,e)),Se=e=>{let t=Number(e?.min),n=Number.isFinite(t)?Be(Math.max(.01,t)):Qe.min,r=Number(e?.max),a=Number.isFinite(r)?Be(Math.max(n+.01,r)):Math.max(n+.01,Qe.max),i=Number(e?.step),u=Number.isFinite(i)&&i>0?Be(i):Qe.step;return{min:n,max:a,step:u}},Wr=(e,t)=>{let{min:n,step:r}=t,a=n+Math.round((e-n)/r)*r;return Be(a)},ve=(e,t)=>{let n=Se(t),r=Number.isFinite(e)?e:Ye,a=Wr(r,n);return lt(Be(a),n.min,n.max)},Tn=(e,t,n)=>{let r=Se(n),a=ve(e,r);return ve(a+t*r.step,r)},Qr=e=>{let t=e.includes(".")?e.replace(/0+$/,"").replace(/\.$/,""):e;return t===""||t==="-0"?"0":t},ne=e=>Number.isFinite(e)?Qr(e.toFixed(4)):String(Ye),He=e=>`${ne(e)}\xD7`,Je=(e,t)=>{let{min:n,max:r}=Se(t);if(!(r>n))return 0;let a=Math.log(lt(e,n,r)/n)/Math.log(r/n);return lt(Number.isFinite(a)?a:0,0,1)},Mn=(e,t)=>{let n=Se(t),r=n.min*Math.pow(n.max/n.min,lt(e,0,1));return ve(r,n)},Ln=e=>{let{min:t,max:n}=Se(e),r=[t,1,2,5,10,n],a=new Set,i=[];for(let d of r.sort((s,l)=>s-l)){if(d<t||d>n)continue;let s=ne(d);a.has(s)||(a.add(s),i.push(Be(d)))}let u=[];for(let d of i){let s=u[u.length-1];s!==void 0&&Je(d,e)-Je(s,e)<.07||u.push(d)}return u};var Yr="tidaluna.playback-kit.v1",Xr="tidaluna.playback-speed.v1",Xe=()=>({speed:Ye,pitchShifts:!1,pitchSemitones:0,presetId:null,developerMode:!1,builtinPresets:!0,effects:K(void 0),bounds:{...Qe}}),Cn=e=>{if(e===null)return Xe();let t;try{t=JSON.parse(e)}catch{return Xe()}if(typeof t!="object"||t===null)return Xe();let n=t,r=Se(n.bounds),a=te(typeof n.pitchSemitones=="number"?n.pitchSemitones:0);return{speed:ve(typeof n.speed=="number"?n.speed:Ye,r),pitchShifts:a===0&&n.pitchShifts===!0,pitchSemitones:a,presetId:typeof n.presetId=="string"?n.presetId:null,developerMode:n.developerMode===!0,builtinPresets:n.builtinPresets!==!1,effects:K(n.effects),bounds:r}},Zr=(e,t)=>{let n=e.getItem(t);if(n!==null)return Cn(n);let r=e.getItem(Xr);if(r===null)return Xe();let a=Cn(r);return a.presetId=null,a},ea=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&e.presetId===t.presetId&&e.developerMode===t.developerMode&&e.builtinPresets===t.builtinPresets&&JSON.stringify(e.effects)===JSON.stringify(t.effects)&&e.bounds.min===t.bounds.min&&e.bounds.max===t.bounds.max&&e.bounds.step===t.bounds.step,It=(e,t=Yr)=>{let n=Zr(e,t),r=new Set,a=()=>({...n,bounds:{...n.bounds}}),i=d=>{if(ea(n,d))return;n=d;try{e.setItem(t,JSON.stringify(n))}catch{}let s=a();for(let l of[...r])try{l(s)}catch(m){console.error("[PlaybackKit] listener failed",m)}},u=d=>({...n,...d});return{get:a,subscribe(d){return r.add(d),()=>r.delete(d)},setSpeed(d){i(u({speed:ve(d,n.bounds)}))},step(d){i(u({speed:Tn(n.speed,d,n.bounds)}))},setPitchShifts(d){i(u({pitchShifts:d,pitchSemitones:d?0:n.pitchSemitones}))},setPitchSemitones(d){let s=te(d);i(u({pitchSemitones:s,pitchShifts:s===0?n.pitchShifts:!1}))},setBounds(d){let s=Se({...n.bounds,...d});i({...n,bounds:s,speed:ve(n.speed,s)})},applyPreset(d){let s=te(d.pitchSemitones);i({...n,speed:ve(d.speed,n.bounds),pitchShifts:s===0&&d.pitchShifts===!0,pitchSemitones:s,effects:K(d.effects),presetId:d.id})},setEffects(d){i({...n,effects:K(d)})},setDeveloperMode(d){i({...n,developerMode:d})},setBuiltinPresets(d){i({...n,builtinPresets:d})},clearPreset(){i({...n,presetId:null})},replace(d){let s=Se(d.bounds),l=te(d.pitchSemitones);i({speed:ve(d.speed,s),pitchShifts:l===0&&d.pitchShifts===!0,pitchSemitones:l,presetId:typeof d.presetId=="string"?d.presetId:null,developerMode:d.developerMode===!0,builtinPresets:d.builtinPresets!==!1,effects:K(d.effects),bounds:s})},reset(){i({...Xe(),developerMode:n.developerMode,builtinPresets:n.builtinPresets,presetId:null,bounds:{...n.bounds}})},destroy(){r.clear()}}},Dn=new Map,Rt=()=>{try{if(typeof localStorage<"u"){let e="__lunakit_probe__";return localStorage.setItem(e,"1"),localStorage.removeItem(e),localStorage}}catch{}return{getItem:e=>Dn.get(e)??null,setItem:(e,t)=>{Dn.set(e,t)}}},v=It(Rt());var ta="tidaluna.playback-kit.presets.v1",Ht="nightcore",fe=e=>K({...E,...e,eq:{...E.eq,...e.eq??{}},bass:{...E.bass,...e.bass??{}},eightD:{...E.eightD,...e.eightD??{}},delay:{...E.delay,...e.delay??{}},reverb:{...E.reverb,...e.reverb??{}}}),na={id:Ht,name:"Nightcore",speed:1.35,pitchShifts:!0,pitchSemitones:0,effects:fe({}),builtin:!0},ra={id:"slowcore",name:"Slowcore",speed:.8,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:4,mix:.35}}),builtin:!0},aa={id:"big-bass",name:"Big Bass",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({eq:{enabled:!0,bands:[3,2,0,0,0,0,0,1]},bass:{enabled:!0,boost:14,sub:6,drive:.5,mix:1}}),builtin:!0},ia={id:"eight-d",name:"8D Orbit",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({eightD:{enabled:!0,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},oa={id:"dub-echo",name:"Dub Echo",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({delay:{enabled:!0,timeMs:450,feedback:.45,mix:.28}}),builtin:!0},sa={id:"daycore",name:"Daycore",speed:.85,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},la={id:"chipmunk",name:"Chipmunk",speed:1.6,pitchShifts:!0,pitchSemitones:0,effects:fe({}),builtin:!0},da={id:"vaporwave",name:"Vaporwave",speed:.7,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:5,mix:.35},delay:{enabled:!0,timeMs:300,feedback:.3,mix:.2}}),builtin:!0},ca={id:"submerge",name:"Submerge",speed:.95,pitchShifts:!1,pitchSemitones:0,effects:fe({bass:{enabled:!0,boost:10,sub:5,drive:.3,mix:.6},eightD:{enabled:!0,rate:.1,panDepth:.75,pitchRate:.25,pitchDepth:2,mix:.85}}),builtin:!0},ua={id:"clear-voice",name:"Clear Voice",speed:1.15,pitchShifts:!1,pitchSemitones:0,effects:fe({eq:{enabled:!0,bands:[-4,-2,1,2,2,1,0,0]}}),builtin:!0},An=[na,sa,ra,la,da,aa,ca,ia,oa,ua],Ze=new Set(An.map(e=>e.id)),pa=24,fa=.05,ma=16,_t=e=>{if(typeof e!="string")return;let t=e.trim().slice(0,pa);return t===""?void 0:t},Bt=e=>{let t=Number(e);return Number.isFinite(t)?Math.max(fa,Math.min(ma,t)):1},Nn=(e,t)=>{if(typeof e!="object"||e===null)return;let n=e,r=typeof n.id=="string"?n.id:void 0,a=_t(n.name);if(!(r===void 0||a===void 0||Ze.has(r)||t.has(r)))return t.add(r),{id:r,name:a,speed:Bt(n.speed),pitchShifts:n.pitchShifts===!0,pitchSemitones:te(typeof n.pitchSemitones=="number"?n.pitchSemitones:0),effects:K(n.effects)}},ga=e=>{if(e===null)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(!Array.isArray(t))return[];let n=new Set,r=[];for(let a of t){let i=Nn(a,n);i!==void 0&&r.push(i)}return r},ha=(e,t)=>{if(e.eq.enabled!==t.eq.enabled||e.eq.bands.length!==t.eq.bands.length)return!1;for(let i=0;i<e.eq.bands.length;i+=1)if(e.eq.bands[i]!==t.eq.bands[i])return!1;let n=["enabled","boost","sub","drive","mix"];for(let i of n)if(e.bass[i]!==t.bass[i])return!1;let r=["enabled","rate","panDepth","pitchRate","pitchDepth"];for(let i of r)if(e.eightD[i]!==t.eightD[i])return!1;let a=["enabled","timeMs","feedback","mix"];for(let i of a)if(e.delay[i]!==t.delay[i])return!1;return e.reverb.enabled===t.reverb.enabled&&e.reverb.decay===t.reverb.decay&&e.reverb.mix===t.reverb.mix},et=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&ha(e.effects,t.effects),Ot=(e,t=ta)=>{let n=ga(e.getItem(t)),r=new Set,a=0,i=()=>{try{e.setItem(t,JSON.stringify(n))}catch{}},u=()=>{for(let s of[...r])try{s()}catch{}},d=()=>[...An.map(s=>({...s})),...n.map(s=>({...s}))];return{get:d,getById(s){return d().find(l=>l.id===s)},save(s,l){let m=_t(s);if(m===void 0)return;a+=1;let k={id:`custom-${Date.now().toString(36)}-${a}`,name:m,speed:Bt(l.speed),pitchShifts:l.pitchShifts===!0,pitchSemitones:te(l.pitchSemitones),effects:K(l.effects)};return n.push(k),i(),u(),{...k}},remove(s){if(Ze.has(s))return!1;let l=n.filter(m=>m.id!==s);return l.length===n.length?!1:(n=l,i(),u(),!0)},rename(s,l){if(Ze.has(s))return!1;let m=_t(l),k=n.find(P=>P.id===s);return m===void 0||k===void 0?!1:(k.name=m,i(),u(),!0)},update(s,l){if(Ze.has(s))return!1;let m=n.find(k=>k.id===s);return m===void 0?!1:(m.speed=Bt(l.speed),m.pitchShifts=l.pitchShifts===!0,m.pitchSemitones=te(l.pitchSemitones),m.effects=K(l.effects),i(),u(),!0)},move(s,l){if(Ze.has(s))return!1;let m=n.findIndex(h=>h.id===s),k=m+Math.sign(l);if(m<0||k<0||k>=n.length)return!1;let[P]=n.splice(m,1);return n.splice(k,0,P),i(),u(),!0},replace(s){let l=new Set;n=s.filter(m=>m.builtin!==!0).map(m=>Nn(m,l)).filter(m=>m!==void 0),i(),u()},subscribe(s){return r.add(s),()=>r.delete(s)}}},M=Ot(Rt());var qt=1,In=e=>({getItem:()=>e,setItem:()=>{}}),dt=e=>{if(e==null)return;let t;try{t=JSON.parse(e)}catch{return}if(typeof t!="object"||t===null)return;let n=t;if(n.version!==qt)return;let r=It(In(JSON.stringify(n.settings??{}))).get(),a=Ot(In(JSON.stringify(n.presets??[]))).get().filter(u=>u.builtin!==!0),i=new Set([Ht,...a.map(u=>u.id)]);return r.presetId!==null&&!i.has(r.presetId)&&(r.presetId=null),{version:qt,settings:r,presets:a}},tt=(e,t)=>`${JSON.stringify({version:qt,settings:e,presets:t.filter(n=>n.builtin!==!0)},null,2)}
`;var Te=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/config.native.ts",'"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var P=(e,n)=>{for(var t in n)p(e,t,{get:n[t],enumerable:!0})},w=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of m(n))!h.call(e,s)&&s!==t&&p(e,s,{get:()=>n[s],enumerable:!(o=d(n,s))||o.enumerable});return e};var y=e=>w(p({},"__esModule",{value:!0}),e);var A={};P(A,{exportConfig:()=>F,getConfigPath:()=>k,importConfig:()=>S,readConfig:()=>v,revealConfig:()=>D,writeConfig:()=>x});module.exports=y(A);var l=require,i=l("path"),r=()=>l("fs/promises"),b=()=>l("fs"),u=()=>l("electron"),g=()=>process.env.HOME??process.env.USERPROFILE??"",f=()=>process.platform==="win32"?process.env.APPDATA??i.join(g(),"AppData","Roaming"):process.platform==="darwin"?i.join(g(),"Library","Application Support"):i.join(g(),".config"),j=()=>{let e=f(),n=b(),t=[],o=process.resourcesPath;o!==void 0&&(t.push(i.basename(i.dirname(i.dirname(o)))),t.push(i.basename(i.dirname(o)))),t.push("TIDAL","Tidal","tidal","tidal-hifi");for(let s of t)if(!(s===""||s==="Contents"||s==="resources")&&n.existsSync(i.join(e,s)))return s;return"TIDAL"},c=()=>i.join(f(),j(),"playback-kit"),a=()=>i.join(c(),"config.json"),k=async()=>a(),v=async()=>{try{return await r().readFile(a(),"utf8")}catch{return null}},x=async e=>{await r().mkdir(c(),{recursive:!0});let n=`${a()}.tmp`;return await r().writeFile(n,e,"utf8"),await r().rename(n,a()),a()},F=async e=>{let t=await u().dialog.showSaveDialog({title:"Export Playback Kit config",defaultPath:i.join(f(),"playback-kit.json"),filters:[{name:"JSON",extensions:["json"]}]});return t.canceled||t.filePath===void 0?null:(await r().writeFile(t.filePath,e,"utf8"),t.filePath)},S=async()=>{let n=await u().dialog.showOpenDialog({title:"Import Playback Kit config",properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]}),t=n.filePaths[0];return n.canceled||t===void 0?null:{path:t,json:await r().readFile(t,"utf8")}},D=async()=>{await r().mkdir(c(),{recursive:!0}),await u().shell.openPath(c())};0&&(module.exports={exportConfig,getConfigPath,importConfig,readConfig,revealConfig,writeConfig});\n');if(Te===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/config.native.ts");var Rn=(...e)=>__ipcRenderer.invoke(Te,"exportConfig",...e),ct=(...e)=>__ipcRenderer.invoke(Te,"getConfigPath",...e),_n=(...e)=>__ipcRenderer.invoke(Te,"importConfig",...e),ut=(...e)=>__ipcRenderer.invoke(Te,"readConfig",...e),Bn=(...e)=>__ipcRenderer.invoke(Te,"revealConfig",...e),Oe=(...e)=>__ipcRenderer.invoke(Te,"writeConfig",...e);var qe="2.14.3";var Pe=[],Hn=!0,On=!1,qn=e=>{if(e!==void 0)try{return JSON.parse(JSON.stringify(e))}catch{try{return String(e)}catch{return"[unserialisable]"}}},Ft=e=>{On=e,e||(Pe.length=0)};var b=(e,t,n)=>{if(!On)return;let r={at:Date.now(),level:e,message:t,data:qn(n)};if(Pe.push(r),Pe.length>500&&Pe.shift(),!(e==="debug"&&!Hn))try{let a=e==="error"?console.error:e==="warn"?console.warn:console.debug;n===void 0?a(`[PlaybackKit] ${t}`):a(`[PlaybackKit] ${t}`,n)}catch{}},$n=()=>Pe.map(e=>({...e})),zt=()=>Pe.map(e=>`${new Date(e.at).toISOString()} ${e.level.toUpperCase().padEnd(5)} ${e.message}${e.data===void 0?"":` ${JSON.stringify(e.data)}`}`).join(`
`),Fn=()=>{Pe.length=0},zn=e=>{Hn=e};var ba=e=>({tag:e.tagName.toLowerCase(),id:e.id,class:typeof e.className=="string"?e.className:"",src:(e.currentSrc||e.src||"").slice(0,140),paused:e.paused,readyState:e.readyState,networkState:e.networkState,currentTime:Number(e.currentTime.toFixed(3)),duration:Number.isFinite(e.duration)?Number(e.duration.toFixed(3)):e.duration,playbackRate:e.playbackRate,defaultPlaybackRate:e.defaultPlaybackRate,preservesPitch:e.preservesPitch,muted:e.muted,volume:e.volume,connected:e.isConnected,parent:e.parentElement===null?null:e.parentElement.id||e.parentElement.className}),ya=()=>typeof document>"u"?[]:[...document.querySelectorAll("video,audio")].map(ba),pt=()=>{if(typeof document>"u")return{};let e=document.getElementById("tidal-player-root");return{playerRoot:e!==null,rootChildCount:e?.children.length??0,rootChildren:e===null?[]:[...e.children].map(t=>`${t.tagName.toLowerCase()}#${t.id||"-"}`),scopedMedia:document.querySelectorAll("#tidal-player-root video, #tidal-player-root audio").length,videoOne:document.getElementById("video-one")!==null,videoTwo:document.getElementById("video-two")!==null,allMedia:document.querySelectorAll("video,audio").length,footer:document.querySelector('[data-test="footer-player"]')!==null}},va=e=>new Promise(t=>setTimeout(t,e)),Sa=async(e=1500)=>{if(typeof document>"u")return[];let t=[...document.querySelectorAll("video,audio")],n=t.map(r=>({id:r.id,tag:r.tagName.toLowerCase(),time:r.currentTime,paused:r.paused}));return await va(e),t.map((r,a)=>{let i=n[a],u=r.currentTime-i.time,d=e/1e3;return{id:i.id,tag:i.tag,paused:r.paused,deltaSeconds:Number(u.toFixed(3)),observedRate:Number((u/d).toFixed(3)),expectedRate:r.playbackRate}})},Gn,Kn=e=>{Gn=e},jn,Un=e=>{jn=e},$t,Vn=e=>{$t=e},xa=4e3,ka=async()=>{if($t===void 0)return{registered:!1};try{return await Promise.race([$t(),new Promise((e,t)=>setTimeout(()=>t(new Error("native probe timed out")),xa))])}catch(e){return{error:String(e)}}},Pa=()=>{try{return jn?.()??{}}catch(e){return{error:String(e)}}},wa=()=>{try{return Gn?.()??{registered:!1}}catch(e){return{error:String(e)}}},Ea=["--wave-color-solid-accent-fill","--wave-color-solid-accent-bright","--wave-color-solid-base-fill","--wave-color-solid-base-brighter","--wave-color-solid-base-brightest","--wave-color-solid-contrast-fill","--wave-color-solid-contrast-dark","--wave-color-opacity-contrast-fill-ultra-thin","--wave-color-opacity-contrast-fill-thin","--wave-color-opacity-contrast-fill-thick","--wave-color-solid-warning-fill","--wave-color-text-danger","--market-core-text-10-color","--market-core-text-20-color","--market-core-fill-white-color","--baseFontSize","--baseLineHeight","--remRatio"],Ta=()=>{if(typeof document>"u")return{};let e=document.getElementById("wimp")??document.querySelector('[data-test="footer-player"]')??document.documentElement,t=getComputedStyle(e),n={};for(let a of Ea){let i=t.getPropertyValue(a).trim();i!==""&&(n[a]=i)}let r=a=>{let i=document.querySelector(a);if(i===null)return null;let u=getComputedStyle(i);return{color:u.color,background:u.backgroundColor,fontFamily:u.fontFamily,fontSize:u.fontSize,lineHeight:u.lineHeight,borderRadius:u.borderRadius,height:u.height}};return{root:e.id!==""?`#${e.id}`:e.tagName.toLowerCase(),fontSize:t.fontSize,fontFamily:t.fontFamily,tokens:n,elements:{footer:r('[data-test="footer-player"]'),utilityButtons:r('[data-test="footer-player"] [class*="utilityButtons"]'),volume:r('[data-test="footer-player"] [class*="sliderContainer"]'),qualityBadge:r("[data-test-quality-badge-streaming-quality]"),progressBar:r('[data-test="progress-bar"]')}}},Gt=async e=>{b("info","building diagnostics report");let t=await Sa(),n=await ka();return[`Playback Kit v${qe}`,`at: ${new Date().toISOString()}`,`url: ${typeof location>"u"?"?":location.href}`,`ua: ${typeof navigator>"u"?"?":navigator.userAgent}`,`visibility: ${typeof document>"u"?"?":document.visibilityState}`,`settings: ${JSON.stringify(qn(e))}`,`selectors: ${JSON.stringify(pt())}`,`player: ${JSON.stringify(Pa())}`,`nativeProbe: ${JSON.stringify(n)}`,`tidal: ${JSON.stringify(wa())}`,`progression: ${JSON.stringify(t)}`,`media: ${JSON.stringify(ya())}`,`theme: ${JSON.stringify(Ta())}`,"",`--- logs (${Pe.length}) ---`,zt()].join(`
`)},$e=async e=>Kt(await Gt(e)),Kt=async e=>{try{if(typeof navigator<"u"&&navigator.clipboard?.writeText!==void 0)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}catch{return!1}};var Ma=400,Wn=100,La=5e-4,Ca="__playbackKitAudioState",jt=globalThis[Ca]??={sources:new Map},re=jt.context,Le,Me,Fe,ae=[],nt=jt.sources,ft=new Map,Da="__playbackKitWorklets",Qn=globalThis[Da]??=new Set,Jn=e=>new Promise(t=>setTimeout(t,e)),me=async()=>{if(re===void 0){let e=window.AudioContext??window.webkitAudioContext;if(e===void 0)throw new Error("Web Audio is unavailable");re=new e({latencyHint:"playback"}),jt.context=re,b("info","audio context created",{sampleRate:re.sampleRate,state:re.state})}if(re.state==="suspended")try{await Promise.race([re.resume(),Jn(250)])}catch{}return re},Ut=()=>{if(Le===void 0||Me===void 0)return;Le.disconnect();for(let t of ae)try{t.output.disconnect()}catch{}let e=Le;for(let t of ae)e.connect(t.input),e=t.output;e.connect(Me)},mt=async()=>{let e=await me();if(Le===void 0||Me===void 0){Le=e.createGain(),Me=e.createGain(),Fe=e.createAnalyser(),Fe.fftSize=2048,Me.connect(Fe),Me.connect(e.destination);for(let t of nt.values()){try{t.disconnect()}catch{}t.connect(Le)}}return Ut(),{ctx:e,input:Le,output:Me}},Vt=async(e,t)=>{if(ft.has(t))return ft.get(t);if(Qn.has(t))return;let n=await me(),r=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),a=(async()=>{let i;try{await Promise.race([n.audioWorklet.addModule(r),new Promise((u,d)=>{i=setTimeout(()=>d(new Error(`Timed out loading worklet ${t}`)),Ma*10)})])}finally{i!==void 0&&clearTimeout(i),URL.revokeObjectURL(r)}})();ft.set(t,a);try{await a,Qn.add(t)}catch(i){throw ft.delete(t),i}},Ce=async e=>{let{ctx:t,input:n}=await mt();if(nt.has(e))return;if(e.mediaKeys!==null&&e.mediaKeys!==void 0)throw new Error("protected media (DRM) cannot be routed through Web Audio");let r=t.createMediaElementSource(e);r.connect(n),nt.set(e,r),b("info","audio engine attached element",{id:e.id,sources:nt.size})},Wt=async(e,t)=>{await gt(e,e,t)},gt=async(e,t,n)=>{if(await mt(),ae.some(a=>a.input===e))return;let r=n===void 0?ae.length:Math.max(0,Math.min(ae.length,n));ae.splice(r,0,{input:e,output:t}),Ut(),b("debug","audio engine inserted group",{index:r,nodes:ae.length})},Aa=async e=>{await mt();let t=ae.findIndex(r=>r.input===e||r.output===e);if(t<0)return!1;let[n]=ae.splice(t,1);try{n.output.disconnect()}catch{}return Ut(),!0},Na=()=>ae.map(e=>e.input),R=()=>({context:re===void 0?"none":re.state,sampleRate:re?.sampleRate,sources:nt.size,nodes:ae.length}),Qt=async(e=1200)=>{let{ctx:t}=await mt();if(Fe===void 0)throw new Error("analyser unavailable");let n=Math.max(1,Math.round(e/Wn)),r=new Float32Array(Fe.fftSize),a=0,i=0,u=0;for(let s=0;s<n;s+=1){if(await Jn(Wn),t.state!=="running")continue;Fe.getFloatTimeDomainData(r);let l=0,m=0;for(let k of r){let P=Math.abs(k);P>l&&(l=P),m+=k*k}a=Math.max(a,l),i+=m/r.length,u+=1}let d=u===0?0:Math.sqrt(i/u);return{rms:d,peak:a,samples:u,silent:d<La,durationMs:e}},Ia=()=>({version:1,ensureContext:me,loadWorklet:Vt,attach:Ce,insert:Wt,insertGroup:gt,remove:Aa,list:Na,status:R,measureRms:Qt}),Yn=()=>{let e=Ia();return globalThis.__playbackKitAudio=e,e},Xn=e=>{globalThis.__playbackKitAudio===e&&delete globalThis.__playbackKitAudio};var tr=Re(Nt(),1);var Zn=`
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
`;var Jt=1e4,er=12,ht=8,Ba=1e3,Ha='<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>',Yt=(e,t,n)=>Math.min(n,Math.max(t,e)),Oa=()=>document.querySelector('[data-test="footer-player"] [class*="utilityButtons"]'),qa=e=>{switch(e){case"HI_RES_LOSSLESS":return"Max";case"HI_RES":return"Hi-Res";case"LOSSLESS":return"Lossless";case"HIGH":return"High";case"LOW":return"Low";default:return e}},nr=(e,t,n={})=>{new tr.StyleTag("lunaspeed-styles",e,Zn);let r=document.createElement("div");r.className="lunaspeed-ctl",r.dataset.lunaspeed="control";let a=document.createElement("button");a.type="button",a.className="lunaspeed-step",a.textContent="\u2212",a.setAttribute("aria-label","Slower");let i=document.createElement("button");i.type="button",i.className="lunaspeed-pill",i.setAttribute("aria-label","Playback speed"),i.setAttribute("aria-haspopup","dialog"),i.innerHTML=`${Ha}<span class="lunaspeed-pill-label"></span>`;let u=i.querySelector(".lunaspeed-pill-label"),d=document.createElement("button");d.type="button",d.className="lunaspeed-step",d.textContent="+",d.setAttribute("aria-label","Faster"),r.append(a,i,d);let s=document.createElement("div");s.className="lunaspeed-popover",s.setAttribute("role","dialog"),s.setAttribute("aria-label","Playback settings"),s.hidden=!0,s.innerHTML=`
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
			<input class="lunaspeed-range" type="range" min="0" max="${Jt}" step="1" aria-label="Playback speed slider" />
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
		</div>`;let l=s.querySelector(".lunaspeed-value"),m=s.querySelector(".lunaspeed-presets"),k=s.querySelector(".lunaspeed-save-toggle"),P=s.querySelector(".lunaspeed-save"),h=s.querySelector(".lunaspeed-save-input"),N=s.querySelector(".lunaspeed-save-cancel"),C=s.querySelector(".lunaspeed-slider"),L=s.querySelector(".lunaspeed-range"),xe=s.querySelector(".lunaspeed-ticks"),Q=s.querySelector(".lunaspeed-pitch-value"),S=[...s.querySelectorAll(".lunaspeed-pitch-step")],se=s.querySelector(".lunaspeed-switch"),le=s.querySelector(".lunaspeed-reset"),H=s.querySelector(".lunaspeed-copy"),J=s.querySelector(".lunaspeed-settings"),_=s.querySelector(".lunaspeed-pitch-dot"),O=s.querySelector(".lunaspeed-warning"),B=s.querySelector(".lunaspeed-warning-action"),G=s.querySelector(".lunaspeed-quality"),de=s.querySelector(".lunaspeed-quality-action"),he="",Y="",q=!1,ce=!1,ue,o,f=p=>{C.style.setProperty("--lunaspeed-pos",String(Yt(p,0,1)))},I=(p,y)=>{let x=Je(p,y);L.value=String(Math.round(x*Jt)),f(x)},Ne=()=>{let{bounds:p}=t.get(),y=`${p.min}:${p.max}`;y!==he&&(he=y,xe.replaceChildren(...Ln(p).map(x=>{let T=document.createElement("span");return T.className="lunaspeed-tick",T.style.left=`${(Je(x,p)*100).toFixed(3)}%`,T.textContent=He(x),T})))},ke=p=>p===null?"Custom":n.presets?.list().find(y=>y.id===p)?.name??"Custom",hn=()=>{let p=n.presets;if(p===void 0){m.hidden=!0,P.hidden=!0;return}let y=p.list(),x=t.get(),T=x.presetId,$=y.find(D=>D.id===T),X=$!==void 0&&!et($,x),pe=`${y.map(D=>`${D.id}:${D.name}`).join("|")}::${T??""}::${X}`;if(pe===Y)return;Y=pe;let Z=[],F=document.createElement("button");F.type="button",F.className="lunaspeed-preset",F.textContent="Custom",F.dataset.active=String(T===null),F.setAttribute("aria-pressed",String(T===null)),F.addEventListener("click",()=>p.clear()),Z.push(F);for(let D of y){let be=document.createElement("button");be.type="button",be.className="lunaspeed-preset";let Ct=T===D.id;be.textContent=Ct&&X?`${D.name} *`:D.name,be.dataset.active=String(Ct),be.setAttribute("aria-pressed",String(Ct)),be.dataset.builtin=String(D.builtin===!0),be.title=`${D.name} \u2014 ${He(D.speed)} \xB7 ${D.pitchShifts?"pitch follows speed":D.pitchSemitones!==0?`pitch ${We(D.pitchSemitones)} st`:"pitch preserved"} \xB7 ${st(D.effects)}`,be.addEventListener("click",()=>p.apply(D)),Z.push(be)}m.replaceChildren(...Z)},Br=(p,y)=>{Q.textContent=`${We(p)} st`;for(let x of S){let T=Number(x.dataset.delta);x.disabled=T<0?p<=-12:p>=12,x.title=T<0?"Lower pitch by 1 semitone":"Raise pitch by 1 semitone"}se.setAttribute("aria-checked",String(y))},bn=p=>{let y=n.getPitchEngineState?.(),x=p===0?"idle":y?.status??"idle";_.dataset.status=x;let T=x==="running"?"Pitch engine active":x==="waiting"?"Pitch engine waiting for the audio element":x==="unavailable"?"Pitch engine unavailable"+(y?.reason===void 0?"":": "+y.reason):x==="ready"?"Pitch engine ready":"Pitch engine idle";_.title=p===0?"":T,_.setAttribute("aria-label",p===0?"":T)},Tt=p=>{O.hidden=p!=="native";let y=n.previousQuality?.()??null,x=p!=="native"&&y!==null;G.hidden=!x,x&&y!==null&&(de.textContent=`Restore ${qa(y)}`)},Mt=()=>{let p=t.get(),{speed:y,pitchShifts:x,pitchSemitones:T,bounds:$,presetId:X}=p,pe=He(y);u.textContent=pe,i.dataset.active=String(y!==1||x||T!==0);let Z=n.presets?.list().find(D=>D.id===X),F=Z!==void 0&&!et(Z,p);i.title=`Playback ${pe}${X===null?"":` \xB7 ${ke(X)}${F?" *":""}`}`,a.setAttribute("aria-label",`Slower by ${He($.step)}`),d.setAttribute("aria-label",`Faster by ${He($.step)}`),a.title=`\u2212${ne($.step)}\xD7`,d.title=`+${ne($.step)}\xD7`,l.textContent=ne(y),ce||I(y,$),L.setAttribute("aria-valuetext",pe),Ne(),hn(),Br(T,x),bn(T),H.hidden=!p.developerMode,q&&Lt()},Lt=()=>{let p=i.getBoundingClientRect(),y=s.offsetWidth||348,x=s.offsetHeight||240,T=Yt(p.left+p.width/2-y/2,ht,window.innerWidth-y-ht),$=p.top-x-er,X="top";$<ht&&($=Math.min(p.bottom+er,window.innerHeight-x-ht),X="bottom"),s.style.left=`${Math.round(T)}px`,s.style.top=`${Math.round($)}px`,s.dataset.side=X;let pe=Yt(p.left+p.width/2-T,18,y-18);s.style.setProperty("--lunaspeed-caret",`${Math.round(pe)}px`)},yn=p=>{let y=p.target;y!==null&&(s.contains(y)||r.contains(y)||Ie())},vn=p=>{p.key==="Escape"&&(p.preventDefault(),Ie(),i.focus())},Sn=()=>{q&&Lt()},Hr=()=>{q||(q=!0,s.hidden=!1,i.dataset.open="true",Mt(),Tt(n.getPlayerKind?.()??"unknown"),Lt(),n.onOpen?.(),document.addEventListener("pointerdown",yn,!0),document.addEventListener("keydown",vn,!0),window.addEventListener("resize",Sn),ue=setInterval(()=>bn(t.get().pitchSemitones),500),b("debug","popover open"))},Ie=()=>{q&&(q=!1,s.hidden=!0,delete i.dataset.open,P.hidden=!0,ue!==void 0&&(clearInterval(ue),ue=void 0),document.removeEventListener("pointerdown",yn,!0),document.removeEventListener("keydown",vn,!0),window.removeEventListener("resize",Sn))},Or=()=>q?Ie():Hr(),xn=()=>{if(!r.isConnected){q&&Ie();let y=Oa();if(y===null)return;let x=y.querySelector('[class*="sliderContainer"]');x!==null&&x.parentElement===y?y.insertBefore(r,x):y.appendChild(r)}let p=document.getElementById("wimp")??document.body;s.parentElement!==p&&p.appendChild(s)};k.addEventListener("click",()=>{if(P.hidden=!P.hidden,P.hidden)return;let p=n.presets?.list().find(y=>y.id===t.get().presetId);h.value=p===void 0?"":p.builtin===!0?`${p.name} (edited)`:p.name,h.focus(),h.select()}),a.addEventListener("click",()=>t.step(-1)),d.addEventListener("click",()=>t.step(1)),i.addEventListener("click",Or),L.addEventListener("pointerdown",()=>{ce=!0,o!==void 0&&clearTimeout(o),delete C.dataset.settling});let Ge=()=>{if(!ce)return;ce=!1;let{speed:p,bounds:y}=t.get();C.dataset.settling="true",I(p,y),o!==void 0&&clearTimeout(o),o=setTimeout(()=>{o=void 0,delete C.dataset.settling},160)};L.addEventListener("change",Ge),window.addEventListener("pointerup",Ge),window.addEventListener("pointercancel",Ge),L.addEventListener("input",()=>{if(L.disabled)return;let p=Number(L.value)/Jt,y=t.get().bounds;f(p),t.setSpeed(Mn(p,y))}),s.addEventListener("keydown",p=>{p.key==="ArrowLeft"||p.key==="ArrowDown"?(p.preventDefault(),t.step(-1)):(p.key==="ArrowRight"||p.key==="ArrowUp")&&(p.preventDefault(),t.step(1))});for(let p of S)p.addEventListener("click",()=>{let y=Number(p.dataset.delta);t.setPitchSemitones(t.get().pitchSemitones+y)});se.addEventListener("click",()=>t.setPitchShifts(!t.get().pitchShifts)),le.addEventListener("click",()=>t.reset()),P.addEventListener("submit",p=>{p.preventDefault();let y=n.presets;if(y===void 0)return;let x=h.value.trim();if(x==="")return;let{speed:T,pitchShifts:$,pitchSemitones:X,effects:pe}=t.get(),Z=y.list().find(F=>F.id===t.get().presetId);if(Z!==void 0&&Z.builtin!==!0&&x===Z.name)y.saveActive(Z);else{let F=y.save(x,{speed:T,pitchShifts:$,pitchSemitones:X,effects:pe});if(F===void 0)return;y.apply(F)}h.value="",P.hidden=!0,Y="",hn(),b("info","preset saved",{name:x})}),N.addEventListener("click",()=>{P.hidden=!0,h.value=""}),J.hidden=n.openSettings===void 0,J.addEventListener("click",()=>{n.openSettings?.(),Ie()});let Ke;H.addEventListener("click",async()=>{Ke!==void 0&&clearTimeout(Ke),H.disabled=!0,H.textContent="Copying\u2026";let p=await $e(t.get());b(p?"info":"error","diagnostics copied",{copied:p}),H.textContent=p?"Copied":"Copy failed",Ke=setTimeout(()=>{H.textContent="Copy diagnostics",H.disabled=!1},1800)});let je;B.addEventListener("click",()=>{n.useBrowserPlayer!==void 0&&(je!==void 0&&clearTimeout(je),B.disabled=!0,B.textContent="Switching\u2026",n.useBrowserPlayer(),b("info","requested browser player from warning"),je=setTimeout(()=>{B.disabled=!1,B.textContent="Use browser player"},2500))}),de.addEventListener("click",()=>{n.restoreQuality!==void 0&&(n.restoreQuality(),G.hidden=!0,b("info","restored original streaming quality"))}),Tt(n.getPlayerKind?.()??"unknown");let kn=n.subscribePlayerKind?.(Tt);kn!==void 0&&e.add(kn),xn(),Mt(),e.add(t.subscribe(Mt));let qr=setInterval(xn,Ba);e.add(()=>{clearInterval(qr),window.removeEventListener("pointerup",Ge),window.removeEventListener("pointercancel",Ge),Ke!==void 0&&clearTimeout(Ke),je!==void 0&&clearTimeout(je),o!==void 0&&clearTimeout(o),Ie(),s.remove(),r.remove()})};var w,we={built:!1,active:[],attached:0},rr=()=>({...we}),$a=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Fa=(e,t)=>{let n=Math.max(1,Math.floor(e.sampleRate*t)),r=e.createBuffer(2,n,e.sampleRate);for(let a=0;a<2;a+=1){let i=r.getChannelData(a);for(let u=0;u<n;u+=1){let d=Math.pow(1-u/n,2.2);i[u]=(Math.random()*2-1)*d}}return r},za=async()=>{let e=await me();if(w!==void 0)return w;let t=e.createGain(),n=_e.map((I,Ne)=>{let ke=e.createBiquadFilter();return ke.frequency.value=I,Ne===0?ke.type="lowshelf":Ne===_e.length-1?ke.type="highshelf":(ke.type="peaking",ke.Q.value=1.2),ke}),r=e.createGain(),a=e.createDelay(2),i=e.createGain(),u=e.createGain(),d=e.createGain(),s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=220,s.Q.value=.7;let l=e.createBiquadFilter();l.type="lowshelf",l.frequency.value=45;let m=e.createBiquadFilter();m.type="lowshelf",m.frequency.value=90;let k=e.createGain(),P=e.createWaveShaper(),h=new Float32Array(2048);for(let I=0;I<h.length;I+=1){let Ne=I/(h.length-1)*2-1;h[I]=Math.tanh(3*Ne)/Math.tanh(3)}P.curve=h,P.oversample="4x";let N=e.createGain(),C=e.createDynamicsCompressor();C.threshold.value=-3,C.knee.value=0,C.ratio.value=20,C.attack.value=.003,C.release.value=.25;let L=e.createGain(),xe=e.createChannelSplitter(2),Q=e.createDelay(.05);Q.delayTime.value=.015;let S=e.createDelay(.05);S.delayTime.value=.015;let se=e.createChannelMerger(2),le=e.createStereoPanner(),H=e.createGain();H.gain.value=1;let J=e.createGain();J.gain.value=0;let _=e.createGain(),O=e.createOscillator();O.type="sine",O.frequency.value=.12;let B=e.createGain();B.gain.value=0;let G=e.createOscillator();G.type="sine",G.frequency.value=.35;let de=e.createGain();de.gain.value=0;let he=e.createGain();he.gain.value=0,O.connect(B),B.connect(le.pan),G.connect(de),G.connect(he),de.connect(Q.delayTime),he.connect(S.delayTime),O.start(),G.start(),L.connect(H),H.connect(_),L.connect(xe),xe.connect(Q,0),xe.connect(S,1),Q.connect(se,0,0),S.connect(se,0,1),se.connect(le),le.connect(J),J.connect(_);let Y=e.createGain(),q=e.createGain(),ce=e.createConvolver(),ue=e.createGain(),o=e.createGain();t.connect(n[0]);for(let I=1;I<n.length;I+=1)n[I-1].connect(n[I]);let f=n[n.length-1];return f.connect(d),d.connect(L),f.connect(s),s.connect(l),l.connect(m),m.connect(k),k.connect(P),P.connect(N),N.connect(L),_.connect(r),_.connect(a),r.connect(Y),a.connect(i),i.connect(Y),a.connect(u),u.connect(a),Y.connect(q),q.connect(C),Y.connect(ce),ce.connect(ue),ue.connect(C),C.connect(o),w={fxIn:t,eqFilters:n,delayDry:r,delayNode:a,delayWet:i,delayFeedback:u,bassDry:d,bassLowpass:s,bassSub:l,bassBoost:m,bassDrive:k,bassShaper:P,bassWet:N,eightDInput:L,eightDSplitter:xe,eightDDelayL:Q,eightDDelayR:S,eightDMerger:se,eightDPanner:le,eightDDry:H,eightDWet:J,eightDOut:_,panLfo:O,panDepth:B,pitchLfo:G,pitchDepthL:de,pitchDepthR:he,limiter:C,reverbIn:Y,reverbDry:q,convolver:ce,reverbWet:ue,fxOut:o,decay:0},await gt(t,o),b("info","effects graph inserted"),w},Ga=(e,t)=>{if(w===void 0)return;let n=e.currentTime,r=.06,a=w;for(let m=0;m<a.eqFilters.length;m+=1){let k=t.eq.enabled?t.eq.bands[m]??0:0;a.eqFilters[m].gain.setTargetAtTime(k,n,r)}let i=t.bass.enabled?t.bass.mix:0;a.bassDry.gain.setTargetAtTime(1,n,r),a.bassWet.gain.setTargetAtTime(i,n,r),a.bassSub.gain.setTargetAtTime(t.bass.enabled?t.bass.sub:0,n,r),a.bassBoost.gain.setTargetAtTime(t.bass.enabled?t.bass.boost:0,n,r),a.bassDrive.gain.setTargetAtTime(t.bass.enabled?1+t.bass.drive*3:1,n,r),a.panLfo.frequency.setTargetAtTime(t.eightD.rate,n,r),a.panDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.panDepth:0,n,r),a.pitchLfo.frequency.setTargetAtTime(t.eightD.pitchRate,n,r);let u=t.eightD.enabled?t.eightD.pitchDepth/1e3:0;a.pitchDepthL.gain.setTargetAtTime(u,n,r),a.pitchDepthR.gain.setTargetAtTime(-u,n,r);let d=t.eightD.enabled?t.eightD.mix:0;a.eightDDry.gain.setTargetAtTime(1-d,n,r),a.eightDWet.gain.setTargetAtTime(d,n,r);let s=t.delay.enabled?t.delay.mix:0;a.delayNode.delayTime.setTargetAtTime(Math.min(2,Math.max(.02,t.delay.timeMs/1e3)),n,r),a.delayFeedback.gain.setTargetAtTime(t.delay.enabled?t.delay.feedback:0,n,r),a.delayWet.gain.setTargetAtTime(s,n,r),a.delayDry.gain.setTargetAtTime(1-s,n,r);let l=t.reverb.enabled?t.reverb.mix:0;Math.abs(a.decay-t.reverb.decay)>.05&&(a.convolver.buffer=Fa(e,t.reverb.decay),a.decay=t.reverb.decay),a.reverbWet.gain.setTargetAtTime(l,n,r),a.reverbDry.gain.setTargetAtTime(1-l,n,r)},Xt=async(e,t)=>{let n=K(e),r=ot(n);if(!r&&w===void 0){we={...we,active:[]};return}try{let a=await me();if(a.state!=="running"&&r){we={built:w!==void 0,context:a.state,active:[],error:"audio context suspended (interact with the page)",attached:R().sources};return}if(r){let u=$a(t);u!==void 0&&await Ce(u)}let i=await za();Ga(a,n),we={built:!0,context:a.state,active:[n.eq.enabled?"eq":"",n.bass.enabled?"bass":"",n.eightD.enabled?"8d":"",n.delay.enabled?"delay":"",n.reverb.enabled?"reverb":""].filter(u=>u!==""),attached:R().sources},i.decay===0&&n.reverb.enabled&&(i.decay=n.reverb.decay)}catch(a){let i=a instanceof Error?a.message:String(a);we={built:w!==void 0,context:R().context,active:[],error:i,attached:R().sources},b("warn","effects engine unavailable",{error:i})}},ar=()=>{if(w!==void 0){let e=w.eqFilters[0].context.currentTime,t=.03;for(let n of w.eqFilters)n.gain.setTargetAtTime(0,e,t);w.bassWet.gain.setTargetAtTime(0,e,t),w.bassDry.gain.setTargetAtTime(1,e,t),w.bassSub.gain.setTargetAtTime(0,e,t),w.bassBoost.gain.setTargetAtTime(0,e,t),w.bassDrive.gain.setTargetAtTime(1,e,t),w.eightDWet.gain.setTargetAtTime(0,e,t),w.eightDDry.gain.setTargetAtTime(1,e,t),w.panDepth.gain.setTargetAtTime(0,e,t),w.pitchDepthL.gain.setTargetAtTime(0,e,t),w.pitchDepthR.gain.setTargetAtTime(0,e,t),w.delayWet.gain.setTargetAtTime(0,e,t),w.delayDry.gain.setTargetAtTime(1,e,t),w.delayFeedback.gain.setTargetAtTime(0,e,t),w.reverbWet.gain.setTargetAtTime(0,e,t),w.reverbDry.gain.setTargetAtTime(1,e,t)}we={...we,active:[],error:void 0}};var sr="#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two",ir=["loadstart","loadedmetadata","canplay","playing","play","emptied","ratechange","seeked"],bt=.001,or=1,Ka=150,yt=e=>{let t=e.id;return typeof t=="string"?t:e.constructor.name},ie=()=>typeof document>"u"?[]:[...document.querySelectorAll(sr)],vt=class{constructor(t,n){this.getElements=t;this.source=n}getElements;source;attachments=new Map;timers=new Set;start(){this.scan()}scan(){let t=this.getElements(),n=0;for(let r of t)this.attachments.has(r)||(this.attach(r),n+=1);n>0?b("info","attached media elements",{added:n,total:this.attachments.size,found:t.length}):t.length===0&&b("debug","no media elements found",{selector:sr})}apply(){this.scan();for(let t of this.attachments.keys())this.applyTo(t,"settings-change")}stop(){for(let t of this.timers)clearTimeout(t);this.timers.clear();for(let[t,n]of this.attachments)n(),this.restore(t);this.attachments.clear(),b("info","controller stopped")}attach(t){let n=r=>{let a=this.source.get().speed,i=t.playbackRate;Math.abs(i-a)>bt&&b("warn","TIDAL reset the rate",{id:yt(t),event:r.type,before:i,desired:a,currentTime:t.currentTime}),this.applyTo(t,r.type),(r.type==="loadstart"||r.type==="emptied")&&this.scheduleReapply(t)};for(let r of ir)t.addEventListener(r,n);this.attachments.set(t,()=>{for(let r of ir)t.removeEventListener(r,n)}),b("info","attached",{id:yt(t),tag:t.constructor.name,rate:t.playbackRate}),this.applyTo(t,"attach")}applyTo(t,n){let{speed:r,pitchShifts:a}=this.source.get(),i=t.playbackRate;try{Math.abs(i-r)>bt&&(t.playbackRate=r),t.defaultPlaybackRate!==void 0&&Math.abs(t.defaultPlaybackRate-r)>bt&&(t.defaultPlaybackRate=r);let d=!a;t.preservesPitch!==void 0&&t.preservesPitch!==d&&(t.preservesPitch=d),t.webkitPreservesPitch!==void 0&&t.webkitPreservesPitch!==d&&(t.webkitPreservesPitch=d)}catch(d){b("error","failed to apply rate",{id:yt(t),reason:n,error:String(d)});return}let u=t.playbackRate;Math.abs(u-i)>bt&&b("debug","applied rate",{id:yt(t),reason:n,before:i,after:u,readback:u,defaultRate:t.defaultPlaybackRate})}scheduleReapply(t){let n=setTimeout(()=>{this.timers.delete(n),this.attachments.has(t)&&this.applyTo(t,"delayed-reapply")},Ka);this.timers.add(n)}restore(t){try{t.playbackRate=or,t.defaultPlaybackRate!==void 0&&(t.defaultPlaybackRate=or),t.preservesPitch!==void 0&&(t.preservesPitch=!0),t.webkitPreservesPitch!==void 0&&(t.webkitPreservesPitch=!0)}catch{}}};var St="__lunaspeedPatched",V,U,lr=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||t.Player===void 0||t.Player.prototype===void 0))return t},Zt=e=>{let t=new Set,n=e,r=0;for(;n!==null&&r<4;){for(let a of Object.getOwnPropertyNames(n))t.add(a);n=Object.getPrototypeOf(n),r+=1}return[...t]},dr=e=>{let t=Zt(e),n=t.find(r=>/^set(playback|audio)?(rate|speed|tempo)$/i.test(r));return n!==void 0&&typeof e[n]=="function"?n:typeof e.playbackRate=="number"?"playbackRate":t.find(r=>/^(playbackRate|rate|speed)$/i.test(r)&&typeof e[r]=="number")},ja=e=>{V!==e&&(V=e,U=dr(e),b("info","native player instance captured",{rateMember:U??null,ownKeys:Object.keys(e).slice(0,40),methods:Zt(e).slice(0,80)}))},en=()=>{let e=lr();if(e===void 0)return!1;let t=e.Player?.prototype;if(t===void 0)return!1;if(t[St]===!0)return!0;try{Object.defineProperty(t,St,{value:!0,enumerable:!1})}catch{return!1}for(let n of["play","load","pause","seek"]){let r=t[n];typeof r=="function"&&(t[n]=function(...i){try{ja(this)}catch(u){b("error","native capture failed",{error:String(u)})}return r.apply(this,i)})}return b("info","native player component patched"),!0},cr=()=>V!==void 0,tn=e=>{if(V===void 0||(U===void 0&&(U=dr(V)),U===void 0))return!1;try{let t=V[U];if(U==="playbackRate"){if(t===e)return!0;V.playbackRate=e}else V[U](e);return b("info","native rate applied",{rate:e,member:U,readback:V[U]}),!0}catch(t){return b("error","native rate failed",{rate:e,member:U,error:String(t)}),!1}},xt=()=>{let e=lr();if(e===void 0)return{present:!1};let t=e.Player?.prototype,n=t===void 0?[]:Object.getOwnPropertyNames(t).filter(r=>r!==St);return{present:!0,patched:t!==void 0&&t[St]===!0,playerMethods:n.slice(0,100),rateMethods:n.filter(r=>/rate|speed|tempo|pitch/i.test(r)),instanceCaptured:V!==void 0,rateMember:U??null,instanceMethods:V===void 0?[]:Zt(V).slice(0,100)}};var kt=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/nativeProbe.native.ts",'"use strict";var u=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var D=(r,e)=>{for(var t in e)u(r,t,{get:e[t],enumerable:!0})},C=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of k(e))!x.call(r,a)&&a!==t&&u(r,a,{get:()=>e[a],enumerable:!(n=M(e,a))||n.enumerable});return r};var R=r=>C(u({},"__esModule",{value:!0}),r);var _={};D(_,{readProbe:()=>I,startProbe:()=>O,stopProbe:()=>U});module.exports=R(_);var A=new Set(["media.load","media.preload"]),H=r=>{let e={origin:null,extension:null,pathLength:0,queryKeys:[],urlLength:r.length};try{let t=new URL(r);if(t.protocol!=="https:"&&t.protocol!=="http:")return e;e.origin=t.origin,e.pathLength=t.pathname.length;let n=t.pathname.slice(t.pathname.lastIndexOf("/")+1),a=n.lastIndexOf(".");a>0&&a<n.length-1&&(e.extension=n.slice(a+1).toLowerCase()),e.queryKeys=[...t.searchParams.keys()].sort()}catch{}return e},b=(r,e=Date.now())=>{if(typeof r!="string")return null;let t;try{t=JSON.parse(r)}catch{return null}if(typeof t!="object"||t===null)return null;let n=t,a=typeof n.command=="string"?n.command:null;if(a===null||!A.has(a))return null;let l=typeof n.url=="string"?n.url:null;return{at:e,command:a,format:typeof n.streamFormat=="string"?n.streamFormat:null,encrypted:typeof n.encryptionKey=="string"&&n.encryptionKey.length>0,...l===null?{origin:null,extension:null,pathLength:0,queryKeys:[],urlLength:0}:H(l)}},v=r=>{let e=Array.from(r.subarray(0,4)).map(n=>n>=32&&n<127?String.fromCharCode(n):".").join(""),t=Array.from(r.subarray(0,16)).map(n=>n.toString(16).padStart(2,"0")).join(" ");return{magic:e,flac:e==="fLaC",hex:t}};var T=require,S=()=>T("electron"),P="player.message",p=128*1024,q=15e3,o={started:!1,events:0},L=null,c=()=>structuredClone(o),K=async r=>{if(L===r)return;L=r;let e=Date.now(),t=new AbortController,n=setTimeout(()=>t.abort(),q);try{let a=await fetch(r,{headers:{Range:`bytes=0-${p-1}`},signal:t.signal}),l={contentType:a.headers.get("content-type"),contentRange:a.headers.get("content-range"),acceptRanges:a.headers.get("accept-ranges"),contentLength:a.headers.get("content-length")},s=0,g=[],d=a.body;if(d!==null){let i=d.getReader();try{for(;s<p;){let{done:N,value:m}=await i.read();if(N)break;if(m===void 0)continue;let f=m.subarray(0,p-s);g.push(f),s+=f.length}}finally{try{await i.cancel()}catch{}}}let h=new Uint8Array(s),y=0;for(let i of g)h.set(i,y),y+=i.length;o.fetch={at:Date.now(),ok:a.ok,status:a.status,...l,bytes:s,head:s===0?null:v(h),elapsedMs:Date.now()-e}}catch(a){o.fetch={at:Date.now(),ok:!1,status:null,contentType:null,contentRange:null,acceptRanges:null,contentLength:null,bytes:0,head:null,elapsedMs:Date.now()-e,error:String(a).split(r).join("[url]")}}finally{clearTimeout(n)}},w=(r,e)=>{let t=b(e);if(t!==null&&(o.events+=1,t.command==="media.load"?o.load=t:o.preload=t,!(t.command!=="media.load"||typeof e!="string")))try{let n=JSON.parse(e).url;typeof n=="string"&&/^https?:\\/\\//i.test(n)&&K(n)}catch{}},O=async()=>{if(o.started)return c();try{S().ipcMain.on(P,w),o.started=!0,delete o.error}catch(r){o.error=String(r)}return c()},U=async()=>{if(o.started){try{S().ipcMain.removeListener(P,w)}catch(r){o.error=String(r)}o.started=!1}return c()},I=async()=>c();0&&(module.exports={readProbe,startProbe,stopProbe});\n');if(kt===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/nativeProbe.native.ts");var nn=(...e)=>__ipcRenderer.invoke(kt,"readProbe",...e),ur=(...e)=>__ipcRenderer.invoke(kt,"startProbe",...e),rn=(...e)=>__ipcRenderer.invoke(kt,"stopProbe",...e);var pr=`
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
`;var fr="playback-kit-pitch",ge,W={status:"idle",semitones:0,attached:0},an=()=>({...W}),Ua=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Va=async e=>(await Vt(pr,fr),ge===void 0&&(ge=new AudioWorkletNode(e,fr,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]}),await Wt(ge,0),b("info","pitch node inserted into audio engine")),ge),Wa=async(e,t)=>{let n=await me();if(n.state!=="running"){W={status:"waiting",reason:"audio context suspended (interact with the page)",semitones:e,context:n.state,attached:W.attached};return}let r=Ua(t);if(r===void 0){W={status:"waiting",reason:"no playing media element",semitones:e,context:n.state,attached:W.attached};return}await Ce(r);let i=(await Va(n)).parameters.get("ratio");i!==void 0&&(i.value=En(e)),W={status:"running",semitones:e,context:n.state,attached:R().sources}},Pt=async(e,t)=>{if(e===0){if(ge!==void 0){let n=ge.parameters.get("ratio");n!==void 0&&(n.value=1)}W={...W,status:ge===void 0?"idle":"ready",semitones:0,reason:void 0};return}try{await Wa(e,t)}catch(n){let r=n instanceof Error?n.message:String(n);W={status:"unavailable",reason:r,semitones:e,attached:W.attached},b("error","pitch engine unavailable",{error:r})}},mr=()=>{if(ge!==void 0){let e=ge.parameters.get("ratio");e!==void 0&&(e.value=1)}W={...W,status:ge===void 0?"idle":"ready",semitones:0,reason:void 0}};var wt="unknown",on=new Set,De=()=>wt,sn=e=>{if(e!==wt){b("info","player kind changed",{from:wt,to:e}),wt=e;for(let t of[...on])try{t(e)}catch(n){b("error","player kind listener failed",{error:String(n)})}}},gr=e=>(on.add(e),()=>on.delete(e));var Qa=(e,t)=>{let n=new Set(e.get().map(a=>a.name));if(!n.has(t))return t;let r=2;for(;n.has(`${t} ${r}`);)r+=1;return`${t} ${r}`},hr=(e,t,n)=>{let r=e.get(),a={speed:r.speed,pitchShifts:r.pitchShifts,pitchSemitones:r.pitchSemitones,effects:r.effects};if(n.builtin===!0){let i=t.save(Qa(t,`${n.name} (edited)`),a);return i!==void 0&&e.applyPreset(i),i}return t.update(n.id,a),n},rt=(e,t)=>{let n=e.get();n.builtinPresets||n.presetId===null||t.getById(n.presetId)?.builtin===!0&&e.clearPreset()};var Ja=e=>Math.abs(e-1)>.001,ln=e=>{if(!Ja(e.getSpeed())||!e.isPlaying())return!1;let t=e.getPosition();return t===null||!Number.isFinite(t)||t<0?!1:(e.dispatchTimeUpdate(t),!0)},br=(e,t=100)=>{let n=setInterval(()=>ln(e),t);return()=>clearInterval(n)};var c=Re(cn(),1),g=Re(yr(),1);var vr=e=>({id:e.id,paused:e.paused,readyState:e.readyState,currentTime:Number(e.currentTime.toFixed(2)),playbackRate:e.playbackRate}),Sr=async(e=1200)=>{let t=Date.now(),n=R(),r=ie(),a=r.find(h=>!h.paused&&h.readyState>0)??r[0];if(a===void 0){let h={at:t,ok:!1,reason:"no media element",context:n.context,engine:n};return b("warn","audio self-test: no media element"),h}let i=a.currentTime;try{await Ce(a)}catch(h){let N={at:t,ok:!1,reason:h instanceof Error?h.message:String(h),context:R().context,element:vr(a),engine:R()};return b("warn","audio self-test failed to attach",N),N}let u=await me(),d=0,s=0,l=!0;try{let h=await Qt(e);d=h.rms,s=h.peak,l=h.silent}catch(h){b("error","audio self-test measurement failed",{error:String(h)})}let m=Number((a.currentTime-i).toFixed(2)),k=u.state!=="running"?`audio context ${u.state}`:a.paused?"playback is paused":l&&m>.2?"captured audio is silent (DRM-protected or already routed elsewhere)":l?"no audio measured":void 0,P={at:t,ok:k===void 0,reason:k,context:u.state,element:vr(a),progressionSeconds:m,rms:Number(d.toFixed(5)),peak:Number(s.toFixed(5)),silent:l,engine:R()};return b(P.ok?"info":"warn","audio self-test",P),P};var j=Re(cn(),1);var Ya=132,xr=ee-ye,pn=e=>Math.max(ye,Math.min(ee,e)),kr=e=>`${e>0?"+":""}${e}`,Pr=e=>e>=1e3?`${e/1e3}k`:String(e),Xa=({frequency:e,value:t,disabled:n,onChange:r})=>{let a=j.default.useRef(null),[i,u]=j.default.useState(null),d=h=>{let N=a.current;if(N===null)return;let C=N.getBoundingClientRect(),L=Math.max(0,Math.min(1,(h-C.top)/C.height));u(L*100),r(pn(Math.round(ee-L*xr)))},s=i??(ee-t)/xr*100,l=50,m=Math.min(s,l),k=Math.abs(s-l),P=i===null;return j.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:30,opacity:n?.4:1}},j.default.createElement("span",{style:{fontSize:10,fontVariantNumeric:"tabular-nums",color:"currentColor",opacity:.8}},kr(t)),j.default.createElement("div",{ref:a,role:"slider",tabIndex:n?-1:0,"aria-label":`${Pr(e)} Hz`,"aria-valuemin":ye,"aria-valuemax":ee,"aria-valuenow":t,"aria-valuetext":`${kr(t)} dB`,"aria-disabled":n,onPointerDown:h=>{n||(h.preventDefault(),h.currentTarget.setPointerCapture(h.pointerId),d(h.clientY))},onPointerMove:h=>{n||!h.currentTarget.hasPointerCapture(h.pointerId)||d(h.clientY)},onPointerUp:h=>{h.currentTarget.hasPointerCapture(h.pointerId)&&h.currentTarget.releasePointerCapture(h.pointerId),u(null)},onPointerCancel:h=>{h.currentTarget.hasPointerCapture(h.pointerId)&&h.currentTarget.releasePointerCapture(h.pointerId),u(null)},onDoubleClick:()=>{n||r(0)},onKeyDown:h=>{if(n)return;let N=h.shiftKey?3:1;if(h.key==="ArrowUp"||h.key==="ArrowRight")r(pn(t+N));else if(h.key==="ArrowDown"||h.key==="ArrowLeft")r(pn(t-N));else if(h.key==="Home")r(ye);else if(h.key==="End")r(ee);else return;h.preventDefault()},style:{position:"relative",width:18,height:Ya,cursor:n?"default":"pointer",touchAction:"none",outline:"none"}},j.default.createElement("div",{style:{position:"absolute",left:"50%",top:0,bottom:0,width:5,transform:"translateX(-50%)",borderRadius:999,background:"color-mix(in srgb, currentColor 16%, transparent)"}}),j.default.createElement("div",{style:{position:"absolute",left:0,right:0,top:`${l}%`,height:1,background:"color-mix(in srgb, currentColor 28%, transparent)"}}),j.default.createElement("div",{style:{position:"absolute",left:"50%",width:5,transform:"translateX(-50%)",borderRadius:999,top:`${m}%`,height:`${k}%`,background:"var(--wave-color-solid-accent-fill, currentColor)",transition:P?"top 120ms ease, height 120ms ease":"none"}}),j.default.createElement("div",{style:{position:"absolute",left:"50%",top:`${s}%`,width:12,height:12,transform:"translate(-50%, -50%)",borderRadius:"50%",background:"currentColor",boxShadow:"0 0 0 3px color-mix(in srgb, var(--wave-color-solid-accent-fill, currentColor) 22%, transparent), 0 1px 3px rgba(0,0,0,.5)",transition:P?"top 120ms ease":"none"}})),j.default.createElement("span",{style:{fontSize:9,opacity:.6,letterSpacing:"-0.02em"}},Pr(e)))},wr=({eq:e,disabled:t,onChange:n})=>j.default.createElement("div",{style:{display:"flex",gap:8,alignItems:"flex-end",marginLeft:"auto",padding:"2px 0"}},_e.map((r,a)=>j.default.createElement(Xa,{key:r,frequency:r,value:e.bands[a]??0,disabled:t,onChange:i=>{let u=[...e.bands];u[a]=i,n(u)}})));var fn=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)&&t>0?t:void 0},z=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)?t:void 0},Za=e=>{let t=e.pitchShifts?"pitch follows speed":e.pitchSemitones===0?"pitch preserved":`pitch ${We(e.pitchSemitones)} st`;return`${ne(e.speed)}\xD7 \xB7 ${t} \xB7 ${st(e.effects)}`},Ae={display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:6,marginLeft:"auto"},at=({children:e})=>c.default.createElement("div",{style:{marginBottom:16}},e),ei=()=>{let[e,t]=c.default.useState(v.get),[n,r]=c.default.useState(M.get),[a,i]=c.default.useState("Copy diagnostics"),[u,d]=c.default.useState("Resolving\u2026"),[s,l]=c.default.useState(""),[m,k]=c.default.useState(null),[P,h]=c.default.useState(!1),[N,C]=c.default.useState("Attaches the playing element, measures captured RMS and reports blocked/silent reasons. May silence playback if capture fails; restart TIDAL to undo.");c.default.useEffect(()=>v.subscribe(t),[]),c.default.useEffect(()=>M.subscribe(()=>r(M.get())),[]),c.default.useEffect(()=>{ct().then(d).catch(()=>d("unavailable"))},[]),c.default.useEffect(()=>{if(a==="Copy diagnostics")return;let o=setTimeout(()=>i("Copy diagnostics"),1800);return()=>clearTimeout(o)},[a]),c.default.useEffect(()=>{if(s==="")return;let o=setTimeout(()=>l(""),4e3);return()=>clearTimeout(o)},[s]);let{bounds:L,pitchShifts:xe,developerMode:Q,effects:S,builtinPresets:se}=e,le=se?n:n.filter(o=>o.builtin!==!0),H=le.findIndex(o=>o.builtin!==!0),J=o=>v.setEffects({...S,eq:{...S.eq,...o}}),_=o=>v.setEffects({...S,bass:{...S.bass,...o}}),O=o=>v.setEffects({...S,eightD:{...S.eightD,...o}}),B=o=>v.setEffects({...S,delay:{...S.delay,...o}}),G=o=>v.setEffects({...S,reverb:{...S.reverb,...o}}),de=async o=>{let f=dt(o);return f===void 0?!1:(v.replace(f.settings),M.replace(f.presets),rt(v,M),await Oe(tt(f.settings,f.presets)),!0)},he=async()=>{try{let o=await _n();if(o===null)return l("Import cancelled");let f=await de(o.json);l(f?`Imported ${o.path}`:"Import failed: invalid config")}catch(o){l(`Import failed: ${String(o)}`)}},Y=async()=>{try{let o=await Rn(tt(v.get(),M.get()));l(o===null?"Export cancelled":`Exported ${o}`)}catch(o){l(`Export failed: ${String(o)}`)}},q=async()=>{try{let o=await ut();if(o===null)return l("Config file not found");let f=await de(o);l(f?"Reloaded from config file":"Reload failed: invalid config")}catch(o){l(`Reload failed: ${String(o)}`)}},ce=o=>{window.confirm(`Overwrite "${o.name}" with the current speed, pitch and effects?`)&&(M.update(o.id,{speed:e.speed,pitchShifts:e.pitchShifts,pitchSemitones:e.pitchSemitones,effects:e.effects}),l(`Updated "${o.name}"`))},ue=o=>{window.confirm(`Delete preset "${o.name}"?`)&&(M.remove(o.id),l(`Deleted "${o.name}"`))};return c.default.createElement("div",{style:{paddingBottom:8}},c.default.createElement(at,null,c.default.createElement(g.LunaSettings,{title:"Playback",desc:"Speed and pitch. Effects live in their own section below."},c.default.createElement(g.LunaTextSetting,{title:"Minimum speed",desc:"Below 0.0625\xD7 Chromium plays at its floor.",defaultValue:ne(L.min),inputProps:{inputMode:"decimal"},onChange:o=>{let f=fn(o.target.value);f!==void 0&&v.setBounds({min:f})}}),c.default.createElement(g.LunaTextSetting,{title:"Maximum speed",defaultValue:ne(L.max),inputProps:{inputMode:"decimal"},onChange:o=>{let f=fn(o.target.value);f!==void 0&&v.setBounds({max:f})}}),c.default.createElement(g.LunaTextSetting,{title:"Snap step",desc:"Slider snapping and the \u2212 / + step size.",defaultValue:ne(L.step),inputProps:{inputMode:"decimal"},onChange:o=>{let f=fn(o.target.value);f!==void 0&&v.setBounds({step:f})}}),c.default.createElement(g.LunaSwitchSetting,{title:"Pitch follows speed",desc:"Chipmunk / slow-mo. Clears any custom pitch shift.",checked:xe,onChange:o=>v.setPitchShifts(o.target.checked)}),c.default.createElement(g.LunaSetting,{title:"Reset",desc:"Back to 1.00\xD7, pitch shift off, all effects off."},c.default.createElement("div",{style:Ae},c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>v.reset()},"Reset playback"))))),c.default.createElement(at,null,c.default.createElement(g.LunaSettings,{title:"Presets",desc:"Capture speed, pitch and effects. Built-ins are fixed; custom presets can be applied, renamed, updated, reordered and deleted."},c.default.createElement(g.LunaSwitchSetting,{title:"Built-in presets",desc:"Show the built-in presets.",checked:se,onChange:o=>{let f=o.target.checked;v.setBuiltinPresets(f),rt(v,M)}}),le.map((o,f)=>{let I=e.presetId===o.id&&!et(o,e);return c.default.createElement(g.LunaSetting,{key:o.id,title:`${o.name}${I?" *":""}`,desc:Za(o)},c.default.createElement("div",{style:Ae},e.presetId===o.id?c.default.createElement("span",{style:{fontSize:12,opacity:.7}},"Active"):c.default.createElement(g.LunaButton,{size:"small",onClick:()=>v.applyPreset(o)},"Use"),o.builtin===!0?c.default.createElement("span",{style:{fontSize:12,opacity:.6}},"Built-in"):c.default.createElement(c.default.Fragment,null,c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>k({id:o.id,name:o.name,value:o.name})},"Rename"),c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>ce(o)},"Update"),c.default.createElement(g.LunaButton,{size:"small",variant:"text",disabled:f<=H,title:"Move up",onClick:()=>M.move(o.id,-1)},"\u2191"),c.default.createElement(g.LunaButton,{size:"small",variant:"text",disabled:f>=le.length-1,title:"Move down",onClick:()=>M.move(o.id,1)},"\u2193"),c.default.createElement(g.LunaButton,{size:"small",variant:"text",color:"error",onClick:()=>ue(o)},"Delete"))))}),m!==null&&c.default.createElement(c.default.Fragment,null,c.default.createElement(g.LunaTextSetting,{title:`Rename ${m.name}`,defaultValue:m.value,onChange:o=>k({...m,value:o.target.value})}),c.default.createElement(g.LunaSetting,{title:" "},c.default.createElement("div",{style:Ae},c.default.createElement(g.LunaButton,{size:"small",onClick:()=>{M.rename(m.id,m.value),k(null)}},"Save"),c.default.createElement(g.LunaButton,{size:"small",variant:"text",onClick:()=>k(null)},"Cancel")))))),c.default.createElement(at,null,c.default.createElement(g.LunaSettings,{title:"Effects",desc:"Same Web Audio chain as pitch. Needs audio capture \u2014 use the dev-mode self-test if nothing changes."},c.default.createElement(g.LunaSwitchSetting,{title:"Equalizer",desc:"8 bands, 62 Hz to 8 kHz, \xB112 dB. Drag a band; double-click resets it.",checked:S.eq.enabled,onChange:o=>J({enabled:o.target.checked})}),c.default.createElement(g.LunaSetting,{title:"Bands",desc:"Shift+arrow for 3 dB steps."},c.default.createElement(wr,{eq:S.eq,disabled:!S.eq.enabled,onChange:o=>J({bands:o})})),c.default.createElement(g.LunaSetting,{title:"Flatten",desc:"Set every band to 0 dB."},c.default.createElement("div",{style:Ae},c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",disabled:!S.eq.enabled,onClick:()=>J({bands:Array.from({length:Ve},()=>0)})},"Flatten EQ"))),c.default.createElement(g.LunaSwitchSetting,{title:"Bass boost",desc:"Parallel low-shelf sub boost with saturation for dirty kicks. Added on top of the dry signal.",checked:S.bass.enabled,onChange:o=>_({enabled:o.target.checked})}),c.default.createElement(g.LunaTextSetting,{title:"Bass boost (dB)",desc:"Low shelf at 90 Hz, 0\u201324 dB.",defaultValue:String(Math.round(S.bass.boost)),inputProps:{inputMode:"numeric"},onChange:o=>{let f=z(o.target.value);f!==void 0&&_({boost:Math.max(0,Math.min(24,f))})}}),c.default.createElement(g.LunaTextSetting,{title:"Sub (dB)",desc:"Extra shelf at 45 Hz, 0\u201312 dB.",defaultValue:String(Math.round(S.bass.sub)),inputProps:{inputMode:"numeric"},onChange:o=>{let f=z(o.target.value);f!==void 0&&_({sub:Math.max(0,Math.min(12,f))})}}),c.default.createElement(g.LunaTextSetting,{title:"Drive (%)",desc:"Saturation on the bass path; more harmonics, dirtier kicks.",defaultValue:String(Math.round(S.bass.drive*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let f=z(o.target.value);f!==void 0&&_({drive:Math.max(0,Math.min(100,f))/100})}}),c.default.createElement(g.LunaTextSetting,{title:"Bass amount (%)",desc:"How much of the boosted bass is added back.",defaultValue:String(Math.round(S.bass.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let f=z(o.target.value);f!==void 0&&_({mix:Math.max(0,Math.min(100,f))/100})}}),c.default.createElement(g.LunaSwitchSetting,{title:"8D audio",desc:"LFO panning plus a constant pitch wobble, so the mix moves around your head.",checked:S.eightD.enabled,onChange:o=>O({enabled:o.target.checked})}),c.default.createElement(g.LunaTextSetting,{title:"8D pan rate (Hz)",desc:"How fast the sound travels left/right.",defaultValue:String(S.eightD.rate),inputProps:{inputMode:"decimal"},onChange:o=>{let f=z(o.target.value);f!==void 0&&O({rate:Math.max(.02,Math.min(2,f))})}}),c.default.createElement(g.LunaTextSetting,{title:"8D pan depth (%)",defaultValue:String(Math.round(S.eightD.panDepth*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let f=z(o.target.value);f!==void 0&&O({panDepth:Math.max(0,Math.min(100,f))/100})}}),c.default.createElement(g.LunaTextSetting,{title:"8D pitch rate (Hz)",desc:"Speed of the constant pitch wobble.",defaultValue:String(S.eightD.pitchRate),inputProps:{inputMode:"decimal"},onChange:o=>{let f=z(o.target.value);f!==void 0&&O({pitchRate:Math.max(.02,Math.min(2,f))})}}),c.default.createElement(g.LunaTextSetting,{title:"8D pitch depth (ms)",desc:"Delay modulation depth; higher = wider pitch smear.",defaultValue:String(S.eightD.pitchDepth),inputProps:{inputMode:"decimal"},onChange:o=>{let f=z(o.target.value);f!==void 0&&O({pitchDepth:Math.max(0,Math.min(12,f))})}}),c.default.createElement(g.LunaTextSetting,{title:"8D mix (%)",desc:"Dry/wet amount; higher is more immersive.",defaultValue:String(Math.round(S.eightD.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let f=z(o.target.value);f!==void 0&&O({mix:Math.max(0,Math.min(100,f))/100})}}),c.default.createElement(g.LunaSwitchSetting,{title:"Delay",desc:"Feedback delay.",checked:S.delay.enabled,onChange:o=>B({enabled:o.target.checked})}),c.default.createElement(g.LunaTextSetting,{title:"Delay time (ms)",defaultValue:String(Math.round(S.delay.timeMs)),inputProps:{inputMode:"numeric"},onChange:o=>{let f=z(o.target.value);f!==void 0&&B({timeMs:Math.max(20,Math.min(2e3,f))})}}),c.default.createElement(g.LunaTextSetting,{title:"Delay feedback (%)",defaultValue:String(Math.round(S.delay.feedback*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let f=z(o.target.value);f!==void 0&&B({feedback:Math.max(0,Math.min(90,f))/100})}}),c.default.createElement(g.LunaTextSetting,{title:"Delay mix (%)",defaultValue:String(Math.round(S.delay.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let f=z(o.target.value);f!==void 0&&B({mix:Math.max(0,Math.min(100,f))/100})}}),c.default.createElement(g.LunaSwitchSetting,{title:"Reverb",desc:"Generated impulse response.",checked:S.reverb.enabled,onChange:o=>G({enabled:o.target.checked})}),c.default.createElement(g.LunaTextSetting,{title:"Reverb decay (s)",defaultValue:String(S.reverb.decay),inputProps:{inputMode:"decimal"},onChange:o=>{let f=z(o.target.value);f!==void 0&&G({decay:Math.max(.2,Math.min(8,f))})}}),c.default.createElement(g.LunaTextSetting,{title:"Reverb mix (%)",defaultValue:String(Math.round(S.reverb.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let f=z(o.target.value);f!==void 0&&G({mix:Math.max(0,Math.min(100,f))/100})}}))),c.default.createElement(at,null,c.default.createElement(g.LunaSettings,{title:"Config file",desc:"Versioned JSON, editable outside Luna. Autosaves 300 ms after changes."},c.default.createElement(g.LunaSetting,{title:"Path",desc:u},c.default.createElement("div",{style:Ae},c.default.createElement(g.LunaButton,{size:"small",variant:"text",onClick:()=>{Kt(u)}},"Copy path"))),c.default.createElement(g.LunaSetting,{title:"Actions",desc:s===""?void 0:s},c.default.createElement("div",{style:Ae},c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Bn()}},"Show folder"),c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{q()}},"Reload"),c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{he()}},"Import\u2026"),c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Y()}},"Export\u2026"))))),c.default.createElement(at,null,c.default.createElement(g.LunaSettings,{title:"Developer",desc:"Logs and test tools are off unless you need to report a bug."},c.default.createElement(g.LunaSwitchSetting,{title:"Developer mode",desc:"Write diagnostics logs and show the Copy diagnostics action.",checked:Q,onChange:o=>v.setDeveloperMode(o.target.checked)}),Q&&c.default.createElement(g.LunaSetting,{title:"Audio engine self-test",desc:N},c.default.createElement("div",{style:Ae},c.default.createElement(g.LunaButton,{size:"small",variant:"outlined",disabled:P,onClick:async()=>{h(!0);try{let o=await Sr();C(o.ok?`OK \xB7 ${o.context} \xB7 rms ${o.rms} \xB7 peak ${o.peak} \xB7 \u0394${o.progressionSeconds}s`:`Failed \xB7 ${o.reason??"unknown"} \xB7 context ${o.context}`)}finally{h(!1)}}},P?"Testing\u2026":"Run test"))),Q&&c.default.createElement(g.LunaButtonSetting,{title:"Diagnostics",desc:"Copy player, pitch-engine, effects, theme and media state plus recent logs.",children:a,onClick:async()=>{i("Copying\u2026");let o=await $e(v.get());i(o?"Copied":"Copy failed")}}))))};var Et=new Set,{trace:Er}=(0,Ee.Tracer)("[PlaybackKit]"),ti=1e3,ni=1500,mn="tidaluna.playback-speed.previous-quality",Ar=()=>{try{return localStorage.getItem(mn)}catch{return null}},ri=e=>{try{localStorage.setItem(mn,e)}catch{}},Nr=()=>{try{localStorage.removeItem(mn)}catch{}},Ir=e=>{let t={to:e},n=oe.redux.actions["settings/SET_STREAMING_QUALITY"];typeof n=="function"?n(t):oe.redux.store.dispatch({type:"settings/SET_STREAMING_QUALITY",payload:t})},Tr=()=>{let t=(0,Ee.findModuleByProperty)((n,r)=>n==="activePlayer"&&typeof r=="object"&&r!==null)?.activePlayer;if(t===void 0)return{found:!1};try{let n=Object.getPrototypeOf(t),r=n===null?[]:Object.getOwnPropertyNames(n).filter(i=>{try{return typeof t[i]=="function"}catch{return!1}}).slice(0,60),a=i=>{try{return t[i]}catch{return}};return{found:!0,name:a("name"),constructor:t.constructor?.name,state:a("playbackState")??a("state"),currentTime:a("currentTime"),methods:r,hasSetPlaybackRate:r.includes("setPlaybackRate"),hasMediaElement:!!(a("mediaElement")??a("video")??a("element"))}}catch(n){return{found:!0,error:String(n)}}},Mr=()=>{let t=(0,Ee.findModuleByProperty)((n,r)=>n==="activePlayer"&&typeof r=="object"&&r!==null)?.activePlayer?.name;return t==="nativePlayer"?"native":t==="shakaPlayer"?"shaka":t==="browserPlayer"?"browser":"unknown"},Lr,ai=()=>(Lr??=(0,Ee.findModuleByProperty)((e,t)=>e==="activePlayer"&&typeof t=="object"&&t!==null),Lr?.activePlayer),Rr=()=>{if(De()==="native"){let n=ai()?.currentTime;return typeof n=="number"&&Number.isFinite(n)?n:null}let e=ie(),t=e.find(n=>!n.paused&&n.readyState>0)??e.find(n=>n.readyState>0);return t===void 0?null:t.currentTime},ii=()=>{try{return oe.redux.store.getState().playbackControls?.playbackState==="PLAYING"}catch{return!1}},oi=e=>{let t=oe.redux.actions["playbackControls/TIME_UPDATE"];typeof t=="function"?t(e):oe.redux.store.dispatch({type:"playbackControls/TIME_UPDATE",payload:e})},si=()=>{try{let e=oe.redux.store.getState().playbackControls;if(e===void 0)return null;let t=e.latestCurrentTime??0;return e.playbackState!=="PLAYING"?t:t+Math.abs(Date.now()-(e.latestCurrentTimeSyncTimestamp??Date.now()))/1e3}catch{return null}},Cr={getSpeed:()=>v.get().speed,isPlaying:ii,getPosition:Rr,dispatchTimeUpdate:oi},li=()=>{try{let e=oe.redux.store.getState(),t=e.playQueue?.elements?.[e.playQueue.currentIndex??-1]?.mediaItemId,n=t===void 0?void 0:e.content?.mediaItems?.[String(t)];return{setting:e.settings?.quality?.streaming??null,track:n?.audioQuality??null,actual:e.playbackControls?.playbackContext?.actualAudioQuality??null,streamType:e.playbackControls?.playbackContext?.actualStreamType??null,codec:e.playbackControls?.playbackContext?.codec??null,sampleRate:e.playbackControls?.playbackContext?.sampleRate??null,bitDepth:e.playbackControls?.playbackContext?.bitDepth??null}}catch(e){return{error:String(e)}}},di=()=>{try{let e=oe.redux.store.getState(),t=e.playQueue,n=t?.elements?.[t.currentIndex??-1]?.mediaItemId;if(n===void 0)return null;let r=e.content?.mediaItems?.[String(n)];return r===void 0?{id:n,found:!1}:{id:n,found:!0,title:r.title,bpm:r.bpm??null,key:r.key??r.keyScale??null,metadataKeys:Object.keys(r).filter(a=>/bpm|key|tempo|tone/i.test(a))}}catch(e){return{error:String(e)}}},_r=!1,ze,gn=()=>tt(v.get(),M.get()),Dr=()=>{_r&&(ze!==void 0&&clearTimeout(ze),ze=setTimeout(()=>{ze=void 0,Oe(gn()).catch(e=>b("error","config save failed",{error:String(e)}))},300))},ci=async()=>{try{let e=await ut(),t=e===null?void 0:dt(e),n=await ct();t!==void 0?(v.replace(t.settings),M.replace(t.presets),rt(v,M),b("info","config loaded",{path:n,speed:t.settings.speed,presets:t.presets.length})):(await Oe(gn()),b("info",e===null?"config created":"config invalid, rewrote defaults",{path:n}))}catch(e){b("warn","config file unavailable; using browser storage only",{error:String(e)})}finally{_r=!0}},ui=()=>{try{let e=oe.redux.actions["router/PUSH"];if(typeof e!="function")throw new Error("router/PUSH is unavailable");e({pathname:"/not-found",search:"LunaSettings",replace:!0}),b("info","opening Luna settings"),setTimeout(()=>{let n=[...document.querySelectorAll('[role="tab"]')].find(r=>(r.textContent??"").trim()==="Plugins");n!==void 0&&n.getAttribute("aria-selected")!=="true"&&n.click(),setTimeout(()=>{[...document.querySelectorAll("h1,h2,h3,h4,h5,h6,span,p,div")].find(i=>(i.textContent??"").trim()==="@kyoto-aircon/playback-kit")?.scrollIntoView({block:"center",behavior:"smooth"})},250)},250)}catch(e){b("error","open Luna settings failed",{error:String(e)})}},pi=()=>{try{let t=oe.redux.store.getState().settings?.quality?.streaming;if(t==="HIGH"){b("info","already on the browser player quality");return}b("info","switching streaming quality to HIGH",{from:t}),typeof t=="string"&&ri(t),Ir("HIGH")}catch(e){b("error","quality switch failed",{error:String(e)})}},fi=()=>{let e=Ar();e!==null&&(b("info","restoring streaming quality",{to:e}),Ir(e),Nr())},mi=e=>{let t={version:qe,logs:$n,logText:zt,report:()=>Gt(v.get()),copy:()=>$e(v.get()),clear:Fn,setVerbose:zn,selectors:pt,playerKind:De,audioEngine:R,native:xt,nativeProbe:nn,store:v,controller:e};globalThis.__playbackSpeed=t,Et.add(()=>{globalThis.__playbackSpeed===t&&delete globalThis.__playbackSpeed})};try{Ft(v.get().developerMode);let e,t=l=>{if(e===l)return;e=l,(l?ur():rn()).catch(k=>b("warn","native stream probe failed",{error:String(k)}))};t(v.get().developerMode),Vn(()=>nn()),Kn(Tr);try{let l=Ee.LunaPlugin.getByName("@kyoto-aircon/playback-speed");l!==void 0&&b("warn","old Playback Speed plugin is still installed",{enabled:l.store?.enabled})}catch{}Un(()=>({kind:De(),native:xt(),nativeInstance:cr(),speed:v.get().speed,track:di(),audioEngine:R(),quality:li(),effects:rr(),pitchSemitones:v.get().pitchSemitones,pitchEngine:an(),presetId:v.get().presetId,uiTime:si(),actualTime:Rr()})),en(),b("info","loading",{version:qe,selectors:pt(),media:ie().length,settings:v.get(),tidal:Tr(),native:xt()});let n=Yn();Et.add(()=>Xn(n));let r=new vt(ie,v);r.start();let a=v.subscribe(l=>{Ft(l.developerMode),t(l.developerMode),Dr(),b("info","settings changed",{speed:l.speed,pitchShifts:l.pitchShifts,bounds:l.bounds}),r.apply(),De()==="native"&&tn(l.speed),ln(Cr),Pt(l.pitchSemitones,ie()),Xt(l.effects,ie())});M.subscribe(Dr),ci(),nr(Et,v,{getPlayerKind:De,subscribePlayerKind:gr,useBrowserPlayer:pi,previousQuality:Ar,restoreQuality:fi,presets:{list:()=>M.get().filter(l=>v.get().builtinPresets||l.builtin!==!0),apply:l=>{v.applyPreset(l),b("info","preset applied",{id:l.id,name:l.name})},clear:()=>v.clearPreset(),save:(l,m)=>M.save(l,m),saveActive:l=>{let m=hr(v,M,l);b("info","saved preset from live state",{id:m?.id,builtin:l.builtin===!0})}},getPitchEngineState:an,openSettings:ui,onOpen:()=>{let l=v.get().pitchSemitones;l!==0&&Pt(l,ie())}}),mi(r);let u=setInterval(()=>{r.scan();let l=v.get().pitchSemitones;l!==0&&Pt(l,ie());let m=v.get().effects;ot(m)&&Xt(m,ie())},ti),d=br(Cr);sn(Mr());let s=setInterval(()=>{en();let l=Mr(),m=De();sn(l),l!==m&&l==="native"&&(tn(v.get().speed),Nr())},ni);Et.add(()=>{ze!==void 0&&(clearTimeout(ze),Oe(gn()).catch(()=>{})),clearInterval(u),clearInterval(s),d(),a(),r.stop(),mr(),ar(),rn().catch(()=>{})}),Er.log("loaded")}catch(e){b("error","failed to load",{error:String(e),stack:e?.stack}),Er.err("Failed to load:",e)}export{ei as Settings,Et as unloads};
//# sourceMappingURL=kyoto-aircon.playback-kit.mjs.map
