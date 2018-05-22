const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//Set Static Path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

//Enter Public and Private Keys Here
const publicVapidKey ='';
const privateVapidKey='';

webpush.setVapidDetails(
    'mailto:test@test.com', 
    publicVapidKey, 
    privateVapidKey
);

//Subscribe Route
app.post('/subscribe', (req, res) => {
    //Get pushSubscription Object
    const subscription = req.body;

    //Send 201 Status – Resource Created
    res.status(201).json({});

    //Create Payload
    const payload = JSON.stringify({ title: 'Push Test' });

    //Pass Object into sendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server Started on Port ${port}`));