/**
Author: David Havl   -   http://davidhavl.com

Script: imgTip.js
    imgTip - A javascript class for Mootools to shoow larger image when hover over thumbnail.

Based on mootools Tip class created by 

  - Valerio Proietti
  - Christoph Pojer
  - Luis Merino

Dependencies:
  - Core/Options
  - Core/Events
  - Core/Element.Event
  - Core/Element.Style
  - Core/Element.Dimensions
  - /MooTools.More


Version 1.1
*/
var imgTip = new Class({

    Implements: [Events, Options],

    options: {
        onShow: function(){
            this.imgtip.setStyle('display', 'block');
        },
        onHide: function(){
            this.imgtip.setStyle('display', 'none');
        },
        title: 'title',
        body: function(element){
            var url = element.get('data-imgtip-url') || element.get('rel') || element.get('href');
            if (url) {
                return '<img src="' + url + '" alt="imgtip full image">';
            }
            return element.get('text');
        },
        showDelay: 100,
        hideDelay: 100,
        className: 'imgtip-wrap',
        offset: {x: 16, y: 16},
        windowPadding: {x:0, y:0},
        fixed: false
    },

    initialize: function(){
        var params = Array.link(arguments, {
            options: Type.isObject,
            elements: function(obj){
                return obj != null;
            }
        });
        this.setOptions(params.options);
        if (params.elements) this.attach(params.elements);
        this.container = new Element('div', {'class': 'imgtip'});

        if (this.options.id){
            this.container.set('id', this.options.id);
        }
    },

    toElement: function(){
        if (this.imgtip) return this.imgtip;

        this.imgtip = new Element('div', {
            'class': this.options.className,
            styles: {
                position: 'absolute',
                top: 0,
                left: 0
            }
        }).adopt(
            new Element('div', {'class': 'imgtip-top'}),
            this.container,
            new Element('div', {'class': 'imgtip-bottom'})
        );

        return this.imgtip;
    },


    attach: function(elements){
        $$(elements).each(function(element){
            var title = read(this.options.title, element),
                body = read(this.options.body, element);

            element.set('title', '').store('imgtip:native', title).retrieve('imgtip:title', title);
            element.retrieve('imgtip:body', body);
            this.fireEvent('attach', [element]);

            var events = ['enter', 'leave'];
            if (!this.options.fixed) events.push('move');

            events.each(function(value){
                var event = element.retrieve('imgtip:' + value);
                if (!event) event = function(event){
                    this['element' + value.capitalize()].apply(this, [event, element]);
                }.bind(this);

                element.store('imgtip:' + value, event).addEvent('mouse' + value, event);
            }, this);
        }, this);

        return this;
    },

    detach: function(elements){
        $$(elements).each(function(element){
            ['enter', 'leave', 'move'].each(function(value){
                element.removeEvent('mouse' + value, element.retrieve('imgtip:' + value)).eliminate('imgtip:' + value);
            });

            this.fireEvent('detach', [element]);

            if (this.options.title == 'title'){ // This is necessary to check if we can revert the title
                var original = element.retrieve('imgtip:native');
                if (original) element.set('title', original);
            }
        }, this);

        return this;
    },

    elementEnter: function(event, element){
        clearTimeout(this.timer);
        this.timer = (function(){
            this.container.empty();

            ['title', 'body'].each(function(value){
                var content = element.retrieve('imgtip:' + value);
                var div = this['_' + value + 'Element'] = new Element('div', {
                        'class': 'imgtip-' + value
                    }).inject(this.container);
                if (content) this.fill(div, content);
            }, this);
            this.show(element);
            this.position((this.options.fixed) ? {page: element.getPosition()} : event);
        }).delay(this.options.showDelay, this);
    },

    elementLeave: function(event, element){
        clearTimeout(this.timer);
        this.timer = this.hide.delay(this.options.hideDelay, this, element);
        this.fireForParent(event, element);
    },

    setTitle: function(title){
        if (this._titleElement){
            this._titleElement.empty();
            this.fill(this._titleElement, title);
        }
        return this;
    },

    setBody: function(body){
        if (this._bodyElement){
            this._bodyElement.empty();
            this.fill(this._bodyElement, body);
        }
        return this;
    },

    fireForParent: function(event, element){
        element = element.getParent();
        if (!element || element == document.body) return;
        if (element.retrieve('imgtip:enter')) element.fireEvent('mouseenter', event);
        else this.fireForParent(event, element);
    },

    elementMove: function(event, element){
        this.position(event);
    },

    position: function(event){
        if (!this.imgtip) document.id(this);

        var size = window.getSize(), scroll = window.getScroll(),
            imgtip = {x: this.imgtip.offsetWidth, y: this.imgtip.offsetHeight},
            props = {x: 'left', y: 'top'},
            bounds = {y: false, x2: false, y2: false, x: false},
            obj = {};

        for (var z in props){
            obj[props[z]] = event.page[z] + this.options.offset[z];
            if (obj[props[z]] < 0) bounds[z] = true;
            if ((obj[props[z]] + imgtip[z] - scroll[z]) > size[z] - this.options.windowPadding[z]){
                obj[props[z]] = event.page[z] - this.options.offset[z] - imgtip[z];
                bounds[z+'2'] = true;
            }
        }

        this.fireEvent('bound', bounds);
        this.imgtip.setStyles(obj);
    },

    fill: function(element, contents){
        if (typeof contents == 'string') element.set('html', contents);
        else element.adopt(contents);
    },

    show: function(element){
        if (!this.imgtip) document.id(this);
        if (!this.imgtip.getParent()) this.imgtip.inject(document.body);
        this.fireEvent('show', [this.imgtip, element]);
    },

    hide: function(element){
        if (!this.imgtip) document.id(this);
        this.fireEvent('hide', [this.imgtip, element]);
    }
});