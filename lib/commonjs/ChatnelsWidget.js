"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatnelsWidget = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeWebview = require("react-native-webview");

var _htmlTemplate = require("./htmlTemplate");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ChatnelsWidget = _ref => {
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
  const [webviewKey, setWebviewKey] = React.useState(1);
  const [source, setSource] = React.useState('');
  const [savedSessionToken, setSavedSessionToken] = React.useState(sessionToken);
  const [savedViewData, setSavedViewData] = React.useState();
  const [hasError, setHasError] = React.useState(false);
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

      if (type === 'loadScriptError') {
        handleError(new Error(data));
      } else if (type === 'reAuth') {
        if (onRequestSession) {
          onRequestSession();
        }
      } else if (type === 'app:ready') {
        if (savedViewData) {
          injectEmbedData(viewData);
        }

        if (onReady) {
          onReady();
        }
      } else if (onChatnelsEvent) {
        onChatnelsEvent(type, data);
      }
    } catch (e) {}
  }, [handleError, injectEmbedData, savedViewData, viewData, onChatnelsEvent, onReady, onRequestSession]); // const handleRenderError = React.useCallback(
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
      setSource((0, _htmlTemplate.htmlTemplate)(orgDomain, serviceProvider, sessionToken, viewData));
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
  }, [injectEmbedData, viewData, savedViewData]);
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(_reactNativeWebview.WebView, {
    key: webviewKey,
    ref: webviewRef,
    source: {
      html: source,
      baseUrl: 'https://local.chatnels.com/'
    },
    style: {
      flex: 1
    },
    bounces: true,
    decelerationRate: 'fast',
    domStorageEnabled: true,
    injectedJavaScriptForMainFrameOnly: true,
    injectedJavaScriptBeforeContentLoadedForMainFrameOnly: true,
    javaScriptEnabled: true,
    mixedContentMode: 'always',
    originWhitelist: ['*'],
    overScrollMode: 'never',
    scrollEnabled: false,
    thirdPartyCookiesEnabled: true,
    onMessage: handleMessage,
    onError: handleError
  }), hasError && /*#__PURE__*/React.createElement(_reactNative.View, {
    style: {
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
  }, /*#__PURE__*/React.createElement(_reactNative.Text, null, "Unable to connect to service. Please try again later."), /*#__PURE__*/React.createElement(_reactNative.Button, {
    title: "Retry",
    onPress: handleReload
  })));
};

exports.ChatnelsWidget = ChatnelsWidget;
//# sourceMappingURL=ChatnelsWidget.js.map