"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalChatnelsEventsType = exports.ChatnelsEventsType = void 0;
let ChatnelsEventsType;
exports.ChatnelsEventsType = ChatnelsEventsType;

(function (ChatnelsEventsType) {
  ChatnelsEventsType["EXTERNAL_URL"] = "external:url";
  ChatnelsEventsType["INBOX_BACK"] = "inbox:back";
  ChatnelsEventsType["INBOX_ITEM_CLICKED"] = "inbox:item:clicked";
  ChatnelsEventsType["REAUTH"] = "reAuth";
  ChatnelsEventsType["THREADS_BACK"] = "threads:back";
  ChatnelsEventsType["USER_PROFILE_CLICK"] = "user:profile:click";
})(ChatnelsEventsType || (exports.ChatnelsEventsType = ChatnelsEventsType = {}));

let InternalChatnelsEventsType;
exports.InternalChatnelsEventsType = InternalChatnelsEventsType;

(function (InternalChatnelsEventsType) {
  InternalChatnelsEventsType["LOAD_SCRIPT_ERROR"] = "loadScriptError";
  InternalChatnelsEventsType["APP_READY"] = "app:ready";
  InternalChatnelsEventsType["APP_REQUEST_FOCUS"] = "app:request:focus";
})(InternalChatnelsEventsType || (exports.InternalChatnelsEventsType = InternalChatnelsEventsType = {}));
//# sourceMappingURL=enums.js.map