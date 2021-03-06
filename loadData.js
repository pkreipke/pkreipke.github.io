
function mapGeoJSONPoints(datasetValue, map, onCompleteFunction)
{
  $.getJSON(datasetValue.file, function(data) {
      var myStyle = {
      };
      if ('undefined' != typeof(datasetValue.color)) {
        myStyle.color = datasetValue.color
      }

      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.name);
        },
        style : myStyle
      });

      geojson.addTo(map);

      onCompleteFunction(datasetValue, data)

    }).error(function(jqXhr, textStatus, error) {
      alert("ERROR: " + textStatus + ", " + error);
  });
}

function mapGeoJSONShapes(datasetValue, map, onCompleteFunction)
{
  $.getJSON(datasetValue.file, function(data) {
      var myStyle = {
          "weight" : 1,
          "opacity" : 0.5
      };
      if ('undefined' != typeof(datasetValue.color)) {
        myStyle.color = datasetValue.color
      }
      if ('undefined' != typeof(datasetValue.fillColor)) {
        myStyle.fillColor = datasetValue.fillColor
      }

      var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          // layer.bindPopup(feature.properties.name);
        },
        style : myStyle
      });

      geojson.addTo(map);

      onCompleteFunction(datasetValue, data)

    }).error(function(jqXhr, textStatus, error) {
      alert("ERROR: " + textStatus + ", " + error);
  });
}

// TODO: FIX THIS 
var totalFiles = 0
var doOnAllFinished = null

function doOnComplete(dataset, geojson) {
  dataset.data = geojson

  // Check remaining files
  totalFiles--
  // TODO: loop through files looking for 'data' property

  // Fire final onFinished()
  if (0 == totalFiles)
    doOnAllFinished()
}

function loadAllDataFiles(datasetArray, map, onAllFinished) {

  totalFiles = Object.keys(datasetArray).length
  doOnAllFinished = onAllFinished

  $.each(datasetArray, function(key, value){
    console.log(key + ': ' + value)
    if (value.type === 'pointfile') {
      mapGeoJSONPoints(value, map, doOnComplete)
    }
    else if (value.type === 'shapefile') {
      mapGeoJSONShapes(value, map, doOnComplete)
    }
    
  })
}
