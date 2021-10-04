const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')

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
    res.send({message: "Welcome to Room" });
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
module.exports = app