mootools-imgTip
===================

I was searching for a simple script for mootools js that would show a larger image when hovering over image thumbnail.
Sadly I did not find it, so I decided to write my own.


<h2>DEMO:</h2>
<a href="http://havl.net/devnotes/2013/02/imgtip-mootools-image-popup-on-hover-plugin/">here</a>
<h2>USAGE</h2>

<h3>HTML</h3>
<pre class="code html">
  &lt;div id="thumbs_container">
    &lt;img src="http://yoursite.com/img_1_thumbnail.jpg" title="Title of this image" data-imgtip-url="http://yoursite.com/img_1_full.jpg"  class="imgtip"/>
    &lt;img src="http://yoursite.com/img_2_thumbnail.jpg" title="Title of this second image" data-imgtip-url="http://yoursite.com/img_2_full.jpg" class="imgtip" />
  &lt;/div>
</pre>

<h3>JS</h3>
<pre class="code js">
    var imgtip = new imgTip($$(''img.imgtip'), {});
</pre>


<h2>OPTIONS</h2>


Please note; I have largely based the code on existing mootools Tip component.
