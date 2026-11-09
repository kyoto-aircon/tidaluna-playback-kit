var Aa=Object.create;var hn=Object.defineProperty;var Ia=Object.getOwnPropertyDescriptor;var Ra=Object.getOwnPropertyNames;var Ba=Object.getPrototypeOf,Ha=Object.prototype.hasOwnProperty;var nt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var _a=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Ra(t))!Ha.call(e,r)&&r!==n&&hn(e,r,{get:()=>t[r],enumerable:!(a=Ia(t,r))||a.enumerable});return e};var Ce=(e,t,n)=>(n=e!=null?Aa(Ba(e)):{},_a(t||!e||!e.__esModule?hn(n,"default",{value:e,enumerable:!0}):n,e));var bn=nt((ai,Tt)=>{Tt.exports=luna?.core?.modules?.["@luna/core"];if(Tt.exports===void 0)throw new Error("Cannot find module @luna/core in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/core")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Lt=nt((ri,Mt)=>{Mt.exports=luna?.core?.modules?.["@luna/lib"];if(Mt.exports===void 0)throw new Error("Cannot find module @luna/lib in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/lib")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var nn=nt((Qi,tn)=>{tn.exports=luna?.core?.modules?.react;if(tn.exports===void 0)throw new Error("Cannot find module react in luna.core.modules");luna.core.LunaPlugin.getByName("react")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var da=nt((Ji,an)=>{an.exports=luna?.core?.modules?.["@luna/ui"];if(an.exports===void 0)throw new Error("Cannot find module @luna/ui in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/ui")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Se=Ce(bn(),1),ue=Ce(Lt(),1);var De=[62,125,250,500,1e3,2e3,4e3,8e3],Ke=De.length,ge=-12,X=12,w={eq:{enabled:!1,bands:Array.from({length:Ke},()=>0)},bass:{enabled:!1,boost:6,sub:3,drive:.2,mix:.6},eightD:{enabled:!1,rate:.12,panDepth:.8,pitchRate:.3,pitchDepth:4},delay:{enabled:!1,timeMs:250,feedback:.25,mix:.25},reverb:{enabled:!1,decay:2,mix:.25}},N=(e,t,n,a)=>{let r=typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(r)?Math.min(n,Math.max(t,r)):a},Ge=(e,t)=>typeof e=="boolean"?e:t,Oa=e=>{let t=Array.from({length:Ke},()=>0);if(Array.isArray(e.bands)){for(let i=0;i<Ke;i+=1)t[i]=N(e.bands[i],ge,X,0);return t}let n=N(e.low,ge,X,0),a=N(e.mid,ge,X,0),r=N(e.high,ge,X,0);return[n,n,a,a,a,r,r,r]},F=e=>{let t=typeof e=="object"&&e!==null?e:{},n=typeof t.eq=="object"&&t.eq!==null?t.eq:{},a=typeof t.eightD=="object"&&t.eightD!==null?t.eightD:{},r=typeof t.bass=="object"&&t.bass!==null?t.bass:{},i=typeof t.delay=="object"&&t.delay!==null?t.delay:{},c=typeof t.reverb=="object"&&t.reverb!==null?t.reverb:{};return{eq:{enabled:Ge(n.enabled,w.eq.enabled),bands:Oa(n)},eightD:{enabled:Ge(a.enabled,w.eightD.enabled),rate:N(a.rate,.02,2,w.eightD.rate),panDepth:N(a.panDepth,0,1,w.eightD.panDepth),pitchRate:N(a.pitchRate,.02,2,w.eightD.pitchRate),pitchDepth:N(a.pitchDepth,0,12,w.eightD.pitchDepth)},bass:{enabled:Ge(r.enabled,w.bass.enabled),boost:N(r.boost,0,24,w.bass.boost),sub:N(r.sub,0,12,w.bass.sub),drive:N(r.drive,0,1,w.bass.drive),mix:N(r.mix,0,1,w.bass.mix)},delay:{enabled:Ge(i.enabled,w.delay.enabled),timeMs:N(i.timeMs,20,2e3,w.delay.timeMs),feedback:N(i.feedback,0,.9,w.delay.feedback),mix:N(i.mix,0,1,w.delay.mix)},reverb:{enabled:Ge(c.enabled,w.reverb.enabled),decay:N(c.decay,.2,8,w.reverb.decay),mix:N(c.mix,0,1,w.reverb.mix)}}},at=e=>e.eq.enabled||e.bass.enabled||e.eightD.enabled||e.delay.enabled||e.reverb.enabled,rt=e=>{let t=[];return e.eq.enabled&&t.push("EQ 8-band"),e.eightD.enabled&&t.push(`8D ${e.eightD.rate.toFixed(2)} Hz`),e.bass.enabled&&t.push(`Bass +${Math.round(e.bass.boost)} dB`),e.delay.enabled&&t.push(`Delay ${Math.round(e.delay.timeMs)} ms`),e.reverb.enabled&&t.push(`Reverb ${e.reverb.decay.toFixed(1)} s`),t.length===0?"No effects enabled":t.join(" \xB7 ")};var Z=e=>Number.isFinite(e)?Math.max(-12,Math.min(12,Math.round(e))):0,yn=e=>2**(Z(e)/12),Ue=e=>{let t=Z(e);return`${t>0?"+":""}${t}`};var Ve={min:.05,max:10,step:.05},We=1;var qa=6,Ne=(e,t=qa)=>{let n=10**t;return Math.round(e*n)/n},it=(e,t,n)=>Math.min(n,Math.max(t,e)),be=e=>{let t=Number(e?.min),n=Number.isFinite(t)?Ne(Math.max(.01,t)):Ve.min,a=Number(e?.max),r=Number.isFinite(a)?Ne(Math.max(n+.01,a)):Math.max(n+.01,Ve.max),i=Number(e?.step),c=Number.isFinite(i)&&i>0?Ne(i):Ve.step;return{min:n,max:r,step:c}},$a=(e,t)=>{let{min:n,step:a}=t,r=n+Math.round((e-n)/a)*a;return Ne(r)},he=(e,t)=>{let n=be(t),a=Number.isFinite(e)?e:We,r=$a(a,n);return it(Ne(r),n.min,n.max)},vn=(e,t,n)=>{let a=be(n),r=he(e,a);return he(r+t*a.step,a)},Fa=e=>{let t=e.includes(".")?e.replace(/0+$/,"").replace(/\.$/,""):e;return t===""||t==="-0"?"0":t},ee=e=>Number.isFinite(e)?Fa(e.toFixed(4)):String(We),Ae=e=>`${ee(e)}\xD7`,je=(e,t)=>{let{min:n,max:a}=be(t);if(!(a>n))return 0;let r=Math.log(it(e,n,a)/n)/Math.log(a/n);return it(Number.isFinite(r)?r:0,0,1)},Sn=(e,t)=>{let n=be(t),a=n.min*Math.pow(n.max/n.min,it(e,0,1));return he(a,n)},xn=e=>{let{min:t,max:n}=be(e),a=[t,1,2,5,10,n],r=new Set,i=[];for(let s of a.sort((d,f)=>d-f)){if(s<t||s>n)continue;let d=ee(s);r.has(d)||(r.add(d),i.push(Ne(s)))}let c=[];for(let s of i){let d=c[c.length-1];d!==void 0&&je(s,e)-je(d,e)<.07||c.push(s)}return c};var Ga="tidaluna.playback-kit.v1",Ka="tidaluna.playback-speed.v1",Qe=()=>({speed:We,pitchShifts:!1,pitchSemitones:0,presetId:null,developerMode:!1,builtinPresets:!0,effects:F(void 0),bounds:{...Ve}}),kn=e=>{if(e===null)return Qe();let t;try{t=JSON.parse(e)}catch{return Qe()}if(typeof t!="object"||t===null)return Qe();let n=t,a=be(n.bounds),r=Z(typeof n.pitchSemitones=="number"?n.pitchSemitones:0);return{speed:he(typeof n.speed=="number"?n.speed:We,a),pitchShifts:r===0&&n.pitchShifts===!0,pitchSemitones:r,presetId:typeof n.presetId=="string"?n.presetId:null,developerMode:n.developerMode===!0,builtinPresets:n.builtinPresets!==!1,effects:F(n.effects),bounds:a}},Ua=(e,t)=>{let n=e.getItem(t);if(n!==null)return kn(n);let a=e.getItem(Ka);if(a===null)return Qe();let r=kn(a);return r.presetId=null,r},Va=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&e.presetId===t.presetId&&e.developerMode===t.developerMode&&e.builtinPresets===t.builtinPresets&&JSON.stringify(e.effects)===JSON.stringify(t.effects)&&e.bounds.min===t.bounds.min&&e.bounds.max===t.bounds.max&&e.bounds.step===t.bounds.step,Ct=(e,t=Ga)=>{let n=Ua(e,t),a=new Set,r=()=>({...n,bounds:{...n.bounds}}),i=s=>{if(Va(n,s))return;n=s;try{e.setItem(t,JSON.stringify(n))}catch{}let d=r();for(let f of[...a])try{f(d)}catch(y){console.error("[PlaybackKit] listener failed",y)}},c=s=>({...n,...s});return{get:r,subscribe(s){return a.add(s),()=>a.delete(s)},setSpeed(s){i(c({speed:he(s,n.bounds)}))},step(s){i(c({speed:vn(n.speed,s,n.bounds)}))},setPitchShifts(s){i(c({pitchShifts:s,pitchSemitones:s?0:n.pitchSemitones}))},setPitchSemitones(s){let d=Z(s);i(c({pitchSemitones:d,pitchShifts:d===0?n.pitchShifts:!1}))},setBounds(s){let d=be({...n.bounds,...s});i({...n,bounds:d,speed:he(n.speed,d)})},applyPreset(s){let d=Z(s.pitchSemitones);i({...n,speed:he(s.speed,n.bounds),pitchShifts:d===0&&s.pitchShifts===!0,pitchSemitones:d,effects:F(s.effects),presetId:s.id})},setEffects(s){i({...n,effects:F(s)})},setDeveloperMode(s){i({...n,developerMode:s})},setBuiltinPresets(s){i({...n,builtinPresets:s})},clearPreset(){i({...n,presetId:null})},replace(s){let d=be(s.bounds),f=Z(s.pitchSemitones);i({speed:he(s.speed,d),pitchShifts:f===0&&s.pitchShifts===!0,pitchSemitones:f,presetId:typeof s.presetId=="string"?s.presetId:null,developerMode:s.developerMode===!0,builtinPresets:s.builtinPresets!==!1,effects:F(s.effects),bounds:d})},reset(){i({...Qe(),developerMode:n.developerMode,effects:n.effects,presetId:null,bounds:{...n.bounds}})},destroy(){a.clear()}}},En=new Map,Dt=()=>{try{if(typeof localStorage<"u"){let e="__lunakit_probe__";return localStorage.setItem(e,"1"),localStorage.removeItem(e),localStorage}}catch{}return{getItem:e=>En.get(e)??null,setItem:(e,t)=>{En.set(e,t)}}},v=Ct(Dt());var ja="tidaluna.playback-kit.presets.v1",It="nightcore",se=e=>F({...w,...e,eq:{...w.eq,...e.eq??{}},bass:{...w.bass,...e.bass??{}},eightD:{...w.eightD,...e.eightD??{}},delay:{...w.delay,...e.delay??{}},reverb:{...w.reverb,...e.reverb??{}}}),Wa={id:It,name:"Nightcore",speed:1.35,pitchShifts:!0,pitchSemitones:0,effects:se({}),builtin:!0},Qa={id:"slowcore",name:"Slowcore",speed:.8,pitchShifts:!0,pitchSemitones:0,effects:se({reverb:{enabled:!0,decay:4,mix:.35}}),builtin:!0},Ja={id:"big-bass",name:"Big Bass",speed:1,pitchShifts:!1,pitchSemitones:0,effects:se({eq:{enabled:!0,bands:[3,2,0,0,0,0,0,1]},bass:{enabled:!0,boost:14,sub:6,drive:.5,mix:1}}),builtin:!0},Ya={id:"eight-d",name:"8D Orbit",speed:1,pitchShifts:!1,pitchSemitones:0,effects:se({eightD:{enabled:!0,rate:.1,panDepth:.85,pitchRate:.3,pitchDepth:4}}),builtin:!0},Xa={id:"dub-echo",name:"Dub Echo",speed:1,pitchShifts:!1,pitchSemitones:0,effects:se({delay:{enabled:!0,timeMs:450,feedback:.45,mix:.28}}),builtin:!0},Za={id:"daycore",name:"Daycore",speed:.85,pitchShifts:!0,pitchSemitones:0,effects:se({reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},er={id:"chipmunk",name:"Chipmunk",speed:1.6,pitchShifts:!0,pitchSemitones:0,effects:se({}),builtin:!0},tr={id:"vaporwave",name:"Vaporwave",speed:.7,pitchShifts:!0,pitchSemitones:0,effects:se({reverb:{enabled:!0,decay:5,mix:.35},delay:{enabled:!0,timeMs:300,feedback:.3,mix:.2}}),builtin:!0},nr={id:"submerge",name:"Submerge",speed:.95,pitchShifts:!1,pitchSemitones:0,effects:se({bass:{enabled:!0,boost:10,sub:5,drive:.3,mix:.6},eightD:{enabled:!0,rate:.08,panDepth:.7,pitchRate:.2,pitchDepth:3}}),builtin:!0},ar={id:"clear-voice",name:"Clear Voice",speed:1.15,pitchShifts:!1,pitchSemitones:0,effects:se({eq:{enabled:!0,bands:[-4,-2,1,2,2,1,0,0]}}),builtin:!0},Pn=[Wa,Za,Qa,er,tr,Ja,nr,Ya,Xa,ar],Je=new Set(Pn.map(e=>e.id)),rr=24,ir=.05,or=16,Nt=e=>{if(typeof e!="string")return;let t=e.trim().slice(0,rr);return t===""?void 0:t},At=e=>{let t=Number(e);return Number.isFinite(t)?Math.max(ir,Math.min(or,t)):1},wn=(e,t)=>{if(typeof e!="object"||e===null)return;let n=e,a=typeof n.id=="string"?n.id:void 0,r=Nt(n.name);if(!(a===void 0||r===void 0||Je.has(a)||t.has(a)))return t.add(a),{id:a,name:r,speed:At(n.speed),pitchShifts:n.pitchShifts===!0,pitchSemitones:Z(typeof n.pitchSemitones=="number"?n.pitchSemitones:0),effects:F(n.effects)}},sr=e=>{if(e===null)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(!Array.isArray(t))return[];let n=new Set,a=[];for(let r of t){let i=wn(r,n);i!==void 0&&a.push(i)}return a},dr=(e,t)=>{if(e.eq.enabled!==t.eq.enabled||e.eq.bands.length!==t.eq.bands.length)return!1;for(let i=0;i<e.eq.bands.length;i+=1)if(e.eq.bands[i]!==t.eq.bands[i])return!1;let n=["enabled","boost","sub","drive","mix"];for(let i of n)if(e.bass[i]!==t.bass[i])return!1;let a=["enabled","rate","panDepth","pitchRate","pitchDepth"];for(let i of a)if(e.eightD[i]!==t.eightD[i])return!1;let r=["enabled","timeMs","feedback","mix"];for(let i of r)if(e.delay[i]!==t.delay[i])return!1;return e.reverb.enabled===t.reverb.enabled&&e.reverb.decay===t.reverb.decay&&e.reverb.mix===t.reverb.mix},Ye=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&dr(e.effects,t.effects),Rt=(e,t=ja)=>{let n=sr(e.getItem(t)),a=new Set,r=0,i=()=>{try{e.setItem(t,JSON.stringify(n))}catch{}},c=()=>{for(let d of[...a])try{d()}catch{}},s=()=>[...Pn.map(d=>({...d})),...n.map(d=>({...d}))];return{get:s,getById(d){return s().find(f=>f.id===d)},save(d,f){let y=Nt(d);if(y===void 0)return;r+=1;let k={id:`custom-${Date.now().toString(36)}-${r}`,name:y,speed:At(f.speed),pitchShifts:f.pitchShifts===!0,pitchSemitones:Z(f.pitchSemitones),effects:F(f.effects)};return n.push(k),i(),c(),{...k}},remove(d){if(Je.has(d))return!1;let f=n.filter(y=>y.id!==d);return f.length===n.length?!1:(n=f,i(),c(),!0)},rename(d,f){if(Je.has(d))return!1;let y=Nt(f),k=n.find(E=>E.id===d);return y===void 0||k===void 0?!1:(k.name=y,i(),c(),!0)},update(d,f){if(Je.has(d))return!1;let y=n.find(k=>k.id===d);return y===void 0?!1:(y.speed=At(f.speed),y.pitchShifts=f.pitchShifts===!0,y.pitchSemitones=Z(f.pitchSemitones),y.effects=F(f.effects),i(),c(),!0)},move(d,f){if(Je.has(d))return!1;let y=n.findIndex(m=>m.id===d),k=y+Math.sign(f);if(y<0||k<0||k>=n.length)return!1;let[E]=n.splice(y,1);return n.splice(k,0,E),i(),c(),!0},replace(d){let f=new Set;n=d.filter(y=>y.builtin!==!0).map(y=>wn(y,f)).filter(y=>y!==void 0),i(),c()},subscribe(d){return a.add(d),()=>a.delete(d)}}},T=Rt(Dt());var Bt=1,Tn=e=>({getItem:()=>e,setItem:()=>{}}),ot=e=>{if(e==null)return;let t;try{t=JSON.parse(e)}catch{return}if(typeof t!="object"||t===null)return;let n=t;if(n.version!==Bt)return;let a=Ct(Tn(JSON.stringify(n.settings??{}))).get(),r=Rt(Tn(JSON.stringify(n.presets??[]))).get().filter(c=>c.builtin!==!0),i=new Set([It,...r.map(c=>c.id)]);return a.presetId!==null&&!i.has(a.presetId)&&(a.presetId=null),{version:Bt,settings:a,presets:r}},Xe=(e,t)=>`${JSON.stringify({version:Bt,settings:e,presets:t.filter(n=>n.builtin!==!0)},null,2)}
`;var ke=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/config.native.ts",'"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var P=(e,n)=>{for(var t in n)p(e,t,{get:n[t],enumerable:!0})},w=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of m(n))!h.call(e,s)&&s!==t&&p(e,s,{get:()=>n[s],enumerable:!(o=d(n,s))||o.enumerable});return e};var y=e=>w(p({},"__esModule",{value:!0}),e);var A={};P(A,{exportConfig:()=>F,getConfigPath:()=>k,importConfig:()=>S,readConfig:()=>v,revealConfig:()=>D,writeConfig:()=>x});module.exports=y(A);var l=require,i=l("path"),r=()=>l("fs/promises"),b=()=>l("fs"),u=()=>l("electron"),g=()=>process.env.HOME??process.env.USERPROFILE??"",f=()=>process.platform==="win32"?process.env.APPDATA??i.join(g(),"AppData","Roaming"):process.platform==="darwin"?i.join(g(),"Library","Application Support"):i.join(g(),".config"),j=()=>{let e=f(),n=b(),t=[],o=process.resourcesPath;o!==void 0&&(t.push(i.basename(i.dirname(i.dirname(o)))),t.push(i.basename(i.dirname(o)))),t.push("TIDAL","Tidal","tidal","tidal-hifi");for(let s of t)if(!(s===""||s==="Contents"||s==="resources")&&n.existsSync(i.join(e,s)))return s;return"TIDAL"},c=()=>i.join(f(),j(),"playback-kit"),a=()=>i.join(c(),"config.json"),k=async()=>a(),v=async()=>{try{return await r().readFile(a(),"utf8")}catch{return null}},x=async e=>{await r().mkdir(c(),{recursive:!0});let n=`${a()}.tmp`;return await r().writeFile(n,e,"utf8"),await r().rename(n,a()),a()},F=async e=>{let t=await u().dialog.showSaveDialog({title:"Export Playback Kit config",defaultPath:i.join(f(),"playback-kit.json"),filters:[{name:"JSON",extensions:["json"]}]});return t.canceled||t.filePath===void 0?null:(await r().writeFile(t.filePath,e,"utf8"),t.filePath)},S=async()=>{let n=await u().dialog.showOpenDialog({title:"Import Playback Kit config",properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]}),t=n.filePaths[0];return n.canceled||t===void 0?null:{path:t,json:await r().readFile(t,"utf8")}},D=async()=>{await r().mkdir(c(),{recursive:!0}),await u().shell.openPath(c())};0&&(module.exports={exportConfig,getConfigPath,importConfig,readConfig,revealConfig,writeConfig});\n');if(ke===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/config.native.ts");var Mn=(...e)=>__ipcRenderer.invoke(ke,"exportConfig",...e),st=(...e)=>__ipcRenderer.invoke(ke,"getConfigPath",...e),Ln=(...e)=>__ipcRenderer.invoke(ke,"importConfig",...e),dt=(...e)=>__ipcRenderer.invoke(ke,"readConfig",...e),Cn=(...e)=>__ipcRenderer.invoke(ke,"revealConfig",...e),Ie=(...e)=>__ipcRenderer.invoke(ke,"writeConfig",...e);var Re="2.13.1";var ve=[],Dn=!0,Nn=!1,An=e=>{if(e!==void 0)try{return JSON.parse(JSON.stringify(e))}catch{try{return String(e)}catch{return"[unserialisable]"}}},Ht=e=>{Nn=e,e||(ve.length=0)};var h=(e,t,n)=>{if(!Nn)return;let a={at:Date.now(),level:e,message:t,data:An(n)};if(ve.push(a),ve.length>500&&ve.shift(),!(e==="debug"&&!Dn))try{let r=e==="error"?console.error:e==="warn"?console.warn:console.debug;n===void 0?r(`[PlaybackKit] ${t}`):r(`[PlaybackKit] ${t}`,n)}catch{}},In=()=>ve.map(e=>({...e})),_t=()=>ve.map(e=>`${new Date(e.at).toISOString()} ${e.level.toUpperCase().padEnd(5)} ${e.message}${e.data===void 0?"":` ${JSON.stringify(e.data)}`}`).join(`
`),Rn=()=>{ve.length=0},Bn=e=>{Dn=e};var lr=e=>({tag:e.tagName.toLowerCase(),id:e.id,class:typeof e.className=="string"?e.className:"",src:(e.currentSrc||e.src||"").slice(0,140),paused:e.paused,readyState:e.readyState,networkState:e.networkState,currentTime:Number(e.currentTime.toFixed(3)),duration:Number.isFinite(e.duration)?Number(e.duration.toFixed(3)):e.duration,playbackRate:e.playbackRate,defaultPlaybackRate:e.defaultPlaybackRate,preservesPitch:e.preservesPitch,muted:e.muted,volume:e.volume,connected:e.isConnected,parent:e.parentElement===null?null:e.parentElement.id||e.parentElement.className}),cr=()=>typeof document>"u"?[]:[...document.querySelectorAll("video,audio")].map(lr),lt=()=>{if(typeof document>"u")return{};let e=document.getElementById("tidal-player-root");return{playerRoot:e!==null,rootChildCount:e?.children.length??0,rootChildren:e===null?[]:[...e.children].map(t=>`${t.tagName.toLowerCase()}#${t.id||"-"}`),scopedMedia:document.querySelectorAll("#tidal-player-root video, #tidal-player-root audio").length,videoOne:document.getElementById("video-one")!==null,videoTwo:document.getElementById("video-two")!==null,allMedia:document.querySelectorAll("video,audio").length,footer:document.querySelector('[data-test="footer-player"]')!==null}},ur=e=>new Promise(t=>setTimeout(t,e)),pr=async(e=1500)=>{if(typeof document>"u")return[];let t=[...document.querySelectorAll("video,audio")],n=t.map(a=>({id:a.id,tag:a.tagName.toLowerCase(),time:a.currentTime,paused:a.paused}));return await ur(e),t.map((a,r)=>{let i=n[r],c=a.currentTime-i.time,s=e/1e3;return{id:i.id,tag:i.tag,paused:a.paused,deltaSeconds:Number(c.toFixed(3)),observedRate:Number((c/s).toFixed(3)),expectedRate:a.playbackRate}})},Hn,_n=e=>{Hn=e},On,qn=e=>{On=e},fr=()=>{try{return On?.()??{}}catch(e){return{error:String(e)}}},mr=()=>{try{return Hn?.()??{registered:!1}}catch(e){return{error:String(e)}}},gr=["--wave-color-solid-accent-fill","--wave-color-solid-accent-bright","--wave-color-solid-base-fill","--wave-color-solid-base-brighter","--wave-color-solid-base-brightest","--wave-color-solid-contrast-fill","--wave-color-solid-contrast-dark","--wave-color-opacity-contrast-fill-ultra-thin","--wave-color-opacity-contrast-fill-thin","--wave-color-opacity-contrast-fill-thick","--wave-color-solid-warning-fill","--wave-color-text-danger","--market-core-text-10-color","--market-core-text-20-color","--market-core-fill-white-color","--baseFontSize","--baseLineHeight","--remRatio"],hr=()=>{if(typeof document>"u")return{};let e=document.getElementById("wimp")??document.querySelector('[data-test="footer-player"]')??document.documentElement,t=getComputedStyle(e),n={};for(let r of gr){let i=t.getPropertyValue(r).trim();i!==""&&(n[r]=i)}let a=r=>{let i=document.querySelector(r);if(i===null)return null;let c=getComputedStyle(i);return{color:c.color,background:c.backgroundColor,fontFamily:c.fontFamily,fontSize:c.fontSize,lineHeight:c.lineHeight,borderRadius:c.borderRadius,height:c.height}};return{root:e.id!==""?`#${e.id}`:e.tagName.toLowerCase(),fontSize:t.fontSize,fontFamily:t.fontFamily,tokens:n,elements:{footer:a('[data-test="footer-player"]'),utilityButtons:a('[data-test="footer-player"] [class*="utilityButtons"]'),volume:a('[data-test="footer-player"] [class*="sliderContainer"]'),qualityBadge:a("[data-test-quality-badge-streaming-quality]"),progressBar:a('[data-test="progress-bar"]')}}},Ot=async e=>{h("info","building diagnostics report");let t=await pr();return[`Playback Kit v${Re}`,`at: ${new Date().toISOString()}`,`url: ${typeof location>"u"?"?":location.href}`,`ua: ${typeof navigator>"u"?"?":navigator.userAgent}`,`visibility: ${typeof document>"u"?"?":document.visibilityState}`,`settings: ${JSON.stringify(An(e))}`,`selectors: ${JSON.stringify(lt())}`,`player: ${JSON.stringify(fr())}`,`tidal: ${JSON.stringify(mr())}`,`progression: ${JSON.stringify(t)}`,`media: ${JSON.stringify(cr())}`,`theme: ${JSON.stringify(hr())}`,"",`--- logs (${ve.length}) ---`,_t()].join(`
`)},Be=async e=>qt(await Ot(e)),qt=async e=>{try{if(typeof navigator<"u"&&navigator.clipboard?.writeText!==void 0)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}catch{return!1}};var br=400,$n=100,yr=5e-4,de,He,Ee,_e,te=[],Fn=new WeakMap,$t=0,ct=new Map,zn=e=>new Promise(t=>setTimeout(t,e)),le=async()=>{if(de===void 0){let e=window.AudioContext??window.webkitAudioContext;if(e===void 0)throw new Error("Web Audio is unavailable");de=new e({latencyHint:"playback"}),h("info","audio context created",{sampleRate:de.sampleRate,state:de.state})}if(de.state==="suspended")try{await Promise.race([de.resume(),zn(250)])}catch{}return de},Ft=()=>{if(He===void 0||Ee===void 0)return;He.disconnect();for(let t of te)try{t.output.disconnect()}catch{}let e=He;for(let t of te)e.connect(t.input),e=t.output;e.connect(Ee)},ut=async()=>{let e=await le();return(He===void 0||Ee===void 0)&&(He=e.createGain(),Ee=e.createGain(),_e=e.createAnalyser(),_e.fftSize=2048,Ee.connect(_e),Ee.connect(e.destination)),Ft(),{ctx:e,input:He,output:Ee}},zt=async(e,t)=>{if(ct.has(t))return ct.get(t);let n=await le(),a=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),r=(async()=>{let i;try{await Promise.race([n.audioWorklet.addModule(a),new Promise((c,s)=>{i=setTimeout(()=>s(new Error(`Timed out loading worklet ${t}`)),br*10)})])}finally{i!==void 0&&clearTimeout(i),URL.revokeObjectURL(a)}})();ct.set(t,r);try{await r}catch(i){throw ct.delete(t),i}},Pe=async e=>{let{ctx:t,input:n}=await ut();if(Fn.has(e))return;if(e.mediaKeys!==null&&e.mediaKeys!==void 0)throw new Error("protected media (DRM) cannot be routed through Web Audio");let a=t.createMediaElementSource(e);a.connect(n),Fn.set(e,a),$t+=1,h("info","audio engine attached element",{id:e.id,sources:$t})},Gt=async(e,t)=>{await pt(e,e,t)},pt=async(e,t,n)=>{if(await ut(),te.some(r=>r.input===e))return;let a=n===void 0?te.length:Math.max(0,Math.min(te.length,n));te.splice(a,0,{input:e,output:t}),Ft(),h("debug","audio engine inserted group",{index:a,nodes:te.length})},vr=async e=>{await ut();let t=te.findIndex(a=>a.input===e||a.output===e);if(t<0)return!1;let[n]=te.splice(t,1);try{n.output.disconnect()}catch{}return Ft(),!0},Sr=()=>te.map(e=>e.input),I=()=>({context:de===void 0?"none":de.state,sampleRate:de?.sampleRate,sources:$t,nodes:te.length}),Kt=async(e=1200)=>{let{ctx:t}=await ut();if(_e===void 0)throw new Error("analyser unavailable");let n=Math.max(1,Math.round(e/$n)),a=new Float32Array(_e.fftSize),r=0,i=0,c=0;for(let d=0;d<n;d+=1){if(await zn($n),t.state!=="running")continue;_e.getFloatTimeDomainData(a);let f=0,y=0;for(let k of a){let E=Math.abs(k);E>f&&(f=E),y+=k*k}r=Math.max(r,f),i+=y/a.length,c+=1}let s=c===0?0:Math.sqrt(i/c);return{rms:s,peak:r,samples:c,silent:s<yr,durationMs:e}},xr=()=>({version:1,ensureContext:le,loadWorklet:zt,attach:Pe,insert:Gt,insertGroup:pt,remove:vr,list:Sr,status:I,measureRms:Kt}),Gn=()=>{let e=xr();return globalThis.__playbackKitAudio=e,e},Kn=e=>{globalThis.__playbackKitAudio===e&&delete globalThis.__playbackKitAudio};var jn=Ce(Lt(),1);var Un=`
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
`;var Ut=1e4,Vn=12,ft=8,Pr=1e3,wr='<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>',Vt=(e,t,n)=>Math.min(n,Math.max(t,e)),Tr=()=>document.querySelector('[data-test="footer-player"] [class*="utilityButtons"]'),Mr=e=>{switch(e){case"HI_RES_LOSSLESS":return"Max";case"HI_RES":return"Hi-Res";case"LOSSLESS":return"Lossless";case"HIGH":return"High";case"LOW":return"Low";default:return e}},Wn=(e,t,n={})=>{new jn.StyleTag("lunaspeed-styles",e,Un);let a=document.createElement("div");a.className="lunaspeed-ctl",a.dataset.lunaspeed="control";let r=document.createElement("button");r.type="button",r.className="lunaspeed-step",r.textContent="\u2212",r.setAttribute("aria-label","Slower");let i=document.createElement("button");i.type="button",i.className="lunaspeed-pill",i.setAttribute("aria-label","Playback speed"),i.setAttribute("aria-haspopup","dialog"),i.innerHTML=`${wr}<span class="lunaspeed-pill-label"></span>`;let c=i.querySelector(".lunaspeed-pill-label"),s=document.createElement("button");s.type="button",s.className="lunaspeed-step",s.textContent="+",s.setAttribute("aria-label","Faster"),a.append(r,i,s);let d=document.createElement("div");d.className="lunaspeed-popover",d.setAttribute("role","dialog"),d.setAttribute("aria-label","Playback settings"),d.hidden=!0,d.innerHTML=`
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
			<input class="lunaspeed-range" type="range" min="0" max="${Ut}" step="1" aria-label="Playback speed slider" />
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
			<span class="lunaspeed-version">v${Re}</span>
			<span class="lunaspeed-foot-actions">
				<button class="lunaspeed-settings" type="button">Luna settings</button>
				<button class="lunaspeed-copy" type="button">Copy diagnostics</button>
			</span>
		</div>`;let f=d.querySelector(".lunaspeed-value"),y=d.querySelector(".lunaspeed-presets"),k=d.querySelector(".lunaspeed-save-toggle"),E=d.querySelector(".lunaspeed-save"),m=d.querySelector(".lunaspeed-save-input"),A=d.querySelector(".lunaspeed-save-cancel"),M=d.querySelector(".lunaspeed-slider"),L=d.querySelector(".lunaspeed-range"),pe=d.querySelector(".lunaspeed-ticks"),ae=d.querySelector(".lunaspeed-pitch-value"),S=[...d.querySelectorAll(".lunaspeed-pitch-step")],j=d.querySelector(".lunaspeed-switch"),re=d.querySelector(".lunaspeed-reset"),R=d.querySelector(".lunaspeed-copy"),W=d.querySelector(".lunaspeed-settings"),B=d.querySelector(".lunaspeed-pitch-dot"),Q=d.querySelector(".lunaspeed-warning"),_=d.querySelector(".lunaspeed-warning-action"),ie=d.querySelector(".lunaspeed-quality"),fe=d.querySelector(".lunaspeed-quality-action"),xe="",D="",H=!1,$=!1,Me,o,p=u=>{M.style.setProperty("--lunaspeed-pos",String(Vt(u,0,1)))},tt=(u,b)=>{let x=je(u,b);L.value=String(Math.round(x*Ut)),p(x)},Ta=()=>{let{bounds:u}=t.get(),b=`${u.min}:${u.max}`;b!==xe&&(xe=b,pe.replaceChildren(...xn(u).map(x=>{let P=document.createElement("span");return P.className="lunaspeed-tick",P.style.left=`${(je(x,u)*100).toFixed(3)}%`,P.textContent=Ae(x),P})))},Ma=u=>u===null?"Custom":n.presets?.list().find(b=>b.id===u)?.name??"Custom",ln=()=>{let u=n.presets;if(u===void 0){y.hidden=!0,E.hidden=!0;return}let b=u.list(),x=t.get(),P=x.presetId,O=b.find(C=>C.id===P),J=O!==void 0&&!Ye(O,x),oe=`${b.map(C=>`${C.id}:${C.name}`).join("|")}::${P??""}::${J}`;if(oe===D)return;D=oe;let Y=[],q=document.createElement("button");q.type="button",q.className="lunaspeed-preset",q.textContent="Custom",q.dataset.active=String(P===null),q.setAttribute("aria-pressed",String(P===null)),q.addEventListener("click",()=>u.clear()),Y.push(q);for(let C of b){let me=document.createElement("button");me.type="button",me.className="lunaspeed-preset";let wt=P===C.id;me.textContent=wt&&J?`${C.name} *`:C.name,me.dataset.active=String(wt),me.setAttribute("aria-pressed",String(wt)),me.dataset.builtin=String(C.builtin===!0),me.title=`${C.name} \u2014 ${Ae(C.speed)} \xB7 ${C.pitchShifts?"pitch follows speed":C.pitchSemitones!==0?`pitch ${Ue(C.pitchSemitones)} st`:"pitch preserved"} \xB7 ${rt(C.effects)}`,me.addEventListener("click",()=>u.apply(C)),Y.push(me)}y.replaceChildren(...Y)},La=(u,b)=>{ae.textContent=`${Ue(u)} st`;for(let x of S){let P=Number(x.dataset.delta);x.disabled=P<0?u<=-12:u>=12,x.title=P<0?"Lower pitch by 1 semitone":"Raise pitch by 1 semitone"}j.setAttribute("aria-checked",String(b))},cn=u=>{let b=n.getPitchEngineState?.(),x=u===0?"idle":b?.status??"idle";B.dataset.status=x;let P=x==="running"?"Pitch engine active":x==="waiting"?"Pitch engine waiting for the audio element":x==="unavailable"?"Pitch engine unavailable"+(b?.reason===void 0?"":": "+b.reason):x==="ready"?"Pitch engine ready":"Pitch engine idle";B.title=u===0?"":P,B.setAttribute("aria-label",u===0?"":P)},kt=u=>{Q.hidden=u!=="native";let b=n.previousQuality?.()??null,x=u!=="native"&&b!==null;ie.hidden=!x,x&&b!==null&&(fe.textContent=`Restore ${Mr(b)}`)},Et=()=>{let u=t.get(),{speed:b,pitchShifts:x,pitchSemitones:P,bounds:O,presetId:J}=u,oe=Ae(b);c.textContent=oe,i.dataset.active=String(b!==1||x||P!==0);let Y=n.presets?.list().find(C=>C.id===J),q=Y!==void 0&&!Ye(Y,u);i.title=`Playback ${oe}${J===null?"":` \xB7 ${Ma(J)}${q?" *":""}`}`,r.setAttribute("aria-label",`Slower by ${Ae(O.step)}`),s.setAttribute("aria-label",`Faster by ${Ae(O.step)}`),r.title=`\u2212${ee(O.step)}\xD7`,s.title=`+${ee(O.step)}\xD7`,f.textContent=ee(b),$||tt(b,O),L.setAttribute("aria-valuetext",oe),Ta(),ln(),La(P,x),cn(P),R.hidden=!u.developerMode,H&&Pt()},Pt=()=>{let u=i.getBoundingClientRect(),b=d.offsetWidth||348,x=d.offsetHeight||240,P=Vt(u.left+u.width/2-b/2,ft,window.innerWidth-b-ft),O=u.top-x-Vn,J="top";O<ft&&(O=Math.min(u.bottom+Vn,window.innerHeight-x-ft),J="bottom"),d.style.left=`${Math.round(P)}px`,d.style.top=`${Math.round(O)}px`,d.dataset.side=J;let oe=Vt(u.left+u.width/2-P,18,b-18);d.style.setProperty("--lunaspeed-caret",`${Math.round(oe)}px`)},un=u=>{let b=u.target;b!==null&&(d.contains(b)||a.contains(b)||Le())},pn=u=>{u.key==="Escape"&&(u.preventDefault(),Le(),i.focus())},fn=()=>{H&&Pt()},Ca=()=>{H||(H=!0,d.hidden=!1,i.dataset.open="true",Et(),kt(n.getPlayerKind?.()??"unknown"),Pt(),n.onOpen?.(),document.addEventListener("pointerdown",un,!0),document.addEventListener("keydown",pn,!0),window.addEventListener("resize",fn),Me=setInterval(()=>cn(t.get().pitchSemitones),500),h("debug","popover open"))},Le=()=>{H&&(H=!1,d.hidden=!0,delete i.dataset.open,E.hidden=!0,Me!==void 0&&(clearInterval(Me),Me=void 0),document.removeEventListener("pointerdown",un,!0),document.removeEventListener("keydown",pn,!0),window.removeEventListener("resize",fn))},Da=()=>H?Le():Ca(),mn=()=>{if(!a.isConnected){H&&Le();let b=Tr();if(b===null)return;let x=b.querySelector('[class*="sliderContainer"]');x!==null&&x.parentElement===b?b.insertBefore(a,x):b.appendChild(a)}let u=document.getElementById("wimp")??document.body;d.parentElement!==u&&u.appendChild(d)};k.addEventListener("click",()=>{if(E.hidden=!E.hidden,E.hidden)return;let u=n.presets?.list().find(b=>b.id===t.get().presetId);m.value=u===void 0?"":u.builtin===!0?`${u.name} (edited)`:u.name,m.focus(),m.select()}),r.addEventListener("click",()=>t.step(-1)),s.addEventListener("click",()=>t.step(1)),i.addEventListener("click",Da),L.addEventListener("pointerdown",()=>{$=!0,o!==void 0&&clearTimeout(o),delete M.dataset.settling});let $e=()=>{if(!$)return;$=!1;let{speed:u,bounds:b}=t.get();M.dataset.settling="true",tt(u,b),o!==void 0&&clearTimeout(o),o=setTimeout(()=>{o=void 0,delete M.dataset.settling},160)};L.addEventListener("change",$e),window.addEventListener("pointerup",$e),window.addEventListener("pointercancel",$e),L.addEventListener("input",()=>{if(L.disabled)return;let u=Number(L.value)/Ut,b=t.get().bounds;p(u),t.setSpeed(Sn(u,b))}),d.addEventListener("keydown",u=>{u.key==="ArrowLeft"||u.key==="ArrowDown"?(u.preventDefault(),t.step(-1)):(u.key==="ArrowRight"||u.key==="ArrowUp")&&(u.preventDefault(),t.step(1))});for(let u of S)u.addEventListener("click",()=>{let b=Number(u.dataset.delta);t.setPitchSemitones(t.get().pitchSemitones+b)});j.addEventListener("click",()=>t.setPitchShifts(!t.get().pitchShifts)),re.addEventListener("click",()=>t.reset()),E.addEventListener("submit",u=>{u.preventDefault();let b=n.presets;if(b===void 0)return;let x=m.value.trim();if(x==="")return;let{speed:P,pitchShifts:O,pitchSemitones:J,effects:oe}=t.get(),Y=b.list().find(q=>q.id===t.get().presetId);if(Y!==void 0&&Y.builtin!==!0&&x===Y.name)b.saveActive(Y);else{let q=b.save(x,{speed:P,pitchShifts:O,pitchSemitones:J,effects:oe});if(q===void 0)return;b.apply(q)}m.value="",E.hidden=!0,D="",ln(),h("info","preset saved",{name:x})}),A.addEventListener("click",()=>{E.hidden=!0,m.value=""}),W.hidden=n.openSettings===void 0,W.addEventListener("click",()=>{n.openSettings?.(),Le()});let Fe;R.addEventListener("click",async()=>{Fe!==void 0&&clearTimeout(Fe),R.disabled=!0,R.textContent="Copying\u2026";let u=await Be(t.get());h(u?"info":"error","diagnostics copied",{copied:u}),R.textContent=u?"Copied":"Copy failed",Fe=setTimeout(()=>{R.textContent="Copy diagnostics",R.disabled=!1},1800)});let ze;_.addEventListener("click",()=>{n.useBrowserPlayer!==void 0&&(ze!==void 0&&clearTimeout(ze),_.disabled=!0,_.textContent="Switching\u2026",n.useBrowserPlayer(),h("info","requested browser player from warning"),ze=setTimeout(()=>{_.disabled=!1,_.textContent="Use browser player"},2500))}),fe.addEventListener("click",()=>{n.restoreQuality!==void 0&&(n.restoreQuality(),ie.hidden=!0,h("info","restored original streaming quality"))}),kt(n.getPlayerKind?.()??"unknown");let gn=n.subscribePlayerKind?.(kt);gn!==void 0&&e.add(gn),mn(),Et(),e.add(t.subscribe(Et));let Na=setInterval(mn,Pr);e.add(()=>{clearInterval(Na),window.removeEventListener("pointerup",$e),window.removeEventListener("pointercancel",$e),Fe!==void 0&&clearTimeout(Fe),ze!==void 0&&clearTimeout(ze),o!==void 0&&clearTimeout(o),Le(),d.remove(),a.remove()})};var ye,Oe={built:!1,active:[],attached:0},Qn=()=>({...Oe}),Lr=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Cr=(e,t)=>{let n=Math.max(1,Math.floor(e.sampleRate*t)),a=e.createBuffer(2,n,e.sampleRate);for(let r=0;r<2;r+=1){let i=a.getChannelData(r);for(let c=0;c<n;c+=1){let s=Math.pow(1-c/n,2.2);i[c]=(Math.random()*2-1)*s}}return a},Dr=async()=>{let e=await le();if(ye!==void 0)return ye;let t=e.createGain(),n=De.map((D,H)=>{let $=e.createBiquadFilter();return $.frequency.value=D,H===0?$.type="lowshelf":H===De.length-1?$.type="highshelf":($.type="peaking",$.Q.value=1.2),$}),a=e.createGain(),r=e.createDelay(2),i=e.createGain(),c=e.createGain(),s=e.createGain(),d=e.createBiquadFilter();d.type="lowpass",d.frequency.value=220,d.Q.value=.7;let f=e.createBiquadFilter();f.type="lowshelf",f.frequency.value=45;let y=e.createBiquadFilter();y.type="lowshelf",y.frequency.value=90;let k=e.createGain(),E=e.createWaveShaper(),m=new Float32Array(2048);for(let D=0;D<m.length;D+=1){let H=D/(m.length-1)*2-1;m[D]=Math.tanh(3*H)/Math.tanh(3)}E.curve=m,E.oversample="4x";let A=e.createGain(),M=e.createDynamicsCompressor();M.threshold.value=-3,M.knee.value=0,M.ratio.value=20,M.attack.value=.003,M.release.value=.25;let L=e.createGain(),pe=e.createDelay(.05);pe.delayTime.value=.015;let ae=e.createStereoPanner(),S=e.createGain(),j=e.createOscillator();j.type="sine",j.frequency.value=.12;let re=e.createGain();re.gain.value=0;let R=e.createOscillator();R.type="sine",R.frequency.value=.3;let W=e.createGain();W.gain.value=0,j.connect(re),re.connect(ae.pan),R.connect(W),W.connect(pe.delayTime),j.start(),R.start(),L.connect(pe),pe.connect(ae),ae.connect(S);let B=e.createGain(),Q=e.createGain(),_=e.createConvolver(),ie=e.createGain(),fe=e.createGain();t.connect(n[0]);for(let D=1;D<n.length;D+=1)n[D-1].connect(n[D]);let xe=n[n.length-1];return xe.connect(s),s.connect(L),xe.connect(d),d.connect(f),f.connect(y),y.connect(k),k.connect(E),E.connect(A),A.connect(L),S.connect(a),S.connect(r),a.connect(B),r.connect(i),i.connect(B),r.connect(c),c.connect(r),B.connect(Q),Q.connect(M),B.connect(_),_.connect(ie),ie.connect(M),M.connect(fe),ye={fxIn:t,eqFilters:n,delayDry:a,delayNode:r,delayWet:i,delayFeedback:c,bassDry:s,bassLowpass:d,bassSub:f,bassBoost:y,bassDrive:k,bassShaper:E,bassWet:A,eightDInput:L,eightDDelay:pe,eightDPanner:ae,eightDOut:S,panLfo:j,panDepth:re,pitchLfo:R,pitchDepth:W,limiter:M,reverbIn:B,reverbDry:Q,convolver:_,reverbWet:ie,fxOut:fe,decay:0},await pt(t,fe),h("info","effects graph inserted"),ye},Nr=(e,t)=>{if(ye===void 0)return;let n=e.currentTime,a=.06,r=ye;for(let d=0;d<r.eqFilters.length;d+=1){let f=t.eq.enabled?t.eq.bands[d]??0:0;r.eqFilters[d].gain.setTargetAtTime(f,n,a)}let i=t.bass.enabled?t.bass.mix:0;r.bassDry.gain.setTargetAtTime(1,n,a),r.bassWet.gain.setTargetAtTime(i,n,a),r.bassSub.gain.setTargetAtTime(t.bass.enabled?t.bass.sub:0,n,a),r.bassBoost.gain.setTargetAtTime(t.bass.enabled?t.bass.boost:0,n,a),r.bassDrive.gain.setTargetAtTime(t.bass.enabled?1+t.bass.drive*3:1,n,a),r.panLfo.frequency.setTargetAtTime(t.eightD.rate,n,a),r.panDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.panDepth:0,n,a),r.pitchLfo.frequency.setTargetAtTime(t.eightD.pitchRate,n,a),r.pitchDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.pitchDepth/1e3:0,n,a);let c=t.delay.enabled?t.delay.mix:0;r.delayNode.delayTime.setTargetAtTime(Math.min(2,Math.max(.02,t.delay.timeMs/1e3)),n,a),r.delayFeedback.gain.setTargetAtTime(t.delay.enabled?t.delay.feedback:0,n,a),r.delayWet.gain.setTargetAtTime(c,n,a),r.delayDry.gain.setTargetAtTime(1-c,n,a);let s=t.reverb.enabled?t.reverb.mix:0;Math.abs(r.decay-t.reverb.decay)>.05&&(r.convolver.buffer=Cr(e,t.reverb.decay),r.decay=t.reverb.decay),r.reverbWet.gain.setTargetAtTime(s,n,a),r.reverbDry.gain.setTargetAtTime(1-s,n,a)},jt=async(e,t)=>{let n=F(e),a=at(n);if(!a&&ye===void 0){Oe={...Oe,active:[]};return}try{let r=await le();if(r.state!=="running"){Oe={built:ye!==void 0,context:r.state,active:[],error:"audio context suspended (interact with the page)",attached:I().sources};return}if(a){let c=Lr(t);c!==void 0&&await Pe(c)}let i=await Dr();Nr(r,n),Oe={built:!0,context:r.state,active:[n.eq.enabled?"eq":"",n.bass.enabled?"bass":"",n.eightD.enabled?"8d":"",n.delay.enabled?"delay":"",n.reverb.enabled?"reverb":""].filter(c=>c!==""),attached:I().sources},i.decay===0&&n.reverb.enabled&&(i.decay=n.reverb.decay)}catch(r){let i=r instanceof Error?r.message:String(r);Oe={built:ye!==void 0,context:I().context,active:[],error:i,attached:I().sources},h("warn","effects engine unavailable",{error:i})}};var Xn="#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two",Jn=["loadstart","loadedmetadata","canplay","playing","play","emptied","ratechange","seeked"],mt=.001,Yn=1,Ar=150,gt=e=>{let t=e.id;return typeof t=="string"?t:e.constructor.name},ne=()=>typeof document>"u"?[]:[...document.querySelectorAll(Xn)],ht=class{constructor(t,n){this.getElements=t;this.source=n}getElements;source;attachments=new Map;timers=new Set;start(){this.scan()}scan(){let t=this.getElements(),n=0;for(let a of t)this.attachments.has(a)||(this.attach(a),n+=1);n>0?h("info","attached media elements",{added:n,total:this.attachments.size,found:t.length}):t.length===0&&h("debug","no media elements found",{selector:Xn})}apply(){this.scan();for(let t of this.attachments.keys())this.applyTo(t,"settings-change")}stop(){for(let t of this.timers)clearTimeout(t);this.timers.clear();for(let[t,n]of this.attachments)n(),this.restore(t);this.attachments.clear(),h("info","controller stopped")}attach(t){let n=a=>{let r=this.source.get().speed,i=t.playbackRate;Math.abs(i-r)>mt&&h("warn","TIDAL reset the rate",{id:gt(t),event:a.type,before:i,desired:r,currentTime:t.currentTime}),this.applyTo(t,a.type),(a.type==="loadstart"||a.type==="emptied")&&this.scheduleReapply(t)};for(let a of Jn)t.addEventListener(a,n);this.attachments.set(t,()=>{for(let a of Jn)t.removeEventListener(a,n)}),h("info","attached",{id:gt(t),tag:t.constructor.name,rate:t.playbackRate}),this.applyTo(t,"attach")}applyTo(t,n){let{speed:a,pitchShifts:r}=this.source.get(),i=t.playbackRate;try{Math.abs(i-a)>mt&&(t.playbackRate=a),t.defaultPlaybackRate!==void 0&&Math.abs(t.defaultPlaybackRate-a)>mt&&(t.defaultPlaybackRate=a);let s=!r;t.preservesPitch!==void 0&&t.preservesPitch!==s&&(t.preservesPitch=s),t.webkitPreservesPitch!==void 0&&t.webkitPreservesPitch!==s&&(t.webkitPreservesPitch=s)}catch(s){h("error","failed to apply rate",{id:gt(t),reason:n,error:String(s)});return}let c=t.playbackRate;Math.abs(c-i)>mt&&h("debug","applied rate",{id:gt(t),reason:n,before:i,after:c,readback:c,defaultRate:t.defaultPlaybackRate})}scheduleReapply(t){let n=setTimeout(()=>{this.timers.delete(n),this.attachments.has(t)&&this.applyTo(t,"delayed-reapply")},Ar);this.timers.add(n)}restore(t){try{t.playbackRate=Yn,t.defaultPlaybackRate!==void 0&&(t.defaultPlaybackRate=Yn),t.preservesPitch!==void 0&&(t.preservesPitch=!0),t.webkitPreservesPitch!==void 0&&(t.webkitPreservesPitch=!0)}catch{}}};var bt="__lunaspeedPatched",U,K,Zn=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||t.Player===void 0||t.Player.prototype===void 0))return t},Wt=e=>{let t=new Set,n=e,a=0;for(;n!==null&&a<4;){for(let r of Object.getOwnPropertyNames(n))t.add(r);n=Object.getPrototypeOf(n),a+=1}return[...t]},ea=e=>{let t=Wt(e),n=t.find(a=>/^set(playback|audio)?(rate|speed|tempo)$/i.test(a));return n!==void 0&&typeof e[n]=="function"?n:typeof e.playbackRate=="number"?"playbackRate":t.find(a=>/^(playbackRate|rate|speed)$/i.test(a)&&typeof e[a]=="number")},Ir=e=>{U!==e&&(U=e,K=ea(e),h("info","native player instance captured",{rateMember:K??null,ownKeys:Object.keys(e).slice(0,40),methods:Wt(e).slice(0,80)}))},Qt=()=>{let e=Zn();if(e===void 0)return!1;let t=e.Player?.prototype;if(t===void 0)return!1;if(t[bt]===!0)return!0;try{Object.defineProperty(t,bt,{value:!0,enumerable:!1})}catch{return!1}for(let n of["play","load","pause","seek"]){let a=t[n];typeof a=="function"&&(t[n]=function(...i){try{Ir(this)}catch(c){h("error","native capture failed",{error:String(c)})}return a.apply(this,i)})}return h("info","native player component patched"),!0},ta=()=>U!==void 0,Jt=e=>{if(U===void 0||(K===void 0&&(K=ea(U)),K===void 0))return!1;try{let t=U[K];if(K==="playbackRate"){if(t===e)return!0;U.playbackRate=e}else U[K](e);return h("info","native rate applied",{rate:e,member:K,readback:U[K]}),!0}catch(t){return h("error","native rate failed",{rate:e,member:K,error:String(t)}),!1}},yt=()=>{let e=Zn();if(e===void 0)return{present:!1};let t=e.Player?.prototype,n=t===void 0?[]:Object.getOwnPropertyNames(t).filter(a=>a!==bt);return{present:!0,patched:t!==void 0&&t[bt]===!0,playerMethods:n.slice(0,100),rateMethods:n.filter(a=>/rate|speed|tempo|pitch/i.test(a)),instanceCaptured:U!==void 0,rateMember:K??null,instanceMethods:U===void 0?[]:Wt(U).slice(0,100)}};var na=`
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
`;var aa="playback-kit-pitch",ce,V={status:"idle",semitones:0,attached:0},Yt=()=>({...V}),Rr=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Br=async e=>(await zt(na,aa),ce===void 0&&(ce=new AudioWorkletNode(e,aa,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]}),await Gt(ce,0),h("info","pitch node inserted into audio engine")),ce),Hr=async(e,t)=>{let n=await le();if(n.state!=="running"){V={status:"waiting",reason:"audio context suspended (interact with the page)",semitones:e,context:n.state,attached:V.attached};return}let a=Rr(t);if(a===void 0){V={status:"waiting",reason:"no playing media element",semitones:e,context:n.state,attached:V.attached};return}await Pe(a);let i=(await Br(n)).parameters.get("ratio");i!==void 0&&(i.value=yn(e)),V={status:"running",semitones:e,context:n.state,attached:I().sources}},vt=async(e,t)=>{if(e===0){if(ce!==void 0){let n=ce.parameters.get("ratio");n!==void 0&&(n.value=1)}V={...V,status:ce===void 0?"idle":"ready",semitones:0,reason:void 0};return}try{await Hr(e,t)}catch(n){let a=n instanceof Error?n.message:String(n);V={status:"unavailable",reason:a,semitones:e,attached:V.attached},h("error","pitch engine unavailable",{error:a})}},ra=()=>{if(ce!==void 0){let e=ce.parameters.get("ratio");e!==void 0&&(e.value=1)}V={...V,status:ce===void 0?"idle":"ready",semitones:0,reason:void 0}};var St="unknown",Xt=new Set,we=()=>St,Zt=e=>{if(e!==St){h("info","player kind changed",{from:St,to:e}),St=e;for(let t of[...Xt])try{t(e)}catch(n){h("error","player kind listener failed",{error:String(n)})}}},ia=e=>(Xt.add(e),()=>Xt.delete(e));var _r=(e,t)=>{let n=new Set(e.get().map(r=>r.name));if(!n.has(t))return t;let a=2;for(;n.has(`${t} ${a}`);)a+=1;return`${t} ${a}`},oa=(e,t,n)=>{let a=e.get(),r={speed:a.speed,pitchShifts:a.pitchShifts,pitchSemitones:a.pitchSemitones,effects:a.effects};if(n.builtin===!0){let i=t.save(_r(t,`${n.name} (edited)`),r);return i!==void 0&&e.applyPreset(i),i}return t.update(n.id,r),n},Ze=(e,t)=>{let n=e.get();n.builtinPresets||n.presetId===null||t.getById(n.presetId)?.builtin===!0&&e.clearPreset()};var Or=e=>Math.abs(e-1)>.001,en=e=>{if(!Or(e.getSpeed())||!e.isPlaying())return!1;let t=e.getPosition();return t===null||!Number.isFinite(t)||t<0?!1:(e.dispatchTimeUpdate(t),!0)},sa=(e,t=100)=>{let n=setInterval(()=>en(e),t);return()=>clearInterval(n)};var l=Ce(nn(),1),g=Ce(da(),1);var la=e=>({id:e.id,paused:e.paused,readyState:e.readyState,currentTime:Number(e.currentTime.toFixed(2)),playbackRate:e.playbackRate}),ca=async(e=1200)=>{let t=Date.now(),n=I(),a=ne(),r=a.find(m=>!m.paused&&m.readyState>0)??a[0];if(r===void 0){let m={at:t,ok:!1,reason:"no media element",context:n.context,engine:n};return h("warn","audio self-test: no media element"),m}let i=r.currentTime;try{await Pe(r)}catch(m){let A={at:t,ok:!1,reason:m instanceof Error?m.message:String(m),context:I().context,element:la(r),engine:I()};return h("warn","audio self-test failed to attach",A),A}let c=await le(),s=0,d=0,f=!0;try{let m=await Kt(e);s=m.rms,d=m.peak,f=m.silent}catch(m){h("error","audio self-test measurement failed",{error:String(m)})}let y=Number((r.currentTime-i).toFixed(2)),k=c.state!=="running"?`audio context ${c.state}`:r.paused?"playback is paused":f&&y>.2?"captured audio is silent (DRM-protected or already routed elsewhere)":f?"no audio measured":void 0,E={at:t,ok:k===void 0,reason:k,context:c.state,element:la(r),progressionSeconds:y,rms:Number(s.toFixed(5)),peak:Number(d.toFixed(5)),silent:f,engine:I()};return h(E.ok?"info":"warn","audio self-test",E),E};var z=Ce(nn(),1);var qr=132,ua=X-ge,rn=e=>Math.max(ge,Math.min(X,e)),pa=e=>`${e>0?"+":""}${e}`,fa=e=>e>=1e3?`${e/1e3}k`:String(e),$r=({frequency:e,value:t,disabled:n,onChange:a})=>{let r=z.default.useRef(null),[i,c]=z.default.useState(null),s=m=>{let A=r.current;if(A===null)return;let M=A.getBoundingClientRect(),L=Math.max(0,Math.min(1,(m-M.top)/M.height));c(L*100),a(rn(Math.round(X-L*ua)))},d=i??(X-t)/ua*100,f=50,y=Math.min(d,f),k=Math.abs(d-f),E=i===null;return z.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:30,opacity:n?.4:1}},z.default.createElement("span",{style:{fontSize:10,fontVariantNumeric:"tabular-nums",color:"currentColor",opacity:.8}},pa(t)),z.default.createElement("div",{ref:r,role:"slider",tabIndex:n?-1:0,"aria-label":`${fa(e)} Hz`,"aria-valuemin":ge,"aria-valuemax":X,"aria-valuenow":t,"aria-valuetext":`${pa(t)} dB`,"aria-disabled":n,onPointerDown:m=>{n||(m.preventDefault(),m.currentTarget.setPointerCapture(m.pointerId),s(m.clientY))},onPointerMove:m=>{n||!m.currentTarget.hasPointerCapture(m.pointerId)||s(m.clientY)},onPointerUp:m=>{m.currentTarget.hasPointerCapture(m.pointerId)&&m.currentTarget.releasePointerCapture(m.pointerId),c(null)},onPointerCancel:m=>{m.currentTarget.hasPointerCapture(m.pointerId)&&m.currentTarget.releasePointerCapture(m.pointerId),c(null)},onDoubleClick:()=>{n||a(0)},onKeyDown:m=>{if(n)return;let A=m.shiftKey?3:1;if(m.key==="ArrowUp"||m.key==="ArrowRight")a(rn(t+A));else if(m.key==="ArrowDown"||m.key==="ArrowLeft")a(rn(t-A));else if(m.key==="Home")a(ge);else if(m.key==="End")a(X);else return;m.preventDefault()},style:{position:"relative",width:18,height:qr,cursor:n?"default":"pointer",touchAction:"none",outline:"none"}},z.default.createElement("div",{style:{position:"absolute",left:"50%",top:0,bottom:0,width:5,transform:"translateX(-50%)",borderRadius:999,background:"color-mix(in srgb, currentColor 16%, transparent)"}}),z.default.createElement("div",{style:{position:"absolute",left:0,right:0,top:`${f}%`,height:1,background:"color-mix(in srgb, currentColor 28%, transparent)"}}),z.default.createElement("div",{style:{position:"absolute",left:"50%",width:5,transform:"translateX(-50%)",borderRadius:999,top:`${y}%`,height:`${k}%`,background:"var(--wave-color-solid-accent-fill, currentColor)",transition:E?"top 120ms ease, height 120ms ease":"none"}}),z.default.createElement("div",{style:{position:"absolute",left:"50%",top:`${d}%`,width:12,height:12,transform:"translate(-50%, -50%)",borderRadius:"50%",background:"currentColor",boxShadow:"0 0 0 3px color-mix(in srgb, var(--wave-color-solid-accent-fill, currentColor) 22%, transparent), 0 1px 3px rgba(0,0,0,.5)",transition:E?"top 120ms ease":"none"}})),z.default.createElement("span",{style:{fontSize:9,opacity:.6,letterSpacing:"-0.02em"}},fa(e)))},ma=({eq:e,disabled:t,onChange:n})=>z.default.createElement("div",{style:{display:"flex",gap:8,alignItems:"flex-end",marginLeft:"auto",padding:"2px 0"}},De.map((a,r)=>z.default.createElement($r,{key:a,frequency:a,value:e.bands[r]??0,disabled:t,onChange:i=>{let c=[...e.bands];c[r]=i,n(c)}})));var on=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)&&t>0?t:void 0},G=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)?t:void 0},Fr=e=>{let t=e.pitchShifts?"pitch follows speed":e.pitchSemitones===0?"pitch preserved":`pitch ${Ue(e.pitchSemitones)} st`;return`${ee(e.speed)}\xD7 \xB7 ${t} \xB7 ${rt(e.effects)}`},Te={display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:6,marginLeft:"auto"},et=({children:e})=>l.default.createElement("div",{style:{marginBottom:16}},e),zr=()=>{let[e,t]=l.default.useState(v.get),[n,a]=l.default.useState(T.get),[r,i]=l.default.useState("Copy diagnostics"),[c,s]=l.default.useState("Resolving\u2026"),[d,f]=l.default.useState(""),[y,k]=l.default.useState(null),[E,m]=l.default.useState(!1),[A,M]=l.default.useState("Attaches the playing element, measures captured RMS and reports blocked/silent reasons. May silence playback if capture fails; restart TIDAL to undo.");l.default.useEffect(()=>v.subscribe(t),[]),l.default.useEffect(()=>T.subscribe(()=>a(T.get())),[]),l.default.useEffect(()=>{st().then(s).catch(()=>s("unavailable"))},[]),l.default.useEffect(()=>{if(r==="Copy diagnostics")return;let o=setTimeout(()=>i("Copy diagnostics"),1800);return()=>clearTimeout(o)},[r]),l.default.useEffect(()=>{if(d==="")return;let o=setTimeout(()=>f(""),4e3);return()=>clearTimeout(o)},[d]);let{bounds:L,pitchShifts:pe,developerMode:ae,effects:S,builtinPresets:j}=e,re=j?n:n.filter(o=>o.builtin!==!0),R=re.findIndex(o=>o.builtin!==!0),W=o=>v.setEffects({...S,eq:{...S.eq,...o}}),B=o=>v.setEffects({...S,bass:{...S.bass,...o}}),Q=o=>v.setEffects({...S,eightD:{...S.eightD,...o}}),_=o=>v.setEffects({...S,delay:{...S.delay,...o}}),ie=o=>v.setEffects({...S,reverb:{...S.reverb,...o}}),fe=async o=>{let p=ot(o);return p===void 0?!1:(v.replace(p.settings),T.replace(p.presets),Ze(v,T),await Ie(Xe(p.settings,p.presets)),!0)},xe=async()=>{try{let o=await Ln();if(o===null)return f("Import cancelled");let p=await fe(o.json);f(p?`Imported ${o.path}`:"Import failed: invalid config")}catch(o){f(`Import failed: ${String(o)}`)}},D=async()=>{try{let o=await Mn(Xe(v.get(),T.get()));f(o===null?"Export cancelled":`Exported ${o}`)}catch(o){f(`Export failed: ${String(o)}`)}},H=async()=>{try{let o=await dt();if(o===null)return f("Config file not found");let p=await fe(o);f(p?"Reloaded from config file":"Reload failed: invalid config")}catch(o){f(`Reload failed: ${String(o)}`)}},$=o=>{window.confirm(`Overwrite "${o.name}" with the current speed, pitch and effects?`)&&(T.update(o.id,{speed:e.speed,pitchShifts:e.pitchShifts,pitchSemitones:e.pitchSemitones,effects:e.effects}),f(`Updated "${o.name}"`))},Me=o=>{window.confirm(`Delete preset "${o.name}"?`)&&(T.remove(o.id),f(`Deleted "${o.name}"`))};return l.default.createElement("div",{style:{paddingBottom:8}},l.default.createElement(et,null,l.default.createElement(g.LunaSettings,{title:"Playback",desc:"Speed and pitch. Effects live in their own section below."},l.default.createElement(g.LunaTextSetting,{title:"Minimum speed",desc:"Below 0.0625\xD7 Chromium plays at its floor.",defaultValue:ee(L.min),inputProps:{inputMode:"decimal"},onChange:o=>{let p=on(o.target.value);p!==void 0&&v.setBounds({min:p})}}),l.default.createElement(g.LunaTextSetting,{title:"Maximum speed",defaultValue:ee(L.max),inputProps:{inputMode:"decimal"},onChange:o=>{let p=on(o.target.value);p!==void 0&&v.setBounds({max:p})}}),l.default.createElement(g.LunaTextSetting,{title:"Snap step",desc:"Slider snapping and the \u2212 / + step size.",defaultValue:ee(L.step),inputProps:{inputMode:"decimal"},onChange:o=>{let p=on(o.target.value);p!==void 0&&v.setBounds({step:p})}}),l.default.createElement(g.LunaSwitchSetting,{title:"Pitch follows speed",desc:"Chipmunk / slow-mo. Clears any custom pitch shift.",checked:pe,onChange:o=>v.setPitchShifts(o.target.checked)}),l.default.createElement(g.LunaSetting,{title:"Reset",desc:"Back to 1.00\xD7, no pitch shift, effects unchanged."},l.default.createElement("div",{style:Te},l.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>v.reset()},"Reset playback"))))),l.default.createElement(et,null,l.default.createElement(g.LunaSettings,{title:"Presets",desc:"Capture speed, pitch and effects. Built-ins are fixed; custom presets can be applied, renamed, updated, reordered and deleted."},l.default.createElement(g.LunaSwitchSetting,{title:"Built-in presets",desc:"Show Nightcore, Slowcore, Big Bass, 8D Orbit and Dub Echo.",checked:j,onChange:o=>{let p=o.target.checked;v.setBuiltinPresets(p),Ze(v,T)}}),re.map((o,p)=>{let tt=e.presetId===o.id&&!Ye(o,e);return l.default.createElement(g.LunaSetting,{key:o.id,title:`${o.name}${tt?" *":""}`,desc:Fr(o)},l.default.createElement("div",{style:Te},e.presetId===o.id?l.default.createElement("span",{style:{fontSize:12,opacity:.7}},"Active"):l.default.createElement(g.LunaButton,{size:"small",onClick:()=>v.applyPreset(o)},"Use"),o.builtin===!0?l.default.createElement("span",{style:{fontSize:12,opacity:.6}},"Built-in"):l.default.createElement(l.default.Fragment,null,l.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>k({id:o.id,name:o.name,value:o.name})},"Rename"),l.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>$(o)},"Update"),l.default.createElement(g.LunaButton,{size:"small",variant:"text",disabled:p<=R,title:"Move up",onClick:()=>T.move(o.id,-1)},"\u2191"),l.default.createElement(g.LunaButton,{size:"small",variant:"text",disabled:p>=re.length-1,title:"Move down",onClick:()=>T.move(o.id,1)},"\u2193"),l.default.createElement(g.LunaButton,{size:"small",variant:"text",color:"error",onClick:()=>Me(o)},"Delete"))))}),y!==null&&l.default.createElement(l.default.Fragment,null,l.default.createElement(g.LunaTextSetting,{title:`Rename ${y.name}`,defaultValue:y.value,onChange:o=>k({...y,value:o.target.value})}),l.default.createElement(g.LunaSetting,{title:" "},l.default.createElement("div",{style:Te},l.default.createElement(g.LunaButton,{size:"small",onClick:()=>{T.rename(y.id,y.value),k(null)}},"Save"),l.default.createElement(g.LunaButton,{size:"small",variant:"text",onClick:()=>k(null)},"Cancel")))))),l.default.createElement(et,null,l.default.createElement(g.LunaSettings,{title:"Effects",desc:"Same Web Audio chain as pitch. Needs audio capture \u2014 use the dev-mode self-test if nothing changes."},l.default.createElement(g.LunaSwitchSetting,{title:"Equalizer",desc:"8 bands, 62 Hz to 8 kHz, \xB112 dB. Drag a band; double-click resets it.",checked:S.eq.enabled,onChange:o=>W({enabled:o.target.checked})}),l.default.createElement(g.LunaSetting,{title:"Bands",desc:"Shift+arrow for 3 dB steps."},l.default.createElement(ma,{eq:S.eq,disabled:!S.eq.enabled,onChange:o=>W({bands:o})})),l.default.createElement(g.LunaSetting,{title:"Flatten",desc:"Set every band to 0 dB."},l.default.createElement("div",{style:Te},l.default.createElement(g.LunaButton,{size:"small",variant:"outlined",disabled:!S.eq.enabled,onClick:()=>W({bands:Array.from({length:Ke},()=>0)})},"Flatten EQ"))),l.default.createElement(g.LunaSwitchSetting,{title:"Bass boost",desc:"Parallel low-shelf sub boost with saturation for dirty kicks. Added on top of the dry signal.",checked:S.bass.enabled,onChange:o=>B({enabled:o.target.checked})}),l.default.createElement(g.LunaTextSetting,{title:"Bass boost (dB)",desc:"Low shelf at 90 Hz, 0\u201324 dB.",defaultValue:String(Math.round(S.bass.boost)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=G(o.target.value);p!==void 0&&B({boost:Math.max(0,Math.min(24,p))})}}),l.default.createElement(g.LunaTextSetting,{title:"Sub (dB)",desc:"Extra shelf at 45 Hz, 0\u201312 dB.",defaultValue:String(Math.round(S.bass.sub)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=G(o.target.value);p!==void 0&&B({sub:Math.max(0,Math.min(12,p))})}}),l.default.createElement(g.LunaTextSetting,{title:"Drive (%)",desc:"Saturation on the bass path; more harmonics, dirtier kicks.",defaultValue:String(Math.round(S.bass.drive*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=G(o.target.value);p!==void 0&&B({drive:Math.max(0,Math.min(100,p))/100})}}),l.default.createElement(g.LunaTextSetting,{title:"Bass amount (%)",desc:"How much of the boosted bass is added back.",defaultValue:String(Math.round(S.bass.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=G(o.target.value);p!==void 0&&B({mix:Math.max(0,Math.min(100,p))/100})}}),l.default.createElement(g.LunaSwitchSetting,{title:"8D audio",desc:"LFO panning plus a constant pitch wobble, so the mix moves around your head.",checked:S.eightD.enabled,onChange:o=>Q({enabled:o.target.checked})}),l.default.createElement(g.LunaTextSetting,{title:"8D pan rate (Hz)",desc:"How fast the sound travels left/right.",defaultValue:String(S.eightD.rate),inputProps:{inputMode:"decimal"},onChange:o=>{let p=G(o.target.value);p!==void 0&&Q({rate:Math.max(.02,Math.min(2,p))})}}),l.default.createElement(g.LunaTextSetting,{title:"8D pan depth (%)",defaultValue:String(Math.round(S.eightD.panDepth*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=G(o.target.value);p!==void 0&&Q({panDepth:Math.max(0,Math.min(100,p))/100})}}),l.default.createElement(g.LunaTextSetting,{title:"8D pitch rate (Hz)",desc:"Speed of the constant pitch wobble.",defaultValue:String(S.eightD.pitchRate),inputProps:{inputMode:"decimal"},onChange:o=>{let p=G(o.target.value);p!==void 0&&Q({pitchRate:Math.max(.02,Math.min(2,p))})}}),l.default.createElement(g.LunaTextSetting,{title:"8D pitch depth (ms)",desc:"Delay modulation depth; higher = wider pitch smear.",defaultValue:String(S.eightD.pitchDepth),inputProps:{inputMode:"decimal"},onChange:o=>{let p=G(o.target.value);p!==void 0&&Q({pitchDepth:Math.max(0,Math.min(12,p))})}}),l.default.createElement(g.LunaSwitchSetting,{title:"Delay",desc:"Feedback delay.",checked:S.delay.enabled,onChange:o=>_({enabled:o.target.checked})}),l.default.createElement(g.LunaTextSetting,{title:"Delay time (ms)",defaultValue:String(Math.round(S.delay.timeMs)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=G(o.target.value);p!==void 0&&_({timeMs:Math.max(20,Math.min(2e3,p))})}}),l.default.createElement(g.LunaTextSetting,{title:"Delay feedback (%)",defaultValue:String(Math.round(S.delay.feedback*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=G(o.target.value);p!==void 0&&_({feedback:Math.max(0,Math.min(90,p))/100})}}),l.default.createElement(g.LunaTextSetting,{title:"Delay mix (%)",defaultValue:String(Math.round(S.delay.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=G(o.target.value);p!==void 0&&_({mix:Math.max(0,Math.min(100,p))/100})}}),l.default.createElement(g.LunaSwitchSetting,{title:"Reverb",desc:"Generated impulse response.",checked:S.reverb.enabled,onChange:o=>ie({enabled:o.target.checked})}),l.default.createElement(g.LunaTextSetting,{title:"Reverb decay (s)",defaultValue:String(S.reverb.decay),inputProps:{inputMode:"decimal"},onChange:o=>{let p=G(o.target.value);p!==void 0&&ie({decay:Math.max(.2,Math.min(8,p))})}}),l.default.createElement(g.LunaTextSetting,{title:"Reverb mix (%)",defaultValue:String(Math.round(S.reverb.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=G(o.target.value);p!==void 0&&ie({mix:Math.max(0,Math.min(100,p))/100})}}))),l.default.createElement(et,null,l.default.createElement(g.LunaSettings,{title:"Config file",desc:"Versioned JSON, editable outside Luna. Autosaves 300 ms after changes."},l.default.createElement(g.LunaSetting,{title:"Path",desc:c},l.default.createElement("div",{style:Te},l.default.createElement(g.LunaButton,{size:"small",variant:"text",onClick:()=>{qt(c)}},"Copy path"))),l.default.createElement(g.LunaSetting,{title:"Actions",desc:d===""?void 0:d},l.default.createElement("div",{style:Te},l.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Cn()}},"Show folder"),l.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{H()}},"Reload"),l.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{xe()}},"Import\u2026"),l.default.createElement(g.LunaButton,{size:"small",variant:"outlined",onClick:()=>{D()}},"Export\u2026"))))),l.default.createElement(et,null,l.default.createElement(g.LunaSettings,{title:"Developer",desc:"Logs and test tools are off unless you need to report a bug."},l.default.createElement(g.LunaSwitchSetting,{title:"Developer mode",desc:"Write diagnostics logs and show the Copy diagnostics action.",checked:ae,onChange:o=>v.setDeveloperMode(o.target.checked)}),ae&&l.default.createElement(g.LunaSetting,{title:"Audio engine self-test",desc:A},l.default.createElement("div",{style:Te},l.default.createElement(g.LunaButton,{size:"small",variant:"outlined",disabled:E,onClick:async()=>{m(!0);try{let o=await ca();M(o.ok?`OK \xB7 ${o.context} \xB7 rms ${o.rms} \xB7 peak ${o.peak} \xB7 \u0394${o.progressionSeconds}s`:`Failed \xB7 ${o.reason??"unknown"} \xB7 context ${o.context}`)}finally{m(!1)}}},E?"Testing\u2026":"Run test"))),ae&&l.default.createElement(g.LunaButtonSetting,{title:"Diagnostics",desc:"Copy player, pitch-engine, effects, theme and media state plus recent logs.",children:r,onClick:async()=>{i("Copying\u2026");let o=await Be(v.get());i(o?"Copied":"Copy failed")}}))))};var xt=new Set,{trace:ga}=(0,Se.Tracer)("[PlaybackKit]"),Gr=1e3,Kr=1500,sn="tidaluna.playback-speed.previous-quality",xa=()=>{try{return localStorage.getItem(sn)}catch{return null}},Ur=e=>{try{localStorage.setItem(sn,e)}catch{}},ka=()=>{try{localStorage.removeItem(sn)}catch{}},Ea=e=>{let t=ue.redux.actions["settings/SET_STREAMING_QUALITY"];typeof t=="function"?t(e):ue.redux.store.dispatch({type:"settings/SET_STREAMING_QUALITY",payload:e})},ha=()=>{let t=(0,Se.findModuleByProperty)((n,a)=>n==="activePlayer"&&typeof a=="object"&&a!==null)?.activePlayer;if(t===void 0)return{found:!1};try{let n=Object.getPrototypeOf(t),a=n===null?[]:Object.getOwnPropertyNames(n).filter(i=>{try{return typeof t[i]=="function"}catch{return!1}}).slice(0,60),r=i=>{try{return t[i]}catch{return}};return{found:!0,name:r("name"),constructor:t.constructor?.name,state:r("playbackState")??r("state"),currentTime:r("currentTime"),methods:a,hasSetPlaybackRate:a.includes("setPlaybackRate"),hasMediaElement:!!(r("mediaElement")??r("video")??r("element"))}}catch(n){return{found:!0,error:String(n)}}},ba=()=>{let t=(0,Se.findModuleByProperty)((n,a)=>n==="activePlayer"&&typeof a=="object"&&a!==null)?.activePlayer?.name;return t==="nativePlayer"?"native":t==="shakaPlayer"?"shaka":t==="browserPlayer"?"browser":"unknown"},ya,Vr=()=>(ya??=(0,Se.findModuleByProperty)((e,t)=>e==="activePlayer"&&typeof t=="object"&&t!==null),ya?.activePlayer),Pa=()=>{if(we()==="native"){let n=Vr()?.currentTime;return typeof n=="number"&&Number.isFinite(n)?n:null}let e=ne(),t=e.find(n=>!n.paused&&n.readyState>0)??e.find(n=>n.readyState>0);return t===void 0?null:t.currentTime},jr=()=>{try{return ue.redux.store.getState().playbackControls?.playbackState==="PLAYING"}catch{return!1}},Wr=e=>{let t=ue.redux.actions["playbackControls/TIME_UPDATE"];typeof t=="function"?t(e):ue.redux.store.dispatch({type:"playbackControls/TIME_UPDATE",payload:e})},Qr=()=>{try{let e=ue.redux.store.getState().playbackControls;if(e===void 0)return null;let t=e.latestCurrentTime??0;return e.playbackState!=="PLAYING"?t:t+Math.abs(Date.now()-(e.latestCurrentTimeSyncTimestamp??Date.now()))/1e3}catch{return null}},va={getSpeed:()=>v.get().speed,isPlaying:jr,getPosition:Pa,dispatchTimeUpdate:Wr},Jr=()=>{try{let e=ue.redux.store.getState(),t=e.playQueue,n=t?.elements?.[t.currentIndex??-1]?.mediaItemId;if(n===void 0)return null;let a=e.content?.mediaItems?.[String(n)];return a===void 0?{id:n,found:!1}:{id:n,found:!0,title:a.title,bpm:a.bpm??null,key:a.key??a.keyScale??null,metadataKeys:Object.keys(a).filter(r=>/bpm|key|tempo|tone/i.test(r))}}catch(e){return{error:String(e)}}},wa=!1,qe,dn=()=>Xe(v.get(),T.get()),Sa=()=>{wa&&(qe!==void 0&&clearTimeout(qe),qe=setTimeout(()=>{qe=void 0,Ie(dn()).catch(e=>h("error","config save failed",{error:String(e)}))},300))},Yr=async()=>{try{let e=await dt(),t=e===null?void 0:ot(e),n=await st();t!==void 0?(v.replace(t.settings),T.replace(t.presets),Ze(v,T),h("info","config loaded",{path:n,speed:t.settings.speed,presets:t.presets.length})):(await Ie(dn()),h("info",e===null?"config created":"config invalid, rewrote defaults",{path:n}))}catch(e){h("warn","config file unavailable; using browser storage only",{error:String(e)})}finally{wa=!0}},Xr=()=>{try{let e=ue.redux.actions["router/PUSH"];if(typeof e!="function")throw new Error("router/PUSH is unavailable");e({pathname:"/not-found",search:"LunaSettings",replace:!0}),h("info","opening Luna settings"),setTimeout(()=>{let n=[...document.querySelectorAll('[role="tab"]')].find(a=>(a.textContent??"").trim()==="Plugins");n!==void 0&&n.getAttribute("aria-selected")!=="true"&&n.click(),setTimeout(()=>{[...document.querySelectorAll("h1,h2,h3,h4,h5,h6,span,p,div")].find(i=>(i.textContent??"").trim()==="@kyoto-aircon/playback-kit")?.scrollIntoView({block:"center",behavior:"smooth"})},250)},250)}catch(e){h("error","open Luna settings failed",{error:String(e)})}},Zr=()=>{try{let t=ue.redux.store.getState().settings?.quality?.streaming;if(t==="HIGH"){h("info","already on the browser player quality");return}h("info","switching streaming quality to HIGH",{from:t}),typeof t=="string"&&Ur(t),Ea("HIGH")}catch(e){h("error","quality switch failed",{error:String(e)})}},ei=()=>{let e=xa();e!==null&&(h("info","restoring streaming quality",{to:e}),Ea(e),ka())},ti=e=>{let t={version:Re,logs:In,logText:_t,report:()=>Ot(v.get()),copy:()=>Be(v.get()),clear:Rn,setVerbose:Bn,selectors:lt,playerKind:we,audioEngine:I,native:yt,store:v,controller:e};globalThis.__playbackSpeed=t,xt.add(()=>{globalThis.__playbackSpeed===t&&delete globalThis.__playbackSpeed})};try{Ht(v.get().developerMode),_n(ha);try{let s=Se.LunaPlugin.getByName("@kyoto-aircon/playback-speed");s!==void 0&&h("warn","old Playback Speed plugin is still installed",{enabled:s.store?.enabled})}catch{}qn(()=>({kind:we(),native:yt(),nativeInstance:ta(),speed:v.get().speed,track:Jr(),audioEngine:I(),effects:Qn(),pitchSemitones:v.get().pitchSemitones,pitchEngine:Yt(),presetId:v.get().presetId,uiTime:Qr(),actualTime:Pa()})),Qt(),h("info","loading",{version:Re,selectors:lt(),media:ne().length,settings:v.get(),tidal:ha(),native:yt()});let e=Gn();xt.add(()=>Kn(e));let t=new ht(ne,v);t.start();let n=v.subscribe(s=>{Ht(s.developerMode),Sa(),h("info","settings changed",{speed:s.speed,pitchShifts:s.pitchShifts,bounds:s.bounds}),t.apply(),we()==="native"&&Jt(s.speed),en(va),vt(s.pitchSemitones,ne()),jt(s.effects,ne())});T.subscribe(Sa),Yr(),Wn(xt,v,{getPlayerKind:we,subscribePlayerKind:ia,useBrowserPlayer:Zr,previousQuality:xa,restoreQuality:ei,presets:{list:()=>T.get().filter(s=>v.get().builtinPresets||s.builtin!==!0),apply:s=>{v.applyPreset(s),h("info","preset applied",{id:s.id,name:s.name})},clear:()=>v.clearPreset(),save:(s,d)=>T.save(s,d),saveActive:s=>{let d=oa(v,T,s);h("info","saved preset from live state",{id:d?.id,builtin:s.builtin===!0})}},getPitchEngineState:Yt,openSettings:Xr,onOpen:()=>{let s=v.get().pitchSemitones;s!==0&&vt(s,ne())}}),ti(t);let r=setInterval(()=>{t.scan();let s=v.get().pitchSemitones;s!==0&&vt(s,ne());let d=v.get().effects;at(d)&&jt(d,ne())},Gr),i=sa(va);Zt(ba());let c=setInterval(()=>{Qt();let s=ba(),d=we();Zt(s),s!==d&&s==="native"&&(Jt(v.get().speed),ka())},Kr);xt.add(()=>{qe!==void 0&&(clearTimeout(qe),Ie(dn()).catch(()=>{})),clearInterval(r),clearInterval(c),i(),n(),t.stop(),ra()}),ga.log("loaded")}catch(e){h("error","failed to load",{error:String(e),stack:e?.stack}),ga.err("Failed to load:",e)}export{zr as Settings,xt as unloads};
//# sourceMappingURL=kyoto-aircon.playback-kit.mjs.map
