resizeFiles()

function resizeFiles () {
    app.displayDialogs = DialogModes.NO;
    
    var folder = Folder.selectDialog ( "Selecione o local para re-ajustar os arquivos.", "~" );
    var listFolders = folder.getFiles();
    
    for( var i = 0; i < listFolders.length; i++ ) {
        if( listFolders[i] instanceof Folder ) {
            var destFolder = Folder(listFolders[i])
            listFiles = destFolder.getFiles("*.TIF");

            for( var j = 0; j < listFiles.length; j++ ){
                try {
                    open( listFiles[j] )
                    var doc = app.activeDocument;
    
                    doc.resizeImage(null, null, 127, ResampleMethod.BILINEAR)
    
                    doc.close(SaveOptions.SAVECHANGES);
                } catch ( response ) {
                    alert( response + "\n Ultima pasta executada foi: " + listFolders[i] )
                }
            }
        }
    }
    
    var listFiles = folder.getFiles("*.TIF");

    for( var i = 0; i < listFolders.length; i++ ) {
        try {
            open( listFiles[i] )
            var doc = app.activeDocument;
    
            doc.resizeImage(null, null, 127, ResampleMethod.BILINEAR)
    
            doc.close(SaveOptions.SAVECHANGES);
        } catch ( response ) {
            alert( response + "\n \n Ultima pasta executada foi: " + listFolders[i] )
        }
    }

    alert("Redimencionamento finalizado!")
}

function resizeSubFiles () {

    app.displayDialogs = DialogModes.NO;
    
    var folder = Folder.selectDialog ( "Selecione o local para re-ajustar os arquivos.", "~" );
    var listFolders = folder.getFiles();

    for( var i = 0; i < listFolders.length; i++ ) {
        // alert("Variavel 'I': " + i + ", Pasta ou Arquivo: " + listFolders[i]) //Cliente

        if( listFolders[i] instanceof Folder ) {

            var subFolders = Folder(listFolders[i])
            var listSubFolders = subFolders.getFiles()

            for ( var j = 0; j < listSubFolders.length; j++ ){
                if( listSubFolders[j] instanceof Folder ) {
                    // alert("Variavel 'J': " + j + ", Pasta ou Arquivo: " + listSubFolders[j]) // Subpastas e arquivos
                    var subSubFolders = Folder(listSubFolders[j])
                    var listSubSubFiles = subSubFolders.getFiles()
        
                    for( var k = 0; k < listSubSubFiles.length; k++ ) {
                        if ( listSubSubFiles[k] instanceof Folder ) {
                            // alert("Variavel 'K': " + k + ", Pasta ou Arquivo: " + listSubSubFiles[k])

                            var subSubSubFolders = Folder(listSubSubFiles[k])
                            var listSubSubSubFiles = subSubSubFolders.getFiles("*.TIF")
                            
                            for (var x = 0; x < listSubSubSubFiles.length; x++) {
                                try {
                                    open( listSubSubSubFiles[x] )
                
                                    var doc = app.activeDocument;
                
                                    doc.resizeImage(null, null, 127, ResampleMethod.BILINEAR)
                
                                    doc.close(SaveOptions.SAVECHANGES);
                
                                } catch ( response ) {
                                    alert( "Erro 1: " + response + "\n \n Ultima pasta executada foi: " + listSubSubSubFiles[x] )
                                }
                            }
                        }
                        
                        listSubSubFiles = subSubFolders.getFiles("*.TIF");

                        try {
                            open( listSubSubFiles[k] )
        
                            var doc = app.activeDocument;
        
                            doc.resizeImage(null, null, 127, ResampleMethod.BILINEAR)
        
                            doc.close(SaveOptions.SAVECHANGES);
        
                        } catch ( response ) {
                            alert( "Erro 2: " + response + "\n \n Ultima pasta executada foi: " + listSubSubFiles[k] )
                        }

                        listSubSubFiles = subSubFolders.getFiles();
                    }
                }
            }
        }
    }
}