export let ChatnelsEventsType;

(function (ChatnelsEventsType) {
  ChatnelsEventsType["EXTERNAL_URL"] = "external:url";
  ChatnelsEventsType["INBOX_BACK"] = "inbox:back";
  ChatnelsEventsType["INBOX_ITEM_CLICKED"] = "inbox:item:clicked";
  ChatnelsEventsType["REAUTH"] = "reAuth";
  ChatnelsEventsType["THREADS_BACK"] = "threads:back";
  ChatnelsEventsType["USER_PROFILE_CLICK"] = "user:profile:click";
})(ChatnelsEventsType || (ChatnelsEventsType = {}));

export let InternalChatnelsEventsType;

(function (InternalChatnelsEventsType) {
  InternalChatnelsEventsType["LOAD_SCRIPT_ERROR"] = "loadScriptError";
  InternalChatnelsEventsType["APP_READY"] = "app:ready";
  InternalChatnelsEventsType["APP_REQUEST_FOCUS"] = "app:request:focus";
})(InternalChatnelsEventsType || (InternalChatnelsEventsType = {}));
//# sourceMappingURL=enums.js.map