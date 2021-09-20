setMockup()

function setMockup () {
    app.displayDialogs = DialogModes.NO;

    var doc = app.activeDocument;
    
    var folderLocale = Folder.selectDialog ( "Selecione o local para re-ajustar os arquivos.", "~" );
    var destFolder = Folder.selectDialog( 'Selecione o destino onde serao salvos os EPS.', '~' );

    var files = folderLocale.getFiles("*.TIF");
    
    for( var i = 0; i < files.length; i++ ) {
        open( files[i] )

        var docOpen = app.activeDocument;

        if ( doc.resolution > 127 ) {
            resizeFile();
        }

        var nameDocumment = getFileName();

        try {
            app.doAction("pattern","Mockups")
        } finally {
            app.doAction("mockup","Mockups")

            setFileName( nameDocumment.replace(".tif", "") );
        }

        var tiffSaveOptions = new TiffSaveOptions();

        tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW
        tiffSaveOptions.embedColorProfile = true;
        tiffSaveOptions.layers = false;
        tiffSaveOptions.transparency = false;

        var targetFile = new File( destFolder + '/' +  nameDocumment )
        
        doc.saveAs( targetFile, tiffSaveOptions, true, Extension.LOWERCASE )
    }

    alert("Finalizado!")
}


function getFileName () {
    app.displayDialogs = DialogModes.NO;

    var doc = app.activeDocument;
    var nameDocumment = doc.name

    return nameDocumment;
}

function setFileName ( value ) {
    var doc = app.activeDocument;

    doc.artLayers.getByName("texto").textItem.contents = value;
}

function resizeFile ( ) {
    var doc = app.activeDocument;
    doc.resizeImage(null, null, 127, ResampleMethod.BILINEAR)
}