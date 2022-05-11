"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlTemplate = void 0;

const htmlTemplate = (orgDomain, serviceProvider, sessionToken, initView) => '<!DOCTYPE html><html lang="en"><head>' + '<meta charset="utf-8" />' + '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover" />' + '<title>Chatnels</title>' + `<script>
    (function(w, d){
      w.chatnelsAsync = function() {
        if(w.ChatnelsClient) {
          w.ChatnelsClient.load({ domain: "${orgDomain}", sessionToken: "${sessionToken}"${initView ? `, initView: ${JSON.stringify(initView)}` : ''} });
          w.ChatnelsClient.on('chatnels:message', function(data) {
            let message = data;
            w.ReactNativeWebView.postMessage(message);
            message = undefined;
          });
        }

    }
      const a = d.createElement('script');
      a.type = 'text/javascript';
      a.src = "https://statics.${serviceProvider}/admin/js/chatnels.client.js"
      a.async = true;
      a.onerror = function(message) {
        w.ReactNativeWebView.postMessage(JSON.stringify({type: 'loadScriptError', data: message}));
      };
      d.head.appendChild(a);
    })(window, document)
  </script>` + '<style>html,body {width: 100%; height: 100%; padding: 0; margin: 0; overflow: hidden;} #chatnels-root {width: 100vw; height: 100vh; position: relative;} #chatnels-client-frame { width: 100vw; height: 100vh; border: 0; }</style>' + '</head><body><div id="chatnels-root" /></body></html>';

exports.htmlTemplate = htmlTemplate;
//# sourceMappingURL=htmlTemplate.js.map