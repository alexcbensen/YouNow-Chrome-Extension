/*
 * Alex's BetterNow - Filter Bypass (Page Context)
 */

(function() {
    const magicChar = String.fromCharCode(8203); // zero-width space
    
    function obfuscateChatText(text) {
        let obfuscatedText = "";
        let enableObfuscation = true;

        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') enableObfuscation = true;
            if (text[i + 1] === '@' || text[i + 1] === '#' || text.substring(i + 1, i + 5) === 'http') enableObfuscation = false;
            obfuscatedText += text[i] + (enableObfuscation ? magicChar : "");
        }
        return obfuscatedText;
    }
    
    // Intercept fetch
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
        if (window.__betternowFilterBypass && options && options.body && typeof options.body === "string" && options.body.indexOf("comment=") >= 0) {
            const params = new URLSearchParams(options.body);
            const comment = params.get("comment");
            params.set("comment", obfuscateChatText(comment));
            options.body = params.toString();
        }
        return originalFetch.call(this, url, options);
    };
    
    // Intercept XMLHttpRequest
    const originalXHRSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(data) {
        if (window.__betternowFilterBypass && typeof data === "string" && data.indexOf("comment=") >= 0) {
            const params = new URLSearchParams(data);
            const comment = params.get("comment");
            params.set("comment", obfuscateChatText(comment));
            data = params.toString();
        }
        originalXHRSend.call(this, data);
    };
    
    // Listen for messages from content script
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'BETTERNOW_FILTER_BYPASS') {
            window.__betternowFilterBypass = event.data.enabled;
            console.log('[BetterNow] Filter bypass:', event.data.enabled ? 'enabled' : 'disabled');
        }
    });
    
    // Set initial state from localStorage
    window.__betternowFilterBypass = localStorage.getItem('betternow_chatFilterBypass') === 'true';
    
    console.log('[BetterNow] Filter bypass loaded, enabled:', window.__betternowFilterBypass);
})();
