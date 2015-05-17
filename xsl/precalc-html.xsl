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

<!-- omd css file -->
<xsl:param name="html.css.extra"  select="'../style/html/omd.css'" />


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

<!-- em dash -->
<xsl:template match="em-dash">
    <xsl:text>&#8212;</xsl:text>
</xsl:template>

<!-- thead -->
<xsl:template match="thead">
  <xsl:apply-templates />
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

<!-- try it yourself is a special kind of exercises group -->
<xsl:template match="exercises[@style='try-it-yourself']">
  <xsl:element name="article">
    <xsl:attribute name="class">try-it-yourself</xsl:attribute>
    <xsl:element name="em">Try it yourself!</xsl:element>
    <xsl:apply-templates />
  </xsl:element>
</xsl:template>

<!-- examples can sometimes be posed in such a way that they have a solution -->
<xsl:template match="example/solution">
    <xsl:element name="h6">
      <xsl:text>Solution</xsl:text>
    </xsl:element>
    <xsl:element name="article">
        <xsl:apply-templates />
    </xsl:element>
</xsl:template>

<!-- exercisegroups have numbers and titles in OMD -->
<xsl:template match="exercisegroup">
    <div class="exercisegroup">
    <h5 class="heading">
    <span class="type"><xsl:text>Exercise </xsl:text></span>
    <span class="codenumber">
        <xsl:number select="." from="chapter" level="any" count="exercisegroup"/>
    </span>
    <span class="title">
      <xsl:text> </xsl:text>
        <xsl:apply-templates select="title" mode="title-full" />
    </span>
  </h5>
        <xsl:apply-templates select="*[not(self::title)]"/>
    </div>
</xsl:template>

<xsl:template match="exercisegroup/exercise" mode="origin-id">
        <xsl:number select=".." from="chapter" level="any" count="exercisegroup"/>
  <xsl:text>.</xsl:text>
  <xsl:number count="exercisegroup/exercise"/>
</xsl:template>

<xsl:template match="exercisegroup/exercise" mode="number">
        <xsl:number select=".." from="chapter" level="any" count="exercisegroup"/>
  <xsl:text>.</xsl:text>
  <xsl:number count="exercisegroup/exercise"/>
</xsl:template>

<xsl:template match="exercisegroup" mode="number">
        <xsl:number select=".." from="chapter" level="any" count="exercisegroup"/>
</xsl:template>

<!-- We kill the statement, title, date, author exercises and for the exercisegroups    -->
<xsl:template match="exercisegroup//statement|exercisegroup/title|date|author" mode="backmatter" />

</xsl:stylesheet>
