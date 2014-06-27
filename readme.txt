XML based approach, a la Beezer
# install xsltproc
# sudo apt-get install xsltproc 

# output to tex file
xsltproc ./xsl/mathbook-latex.xsl sample-article.xml > myfile.tex
# outputs to derivatives.html (specified in sample-article.xml)
xsltproc ./xsl/mathbook-html.xsl sample-article.xml

======================================
Process work flow (ever changing)
======================================

.tex
=======
mainfile.tex will be maintained separately as a .tex file - it will not be 
changed using the XML approach

chapter files *are* .xml files and are converted into .tex files using, for example,

# output to tex file
xsltproc ./xsl/omd2tex.xsl sample-article.xml > myfile.tex

TO DO: get the basename of the file so that we don't have to specify it every time.
TO DO: change cross-referencing mechanism so that it uses the id that *we specify*, 
       (e.g \label{sec:introduction}), not an automated, hard-coded label (e.g, \label{section-1})

The last thing to do is to run 

pdflatex mainfile.tex

or, alternatively, once we put the arara directives in place, arara chapterfile.tex 

.html
=======
mainfile.html (doesn't currently exist), which will link to mainfile.css and probably 
a Javascript library, will link to chapter .html files and those are created by 
running the command:

# outputs to myfile.html, for example,
xsltproc ./xsl/omd2html.xsl sample-article.xml > myfile.html

TO DO: research how to cross reference between .html pages (perhaps using php and a .haux file?)

arara
=======
You can perform the xsltproc conversion using arara directives. For example, let's say that we have
myfile.xml that looks like the following:

<?xml version="1.0" encoding="UTF-8" ?>
<!-- 
% arara: xslt: {convertTo: html, outputToFile: yes}
% arara: xslt: {convertTo: tex, outputToFile: no}
-->

This will perform two conversions - the first to html, and will be written to myfile.html; the second to 
tex, and will only be written to the screen.

You'll need to update your araraconfig.yaml file (which lives at the highest level of your home directory, ~/araraconfig.yaml)
so that it contains the following lines:

    !config
    paths:
    - /home/cmhughes/Documents/projects/111and112doc
    filetypes:
    - extension: xml
      pattern: ^(\s)*%\s+

Just make sure that the paths variable matches the directory in which you are keeping this project.
