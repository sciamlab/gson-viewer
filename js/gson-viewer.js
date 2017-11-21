var map;
var gson_layer;

function getRequestParameter(name) {
  if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
    // console.log(name);
    return decodeURIComponent(name[1]);
  }
}

function onLoad() {
  map = L.map('map');
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  //adding geojson
  var uri = getRequestParameter("uri");
  gson_layer = L.geoJson().addTo(map);
  render(uri, location.search.substring(1));
}

function go() {
  var uri = document.getElementById("text-uri").value.split("?");
  render(uri[0], uri[1]);
}

function render(uri, params) {
  // alert(uri+" "+params);
  if (params == undefined)
    params = "";
  if (uri) {
    document.getElementById("text-uri").value = uri + "?" + params;
    $.getJSON(uri + '?' + params, function(data) {
        try {
          gson_layer.clearLayers();
          gson_layer.addData(data);
          map.fitBounds(gson_layer.getBounds());
        } catch (err) {
          alert(err);
          reset();
        }
      }
		);
  } else {
    reset();
  }
}

function reset() {
  map.setView([41.9100711, 12.5359979], 3);
}
