const Admin = require('../admin');
const express = require('express');
const routes = express.Router();

// GET all
routes.get('/', (req, res) => {
  res.send({ 'api': 'admincreate' });
});

// POST (create new data)
routes.post('/', (req, res) => {
  var obj = new Admin(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
  });
});

routes.post('/create',(req, res) => {
 const {Room_number,date,time,label} = req.body;
  try {
     Admin.create({
      Room_number,
      date,
      time,
      label
    })
  } catch (error){
    return res.status(400).json()
  }
  res.status(200).json({date,message:"Succ"})
})


module.exports = routes;