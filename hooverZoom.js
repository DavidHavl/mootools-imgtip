/**
Script: hooverZoom.js
	hooverZoom - A javascript class for Mootools to shoow larger image when hover over thumbnail.

Dependencies:
	Mootools 1.4.5 Core:
	Mootools 1.4.0.1 More: Assets.

Author: David Havl   -   http://davidhavl.com
*/
var hooverZoom = new Class({

    //implements
    Implements: [Options,Events],

    //options
    options: {
        positionOffset: {'x' : -20, 'y' : -20}
    },

    box : false,
    content : false,
    title : false,
    loading : false,
    position : {'x' : 30, 'y' : 30},
    size : {'width' : 250, 'height' : 250},
    //initialization
    initialize: function(options) {
      //set options
      this.setOptions(options);
      this.createBox();
    },

    createBox : function()
    {
      if( this.box ) {
        return;
      }

      var bind = this;

      this.box = new Element('div', {
        'id' : 'hooverzoom_box',
        'opacity' : 0,
        'style' : 'position:absolute; visibility:hidden;'
      });
      this.loading = new Element('img', {
        'id' : 'hooverzoom_load',
        'src' : 'externals/hooverzoom/loading.gif',
        'opacity' : 0,
        'style' : 'position:absolute; visibility:hidden;'
      });
      this.loading.inject(this.box);
      this.box.inject(document.body);
    },

    bindElements: function(elements)
    {
        if (typeof elements == 'undefined') {
            return;
        }
        
        var bind = this;        
        elements.each(function(el){
            if( el.get('tag') != 'a' || el.retrieve('hooverzoomed', false) )
            {
                return;
            }
            var params = Function.attempt(function(){
                var ret = JSON.decode(el.title);
                if (instanceOf(ret.title, String)) {
                    el.title = ret.title;
                }
                else {
                  el.title = '';
                }
                return ret;
            }, function(){
                return {};
            });

            var url = el.get('href');
            if (el.get('data-image') != null) {
                url = el.get('data-image');
            }
            el.store('hooverzoom', params);
            el.store('hooverzoomed', true);

            el.addEvent('mouseenter', function(event)
            {
              event.stop();
              var coordinates = el.getCoordinates(document.body);
              bind.open(url, { x: coordinates.right, y: coordinates.top});
            });
            el.addEvent('mouseout', function(event)
            {
              event.stop();
              bind.hide();
            });
            
            
            
        });
    },

    open : function(url, options)
    {
        if (this.box) {
            this.createBox();
        }
        var hide = true;
        if (this.content) {
            this.content.destroy();
        }
        if (instanceOf(options.x, Number) && instanceOf(options.y, Number) ) {
            this.position.x = options.x + this.options.positionOffset.x;
            this.position.y = options.y + this.options.positionOffset.y;
        } else {
            this.position.x = (window.getScroll().x + (window.getSize().x - this.size.width) / 2) + this.options.positionOffset.x;
            this.position.y = (window.getScroll().y + (window.getSize().y - this.size.height) / 2) + this.options.positionOffset.y;
        }
        if (instanceOf(options.title, String)) {
            this.title = options.title;
        } else {
            this.title = '';
        }
        
        if( instanceOf(url, String)
            && url.length < 4000 
            && (url.substring(0, 1) == '/' ||
                url.substring(0, 1) == '.' ||
                url.substring(0, 4) == 'http') 
            && url.match(/\.(jpe?g|png|gif|bmp)/gi)) {
                // it is correct image format and url
                if (this.loading) {
                    this.loading.setStyle('opacity', 1);
                    this.loading.setStyle('visibility', 'visible');
                }
                this.box.setStyle('opacity', 1);
                this.box.setStyle('visibility', 'visible');
                var imageAsset = new Asset.image(url, { 
                    onLoad:function(img){
                        this._loadComplete(img);
                    }.bind(this)
                });
                this.box.setPosition({
                    x : this.position.x,
                    y : this.position.y
                });
                this.box.setStyle('display', 'block'); 
                hide = false;
          }


        if (hide) {
            this.hide();
        }
    },

    hide : function() 
    {
        if (this.loading) {
            this.loading.setStyle('opacity', 0);
        }
        if (this.box) {
          var bind = this;
          this.box.tween('opacity', [1, 0]);
          this.box.get('tween').addEvent('complete', function() {
            bind.box.setStyle('display', 'none');
            bind.fireEvent('closeafter');
          });
        }
    },

    close : function() 
    {
        if( this.box ) this.box.destroy();
    },

    _loadComplete : function(img)
    {
        this.content = img;
        var elSize = this.content.getSize();
        this.box.setStyles({
            'width' : (elSize.x) + 'px',
            'height' : (elSize.y) + 'px'
        });
        if (this.loading) {
            this.loading.setStyle('opacity', 0);
        }
        this.content.inject(this.box);
    }

});//END HOVERZOOM CLASS CODE

