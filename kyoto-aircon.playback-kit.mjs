var La=Object.create;var pn=Object.defineProperty;var Ca=Object.getOwnPropertyDescriptor;var Na=Object.getOwnPropertyNames;var Aa=Object.getPrototypeOf,Da=Object.prototype.hasOwnProperty;var Xe=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var Ia=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Na(t))!Da.call(e,r)&&r!==n&&pn(e,r,{get:()=>t[r],enumerable:!(a=Ca(t,r))||a.enumerable});return e};var Le=(e,t,n)=>(n=e!=null?La(Aa(e)):{},Ia(t||!e||!e.__esModule?pn(n,"default",{value:e,enumerable:!0}):n,e));var fn=Xe((Kr,St)=>{St.exports=luna?.core?.modules?.["@luna/core"];if(St.exports===void 0)throw new Error("Cannot find module @luna/core in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/core")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var kt=Xe((jr,xt)=>{xt.exports=luna?.core?.modules?.["@luna/lib"];if(xt.exports===void 0)throw new Error("Cannot find module @luna/lib in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/lib")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Qt=Xe((Hi,Wt)=>{Wt.exports=luna?.core?.modules?.react;if(Wt.exports===void 0)throw new Error("Cannot find module react in luna.core.modules");luna.core.LunaPlugin.getByName("react")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var ra=Xe((Bi,Jt)=>{Jt.exports=luna?.core?.modules?.["@luna/ui"];if(Jt.exports===void 0)throw new Error("Cannot find module @luna/ui in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/ui")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Se=Le(fn(),1),de=Le(kt(),1);var Ce=[62,125,250,500,1e3,2e3,4e3,8e3],Ge=Ce.length,ce=-12,Y=12,L={eq:{enabled:!1,bands:Array.from({length:Ge},()=>0)},bass:{enabled:!1,boost:6,sub:3,drive:.2,mix:.6},eightD:{enabled:!1,rate:.12,panDepth:.8,pitchRate:.3,pitchDepth:4},delay:{enabled:!1,timeMs:250,feedback:.25,mix:.25},reverb:{enabled:!1,decay:2,mix:.25}},D=(e,t,n,a)=>{let r=typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(r)?Math.min(n,Math.max(t,r)):a},ze=(e,t)=>typeof e=="boolean"?e:t,Ra=e=>{let t=Array.from({length:Ge},()=>0);if(Array.isArray(e.bands)){for(let i=0;i<Ge;i+=1)t[i]=D(e.bands[i],ce,Y,0);return t}let n=D(e.low,ce,Y,0),a=D(e.mid,ce,Y,0),r=D(e.high,ce,Y,0);return[n,n,a,a,a,r,r,r]},q=e=>{let t=typeof e=="object"&&e!==null?e:{},n=typeof t.eq=="object"&&t.eq!==null?t.eq:{},a=typeof t.eightD=="object"&&t.eightD!==null?t.eightD:{},r=typeof t.bass=="object"&&t.bass!==null?t.bass:{},i=typeof t.delay=="object"&&t.delay!==null?t.delay:{},c=typeof t.reverb=="object"&&t.reverb!==null?t.reverb:{};return{eq:{enabled:ze(n.enabled,L.eq.enabled),bands:Ra(n)},eightD:{enabled:ze(a.enabled,L.eightD.enabled),rate:D(a.rate,.02,2,L.eightD.rate),panDepth:D(a.panDepth,0,1,L.eightD.panDepth),pitchRate:D(a.pitchRate,.02,2,L.eightD.pitchRate),pitchDepth:D(a.pitchDepth,0,12,L.eightD.pitchDepth)},bass:{enabled:ze(r.enabled,L.bass.enabled),boost:D(r.boost,0,24,L.bass.boost),sub:D(r.sub,0,12,L.bass.sub),drive:D(r.drive,0,1,L.bass.drive),mix:D(r.mix,0,1,L.bass.mix)},delay:{enabled:ze(i.enabled,L.delay.enabled),timeMs:D(i.timeMs,20,2e3,L.delay.timeMs),feedback:D(i.feedback,0,.9,L.delay.feedback),mix:D(i.mix,0,1,L.delay.mix)},reverb:{enabled:ze(c.enabled,L.reverb.enabled),decay:D(c.decay,.2,8,L.reverb.decay),mix:D(c.mix,0,1,L.reverb.mix)}}},Ze=e=>e.eq.enabled||e.bass.enabled||e.eightD.enabled||e.delay.enabled||e.reverb.enabled,mn=e=>{let t=[];return e.eq.enabled&&t.push("EQ 8-band"),e.eightD.enabled&&t.push(`8D ${e.eightD.rate.toFixed(2)} Hz`),e.bass.enabled&&t.push(`Bass +${Math.round(e.bass.boost)} dB`),e.delay.enabled&&t.push(`Delay ${Math.round(e.delay.timeMs)} ms`),e.reverb.enabled&&t.push(`Reverb ${e.reverb.decay.toFixed(1)} s`),t.length===0?"No effects enabled":t.join(" \xB7 ")};var X=e=>Number.isFinite(e)?Math.max(-12,Math.min(12,Math.round(e))):0,gn=e=>2**(X(e)/12),Ke=e=>{let t=X(e);return`${t>0?"+":""}${t}`};var je={min:.05,max:10,step:.05},Ve=1;var Ha=6,Ne=(e,t=Ha)=>{let n=10**t;return Math.round(e*n)/n},et=(e,t,n)=>Math.min(n,Math.max(t,e)),pe=e=>{let t=Number(e?.min),n=Number.isFinite(t)?Ne(Math.max(.01,t)):je.min,a=Number(e?.max),r=Number.isFinite(a)?Ne(Math.max(n+.01,a)):Math.max(n+.01,je.max),i=Number(e?.step),c=Number.isFinite(i)&&i>0?Ne(i):je.step;return{min:n,max:r,step:c}},Ba=(e,t)=>{let{min:n,step:a}=t,r=n+Math.round((e-n)/a)*a;return Ne(r)},ue=(e,t)=>{let n=pe(t),a=Number.isFinite(e)?e:Ve,r=Ba(a,n);return et(Ne(r),n.min,n.max)},hn=(e,t,n)=>{let a=pe(n),r=ue(e,a);return ue(r+t*a.step,a)},_a=e=>{let t=e.includes(".")?e.replace(/0+$/,"").replace(/\.$/,""):e;return t===""||t==="-0"?"0":t},Z=e=>Number.isFinite(e)?_a(e.toFixed(4)):String(Ve),Ae=e=>`${Z(e)}\xD7`,Ue=(e,t)=>{let{min:n,max:a}=pe(t);if(!(a>n))return 0;let r=Math.log(et(e,n,a)/n)/Math.log(a/n);return et(Number.isFinite(r)?r:0,0,1)},bn=(e,t)=>{let n=pe(t),a=n.min*Math.pow(n.max/n.min,et(e,0,1));return ue(a,n)},yn=e=>{let{min:t,max:n}=pe(e),a=[t,1,2,5,10,n],r=new Set,i=[];for(let d of a.sort((s,f)=>s-f)){if(d<t||d>n)continue;let s=Z(d);r.has(s)||(r.add(s),i.push(Ne(d)))}let c=[];for(let d of i){let s=c[c.length-1];s!==void 0&&Ue(d,e)-Ue(s,e)<.07||c.push(d)}return c};var qa="tidaluna.playback-kit.v1",$a="tidaluna.playback-speed.v1",We=()=>({speed:Ve,pitchShifts:!1,pitchSemitones:0,presetId:null,developerMode:!1,effects:q(void 0),bounds:{...je}}),vn=e=>{if(e===null)return We();let t;try{t=JSON.parse(e)}catch{return We()}if(typeof t!="object"||t===null)return We();let n=t,a=pe(n.bounds),r=X(typeof n.pitchSemitones=="number"?n.pitchSemitones:0);return{speed:ue(typeof n.speed=="number"?n.speed:Ve,a),pitchShifts:r===0&&n.pitchShifts===!0,pitchSemitones:r,presetId:typeof n.presetId=="string"?n.presetId:null,developerMode:n.developerMode===!0,effects:q(n.effects),bounds:a}},Fa=(e,t)=>{let n=e.getItem(t);if(n!==null)return vn(n);let a=e.getItem($a);if(a===null)return We();let r=vn(a);return r.presetId=null,r},za=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&e.presetId===t.presetId&&e.developerMode===t.developerMode&&JSON.stringify(e.effects)===JSON.stringify(t.effects)&&e.bounds.min===t.bounds.min&&e.bounds.max===t.bounds.max&&e.bounds.step===t.bounds.step,wt=(e,t=qa)=>{let n=Fa(e,t),a=new Set,r=()=>({...n,bounds:{...n.bounds}}),i=d=>{if(za(n,d))return;n=d;try{e.setItem(t,JSON.stringify(n))}catch{}let s=r();for(let f of[...a])try{f(s)}catch(y){console.error("[PlaybackKit] listener failed",y)}},c=d=>({...n,...d});return{get:r,subscribe(d){return a.add(d),()=>a.delete(d)},setSpeed(d){i(c({speed:ue(d,n.bounds)}))},step(d){i(c({speed:hn(n.speed,d,n.bounds)}))},setPitchShifts(d){i(c({pitchShifts:d,pitchSemitones:d?0:n.pitchSemitones}))},setPitchSemitones(d){let s=X(d);i(c({pitchSemitones:s,pitchShifts:s===0?n.pitchShifts:!1}))},setBounds(d){let s=pe({...n.bounds,...d});i({...n,bounds:s,speed:ue(n.speed,s)})},applyPreset(d){let s=X(d.pitchSemitones);i({...n,speed:ue(d.speed,n.bounds),pitchShifts:s===0&&d.pitchShifts===!0,pitchSemitones:s,effects:q(d.effects),presetId:d.id})},setEffects(d){i({...n,effects:q(d)})},setDeveloperMode(d){i({...n,developerMode:d})},clearPreset(){i({...n,presetId:null})},replace(d){let s=pe(d.bounds),f=X(d.pitchSemitones);i({speed:ue(d.speed,s),pitchShifts:f===0&&d.pitchShifts===!0,pitchSemitones:f,presetId:typeof d.presetId=="string"?d.presetId:null,developerMode:d.developerMode===!0,effects:q(d.effects),bounds:s})},reset(){i({...We(),developerMode:n.developerMode,effects:n.effects,presetId:null,bounds:{...n.bounds}})},destroy(){a.clear()}}},Sn=new Map,Et=()=>{try{if(typeof localStorage<"u"){let e="__lunakit_probe__";return localStorage.setItem(e,"1"),localStorage.removeItem(e),localStorage}}catch{}return{getItem:e=>Sn.get(e)??null,setItem:(e,t)=>{Sn.set(e,t)}}},v=wt(Et());var Ga="tidaluna.playback-kit.presets.v1",ye="nightcore",Ka={id:ye,name:"Nightcore",speed:1.35,pitchShifts:!0,pitchSemitones:0,effects:q(L),builtin:!0},ja=24,Ua=.05,Va=16,Pt=e=>{if(typeof e!="string")return;let t=e.trim().slice(0,ja);return t===""?void 0:t},Tt=e=>{let t=Number(e);return Number.isFinite(t)?Math.max(Ua,Math.min(Va,t)):1},xn=(e,t)=>{if(typeof e!="object"||e===null)return;let n=e,a=typeof n.id=="string"?n.id:void 0,r=Pt(n.name);if(!(a===void 0||r===void 0||a===ye||t.has(a)))return t.add(a),{id:a,name:r,speed:Tt(n.speed),pitchShifts:n.pitchShifts===!0,pitchSemitones:X(typeof n.pitchSemitones=="number"?n.pitchSemitones:0),effects:q(n.effects)}},Wa=e=>{if(e===null)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(!Array.isArray(t))return[];let n=new Set,a=[];for(let r of t){let i=xn(r,n);i!==void 0&&a.push(i)}return a},Qa=(e,t)=>{if(e.eq.enabled!==t.eq.enabled||e.eq.bands.length!==t.eq.bands.length)return!1;for(let i=0;i<e.eq.bands.length;i+=1)if(e.eq.bands[i]!==t.eq.bands[i])return!1;let n=["enabled","boost","sub","drive","mix"];for(let i of n)if(e.bass[i]!==t.bass[i])return!1;let a=["enabled","rate","panDepth","pitchRate","pitchDepth"];for(let i of a)if(e.eightD[i]!==t.eightD[i])return!1;let r=["enabled","timeMs","feedback","mix"];for(let i of r)if(e.delay[i]!==t.delay[i])return!1;return e.reverb.enabled===t.reverb.enabled&&e.reverb.decay===t.reverb.decay&&e.reverb.mix===t.reverb.mix},Qe=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&Qa(e.effects,t.effects),Mt=(e,t=Ga)=>{let n=Wa(e.getItem(t)),a=new Set,r=0,i=()=>{try{e.setItem(t,JSON.stringify(n))}catch{}},c=()=>{for(let s of[...a])try{s()}catch{}},d=()=>[{...Ka},...n.map(s=>({...s}))];return{get:d,getById(s){return d().find(f=>f.id===s)},save(s,f){let y=Pt(s);if(y===void 0)return;r+=1;let x={id:`custom-${Date.now().toString(36)}-${r}`,name:y,speed:Tt(f.speed),pitchShifts:f.pitchShifts===!0,pitchSemitones:X(f.pitchSemitones),effects:q(f.effects)};return n.push(x),i(),c(),{...x}},remove(s){if(s===ye)return!1;let f=n.filter(y=>y.id!==s);return f.length===n.length?!1:(n=f,i(),c(),!0)},rename(s,f){if(s===ye)return!1;let y=Pt(f),x=n.find(w=>w.id===s);return y===void 0||x===void 0?!1:(x.name=y,i(),c(),!0)},update(s,f){if(s===ye)return!1;let y=n.find(x=>x.id===s);return y===void 0?!1:(y.speed=Tt(f.speed),y.pitchShifts=f.pitchShifts===!0,y.pitchSemitones=X(f.pitchSemitones),y.effects=q(f.effects),i(),c(),!0)},move(s,f){if(s===ye)return!1;let y=n.findIndex(g=>g.id===s),x=y+Math.sign(f);if(y<0||x<0||x>=n.length)return!1;let[w]=n.splice(y,1);return n.splice(x,0,w),i(),c(),!0},replace(s){let f=new Set;n=s.filter(y=>y.builtin!==!0).map(y=>xn(y,f)).filter(y=>y!==void 0),i(),c()},subscribe(s){return a.add(s),()=>a.delete(s)}}},A=Mt(Et());var Lt=1,kn=e=>({getItem:()=>e,setItem:()=>{}}),tt=e=>{if(e==null)return;let t;try{t=JSON.parse(e)}catch{return}if(typeof t!="object"||t===null)return;let n=t;if(n.version!==Lt)return;let a=wt(kn(JSON.stringify(n.settings??{}))).get(),r=Mt(kn(JSON.stringify(n.presets??[]))).get().filter(c=>c.builtin!==!0),i=new Set([ye,...r.map(c=>c.id)]);return a.presetId!==null&&!i.has(a.presetId)&&(a.presetId=null),{version:Lt,settings:a,presets:r}},Je=(e,t)=>`${JSON.stringify({version:Lt,settings:e,presets:t.filter(n=>n.builtin!==!0)},null,2)}
`;var ke=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/config.native.ts",'"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var P=(e,n)=>{for(var t in n)p(e,t,{get:n[t],enumerable:!0})},w=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of m(n))!h.call(e,s)&&s!==t&&p(e,s,{get:()=>n[s],enumerable:!(o=d(n,s))||o.enumerable});return e};var y=e=>w(p({},"__esModule",{value:!0}),e);var A={};P(A,{exportConfig:()=>F,getConfigPath:()=>k,importConfig:()=>S,readConfig:()=>v,revealConfig:()=>D,writeConfig:()=>x});module.exports=y(A);var l=require,i=l("path"),r=()=>l("fs/promises"),b=()=>l("fs"),u=()=>l("electron"),g=()=>process.env.HOME??process.env.USERPROFILE??"",f=()=>process.platform==="win32"?process.env.APPDATA??i.join(g(),"AppData","Roaming"):process.platform==="darwin"?i.join(g(),"Library","Application Support"):i.join(g(),".config"),j=()=>{let e=f(),n=b(),t=[],o=process.resourcesPath;o!==void 0&&(t.push(i.basename(i.dirname(i.dirname(o)))),t.push(i.basename(i.dirname(o)))),t.push("TIDAL","Tidal","tidal","tidal-hifi");for(let s of t)if(!(s===""||s==="Contents"||s==="resources")&&n.existsSync(i.join(e,s)))return s;return"TIDAL"},c=()=>i.join(f(),j(),"playback-kit"),a=()=>i.join(c(),"config.json"),k=async()=>a(),v=async()=>{try{return await r().readFile(a(),"utf8")}catch{return null}},x=async e=>{await r().mkdir(c(),{recursive:!0});let n=`${a()}.tmp`;return await r().writeFile(n,e,"utf8"),await r().rename(n,a()),a()},F=async e=>{let t=await u().dialog.showSaveDialog({title:"Export Playback Kit config",defaultPath:i.join(f(),"playback-kit.json"),filters:[{name:"JSON",extensions:["json"]}]});return t.canceled||t.filePath===void 0?null:(await r().writeFile(t.filePath,e,"utf8"),t.filePath)},S=async()=>{let n=await u().dialog.showOpenDialog({title:"Import Playback Kit config",properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]}),t=n.filePaths[0];return n.canceled||t===void 0?null:{path:t,json:await r().readFile(t,"utf8")}},D=async()=>{await r().mkdir(c(),{recursive:!0}),await u().shell.openPath(c())};0&&(module.exports={exportConfig,getConfigPath,importConfig,readConfig,revealConfig,writeConfig});\n');if(ke===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/config.native.ts");var wn=(...e)=>__ipcRenderer.invoke(ke,"exportConfig",...e),nt=(...e)=>__ipcRenderer.invoke(ke,"getConfigPath",...e),En=(...e)=>__ipcRenderer.invoke(ke,"importConfig",...e),at=(...e)=>__ipcRenderer.invoke(ke,"readConfig",...e),Pn=(...e)=>__ipcRenderer.invoke(ke,"revealConfig",...e),De=(...e)=>__ipcRenderer.invoke(ke,"writeConfig",...e);var Ie="2.11.0";var ve=[],Tn=!0,Mn=!1,Ln=e=>{if(e!==void 0)try{return JSON.parse(JSON.stringify(e))}catch{try{return String(e)}catch{return"[unserialisable]"}}},Ct=e=>{Mn=e,e||(ve.length=0)};var h=(e,t,n)=>{if(!Mn)return;let a={at:Date.now(),level:e,message:t,data:Ln(n)};if(ve.push(a),ve.length>500&&ve.shift(),!(e==="debug"&&!Tn))try{let r=e==="error"?console.error:e==="warn"?console.warn:console.debug;n===void 0?r(`[PlaybackKit] ${t}`):r(`[PlaybackKit] ${t}`,n)}catch{}},Cn=()=>ve.map(e=>({...e})),Nt=()=>ve.map(e=>`${new Date(e.at).toISOString()} ${e.level.toUpperCase().padEnd(5)} ${e.message}${e.data===void 0?"":` ${JSON.stringify(e.data)}`}`).join(`
`),Nn=()=>{ve.length=0},An=e=>{Tn=e};var Ja=e=>({tag:e.tagName.toLowerCase(),id:e.id,class:typeof e.className=="string"?e.className:"",src:(e.currentSrc||e.src||"").slice(0,140),paused:e.paused,readyState:e.readyState,networkState:e.networkState,currentTime:Number(e.currentTime.toFixed(3)),duration:Number.isFinite(e.duration)?Number(e.duration.toFixed(3)):e.duration,playbackRate:e.playbackRate,defaultPlaybackRate:e.defaultPlaybackRate,preservesPitch:e.preservesPitch,muted:e.muted,volume:e.volume,connected:e.isConnected,parent:e.parentElement===null?null:e.parentElement.id||e.parentElement.className}),Ya=()=>typeof document>"u"?[]:[...document.querySelectorAll("video,audio")].map(Ja),rt=()=>{if(typeof document>"u")return{};let e=document.getElementById("tidal-player-root");return{playerRoot:e!==null,rootChildCount:e?.children.length??0,rootChildren:e===null?[]:[...e.children].map(t=>`${t.tagName.toLowerCase()}#${t.id||"-"}`),scopedMedia:document.querySelectorAll("#tidal-player-root video, #tidal-player-root audio").length,videoOne:document.getElementById("video-one")!==null,videoTwo:document.getElementById("video-two")!==null,allMedia:document.querySelectorAll("video,audio").length,footer:document.querySelector('[data-test="footer-player"]')!==null}},Xa=e=>new Promise(t=>setTimeout(t,e)),Za=async(e=1500)=>{if(typeof document>"u")return[];let t=[...document.querySelectorAll("video,audio")],n=t.map(a=>({id:a.id,tag:a.tagName.toLowerCase(),time:a.currentTime,paused:a.paused}));return await Xa(e),t.map((a,r)=>{let i=n[r],c=a.currentTime-i.time,d=e/1e3;return{id:i.id,tag:i.tag,paused:a.paused,deltaSeconds:Number(c.toFixed(3)),observedRate:Number((c/d).toFixed(3)),expectedRate:a.playbackRate}})},Dn,In=e=>{Dn=e},Rn,Hn=e=>{Rn=e},er=()=>{try{return Rn?.()??{}}catch(e){return{error:String(e)}}},tr=()=>{try{return Dn?.()??{registered:!1}}catch(e){return{error:String(e)}}},nr=["--wave-color-solid-accent-fill","--wave-color-solid-accent-bright","--wave-color-solid-base-fill","--wave-color-solid-base-brighter","--wave-color-solid-base-brightest","--wave-color-solid-contrast-fill","--wave-color-solid-contrast-dark","--wave-color-opacity-contrast-fill-ultra-thin","--wave-color-opacity-contrast-fill-thin","--wave-color-opacity-contrast-fill-thick","--wave-color-solid-warning-fill","--wave-color-text-danger","--market-core-text-10-color","--market-core-text-20-color","--market-core-fill-white-color","--baseFontSize","--baseLineHeight","--remRatio"],ar=()=>{if(typeof document>"u")return{};let e=document.getElementById("wimp")??document.querySelector('[data-test="footer-player"]')??document.documentElement,t=getComputedStyle(e),n={};for(let r of nr){let i=t.getPropertyValue(r).trim();i!==""&&(n[r]=i)}let a=r=>{let i=document.querySelector(r);if(i===null)return null;let c=getComputedStyle(i);return{color:c.color,background:c.backgroundColor,fontFamily:c.fontFamily,fontSize:c.fontSize,lineHeight:c.lineHeight,borderRadius:c.borderRadius,height:c.height}};return{root:e.id!==""?`#${e.id}`:e.tagName.toLowerCase(),fontSize:t.fontSize,fontFamily:t.fontFamily,tokens:n,elements:{footer:a('[data-test="footer-player"]'),utilityButtons:a('[data-test="footer-player"] [class*="utilityButtons"]'),volume:a('[data-test="footer-player"] [class*="sliderContainer"]'),qualityBadge:a("[data-test-quality-badge-streaming-quality]"),progressBar:a('[data-test="progress-bar"]')}}},At=async e=>{h("info","building diagnostics report");let t=await Za();return[`Playback Kit v${Ie}`,`at: ${new Date().toISOString()}`,`url: ${typeof location>"u"?"?":location.href}`,`ua: ${typeof navigator>"u"?"?":navigator.userAgent}`,`visibility: ${typeof document>"u"?"?":document.visibilityState}`,`settings: ${JSON.stringify(Ln(e))}`,`selectors: ${JSON.stringify(rt())}`,`player: ${JSON.stringify(er())}`,`tidal: ${JSON.stringify(tr())}`,`progression: ${JSON.stringify(t)}`,`media: ${JSON.stringify(Ya())}`,`theme: ${JSON.stringify(ar())}`,"",`--- logs (${ve.length}) ---`,Nt()].join(`
`)},Re=async e=>Dt(await At(e)),Dt=async e=>{try{if(typeof navigator<"u"&&navigator.clipboard?.writeText!==void 0)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}catch{return!1}};var rr=400,Bn=100,ir=5e-4,ie,He,we,Be,ee=[],_n=new WeakMap,It=0,it=new Map,On=e=>new Promise(t=>setTimeout(t,e)),oe=async()=>{if(ie===void 0){let e=window.AudioContext??window.webkitAudioContext;if(e===void 0)throw new Error("Web Audio is unavailable");ie=new e({latencyHint:"playback"}),h("info","audio context created",{sampleRate:ie.sampleRate,state:ie.state})}if(ie.state==="suspended")try{await Promise.race([ie.resume(),On(250)])}catch{}return ie},Rt=()=>{if(He===void 0||we===void 0)return;He.disconnect();for(let t of ee)try{t.output.disconnect()}catch{}let e=He;for(let t of ee)e.connect(t.input),e=t.output;e.connect(we)},ot=async()=>{let e=await oe();return(He===void 0||we===void 0)&&(He=e.createGain(),we=e.createGain(),Be=e.createAnalyser(),Be.fftSize=2048,we.connect(Be),we.connect(e.destination)),Rt(),{ctx:e,input:He,output:we}},Ht=async(e,t)=>{if(it.has(t))return it.get(t);let n=await oe(),a=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),r=(async()=>{let i;try{await Promise.race([n.audioWorklet.addModule(a),new Promise((c,d)=>{i=setTimeout(()=>d(new Error(`Timed out loading worklet ${t}`)),rr*10)})])}finally{i!==void 0&&clearTimeout(i),URL.revokeObjectURL(a)}})();it.set(t,r);try{await r}catch(i){throw it.delete(t),i}},Ee=async e=>{let{ctx:t,input:n}=await ot();if(_n.has(e))return;if(e.mediaKeys!==null&&e.mediaKeys!==void 0)throw new Error("protected media (DRM) cannot be routed through Web Audio");let a=t.createMediaElementSource(e);a.connect(n),_n.set(e,a),It+=1,h("info","audio engine attached element",{id:e.id,sources:It})},Bt=async(e,t)=>{await st(e,e,t)},st=async(e,t,n)=>{if(await ot(),ee.some(r=>r.input===e))return;let a=n===void 0?ee.length:Math.max(0,Math.min(ee.length,n));ee.splice(a,0,{input:e,output:t}),Rt(),h("debug","audio engine inserted group",{index:a,nodes:ee.length})},or=async e=>{await ot();let t=ee.findIndex(a=>a.input===e||a.output===e);if(t<0)return!1;let[n]=ee.splice(t,1);try{n.output.disconnect()}catch{}return Rt(),!0},sr=()=>ee.map(e=>e.input),I=()=>({context:ie===void 0?"none":ie.state,sampleRate:ie?.sampleRate,sources:It,nodes:ee.length}),_t=async(e=1200)=>{let{ctx:t}=await ot();if(Be===void 0)throw new Error("analyser unavailable");let n=Math.max(1,Math.round(e/Bn)),a=new Float32Array(Be.fftSize),r=0,i=0,c=0;for(let s=0;s<n;s+=1){if(await On(Bn),t.state!=="running")continue;Be.getFloatTimeDomainData(a);let f=0,y=0;for(let x of a){let w=Math.abs(x);w>f&&(f=w),y+=x*x}r=Math.max(r,f),i+=y/a.length,c+=1}let d=c===0?0:Math.sqrt(i/c);return{rms:d,peak:r,samples:c,silent:d<ir,durationMs:e}},dr=()=>({version:1,ensureContext:oe,loadWorklet:Ht,attach:Ee,insert:Bt,insertGroup:st,remove:or,list:sr,status:I,measureRms:_t}),qn=()=>{let e=dr();return globalThis.__playbackKitAudio=e,e},$n=e=>{globalThis.__playbackKitAudio===e&&delete globalThis.__playbackKitAudio};var Gn=Le(kt(),1);var Fn=`
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
	margin: 0 0 14px;
}
.lunaspeed-presets[hidden] {
	display: none;
}
.lunaspeed-preset,
.lunaspeed-save-toggle {
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
`;var Ot=1e4,zn=12,dt=8,ur=1e3,pr='<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>',qt=(e,t,n)=>Math.min(n,Math.max(t,e)),fr=()=>document.querySelector('[data-test="footer-player"] [class*="utilityButtons"]'),mr=e=>{switch(e){case"HI_RES_LOSSLESS":return"Max";case"HI_RES":return"Hi-Res";case"LOSSLESS":return"Lossless";case"HIGH":return"High";case"LOW":return"Low";default:return e}},Kn=(e,t,n={})=>{new Gn.StyleTag("lunaspeed-styles",e,Fn);let a=document.createElement("div");a.className="lunaspeed-ctl",a.dataset.lunaspeed="control";let r=document.createElement("button");r.type="button",r.className="lunaspeed-step",r.textContent="\u2212",r.setAttribute("aria-label","Slower");let i=document.createElement("button");i.type="button",i.className="lunaspeed-pill",i.setAttribute("aria-label","Playback speed"),i.setAttribute("aria-haspopup","dialog"),i.innerHTML=`${pr}<span class="lunaspeed-pill-label"></span>`;let c=i.querySelector(".lunaspeed-pill-label"),d=document.createElement("button");d.type="button",d.className="lunaspeed-step",d.textContent="+",d.setAttribute("aria-label","Faster"),a.append(r,i,d);let s=document.createElement("div");s.className="lunaspeed-popover",s.setAttribute("role","dialog"),s.setAttribute("aria-label","Playback settings"),s.hidden=!0,s.innerHTML=`
		<div class="lunaspeed-pop-head">
			<span class="lunaspeed-pop-title">Playback</span>
			<button class="lunaspeed-reset" type="button">Reset</button>
		</div>
		<div class="lunaspeed-readout">
			<span class="lunaspeed-value">1</span><span class="lunaspeed-unit">\xD7</span>
		</div>
		<div class="lunaspeed-presets" role="group" aria-label="Presets"></div>
		<form class="lunaspeed-save" hidden>
			<input class="lunaspeed-save-input" type="text" maxlength="24" placeholder="Preset name" aria-label="Preset name" />
			<button class="lunaspeed-save-ok" type="submit">Save</button>
			<button class="lunaspeed-save-cancel" type="button">Cancel</button>
		</form>
		<div class="lunaspeed-slider">
			<div class="lunaspeed-slider-rail"></div>
			<div class="lunaspeed-slider-fill"></div>
			<div class="lunaspeed-slider-thumb"></div>
			<input class="lunaspeed-range" type="range" min="0" max="${Ot}" step="1" aria-label="Playback speed slider" />
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
			<span class="lunaspeed-version">v${Ie}</span>
			<span class="lunaspeed-foot-actions">
				<button class="lunaspeed-settings" type="button">Luna settings</button>
				<button class="lunaspeed-copy" type="button">Copy diagnostics</button>
			</span>
		</div>`;let f=s.querySelector(".lunaspeed-value"),y=s.querySelector(".lunaspeed-presets"),x=s.querySelector(".lunaspeed-save"),w=s.querySelector(".lunaspeed-save-input"),g=s.querySelector(".lunaspeed-save-cancel"),C=s.querySelector(".lunaspeed-slider"),P=s.querySelector(".lunaspeed-range"),B=s.querySelector(".lunaspeed-ticks"),le=s.querySelector(".lunaspeed-pitch-value"),V=[...s.querySelectorAll(".lunaspeed-pitch-step")],S=s.querySelector(".lunaspeed-switch"),W=s.querySelector(".lunaspeed-reset"),N=s.querySelector(".lunaspeed-copy"),R=s.querySelector(".lunaspeed-settings"),_=s.querySelector(".lunaspeed-pitch-dot"),Q=s.querySelector(".lunaspeed-warning"),z=s.querySelector(".lunaspeed-warning-action"),me=s.querySelector(".lunaspeed-quality"),ge=s.querySelector(".lunaspeed-quality-action"),he="",be="",T=!1,o=!1,u,ne,tn=p=>{C.style.setProperty("--lunaspeed-pos",String(qt(p,0,1)))},nn=(p,b)=>{let k=Ue(p,b);P.value=String(Math.round(k*Ot)),tn(k)},ka=()=>{let{bounds:p}=t.get(),b=`${p.min}:${p.max}`;b!==he&&(he=b,B.replaceChildren(...yn(p).map(k=>{let E=document.createElement("span");return E.className="lunaspeed-tick",E.style.left=`${(Ue(k,p)*100).toFixed(3)}%`,E.textContent=Ae(k),E})))},wa=p=>p===null?"Custom":n.presets?.list().find(b=>b.id===p)?.name??"Custom",an=()=>{let p=n.presets;if(p===void 0){y.hidden=!0,x.hidden=!0;return}let b=p.list(),k=t.get(),E=k.presetId,H=b.find(M=>M.id===E),J=H!==void 0&&!Qe(H,k),ae=`${b.map(M=>`${M.id}:${M.name}`).join("|")}::${E??""}::${J}`;if(ae===be)return;be=ae;let G=[],O=document.createElement("button");O.type="button",O.className="lunaspeed-preset",O.textContent="Custom",O.dataset.active=String(E===null),O.addEventListener("click",()=>p.clear()),G.push(O);for(let M of b){let re=document.createElement("button");re.type="button",re.className="lunaspeed-preset";let un=E===M.id;re.textContent=un&&J?`${M.name} *`:M.name,re.dataset.active=String(un),re.dataset.builtin=String(M.builtin===!0),re.title=`${M.name} \u2014 ${Ae(M.speed)}${M.pitchShifts?", pitch follows speed":M.pitchSemitones!==0?`, ${Ke(M.pitchSemitones)} st`:""}`,re.addEventListener("click",()=>p.apply(M)),G.push(re)}let xe=document.createElement("button");xe.type="button",xe.className="lunaspeed-save-toggle",xe.textContent="Save preset",xe.addEventListener("click",()=>{if(x.hidden=!x.hidden,x.hidden)return;let M=b.find(re=>re.id===t.get().presetId);w.value=M===void 0?"":M.builtin===!0?`${M.name} (edited)`:M.name,w.focus(),w.select()}),G.push(xe),y.replaceChildren(...G)},Ea=(p,b)=>{le.textContent=`${Ke(p)} st`;for(let k of V){let E=Number(k.dataset.delta);k.disabled=E<0?p<=-12:p>=12,k.title=E<0?"Lower pitch by 1 semitone":"Raise pitch by 1 semitone"}S.setAttribute("aria-checked",String(b))},rn=p=>{let b=n.getPitchEngineState?.(),k=p===0?"idle":b?.status??"idle";_.dataset.status=k;let E=k==="running"?"Pitch engine active":k==="waiting"?"Pitch engine waiting for the audio element":k==="unavailable"?"Pitch engine unavailable"+(b?.reason===void 0?"":": "+b.reason):k==="ready"?"Pitch engine ready":"Pitch engine idle";_.title=p===0?"":E,_.setAttribute("aria-label",p===0?"":E)},bt=p=>{Q.hidden=p!=="native";let b=n.previousQuality?.()??null,k=p!=="native"&&b!==null;me.hidden=!k,k&&b!==null&&(ge.textContent=`Restore ${mr(b)}`)},yt=()=>{let p=t.get(),{speed:b,pitchShifts:k,pitchSemitones:E,bounds:H,presetId:J}=p,ae=Ae(b);c.textContent=ae,i.dataset.active=String(b!==1||k||E!==0);let G=n.presets?.list().find(xe=>xe.id===J),O=G!==void 0&&!Qe(G,p);i.title=`Playback ${ae}${J===null?"":` \xB7 ${wa(J)}${O?" *":""}`}`,r.setAttribute("aria-label",`Slower by ${Ae(H.step)}`),d.setAttribute("aria-label",`Faster by ${Ae(H.step)}`),r.title=`\u2212${Z(H.step)}\xD7`,d.title=`+${Z(H.step)}\xD7`,f.textContent=Z(b),o||nn(b,H),P.setAttribute("aria-valuetext",ae),ka(),an(),Ea(E,k),rn(E),N.hidden=!p.developerMode,T&&vt()},vt=()=>{let p=i.getBoundingClientRect(),b=s.offsetWidth||348,k=s.offsetHeight||240,E=qt(p.left+p.width/2-b/2,dt,window.innerWidth-b-dt),H=p.top-k-zn,J="top";H<dt&&(H=Math.min(p.bottom+zn,window.innerHeight-k-dt),J="bottom"),s.style.left=`${Math.round(E)}px`,s.style.top=`${Math.round(H)}px`,s.dataset.side=J;let ae=qt(p.left+p.width/2-E,18,b-18);s.style.setProperty("--lunaspeed-caret",`${Math.round(ae)}px`)},on=p=>{let b=p.target;b!==null&&(s.contains(b)||a.contains(b)||Me())},sn=p=>{p.key==="Escape"&&(p.preventDefault(),Me(),i.focus())},dn=()=>{T&&vt()},Pa=()=>{T||(T=!0,s.hidden=!1,i.dataset.open="true",yt(),bt(n.getPlayerKind?.()??"unknown"),vt(),n.onOpen?.(),document.addEventListener("pointerdown",on,!0),document.addEventListener("keydown",sn,!0),window.addEventListener("resize",dn),u=setInterval(()=>rn(t.get().pitchSemitones),500),h("debug","popover open"))},Me=()=>{T&&(T=!1,s.hidden=!0,delete i.dataset.open,x.hidden=!0,u!==void 0&&(clearInterval(u),u=void 0),document.removeEventListener("pointerdown",on,!0),document.removeEventListener("keydown",sn,!0),window.removeEventListener("resize",dn))},Ta=()=>T?Me():Pa(),ln=()=>{if(!a.isConnected){T&&Me();let b=fr();if(b===null)return;let k=b.querySelector('[class*="sliderContainer"]');k!==null&&k.parentElement===b?b.insertBefore(a,k):b.appendChild(a)}let p=document.getElementById("wimp")??document.body;s.parentElement!==p&&p.appendChild(s)};r.addEventListener("click",()=>t.step(-1)),d.addEventListener("click",()=>t.step(1)),i.addEventListener("click",Ta),P.addEventListener("pointerdown",()=>{o=!0,ne!==void 0&&clearTimeout(ne),delete C.dataset.settling});let qe=()=>{if(!o)return;o=!1;let{speed:p,bounds:b}=t.get();C.dataset.settling="true",nn(p,b),ne!==void 0&&clearTimeout(ne),ne=setTimeout(()=>{ne=void 0,delete C.dataset.settling},160)};P.addEventListener("change",qe),window.addEventListener("pointerup",qe),window.addEventListener("pointercancel",qe),P.addEventListener("input",()=>{if(P.disabled)return;let p=Number(P.value)/Ot,b=t.get().bounds;tn(p),t.setSpeed(bn(p,b))}),s.addEventListener("keydown",p=>{p.key==="ArrowLeft"||p.key==="ArrowDown"?(p.preventDefault(),t.step(-1)):(p.key==="ArrowRight"||p.key==="ArrowUp")&&(p.preventDefault(),t.step(1))});for(let p of V)p.addEventListener("click",()=>{let b=Number(p.dataset.delta);t.setPitchSemitones(t.get().pitchSemitones+b)});S.addEventListener("click",()=>t.setPitchShifts(!t.get().pitchShifts)),W.addEventListener("click",()=>t.reset()),x.addEventListener("submit",p=>{p.preventDefault();let b=n.presets;if(b===void 0)return;let k=w.value.trim();if(k==="")return;let{speed:E,pitchShifts:H,pitchSemitones:J,effects:ae}=t.get(),G=b.list().find(O=>O.id===t.get().presetId);if(G!==void 0&&G.builtin!==!0&&k===G.name)b.saveActive(G);else{let O=b.save(k,{speed:E,pitchShifts:H,pitchSemitones:J,effects:ae});if(O===void 0)return;b.apply(O)}w.value="",x.hidden=!0,be="",an(),h("info","preset saved",{name:k})}),g.addEventListener("click",()=>{x.hidden=!0,w.value=""}),R.hidden=n.openSettings===void 0,R.addEventListener("click",()=>{n.openSettings?.(),Me()});let $e;N.addEventListener("click",async()=>{$e!==void 0&&clearTimeout($e),N.disabled=!0,N.textContent="Copying\u2026";let p=await Re(t.get());h(p?"info":"error","diagnostics copied",{copied:p}),N.textContent=p?"Copied":"Copy failed",$e=setTimeout(()=>{N.textContent="Copy diagnostics",N.disabled=!1},1800)});let Fe;z.addEventListener("click",()=>{n.useBrowserPlayer!==void 0&&(Fe!==void 0&&clearTimeout(Fe),z.disabled=!0,z.textContent="Switching\u2026",n.useBrowserPlayer(),h("info","requested browser player from warning"),Fe=setTimeout(()=>{z.disabled=!1,z.textContent="Use browser player"},2500))}),ge.addEventListener("click",()=>{n.restoreQuality!==void 0&&(n.restoreQuality(),me.hidden=!0,h("info","restored original streaming quality"))}),bt(n.getPlayerKind?.()??"unknown");let cn=n.subscribePlayerKind?.(bt);cn!==void 0&&e.add(cn),ln(),yt(),e.add(t.subscribe(yt));let Ma=setInterval(ln,ur);e.add(()=>{clearInterval(Ma),window.removeEventListener("pointerup",qe),window.removeEventListener("pointercancel",qe),$e!==void 0&&clearTimeout($e),Fe!==void 0&&clearTimeout(Fe),ne!==void 0&&clearTimeout(ne),Me(),s.remove(),a.remove()})};var fe,_e={built:!1,active:[],attached:0},jn=()=>({..._e}),gr=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),hr=(e,t)=>{let n=Math.max(1,Math.floor(e.sampleRate*t)),a=e.createBuffer(2,n,e.sampleRate);for(let r=0;r<2;r+=1){let i=a.getChannelData(r);for(let c=0;c<n;c+=1){let d=Math.pow(1-c/n,2.2);i[c]=(Math.random()*2-1)*d}}return a},br=async()=>{let e=await oe();if(fe!==void 0)return fe;let t=e.createGain(),n=Ce.map((T,o)=>{let u=e.createBiquadFilter();return u.frequency.value=T,o===0?u.type="lowshelf":o===Ce.length-1?u.type="highshelf":(u.type="peaking",u.Q.value=1.2),u}),a=e.createGain(),r=e.createDelay(2),i=e.createGain(),c=e.createGain(),d=e.createGain(),s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=220,s.Q.value=.7;let f=e.createBiquadFilter();f.type="lowshelf",f.frequency.value=45;let y=e.createBiquadFilter();y.type="lowshelf",y.frequency.value=90;let x=e.createGain(),w=e.createWaveShaper(),g=new Float32Array(2048);for(let T=0;T<g.length;T+=1){let o=T/(g.length-1)*2-1;g[T]=Math.tanh(3*o)/Math.tanh(3)}w.curve=g,w.oversample="4x";let C=e.createGain(),P=e.createDynamicsCompressor();P.threshold.value=-3,P.knee.value=0,P.ratio.value=20,P.attack.value=.003,P.release.value=.25;let B=e.createGain(),le=e.createDelay(.05);le.delayTime.value=.015;let V=e.createStereoPanner(),S=e.createGain(),W=e.createOscillator();W.type="sine",W.frequency.value=.12;let N=e.createGain();N.gain.value=0;let R=e.createOscillator();R.type="sine",R.frequency.value=.3;let _=e.createGain();_.gain.value=0,W.connect(N),N.connect(V.pan),R.connect(_),_.connect(le.delayTime),W.start(),R.start(),B.connect(le),le.connect(V),V.connect(S);let Q=e.createGain(),z=e.createGain(),me=e.createConvolver(),ge=e.createGain(),he=e.createGain();t.connect(n[0]);for(let T=1;T<n.length;T+=1)n[T-1].connect(n[T]);let be=n[n.length-1];return be.connect(d),d.connect(B),be.connect(s),s.connect(f),f.connect(y),y.connect(x),x.connect(w),w.connect(C),C.connect(B),S.connect(a),S.connect(r),a.connect(Q),r.connect(i),i.connect(Q),r.connect(c),c.connect(r),Q.connect(z),z.connect(P),Q.connect(me),me.connect(ge),ge.connect(P),P.connect(he),fe={fxIn:t,eqFilters:n,delayDry:a,delayNode:r,delayWet:i,delayFeedback:c,bassDry:d,bassLowpass:s,bassSub:f,bassBoost:y,bassDrive:x,bassShaper:w,bassWet:C,eightDInput:B,eightDDelay:le,eightDPanner:V,eightDOut:S,panLfo:W,panDepth:N,pitchLfo:R,pitchDepth:_,limiter:P,reverbIn:Q,reverbDry:z,convolver:me,reverbWet:ge,fxOut:he,decay:0},await st(t,he),h("info","effects graph inserted"),fe},yr=(e,t)=>{if(fe===void 0)return;let n=e.currentTime,a=.06,r=fe;for(let s=0;s<r.eqFilters.length;s+=1){let f=t.eq.enabled?t.eq.bands[s]??0:0;r.eqFilters[s].gain.setTargetAtTime(f,n,a)}let i=t.bass.enabled?t.bass.mix:0;r.bassDry.gain.setTargetAtTime(1,n,a),r.bassWet.gain.setTargetAtTime(i,n,a),r.bassSub.gain.setTargetAtTime(t.bass.enabled?t.bass.sub:0,n,a),r.bassBoost.gain.setTargetAtTime(t.bass.enabled?t.bass.boost:0,n,a),r.bassDrive.gain.setTargetAtTime(t.bass.enabled?1+t.bass.drive*3:1,n,a),r.panLfo.frequency.setTargetAtTime(t.eightD.rate,n,a),r.panDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.panDepth:0,n,a),r.pitchLfo.frequency.setTargetAtTime(t.eightD.pitchRate,n,a),r.pitchDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.pitchDepth/1e3:0,n,a);let c=t.delay.enabled?t.delay.mix:0;r.delayNode.delayTime.setTargetAtTime(Math.min(2,Math.max(.02,t.delay.timeMs/1e3)),n,a),r.delayFeedback.gain.setTargetAtTime(t.delay.enabled?t.delay.feedback:0,n,a),r.delayWet.gain.setTargetAtTime(c,n,a),r.delayDry.gain.setTargetAtTime(1-c,n,a);let d=t.reverb.enabled?t.reverb.mix:0;Math.abs(r.decay-t.reverb.decay)>.05&&(r.convolver.buffer=hr(e,t.reverb.decay),r.decay=t.reverb.decay),r.reverbWet.gain.setTargetAtTime(d,n,a),r.reverbDry.gain.setTargetAtTime(1-d,n,a)},$t=async(e,t)=>{let n=q(e),a=Ze(n);if(!a&&fe===void 0){_e={..._e,active:[]};return}try{let r=await oe();if(r.state!=="running"){_e={built:fe!==void 0,context:r.state,active:[],error:"audio context suspended (interact with the page)",attached:I().sources};return}if(a){let c=gr(t);c!==void 0&&await Ee(c)}let i=await br();yr(r,n),_e={built:!0,context:r.state,active:[n.eq.enabled?"eq":"",n.bass.enabled?"bass":"",n.eightD.enabled?"8d":"",n.delay.enabled?"delay":"",n.reverb.enabled?"reverb":""].filter(c=>c!==""),attached:I().sources},i.decay===0&&n.reverb.enabled&&(i.decay=n.reverb.decay)}catch(r){let i=r instanceof Error?r.message:String(r);_e={built:fe!==void 0,context:I().context,active:[],error:i,attached:I().sources},h("warn","effects engine unavailable",{error:i})}};var Wn="#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two",Un=["loadstart","loadedmetadata","canplay","playing","play","emptied","ratechange","seeked"],lt=.001,Vn=1,vr=150,ct=e=>{let t=e.id;return typeof t=="string"?t:e.constructor.name},te=()=>typeof document>"u"?[]:[...document.querySelectorAll(Wn)],ut=class{constructor(t,n){this.getElements=t;this.source=n}getElements;source;attachments=new Map;timers=new Set;start(){this.scan()}scan(){let t=this.getElements(),n=0;for(let a of t)this.attachments.has(a)||(this.attach(a),n+=1);n>0?h("info","attached media elements",{added:n,total:this.attachments.size,found:t.length}):t.length===0&&h("debug","no media elements found",{selector:Wn})}apply(){this.scan();for(let t of this.attachments.keys())this.applyTo(t,"settings-change")}stop(){for(let t of this.timers)clearTimeout(t);this.timers.clear();for(let[t,n]of this.attachments)n(),this.restore(t);this.attachments.clear(),h("info","controller stopped")}attach(t){let n=a=>{let r=this.source.get().speed,i=t.playbackRate;Math.abs(i-r)>lt&&h("warn","TIDAL reset the rate",{id:ct(t),event:a.type,before:i,desired:r,currentTime:t.currentTime}),this.applyTo(t,a.type),(a.type==="loadstart"||a.type==="emptied")&&this.scheduleReapply(t)};for(let a of Un)t.addEventListener(a,n);this.attachments.set(t,()=>{for(let a of Un)t.removeEventListener(a,n)}),h("info","attached",{id:ct(t),tag:t.constructor.name,rate:t.playbackRate}),this.applyTo(t,"attach")}applyTo(t,n){let{speed:a,pitchShifts:r}=this.source.get(),i=t.playbackRate;try{Math.abs(i-a)>lt&&(t.playbackRate=a),t.defaultPlaybackRate!==void 0&&Math.abs(t.defaultPlaybackRate-a)>lt&&(t.defaultPlaybackRate=a);let d=!r;t.preservesPitch!==void 0&&t.preservesPitch!==d&&(t.preservesPitch=d),t.webkitPreservesPitch!==void 0&&t.webkitPreservesPitch!==d&&(t.webkitPreservesPitch=d)}catch(d){h("error","failed to apply rate",{id:ct(t),reason:n,error:String(d)});return}let c=t.playbackRate;Math.abs(c-i)>lt&&h("debug","applied rate",{id:ct(t),reason:n,before:i,after:c,readback:c,defaultRate:t.defaultPlaybackRate})}scheduleReapply(t){let n=setTimeout(()=>{this.timers.delete(n),this.attachments.has(t)&&this.applyTo(t,"delayed-reapply")},vr);this.timers.add(n)}restore(t){try{t.playbackRate=Vn,t.defaultPlaybackRate!==void 0&&(t.defaultPlaybackRate=Vn),t.preservesPitch!==void 0&&(t.preservesPitch=!0),t.webkitPreservesPitch!==void 0&&(t.webkitPreservesPitch=!0)}catch{}}};var pt="__lunaspeedPatched",j,K,Qn=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||t.Player===void 0||t.Player.prototype===void 0))return t},Ft=e=>{let t=new Set,n=e,a=0;for(;n!==null&&a<4;){for(let r of Object.getOwnPropertyNames(n))t.add(r);n=Object.getPrototypeOf(n),a+=1}return[...t]},Jn=e=>{let t=Ft(e),n=t.find(a=>/^set(playback|audio)?(rate|speed|tempo)$/i.test(a));return n!==void 0&&typeof e[n]=="function"?n:typeof e.playbackRate=="number"?"playbackRate":t.find(a=>/^(playbackRate|rate|speed)$/i.test(a)&&typeof e[a]=="number")},Sr=e=>{j!==e&&(j=e,K=Jn(e),h("info","native player instance captured",{rateMember:K??null,ownKeys:Object.keys(e).slice(0,40),methods:Ft(e).slice(0,80)}))},zt=()=>{let e=Qn();if(e===void 0)return!1;let t=e.Player?.prototype;if(t===void 0)return!1;if(t[pt]===!0)return!0;try{Object.defineProperty(t,pt,{value:!0,enumerable:!1})}catch{return!1}for(let n of["play","load","pause","seek"]){let a=t[n];typeof a=="function"&&(t[n]=function(...i){try{Sr(this)}catch(c){h("error","native capture failed",{error:String(c)})}return a.apply(this,i)})}return h("info","native player component patched"),!0},Yn=()=>j!==void 0,Gt=e=>{if(j===void 0||(K===void 0&&(K=Jn(j)),K===void 0))return!1;try{let t=j[K];if(K==="playbackRate"){if(t===e)return!0;j.playbackRate=e}else j[K](e);return h("info","native rate applied",{rate:e,member:K,readback:j[K]}),!0}catch(t){return h("error","native rate failed",{rate:e,member:K,error:String(t)}),!1}},ft=()=>{let e=Qn();if(e===void 0)return{present:!1};let t=e.Player?.prototype,n=t===void 0?[]:Object.getOwnPropertyNames(t).filter(a=>a!==pt);return{present:!0,patched:t!==void 0&&t[pt]===!0,playerMethods:n.slice(0,100),rateMethods:n.filter(a=>/rate|speed|tempo|pitch/i.test(a)),instanceCaptured:j!==void 0,rateMember:K??null,instanceMethods:j===void 0?[]:Ft(j).slice(0,100)}};var Xn=`
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
`;var Zn="playback-kit-pitch",se,U={status:"idle",semitones:0,attached:0},Kt=()=>({...U}),xr=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),kr=async e=>(await Ht(Xn,Zn),se===void 0&&(se=new AudioWorkletNode(e,Zn,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]}),await Bt(se,0),h("info","pitch node inserted into audio engine")),se),wr=async(e,t)=>{let n=await oe();if(n.state!=="running"){U={status:"waiting",reason:"audio context suspended (interact with the page)",semitones:e,context:n.state,attached:U.attached};return}let a=xr(t);if(a===void 0){U={status:"waiting",reason:"no playing media element",semitones:e,context:n.state,attached:U.attached};return}await Ee(a);let i=(await kr(n)).parameters.get("ratio");i!==void 0&&(i.value=gn(e)),U={status:"running",semitones:e,context:n.state,attached:I().sources}},mt=async(e,t)=>{if(e===0){if(se!==void 0){let n=se.parameters.get("ratio");n!==void 0&&(n.value=1)}U={...U,status:se===void 0?"idle":"ready",semitones:0,reason:void 0};return}try{await wr(e,t)}catch(n){let a=n instanceof Error?n.message:String(n);U={status:"unavailable",reason:a,semitones:e,attached:U.attached},h("error","pitch engine unavailable",{error:a})}},ea=()=>{if(se!==void 0){let e=se.parameters.get("ratio");e!==void 0&&(e.value=1)}U={...U,status:se===void 0?"idle":"ready",semitones:0,reason:void 0}};var gt="unknown",jt=new Set,Pe=()=>gt,Ut=e=>{if(e!==gt){h("info","player kind changed",{from:gt,to:e}),gt=e;for(let t of[...jt])try{t(e)}catch(n){h("error","player kind listener failed",{error:String(n)})}}},ta=e=>(jt.add(e),()=>jt.delete(e));var Er=(e,t)=>{let n=new Set(e.get().map(r=>r.name));if(!n.has(t))return t;let a=2;for(;n.has(`${t} ${a}`);)a+=1;return`${t} ${a}`},na=(e,t,n)=>{let a=e.get(),r={speed:a.speed,pitchShifts:a.pitchShifts,pitchSemitones:a.pitchSemitones,effects:a.effects};if(n.builtin===!0){let i=t.save(Er(t,`${n.name} (edited)`),r);return i!==void 0&&e.applyPreset(i),i}return t.update(n.id,r),n};var Pr=e=>Math.abs(e-1)>.001,Vt=e=>{if(!Pr(e.getSpeed())||!e.isPlaying())return!1;let t=e.getPosition();return t===null||!Number.isFinite(t)||t<0?!1:(e.dispatchTimeUpdate(t),!0)},aa=(e,t=100)=>{let n=setInterval(()=>Vt(e),t);return()=>clearInterval(n)};var l=Le(Qt(),1),m=Le(ra(),1);var ia=e=>({id:e.id,paused:e.paused,readyState:e.readyState,currentTime:Number(e.currentTime.toFixed(2)),playbackRate:e.playbackRate}),oa=async(e=1200)=>{let t=Date.now(),n=I(),a=te(),r=a.find(g=>!g.paused&&g.readyState>0)??a[0];if(r===void 0){let g={at:t,ok:!1,reason:"no media element",context:n.context,engine:n};return h("warn","audio self-test: no media element"),g}let i=r.currentTime;try{await Ee(r)}catch(g){let C={at:t,ok:!1,reason:g instanceof Error?g.message:String(g),context:I().context,element:ia(r),engine:I()};return h("warn","audio self-test failed to attach",C),C}let c=await oe(),d=0,s=0,f=!0;try{let g=await _t(e);d=g.rms,s=g.peak,f=g.silent}catch(g){h("error","audio self-test measurement failed",{error:String(g)})}let y=Number((r.currentTime-i).toFixed(2)),x=c.state!=="running"?`audio context ${c.state}`:r.paused?"playback is paused":f&&y>.2?"captured audio is silent (DRM-protected or already routed elsewhere)":f?"no audio measured":void 0,w={at:t,ok:x===void 0,reason:x,context:c.state,element:ia(r),progressionSeconds:y,rms:Number(d.toFixed(5)),peak:Number(s.toFixed(5)),silent:f,engine:I()};return h(w.ok?"info":"warn","audio self-test",w),w};var $=Le(Qt(),1);var Tr=132,sa=Y-ce,Yt=e=>Math.max(ce,Math.min(Y,e)),da=e=>`${e>0?"+":""}${e}`,la=e=>e>=1e3?`${e/1e3}k`:String(e),Mr=({frequency:e,value:t,disabled:n,onChange:a})=>{let r=$.default.useRef(null),[i,c]=$.default.useState(null),d=g=>{let C=r.current;if(C===null)return;let P=C.getBoundingClientRect(),B=Math.max(0,Math.min(1,(g-P.top)/P.height));c(B*100),a(Yt(Math.round(Y-B*sa)))},s=i??(Y-t)/sa*100,f=50,y=Math.min(s,f),x=Math.abs(s-f),w=i===null;return $.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:30,opacity:n?.4:1}},$.default.createElement("span",{style:{fontSize:10,fontVariantNumeric:"tabular-nums",color:"currentColor",opacity:.8}},da(t)),$.default.createElement("div",{ref:r,role:"slider",tabIndex:n?-1:0,"aria-label":`${la(e)} Hz`,"aria-valuemin":ce,"aria-valuemax":Y,"aria-valuenow":t,"aria-valuetext":`${da(t)} dB`,"aria-disabled":n,onPointerDown:g=>{n||(g.preventDefault(),g.currentTarget.setPointerCapture(g.pointerId),d(g.clientY))},onPointerMove:g=>{n||!g.currentTarget.hasPointerCapture(g.pointerId)||d(g.clientY)},onPointerUp:g=>{g.currentTarget.hasPointerCapture(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),c(null)},onPointerCancel:g=>{g.currentTarget.hasPointerCapture(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),c(null)},onDoubleClick:()=>{n||a(0)},onKeyDown:g=>{if(n)return;let C=g.shiftKey?3:1;if(g.key==="ArrowUp"||g.key==="ArrowRight")a(Yt(t+C));else if(g.key==="ArrowDown"||g.key==="ArrowLeft")a(Yt(t-C));else if(g.key==="Home")a(ce);else if(g.key==="End")a(Y);else return;g.preventDefault()},style:{position:"relative",width:18,height:Tr,cursor:n?"default":"pointer",touchAction:"none",outline:"none"}},$.default.createElement("div",{style:{position:"absolute",left:"50%",top:0,bottom:0,width:5,transform:"translateX(-50%)",borderRadius:999,background:"color-mix(in srgb, currentColor 16%, transparent)"}}),$.default.createElement("div",{style:{position:"absolute",left:0,right:0,top:`${f}%`,height:1,background:"color-mix(in srgb, currentColor 28%, transparent)"}}),$.default.createElement("div",{style:{position:"absolute",left:"50%",width:5,transform:"translateX(-50%)",borderRadius:999,top:`${y}%`,height:`${x}%`,background:"var(--wave-color-solid-accent-fill, currentColor)",transition:w?"top 120ms ease, height 120ms ease":"none"}}),$.default.createElement("div",{style:{position:"absolute",left:"50%",top:`${s}%`,width:12,height:12,transform:"translate(-50%, -50%)",borderRadius:"50%",background:"currentColor",boxShadow:"0 0 0 3px color-mix(in srgb, var(--wave-color-solid-accent-fill, currentColor) 22%, transparent), 0 1px 3px rgba(0,0,0,.5)",transition:w?"top 120ms ease":"none"}})),$.default.createElement("span",{style:{fontSize:9,opacity:.6,letterSpacing:"-0.02em"}},la(e)))},ca=({eq:e,disabled:t,onChange:n})=>$.default.createElement("div",{style:{display:"flex",gap:8,alignItems:"flex-end",marginLeft:"auto",padding:"2px 0"}},Ce.map((a,r)=>$.default.createElement(Mr,{key:a,frequency:a,value:e.bands[r]??0,disabled:t,onChange:i=>{let c=[...e.bands];c[r]=i,n(c)}})));var Xt=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)&&t>0?t:void 0},F=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)?t:void 0},Lr=e=>{let t=e.pitchShifts?"pitch follows speed":e.pitchSemitones===0?"pitch preserved":`pitch ${Ke(e.pitchSemitones)} st`;return`${Z(e.speed)}\xD7 \xB7 ${t} \xB7 ${mn(e.effects)}`},Te={display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:6,marginLeft:"auto"},Ye=({children:e})=>l.default.createElement("div",{style:{marginBottom:16}},e),Cr=()=>{let[e,t]=l.default.useState(v.get),[n,a]=l.default.useState(A.get),[r,i]=l.default.useState("Copy diagnostics"),[c,d]=l.default.useState("Resolving\u2026"),[s,f]=l.default.useState(""),[y,x]=l.default.useState(null),[w,g]=l.default.useState(!1),[C,P]=l.default.useState("Attaches the playing element, measures captured RMS and reports blocked/silent reasons. May silence playback if capture fails; restart TIDAL to undo.");l.default.useEffect(()=>v.subscribe(t),[]),l.default.useEffect(()=>A.subscribe(()=>a(A.get())),[]),l.default.useEffect(()=>{nt().then(d).catch(()=>d("unavailable"))},[]),l.default.useEffect(()=>{if(r==="Copy diagnostics")return;let o=setTimeout(()=>i("Copy diagnostics"),1800);return()=>clearTimeout(o)},[r]),l.default.useEffect(()=>{if(s==="")return;let o=setTimeout(()=>f(""),4e3);return()=>clearTimeout(o)},[s]);let{bounds:B,pitchShifts:le,developerMode:V,effects:S}=e,W=o=>v.setEffects({...S,eq:{...S.eq,...o}}),N=o=>v.setEffects({...S,bass:{...S.bass,...o}}),R=o=>v.setEffects({...S,eightD:{...S.eightD,...o}}),_=o=>v.setEffects({...S,delay:{...S.delay,...o}}),Q=o=>v.setEffects({...S,reverb:{...S.reverb,...o}}),z=async o=>{let u=tt(o);return u===void 0?!1:(v.replace(u.settings),A.replace(u.presets),await De(Je(u.settings,u.presets)),!0)},me=async()=>{try{let o=await En();if(o===null)return f("Import cancelled");let u=await z(o.json);f(u?`Imported ${o.path}`:"Import failed: invalid config")}catch(o){f(`Import failed: ${String(o)}`)}},ge=async()=>{try{let o=await wn(Je(v.get(),A.get()));f(o===null?"Export cancelled":`Exported ${o}`)}catch(o){f(`Export failed: ${String(o)}`)}},he=async()=>{try{let o=await at();if(o===null)return f("Config file not found");let u=await z(o);f(u?"Reloaded from config file":"Reload failed: invalid config")}catch(o){f(`Reload failed: ${String(o)}`)}},be=o=>{window.confirm(`Overwrite "${o.name}" with the current speed, pitch and effects?`)&&(A.update(o.id,{speed:e.speed,pitchShifts:e.pitchShifts,pitchSemitones:e.pitchSemitones,effects:e.effects}),f(`Updated "${o.name}"`))},T=o=>{window.confirm(`Delete preset "${o.name}"?`)&&(A.remove(o.id),f(`Deleted "${o.name}"`))};return l.default.createElement("div",{style:{paddingBottom:8}},l.default.createElement(Ye,null,l.default.createElement(m.LunaSettings,{title:"Playback",desc:"Speed and pitch. Effects live in their own section below."},l.default.createElement(m.LunaTextSetting,{title:"Minimum speed",desc:"Below 0.0625\xD7 Chromium plays at its floor.",defaultValue:Z(B.min),inputProps:{inputMode:"decimal"},onChange:o=>{let u=Xt(o.target.value);u!==void 0&&v.setBounds({min:u})}}),l.default.createElement(m.LunaTextSetting,{title:"Maximum speed",defaultValue:Z(B.max),inputProps:{inputMode:"decimal"},onChange:o=>{let u=Xt(o.target.value);u!==void 0&&v.setBounds({max:u})}}),l.default.createElement(m.LunaTextSetting,{title:"Snap step",desc:"Slider snapping and the \u2212 / + step size.",defaultValue:Z(B.step),inputProps:{inputMode:"decimal"},onChange:o=>{let u=Xt(o.target.value);u!==void 0&&v.setBounds({step:u})}}),l.default.createElement(m.LunaSwitchSetting,{title:"Pitch follows speed",desc:"Chipmunk / slow-mo. Clears any custom pitch shift.",checked:le,onChange:o=>v.setPitchShifts(o.target.checked)}),l.default.createElement(m.LunaSetting,{title:"Reset",desc:"Back to 1.00\xD7, no pitch shift, effects unchanged."},l.default.createElement("div",{style:Te},l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>v.reset()},"Reset playback"))))),l.default.createElement(Ye,null,l.default.createElement(m.LunaSettings,{title:"Presets",desc:"Capture speed, pitch and effects. Nightcore is fixed; custom presets can be applied, renamed, updated, reordered and deleted."},n.map((o,u)=>{let ne=e.presetId===o.id&&!Qe(o,e);return l.default.createElement(m.LunaSetting,{key:o.id,title:`${o.name}${ne?" *":""}`,desc:Lr(o)},l.default.createElement("div",{style:Te},e.presetId===o.id?l.default.createElement("span",{style:{fontSize:12,opacity:.7}},"Active"):l.default.createElement(m.LunaButton,{size:"small",onClick:()=>v.applyPreset(o)},"Use"),o.builtin===!0?l.default.createElement("span",{style:{fontSize:12,opacity:.6}},"Built-in"):l.default.createElement(l.default.Fragment,null,l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>x({id:o.id,name:o.name,value:o.name})},"Rename"),l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>be(o)},"Update"),l.default.createElement(m.LunaButton,{size:"small",variant:"text",disabled:u<=1,title:"Move up",onClick:()=>A.move(o.id,-1)},"\u2191"),l.default.createElement(m.LunaButton,{size:"small",variant:"text",disabled:u>=n.length-1,title:"Move down",onClick:()=>A.move(o.id,1)},"\u2193"),l.default.createElement(m.LunaButton,{size:"small",variant:"text",color:"error",onClick:()=>T(o)},"Delete"))))}),y!==null&&l.default.createElement(l.default.Fragment,null,l.default.createElement(m.LunaTextSetting,{title:`Rename ${y.name}`,defaultValue:y.value,onChange:o=>x({...y,value:o.target.value})}),l.default.createElement(m.LunaSetting,{title:" "},l.default.createElement("div",{style:Te},l.default.createElement(m.LunaButton,{size:"small",onClick:()=>{A.rename(y.id,y.value),x(null)}},"Save"),l.default.createElement(m.LunaButton,{size:"small",variant:"text",onClick:()=>x(null)},"Cancel")))))),l.default.createElement(Ye,null,l.default.createElement(m.LunaSettings,{title:"Effects",desc:"Same Web Audio chain as pitch. Needs audio capture \u2014 use the dev-mode self-test if nothing changes."},l.default.createElement(m.LunaSwitchSetting,{title:"Equalizer",desc:"8 bands, 62 Hz to 8 kHz, \xB112 dB. Drag a band; double-click resets it.",checked:S.eq.enabled,onChange:o=>W({enabled:o.target.checked})}),l.default.createElement(m.LunaSetting,{title:"Bands",desc:"Shift+arrow for 3 dB steps."},l.default.createElement(ca,{eq:S.eq,disabled:!S.eq.enabled,onChange:o=>W({bands:o})})),l.default.createElement(m.LunaSetting,{title:"Flatten",desc:"Set every band to 0 dB."},l.default.createElement("div",{style:Te},l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",disabled:!S.eq.enabled,onClick:()=>W({bands:Array.from({length:Ge},()=>0)})},"Flatten EQ"))),l.default.createElement(m.LunaSwitchSetting,{title:"Bass boost",desc:"Parallel low-shelf sub boost with saturation for dirty kicks. Added on top of the dry signal.",checked:S.bass.enabled,onChange:o=>N({enabled:o.target.checked})}),l.default.createElement(m.LunaTextSetting,{title:"Bass boost (dB)",desc:"Low shelf at 90 Hz, 0\u201324 dB.",defaultValue:String(Math.round(S.bass.boost)),inputProps:{inputMode:"numeric"},onChange:o=>{let u=F(o.target.value);u!==void 0&&N({boost:Math.max(0,Math.min(24,u))})}}),l.default.createElement(m.LunaTextSetting,{title:"Sub (dB)",desc:"Extra shelf at 45 Hz, 0\u201312 dB.",defaultValue:String(Math.round(S.bass.sub)),inputProps:{inputMode:"numeric"},onChange:o=>{let u=F(o.target.value);u!==void 0&&N({sub:Math.max(0,Math.min(12,u))})}}),l.default.createElement(m.LunaTextSetting,{title:"Drive (%)",desc:"Saturation on the bass path; more harmonics, dirtier kicks.",defaultValue:String(Math.round(S.bass.drive*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let u=F(o.target.value);u!==void 0&&N({drive:Math.max(0,Math.min(100,u))/100})}}),l.default.createElement(m.LunaTextSetting,{title:"Bass amount (%)",desc:"How much of the boosted bass is added back.",defaultValue:String(Math.round(S.bass.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let u=F(o.target.value);u!==void 0&&N({mix:Math.max(0,Math.min(100,u))/100})}}),l.default.createElement(m.LunaSwitchSetting,{title:"8D audio",desc:"LFO panning plus a constant pitch wobble, so the mix moves around your head.",checked:S.eightD.enabled,onChange:o=>R({enabled:o.target.checked})}),l.default.createElement(m.LunaTextSetting,{title:"8D pan rate (Hz)",desc:"How fast the sound travels left/right.",defaultValue:String(S.eightD.rate),inputProps:{inputMode:"decimal"},onChange:o=>{let u=F(o.target.value);u!==void 0&&R({rate:Math.max(.02,Math.min(2,u))})}}),l.default.createElement(m.LunaTextSetting,{title:"8D pan depth (%)",defaultValue:String(Math.round(S.eightD.panDepth*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let u=F(o.target.value);u!==void 0&&R({panDepth:Math.max(0,Math.min(100,u))/100})}}),l.default.createElement(m.LunaTextSetting,{title:"8D pitch rate (Hz)",desc:"Speed of the constant pitch wobble.",defaultValue:String(S.eightD.pitchRate),inputProps:{inputMode:"decimal"},onChange:o=>{let u=F(o.target.value);u!==void 0&&R({pitchRate:Math.max(.02,Math.min(2,u))})}}),l.default.createElement(m.LunaTextSetting,{title:"8D pitch depth (ms)",desc:"Delay modulation depth; higher = wider pitch smear.",defaultValue:String(S.eightD.pitchDepth),inputProps:{inputMode:"decimal"},onChange:o=>{let u=F(o.target.value);u!==void 0&&R({pitchDepth:Math.max(0,Math.min(12,u))})}}),l.default.createElement(m.LunaSwitchSetting,{title:"Delay",desc:"Feedback delay.",checked:S.delay.enabled,onChange:o=>_({enabled:o.target.checked})}),l.default.createElement(m.LunaTextSetting,{title:"Delay time (ms)",defaultValue:String(Math.round(S.delay.timeMs)),inputProps:{inputMode:"numeric"},onChange:o=>{let u=F(o.target.value);u!==void 0&&_({timeMs:Math.max(20,Math.min(2e3,u))})}}),l.default.createElement(m.LunaTextSetting,{title:"Delay feedback (%)",defaultValue:String(Math.round(S.delay.feedback*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let u=F(o.target.value);u!==void 0&&_({feedback:Math.max(0,Math.min(90,u))/100})}}),l.default.createElement(m.LunaTextSetting,{title:"Delay mix (%)",defaultValue:String(Math.round(S.delay.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let u=F(o.target.value);u!==void 0&&_({mix:Math.max(0,Math.min(100,u))/100})}}),l.default.createElement(m.LunaSwitchSetting,{title:"Reverb",desc:"Generated impulse response.",checked:S.reverb.enabled,onChange:o=>Q({enabled:o.target.checked})}),l.default.createElement(m.LunaTextSetting,{title:"Reverb decay (s)",defaultValue:String(S.reverb.decay),inputProps:{inputMode:"decimal"},onChange:o=>{let u=F(o.target.value);u!==void 0&&Q({decay:Math.max(.2,Math.min(8,u))})}}),l.default.createElement(m.LunaTextSetting,{title:"Reverb mix (%)",defaultValue:String(Math.round(S.reverb.mix*100)),inputProps:{inputMode:"numeric"},onChange:o=>{let u=F(o.target.value);u!==void 0&&Q({mix:Math.max(0,Math.min(100,u))/100})}}))),l.default.createElement(Ye,null,l.default.createElement(m.LunaSettings,{title:"Config file",desc:"Versioned JSON, editable outside Luna. Autosaves 300 ms after changes."},l.default.createElement(m.LunaSetting,{title:"Path",desc:c},l.default.createElement("div",{style:Te},l.default.createElement(m.LunaButton,{size:"small",variant:"text",onClick:()=>{Dt(c)}},"Copy path"))),l.default.createElement(m.LunaSetting,{title:"Actions",desc:s===""?void 0:s},l.default.createElement("div",{style:Te},l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Pn()}},"Show folder"),l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{he()}},"Reload"),l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{me()}},"Import\u2026"),l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{ge()}},"Export\u2026"))))),l.default.createElement(Ye,null,l.default.createElement(m.LunaSettings,{title:"Developer",desc:"Logs and test tools are off unless you need to report a bug."},l.default.createElement(m.LunaSwitchSetting,{title:"Developer mode",desc:"Write diagnostics logs and show the Copy diagnostics action.",checked:V,onChange:o=>v.setDeveloperMode(o.target.checked)}),V&&l.default.createElement(m.LunaSetting,{title:"Audio engine self-test",desc:C},l.default.createElement("div",{style:Te},l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",disabled:w,onClick:async()=>{g(!0);try{let o=await oa();P(o.ok?`OK \xB7 ${o.context} \xB7 rms ${o.rms} \xB7 peak ${o.peak} \xB7 \u0394${o.progressionSeconds}s`:`Failed \xB7 ${o.reason??"unknown"} \xB7 context ${o.context}`)}finally{g(!1)}}},w?"Testing\u2026":"Run test"))),V&&l.default.createElement(m.LunaButtonSetting,{title:"Diagnostics",desc:"Copy player, pitch-engine, effects, theme and media state plus recent logs.",children:r,onClick:async()=>{i("Copying\u2026");let o=await Re(v.get());i(o?"Copied":"Copy failed")}}))))};var ht=new Set,{trace:ua}=(0,Se.Tracer)("[PlaybackKit]"),Nr=1e3,Ar=1500,Zt="tidaluna.playback-speed.previous-quality",ba=()=>{try{return localStorage.getItem(Zt)}catch{return null}},Dr=e=>{try{localStorage.setItem(Zt,e)}catch{}},ya=()=>{try{localStorage.removeItem(Zt)}catch{}},va=e=>{let t=de.redux.actions["settings/SET_STREAMING_QUALITY"];typeof t=="function"?t(e):de.redux.store.dispatch({type:"settings/SET_STREAMING_QUALITY",payload:e})},pa=()=>{let t=(0,Se.findModuleByProperty)((n,a)=>n==="activePlayer"&&typeof a=="object"&&a!==null)?.activePlayer;if(t===void 0)return{found:!1};try{let n=Object.getPrototypeOf(t),a=n===null?[]:Object.getOwnPropertyNames(n).filter(i=>{try{return typeof t[i]=="function"}catch{return!1}}).slice(0,60),r=i=>{try{return t[i]}catch{return}};return{found:!0,name:r("name"),constructor:t.constructor?.name,state:r("playbackState")??r("state"),currentTime:r("currentTime"),methods:a,hasSetPlaybackRate:a.includes("setPlaybackRate"),hasMediaElement:!!(r("mediaElement")??r("video")??r("element"))}}catch(n){return{found:!0,error:String(n)}}},fa=()=>{let t=(0,Se.findModuleByProperty)((n,a)=>n==="activePlayer"&&typeof a=="object"&&a!==null)?.activePlayer?.name;return t==="nativePlayer"?"native":t==="shakaPlayer"?"shaka":t==="browserPlayer"?"browser":"unknown"},ma,Ir=()=>(ma??=(0,Se.findModuleByProperty)((e,t)=>e==="activePlayer"&&typeof t=="object"&&t!==null),ma?.activePlayer),Sa=()=>{if(Pe()==="native"){let n=Ir()?.currentTime;return typeof n=="number"&&Number.isFinite(n)?n:null}let e=te(),t=e.find(n=>!n.paused&&n.readyState>0)??e.find(n=>n.readyState>0);return t===void 0?null:t.currentTime},Rr=()=>{try{return de.redux.store.getState().playbackControls?.playbackState==="PLAYING"}catch{return!1}},Hr=e=>{let t=de.redux.actions["playbackControls/TIME_UPDATE"];typeof t=="function"?t(e):de.redux.store.dispatch({type:"playbackControls/TIME_UPDATE",payload:e})},Br=()=>{try{let e=de.redux.store.getState().playbackControls;if(e===void 0)return null;let t=e.latestCurrentTime??0;return e.playbackState!=="PLAYING"?t:t+Math.abs(Date.now()-(e.latestCurrentTimeSyncTimestamp??Date.now()))/1e3}catch{return null}},ga={getSpeed:()=>v.get().speed,isPlaying:Rr,getPosition:Sa,dispatchTimeUpdate:Hr},_r=()=>{try{let e=de.redux.store.getState(),t=e.playQueue,n=t?.elements?.[t.currentIndex??-1]?.mediaItemId;if(n===void 0)return null;let a=e.content?.mediaItems?.[String(n)];return a===void 0?{id:n,found:!1}:{id:n,found:!0,title:a.title,bpm:a.bpm??null,key:a.key??a.keyScale??null,metadataKeys:Object.keys(a).filter(r=>/bpm|key|tempo|tone/i.test(r))}}catch(e){return{error:String(e)}}},xa=!1,Oe,en=()=>Je(v.get(),A.get()),ha=()=>{xa&&(Oe!==void 0&&clearTimeout(Oe),Oe=setTimeout(()=>{Oe=void 0,De(en()).catch(e=>h("error","config save failed",{error:String(e)}))},300))},Or=async()=>{try{let e=await at(),t=e===null?void 0:tt(e),n=await nt();t!==void 0?(v.replace(t.settings),A.replace(t.presets),h("info","config loaded",{path:n,speed:t.settings.speed,presets:t.presets.length})):(await De(en()),h("info",e===null?"config created":"config invalid, rewrote defaults",{path:n}))}catch(e){h("warn","config file unavailable; using browser storage only",{error:String(e)})}finally{xa=!0}},qr=()=>{try{let e=de.redux.actions["router/PUSH"];if(typeof e!="function")throw new Error("router/PUSH is unavailable");e({pathname:"/not-found",search:"LunaSettings",replace:!0}),h("info","opening Luna settings"),setTimeout(()=>{let n=[...document.querySelectorAll('[role="tab"]')].find(a=>(a.textContent??"").trim()==="Plugins");n!==void 0&&n.getAttribute("aria-selected")!=="true"&&n.click(),setTimeout(()=>{[...document.querySelectorAll("h1,h2,h3,h4,h5,h6,span,p,div")].find(i=>(i.textContent??"").trim()==="@kyoto-aircon/playback-kit")?.scrollIntoView({block:"center",behavior:"smooth"})},250)},250)}catch(e){h("error","open Luna settings failed",{error:String(e)})}},$r=()=>{try{let t=de.redux.store.getState().settings?.quality?.streaming;if(t==="HIGH"){h("info","already on the browser player quality");return}h("info","switching streaming quality to HIGH",{from:t}),typeof t=="string"&&Dr(t),va("HIGH")}catch(e){h("error","quality switch failed",{error:String(e)})}},Fr=()=>{let e=ba();e!==null&&(h("info","restoring streaming quality",{to:e}),va(e),ya())},zr=e=>{let t={version:Ie,logs:Cn,logText:Nt,report:()=>At(v.get()),copy:()=>Re(v.get()),clear:Nn,setVerbose:An,selectors:rt,playerKind:Pe,audioEngine:I,native:ft,store:v,controller:e};globalThis.__playbackSpeed=t,ht.add(()=>{globalThis.__playbackSpeed===t&&delete globalThis.__playbackSpeed})};try{Ct(v.get().developerMode),In(pa);try{let d=Se.LunaPlugin.getByName("@kyoto-aircon/playback-speed");d!==void 0&&h("warn","old Playback Speed plugin is still installed",{enabled:d.store?.enabled})}catch{}Hn(()=>({kind:Pe(),native:ft(),nativeInstance:Yn(),speed:v.get().speed,track:_r(),audioEngine:I(),effects:jn(),pitchSemitones:v.get().pitchSemitones,pitchEngine:Kt(),presetId:v.get().presetId,uiTime:Br(),actualTime:Sa()})),zt(),h("info","loading",{version:Ie,selectors:rt(),media:te().length,settings:v.get(),tidal:pa(),native:ft()});let e=qn();ht.add(()=>$n(e));let t=new ut(te,v);t.start();let n=v.subscribe(d=>{Ct(d.developerMode),ha(),h("info","settings changed",{speed:d.speed,pitchShifts:d.pitchShifts,bounds:d.bounds}),t.apply(),Pe()==="native"&&Gt(d.speed),Vt(ga),mt(d.pitchSemitones,te()),$t(d.effects,te())});A.subscribe(ha),Or(),Kn(ht,v,{getPlayerKind:Pe,subscribePlayerKind:ta,useBrowserPlayer:$r,previousQuality:ba,restoreQuality:Fr,presets:{list:()=>A.get(),apply:d=>{v.applyPreset(d),h("info","preset applied",{id:d.id,name:d.name})},clear:()=>v.clearPreset(),save:(d,s)=>A.save(d,s),saveActive:d=>{let s=na(v,A,d);h("info","saved preset from live state",{id:s?.id,builtin:d.builtin===!0})}},getPitchEngineState:Kt,openSettings:qr,onOpen:()=>{let d=v.get().pitchSemitones;d!==0&&mt(d,te())}}),zr(t);let r=setInterval(()=>{t.scan();let d=v.get().pitchSemitones;d!==0&&mt(d,te());let s=v.get().effects;Ze(s)&&$t(s,te())},Nr),i=aa(ga);Ut(fa());let c=setInterval(()=>{zt();let d=fa(),s=Pe();Ut(d),d!==s&&d==="native"&&(Gt(v.get().speed),ya())},Ar);ht.add(()=>{Oe!==void 0&&(clearTimeout(Oe),De(en()).catch(()=>{})),clearInterval(r),clearInterval(c),i(),n(),t.stop(),ea()}),ua.log("loaded")}catch(e){h("error","failed to load",{error:String(e),stack:e?.stack}),ua.err("Failed to load:",e)}export{Cr as Settings,ht as unloads};
//# sourceMappingURL=kyoto-aircon.playback-kit.mjs.map
