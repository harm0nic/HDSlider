# HDSlider
## Simple and lightweight Vanilla JS Slider

View the [Making Of Video](https://youtu.be/vU-OQJYUCJc).

## How To Use?
Add the `script.js` and `style.css` files to your site. Create a div to act as the wrapper for your slides. All first level child elements will automatically be created as slides.

*Example:*
  <div id = "hdslide">
    <div class = "slide">Some cool slider content</div>
    <div class = "slide">Some cool slider content</div>
    <div class = "slide">Some cool slider content</div>
  </div>
  
Now to intialize, run `HDS("#hdslide")`;

HDS also accepts an options object.

  		delay = 0; // delay in ms to begin the timer
			speed = 5000; // time in ms 'till next slide
			transition = 600; // time in ms for animation speed
			pagination = true; // enable pagination dots
			navigation = true; // enable next/prev navigation
      
*Example:* `HDS("#hdslide", {speed: 7000, pagination: false})`
