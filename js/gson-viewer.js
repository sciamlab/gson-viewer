var map;
var gson_layer;

/*var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);
var headers = req.getAllResponseHeaders().toLowerCase();
//alert(headers);
*/
function getRequestParameter(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

function onLoad(){
    map = L.map('map');
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); 
    //adding geojson
    gson_layer = L.geoJson().addTo(map);
    if(getRequestParameter("uri"))
        doAjax("GET", getRequestParameter("uri"), "", location.search.substring(1), null, true, 
                function(result){
                    try {
                        var geojson = JSON.parse(result);
                        gson_layer.addData(geojson);       
                        map.fitBounds(gson_layer.getBounds());
                    }catch(err){
                        alert(err);
                        mapReset();
                    }
                });
    else 
        mapReset();
}

function mapReset(){
    map.setView([41.9100711,12.5359979], 3);
}

function doAjax(method, host, service, query, data, asynch, callback){    
	var requestObj = false;
	if (window.XMLHttpRequest) {
	    requestObj = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
	    requestObj = new ActiveXObject("Microsoft.XMLHTTP");
	}
    if (requestObj) {
    	requestObj.onreadystatechange = function (){
            try {
                if (requestObj.readyState == 4)
                    if(requestObj.status == 200){
                        var result = requestObj.responseText;
                        if(callback) callback(result);
                    }else{
                        mapReset();
                    }
	        }catch(err){
	        	alert(err);
            }finally{
            	
            }
        };
        requestObj.open(method, host+service+'?'+query, asynch);
        requestObj.setRequestHeader("Accept", "application/json");
        requestObj.send(data);
    }
}
    
