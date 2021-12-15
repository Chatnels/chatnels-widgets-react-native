import * as React from 'react';
import { WebView } from 'react-native-webview';
const html = '<!DOCTYPE html><html><head>' + '<script type="text/javascript" async="" src="https://statics.qa.chatnels.com/admin/js/chatnels.client.js"></script>' + '<style>#chatnels-root {width: 100%; height: 100%; position: relative;}</style>' + '</head><body><div id="chatnels-root" /></body></html>';

const jsTemplate = (orgDomain, sessionToken) => `window.chatnelsAsync = function() {
            window.ChatnelsClient.load({ domain: ${orgDomain}, sessionToken: ${sessionToken} });
            window.ChatnelsClient.on('chatnels:message', handleChatnelsMessage);
        };`;

export const ChatnelsWidget = _ref => {
  let {
    orgDomain,
    serviceProvider,
    sessionToken
  } = _ref;
  const webviewRef = React.useRef(null);
  const [js, setJs] = React.useState();
  React.useEffect(() => {
    if (orgDomain) {
      setJs(jsTemplate(orgDomain, sessionToken));
    }
  }, []);
  return /*#__PURE__*/React.createElement(WebView, {
    ref: webviewRef,
    source: {
      html
    },
    injectedJavaScript: js,
    // onMessage={(event) => {}}
    style: {
      flex: 1
    }
  });
};
//# sourceMappingURL=ChatnelsWidget.js.mapeSessionToken("${sessionToken}");
          }
          true;
        `;
        webviewRef.current.injectJavaScript(run);
      }
    }
  }, [sessionToken, savedSessionToken]);
  React.useEffect(() => {
    if (webviewRef.current) {
      if (JSON.stringify(savedViewData) !== JSON.stringify(viewData)) {
        setSavedViewData(viewData);
        const {
          type,
          data
        } = viewData;
        const run = `
        if(window.ChatnelsClient) {
          window.ChatnelsClient.showView("${type}", ${JSON.stringify(data)});
        }
        true;
      `;
        webviewRef.current.injectJavaScript(run);
      }
    }
  }, [viewData, savedViewData]);
  return /*#__PURE__*/React.createElement(WebView, {
    ref: webviewRef,
    source: {
      html: source,
      baseUrl: 'chatnels://local.chatnels.com/'
    },
    style: {
      flex: 1
    },
    decelerationRate: 'fast',
    domStorageEnabled: true,
    injectedJavaScriptForMainFrameOnly: true,
    injectedJavaScriptBeforeContentLoadedForMainFrameOnly: true,
    javaScriptEnabled: true,
    mixedContentMode: 'always',
    originWhitelist: ['*'],
    overScrollMode: 'never',
    thirdPartyCookiesEnabled: true,
    onMessage: handleMessage
  });
};
//# sourceMappingURL=ChatnelsWidget.js.map