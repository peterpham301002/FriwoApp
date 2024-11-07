//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.
const e=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),o=Symbol.for("wasm promise_control");function n(e,t){let n=null;const r=new Promise((function(o,r){n={isDone:!1,promise:null,resolve:t=>{n.isDone||(n.isDone=!0,o(t),e&&e())},reject:e=>{n.isDone||(n.isDone=!0,r(e),t&&t())}}}));n.promise=r;const s=r;return s[o]=n,{promise:s,promise_control:n}}function r(e){return e[o]}function s(e){(function(e){return void 0!==e[o]})(e)||De(!1,"Promise is not controllable")}const i="MONO_WASM: ";function a(e,...t){Re.diagnosticTracing&&console.debug(i+e,...t)}function l(e,...t){console.info(e,...t)}function c(e,...t){console.warn(i+e,...t)}function u(e,...t){t&&t.length>0&&t[0]&&"object"==typeof t[0]&&t[0].silent||console.error(i+e,...t)}let d;function f(e,t,o){const n={log:t.log,error:t.error},r=t;function s(t,o,r){return function(...s){try{let n=s[0];if(void 0===n)n="undefined";else if(null===n)n="null";else if("function"==typeof n)n=n.toString();else if("string"!=typeof n)try{n=JSON.stringify(n)}catch(e){n=n.toString()}if("string"==typeof n)if("["==n[0]){const t=(new Date).toISOString();n="main"!==e?`[${e}][${t}] ${n}`:`[${t}] ${n}`}else"main"!==e&&(n=`[${e}] ${n}`);o(r?JSON.stringify({method:t,payload:n,arguments:s}):[t+n,...s.slice(1)])}catch(e){n.error(`proxyConsole failed: ${e}`)}}}const i=["debug","trace","warn","info","error"];for(const e of i)"function"!=typeof r[e]&&(r[e]=s(`console.${e}: `,t.log,!1));const a=`${o}/console`.replace("https://","wss://").replace("http://","ws://");d=new WebSocket(a),d.addEventListener("open",(()=>{n.log(`browser: [${e}] Console websocket connected.`)})),d.addEventListener("error",(t=>{n.error(`[${e}] websocket error: ${t}`,t)})),d.addEventListener("close",(t=>{n.error(`[${e}] websocket closed: ${t}`,t)}));const l=e=>{d.readyState===WebSocket.OPEN?d.send(e):n.log(e)};for(const e of["log",...i])r[e]=s(`console.${e}`,l,!0)}const m={},h={},g={};let p,b,w;function y(){const e=Object.values(g),t=Object.values(h),o=E(e),n=E(t),r=o+n;if(0===r)return;const s=ve?"%c":"",i=ve?["background: purple; color: white; padding: 1px 3px; border-radius: 3px;","font-weight: bold;","font-weight: normal;"]:[],a=Re.config.linkerEnabled?"":"\nThis application was built with linking (tree shaking) disabled. \nPublished applications will be significantly smaller if you install wasm-tools workload. \nSee also https://aka.ms/dotnet-wasm-features";console.groupCollapsed(`${s}dotnet${s} Loaded ${R(r)} resources${s}${a}`,...i),e.length&&(console.groupCollapsed(`Loaded ${R(o)} resources from cache`),console.table(g),console.groupEnd()),t.length&&(console.groupCollapsed(`Loaded ${R(n)} resources from network`),console.table(h),console.groupEnd()),console.groupEnd()}async function v(){const e=p;if(e){const t=(await e.keys()).map((async t=>{t.url in m||await e.delete(t)}));await Promise.all(t)}}function _(e){return`${e.resolvedUrl}.${e.hash}`}function E(e){return e.reduce(((e,t)=>e+(t.responseBytes||0)),0)}function R(e){return`${(e/1048576).toFixed(2)} MB`}function j(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ve?navigator.languages&&navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=Object.keys(e.resources.icu);let n=null;if("custom"===e.globalizationMode?1===o.length&&(n=o[0]):"hybrid"===e.globalizationMode?n="icudt_hybrid.dat":t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat",n&&o.includes(n))return n}return e.globalizationMode="invariant",null}const x=class{constructor(e){this.url=e}toString(){return this.url}};async function S(e,t){try{const o="function"==typeof globalThis.fetch;if(we){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});b||(w=xe.require("url"),b=xe.require("fs")),n&&(e=w.fileURLToPath(e));const r=await b.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function A(e){return"string"!=typeof e&&De(!1,"url must be a string"),!T(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const D=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,C=/[a-zA-Z]:[\\/]/;function T(e){return we||_e?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||C.test(e):D.test(e)}let O,k=0;const M=[],$=[],L=new Map,I={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0},U={...I,"js-module-library-initializer":!0},N={...I,dotnetwasm:!0,heap:!0,manifest:!0},P={...U,manifest:!0},z={...U,dotnetwasm:!0},F={dotnetwasm:!0,symbols:!0},W={resource:!0,assembly:!0,pdb:!0,heap:!0,icu:!0},B={...U,dotnetwasm:!0,symbols:!0};function V(e){return!("icu"==e.behavior&&e.name!=Re.preferredIcuAsset)}function q(e,t,o){const n=Object.keys(t||{});De(1==n.length,`Expect to have one ${o} asset in resources`);const r=n[0],s={name:r,hash:t[r],behavior:o};return J(s),e.push(s),s}function J(e){N[e.behavior]&&L.set(e.behavior,e)}function H(e){const t=function(e){De(N[e],`Unknown single asset behavior ${e}`);const t=L.get(e);return De(t,`Single asset for ${e} not found`),t}(e);if(t.resolvedUrl=Re.locateFile(t.name),I[t.behavior]){const e=re(t);e?("string"!=typeof e&&De(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=X(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}async function Q(){a("mono_download_assets");try{const e=[],t=t=>{!B[t.behavior]&&V(t)&&Re.expected_instantiated_assets_count++,!z[t.behavior]&&V(t)&&(Re.expected_downloaded_assets_count++,e.push(G(t)))};for(const e of $)t(e);await Re.memorySnapshotSkippedOrDone.promise;for(const e of M)if(Ee.loadedMemorySnapshotSize){if(se(e),"resource"==e.behavior||"assembly"==e.behavior||"pdb"==e.behavior){const t=K(e,""),o="string"==typeof e.virtualPath?e.virtualPath:e.name;Re._loaded_files.push({url:t,file:o})}}else t(e);Re.allDownloadsQueued.promise_control.resolve(),await Re.runtimeModuleLoaded.promise;const o=[];for(const t of e)o.push((async()=>{const e=await t;if(e.buffer){if(!B[e.behavior]){e.buffer&&"object"==typeof e.buffer||De(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof e.resolvedUrl&&De(!1,"resolvedUrl must be string");const t=e.resolvedUrl,o=await e.buffer,n=new Uint8Array(o);se(e),await Ee.beforeOnRuntimeInitialized.promise,Ee.instantiate_asset(e,t,n)}}else F[e.behavior]?("symbols"===e.behavior&&(await Ee.instantiate_symbols_asset(e),se(e)),F[e.behavior]&&++Re.actual_downloaded_assets_count):(e.isOptional||De(!1,"Expected asset to have the downloaded buffer"),!z[e.behavior]&&V(e)&&Re.expected_downloaded_assets_count--,!B[e.behavior]&&V(e)&&Re.expected_instantiated_assets_count--)})());Promise.all(o).then((()=>{Ee.allAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Re.err("Error in mono_download_assets: "+e),ke(1,e),e}))}catch(e){throw Re.err("Error in mono_download_assets: "+e),e}}async function Z(e){const t=await G(e);return await t.pendingDownloadInternal.response,t.buffer}async function G(e){try{return await Y(e)}catch(t){if(!Re.enableDownloadRetry)throw t;if(_e||we)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Re.allDownloadsQueued.promise;try{return a(`Retrying download '${e.name}'`),await Y(e)}catch(t){return e.pendingDownloadInternal=void 0,await(100,new Promise((e=>globalThis.setTimeout(e,100)))),a(`Retrying download (2) '${e.name}' after delay`),await Y(e)}}}async function Y(e){for(;O;)await O.promise;try{++k,k==Re.maxParallelDownloads&&(a("Throttling further parallel downloads"),O=n());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Re.config.remoteSources?Re.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=K(e,n);e.name===t?a(`Attempting to download '${t}'`):a(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=oe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Re.config.ignorePdbLoadErrors;if(o||De(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}Re.out(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(F[e.behavior]||(e.buffer=await t.arrayBuffer(),++Re.actual_downloaded_assets_count),e):e}finally{if(--k,O&&k==Re.maxParallelDownloads-1){a("Resuming more parallel downloads");const e=O;O=void 0,e.promise_control.resolve()}}}function K(e,t){let o;return null==t&&De(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=X(Re.locateFile(o),e.behavior)),o&&"string"==typeof o||De(!1,"attemptUrl need to be path or url string"),o}function X(e,t){return Re.modulesUniqueQuery&&P[t]&&(e+=Re.modulesUniqueQuery),e}let ee=0;const te=new Set;function oe(e){try{e.resolvedUrl||De(!1,"Request's resolvedUrl must be set");const t=async function(e){let t=await async function(e){const t=p;if(!t||e.noCache||!e.hash||0===e.hash.length)return;const o=_(e);let n;m[o]=!0;try{n=await t.match(o)}catch(e){}if(!n)return;const r=parseInt(n.headers.get("content-length")||"0");return g[e.name]={responseBytes:r},n}(e);return t||(t=await function(e){let t=e.resolvedUrl;if(Re.loadBootResource){const o=re(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return Re.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Re.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Re.fetch_like(t,o)}(e),function(e,t){const o=p;if(!o||e.noCache||!e.hash||0===e.hash.length)return;const n=t.clone();setTimeout((()=>{const t=_(e);!async function(e,t,o,n){const r=await n.arrayBuffer(),s=function(e){if("undefined"!=typeof performance)return performance.getEntriesByName(e)[0]}(n.url),i=s&&s.encodedBodySize||void 0;h[t]={responseBytes:i};const a=new Response(r,{headers:{"content-type":n.headers.get("content-type")||"","content-length":(i||n.headers.get("content-length")||"").toString()}});try{await e.put(o,a)}catch(e){}}(o,e.name,t,n)}),0)}(e,t)),t}(e),o={name:e.name,url:e.resolvedUrl,response:t};return te.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Re.loadedAssemblies.push(e.name),ee++,Re.onDownloadResourceProgress&&Re.onDownloadResourceProgress(ee,te.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const ne={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function re(e){var t;if(Re.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=ne[e.behavior];if(r){const t=Re.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?A(t):t}}}function se(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function ie(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function ae(e){if(!e)return;const t=Object.keys(e);await Promise.all(t.map((e=>async function(e){try{const t=X(Re.locateFile(e),"js-module-library-initializer");a(`Attempting to import '${t}' for ${e}`);const o=await import(t);Re.libraryInitializers.push({scriptName:e,exports:o})}catch(t){c(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function le(e,t){if(!Re.libraryInitializers)return;const o=[];for(let n=0;n<Re.libraryInitializers.length;n++){const r=Re.libraryInitializers[n];r.exports[e]&&o.push(ce(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ce(e,t,o){try{await o()}catch(o){throw c(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),ke(1,o),o}}var ue="Release";function de(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=me(e.resources||{assembly:{},jsModuleNative:{},jsModuleRuntime:{},wasmNative:{}},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function fe(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=de(e.config,o.config)),Object.assign(e,o)}function me(e,t){if(e===t)return e;const o={...t};return void 0!==o.assembly&&(o.assembly={...e.assembly||{},...o.assembly||{}}),void 0!==o.lazyAssembly&&(o.lazyAssembly={...e.lazyAssembly||{},...o.lazyAssembly||{}}),void 0!==o.pdb&&(o.pdb={...e.pdb||{},...o.pdb||{}}),void 0!==o.jsModuleWorker&&(o.jsModuleWorker={...e.jsModuleWorker||{},...o.jsModuleWorker||{}}),void 0!==o.jsModuleNative&&(o.jsModuleNative={...e.jsModuleNative||{},...o.jsModuleNative||{}}),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime={...e.jsModuleRuntime||{},...o.jsModuleRuntime||{}}),void 0!==o.wasmSymbols&&(o.wasmSymbols={...e.wasmSymbols||{},...o.wasmSymbols||{}}),void 0!==o.wasmNative&&(o.wasmNative={...e.wasmNative||{},...o.wasmNative||{}}),void 0!==o.icu&&(o.icu={...e.icu||{},...o.icu||{}}),void 0!==o.satelliteResources&&(o.satelliteResources=he(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded={...e.modulesAfterConfigLoaded||{},...o.modulesAfterConfigLoaded||{}}),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady={...e.modulesAfterRuntimeReady||{},...o.modulesAfterRuntimeReady||{}}),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=he(e.vfs||{},o.vfs||{})),Object.assign(e,o)}function he(e,t){if(e===t)return e;for(const o in t)e[o]={...e[o],...t[o]};return e}function ge(){const e=Re.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:{},jsModuleNative:{},jsModuleWorker:{},jsModuleRuntime:{},wasmNative:{},vfs:{},satelliteResources:{}},e.assets){a("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};o[t.name]=t.hash||"";const n={};switch(t.behavior){case"assembly":n.assembly=o;break;case"pdb":n.pdb=o;break;case"resource":n.satelliteResources={},n.satelliteResources[t.culture]=o;break;case"icu":n.icu=o;break;case"symbols":n.wasmSymbols=o;break;case"vfs":n.vfs={},n.vfs[t.virtualPath]=o;break;case"dotnetwasm":n.wasmNative=o;break;case"js-module-threads":n.jsModuleWorker=o;break;case"js-module-runtime":n.jsModuleRuntime=o;break;case"js-module-native":n.jsModuleNative=o;break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}me(e.resources,n)}}Re.assertAfterExit=e.assertAfterExit=e.assertAfterExit||!ve,void 0===e.debugLevel&&"Debug"===ue&&(e.debugLevel=-1),void 0===e.cachedResourcesPurgeDelay&&(e.cachedResourcesPurgeDelay=1e4),e.debugLevel=be(e)?e.debugLevel:0,void 0===e.diagnosticTracing&&"Debug"===ue&&(e.diagnosticTracing=!0),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ee.diagnosticTracing=Re.diagnosticTracing=!!e.diagnosticTracing,Ee.waitForDebugger=e.waitForDebugger,e.startupMemoryCache=!!e.startupMemoryCache,e.startupMemoryCache&&Ee.waitForDebugger&&(a("Disabling startupMemoryCache because waitForDebugger is set"),e.startupMemoryCache=!1),Ee.enablePerfMeasure=!!e.browserProfilerOptions&&globalThis.performance&&"function"==typeof globalThis.performance.measure,Re.maxParallelDownloads=e.maxParallelDownloads||Re.maxParallelDownloads,Re.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Re.enableDownloadRetry}let pe=!1;function be(e){return!!globalThis.navigator&&((!!e.resources.pdb||0!=e.debugLevel)&&(Re.isChromium||Re.isFirefox))}const we="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,ye="function"==typeof importScripts,ve="object"==typeof window||ye&&!we,_e=!ve&&!we&&!ye;let Ee={},Re={},je={},xe={},Se=!1;const Ae={mono:{},binding:{},internal:xe,module:{},loaderHelpers:Re,runtimeHelpers:Ee,api:je};function De(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);Ee.abort(n)}function Ce(){return void 0!==Re.exitCode}function Te(){return Ee.runtimeReady&&!Ce()}function Oe(){Ee.runtimeReady||De(!1,"mono runtime didn't start yet"),Re.assertAfterExit&&Ce()&&De(!1,`mono runtime already exited with ${Re.exitCode}`)}function ke(e,t){var o;const n=t&&"object"==typeof t;e=n&&"number"==typeof t.status?t.status:e;const r=n&&"string"==typeof t.message?t.message:""+t;if((t=n?t:Ee.ExitStatus?new Ee.ExitStatus(e):new Error("Exit with code "+e+" "+r)).status=e,t.message||(t.message=r),t.stack||(t.stack=(new Error).stack||""),t.silent=!0,!Ce()){try{Ee.runtimeReady||(a("abort_startup, reason: "+t),function(e){Re.allDownloadsQueued.promise_control.reject(e),Re.afterConfigLoaded.promise_control.reject(e),Re.wasmDownloadPromise.promise_control.reject(e),Re.runtimeModuleLoaded.promise_control.reject(e),Re.memorySnapshotSkippedOrDone.promise_control.reject(e),Ee.dotnetReady&&(Ee.dotnetReady.promise_control.reject(e),Ee.afterInstantiateWasm.promise_control.reject(e),Ee.beforePreInit.promise_control.reject(e),Ee.afterPreInit.promise_control.reject(e),Ee.afterPreRun.promise_control.reject(e),Ee.beforeOnRuntimeInitialized.promise_control.reject(e),Ee.afterOnRuntimeInitialized.promise_control.reject(e),Ee.afterPostRun.promise_control.reject(e))}(t)),function(e,t){if(0!==e&&t){const e=Ee.ExitStatus&&t instanceof Ee.ExitStatus?a:u;"string"==typeof t?e(t):t.stack&&t.message?Ee.stringify_as_error_with_stack?e(Ee.stringify_as_error_with_stack(t)):e(t.message+"\n"+t.stack):e(JSON.stringify(t))}if(Re.config&&Re.config.logExitCode)if(d){const t=()=>{0==d.bufferedAmount?l("WASM EXIT "+e):globalThis.setTimeout(t,100)};t()}else l("WASM EXIT "+e)}(e,t),function(e){if(ve&&Re.config&&Re.config.appendElementOnExit){const t=document.createElement("label");t.id="tests_done",e&&(t.style.background="red"),t.innerHTML=e.toString(),document.body.appendChild(t)}}(e),Ee.jiterpreter_dump_stats&&Ee.jiterpreter_dump_stats(!1),0===e&&(null===(o=Re.config)||void 0===o?void 0:o.interopCleanupOnExit)&&Ee.forceDisposeProxies(!0,!0)}catch(e){c("mono_exit failed",e)}Re.exitCode=e}if(Re.config&&Re.config.asyncFlushOnExit&&0===e)throw(async()=>{try{await async function(){try{const e=await import("process"),t=e=>new Promise(((t,o)=>{e.on("error",(e=>o(e))),e.write("",(function(){t()}))})),o=t(e.stderr),n=t(e.stdout);await Promise.all([n,o])}catch(e){u(`flushing std* streams failed: ${e}`)}}()}finally{Me(e,t)}})(),t;Me(e,t)}function Me(e,t){if(Te()&&Ee.mono_wasm_exit&&Ee.mono_wasm_exit(e),0!==e||!ve)throw we&&xe.process?xe.process.exit(e):Ee.quit&&Ee.quit(e,t),t}!function(o){if(Se)throw new Error("Loader module already loaded");Se=!0,Ee=o.runtimeHelpers,Re=o.loaderHelpers,je=o.api,xe=o.internal,Object.assign(je,{INTERNAL:xe,invokeLibraryInitializers:le}),Object.assign(o.module,{disableDotnet6Compatibility:!0,config:{environmentVariables:{}}}),Object.assign(Ee,{mono_wasm_bindings_is_ready:!1,javaScriptExports:{},config:o.module.config,diagnosticTracing:!1,abort:e=>{throw e}}),Object.assign(Re,{gitHash:"2d7eea252964e69be94cb9c847b371b23e4dd470",config:o.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,assertAfterExit:!ve,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:n(),allDownloadsQueued:n(),wasmDownloadPromise:n(),runtimeModuleLoaded:n(),memorySnapshotSkippedOrDone:n(),is_exited:Ce,is_runtime_running:Te,assert_runtime_running:Oe,mono_exit:ke,createPromiseController:n,getPromiseController:r,assertIsControllablePromise:s,mono_download_assets:Q,resolve_single_asset_path:H,setup_proxy_console:f,logDownloadStatsToConsole:y,purgeUnusedCacheEntriesAsync:v,hasDebuggingEnabled:be,retrieve_asset_download:Z,invokeLibraryInitializers:le,exceptions:e,simd:t})}(Ae);const $e="__mono_message_please_dont_collide__";let Le=!1;const Ie=Ae.module,Ue=Ie.config;async function Ne(e){if("function"==typeof e){const t=e(Ae.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(Ie,t),fe(Ie,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");fe(Ie,e)}return await async function(e){if(we){const e=await import("process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Re.modulesUniqueQuery=t.substring(o)),Re.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Re.scriptDirectory=(n=Re.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Re.locateFile=e=>"URL"in globalThis&&globalThis.URL!==x?new URL(e,Re.scriptDirectory).toString():T(e)?e:Re.scriptDirectory+e,Re.fetch_like=S,Re.out=console.log,Re.err=console.error,Re.onDownloadResourceProgress=e.onDownloadResourceProgress,ve&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Re.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Re.isChromium=e.userAgent.includes("Chrome"),Re.isFirefox=e.userAgent.includes("Firefox"))}xe.require=we?await import("module").then((e=>e.createRequire(import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=x)}(Ie),Ie.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n;n=JSON.parse(e.data.config),Le?a("mono config already received"):(de(Re.config,n),ge(),a("mono config received"),Le=!0,Re.afterConfigLoaded.promise_control.resolve(Re.config),ve&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Re.setup_proxy_console("pthread-worker",console,self.location.href)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[$e]:{monoCmd:"preload",port:o}},[o])})(),await Re.afterConfigLoaded.promise,function(){const e=Re.config;e.assets||De(!1,"config.assets must be defined");for(const t of e.assets)J(t)}();const e=Pe(),t=await Promise.all(e);return await ze(t),Ie}():async function(){var e;Ie.configSrc||Re.config&&0!==Object.keys(Re.config).length&&(Re.config.assets||Re.config.resources)||(Ie.configSrc="./blazor.boot.json"),await async function(e){var t;const o=e.configSrc;if(pe)await Re.afterConfigLoaded.promise;else try{if(pe=!0,o&&(a("mono_wasm_load_config"),await async function(e){const t=Re.locateFile(e.configSrc),o=void 0!==Re.loadBootResource?Re.loadBootResource("manifest","blazor.boot.json",t,"","manifest"):s(t);let n;n=o?"string"==typeof o?await s(A(o)):await o:await s(X(t,"manifest"));const r=await async function(e){const t=Re.config,o=await e.json();t.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||"Production"),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}(n);function s(e){return Re.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}de(Re.config,r)}(e)),ge(),await ae(null===(t=Re.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await le("onRuntimeConfigLoaded",[Re.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Re.config,je),ge()}catch(e){throw u("onConfigLoaded() failed",e),e}ge(),Re.config.startupMemoryCache&&e.instantiateWasm&&De(!1,"startupMemoryCache is not supported with Module.instantiateWasm"),Re.afterConfigLoaded.promise_control.resolve(Re.config),Re.config.startupMemoryCache||Re.memorySnapshotSkippedOrDone.promise_control.resolve()}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Re.config=e.config=Object.assign(Re.config,{message:n,error:t,isError:!0}),ke(1,new Error(n)),t}}(Ie),function(){const e=Re.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&De(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&De(!1,"asset behavior must be known string"),"string"!=typeof t.name&&De(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&De(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&De(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&De(!1,"asset pendingDownload could be object"),W[t.behavior]?M.push(t):$.push(t),J(t);else if(e.resources){const o=e.resources;if(o.wasmNative||De(!1,"resources.wasmNative must be defined"),o.jsModuleNative||De(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||De(!1,"resources.jsModuleRuntime must be defined"),q($,o.wasmNative,"dotnetwasm"),q(t,o.jsModuleNative,"js-module-native"),q(t,o.jsModuleRuntime,"js-module-runtime"),o.assembly)for(const e in o.assembly)M.push({name:e,hash:o.assembly[e],behavior:"assembly"});if(0!=e.debugLevel&&o.pdb)for(const e in o.pdb)M.push({name:e,hash:o.pdb[e],behavior:"pdb"});if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(const t in o.satelliteResources[e])M.push({name:t,hash:o.satelliteResources[e][t],behavior:"resource",culture:e});if(o.vfs)for(const e in o.vfs)for(const t in o.vfs[e])$.push({name:t,hash:o.vfs[e][t],behavior:"vfs",virtualPath:e});const n=j(e);if(n&&o.icu)for(const e in o.icu)e===n&&M.push({name:e,hash:o.icu[e],behavior:"icu",loadRemote:!0});if(o.wasmSymbols)for(const e in o.wasmSymbols)$.push({name:e,hash:o.wasmSymbols[e],behavior:"symbols"})}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=ie(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||$.push({name:o,behavior:"vfs",noCache:!0,useCredentials:!0})}e.assets=[...M,...$,...t]}();const t=Pe();await async function(){p=await async function(e){if(!Re.config.cacheBootResources||void 0===globalThis.caches||void 0===globalThis.document)return null;if(!1===window.isSecureContext)return null;const t=`dotnet-resources-${globalThis.document.baseURI.substring(globalThis.document.location.origin.length)}`;try{return await caches.open(t)||null}catch(e){return null}}()}(),G(H("dotnetwasm")).then((e=>{Re.wasmDownloadPromise.promise_control.resolve(e)})).catch((e=>{ke(1,e)})),setTimeout((()=>{(function(){if(Re.preferredIcuAsset=j(Re.config),Re.invariantMode="invariant"==Re.config.globalizationMode,!Re.invariantMode)if(Re.preferredIcuAsset)a("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Re.config.globalizationMode||"all"===Re.config.globalizationMode||"sharded"===Re.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw Re.err(`ERROR: ${e}`),new Error(e)}a("ICU data archive(s) not available, using invariant globalization mode"),Re.invariantMode=!0,Re.preferredIcuAsset=null}const e="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",t="DOTNET_SYSTEM_GLOBALIZATION_HYBRID",o=Re.config.environmentVariables;if(void 0===o[t]&&"hybrid"===Re.config.globalizationMode?o[t]="1":void 0===o[e]&&Re.invariantMode&&(o[e]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){!function(e,...t){console.info(i+e,...t)}("failed to detect timezone, will fallback to UTC")}})(),Q()}),0);const o=await Promise.all(t);return await ze(o),await Ee.dotnetReady.promise,await ae(null===(e=Re.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await le("onRuntimeReady",[Ae.api]),je}()}function Pe(){const e=H("js-module-runtime"),t=H("js-module-native");let o,n;return"object"==typeof e.moduleExports?o=e.moduleExports:(a(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),o=import(e.resolvedUrl)),"object"==typeof t.moduleExports?n=t.moduleExports:(a(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),n=import(t.resolvedUrl)),[o,n]}async function ze(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:s,setRuntimeGlobals:i,passEmscriptenInternals:a}=e[0],{default:l}=e[1];i(Ae),t(Ae),await n(),Re.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(Ie,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:s,passEmscriptenInternals:a}}),Ie)))}const Fe=new class{withModuleConfig(e){try{return fe(Ie,e),this}catch(e){throw ke(1,e),e}}withOnConfigLoaded(e){try{return fe(Ie,{onConfigLoaded:e}),this}catch(e){throw ke(1,e),e}}withConsoleForwarding(){try{return de(Ue,{forwardConsoleLogsToWS:!0}),this}catch(e){throw ke(1,e),e}}withExitOnUnhandledError(){const e=function(e,t){e.preventDefault();try{t&&t.silent||ke(1,t)}catch(e){}};try{return ve&&(window.addEventListener("unhandledrejection",(t=>e(t,t.reason))),window.addEventListener("error",(t=>e(t,t.error)))),this}catch(e){throw ke(1,e),e}}withAsyncFlushOnExit(){try{return de(Ue,{asyncFlushOnExit:!0}),this}catch(e){throw ke(1,e),e}}withExitCodeLogging(){try{return de(Ue,{logExitCode:!0}),this}catch(e){throw ke(1,e),e}}withElementOnExit(){try{return de(Ue,{appendElementOnExit:!0}),this}catch(e){throw ke(1,e),e}}withInteropCleanupOnExit(){try{return de(Ue,{interopCleanupOnExit:!0}),this}catch(e){throw ke(1,e),e}}withAssertAfterExit(){try{return de(Ue,{assertAfterExit:!0}),this}catch(e){throw ke(1,e),e}}withWaitingForDebugger(e){try{return de(Ue,{waitForDebugger:e}),this}catch(e){throw ke(1,e),e}}withStartupMemoryCache(e){try{return de(Ue,{startupMemoryCache:e}),this}catch(e){throw ke(1,e),e}}withConfig(e){try{return de(Ue,e),this}catch(e){throw ke(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||De(!1,"must be file path or URL"),fe(Ie,{configSrc:e}),this}catch(e){throw ke(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||De(!1,"must be directory path"),this.virtualWorkingDirectory=e,this}catch(e){throw ke(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,de(Ue,{environmentVariables:o}),this}catch(e){throw ke(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||De(!1,"must be dictionary object"),de(Ue,{environmentVariables:e}),this}catch(e){throw ke(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&De(!1,"must be boolean"),de(Ue,{diagnosticTracing:e}),this}catch(e){throw ke(1,e),e}}withDebugging(e){try{return e&&"number"==typeof e||De(!1,"must be number"),de(Ue,{debugLevel:e}),this}catch(e){throw ke(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||De(!1,"must be array of strings"),this.applicationArguments=e,this}catch(e){throw ke(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||De(!1,"must be array of strings"),de(Ue,{runtimeOptions:e}),this}catch(e){throw ke(1,e),e}}withMainAssembly(e){try{return de(Ue,{mainAssemblyName:e}),this}catch(e){throw ke(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw ke(1,e),e}}withApplicationEnvironment(e){try{return de(Ue,{applicationEnvironment:e}),this}catch(e){throw ke(1,e),e}}withApplicationCulture(e){try{return de(Ue,{applicationCulture:e}),this}catch(e){throw ke(1,e),e}}withResourceLoader(e){try{return Re.loadBootResource=e,this}catch(e){throw ke(1,e),e}}async create(){try{if(this.instance||(ve&&Ie.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&f("main",globalThis.console,globalThis.location.origin),Ie||De(!1,"Null moduleConfig"),Ie.config||De(!1,"Null moduleConfig.config"),await Ne(Ie),this.instance=Ae.api),this.virtualWorkingDirectory){const e=this.instance.Module.FS,t=e.stat(this.virtualWorkingDirectory);t&&e.isDir(t.mode)||De(!1,`Could not find working directory ${this.virtualWorkingDirectory}`),e.chdir(this.virtualWorkingDirectory)}return this.instance}catch(e){throw ke(1,e),e}}async run(){try{if(Ie.config||De(!1,"Null moduleConfig.config"),this.instance||await this.create(),Ie.config.mainAssemblyName||De(!1,"Null moduleConfig.config.mainAssemblyName"),!this.applicationArguments)if(we){const e=await import("process");this.applicationArguments=e.argv.slice(2)}else this.applicationArguments=[];return this.instance.runMainAndExit(Ie.config.mainAssemblyName,this.applicationArguments)}catch(e){throw ke(1,e),e}}},We=ke,Be=Ne;_e||"function"==typeof globalThis.URL||De(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&De(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features");export{Be as default,Fe as dotnet,We as exit};
//# sourceMappingURL=dotnet.js.map
