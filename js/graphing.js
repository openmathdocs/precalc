/*

GRAPHING.js
===================

	This file contains the graphing engine, which is a function called, 'drawGraph'

*/

function drawGraph(wrapperID)
{
    // grab the plotOptions object
	plotOptions = this.plotOptions;

    // grab html options, or set defaults
    var height = plotOptions.height||400;
    var width = plotOptions.width||420;
    var canvasID = plotOptions.id||wrapperID.concat('GRAPH');
    if(typeof this.plotOptions.tiksUseMathJax ==='undefined') {
        var tiksUseMathJax = 1;
    } else {
        var tiksUseMathJax = plotOptions.tiksUseMathJax;
    }

    // set up the canvas as part of the div box node
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", canvasID);
    canvas.setAttribute("height", height+"px");
    canvas.setAttribute("width", width+"px");
    
    // grab the canvas wrapping div box
    var outnode = document.getElementById(wrapperID);
    outnode.style.width = width+"px";
    outnode.style.height = height+"px";

	if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
		width = canvas.width;
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
		
		width -= 55;
		height -=40;
		
		// Leave enough space for the y-axis tick marks
        var hoffset = 45;
		ctx.translate(hoffset,9);
		
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
		var ymax = plotOptions.ymax ||10;
		var yres = plotOptions.yres || 1;

        // domain variables: function is plotted from a to b
		var a = plotOptions.a || 0.0001;
		var b = plotOptions.b || 10;

        // number of lines to be plotted (default is 1)
        var numberOfLines = plotOptions.numberOfLines || 1;

		// Grid lines y direction
		yIncrement = height/(ymax-ymin)*yres;

		var thick = 0;
		if(Math.round(ymax/2)==ymax/2)
		{
			thick = 1; 
		}

		for(var i=0; i<=Math.ceil(height/yIncrement); i++)
		{
			y = (yres * i)*height/(ymax-ymin);	
		
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
		originY = height/(ymax-ymin)*ymax;
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
					y *= -height/(ymax-ymin);
					x *= width/(xmax-xmin);

					// check that the current point is in the viewing window
					if(yUnscaled<=ymax && yUnscaled>=ymin && xUnscaled>=xmin && xUnscaled <=xmax)		
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
								y = ymax;
							}		
	
							// need the unscaled version of y to make sure it doesn't go above the gridlines
							yUnscaled = y;

							// scale x and y
							y *= -height/(ymax-ymin);
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
								y = ymax;
							}
							y *= -height/(ymax-ymin);
							
							//ctx.lineTo(x,y);			
							
							vertAsymp = 1;
							yAsymptote = y;				
						}
					} else {
			
						yPrevious = y;
						
						// need the unscaled version of y to make sure it doesn't go above the gridlines
						yUnscaled = y;
						
						// scale x and y
						y *= -height/(ymax-ymin);
						x *= width/(xmax-xmin);
					
						if(yUnscaled<=ymax && yUnscaled>=ymin)
						{			
							// if we've got
							//		ymin <= y <= ymax
							ctx.lineTo(x,y);	
							alreadyReachedExtremePoint = 0;							
							
							if(vertAsymp == 1)
							{
								// draw a line to either ymin or ymax (determined above)
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
								// determine if we're closer to ymin or ymax
								if(Math.abs(yUnscaled-ymin)<Math.abs(yUnscaled-ymax))
								{
									ctx.lineTo(x,ymin*(-height/(ymax-ymin)));
								}
								else
								{
									ctx.lineTo(x,ymax*(-height/(ymax-ymin)));
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
        if(tiksUseMathJax){
            // MathJax tick labels (drawn *on top* of the canvas)
            // MathJax tick labels (drawn *on top* of the canvas)
            // MathJax tick labels (drawn *on top* of the canvas)
            //
            // append canvas to the div box wrapper;
            // at this stage it contains the graph - we're 
            // going to add a series of other div boxes
            // on top using MathJax
            outnode.appendChild(canvas);

            var yticklabeldiv;

		    // y ticks
		    var axislabel = ymax;
		    for(i=0; i<=Math.ceil(height/yIncrement); i++)
		    {
                yticklabeldiv = document.createElement("div");
                yticklabeldiv.style.position = "absolute";
                yticklabeldiv.style.textAlign = "right";
                yticklabeldiv.style.width = "30px";
                yticklabeldiv.style.fontSize = "80%";
                yticklabeldiv.style.top = ""+i*yIncrement+"px";
                yticklabeldiv.innerHTML = "\\("+axislabel+"\\)";
                outnode.appendChild(yticklabeldiv);
		    	axislabel -= yres;
		    }

            var xticklabeldiv;

		    // x ticks
		    var axislabel = xmin;
		    for(i=0; i<=Math.ceil(width/xIncrement); i++)
		    {
                xticklabeldiv = document.createElement("div");
                xticklabeldiv.style.position = "absolute";
                xticklabeldiv.style.textAlign = "center";
                xticklabeldiv.style.width = "30px";
                xticklabeldiv.style.fontSize = "80%";
                if(axislabel<0){
                    xticklabeldiv.style.left = ""+(i*xIncrement+hoffset/2)+"px";
                } else {
                    xticklabeldiv.style.left = ""+(i*xIncrement+.7*hoffset)+"px";
                    xticklabeldiv.style.textAlign = "center";
                }
                xticklabeldiv.style.top = ""+(height+20)+"px";
                xticklabeldiv.innerHTML = "\\("+axislabel+"\\)";
                outnode.appendChild(xticklabeldiv);
		    	axislabel += xres;
		    }
        } else {
            // non-MathJax tick labels (part of the canvas)
            // non-MathJax tick labels (part of the canvas)
            // non-MathJax tick labels (part of the canvas)
            //
		    ctx.translate(-originX-15,-originY);
		    ctx.mozTextStyle = "9pt Arial";
	
		    // y ticks
		    var axislabel = ymax;
		    for(i=0; i<=Math.ceil(height/yIncrement); i++)
		    {
		    	ctx.fillStyle = "blue";
		    	ctx.fillText(axislabel,0,0);	
		    	ctx.translate(0, (yres)*height/(ymax-ymin));
		    	axislabel -= yres;
		    }
	
		    ctx.translate(0, -(yres)*height/(ymax-ymin));
		    
		    // x ticks
		    axislabel = xmin;
		    ctx.translate(10,15);
	
		    for(i=0; i<=Math.ceil(width/xIncrement); i++)
		    {
		    	ctx.fillStyle = "blue";
		    	ctx.fillText(axislabel,0,0);	
		    	ctx.translate((xres)*width/(xmax-xmin),0);
		    	axislabel += xres;
		    }
            // append canvas to the div box wrapper
            outnode.appendChild(canvas);
        }

	}


}
