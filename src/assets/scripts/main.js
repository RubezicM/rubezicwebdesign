import $ from "jquery";
import magnificPopup from "magnific-popup";
import "../vendors/scripts/jquery.validate.min";


const menuItems = document.querySelectorAll('.navigation__item');
const logo = document.querySelector('.logo');
let link;

logo.addEventListener('click',(e)=>{
    document.querySelector('.panel__page.activePage').classList.remove('activePage');
    document.querySelector(`#homePanel`).classList.add('activePage');
    document.querySelector('.navigation__item.current').classList.remove('current');
    document.querySelector('#home').classList.add('current');
});
menuItems.forEach((link)=>{
    link.addEventListener('click',(e)=>{
       document.querySelector('.navigation__item.current').classList.remove('current');
       link.classList.add('current');
       let page = link.id + 'Panel';
        document.querySelector('.panel__page.activePage').classList.remove('activePage');
        document.querySelector(`#${page}`).classList.add('activePage');
    });
});

  $('.image-popup-vertical-fit').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-with-zoom',
    image: {
      verticalFit: true
    },
      zoom: {
          enabled: true,
          duration: 400
    }
  });


$(document).ready(function() {
  $(".navigation__item").click(function() {
    let panelId = $(this).attr("id") + "Panel";
    let linkId = $(this).attr("id");
    $('.navigation__item').removeClass('current');
    $('#' + linkId).stop(true, true).addClass('current');
    $('.tab-panel').removeClass('noscroll');
    $('.page').removeClass('display');
    $('#darkness').removeClass('display');
    $("#" + panelId).stop(true, true).addClass("display");
    window.scrollTo(0,0);
  });



  $(".logo__holder").click(function(){
      $('.page').removeClass('display');
      $('#homePanel').addClass("display");
    });


  // animate menu style on mobile devices
  $(".spinner-master").on("click", function(event) {
    event.stopPropagation();
      $('.spinner-master').toggleClass("active");
      if($('.spinner-master').hasClass('active')){
          $('.navigation').slideDown(()=>{
              $('.logo').addClass("extend");
          }).delay(350).promise().done(()=>{
              $('#navigation-list').addClass('flex');
          });
      } else {
          console.log('sad skidamo')
          $('.navigation').slideUp(()=>{
              $('.logo').removeClass("extend");
          }).promise().done(()=>{
              $('#navigation-list').removeClass('flex');
          })
      }

    $('.tab-panel').toggleClass('noscroll');
  });

  // removing the clases when clicked outside
  $('body').click(function() {
      if($('.spinner-master').hasClass('active')) {
          $('.navigation').slideUp(()=>{
              $('.logo').removeClass("extend");
          });
          $('.navigation-list').removeClass('flex');
          $('.spinner-master').removeClass('active');

      }
  });

  checkWidth();
  // Event listener for width
  $(window).resize(checkWidth);

});

// checking the width for animating the hover thingy
function checkWidth() {
    let $windowSize = $(window).width();
    let $nav = $('.navigation__item');
    if ($windowSize < 1200 && $windowSize > 768) {
        $nav.removeClass('hvr-sweep-to-left');
        $nav.addClass('hvr-sweep-to-bottom');
    } else {
        $nav.removeClass('hvr-sweep-to-bottom');
        $nav.addClass('hvr-sweep-to-left');
    }
}

$('.contact-popup').off('click').on('click',buildPopup);

function buildPopup(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    buildDarkness();
    link = !link ? e.target : link;
    let type = link.classList[1];
    let str = type;
        switch (type) {
            case 'download':
                str = 'You are about to download PDF file containing my CV information.';
                break;

            case 'email':
                str = 'You are about to open the external program for sending emails';
                break;
            default :
                str = 'You are about to open this link'
        }
    $('body').prepend(`<div class="popup"><p>${str}</p>` +
        '<div><button class="popup__button popup__button--confirm" value="confirm">I agree</button>' +
        '<button class="popup__button popup__button--cancel" value="cancel">Cancel</button></div></div>')
        .fadeIn('fast');
    $(this).prop('disabled');
    console.log(link);
}


function buildDarkness(){
    $('body').addClass('darkness');
}

$('body').on('click','.popup__button',function(e){
            $('.contact-popup').off('click',buildPopup);
            let action = $(this).val();
            $('body').removeClass('darkness');
            $('.popup').fadeOut('fast',function(){
                $('.popup').remove();
            });
            if(action === 'confirm'){
                link.click();
                $('.contact-popup').on('click',buildPopup);
            } else {
                $('.popup').fadeOut('fast');
                $('.contact-popup').on('click',buildPopup);
            }
            // reset link

                    link = '';
});


$('#contact-form').validate({
  submitHandler: function(form) {

    // Uzimanje podataka iz forme
    let data = $(form).serialize();

    // Uzimanje vrednosti iz action atributa
    let action = $(form).prop('action');
    // Onemogućavanje svih polja
    $('input, textarea, button').prop('disabled', true);
    // Promena natpisa na dugmetu
    $(form).find('button').text('Sending');

    $('.form-holder').append('<div class="loader loading"><div class="loader__spinning"></div></div>');
    // Slanje podataka iz forme putem AJAX metode
    $.post(
      action,
      data,
      function(response) {
        if (response == 1) {
            setTimeout(function(){
                $('.loader').removeClass("loading").addClass("success").delay(600).fadeOut(300, ()=>{
                $(form).slideUp(800,()=>{
                    $('.alert-success').slideDown();
                });
            });}, 3500);

            //
          // Prikaži da je poruka uspešno poslata

        } else if (response != '') {
          // Ako poruka nije prosleđena - pokazaće se greška
          alert(response);
        } else {
          alert('Serverska validacija nije prošla');
        }
      }
    );
  }
});
function alertt(){
    alert('starting');
}

// QUOTE GENERATOR
/*
var quotes = ["hello","test","test2"];

var quoteGen = function () {
    var counter = Math.floor(Math.random() * (quotes.length));
    document.getElementById('quoteBox').innerHTML = quotes[counter];
};

$("#getQuote").click(quoteGen);
*/
// WELCOME TEXT

// var counter = 0;
// var msgs = ["Por favor espera..","Molim sačekajte..","Welcome!"];
// document.getElementById('welcome').innerHTML = "Please wait..";
// var changeText = function (){
//     document.getElementById('welcome').innerHTML = msgs[counter];
//     counter++;
//
//     if (counter >= msgs.length){
//         counter = 0;
//     }
// };
//
//
// setInterval('changeText()', 2500);
//
//
//
// setTimeout(function () {
//     $('.second').show().addClass('animated fadeInUp');}, 1500
// );