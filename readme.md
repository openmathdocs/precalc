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

####Process work flow (only an outline, as the work flow is ever changing)

#####Source Structure
`precalc/src` contains compartmentalized source for the book.
`precalc.xml` is the "top-level" source file. It loads `bookinfo.xml`, and then it writes the chapters. 
The chapters (for example `functions-part-1.xml`) are also pretty bare---they just load section files.
Sections (like `function-basics.xml`) are where real content is stored.
`bookinfo.xml` stores some metadata for the book, as well as convenient tex macros, and all global pgfplots settings.

#####XSL local to this book
`precalc/xsl` contains several files.
The project's original `mainfile.tex` is here, just for reference, since its components occasionally get brought into the other files.
`precalc-common.xsl`, `precalc-latex.xsl`, and `precalc-html.xsl` each provide a thin layer of XSL on top of MBX.
*Edit* `precalc-latex.xsl` in two places, so that it knows the full path for your MBX repo and for your precalc repo.
Also *edit* `precalc-html.xsl` in one place.
TODO: put these file paths in a separate file that these XSL files reference, and then include that new file in `.gitignore`.
`latex.preamble.xml` is a convenient file to store large chunks of LaTeX preamble code that is used by `precalc-latex.xsl`.

#####Style
Hardcopy style is mostly controlled by MBX defaults, but a few things are locally over-written in `precalc/style/precalc-style.tex`.
For instance, here the definition environment is given a border and color.
Use of a `style.tex` file is experimental, and is being developed in the MBX branch `omd/feature/latex.style.extra`.
If your MBX repo is on the dev branch instead, then you *should* have no trouble processing source into PDF.
But the output will have default MBX styling.

HTML style is controlled by `mathbook.css`. Since `mathbook.css` is a big project for MBX in general, we may not have good
treatments of the CSS for our HTML output yet. If HTML styling seems bad, it will be dealt with later.

#####See some output
Navigate to `precalc/src/`.
Run
```xsltproc -xinclude ../xsl/precalc-latex.xsl precalc.xml >> draft.tex
pdflatex draft.tex
pdflatex draft.tex
open draft.pdf
```
to see some PDF output.

Run 
```xsltproc -xinclude ../xsl/precalc-html.xsl precalc.xml
open precalc.html
```
to see some HTML output.
TODO: Package this into arara.




