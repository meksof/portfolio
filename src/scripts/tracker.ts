import { trackEvent } from "./trackEvent";
import { trackVisit } from "./trackVisit";

// Get SMT server URL from hidden input
const smtServerInput = document.querySelector('input[name="smt-server"]') as HTMLInputElement;
const smtServer = smtServerInput ? smtServerInput.value : 'http://localhost:3000';

// Start tracking when page loads
if (document.readyState === 'complete') {
    trackVisit(smtServer);
} else {
    document.addEventListener('DOMContentLoaded', () => trackVisit(smtServer));
}

// track events on [data-track] elements
const trackElements = document.querySelectorAll('[data-track]');
trackElements.forEach((element) => {
    const eventType = element.getAttribute('data-track') || 'click';
    const eventValue = element.getAttribute('data-track-value') || 'unknown';

    element.addEventListener('click', () => {
        // Call the function to track the event
        trackEvent({ type: eventType, value: eventValue }, smtServer);
    });
});