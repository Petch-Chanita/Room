const Static = require('../static');
const express = require('express');
const routes = express.Router();


routes.get('/', (req, res) => {
    res.send({'api': 'users'});
});

// POST (create new data)
routes.post('/', (req, res) => {
    var obj = new Static(req.body);
    obj.save((err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
    });
  });

module.exports = routes;