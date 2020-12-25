/* Global Variables */
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=1443a54352fc147b2e432bda834238c3';
const countryCode = ',us';
const fahrenheit = '&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//Add Event Listener to the button
document.querySelector('#generate').addEventListener('click',(e)=>{
    //get values from inputs
    const zipCode = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    //call getWeatherMap function after click the button
    getWeatherMap(apiURL,zipCode,countryCode,apiKey,fahrenheit)
    .then((data)=>{
        postData('/addWeather',{temp:data.main.temp,date:newDate,user_res:feelings});
        updateUI();
    })
});

//Dynamic UI
const updateUI= async ()=>{
    const req = await fetch('/all');
    try {
        const data = await req.json();
        document.getElementById('date').innerHTML = "The Date is: " + data.date;
        document.getElementById('temp').innerHTML = "Current Weather is: " + data.temp + '% F';
        document.getElementById('content').innerHTML = "Your feelings are: " + data.user_res;
    } catch (error) {
        console.log("error",error)
    }
}

//client side function
const postData = async (url = '', data = {})=>{
    console.log(data);
   const response = await fetch(url, {
       method: 'POST',
       credentials: 'same-origin',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
   });

   try {
       const newData = await response.json();
       console.log(newData);
       return newData;
   }catch(error) {
       console.log("error", error);
   }
};

//Integrating OpenWeatherMap API
const getWeatherMap = async (apiURL,zipCode,countryCode,apiKey,fahrenheit)=>{
    const res = await fetch(apiURL+zipCode+countryCode+apiKey+fahrenheit);
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log("error",error);
    }
}