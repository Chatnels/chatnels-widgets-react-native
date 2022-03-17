import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { htmlTemplate } from './htmlTemplate';
import { CHANTELS_EVENT_TYPE } from './enums';
export const ChatnelsWidget = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    orgDomain,
    serviceProvider = 'chatnels.com',
    sessionToken,
    viewData,
    onChatnelsEvent,
    onReady,
    onRequestSession,
    onError
  } = _ref;
  const webviewRef = React.useRef(null);
  const [webviewKey, setWebviewKey] = React.useState(0);
  const [source, setSource] = React.useState('');
  const [savedSessionToken, setSavedSessionToken] = React.useState(sessionToken);
  const [savedViewData, setSavedViewData] = React.useState();
  const [hasError, setHasError] = React.useState(false);
  const [processDidTerminated, setProcessDidTerminated] = React.useState(false);
  const injectEmbedData = React.useCallback(embedData => {
    if (webviewRef.current) {
      const {
        type,
        data,
        options,
        colorScheme
      } = embedData;
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
  }, []);
  const handleContentProcessDidTerminate = React.useCallback(() => {
    setProcessDidTerminated(true);
    setWebviewKey(webviewKey + 1);
  }, [webviewKey]);
  const handleError = React.useCallback(e => {
    setHasError(true);

    if (onError) {
      onError(e);
    }
  }, [onError]);
  const handleMessage = React.useCallback(event => {
    try {
      const {
        type,
        data
      } = JSON.parse(event.nativeEvent.data);

      if (type === CHANTELS_EVENT_TYPE.LOAD_SCRIPT_ERROR) {
        handleError(new Error(data));
      } else if (type === 'reAuth') {
        if (onRequestSession) {
          onRequestSession();
        }
      } else if (type === CHANTELS_EVENT_TYPE.APP_READY) {
        // if the process is terminated, resend the embed data after onReady
        if (processDidTerminated) {
          setProcessDidTerminated(false);

          if (savedViewData) {
            injectEmbedData(savedViewData);
          }
        }

        if (onReady) {
          onReady();
        }
      } else if (type === CHANTELS_EVENT_TYPE.APP_REQUEST_FOCUS) {
        var _webviewRef$current;

        (_webviewRef$current = webviewRef.current) === null || _webviewRef$current === void 0 ? void 0 : _webviewRef$current.requestFocus();
      } else if (onChatnelsEvent) {
        onChatnelsEvent(type, data);
      }
    } catch (e) {}
  }, [handleError, injectEmbedData, onChatnelsEvent, onReady, onRequestSession, processDidTerminated, savedViewData]); // const handleRenderError = React.useCallback(
  //   (errorDomain, errorCode, errorDesc) => {
  //     return <></>;
  //   },
  //   []
  // );

  const handleReload = React.useCallback(() => {
    setHasError(false);
    setWebviewKey(webviewKey + 1);
  }, [webviewKey]);
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
          injectEmbedData(viewData);
        }
      }
    } catch (e) {}
  }, [injectEmbedData, savedViewData, viewData]);
  React.useImperativeHandle(ref, () => ({
    refresh: handleReload
  }), [handleReload]);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(WebView, {
    ref: webviewRef,
    key: webviewKey,
    source: {
      html: source,
      baseUrl: 'chatnels://local.chatnels.com/'
    },
    style: {
      flex: 1
    },
    bounces: true,
    decelerationRate: 'fast',
    domStorageEnabled: true,
    injectedJavaScriptForMainFrameOnly: true // injectedJavaScriptBeforeContentLoaded={}
    ,
    injectedJavaScriptBeforeContentLoadedForMainFrameOnly: true,
    javaScriptEnabled: true,
    mixedContentMode: 'always',
    originWhitelist: ['*'],
    overScrollMode: 'never',
    scrollEnabled: false,
    thirdPartyCookiesEnabled: true,
    onContentProcessDidTerminate: handleContentProcessDidTerminate,
    onMessage: handleMessage,
    onError: handleError
  }), hasError && /*#__PURE__*/React.createElement(View, {
    style: {
      backgroundColor: 'white',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Text, null, "Unable to connect to service."), /*#__PURE__*/React.createElement(Text, null, "Please try again later."), /*#__PURE__*/React.createElement(Button, {
    title: "Retry",
    onPress: handleReload
  })));
});
//# sourceMappingURL=ChatnelsWidget.js.map