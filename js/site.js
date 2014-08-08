jQuery(document).ready(function () {
  if (jQuery('.gallery') && typeof(jQuery().justifiedGallery) === 'function') {
  jQuery('.gallery').on('jg.rowflush', function() {
      jQuery(this).find("> a").colorbox({
	  // maxWidth : "85%",
	  // maxHeight : "85%",
	  previous: "<",
	  next: ">",
	  close: "x",
	  current : ""
      });
  }).justifiedGallery({
    //'lastRow': 'hide', 
    //'rowHeight':100, 
    'fixedHeight':false,
    'captions':true, 
    'randomize':false
  });
  }
  
  jQuery(document.links).filter(function() {
    return this.hostname != window.location.hostname;
  }).attr('target', '_blank');
  
});
