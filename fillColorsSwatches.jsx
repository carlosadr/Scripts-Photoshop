// Script para estar cores dentro de um objeto no Illustrator.

exportPantone();

function exportPantone () {
    var doc = app.activeDocument;
    var swatches = doc.swatches;
    var destFolder = Folder.selectDialog( 'Selecione o destino onde serao salvos os EPS.', '~' );
    
    for ( var i = 0; i <= swatches.length; i++ ) {
    
        // Adiciona cores em todos os elementos "Path" 
        // ( ou elementos de caminhos tais como retangulo, elipses e etc... )
        pathRef = doc.pathItems[0];
        pathRef.filled = true;
        pathRef.fillColor = swatches[i].color;
        
        // Altera o conteudo do texto onde é solicitado.
        doc.textFrames[0].contents = swatches[i].name;
    
        var exportOptions = new ExportOptionsSVG();
        var type = ExportType.SVG;
        var targetFile = new File(destFolder + '/' +  swatches[i].name + ".svg");

        exportOptions.embedRasterImages = true;
        exportOptions.embedAllFonts = true;
        exportOptions.SVGTextOnPath = true;

        doc.exportFile( targetFile, type, exportOptions );
    }
}

function applyPantone () {
    var doc = app.activeDocument;
    var swatches = doc.swatches;
    // var destFolder = Folder.selectDialog( 'Selecione o destino onde serao salvos os EPS.', '~' );
    
    for ( var i = 0; i < swatches.length; i++ ) {
        // Adiciona cores em todos os elementos "Path" 
        // ( ou elementos de caminhos tais como retangulo, elipses e etc... )
        pathRef = doc.pathItems[i];
        pathRef.filled = true;
        pathRef.fillColor = swatches[i].color;
        
        // Altera o conteudo do texto onde é solicitado.
        doc.textFrames[i].contents = swatches[i].name;
    
        // targetFile = new File(destFolder + '/' +  swatches[i].name + '.eps');
        // epsSaveOpts = new EPSSaveOptions();
        // doc.saveAs( targetFile, epsSaveOpts );
    }
}