//type writing heading
var TxtType = function(el, toRotate, period){
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if(this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else{
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if(this.isDeleting) { delta /= 2; }

  if(!this.isDeleting && this.txt === fullTxt){
  delta = this.period;
  this.isDeleting = true;
  }else if(this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  //INJECT CSS
  var css = document.createElement("styles");
  css.type = "text/css";
  document.body.appendChild(css);
};

  
//counter

(function($) {
  "use strict";
  function count($this){
    var current = parseInt($this.html(), 10);
    current = current + 1;
    $this.html(++current);
    if(current > $this.data('count')){
      $this.html($this.data('count'));
    } else{
      setTimeout(function() {count($this)}, 50);
    }
  }
  $(".stat-count").each(function() {
    $(this).data('count', parseInt($(this).html(), 10));
    $(this).html('0');
    count($(this));
  });
})(jQuery);


// smooth scroll
  
/*smooth scrolling*/

$(document).ready(function(){
  $('.menu a').click(function() {
    if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target
      || $('[name=' + this.hash.slice(1) + ']');
      if($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body')
        .animate({scrollTop: targetOffset}, 1000);
       return false;
      }
    }
  });
});

//progress bar js

$(document).ready(function ($) {
  function animateElements() {
    $('.progressbar').each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find('.circle').attr('data-percent');
      var animate = $(this).data('animate');
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data('animate', true);
        $(this).find('.circle').circleProgress({
          value: percent / 100,
          size : 200,
          thickness: 15,
          fill: {
            color: '#f47a14'
          }
        }).on('circle-animation-progress', function (event, progress, stepValue) {
          $(this).find('strong').text((stepValue*100).toFixed(0) + "%");
        }).stop();
      }
    });
  }

  animateElements();
  $(window).scroll(animateElements);
});
