if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>i(e,t),u={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>u[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"276dff517be0a2dd65bdaf4f89a98ad8"},{url:"/_next/static/LJy7gVI8XueCMM_MiMEmH/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/LJy7gVI8XueCMM_MiMEmH/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-71965db0478ac0fb.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/137-776af88caadfb889.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/288.6369eda6b6e91c18.js",revision:"6369eda6b6e91c18"},{url:"/_next/static/chunks/3a91511d-c5525ba62c56a40a.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/538-2264863ef904509a.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/593-98987b167605da72.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/663-4b17565d18a731c1.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/722-184d44ddfddae2fd.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/878-d848f18a95526bf1.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/972-2d975b23c2e07c0b.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/app/(routes)/early-access/feedback/page-a9705453811c9c1b.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/app/(routes)/early-access/page-078bc67037a173e5.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/app/(routes)/login/page-763283a97912cdd5.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/app/(routes)/sign-up/page-336b34ee274068a2.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/app/_not-found/page-12326235c7c56cc3.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/app/layout-e45491851907be34.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/app/page-ba2e5bbc257fb8b1.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/fd9d1056-73b785adfd5168c2.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/main-11e3cc7b99dd1969.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/main-app-b786414d1a85c2d5.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-9ab923935bb4fc27.js",revision:"LJy7gVI8XueCMM_MiMEmH"},{url:"/_next/static/css/0450d1307a306e07.css",revision:"0450d1307a306e07"},{url:"/_next/static/css/78d54b49d2bf4b16.css",revision:"78d54b49d2bf4b16"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/logo.png",revision:"161da762f748253c2b968705b6236974"},{url:"/manifest.json",revision:"90a8ac32fd4700b60a3eb729ef43cdf7"},{url:"/menu-icon.svg",revision:"7db4a5766e79fac4ec831cb6c8eb1cfc"},{url:"/sol-ai-demo.png",revision:"b3eecc3d6679be6cc12b7c487f2f1a49"},{url:"/sol-ai-logo.png",revision:"74c31ce69e5778c9601cef9e48e47809"},{url:"/sol-ai-roadmap.pdf",revision:"22006d5bccc558d4df08acd7f4eda12d"},{url:"/solana.svg",revision:"61b825b9136ba484e30ab182bda6a6eb"},{url:"/trash.svg",revision:"a6d8bac9380b92391aac35912905d0ed"},{url:"/user.png",revision:"446e36c1ac4f199c98a620131872faeb"},{url:"/x-icon.svg",revision:"659399c569fe1ad3aa803a0dbfc3ee85"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
