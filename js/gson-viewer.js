var map;
var gson_layer;

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
    var uri = getRequestParameter("uri");
    gson_layer = L.geoJson().addTo(map);
    render(uri, location.search.substring(1).replace("uri="+uri, ""));
}

function go(){
    var uri = document.getElementById("text-uri").value.split("?");
    render(uri[0], uri[1]);
}

function render(uri, params){
    //alert(uri+" "+params);
    if(uri){
        document.getElementById("text-uri").value = uri + "?" + params;
        doAjax("GET", uri, "", params, null, true, 
            function(result){
                try {
                    var geojson = JSON.parse(result);
                    gson_layer.clearLayers();
                    gson_layer.addData(geojson);       
                    map.fitBounds(gson_layer.getBounds());
                }catch(err){
                    alert(err);
                    reset();
                }
            });
    }else{
        reset();
    }
}

function reset(){    
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
                        reset();
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
    
