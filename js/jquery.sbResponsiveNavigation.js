/**
 * sbResponsiveNavigation
 * 
 * This Plugin is designed to make mobile (and smaller screen) 
 * browsing easier and less intrusive to valuable screen real estate.
 * 
 * Written by Superrb Ltd http://www.superrb.com
 * 
 * For full instructions please go to:
 * http://www.superrb.com/open-source
 * 
 * This software is released under an MIT licence, for more details:
 * http://www.superrb.com/open-source/mit-licence
 */

(function($){
 
    $.fn.extend({ 
         
        //pass the options variable to the function
        sbResponsiveNav: function(options) {
 
 
          //Set the default values, use comma to separate the settings, example:
          var defaults = {
            navigation     : this,
            topNavClass    : 'top-nav',
            openCloseLink  : 'open-close-nav',
            openLinkText   : 'Open Navigation',
            closeLinkText  : 'Close Navigation',
            currentItem    : 'current',
            openClass      : 'open',
            closeClass     : 'closed',
            fadeTrans      : false,
            dropDown       : false,
            dropDownText   : 'Go to...'
          }
                 
          var options =  $.extend(defaults, options);

          return this.each(function() {
            var o = options;           
            
            //detect the browser width
            if($(window).width() < 481 ) {

              //Creating a Dropdown menu?
              if(o.dropDown == true) {

                //hide the original menu
                $(o.navigation).find('ul').hide();

                // Create the dropdown base
                $('<select />').attr('id', 'drop-down-nav').appendTo(o.navigation);

                // Create default option "Go to..."
                $('<option />', {
                    'value'   : '',
                    'text'    : o.dropDownText
                }).appendTo('select#drop-down-nav');

                // Populate dropdown with menu items
                $(o.navigation).find('a').each(function() {
                  var el = $(this);

                  //if this is a top level nav item
                  if($(this).parent().parent().hasClass(o.topNavClass)){

                    if($(this).parent().hasClass(o.currentItem)) {

                      $('<option />', {
                          'selected': 'selected',
                          'value'   : el.attr('href'),
                          'text'    : el.text()
                      }).appendTo('select#drop-down-nav');  

                    } else {     

                      $('<option />', {
                          'value'   : el.attr('href'),
                          'text'    : el.text()
                      }).appendTo('select#drop-down-nav');

                    }

                  } else {
                    //if this is not a top-level nav item, add the '-'
                    if($(this).parent().hasClass(o.currentItem)) {

                      $('<option />', {
                          'selected': 'selected',
                          'value'   : el.attr('href'),
                          'text'    : '- ' + el.text()
                      }).appendTo('select#drop-down-nav');

                    } else {  

                      $('<option />', {
                          'value'   : el.attr('href'),
                          'text'    : '- ' + el.text()
                      }).appendTo('select#drop-down-nav');

                    }

                  }

                });

                //Load page link on select
                $(o.navigation).find('select').change(function() {
                  window.location = $(this).find('option:selected').val();
                });

              } else {
                //Build the Open/Close button
                var open = false;
                var buttonText;
                var openCloseButton = $('<a />').addClass(o.openCloseLink);

                  function setText() {
                    if(open == true) {
                      buttonText = o.closeLinkText;
                      $('a.'+o.openCloseLink).addClass(o.openClass).removeClass(o.closeClass);
                    } else {
                      buttonText = o.openLinkText;
                      $('a.'+o.openCloseLink).addClass(o.closeClass).removeClass(o.openClass);
                    }  
                    openCloseButton.text(buttonText);
                  }

                //Place the Open/Close button
                $(o.navigation).prepend(openCloseButton);

                //Hide the Navigation
                $(o.navigation).find('ul.'+o.topNavClass).hide();

                //Set the text/button
                setText();

                $('.'+o.openCloseLink).toggle(function() {
                  open = true;
                  if(o.fadeTrans == true) {
                    $(o.navigation).find('ul.'+o.topNavClass).fadeIn();
                  } else {
                    $(o.navigation).find('ul.'+o.topNavClass).slideDown();
                  }
                  setText();
                }, function() {
                  open = false;
                  if(o.fadeTrans == true) {
                    $(o.navigation).find('ul.'+o.topNavClass).fadeOut();
                  } else {
                    $(o.navigation).find('ul.'+o.topNavClass).slideUp();
                  }
                  setText();
                });       

              } 


            }

          });
        
        }
    });
     
})(jQuery);
