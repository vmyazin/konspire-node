// 
//  konspire.js
//  2010-2015
//  
//  Created by VM on 2010-06-06. Edited 2015-01-09
//  Copyright 2010 __MyCompanyName__. All rights reserved.
// 

// Image Preload Plugin
(function($) {
  var cache = [];
  // Arguments are image paths relative to the current page.
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }
})(jQuery)

$(function() {
  
  jQuery.preLoadImages("/images/bg-sd-blue.jpg");
  
  // Enable light switch + cookies
  $('.short-desc').removeClass('lit');
  
  $('#light-switch').click(function() {
    var sd = $('.short-desc');
    if(sd.hasClass('lit') == true) {
      sd.removeClass('lit');
      $.cookie('kdlight', 'off');
    } else {
      sd.addClass('lit');
      $.cookie('kdlight', 'on');
    }
  });
  
  // check cookies
  if($.cookie('kdlight') == 'on') {
    $('.short-desc').addClass('lit');
  };
  
  
  // Animate background via main nav elements
  var y = 150;
  $('header nav li').hoverIntent(function() {
    $('body').animate({ backgroundPosition: 'left ' + y + 'px' }, 2000);
    y = y + 150;
  }, function() {
//    $('body').animate({backgroundPosition: 'left -150px'});
  })
  
  // Init Cross Slider
  var slideContainer = $('#photo-slideshow figure');
  
  function initSlider(slideContainer) {
    if(slideContainer.length > 0 && slideContainer.is(':visible')) {
      slideContainer.crossSlide({
        sleep: 5,
        fade: 0.5
      }, [
        { src: '/images/photo-sunsetla.jpg' },
        { src: '/images/photo-les.jpg' },
        { src: '/images/photo-topanga.jpg' }
      ]);
    }
  }
  initSlider(slideContainer);

  $(window).bind( 'resize', function(e){
    initSlider(slideContainer);
  });
  
  // Work the magic of contact link in navigation menu

  var navItem = $('header nav ul li');

  function showContactBubble(force) {
    if($('#contact-bubble').is(':visible') && force !== true) {
      hideContactBubble();
    } else {
      navItem.find('a').addClass('suppress');
      navItem.find('a#nav-contact').removeClass('suppress').addClass('active')
      $('#contact-bubble').fadeIn('fast');
    }
  }
  function hideContactBubble() {
    navItem.find('a').removeClass('suppress').
      end().find('a#nav-contact').removeClass('active');
    $('#contact-bubble').fadeOut('fast');
  }
  
  $('#nav-contact').click(function(e) {
    e.preventDefault();
    showContactBubble();
  });

  $('#contact-bubble .close').click(function() {
    hideContactBubble();
  });

  // scroll up and show contact bubble
  $('.show-contact-bubble').on('click', function() {
    $('body, html').animate({ scrollTop: 0 }, 200);
    showContactBubble(true);
  });

  
  // init gallery images
  var list = $('#portfolio-pieces ul');
  
  list.find('li').hide();
  list.find('li:first-child').show().css('margin-bottom','0');
  
  $('#portfolio-nav').show();

  
  //
  // image slider
  //
  
  var listNav = $('#portfolio-nav ul');
  var listTotalLength = listNav.find('ul li').length;
  var listLength = 9;
  
  listNav.find('li:first-child').addClass('active');

  var cur = 0;
  
  // when item is selected using arrows

  function flickItem(dir) {

    var cur = listNav.find('li.active').index();

    if(dir == 'left') {
      
      if(cur !== 0) {
        listNav.find('li.active').removeClass('active').prev().addClass('active');
        list.find('li:visible').fadeOut(300, function() { $(this).prev().fadeIn(150); });
        cur--;
        listNav.parent().find('.next').removeClass('disabled');
      }
      if (cur == 0) {
        listNav.parent().find('.prev').addClass('disabled');
      }
      
    } else {
      
      if(cur < listLength - 1) {
        listNav.find('li.active').removeClass('active').next().addClass('active');
        cur++;
        list.find('li:visible').fadeOut(300, function() { $(this).next().fadeIn(300); });
        listNav.parent().find('.prev').removeClass('disabled');
      }
      if (cur == listLength - 1) {
        listNav.parent().find('.next').addClass('disabled');
      }
      
    }

//    console.log(cur)

  }
  
  listNav.parent().find('.prev').addClass('disabled');
  
  // click events for gallery controls
  $('#portfolio-nav .next').click(function() { flickItem(); });
  $('#portfolio-nav .prev').click(function() { flickItem('left'); });
  
  // click on thumbnail
  listNav.find('li').click(function() {
    
    var cur = $(this).index();
    
    list.find('li:visible').fadeOut(300, function() {
      list.find('li:eq(' + cur + ')').fadeIn(150);
    });

    listNav.find('li.active').removeClass('active')
    $(this).addClass('active');

    cur = listNav.find('li.active').index();
    console.log(cur);

    listNav.parent().find('.prev').removeClass('disabled');
    listNav.parent().find('.next').removeClass('disabled');
    
    if(cur === 0) {
      console.log('a: ' + cur + '. ' + listLength);
      listNav.parent().find('.prev').addClass('disabled');
    } else if(cur === listLength - 1) {
      listNav.parent().find('.next').addClass('disabled');
    }
    
  });

  // add shortcuts
  
  shortcut.add("Ctrl+Left",function() {
  	flickItem('left');
  });
  
  shortcut.add("Ctrl+Right",function() {
  	flickItem();
  });
  
});

var mobileNavEl = $('.mobile-nav'),
    overlayEl = $('.mobile-nav-overlay');
$("#nav-toggle").on('click', function() {
  $(this).toggleClass( "active" );
  overlayEl.toggle();
  mobileNavEl.slideToggle('fast');
})
