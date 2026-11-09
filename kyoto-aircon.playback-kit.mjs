var Ra=Object.create;var Yn=Object.defineProperty;var _a=Object.getOwnPropertyDescriptor;var Ba=Object.getOwnPropertyNames;var Ha=Object.getPrototypeOf,Oa=Object.prototype.hasOwnProperty;var xt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var qa=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Ba(t))!Oa.call(e,a)&&a!==n&&Yn(e,a,{get:()=>t[a],enumerable:!(r=_a(t,a))||r.enumerable});return e};var Fe=(e,t,n)=>(n=e!=null?Ra(Ha(e)):{},qa(t||!e||!e.__esModule?Yn(n,"default",{value:e,enumerable:!0}):n,e));var Xn=xt((wo,Vt)=>{Vt.exports=luna?.core?.modules?.["@luna/core"];if(Vt.exports===void 0)throw new Error("Cannot find module @luna/core in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/core")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Qt=xt((Eo,Wt)=>{Wt.exports=luna?.core?.modules?.["@luna/lib"];if(Wt.exports===void 0)throw new Error("Cannot find module @luna/lib in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/lib")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Hn=xt((Ms,Bn)=>{Bn.exports=luna?.core?.modules?.react;if(Bn.exports===void 0)throw new Error("Cannot find module react in luna.core.modules");luna.core.LunaPlugin.getByName("react")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var la=xt((Ls,On)=>{On.exports=luna?.core?.modules?.["@luna/ui"];if(On.exports===void 0)throw new Error("Cannot find module @luna/ui in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/ui")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Ne=Fe(Xn(),1),se=Fe(Qt(),1);var ze=[62,125,250,500,1e3,2e3,4e3,8e3],at=ze.length,Se=-12,te=12,T={eq:{enabled:!1,bands:Array.from({length:at},()=>0)},bass:{enabled:!1,boost:6,sub:3,drive:.2,mix:.6},eightD:{enabled:!1,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},delay:{enabled:!1,timeMs:250,feedback:.25,mix:.25},reverb:{enabled:!1,decay:2,mix:.25}},A=(e,t,n,r)=>{let a=typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(a)?Math.min(n,Math.max(t,a)):r},rt=(e,t)=>typeof e=="boolean"?e:t,$a=e=>{let t=Array.from({length:at},()=>0);if(Array.isArray(e.bands)){for(let i=0;i<at;i+=1)t[i]=A(e.bands[i],Se,te,0);return t}let n=A(e.low,Se,te,0),r=A(e.mid,Se,te,0),a=A(e.high,Se,te,0);return[n,n,r,r,r,a,a,a]},U=e=>{let t=typeof e=="object"&&e!==null?e:{},n=typeof t.eq=="object"&&t.eq!==null?t.eq:{},r=typeof t.eightD=="object"&&t.eightD!==null?t.eightD:{},a=typeof t.bass=="object"&&t.bass!==null?t.bass:{},i=typeof t.delay=="object"&&t.delay!==null?t.delay:{},d=typeof t.reverb=="object"&&t.reverb!==null?t.reverb:{};return{eq:{enabled:rt(n.enabled,T.eq.enabled),bands:$a(n)},eightD:{enabled:rt(r.enabled,T.eightD.enabled),rate:A(r.rate,.02,2,T.eightD.rate),panDepth:A(r.panDepth,0,1,T.eightD.panDepth),pitchRate:A(r.pitchRate,.02,2,T.eightD.pitchRate),pitchDepth:A(r.pitchDepth,0,12,T.eightD.pitchDepth),mix:A(r.mix,0,1,T.eightD.mix)},bass:{enabled:rt(a.enabled,T.bass.enabled),boost:A(a.boost,0,24,T.bass.boost),sub:A(a.sub,0,12,T.bass.sub),drive:A(a.drive,0,1,T.bass.drive),mix:A(a.mix,0,1,T.bass.mix)},delay:{enabled:rt(i.enabled,T.delay.enabled),timeMs:A(i.timeMs,20,2e3,T.delay.timeMs),feedback:A(i.feedback,0,.9,T.delay.feedback),mix:A(i.mix,0,1,T.delay.mix)},reverb:{enabled:rt(d.enabled,T.reverb.enabled),decay:A(d.decay,.2,8,T.reverb.decay),mix:A(d.mix,0,1,T.reverb.mix)}}},Ke=e=>e.eq.enabled||e.bass.enabled||e.eightD.enabled||e.delay.enabled||e.reverb.enabled,kt=e=>{let t=[];return e.eq.enabled&&t.push("EQ 8-band"),e.eightD.enabled&&t.push(`8D ${e.eightD.rate.toFixed(2)} Hz`),e.bass.enabled&&t.push(`Bass +${Math.round(e.bass.boost)} dB`),e.delay.enabled&&t.push(`Delay ${Math.round(e.delay.timeMs)} ms`),e.reverb.enabled&&t.push(`Reverb ${e.reverb.decay.toFixed(1)} s`),t.length===0?"No effects enabled":t.join(" \xB7 ")};var ne=e=>Number.isFinite(e)?Math.max(-12,Math.min(12,Math.round(e))):0,Zn=e=>2**(ne(e)/12),it=e=>{let t=ne(e);return`${t>0?"+":""}${t}`};var ot={min:.05,max:10,step:.05},lt=1;var Fa=6,Ue=(e,t=Fa)=>{let n=10**t;return Math.round(e*n)/n},wt=(e,t,n)=>Math.min(n,Math.max(t,e)),ke=e=>{let t=Number(e?.min),n=Number.isFinite(t)?Ue(Math.max(.01,t)):ot.min,r=Number(e?.max),a=Number.isFinite(r)?Ue(Math.max(n+.01,r)):Math.max(n+.01,ot.max),i=Number(e?.step),d=Number.isFinite(i)&&i>0?Ue(i):ot.step;return{min:n,max:a,step:d}},za=(e,t)=>{let{min:n,step:r}=t,a=n+Math.round((e-n)/r)*r;return Ue(a)},xe=(e,t)=>{let n=ke(t),r=Number.isFinite(e)?e:lt,a=za(r,n);return wt(Ue(a),n.min,n.max)},er=(e,t,n)=>{let r=ke(n),a=xe(e,r);return xe(a+t*r.step,r)},Ka=e=>{let t=e.includes(".")?e.replace(/0+$/,"").replace(/\.$/,""):e;return t===""||t==="-0"?"0":t},re=e=>Number.isFinite(e)?Ka(e.toFixed(4)):String(lt),Ge=e=>`${re(e)}\xD7`,st=(e,t)=>{let{min:n,max:r}=ke(t);if(!(r>n))return 0;let a=Math.log(wt(e,n,r)/n)/Math.log(r/n);return wt(Number.isFinite(a)?a:0,0,1)},tr=(e,t)=>{let n=ke(t),r=n.min*Math.pow(n.max/n.min,wt(e,0,1));return xe(r,n)},nr=e=>{let{min:t,max:n}=ke(e),r=[t,1,2,5,10,n],a=new Set,i=[];for(let o of r.sort((l,g)=>l-g)){if(o<t||o>n)continue;let l=re(o);a.has(l)||(a.add(l),i.push(Ue(o)))}let d=[];for(let o of i){let l=d[d.length-1];l!==void 0&&st(o,e)-st(l,e)<.07||d.push(o)}return d};var Ga="tidaluna.playback-kit.v1",ja="tidaluna.playback-speed.v1",dt=()=>({speed:lt,pitchShifts:!1,pitchSemitones:0,presetId:null,developerMode:!1,builtinPresets:!0,nativeEffects:!1,effects:U(void 0),bounds:{...ot}}),rr=e=>{if(e===null)return dt();let t;try{t=JSON.parse(e)}catch{return dt()}if(typeof t!="object"||t===null)return dt();let n=t,r=ke(n.bounds),a=ne(typeof n.pitchSemitones=="number"?n.pitchSemitones:0);return{speed:xe(typeof n.speed=="number"?n.speed:lt,r),pitchShifts:a===0&&n.pitchShifts===!0,pitchSemitones:a,presetId:typeof n.presetId=="string"?n.presetId:null,developerMode:n.developerMode===!0,builtinPresets:n.builtinPresets!==!1,nativeEffects:n.nativeEffects===!0,effects:U(n.effects),bounds:r}},Va=(e,t)=>{let n=e.getItem(t);if(n!==null)return rr(n);let r=e.getItem(ja);if(r===null)return dt();let a=rr(r);return a.presetId=null,a},Wa=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&e.presetId===t.presetId&&e.developerMode===t.developerMode&&e.builtinPresets===t.builtinPresets&&e.nativeEffects===t.nativeEffects&&JSON.stringify(e.effects)===JSON.stringify(t.effects)&&e.bounds.min===t.bounds.min&&e.bounds.max===t.bounds.max&&e.bounds.step===t.bounds.step,Jt=(e,t=Ga)=>{let n=Va(e,t),r=new Set,a=()=>({...n,bounds:{...n.bounds}}),i=o=>{if(Wa(n,o))return;n=o;try{e.setItem(t,JSON.stringify(n))}catch{}let l=a();for(let g of[...r])try{g(l)}catch(b){console.error("[PlaybackKit] listener failed",b)}},d=o=>({...n,...o});return{get:a,subscribe(o){return r.add(o),()=>r.delete(o)},setSpeed(o){i(d({speed:xe(o,n.bounds)}))},step(o){i(d({speed:er(n.speed,o,n.bounds)}))},setPitchShifts(o){i(d({pitchShifts:o,pitchSemitones:o?0:n.pitchSemitones}))},setPitchSemitones(o){let l=ne(o);i(d({pitchSemitones:l,pitchShifts:l===0?n.pitchShifts:!1}))},setBounds(o){let l=ke({...n.bounds,...o});i({...n,bounds:l,speed:xe(n.speed,l)})},applyPreset(o){let l=ne(o.pitchSemitones);i({...n,speed:xe(o.speed,n.bounds),pitchShifts:l===0&&o.pitchShifts===!0,pitchSemitones:l,effects:U(o.effects),presetId:o.id})},setEffects(o){i({...n,effects:U(o)})},setDeveloperMode(o){i({...n,developerMode:o})},setBuiltinPresets(o){i({...n,builtinPresets:o})},setNativeEffects(o){i({...n,nativeEffects:o})},clearPreset(){i({...n,presetId:null})},replace(o){let l=ke(o.bounds),g=ne(o.pitchSemitones);i({speed:xe(o.speed,l),pitchShifts:g===0&&o.pitchShifts===!0,pitchSemitones:g,presetId:typeof o.presetId=="string"?o.presetId:null,developerMode:o.developerMode===!0,builtinPresets:o.builtinPresets!==!1,nativeEffects:o.nativeEffects===!0,effects:U(o.effects),bounds:l})},reset(){i({...dt(),developerMode:n.developerMode,builtinPresets:n.builtinPresets,presetId:null,bounds:{...n.bounds}})},destroy(){r.clear()}}},ar=new Map,Yt=()=>{try{if(typeof localStorage<"u"){let e="__lunakit_probe__";return localStorage.setItem(e,"1"),localStorage.removeItem(e),localStorage}}catch{}return{getItem:e=>ar.get(e)??null,setItem:(e,t)=>{ar.set(e,t)}}},v=Jt(Yt());var Qa="tidaluna.playback-kit.presets.v1",en="nightcore",fe=e=>U({...T,...e,eq:{...T.eq,...e.eq??{}},bass:{...T.bass,...e.bass??{}},eightD:{...T.eightD,...e.eightD??{}},delay:{...T.delay,...e.delay??{}},reverb:{...T.reverb,...e.reverb??{}}}),Ja={id:en,name:"Nightcore",speed:1.35,pitchShifts:!0,pitchSemitones:0,effects:fe({}),builtin:!0},Ya={id:"slowcore",name:"Slowcore",speed:.8,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:4,mix:.35}}),builtin:!0},Xa={id:"big-bass",name:"Big Bass",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({eq:{enabled:!0,bands:[3,2,0,0,0,0,0,1]},bass:{enabled:!0,boost:14,sub:6,drive:.5,mix:1}}),builtin:!0},Za={id:"eight-d",name:"8D Orbit",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({eightD:{enabled:!0,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},ei={id:"dub-echo",name:"Dub Echo",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({delay:{enabled:!0,timeMs:450,feedback:.45,mix:.28}}),builtin:!0},ti={id:"daycore",name:"Daycore",speed:.85,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},ni={id:"chipmunk",name:"Chipmunk",speed:1.6,pitchShifts:!0,pitchSemitones:0,effects:fe({}),builtin:!0},ri={id:"vaporwave",name:"Vaporwave",speed:.7,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:5,mix:.35},delay:{enabled:!0,timeMs:300,feedback:.3,mix:.2}}),builtin:!0},ai={id:"submerge",name:"Submerge",speed:.95,pitchShifts:!1,pitchSemitones:0,effects:fe({bass:{enabled:!0,boost:10,sub:5,drive:.3,mix:.6},eightD:{enabled:!0,rate:.1,panDepth:.75,pitchRate:.25,pitchDepth:2,mix:.85}}),builtin:!0},ii={id:"clear-voice",name:"Clear Voice",speed:1.15,pitchShifts:!1,pitchSemitones:0,effects:fe({eq:{enabled:!0,bands:[-4,-2,1,2,2,1,0,0]}}),builtin:!0},ir=[Ja,ti,Ya,ni,ri,Xa,ai,Za,ei,ii],ct=new Set(ir.map(e=>e.id)),oi=24,si=.05,li=16,Xt=e=>{if(typeof e!="string")return;let t=e.trim().slice(0,oi);return t===""?void 0:t},Zt=e=>{let t=Number(e);return Number.isFinite(t)?Math.max(si,Math.min(li,t)):1},or=(e,t)=>{if(typeof e!="object"||e===null)return;let n=e,r=typeof n.id=="string"?n.id:void 0,a=Xt(n.name);if(!(r===void 0||a===void 0||ct.has(r)||t.has(r)))return t.add(r),{id:r,name:a,speed:Zt(n.speed),pitchShifts:n.pitchShifts===!0,pitchSemitones:ne(typeof n.pitchSemitones=="number"?n.pitchSemitones:0),effects:U(n.effects)}},di=e=>{if(e===null)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(!Array.isArray(t))return[];let n=new Set,r=[];for(let a of t){let i=or(a,n);i!==void 0&&r.push(i)}return r},ci=(e,t)=>{if(e.eq.enabled!==t.eq.enabled||e.eq.bands.length!==t.eq.bands.length)return!1;for(let i=0;i<e.eq.bands.length;i+=1)if(e.eq.bands[i]!==t.eq.bands[i])return!1;let n=["enabled","boost","sub","drive","mix"];for(let i of n)if(e.bass[i]!==t.bass[i])return!1;let r=["enabled","rate","panDepth","pitchRate","pitchDepth"];for(let i of r)if(e.eightD[i]!==t.eightD[i])return!1;let a=["enabled","timeMs","feedback","mix"];for(let i of a)if(e.delay[i]!==t.delay[i])return!1;return e.reverb.enabled===t.reverb.enabled&&e.reverb.decay===t.reverb.decay&&e.reverb.mix===t.reverb.mix},ut=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&ci(e.effects,t.effects),tn=(e,t=Qa)=>{let n=di(e.getItem(t)),r=new Set,a=0,i=()=>{try{e.setItem(t,JSON.stringify(n))}catch{}},d=()=>{for(let l of[...r])try{l()}catch{}},o=()=>[...ir.map(l=>({...l})),...n.map(l=>({...l}))];return{get:o,getById(l){return o().find(g=>g.id===l)},save(l,g){let b=Xt(l);if(b===void 0)return;a+=1;let k={id:`custom-${Date.now().toString(36)}-${a}`,name:b,speed:Zt(g.speed),pitchShifts:g.pitchShifts===!0,pitchSemitones:ne(g.pitchSemitones),effects:U(g.effects)};return n.push(k),i(),d(),{...k}},remove(l){if(ct.has(l))return!1;let g=n.filter(b=>b.id!==l);return g.length===n.length?!1:(n=g,i(),d(),!0)},rename(l,g){if(ct.has(l))return!1;let b=Xt(g),k=n.find(w=>w.id===l);return b===void 0||k===void 0?!1:(k.name=b,i(),d(),!0)},update(l,g){if(ct.has(l))return!1;let b=n.find(k=>k.id===l);return b===void 0?!1:(b.speed=Zt(g.speed),b.pitchShifts=g.pitchShifts===!0,b.pitchSemitones=ne(g.pitchSemitones),b.effects=U(g.effects),i(),d(),!0)},move(l,g){if(ct.has(l))return!1;let b=n.findIndex(h=>h.id===l),k=b+Math.sign(g);if(b<0||k<0||k>=n.length)return!1;let[w]=n.splice(b,1);return n.splice(k,0,w),i(),d(),!0},replace(l){let g=new Set;n=l.filter(b=>b.builtin!==!0).map(b=>or(b,g)).filter(b=>b!==void 0),i(),d()},subscribe(l){return r.add(l),()=>r.delete(l)}}},M=tn(Yt());var nn=1,sr=e=>({getItem:()=>e,setItem:()=>{}}),Et=e=>{if(e==null)return;let t;try{t=JSON.parse(e)}catch{return}if(typeof t!="object"||t===null)return;let n=t;if(n.version!==nn)return;let r=Jt(sr(JSON.stringify(n.settings??{}))).get(),a=tn(sr(JSON.stringify(n.presets??[]))).get().filter(d=>d.builtin!==!0),i=new Set([en,...a.map(d=>d.id)]);return r.presetId!==null&&!i.has(r.presetId)&&(r.presetId=null),{version:nn,settings:r,presets:a}},pt=(e,t)=>`${JSON.stringify({version:nn,settings:e,presets:t.filter(n=>n.builtin!==!0)},null,2)}
`;var Ae=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/config.native.ts",'"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var P=(e,n)=>{for(var t in n)p(e,t,{get:n[t],enumerable:!0})},w=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of m(n))!h.call(e,s)&&s!==t&&p(e,s,{get:()=>n[s],enumerable:!(o=d(n,s))||o.enumerable});return e};var y=e=>w(p({},"__esModule",{value:!0}),e);var A={};P(A,{exportConfig:()=>F,getConfigPath:()=>k,importConfig:()=>S,readConfig:()=>v,revealConfig:()=>D,writeConfig:()=>x});module.exports=y(A);var l=require,i=l("path"),r=()=>l("fs/promises"),b=()=>l("fs"),u=()=>l("electron"),g=()=>process.env.HOME??process.env.USERPROFILE??"",f=()=>process.platform==="win32"?process.env.APPDATA??i.join(g(),"AppData","Roaming"):process.platform==="darwin"?i.join(g(),"Library","Application Support"):i.join(g(),".config"),j=()=>{let e=f(),n=b(),t=[],o=process.resourcesPath;o!==void 0&&(t.push(i.basename(i.dirname(i.dirname(o)))),t.push(i.basename(i.dirname(o)))),t.push("TIDAL","Tidal","tidal","tidal-hifi");for(let s of t)if(!(s===""||s==="Contents"||s==="resources")&&n.existsSync(i.join(e,s)))return s;return"TIDAL"},c=()=>i.join(f(),j(),"playback-kit"),a=()=>i.join(c(),"config.json"),k=async()=>a(),v=async()=>{try{return await r().readFile(a(),"utf8")}catch{return null}},x=async e=>{await r().mkdir(c(),{recursive:!0});let n=`${a()}.tmp`;return await r().writeFile(n,e,"utf8"),await r().rename(n,a()),a()},F=async e=>{let t=await u().dialog.showSaveDialog({title:"Export Playback Kit config",defaultPath:i.join(f(),"playback-kit.json"),filters:[{name:"JSON",extensions:["json"]}]});return t.canceled||t.filePath===void 0?null:(await r().writeFile(t.filePath,e,"utf8"),t.filePath)},S=async()=>{let n=await u().dialog.showOpenDialog({title:"Import Playback Kit config",properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]}),t=n.filePaths[0];return n.canceled||t===void 0?null:{path:t,json:await r().readFile(t,"utf8")}},D=async()=>{await r().mkdir(c(),{recursive:!0}),await u().shell.openPath(c())};0&&(module.exports={exportConfig,getConfigPath,importConfig,readConfig,revealConfig,writeConfig});\n');if(Ae===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/config.native.ts");var lr=(...e)=>__ipcRenderer.invoke(Ae,"exportConfig",...e),Pt=(...e)=>__ipcRenderer.invoke(Ae,"getConfigPath",...e),dr=(...e)=>__ipcRenderer.invoke(Ae,"importConfig",...e),Tt=(...e)=>__ipcRenderer.invoke(Ae,"readConfig",...e),cr=(...e)=>__ipcRenderer.invoke(Ae,"revealConfig",...e),je=(...e)=>__ipcRenderer.invoke(Ae,"writeConfig",...e);var Ve="2.16.0";var Me=[],ur=!0,pr=!1,fr=e=>{if(e!==void 0)try{return JSON.parse(JSON.stringify(e))}catch{try{return String(e)}catch{return"[unserialisable]"}}},an=e=>{pr=e,e||(Me.length=0)};var f=(e,t,n)=>{if(!pr)return;let r={at:Date.now(),level:e,message:t,data:fr(n)};if(Me.push(r),Me.length>500&&Me.shift(),!(e==="debug"&&!ur))try{let a=e==="error"?console.error:e==="warn"?console.warn:console.debug;n===void 0?a(`[PlaybackKit] ${t}`):a(`[PlaybackKit] ${t}`,n)}catch{}},mr=()=>Me.map(e=>({...e})),on=()=>Me.map(e=>`${new Date(e.at).toISOString()} ${e.level.toUpperCase().padEnd(5)} ${e.message}${e.data===void 0?"":` ${JSON.stringify(e.data)}`}`).join(`
`),gr=()=>{Me.length=0},hr=e=>{ur=e};var ui=e=>({tag:e.tagName.toLowerCase(),id:e.id,class:typeof e.className=="string"?e.className:"",src:(e.currentSrc||e.src||"").slice(0,140),paused:e.paused,readyState:e.readyState,networkState:e.networkState,currentTime:Number(e.currentTime.toFixed(3)),duration:Number.isFinite(e.duration)?Number(e.duration.toFixed(3)):e.duration,playbackRate:e.playbackRate,defaultPlaybackRate:e.defaultPlaybackRate,preservesPitch:e.preservesPitch,muted:e.muted,volume:e.volume,connected:e.isConnected,parent:e.parentElement===null?null:e.parentElement.id||e.parentElement.className}),pi=()=>typeof document>"u"?[]:[...document.querySelectorAll("video,audio")].map(ui),Mt=()=>{if(typeof document>"u")return{};let e=document.getElementById("tidal-player-root");return{playerRoot:e!==null,rootChildCount:e?.children.length??0,rootChildren:e===null?[]:[...e.children].map(t=>`${t.tagName.toLowerCase()}#${t.id||"-"}`),scopedMedia:document.querySelectorAll("#tidal-player-root video, #tidal-player-root audio").length,videoOne:document.getElementById("video-one")!==null,videoTwo:document.getElementById("video-two")!==null,allMedia:document.querySelectorAll("video,audio").length,footer:document.querySelector('[data-test="footer-player"]')!==null}},fi=e=>new Promise(t=>setTimeout(t,e)),mi=async(e=1500)=>{if(typeof document>"u")return[];let t=[...document.querySelectorAll("video,audio")],n=t.map(r=>({id:r.id,tag:r.tagName.toLowerCase(),time:r.currentTime,paused:r.paused}));return await fi(e),t.map((r,a)=>{let i=n[a],d=r.currentTime-i.time,o=e/1e3;return{id:i.id,tag:i.tag,paused:r.paused,deltaSeconds:Number(d.toFixed(3)),observedRate:Number((d/o).toFixed(3)),expectedRate:r.playbackRate}})},br,yr=e=>{br=e},vr,Sr=e=>{vr=e},rn,xr=e=>{rn=e},gi=4e3,hi=async()=>{if(rn===void 0)return{registered:!1};try{return await Promise.race([rn(),new Promise((e,t)=>setTimeout(()=>t(new Error("native probe timed out")),gi))])}catch(e){return{error:String(e)}}},bi=()=>{try{return vr?.()??{}}catch(e){return{error:String(e)}}},yi=()=>{try{return br?.()??{registered:!1}}catch(e){return{error:String(e)}}},vi=["--wave-color-solid-accent-fill","--wave-color-solid-accent-bright","--wave-color-solid-base-fill","--wave-color-solid-base-brighter","--wave-color-solid-base-brightest","--wave-color-solid-contrast-fill","--wave-color-solid-contrast-dark","--wave-color-opacity-contrast-fill-ultra-thin","--wave-color-opacity-contrast-fill-thin","--wave-color-opacity-contrast-fill-thick","--wave-color-solid-warning-fill","--wave-color-text-danger","--market-core-text-10-color","--market-core-text-20-color","--market-core-fill-white-color","--baseFontSize","--baseLineHeight","--remRatio"],Si=()=>{if(typeof document>"u")return{};let e=document.getElementById("wimp")??document.querySelector('[data-test="footer-player"]')??document.documentElement,t=getComputedStyle(e),n={};for(let a of vi){let i=t.getPropertyValue(a).trim();i!==""&&(n[a]=i)}let r=a=>{let i=document.querySelector(a);if(i===null)return null;let d=getComputedStyle(i);return{color:d.color,background:d.backgroundColor,fontFamily:d.fontFamily,fontSize:d.fontSize,lineHeight:d.lineHeight,borderRadius:d.borderRadius,height:d.height}};return{root:e.id!==""?`#${e.id}`:e.tagName.toLowerCase(),fontSize:t.fontSize,fontFamily:t.fontFamily,tokens:n,elements:{footer:r('[data-test="footer-player"]'),utilityButtons:r('[data-test="footer-player"] [class*="utilityButtons"]'),volume:r('[data-test="footer-player"] [class*="sliderContainer"]'),qualityBadge:r("[data-test-quality-badge-streaming-quality]"),progressBar:r('[data-test="progress-bar"]')}}},sn=async e=>{f("info","building diagnostics report");let t=await mi(),n=await hi();return[`Playback Kit v${Ve}`,`at: ${new Date().toISOString()}`,`url: ${typeof location>"u"?"?":location.href}`,`ua: ${typeof navigator>"u"?"?":navigator.userAgent}`,`visibility: ${typeof document>"u"?"?":document.visibilityState}`,`settings: ${JSON.stringify(fr(e))}`,`selectors: ${JSON.stringify(Mt())}`,`player: ${JSON.stringify(bi())}`,`nativeProbe: ${JSON.stringify(n)}`,`tidal: ${JSON.stringify(yi())}`,`progression: ${JSON.stringify(t)}`,`media: ${JSON.stringify(pi())}`,`theme: ${JSON.stringify(Si())}`,"",`--- logs (${Me.length}) ---`,on()].join(`
`)},We=async e=>ln(await sn(e)),ln=async e=>{try{if(typeof navigator<"u"&&navigator.clipboard?.writeText!==void 0)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}catch{return!1}};var xi=400,kr=100,ki=5e-4,wi="__playbackKitAudioState",dn=globalThis[wi]??={sources:new Map},ae=dn.context,Re,Ie,Qe,ie=[],ft=dn.sources,Lt=new Map,Ei="__playbackKitWorklets",wr=globalThis[Ei]??=new Set,Er=e=>new Promise(t=>setTimeout(t,e)),G=async()=>{if(ae===void 0){let e=window.AudioContext??window.webkitAudioContext;if(e===void 0)throw new Error("Web Audio is unavailable");ae=new e({latencyHint:"playback"}),dn.context=ae,f("info","audio context created",{sampleRate:ae.sampleRate,state:ae.state})}if(ae.state==="suspended")try{await Promise.race([ae.resume(),Er(250)])}catch{}return ae},cn=()=>{if(Re===void 0||Ie===void 0)return;Re.disconnect();for(let t of ie)try{t.output.disconnect()}catch{}let e=Re;for(let t of ie)e.connect(t.input),e=t.output;e.connect(Ie)},mt=async()=>{let e=await G();if(Re===void 0||Ie===void 0){Re=e.createGain(),Ie=e.createGain(),Qe=e.createAnalyser(),Qe.fftSize=2048,Ie.connect(Qe),Ie.connect(e.destination);for(let t of ft.values()){try{t.disconnect()}catch{}t.connect(Re)}}return cn(),{ctx:e,input:Re,output:Ie}},un=async(e,t)=>{if(Lt.has(t))return Lt.get(t);if(wr.has(t))return;let n=await G(),r=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),a=(async()=>{let i;try{await Promise.race([n.audioWorklet.addModule(r),new Promise((d,o)=>{i=setTimeout(()=>o(new Error(`Timed out loading worklet ${t}`)),xi*10)})])}finally{i!==void 0&&clearTimeout(i),URL.revokeObjectURL(r)}})();Lt.set(t,a);try{await a,wr.add(t)}catch(i){throw Lt.delete(t),i}},_e=async e=>{let{ctx:t,input:n}=await mt();if(ft.has(e))return;if(e.mediaKeys!==null&&e.mediaKeys!==void 0)throw new Error("protected media (DRM) cannot be routed through Web Audio");let r=t.createMediaElementSource(e);r.connect(n),ft.set(e,r),f("info","audio engine attached element",{id:e.id,sources:ft.size})},Ct=new Set,pn=async e=>{let{input:t}=await mt();Ct.has(e)||(e.connect(t),Ct.add(e),f("info","audio engine connected external source",{inputs:Ct.size}))},fn=e=>{Ct.delete(e);try{e.disconnect()}catch{}},mn=async(e,t)=>{await Dt(e,e,t)},Dt=async(e,t,n)=>{if(await mt(),ie.some(a=>a.input===e))return;let r=n===void 0?ie.length:Math.max(0,Math.min(ie.length,n));ie.splice(r,0,{input:e,output:t}),cn(),f("debug","audio engine inserted group",{index:r,nodes:ie.length})},Pi=async e=>{await mt();let t=ie.findIndex(r=>r.input===e||r.output===e);if(t<0)return!1;let[n]=ie.splice(t,1);try{n.output.disconnect()}catch{}return cn(),!0},Ti=()=>ie.map(e=>e.input),_=()=>({context:ae===void 0?"none":ae.state,sampleRate:ae?.sampleRate,sources:ft.size,nodes:ie.length}),gn=async(e=1200)=>{let{ctx:t}=await mt();if(Qe===void 0)throw new Error("analyser unavailable");let n=Math.max(1,Math.round(e/kr)),r=new Float32Array(Qe.fftSize),a=0,i=0,d=0;for(let l=0;l<n;l+=1){if(await Er(kr),t.state!=="running")continue;Qe.getFloatTimeDomainData(r);let g=0,b=0;for(let k of r){let w=Math.abs(k);w>g&&(g=w),b+=k*k}a=Math.max(a,g),i+=b/r.length,d+=1}let o=d===0?0:Math.sqrt(i/d);return{rms:o,peak:a,samples:d,silent:o<ki,durationMs:e}},Mi=()=>({version:1,ensureContext:G,loadWorklet:un,attach:_e,connectSource:pn,disconnectSource:fn,insert:mn,insertGroup:Dt,remove:Pi,list:Ti,status:_,measureRms:gn}),Pr=()=>{let e=Mi();return globalThis.__playbackKitAudio=e,e},Tr=e=>{globalThis.__playbackKitAudio===e&&delete globalThis.__playbackKitAudio};var Cr=Fe(Qt(),1);var Mr=`
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
`;var hn=1e4,Lr=12,Nt=8,Di=1e3,Ni='<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>',bn=(e,t,n)=>Math.min(n,Math.max(t,e)),Ai=()=>document.querySelector('[data-test="footer-player"] [class*="utilityButtons"]'),Ii=e=>{switch(e){case"HI_RES_LOSSLESS":return"Max";case"HI_RES":return"Hi-Res";case"LOSSLESS":return"Lossless";case"HIGH":return"High";case"LOW":return"Low";default:return e}},Dr=(e,t,n={})=>{new Cr.StyleTag("lunaspeed-styles",e,Mr);let r=document.createElement("div");r.className="lunaspeed-ctl",r.dataset.lunaspeed="control";let a=document.createElement("button");a.type="button",a.className="lunaspeed-step",a.textContent="\u2212",a.setAttribute("aria-label","Slower");let i=document.createElement("button");i.type="button",i.className="lunaspeed-pill",i.setAttribute("aria-label","Playback speed"),i.setAttribute("aria-haspopup","dialog"),i.innerHTML=`${Ni}<span class="lunaspeed-pill-label"></span>`;let d=i.querySelector(".lunaspeed-pill-label"),o=document.createElement("button");o.type="button",o.className="lunaspeed-step",o.textContent="+",o.setAttribute("aria-label","Faster"),r.append(a,i,o);let l=document.createElement("div");l.className="lunaspeed-popover",l.setAttribute("role","dialog"),l.setAttribute("aria-label","Playback settings"),l.hidden=!0,l.innerHTML=`
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
			<input class="lunaspeed-range" type="range" min="0" max="${hn}" step="1" aria-label="Playback speed slider" />
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
			<span class="lunaspeed-version">v${Ve}</span>
			<span class="lunaspeed-foot-actions">
				<button class="lunaspeed-settings" type="button">Luna settings</button>
				<button class="lunaspeed-copy" type="button">Copy diagnostics</button>
			</span>
		</div>`;let g=l.querySelector(".lunaspeed-value"),b=l.querySelector(".lunaspeed-presets"),k=l.querySelector(".lunaspeed-save-toggle"),w=l.querySelector(".lunaspeed-save"),h=l.querySelector(".lunaspeed-save-input"),I=l.querySelector(".lunaspeed-save-cancel"),C=l.querySelector(".lunaspeed-slider"),L=l.querySelector(".lunaspeed-range"),Ee=l.querySelector(".lunaspeed-ticks"),X=l.querySelector(".lunaspeed-pitch-value"),S=[...l.querySelectorAll(".lunaspeed-pitch-step")],le=l.querySelector(".lunaspeed-switch"),Pe=l.querySelector(".lunaspeed-reset"),R=l.querySelector(".lunaspeed-copy"),ge=l.querySelector(".lunaspeed-settings"),F=l.querySelector(".lunaspeed-pitch-dot"),z=l.querySelector(".lunaspeed-warning"),K=l.querySelector(".lunaspeed-warning-text"),D=l.querySelector(".lunaspeed-warning-effects"),B=l.querySelector(".lunaspeed-warning-action"),de=l.querySelector(".lunaspeed-quality"),ce=l.querySelector(".lunaspeed-quality-action"),Te="",he="",H=!1,ue=!1,s,u,be=p=>{C.style.setProperty("--lunaspeed-pos",String(bn(p,0,1)))},ye=(p,y)=>{let x=st(p,y);L.value=String(Math.round(x*hn)),be(x)},La=()=>{let{bounds:p}=t.get(),y=`${p.min}:${p.max}`;y!==Te&&(Te=y,Ee.replaceChildren(...nr(p).map(x=>{let E=document.createElement("span");return E.className="lunaspeed-tick",E.style.left=`${(st(x,p)*100).toFixed(3)}%`,E.textContent=Ge(x),E})))},Ca=p=>p===null?"Custom":n.presets?.list().find(y=>y.id===p)?.name??"Custom",Un=()=>{let p=n.presets;if(p===void 0){b.hidden=!0,w.hidden=!0;return}let y=p.list(),x=t.get(),E=x.presetId,O=y.find(N=>N.id===E),Z=O!==void 0&&!ut(O,x),pe=`${y.map(N=>`${N.id}:${N.name}`).join("|")}::${E??""}::${Z}`;if(pe===he)return;he=pe;let ee=[],q=document.createElement("button");q.type="button",q.className="lunaspeed-preset",q.textContent="Custom",q.dataset.active=String(E===null),q.setAttribute("aria-pressed",String(E===null)),q.addEventListener("click",()=>p.clear()),ee.push(q);for(let N of y){let ve=document.createElement("button");ve.type="button",ve.className="lunaspeed-preset";let jt=E===N.id;ve.textContent=jt&&Z?`${N.name} *`:N.name,ve.dataset.active=String(jt),ve.setAttribute("aria-pressed",String(jt)),ve.dataset.builtin=String(N.builtin===!0),ve.title=`${N.name} \u2014 ${Ge(N.speed)} \xB7 ${N.pitchShifts?"pitch follows speed":N.pitchSemitones!==0?`pitch ${it(N.pitchSemitones)} st`:"pitch preserved"} \xB7 ${kt(N.effects)}`,ve.addEventListener("click",()=>p.apply(N)),ee.push(ve)}b.replaceChildren(...ee)},Da=(p,y)=>{X.textContent=`${it(p)} st`;for(let x of S){let E=Number(x.dataset.delta);x.disabled=E<0?p<=-12:p>=12,x.title=E<0?"Lower pitch by 1 semitone":"Raise pitch by 1 semitone"}le.setAttribute("aria-checked",String(y))},Gn=p=>{let y=n.getPitchEngineState?.(),x=p===0?"idle":y?.status??"idle";F.dataset.status=x;let E=x==="running"?"Pitch engine active":x==="waiting"?"Pitch engine waiting for the audio element":x==="unavailable"?"Pitch engine unavailable"+(y?.reason===void 0?"":": "+y.reason):x==="ready"?"Pitch engine ready":"Pitch engine idle";F.title=p===0?"":E,F.setAttribute("aria-label",p===0?"":E)},St=p=>{z.hidden=p!=="native";let y=t.get().nativeEffects;K.textContent=y?"Effects and pitch run through Playback Kit. Speed still needs the browser player.":"TIDAL ignores effects, speed and pitch here. Enable effects or use the browser player.",D.hidden=y,D.disabled=!1,D.textContent="Enable effects";let x=n.previousQuality?.()??null,E=p!=="native"&&x!==null;de.hidden=!E,E&&x!==null&&(ce.textContent=`Restore ${Ii(x)}`)},Ut=()=>{let p=t.get(),{speed:y,pitchShifts:x,pitchSemitones:E,bounds:O,presetId:Z}=p,pe=Ge(y);d.textContent=pe,i.dataset.active=String(y!==1||x||E!==0);let ee=n.presets?.list().find(N=>N.id===Z),q=ee!==void 0&&!ut(ee,p);i.title=`Playback ${pe}${Z===null?"":` \xB7 ${Ca(Z)}${q?" *":""}`}`,a.setAttribute("aria-label",`Slower by ${Ge(O.step)}`),o.setAttribute("aria-label",`Faster by ${Ge(O.step)}`),a.title=`\u2212${re(O.step)}\xD7`,o.title=`+${re(O.step)}\xD7`,g.textContent=re(y),ue||ye(y,O),L.setAttribute("aria-valuetext",pe),La(),Un(),Da(E,x),Gn(E),R.hidden=!p.developerMode,St(n.getPlayerKind?.()??"unknown"),H&&Gt()},Gt=()=>{let p=i.getBoundingClientRect(),y=l.offsetWidth||348,x=l.offsetHeight||240,E=bn(p.left+p.width/2-y/2,Nt,window.innerWidth-y-Nt),O=p.top-x-Lr,Z="top";O<Nt&&(O=Math.min(p.bottom+Lr,window.innerHeight-x-Nt),Z="bottom"),l.style.left=`${Math.round(E)}px`,l.style.top=`${Math.round(O)}px`,l.dataset.side=Z;let pe=bn(p.left+p.width/2-E,18,y-18);l.style.setProperty("--lunaspeed-caret",`${Math.round(pe)}px`)},jn=p=>{let y=p.target;y!==null&&(l.contains(y)||r.contains(y)||$e())},Vn=p=>{p.key==="Escape"&&(p.preventDefault(),$e(),i.focus())},Wn=()=>{H&&Gt()},Na=()=>{H||(H=!0,l.hidden=!1,i.dataset.open="true",Ut(),St(n.getPlayerKind?.()??"unknown"),Gt(),n.onOpen?.(),document.addEventListener("pointerdown",jn,!0),document.addEventListener("keydown",Vn,!0),window.addEventListener("resize",Wn),s=setInterval(()=>Gn(t.get().pitchSemitones),500),f("debug","popover open"))},$e=()=>{H&&(H=!1,l.hidden=!0,delete i.dataset.open,w.hidden=!0,s!==void 0&&(clearInterval(s),s=void 0),document.removeEventListener("pointerdown",jn,!0),document.removeEventListener("keydown",Vn,!0),window.removeEventListener("resize",Wn))},Aa=()=>H?$e():Na(),Qn=()=>{if(!r.isConnected){H&&$e();let y=Ai();if(y===null)return;let x=y.querySelector('[class*="sliderContainer"]');x!==null&&x.parentElement===y?y.insertBefore(r,x):y.appendChild(r)}let p=document.getElementById("wimp")??document.body;l.parentElement!==p&&p.appendChild(l)};k.addEventListener("click",()=>{if(w.hidden=!w.hidden,w.hidden)return;let p=n.presets?.list().find(y=>y.id===t.get().presetId);h.value=p===void 0?"":p.builtin===!0?`${p.name} (edited)`:p.name,h.focus(),h.select()}),a.addEventListener("click",()=>t.step(-1)),o.addEventListener("click",()=>t.step(1)),i.addEventListener("click",Aa),L.addEventListener("pointerdown",()=>{ue=!0,u!==void 0&&clearTimeout(u),delete C.dataset.settling});let et=()=>{if(!ue)return;ue=!1;let{speed:p,bounds:y}=t.get();C.dataset.settling="true",ye(p,y),u!==void 0&&clearTimeout(u),u=setTimeout(()=>{u=void 0,delete C.dataset.settling},160)};L.addEventListener("change",et),window.addEventListener("pointerup",et),window.addEventListener("pointercancel",et),L.addEventListener("input",()=>{if(L.disabled)return;let p=Number(L.value)/hn,y=t.get().bounds;be(p),t.setSpeed(tr(p,y))}),l.addEventListener("keydown",p=>{p.key==="ArrowLeft"||p.key==="ArrowDown"?(p.preventDefault(),t.step(-1)):(p.key==="ArrowRight"||p.key==="ArrowUp")&&(p.preventDefault(),t.step(1))});for(let p of S)p.addEventListener("click",()=>{let y=Number(p.dataset.delta);t.setPitchSemitones(t.get().pitchSemitones+y)});le.addEventListener("click",()=>t.setPitchShifts(!t.get().pitchShifts)),Pe.addEventListener("click",()=>t.reset()),w.addEventListener("submit",p=>{p.preventDefault();let y=n.presets;if(y===void 0)return;let x=h.value.trim();if(x==="")return;let{speed:E,pitchShifts:O,pitchSemitones:Z,effects:pe}=t.get(),ee=y.list().find(q=>q.id===t.get().presetId);if(ee!==void 0&&ee.builtin!==!0&&x===ee.name)y.saveActive(ee);else{let q=y.save(x,{speed:E,pitchShifts:O,pitchSemitones:Z,effects:pe});if(q===void 0)return;y.apply(q)}h.value="",w.hidden=!0,he="",Un(),f("info","preset saved",{name:x})}),I.addEventListener("click",()=>{w.hidden=!0,h.value=""}),ge.hidden=n.openSettings===void 0,ge.addEventListener("click",()=>{n.openSettings?.(),$e()});let tt;R.addEventListener("click",async()=>{tt!==void 0&&clearTimeout(tt),R.disabled=!0,R.textContent="Copying\u2026";let p=await We(t.get());f(p?"info":"error","diagnostics copied",{copied:p}),R.textContent=p?"Copied":"Copy failed",tt=setTimeout(()=>{R.textContent="Copy diagnostics",R.disabled=!1},1800)});let nt;D.addEventListener("click",()=>{n.enableNativeEffects?.(),D.disabled=!0,D.textContent="Enabled",f("info","enabled native effects from warning")}),B.addEventListener("click",()=>{n.useBrowserPlayer!==void 0&&(nt!==void 0&&clearTimeout(nt),B.disabled=!0,B.textContent="Switching\u2026",n.useBrowserPlayer(),f("info","requested browser player from warning"),nt=setTimeout(()=>{B.disabled=!1,B.textContent="Use browser player"},2500))}),ce.addEventListener("click",()=>{n.restoreQuality!==void 0&&(n.restoreQuality(),de.hidden=!0,f("info","restored original streaming quality"))}),St(n.getPlayerKind?.()??"unknown");let Jn=n.subscribePlayerKind?.(St);Jn!==void 0&&e.add(Jn),Qn(),Ut(),e.add(t.subscribe(Ut));let Ia=setInterval(Qn,Di);e.add(()=>{clearInterval(Ia),window.removeEventListener("pointerup",et),window.removeEventListener("pointercancel",et),tt!==void 0&&clearTimeout(tt),nt!==void 0&&clearTimeout(nt),u!==void 0&&clearTimeout(u),$e(),l.remove(),r.remove()})};var P,Le={built:!1,active:[],attached:0},Nr=()=>({...Le}),Ri=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),_i=(e,t)=>{let n=Math.max(1,Math.floor(e.sampleRate*t)),r=e.createBuffer(2,n,e.sampleRate);for(let a=0;a<2;a+=1){let i=r.getChannelData(a);for(let d=0;d<n;d+=1){let o=Math.pow(1-d/n,2.2);i[d]=(Math.random()*2-1)*o}}return r},Bi=async()=>{let e=await G();if(P!==void 0)return P;let t=e.createGain(),n=ze.map((u,be)=>{let ye=e.createBiquadFilter();return ye.frequency.value=u,be===0?ye.type="lowshelf":be===ze.length-1?ye.type="highshelf":(ye.type="peaking",ye.Q.value=1.2),ye}),r=e.createGain(),a=e.createDelay(2),i=e.createGain(),d=e.createGain(),o=e.createGain(),l=e.createBiquadFilter();l.type="lowpass",l.frequency.value=220,l.Q.value=.7;let g=e.createBiquadFilter();g.type="lowshelf",g.frequency.value=45;let b=e.createBiquadFilter();b.type="lowshelf",b.frequency.value=90;let k=e.createGain(),w=e.createWaveShaper(),h=new Float32Array(2048);for(let u=0;u<h.length;u+=1){let be=u/(h.length-1)*2-1;h[u]=Math.tanh(3*be)/Math.tanh(3)}w.curve=h,w.oversample="4x";let I=e.createGain(),C=e.createDynamicsCompressor();C.threshold.value=-3,C.knee.value=0,C.ratio.value=20,C.attack.value=.003,C.release.value=.25;let L=e.createGain(),Ee=e.createChannelSplitter(2),X=e.createDelay(.05);X.delayTime.value=.015;let S=e.createDelay(.05);S.delayTime.value=.015;let le=e.createChannelMerger(2),Pe=e.createStereoPanner(),R=e.createGain();R.gain.value=1;let ge=e.createGain();ge.gain.value=0;let F=e.createGain(),z=e.createOscillator();z.type="sine",z.frequency.value=.12;let K=e.createGain();K.gain.value=0;let D=e.createOscillator();D.type="sine",D.frequency.value=.35;let B=e.createGain();B.gain.value=0;let de=e.createGain();de.gain.value=0,z.connect(K),K.connect(Pe.pan),D.connect(B),D.connect(de),B.connect(X.delayTime),de.connect(S.delayTime),z.start(),D.start(),L.connect(R),R.connect(F),L.connect(Ee),Ee.connect(X,0),Ee.connect(S,1),X.connect(le,0,0),S.connect(le,0,1),le.connect(Pe),Pe.connect(ge),ge.connect(F);let ce=e.createGain(),Te=e.createGain(),he=e.createConvolver(),H=e.createGain(),ue=e.createGain();t.connect(n[0]);for(let u=1;u<n.length;u+=1)n[u-1].connect(n[u]);let s=n[n.length-1];return s.connect(o),o.connect(L),s.connect(l),l.connect(g),g.connect(b),b.connect(k),k.connect(w),w.connect(I),I.connect(L),F.connect(r),F.connect(a),r.connect(ce),a.connect(i),i.connect(ce),a.connect(d),d.connect(a),ce.connect(Te),Te.connect(C),ce.connect(he),he.connect(H),H.connect(C),C.connect(ue),P={fxIn:t,eqFilters:n,delayDry:r,delayNode:a,delayWet:i,delayFeedback:d,bassDry:o,bassLowpass:l,bassSub:g,bassBoost:b,bassDrive:k,bassShaper:w,bassWet:I,eightDInput:L,eightDSplitter:Ee,eightDDelayL:X,eightDDelayR:S,eightDMerger:le,eightDPanner:Pe,eightDDry:R,eightDWet:ge,eightDOut:F,panLfo:z,panDepth:K,pitchLfo:D,pitchDepthL:B,pitchDepthR:de,limiter:C,reverbIn:ce,reverbDry:Te,convolver:he,reverbWet:H,fxOut:ue,decay:0},await Dt(t,ue),f("info","effects graph inserted"),P},Hi=(e,t)=>{if(P===void 0)return;let n=e.currentTime,r=.06,a=P;for(let b=0;b<a.eqFilters.length;b+=1){let k=t.eq.enabled?t.eq.bands[b]??0:0;a.eqFilters[b].gain.setTargetAtTime(k,n,r)}let i=t.bass.enabled?t.bass.mix:0;a.bassDry.gain.setTargetAtTime(1,n,r),a.bassWet.gain.setTargetAtTime(i,n,r),a.bassSub.gain.setTargetAtTime(t.bass.enabled?t.bass.sub:0,n,r),a.bassBoost.gain.setTargetAtTime(t.bass.enabled?t.bass.boost:0,n,r),a.bassDrive.gain.setTargetAtTime(t.bass.enabled?1+t.bass.drive*3:1,n,r),a.panLfo.frequency.setTargetAtTime(t.eightD.rate,n,r),a.panDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.panDepth:0,n,r),a.pitchLfo.frequency.setTargetAtTime(t.eightD.pitchRate,n,r);let d=t.eightD.enabled?t.eightD.pitchDepth/1e3:0;a.pitchDepthL.gain.setTargetAtTime(d,n,r),a.pitchDepthR.gain.setTargetAtTime(-d,n,r);let o=t.eightD.enabled?t.eightD.mix:0;a.eightDDry.gain.setTargetAtTime(1-o,n,r),a.eightDWet.gain.setTargetAtTime(o,n,r);let l=t.delay.enabled?t.delay.mix:0;a.delayNode.delayTime.setTargetAtTime(Math.min(2,Math.max(.02,t.delay.timeMs/1e3)),n,r),a.delayFeedback.gain.setTargetAtTime(t.delay.enabled?t.delay.feedback:0,n,r),a.delayWet.gain.setTargetAtTime(l,n,r),a.delayDry.gain.setTargetAtTime(1-l,n,r);let g=t.reverb.enabled?t.reverb.mix:0;Math.abs(a.decay-t.reverb.decay)>.05&&(a.convolver.buffer=_i(e,t.reverb.decay),a.decay=t.reverb.decay),a.reverbWet.gain.setTargetAtTime(g,n,r),a.reverbDry.gain.setTargetAtTime(1-g,n,r)},yn=async(e,t)=>{let n=U(e),r=Ke(n);if(!r&&P===void 0){Le={...Le,active:[]};return}try{let a=await G();if(a.state!=="running"&&r){Le={built:P!==void 0,context:a.state,active:[],error:"audio context suspended (interact with the page)",attached:_().sources};return}if(r){let d=Ri(t);d!==void 0&&await _e(d)}let i=await Bi();Hi(a,n),Le={built:!0,context:a.state,active:[n.eq.enabled?"eq":"",n.bass.enabled?"bass":"",n.eightD.enabled?"8d":"",n.delay.enabled?"delay":"",n.reverb.enabled?"reverb":""].filter(d=>d!==""),attached:_().sources},i.decay===0&&n.reverb.enabled&&(i.decay=n.reverb.decay)}catch(a){let i=a instanceof Error?a.message:String(a);Le={built:P!==void 0,context:_().context,active:[],error:i,attached:_().sources},f("warn","effects engine unavailable",{error:i})}},Ar=()=>{if(P!==void 0){let e=P.eqFilters[0].context.currentTime,t=.03;for(let n of P.eqFilters)n.gain.setTargetAtTime(0,e,t);P.bassWet.gain.setTargetAtTime(0,e,t),P.bassDry.gain.setTargetAtTime(1,e,t),P.bassSub.gain.setTargetAtTime(0,e,t),P.bassBoost.gain.setTargetAtTime(0,e,t),P.bassDrive.gain.setTargetAtTime(1,e,t),P.eightDWet.gain.setTargetAtTime(0,e,t),P.eightDDry.gain.setTargetAtTime(1,e,t),P.panDepth.gain.setTargetAtTime(0,e,t),P.pitchDepthL.gain.setTargetAtTime(0,e,t),P.pitchDepthR.gain.setTargetAtTime(0,e,t),P.delayWet.gain.setTargetAtTime(0,e,t),P.delayDry.gain.setTargetAtTime(1,e,t),P.delayFeedback.gain.setTargetAtTime(0,e,t),P.reverbWet.gain.setTargetAtTime(0,e,t),P.reverbDry.gain.setTargetAtTime(1,e,t)}Le={...Le,active:[],error:void 0}};var _r="#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two",Ir=["loadstart","loadedmetadata","canplay","playing","play","emptied","ratechange","seeked"],At=.001,Rr=1,Oi=150,It=e=>{let t=e.id;return typeof t=="string"?t:e.constructor.name},oe=()=>typeof document>"u"?[]:[...document.querySelectorAll(_r)],Rt=class{constructor(t,n){this.getElements=t;this.source=n}getElements;source;attachments=new Map;timers=new Set;start(){this.scan()}scan(){let t=this.getElements(),n=0;for(let r of t)this.attachments.has(r)||(this.attach(r),n+=1);n>0?f("info","attached media elements",{added:n,total:this.attachments.size,found:t.length}):t.length===0&&f("debug","no media elements found",{selector:_r})}apply(){this.scan();for(let t of this.attachments.keys())this.applyTo(t,"settings-change")}stop(){for(let t of this.timers)clearTimeout(t);this.timers.clear();for(let[t,n]of this.attachments)n(),this.restore(t);this.attachments.clear(),f("info","controller stopped")}attach(t){let n=r=>{let a=this.source.get().speed,i=t.playbackRate;Math.abs(i-a)>At&&f("warn","TIDAL reset the rate",{id:It(t),event:r.type,before:i,desired:a,currentTime:t.currentTime}),this.applyTo(t,r.type),(r.type==="loadstart"||r.type==="emptied")&&this.scheduleReapply(t)};for(let r of Ir)t.addEventListener(r,n);this.attachments.set(t,()=>{for(let r of Ir)t.removeEventListener(r,n)}),f("info","attached",{id:It(t),tag:t.constructor.name,rate:t.playbackRate}),this.applyTo(t,"attach")}applyTo(t,n){let{speed:r,pitchShifts:a}=this.source.get(),i=t.playbackRate;try{Math.abs(i-r)>At&&(t.playbackRate=r),t.defaultPlaybackRate!==void 0&&Math.abs(t.defaultPlaybackRate-r)>At&&(t.defaultPlaybackRate=r);let o=!a;t.preservesPitch!==void 0&&t.preservesPitch!==o&&(t.preservesPitch=o),t.webkitPreservesPitch!==void 0&&t.webkitPreservesPitch!==o&&(t.webkitPreservesPitch=o)}catch(o){f("error","failed to apply rate",{id:It(t),reason:n,error:String(o)});return}let d=t.playbackRate;Math.abs(d-i)>At&&f("debug","applied rate",{id:It(t),reason:n,before:i,after:d,readback:d,defaultRate:t.defaultPlaybackRate})}scheduleReapply(t){let n=setTimeout(()=>{this.timers.delete(n),this.attachments.has(t)&&this.applyTo(t,"delayed-reapply")},Oi);this.timers.add(n)}restore(t){try{t.playbackRate=Rr,t.defaultPlaybackRate!==void 0&&(t.defaultPlaybackRate=Rr),t.preservesPitch!==void 0&&(t.preservesPitch=!0),t.webkitPreservesPitch!==void 0&&(t.webkitPreservesPitch=!0)}catch{}}};var qi=new Set(["media.load","media.preload"]),$i=e=>{let t={origin:null,extension:null,pathLength:0,queryKeys:[],urlLength:e.length};try{let n=new URL(e);if(n.protocol!=="https:"&&n.protocol!=="http:")return t;t.origin=n.origin,t.pathLength=n.pathname.length;let r=n.pathname.slice(n.pathname.lastIndexOf("/")+1),a=r.lastIndexOf(".");a>0&&a<r.length-1&&(t.extension=r.slice(a+1).toLowerCase()),t.queryKeys=[...n.searchParams.keys()].sort()}catch{}return t},Br=(e,t=Date.now())=>{if(typeof e!="string")return null;let n;try{n=JSON.parse(e)}catch{return null}if(typeof n!="object"||n===null)return null;let r=n,a=typeof r.command=="string"?r.command:null;if(a===null||!qi.has(a))return null;let i=typeof r.url=="string"?r.url:null;return{at:t,command:a,format:typeof r.streamFormat=="string"?r.streamFormat:null,encrypted:typeof r.encryptionKey=="string"&&r.encryptionKey.length>0,...i===null?{origin:null,extension:null,pathLength:0,queryKeys:[],urlLength:0}:$i(i)}};var Hr=(e,t=Date.now())=>{if(typeof e!="object"||e===null)return null;let n=e.streamInfo;if(typeof n!="object"||n===null)return null;let r=n,a=typeof r.streamUrl=="string"?r.streamUrl:null;return a===null||!/^https?:\/\//i.test(a)?null:{url:a,format:typeof r.streamFormat=="string"?r.streamFormat:null,key:typeof r.securityToken=="string"?r.securityToken:"",at:t}},vn=e=>Br(JSON.stringify({command:"media.load",url:e.url,streamFormat:e.format,encryptionKey:e.key}),e.at)??void 0;var _t="__lunaspeedPatched",Q,W,Or=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||t.Player===void 0||t.Player.prototype===void 0))return t},kn=e=>{let t=new Set,n=e,r=0;for(;n!==null&&r<4;){for(let a of Object.getOwnPropertyNames(n))t.add(a);n=Object.getPrototypeOf(n),r+=1}return[...t]},qr=e=>{let t=kn(e),n=t.find(r=>/^set(playback|audio)?(rate|speed|tempo)$/i.test(r));return n!==void 0&&typeof e[n]=="function"?n:typeof e.playbackRate=="number"?"playbackRate":t.find(r=>/^(playbackRate|rate|speed)$/i.test(r)&&typeof e[r]=="number")},Fi=e=>{Q!==e&&(Q=e,W=qr(e),f("info","native player instance captured",{rateMember:W??null,ownKeys:Object.keys(e).slice(0,40),methods:kn(e).slice(0,80)}))},xn,$r=e=>{xn=e},zi="__playbackKitNativeStreams",gt=globalThis[zi]??={},Bt=()=>({load:gt.load===void 0?void 0:{...gt.load},preload:gt.preload===void 0?void 0:{...gt.preload}}),Ki=e=>{let t=Object.getPrototypeOf(e);if(t===null||t===Object.prototype||t.__pbkStreamPatched===!0)return;let n=(r,a)=>{let i=t[r];typeof i=="function"&&(t[r]=function(...o){try{let l=Hr(o[0]);l!==null&&(gt[a]=l)}catch(l){f("debug","native stream capture failed",{error:String(l)})}return i.apply(this,o)})};try{Object.defineProperty(t,"__pbkStreamPatched",{value:!0,enumerable:!1})}catch{return}n("load","load"),n("next","preload"),f("info","native stream capture patched",{methods:["load","next"]})},Ui=()=>{if(xn!==void 0)try{let e=xn();e!==void 0&&Ki(e)}catch(e){f("debug","native stream patch failed",{error:String(e)})}},wn=()=>{Ui();let e=Or();if(e===void 0)return!1;let t=e.Player?.prototype;if(t===void 0)return!1;if(t[_t]===!0)return!0;try{Object.defineProperty(t,_t,{value:!0,enumerable:!1})}catch{return!1}for(let n of["play","load","pause","seek"]){let r=t[n];typeof r=="function"&&(t[n]=function(...i){try{Fi(this)}catch(d){f("error","native capture failed",{error:String(d)})}return r.apply(this,i)})}return f("info","native player component patched"),!0},Fr=()=>Q!==void 0,Sn,zr=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||typeof t.Player!="function")){if(Sn===void 0)try{Sn=t.Player()}catch(n){f("error","native volume control unavailable",{error:String(n)});return}return Sn}},Kr=e=>{let t=zr();if(!(t===void 0||typeof t.setVolume!="function"))try{t.setVolume(Math.round(Math.max(0,Math.min(1,e))*100))}catch(n){f("error","native volume set failed",{error:String(n)})}},En=()=>{let t=zr()?.volume;if(!(typeof t!="number"||!Number.isFinite(t)))return Math.max(0,Math.min(1,t))},Pn=e=>{if(Q===void 0||(W===void 0&&(W=qr(Q)),W===void 0))return!1;try{let t=Q[W];if(W==="playbackRate"){if(t===e)return!0;Q.playbackRate=e}else Q[W](e);return f("info","native rate applied",{rate:e,member:W,readback:Q[W]}),!0}catch(t){return f("error","native rate failed",{rate:e,member:W,error:String(t)}),!1}},Ht=()=>{let e=Or();if(e===void 0)return{present:!1};let t=e.Player?.prototype,n=t===void 0?[]:Object.getOwnPropertyNames(t).filter(r=>r!==_t);return{present:!0,patched:t!==void 0&&t[_t]===!0,playerMethods:n.slice(0,100),rateMethods:n.filter(r=>/rate|speed|tempo|pitch/i.test(r)),instanceCaptured:Q!==void 0,rateMember:W??null,instanceMethods:Q===void 0?[]:kn(Q).slice(0,100)}};var Je=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/nativeProbe.native.ts",'"use strict";var w=Object.defineProperty;var D=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames;var _=Object.prototype.hasOwnProperty;var v=(e,n)=>{for(var r in n)w(e,r,{get:n[r],enumerable:!0})},B=(e,n,r,t)=>{if(n&&typeof n=="object"||typeof n=="function")for(let a of L(n))!_.call(e,a)&&a!==r&&w(e,a,{get:()=>n[a],enumerable:!(t=D(n,a))||t.enumerable});return e};var H=e=>B(w({},"__esModule",{value:!0}),e);var Y={};v(Y,{preparePreload:()=>z,prepareStream:()=>F,readBridge:()=>W,readTrack:()=>j,releaseTrack:()=>G});module.exports=H(Y);var h=require("node:crypto"),K="UIlTTEMmmLfGowo/UC60x2H45W6MdGgTRfo/umg4754=",A=(e,n=K)=>{let r=Buffer.from(e,"base64");if(r.length<32||(r.length-16)%16!==0)throw new Error("encryption key is not an OLD_AES token");let t=Buffer.from(n,"base64");if(t.length!==32)throw new Error("invalid master key length");let a=(0,h.createDecipheriv)("aes-256-cbc",t,r.subarray(0,16));a.setAutoPadding(!1);let s=Buffer.concat([a.update(r.subarray(16)),a.final()]);if(s.length<24)throw new Error("unwrapped key is too short");return{key:new Uint8Array(s.subarray(0,16)),nonce:new Uint8Array(s.subarray(16,24))}},S=(e,n)=>{if(e.length!==16)throw new Error("lossless key must be 16 bytes");if(n.length!==8)throw new Error("lossless nonce must be 8 bytes");let r=new Uint8Array(16);r.set(n,0);let t=(0,h.createDecipheriv)("aes-128-ctr",e,r);return{update(a){return new Uint8Array(t.update(a))},destroy(){t.destroy()}}},T=e=>e.length>=4&&e[0]===102&&e[1]===76&&e[2]===97&&e[3]===67,U=(e,n=8)=>Array.from(e.subarray(0,n)).map(r=>r.toString(16).padStart(2,"0")).join(" ");var N=18e4,E=200*1024*1024,C=2*1024*1024,I=1,o,i,d=e=>e===void 0?void 0:{...e.info},O=(e,n)=>{let r=String(e);return n===""?r:r.split(n).join("[url]")},R=(e,n)=>{if(e!==null){let r=/\\/(\\d+)\\s*$/.exec(e);if(r!==null)return Number(r[1])}if(n!==null){let r=Number(n);if(Number.isFinite(r)&&r>0)return r}return null},y=e=>{if(o?.info.id===e)return o;if(i?.info.id===e)return i},$=async e=>{let n=Date.now(),r=new AbortController,t=setTimeout(()=>r.abort(),N);try{let a=e.key===""?void 0:A(e.key),s=a===void 0?void 0:S(a.key,a.nonce),u=await fetch(e.url,{headers:{Range:"bytes=0-"},signal:r.signal});if(!u.ok)throw new Error(`HTTP ${u.status}`);e.info.total=R(u.headers.get("content-range"),u.headers.get("content-length"));let g=u.body;if(g===null)throw new Error("empty response body");let k=g.getReader(),m=[],l=0;try{for(;;){let{done:c,value:p}=await k.read();if(c)break;if(p===void 0)continue;let x=s===void 0?p:s.update(p);if(m.push(x),l+=x.length,e.info.bytes=l,l>E)throw new Error(`track exceeds ${E} bytes`)}}finally{try{await k.cancel()}catch{}}let f=new Uint8Array(l),b=0;for(let c of m)f.set(c,b),b+=c.length;if(!T(f))throw new Error(`decrypted stream is not FLAC (head ${U(f)})`);if(y(e.info.id)!==e)return;e.info.flac=!0,e.info.bytes=f.length,e.info.total=e.info.total??f.length,e.info.state="ready",e.info.elapsedMs=Date.now()-n,e.data=f}catch(a){if(y(e.info.id)!==e)return;e.info.state="error",e.info.error=O(a,e.url),e.info.elapsedMs=Date.now()-n}finally{clearTimeout(t)}},P=(e,n,r)=>{let t={info:{id:I++,state:"downloading",format:n,encrypted:r!=="",bytes:0,total:null,flac:!1,elapsedMs:0},url:e,key:r};return $(t),t},M=(e,n,r)=>{if(!(typeof e!="string"||!/^https?:\\/\\//i.test(e)))return{url:e,format:typeof n=="string"?n:null,key:typeof r=="string"?r:""}},F=async(e,n,r)=>{let t=M(e,n,r);if(t!==void 0)return i!==void 0&&i.url===t.url&&i.key===t.key&&i.info.state!=="error"?(o!==void 0&&o!==i&&(o.data=void 0),o=i,i=void 0,d(o)):(o!==void 0&&o.url===t.url&&o.key===t.key&&o.info.state!=="released"&&o.info.state!=="error"||(o!==void 0&&(o.data=void 0),o=P(t.url,t.format,t.key)),d(o))},z=async(e,n,r)=>{let t=M(e,n,r);if(t!==void 0)return o!==void 0&&o.url===t.url&&o.key===t.key?d(o):(i!==void 0&&i.url===t.url&&i.key===t.key&&i.info.state!=="released"&&i.info.state!=="error"||(i!==void 0&&(i.data=void 0),i=P(t.url,t.format,t.key)),d(i))},j=async(e,n,r)=>{let t=y(e);if(t===void 0)throw new Error("unknown track");if(t.data===void 0)throw new Error(`track is ${t.info.state}`);let a=Math.max(0,Math.floor(n)),s=Math.max(0,Math.min(Math.floor(r),C)),u=Math.min(t.data.length,a+s);return t.data.slice(a,u)},G=async e=>{let n=y(e);n!==void 0&&(n.data=void 0,n.info.state==="ready"&&(n.info.state="released"))},W=async()=>({load:d(o),preload:d(i)});0&&(module.exports={preparePreload,prepareStream,readBridge,readTrack,releaseTrack});\n');if(Je===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/nativeProbe.native.ts");var Ur=(...e)=>__ipcRenderer.invoke(Je,"preparePreload",...e),Gr=(...e)=>__ipcRenderer.invoke(Je,"prepareStream",...e),ht=(...e)=>__ipcRenderer.invoke(Je,"readBridge",...e),jr=(...e)=>__ipcRenderer.invoke(Je,"readTrack",...e),Vr=(...e)=>__ipcRenderer.invoke(Je,"releaseTrack",...e);var Wr=`
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
`;var Qr="playback-kit-pitch",me,J={status:"idle",semitones:0,attached:0},Tn=()=>({...J}),Gi=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),ji=async e=>(await un(Wr,Qr),me===void 0&&(me=new AudioWorkletNode(e,Qr,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]}),await mn(me,0),f("info","pitch node inserted into audio engine")),me),Vi=async(e,t)=>{let n=await G();if(n.state!=="running"){J={status:"waiting",reason:"audio context suspended (interact with the page)",semitones:e,context:n.state,attached:J.attached};return}let r=Gi(t);if(r===void 0){J={status:"waiting",reason:"no playing media element",semitones:e,context:n.state,attached:J.attached};return}await _e(r);let i=(await ji(n)).parameters.get("ratio");i!==void 0&&(i.value=Zn(e)),J={status:"running",semitones:e,context:n.state,attached:_().sources}},Ot=async(e,t)=>{if(e===0){if(me!==void 0){let n=me.parameters.get("ratio");n!==void 0&&(n.value=1)}J={...J,status:me===void 0?"idle":"ready",semitones:0,reason:void 0};return}try{await Vi(e,t)}catch(n){let r=n instanceof Error?n.message:String(n);J={status:"unavailable",reason:r,semitones:e,attached:J.attached},f("error","pitch engine unavailable",{error:r})}},Jr=()=>{if(me!==void 0){let e=me.parameters.get("ratio");e!==void 0&&(e.value=1)}J={...J,status:me===void 0?"idle":"ready",semitones:0,reason:void 0}};var qt="unknown",Mn=new Set,we=()=>qt,Ln=e=>{if(e!==qt){f("info","player kind changed",{from:qt,to:e}),qt=e;for(let t of[...Mn])try{t(e)}catch(n){f("error","player kind listener failed",{error:String(n)})}}},Yr=e=>(Mn.add(e),()=>Mn.delete(e));var Wi=(e,t)=>{let n=new Set(e.get().map(a=>a.name));if(!n.has(t))return t;let r=2;for(;n.has(`${t} ${r}`);)r+=1;return`${t} ${r}`},Xr=(e,t,n)=>{let r=e.get(),a={speed:r.speed,pitchShifts:r.pitchShifts,pitchSemitones:r.pitchSemitones,effects:r.effects};if(n.builtin===!0){let i=t.save(Wi(t,`${n.name} (edited)`),a);return i!==void 0&&e.applyPreset(i),i}return t.update(n.id,a),n},bt=(e,t)=>{let n=e.get();n.builtinPresets||n.presetId===null||t.getById(n.presetId)?.builtin===!0&&e.clearPreset()};var Qi=250,Ji=800,Yi=1024*1024,Xi=.4,Zi=420*1024*1024,Y,$t,Cn=!1,aa=!1,Ye=null,Dn=null,Be="idle",Zr=null,j=null,Ce=null,ia=0,zt=0,De=!1,He=!1,ea=0,Kt,Ft=null,Nn=1,ta=()=>{if(Ce===null||!De)return zt;let e=Ce.context;return Math.max(0,e.currentTime-ia+zt)},Oe=()=>{if(Ce===null)return;let e=Ce;Ce=null,De=!1;try{e.stop()}catch{}fn(e)},yt=e=>{if(Y!==void 0){if(e&&!He)Y.setNativeVolume(0),He=!0;else if(!e&&He){let t=Y.getDesiredVolume?.();t!==void 0&&t>0&&(Nn=t),Y.setNativeVolume(Nn),He=!1}}},na=async e=>{if(j===null)return;let t=await G();if(t.state!=="running")throw new Error(`audio context is ${t.state}`);let n=j.duration;if(!Number.isFinite(n)||n<=0)return;let r=Math.min(Math.max(0,e),Math.max(0,n-.02));Oe();let a=t.createBufferSource();a.buffer=j,a.onended=()=>{Ce===a&&(De=!1)},await pn(a),Ce=a;let i=Y?.getNativePosition()??null,d=i===null?r:Math.max(0,Math.min(i+.02,Math.max(0,n-.02)));zt=d,ia=t.currentTime,De=!0,a.start(0,d),f("info","shadow source started",{offset:Number(r.toFixed(3))})},eo=async(e,t)=>{let n=[],r=0;for(;r<t;){let d=await jr(e,r,Math.min(Yi,t-r));if(!(d instanceof Uint8Array)||d.length===0)throw new Error("native bridge returned an empty chunk");n.push(d),r+=d.length}let a=new Uint8Array(r),i=0;for(let d of n)a.set(d,i),i+=d.length;return a},to=async(e,t)=>{let n=await eo(e,t);await Vr(e);let r=await G(),a=new ArrayBuffer(n.byteLength);new Uint8Array(a).set(n);let i=await r.decodeAudioData(a),d=i.length*i.numberOfChannels*4;if(d>Zi)throw new Error(`decoded track is too large (${Math.round(d/1024/1024)} MB)`);j=i,Be="ready",f("info","shadow track decoded",{seconds:Number(i.duration.toFixed(2)),channels:i.numberOfChannels})},An=e=>{Kt=String(e),Be="failed",Ft=Ye,Oe(),j=null,yt(!1),f("error","shadow player failed",{error:Kt})},no=e=>e.nativeEffects&&(Ke(e.effects)||e.pitchSemitones!==0),ro=async()=>{if(Y===void 0)return;let e=Y.getSettings();if(!(aa&&we()==="native"&&no(e))){(Ce!==null||j!==null||He)&&(Oe(),j=null,Be="idle",yt(!1)),Ye=null,Dn=null,Ft=null;return}let n=Date.now();if(n-ea>=Ji){ea=n;let i=Bt();if(i.preload!==void 0&&i.preload.at!==Dn&&(Dn=i.preload.at,Ur(i.preload.url,i.preload.format,i.preload.key)),i.load!==void 0&&i.load.at!==Ye){Ye=i.load.at,Ft=null,Kt=void 0,j=null,Be="preparing",Oe(),Zr=(await Gr(i.load.url,i.load.format,i.load.key))?.id??null;return}if(Be==="preparing"){let o=(await ht()).load;if(o!==void 0&&o.state==="error"){An(o.error??"native stream could not be prepared");return}if(o!==void 0&&o.state==="ready"&&o.id===Zr)try{await to(o.id,o.bytes)}catch(l){An(l);return}}}if(Be==="failed"&&Ye===Ft||j===null)return;He&&Y.setNativeVolume(0);let r=Y.getNativePosition();if(r===null)return;if(!Y.isPlaying()){De&&Oe(),zt=r,yt(!1);return}if(r>=j.duration-.05){De&&Oe();return}if(yt(!0),!De){await na(r+.05);return}Math.abs(ta()-r)>Xi&&(f("info","shadow resync",{ours:Number(ta().toFixed(3)),native:Number(r.toFixed(3))}),await na(r+.05))},ra=()=>{Cn||(Cn=!0,ro().catch(e=>{f("error","shadow tick failed",{error:String(e)}),An(e)}).finally(()=>{Cn=!1}))},In=e=>{aa=e.nativeEffects},Rn=()=>({state:Be,bufferSeconds:j===null?null:Number(j.duration.toFixed(2)),playing:De,muted:He,loadAt:Ye,error:Kt}),oa=(e,t)=>{Y=t,Nn=t.getDesiredVolume?.()??1,$t=setInterval(ra,Qi),ra(),e.add(()=>{$t!==void 0&&clearInterval($t),$t=void 0,Oe(),j=null,yt(!1),Y=void 0})};var ao=e=>Math.abs(e-1)>.001,_n=e=>{if(!ao(e.getSpeed())||!e.isPlaying())return!1;let t=e.getPosition();return t===null||!Number.isFinite(t)||t<0?!1:(e.dispatchTimeUpdate(t),!0)},sa=(e,t=100)=>{let n=setInterval(()=>_n(e),t);return()=>clearInterval(n)};var c=Fe(Hn(),1),m=Fe(la(),1);var da=e=>({id:e.id,paused:e.paused,readyState:e.readyState,currentTime:Number(e.currentTime.toFixed(2)),playbackRate:e.playbackRate}),ca=async(e=1200)=>{let t=Date.now(),n=_(),r=oe(),a=r.find(h=>!h.paused&&h.readyState>0)??r[0];if(a===void 0){let h={at:t,ok:!1,reason:"no media element",context:n.context,engine:n};return f("warn","audio self-test: no media element"),h}let i=a.currentTime;try{await _e(a)}catch(h){let I={at:t,ok:!1,reason:h instanceof Error?h.message:String(h),context:_().context,element:da(a),engine:_()};return f("warn","audio self-test failed to attach",I),I}let d=await G(),o=0,l=0,g=!0;try{let h=await gn(e);o=h.rms,l=h.peak,g=h.silent}catch(h){f("error","audio self-test measurement failed",{error:String(h)})}let b=Number((a.currentTime-i).toFixed(2)),k=d.state!=="running"?`audio context ${d.state}`:a.paused?"playback is paused":g&&b>.2?"captured audio is silent (DRM-protected or already routed elsewhere)":g?"no audio measured":void 0,w={at:t,ok:k===void 0,reason:k,context:d.state,element:da(a),progressionSeconds:b,rms:Number(o.toFixed(5)),peak:Number(l.toFixed(5)),silent:g,engine:_()};return f(w.ok?"info":"warn","audio self-test",w),w};var V=Fe(Hn(),1);var io=132,ua=te-Se,qn=e=>Math.max(Se,Math.min(te,e)),pa=e=>`${e>0?"+":""}${e}`,fa=e=>e>=1e3?`${e/1e3}k`:String(e),oo=({frequency:e,value:t,disabled:n,onChange:r})=>{let a=V.default.useRef(null),[i,d]=V.default.useState(null),o=h=>{let I=a.current;if(I===null)return;let C=I.getBoundingClientRect(),L=Math.max(0,Math.min(1,(h-C.top)/C.height));d(L*100),r(qn(Math.round(te-L*ua)))},l=i??(te-t)/ua*100,g=50,b=Math.min(l,g),k=Math.abs(l-g),w=i===null;return V.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:30,opacity:n?.4:1}},V.default.createElement("span",{style:{fontSize:10,fontVariantNumeric:"tabular-nums",color:"currentColor",opacity:.8}},pa(t)),V.default.createElement("div",{ref:a,role:"slider",tabIndex:n?-1:0,"aria-label":`${fa(e)} Hz`,"aria-valuemin":Se,"aria-valuemax":te,"aria-valuenow":t,"aria-valuetext":`${pa(t)} dB`,"aria-disabled":n,onPointerDown:h=>{n||(h.preventDefault(),h.currentTarget.setPointerCapture(h.pointerId),o(h.clientY))},onPointerMove:h=>{n||!h.currentTarget.hasPointerCapture(h.pointerId)||o(h.clientY)},onPointerUp:h=>{h.currentTarget.hasPointerCapture(h.pointerId)&&h.currentTarget.releasePointerCapture(h.pointerId),d(null)},onPointerCancel:h=>{h.currentTarget.hasPointerCapture(h.pointerId)&&h.currentTarget.releasePointerCapture(h.pointerId),d(null)},onDoubleClick:()=>{n||r(0)},onKeyDown:h=>{if(n)return;let I=h.shiftKey?3:1;if(h.key==="ArrowUp"||h.key==="ArrowRight")r(qn(t+I));else if(h.key==="ArrowDown"||h.key==="ArrowLeft")r(qn(t-I));else if(h.key==="Home")r(Se);else if(h.key==="End")r(te);else return;h.preventDefault()},style:{position:"relative",width:18,height:io,cursor:n?"default":"pointer",touchAction:"none",outline:"none"}},V.default.createElement("div",{style:{position:"absolute",left:"50%",top:0,bottom:0,width:5,transform:"translateX(-50%)",borderRadius:999,background:"color-mix(in srgb, currentColor 16%, transparent)"}}),V.default.createElement("div",{style:{position:"absolute",left:0,right:0,top:`${g}%`,height:1,background:"color-mix(in srgb, currentColor 28%, transparent)"}}),V.default.createElement("div",{style:{position:"absolute",left:"50%",width:5,transform:"translateX(-50%)",borderRadius:999,top:`${b}%`,height:`${k}%`,background:"var(--wave-color-solid-accent-fill, currentColor)",transition:w?"top 120ms ease, height 120ms ease":"none"}}),V.default.createElement("div",{style:{position:"absolute",left:"50%",top:`${l}%`,width:12,height:12,transform:"translate(-50%, -50%)",borderRadius:"50%",background:"currentColor",boxShadow:"0 0 0 3px color-mix(in srgb, var(--wave-color-solid-accent-fill, currentColor) 22%, transparent), 0 1px 3px rgba(0,0,0,.5)",transition:w?"top 120ms ease":"none"}})),V.default.createElement("span",{style:{fontSize:9,opacity:.6,letterSpacing:"-0.02em"}},fa(e)))},ma=({eq:e,disabled:t,onChange:n})=>V.default.createElement("div",{style:{display:"flex",gap:8,alignItems:"flex-end",marginLeft:"auto",padding:"2px 0"}},ze.map((r,a)=>V.default.createElement(oo,{key:r,frequency:r,value:e.bands[a]??0,disabled:t,onChange:i=>{let d=[...e.bands];d[a]=i,n(d)}})));var $n=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)&&t>0?t:void 0},$=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)?t:void 0},so=e=>{let t=e.pitchShifts?"pitch follows speed":e.pitchSemitones===0?"pitch preserved":`pitch ${it(e.pitchSemitones)} st`;return`${re(e.speed)}\xD7 \xB7 ${t} \xB7 ${kt(e.effects)}`},qe={display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:6,marginLeft:"auto"},Xe=({children:e})=>c.default.createElement("div",{style:{marginBottom:16}},e),lo=()=>{let[e,t]=c.default.useState(v.get),[n,r]=c.default.useState(M.get),[a,i]=c.default.useState("Copy diagnostics"),[d,o]=c.default.useState("Resolving\u2026"),[l,g]=c.default.useState(""),[b,k]=c.default.useState(null),[w,h]=c.default.useState(!1),[I,C]=c.default.useState("Attaches the playing element, measures captured RMS and reports blocked/silent reasons. May silence playback if capture fails; restart TIDAL to undo.");c.default.useEffect(()=>v.subscribe(t),[]),c.default.useEffect(()=>M.subscribe(()=>r(M.get())),[]),c.default.useEffect(()=>{Pt().then(o).catch(()=>o("unavailable"))},[]),c.default.useEffect(()=>{if(a==="Copy diagnostics")return;let s=setTimeout(()=>i("Copy diagnostics"),1800);return()=>clearTimeout(s)},[a]),c.default.useEffect(()=>{if(l==="")return;let s=setTimeout(()=>g(""),4e3);return()=>clearTimeout(s)},[l]);let{bounds:L,pitchShifts:Ee,developerMode:X,effects:S,builtinPresets:le,nativeEffects:Pe}=e,R=le?n:n.filter(s=>s.builtin!==!0),ge=R.findIndex(s=>s.builtin!==!0),F=s=>v.setEffects({...S,eq:{...S.eq,...s}}),z=s=>v.setEffects({...S,bass:{...S.bass,...s}}),K=s=>v.setEffects({...S,eightD:{...S.eightD,...s}}),D=s=>v.setEffects({...S,delay:{...S.delay,...s}}),B=s=>v.setEffects({...S,reverb:{...S.reverb,...s}}),de=async s=>{let u=Et(s);return u===void 0?!1:(v.replace(u.settings),M.replace(u.presets),bt(v,M),await je(pt(u.settings,u.presets)),!0)},ce=async()=>{try{let s=await dr();if(s===null)return g("Import cancelled");let u=await de(s.json);g(u?`Imported ${s.path}`:"Import failed: invalid config")}catch(s){g(`Import failed: ${String(s)}`)}},Te=async()=>{try{let s=await lr(pt(v.get(),M.get()));g(s===null?"Export cancelled":`Exported ${s}`)}catch(s){g(`Export failed: ${String(s)}`)}},he=async()=>{try{let s=await Tt();if(s===null)return g("Config file not found");let u=await de(s);g(u?"Reloaded from config file":"Reload failed: invalid config")}catch(s){g(`Reload failed: ${String(s)}`)}},H=s=>{window.confirm(`Overwrite "${s.name}" with the current speed, pitch and effects?`)&&(M.update(s.id,{speed:e.speed,pitchShifts:e.pitchShifts,pitchSemitones:e.pitchSemitones,effects:e.effects}),g(`Updated "${s.name}"`))},ue=s=>{window.confirm(`Delete preset "${s.name}"?`)&&(M.remove(s.id),g(`Deleted "${s.name}"`))};return c.default.createElement("div",{style:{paddingBottom:8}},c.default.createElement(Xe,null,c.default.createElement(m.LunaSettings,{title:"Playback",desc:"Speed and pitch. Effects live in their own section below."},c.default.createElement(m.LunaTextSetting,{title:"Minimum speed",desc:"Below 0.0625\xD7 Chromium plays at its floor.",defaultValue:re(L.min),inputProps:{inputMode:"decimal"},onChange:s=>{let u=$n(s.target.value);u!==void 0&&v.setBounds({min:u})}}),c.default.createElement(m.LunaTextSetting,{title:"Maximum speed",defaultValue:re(L.max),inputProps:{inputMode:"decimal"},onChange:s=>{let u=$n(s.target.value);u!==void 0&&v.setBounds({max:u})}}),c.default.createElement(m.LunaTextSetting,{title:"Snap step",desc:"Slider snapping and the \u2212 / + step size.",defaultValue:re(L.step),inputProps:{inputMode:"decimal"},onChange:s=>{let u=$n(s.target.value);u!==void 0&&v.setBounds({step:u})}}),c.default.createElement(m.LunaSwitchSetting,{title:"Pitch follows speed",desc:"Chipmunk / slow-mo. Clears any custom pitch shift.",checked:Ee,onChange:s=>v.setPitchShifts(s.target.checked)}),c.default.createElement(m.LunaSetting,{title:"Reset",desc:"Back to 1.00\xD7, pitch shift off, all effects off."},c.default.createElement("div",{style:qe},c.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>v.reset()},"Reset playback"))))),c.default.createElement(Xe,null,c.default.createElement(m.LunaSettings,{title:"Presets",desc:"Capture speed, pitch and effects. Built-ins are fixed; custom presets can be applied, renamed, updated, reordered and deleted."},c.default.createElement(m.LunaSwitchSetting,{title:"Built-in presets",desc:"Show the built-in presets.",checked:le,onChange:s=>{let u=s.target.checked;v.setBuiltinPresets(u),bt(v,M)}}),R.map((s,u)=>{let be=e.presetId===s.id&&!ut(s,e);return c.default.createElement(m.LunaSetting,{key:s.id,title:`${s.name}${be?" *":""}`,desc:so(s)},c.default.createElement("div",{style:qe},e.presetId===s.id?c.default.createElement("span",{style:{fontSize:12,opacity:.7}},"Active"):c.default.createElement(m.LunaButton,{size:"small",onClick:()=>v.applyPreset(s)},"Use"),s.builtin===!0?c.default.createElement("span",{style:{fontSize:12,opacity:.6}},"Built-in"):c.default.createElement(c.default.Fragment,null,c.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>k({id:s.id,name:s.name,value:s.name})},"Rename"),c.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>H(s)},"Update"),c.default.createElement(m.LunaButton,{size:"small",variant:"text",disabled:u<=ge,title:"Move up",onClick:()=>M.move(s.id,-1)},"\u2191"),c.default.createElement(m.LunaButton,{size:"small",variant:"text",disabled:u>=R.length-1,title:"Move down",onClick:()=>M.move(s.id,1)},"\u2193"),c.default.createElement(m.LunaButton,{size:"small",variant:"text",color:"error",onClick:()=>ue(s)},"Delete"))))}),b!==null&&c.default.createElement(c.default.Fragment,null,c.default.createElement(m.LunaTextSetting,{title:`Rename ${b.name}`,defaultValue:b.value,onChange:s=>k({...b,value:s.target.value})}),c.default.createElement(m.LunaSetting,{title:" "},c.default.createElement("div",{style:qe},c.default.createElement(m.LunaButton,{size:"small",onClick:()=>{M.rename(b.id,b.value),k(null)}},"Save"),c.default.createElement(m.LunaButton,{size:"small",variant:"text",onClick:()=>k(null)},"Cancel")))))),c.default.createElement(Xe,null,c.default.createElement(m.LunaSettings,{title:"Native player",desc:"TIDAL's lossless player runs in a separate process. This plays the same stream through the effects chain."},c.default.createElement(m.LunaSwitchSetting,{title:"Effects on native lossless",desc:"Experimental. Downloads the track a second time (prefetched where possible) and mutes TIDAL's own playback. Needs the electron trust prompt; speed stays disabled on native.",checked:Pe,onChange:s=>v.setNativeEffects(s.target.checked)}))),c.default.createElement(Xe,null,c.default.createElement(m.LunaSettings,{title:"Effects",desc:"Same Web Audio chain as pitch. Needs audio capture \u2014 use the dev-mode self-test if nothing changes."},c.default.createElement(m.LunaSwitchSetting,{title:"Equalizer",desc:"8 bands, 62 Hz to 8 kHz, \xB112 dB. Drag a band; double-click resets it.",checked:S.eq.enabled,onChange:s=>F({enabled:s.target.checked})}),c.default.createElement(m.LunaSetting,{title:"Bands",desc:"Shift+arrow for 3 dB steps."},c.default.createElement(ma,{eq:S.eq,disabled:!S.eq.enabled,onChange:s=>F({bands:s})})),c.default.createElement(m.LunaSetting,{title:"Flatten",desc:"Set every band to 0 dB."},c.default.createElement("div",{style:qe},c.default.createElement(m.LunaButton,{size:"small",variant:"outlined",disabled:!S.eq.enabled,onClick:()=>F({bands:Array.from({length:at},()=>0)})},"Flatten EQ"))),c.default.createElement(m.LunaSwitchSetting,{title:"Bass boost",desc:"Parallel low-shelf sub boost with saturation for dirty kicks. Added on top of the dry signal.",checked:S.bass.enabled,onChange:s=>z({enabled:s.target.checked})}),c.default.createElement(m.LunaTextSetting,{title:"Bass boost (dB)",desc:"Low shelf at 90 Hz, 0\u201324 dB.",defaultValue:String(Math.round(S.bass.boost)),inputProps:{inputMode:"numeric"},onChange:s=>{let u=$(s.target.value);u!==void 0&&z({boost:Math.max(0,Math.min(24,u))})}}),c.default.createElement(m.LunaTextSetting,{title:"Sub (dB)",desc:"Extra shelf at 45 Hz, 0\u201312 dB.",defaultValue:String(Math.round(S.bass.sub)),inputProps:{inputMode:"numeric"},onChange:s=>{let u=$(s.target.value);u!==void 0&&z({sub:Math.max(0,Math.min(12,u))})}}),c.default.createElement(m.LunaTextSetting,{title:"Drive (%)",desc:"Saturation on the bass path; more harmonics, dirtier kicks.",defaultValue:String(Math.round(S.bass.drive*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let u=$(s.target.value);u!==void 0&&z({drive:Math.max(0,Math.min(100,u))/100})}}),c.default.createElement(m.LunaTextSetting,{title:"Bass amount (%)",desc:"How much of the boosted bass is added back.",defaultValue:String(Math.round(S.bass.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let u=$(s.target.value);u!==void 0&&z({mix:Math.max(0,Math.min(100,u))/100})}}),c.default.createElement(m.LunaSwitchSetting,{title:"8D audio",desc:"LFO panning plus a constant pitch wobble, so the mix moves around your head.",checked:S.eightD.enabled,onChange:s=>K({enabled:s.target.checked})}),c.default.createElement(m.LunaTextSetting,{title:"8D pan rate (Hz)",desc:"How fast the sound travels left/right.",defaultValue:String(S.eightD.rate),inputProps:{inputMode:"decimal"},onChange:s=>{let u=$(s.target.value);u!==void 0&&K({rate:Math.max(.02,Math.min(2,u))})}}),c.default.createElement(m.LunaTextSetting,{title:"8D pan depth (%)",defaultValue:String(Math.round(S.eightD.panDepth*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let u=$(s.target.value);u!==void 0&&K({panDepth:Math.max(0,Math.min(100,u))/100})}}),c.default.createElement(m.LunaTextSetting,{title:"8D pitch rate (Hz)",desc:"Speed of the constant pitch wobble.",defaultValue:String(S.eightD.pitchRate),inputProps:{inputMode:"decimal"},onChange:s=>{let u=$(s.target.value);u!==void 0&&K({pitchRate:Math.max(.02,Math.min(2,u))})}}),c.default.createElement(m.LunaTextSetting,{title:"8D pitch depth (ms)",desc:"Delay modulation depth; higher = wider pitch smear.",defaultValue:String(S.eightD.pitchDepth),inputProps:{inputMode:"decimal"},onChange:s=>{let u=$(s.target.value);u!==void 0&&K({pitchDepth:Math.max(0,Math.min(12,u))})}}),c.default.createElement(m.LunaTextSetting,{title:"8D mix (%)",desc:"Dry/wet amount; higher is more immersive.",defaultValue:String(Math.round(S.eightD.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let u=$(s.target.value);u!==void 0&&K({mix:Math.max(0,Math.min(100,u))/100})}}),c.default.createElement(m.LunaSwitchSetting,{title:"Delay",desc:"Feedback delay.",checked:S.delay.enabled,onChange:s=>D({enabled:s.target.checked})}),c.default.createElement(m.LunaTextSetting,{title:"Delay time (ms)",defaultValue:String(Math.round(S.delay.timeMs)),inputProps:{inputMode:"numeric"},onChange:s=>{let u=$(s.target.value);u!==void 0&&D({timeMs:Math.max(20,Math.min(2e3,u))})}}),c.default.createElement(m.LunaTextSetting,{title:"Delay feedback (%)",defaultValue:String(Math.round(S.delay.feedback*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let u=$(s.target.value);u!==void 0&&D({feedback:Math.max(0,Math.min(90,u))/100})}}),c.default.createElement(m.LunaTextSetting,{title:"Delay mix (%)",defaultValue:String(Math.round(S.delay.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let u=$(s.target.value);u!==void 0&&D({mix:Math.max(0,Math.min(100,u))/100})}}),c.default.createElement(m.LunaSwitchSetting,{title:"Reverb",desc:"Generated impulse response.",checked:S.reverb.enabled,onChange:s=>B({enabled:s.target.checked})}),c.default.createElement(m.LunaTextSetting,{title:"Reverb decay (s)",defaultValue:String(S.reverb.decay),inputProps:{inputMode:"decimal"},onChange:s=>{let u=$(s.target.value);u!==void 0&&B({decay:Math.max(.2,Math.min(8,u))})}}),c.default.createElement(m.LunaTextSetting,{title:"Reverb mix (%)",defaultValue:String(Math.round(S.reverb.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let u=$(s.target.value);u!==void 0&&B({mix:Math.max(0,Math.min(100,u))/100})}}))),c.default.createElement(Xe,null,c.default.createElement(m.LunaSettings,{title:"Config file",desc:"Versioned JSON, editable outside Luna. Autosaves 300 ms after changes."},c.default.createElement(m.LunaSetting,{title:"Path",desc:d},c.default.createElement("div",{style:qe},c.default.createElement(m.LunaButton,{size:"small",variant:"text",onClick:()=>{ln(d)}},"Copy path"))),c.default.createElement(m.LunaSetting,{title:"Actions",desc:l===""?void 0:l},c.default.createElement("div",{style:qe},c.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{cr()}},"Show folder"),c.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{he()}},"Reload"),c.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{ce()}},"Import\u2026"),c.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Te()}},"Export\u2026"))))),c.default.createElement(Xe,null,c.default.createElement(m.LunaSettings,{title:"Developer",desc:"Logs and test tools are off unless you need to report a bug."},c.default.createElement(m.LunaSwitchSetting,{title:"Developer mode",desc:"Write diagnostics logs and show the Copy diagnostics action.",checked:X,onChange:s=>v.setDeveloperMode(s.target.checked)}),X&&c.default.createElement(m.LunaSetting,{title:"Audio engine self-test",desc:I},c.default.createElement("div",{style:qe},c.default.createElement(m.LunaButton,{size:"small",variant:"outlined",disabled:w,onClick:async()=>{h(!0);try{let s=await ca();C(s.ok?`OK \xB7 ${s.context} \xB7 rms ${s.rms} \xB7 peak ${s.peak} \xB7 \u0394${s.progressionSeconds}s`:`Failed \xB7 ${s.reason??"unknown"} \xB7 context ${s.context}`)}finally{h(!1)}}},w?"Testing\u2026":"Run test"))),X&&c.default.createElement(m.LunaButtonSetting,{title:"Diagnostics",desc:"Copy player, pitch-engine, effects, theme and media state plus recent logs.",children:a,onClick:async()=>{i("Copying\u2026");let s=await We(v.get());i(s?"Copied":"Copy failed")}}))))};var vt=new Set,{trace:ga}=(0,Ne.Tracer)("[PlaybackKit]"),co=1e3,uo=1500,zn="tidaluna.playback-speed.previous-quality",xa=()=>{try{return localStorage.getItem(zn)}catch{return null}},po=e=>{try{localStorage.setItem(zn,e)}catch{}},ka=()=>{try{localStorage.removeItem(zn)}catch{}},wa=e=>{let t={to:e},n=se.redux.actions["settings/SET_STREAMING_QUALITY"];typeof n=="function"?n(t):se.redux.store.dispatch({type:"settings/SET_STREAMING_QUALITY",payload:t})},ha=()=>{let t=(0,Ne.findModuleByProperty)((n,r)=>n==="activePlayer"&&typeof r=="object"&&r!==null)?.activePlayer;if(t===void 0)return{found:!1};try{let n=Object.getPrototypeOf(t),r=n===null?[]:Object.getOwnPropertyNames(n).filter(i=>{try{return typeof t[i]=="function"}catch{return!1}}).slice(0,60),a=i=>{try{return t[i]}catch{return}};return{found:!0,name:a("name"),constructor:t.constructor?.name,state:a("playbackState")??a("state"),currentTime:a("currentTime"),methods:r,hasSetPlaybackRate:r.includes("setPlaybackRate"),hasMediaElement:!!(a("mediaElement")??a("video")??a("element"))}}catch(n){return{found:!0,error:String(n)}}},ba=()=>{let t=(0,Ne.findModuleByProperty)((n,r)=>n==="activePlayer"&&typeof r=="object"&&r!==null)?.activePlayer?.name;return t==="nativePlayer"?"native":t==="shakaPlayer"?"shaka":t==="browserPlayer"?"browser":"unknown"},ya,Ea=()=>(ya??=(0,Ne.findModuleByProperty)((e,t)=>e==="activePlayer"&&typeof t=="object"&&t!==null),ya?.activePlayer),Fn=()=>{if(we()==="native"){let n=Ea()?.currentTime;return typeof n=="number"&&Number.isFinite(n)?n:null}let e=oe(),t=e.find(n=>!n.paused&&n.readyState>0)??e.find(n=>n.readyState>0);return t===void 0?null:t.currentTime},Pa=()=>{try{return se.redux.store.getState().playbackControls?.playbackState==="PLAYING"}catch{return!1}},fo=e=>{let t=se.redux.actions["playbackControls/TIME_UPDATE"];typeof t=="function"?t(e):se.redux.store.dispatch({type:"playbackControls/TIME_UPDATE",payload:e})},mo=()=>{try{let e=se.redux.store.getState().playbackControls;if(e===void 0)return null;let t=e.latestCurrentTime??0;return e.playbackState!=="PLAYING"?t:t+Math.abs(Date.now()-(e.latestCurrentTimeSyncTimestamp??Date.now()))/1e3}catch{return null}},va={getSpeed:()=>v.get().speed,isPlaying:Pa,getPosition:Fn,dispatchTimeUpdate:fo},go=()=>{try{let e=se.redux.store.getState(),t=e.playQueue?.elements?.[e.playQueue.currentIndex??-1]?.mediaItemId,n=t===void 0?void 0:e.content?.mediaItems?.[String(t)];return{setting:e.settings?.quality?.streaming??null,track:n?.audioQuality??null,actual:e.playbackControls?.playbackContext?.actualAudioQuality??null,streamType:e.playbackControls?.playbackContext?.actualStreamType??null,codec:e.playbackControls?.playbackContext?.codec??null,sampleRate:e.playbackControls?.playbackContext?.sampleRate??null,bitDepth:e.playbackControls?.playbackContext?.bitDepth??null}}catch(e){return{error:String(e)}}},ho=()=>{try{let e=se.redux.store.getState(),t=e.playQueue,n=t?.elements?.[t.currentIndex??-1]?.mediaItemId;if(n===void 0)return null;let r=e.content?.mediaItems?.[String(n)];return r===void 0?{id:n,found:!1}:{id:n,found:!0,title:r.title,bpm:r.bpm??null,key:r.key??r.keyScale??null,metadataKeys:Object.keys(r).filter(a=>/bpm|key|tempo|tone/i.test(a))}}catch(e){return{error:String(e)}}},Ta=!1,Ze,Kn=()=>pt(v.get(),M.get()),Sa=()=>{Ta&&(Ze!==void 0&&clearTimeout(Ze),Ze=setTimeout(()=>{Ze=void 0,je(Kn()).catch(e=>f("error","config save failed",{error:String(e)}))},300))},bo=async()=>{try{let e=await Tt(),t=e===null?void 0:Et(e),n=await Pt();t!==void 0?(v.replace(t.settings),M.replace(t.presets),bt(v,M),f("info","config loaded",{path:n,speed:t.settings.speed,presets:t.presets.length})):(await je(Kn()),f("info",e===null?"config created":"config invalid, rewrote defaults",{path:n}))}catch(e){f("warn","config file unavailable; using browser storage only",{error:String(e)})}finally{Ta=!0}},yo=()=>{try{let e=se.redux.actions["router/PUSH"];if(typeof e!="function")throw new Error("router/PUSH is unavailable");e({pathname:"/not-found",search:"LunaSettings",replace:!0}),f("info","opening Luna settings"),setTimeout(()=>{let n=[...document.querySelectorAll('[role="tab"]')].find(r=>(r.textContent??"").trim()==="Plugins");n!==void 0&&n.getAttribute("aria-selected")!=="true"&&n.click(),setTimeout(()=>{[...document.querySelectorAll("h1,h2,h3,h4,h5,h6,span,p,div")].find(i=>(i.textContent??"").trim()==="@kyoto-aircon/playback-kit")?.scrollIntoView({block:"center",behavior:"smooth"})},250)},250)}catch(e){f("error","open Luna settings failed",{error:String(e)})}},vo=()=>{try{let t=se.redux.store.getState().settings?.quality?.streaming;if(t==="HIGH"){f("info","already on the browser player quality");return}f("info","switching streaming quality to HIGH",{from:t}),typeof t=="string"&&po(t),wa("HIGH")}catch(e){f("error","quality switch failed",{error:String(e)})}},So=()=>{let e=xa();e!==null&&(f("info","restoring streaming quality",{to:e}),wa(e),ka())},Ma=()=>{let e=Bt();return{load:e.load===void 0?void 0:vn(e.load),preload:e.preload===void 0?void 0:vn(e.preload)}},xo=e=>{let t={version:Ve,logs:mr,logText:on,report:()=>sn(v.get()),copy:()=>We(v.get()),clear:gr,setVerbose:hr,selectors:Mt,playerKind:we,audioEngine:_,native:Ht,nativeBridge:ht,nativeStream:Ma,nativeVolume:En,shadow:Rn,store:v,controller:e};globalThis.__playbackSpeed=t,vt.add(()=>{globalThis.__playbackSpeed===t&&delete globalThis.__playbackSpeed})};try{an(v.get().developerMode),xr(()=>ht()),yr(ha);try{let o=Ne.LunaPlugin.getByName("@kyoto-aircon/playback-speed");o!==void 0&&f("warn","old Playback Speed plugin is still installed",{enabled:o.store?.enabled})}catch{}Sr(()=>({kind:we(),native:Ht(),nativeInstance:Fr(),speed:v.get().speed,track:ho(),audioEngine:_(),quality:go(),effects:Nr(),pitchSemitones:v.get().pitchSemitones,pitchEngine:Tn(),presetId:v.get().presetId,uiTime:mo(),actualTime:Fn(),shadow:Rn(),nativeStream:Ma()})),$r(()=>Ea()),wn(),f("info","loading",{version:Ve,selectors:Mt(),media:oe().length,settings:v.get(),tidal:ha(),native:Ht()});let e=Pr();vt.add(()=>Tr(e));let t=new Rt(oe,v);t.start(),oa(vt,{getNativePosition:Fn,isPlaying:Pa,setNativeVolume:Kr,getDesiredVolume:En,getSettings:()=>v.get()}),In(v.get());let n=v.subscribe(o=>{an(o.developerMode),In(o),Sa(),f("info","settings changed",{speed:o.speed,pitchShifts:o.pitchShifts,bounds:o.bounds}),t.apply(),we()==="native"&&Pn(o.speed),_n(va),Ot(o.pitchSemitones,oe()),yn(o.effects,oe())});M.subscribe(Sa),bo(),Dr(vt,v,{getPlayerKind:we,subscribePlayerKind:Yr,useBrowserPlayer:vo,previousQuality:xa,restoreQuality:So,presets:{list:()=>M.get().filter(o=>v.get().builtinPresets||o.builtin!==!0),apply:o=>{v.applyPreset(o),f("info","preset applied",{id:o.id,name:o.name})},clear:()=>v.clearPreset(),save:(o,l)=>M.save(o,l),saveActive:o=>{let l=Xr(v,M,o);f("info","saved preset from live state",{id:l?.id,builtin:o.builtin===!0})}},getPitchEngineState:Tn,openSettings:yo,enableNativeEffects:()=>v.setNativeEffects(!0),onOpen:()=>{let o=v.get().pitchSemitones;o!==0&&Ot(o,oe())}}),xo(t);let a=setInterval(()=>{t.scan();let o=v.get().pitchSemitones;o!==0&&Ot(o,oe());let l=v.get().effects;Ke(l)&&yn(l,oe())},co),i=sa(va);Ln(ba());let d=setInterval(()=>{wn();let o=ba(),l=we();Ln(o),o!==l&&o==="native"&&(Pn(v.get().speed),ka())},uo);vt.add(()=>{Ze!==void 0&&(clearTimeout(Ze),je(Kn()).catch(()=>{})),clearInterval(a),clearInterval(d),i(),n(),t.stop(),Jr(),Ar()}),ga.log("loaded")}catch(e){f("error","failed to load",{error:String(e),stack:e?.stack}),ga.err("Failed to load:",e)}export{lo as Settings,vt as unloads};
//# sourceMappingURL=kyoto-aircon.playback-kit.mjs.map
