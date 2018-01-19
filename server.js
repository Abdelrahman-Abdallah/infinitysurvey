const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./server/db/db');
const path =  require('path');

//const utilsRoute = require('./server/routes/utils');
const userRoute = require('./server/routes/userRoute');
const surveyRoute = require('./server/routes/surveysRoute');



var app = express();

const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    /* res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Request-Headers', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
 */
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "PATCH,GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "x-auth,X-Custom-Header,Access-Control-Allow-Headers,Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next(); 
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'dist')));

//app.use('/api/utils',utilsRoute);
app.use('/api/user',userRoute);
app.use('/api/survey',surveyRoute);


 app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));   
}) 


app.listen(port,function(){
    console.log(' app listen on port',port);
});

