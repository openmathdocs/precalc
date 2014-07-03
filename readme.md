XML based approach, a la Beezer
First of all, install xsltproc, e.g
```bash
sudo apt-get install xsltproc 
```
Then, to output to `.tex` file you can run
```bash
xsltproc ./xsl/mathbook-latex.xsl sample-article.xml > myfile.tex
```
To output to `derivatives.html` file (hard coded in `sample-article.xml`) you can run
```bash
xsltproc ./xsl/mathbook-html.xsl sample-article.xml
```

####Process work flow (outline as it is ever changing)
Writing the code in `xml` allows us to convert easily into beautiful `.tex` files 
and into `.html` files. 

##### .tex version
mainfile.tex will be maintained separately as a .tex file - it will not be 
changed using the XML approach

chapter files *are* `.xml` files and are converted into `.tex` files using, for example,

```bash
xsltproc ./xsl/omd2tex.xsl sample-article.xml > myfile.tex
```

The last thing to do is to run 

```bash
pdflatex mainfile.tex
```

or, alternatively, once we put the `arara` directives in place, `arara chapterfile.tex`

##### .html version
`mainfile.html` (doesn't currently exist), which will link to mainfile.css and probably 
a Javascript library, will link to chapter .html files and those are created by 
running the command:

```bash
xsltproc ./xsl/omd2html.xsl sample-article.xml > myfile.html
```

##### using `arara` to help with conversion
You can perform the `xsltproc` conversion using `arara` directives. For example, let's say that we have
`myfile.xml` that begins with the following lines:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!-- 
% arara: xslt: {convertTo: html, outputToFile: yes}
% arara: xslt: {convertTo: tex, outputToFile: no}
-->
```

This will perform two conversions - the first to `html`, and will be written to `myfile.html`; the second to 
`tex`, and will only be written to the screen.

You'll need to update your `araraconfig.yaml` file (which lives at the highest level of your home directory, `~/araraconfig.yaml`)
so that it contains the following lines:

```yaml
!config
paths:
- /home/cmhughes/Documents/projects/111and112doc
filetypes:
- extension: xml
  pattern: ^(\s)*%\s+
```

Just make sure that the paths variable matches the directory in which you are keeping this project.

##### cross referencing
heavily inspired by the `cleveref` and `varioref` packages, we can use
```xml
<xref ref="firstsection" /> 
<xref ref="firstsection" beginsentence='true'/> 
<xref ref="firstsection" faraway="true"/> 
<xref ref="firstsection" faraway="true" beginsentence="true"/> 
```
which will give, in `.tex`,
```tex
\cref{firstsection} 
\Cref{firstsection} 
\vref{firstsection} 
\Vref{firstsection}
```
In `.html` it simply gives the name of the object being referred to (e.g Section, Figure, etc) and a hyperlink
to that object; note that page references (given by `vref` and friends in `.tex`) are not as relevant in `.html`.

Similarly,
```xml
<xrefrange ref1="firstsection" ref2="secondsection"/> 
<xrefrange ref1="firstsection" ref2="secondsection" beginsentence='true'/>                
<xrefrange ref1="firstsection" ref2="secondsection" faraway="true"/>                      
<xrefrange ref1="firstsection" ref2="secondsection" faraway="true" beginsentence="true"/> 
```
outputs (in `.tex`)
```tex
\crefrange{firstsection}{secondsection} 
\Crefrange{firstsection}{secondsection}                
\vrefrange{firstsection}{secondsection}                      
\Vrefrange{firstsection}{secondsection}
```
In `.html` it outputs, for example, Section `<hyperlink to firstsection>` through `<hyperlink to second section>`.

##### to do
- add support for multiple references such as `\cref{ref1,ref2,ref3}` which would output, for example `Sections 1, 2 and 3`, or 
  even `Section 1, Figures 2 and 3`, or perhaps `Section 1, Table 2, Figure 1`, etc; `.tex` version is easy, `.html` is tricky
  possibly useful: http://stackoverflow.com/questions/16894908/xsl-transform-to-split-comma-separated-values
- research how to cross reference between .html pages (perhaps using php and a .haux file?)
###### `html canvas` to do 
- MAKE SURE TO CHECK DIFFERENT BROWSERS!!!!
- create hover feature that details the coordinates
- create nodes to label the graphs, e.g y=f(x) (e.g `pos=0.5` a la `tikz`) 
- create `legend`
- create zoom feature (zoomable on hover/click???)
- make the graphs change viewing window by clicking left, right, up, down, KEYBOARD navigable and touch screen compatable (????), 'swiping' culture
