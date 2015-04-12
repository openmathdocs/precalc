<?xml version='1.0'?> <!-- As XML file -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

<!-- This XSL file is a thin layer on MathBook XML.
     Create a file called precalc-html-paths.xsl (in this directory)
     that looks like the following, adapting it to your directory structure
        <?xml version='1.0'?>
        <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
        <xsl:import href="/home/cmhughes/Documents/projects/openmathdocs/mathbook/xsl/mathbook-html.xsl" />
        </xsl:stylesheet>
-->
<xsl:import href="precalc-html-paths.xsl" />


<!-- TODO: outcomes and outcome elements  -->
<!-- TODO: try-it-yourself environment    -->
<!-- TODO: standout element               -->

<!-- Unit MBX handles solutions and answers better in HMTL, kill them       -->
<xsl:template match="solution" />
<xsl:template match="answer" />


</xsl:stylesheet>
