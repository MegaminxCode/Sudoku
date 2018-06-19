
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
var w = 28;

var rTiles;
var totalBees = 150;
var a;
var startTiles = 4;
var test = 0;
var options = [];
var optionsb = [];
function setup(){
	createCanvas(757, 757);
	cols = floor (width / w);
	rows = floor (height / w);
    rTiles = floor (cols * rows);
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			
			grid[i][j] = new Cell(i, j, w);
			
		}
	}
	
	
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
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            a = floor(random(0, 14));
            if(a == 0){
                
                grid[i][j].color1 = true;
            }else if(a == 1){
                
                grid[i][j].color2 = true;
            } else if(a == 2){
                
                grid[i][j].color3 = true;
            } else if(a == 3){
                
                grid[i][j].color4 = true;
            } else if(a == 4){
                
                grid[i][j].color5 = true;
            } else if(a == 5){
                
                grid[i][j].color6 = true;
            }else if(a == 6){
                
                grid[i][j].color7 = true;
            } else if(a == 7){
                
                grid[i][j].color8 = true;
            } else if(a == 8){
                
                grid[i][j].color9 = true;
            } else if(a == 9){
                
                grid[i][j].color10 = true;
            } else if(a == 10){
                
                grid[i][j].color11 = true;
            }else if(a == 11){
                
                grid[i][j].color12 = true;
            } else if(a == 12){
                
                grid[i][j].color13 = true;
            } else if(a == 13){
                
                grid[i][j].color14 = true;
            } else if(a == 14){
                
                grid[i][j].color15 = true;
            }
            
        }
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            
            if(grid[i][j].neighbourCount ==0){
                optionsb.push([i, j]);
            }
        }
    }
    for (var s = 0; s < startTiles; s++) {
        var index = floor(random(optionsb.length));
        
        var choice = optionsb[index];
        var i = choice[0];
        var j = choice[1];
        optionsb.splice(index, 1);
        grid[i][j].reveal();
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
                    if(grid[i][j].flag){
                        
                    
                    }
                    if (grid[i][j].bee) {
                        gameOver();
                    }
                    if(grid[i][j].revealed){
                        return;
                    }else if (!grid[i][j].revealed) {
                        grid[i][j].reveal();
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
                            rTiles--;
						}
						grid[i][j].bee = false;
						grid[i][j].revealed = true;
						grid[i][j].flag = true;
						
						
					}else if(grid[i][j].flag && !grid[i][j].wrong){
						grid[i][j].revealed = false;
						grid[i][j].flag = false;
						grid[i][j].bee = true;
						totalBees++;
						rTiles++;
					} else if(grid[i][j].flag && grid[i][j].wrong) {
						grid[i][j].revealed = false;
						grid[i][j].flag = false;
						grid[i][j].wrong = false;
						grid[i][j].countNeighbours();
						totalBees--;
						rTiles++;
					}
				}
				if (mouseButton === CENTER){
					if(grid[i][j].revealed && !grid[i][j].bee && !grid[i][j].flag && grid[i][j].neighbourCount > 0){
						grid[i][j].countFlags();
					}else {
						return;
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
