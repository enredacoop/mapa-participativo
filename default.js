var selectedLayer;
// create layer selector
function createSelector(layers) {
  var sql = new cartodb.SQL({ user: 'enreda' });

  var $options = $('#layer_selector li');
  $options.click(function(e) {
    // get the area of the selected layer
    var $li = $(e.target);
    var layer = $li.attr('id');
    if(selectedLayer != layer ){
      // definitely more elegant ways to do this, but went for
      // ease of understanding
      if (layer == 'ind1'){
        layers.getSubLayer(0).hide(); 
        layers.getSubLayer(1).show(); 
        layers.getSubLayer(2).hide();
        layers.getSubLayer(3).hide();
        layers.getSubLayer(4).hide();
        layers.getSubLayer(5).hide();
        layers.getSubLayer(6).hide();        
      }else if (layer == 'ind2'){
        layers.getSubLayer(0).hide(); 
        layers.getSubLayer(1).hide(); 
        layers.getSubLayer(2).show();
        layers.getSubLayer(3).hide();
        layers.getSubLayer(4).hide();
        layers.getSubLayer(5).hide();
        layers.getSubLayer(6).hide(); 
      }else if (layer == 'ind3'){
        layers.getSubLayer(0).hide(); 
        layers.getSubLayer(1).hide(); 
        layers.getSubLayer(2).hide();
        layers.getSubLayer(3).show();
        layers.getSubLayer(4).hide();
        layers.getSubLayer(5).hide();
        layers.getSubLayer(6).hide(); 
      }else if (layer == 'ind4'){
        layers.getSubLayer(0).hide(); 
        layers.getSubLayer(1).hide(); 
        layers.getSubLayer(2).hide();
        layers.getSubLayer(3).hide();
        layers.getSubLayer(4).show();
        layers.getSubLayer(5).hide();
        layers.getSubLayer(6).hide(); 
      }else if (layer == 'ind5'){
        layers.getSubLayer(0).hide(); 
        layers.getSubLayer(1).hide(); 
        layers.getSubLayer(2).hide();
        layers.getSubLayer(3).hide();
        layers.getSubLayer(4).hide();
        layers.getSubLayer(5).show();
        layers.getSubLayer(6).hide(); 
      }else if (layer == 'ind6'){
        layers.getSubLayer(0).hide(); 
        layers.getSubLayer(1).hide(); 
        layers.getSubLayer(2).hide();
        layers.getSubLayer(3).hide();
        layers.getSubLayer(4).hide();
        layers.getSubLayer(5).hide();
        layers.getSubLayer(6).show(); 
      }else{
        layers.getSubLayer(0).show(); 
        layers.getSubLayer(1).hide(); 
        layers.getSubLayer(2).hide();
        layers.getSubLayer(3).hide();
        layers.getSubLayer(4).hide();
        layers.getSubLayer(5).hide();
        layers.getSubLayer(6).hide();
      }
    }
  });
}

var layerN = {};
function main() {
  var map = L.map('map', { 
    center: [ 37.3910,-5.9660],
    zoom: 12
  });
  // get the currently selected style
  selectedStyle = $('li.selected').attr('id');
  var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

  L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr}).addTo(map);

  //cartodb.createLayer(map, 'https://enreda.carto.com/api/v2/viz/1b9016e2-848f-11e6-880e-0e3ff518bd15/viz.json')
  cartodb.createLayer(map, 'https://enreda.carto.com/api/v2/viz/d85d1cac-dbce-11e6-b311-0e233c30368f/viz.json')
  .addTo(map)              
  .done(function(layers) {
    createSelector(layers);
    layers.getSubLayer(1).hide(); 
    layers.getSubLayer(2).hide();
    layers.getSubLayer(3).hide();
    layers.getSubLayer(4).hide();
    layers.getSubLayer(5).hide();
    layers.getSubLayer(6).hide();
    layers.getSubLayer(7).hide(); 
  })
  .error(function(err) {
    console.log(err);
  });
}

$( document ).ready(function() {
    $('ul li').click(function(){
      $(this).addClass('selected').siblings().removeClass('selected');
    });
});
window.onload = main;