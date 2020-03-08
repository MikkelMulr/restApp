/* jslint browser: true */
/* global $, TweenMax, Sine, Back, Elastic, alert */

// hide all screens and section divs
$("main, section").hide(); // set display: none to main and section divs in css to stop flash
$('.confirmation').hide(); // Hide confirmation message before it is required
$('#about-content').hide() // Initially hide the about section of the menu
$('#contact-content').hide() // Initially hide the contact section of the menu
// SPLASH SCREEN //////////////////////////////////////////////

// display splash screen
$("#splash").show();

// animate on the splash screen on app load
TweenMax.from("#splash", 0.5, {
    delay: 0.25,
    opacity: 0
});

TweenMax.from("#splash header", 0.5, {
    delay: 0.5,
    y: -$("#splash header").outerHeight(),
    ease: Sine.easeOut
});

TweenMax.from("#splash footer", 0.5, {
    delay: 0.5,
    y: $("#splash footer").outerHeight(),
    ease: Sine.easeOut
});

TweenMax.from("#splash img", 0.5, {
    delay: 1,
    rotation: 180,
    scale: 0,
    ease: Back.easeOut
});

TweenMax.from("#splash p", 0.75, {
    delay: 1.5,
    opacity: 0,
    ease: Back.easeOut
});

// wait 4 secs then fade out and load landing screen
TweenMax.to("#splash", 0.5, {
    delay: 4,
    opacity: 0,
    onComplete: loadLanding
});

// LANDING SCREEN ///////////////////////////////////////////

function loadLanding() {

    // hide and reset all screens/sections
    $("main, section").hide().css({opacity: 1});
    
    // display landing screen
    $("#landing").show();

    // animate on the landing screen
    TweenMax.from("#landing", 0.5, {
        delay: 0.25,
        opacity: 0
    });

    TweenMax.from("#landing header", 0.5, {
        delay: 0.5,
        y: -$("#landing header").outerHeight(),
        ease: Sine.easeOut
    });

    TweenMax.from("#landing footer", 0.5, {
        delay: 0.5,
        y: $("#landing footer").outerHeight(),
        ease: Sine.easeOut
    });

  // Logos load in from sides
  TweenMax.from('#logo1', 0.5, {
    delay: 1,
    opacity: 0,
    x: -$('#logo1').outerWidth(),
    ease: Sine.easeOut
  });

  TweenMax.from('#logo2', 0.5, {
    delay: 1.25,
    opacity: 0,
    x: -$('#logo2').outerWidth(),
    ease: Sine.easeOut
  });

  TweenMax.from('#logo3', 0.5, {
    delay: 1.5,
    opacity: 0,
    x: -$('#logo3').outerWidth(),
    ease: Sine.easeOut
  });

    // set up logos to link to related restaurant
    // pass rest ID and subnav highlight colour to loadRest function
    // fade landing out and load selected restaurant
    $("#logo1").click(function() {

        TweenMax.to("#landing", 0.5, {
            opacity: 0,
            onComplete: loadRest,
            onCompleteParams: ["#rest1", "#1e3258"]
        });

    });

    $("#logo2").click(function() {

        TweenMax.to("#landing", 0.5, {
            opacity: 0,
            onComplete: loadRest,
            onCompleteParams: ["#rest2", "#1e5820"]
        });

    });

    $("#logo3").click(function() {

        TweenMax.to("#landing", 0.5, {
            opacity: 0,
            onComplete: loadRest,
            onCompleteParams: ["#rest3", "#581e1e"]
        });

    });
}

// RESTAURANT SCREENS ///////////////////////////////////////////

