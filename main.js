let yvalue = 4;

console.log("polib cccc dddd");

/* 
TESTER = document.getElementById('tester');

Plotly.newPlot( TESTER, [{
x: [1, 2, 3, 4, 5],
y: [1, 2, yvalue, 8, 16] }], {
margin: { t: 0 } } );
*/

/*TESTER2 = document.getElementById('tester2');

var data = [
  {
    x: ["trees", "flowers", "hedges"],
    y: [90, 130, 40],
    type: "bar"
  },
  {
    x: ["trees", "flowers", "hedges"],
    y: [90, 130, 40],
    type: "bar"
  }
];

var layout = {
  title: {
    text: "Remove Modebar Buttons"
  }, 
  showlegend: true
};

Plotly.newPlot( TESTER2, data, layout, { modeBarButtonsToRemove: ["toImage"] }); 
*/

/*let intervalID = setInterval(myCallback, 500, "Parameter 1", "Parameter 2");

function myCallback(a, b) {
  // Your code here
  // Parameters are purely optional.
  console.log(a);
  console.log(b);
  console.log(intervalID);
}*/

  /*Plotly.newPlot( TESTER, [{
  x: [1, 2, 3, 4, 5],
  y: [1, 2, yvalue, 8, 16] }], {
  margin: { t: 1 } } );*/
  
TESTER3 = document.getElementById('tester3');

var nodes = [
  {x: 0, y: 0, z: 0},
  {x: 4, y: 0, z: 0},
  {x: 4, y: 4, z: 0},
  {x: 0, y: 4, z: 0},
  {x: 2, y: 2, z: yvalue}  // vrchol
];

// Definice hran jako párů indexů bodů
var edges = [
  [0, 1], [1, 2], [2, 3], [3, 0], // základna
  [0, 4], [1, 4], [2, 4], [3, 4]  // vrchol
];

var traces = edges.map(edge => {
  return {
    x: [nodes[edge[0]].x, nodes[edge[1]].x],
    y: [nodes[edge[0]].y, nodes[edge[1]].y],
    z: [nodes[edge[0]].z, nodes[edge[1]].z],
    mode: 'lines',
    type: 'scatter3d',
    line: { color: 'blue', width: 4 }
  };
});

traces[7].line.color = "green";
console.log(traces);

var layout = {
  margin: { l: 0, r: 0, b: 0, t: 0 },
  showlegend: false
};

Plotly.newPlot(TESTER3, traces, layout);

let animateUpDirection = true; 
let animateToDo = true;

function GraphUpdate() {  
  nodes[4] = {x: 2, y: 2, z: yvalue};  
  
  traces = edges.map(edge => {
    return {
      x: [nodes[edge[0]].x, nodes[edge[1]].x],
      y: [nodes[edge[0]].y, nodes[edge[1]].y],
      z: [nodes[edge[0]].z, nodes[edge[1]].z],
      mode: 'lines',
      type: 'scatter3d',
      line: { color: 'blue', width: 4 }
    };
  });
  
  traces[7].line.color = "green";
  
  Plotly.react(TESTER3, traces, layout);

  if (animateUpDirection) {
    ++yvalue;
    if (yvalue > 8) animateUpDirection = false;
  } else {
    --yvalue;
    if (yvalue < -8) animateUpDirection = true;
  }
  
  if (animateToDo) requestAnimationFrame(GraphUpdate);
}

const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  //console.log("keydown"); 
  if (keys["arrowup"]) ++yvalue;
  if (keys["arrowdown"]) --yvalue;
  /*if (keys["arrowleft"]) {
      window.clearInterval(intervalID);
      console.log(intervalID)
    }*/
  if (keys["arrowright"]) {
    animateToDo =! animateToDo;
    console.log(animateToDo);
    if (animateToDo) requestAnimationFrame(GraphUpdate);
  }
  
  if (e.keyCode == 32) console.log("space32"); 
  if (e.code == "Space") console.log("spaceSpace"); 
  if (keys[" "]) {
    console.log("space space"); 
  }
  
});

 window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
    //console.log("keyup");  
 });

 requestAnimationFrame(GraphUpdate);