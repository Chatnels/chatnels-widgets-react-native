import * as React from 'react';
import { WebView } from 'react-native-webview';
import { htmlTemplate } from './htmlTemplate';
export const ChatnelsWidget = _ref => {
  let {
    orgDomain,
    serviceProvider = 'chatnels.com',
    sessionToken,
    viewData,
    onChatnelsEvent,
    onRequestSession
  } = _ref;
  const webviewRef = React.useRef(null);
  const [source, setSource] = React.useState('');
  const [savedSessionToken, setSavedSessionToken] = React.useState(sessionToken);
  const [savedViewData, setSavedViewData] = React.useState();
  const handleMessage = React.useCallback(event => {
    console.log('handle Message ,', event.nativeEvent.data);

    try {
      const {
        type,
        data
      } = JSON.parse(event.nativeEvent.data);

      if (type === 'reAuth') {
        if (onRequestSession) {
          onRequestSession();
        }
      } else if (onChatnelsEvent) {
        onChatnelsEvent(type, data);
      }
    } catch (e) {}
  }, [onChatnelsEvent, onRequestSession]);
  React.useEffect(() => {
    if (orgDomain) {
      setSource(htmlTemplate(orgDomain, serviceProvider, sessionToken, viewData));
    }
  }, []);
  React.useEffect(() => {
    if (webviewRef.current) {
      if (sessionToken !== savedSessionToken) {
        setSavedSessionToken(sessionToken);
        const run = `
          if(window.ChatnelsClient) {
            window.ChatnelsClient.updateSessionToken("${sessionToken}");
          }
          true;
        `;
        webviewRef.current.injectJavaScript(run);
      }
    }
  }, [sessionToken, savedSessionToken]);
  React.useEffect(() => {
    try {
      if (webviewRef.current) {
        if (JSON.stringify(savedViewData) !== JSON.stringify(viewData)) {
          setSavedViewData(viewData);
          const {
            type,
            data,
            options,
            colorScheme
          } = viewData;
          const run = `
            if(window.ChatnelsClient) {
              window.ChatnelsClient.showView({
                type: "${type}",
                data: ${JSON.stringify(data)},
                options: ${JSON.stringify(options)},
                colorScheme: ${JSON.stringify(colorScheme)},
              });
            }
            true;
          `;
          webviewRef.current.injectJavaScript(run);
        }
      }
    } catch (e) {}
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