var PCTsampleKmlFileURL_part1 = "https://drive.google.com/uc?export=download&id=0B9IhMY-mND_fMUtoYmlhNDlQRkU";
var PCTsampleKmlFileURL_part2 = "https://drive.google.com/uc?export=download&id=0B9IhMY-mND_faW5tUVpMQ3NnaVE";  //"https://drive.google.com/uc?export=download&id=0B9IhMY-mND_fZlEtN3pHVGVhRlE";
var shikokuKmlFileURL = "https://drive.google.com/uc?export=download&id=0B9IhMY-mND_fT3V2VFFZR0dyaEk";
var initializedMaps = [];
var PCTmap;
var PCTActualTrace = [];
var ChinaActualTrace = [];

PCTActualTrace.push("https://drive.google.com/uc?export=download&id=0B9IhMY-mND_faTRuMjRWNkswVGs"); // 13 avril - 4 mai AM.
PCTActualTrace.push("https://drive.google.com/uc?export=download&id=0B9IhMY-mND_fN1U3SWhzYkFBbDg"); // 4 mai PM - 5 juin AM
PCTActualTrace.push("https://drive.google.com/uc?export=download&id=0B9IhMY-mND_fSEs4blNGM1lkcHc"); // 5 juin PM - 5 juillet
PCTActualTrace.push("https://drive.google.com/uc?export=download&id=0B9IhMY-mND_fTjBFOHNOdXhYaFk"); // 5 juillet - 5 aout
PCTActualTrace.push("https://drive.google.com/uc?export=download&id=0B9IhMY-mND_fVVQtazVuMXZ1dEk"); // 5 aout - 5 septembre
PCTActualTrace.push("https://drive.google.com/uc?export=download&id=0B9IhMY-mND_fajNyRjNCQkR1Wnc"); // 5 septembre - ...

ChinaActualTrace.push("https://drive.google.com/uc?export=download&id=1wb5UYf15pxT6DipbSlZ0714QHOzLSknc"); // Septembre 2018

$( document ).ready(function() {

    $('.panel-collapse').on('shown.bs.collapse', function () {
        $(this).parent().find(".fa-chevron-right").removeClass("fa-chevron-right").addClass("fa-chevron-down");

        // Initialize map of the opened panel.
        switch (this.id)
        {
          case "shikoku-collapse":
            initKmlMap("shikokuMap", shikokuKmlFileURL);
          break;
        }
    });

    $('.panel-collapse').on('hidden.bs.collapse', function () {
       $(this).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-right");
    });
});

// Init these maps as the panel for the PCT and China are opened from start
function initStartMap()
{
  PCTmap = initKmlMap("PCTMap", PCTsampleKmlFileURL_part1, PCTsampleKmlFileURL_part2);

  for (i = 0; i < PCTActualTrace.length; i++) {
      addLayerToMap(PCTmap, PCTActualTrace[i], true, i+1);
  }

  Chinamap = initKmlMap("ChinaMap", ChinaActualTrace[0]);

  for (i = 1; i < ChinaActualTrace.length; i++) {
      addLayerToMap(Chinamap, ChinaActualTrace[i], true, i+1);
  }
}

/**
  Initialize a map with one or two layers from kml files.
  Each map can only be initialized one time to avoid numerous calls to google maps API for nothing.
**/
function initKmlMap(mapID, kmlFileUrl, kmlFileUrl2) {

  if (initializedMaps.indexOf(mapID) !== -1){
    return;
  }

  initializedMaps.push(mapID);

  var myMap = new google.maps.Map(document.getElementById(mapID), {
    zoom: 11,
    center: {lat: 41.876, lng: -87.624}
  });

  var myLayer = new google.maps.KmlLayer({
    url: kmlFileUrl,
    suppressInfoWindows: true,
    map : myMap,
    zIndex: 0
  });

  if (kmlFileUrl2)
  {
    var myLayer2 = new google.maps.KmlLayer({
      url: kmlFileUrl2,
      map : myMap,
      zIndex: 1
    });

    /*myLayer2.addListener('status_changed', function() {
        alert(myLayer2.getStatus());
    });*/

  }

  return myMap;
}

function addLayerToMap(map, kmlFileUrl, infoWindow, zIndex){

  var layer = new google.maps.KmlLayer({
    url: kmlFileUrl,
    suppressInfoWindows: !infoWindow,
    map : map,
    zIndex: zIndex
  });

  /*layer.addListener('status_changed', function() {
      alert(layer.getStatus());
  });*/

}
