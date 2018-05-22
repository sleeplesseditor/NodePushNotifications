console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push Received...');
    self.registration.showNotification(data.title, {
        //Enter Notification Text and Icon URL here
        body: 'Notified by The Sleepless Editor',
        icon: ''
    });
});