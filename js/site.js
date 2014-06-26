jQuery(document).ready(function () {
      jQuery("#nanoGallery").nanoGallery({
	theme: 'light',
	thumbnailHoverEffect : 'labelAppear75,borderDarker',
	/// example
        thumbnailHeight: 'auto',
        thumbnailWidth: 'auto',
	colorScheme: 'none',
	galleryToolbarHideIcons: false,
	//items: mediaItems,
        //itemsBaseURL: 'http://htvband.dev:1337/pictures/',
        thumbnailLabel: {
            display: true,
            position: 'overImageOnMiddle',
	    hideIcons: true
        },
      i18n:{
        'breadcrumbHome':'Lijst van albums',
        'paginationPrevious':'Vorige',
        'paginationNext':'Volgende',
        'thumbnailLabelItemsCountPart1':'| ',
        'thumbnailLabelItemsCountPart2':" foto's",
        'thumbnailImageTitle':'',
        'thumbnailAlbumTitle':'',
        'thumbnailImageDescription':'',
        'thumbnailAlbumDescription':'',
        'infoBoxPhoto':'Foto',
        'infoBoxDate':'Datum',
        'infoBoxAlbum':'Album',
        'infoBoxDimensions':'Dimensies',
        'infoBoxFilename':'Bestandsnaam',
        'infoBoxFileSize':'Bestandsgrootte',
        'infoBoxCamera':'Camera',
        'infoBoxFocalLength':'Focal length',
        'infoBoxExposure':'Exposure',
        'infoBoxFNumber':'F Number',
        'infoBoxISO':'ISO',
        'infoBoxMake':'Merk/model',
        'infoBoxFlash':'Flash',
        'infoBoxViews':'Views',
        'infoBoxComments':'Commentaren'
      }	
      });
});