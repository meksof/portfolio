import type { RequestBody, ResponseBody } from "./models";

// Get SMT server URL from hidden input
const smtServerInput = document.querySelector('input[name="smt-server"]') as HTMLInputElement;
const smtServer = smtServerInput ? smtServerInput.value : 'http://localhost:3000';
// Function to track a visit
function trackVisit() {
    // Get referrer
    const referrer = document.referrer || '(direct)';

    // Get UTM source from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || null;
    const page = window.location.pathname;

    // Record the start time
    const startTime = Date.now();
    let sessionId: string = '';

    // Create the request body
    const requestBody: RequestBody = {
        referrer,
        utm_source: utmSource,
        page,
        duration: 0 // Initial duration is 0
    };

    // Send initial page view data (with 0 duration)
    fetch(`${smtServer}/track`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then((data: ResponseBody) => {
            // Store the session ID from the initial response
            sessionId = data.id;
        })
        .catch(err => console.error('Error tracking initial visit:', err));

    // Track time on page using visibility change and beforeunload
    let lastVisibleTime = startTime;
    let totalActiveTime = 0;
    let isDocumentVisible = true;

    // Function to update session duration
    const updateSessionDuration = (duration: number) => {
        if (!sessionId) return;

        const durationSeconds = Math.round(duration / 1000);
        const updateUrl = `${smtServer}/track/${sessionId}`;

        // Using FormData for sendBeacon
        const formData = new FormData();
        formData.append('duration', durationSeconds.toString());

        if (navigator.sendBeacon) {
            // Set proper headers for FormData
            const blob = new Blob([], { type: 'application/x-www-form-urlencoded' });
            // Append the duration to the blob
            const durationString = `duration=${encodeURIComponent(durationSeconds.toString())}`;
            const updatedBlob = new Blob([blob, durationString], { type: 'application/x-www-form-urlencoded' });
            navigator.sendBeacon(updateUrl, updatedBlob);

            // Alternative approach that actually sends the data:
            if (!navigator.sendBeacon(updateUrl, updatedBlob)) {
                // Fallback to fetch if sendBeacon fails
                sendWithFetch();
            }
        } else {
            // Fallback to fetch
            sendWithFetch();
        }

        function sendWithFetch() {
            // For fetch, we can use proper headers
            fetch(updateUrl, {
                method: 'POST',
                body: formData, // Let the browser set proper headers
                keepalive: true
            }).catch(err => console.error('Error updating duration:', err));
        }
    };

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        const now = Date.now();
        if (document.visibilityState === 'hidden') {
            // Document became hidden - record active time
            totalActiveTime += now - lastVisibleTime;
            isDocumentVisible = false;
            updateSessionDuration(totalActiveTime);
        } else {
            // Document became visible again
            lastVisibleTime = now;
            isDocumentVisible = true;
        }
    });

    // Handle page unload
    window.addEventListener('pagehide', () => {
        const now = Date.now();
        if (isDocumentVisible) {
            totalActiveTime += now - lastVisibleTime;
        }
        updateSessionDuration(totalActiveTime);
    });

    // Fallback for older browsers
    window.addEventListener('beforeunload', () => {
        const now = Date.now();
        if (isDocumentVisible) {
            totalActiveTime += now - lastVisibleTime;
        }
        updateSessionDuration(totalActiveTime);
    });
}

// Start tracking when page loads
if (document.readyState === 'complete') {
    trackVisit();
} else {
    document.addEventListener('DOMContentLoaded', trackVisit);
}