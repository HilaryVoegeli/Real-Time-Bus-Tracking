//unique access Token
mapboxgl.accessToken = 'pk.eyJ1IjoiaHZvZWdlbGkiLCJhIjoiY2t6NDRrMGUyMGQ2cTJ1bThtOG9yYzduOCJ9.gD_AaaN6967eGElKRODIQg';

var counter = 0;
var counter1 = 0;
var coordinates = [];
var coordinates1 = [];

//make map
var  map = new mapboxgl.Map({
  container:'map',
  style:'mapbox://styles/mapbox/satellite-streets-v11',
  center:[-71.104081, 42.365554],
  zoom:13
});

// get bus data  
async function run(){
  const locations = await getBusLocations();
  coordinates.push([(locations[0].attributes.longitude), (locations[0].attributes.latitude)]);
  coordinates1.push([(locations[1].attributes.longitude), (locations[1].attributes.latitude)]);
	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json = await response.json();
	return json.data;
}
run(); 

//make marker
var marker = new mapboxgl.Marker({
  color:"blue"
}).setLngLat([-71.092761, 42.357575])
  .addTo(map);

//make marker
var marker1 = new mapboxgl.Marker({
  color:"red"
}).setLngLat([-71.092761, 42.357575])
  .addTo(map);

//move marker
function move(){
    setTimeout(() =>{
    if(counter > coordinates.length) return;
    marker.setLngLat(coordinates[counter]);
    counter++;
    move();
  }, 15100);
 }

//move marker
 function move1(){
    setTimeout(() =>{
    if(counter1 > coordinates1.length) return;
    marker1.setLngLat(coordinates1[counter1]);
    counter1++;
    move1();
  }, 15100);
 }
