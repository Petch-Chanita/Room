const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const Static = require('./static');
const Room = require('./numroom');
const Influx = require("influx");
const moment = require('moment');

var mongo_url = "mongodb://Roomsystem:admin01@202.28.34.197:27017/Roomsystem";
mongoose.connect(mongo_url,
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


// cron.schedule('*/15 * * * *',async function () {

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

//     var sql = [];
//     sql.push(`select count(*), mean(value) from device_frmpayload_data_Luminance where time > now() - 15m`);
//     sql.push(`select count(*), mean(value) from device_frmpayload_data_Motion where time > now() - 15m`);
//     sql.push(`select count(*), mean(value) from device_frmpayload_data_Temperature where time > now() - 15m`);
//     var sensors = { datetime: "", temperature: 0, motion: 0, luminance: 0, label: "กำลังถูกใช้" };
//     var Room_sensor = {status:"กำลังถูกใช้",temperature: 0, motion: 0, luminance: 0,people: 0};
    
//     var _id ={_id:"615d7097ac4f9e196cce8807"};

//     var today = moment(new Date()).format('DD-MM-YYYY H:mm');
//     sensors.datetime = today;
//     for (let i = 0; i < sql.length; i++) {
//         let result = await influx.query(sql[i]);
//         if (result.length == 1) {
//             if (i == 0) {
//                 sensors.luminance = result[0].mean;
//                 Room_sensor.luminance = result[0].mean;
//             }
//             else if (i == 1) {
//                 sensors.motion = result[0].mean;
//                 Room_sensor.motion = result[0].mean;
//             }
//             else if (i == 2) {
//                 sensors.temperature = result[0].mean;
//                 Room_sensor.temperature = result[0].mean;
//             }
//         }
//     }

//     console.log(sensors);
//     Static.create(
//         sensors
//     )
//     console.log(Room_sensor);
//     Room.findOneAndUpdate(
//         _id,
//         Room_sensor
        
//     )

// });



module.exports = app