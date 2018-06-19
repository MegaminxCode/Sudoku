function Cell(i, j, w) {
	this.i = i;
	this.j = j;
	this.x = i * w;
	this.y = j * w;
	this.w = w;
	this.neighbourCount = 0;
	
	this.bee = false;
	this.revealed = false;
	this.flag = false;
	this.wrong = false;
	this.won = false;
	this.gameOver = false;
    this.color1 = false;
    this.color2 = false;
    this.color3 = false;
    this.color4 = false;
    this.color5 = false;
    this.color6 = false;
    this.color7 = false;
    this.color8 = false;
    this.color9 = false;
    this.color10 = false;
    this.color11 = false;
    this.color12 = false;
    this.color13 = false;
    this.color14 = false;
    this.color15 = false;
}

Cell.prototype.show = function() {
	if (rTiles <= 0 && totalBees == 0) {
		gameWon();
	}
	if(!this.gameover) {
		stroke(0);
		//noFill();
		
        
        if(this.color1){
            fill(237, 2, 11);
        }else if(this.color2){
            
            fill(244, 0, 40);
        } else if(this.color3){
            
            fill(255, 202, 43);
        } else if(this.color4){
            
            fill(238, 47, 127);
        } else if(this.color5){
            
            fill(241, 80, 149);
        } else if(this.color6){
            
            fill(255, 169, 206);
        }else if(this.color7){
            
            fill(64, 120, 211);
        } else if(this.color8){
            
            fill(80, 168, 227);
        } else if(this.color9){
            
            fill(173, 222, 250);
        } else if(this.color10){
            
            fill(127, 176, 5);
        } else if(this.color11){
            
            fill(184, 214, 4);
        }else if(this.color12){
            
            fill(204, 255, 0);
        } else if(this.color13){
            
            fill(124, 20, 77);
        } else if(this.color14){
            
            fill(127, 66, 51);
        } else if(this.color15){
            
            fill(108, 92, 50);
        }
		rect(this.x, this.y, this.w, this.w);
	}
	if (this.revealed) {
		if (this.gameOver && this.bee) {
			fill(200);
			rect(this.x, this.y, this.w, this.w);
			fill(150);
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
		}else if(this.bee) {
			fill(150);
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);	
		} else if(this.flag) {
			fill(0);
			rect(this.x, this.y, this.w, this.w);
		} else if (this.wrong) {
			fill('red');
			rect(this.x, this.y, this.w, this.w);
		} 
		else if (this.won) {
			fill('green');
			rect(this.x, this.y, this.w, this.w);
		}else if (this.gameOver) {
			fill('orange');
			rect(this.x, this.y, this.w, this.w);
		}else {
			fill(200);
			rect(this.x, this.y, this.w, this.w);
			if(this.neighbourCount > 0) {
				textAlign(CENTER);
				fill(0);
				text(this.neighbourCount, this.x + this.w * 0.5, this.y + this.w - 6);
              
			}
		}
		
	}
}

Cell.prototype.countNeighbours = function (x, y) {
	if (this.bee) {
		this.neighbourCount = -1;
		return;
	}
	var total = 0;
	
	for(xoff = -1; xoff <= 1; xoff++) {
		for(yoff = -1; yoff <= 1; yoff++) {
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var neighbour = grid[i][j];
				if(neighbour.bee || neighbour.flag && !neighbour.wrong) {
					total++;
				}
			}
		}
	}
	this.neighbourCount = total;
}

Cell.prototype.countFlags = function(x, y) {
	
	var total = 0;
	
	for(xoff = -1; xoff <= 1; xoff++) {
		for(yoff = -1; yoff <= 1; yoff++) {
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows) {
				var flagged = grid[i][j];
				if(flagged.flag) {
					total++;
				}
			}
		}
	}
	
	if(this.neighbourCount == total){
		for(xoff = -1; xoff <= 1; xoff++) {
			for(yoff = -1; yoff <= 1; yoff++) {
				var i = this.i + xoff;
				var j = this.j + yoff;
				if (i > -1 && i < cols && j > -1 && j < rows) {
					if(!grid[i][j].revealed){
						grid[i][j].reveal();
						if(grid[i][j].bee){
							gameOver();
						}
					}
				}
			}
		}
	}else{
		return;
	}
}

Cell.prototype.contains = function (x, y) {
	
	return(x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w); 
		
	
}

Cell.prototype.reveal = function (x, y) {
	this.revealed = true;		
    rTiles--;
	if (this.neighbourCount == 0) {
		this.floodFill();
	}
}

Cell.prototype.floodFill = function() {
  for (var xoff = -1; xoff <= 1; xoff++) {
    var i = this.i + xoff;
    if (i < 0 || i >= cols) continue;

    for (var yoff = -1; yoff <= 1; yoff++) {
      var j = this.j + yoff;
      if (j < 0 || j >= rows) continue;

      var neighbor = grid[i][j];
      // Note the neighbor.bee check was not required.
      // See issue #184
      if (!neighbor.revealed) {
        neighbor.reveal();
      }
    }
  }
}
