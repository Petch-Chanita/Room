const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const Static = require('./static');
const Room = require('./numroom');
const information = require('./Information');
const Influx = require("influx");
const moment = require('moment');
const http = require('http');


var mongo_url = "mongodb://Roomsystem:admin01@202.28.34.197:27017/Roomsystem";
mongoose.connect(mongo_url, { useFindAndModify: false },
    { useNewUrlParser: true }).then(
        () => {
            console.log("[success] task 2 : connected to the database ");
        },
        error => {
            console.log("[failed] task 2 " + error);
            process.exit();
        });



app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send({ message: "Welcome to Room" });
});

app.use('/static', require('./routes/staticroom'))
app.use('/admin', require('./routes/createmodel'))
app.use('/rooms', require('./routes/room'));
app.use('/users', require('./routes/user'));
app.use('/authen', require('./routes/authen'));

var port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log("[success] Application is running on port: " + port);
});
app.options('*', cors())


// cron.schedule('* * * * *', async function () {

//     const influx = new Influx.InfluxDB({
//         host: '202.28.34.197',
//         port: 8086,
//         database: 'LabRoom_lora',
//         username: 'admin',
//         password: 'C$@dmin',
//         schema: [
//             {
//                 measurement: 'device_frmpayload_data_Luminance',
//                 fields: { value: Influx.FieldType.FLOAT },
//                 tags: ['application_name', 'dev_eui', 'device_name', 'f_port'],
//             },
//         ]
//     });

//     var sql_rooms = 'select DISTINCT(device_name) from (select *  from device_frmpayload_data_Luminance)';
//     let result = await influx.query(sql_rooms);
//     if (result.length > 0) {
//         for (let item of result) {
//             console.log("item: ", item["distinct"]);
//             var sql = [];
//             sql.push(`select count(*), mean(value) from device_frmpayload_data_Luminance where device_name = '${item["distinct"]}'  and time > now() - 15m`);
//             sql.push(`select count(*), mean(value) from device_frmpayload_data_Motion where device_name = '${item["distinct"]}' and time > now() - 15m`);
//             sql.push(`select count(*), mean(value) from device_frmpayload_data_Temperature where device_name = '${item["distinct"]}' and time > now() - 15m`);
//             var sensors = { datetime: "", temperature: 0, motion: 0, luminance: 0, label: "" };
//             var Room_sensor = { datetime: "", Room_number: item["distinct"], status: "", temperature: 0, motion: 0, luminance: 0, people: 0 };

//             var infor_sensor = { datetime: "", temperature: 0, motion: 0, luminance: 0, label: "" };

//             var qq = await Room.find({ Room_number: item["distinct"] });
//             // console.log("qq 1: ",qq);
//             if (qq.length > 0) {
//                 console.log("qq", JSON.stringify(qq[0]));
//                 var json_data = JSON.parse(JSON.stringify(qq[0]));
//                 console.log("data:", json_data["_id"]);

//                 var _id = json_data["_id"];

//                 console.log(_id);
//                 var today = moment(new Date()).format('DD-MM-YYYY H:mm');
//                 sensors.datetime = today;
//                 infor_sensor.datetime = today;

//                 for (let i = 0; i < sql.length; i++) {
//                     let result = await influx.query(sql[i]);
//                      console.log("result: ",result.length);
//                     if (result.length == 1) {
//                         if (i == 0) {
//                             sensors.luminance = result[0].mean;
//                             Room_sensor.luminance = result[0].mean;
//                             console.log("Room: ", Room_sensor.luminance);
//                             infor_sensor.luminance = result[0].mean;
//                         }
//                         else if (i == 1) {
//                             sensors.motion = result[0].mean;
//                             Room_sensor.motion = result[0].mean;
//                             console.log("Room: ", Room_sensor.motion);
//                             infor_sensor.motion = result[0].mean;
//                         }
//                         else if (i == 2) {
//                             sensors.temperature = result[0].mean;
//                             Room_sensor.temperature = result[0].mean;
//                             console.log("Room: ", Room_sensor.temperature);
//                             infor_sensor.temperature = result[0].mean;
//                         }
//                     }
//                     // else if (result.length == 0) {
//                     //     Room_sensor.luminance = "";
//                     //     Room_sensor.motion = "";
//                     //     Room_sensor.temperature = "";
//                     //     Room_sensor.status = "กำลังอัพเดท";
//                     // }
//                 }
//                 console.log("Static: ", sensors);
//                 Static.create(
//                     sensors
//                 )
//                 console.log("information: ", infor_sensor);
//                 information.create(
//                     infor_sensor
//                 )
//                 var options = {
//                     host: '203.154.83.62',
//                     port: 20000,
//                     path: '/prediction/5',
//                     method: 'GET'
//                 };
//                 const req = http.request(options, (res) => {
//                     res.setEncoding('utf8');
//                     res.on('data', (chunk) => {
//                         console.log("BODY:", chunk);
//                         console.log("status: ", JSON.parse(chunk)["status"]);

//                         console.log(JSON.parse(chunk)["status"]);
//                         Room_sensor.datetime = moment(new Date()).format('DD-MM-YYYY H:mm');
//                         if (JSON.parse(chunk)["status"] == 0) {

//                             Room_sensor.status = "ว่าง"
//                         } else {

//                             Room_sensor.status = "กำลังถูกใช้งาน"
//                         }
//                         console.log(Room_sensor.status);
//                         console.log(Room_sensor.datetime);
//                         Room.findByIdAndUpdate(
//                             _id,
//                             Room_sensor,
//                             { new: true },
//                             (err, data) => {
//                                 if (err != null) {
//                                     console.log(err);
//                                 }
//                             }
//                         ) 
//                     });
//                     res.on('end', () => {
//                         console.log('No more data in response.');
//                     });
//                 });
//                 req.on('error', (e) => {
//                     console.error(`problem with request: ${e.message}`);
//                 });

//                 // Write data to request body
//                 //   req.write("hello");
//                 req.end();

//             }
//         }
//     }
// });


module.exports = app