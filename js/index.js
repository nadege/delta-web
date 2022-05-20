var PCTsampleKmlFileURL_part1 = "https://storage.googleapis.com/delta-map-data/PCT/halfmile-track-2015-11.kmz";
var PCTsampleKmlFileURL_part2 = "https://storage.googleapis.com/delta-map-data/PCT/halfmile-track-2015-2.kmz"; 
var shikokuKmlFileURL = "https://storage.googleapis.com/delta-map-data/Shikoku%20main%20track.kmz";
var initializedMaps = [];
var PCTmap;
var PCTActualTrace = [];
var ChinaActualTrace = [];

PCTActualTrace.push("https://storage.googleapis.com/delta-map-data/PCT/First_Part.kml"); // 13 avril - 4 mai AM.
PCTActualTrace.push("https://storage.googleapis.com/delta-map-data/PCT/Second_part_04-05_PM.kml"); // 4 mai PM - 5 juin AM
PCTActualTrace.push("https://storage.googleapis.com/delta-map-data/PCT/ThirdPart_05-06.kml"); // 5 juin PM - 5 juillet
PCTActualTrace.push("https://storage.googleapis.com/delta-map-data/PCT/Fourth_part_05-07.kml"); // 5 juillet - 5 aout
PCTActualTrace.push("https://storage.googleapis.com/delta-map-data/PCT/Fifth_part_05-08.kml"); // 5 aout - 5 septembre
PCTActualTrace.push("https://storage.googleapis.com/delta-map-data/PCT/Sixth_part_05-09.kml"); // 5 septembre - ...

ChinaActualTrace.push("https://storage.googleapis.com/delta-map-data/China_spot_messages.kml"); // Septembre 2018

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
  console.log(myLayer)


  if (kmlFileUrl2)
  {
    var myLayer2 = new google.maps.KmlLayer({
      url: kmlFileUrl2,
      map : myMap,
      zIndex: 1
    });
    console.log(myLayer2)

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
  console.log(layer)

}
