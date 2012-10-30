// TODO: Parallax for Pre index.html
// --------------------------------------

// Calcualte the home banner parallax scrolling
  function scrollBanner() {
    //Get the scoll position of the page
    scrollPos = jQuery(this).scrollTop();

    //Scroll and fade out the banner text
    jQuery('.hero-title').css({
      'margin-top' : -(scrollPos/3)+"px",
      'opacity' : 1-(scrollPos/300)
    });

    //Scroll the background of the banner
    jQuery('#homeBanner').css({
      'background-position' : 'center ' + (-scrollPos/8)+"px"
    });
  }


// Initialize
// --------------------------------------

jQuery.noConflict();
jQuery(document).ready(function(){
	jQuery(".hero-title").fitText(1.7, { minFontSize: '45px', maxFontSize: '180px' });
});
