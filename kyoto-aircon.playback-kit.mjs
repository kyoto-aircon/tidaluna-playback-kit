var Ia=Object.create;var hn=Object.defineProperty;var Aa=Object.getOwnPropertyDescriptor;var Ra=Object.getOwnPropertyNames;var Ba=Object.getPrototypeOf,Ha=Object.prototype.hasOwnProperty;var nt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var _a=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Ra(t))!Ha.call(e,r)&&r!==n&&hn(e,r,{get:()=>t[r],enumerable:!(a=Aa(t,r))||a.enumerable});return e};var Ce=(e,t,n)=>(n=e!=null?Ia(Ba(e)):{},_a(t||!e||!e.__esModule?hn(n,"default",{value:e,enumerable:!0}):n,e));var bn=nt((Xr,Pt)=>{Pt.exports=luna?.core?.modules?.["@luna/core"];if(Pt.exports===void 0)throw new Error("Cannot find module @luna/core in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/core")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var Mt=nt((Zr,Tt)=>{Tt.exports=luna?.core?.modules?.["@luna/lib"];if(Tt.exports===void 0)throw new Error("Cannot find module @luna/lib in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/lib")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var tn=nt((Gi,en)=>{en.exports=luna?.core?.modules?.react;if(en.exports===void 0)throw new Error("Cannot find module react in luna.core.modules");luna.core.LunaPlugin.getByName("react")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var la=nt((Ki,nn)=>{nn.exports=luna?.core?.modules?.["@luna/ui"];if(nn.exports===void 0)throw new Error("Cannot find module @luna/ui in luna.core.modules");luna.core.LunaPlugin.getByName("@luna/ui")?.addDependant(luna.core.LunaPlugin.getByName("@kyoto-aircon/playback-kit"))});var xe=Ce(bn(),1),pe=Ce(Mt(),1);var De=[62,125,250,500,1e3,2e3,4e3,8e3],Ke=De.length,ge=-12,X=12,E={eq:{enabled:!1,bands:Array.from({length:Ke},()=>0)},bass:{enabled:!1,boost:6,sub:3,drive:.2,mix:.6},eightD:{enabled:!1,rate:.12,panDepth:.8,pitchRate:.3,pitchDepth:4},delay:{enabled:!1,timeMs:250,feedback:.25,mix:.25},reverb:{enabled:!1,decay:2,mix:.25}},N=(e,t,n,a)=>{let r=typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(r)?Math.min(n,Math.max(t,r)):a},Ge=(e,t)=>typeof e=="boolean"?e:t,Oa=e=>{let t=Array.from({length:Ke},()=>0);if(Array.isArray(e.bands)){for(let i=0;i<Ke;i+=1)t[i]=N(e.bands[i],ge,X,0);return t}let n=N(e.low,ge,X,0),a=N(e.mid,ge,X,0),r=N(e.high,ge,X,0);return[n,n,a,a,a,r,r,r]},$=e=>{let t=typeof e=="object"&&e!==null?e:{},n=typeof t.eq=="object"&&t.eq!==null?t.eq:{},a=typeof t.eightD=="object"&&t.eightD!==null?t.eightD:{},r=typeof t.bass=="object"&&t.bass!==null?t.bass:{},i=typeof t.delay=="object"&&t.delay!==null?t.delay:{},c=typeof t.reverb=="object"&&t.reverb!==null?t.reverb:{};return{eq:{enabled:Ge(n.enabled,E.eq.enabled),bands:Oa(n)},eightD:{enabled:Ge(a.enabled,E.eightD.enabled),rate:N(a.rate,.02,2,E.eightD.rate),panDepth:N(a.panDepth,0,1,E.eightD.panDepth),pitchRate:N(a.pitchRate,.02,2,E.eightD.pitchRate),pitchDepth:N(a.pitchDepth,0,12,E.eightD.pitchDepth)},bass:{enabled:Ge(r.enabled,E.bass.enabled),boost:N(r.boost,0,24,E.bass.boost),sub:N(r.sub,0,12,E.bass.sub),drive:N(r.drive,0,1,E.bass.drive),mix:N(r.mix,0,1,E.bass.mix)},delay:{enabled:Ge(i.enabled,E.delay.enabled),timeMs:N(i.timeMs,20,2e3,E.delay.timeMs),feedback:N(i.feedback,0,.9,E.delay.feedback),mix:N(i.mix,0,1,E.delay.mix)},reverb:{enabled:Ge(c.enabled,E.reverb.enabled),decay:N(c.decay,.2,8,E.reverb.decay),mix:N(c.mix,0,1,E.reverb.mix)}}},at=e=>e.eq.enabled||e.bass.enabled||e.eightD.enabled||e.delay.enabled||e.reverb.enabled,yn=e=>{let t=[];return e.eq.enabled&&t.push("EQ 8-band"),e.eightD.enabled&&t.push(`8D ${e.eightD.rate.toFixed(2)} Hz`),e.bass.enabled&&t.push(`Bass +${Math.round(e.bass.boost)} dB`),e.delay.enabled&&t.push(`Delay ${Math.round(e.delay.timeMs)} ms`),e.reverb.enabled&&t.push(`Reverb ${e.reverb.decay.toFixed(1)} s`),t.length===0?"No effects enabled":t.join(" \xB7 ")};var Z=e=>Number.isFinite(e)?Math.max(-12,Math.min(12,Math.round(e))):0,vn=e=>2**(Z(e)/12),Ue=e=>{let t=Z(e);return`${t>0?"+":""}${t}`};var je={min:.05,max:10,step:.05},We=1;var qa=6,Ne=(e,t=qa)=>{let n=10**t;return Math.round(e*n)/n},rt=(e,t,n)=>Math.min(n,Math.max(t,e)),be=e=>{let t=Number(e?.min),n=Number.isFinite(t)?Ne(Math.max(.01,t)):je.min,a=Number(e?.max),r=Number.isFinite(a)?Ne(Math.max(n+.01,a)):Math.max(n+.01,je.max),i=Number(e?.step),c=Number.isFinite(i)&&i>0?Ne(i):je.step;return{min:n,max:r,step:c}},$a=(e,t)=>{let{min:n,step:a}=t,r=n+Math.round((e-n)/a)*a;return Ne(r)},he=(e,t)=>{let n=be(t),a=Number.isFinite(e)?e:We,r=$a(a,n);return rt(Ne(r),n.min,n.max)},Sn=(e,t,n)=>{let a=be(n),r=he(e,a);return he(r+t*a.step,a)},Fa=e=>{let t=e.includes(".")?e.replace(/0+$/,"").replace(/\.$/,""):e;return t===""||t==="-0"?"0":t},ee=e=>Number.isFinite(e)?Fa(e.toFixed(4)):String(We),Ie=e=>`${ee(e)}\xD7`,Ve=(e,t)=>{let{min:n,max:a}=be(t);if(!(a>n))return 0;let r=Math.log(rt(e,n,a)/n)/Math.log(a/n);return rt(Number.isFinite(r)?r:0,0,1)},xn=(e,t)=>{let n=be(t),a=n.min*Math.pow(n.max/n.min,rt(e,0,1));return he(a,n)},kn=e=>{let{min:t,max:n}=be(e),a=[t,1,2,5,10,n],r=new Set,i=[];for(let o of a.sort((d,f)=>d-f)){if(o<t||o>n)continue;let d=ee(o);r.has(d)||(r.add(d),i.push(Ne(o)))}let c=[];for(let o of i){let d=c[c.length-1];d!==void 0&&Ve(o,e)-Ve(d,e)<.07||c.push(o)}return c};var Ga="tidaluna.playback-kit.v1",Ka="tidaluna.playback-speed.v1",Qe=()=>({speed:We,pitchShifts:!1,pitchSemitones:0,presetId:null,developerMode:!1,builtinPresets:!0,effects:$(void 0),bounds:{...je}}),wn=e=>{if(e===null)return Qe();let t;try{t=JSON.parse(e)}catch{return Qe()}if(typeof t!="object"||t===null)return Qe();let n=t,a=be(n.bounds),r=Z(typeof n.pitchSemitones=="number"?n.pitchSemitones:0);return{speed:he(typeof n.speed=="number"?n.speed:We,a),pitchShifts:r===0&&n.pitchShifts===!0,pitchSemitones:r,presetId:typeof n.presetId=="string"?n.presetId:null,developerMode:n.developerMode===!0,builtinPresets:n.builtinPresets!==!1,effects:$(n.effects),bounds:a}},Ua=(e,t)=>{let n=e.getItem(t);if(n!==null)return wn(n);let a=e.getItem(Ka);if(a===null)return Qe();let r=wn(a);return r.presetId=null,r},ja=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&e.presetId===t.presetId&&e.developerMode===t.developerMode&&e.builtinPresets===t.builtinPresets&&JSON.stringify(e.effects)===JSON.stringify(t.effects)&&e.bounds.min===t.bounds.min&&e.bounds.max===t.bounds.max&&e.bounds.step===t.bounds.step,Lt=(e,t=Ga)=>{let n=Ua(e,t),a=new Set,r=()=>({...n,bounds:{...n.bounds}}),i=o=>{if(ja(n,o))return;n=o;try{e.setItem(t,JSON.stringify(n))}catch{}let d=r();for(let f of[...a])try{f(d)}catch(y){console.error("[PlaybackKit] listener failed",y)}},c=o=>({...n,...o});return{get:r,subscribe(o){return a.add(o),()=>a.delete(o)},setSpeed(o){i(c({speed:he(o,n.bounds)}))},step(o){i(c({speed:Sn(n.speed,o,n.bounds)}))},setPitchShifts(o){i(c({pitchShifts:o,pitchSemitones:o?0:n.pitchSemitones}))},setPitchSemitones(o){let d=Z(o);i(c({pitchSemitones:d,pitchShifts:d===0?n.pitchShifts:!1}))},setBounds(o){let d=be({...n.bounds,...o});i({...n,bounds:d,speed:he(n.speed,d)})},applyPreset(o){let d=Z(o.pitchSemitones);i({...n,speed:he(o.speed,n.bounds),pitchShifts:d===0&&o.pitchShifts===!0,pitchSemitones:d,effects:$(o.effects),presetId:o.id})},setEffects(o){i({...n,effects:$(o)})},setDeveloperMode(o){i({...n,developerMode:o})},setBuiltinPresets(o){i({...n,builtinPresets:o})},clearPreset(){i({...n,presetId:null})},replace(o){let d=be(o.bounds),f=Z(o.pitchSemitones);i({speed:he(o.speed,d),pitchShifts:f===0&&o.pitchShifts===!0,pitchSemitones:f,presetId:typeof o.presetId=="string"?o.presetId:null,developerMode:o.developerMode===!0,builtinPresets:o.builtinPresets!==!1,effects:$(o.effects),bounds:d})},reset(){i({...Qe(),developerMode:n.developerMode,effects:n.effects,presetId:null,bounds:{...n.bounds}})},destroy(){a.clear()}}},En=new Map,Ct=()=>{try{if(typeof localStorage<"u"){let e="__lunakit_probe__";return localStorage.setItem(e,"1"),localStorage.removeItem(e),localStorage}}catch{}return{getItem:e=>En.get(e)??null,setItem:(e,t)=>{En.set(e,t)}}},v=Lt(Ct());var Va="tidaluna.playback-kit.presets.v1",It="nightcore",Ye=e=>$({...E,...e,eq:{...E.eq,...e.eq??{}},bass:{...E.bass,...e.bass??{}},eightD:{...E.eightD,...e.eightD??{}},delay:{...E.delay,...e.delay??{}},reverb:{...E.reverb,...e.reverb??{}}}),Wa={id:It,name:"Nightcore",speed:1.35,pitchShifts:!0,pitchSemitones:0,effects:Ye({}),builtin:!0},Qa={id:"slowcore",name:"Slowcore",speed:.8,pitchShifts:!0,pitchSemitones:0,effects:Ye({reverb:{enabled:!0,decay:4,mix:.35}}),builtin:!0},Ja={id:"big-bass",name:"Big Bass",speed:1,pitchShifts:!1,pitchSemitones:0,effects:Ye({eq:{enabled:!0,bands:[3,2,0,0,0,0,0,1]},bass:{enabled:!0,boost:14,sub:6,drive:.5,mix:1}}),builtin:!0},Ya={id:"eight-d",name:"8D Orbit",speed:1,pitchShifts:!1,pitchSemitones:0,effects:Ye({eightD:{enabled:!0,rate:.1,panDepth:.85,pitchRate:.3,pitchDepth:4}}),builtin:!0},Xa={id:"dub-echo",name:"Dub Echo",speed:1,pitchShifts:!1,pitchSemitones:0,effects:Ye({delay:{enabled:!0,timeMs:450,feedback:.45,mix:.28}}),builtin:!0},Pn=[Wa,Qa,Ja,Ya,Xa],Je=new Set(Pn.map(e=>e.id)),Za=24,er=.05,tr=16,Dt=e=>{if(typeof e!="string")return;let t=e.trim().slice(0,Za);return t===""?void 0:t},Nt=e=>{let t=Number(e);return Number.isFinite(t)?Math.max(er,Math.min(tr,t)):1},Tn=(e,t)=>{if(typeof e!="object"||e===null)return;let n=e,a=typeof n.id=="string"?n.id:void 0,r=Dt(n.name);if(!(a===void 0||r===void 0||Je.has(a)||t.has(a)))return t.add(a),{id:a,name:r,speed:Nt(n.speed),pitchShifts:n.pitchShifts===!0,pitchSemitones:Z(typeof n.pitchSemitones=="number"?n.pitchSemitones:0),effects:$(n.effects)}},nr=e=>{if(e===null)return[];let t;try{t=JSON.parse(e)}catch{return[]}if(!Array.isArray(t))return[];let n=new Set,a=[];for(let r of t){let i=Tn(r,n);i!==void 0&&a.push(i)}return a},ar=(e,t)=>{if(e.eq.enabled!==t.eq.enabled||e.eq.bands.length!==t.eq.bands.length)return!1;for(let i=0;i<e.eq.bands.length;i+=1)if(e.eq.bands[i]!==t.eq.bands[i])return!1;let n=["enabled","boost","sub","drive","mix"];for(let i of n)if(e.bass[i]!==t.bass[i])return!1;let a=["enabled","rate","panDepth","pitchRate","pitchDepth"];for(let i of a)if(e.eightD[i]!==t.eightD[i])return!1;let r=["enabled","timeMs","feedback","mix"];for(let i of r)if(e.delay[i]!==t.delay[i])return!1;return e.reverb.enabled===t.reverb.enabled&&e.reverb.decay===t.reverb.decay&&e.reverb.mix===t.reverb.mix},Xe=(e,t)=>e.speed===t.speed&&e.pitchShifts===t.pitchShifts&&e.pitchSemitones===t.pitchSemitones&&ar(e.effects,t.effects),At=(e,t=Va)=>{let n=nr(e.getItem(t)),a=new Set,r=0,i=()=>{try{e.setItem(t,JSON.stringify(n))}catch{}},c=()=>{for(let d of[...a])try{d()}catch{}},o=()=>[...Pn.map(d=>({...d})),...n.map(d=>({...d}))];return{get:o,getById(d){return o().find(f=>f.id===d)},save(d,f){let y=Dt(d);if(y===void 0)return;r+=1;let x={id:`custom-${Date.now().toString(36)}-${r}`,name:y,speed:Nt(f.speed),pitchShifts:f.pitchShifts===!0,pitchSemitones:Z(f.pitchSemitones),effects:$(f.effects)};return n.push(x),i(),c(),{...x}},remove(d){if(Je.has(d))return!1;let f=n.filter(y=>y.id!==d);return f.length===n.length?!1:(n=f,i(),c(),!0)},rename(d,f){if(Je.has(d))return!1;let y=Dt(f),x=n.find(w=>w.id===d);return y===void 0||x===void 0?!1:(x.name=y,i(),c(),!0)},update(d,f){if(Je.has(d))return!1;let y=n.find(x=>x.id===d);return y===void 0?!1:(y.speed=Nt(f.speed),y.pitchShifts=f.pitchShifts===!0,y.pitchSemitones=Z(f.pitchSemitones),y.effects=$(f.effects),i(),c(),!0)},move(d,f){if(Je.has(d))return!1;let y=n.findIndex(g=>g.id===d),x=y+Math.sign(f);if(y<0||x<0||x>=n.length)return!1;let[w]=n.splice(y,1);return n.splice(x,0,w),i(),c(),!0},replace(d){let f=new Set;n=d.filter(y=>y.builtin!==!0).map(y=>Tn(y,f)).filter(y=>y!==void 0),i(),c()},subscribe(d){return a.add(d),()=>a.delete(d)}}},L=At(Ct());var Rt=1,Mn=e=>({getItem:()=>e,setItem:()=>{}}),it=e=>{if(e==null)return;let t;try{t=JSON.parse(e)}catch{return}if(typeof t!="object"||t===null)return;let n=t;if(n.version!==Rt)return;let a=Lt(Mn(JSON.stringify(n.settings??{}))).get(),r=At(Mn(JSON.stringify(n.presets??[]))).get().filter(c=>c.builtin!==!0),i=new Set([It,...r.map(c=>c.id)]);return a.presetId!==null&&!i.has(a.presetId)&&(a.presetId=null),{version:Rt,settings:a,presets:r}},Ze=(e,t)=>`${JSON.stringify({version:Rt,settings:e,presets:t.filter(n=>n.builtin!==!0)},null,2)}
`;var we=await __ipcRenderer.invoke("__Luna.registerNative","@kyoto-aircon/playback-kit/config.native.ts",'"use strict";var p=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var h=Object.prototype.hasOwnProperty;var P=(e,n)=>{for(var t in n)p(e,t,{get:n[t],enumerable:!0})},w=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of m(n))!h.call(e,s)&&s!==t&&p(e,s,{get:()=>n[s],enumerable:!(o=d(n,s))||o.enumerable});return e};var y=e=>w(p({},"__esModule",{value:!0}),e);var A={};P(A,{exportConfig:()=>F,getConfigPath:()=>k,importConfig:()=>S,readConfig:()=>v,revealConfig:()=>D,writeConfig:()=>x});module.exports=y(A);var l=require,i=l("path"),r=()=>l("fs/promises"),b=()=>l("fs"),u=()=>l("electron"),g=()=>process.env.HOME??process.env.USERPROFILE??"",f=()=>process.platform==="win32"?process.env.APPDATA??i.join(g(),"AppData","Roaming"):process.platform==="darwin"?i.join(g(),"Library","Application Support"):i.join(g(),".config"),j=()=>{let e=f(),n=b(),t=[],o=process.resourcesPath;o!==void 0&&(t.push(i.basename(i.dirname(i.dirname(o)))),t.push(i.basename(i.dirname(o)))),t.push("TIDAL","Tidal","tidal","tidal-hifi");for(let s of t)if(!(s===""||s==="Contents"||s==="resources")&&n.existsSync(i.join(e,s)))return s;return"TIDAL"},c=()=>i.join(f(),j(),"playback-kit"),a=()=>i.join(c(),"config.json"),k=async()=>a(),v=async()=>{try{return await r().readFile(a(),"utf8")}catch{return null}},x=async e=>{await r().mkdir(c(),{recursive:!0});let n=`${a()}.tmp`;return await r().writeFile(n,e,"utf8"),await r().rename(n,a()),a()},F=async e=>{let t=await u().dialog.showSaveDialog({title:"Export Playback Kit config",defaultPath:i.join(f(),"playback-kit.json"),filters:[{name:"JSON",extensions:["json"]}]});return t.canceled||t.filePath===void 0?null:(await r().writeFile(t.filePath,e,"utf8"),t.filePath)},S=async()=>{let n=await u().dialog.showOpenDialog({title:"Import Playback Kit config",properties:["openFile"],filters:[{name:"JSON",extensions:["json"]}]}),t=n.filePaths[0];return n.canceled||t===void 0?null:{path:t,json:await r().readFile(t,"utf8")}},D=async()=>{await r().mkdir(c(),{recursive:!0}),await u().shell.openPath(c())};0&&(module.exports={exportConfig,getConfigPath,importConfig,readConfig,revealConfig,writeConfig});\n');if(we===void 0)throw new Error("Failed to register native module @kyoto-aircon/playback-kit/config.native.ts");var Ln=(...e)=>__ipcRenderer.invoke(we,"exportConfig",...e),ot=(...e)=>__ipcRenderer.invoke(we,"getConfigPath",...e),Cn=(...e)=>__ipcRenderer.invoke(we,"importConfig",...e),st=(...e)=>__ipcRenderer.invoke(we,"readConfig",...e),Dn=(...e)=>__ipcRenderer.invoke(we,"revealConfig",...e),Ae=(...e)=>__ipcRenderer.invoke(we,"writeConfig",...e);var Re="2.12.0";var Se=[],Nn=!0,In=!1,An=e=>{if(e!==void 0)try{return JSON.parse(JSON.stringify(e))}catch{try{return String(e)}catch{return"[unserialisable]"}}},Bt=e=>{In=e,e||(Se.length=0)};var h=(e,t,n)=>{if(!In)return;let a={at:Date.now(),level:e,message:t,data:An(n)};if(Se.push(a),Se.length>500&&Se.shift(),!(e==="debug"&&!Nn))try{let r=e==="error"?console.error:e==="warn"?console.warn:console.debug;n===void 0?r(`[PlaybackKit] ${t}`):r(`[PlaybackKit] ${t}`,n)}catch{}},Rn=()=>Se.map(e=>({...e})),Ht=()=>Se.map(e=>`${new Date(e.at).toISOString()} ${e.level.toUpperCase().padEnd(5)} ${e.message}${e.data===void 0?"":` ${JSON.stringify(e.data)}`}`).join(`
`),Bn=()=>{Se.length=0},Hn=e=>{Nn=e};var rr=e=>({tag:e.tagName.toLowerCase(),id:e.id,class:typeof e.className=="string"?e.className:"",src:(e.currentSrc||e.src||"").slice(0,140),paused:e.paused,readyState:e.readyState,networkState:e.networkState,currentTime:Number(e.currentTime.toFixed(3)),duration:Number.isFinite(e.duration)?Number(e.duration.toFixed(3)):e.duration,playbackRate:e.playbackRate,defaultPlaybackRate:e.defaultPlaybackRate,preservesPitch:e.preservesPitch,muted:e.muted,volume:e.volume,connected:e.isConnected,parent:e.parentElement===null?null:e.parentElement.id||e.parentElement.className}),ir=()=>typeof document>"u"?[]:[...document.querySelectorAll("video,audio")].map(rr),dt=()=>{if(typeof document>"u")return{};let e=document.getElementById("tidal-player-root");return{playerRoot:e!==null,rootChildCount:e?.children.length??0,rootChildren:e===null?[]:[...e.children].map(t=>`${t.tagName.toLowerCase()}#${t.id||"-"}`),scopedMedia:document.querySelectorAll("#tidal-player-root video, #tidal-player-root audio").length,videoOne:document.getElementById("video-one")!==null,videoTwo:document.getElementById("video-two")!==null,allMedia:document.querySelectorAll("video,audio").length,footer:document.querySelector('[data-test="footer-player"]')!==null}},or=e=>new Promise(t=>setTimeout(t,e)),sr=async(e=1500)=>{if(typeof document>"u")return[];let t=[...document.querySelectorAll("video,audio")],n=t.map(a=>({id:a.id,tag:a.tagName.toLowerCase(),time:a.currentTime,paused:a.paused}));return await or(e),t.map((a,r)=>{let i=n[r],c=a.currentTime-i.time,o=e/1e3;return{id:i.id,tag:i.tag,paused:a.paused,deltaSeconds:Number(c.toFixed(3)),observedRate:Number((c/o).toFixed(3)),expectedRate:a.playbackRate}})},_n,On=e=>{_n=e},qn,$n=e=>{qn=e},dr=()=>{try{return qn?.()??{}}catch(e){return{error:String(e)}}},lr=()=>{try{return _n?.()??{registered:!1}}catch(e){return{error:String(e)}}},cr=["--wave-color-solid-accent-fill","--wave-color-solid-accent-bright","--wave-color-solid-base-fill","--wave-color-solid-base-brighter","--wave-color-solid-base-brightest","--wave-color-solid-contrast-fill","--wave-color-solid-contrast-dark","--wave-color-opacity-contrast-fill-ultra-thin","--wave-color-opacity-contrast-fill-thin","--wave-color-opacity-contrast-fill-thick","--wave-color-solid-warning-fill","--wave-color-text-danger","--market-core-text-10-color","--market-core-text-20-color","--market-core-fill-white-color","--baseFontSize","--baseLineHeight","--remRatio"],ur=()=>{if(typeof document>"u")return{};let e=document.getElementById("wimp")??document.querySelector('[data-test="footer-player"]')??document.documentElement,t=getComputedStyle(e),n={};for(let r of cr){let i=t.getPropertyValue(r).trim();i!==""&&(n[r]=i)}let a=r=>{let i=document.querySelector(r);if(i===null)return null;let c=getComputedStyle(i);return{color:c.color,background:c.backgroundColor,fontFamily:c.fontFamily,fontSize:c.fontSize,lineHeight:c.lineHeight,borderRadius:c.borderRadius,height:c.height}};return{root:e.id!==""?`#${e.id}`:e.tagName.toLowerCase(),fontSize:t.fontSize,fontFamily:t.fontFamily,tokens:n,elements:{footer:a('[data-test="footer-player"]'),utilityButtons:a('[data-test="footer-player"] [class*="utilityButtons"]'),volume:a('[data-test="footer-player"] [class*="sliderContainer"]'),qualityBadge:a("[data-test-quality-badge-streaming-quality]"),progressBar:a('[data-test="progress-bar"]')}}},_t=async e=>{h("info","building diagnostics report");let t=await sr();return[`Playback Kit v${Re}`,`at: ${new Date().toISOString()}`,`url: ${typeof location>"u"?"?":location.href}`,`ua: ${typeof navigator>"u"?"?":navigator.userAgent}`,`visibility: ${typeof document>"u"?"?":document.visibilityState}`,`settings: ${JSON.stringify(An(e))}`,`selectors: ${JSON.stringify(dt())}`,`player: ${JSON.stringify(dr())}`,`tidal: ${JSON.stringify(lr())}`,`progression: ${JSON.stringify(t)}`,`media: ${JSON.stringify(ir())}`,`theme: ${JSON.stringify(ur())}`,"",`--- logs (${Se.length}) ---`,Ht()].join(`
`)},Be=async e=>Ot(await _t(e)),Ot=async e=>{try{if(typeof navigator<"u"&&navigator.clipboard?.writeText!==void 0)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}catch{return!1}};var pr=400,Fn=100,fr=5e-4,le,He,Ee,_e,te=[],zn=new WeakMap,qt=0,lt=new Map,Gn=e=>new Promise(t=>setTimeout(t,e)),ce=async()=>{if(le===void 0){let e=window.AudioContext??window.webkitAudioContext;if(e===void 0)throw new Error("Web Audio is unavailable");le=new e({latencyHint:"playback"}),h("info","audio context created",{sampleRate:le.sampleRate,state:le.state})}if(le.state==="suspended")try{await Promise.race([le.resume(),Gn(250)])}catch{}return le},$t=()=>{if(He===void 0||Ee===void 0)return;He.disconnect();for(let t of te)try{t.output.disconnect()}catch{}let e=He;for(let t of te)e.connect(t.input),e=t.output;e.connect(Ee)},ct=async()=>{let e=await ce();return(He===void 0||Ee===void 0)&&(He=e.createGain(),Ee=e.createGain(),_e=e.createAnalyser(),_e.fftSize=2048,Ee.connect(_e),Ee.connect(e.destination)),$t(),{ctx:e,input:He,output:Ee}},Ft=async(e,t)=>{if(lt.has(t))return lt.get(t);let n=await ce(),a=URL.createObjectURL(new Blob([e],{type:"text/javascript"})),r=(async()=>{let i;try{await Promise.race([n.audioWorklet.addModule(a),new Promise((c,o)=>{i=setTimeout(()=>o(new Error(`Timed out loading worklet ${t}`)),pr*10)})])}finally{i!==void 0&&clearTimeout(i),URL.revokeObjectURL(a)}})();lt.set(t,r);try{await r}catch(i){throw lt.delete(t),i}},Pe=async e=>{let{ctx:t,input:n}=await ct();if(zn.has(e))return;if(e.mediaKeys!==null&&e.mediaKeys!==void 0)throw new Error("protected media (DRM) cannot be routed through Web Audio");let a=t.createMediaElementSource(e);a.connect(n),zn.set(e,a),qt+=1,h("info","audio engine attached element",{id:e.id,sources:qt})},zt=async(e,t)=>{await ut(e,e,t)},ut=async(e,t,n)=>{if(await ct(),te.some(r=>r.input===e))return;let a=n===void 0?te.length:Math.max(0,Math.min(te.length,n));te.splice(a,0,{input:e,output:t}),$t(),h("debug","audio engine inserted group",{index:a,nodes:te.length})},mr=async e=>{await ct();let t=te.findIndex(a=>a.input===e||a.output===e);if(t<0)return!1;let[n]=te.splice(t,1);try{n.output.disconnect()}catch{}return $t(),!0},gr=()=>te.map(e=>e.input),A=()=>({context:le===void 0?"none":le.state,sampleRate:le?.sampleRate,sources:qt,nodes:te.length}),Gt=async(e=1200)=>{let{ctx:t}=await ct();if(_e===void 0)throw new Error("analyser unavailable");let n=Math.max(1,Math.round(e/Fn)),a=new Float32Array(_e.fftSize),r=0,i=0,c=0;for(let d=0;d<n;d+=1){if(await Gn(Fn),t.state!=="running")continue;_e.getFloatTimeDomainData(a);let f=0,y=0;for(let x of a){let w=Math.abs(x);w>f&&(f=w),y+=x*x}r=Math.max(r,f),i+=y/a.length,c+=1}let o=c===0?0:Math.sqrt(i/c);return{rms:o,peak:r,samples:c,silent:o<fr,durationMs:e}},hr=()=>({version:1,ensureContext:ce,loadWorklet:Ft,attach:Pe,insert:zt,insertGroup:ut,remove:mr,list:gr,status:A,measureRms:Gt}),Kn=()=>{let e=hr();return globalThis.__playbackKitAudio=e,e},Un=e=>{globalThis.__playbackKitAudio===e&&delete globalThis.__playbackKitAudio};var Wn=Ce(Mt(),1);var jn=`
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
`;var Kt=1e4,Vn=12,pt=8,vr=1e3,Sr='<svg class="lunaspeed-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21a9 9 0 1 1 9-9"/><path d="M12 12l5-4"/></svg>',Ut=(e,t,n)=>Math.min(n,Math.max(t,e)),xr=()=>document.querySelector('[data-test="footer-player"] [class*="utilityButtons"]'),kr=e=>{switch(e){case"HI_RES_LOSSLESS":return"Max";case"HI_RES":return"Hi-Res";case"LOSSLESS":return"Lossless";case"HIGH":return"High";case"LOW":return"Low";default:return e}},Qn=(e,t,n={})=>{new Wn.StyleTag("lunaspeed-styles",e,jn);let a=document.createElement("div");a.className="lunaspeed-ctl",a.dataset.lunaspeed="control";let r=document.createElement("button");r.type="button",r.className="lunaspeed-step",r.textContent="\u2212",r.setAttribute("aria-label","Slower");let i=document.createElement("button");i.type="button",i.className="lunaspeed-pill",i.setAttribute("aria-label","Playback speed"),i.setAttribute("aria-haspopup","dialog"),i.innerHTML=`${Sr}<span class="lunaspeed-pill-label"></span>`;let c=i.querySelector(".lunaspeed-pill-label"),o=document.createElement("button");o.type="button",o.className="lunaspeed-step",o.textContent="+",o.setAttribute("aria-label","Faster"),a.append(r,i,o);let d=document.createElement("div");d.className="lunaspeed-popover",d.setAttribute("role","dialog"),d.setAttribute("aria-label","Playback settings"),d.hidden=!0,d.innerHTML=`
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
			<input class="lunaspeed-range" type="range" min="0" max="${Kt}" step="1" aria-label="Playback speed slider" />
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
		</div>`;let f=d.querySelector(".lunaspeed-value"),y=d.querySelector(".lunaspeed-presets"),x=d.querySelector(".lunaspeed-save"),w=d.querySelector(".lunaspeed-save-input"),g=d.querySelector(".lunaspeed-save-cancel"),D=d.querySelector(".lunaspeed-slider"),T=d.querySelector(".lunaspeed-range"),H=d.querySelector(".lunaspeed-ticks"),fe=d.querySelector(".lunaspeed-pitch-value"),W=[...d.querySelectorAll(".lunaspeed-pitch-step")],S=d.querySelector(".lunaspeed-switch"),ae=d.querySelector(".lunaspeed-reset"),I=d.querySelector(".lunaspeed-copy"),re=d.querySelector(".lunaspeed-settings"),G=d.querySelector(".lunaspeed-pitch-dot"),_=d.querySelector(".lunaspeed-warning"),R=d.querySelector(".lunaspeed-warning-action"),Q=d.querySelector(".lunaspeed-quality"),ie=d.querySelector(".lunaspeed-quality-action"),me="",ve="",M=!1,J=!1,O,oe,s=u=>{D.style.setProperty("--lunaspeed-pos",String(Ut(u,0,1)))},p=(u,b)=>{let k=Ve(u,b);T.value=String(Math.round(k*Kt)),s(k)},xt=()=>{let{bounds:u}=t.get(),b=`${u.min}:${u.max}`;b!==me&&(me=b,H.replaceChildren(...kn(u).map(k=>{let P=document.createElement("span");return P.className="lunaspeed-tick",P.style.left=`${(Ve(k,u)*100).toFixed(3)}%`,P.textContent=Ie(k),P})))},Ma=u=>u===null?"Custom":n.presets?.list().find(b=>b.id===u)?.name??"Custom",dn=()=>{let u=n.presets;if(u===void 0){y.hidden=!0,x.hidden=!0;return}let b=u.list(),k=t.get(),P=k.presetId,B=b.find(C=>C.id===P),Y=B!==void 0&&!Xe(B,k),se=`${b.map(C=>`${C.id}:${C.name}`).join("|")}::${P??""}::${Y}`;if(se===ve)return;ve=se;let K=[],q=document.createElement("button");q.type="button",q.className="lunaspeed-preset",q.textContent="Custom",q.dataset.active=String(P===null),q.addEventListener("click",()=>u.clear()),K.push(q);for(let C of b){let de=document.createElement("button");de.type="button",de.className="lunaspeed-preset";let gn=P===C.id;de.textContent=gn&&Y?`${C.name} *`:C.name,de.dataset.active=String(gn),de.dataset.builtin=String(C.builtin===!0),de.title=`${C.name} \u2014 ${Ie(C.speed)}${C.pitchShifts?", pitch follows speed":C.pitchSemitones!==0?`, ${Ue(C.pitchSemitones)} st`:""}`,de.addEventListener("click",()=>u.apply(C)),K.push(de)}let ke=document.createElement("button");ke.type="button",ke.className="lunaspeed-save-toggle",ke.textContent="Save preset",ke.addEventListener("click",()=>{if(x.hidden=!x.hidden,x.hidden)return;let C=b.find(de=>de.id===t.get().presetId);w.value=C===void 0?"":C.builtin===!0?`${C.name} (edited)`:C.name,w.focus(),w.select()}),K.push(ke),y.replaceChildren(...K)},La=(u,b)=>{fe.textContent=`${Ue(u)} st`;for(let k of W){let P=Number(k.dataset.delta);k.disabled=P<0?u<=-12:u>=12,k.title=P<0?"Lower pitch by 1 semitone":"Raise pitch by 1 semitone"}S.setAttribute("aria-checked",String(b))},ln=u=>{let b=n.getPitchEngineState?.(),k=u===0?"idle":b?.status??"idle";G.dataset.status=k;let P=k==="running"?"Pitch engine active":k==="waiting"?"Pitch engine waiting for the audio element":k==="unavailable"?"Pitch engine unavailable"+(b?.reason===void 0?"":": "+b.reason):k==="ready"?"Pitch engine ready":"Pitch engine idle";G.title=u===0?"":P,G.setAttribute("aria-label",u===0?"":P)},kt=u=>{_.hidden=u!=="native";let b=n.previousQuality?.()??null,k=u!=="native"&&b!==null;Q.hidden=!k,k&&b!==null&&(ie.textContent=`Restore ${kr(b)}`)},wt=()=>{let u=t.get(),{speed:b,pitchShifts:k,pitchSemitones:P,bounds:B,presetId:Y}=u,se=Ie(b);c.textContent=se,i.dataset.active=String(b!==1||k||P!==0);let K=n.presets?.list().find(ke=>ke.id===Y),q=K!==void 0&&!Xe(K,u);i.title=`Playback ${se}${Y===null?"":` \xB7 ${Ma(Y)}${q?" *":""}`}`,r.setAttribute("aria-label",`Slower by ${Ie(B.step)}`),o.setAttribute("aria-label",`Faster by ${Ie(B.step)}`),r.title=`\u2212${ee(B.step)}\xD7`,o.title=`+${ee(B.step)}\xD7`,f.textContent=ee(b),J||p(b,B),T.setAttribute("aria-valuetext",se),xt(),dn(),La(P,k),ln(P),I.hidden=!u.developerMode,M&&Et()},Et=()=>{let u=i.getBoundingClientRect(),b=d.offsetWidth||348,k=d.offsetHeight||240,P=Ut(u.left+u.width/2-b/2,pt,window.innerWidth-b-pt),B=u.top-k-Vn,Y="top";B<pt&&(B=Math.min(u.bottom+Vn,window.innerHeight-k-pt),Y="bottom"),d.style.left=`${Math.round(P)}px`,d.style.top=`${Math.round(B)}px`,d.dataset.side=Y;let se=Ut(u.left+u.width/2-P,18,b-18);d.style.setProperty("--lunaspeed-caret",`${Math.round(se)}px`)},cn=u=>{let b=u.target;b!==null&&(d.contains(b)||a.contains(b)||Le())},un=u=>{u.key==="Escape"&&(u.preventDefault(),Le(),i.focus())},pn=()=>{M&&Et()},Ca=()=>{M||(M=!0,d.hidden=!1,i.dataset.open="true",wt(),kt(n.getPlayerKind?.()??"unknown"),Et(),n.onOpen?.(),document.addEventListener("pointerdown",cn,!0),document.addEventListener("keydown",un,!0),window.addEventListener("resize",pn),O=setInterval(()=>ln(t.get().pitchSemitones),500),h("debug","popover open"))},Le=()=>{M&&(M=!1,d.hidden=!0,delete i.dataset.open,x.hidden=!0,O!==void 0&&(clearInterval(O),O=void 0),document.removeEventListener("pointerdown",cn,!0),document.removeEventListener("keydown",un,!0),window.removeEventListener("resize",pn))},Da=()=>M?Le():Ca(),fn=()=>{if(!a.isConnected){M&&Le();let b=xr();if(b===null)return;let k=b.querySelector('[class*="sliderContainer"]');k!==null&&k.parentElement===b?b.insertBefore(a,k):b.appendChild(a)}let u=document.getElementById("wimp")??document.body;d.parentElement!==u&&u.appendChild(d)};r.addEventListener("click",()=>t.step(-1)),o.addEventListener("click",()=>t.step(1)),i.addEventListener("click",Da),T.addEventListener("pointerdown",()=>{J=!0,oe!==void 0&&clearTimeout(oe),delete D.dataset.settling});let $e=()=>{if(!J)return;J=!1;let{speed:u,bounds:b}=t.get();D.dataset.settling="true",p(u,b),oe!==void 0&&clearTimeout(oe),oe=setTimeout(()=>{oe=void 0,delete D.dataset.settling},160)};T.addEventListener("change",$e),window.addEventListener("pointerup",$e),window.addEventListener("pointercancel",$e),T.addEventListener("input",()=>{if(T.disabled)return;let u=Number(T.value)/Kt,b=t.get().bounds;s(u),t.setSpeed(xn(u,b))}),d.addEventListener("keydown",u=>{u.key==="ArrowLeft"||u.key==="ArrowDown"?(u.preventDefault(),t.step(-1)):(u.key==="ArrowRight"||u.key==="ArrowUp")&&(u.preventDefault(),t.step(1))});for(let u of W)u.addEventListener("click",()=>{let b=Number(u.dataset.delta);t.setPitchSemitones(t.get().pitchSemitones+b)});S.addEventListener("click",()=>t.setPitchShifts(!t.get().pitchShifts)),ae.addEventListener("click",()=>t.reset()),x.addEventListener("submit",u=>{u.preventDefault();let b=n.presets;if(b===void 0)return;let k=w.value.trim();if(k==="")return;let{speed:P,pitchShifts:B,pitchSemitones:Y,effects:se}=t.get(),K=b.list().find(q=>q.id===t.get().presetId);if(K!==void 0&&K.builtin!==!0&&k===K.name)b.saveActive(K);else{let q=b.save(k,{speed:P,pitchShifts:B,pitchSemitones:Y,effects:se});if(q===void 0)return;b.apply(q)}w.value="",x.hidden=!0,ve="",dn(),h("info","preset saved",{name:k})}),g.addEventListener("click",()=>{x.hidden=!0,w.value=""}),re.hidden=n.openSettings===void 0,re.addEventListener("click",()=>{n.openSettings?.(),Le()});let Fe;I.addEventListener("click",async()=>{Fe!==void 0&&clearTimeout(Fe),I.disabled=!0,I.textContent="Copying\u2026";let u=await Be(t.get());h(u?"info":"error","diagnostics copied",{copied:u}),I.textContent=u?"Copied":"Copy failed",Fe=setTimeout(()=>{I.textContent="Copy diagnostics",I.disabled=!1},1800)});let ze;R.addEventListener("click",()=>{n.useBrowserPlayer!==void 0&&(ze!==void 0&&clearTimeout(ze),R.disabled=!0,R.textContent="Switching\u2026",n.useBrowserPlayer(),h("info","requested browser player from warning"),ze=setTimeout(()=>{R.disabled=!1,R.textContent="Use browser player"},2500))}),ie.addEventListener("click",()=>{n.restoreQuality!==void 0&&(n.restoreQuality(),Q.hidden=!0,h("info","restored original streaming quality"))}),kt(n.getPlayerKind?.()??"unknown");let mn=n.subscribePlayerKind?.(kt);mn!==void 0&&e.add(mn),fn(),wt(),e.add(t.subscribe(wt));let Na=setInterval(fn,vr);e.add(()=>{clearInterval(Na),window.removeEventListener("pointerup",$e),window.removeEventListener("pointercancel",$e),Fe!==void 0&&clearTimeout(Fe),ze!==void 0&&clearTimeout(ze),oe!==void 0&&clearTimeout(oe),Le(),d.remove(),a.remove()})};var ye,Oe={built:!1,active:[],attached:0},Jn=()=>({...Oe}),wr=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Er=(e,t)=>{let n=Math.max(1,Math.floor(e.sampleRate*t)),a=e.createBuffer(2,n,e.sampleRate);for(let r=0;r<2;r+=1){let i=a.getChannelData(r);for(let c=0;c<n;c+=1){let o=Math.pow(1-c/n,2.2);i[c]=(Math.random()*2-1)*o}}return a},Pr=async()=>{let e=await ce();if(ye!==void 0)return ye;let t=e.createGain(),n=De.map((M,J)=>{let O=e.createBiquadFilter();return O.frequency.value=M,J===0?O.type="lowshelf":J===De.length-1?O.type="highshelf":(O.type="peaking",O.Q.value=1.2),O}),a=e.createGain(),r=e.createDelay(2),i=e.createGain(),c=e.createGain(),o=e.createGain(),d=e.createBiquadFilter();d.type="lowpass",d.frequency.value=220,d.Q.value=.7;let f=e.createBiquadFilter();f.type="lowshelf",f.frequency.value=45;let y=e.createBiquadFilter();y.type="lowshelf",y.frequency.value=90;let x=e.createGain(),w=e.createWaveShaper(),g=new Float32Array(2048);for(let M=0;M<g.length;M+=1){let J=M/(g.length-1)*2-1;g[M]=Math.tanh(3*J)/Math.tanh(3)}w.curve=g,w.oversample="4x";let D=e.createGain(),T=e.createDynamicsCompressor();T.threshold.value=-3,T.knee.value=0,T.ratio.value=20,T.attack.value=.003,T.release.value=.25;let H=e.createGain(),fe=e.createDelay(.05);fe.delayTime.value=.015;let W=e.createStereoPanner(),S=e.createGain(),ae=e.createOscillator();ae.type="sine",ae.frequency.value=.12;let I=e.createGain();I.gain.value=0;let re=e.createOscillator();re.type="sine",re.frequency.value=.3;let G=e.createGain();G.gain.value=0,ae.connect(I),I.connect(W.pan),re.connect(G),G.connect(fe.delayTime),ae.start(),re.start(),H.connect(fe),fe.connect(W),W.connect(S);let _=e.createGain(),R=e.createGain(),Q=e.createConvolver(),ie=e.createGain(),me=e.createGain();t.connect(n[0]);for(let M=1;M<n.length;M+=1)n[M-1].connect(n[M]);let ve=n[n.length-1];return ve.connect(o),o.connect(H),ve.connect(d),d.connect(f),f.connect(y),y.connect(x),x.connect(w),w.connect(D),D.connect(H),S.connect(a),S.connect(r),a.connect(_),r.connect(i),i.connect(_),r.connect(c),c.connect(r),_.connect(R),R.connect(T),_.connect(Q),Q.connect(ie),ie.connect(T),T.connect(me),ye={fxIn:t,eqFilters:n,delayDry:a,delayNode:r,delayWet:i,delayFeedback:c,bassDry:o,bassLowpass:d,bassSub:f,bassBoost:y,bassDrive:x,bassShaper:w,bassWet:D,eightDInput:H,eightDDelay:fe,eightDPanner:W,eightDOut:S,panLfo:ae,panDepth:I,pitchLfo:re,pitchDepth:G,limiter:T,reverbIn:_,reverbDry:R,convolver:Q,reverbWet:ie,fxOut:me,decay:0},await ut(t,me),h("info","effects graph inserted"),ye},Tr=(e,t)=>{if(ye===void 0)return;let n=e.currentTime,a=.06,r=ye;for(let d=0;d<r.eqFilters.length;d+=1){let f=t.eq.enabled?t.eq.bands[d]??0:0;r.eqFilters[d].gain.setTargetAtTime(f,n,a)}let i=t.bass.enabled?t.bass.mix:0;r.bassDry.gain.setTargetAtTime(1,n,a),r.bassWet.gain.setTargetAtTime(i,n,a),r.bassSub.gain.setTargetAtTime(t.bass.enabled?t.bass.sub:0,n,a),r.bassBoost.gain.setTargetAtTime(t.bass.enabled?t.bass.boost:0,n,a),r.bassDrive.gain.setTargetAtTime(t.bass.enabled?1+t.bass.drive*3:1,n,a),r.panLfo.frequency.setTargetAtTime(t.eightD.rate,n,a),r.panDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.panDepth:0,n,a),r.pitchLfo.frequency.setTargetAtTime(t.eightD.pitchRate,n,a),r.pitchDepth.gain.setTargetAtTime(t.eightD.enabled?t.eightD.pitchDepth/1e3:0,n,a);let c=t.delay.enabled?t.delay.mix:0;r.delayNode.delayTime.setTargetAtTime(Math.min(2,Math.max(.02,t.delay.timeMs/1e3)),n,a),r.delayFeedback.gain.setTargetAtTime(t.delay.enabled?t.delay.feedback:0,n,a),r.delayWet.gain.setTargetAtTime(c,n,a),r.delayDry.gain.setTargetAtTime(1-c,n,a);let o=t.reverb.enabled?t.reverb.mix:0;Math.abs(r.decay-t.reverb.decay)>.05&&(r.convolver.buffer=Er(e,t.reverb.decay),r.decay=t.reverb.decay),r.reverbWet.gain.setTargetAtTime(o,n,a),r.reverbDry.gain.setTargetAtTime(1-o,n,a)},jt=async(e,t)=>{let n=$(e),a=at(n);if(!a&&ye===void 0){Oe={...Oe,active:[]};return}try{let r=await ce();if(r.state!=="running"){Oe={built:ye!==void 0,context:r.state,active:[],error:"audio context suspended (interact with the page)",attached:A().sources};return}if(a){let c=wr(t);c!==void 0&&await Pe(c)}let i=await Pr();Tr(r,n),Oe={built:!0,context:r.state,active:[n.eq.enabled?"eq":"",n.bass.enabled?"bass":"",n.eightD.enabled?"8d":"",n.delay.enabled?"delay":"",n.reverb.enabled?"reverb":""].filter(c=>c!==""),attached:A().sources},i.decay===0&&n.reverb.enabled&&(i.decay=n.reverb.decay)}catch(r){let i=r instanceof Error?r.message:String(r);Oe={built:ye!==void 0,context:A().context,active:[],error:i,attached:A().sources},h("warn","effects engine unavailable",{error:i})}};var Zn="#tidal-player-root video, #tidal-player-root audio, #video-one, #video-two",Yn=["loadstart","loadedmetadata","canplay","playing","play","emptied","ratechange","seeked"],ft=.001,Xn=1,Mr=150,mt=e=>{let t=e.id;return typeof t=="string"?t:e.constructor.name},ne=()=>typeof document>"u"?[]:[...document.querySelectorAll(Zn)],gt=class{constructor(t,n){this.getElements=t;this.source=n}getElements;source;attachments=new Map;timers=new Set;start(){this.scan()}scan(){let t=this.getElements(),n=0;for(let a of t)this.attachments.has(a)||(this.attach(a),n+=1);n>0?h("info","attached media elements",{added:n,total:this.attachments.size,found:t.length}):t.length===0&&h("debug","no media elements found",{selector:Zn})}apply(){this.scan();for(let t of this.attachments.keys())this.applyTo(t,"settings-change")}stop(){for(let t of this.timers)clearTimeout(t);this.timers.clear();for(let[t,n]of this.attachments)n(),this.restore(t);this.attachments.clear(),h("info","controller stopped")}attach(t){let n=a=>{let r=this.source.get().speed,i=t.playbackRate;Math.abs(i-r)>ft&&h("warn","TIDAL reset the rate",{id:mt(t),event:a.type,before:i,desired:r,currentTime:t.currentTime}),this.applyTo(t,a.type),(a.type==="loadstart"||a.type==="emptied")&&this.scheduleReapply(t)};for(let a of Yn)t.addEventListener(a,n);this.attachments.set(t,()=>{for(let a of Yn)t.removeEventListener(a,n)}),h("info","attached",{id:mt(t),tag:t.constructor.name,rate:t.playbackRate}),this.applyTo(t,"attach")}applyTo(t,n){let{speed:a,pitchShifts:r}=this.source.get(),i=t.playbackRate;try{Math.abs(i-a)>ft&&(t.playbackRate=a),t.defaultPlaybackRate!==void 0&&Math.abs(t.defaultPlaybackRate-a)>ft&&(t.defaultPlaybackRate=a);let o=!r;t.preservesPitch!==void 0&&t.preservesPitch!==o&&(t.preservesPitch=o),t.webkitPreservesPitch!==void 0&&t.webkitPreservesPitch!==o&&(t.webkitPreservesPitch=o)}catch(o){h("error","failed to apply rate",{id:mt(t),reason:n,error:String(o)});return}let c=t.playbackRate;Math.abs(c-i)>ft&&h("debug","applied rate",{id:mt(t),reason:n,before:i,after:c,readback:c,defaultRate:t.defaultPlaybackRate})}scheduleReapply(t){let n=setTimeout(()=>{this.timers.delete(n),this.attachments.has(t)&&this.applyTo(t,"delayed-reapply")},Mr);this.timers.add(n)}restore(t){try{t.playbackRate=Xn,t.defaultPlaybackRate!==void 0&&(t.defaultPlaybackRate=Xn),t.preservesPitch!==void 0&&(t.preservesPitch=!0),t.webkitPreservesPitch!==void 0&&(t.webkitPreservesPitch=!0)}catch{}}};var ht="__lunaspeedPatched",j,U,ea=()=>{let t=globalThis.NativePlayerComponent;if(!(t===void 0||t.Player===void 0||t.Player.prototype===void 0))return t},Vt=e=>{let t=new Set,n=e,a=0;for(;n!==null&&a<4;){for(let r of Object.getOwnPropertyNames(n))t.add(r);n=Object.getPrototypeOf(n),a+=1}return[...t]},ta=e=>{let t=Vt(e),n=t.find(a=>/^set(playback|audio)?(rate|speed|tempo)$/i.test(a));return n!==void 0&&typeof e[n]=="function"?n:typeof e.playbackRate=="number"?"playbackRate":t.find(a=>/^(playbackRate|rate|speed)$/i.test(a)&&typeof e[a]=="number")},Lr=e=>{j!==e&&(j=e,U=ta(e),h("info","native player instance captured",{rateMember:U??null,ownKeys:Object.keys(e).slice(0,40),methods:Vt(e).slice(0,80)}))},Wt=()=>{let e=ea();if(e===void 0)return!1;let t=e.Player?.prototype;if(t===void 0)return!1;if(t[ht]===!0)return!0;try{Object.defineProperty(t,ht,{value:!0,enumerable:!1})}catch{return!1}for(let n of["play","load","pause","seek"]){let a=t[n];typeof a=="function"&&(t[n]=function(...i){try{Lr(this)}catch(c){h("error","native capture failed",{error:String(c)})}return a.apply(this,i)})}return h("info","native player component patched"),!0},na=()=>j!==void 0,Qt=e=>{if(j===void 0||(U===void 0&&(U=ta(j)),U===void 0))return!1;try{let t=j[U];if(U==="playbackRate"){if(t===e)return!0;j.playbackRate=e}else j[U](e);return h("info","native rate applied",{rate:e,member:U,readback:j[U]}),!0}catch(t){return h("error","native rate failed",{rate:e,member:U,error:String(t)}),!1}},bt=()=>{let e=ea();if(e===void 0)return{present:!1};let t=e.Player?.prototype,n=t===void 0?[]:Object.getOwnPropertyNames(t).filter(a=>a!==ht);return{present:!0,patched:t!==void 0&&t[ht]===!0,playerMethods:n.slice(0,100),rateMethods:n.filter(a=>/rate|speed|tempo|pitch/i.test(a)),instanceCaptured:j!==void 0,rateMember:U??null,instanceMethods:j===void 0?[]:Vt(j).slice(0,100)}};var aa=`
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
`;var ra="playback-kit-pitch",ue,V={status:"idle",semitones:0,attached:0},Jt=()=>({...V}),Cr=e=>e.find(t=>!t.paused&&t.readyState>0)??e.find(t=>t.readyState>0),Dr=async e=>(await Ft(aa,ra),ue===void 0&&(ue=new AudioWorkletNode(e,ra,{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2]}),await zt(ue,0),h("info","pitch node inserted into audio engine")),ue),Nr=async(e,t)=>{let n=await ce();if(n.state!=="running"){V={status:"waiting",reason:"audio context suspended (interact with the page)",semitones:e,context:n.state,attached:V.attached};return}let a=Cr(t);if(a===void 0){V={status:"waiting",reason:"no playing media element",semitones:e,context:n.state,attached:V.attached};return}await Pe(a);let i=(await Dr(n)).parameters.get("ratio");i!==void 0&&(i.value=vn(e)),V={status:"running",semitones:e,context:n.state,attached:A().sources}},yt=async(e,t)=>{if(e===0){if(ue!==void 0){let n=ue.parameters.get("ratio");n!==void 0&&(n.value=1)}V={...V,status:ue===void 0?"idle":"ready",semitones:0,reason:void 0};return}try{await Nr(e,t)}catch(n){let a=n instanceof Error?n.message:String(n);V={status:"unavailable",reason:a,semitones:e,attached:V.attached},h("error","pitch engine unavailable",{error:a})}},ia=()=>{if(ue!==void 0){let e=ue.parameters.get("ratio");e!==void 0&&(e.value=1)}V={...V,status:ue===void 0?"idle":"ready",semitones:0,reason:void 0}};var vt="unknown",Yt=new Set,Te=()=>vt,Xt=e=>{if(e!==vt){h("info","player kind changed",{from:vt,to:e}),vt=e;for(let t of[...Yt])try{t(e)}catch(n){h("error","player kind listener failed",{error:String(n)})}}},oa=e=>(Yt.add(e),()=>Yt.delete(e));var Ir=(e,t)=>{let n=new Set(e.get().map(r=>r.name));if(!n.has(t))return t;let a=2;for(;n.has(`${t} ${a}`);)a+=1;return`${t} ${a}`},sa=(e,t,n)=>{let a=e.get(),r={speed:a.speed,pitchShifts:a.pitchShifts,pitchSemitones:a.pitchSemitones,effects:a.effects};if(n.builtin===!0){let i=t.save(Ir(t,`${n.name} (edited)`),r);return i!==void 0&&e.applyPreset(i),i}return t.update(n.id,r),n},et=(e,t)=>{let n=e.get();n.builtinPresets||n.presetId===null||t.getById(n.presetId)?.builtin===!0&&e.clearPreset()};var Ar=e=>Math.abs(e-1)>.001,Zt=e=>{if(!Ar(e.getSpeed())||!e.isPlaying())return!1;let t=e.getPosition();return t===null||!Number.isFinite(t)||t<0?!1:(e.dispatchTimeUpdate(t),!0)},da=(e,t=100)=>{let n=setInterval(()=>Zt(e),t);return()=>clearInterval(n)};var l=Ce(tn(),1),m=Ce(la(),1);var ca=e=>({id:e.id,paused:e.paused,readyState:e.readyState,currentTime:Number(e.currentTime.toFixed(2)),playbackRate:e.playbackRate}),ua=async(e=1200)=>{let t=Date.now(),n=A(),a=ne(),r=a.find(g=>!g.paused&&g.readyState>0)??a[0];if(r===void 0){let g={at:t,ok:!1,reason:"no media element",context:n.context,engine:n};return h("warn","audio self-test: no media element"),g}let i=r.currentTime;try{await Pe(r)}catch(g){let D={at:t,ok:!1,reason:g instanceof Error?g.message:String(g),context:A().context,element:ca(r),engine:A()};return h("warn","audio self-test failed to attach",D),D}let c=await ce(),o=0,d=0,f=!0;try{let g=await Gt(e);o=g.rms,d=g.peak,f=g.silent}catch(g){h("error","audio self-test measurement failed",{error:String(g)})}let y=Number((r.currentTime-i).toFixed(2)),x=c.state!=="running"?`audio context ${c.state}`:r.paused?"playback is paused":f&&y>.2?"captured audio is silent (DRM-protected or already routed elsewhere)":f?"no audio measured":void 0,w={at:t,ok:x===void 0,reason:x,context:c.state,element:ca(r),progressionSeconds:y,rms:Number(o.toFixed(5)),peak:Number(d.toFixed(5)),silent:f,engine:A()};return h(w.ok?"info":"warn","audio self-test",w),w};var F=Ce(tn(),1);var Rr=132,pa=X-ge,an=e=>Math.max(ge,Math.min(X,e)),fa=e=>`${e>0?"+":""}${e}`,ma=e=>e>=1e3?`${e/1e3}k`:String(e),Br=({frequency:e,value:t,disabled:n,onChange:a})=>{let r=F.default.useRef(null),[i,c]=F.default.useState(null),o=g=>{let D=r.current;if(D===null)return;let T=D.getBoundingClientRect(),H=Math.max(0,Math.min(1,(g-T.top)/T.height));c(H*100),a(an(Math.round(X-H*pa)))},d=i??(X-t)/pa*100,f=50,y=Math.min(d,f),x=Math.abs(d-f),w=i===null;return F.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6,width:30,opacity:n?.4:1}},F.default.createElement("span",{style:{fontSize:10,fontVariantNumeric:"tabular-nums",color:"currentColor",opacity:.8}},fa(t)),F.default.createElement("div",{ref:r,role:"slider",tabIndex:n?-1:0,"aria-label":`${ma(e)} Hz`,"aria-valuemin":ge,"aria-valuemax":X,"aria-valuenow":t,"aria-valuetext":`${fa(t)} dB`,"aria-disabled":n,onPointerDown:g=>{n||(g.preventDefault(),g.currentTarget.setPointerCapture(g.pointerId),o(g.clientY))},onPointerMove:g=>{n||!g.currentTarget.hasPointerCapture(g.pointerId)||o(g.clientY)},onPointerUp:g=>{g.currentTarget.hasPointerCapture(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),c(null)},onPointerCancel:g=>{g.currentTarget.hasPointerCapture(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),c(null)},onDoubleClick:()=>{n||a(0)},onKeyDown:g=>{if(n)return;let D=g.shiftKey?3:1;if(g.key==="ArrowUp"||g.key==="ArrowRight")a(an(t+D));else if(g.key==="ArrowDown"||g.key==="ArrowLeft")a(an(t-D));else if(g.key==="Home")a(ge);else if(g.key==="End")a(X);else return;g.preventDefault()},style:{position:"relative",width:18,height:Rr,cursor:n?"default":"pointer",touchAction:"none",outline:"none"}},F.default.createElement("div",{style:{position:"absolute",left:"50%",top:0,bottom:0,width:5,transform:"translateX(-50%)",borderRadius:999,background:"color-mix(in srgb, currentColor 16%, transparent)"}}),F.default.createElement("div",{style:{position:"absolute",left:0,right:0,top:`${f}%`,height:1,background:"color-mix(in srgb, currentColor 28%, transparent)"}}),F.default.createElement("div",{style:{position:"absolute",left:"50%",width:5,transform:"translateX(-50%)",borderRadius:999,top:`${y}%`,height:`${x}%`,background:"var(--wave-color-solid-accent-fill, currentColor)",transition:w?"top 120ms ease, height 120ms ease":"none"}}),F.default.createElement("div",{style:{position:"absolute",left:"50%",top:`${d}%`,width:12,height:12,transform:"translate(-50%, -50%)",borderRadius:"50%",background:"currentColor",boxShadow:"0 0 0 3px color-mix(in srgb, var(--wave-color-solid-accent-fill, currentColor) 22%, transparent), 0 1px 3px rgba(0,0,0,.5)",transition:w?"top 120ms ease":"none"}})),F.default.createElement("span",{style:{fontSize:9,opacity:.6,letterSpacing:"-0.02em"}},ma(e)))},ga=({eq:e,disabled:t,onChange:n})=>F.default.createElement("div",{style:{display:"flex",gap:8,alignItems:"flex-end",marginLeft:"auto",padding:"2px 0"}},De.map((a,r)=>F.default.createElement(Br,{key:a,frequency:a,value:e.bands[r]??0,disabled:t,onChange:i=>{let c=[...e.bands];c[r]=i,n(c)}})));var rn=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)&&t>0?t:void 0},z=e=>{let t=Number(e.trim().replace(",","."));return Number.isFinite(t)?t:void 0},Hr=e=>{let t=e.pitchShifts?"pitch follows speed":e.pitchSemitones===0?"pitch preserved":`pitch ${Ue(e.pitchSemitones)} st`;return`${ee(e.speed)}\xD7 \xB7 ${t} \xB7 ${yn(e.effects)}`},Me={display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:6,marginLeft:"auto"},tt=({children:e})=>l.default.createElement("div",{style:{marginBottom:16}},e),_r=()=>{let[e,t]=l.default.useState(v.get),[n,a]=l.default.useState(L.get),[r,i]=l.default.useState("Copy diagnostics"),[c,o]=l.default.useState("Resolving\u2026"),[d,f]=l.default.useState(""),[y,x]=l.default.useState(null),[w,g]=l.default.useState(!1),[D,T]=l.default.useState("Attaches the playing element, measures captured RMS and reports blocked/silent reasons. May silence playback if capture fails; restart TIDAL to undo.");l.default.useEffect(()=>v.subscribe(t),[]),l.default.useEffect(()=>L.subscribe(()=>a(L.get())),[]),l.default.useEffect(()=>{ot().then(o).catch(()=>o("unavailable"))},[]),l.default.useEffect(()=>{if(r==="Copy diagnostics")return;let s=setTimeout(()=>i("Copy diagnostics"),1800);return()=>clearTimeout(s)},[r]),l.default.useEffect(()=>{if(d==="")return;let s=setTimeout(()=>f(""),4e3);return()=>clearTimeout(s)},[d]);let{bounds:H,pitchShifts:fe,developerMode:W,effects:S,builtinPresets:ae}=e,I=ae?n:n.filter(s=>s.builtin!==!0),re=I.findIndex(s=>s.builtin!==!0),G=s=>v.setEffects({...S,eq:{...S.eq,...s}}),_=s=>v.setEffects({...S,bass:{...S.bass,...s}}),R=s=>v.setEffects({...S,eightD:{...S.eightD,...s}}),Q=s=>v.setEffects({...S,delay:{...S.delay,...s}}),ie=s=>v.setEffects({...S,reverb:{...S.reverb,...s}}),me=async s=>{let p=it(s);return p===void 0?!1:(v.replace(p.settings),L.replace(p.presets),et(v,L),await Ae(Ze(p.settings,p.presets)),!0)},ve=async()=>{try{let s=await Cn();if(s===null)return f("Import cancelled");let p=await me(s.json);f(p?`Imported ${s.path}`:"Import failed: invalid config")}catch(s){f(`Import failed: ${String(s)}`)}},M=async()=>{try{let s=await Ln(Ze(v.get(),L.get()));f(s===null?"Export cancelled":`Exported ${s}`)}catch(s){f(`Export failed: ${String(s)}`)}},J=async()=>{try{let s=await st();if(s===null)return f("Config file not found");let p=await me(s);f(p?"Reloaded from config file":"Reload failed: invalid config")}catch(s){f(`Reload failed: ${String(s)}`)}},O=s=>{window.confirm(`Overwrite "${s.name}" with the current speed, pitch and effects?`)&&(L.update(s.id,{speed:e.speed,pitchShifts:e.pitchShifts,pitchSemitones:e.pitchSemitones,effects:e.effects}),f(`Updated "${s.name}"`))},oe=s=>{window.confirm(`Delete preset "${s.name}"?`)&&(L.remove(s.id),f(`Deleted "${s.name}"`))};return l.default.createElement("div",{style:{paddingBottom:8}},l.default.createElement(tt,null,l.default.createElement(m.LunaSettings,{title:"Playback",desc:"Speed and pitch. Effects live in their own section below."},l.default.createElement(m.LunaTextSetting,{title:"Minimum speed",desc:"Below 0.0625\xD7 Chromium plays at its floor.",defaultValue:ee(H.min),inputProps:{inputMode:"decimal"},onChange:s=>{let p=rn(s.target.value);p!==void 0&&v.setBounds({min:p})}}),l.default.createElement(m.LunaTextSetting,{title:"Maximum speed",defaultValue:ee(H.max),inputProps:{inputMode:"decimal"},onChange:s=>{let p=rn(s.target.value);p!==void 0&&v.setBounds({max:p})}}),l.default.createElement(m.LunaTextSetting,{title:"Snap step",desc:"Slider snapping and the \u2212 / + step size.",defaultValue:ee(H.step),inputProps:{inputMode:"decimal"},onChange:s=>{let p=rn(s.target.value);p!==void 0&&v.setBounds({step:p})}}),l.default.createElement(m.LunaSwitchSetting,{title:"Pitch follows speed",desc:"Chipmunk / slow-mo. Clears any custom pitch shift.",checked:fe,onChange:s=>v.setPitchShifts(s.target.checked)}),l.default.createElement(m.LunaSetting,{title:"Reset",desc:"Back to 1.00\xD7, no pitch shift, effects unchanged."},l.default.createElement("div",{style:Me},l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>v.reset()},"Reset playback"))))),l.default.createElement(tt,null,l.default.createElement(m.LunaSettings,{title:"Presets",desc:"Capture speed, pitch and effects. Built-ins are fixed; custom presets can be applied, renamed, updated, reordered and deleted."},l.default.createElement(m.LunaSwitchSetting,{title:"Built-in presets",desc:"Show Nightcore, Slowcore, Big Bass, 8D Orbit and Dub Echo.",checked:ae,onChange:s=>{let p=s.target.checked;v.setBuiltinPresets(p),et(v,L)}}),I.map((s,p)=>{let xt=e.presetId===s.id&&!Xe(s,e);return l.default.createElement(m.LunaSetting,{key:s.id,title:`${s.name}${xt?" *":""}`,desc:Hr(s)},l.default.createElement("div",{style:Me},e.presetId===s.id?l.default.createElement("span",{style:{fontSize:12,opacity:.7}},"Active"):l.default.createElement(m.LunaButton,{size:"small",onClick:()=>v.applyPreset(s)},"Use"),s.builtin===!0?l.default.createElement("span",{style:{fontSize:12,opacity:.6}},"Built-in"):l.default.createElement(l.default.Fragment,null,l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>x({id:s.id,name:s.name,value:s.name})},"Rename"),l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>O(s)},"Update"),l.default.createElement(m.LunaButton,{size:"small",variant:"text",disabled:p<=re,title:"Move up",onClick:()=>L.move(s.id,-1)},"\u2191"),l.default.createElement(m.LunaButton,{size:"small",variant:"text",disabled:p>=I.length-1,title:"Move down",onClick:()=>L.move(s.id,1)},"\u2193"),l.default.createElement(m.LunaButton,{size:"small",variant:"text",color:"error",onClick:()=>oe(s)},"Delete"))))}),y!==null&&l.default.createElement(l.default.Fragment,null,l.default.createElement(m.LunaTextSetting,{title:`Rename ${y.name}`,defaultValue:y.value,onChange:s=>x({...y,value:s.target.value})}),l.default.createElement(m.LunaSetting,{title:" "},l.default.createElement("div",{style:Me},l.default.createElement(m.LunaButton,{size:"small",onClick:()=>{L.rename(y.id,y.value),x(null)}},"Save"),l.default.createElement(m.LunaButton,{size:"small",variant:"text",onClick:()=>x(null)},"Cancel")))))),l.default.createElement(tt,null,l.default.createElement(m.LunaSettings,{title:"Effects",desc:"Same Web Audio chain as pitch. Needs audio capture \u2014 use the dev-mode self-test if nothing changes."},l.default.createElement(m.LunaSwitchSetting,{title:"Equalizer",desc:"8 bands, 62 Hz to 8 kHz, \xB112 dB. Drag a band; double-click resets it.",checked:S.eq.enabled,onChange:s=>G({enabled:s.target.checked})}),l.default.createElement(m.LunaSetting,{title:"Bands",desc:"Shift+arrow for 3 dB steps."},l.default.createElement(ga,{eq:S.eq,disabled:!S.eq.enabled,onChange:s=>G({bands:s})})),l.default.createElement(m.LunaSetting,{title:"Flatten",desc:"Set every band to 0 dB."},l.default.createElement("div",{style:Me},l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",disabled:!S.eq.enabled,onClick:()=>G({bands:Array.from({length:Ke},()=>0)})},"Flatten EQ"))),l.default.createElement(m.LunaSwitchSetting,{title:"Bass boost",desc:"Parallel low-shelf sub boost with saturation for dirty kicks. Added on top of the dry signal.",checked:S.bass.enabled,onChange:s=>_({enabled:s.target.checked})}),l.default.createElement(m.LunaTextSetting,{title:"Bass boost (dB)",desc:"Low shelf at 90 Hz, 0\u201324 dB.",defaultValue:String(Math.round(S.bass.boost)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&_({boost:Math.max(0,Math.min(24,p))})}}),l.default.createElement(m.LunaTextSetting,{title:"Sub (dB)",desc:"Extra shelf at 45 Hz, 0\u201312 dB.",defaultValue:String(Math.round(S.bass.sub)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&_({sub:Math.max(0,Math.min(12,p))})}}),l.default.createElement(m.LunaTextSetting,{title:"Drive (%)",desc:"Saturation on the bass path; more harmonics, dirtier kicks.",defaultValue:String(Math.round(S.bass.drive*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&_({drive:Math.max(0,Math.min(100,p))/100})}}),l.default.createElement(m.LunaTextSetting,{title:"Bass amount (%)",desc:"How much of the boosted bass is added back.",defaultValue:String(Math.round(S.bass.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&_({mix:Math.max(0,Math.min(100,p))/100})}}),l.default.createElement(m.LunaSwitchSetting,{title:"8D audio",desc:"LFO panning plus a constant pitch wobble, so the mix moves around your head.",checked:S.eightD.enabled,onChange:s=>R({enabled:s.target.checked})}),l.default.createElement(m.LunaTextSetting,{title:"8D pan rate (Hz)",desc:"How fast the sound travels left/right.",defaultValue:String(S.eightD.rate),inputProps:{inputMode:"decimal"},onChange:s=>{let p=z(s.target.value);p!==void 0&&R({rate:Math.max(.02,Math.min(2,p))})}}),l.default.createElement(m.LunaTextSetting,{title:"8D pan depth (%)",defaultValue:String(Math.round(S.eightD.panDepth*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&R({panDepth:Math.max(0,Math.min(100,p))/100})}}),l.default.createElement(m.LunaTextSetting,{title:"8D pitch rate (Hz)",desc:"Speed of the constant pitch wobble.",defaultValue:String(S.eightD.pitchRate),inputProps:{inputMode:"decimal"},onChange:s=>{let p=z(s.target.value);p!==void 0&&R({pitchRate:Math.max(.02,Math.min(2,p))})}}),l.default.createElement(m.LunaTextSetting,{title:"8D pitch depth (ms)",desc:"Delay modulation depth; higher = wider pitch smear.",defaultValue:String(S.eightD.pitchDepth),inputProps:{inputMode:"decimal"},onChange:s=>{let p=z(s.target.value);p!==void 0&&R({pitchDepth:Math.max(0,Math.min(12,p))})}}),l.default.createElement(m.LunaSwitchSetting,{title:"Delay",desc:"Feedback delay.",checked:S.delay.enabled,onChange:s=>Q({enabled:s.target.checked})}),l.default.createElement(m.LunaTextSetting,{title:"Delay time (ms)",defaultValue:String(Math.round(S.delay.timeMs)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&Q({timeMs:Math.max(20,Math.min(2e3,p))})}}),l.default.createElement(m.LunaTextSetting,{title:"Delay feedback (%)",defaultValue:String(Math.round(S.delay.feedback*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&Q({feedback:Math.max(0,Math.min(90,p))/100})}}),l.default.createElement(m.LunaTextSetting,{title:"Delay mix (%)",defaultValue:String(Math.round(S.delay.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&Q({mix:Math.max(0,Math.min(100,p))/100})}}),l.default.createElement(m.LunaSwitchSetting,{title:"Reverb",desc:"Generated impulse response.",checked:S.reverb.enabled,onChange:s=>ie({enabled:s.target.checked})}),l.default.createElement(m.LunaTextSetting,{title:"Reverb decay (s)",defaultValue:String(S.reverb.decay),inputProps:{inputMode:"decimal"},onChange:s=>{let p=z(s.target.value);p!==void 0&&ie({decay:Math.max(.2,Math.min(8,p))})}}),l.default.createElement(m.LunaTextSetting,{title:"Reverb mix (%)",defaultValue:String(Math.round(S.reverb.mix*100)),inputProps:{inputMode:"numeric"},onChange:s=>{let p=z(s.target.value);p!==void 0&&ie({mix:Math.max(0,Math.min(100,p))/100})}}))),l.default.createElement(tt,null,l.default.createElement(m.LunaSettings,{title:"Config file",desc:"Versioned JSON, editable outside Luna. Autosaves 300 ms after changes."},l.default.createElement(m.LunaSetting,{title:"Path",desc:c},l.default.createElement("div",{style:Me},l.default.createElement(m.LunaButton,{size:"small",variant:"text",onClick:()=>{Ot(c)}},"Copy path"))),l.default.createElement(m.LunaSetting,{title:"Actions",desc:d===""?void 0:d},l.default.createElement("div",{style:Me},l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{Dn()}},"Show folder"),l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{J()}},"Reload"),l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{ve()}},"Import\u2026"),l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",onClick:()=>{M()}},"Export\u2026"))))),l.default.createElement(tt,null,l.default.createElement(m.LunaSettings,{title:"Developer",desc:"Logs and test tools are off unless you need to report a bug."},l.default.createElement(m.LunaSwitchSetting,{title:"Developer mode",desc:"Write diagnostics logs and show the Copy diagnostics action.",checked:W,onChange:s=>v.setDeveloperMode(s.target.checked)}),W&&l.default.createElement(m.LunaSetting,{title:"Audio engine self-test",desc:D},l.default.createElement("div",{style:Me},l.default.createElement(m.LunaButton,{size:"small",variant:"outlined",disabled:w,onClick:async()=>{g(!0);try{let s=await ua();T(s.ok?`OK \xB7 ${s.context} \xB7 rms ${s.rms} \xB7 peak ${s.peak} \xB7 \u0394${s.progressionSeconds}s`:`Failed \xB7 ${s.reason??"unknown"} \xB7 context ${s.context}`)}finally{g(!1)}}},w?"Testing\u2026":"Run test"))),W&&l.default.createElement(m.LunaButtonSetting,{title:"Diagnostics",desc:"Copy player, pitch-engine, effects, theme and media state plus recent logs.",children:r,onClick:async()=>{i("Copying\u2026");let s=await Be(v.get());i(s?"Copied":"Copy failed")}}))))};var St=new Set,{trace:ha}=(0,xe.Tracer)("[PlaybackKit]"),Or=1e3,qr=1500,on="tidaluna.playback-speed.previous-quality",ka=()=>{try{return localStorage.getItem(on)}catch{return null}},$r=e=>{try{localStorage.setItem(on,e)}catch{}},wa=()=>{try{localStorage.removeItem(on)}catch{}},Ea=e=>{let t=pe.redux.actions["settings/SET_STREAMING_QUALITY"];typeof t=="function"?t(e):pe.redux.store.dispatch({type:"settings/SET_STREAMING_QUALITY",payload:e})},ba=()=>{let t=(0,xe.findModuleByProperty)((n,a)=>n==="activePlayer"&&typeof a=="object"&&a!==null)?.activePlayer;if(t===void 0)return{found:!1};try{let n=Object.getPrototypeOf(t),a=n===null?[]:Object.getOwnPropertyNames(n).filter(i=>{try{return typeof t[i]=="function"}catch{return!1}}).slice(0,60),r=i=>{try{return t[i]}catch{return}};return{found:!0,name:r("name"),constructor:t.constructor?.name,state:r("playbackState")??r("state"),currentTime:r("currentTime"),methods:a,hasSetPlaybackRate:a.includes("setPlaybackRate"),hasMediaElement:!!(r("mediaElement")??r("video")??r("element"))}}catch(n){return{found:!0,error:String(n)}}},ya=()=>{let t=(0,xe.findModuleByProperty)((n,a)=>n==="activePlayer"&&typeof a=="object"&&a!==null)?.activePlayer?.name;return t==="nativePlayer"?"native":t==="shakaPlayer"?"shaka":t==="browserPlayer"?"browser":"unknown"},va,Fr=()=>(va??=(0,xe.findModuleByProperty)((e,t)=>e==="activePlayer"&&typeof t=="object"&&t!==null),va?.activePlayer),Pa=()=>{if(Te()==="native"){let n=Fr()?.currentTime;return typeof n=="number"&&Number.isFinite(n)?n:null}let e=ne(),t=e.find(n=>!n.paused&&n.readyState>0)??e.find(n=>n.readyState>0);return t===void 0?null:t.currentTime},zr=()=>{try{return pe.redux.store.getState().playbackControls?.playbackState==="PLAYING"}catch{return!1}},Gr=e=>{let t=pe.redux.actions["playbackControls/TIME_UPDATE"];typeof t=="function"?t(e):pe.redux.store.dispatch({type:"playbackControls/TIME_UPDATE",payload:e})},Kr=()=>{try{let e=pe.redux.store.getState().playbackControls;if(e===void 0)return null;let t=e.latestCurrentTime??0;return e.playbackState!=="PLAYING"?t:t+Math.abs(Date.now()-(e.latestCurrentTimeSyncTimestamp??Date.now()))/1e3}catch{return null}},Sa={getSpeed:()=>v.get().speed,isPlaying:zr,getPosition:Pa,dispatchTimeUpdate:Gr},Ur=()=>{try{let e=pe.redux.store.getState(),t=e.playQueue,n=t?.elements?.[t.currentIndex??-1]?.mediaItemId;if(n===void 0)return null;let a=e.content?.mediaItems?.[String(n)];return a===void 0?{id:n,found:!1}:{id:n,found:!0,title:a.title,bpm:a.bpm??null,key:a.key??a.keyScale??null,metadataKeys:Object.keys(a).filter(r=>/bpm|key|tempo|tone/i.test(r))}}catch(e){return{error:String(e)}}},Ta=!1,qe,sn=()=>Ze(v.get(),L.get()),xa=()=>{Ta&&(qe!==void 0&&clearTimeout(qe),qe=setTimeout(()=>{qe=void 0,Ae(sn()).catch(e=>h("error","config save failed",{error:String(e)}))},300))},jr=async()=>{try{let e=await st(),t=e===null?void 0:it(e),n=await ot();t!==void 0?(v.replace(t.settings),L.replace(t.presets),et(v,L),h("info","config loaded",{path:n,speed:t.settings.speed,presets:t.presets.length})):(await Ae(sn()),h("info",e===null?"config created":"config invalid, rewrote defaults",{path:n}))}catch(e){h("warn","config file unavailable; using browser storage only",{error:String(e)})}finally{Ta=!0}},Vr=()=>{try{let e=pe.redux.actions["router/PUSH"];if(typeof e!="function")throw new Error("router/PUSH is unavailable");e({pathname:"/not-found",search:"LunaSettings",replace:!0}),h("info","opening Luna settings"),setTimeout(()=>{let n=[...document.querySelectorAll('[role="tab"]')].find(a=>(a.textContent??"").trim()==="Plugins");n!==void 0&&n.getAttribute("aria-selected")!=="true"&&n.click(),setTimeout(()=>{[...document.querySelectorAll("h1,h2,h3,h4,h5,h6,span,p,div")].find(i=>(i.textContent??"").trim()==="@kyoto-aircon/playback-kit")?.scrollIntoView({block:"center",behavior:"smooth"})},250)},250)}catch(e){h("error","open Luna settings failed",{error:String(e)})}},Wr=()=>{try{let t=pe.redux.store.getState().settings?.quality?.streaming;if(t==="HIGH"){h("info","already on the browser player quality");return}h("info","switching streaming quality to HIGH",{from:t}),typeof t=="string"&&$r(t),Ea("HIGH")}catch(e){h("error","quality switch failed",{error:String(e)})}},Qr=()=>{let e=ka();e!==null&&(h("info","restoring streaming quality",{to:e}),Ea(e),wa())},Jr=e=>{let t={version:Re,logs:Rn,logText:Ht,report:()=>_t(v.get()),copy:()=>Be(v.get()),clear:Bn,setVerbose:Hn,selectors:dt,playerKind:Te,audioEngine:A,native:bt,store:v,controller:e};globalThis.__playbackSpeed=t,St.add(()=>{globalThis.__playbackSpeed===t&&delete globalThis.__playbackSpeed})};try{Bt(v.get().developerMode),On(ba);try{let o=xe.LunaPlugin.getByName("@kyoto-aircon/playback-speed");o!==void 0&&h("warn","old Playback Speed plugin is still installed",{enabled:o.store?.enabled})}catch{}$n(()=>({kind:Te(),native:bt(),nativeInstance:na(),speed:v.get().speed,track:Ur(),audioEngine:A(),effects:Jn(),pitchSemitones:v.get().pitchSemitones,pitchEngine:Jt(),presetId:v.get().presetId,uiTime:Kr(),actualTime:Pa()})),Wt(),h("info","loading",{version:Re,selectors:dt(),media:ne().length,settings:v.get(),tidal:ba(),native:bt()});let e=Kn();St.add(()=>Un(e));let t=new gt(ne,v);t.start();let n=v.subscribe(o=>{Bt(o.developerMode),xa(),h("info","settings changed",{speed:o.speed,pitchShifts:o.pitchShifts,bounds:o.bounds}),t.apply(),Te()==="native"&&Qt(o.speed),Zt(Sa),yt(o.pitchSemitones,ne()),jt(o.effects,ne())});L.subscribe(xa),jr(),Qn(St,v,{getPlayerKind:Te,subscribePlayerKind:oa,useBrowserPlayer:Wr,previousQuality:ka,restoreQuality:Qr,presets:{list:()=>L.get().filter(o=>v.get().builtinPresets||o.builtin!==!0),apply:o=>{v.applyPreset(o),h("info","preset applied",{id:o.id,name:o.name})},clear:()=>v.clearPreset(),save:(o,d)=>L.save(o,d),saveActive:o=>{let d=sa(v,L,o);h("info","saved preset from live state",{id:d?.id,builtin:o.builtin===!0})}},getPitchEngineState:Jt,openSettings:Vr,onOpen:()=>{let o=v.get().pitchSemitones;o!==0&&yt(o,ne())}}),Jr(t);let r=setInterval(()=>{t.scan();let o=v.get().pitchSemitones;o!==0&&yt(o,ne());let d=v.get().effects;at(d)&&jt(d,ne())},Or),i=da(Sa);Xt(ya());let c=setInterval(()=>{Wt();let o=ya(),d=Te();Xt(o),o!==d&&o==="native"&&(Qt(v.get().speed),wa())},qr);St.add(()=>{qe!==void 0&&(clearTimeout(qe),Ae(sn()).catch(()=>{})),clearInterval(r),clearInterval(c),i(),n(),t.stop(),ia()}),ha.log("loaded")}catch(e){h("error","failed to load",{error:String(e),stack:e?.stack}),ha.err("Failed to load:",e)}export{_r as Settings,St as unloads};
//# sourceMappingURL=kyoto-aircon.playback-kit.mjs.map
