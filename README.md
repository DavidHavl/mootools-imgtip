mootools-hooverzoom
===================

hooverZoom for mootools
A javascript class for Mootools to shoow larger image when hover over thumbnail.

Usage:

HTML:

<a href="someurl.html" data-image="/image/imglarge.jpg" class="myhzlink"><img src="/image/imgthumb.jpg" alt=""></a>

Javascript:

new hooverZoom($$('a.myhzlink'));
