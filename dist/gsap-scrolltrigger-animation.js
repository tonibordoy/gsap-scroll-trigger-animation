//+-------------------------------------------------
// Node Modules Import
//+-------------------------------------------------
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//+-------------------------------------------------
// gsapScrollTriggerAnimation()
// Trigger animations individually for each 
// data-gsta child depending on attribute
//+-------------------------------------------------
function gsapScrollTriggerAnimation() {
    let gstaAnimation = gsap.utils.toArray($('[data-gsta-animation]'));


    // Animation Loop
    gstaAnimation.forEach((gstaAnimation) => {
        var gstaTrigger = $(gstaAnimation).closest('[data-gsta-trigger]');
        var gstaTriggerStart = 'top 75%';
        var gstaTriggerEnd = 'top 75%';
        var gstaTriggerScrub = false;
        var gstaDirection = $(gstaAnimation).data('gsta-animation');
        var gstaSettings;
        var gstaDurationSetting;
        var gstaDelaySetting;
        var gstaStagger;
        
        // Trigger
        // +-----------------------------------------------------------------------------
        // Defining all available trigger settings:
        // - Trigger Start/End (with same value)
        // - Trigger Start
        // - Trigger End
        // - Trigger Scrub
        // +-----------------------------------------------------------------------------
        if( gstaTrigger.data('gsta-trigger') !== '' ) {
            gstaTriggerStart = gstaTriggerEnd = gstaTrigger.data('gsta-trigger');
        }
        if( gstaTrigger.is('[data-gsta-trigger-start]') ) {
            if( gstaTrigger.data('gsta-trigger-start') !== '' ) {
                gstaTriggerStart = gstaTrigger.data('gsta-trigger-start');
            }
        }
        if( gstaTrigger.is('[data-gsta-trigger-end]') ) {
            if( gstaTrigger.data('gsta-trigger-end') !== '' ) {
                gstaTriggerEnd = gstaTrigger.data('gsta-trigger-end');
            }
        }
        if( gstaTrigger.is('[data-gsta-trigger-scrub]') ) {
            if( gstaTrigger.data('gsta-trigger-scrub') !== '' ) {
                gstaTriggerScrub = gstaTrigger.data('gsta-trigger-scrub');
            }
        }

        // Default Tweens
        if( gstaDirection === 'fadein' ) {
            gstaSettings = { opacity: 0 };
        }
        if( gstaDirection === 'fadein-up' ) {
            gstaSettings = { top: 50, opacity: 0 };
        }
        if( gstaDirection === 'fadein-right' ) {
            gstaSettings = { left: 50, opacity: 0 };
        }
        if( gstaDirection === 'fadein-down' ) {
            gstaSettings = { top: -50, opacity: 0 };
        }
        if( gstaDirection === 'fadein-left' ) {
            gstaSettings = { left: -50, opacity: 0 };
        }

        // Custom Tweens
        // +-----------------------------------------------------------------------------
        // You can name your tween as you want and add tween custom settings
        // Feel free to create as many custom tweens as you need duplicating this example
        // +-----------------------------------------------------------------------------
        if( gstaDirection === 'custom' ) {
            gstaSettings = { /* Your custom tween settings here */ };
        }

        // Duration Settings
        if( $(gstaAnimation).is('[data-gsta-duration]') ) {
            var gstaDuration = $(gstaAnimation).data('gsta-duration');
            gstaDurationSetting = { duration: gstaDuration }
        } else {
            gstaDurationSetting = { duration: .5 }
        }

        // Delay Settings
        if( $(gstaAnimation).is('[data-gsta-delay]') ) {
            var gstaDelay = $(gstaAnimation).data('gsta-delay');
            gstaDelaySetting = { delay: gstaDelay }
        } else {
            gstaDelaySetting = { delay: 0 }
        }

        // Stagger Settings
        if( $(gstaAnimation).is('[data-gsta-stagger]') ) {
            var gstaStaggerTarget = $(gstaAnimation).data('gsta-stagger');
            var gstaStaggerEach = null;
            var $gstaStaggerElement = gstaAnimation.querySelectorAll(gstaStaggerTarget);

            if($(gstaAnimation).is('[data-gsta-stagger-each]')) {
                gstaStaggerEach = $(gstaAnimation).data('gsta-stagger-each');
            } else {
                gstaStaggerEach = .3;
            }

            gstaAnimation = $gstaStaggerElement;

            gstaStagger = {
                stagger: {
                    each: gstaStaggerEach
                }
            }
        } else {
            gstaStagger = {}
        }

        // Main Tween
        gsap.from( gstaAnimation, Object.assign(
            {},
            gstaSettings, // Load tween settings
            gstaDurationSetting, // Load duration setting if exists
            gstaDelaySetting, // Load delay setting if exists
            gstaStagger, // Load stagger setting if exists and change animation target
            {
                scrollTrigger: {
                    // markers: true,
                    trigger: gstaTrigger,
                    start: gstaTriggerStart,
                    end: gstaTriggerEnd,
                    scrub: gstaTriggerScrub,
                }
            }
        ));
    });
}

function scrollTriggerAnimations() {
    window.setTimeout(() => {
        // Stop execution when no swiper element has been found
        if ($('[data-gsta-animation]').length === 0) {
            return;
        }

        // Initialize execution if any data-gsta-animation has been found
        gsapScrollTriggerAnimation();
    }, 300);
}

// -- Initial execution
// Runs selected functions on jQuery window.ready
//+--------------------------------
$(function() {
    scrollTriggerAnimations();
});