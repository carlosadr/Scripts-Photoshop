getFileName()

function getFileName () {
    app.displayDialogs = DialogModes.NO;

    var doc = app.activeDocument;
    var nameDocumment = doc.name

    setFileName( nameDocumment.replace(".tif", "") );
}

function setFileName ( value ) {
    var doc = app.activeDocument;

    doc.artLayers.getByName("texto").textItem.contents = value;
}