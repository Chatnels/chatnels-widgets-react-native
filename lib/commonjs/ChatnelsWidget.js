"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatnelsWidget = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNativeWebview = require("react-native-webview");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const html = '<!DOCTYPE html><html><head>' + '<script type="text/javascript" async="" src="https://statics.qa.chatnels.com/admin/js/chatnels.client.js"></script>' + '<style>#chatnels-root {width: 100%; height: 100%; position: relative;}</style>' + '</head><body><div id="chatnels-root" /></body></html>';

const jsTemplate = (orgDomain, sessionToken) => `window.chatnelsAsync = function() {
            window.ChatnelsClient.load({ domain: ${orgDomain}, sessionToken: ${sessionToken} });
            window.ChatnelsClient.on('chatnels:message', handleChatnelsMessage);
        };`;

const ChatnelsWidget = _ref => {
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
  return /*#__PURE__*/React.createElement(_reactNativeWebview.WebView, {
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

exports.ChatnelsWidget = ChatnelsWidget;
//# sourceMappingURL=ChatnelsWidget.js.mapsClient.updateSessionToken("${sessionToken}");
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
    onMessage: handleMessage
  });
};

exports.ChatnelsWidget = ChatnelsWidget;
//# sourceMappingURL=ChatnelsWidget.js.map