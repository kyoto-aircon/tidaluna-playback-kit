var Ea=Object.create;var Vn=Object.defineProperty;var Ta=Object.getOwnPropertyDescriptor;var Ma=Object.getOwnPropertyNames;var La=Object.getPrototypeOf,Ca=Object.prototype.hasOwnProperty;var St=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var Da=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Ma(t))!Ca.call(e,a)&&a!==n&&Vn(e,a,{get:()=>t[a],enumerable:!(r=Ta(t,a))||r.enumerable});return e};var ze=(e,t,n)=>(n=e!=null?Ea(La(e)):{},Da(t||!e||!e.__esModule?Vn(n,"default",{value:e,enumerable:!0}):n,e));var jn=St((co,Ut)=>{Ut.exports=luna?.core?.modules?.["@luna/core"];if(Ut.exports===void 0)throw new Error("Cannot find module @luna/core in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/core")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var jt=St((uo,Vt)=>{Vt.exports=luna?.core?.modules?.["@luna/lib"];if(Vt.exports===void 0)throw new Error("Cannot find module @luna/lib in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/lib")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Nn=St((ds,An)=>{An.exports=luna?.core?.modules?.react;if(An.exports===void 0)throw new Error("Cannot find module react in luna.core.modules");luna.core.LunaPlugin.getByName("react")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var ta=St((cs,In)=>{In.exports=luna?.core?.modules?.["@luna/ui"];if(In.exports===void 0)throw new Error("Cannot find module @luna/ui in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/ui")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Ae=ze(jn(),1),se=ze(jt(),1);var Ke=[62,125,250,500,1e3,2e3,4e3,8e3],at=Ke.length,Se=-12,ee=12,T={eq:{enabled:!1,bands:Array.from({length:at},()=>0)},bass:{enabled:!1,boost:6,sub:3,drive:.2,mix:.6},eightD:{enabled:!1,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},delay:{enabled:!1,timeMs:250,feedback:.25,mix:.25},reverb:{enabled:!1,decay:2,mix:.25}},N=(e,t,n,r)=>{let a=typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(a)?Math.min(n,Math.max(t,a)):r},rt=(e,t)=>typeof e=="boolean"?e:t,Aa=e=>{let t=Array.from({length:at},()=>0);if(Array.isArray(e.bands)){for(let i=0;i<at;i+=1)t[i]=N(e.bands[i],Se,ee,0);return t}let n=N(e.low,Se,ee,0),r=N(e.mid,Se,ee,0),a=N(e.high,Se,ee,0);return[n,n,r,r,r,a,a,a]},G=e=>{let t=typeof e=="object"&&e!==null?e:{},n=typeof t.eq=="object"&&t.eq!==null?t.eq:{},r=typeof t.eightD=="object"&&t.eightD!==null?t.eightD:{},a=typeof t.bass=="object"&&t.bass!==null?t.bass:{},i=typeof t.delay=="object"&&t.delay!==null?t.delay:{},l=typeof t.reverb=="object"&&t.reverb!==null?t.reverb:{};return{eq:{enabled:rt(n.enabled,T.eq.enabled),bands:Aa(n)},eightD:{enabled:rt(r.enabled,T.eightD.enabled),rate:N(r.rate,.02,2,T.eightD.rate),panDepth:N(r.panDepth,0,1,T.eightD.panDepth),pitchRate:N(r.pitchRate,.02,2,T.eightD.pitchRate),pitchDepth:N(r.pitchDepth,0,12,T.eightD.pitchDepth),mix:N(r.mix,0,1,T.eightD.mix)},bass:{enabled:rt(a.enabled,T.bass.enabled),boost:N(a.boost,0,24,T.bass.boost),sub:N(a.sub,0,12,T.bass.sub),drive:N(a.drive,0,1,T.bass.drive),mix:N(a.mix,0,1,T.bass.mix)},delay:{enabled:rt(i.enabled,T.delay.enabled),timeMs:N(i.timeMs,20,2e3,T.delay.timeMs),feedback:N(i.feedback,0,.9,T.delay.feedback),mix:N(i.mix,0,1,T.delay.mix)},reverb:{enabled:rt(l.enabled,T.reverb.enabled),decay:N(l.decay,.2,8,T.reverb.decay),mix:N(l.mix,0,1,T.reverb.mix)}}},Ge=e=>e.eq.enabled||e.bass.enabled||e.eightD.enabled||e.delay.enabled||e.reverb.enabled,xt=e=>{let t=[];return e.eq.enabled&&t.push("EQ 8-band"),e.eightD.enabled&&t.push(`8D ${e.eightD.rate.toFixed(2)} Hz`),e.bass.enabled&&t.push(`Bass +${Math.round(e.bass.boost)} dB`),e.delay.enabled&&t.push(`Delay ${Math.round(e.delay.timeMs)} ms`),e.reverb.enabled&&t.push(`Reverb ${e.reverb.decay.toFixed(1)} s`),t.length===0?"No effects enabled":t.join(" \xB7 ")};var te=e=>Number.isFinite(e)?Math.max(-12,Math.min(12,Math.round(e))):0,Wn=e=>2**(te(e)/12),it=e=>{let t=te(e);return`${t>0?"+":""}${t}`};var ot={min:.05,max:10,step:.05},lt=1;var Na=6,Ue=(e,t=Na)=>{let n=10**t;return Math.round(e*n)/n},wt=(e,t,n)=>Math.min(n,Math.max(t,e)),we=e=>{let t=Number(e?.min),n=Number.isFinite(t)?Ue(Math.max(.01,t)):ot.min,r=Number(e?.max),a=Number.isFinite(r)?Ue(Math.max(n+.01,r)):Math.max(n+.01,ot.max),i=Number(e?.step),l=Number.isFinite(i)&&i>0?Ue(i):ot.step;return{min:n,max:a,step:l}},Ia=(e,t)=>{let{min:n,step:r}=t,a=n+Math.round((e-n)/r)*r;return Ue(a)},xe=(e,t)=>{let n=we(t),r=Number.isFinite(e)?e:lt,a=Ia(r,n);return wt(Ue(a),n.min,n.max)},Qn=(e,t,n)=>{let r=we(n),a=xe(e,r);return xe(a+t*r.step,r)},Ra=e=>{let t=e.includes(".")?e.replace(/0+$/,"").replace(/\.$/,""):e;return t===""||t==="-0"?"0":t},ne=e=>Number.isFinite(e)?Ra(e.toFixed(4)):String(lt),Ve=e=>`${ne(e)}\xD7`,st=(e,t)=>{let{min:n,max:r}=we(t);if(!(r>n))return 0;let a=Math.log(wt(e,n,r)/n)/Math.log(r/n);return wt(Number.isFinite(a)?a:0,0,1)},Jn=(e,t)=>{let n=we(t),r=n.min*Math.pow(n.max/n.min,wt(e,0,1));return xe(r,n)},Yn=e=>{let{min:t,max:n}=we(e),r=[t,1,2,5,10,n],a=new Set,i=[];for(let c of r.sort((s,d)=>s-d)){if(c<t||c>n)continue;let s=ne(c);a.has(s)||(a.add(s),i.push(Ue(c)))}let l=[];for(let c of i){let s=l[l.length-1];s!==void 0&&st(c,e)-st(s,e)<.07||l.push(c)}return l};var Ba="tidaluna.playback-kit.v1",Ha="tidaluna.playback-speed.v1",dt=()=>({speed:lt,pitchShifts:!1,pitchSemitones:0,presetId:null,developerMode:!1,builtinPresets:!0,nativeEffects:!1,effects:G(void 0),bounds:{...ot}}),Xn=e=>{if(e===null)return dt();let t;try{t=JSON.parse(e)}catch{return dt()}if(typeof t!="object"||t===null)return dt();let n=t,r=we(n.bounds),a=te(typeof n.pitchSemitones=="number"?n.pitchSemitones:0);return{speed:xe(typeof n.speed=="number"?n.speed:lt,r),pitchShifts:a===0&&n.pitchShifts===!0,pitchSemitones:a,presetId:typeof n.presetId=="string"?n.presetId:null,developerMode:n.developerMode===!0,builtinPresets:n.builtinPresets!==!1,nativeEffects:n.nativeEffects===!0,effects:G(n.effects),bounds:r}},Oa=(e,t)=>{let n=e.getItem(t);if(n!==null)return Xn(n);let r=e.getItem(Ha);if(r===null)return dt();let a=Xn(r);return a.presetId=null,a},qa=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&e.presetId===t.presetId&&e.developerMode===t.developerMode&&e.builtinPresets===t.builtinPresets&&e.nativeEffects===t.nativeEffects&&JSON.stringify(e.effects)===JSON.stringify(t.effects)&&e.bounds.min===t.bounds.min&&e.bounds.max===t.bounds.max&&e.bounds.step===t.bounds.step,Wt=(e,t=Ba)=>{let n=Oa(e,t),r=new Set,a=()=>({...n,bounds:{...n.bounds}}),i=c=>{if(qa(n,c))return;n=c;try{e.setItem(t,JSON.stringify(n))}catch{}let s=a();for(let d of[...r])try{d(s)}catch(g){console.error("[PlaybackKit] listener failed",g)}},l=c=>({...n,...c});return{get:a,subscribe(c){return r.add(c),()=>r.delete(c)},setSpeed(c){i(l({speed:xe(c,n.bounds)}))},step(c){i(l({speed:Qn(n.speed,c,n.bounds)}))},setPitchShifts(c){i(l({pitchShifts:c,pitchSemitones:c?0:n.pitchSemitones}))},setPitchSemitones(c){let s=te(c);i(l({pitchSemitones:s,pitchShifts:s===0?n.pitchShifts:!1}))},setBounds(c){let s=we({...n.bounds,...c});i({...n,bounds:s,speed:xe(n.speed,s)})},applyPreset(c){let s=te(c.pitchSemitones);i({...n,speed:xe(c.speed,n.bounds),pitchShifts:s===0&&c.pitchShifts===!0,pitchSemitones:s,effects:G(c.effects),presetId:c.id})},setEffects(c){i({...n,effects:G(c)})},setDeveloperMode(c){i({...n,developerMode:c})},setBuiltinPresets(c){i({...n,builtinPresets:c})},setNativeEffects(c){i({...n,nativeEffects:c})},clearPreset(){i({...n,presetId:null})},replace(c){let s=we(c.bounds),d=te(c.pitchSemitones);i({speed:xe(c.speed,s),pitchShifts:d===0&&c.pitchShifts===!0,pitchSemitones:d,presetId:typeof c.presetId=="string"?c.presetId:null,developerMode:c.developerMode===!0,builtinPresets:c.builtinPresets!==!1,nativeEffects:c.nativeEffects===!0,effects:G(c.effects),bounds:s})},reset(){i({...dt(),developerMode:n.developerMode,builtinPresets:n.builtinPresets,presetId:null,bounds:{...n.bounds}})},destroy(){r.clear()}}},Zn=new Map,Qt=()=>{try{if(typeof localStorage<"u"){let e="__lunakit_probe__";return localStorage.setItem(e,"1"),localStorage.removeItem(e),localStorage}}catch{}return{getItem:e=>Zn.get(e)??null,setItem:(e,t)=>{Zn.set(e,t)}}},v=Wt(Qt());var $a="tidaluna.playback-kit.presets.v1",Xt="nightcore",fe=e=>G({...T,...e,eq:{...T.eq,...e.eq??{}},bass:{...T.bass,...e.bass??{}},eightD:{...T.eightD,...e.eightD??{}},delay:{...T.delay,...e.delay??{}},reverb:{...T.reverb,...e.reverb??{}}}),Fa={id:Xt,name:"Nightcore",speed:1.35,pitchShifts:!0,pitchSemitones:0,effects:fe({}),builtin:!0},za={id:"slowcore",name:"Slowcore",speed:.8,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:4,mix:.35}}),builtin:!0},Ka={id:"big-bass",name:"Big Bass",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({eq:{enabled:!0,bands:[3,2,0,0,0,0,0,1]},bass:{enabled:!0,boost:14,sub:6,drive:.5,mix:1}}),builtin:!0},Ga={id:"eight-d",name:"8D Orbit",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({eightD:{enabled:!0,rate:.15,panDepth:.9,pitchRate:.35,pitchDepth:2,mix:1},reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},Ua={id:"dub-echo",name:"Dub Echo",speed:1,pitchShifts:!1,pitchSemitones:0,effects:fe({delay:{enabled:!0,timeMs:450,feedback:.45,mix:.28}}),builtin:!0},Va={id:"daycore",name:"Daycore",speed:.85,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:2.5,mix:.2}}),builtin:!0},ja={id:"chipmunk",name:"Chipmunk",speed:1.6,pitchShifts:!0,pitchSemitones:0,effects:fe({}),builtin:!0},Wa={id:"vaporwave",name:"Vaporwave",speed:.7,pitchShifts:!0,pitchSemitones:0,effects:fe({reverb:{enabled:!0,decay:5,mix:.35},delay:{enabled:!0,timeMs:300,feedback:.3,mix:.2}}),builtin:!0},Qa={id:"submerge",name:"Submerge",speed:.95,pitchShifts:!1,pitchSemitones:0,effects:fe({bass:{enabled:!0,boost:10,sub:5,drive:.3,mix:.6},eightD:{enabled:!0,rate:.1,panDepth:.75,pitchRate:.25,pitchDepth:2,mix:.85}}),builtin:!0},Ja={id:"clear-voice",name:"Clear Voice",speed:1.15,pitchShifts:!1,pitchSemitones:0,effects:fe({eq:{enabled:!0,bands:[-4,-2,1,2,2,1,0,0]}}),builtin:!0},er=[Fa,Va,za,ja,Wa,Ka,Qa,Ga,Ua,Ja],ct=new Set(er.map(e=>e.id)),Ya=24,Xa=.05,Za=16,Jt=e=>{if(typeof e!="string")return;let t=e.trim().slice(0,Ya);return t===""?void 0:t},Yt=e=>{let t=Number(e);return Number.isFinite(t)?Math.max(Xa,Math.min(Za,t)):1},tr=(e,t)=>{if(typeof e!="object"||e===null)return;let n=e,r=typeof n.id=="string"?n.id:void 0,a=Jt(n.name);if(!(r===void 0||a===void 0||ct.has(r)||t.has(r)))return t.add(r),{id:r,name:a,speed:Yt(n.speed),pitchShifts:n.pitchShifts===!0,pitchSemitones:te(typeof n.pitchSemitones=="number"?n.pitchSemitones:0),effects:G(n.effects)}},ei=e=>{if(e===null)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(!Array.isArray(t))return[];let n=new Set,r=[];for(let a of t){let i=tr(a,n);i!==void 0&&r.push(i)}return r},ti=(e,t)=>{if(e.eq.enabled!==t.eq.enabled||e.eq.bands.length!==t.eq.bands.length)return!1;for(let i=0;i<e.eq.bands.length;i+=1)if(e.eq.bands[i]!==t.eq.bands[i])return!1;let n=["enabled","boost","sub","drive","mix"];for(let i of n)if(e.bass[i]!==t.bass[i])return!1;let r=["enabled","rate","panDepth","pitchRate","pitchDepth"];for(let i of r)if(e.eightD[i]!==t.eightD[i])return!1;let a=["enabled","timeMs","feedback","mix"];for(let i of a)if(e.delay[i]!==t.delay[i])return!1;return e.reverb.enabled===t.reverb.enabled&&e.reverb.decay===t.reverb.decay&&e.reverb.mix===t.reverb.mix},ut=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&ti(e.effects,t.effects),Zt=(e,t=$a)=>{let n=ei(e.getItem(t)),r=new Set,a=0,i=()=>{try{e.setItem(t,JSON.stringify(n))}catch{}},l=()=>{for(let s of[...r])try{s()}catch{}},c=()=>[...er.map(s=>({...s})),...n.map(s=>({...s}))];return{get:c,getById(s){return c().find(d=>d.id===s)},save(s,d){let g=Jt(s);if(g===void 0)return;a+=1;let w={id:`custom-${Date.now().toString(36)}-${a}`,name:g,speed:Yt(d.speed),pitchShifts:d.pitchShifts===!0,pitchSemitones:te(d.pitchSemitones),effects:G(d.effects)};return n.push(w),i(),l(),{...w}},remove(s){if(ct.has(s))return!1;let d=n.filter(g=>g.id!==s);return d.length===n.length?!1:(n=d,i(),l(),!0)},rename(s,d){if(ct.has(s))return!1;let g=Jt(d),w=n.find(k=>k.id===s);return g===void 0||w===void 0?!1:(w.name=g,i(),l(),!0)},update(s,d){if(ct.has(s))return!1;let g=n.find(w=>w.id===s);return g===void 0?!1:(g.speed=Yt(d.speed),g.pitchShifts=d.pitchShifts===!0,g.pitchSemitones=te(d.pitchSemitones),g.effects=G(d.effects),i(),l(),!0)},move(s,d){if(ct.has(s))return!1;let g=n.findIndex(b=>b.id===s),w=g+Math.sign(d);if(g<0||w<0||w>=n.length)return!1;let[k]=n.splice(g,1);return n.splice(w,0,k),i(),l(),!0},replace(s){let d=new Set;n=s.filter(g=>g.builtin!==!0).map(g=>tr(g,d)).filter(g=>g!==void 0),i(),l()},subscribe(s){return r.add(s),()=>r.delete(s)}}},M=Zt(Qt());var en=1,nr=e=>({getItem:()=>e,setItem:()=>{}}),kt=e=>{if(e==null)return;let t;try{t=JSON.parse(e)}catch{return}if(typeof t!="object"||t===null)return;let n=t;if(n.version!==en)return;let r=Wt(nr(JSON.stringify(n.settings??{}))).get(),a=Zt(nr(JSON.stringify(n.presets??[]))).get().filter(l=>l.builtin!==!0),i=new Set([Xt,...a.map(l=>l.id)]);return r.presetId!==null&&!i.has(r.presetId)&&(r.presetId=null),{version:en,settings:r,presets:a}},pt=(e,t)=>`${JSON.stringify({version:en,settings:e,presets:t.filter(n=>n.builtin!==!0)},null,2)}
`;var Ne=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/config.native.ts",'"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var P=(e,n)=>{for(var t in n)p(e,t,{get:n[t],enumerable:!0})},w=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of m(n))!h.call(e,s)&&s!==t&&p(e,s,{get:()=>n[s],enumerable:!(o=d(n,s))||o.enumerable});return e};var y=e=>w(p({},"__esModule",{value:!0}),e);var A={};P(A,{exportConfig:()=>F,getConfigPath:()=>k,importConfig:()=>S,readConfig:()=>v,revealConfig:()=>D,writeConfig:()=>x});module.exports=y(A);var l=require,i=l("path"),r=()=>l("fs/promises"),b=()=>l("fs"),u=()=>l("electron"),g=()=>process.env.HOME??process.env.USERPROFILE??"",f=()=>process.platform==="win32"?process.env.APPDATA??i.join(g(),"AppData","Roaming"):process.platform==="darwin"?i.join(g(),"Library","Application Support"):i.join(g(),".config"),j=()=>{let e=f(),n=b(),t=[],o=process.resourcesPath;o!==void 0&&(t.push(i.basename(i.dirname(i.dirname(o)))),t.push(i.basename(i.dirname(o)))),t.push("TIDAL","Tidal","tidal","tidal-hifi");for(let s of t)if(!(s===""||s==="Contents"||s==="resources")&&n.existsSync(i.join(e,s)))return s;return"TIDAL"},c=()=>i.join(f(),j(),"playback-kit"),a=()=>i.join(c(),"config.json"),k=async()=>a(),v=async()=>{try{return await r().readFile(a(),"utf8")}catch{return null}},x=async e=>{await r().mkdir(c(),{recursive:!0});let n=`${a()}.tmp`;return await r().writeFile(n,e,"utf8"),await r().rename(n,a()),a()},F=async e=>{let t=await u().dialog.showSaveDialog({title:"Export Playback Kit config",defaultPath:i.join(f(),"playback-kit.json"),filters:[{name:"JSON",extensions:["json"]}]});return t.canceled||t.filePath===void 0?null:(await r().writeFile(t.filePath,e,"utf8"),t.filePath)},S=async()=>{let n=await u().dialog.showOpenDialog({title:"Import Playback Kit config",properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]}),t=n.filePaths[0];return n.canceled||t===void 0?null:{path:t,json:await r().readFile(t,"utf8")}},D=async()=>{await r().mkdir(c(),{recursive:!0}),await u().shell.openPath(c())};0&&(module.exports={exportConfig,getConfigPath,importConfig,readConfig,revealConfig,writeConfig});\n');if(Ne===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/config.native.ts");var rr=(...e)=>__ipcRenderer.invoke(Ne,"exportConfig",...e),Pt=(...e)=>__ipcRenderer.invoke(Ne,"getConfigPath",...e),ar=(...e)=>__ipcRenderer.invoke(Ne,"importConfig",...e),Et=(...e)=>__ipcRenderer.invoke(Ne,"readConfig",...e),ir=(...e)=>__ipcRenderer.invoke(Ne,"revealConfig",...e),je=(...e)=>__ipcRenderer.invoke(Ne,"writeConfig",...e);var We="2.15.1";var Me=[],or=!0,sr=!1,lr=e=>{if(e!==void 0)try{return JSON.parse(JSON.stringify(e))}catch{try{return String(e)}catch{return"[unserialisable]"}}},nn=e=>{sr=e,e||(Me.length=0)};var m=(e,t,n)=>{if(!sr)return;let r={at:Date.now(),level:e,message:t,data:lr(n)};if(Me.push(r),Me.length>500&&Me.shift(),!(e==="debug"&&!or))try{let a=e==="error"?console.error:e==="warn"?console.warn:console.debug;n===void 0?a(`[PlaybackKit] ${t}`):a(`[PlaybackKit] ${t}`,n)}catch{}},dr=()=>Me.map(e=>({...e})),rn=()=>Me.map(e=>`${new Date(e.at).toISOString()} ${e.level.toUpperCase().padEnd(5)} ${e.message}${e.data===void 0?"":` ${JSON.stringify(e.data)}`}`).join(`
`),cr=()=>{Me.length=0},ur=e=>{or=e};var ni=e=>({tag:e.tagName.toLowerCase(),id:e.id,class:typeof e.className=="string"?e.className:"",src:(e.currentSrc||e.src||"").slice(0,140),paused:e.paused,readyState:e.readyState,networkState:e.networkState,currentTime:Number(e.currentTime.toFixed(3)),duration:Number.isFinite(e.duration)?Number(e.duration.toFixed(3)):e.duration,playbackRate:e.playbackRate,defaultPlaybackRate:e.defaultPlaybackRate,preservesPitch:e.preservesPitch,muted:e.muted,volume:e.volume,connected:e.isConnected,parent:e.parentElement===null?null:e.parentElement.id||e.parentElement.className}),ri=()=>typeof document>"u"?[]:[...document.querySelectorAll("video,audio")].map(ni),Tt=()=>{if(typeof document>"u")return{};let e=document.getElementById("tidal-player-root");return{playerRoot:e!==null,rootChildCount:e?.children.length??0,rootChildren:e===null?[]:[...e.children].map(t=>`${t.tagName.toLowerCase()}#${t.id||"-"}`),scopedMedia:document.querySelectorAll("#tidal-player-root video, #tidal-player-root audio").length,videoOne:document.getElementById("video-one")!==null,videoTwo:document.getElementById("video-two")!==null,allMedia:document.querySelectorAll("video,audio").length,footer:document.querySelector('[data-test="footer-player"]')!==null}},ai=e=>new Promise(t=>setTimeout(t,e)),ii=async(e=1500)=>{if(typeof document>"u")return[];let t=[...document.querySelectorAll("video,audio")],n=t.map(r=>({id:r.id,tag:r.tagName.toLowerCase(),time:r.currentTime,paused:r.paused}));return await ai(e),t.map((r,a)=>{let i=n[a],l=r.currentTime-i.time,c=e/1e3;return{id:i.id,tag:i.tag,paused:r.paused,deltaSeconds:Number(l.toFixed(3)),observedRate:Number((l/c).toFixed(3)),expectedRate:r.playbackRate}})},pr,fr=e=>{pr=e},mr,gr=e=>{mr=e},tn,hr=e=>{tn=e},oi=4e3,si=async()=>{if(tn===void 0)return{registered:!1};try{return await Promise.race([tn(),new Promise((e,t)=>setTimeout(()=>t(new Error("native probe timed out")),oi))])}catch(e){return{error:String(e)}}},li=()=>{try{return mr?.()??{}}catch(e){return{error:String(e)}}},di=()=>{try{return pr?.()??{registered:!1}}catch(e){return{error:String(e)}}},ci=["--wave-color-solid-accent-fill","--wave-color-solid-accent-bright","--wave-color-solid-base-fill","--wave-color-solid-base-brighter","--wave-color-solid-base-brightest","--wave-color-solid-contrast-fill","--wave-color-solid-contrast-dark","--wave-color-opacity-contrast-fill-ultra-thin","--wave-color-opacity-contrast-fill-thin","--wave-color-opacity-contrast-fill-thick","--wave-color-solid-warning-fill","--wave-color-text-danger","--market-core-text-10-color","--market-core-text-20-color","--market-core-fill-white-color","--baseFontSize","--baseLineHeight","--remRatio"],ui=()=>{if(typeof document>"u")return{};let e=document.getElementById("wimp")??document.querySelector('[data-test="footer-player"]')??document.documentElement,t=getComputedStyle(e),n={};for(let a of ci){let i=t.getPropertyValue(a).trim();i!==""&&(n[a]=i)}let r=a=>{let i=document.querySelector(a);if(i===null)return null;let l=getComputedStyle(i);return{color:l.color,background:l.backgroundColor,fontFamily:l.fontFamily,fontSize:l.fontSize,lineHeight:l.lineHeight,borderRadius:l.borderRadius,height:l.height}};return{root:e.id!==""?`#${e.id}`:e.tagName.toLowerCase(),fontSize:t.fontSize,fontFamily:t.fontFamily,tokens:n,elements:{footer:r('[data-test="footer-player"]'),utilityButtons:r('[data-test="footer-player"] [class*="utilityButtons"]'),volume:r('[data-test="footer-player"] [class*="sliderContainer"]'),qualityBadge:r("[data-test-quality-badge-streaming-quality]"),progressBar:r('[data-test="progress-bar"]')}}},an=async e=>{m("info","building diagnostics report");let t=await ii(),n=await si();return[`Playback Kit v${We}`,`at: ${new Date().toISOString()}`,`url: ${typeof location>"u"?"?":location.href}`,`ua: ${typeof navigator>"u"?"?":navigator.userAgent}`,`visibility: ${typeof document>"u"?"?":document.visibilityState}`,`settings: ${JSON.stringify(lr(e))}`,`selectors: ${JSON.stringify(Tt())}`,`player: ${JSON.stringify(li())}`,`nativeProbe: ${JSON.stringify(n)}`,`tidal: ${JSON.stringify(di())}`,`progression: ${JSON.stringify(t)}`,`media: ${JSON.stringify(ri())}`,`theme: ${JSON.stringify(ui())}`,"",`--- logs (${Me.length}) ---`,rn()].join(`
`)},Qe=async e=>on(await an(e)),on=async e=>{try{if(typeof navigator<"u"&&navigator.clipboard?.writeText!==void 0)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}catch{return!1}};var pi=400,br=100,fi=5e-4,mi="__playbackKitAudioState",sn=globalThis[mi]??={sources:new Map},re=sn.context,Re,Ie,Je,ae=[],ft=sn.sources,Mt=new Map,gi="__playbackKitWorklets",yr=globalThis[gi]??=new Set,vr=e=>new Promise(t=>setTimeout(t,e)),U=async()=>{if(re===void 0){let e=window.AudioContext??window.webkitAudioContext;if(e===void 0)throw new Error("Web Audio is unavailable");re=new e({latencyHint:"playback"}),sn.context=re,m("info","audio context created",{sampleRate:re.sampleRate,state:re.state})}if(re.state==="suspended")try{await Promise.race([re.resume(),vr(250)])}catch{}return re},ln=()=>{if(Re===void 0||Ie===void 0)return;Re.disconnect();for(let t of ae)try{t.output.disconnect()}catch{}let e=Re;for(let t of ae)e.connect(t.input),e=t.output;e.connect(Ie)},mt=async()=>{let e=await U();if(Re===void 0||Ie===void 0){Re=e.createGain(),Ie=e.createGain(),Je=e.createAnalyser(),Je.fftSize=2048,Ie.connect(Je),Ie.connect(e.destination);for(let t of ft.values()){try{t.disconnect()}catch{}t.connect(Re)}}return ln(),{ctx:e,input:Re,output:Ie}},dn=async(e,t)=>{if(Mt.has(t))return Mt.get(t);if(yr.has(t))return;let n=await U(),r=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),a=(async()=>{let i;try{await Promise.race([n.audioWorklet.addModule(r),new Promise((l,c)=>{i=setTimeout(()=>c(new Error(`Timed out loading worklet ${t}`)),pi*10)})])}finally{i!==void 0&&clearTimeout(i),URL.revokeObjectURL(r)}})();Mt.set(t,a);try{await a,yr.add(t)}catch(i){throw Mt.delete(t),i}},_e=async e=>{let{ctx:t,input:n}=await mt();if(ft.has(e))return;if(e.mediaKeys!==null&&e.mediaKeys!==void 0)throw new Error("protected media (DRM) cannot be routed through Web Audio");let r=t.createMediaElementSource(e);r.connect(n),ft.set(e,r),m("info","audio engine attached element",{id:e.id,sources:ft.size})},Lt=new Set,cn=async e=>{let{input:t}=await mt();Lt.has(e)||(e.connect(t),Lt.add(e),m("info","audio engine connected external source",{inputs:Lt.size}))},un=e=>{Lt.delete(e);try{e.disconnect()}catch{}},pn=async(e,t)=>{await Ct(e,e,t)},Ct=async(e,t,n)=>{if(await mt(),ae.some(a=>a.input===e))return;let r=n===void 0?ae.length:Math.max(0,Math.min(ae.length,n));ae.splice(r,0,{input:e,output:t}),ln(),m("debug","audio engine inserted group",{index:r,nodes:ae.length})},hi=async e=>{await mt();let t=ae.findIndex(r=>r.input===e||r.output===e);if(t<0)return!1;let[n]=ae.splice(t,1);try{n.output.disconnect()}catch{}return ln(),!0},bi=()=>ae.map(e=>e.input),_=()=>({context:re===void 0?"none":re.state,sampleRate:re?.sampleRate,sources:ft.size,nodes:ae.length}),fn=async(e=1200)=>{let{ctx:t}=await mt();if(Je===void 0)throw new Error("analyser unavailable");let n=Math.max(1,Math.round(e/br)),r=new Float32Array(Je.fftSize),a=0,i=0,l=0;for(let s=0;s<n;s+=1){if(await vr(br),t.state!=="running")continue;Je.getFloatTimeDomainData(r);let d=0,g=0;for(let w of r){let k=Math.abs(w);k>d&&(d=k),g+=w*w}a=Math.max(a,d),i+=g/r.length,l+=1}let c=l===0?0:Math.sqrt(i/l);return{rms:c,peak:a,samples:l,silent:c<fi,durationMs:e}},yi=()=>({version:1,ensureContext:U,loadWorklet:dn,attach:_e,connectSource:cn,disconnectSource:un,insert:pn,insertGroup:Ct,remove:hi,list:bi,status:_,measureRms:fn}),Sr=()=>{let e=yi();return globalThis.__playbackKitAudio=e,e},xr=e=>{globalThis.__playbackKitAudio===e&&delete globalThis.__playbackKitAudio};var Pr=ze(jt(),1);var wr=`
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
`;var mn=1e4,kr=12,Dt=8,xi=1e3,wi='<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>',gn=(e,t,n)=>Math.min(n,Math.max(t,e)),ki=()=>document.querySelector('[data-test="footer-player"] [class*="utilityButtons"]'),Pi=e=>{switch(e){case"HI_RES_LOSSLESS":return"Max";case"HI_RES":return"Hi-Res";case"LOSSLESS":return"Lossless";case"HIGH":return"High";case"LOW":return"Low";default:return e}},Er=(e,t,n={})=>{new Pr.StyleTag("lunaspeed-styles",e,wr);let r=document.createElement("div");r.className="lunaspeed-ctl",r.dataset.lunaspeed="control";let a=document.createElement("button");a.type="button",a.className="lunaspeed-step",a.textContent="\u2212",a.setAttribute("aria-label","Slower");let i=document.createElement("button");i.type="button",i.className="lunaspeed-pill",i.setAttribute("aria-label","Playback speed"),i.setAttribute("aria-haspopup","dialog"),i.innerHTML=`${wi}<span class="lunaspeed-pill-label"></span>`;let l=i.querySelector(".lunaspeed-pill-label"),c=document.createElement("button");c.type="button",c.className="lunaspeed-step",c.textContent="+",c.setAttribute("aria-label","Faster"),r.append(a,i,c);let s=document.createElement("div");s.className="lunaspeed-popover",s.setAttribute("role","dialog"),s.setAttribute("aria-label","Playback settings"),s.hidden=!0,s.innerHTML=`
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
			<input class="lunaspeed-range" type="range" min="0" max="${mn}" step="1" aria-label="Playback speed slider" />
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
			<span class="lunaspeed-version">v${We}</span>
			<span class="lunaspeed-foot-actions">
				<button class="lunaspeed-settings" type="button">Luna settings</button>
				<button class="lunaspeed-copy" type="button">Copy diagnostics</button>
			</span>
		</div>`;let d=s.querySelector(".lunaspeed-value"),g=s.querySelector(".lunaspeed-presets"),w=s.querySelector(".lunaspeed-save-toggle"),k=s.querySelector(".lunaspeed-save"),b=s.querySelector(".lunaspeed-save-input"),I=s.querySelector(".lunaspeed-save-cancel"),C=s.querySelector(".lunaspeed-slider"),L=s.querySelector(".lunaspeed-range"),Pe=s.querySelector(".lunaspeed-ticks"),Y=s.querySelector(".lunaspeed-pitch-value"),S=[...s.querySelectorAll(".lunaspeed-pitch-step")],le=s.querySelector(".lunaspeed-switch"),Ee=s.querySelector(".lunaspeed-reset"),R=s.querySelector(".lunaspeed-copy"),ge=s.querySelector(".lunaspeed-settings"),F=s.querySelector(".lunaspeed-pitch-dot"),z=s.querySelector(".lunaspeed-warning"),K=s.querySelector(".lunaspeed-warning-text"),D=s.querySelector(".lunaspeed-warning-effects"),B=s.querySelector(".lunaspeed-warning-action"),de=s.querySelector(".lunaspeed-quality"),ce=s.querySelector(".lunaspeed-quality-action"),Te="",he="",H=!1,ue=!1,o,p,be=f=>{C.style.setProperty("--lunaspeed-pos",String(gn(f,0,1)))},ye=(f,y)=>{let x=st(f,y);L.value=String(Math.round(x*mn)),be(x)},va=()=>{let{bounds:f}=t.get(),y=`${f.min}:${f.max}`;y!==Te&&(Te=y,Pe.replaceChildren(...Yn(f).map(x=>{let P=document.createElement("span");return P.className="lunaspeed-tick",P.style.left=`${(st(x,f)*100).toFixed(3)}%`,P.textContent=Ve(x),P})))},Sa=f=>f===null?"Custom":n.presets?.list().find(y=>y.id===f)?.name??"Custom",qn=()=>{let f=n.presets;if(f===void 0){g.hidden=!0,k.hidden=!0;return}let y=f.list(),x=t.get(),P=x.presetId,O=y.find(A=>A.id===P),X=O!==void 0&&!ut(O,x),pe=`${y.map(A=>`${A.id}:${A.name}`).join("|")}::${P??""}::${X}`;if(pe===he)return;he=pe;let Z=[],q=document.createElement("button");q.type="button",q.className="lunaspeed-preset",q.textContent="Custom",q.dataset.active=String(P===null),q.setAttribute("aria-pressed",String(P===null)),q.addEventListener("click",()=>f.clear()),Z.push(q);for(let A of y){let ve=document.createElement("button");ve.type="button",ve.className="lunaspeed-preset";let Gt=P===A.id;ve.textContent=Gt&&X?`${A.name} *`:A.name,ve.dataset.active=String(Gt),ve.setAttribute("aria-pressed",String(Gt)),ve.dataset.builtin=String(A.builtin===!0),ve.title=`${A.name} \u2014 ${Ve(A.speed)} \xB7 ${A.pitchShifts?"pitch follows speed":A.pitchSemitones!==0?`pitch ${it(A.pitchSemitones)} st`:"pitch preserved"} \xB7 ${xt(A.effects)}`,ve.addEventListener("click",()=>f.apply(A)),Z.push(ve)}g.replaceChildren(...Z)},xa=(f,y)=>{Y.textContent=`${it(f)} st`;for(let x of S){let P=Number(x.dataset.delta);x.disabled=P<0?f<=-12:f>=12,x.title=P<0?"Lower pitch by 1 semitone":"Raise pitch by 1 semitone"}le.setAttribute("aria-checked",String(y))},$n=f=>{let y=n.getPitchEngineState?.(),x=f===0?"idle":y?.status??"idle";F.dataset.status=x;let P=x==="running"?"Pitch engine active":x==="waiting"?"Pitch engine waiting for the audio element":x==="unavailable"?"Pitch engine unavailable"+(y?.reason===void 0?"":": "+y.reason):x==="ready"?"Pitch engine ready":"Pitch engine idle";F.title=f===0?"":P,F.setAttribute("aria-label",f===0?"":P)},vt=f=>{z.hidden=f!=="native";let y=t.get().nativeEffects;K.textContent=y?"Effects and pitch run through Playback Kit. Speed still needs the browser player.":"TIDAL ignores effects, speed and pitch here. Enable effects or use the browser player.",D.hidden=y,D.disabled=!1,D.textContent="Enable effects";let x=n.previousQuality?.()??null,P=f!=="native"&&x!==null;de.hidden=!P,P&&x!==null&&(ce.textContent=`Restore ${Pi(x)}`)},zt=()=>{let f=t.get(),{speed:y,pitchShifts:x,pitchSemitones:P,bounds:O,presetId:X}=f,pe=Ve(y);l.textContent=pe,i.dataset.active=String(y!==1||x||P!==0);let Z=n.presets?.list().find(A=>A.id===X),q=Z!==void 0&&!ut(Z,f);i.title=`Playback ${pe}${X===null?"":` \xB7 ${Sa(X)}${q?" *":""}`}`,a.setAttribute("aria-label",`Slower by ${Ve(O.step)}`),c.setAttribute("aria-label",`Faster by ${Ve(O.step)}`),a.title=`\u2212${ne(O.step)}\xD7`,c.title=`+${ne(O.step)}\xD7`,d.textContent=ne(y),ue||ye(y,O),L.setAttribute("aria-valuetext",pe),va(),qn(),xa(P,x),$n(P),R.hidden=!f.developerMode,vt(n.getPlayerKind?.()??"unknown"),H&&Kt()},Kt=()=>{let f=i.getBoundingClientRect(),y=s.offsetWidth||348,x=s.offsetHeight||240,P=gn(f.left+f.width/2-y/2,Dt,window.innerWidth-y-Dt),O=f.top-x-kr,X="top";O<Dt&&(O=Math.min(f.bottom+kr,window.innerHeight-x-Dt),X="bottom"),s.style.left=`${Math.round(P)}px`,s.style.top=`${Math.round(O)}px`,s.dataset.side=X;let pe=gn(f.left+f.width/2-P,18,y-18);s.style.setProperty("--lunaspeed-caret",`${Math.round(pe)}px`)},Fn=f=>{let y=f.target;y!==null&&(s.contains(y)||r.contains(y)||Fe())},zn=f=>{f.key==="Escape"&&(f.preventDefault(),Fe(),i.focus())},Kn=()=>{H&&Kt()},wa=()=>{H||(H=!0,s.hidden=!1,i.dataset.open="true",zt(),vt(n.getPlayerKind?.()??"unknown"),Kt(),n.onOpen?.(),document.addEventListener("pointerdown",Fn,!0),document.addEventListener("keydown",zn,!0),window.addEventListener("resize",Kn),o=setInterval(()=>$n(t.get().pitchSemitones),500),m("debug","popover open"))},Fe=()=>{H&&(H=!1,s.hidden=!0,delete i.dataset.open,k.hidden=!0,o!==void 0&&(clearInterval(o),o=void 0),document.removeEventListener("pointerdown",Fn,!0),document.removeEventListener("keydown",zn,!0),window.removeEventListener("resize",Kn))},ka=()=>H?Fe():wa(),Gn=()=>{if(!r.isConnected){H&&Fe();let y=ki();if(y===null)return;let x=y.querySelector('[class*="sliderContainer"]');x!==null&&x.parentElement===y?y.insertBefore(r,x):y.appendChild(r)}let f=document.getElementById("wimp")??document.body;s.parentElement!==f&&f.appendChild(s)};w.addEventListener("click",()=>{if(k.hidden=!k.hidden,k.hidden)return;let f=n.presets?.list().find(y=>y.id===t.get().presetId);b.value=f===void 0?"":f.builtin===!0?`${f.name} (edited)`:f.name,b.focus(),b.select()}),a.addEventListener("click",()=>t.step(-1)),c.addEventListener("click",()=>t.step(1)),i.addEventListener("click",ka),L.addEventListener("pointerdown",()=>{ue=!0,p!==void 0&&clearTimeout(p),delete C.dataset.settling});let et=()=>{if(!ue)return;ue=!1;let{speed:f,bounds:y}=t.get();C.dataset.settling="true",ye(f,y),p!==void 0&&clearTimeout(p),p=setTimeout(()=>{p=void 0,delete C.dataset.settling},160)};L.addEventListener("change",et),window.addEventListener("pointerup",et),window.addEventListener("pointercancel",et),L.addEventListener("input",()=>{if(L.disabled)return;let f=Number(L.value)/mn,y=t.get().bounds;be(f),t.setSpeed(Jn(f,y))}),s.addEventListener("keydown",f=>{f.key==="ArrowLeft"||f.key==="ArrowDown"?(f.preventDefault(),t.step(-1)):(f.key==="ArrowRight"||f.key==="ArrowUp")&&(f.preventDefault(),t.step(1))});for(let f of S)f.addEventListener("click",()=>{let y=Number(f.dataset.delta);t.setPitchSemitones(t.get().pitchSemitones+y)});le.addEventListener("click",()=>t.setPitchShifts(!t.get().pitchShifts)),Ee.addEventListener("click",()=>t.reset()),k.addEventListener("submit",f=>{f.preventDefault();let y=n.presets;if(y===void 0)return;let x=b.value.trim();if(x==="")return;let{speed:P,pitchShifts:O,pitchSemitones:X,effects:pe}=t.get(),Z=y.list().find(q=>q.id===t.get().presetId);if(Z!==void 0&&Z.builtin!==!0&&x===Z.name)y.saveActive(Z);else{let q=y.save(x,{speed:P,pitchShifts:O,pitchSemitones:X,effects:pe});if(q===void 0)return;y.apply(q)}b.value="",k.hidden=!0,he="",qn(),m("info","preset saved",{name:x})}),I.addEventListener("click",()=>{k.hidden=!0,b.value=""}),ge.hidden=n.openSettings===void 0,ge.addEventListener("click",()=>{n.openSettings?.(),Fe()});let tt;R.addEventListener("click",async()=>{tt!==void 0&&clearTimeout(tt),R.disabled=!0,R.textContent="Copying\u2026";let f=await Qe(t.get());m(f?"info":"error","diagnostics copied",{copied:f}),R.textContent=f?"Copied":"Copy failed",tt=setTimeout(()=>{R.textContent="Copy diagnostics",R.disabled=!1},1800)});let nt;D.addEventListener("click",()=>{n.enableNativeEffects?.(),D.disabled=!0,D.textContent="Enabled",m("info","enabled native effects from warning")}),B.addEventListener("click",()=>{n.useBrowserPlayer!==void 0&&(nt!==void 0&&clearTimeout(nt),B.disabled=!0,B.textContent="Switching\u2026",n.useBrowserPlayer(),m("info","requested browser player from warning"),nt=setTimeout(()=>{B.disabled=!1,B.textContent="Use browser player"},2500))}),ce.addEventListener("click",()=>{n.restoreQuality!==void 0&&(n.restoreQuality(),de.hidden=!0,m("info","restored original streaming quality"))}),vt(n.getPlayerKind?.()??"unknown");let Un=n.subscribePlayerKind?.(vt);Un!==void 0&&e.add(Un),Gn(),zt(),e.add(t.subscribe(zt));let Pa=setInterval(Gn,xi);e.add(()=>{clearInterval(Pa),window.removeEventListener("pointerup",et),window.removeEventListener("pointercancel",et),tt!==void 0&&clearTimeout(tt),nt!==void 0&&clearTimeout(nt),p!==void 0&&clearTimeout(p),Fe(),s.remove(),r.remove()})};var E,Le={built:!1,active:[],attached:0},Tr=()=>({...Le}),Ei=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Ti=(e,t)=>{let n=Math.max(1,Math.floor(e.sampleRate*t)),r=e.createBuffer(2,n,e.sampleRate);for(let a=0;a<2;a+=1){let i=r.getChannelData(a);for(let l=0;l<n;l+=1){let c=Math.pow(1-l/n,2.2);i[l]=(Math.random()*2-1)*c}}return r},Mi=async()=>{let e=await U();if(E!==void 0)return E;let t=e.createGain(),n=Ke.map((p,be)=>{let ye=e.createBiquadFilter();return ye.frequency.value=p,be===0?ye.type="lowshelf":be===Ke.length-1?ye.type="highshelf":(ye.type="peaking",ye.Q.value=1.2),ye}),r=e.createGain(),a=e.createDelay(2),i=e.createGain(),l=e.createGain(),c=e.createGain(),s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=220,s.Q.value=.7;let d=e.createBiquadFilter();d.type="lowshelf",d.frequency.value=45;let g=e.createBiquadFilter();g.type="lowshelf",g.frequency.value=90;let w=e.createGain(),k=e.createWaveShaper(),b=new Float32Array(2048);for(let p=0;p<b.length;p+=1){let be=p/(b.length-1)*2-1;b[p]=Math.tanh(3*be)/Math.tanh(3)}k.curve=b,k.oversample="4x";let I=e.createGain(),C=e.createDynamicsCompressor();C.threshold.value=-3,C.knee.value=0,C.ratio.value=20,C.attack.value=.003,C.release.value=.25;let L=e.createGain(),Pe=e.createChannelSplitter(2),Y=e.createDelay(.05);Y.delayTime.value=.015;let S=e.createDelay(.05);S.delayTime.value=.015;let le=e.createChannelMerger(2),Ee=e.createStereoPanner(),R=e.createGain();R.gain.value=1;let ge=e.createGain();ge.gain.value=0;let F=e.createGain(),z=e.createOscillator();z.type="sine",z.frequency.value=.12;let K=e.createGain();K.gain.value=0;let D=e.createOscillator();D.type="sine",D.frequency.value=.35;let B=e.createGain();B.gain.value=0;let de=e.createGain();de.gain.value=0,z.connect(K),K.connect(Ee.pan),D.connect(B),D.connect(de),B.connect(Y.delayTime),de.connect(S.delayTime),z.start(),D.start(),L.connect(R),R.connect(F),L.connect(Pe),Pe.connect(Y,0),Pe.connect(S,1),Y.connect(le,0,0),S.connect(le,0,1),le.connect(Ee),Ee.connect(ge),ge.connect(F);let ce=e.createGain(),Te=e.createGain(),he=e.createConvolver(),H=e.createGain(),ue=e.createGain();t.connect(n[0]);for(let p=1;p<n.length;p+=1)n[p-1].connect(n[p]);let o=n[n.length-1];return o.connect(c),c.connect(L),o.connect(s),s.connect(d),d.connect(g),g.connect(w),w.connect(k),k.connect(I),I.connect(L),F.connect(r),F.connect(a),r.connect(ce),a.connect(i),i.connect(ce),a.connect(l),l.connect(a),ce.connect(Te),Te.connect(C),ce.connect(he),he.connect(H),H.connect(C),C.connect(ue),E={fxIn:t,eqFilters:n,delayDry:r,delayNode:a,delayWet:i,delayFeedback:l,bassDry:c,bassLowpass:s,bassSub:d,bassBoost:g,bassDrive:w,bassShaper:k,bassWet:I,eightDInput:L,eightDSplitter:Pe,eightDDelayL:Y,eightDDelayR:S,eightDMerger:le,eightDPanner:Ee,eightDDry:R,eightDWet:ge,eightDOut:F,panLfo:z,panDepth:K,pitchLfo:D,pitchDepthL:B,pitchDepthR:de,limiter:C,reverbIn:ce,reverbDry:Te,convolver:he,reverbWet:H,fxOut:ue,decay:0},await Ct(t,ue),m("info","effects graph inserted"),E},Li=(e,t)=>{if(E===void 0)return;let n=e.currentTime,r=.06,a=E;for(let g=0;g<a.eqFilters.length;g+=1){let w=t.eq.enabled?t.eq.bands[g]??0:0;a.eqFilters[g].gain.setTargetAtTime(w,n,r)}let i=t.bass.enabled?t.bass.mix:0;a.bassDry.gain.setTargetAtTime(1,n,r),a.bassWet.gain.setTargetAtTime(i,n,r),a.bassSub.gain.setTargetAtTime(t.bass.enabled?t.bass.sub:0,n,r),a.bassBoost.gain.setTargetAtTime(t.bass.enabled?t.bass.boost:0,n,r),a.bassDrive.gain.setTargetAtTime(t.bass.enabled?1+t.bass.drive*3:1,n,r),a.panLfo.frequency.setTargetAtTime(t.eightD.rate,n,r),a.panDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.panDepth:0,n,r),a.pitchLfo.frequency.setTargetAtTime(t.eightD.pitchRate,n,r);let l=t.eightD.enabled?t.eightD.pitchDepth/1e3:0;a.pitchDepthL.gain.setTargetAtTime(l,n,r),a.pitchDepthR.gain.setTargetAtTime(-l,n,r);let c=t.eightD.enabled?t.eightD.mix:0;a.eightDDry.gain.setTargetAtTime(1-c,n,r),a.eightDWet.gain.setTargetAtTime(c,n,r);let s=t.delay.enabled?t.delay.mix:0;a.delayNode.delayTime.setTargetAtTime(Math.min(2,Math.max(.02,t.delay.timeMs/1e3)),n,r),a.delayFeedback.gain.setTargetAtTime(t.delay.enabled?t.delay.feedback:0,n,r),a.delayWet.gain.setTargetAtTime(s,n,r),a.delayDry.gain.setTargetAtTime(1-s,n,r);let d=t.reverb.enabled?t.reverb.mix:0;Math.abs(a.decay-t.reverb.decay)>.05&&(a.convolver.buffer=Ti(e,t.reverb.decay),a.decay=t.reverb.decay),a.reverbWet.gain.setTargetAtTime(d,n,r),a.reverbDry.gain.setTargetAtTime(1-d,n,r)},hn=async(e,t)=>{let n=G(e),r=Ge(n);if(!r&&E===void 0){Le={...Le,active:[]};return}try{let a=await U();if(a.state!=="running"&&r){Le={built:E!==void 0,context:a.state,active:[],error:"audio context suspended (interact with the page)",attached:_().sources};return}if(r){let l=Ei(t);l!==void 0&&await _e(l)}let i=await Mi();Li(a,n),Le={built:!0,context:a.state,active:[n.eq.enabled?"eq":"",n.bass.enabled?"bass":"",n.eightD.enabled?"8d":"",n.delay.enabled?"delay":"",n.reverb.enabled?"reverb":""].filter(l=>l!==""),attached:_().sources},i.decay===0&&n.reverb.enabled&&(i.decay=n.reverb.decay)}catch(a){let i=a instanceof Error?a.message:String(a);Le={built:E!==void 0,context:_().context,active:[],error:i,attached:_().sources},m("warn","effects engine unavailable",{error:i})}},Mr=()=>{if(E!==void 0){let e=E.eqFilters[0].context.currentTime,t=.03;for(let n of E.eqFilters)n.gain.setTargetAtTime(0,e,t);E.bassWet.gain.setTargetAtTime(0,e,t),E.bassDry.gain.setTargetAtTime(1,e,t),E.bassSub.gain.setTargetAtTime(0,e,t),E.bassBoost.gain.setTargetAtTime(0,e,t),E.bassDrive.gain.setTargetAtTime(1,e,t),E.eightDWet.gain.setTargetAtTime(0,e,t),E.eightDDry.gain.setTargetAtTime(1,e,t),E.panDepth.gain.setTargetAtTime(0,e,t),E.pitchDepthL.gain.setTargetAtTime(0,e,t),E.pitchDepthR.gain.setTargetAtTime(0,e,t),E.delayWet.gain.setTargetAtTime(0,e,t),E.delayDry.gain.setTargetAtTime(1,e,t),E.delayFeedback.gain.setTargetAtTime(0,e,t),E.reverbWet.gain.setTargetAtTime(0,e,t),E.reverbDry.gain.setTargetAtTime(1,e,t)}Le={...Le,active:[],error:void 0}};var Dr="#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two",Lr=["loadstart","loadedmetadata","canplay","playing","play","emptied","ratechange","seeked"],At=.001,Cr=1,Ci=150,Nt=e=>{let t=e.id;return typeof t=="string"?t:e.constructor.name},ie=()=>typeof document>"u"?[]:[...document.querySelectorAll(Dr)],It=class{constructor(t,n){this.getElements=t;this.source=n}getElements;source;attachments=new Map;timers=new Set;start(){this.scan()}scan(){let t=this.getElements(),n=0;for(let r of t)this.attachments.has(r)||(this.attach(r),n+=1);n>0?m("info","attached media elements",{added:n,total:this.attachments.size,found:t.length}):t.length===0&&m("debug","no media elements found",{selector:Dr})}apply(){this.scan();for(let t of this.attachments.keys())this.applyTo(t,"settings-change")}stop(){for(let t of this.timers)clearTimeout(t);this.timers.clear();for(let[t,n]of this.attachments)n(),this.restore(t);this.attachments.clear(),m("info","controller stopped")}attach(t){let n=r=>{let a=this.source.get().speed,i=t.playbackRate;Math.abs(i-a)>At&&m("warn","TIDAL reset the rate",{id:Nt(t),event:r.type,before:i,desired:a,currentTime:t.currentTime}),this.applyTo(t,r.type),(r.type==="loadstart"||r.type==="emptied")&&this.scheduleReapply(t)};for(let r of Lr)t.addEventListener(r,n);this.attachments.set(t,()=>{for(let r of Lr)t.removeEventListener(r,n)}),m("info","attached",{id:Nt(t),tag:t.constructor.name,rate:t.playbackRate}),this.applyTo(t,"attach")}applyTo(t,n){let{speed:r,pitchShifts:a}=this.source.get(),i=t.playbackRate;try{Math.abs(i-r)>At&&(t.playbackRate=r),t.defaultPlaybackRate!==void 0&&Math.abs(t.defaultPlaybackRate-r)>At&&(t.defaultPlaybackRate=r);let c=!a;t.preservesPitch!==void 0&&t.preservesPitch!==c&&(t.preservesPitch=c),t.webkitPreservesPitch!==void 0&&t.webkitPreservesPitch!==c&&(t.webkitPreservesPitch=c)}catch(c){m("error","failed to apply rate",{id:Nt(t),reason:n,error:String(c)});return}let l=t.playbackRate;Math.abs(l-i)>At&&m("debug","applied rate",{id:Nt(t),reason:n,before:i,after:l,readback:l,defaultRate:t.defaultPlaybackRate})}scheduleReapply(t){let n=setTimeout(()=>{this.timers.delete(n),this.attachments.has(t)&&this.applyTo(t,"delayed-reapply")},Ci);this.timers.add(n)}restore(t){try{t.playbackRate=Cr,t.defaultPlaybackRate!==void 0&&(t.defaultPlaybackRate=Cr),t.preservesPitch!==void 0&&(t.preservesPitch=!0),t.webkitPreservesPitch!==void 0&&(t.webkitPreservesPitch=!0)}catch{}}};var Rt="__lunaspeedPatched",Q,W,Ar=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||t.Player===void 0||t.Player.prototype===void 0))return t},yn=e=>{let t=new Set,n=e,r=0;for(;n!==null&&r<4;){for(let a of Object.getOwnPropertyNames(n))t.add(a);n=Object.getPrototypeOf(n),r+=1}return[...t]},Nr=e=>{let t=yn(e),n=t.find(r=>/^set(playback|audio)?(rate|speed|tempo)$/i.test(r));return n!==void 0&&typeof e[n]=="function"?n:typeof e.playbackRate=="number"?"playbackRate":t.find(r=>/^(playbackRate|rate|speed)$/i.test(r)&&typeof e[r]=="number")},Di=e=>{Q!==e&&(Q=e,W=Nr(e),m("info","native player instance captured",{rateMember:W??null,ownKeys:Object.keys(e).slice(0,40),methods:yn(e).slice(0,80)}))},vn=()=>{let e=Ar();if(e===void 0)return!1;let t=e.Player?.prototype;if(t===void 0)return!1;if(t[Rt]===!0)return!0;try{Object.defineProperty(t,Rt,{value:!0,enumerable:!1})}catch{return!1}for(let n of["play","load","pause","seek"]){let r=t[n];typeof r=="function"&&(t[n]=function(...i){try{Di(this)}catch(l){m("error","native capture failed",{error:String(l)})}return r.apply(this,i)})}return m("info","native player component patched"),!0},Ir=()=>Q!==void 0,bn,Rr=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||typeof t.Player!="function")){if(bn===void 0)try{bn=t.Player()}catch(n){m("error","native volume control unavailable",{error:String(n)});return}return bn}},_r=e=>{let t=Rr();if(!(t===void 0||typeof t.setVolume!="function"))try{t.setVolume(Math.round(Math.max(0,Math.min(1,e))*100))}catch(n){m("error","native volume set failed",{error:String(n)})}},Br=()=>{let t=Rr()?.volume;if(!(typeof t!="number"||!Number.isFinite(t)))return Math.max(0,Math.min(1,t))},Sn=e=>{if(Q===void 0||(W===void 0&&(W=Nr(Q)),W===void 0))return!1;try{let t=Q[W];if(W==="playbackRate"){if(t===e)return!0;Q.playbackRate=e}else Q[W](e);return m("info","native rate applied",{rate:e,member:W,readback:Q[W]}),!0}catch(t){return m("error","native rate failed",{rate:e,member:W,error:String(t)}),!1}},_t=()=>{let e=Ar();if(e===void 0)return{present:!1};let t=e.Player?.prototype,n=t===void 0?[]:Object.getOwnPropertyNames(t).filter(r=>r!==Rt);return{present:!0,patched:t!==void 0&&t[Rt]===!0,playerMethods:n.slice(0,100),rateMethods:n.filter(r=>/rate|speed|tempo|pitch/i.test(r)),instanceCaptured:Q!==void 0,rateMember:W??null,instanceMethods:Q===void 0?[]:yn(Q).slice(0,100)}};var Be=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/nativeProbe.native.ts",'"use strict";var v=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var H=Object.getOwnPropertyNames;var F=Object.prototype.hasOwnProperty;var O=(r,t)=>{for(var e in t)v(r,e,{get:t[e],enumerable:!0})},I=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of H(t))!F.call(r,a)&&a!==e&&v(r,a,{get:()=>t[a],enumerable:!(n=C(t,a))||n.enumerable});return r};var q=r=>I(v({},"__esModule",{value:!0}),r);var oe={};O(oe,{canPrepare:()=>te,prepareLastLoad:()=>re,readProbe:()=>ee,readTrack:()=>ne,releaseTrack:()=>ae,startProbe:()=>V,stopProbe:()=>Z});module.exports=q(oe);var L=require("node:crypto"),B="UIlTTEMmmLfGowo/UC60x2H45W6MdGgTRfo/umg4754=",M=(r,t=B)=>{let e=Buffer.from(r,"base64");if(e.length<32||(e.length-16)%16!==0)throw new Error("encryption key is not an OLD_AES token");let n=Buffer.from(t,"base64");if(n.length!==32)throw new Error("invalid master key length");let a=(0,L.createDecipheriv)("aes-256-cbc",n,e.subarray(0,16));a.setAutoPadding(!1);let s=Buffer.concat([a.update(e.subarray(16)),a.final()]);if(s.length<24)throw new Error("unwrapped key is too short");return{key:new Uint8Array(s.subarray(0,16)),nonce:new Uint8Array(s.subarray(16,24))}},T=(r,t)=>{if(r.length!==16)throw new Error("lossless key must be 16 bytes");if(t.length!==8)throw new Error("lossless nonce must be 8 bytes");let e=new Uint8Array(16);e.set(t,0);let n=(0,L.createDecipheriv)("aes-128-ctr",r,e);return{update(a){return new Uint8Array(n.update(a))},destroy(){n.destroy()}}},S=r=>r.length>=4&&r[0]===102&&r[1]===76&&r[2]===97&&r[3]===67,D=(r,t=8)=>Array.from(r.subarray(0,t)).map(e=>e.toString(16).padStart(2,"0")).join(" ");var $=new Set(["media.load","media.preload"]),j=r=>{let t={origin:null,extension:null,pathLength:0,queryKeys:[],urlLength:r.length};try{let e=new URL(r);if(e.protocol!=="https:"&&e.protocol!=="http:")return t;t.origin=e.origin,t.pathLength=e.pathname.length;let n=e.pathname.slice(e.pathname.lastIndexOf("/")+1),a=n.lastIndexOf(".");a>0&&a<n.length-1&&(t.extension=n.slice(a+1).toLowerCase()),t.queryKeys=[...e.searchParams.keys()].sort()}catch{}return t},N=(r,t=Date.now())=>{if(typeof r!="string")return null;let e;try{e=JSON.parse(r)}catch{return null}if(typeof e!="object"||e===null)return null;let n=e,a=typeof n.command=="string"?n.command:null;if(a===null||!$.has(a))return null;let s=typeof n.url=="string"?n.url:null;return{at:t,command:a,format:typeof n.streamFormat=="string"?n.streamFormat:null,encrypted:typeof n.encryptionKey=="string"&&n.encryptionKey.length>0,...s===null?{origin:null,extension:null,pathLength:0,queryKeys:[],urlLength:0}:j(s)}},U=r=>{let t=Array.from(r.subarray(0,4)).map(n=>n>=32&&n<127?String.fromCharCode(n):".").join(""),e=Array.from(r.subarray(0,16)).map(n=>n.toString(16).padStart(2,"0")).join(" ");return{magic:t,flac:t==="fLaC",hex:e}};var Y=require,R=()=>Y("electron"),b="player.message",x=128*1024,z=15e3,G=18e4,_=200*1024*1024,J=2*1024*1024,i={started:!1,events:0},l,o,W=1,w=()=>structuredClone({...i,track:o?.info}),E=(r,t)=>{let e=String(r);return t===""?e:e.split(t).join("[url]")},K=(r,t)=>{if(r!==null){let e=/\\/(\\d+)\\s*$/.exec(r);if(e!==null)return Number(e[1])}if(t!==null){let e=Number(t);if(Number.isFinite(e)&&e>0)return e}return null},X=async r=>{let t=Date.now(),e=new AbortController,n=setTimeout(()=>e.abort(),z);try{let a=await fetch(r,{headers:{Range:`bytes=0-${x-1}`},signal:e.signal}),s={contentType:a.headers.get("content-type"),contentRange:a.headers.get("content-range"),acceptRanges:a.headers.get("accept-ranges"),contentLength:a.headers.get("content-length")},c=0,d=[],g=a.body;if(g!==null){let u=g.getReader();try{for(;c<x;){let{done:p,value:h}=await u.read();if(p)break;if(h===void 0)continue;let f=h.subarray(0,x-c);d.push(f),c+=f.length}}finally{try{await u.cancel()}catch{}}}let y=new Uint8Array(c),m=0;for(let u of d)y.set(u,m),m+=u.length;i.fetch={at:Date.now(),ok:a.ok,status:a.status,...s,bytes:c,head:c===0?null:U(y),elapsedMs:Date.now()-t}}catch(a){i.fetch={at:Date.now(),ok:!1,status:null,contentType:null,contentRange:null,acceptRanges:null,contentLength:null,bytes:0,head:null,elapsedMs:Date.now()-t,error:E(a,r)}}finally{clearTimeout(n)}},Q=async(r,t)=>{let e=Date.now(),n=new AbortController,a=setTimeout(()=>n.abort(),G);try{let s=r.key===""?void 0:M(r.key),c=s===void 0?void 0:T(s.key,s.nonce),d=await fetch(r.url,{headers:{Range:"bytes=0-"},signal:n.signal});if(!d.ok)throw new Error(`HTTP ${d.status}`);t.total=K(d.headers.get("content-range"),d.headers.get("content-length"));let g=[],y=0,m=d.body;if(m===null)throw new Error("empty response body");let u=m.getReader();try{for(;;){let{done:f,value:k}=await u.read();if(f)break;if(k===void 0)continue;let A=c===void 0?k:c.update(k);if(g.push(A),y+=A.length,t.bytes=y,y>_)throw new Error(`track exceeds ${_} bytes`)}}finally{try{await u.cancel()}catch{}}let p=new Uint8Array(y),h=0;for(let f of g)p.set(f,h),h+=f.length;if(t.flac=S(p),!t.flac)throw new Error(`decrypted stream is not FLAC (head ${D(p)})`);if(t.bytes=p.length,t.total=t.total??p.length,t.state="ready",t.elapsedMs=Date.now()-e,o===void 0||o.info.id!==t.id)return;o.data=p}catch(s){t.state="error",t.error=E(s,r.url),t.elapsedMs=Date.now()-e}finally{clearTimeout(a)}},P=(r,t)=>{if(typeof t!="string")return;let e;try{e=JSON.parse(t)}catch{return}if(e.command==="media.volume"){typeof e.volume=="number"&&e.volume>0&&(i.volume=Math.min(1,e.volume/100));return}let n=N(t);if(n===null||(i.events+=1,n.command==="media.load"?i.load=n:i.preload=n,n.command!=="media.load"))return;let a=typeof e.url=="string"?e.url:"",s=typeof e.encryptionKey=="string"?e.encryptionKey:"",c=typeof e.streamFormat=="string"?e.streamFormat:null;/^https?:\\/\\//i.test(a)&&(l={url:a,key:s,format:c},X(a))},V=async()=>{if(i.started)return w();try{let r=globalThis.luna??{},t=r.__playbackKitNativeProbe,e=R().ipcMain;t!==void 0&&e.removeListener(b,t),e.on(b,P),r.__playbackKitNativeProbe=P,i.started=!0,delete i.error}catch(r){i.error=String(r)}return w()},Z=async()=>{let r=globalThis.luna??{},t=r.__playbackKitNativeProbe;if(i.started||t!==void 0){try{let e=R().ipcMain;t!==void 0?e.removeListener(b,t):e.removeListener(b,P)}catch(e){i.error=String(e)}delete r.__playbackKitNativeProbe,i.started=!1}return l=void 0,o=void 0,w()},ee=async()=>w(),te=async()=>l!==void 0,re=async()=>{if(l===void 0)return;if(o!==void 0&&o.url===l.url&&o.key===l.key&&o.info.state!=="released"&&o.info.state!=="error")return o.info;o!==void 0&&(o.data=void 0);let r={id:W++,state:"downloading",format:l.format,encrypted:l.key!=="",bytes:0,total:K(i.fetch?.contentRange??null,i.fetch?.contentLength??null),flac:!1,elapsedMs:0};return o={info:r,url:l.url,key:l.key},Q(l,r),r},ne=async(r,t,e)=>{if(o===void 0||o.info.id!==r)throw new Error("unknown track");if(o.data===void 0)throw new Error(`track is ${o.info.state}`);let n=Math.max(0,Math.floor(t)),a=Math.max(0,Math.min(Math.floor(e),J)),s=Math.min(o.data.length,n+a);return o.data.slice(n,s)},ae=async r=>{o===void 0||o.info.id!==r||(o.data=void 0,o.info.state==="ready"&&(o.info.state="released"))};0&&(module.exports={canPrepare,prepareLastLoad,readProbe,readTrack,releaseTrack,startProbe,stopProbe});\n');if(Be===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/nativeProbe.native.ts");var Hr=(...e)=>__ipcRenderer.invoke(Be,"prepareLastLoad",...e),gt=(...e)=>__ipcRenderer.invoke(Be,"readProbe",...e),Or=(...e)=>__ipcRenderer.invoke(Be,"readTrack",...e),qr=(...e)=>__ipcRenderer.invoke(Be,"releaseTrack",...e),$r=(...e)=>__ipcRenderer.invoke(Be,"startProbe",...e),xn=(...e)=>__ipcRenderer.invoke(Be,"stopProbe",...e);var Fr=`
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
`;var zr="playback-kit-pitch",me,J={status:"idle",semitones:0,attached:0},wn=()=>({...J}),Ai=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Ni=async e=>(await dn(Fr,zr),me===void 0&&(me=new AudioWorkletNode(e,zr,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]}),await pn(me,0),m("info","pitch node inserted into audio engine")),me),Ii=async(e,t)=>{let n=await U();if(n.state!=="running"){J={status:"waiting",reason:"audio context suspended (interact with the page)",semitones:e,context:n.state,attached:J.attached};return}let r=Ai(t);if(r===void 0){J={status:"waiting",reason:"no playing media element",semitones:e,context:n.state,attached:J.attached};return}await _e(r);let i=(await Ni(n)).parameters.get("ratio");i!==void 0&&(i.value=Wn(e)),J={status:"running",semitones:e,context:n.state,attached:_().sources}},Bt=async(e,t)=>{if(e===0){if(me!==void 0){let n=me.parameters.get("ratio");n!==void 0&&(n.value=1)}J={...J,status:me===void 0?"idle":"ready",semitones:0,reason:void 0};return}try{await Ii(e,t)}catch(n){let r=n instanceof Error?n.message:String(n);J={status:"unavailable",reason:r,semitones:e,attached:J.attached},m("error","pitch engine unavailable",{error:r})}},Kr=()=>{if(me!==void 0){let e=me.parameters.get("ratio");e!==void 0&&(e.value=1)}J={...J,status:me===void 0?"idle":"ready",semitones:0,reason:void 0}};var Ht="unknown",kn=new Set,ke=()=>Ht,Pn=e=>{if(e!==Ht){m("info","player kind changed",{from:Ht,to:e}),Ht=e;for(let t of[...kn])try{t(e)}catch(n){m("error","player kind listener failed",{error:String(n)})}}},Gr=e=>(kn.add(e),()=>kn.delete(e));var Ri=(e,t)=>{let n=new Set(e.get().map(a=>a.name));if(!n.has(t))return t;let r=2;for(;n.has(`${t} ${r}`);)r+=1;return`${t} ${r}`},Ur=(e,t,n)=>{let r=e.get(),a={speed:r.speed,pitchShifts:r.pitchShifts,pitchSemitones:r.pitchSemitones,effects:r.effects};if(n.builtin===!0){let i=t.save(Ri(t,`${n.name} (edited)`),a);return i!==void 0&&e.applyPreset(i),i}return t.update(n.id,a),n},ht=(e,t)=>{let n=e.get();n.builtinPresets||n.presetId===null||t.getById(n.presetId)?.builtin===!0&&e.clearPreset()};var _i=250,Bi=800,Hi=1024*1024,Oi=.4,qi=420*1024*1024,oe,Ot,En=!1,Yr=!1,Ye=null,He="idle",Vr=null,V=null,Ce=null,Xr=0,$t=0,De=!1,Oe=!1,jr=0,Ft,qt=null,Mn=1,Wr=()=>{if(Ce===null||!De)return $t;let e=Ce.context;return Math.max(0,e.currentTime-Xr+$t)},qe=()=>{if(Ce===null)return;let e=Ce;Ce=null,De=!1;try{e.stop()}catch{}un(e)},bt=e=>{oe!==void 0&&(e&&!Oe?(oe.setNativeVolume(0),Oe=!0):!e&&Oe&&(oe.setNativeVolume(Mn),Oe=!1))},Qr=async e=>{if(V===null)return;let t=await U();if(t.state!=="running")throw new Error(`audio context is ${t.state}`);let n=V.duration;if(!Number.isFinite(n)||n<=0)return;let r=Math.min(Math.max(0,e),Math.max(0,n-.02));qe();let a=t.createBufferSource();a.buffer=V,a.onended=()=>{Ce===a&&(De=!1)},await cn(a),Ce=a;let i=oe?.getNativePosition()??null,l=i===null?r:Math.max(0,Math.min(i+.02,Math.max(0,n-.02)));$t=l,Xr=t.currentTime,De=!0,a.start(0,l),m("info","shadow source started",{offset:Number(r.toFixed(3))})},$i=async(e,t)=>{let n=[],r=0;for(;r<t;){let l=await Or(e,r,Math.min(Hi,t-r));if(!(l instanceof Uint8Array)||l.length===0)throw new Error("native bridge returned an empty chunk");n.push(l),r+=l.length}let a=new Uint8Array(r),i=0;for(let l of n)a.set(l,i),i+=l.length;return a},Fi=async(e,t)=>{let n=await $i(e,t);await qr(e);let r=await U(),a=new ArrayBuffer(n.byteLength);new Uint8Array(a).set(n);let i=await r.decodeAudioData(a),l=i.length*i.numberOfChannels*4;if(l>qi)throw new Error(`decoded track is too large (${Math.round(l/1024/1024)} MB)`);V=i,He="ready",m("info","shadow track decoded",{seconds:Number(i.duration.toFixed(2)),channels:i.numberOfChannels})},Tn=e=>{Ft=String(e),He="failed",qt=Ye,qe(),V=null,bt(!1),m("error","shadow player failed",{error:Ft})},zi=e=>e.nativeEffects&&(Ge(e.effects)||e.pitchSemitones!==0),Ki=async()=>{if(oe===void 0)return;let e=oe.getSettings();if(!(Yr&&ke()==="native"&&zi(e))){(Ce!==null||V!==null||Oe)&&(qe(),V=null,He="idle",bt(!1)),Ye=null,qt=null;return}let n=Date.now();if(n-jr>=Bi){jr=n;let i=await gt();typeof i.volume=="number"&&i.volume>0&&(Mn=i.volume);let l=i.load;if(l===void 0)return;if(Ye!==l.at){Ye=l.at,qt=null,Ft=void 0,V=null,He="preparing",qe(),Vr=(await Hr())?.id??null;return}if(He==="preparing"){if(i.track!==void 0&&i.track.state==="error"){Tn(i.track.error??"native stream could not be prepared");return}if(i.track!==void 0&&i.track.state==="ready"&&i.track.id===Vr)try{await Fi(i.track.id,i.track.bytes)}catch(c){Tn(c);return}}}if(He==="failed"&&Ye===qt||V===null)return;Oe&&oe.setNativeVolume(0);let r=oe.getNativePosition();if(r===null)return;if(!oe.isPlaying()){De&&qe(),$t=r,bt(!1);return}if(r>=V.duration-.05){De&&qe();return}if(bt(!0),!De){await Qr(r+.05);return}Math.abs(Wr()-r)>Oi&&(m("info","shadow resync",{ours:Number(Wr().toFixed(3)),native:Number(r.toFixed(3))}),await Qr(r+.05))},Jr=()=>{En||(En=!0,Ki().catch(e=>{m("error","shadow tick failed",{error:String(e)}),Tn(e)}).finally(()=>{En=!1}))},Ln=e=>{Yr=e.nativeEffects},Cn=()=>({state:He,bufferSeconds:V===null?null:Number(V.duration.toFixed(2)),playing:De,muted:Oe,loadAt:Ye,error:Ft}),Zr=(e,t)=>{oe=t,Mn=t.getInitialVolume?.()??1,Ot=setInterval(Jr,_i),Jr(),e.add(()=>{Ot!==void 0&&clearInterval(Ot),Ot=void 0,qe(),V=null,bt(!1),oe=void 0})};var Gi=e=>Math.abs(e-1)>.001,Dn=e=>{if(!Gi(e.getSpeed())||!e.isPlaying())return!1;let t=e.getPosition();return t===null||!Number.isFinite(t)||t<0?!1:(e.dispatchTimeUpdate(t),!0)},ea=(e,t=100)=>{let n=setInterval(()=>Dn(e),t);return()=>clearInterval(n)};var u=ze(Nn(),1),h=ze(ta(),1);var na=e=>({id:e.id,paused:e.paused,readyState:e.readyState,currentTime:Number(e.currentTime.toFixed(2)),playbackRate:e.playbackRate}),ra=async(e=1200)=>{let t=Date.now(),n=_(),r=ie(),a=r.find(b=>!b.paused&&b.readyState>0)??r[0];if(a===void 0){let b={at:t,ok:!1,reason:"no media element",context:n.context,engine:n};return m("warn","audio self-test: no media element"),b}let i=a.currentTime;try{await _e(a)}catch(b){let I={at:t,ok:!1,reason:b instanceof Error?b.message:String(b),context:_().context,element:na(a),engine:_()};return m("warn","audio self-test failed to attach",I),I}let l=await U(),c=0,s=0,d=!0;try{let b=await fn(e);c=b.rms,s=b.peak,d=b.silent}catch(b){m("error","audio self-test measurement failed",{error:String(b)})}let g=Number((a.currentTime-i).toFixed(2)),w=l.state!=="running"?`audio context ${l.state}`:a.paused?"playback is paused":d&&g>.2?"captured audio is silent (DRM-protected or already routed elsewhere)":d?"no audio measured":void 0,k={at:t,ok:w===void 0,reason:w,context:l.state,element:na(a),progressionSeconds:g,rms:Number(c.toFixed(5)),peak:Number(s.toFixed(5)),silent:d,engine:_()};return m(k.ok?"info":"warn","audio self-test",k),k};var j=ze(Nn(),1);var Ui=132,aa=ee-Se,Rn=e=>Math.max(Se,Math.min(ee,e)),ia=e=>`${e>0?"+":""}${e}`,oa=e=>e>=1e3?`${e/1e3}k`:String(e),Vi=({frequency:e,value:t,disabled:n,onChange:r})=>{let a=j.default.useRef(null),[i,l]=j.default.useState(null),c=b=>{let I=a.current;if(I===null)return;let C=I.getBoundingClientRect(),L=Math.max(0,Math.min(1,(b-C.top)/C.height));l(L*100),r(Rn(Math.round(ee-L*aa)))},s=i??(ee-t)/aa*100,d=50,g=Math.min(s,d),w=Math.abs(s-d),k=i===null;return j.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:30,opacity:n?.4:1}},j.default.createElement("span",{style:{fontSize:10,fontVariantNumeric:"tabular-nums",color:"currentColor",opacity:.8}},ia(t)),j.default.createElement("div",{ref:a,role:"slider",tabIndex:n?-1:0,"aria-label":`${oa(e)} Hz`,"aria-valuemin":Se,"aria-valuemax":ee,"aria-valuenow":t,"aria-valuetext":`${ia(t)} dB`,"aria-disabled":n,onPointerDown:b=>{n||(b.preventDefault(),b.currentTarget.setPointerCapture(b.pointerId),c(b.clientY))},onPointerMove:b=>{n||!b.currentTarget.hasPointerCapture(b.pointerId)||c(b.clientY)},onPointerUp:b=>{b.currentTarget.hasPointerCapture(b.pointerId)&&b.currentTarget.releasePointerCapture(b.pointerId),l(null)},onPointerCancel:b=>{b.currentTarget.hasPointerCapture(b.pointerId)&&b.currentTarget.releasePointerCapture(b.pointerId),l(null)},onDoubleClick:()=>{n||r(0)},onKeyDown:b=>{if(n)return;let I=b.shiftKey?3:1;if(b.key==="ArrowUp"||b.key==="ArrowRight")r(Rn(t+I));else if(b.key==="ArrowDown"||b.key==="ArrowLeft")r(Rn(t-I));else if(b.key==="Home")r(Se);else if(b.key==="End")r(ee);else return;b.preventDefault()},style:{position:"relative",width:18,height:Ui,cursor:n?"default":"pointer",touchAction:"none",outline:"none"}},j.default.createElement("div",{style:{position:"absolute",left:"50%",top:0,bottom:0,width:5,transform:"translateX(-50%)",borderRadius:999,background:"color-mix(in srgb, currentColor 16%, transparent)"}}),j.default.createElement("div",{style:{position:"absolute",left:0,right:0,top:`${d}%`,height:1,background:"color-mix(in srgb, currentColor 28%, transparent)"}}),j.default.createElement("div",{style:{position:"absolute",left:"50%",width:5,transform:"translateX(-50%)",borderRadius:999,top:`${g}%`,height:`${w}%`,background:"var(--wave-color-solid-accent-fill, currentColor)",transition:k?"top 120ms ease, height 120ms ease":"none"}}),j.default.createElement("div",{style:{position:"absolute",left:"50%",top:`${s}%`,width:12,height:12,transform:"translate(-50%, -50%)",borderRadius:"50%",background:"currentColor",boxShadow:"0 0 0 3px color-mix(in srgb, var(--wave-color-solid-accent-fill, currentColor) 22%, transparent), 0 1px 3px rgba(0,0,0,.5)",transition:k?"top 120ms ease":"none"}})),j.default.createElement("span",{style:{fontSize:9,opacity:.6,letterSpacing:"-0.02em"}},oa(e)))},sa=({eq:e,disabled:t,onChange:n})=>j.default.createElement("div",{style:{display:"flex",gap:8,alignItems:"flex-end",marginLeft:"auto",padding:"2px 0"}},Ke.map((r,a)=>j.default.createElement(Vi,{key:r,frequency:r,value:e.bands[a]??0,disabled:t,onChange:i=>{let l=[...e.bands];l[a]=i,n(l)}})));var _n=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)&&t>0?t:void 0},$=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)?t:void 0},ji=e=>{let t=e.pitchShifts?"pitch follows speed":e.pitchSemitones===0?"pitch preserved":`pitch ${it(e.pitchSemitones)} st`;return`${ne(e.speed)}\xD7 \xB7 ${t} \xB7 ${xt(e.effects)}`},$e={display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:6,marginLeft:"auto"},Xe=({children:e})=>u.default.createElement("div",{style:{marginBottom:16}},e),Wi=()=>{let[e,t]=u.default.useState(v.get),[n,r]=u.default.useState(M.get),[a,i]=u.default.useState("Copy diagnostics"),[l,c]=u.default.useState("Resolving\u2026"),[s,d]=u.default.useState(""),[g,w]=u.default.useState(null),[k,b]=u.default.useState(!1),[I,C]=u.default.useState("Attaches the playing element, measures captured RMS and reports blocked/silent reasons. May silence playback if capture fails; restart TIDAL to undo.");u.default.useEffect(()=>v.subscribe(t),[]),u.default.useEffect(()=>M.subscribe(()=>r(M.get())),[]),u.default.useEffect(()=>{Pt().then(c).catch(()=>c("unavailable"))},[]),u.default.useEffect(()=>{if(a==="Copy diagnostics")return;let o=setTimeout(()=>i("Copy diagnostics"),1800);return()=>clearTimeout(o)},[a]),u.default.useEffect(()=>{if(s==="")return;let o=setTimeout(()=>d(""),4e3);return()=>clearTimeout(o)},[s]);let{bounds:L,pitchShifts:Pe,developerMode:Y,effects:S,builtinPresets:le,nativeEffects:Ee}=e,R=le?n:n.filter(o=>o.builtin!==!0),ge=R.findIndex(o=>o.builtin!==!0),F=o=>v.setEffects({...S,eq:{...S.eq,...o}}),z=o=>v.setEffects({...S,bass:{...S.bass,...o}}),K=o=>v.setEffects({...S,eightD:{...S.eightD,...o}}),D=o=>v.setEffects({...S,delay:{...S.delay,...o}}),B=o=>v.setEffects({...S,reverb:{...S.reverb,...o}}),de=async o=>{let p=kt(o);return p===void 0?!1:(v.replace(p.settings),M.replace(p.presets),ht(v,M),await je(pt(p.settings,p.presets)),!0)},ce=async()=>{try{let o=await ar();if(o===null)return d("Import cancelled");let p=await de(o.json);d(p?`Imported ${o.path}`:"Import failed: invalid config")}catch(o){d(`Import failed: ${String(o)}`)}},Te=async()=>{try{let o=await rr(pt(v.get(),M.get()));d(o===null?"Export cancelled":`Exported ${o}`)}catch(o){d(`Export failed: ${String(o)}`)}},he=async()=>{try{let o=await Et();if(o===null)return d("Config file not found");let p=await de(o);d(p?"Reloaded from config file":"Reload failed: invalid config")}catch(o){d(`Reload failed: ${String(o)}`)}},H=o=>{window.confirm(`Overwrite "${o.name}" with the current speed, pitch and effects?`)&&(M.update(o.id,{speed:e.speed,pitchShifts:e.pitchShifts,pitchSemitones:e.pitchSemitones,effects:e.effects}),d(`Updated "${o.name}"`))},ue=o=>{window.confirm(`Delete preset "${o.name}"?`)&&(M.remove(o.id),d(`Deleted "${o.name}"`))};return u.default.createElement("div",{style:{paddingBottom:8}},u.default.createElement(Xe,null,u.default.createElement(h.LunaSettings,{title:"Playback",desc:"Speed and pitch. Effects live in their own section below."},u.default.createElement(h.LunaTextSetting,{title:"Minimum speed",desc:"Below 0.0625\xD7 Chromium plays at its floor.",defaultValue:ne(L.min),inputProps:{inputMode:"decimal"},onChange:o=>{let p=_n(o.target.value);p!==void 0&&v.setBounds({min:p})}}),u.default.createElement(h.LunaTextSetting,{title:"Maximum speed",defaultValue:ne(L.max),inputProps:{inputMode:"decimal"},onChange:o=>{let p=_n(o.target.value);p!==void 0&&v.setBounds({max:p})}}),u.default.createElement(h.LunaTextSetting,{title:"Snap step",desc:"Slider snapping and the \u2212 / + step size.",defaultValue:ne(L.step),inputProps:{inputMode:"decimal"},onChange:o=>{let p=_n(o.target.value);p!==void 0&&v.setBounds({step:p})}}),u.default.createElement(h.LunaSwitchSetting,{title:"Pitch follows speed",desc:"Chipmunk / slow-mo. Clears any custom pitch shift.",checked:Pe,onChange:o=>v.setPitchShifts(o.target.checked)}),u.default.createElement(h.LunaSetting,{title:"Reset",desc:"Back to 1.00\xD7, pitch shift off, all effects off."},u.default.createElement("div",{style:$e},u.default.createElement(h.LunaButton,{size:"small",variant:"outlined",onClick:()=>v.reset()},"Reset playback"))))),u.default.createElement(Xe,null,u.default.createElement(h.LunaSettings,{title:"Presets",desc:"Capture speed, pitch and effects. Built-ins are fixed; custom presets can be applied, renamed, updated, reordered and deleted."},u.default.createElement(h.LunaSwitchSetting,{title:"Built-in presets",desc:"Show the built-in presets.",checked:le,onChange:o=>{let p=o.target.checked;v.setBuiltinPresets(p),ht(v,M)}}),R.map((o,p)=>{let be=e.presetId===o.id&&!ut(o,e);return u.default.createElement(h.LunaSetting,{key:o.id,title:`${o.name}${be?" *":""}`,desc:ji(o)},u.default.createElement("div",{style:$e},e.presetId===o.id?u.default.createElement("span",{style:{fontSize:12,opacity:.7}},"Active"):u.default.createElement(h.LunaButton,{size:"small",onClick:()=>v.applyPreset(o)},"Use"),o.builtin===!0?u.default.createElement("span",{style:{fontSize:12,opacity:.6}},"Built-in"):u.default.createElement(u.default.Fragment,null,u.default.createElement(h.LunaButton,{size:"small",variant:"outlined",onClick:()=>w({id:o.id,name:o.name,value:o.name})},"Rename"),u.default.createElement(h.LunaButton,{size:"small",variant:"outlined",onClick:()=>H(o)},"Update"),u.default.createElement(h.LunaButton,{size:"small",variant:"text",disabled:p<=ge,title:"Move up",onClick:()=>M.move(o.id,-1)},"\u2191"),u.default.createElement(h.LunaButton,{size:"small",variant:"text",disabled:p>=R.length-1,title:"Move down",onClick:()=>M.move(o.id,1)},"\u2193"),u.default.createElement(h.LunaButton,{size:"small",variant:"text",color:"error",onClick:()=>ue(o)},"Delete"))))}),g!==null&&u.default.createElement(u.default.Fragment,null,u.default.createElement(h.LunaTextSetting,{title:`Rename ${g.name}`,defaultValue:g.value,onChange:o=>w({...g,value:o.target.value})}),u.default.createElement(h.LunaSetting,{title:" "},u.default.createElement("div",{style:$e},u.default.createElement(h.LunaButton,{size:"small",onClick:()=>{M.rename(g.id,g.value),w(null)}},"Save"),u.default.createElement(h.LunaButton,{size:"small",variant:"text",onClick:()=>w(null)},"Cancel")))))),u.default.createElement(Xe,null,u.default.createElement(h.LunaSettings,{title:"Native player",desc:"TIDAL's lossless player runs in a separate process. This plays the same stream through the effects chain."},u.default.createElement(h.LunaSwitchSetting,{title:"Effects on native lossless",desc:"Experimental. Downloads the track a second time (prefetched where possible) and mutes TIDAL's own playback. Needs the electron trust prompt; speed stays disabled on native.",checked:Ee,onChange:o=>v.setNativeEffects(o.target.checked)}))),u.default.createElement(Xe,null,u.default.createElement(h.LunaSettings,{title:"Effects",desc:"Same Web Audio chain as pitch. Needs audio capture \u2014 use the dev-mode self-test if nothing changes."},u.default.createElement(h.LunaSwitchSetting,{title:"Equalizer",desc:"8 bands, 62 Hz to 8 kHz, \xB112 dB. Drag a band; double-click resets it.",checked:S.eq.enabled,onChange:o=>F({enabled:o.target.checked})}),u.default.createElement(h.LunaSetting,{title:"Bands",desc:"Shift+arrow for 3 dB steps."},u.default.createElement(sa,{eq:S.eq,disabled:!S.eq.enabled,onChange:o=>F({bands:o})})),u.default.createElement(h.LunaSetting,{title:"Flatten",desc:"Set every band to 0 dB."},u.default.createElement("div",{style:$e},u.default.createElement(h.LunaButton,{size:"small",variant:"outlined",disabled:!S.eq.enabled,onClick:()=>F({bands:Array.from({length:at},()=>0)})},"Flatten EQ"))),u.default.createElement(h.LunaSwitchSetting,{title:"Bass boost",desc:"Parallel low-shelf sub boost with saturation for dirty kicks. Added on top of the dry signal.",checked:S.bass.enabled,onChange:o=>z({enabled:o.target.checked})}),u.default.createElement(h.LunaTextSetting,{title:"Bass boost (dB)",desc:"Low shelf at 90 Hz, 0\u201324 dB.",defaultValue:String(Math.round(S.bass.boost)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=$(o.target.value);p!==void 0&&z({boost:Math.max(0,Math.min(24,p))})}}),u.default.createElement(h.LunaTextSetting,{title:"Sub (dB)",desc:"Extra shelf at 45 Hz, 0\u201312 dB.",defaultValue:String(Math.round(S.bass.sub)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=$(o.target.value);p!==void 0&&z({sub:Math.max(0,Math.min(12,p))})}}),u.default.createElement(h.LunaTextSetting,{title:"Drive (%)",desc:"Saturation on the bass path; more harmonics, dirtier kicks.",defaultValue:String(Math.round(S.bass.drive*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=$(o.target.value);p!==void 0&&z({drive:Math.max(0,Math.min(100,p))/100})}}),u.default.createElement(h.LunaTextSetting,{title:"Bass amount (%)",desc:"How much of the boosted bass is added back.",defaultValue:String(Math.round(S.bass.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=$(o.target.value);p!==void 0&&z({mix:Math.max(0,Math.min(100,p))/100})}}),u.default.createElement(h.LunaSwitchSetting,{title:"8D audio",desc:"LFO panning plus a constant pitch wobble, so the mix moves around your head.",checked:S.eightD.enabled,onChange:o=>K({enabled:o.target.checked})}),u.default.createElement(h.LunaTextSetting,{title:"8D pan rate (Hz)",desc:"How fast the sound travels left/right.",defaultValue:String(S.eightD.rate),inputProps:{inputMode:"decimal"},onChange:o=>{let p=$(o.target.value);p!==void 0&&K({rate:Math.max(.02,Math.min(2,p))})}}),u.default.createElement(h.LunaTextSetting,{title:"8D pan depth (%)",defaultValue:String(Math.round(S.eightD.panDepth*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=$(o.target.value);p!==void 0&&K({panDepth:Math.max(0,Math.min(100,p))/100})}}),u.default.createElement(h.LunaTextSetting,{title:"8D pitch rate (Hz)",desc:"Speed of the constant pitch wobble.",defaultValue:String(S.eightD.pitchRate),inputProps:{inputMode:"decimal"},onChange:o=>{let p=$(o.target.value);p!==void 0&&K({pitchRate:Math.max(.02,Math.min(2,p))})}}),u.default.createElement(h.LunaTextSetting,{title:"8D pitch depth (ms)",desc:"Delay modulation depth; higher = wider pitch smear.",defaultValue:String(S.eightD.pitchDepth),inputProps:{inputMode:"decimal"},onChange:o=>{let p=$(o.target.value);p!==void 0&&K({pitchDepth:Math.max(0,Math.min(12,p))})}}),u.default.createElement(h.LunaTextSetting,{title:"8D mix (%)",desc:"Dry/wet amount; higher is more immersive.",defaultValue:String(Math.round(S.eightD.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=$(o.target.value);p!==void 0&&K({mix:Math.max(0,Math.min(100,p))/100})}}),u.default.createElement(h.LunaSwitchSetting,{title:"Delay",desc:"Feedback delay.",checked:S.delay.enabled,onChange:o=>D({enabled:o.target.checked})}),u.default.createElement(h.LunaTextSetting,{title:"Delay time (ms)",defaultValue:String(Math.round(S.delay.timeMs)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=$(o.target.value);p!==void 0&&D({timeMs:Math.max(20,Math.min(2e3,p))})}}),u.default.createElement(h.LunaTextSetting,{title:"Delay feedback (%)",defaultValue:String(Math.round(S.delay.feedback*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=$(o.target.value);p!==void 0&&D({feedback:Math.max(0,Math.min(90,p))/100})}}),u.default.createElement(h.LunaTextSetting,{title:"Delay mix (%)",defaultValue:String(Math.round(S.delay.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=$(o.target.value);p!==void 0&&D({mix:Math.max(0,Math.min(100,p))/100})}}),u.default.createElement(h.LunaSwitchSetting,{title:"Reverb",desc:"Generated impulse response.",checked:S.reverb.enabled,onChange:o=>B({enabled:o.target.checked})}),u.default.createElement(h.LunaTextSetting,{title:"Reverb decay (s)",defaultValue:String(S.reverb.decay),inputProps:{inputMode:"decimal"},onChange:o=>{let p=$(o.target.value);p!==void 0&&B({decay:Math.max(.2,Math.min(8,p))})}}),u.default.createElement(h.LunaTextSetting,{title:"Reverb mix (%)",defaultValue:String(Math.round(S.reverb.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let p=$(o.target.value);p!==void 0&&B({mix:Math.max(0,Math.min(100,p))/100})}}))),u.default.createElement(Xe,null,u.default.createElement(h.LunaSettings,{title:"Config file",desc:"Versioned JSON, editable outside Luna. Autosaves 300 ms after changes."},u.default.createElement(h.LunaSetting,{title:"Path",desc:l},u.default.createElement("div",{style:$e},u.default.createElement(h.LunaButton,{size:"small",variant:"text",onClick:()=>{on(l)}},"Copy path"))),u.default.createElement(h.LunaSetting,{title:"Actions",desc:s===""?void 0:s},u.default.createElement("div",{style:$e},u.default.createElement(h.LunaButton,{size:"small",variant:"outlined",onClick:()=>{ir()}},"Show folder"),u.default.createElement(h.LunaButton,{size:"small",variant:"outlined",onClick:()=>{he()}},"Reload"),u.default.createElement(h.LunaButton,{size:"small",variant:"outlined",onClick:()=>{ce()}},"Import\u2026"),u.default.createElement(h.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Te()}},"Export\u2026"))))),u.default.createElement(Xe,null,u.default.createElement(h.LunaSettings,{title:"Developer",desc:"Logs and test tools are off unless you need to report a bug."},u.default.createElement(h.LunaSwitchSetting,{title:"Developer mode",desc:"Write diagnostics logs and show the Copy diagnostics action.",checked:Y,onChange:o=>v.setDeveloperMode(o.target.checked)}),Y&&u.default.createElement(h.LunaSetting,{title:"Audio engine self-test",desc:I},u.default.createElement("div",{style:$e},u.default.createElement(h.LunaButton,{size:"small",variant:"outlined",disabled:k,onClick:async()=>{b(!0);try{let o=await ra();C(o.ok?`OK \xB7 ${o.context} \xB7 rms ${o.rms} \xB7 peak ${o.peak} \xB7 \u0394${o.progressionSeconds}s`:`Failed \xB7 ${o.reason??"unknown"} \xB7 context ${o.context}`)}finally{b(!1)}}},k?"Testing\u2026":"Run test"))),Y&&u.default.createElement(h.LunaButtonSetting,{title:"Diagnostics",desc:"Copy player, pitch-engine, effects, theme and media state plus recent logs.",children:a,onClick:async()=>{i("Copying\u2026");let o=await Qe(v.get());i(o?"Copied":"Copy failed")}}))))};var yt=new Set,{trace:la}=(0,Ae.Tracer)("[PlaybackKit]"),Qi=1e3,Ji=1500,Hn="tidaluna.playback-speed.previous-quality",ma=()=>{try{return localStorage.getItem(Hn)}catch{return null}},Yi=e=>{try{localStorage.setItem(Hn,e)}catch{}},ga=()=>{try{localStorage.removeItem(Hn)}catch{}},ha=e=>{let t={to:e},n=se.redux.actions["settings/SET_STREAMING_QUALITY"];typeof n=="function"?n(t):se.redux.store.dispatch({type:"settings/SET_STREAMING_QUALITY",payload:t})},da=()=>{let t=(0,Ae.findModuleByProperty)((n,r)=>n==="activePlayer"&&typeof r=="object"&&r!==null)?.activePlayer;if(t===void 0)return{found:!1};try{let n=Object.getPrototypeOf(t),r=n===null?[]:Object.getOwnPropertyNames(n).filter(i=>{try{return typeof t[i]=="function"}catch{return!1}}).slice(0,60),a=i=>{try{return t[i]}catch{return}};return{found:!0,name:a("name"),constructor:t.constructor?.name,state:a("playbackState")??a("state"),currentTime:a("currentTime"),methods:r,hasSetPlaybackRate:r.includes("setPlaybackRate"),hasMediaElement:!!(a("mediaElement")??a("video")??a("element"))}}catch(n){return{found:!0,error:String(n)}}},ca=()=>{let t=(0,Ae.findModuleByProperty)((n,r)=>n==="activePlayer"&&typeof r=="object"&&r!==null)?.activePlayer?.name;return t==="nativePlayer"?"native":t==="shakaPlayer"?"shaka":t==="browserPlayer"?"browser":"unknown"},ua,Xi=()=>(ua??=(0,Ae.findModuleByProperty)((e,t)=>e==="activePlayer"&&typeof t=="object"&&t!==null),ua?.activePlayer),Bn=()=>{if(ke()==="native"){let n=Xi()?.currentTime;return typeof n=="number"&&Number.isFinite(n)?n:null}let e=ie(),t=e.find(n=>!n.paused&&n.readyState>0)??e.find(n=>n.readyState>0);return t===void 0?null:t.currentTime},ba=()=>{try{return se.redux.store.getState().playbackControls?.playbackState==="PLAYING"}catch{return!1}},Zi=e=>{let t=se.redux.actions["playbackControls/TIME_UPDATE"];typeof t=="function"?t(e):se.redux.store.dispatch({type:"playbackControls/TIME_UPDATE",payload:e})},eo=()=>{try{let e=se.redux.store.getState().playbackControls;if(e===void 0)return null;let t=e.latestCurrentTime??0;return e.playbackState!=="PLAYING"?t:t+Math.abs(Date.now()-(e.latestCurrentTimeSyncTimestamp??Date.now()))/1e3}catch{return null}},pa={getSpeed:()=>v.get().speed,isPlaying:ba,getPosition:Bn,dispatchTimeUpdate:Zi},to=()=>{try{let e=se.redux.store.getState(),t=e.playQueue?.elements?.[e.playQueue.currentIndex??-1]?.mediaItemId,n=t===void 0?void 0:e.content?.mediaItems?.[String(t)];return{setting:e.settings?.quality?.streaming??null,track:n?.audioQuality??null,actual:e.playbackControls?.playbackContext?.actualAudioQuality??null,streamType:e.playbackControls?.playbackContext?.actualStreamType??null,codec:e.playbackControls?.playbackContext?.codec??null,sampleRate:e.playbackControls?.playbackContext?.sampleRate??null,bitDepth:e.playbackControls?.playbackContext?.bitDepth??null}}catch(e){return{error:String(e)}}},no=()=>{try{let e=se.redux.store.getState(),t=e.playQueue,n=t?.elements?.[t.currentIndex??-1]?.mediaItemId;if(n===void 0)return null;let r=e.content?.mediaItems?.[String(n)];return r===void 0?{id:n,found:!1}:{id:n,found:!0,title:r.title,bpm:r.bpm??null,key:r.key??r.keyScale??null,metadataKeys:Object.keys(r).filter(a=>/bpm|key|tempo|tone/i.test(a))}}catch(e){return{error:String(e)}}},ya=!1,Ze,On=()=>pt(v.get(),M.get()),fa=()=>{ya&&(Ze!==void 0&&clearTimeout(Ze),Ze=setTimeout(()=>{Ze=void 0,je(On()).catch(e=>m("error","config save failed",{error:String(e)}))},300))},ro=async()=>{try{let e=await Et(),t=e===null?void 0:kt(e),n=await Pt();t!==void 0?(v.replace(t.settings),M.replace(t.presets),ht(v,M),m("info","config loaded",{path:n,speed:t.settings.speed,presets:t.presets.length})):(await je(On()),m("info",e===null?"config created":"config invalid, rewrote defaults",{path:n}))}catch(e){m("warn","config file unavailable; using browser storage only",{error:String(e)})}finally{ya=!0}},ao=()=>{try{let e=se.redux.actions["router/PUSH"];if(typeof e!="function")throw new Error("router/PUSH is unavailable");e({pathname:"/not-found",search:"LunaSettings",replace:!0}),m("info","opening Luna settings"),setTimeout(()=>{let n=[...document.querySelectorAll('[role="tab"]')].find(r=>(r.textContent??"").trim()==="Plugins");n!==void 0&&n.getAttribute("aria-selected")!=="true"&&n.click(),setTimeout(()=>{[...document.querySelectorAll("h1,h2,h3,h4,h5,h6,span,p,div")].find(i=>(i.textContent??"").trim()==="@kyoto-aircon/playback-kit")?.scrollIntoView({block:"center",behavior:"smooth"})},250)},250)}catch(e){m("error","open Luna settings failed",{error:String(e)})}},io=()=>{try{let t=se.redux.store.getState().settings?.quality?.streaming;if(t==="HIGH"){m("info","already on the browser player quality");return}m("info","switching streaming quality to HIGH",{from:t}),typeof t=="string"&&Yi(t),ha("HIGH")}catch(e){m("error","quality switch failed",{error:String(e)})}},oo=()=>{let e=ma();e!==null&&(m("info","restoring streaming quality",{to:e}),ha(e),ga())},so=e=>{let t={version:We,logs:dr,logText:rn,report:()=>an(v.get()),copy:()=>Qe(v.get()),clear:cr,setVerbose:ur,selectors:Tt,playerKind:ke,audioEngine:_,native:_t,nativeProbe:gt,shadow:Cn,store:v,controller:e};globalThis.__playbackSpeed=t,yt.add(()=>{globalThis.__playbackSpeed===t&&delete globalThis.__playbackSpeed})};try{nn(v.get().developerMode);let e,t=d=>{if(e===d)return;e=d,(d?$r():xn()).catch(w=>m("warn","native stream probe failed",{error:String(w)}))};t(v.get().developerMode||v.get().nativeEffects),hr(()=>gt()),fr(da);try{let d=Ae.LunaPlugin.getByName("@kyoto-aircon/playback-speed");d!==void 0&&m("warn","old Playback Speed plugin is still installed",{enabled:d.store?.enabled})}catch{}gr(()=>({kind:ke(),native:_t(),nativeInstance:Ir(),speed:v.get().speed,track:no(),audioEngine:_(),quality:to(),effects:Tr(),pitchSemitones:v.get().pitchSemitones,pitchEngine:wn(),presetId:v.get().presetId,uiTime:eo(),actualTime:Bn(),shadow:Cn()})),vn(),m("info","loading",{version:We,selectors:Tt(),media:ie().length,settings:v.get(),tidal:da(),native:_t()});let n=Sr();yt.add(()=>xr(n));let r=new It(ie,v);r.start(),Zr(yt,{getNativePosition:Bn,isPlaying:ba,setNativeVolume:_r,getInitialVolume:Br,getSettings:()=>v.get()}),Ln(v.get());let a=v.subscribe(d=>{nn(d.developerMode),t(d.developerMode||d.nativeEffects),Ln(d),fa(),m("info","settings changed",{speed:d.speed,pitchShifts:d.pitchShifts,bounds:d.bounds}),r.apply(),ke()==="native"&&Sn(d.speed),Dn(pa),Bt(d.pitchSemitones,ie()),hn(d.effects,ie())});M.subscribe(fa),ro(),Er(yt,v,{getPlayerKind:ke,subscribePlayerKind:Gr,useBrowserPlayer:io,previousQuality:ma,restoreQuality:oo,presets:{list:()=>M.get().filter(d=>v.get().builtinPresets||d.builtin!==!0),apply:d=>{v.applyPreset(d),m("info","preset applied",{id:d.id,name:d.name})},clear:()=>v.clearPreset(),save:(d,g)=>M.save(d,g),saveActive:d=>{let g=Ur(v,M,d);m("info","saved preset from live state",{id:g?.id,builtin:d.builtin===!0})}},getPitchEngineState:wn,openSettings:ao,enableNativeEffects:()=>v.setNativeEffects(!0),onOpen:()=>{let d=v.get().pitchSemitones;d!==0&&Bt(d,ie())}}),so(r);let l=setInterval(()=>{r.scan();let d=v.get().pitchSemitones;d!==0&&Bt(d,ie());let g=v.get().effects;Ge(g)&&hn(g,ie())},Qi),c=ea(pa);Pn(ca());let s=setInterval(()=>{vn();let d=ca(),g=ke();Pn(d),d!==g&&d==="native"&&(Sn(v.get().speed),ga())},Ji);yt.add(()=>{Ze!==void 0&&(clearTimeout(Ze),je(On()).catch(()=>{})),clearInterval(l),clearInterval(s),c(),a(),r.stop(),Kr(),Mr(),xn().catch(()=>{})}),la.log("loaded")}catch(e){m("error","failed to load",{error:String(e),stack:e?.stack}),la.err("Failed to load:",e)}export{Wi as Settings,yt as unloads};
//# sourceMappingURL=kyoto-aircon.playback-kit.mjs.map