function loadRest(restID, highlightColour) {
    
    // hide landing screen
    $("#landing").hide();

    // display selected restaurant screen
    $(restID).show();

    // animate on the restaurant
    TweenMax.from(restID + " header", 0.5, {
        delay: 0.25,
        y: -$(restID + " header").outerHeight(),
        ease: Sine.easeOut
    });

    TweenMax.from(restID + " footer", 0.5, {
        delay: 0.25,
        y: $(restID + " footer").outerHeight(),
        ease: Sine.easeOut
    });

    // display home section
    $(restID + " .home").show();

    // animate on home section
    TweenMax.from(restID + " .home", 0.5, {
        delay: 0.75,
        opacity: 0
    });

    // loop through and reveal all elements on home screen with .reveal class applied
    $(restID + " .home .top-reveal").each(function(i) {

        TweenMax.from(this, 1, {
            delay: 1.5 + i * 0.25,
            opacity: 0,
            x: -10,
            ease: Sine.easeOut
        });

    });
    
    
    $(restID + " .home .reveal").each(function(i) {

        TweenMax.from(this, 1, {
            delay: 1.25 + i * 0.25,
            opacity: 0,
            y: -10,
            ease: Sine.easeOut
        });

    });
    
    // create var to target icons from selected restaurant
    var iconsTarget = restID + " .homeIcon," + restID + " .specialsIcon, " + restID + " .reservationsIcon";
    
    // remove highlight and active class from all icons
    $(iconsTarget).css({background: 'none'}).removeClass("active");
    
    // highlight home icon and add active class on restaurant load
    $(restID + " .homeIcon").css({background: highlightColour}).addClass("active");
    
    // set up section nav - highlight and load section
    $(iconsTarget).click(function() {
        
        // check if selected button has active class... If it doesn't allow
        if(!$(this).hasClass("active"))
        {
            // remove highlight and active class from all icons
            $(iconsTarget).css({background: 'none'}).removeClass("active");

            // add highlight and active class to selected icon based on highlight colour
            $(this).css({background: highlightColour}).addClass("active");

            // load selected section - send current section and section to load
            loadSection(restID + " section", restID + " " + $(this).attr("data-section"));
        }

    });

}

// REUSABLE FUNCTIONS/CLICKS /////////////////////////////////////

// function for loading internal restaurant sections
function loadSection(prevSection, nextSection) {

    // fade out previous section
    TweenMax.to(prevSection, 0.5, {
        opacity: 0,
        onComplete: function() {
            // hide and reset previous section
            $(prevSection).hide().css({opacity: 1});
            // display next section and auto scroll to top of page
            $(nextSection).show().scrollTop(0);
        }
    });

    // animate on next section
    TweenMax.from(nextSection, 0.5, {
        delay: 0.5,
        opacity: 0
    });

    // loop through and reveal all elements on next screen with .reveal class applied
    
    $(nextSection + " .top-reveal").each(function(i) {

        TweenMax.from(this, 1, {
            delay: 1.25 + i * 0.25,
            opacity: 0,
            x: -10,
            ease: Sine.easeOut
        });

    });
    
    
    $(nextSection + " .reveal").each(function(i) {

        TweenMax.from(this, 1, {
            delay: 1 + i * 0.25,
            opacity: 0,
            y: -10,
            ease: Sine.easeOut
        });

    });



}

// set up reservations submit button
$(".reserve").click(function(e) {
    
    // stops default processing for form
    e.preventDefault();
    
    $('.confirmation').show();
    
});

// set up hamburger menu to reveal main menu

$('.hamburger').click(function() {

  if ($(this).attr('data-click-state') == 1) {

    $(this).attr('data-click-state', 0);
    $(this).attr('src', 'img/openToClose.gif');

    $('#menu').show();
    TweenMax.to(".rest", 0.5, {
      x: 310,
      ease: Power2.easeOut
    });

  } else {

    $(this).attr('data-click-state', 1);
    $(this).attr('src', 'img/closeToOpen.gif');

    TweenMax.to(".rest", 0.5, {
      x: 0,
      ease: Power2.easeOut,
      onComplete: function() {
        $('#menu').hide();
        $('#about-content').hide()
        $('#contact-content').hide()
        $('#contact-content').attr('data-click-state', 1);
        $('#about-content').attr('data-click-state', 1);
      }
    });
  }

});

// set up main menu links
// go back to landing screen

$('#backToLanding').click(function() {
  $('.confirmation').hide();
  $('.hamburger').attr('data-click-state', 1);
  $('.hamburger').attr('src', 'img/closeToOpen.gif');

  TweenMax.to(".rest", 0.5, {
    x: 0,
    ease: Sine.easeOut,
    onComplete: function() {
      $('#menu').hide();

      TweenMax.to('.rest', 0.5, {
        opacity: 0,
        onComplete: loadLanding
      });
    }
  });

});

// reveal FoE about info      

$('#about').click(function() {

    if ($('#about-content').attr('data-click-state') == 1) {
        
        $('#about-content').attr('data-click-state', 0);
        $('#about-content').show();

    } else {

        $('#about-content').attr('data-click-state', 1);
        $('#about-content').hide();
    }

});


// reveal FoE contact info

$('#contact').click(function() {


        if ($('#about-content').attr('data-click-state') == 1) {
            
            $('#about-content').attr('data-click-state', 0);
            
            $('#contact-content').show();
            $('#about-content').hide();
            
        } else {
    
            $('#about-content').attr('data-click-state', 1);
            $('#contact-content').hide();
        }

});
