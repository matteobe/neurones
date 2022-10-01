(() => {
    var e, t = 0;

    function n() {
        return window.location.host.split(".").slice(-2).join(".")
    }

    function o() {
        switch (n()) {
            case"youtube.com":
                return "ytd-comment-thread-renderer, ytd-comment-renderer.ytd-comment-replies-renderer";
            case"twitter.com":
                return '[lang][dir="auto"]';
            case"facebook.com":
                return '[dir="auto"][style*="text-align"]';
            case"reddit.com":
                return ".Comment";
            case"tiktok.com":
                return '[class*="DivCommentContentContainer"]';
            case"instagram.com":
                return '[role="menuitem"]'
        }
    }

    function c(e) {
        switch (n()) {
            case"youtube.com":
                return e.querySelector(".comment-renderer-text-content, yt-formatted-string.ytd-comment-renderer#content-text");
            case"twitter.com":
            case"facebook.com":
                return e;
            case"reddit.com":
                return e.querySelector('[data-testid="comment"]');
            case"tiktok.com":
                return e.querySelector('[class*="CommentText"]');
            case"instagram.com":
                var t = e.querySelectorAll("span");
                return t[t.length - 3]
        }
    }

    !function n() {
        (e = chrome.runtime.connect({name: "COMMENT"})).onDisconnect.addListener(n), e.onMessage.addListener((function (n) {
            if ("PREDICTION" === n.action) for (var r = document.querySelectorAll(o()), i = 0; i < r.length; i++) r[i].getAttribute("comment-id") === n.comment_id.toString() && "toxic" === n.prediction && (void 0 !== c(r[i]) && (c(r[i]).style.filter = "blur(5px)"), t++, e.postMessage({
                action: "COUNTER",
                counter: t
            }))
        }))
    }();
    var r = 0, i = document.body, s = {subtree: !0, childList: !0}, m = new MutationObserver((function (t, n) {
        document.querySelectorAll(o()).forEach((function (t) {
            if ("true" !== t.getAttribute("comment-seen")) {
                null === t.getAttribute("comment-id") && (t.setAttribute("comment-id", r), r++);
                try {
                    e.postMessage({
                        action: "NEW_COMMENT",
                        comment: c(t).innerText.toString(),
                        comment_id: t.getAttribute("comment-id")
                    }), t.setAttribute("comment-seen", "true")
                } catch (e) {
                    t.setAttribute("comment-seen", "false")
                }
            }
        }))
    }));

    function a() {
        chrome.storage.sync.get(["isExtensionActive", "selectedWebsites"], (function (e) {
            if (void 0 !== e.isExtensionActive && void 0 !== e.selectedWebsites || chrome.storage.sync.set({
                isExtensionActive: !0,
                selectedWebsites: ["facebook.com", "youtube.com", "twitter.com", "reddit.com", "instagram.com", "tiktok.com"]
            }), e.isExtensionActive && e.selectedWebsites.includes(n())) m.observe(i, s), console.log("Extension enabled"); else {
                m.disconnect(), console.log("Extension disabled");
                for (var r = document.querySelectorAll(o()), a = 0; a < r.length; a++) r[a].setAttribute("comment-seen", "false"), void 0 !== c(r[a]) && (c(r[a]).style.filter = "blur(0px)");
                t = 0
            }
        }))
    }

    a(), chrome.storage.onChanged.addListener((function (e) {
        (e.isExtensionActive || e.selectedWebsites) && a()
    }))
})();