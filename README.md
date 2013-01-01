mootools-hooverzoom
===================

hooverZoom for mootools
A javascript class for Mootools to shoow larger image when hover over thumbnail.

Usage:

HTML:

&lt;a href="someurl.html" data-image="/image/imglarge.jpg" class="myhzlink">&lt;img src="/image/imgthumb.jpg" alt="">&lt;/a>

Javascript:

new hooverZoom($$('a.myhzlink'));
