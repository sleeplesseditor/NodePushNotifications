const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//Set Static Path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

//Enter Public and Private Keys Here
const publicVapidKey ='BOtEUniVhvsJsecdOY15dHRbASpGG-ZvPPvNerUgm6tXAehc8gihgkELyA3EfBZ78y6-rL4XK4HoFhgbfTq6zG8';
const privateVapidKey='NroHysZtQvgcnTxexnHdkuK1Dh2KWge-lr7Zs8JC-sc';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//Subscribe Route
app.post('/subscribe', (req, res) => {
    //Get pushSubscription Object
    const subscription = req.body;

    //Send 201 Status – Resource Created
    res.status(201).json({});

    //Create Payload
    const payload = JSON.stringify({ title: 'Push Test' });

    //Pass Object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server Started on Port ${port}`));