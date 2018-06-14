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
}

Cell.prototype.show = function() {
	if (rTiles <= 0 && totalBees == 0) {
		gameWon();
	}
	if(!this.gameover) {
		stroke(0);
		//noFill();
		frameRate(4);
		fill(random(0, 255), random(0, 255), random(0, 255));
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
