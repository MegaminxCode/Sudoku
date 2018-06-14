
function make2DArray (cols, rows) {
 var arr = new Array(cols);
 for (var i = 0; i < arr.length; i++) {
	arr[i] = new Array(rows);

	}	
	return arr;
}


var grid;
var cols;
var rows;
var w = 20;

var rTiles;
var totalBees = 70;
var flags = 20;


function setup(){
	createCanvas(441, 441);
	cols = floor (width / w);
	rows = floor (height / w);
    rTiles = floor (cols * rows);
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			
			grid[i][j] = new Cell(i, j, w);
			
		}
	}
	
	var options = [];
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			options.push([i, j]);
		}
	}
	
	for (var n = 0; n < totalBees; n++) {
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];
		options.splice(index, 1);
		grid[i][j].bee = true;
	}
	
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			
			grid[i][j].countNeighbours();
			
		}
	}
}

function gameOver () {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if(grid[i][j].flag && !grid[i][j].wrong){
				grid[i][j].gameOver = true;
				grid[i][j].bee = true;
				
			}
			if(!grid[i][j].wrong){
				grid[i][j].gameOver = true;
			}
			grid[i][j].flag = false;
			grid[i][j].revealed = true;
			
		}
	}
}

function gameWon () {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			
			grid[i][j].flag = false;
			grid[i][j].bee = false;
			grid[i][j].wrong = false;
			grid[i][j].won = true;
			grid[i][j].revealed = true;
			
		}
	}
	
}

window.addEventListener("contextmenu", function(e) { e.preventDefault(); })
function mousePressed () {
	
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			
			if(grid[i][j].contains(mouseX, mouseY)) {
				if (mouseButton === LEFT) {
					grid[i][j].reveal();
				
					if (grid[i][j].bee) {
						gameOver();
					}
				}
				if (mouseButton === RIGHT) {
					if(!grid[i][j].revealed){
						if (grid[i][j].bee){
							totalBees--;
                            rTiles--;
						}else {
							grid[i][j].wrong = true;
							totalBees++;
						}
						grid[i][j].bee = false;
						grid[i][j].revealed = true;
						grid[i][j].flag = true;
						
						
					}else if(grid[i][j].flag && !grid[i][j].wrong){
						grid[i][j].revealed = false;
						grid[i][j].flag = false;
						grid[i][j].bee = true;
						totalBees++;
					} else if(grid[i][j].flag && grid[i][j].wrong) {
						grid[i][j].revealed = false;
						grid[i][j].flag = false;
						grid[i][j].wrong = false;
						grid[i][j].countNeighbours();
						totalBees--;
					}
				}
			}
		}
	}
	
}

function draw(){
	background(255);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			
			grid[i][j].show();
			
		}
	}
	
}
