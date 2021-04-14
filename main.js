// p5js javascript
var canvas;

let colors = ['#F5E224', '#791B11', '#142016', '#171C42', '#6B2D16', '#12861E', '#111225', '#DA992A', '#191813', '#1F135A', '#FAF6FE', '#120E2A', '#E0161A', '#49100F', '#0D2A54', '#F15B35', '#CC6427', '#C70D14', '#FEE42E', '#213B1A', '#321C0F', '#8A2714', '#FBBB30', '#2D1930', '#FFFDEF', '#B21E1D', '#60CC1E', '#FEF72F', '#EDB234', '#341E3C', '#291671', '#174F2D', '#FED737', '#C83812', '#FFFDE5', '#8D2818', '#080706', '#8E1A1F', '#225945', '#692C1B', '#1D1B43', '#AD2A22', '#15110E', '#304628', '#EBE029', '#F5C846', '#22764F', '#4C743C', '#C32E27', '#364238', '#E34318', '#2C1E14', '#E6BB25', '#EFE1A7', '#C42315', '#FFFFFF', '#F4B282', '#F2EEF5', '#F2EEF5', '#FF6A79', '#FFF533', '#148BC0', '#F9B55C', '#0B804A', '#A73462', '#264581', '#D02725', '#14120B', '#FBD92F', '#F8FFF0', '#195D26', '#29331E', '#172A1A', '#C9001A', '#234B95', '#F3C831', '#241B12', '#0E0D0A', '#351A0D', '#15140F', '#402110', '#0B85BF', '#0F110F', '#1A1D2B', '#191259', '#65E620', '#F47835', '#F2B14D', '#181964', '#BE241E', '#2B1817', '#91240E', '#2F2B1D', '#DE8721', '#453811', '#551209', '#7B170F', '#456227', '#104D3C', '#A41211', '#FBDD28'];

function setup(){
  canvas = createCanvas(windowWidth, 11000);
canvas.position(0,0);



}

function windowResized(){
  resizeCanvas(windowWidth, 11000);
}

function keyPressed(){
  clear();

}
function draw(){
   if (mouseIsPressed === true) {
    // noFill();
    fill(colors[Math.floor(Math.random() * colors.length)]);
    } else {
  // let c = color(paint.fields.hex);
  ellipse(mouseX, mouseY, 100, 100);
// fill(255,0,0,63);

 noStroke();
}
}



// airtable api javascript

/* globals require */
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
console.log(Airtable);

// use the airtable librar to get a variable that represents one of our bases
var base = new Airtable({ apiKey: "keyCBqWBdUmJ6ay4u" }).base(
  "appmHlC8JE2m5Hg42"
);

//get the "books" table from the base, select ALL the records, and specify the functions that will receive the data
base("paint").select({}).eachPage(gotPageOfPaint, gotAllPaint);

// an empty array to hold our book data
const paint = [];


// callback function that receives our data
function gotPageOfPaint(records, fetchNextPage) {
  console.log("gotPageOfPaint()");
  // add the records from this page to our books array
  paint.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllPaint(err) {
  console.log("gotAllPaint()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading paint");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogPaint();
  showPaint();
}

// just loop through the books and console.log them
function consoleLogPaint() {
  console.log("consoleLogPaint()");
  paint.forEach((paint) => {
    console.log("paint:", paint);
  });
}

// loop through the books, create an h2 for each one, and add it to the page
function showPaint() {
  console.log("showPaints()");
  



  paint.forEach((paint) => {
    var paintContainer = document.createElement("div");
    paintContainer.classList.add("paint-container");
    paintContainer.style.backgroundColor = paint.fields.hex;
    document.querySelector(".container").append(paintContainer);


var paintName = document.createElement("h2");
paintName.classList.add("paint-name");
paintName.innerText = paint.fields.paint;
paintContainer.append(paintName);

var paintImage = document.createElement("img");
paintImage.classList.add("paint-image");
paintImage.src = paint.fields.image[0].url;
paintContainer.append(paintImage);


//add event listener for when user clicks on paint color the image will show
paintContainer.addEventListener("click", function(event) {
      paintImage.classList.toggle("active");
      
    });

});
}







