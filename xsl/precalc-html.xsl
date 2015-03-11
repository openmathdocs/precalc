<?xml version='1.0'?> <!-- As XML file -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<!-- This XSL file is a thin layer on MathBook XML                          -->
<xsl:import href="/Users/alexjordan/mathbook/xsl/mathbook-html.xsl" />


<!-- TODO: outcomes and outcome elements  -->
<!-- TODO: try-it-yourself environment    -->
<!-- TODO: standout element               -->

<!-- Unit MBX handles solutions and answers better in HMTL, kill them       -->
<xsl:template match="solution" />
<xsl:template match="answer" />


</xsl:stylesheet>
