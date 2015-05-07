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

<!-- Common thin layer                                                      -->
<xsl:import href="precalc-common.xsl" />


<!-- TODO: outcomes and outcome elements  -->
<!-- TODO: try-it-yourself environment    -->
<!-- TODO: standout element               -->

<!-- Unit MBX handles solutions and answers better in HMTL, kill them      -->
<xsl:template match="solution" />
<xsl:template match="answer" />
<!-- vertical Ellipsis (vdots), for text, not math -->
<xsl:template match="vellipsis">
    <xsl:text>&#x22ee;</xsl:text>
</xsl:template>

<!-- Outcomes are an unordered type of list -->
<xsl:template match="outcomes">
  <xsl:element name="em">
    <xsl:text>Section Themes, Concepts, Issues, Competencies, and Skills:</xsl:text>
      </xsl:element>
      <xsl:element name="ul">
        <xsl:apply-templates select="outcome" />
  </xsl:element>
  </xsl:template>

<xsl:template match="outcomes//outcome">
  <xsl:element name="li">
    <xsl:apply-templates />
  </xsl:element>
</xsl:template>


</xsl:stylesheet>
