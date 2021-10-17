const express = require('express');
const routes = express.Router();
const Room = require('../numroom');
const information = require('../Information')
const Static = require('../static');
const Influx = require("influx");
const moment = require('moment');
const http = require('http');

routes.get('/', (req, res) => {
  res.send({ 'api': 'room' });
});

//-------------------------------------------------- GET all -------------------------------------------------------------------
routes.get('/select', async (req, res) => {
  var room = await Room.find({});
  // room.sort();
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
routes.get('/search/status/:search', (req, res) => {
  const search = req.params.search;
  Room.find({ status: { '$regex': search} })
      .then(data => {
        res.send(data);
      })
});

// Create room
routes.post('/createroom', async (req, res) => {
  const { datetime, Room_number, status, temperature, motion, luminance, people } = req.body
  try {
    await Room.create({
      datetime,
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
routes.get('/getname/:Room_number', async (req, res) => {
  try {
      var rooms = await Room.find({ Room_number: { '$regex':req.params.Room_number,'$options': 'i'} }).exec()
      // console.log(req.params.Room_number);
      res.send(rooms)
  } catch (error) {
      res.status(500).send(error)
  }
})

routes.get('/refresh',async(res)=>{

  const influx = new Influx.InfluxDB({
            host: '202.28.34.197',
            port: 8086,
            database: 'LabRoom_lora',
            username: 'admin',
            password: 'C$@dmin',
            schema: [
                {
                    measurement: 'device_frmpayload_data_Luminance',
                    fields: { value: Influx.FieldType.FLOAT },
                    tags: ['application_name', 'dev_eui', 'device_name', 'f_port'],
                },
            ]
        });
    
        var sql = [];
        sql.push(`select count(*), mean(value) from device_frmpayload_data_Luminance where time > now() - 1m`);
        sql.push(`select count(*), mean(value) from device_frmpayload_data_Motion where time > now() - 1m`);
        sql.push(`select count(*), mean(value) from device_frmpayload_data_Temperature where time > now() - 1m`);
        var sensors = { datetime: "", temperature: 0, motion: 0, luminance: 0, label: "กำลังถูกใช้งาน" };
        var Room_sensor = { datetime: "",Room_number: "IT-109", status: "กำลังถูกใช้งาน", temperature: 0, motion: 0, luminance: 0, people: 0 };
        var infor_sensor = { datetime: "", temperature: 0, motion: 0, luminance: 0, label: "" };
        var _id = "615d7097ac4f9e196cce8807";
    
        var today = moment(new Date()).format('DD-MM-YYYY H:mm');
        sensors.datetime = today;
        Room_sensor.datetime = today;
        infor_sensor.datetime = today;
        for (let i = 0; i < sql.length; i++) {
            let result = await influx.query(sql[i]);
            if (result.length == 1) {
                if (i == 0) {
                    sensors.luminance = result[0].mean;
                    Room_sensor.luminance = result[0].mean;
                    infor_sensor.luminance = result[0].mean;
                }
                else if (i == 1) {
                    sensors.motion = result[0].mean;
                    Room_sensor.motion = result[0].mean;
                    infor_sensor.motion = result[0].mean;
                }
                else if (i == 2) {
                    sensors.temperature = result[0].mean;
                    Room_sensor.temperature = result[0].mean;
                    infor_sensor.temperature = result[0].mean;
                }
            }
        }
        Static.create(
            sensors
        )
        console.log(infor_sensor);
        information.create(
            infor_sensor
        )
        var options = {
            host: '203.154.83.62',
            port: 20000,
            path: '/prediction',
            method: 'GET'
          };
          
          const req =  http.request(options,(res)=> {
            res.setEncoding('utf8');
            res.on('data', (chunk) =>{
    
                // console.log(`BODY: ${chunk.status}`);
                console.log("BODY:",chunk);
                console.log("status: ",JSON.parse(chunk)["status"]);
            
            try {
                console.log(JSON.parse(chunk)["status"]);
                Room_sensor.datetime = moment(new Date()).format('DD-MM-YYYY H:mm');
                if(JSON.parse(chunk)["status"] == 0){
                   
                    Room_sensor.status = "ว่าง"                                    
                }else{
                    
                    Room_sensor.status = "กำลังถูกใช้งาน"
                }
                console.log(Room_sensor.status);
                console.log(Room_sensor.datetime);
                Room.findByIdAndUpdate(
                    _id,
                    Room_sensor,
                    { new: true },
                    (err, data) => {
                        if (err != null) {
                            console.log(err);
                        }
                    }
                )
                
            }catch(error){
                console.log(error);
            }     
            });
            res.on('end', () => {
                console.log('No more data in response.');
              });
          });
          req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
          });
          req.end();
    });

module.exports = routes;