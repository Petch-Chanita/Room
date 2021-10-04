const express = require('express');
const routes = express.Router();
const Room = require('../numroom');



routes.get('/', (req, res) => {
  res.send({ 'api': 'room' });
});

//-------------------------------------------------- GET all -------------------------------------------------------------------
routes.get('/select', async (req, res) => {
  var room = await Room.find({});
  res.json(room)

});

// search
routes.get('/search/:search', (req, res) => {
  const search = req.params.search;
  const Room_number = Room.find({ Room_number: { '$regex': search, '$options': 'i' } })
    .then(data => {
      res.send(data);
    })

  if (Room_number == search) {
    Room.find({ Room_number: { '$regex': search, '$options': 'i' } })
      .then(data => {
        res.send(data);
      })
  }
});
// Create room
routes.post('/createroom', async (req, res) => {
  const { Room_number, status, temperature, motion, luminance, people } = req.body
  try {
    await Room.create({
      Room_number,
      status,
      temperature,
      motion,
      luminance,
      people

    })
  } catch (error) {

    return res.status(400).json()
  }
  res.status(200).json({ Room_number, message: "Create room number saved successfully." })
});

routes.post('/update/:_id', function (req, res) {

  Room.findByIdAndUpdate(
      req.params._id,
      {
        Room_number: req.body.Room_number,
          status: req.body.status
      },
      {
          new: true
      },
      (err, data) => {
          if (err) {
              res.json({
                  success: false,
                  message: err
              })
          } else if (!data) {
              res.json({
                  success: false,
                  message: "Not Found"
              })
          } else {
              res.json({
                  success: true,
                  data: data
              })
          }
      }
  )
})
routes.get('/get/:_id', async (req, res) => {
  try {
      var person = await Room.findById(req.params._id).exec()
      res.send(person)
  } catch (error) {
      res.status(500).send(error)
  }
});



module.exports = routes;