import { type VisitViewModel, type Visit, Cookies, type VisitUpdateViewModel } from "./models";
import { getCookie, setCookie } from "./utils";

// Function to track a visit
export function trackVisit(smtServer: string) {
    // Get referrer
    const referrer = document.referrer || '(direct)';

    // Get UTM source from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || null;
    const fullUrl = window.location.href; 

    // Record the start time
    const startTime = Date.now();
    let visitId: string = '';
    let sessionId: string = getCookie(Cookies.sessionId) || '';

    // Track total visible duration and last visible timestamp
    let totalVisibleDuration = 0; // duration in milliseconds
    let lastVisibleTime = startTime;

    // Create the request body
    const requestBody: VisitViewModel = {
        referrer,
        utmSource: utmSource,
        page: fullUrl,
        createTimestamp: startTime
    };

    if (sessionId !== '') {
        requestBody.sessionId = sessionId;
    }

    // Send initial page view data (with 0 duration)
    fetch(`${smtServer}/track`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then((data: Visit) => {
            visitId = data.id;
            sessionId = data.sessionId;
            
            // Store the sessionId in a cookie for later use in tracking events
            setCookie(Cookies.sessionId, sessionId);
            setCookie(Cookies.visitId, visitId)
        })
        .catch(err => console.error('Error tracking initial visit:', err));

    // Function to update session duration
    const updateSessionTimestamp = (duration: number) => {
        if (!visitId) return;

        const updateUrl = `${smtServer}/track/${visitId}`;

        // Try to send using sendBeacon
        if (navigator.sendBeacon) {
            // Set proper headers for FormData
            const blob = new Blob([], { type: 'application/x-www-form-urlencoded' });
            // Append the duration to the blob
            const params = `duration=${encodeURIComponent(duration.toString())}&update_timestamp=${encodeURIComponent(Date.now().toString())}`;
            const updatedBlob = new Blob([blob, params], { type: 'application/x-www-form-urlencoded' });
            const success = navigator.sendBeacon(updateUrl, updatedBlob);
            
            if (!success) {
                // Fallback to fetch if sendBeacon fails
                sendWithFetch();
            }
        } else {
            // Fallback to fetch if sendBeacon is not available
            sendWithFetch();
        }

        function sendWithFetch() {
            // For fetch, we can use proper headers
            const updatePayload: VisitUpdateViewModel = {
                duration: duration,
                updateTimestamp: Date.now()
            };

            fetch(updateUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatePayload),
                keepalive: true
            }).catch(err => console.error('Error updating duration:', err));
        }
    };

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        const now = Date.now();
        if (document.visibilityState === 'hidden') {
            // Add the time spent since last visible to total duration
            totalVisibleDuration += now - lastVisibleTime;
        } else if (document.visibilityState === 'visible') {
            // Reset the last visible time
            lastVisibleTime = now;
        }
        updateSessionTimestamp(totalVisibleDuration);
    });

    // Handle page unload
    window.addEventListener('pagehide', () => {
        const now = Date.now();
        // Add the last visible period if the page is still visible
        if (document.visibilityState === 'visible') {
            totalVisibleDuration += now - lastVisibleTime;
        }
        updateSessionTimestamp(totalVisibleDuration);
    });

    // Fallback for older browsers
    window.addEventListener('beforeunload', () => {
        const now = Date.now();
        if (document.visibilityState === 'visible') {
            totalVisibleDuration += now - lastVisibleTime;
        }
        updateSessionTimestamp(totalVisibleDuration);
    });
}
