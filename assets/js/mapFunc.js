var map;
var bounds;

function initMap() {
  $("#the-map").parent().removeClass("hidden");
  map = new google.maps.Map(document.getElementById('the-map'),
  {
    zoom: 4,
    center: new google.maps.LatLng(0.0, 0.0)
  });

  bounds = new google.maps.LatLngBounds();
}

function addMarker(breweryObject)
{
  if(breweryObject.latitude != undefined && breweryObject.longitude != undefined)
  {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(breweryObject.latitude, breweryObject.longitude),
      name: breweryObject.name,
      streetAddress: breweryObject.streetAddress,
      city: breweryObject.locality,
      state: breweryObject.region,
      zipCode: breweryObject.postalCode,
      map: map
    });
    bounds.extend(marker.position);
    
  }
}