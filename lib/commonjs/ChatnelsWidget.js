"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatnelsWidget = void 0;

var React = _interopRequireWildcard(require("react"));

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
  const [source, setSource] = React.useState('');
  const [savedSessionToken, setSavedSessionToken] = React.useState(sessionToken);
  const [savedViewData, setSavedViewData] = React.useState();
  const handleError = React.useCallback(e => {
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

      if (type === 'reAuth') {
        if (onRequestSession) {
          onRequestSession();
        }
      } else if (type === 'app:ready') {
        if (onReady) {
          onReady();
        }
      } else if (onChatnelsEvent) {
        onChatnelsEvent(type, data);
      }
    } catch (e) {}
  }, [onChatnelsEvent, onReady, onRequestSession]);
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
  return /*#__PURE__*/React.createElement(_reactNativeWebview.WebView, {
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
    onMessage: handleMessage,
    onError: handleError
  });
};

exports.ChatnelsWidget = ChatnelsWidget;
//# sourceMappingURL=ChatnelsWidget.js.map