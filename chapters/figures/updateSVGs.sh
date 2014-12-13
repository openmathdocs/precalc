#!/bin/bash
#
# BASH script to pdflatex all .tex files in the current directory
#      and then run pdf2svg on each pdf file 

# pdflatex all .tex files
find -name "*.tex"|while read file; do pdflatex "$file";done

# convert each pdf to an svg
# reference: http://unix.stackexchange.com/questions/19654/changing-extension-to-multiple-files
for f in *.pdf; do 
pdf2svg "$f" "${f%.pdf}.svg"
done
