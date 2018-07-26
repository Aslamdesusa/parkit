// Including the Mongoose ORM to connect with Mongo DB
const Mongoose = require('mongoose');

// MAKING connection with mlab using parkingslote database uri
const mongoDbUri = 'mongodb://parking:parking123@ds255451.mlab.com:55451/parking_lots';
// const parking_database = 'mongodb://parkingslote:parking123@ds253821.mlab.com:53821/parking_lot'

// const mongoDbUri = mongoDbUri;
// Making connection with 'MongoDB'
Mongoose.connect(mongoDbUri, { useMongoClient:true })

//Variable to store the database connection
var db = Mongoose.connection;

//Handling errors!
db.on('error', console.error.bind(console, 'connection error'));


db.once('open', function callback(){
    console.log('Connection with database succeeded ' + mongoDbUri);
});

exports.db=db;