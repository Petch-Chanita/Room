const Admin = require('../admin');
const express = require('express');
const routes = express.Router();

// GET all
routes.get('/', (req, res) => {
    res.send({'api': 'admincreate'});
});

// POST (create new data)
routes.post('/', (req, res) => {
    var obj = new Admin(req.body);
    obj.save((err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
    });
  });

  module.exports = routes;