const fs = require('fs');
const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use('/public', express.static('public'));

app.use(cors());



app.get('/', (req, res) => {

  axios.get('https://informer.minfin.com.ua/ua/gen/banks');
  res.sendFile(__dirname + '/view/home.html');
});

app.get('*', (req, res) => {

  axios.get('https://informer.minfin.com.ua/ua/gen/banks').then(r => {
    console.log(r);
    res.send({test: r});
  });
});


app.listen(3000);