import type { Event, EventViewModel } from "./models";
import { getCookie } from "./utils";

export function trackEvent(event: EventViewModel, smtServer: string) {
    // Create the request body
    const requestBody: EventViewModel = {
        visitId: getCookie('sessionId') || '',
        type: event.type,
        value: event.value,
    };

    // Send the event data
    fetch(`${smtServer}/event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then((data: Event) => console.log('Event tracked:', data)) // Todo: Remove this line in production
        .catch(err => console.error('Error tracking event:', err));
    
}
