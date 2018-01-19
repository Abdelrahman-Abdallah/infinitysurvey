const mongoose  = require('mongoose');
mongoose.connect('mongodb://test:test@ds059546.mlab.com:59546/surveyplanet',{useMongoClient:true},()=>{
    console.log('connected to the database');
});
mongoose.Promise = global.Promise; 




/*mongoose.connect('mongodb://localhost:27017/graduation',{useMongoClient:true},()=>{
    console.log('connected to the database');
});
mongoose.Promise = global.Promise;*/




module.exports = mongoose;

/* mongoose.connect('mongodb://<Abdelrahman>:<0643470582>@ds059546.mlab.com:59546/surveyplanet',{useMongoClient:true},()=>{
    console.log('connected to the database');
});
 */
