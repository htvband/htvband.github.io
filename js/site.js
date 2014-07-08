jQuery(document).ready(function () {
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
    'lastRow': 'justify', 
    //'rowHeight':100, 
    'fixedHeight':false,
    'captions':true, 
    'randomize':false, 
    'margins':1
    //'rel': 'beeldig'
  });  
});
