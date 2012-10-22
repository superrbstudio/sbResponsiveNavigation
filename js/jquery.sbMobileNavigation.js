function mobileNavigation() {
  
  //Setup vairiables
  var navigation     = 'nav#main-nav';
  var topNavClass    = 'top-nav';
  var openCloseLink  = 'open-close-nav';
  var openLinkText   = 'Open Navigation';
  var closeLinkText  = 'Close Navigation';
  var currentItem    = 'current';
  var openClass      = 'open';
  var closeClass     = 'closed';
  var fadeTrans      = false;
  var dropDown       = true;
  var dropDownText   = 'Go to...'
  
  //detect the browser width
  if($(window).width() < 481 ) {
        
    //Creating a Dropdown menu?
    if(dropDown == true) {

      //hide the original menu
      $(navigation+' ul').hide();

      // Create the dropdown base
      $('<select />').appendTo(navigation);

      // Create default option "Go to..."
      $('<option />', {
          'value'   : '',
          'text'    : dropDownText
      }).appendTo(navigation+' select');

      // Populate dropdown with menu items
      $(navigation+' a').each(function() {
        var el = $(this);
        
        //if this is a top level nav item
        if($(this).parent().parent().hasClass(topNavClass)){

          if($(this).parent().hasClass(currentItem)) {

            $('<option />', {
                'selected': 'selected',
                'value'   : el.attr('href'),
                'text'    : el.text()
            }).appendTo(navigation+' select');  

          } else {     

            $('<option />', {
                'value'   : el.attr('href'),
                'text'    : el.text()
            }).appendTo(navigation+' select');

          }
          
        } else {
          //if this is not a top-level nav item, add the '-'
          if($(this).parent().hasClass(currentItem)) {

            $('<option />', {
                'selected': 'selected',
                'value'   : el.attr('href'),
                'text'    : '- ' + el.text()
            }).appendTo(navigation+' select');

          } else {  

            $('<option />', {
                'value'   : el.attr('href'),
                'text'    : '- ' + el.text()
            }).appendTo(navigation+' select');

          }

        }

      });

      //Load page link on select
      $(navigation+' select').change(function() {
        window.location = $(this).find('option:selected').val();
      });

    } else {
      //Build the Open/Close button
      var open = false;
      var buttonText;
      var openCloseButton = $('<a />').addClass(openCloseLink);

        function setText() {
          if(open == true) {
            buttonText = closeLinkText;
            $('a.'+openCloseLink).addClass(openClass).removeClass(closeClass);
          } else {
            buttonText = openLinkText;
            $('a.'+openCloseLink).addClass(closeClass).removeClass(openClass);
          }  
          openCloseButton.text(buttonText);
        }

      //Place the Open/Close button
      $(navigation).prepend(openCloseButton);

      //Hide the Navigation
      $(navigation+' ul.'+topNavClass).hide();

      //Set the text/button
      setText();

      $('.'+openCloseLink).toggle(function() {
        open = true;
        if(fadeTrans == true) {
          $(navigation+' ul.'+topNavClass).fadeIn();
        } else {
          $(navigation+' ul.'+topNavClass).slideDown();
        }
        setText();
      }, function() {
        open = false;
        if(fadeTrans == true) {
          $(navigation+' ul.'+topNavClass).fadeOut();
        } else {
          $(navigation+' ul.'+topNavClass).slideUp();
        }
        setText();
      });       

    } 

  
  }
  
}