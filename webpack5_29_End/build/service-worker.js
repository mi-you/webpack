/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-50d709e9'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "css/builtf8c49d49b9.css",
    "revision": null
  }, {
    "url": "font/061c05a434.ttf",
    "revision": null
  }, {
    "url": "font/101e3ac7cc.eot",
    "revision": null
  }, {
    "url": "font/7788105214.svg",
    "revision": null
  }, {
    "url": "font/9dfad0010d.woff",
    "revision": null
  }, {
    "url": "imgs/3b57ecca6d.jpg",
    "revision": null
  }, {
    "url": "imgs/d6f1f8f1b2.png",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "84ed07fd47fadda3666ab9c1c06155f3"
  }, {
    "url": "jquery.js",
    "revision": "0cb1f3df8603fbeb63afd7fff87a48da"
  }, {
    "url": "jquery.js.LICENSE.txt",
    "revision": "fc73241165b46df46ef18b47f9e1ed7c"
  }, {
    "url": "js/lazy.e8069bc753.js",
    "revision": null
  }, {
    "url": "js/main.19b7d7f2ab.js",
    "revision": null
  }, {
    "url": "js/print.d7a52402b1.js",
    "revision": null
  }, {
    "url": "js/vendors-node_modules_core-js_modules_es_object_to-string_js-node_modules_core-js_modules_es_p-8f92ac.87d794dedb.js",
    "revision": null
  }], {});

});
//# sourceMappingURL=service-worker.js.map
