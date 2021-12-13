import * as React from 'react';
import { WebView } from 'react-native-webview';
import { htmlTemplate } from './htmlTemplate';
// const jsTemplate = (orgDomain: string, sessionToken?: string) =>
//   `(function() {
//     window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
//     window.chatnelsAsync = function() {
//       if(window.ChatnelsClient) {
//         window.ChatnelsClient.load({ domain: "${orgDomain}", sessionToken: "${sessionToken}" })
//       }
//     }
//   })();`;
export const ChatnelsWidget = _ref => {
  let {
    orgDomain,
    sessionToken,
    viewData
  } = _ref;
  const webviewRef = React.useRef(null);
  const [source, setSource] = React.useState('');
  const [savedSessionToken, setSavedSessionToken] = React.useState(sessionToken);
  const [savedViewData, setSavedViewData] = React.useState();
  const handleMessage = React.useCallback(event => {
    console.log('handle Message ,', event);
  }, []);
  React.useEffect(() => {
    if (orgDomain) {
      setSource(htmlTemplate(orgDomain, sessionToken, viewData));
    }
  }, []);
  React.useEffect(() => {
    if (webviewRef.current) {
      if (sessionToken !== savedSessionToken) {
        setSavedSessionToken(sessionToken);
        const run = `
          if(window.ChatnelsClient) {
            window.ChatnelsClient.setSessionToken("${sessionToken}");
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
          window.ChatnelsClient.showView("${type}", ${data});
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