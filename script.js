const HDS = function (el = null, options = {}) {
	class slider {
		constructor(options) {
			this.delay = 0; // delay in ms to begin the timer
			this.speed = 5000; // time in ms 'till next slide
			this.transition = 600; // time in ms for animation speed
			this.pagination = true;
			this.navigation = true;

			for (const k in options) {
				this[k] = options[k];
			}

			this.delay = parseInt(this.delay);
			this.speed = parseInt(this.speed);
			this.transition = parseInt(this.transition);
		}
	}

	const $ = {
		VARS: {
			slider: null,
			slides: null,
			options: {},
			timer: null,
			pagination: null,
		},
		init: async function () {
			if (el === null) {
				console.error("Please select a container for the slider");
				return;
			}
			$.VARS.slider = document.querySelector(el);
			$.VARS.options = new slider(options);

			await $.create();
		},
		create: async function () {
			const slides = document.createElement("div");
			slides.classList.add("hds_slides_container");

			const content = $.VARS.slider.innerHTML;
			slides.innerHTML = content;
			$.VARS.slider.innerHTML = "";
			$.VARS.slider.append(slides);
			$.VARS.slider.classList.add("hds_slider");

			$.VARS.slides = $.VARS.slider.getElementsByClassName("hds_slides_container")[0].children;
			for (let i = 0; i < $.VARS.slides.length; i++) {
				$.VARS.slides[i].classList.add("hds_slide");
			}

			$.VARS.slider.style.setProperty("--slide-transition-speed", $.VARS.options.transition + "ms");

			if ($.VARS.options.navigation === true) {
				$.navigation();
			}

			if ($.VARS.options.pagination === true) {
				$.pagination();
			}

			$.setActive($.VARS.slides[0]);
			setTimeout($.start, $.VARS.options.delay);
		},
		setActive: function (slide) {
			for (let i = 0; i < $.VARS.slides.length; i++) {
				$.VARS.slides[i].classList.remove("hds_slide_active");
			}
			slide.classList.add("hds_slide_active");

			if ($.VARS.options.pagination === true) {
				let index = 0;
				for (let i = 0; i < $.VARS.slides.length; i++) {
					if ($.VARS.slides[i].classList.contains("hds_slide_active")) {
						index = i;
						break;
					}
				}

				for (let i = 0; i < $.VARS.pagination.length; i++) {
					$.VARS.pagination[i].classList.remove("hds_pagination_item_active");
				}
				$.VARS.pagination[index].classList.add("hds_pagination_item_active");
			}
		},
		start: function () {
			$.VARS.timer = setInterval($.next, $.VARS.options.speed);
		},
		next: function () {
			clearInterval($.VARS.timer);
			const active = $.VARS.slider.getElementsByClassName("hds_slide_active")[0];
			if (active.nextElementSibling === null) {
				$.setActive($.VARS.slides[0]);
			} else {
				$.setActive(active.nextElementSibling);
			}
			$.start();
		},
		prev: function () {
			clearInterval($.VARS.timer);

			const active = $.VARS.slider.getElementsByClassName("hds_slide_active")[0];
			if (active.previousElementSibling === null) {
				$.setActive($.VARS.slides[$.VARS.slides.length - 1]);
			} else {
				$.setActive(active.previousElementSibling);
			}

			$.start();
		},
		navigation: function () {
			const nav = `<div class = "hds_nav_item hds_prev"><</div><div class = "hds_nav_item hds_next">></div>`;
			$.VARS.slider.insertAdjacentHTML("beforeend", nav);

			const prev = $.VARS.slider.getElementsByClassName("hds_prev")[0];
			const next = $.VARS.slider.getElementsByClassName("hds_next")[0];

			prev.addEventListener("click", $.prev);
			next.addEventListener("click", $.next);
		},
		pagination: function () {
			let html = '<div class = "hds_pagination">';
			for (let i = 0; i < $.VARS.slides.length; i++) {
				html += `<div class = "hds_pagination_item"></div>`;
			}
			html += "</div>";

			$.VARS.slider.insertAdjacentHTML("beforeend", html);
			$.VARS.pagination = $.VARS.slider.getElementsByClassName("hds_pagination_item");

			for (let i = 0; i < $.VARS.pagination.length; i++) {
				$.VARS.pagination[i].addEventListener("click", function () {
					if (this.classList.contains("hds_pagination_item_active")) {
						return;
					}
					let index = 0;
					for (let i = 0; i < $.VARS.pagination.length; i++) {
						if ($.VARS.pagination[i] === this) {
							index = i;
							break;
						}
					}
					$.setActive($.VARS.slides[index]);
				});
			}
		},
	};

	$.init(el, options);
};
