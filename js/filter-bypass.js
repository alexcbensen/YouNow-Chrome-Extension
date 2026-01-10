/*
 * Alex's BetterNow - Filter Bypass (Page Context)
 */

(function() {
    const magicChar = String.fromCharCode(8203); // zero-width space

    // Decode the word list (obfuscated to keep source clean)
    const _0x = 'WyJhaG9sZSIsICJhbWNpayIsICJhbmRza290YSIsICJhbnVzIiwgImFyc2NobG9jaCIsICJhcnNlIiwgImFzaDBsZSIsICJhc2gwbGVzIiwgImFzaG9sZXMiLCAiYXNzIiwgImFzc2ZhY2UiLCAiYXNzaDBsZSIsICJhc3NoMGxleiIsICJhc3Nob2xlIiwgImFzc2hvbGVzIiwgImFzc2hvbHoiLCAiYXNzcmFtbWVyIiwgImFzc3dpcGUiLCAiYXlpciIsICJhenpob2xlIiwgImJhc3N0ZXJkcyIsICJiYXN0YXJkIiwgImJhc3RhcmRzIiwgImJhc3RhcmR6IiwgImJhc3RlcmRzIiwgImJhc3RlcmR6IiwgImJpYXRjaCIsICJiaXRjaCIsICJiaXRjaGVzIiwgImJpdGNoaW5nIiwgImJpdGNoeSIsICJibG93am9iIiwgImJvZmZpbmciLCAiYm9pb2xhcyIsICJib2xsb2NrIiwgImJvbGxvY2tzIiwgImJvb2IiLCAiYm9vYmllIiwgImJvb2JpZXMiLCAiYm9vYnMiLCAiYnJlYXN0cyIsICJidWNldGEiLCAiYnV0dCIsICJidXR0aG9sZSIsICJidXR0d2lwZSIsICJjYWJyb24iLCAiY2F3ayIsICJjYXdrcyIsICJjYXp6byIsICJjaGluayIsICJjaHJhYSIsICJjaHVqIiwgImNpcGEiLCAiY2xpdCIsICJjbGl0cyIsICJjbnRzIiwgImNudHoiLCAiY29jayIsICJjb2NraGVhZCIsICJjb2NrcyIsICJjb2Nrc3Vja2VyIiwgImNyYXAiLCAiY3JhcHB5IiwgImN1bSIsICJjdW1taW5nIiwgImN1bXNob3QiLCAiY3VudCIsICJjdW50cyIsICJjdW50eiIsICJkYW1taXQiLCAiZGFtbiIsICJkYW1uZWQiLCAiZGF5Z28iLCAiZGVnbyIsICJkaWNrIiwgImRpY2toZWFkIiwgImRpY2tzIiwgImRpa2UiLCAiZGlsZG8iLCAiZGlsZG9zIiwgImRpcnNhIiwgImRvbWluYXRyaXgiLCAiZHVwYSIsICJkeWtlIiwgImR6aXdrYSIsICJlamFja3VsYXRlIiwgImVqYWt1bGF0ZSIsICJlbmN1bGVyIiwgImVuZW1hIiwgImZhZyIsICJmYWdldCIsICJmYWdnMHQiLCAiZmFnZ2l0IiwgImZhZ2dvdCIsICJmYWdpdCIsICJmYWdzIiwgImZhZ3oiLCAiZmFpZyIsICJmYWlncyIsICJmYW5jdWxvIiwgImZhbm55IiwgImZhcnQiLCAiZmF0YXNzIiwgImZjdWsiLCAiZmVjZXMiLCAiZmVsY2hlciIsICJmaWNrZW4iLCAiZmxpa2tlciIsICJmb3Jlc2tpbiIsICJmb3R6ZSIsICJmdWNrIiwgImZ1Y2tlZCIsICJmdWNrZXIiLCAiZnVja2VycyIsICJmdWNraW4iLCAiZnVja2luZyIsICJmdWNrcyIsICJmdWsiLCAiZnVrYWgiLCAiZnVrZW4iLCAiZnVrZXIiLCAiZnVraW4iLCAiZnVrayIsICJmdWtrYWgiLCAiZnVra2VuIiwgImZ1a2tlciIsICJmdWtraW4iLCAiZnV0a3JldHpuIiwgImdvb2siLCAiZ3VpZW5hIiwgImhhbmRqb2IiLCAiaGVsbCIsICJoZWxscyIsICJoZWx2ZXRlIiwgImhvYXIiLCAiaG9lciIsICJob25rZXkiLCAiaG9vciIsICJob29yZSIsICJob3JlIiwgImhvcm55IiwgImh1ZXZvbiIsICJodWkiLCAiaW5qdW4iLCAiamFja29mZiIsICJqYXAiLCAiamFwcyIsICJqZXJrb2ZmIiwgImppc2ltIiwgImppc20iLCAiamlzcyIsICJqaXptIiwgImppenoiLCAia2Fua2VyIiwgImthd2siLCAia2lrZSIsICJraWxsIiwgImtpbGxpbmciLCAia2xvb3R6YWsiLCAia21zIiwgImtub2IiLCAia25vYnMiLCAia25vYnoiLCAia251bGxlIiwgImtyYXV0IiwgImt1ayIsICJrdWtzdWdlciIsICJrdW50IiwgImt1bnRzIiwgImt1bnR6IiwgImt1cmFjIiwgImt1cndhIiwgImt1c2kiLCAia3lycGEiLCAia3lzIiwgImxlc2JvIiwgImxlenppYW4iLCAibGlwc2hpdHMiLCAibGlwc2hpdHoiLCAibWFtaG9vbiIsICJtYXNvY2hpc3QiLCAibWFzb2tpc3QiLCAibWFzc3RlcmJhaXQiLCAibWFzc3RyYmFpdCIsICJtYXNzdHJiYXRlIiwgIm1hc3RlcmJhaXRlciIsICJtYXN0ZXJiYXRlIiwgIm1hc3RlcmJhdGVzIiwgIm1hc3R1cmJhdGUiLCAibWFzdHVyYmF0aW5nIiwgIm1hc3R1cmJhdGlvbiIsICJtZXJkIiwgIm1pYnVuIiwgIm1vZm8iLCAibW9ua2xlaWdoIiwgIm1vdGhlcmZ1Y2tlciIsICJtb3RoZXJmdWNrZXJzIiwgIm1vdWxpZXdvcCIsICJtdWllIiwgIm11bGtrdSIsICJtdXJkZXIiLCAibXVzY2hpIiwgIm5ha2VkIiwgIm5hc3R0IiwgIm5hemkiLCAibmF6aXMiLCAibmVwZXNhdXJpbyIsICJuaWdnYSIsICJuaWdnYXMiLCAibmlnZ2VyIiwgIm5pZ2dlcnMiLCAibmlndXIiLCAibmlpZ2VyIiwgIm5paWdyIiwgIm51ZGUiLCAibnVkZXMiLCAibnV0c2FjayIsICJvcmFmaXMiLCAib3JnYXNpbSIsICJvcmdhc20iLCAib3JnYXNtcyIsICJvcmdhc3VtIiwgIm9yaWZhY2UiLCAib3JpZmljZSIsICJvcmlmaXNzIiwgIm9yb3NwdSIsICJwYWNraSIsICJwYWNraWUiLCAicGFja3kiLCAicGFraSIsICJwYWtpZSIsICJwYWt5IiwgInBhc2thIiwgInBlY2tlciIsICJwZWVlbnVzIiwgInBlZWVudXNzcyIsICJwZWVudXMiLCAicGVpbnVzIiwgInBlbmFzIiwgInBlbmlzIiwgInBlbnVzIiwgInBlbnV1cyIsICJwZXJzZSIsICJwaHVjIiwgInBodWNrIiwgInBodWsiLCAicGh1a2VyIiwgInBodWtrZXIiLCAicGlja2EiLCAicGllcmRvbCIsICJwaWxsdSIsICJwaW1tZWwiLCAicGltcGlzIiwgInBpc3MiLCAicGlzc2VkIiwgInBpc3NpbmciLCAicGl6ZGEiLCAicG9sYWMiLCAicG9sYWNrIiwgInBvbGFrIiwgInBvb25hbmkiLCAicG9vbnRzZWUiLCAicG9vcCIsICJwb3JuIiwgInBvcm5vIiwgInBvcm5vZ3JhcGh5IiwgInByZXRlZW4iLCAicHJpY2siLCAicHVsYSIsICJwdWxlIiwgInB1c3NlIiwgInB1c3NlZSIsICJwdXNzaWVzIiwgInB1c3N5IiwgInB1dGEiLCAicHV0byIsICJwdXVrZSIsICJwdXVrZXIiLCAicWFoYmVoIiwgInF1ZWVmIiwgInF1ZWVyIiwgInJhcGUiLCAicmFwZWQiLCAicmFwaW5nIiwgInJhcGlzdCIsICJyYXV0ZW5iZXJnIiwgInJlY2t0dW0iLCAicmVjdHVtIiwgInJldGFyZCIsICJyZXRhcmRlZCIsICJyZXRhcmRzIiwgInNhZGlzdCIsICJzY2FuayIsICJzY2hhZmZlciIsICJzY2hlaXNzIiwgInNjaGxhbXBlIiwgInNjaGxvbmciLCAic2NobXVjayIsICJzY3JldyIsICJzY3Jld2luZyIsICJzY3JvdHVtIiwgInNlZ2EiLCAic2VtZW4iLCAic2V4IiwgInNleHVhbCIsICJzZXh5IiwgInNoYXJtdXRhIiwgInNoYXJtdXRlIiwgInNoZW1hbGUiLCAic2hpcGFsIiwgInNoaXQiLCAic2hpdHMiLCAic2hpdHRlciIsICJzaGl0dHkiLCAic2hpdHkiLCAic2hpdHoiLCAic2hpeiIsICJzaHl0IiwgInNoeXRlIiwgInNoeXR0eSIsICJzaHl0eSIsICJza2FuY2siLCAic2thbmsiLCAic2thbmtlZSIsICJza2Fua2V5IiwgInNrYW5rcyIsICJza2Fua3kiLCAic2tyaWJ6IiwgInNrdXJ3eXN5biIsICJzbGFnIiwgInNsdXQiLCAic2x1dHMiLCAic2x1dHR5IiwgInNsdXR6IiwgInNtdXQiLCAic3BoZW5jdGVyIiwgInNwaWMiLCAic3BpZXJkYWxhaiIsICJzcGxvb2dlIiwgInN1aWNpZGUiLCAic3VrYSIsICJ0ZWV0cyIsICJ0ZWV6IiwgInRlc3RpY2FsIiwgInRlc3RpY2xlIiwgInRlc3RpY2xlcyIsICJ0aXQiLCAidGl0cyIsICJ0aXR0IiwgInRpdHRpZXMiLCAidGl0dHkiLCAidHVyZCIsICJ0d2F0IiwgInR3YXRzIiwgInZhZ2lpbmEiLCAidmFnaW5hIiwgInZhamluYSIsICJ2aXR0dSIsICJ2dWxsdmEiLCAidnVsdmEiLCAid2FuayIsICJ3YW5rZXIiLCAid2Fua2VycyIsICJ3YW5raW5nIiwgIndldGJhY2siLCAid2hvYXIiLCAid2hvcmUiLCAid2hvcmVzIiwgIndpY2hzZXIiLCAid29wIiwgInhyYXRlZCIsICJ4eHgiLCAieWVkIiwgInphYm91cmFoIl0K';
    const badWords = JSON.parse(atob(_0x));

    // Create a regex pattern that matches whole words (case insensitive)
    const badWordsPattern = new RegExp('\\b(' + badWords.join('|') + ')\\b', 'gi');

    function obfuscateWord(word) {
        // Insert zero-width space after each character
        let result = '';
        for (let i = 0; i < word.length; i++) {
            result += word[i] + magicChar;
        }
        return result;
    }

    function obfuscateChatText(text) {
        // Only obfuscate words that match the bad words list
        return text.replace(badWordsPattern, (match) => obfuscateWord(match));
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
        }
    });

    // Set initial state from localStorage
    window.__betternowFilterBypass = localStorage.getItem('betternow_chatFilterBypass') === 'true';
})();