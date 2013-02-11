mootools-imgTip
===================
<h2></h2>
I was searching for a simple script for mootools js that would show a larger image when hovering over image thumbnail.
Sadly I did not find it, so I decided to write my own.

I have largely based the code on existing mootools Tip component.

<h2>DEMO:</h2>
<!--<script type="text/javascript" src="https://raw.github.com/DavidHavl/mootools-imgtip/master/hooverZoom.js"></script>-->

<div>
    <img src="http://havl.net/davidhavl.jpg" title="" data-imgtip-url="http://havl.net/davidhavl.jpg" class="imgtip"/>
    <img src="http://havl.net/davidhavl.jpg" title="" data-imgtip-url="http://havl.net/davidhavl.jpg" class="imgtip" />
</div>
<script type="text/javascript">
var imgtip = new imgTip($$('img.imgtip'), {});
</script>
<h2>DOWNLOAD:</h2>
Get the full code from <a href="https://github.com/DavidHavl/mootools-imgtip">github</a>.

<h2>USAGE</h2>

<h3>HTML</h3>
<pre class="code html">
  <div id="thumbs_container">
    <img src="http://yoursite.com/img_1_thumbnail.jpg" title="Title of this image" data-imgtip-url="http://yoursite.com/img_1_full.jpg"  class="imgtip"/>
    <img src="http://yoursite.com/img_2_thumbnail.jpg" title="Title of this second image" data-imgtip-url="http://yoursite.com/img_2_full.jpg" class="imgtip" />
  </div>
</pre>

<h3>JS</h3>
<pre class="code js">
    var imgtip = new imgTip($$(''img.imgtip'), {});
</pre>


<h2>OPTIONS</h2>
