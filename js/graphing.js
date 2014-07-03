/*

GRAPHING.js
===================
	Copyright (C) <2008>  <Dr Chris Hughes>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

	Please feel free to contact me at:

		christopher.michael.hughes@gmail.com

Description
===================
	
	This file contains the graphing engine, which is a function called, 'drawstuff'
	It takes 2 arguments:


*/

function drawStuff(id)
{

	plotOptions = this.plotOptions;

	var canvas = document.getElementById(id);
	if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
		var width = canvas.width;
		height = canvas.height;

		// Draw frame round the canvas
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(width,0);
		ctx.lineTo(width,height);
		ctx.lineTo(0,height);
		ctx.lineTo(0,0);
	    // draw frame in black	
		ctx.strokeStyle = "Black";
		
		width -= 40;
		height -=40;
		
		// Leave enough space for the y-axis tick marks
		ctx.translate(20,20);
		
		// Draw boundary
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(width,0);
		ctx.lineTo(width,height);
		ctx.lineTo(0,height);
		ctx.lineTo(0,0);
		ctx.stroke();

		// Grid lines variables
		var yIncrement, y;
		var xIncrement, x;
	
        // axis variables (defaults given with || *** )
		var xmin = plotOptions.xmin ||-10;
		var xmax = plotOptions.xmax ||10;
		var xres = plotOptions.xres || 1;

		var ymin = plotOptions.ymin ||-10;
		var yMax = plotOptions.ymax ||10;
		var yres = plotOptions.yres || 1;

        // domain variables: function is plotted from a to b
		var a = plotOptions.a || 0.0001;
		var b = plotOptions.b || 10;

        // number of lines to be plotted (default is 1)
        var numberOfLines = plotOptions.numberOfLines || 1;

		// Grid lines y direction
		yIncrement = height/(yMax-ymin)*yres;

		var thick = 0;
		if(Math.round(yMax/2)==yMax/2)
		{
			thick = 1; 
		}

		for(var i=0; i<=Math.ceil(height/yIncrement); i++)
		{
			y = (yres * i)*height/(yMax-ymin);	
		
			if(y<=(height))
			{
				ctx.beginPath();

				if(thick)
				{
					ctx.lineWidth = 1/4;
					thick = 0;		
				}
				else
				{
					ctx.lineWidth = 1/8;
					thick = 1;		
				}
		
				//ctx.lineWidth = 1/2;
				ctx.moveTo(0, y);
				ctx.lineTo(width, y);	
				ctx.stroke();
			}
		}

		// Grid lines x direction
		xIncrement = width/(xmax-xmin)*xres;

		var thick = 0;
		if(Math.round(xmin/2)==xmin/2)
		{
			thick = 1; 
		}

		for(var i=0; i<=Math.ceil(width/xIncrement); i++)
		{	
			ctx.beginPath();
	
			if(thick){
				ctx.lineWidth = 1/4;
				thick = 0;		
			} else {
				ctx.lineWidth = 1/8;
				thick = 1;		
			}

			//ctx.lineWidth = 1/2;
			x = (xres * i)*width/(xmax-xmin);	
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);	
			ctx.stroke();
		}


		// Find the origin
		var originY, originX;
		originY = height/(yMax-ymin)*yMax;
		originX = width/(xmax-xmin)*Math.abs(xmin);

		// Draw the y - axis
		ctx.beginPath();
		ctx.moveTo(originX,0);
		ctx.lineTo(originX,height);
		ctx.lineWidth = 2;
		ctx.stroke();

		// Draw the x - axis
		ctx.beginPath();
		ctx.moveTo(0,originY);
		ctx.lineTo(width,originY);
		ctx.lineWidth = 2;
		ctx.stroke();

		// Set the origin as the reference point
		ctx.translate(originX,originY);

		// Draw the curve
		var x, y, deltax, numberOfPoints, gridpointX;

		numberOfPoints = 1000;
		deltax = (b-a)/numberOfPoints;

		// switch off vertical asymptotes by default
		vertAsymp = 0;
		
		for(j=0; j<numberOfLines; j++)
		{
		    // line colour 	
            var lineColour;
            if(typeof this.plotOptions.lineColours =='undefined') {
                lineColour = 'Red';
            } else {
                lineColour = this.plotOptions.lineColours[j]||'Red';
            }
			ctx.strokeStyle = lineColour;
            
            // line style (solid, dashed, dotted, etc)
            var lineStyle;
            if(typeof this.plotOptions.lineStyles =='undefined') {
                lineStyle = 'solid';
            } else {
                lineStyle = this.plotOptions.lineStyles[j]||'solid';
            }

            switch(lineStyle)
            {
              // solid lines
              case 'solid': break;
              // dashed lines: see http://www.rgraph.net/blog/2013/january/html5-canvas-dashed-lines.html
              case 'dashed': ctx.setLineDash([5]);
                             break;
              // dotted lines
              case 'dotted': ctx.setLineDash([1,2]);
                             break;
            }

            // line width (ultra thin, very thin, thin, normal, thick, very thick, ultra thick, etc)
            var lineWidth;
            if(typeof this.plotOptions.lineWidths =='undefined') {
                lineWidth = 'normal';
            } else {
                lineWidth = this.plotOptions.lineWidths[j]||'normal';
            }

            switch(lineWidth)
            {
              // ultra thin lines
              case 'ultra thin': ctx.lineWidth = .25;
                             break;
              // very thin lines
              case 'very thin': ctx.lineWidth = .5;
                             break;
              // thin lines
              case 'thin': ctx.lineWidth = 1;
                             break;
              // normal lines
              case 'normal': ctx.lineWidth = 2;
                             break;
              // thick lines
              case 'thick': ctx.lineWidth = 3;
                             break;
              // very thick lines
              case 'very thick': ctx.lineWidth = 4;
                             break;
              // ultra thick lines
              case 'ultra thick': ctx.lineWidth = 5;
                             break;
            }
	
			if(plotOptions.parametric==1)
			{
				tmin = plotOptions.tmin;
				tmax = plotOptions.tmax;
				tstep = plotOptions.tstep;
				numberOfPoints = Math.ceil((tmax-tmin)/tstep);		

				ctx.beginPath();
				for(i=0; i<=(numberOfPoints+1); i++)
				{
					t = tmin + i*tstep;
					var output = this.graphingFunction(t); 
                    x = output[0];
                    y = output[1];

					// get the unscaled x and y which we need to determine if (x,y) are outside of the viewing window
					xUnscaled = x;
					yUnscaled = y;
					
					// scale x and y
					y *= -height/(yMax-ymin);
					x *= width/(xmax-xmin);

					// check that the current point is in the viewing window
					if(yUnscaled<=yMax && yUnscaled>=ymin && xUnscaled>=xmin && xUnscaled <=xmax)		
					{
						ctx.lineTo(x,y);
					}
					
				}
				ctx.stroke();
			} else {

				ctx.beginPath();
				for(i=0; i<numberOfPoints; i++)
				{

					x = a + deltax*i;	
					y = this.graphingFunction(x); 

					// discontinuities
					if(Math.abs(y)==Infinity || Math.abs(y)==NaN)
					{
						if(i>0)
						{

							// store the old value of y
							yOld = y;
	
							// we determine the behaviour of y surrounding
							// the vertical asymptote by examining yPrevious
							if(yPrevious<0)
							{
								y = ymin;
							}		
							else if(yPrevious>0)
							{
								y = yMax;
							}		
	
							// need the unscaled version of y to make sure it doesn't go above the gridlines
							yUnscaled = y;

							// scale x and y
							y *= -height/(yMax-ymin);
							x *= width/(xmax-xmin);
					
							// end the current path before we cross the discontinuity
							if(alreadyReachedExtremePoint!=1)
							{
								ctx.lineTo(x,y);											
							}
							ctx.stroke();

							
							// begin a new path
							ctx.beginPath();
										
							if(yOld<0)
							{
								y = ymin;
							}
							else if(yOld>0)
							{
								y = yMax;
							}
							y *= -height/(yMax-ymin);
							
							//ctx.lineTo(x,y);			
							
							vertAsymp = 1;
							yAsymptote = y;				
						}
					} else {
			
						yPrevious = y;
						
						// need the unscaled version of y to make sure it doesn't go above the gridlines
						yUnscaled = y;
						
						// scale x and y
						y *= -height/(yMax-ymin);
						x *= width/(xmax-xmin);
					
						if(yUnscaled<=yMax && yUnscaled>=ymin)
						{			
							// if we've got
							//		ymin <= y <= ymax
							ctx.lineTo(x,y);	
							alreadyReachedExtremePoint = 0;							
							
							if(vertAsymp == 1)
							{
								// draw a line to either ymin or yMax (determined above)
								ctx.lineTo(x,yAsymptote);
								
								// switch off vertical asymptotes
								vertAsymp = 0;
								
								// move back to beginning of the curve
								ctx.moveTo(x,y);
							}
							
						} else {
							// if the graph starts off outside of the viewing window, then i=0 (first point on the graph)
							if(i==0)
							{
								alreadyReachedExtremePoint = 1;
							}
						
							// otherwise we are at the first occurence when the function goes out of the viewing window
							if(alreadyReachedExtremePoint !=1)
							{
								// determine if we're closer to ymin or yMax
								if(Math.abs(yUnscaled-ymin)<Math.abs(yUnscaled-yMax))
								{
									ctx.lineTo(x,ymin*(-height/(yMax-ymin)));
								}
								else
								{
									ctx.lineTo(x,yMax*(-height/(yMax-ymin)));
								}
							}
							alreadyReachedExtremePoint = 1;
						}
						
					}
				}
				ctx.stroke();
			}

			this.plotOptions.lineCount++;
		}

		// x and y tick marks
		ctx.translate(-originX-15,-originY);
		ctx.mozTextStyle = "9pt Arial";
	
		// y ticks
		var axislabel = yMax;
		for(i=0; i<=Math.ceil(height/yIncrement); i++)
		{
			ctx.fillStyle = "blue";
                // new
			    ctx.fillText(axislabel,0,0);	
			ctx.translate(0, (yres)*height/(yMax-ymin));
			axislabel -= yres;
		}
	
		ctx.translate(0, -(yres)*height/(yMax-ymin));
		
		
		// x ticks
		axislabel = xmin;
		ctx.translate(10,15);
	
		for(i=0; i<=Math.ceil(width/xIncrement); i++)
		{
			ctx.fillStyle = "blue";
            // new
			ctx.fillText(axislabel,0,0);	
			ctx.translate((xres)*width/(xmax-xmin),0);
			axislabel += xres;
		}


	}

}
