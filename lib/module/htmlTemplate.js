export const htmlTemplate = (orgDomain, serviceProvider, sessionToken, initView) => '<!DOCTYPE html><html lang="en"><head>' + '<meta charset="utf-8" />' + '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover" />' + '<title>Chatnels</title>' + `<script async src="https://statics.${serviceProvider}/admin/js/chatnels.client.js"></script>` + `<script>
    window.chatnelsAsync = function() {
      if(window.ChatnelsClient) {
        window.ChatnelsClient.load({ domain: "${orgDomain}", sessionToken: "${sessionToken}"${initView ? `, initView: ${JSON.stringify(initView)}` : ''} });
        window.ChatnelsClient.on('chatnels:message', function(data) {
          window.ReactNativeWebView.postMessage(data);
        });
      }
    }
  </script>` + '<style>html,body {width: 100%; height: 100%; padding: 0; margin: 0; overflow: hidden;} #chatnels-root {width: 100vw; height: 100vh; position: relative;} #chatnels-client-frame { width: 100vw; height: 100vh; border: 0; }</style>' + '</head><body><div id="chatnels-root" /></body></html>';
//# sourceMappingURL=htmlTemplate.js.map