// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express= require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,()=>{
    console.log(`is working on port http://localhost:${port}` )
});

//get all data
app.get('/all',(req,res)=>{
    console.log("get weather called:",projectData);
    res.send(projectData);
});

//post weather, temo and feelings
app.post('/addWeather',(req,res)=>{
    console.log(req.body);
    const body = req.body;
    projectData.temp = body.temp;
    projectData.date = body.date;
    projectData.user_res = body.user_res;
    console.log(projectData);
    res.send(projectData);
})