//unique access Token
mapboxgl.accessToken = 'pk.eyJ1IjoiaHZvZWdlbGkiLCJhIjoiY2t6NDRrMGUyMGQ2cTJ1bThtOG9yYzduOCJ9.gD_AaaN6967eGElKRODIQg';

var counter = 0;
var coordinates = [];
var coordinates1 = [];

//make map
var  map = new mapboxgl.Map({
  container:'map',
  style:'mapbox://styles/mapbox/streets-v11',
  center:[-71.104081, 42.365554],
  zoom:14
});

async function run(){
    // get bus data  
	const locations = await getBusLocations();
  coordinates.push([(locations[0].attributes.longitude), (locations[0].attributes.latitude)]);
  coordinates1.push([(locations[1].attributes.longitude), (locations[1].attributes.latitude)]);
	//so I can see the data
  console.log(coordinates);
  console.log(coordinates1);
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

//make marker 1
var marker = new mapboxgl.Marker()
   .setLngLat([-71.092761, 42.357575])
   .addTo(map);
  
//make marker 2
var marker1 = new mapboxgl.Marker()
    .setLngLat([-71.092761, 42.357575])
    .addTo(map);

//move the markers
function move(){
    setTimeout(() =>{
    if(counter > coordinates.length) return;
    marker.setLngLat(coordinates[counter]);
    counter++;
    move();
  }, 15100);
 }

 function move1(){
    setTimeout(() =>{
    if(counter > coordinates1.length) return;
    marker1.setLngLat(coordinates1[counter]);
    counter++;
    move1();
  }, 15100);
 }
