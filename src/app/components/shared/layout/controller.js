var layoutModule,
	// slider,
	view = require('./view.js'),
    baseController = require('../../base/controller.js');


module.exports = layoutModule = baseController.extend({

    init: function() {

    	this._subscriptions = [];
        this.subscribe(CONST.ACTIONS.SWITCH_LAYOUT, function(layout) {

            view.template = view.templates[ layout ];
            view.render();
            // showSlider();
            // slider = new Slider( ".slider" );

        });
    }
});

function showSlider() {
	console.log('show slider');
	layoutModule.publish(CONST.ACTIONS.GET_SLIDES);
	layoutModule.subscribe(CONST.ACTIONS.SLIDES_RECEIVED, function(slides){
		// console.log(slides);
		var json = JSON.parse(slides);
			// source = $('.slider-wrapper').html(),
			// template = Handlebars.compile(source),
			// html = template(slides);
		// console.log(JSON.parse(slides));
		view.append(html);
	});
}

function Slider(element) {
	this.el = document.querySelector(element);
	this.sliderInit();
}

Slider.prototype = {
	sliderInit: function() {
		this.links = document.querySelectorAll( "#js-menu li");
		this.wrapper = document.querySelector( ".slider-wrapper");
		this.setLinks();
	},

	setLinks: function() {
		for( var i = 0; i < this.links.length; ++i ) {
			var link = this.links[i];
			this.slide(link);
		}
		this.setFirstSlide(this.links[0]);
	},

	setFirstSlide: function(slide){
		this.setCurrentLink(slide);
		var initSlide = this.el.querySelector(".slide:nth-child(1)");
		this.wrapper.style.left = "-" + initSlide.offsetLeft + "px";
	},
	
	// animate: function( slide ) {
	// 	var parent = slide.parentNode;
	// 	var caption = slide.querySelector( ".cover__right-side" );
	// 	var captions = parent.querySelectorAll( ".cover__right-side" );
	// 	for( var k = 0; k < captions.length; ++k ) {
	// 		var cap = captions[k];
	// 		if( cap !== caption ) {
	// 			cap.classList.remove( "visible" );
	// 		}
	// 	}
	// 	caption.classList.add( "visible" );	
	// },
	
	slide: function(element) {
		var self = this;
		element.addEventListener( "click", function() {
			var button = this,
				index = parseInt(button.getAttribute( "data-slide" ), 10 ) + 1,
				currentSlide = self.el.querySelector( ".slide:nth-child(" + index + ")" );
			self.setCurrentLink(button);
			self.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
			// self.animate( currentSlide );		
		}, false);
	},
	setCurrentLink: function(link) {
		var parent = link.parentNode,
			buttons = parent.querySelectorAll( "li" );
		link.classList.add("current");
		for( var j = 0; j < buttons.length; ++j ) {
			var cur = buttons[j];
			if( cur !== link ) {
				cur.classList.remove("current");
			}
		}
	}
};