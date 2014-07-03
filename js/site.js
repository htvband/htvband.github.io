jQuery(document).ready(function () {
  jQuery('.gallery').on('jg.rowflush', function() {
      jQuery(this).find("> a").colorbox({
	  //rel: 'beeldig', 
	  maxWidth : "85%",
	  maxHeight : "85%",
	  current : ""
      });
  }).justifiedGallery({
    'lastRow': 'justify', 
    //'rowHeight':100, 
    'fixedHeight':false, 
    'captions':true, 
    'randomize':false, 
    'margins':1,
    //'rel': 'beeldig'
  });  
});
