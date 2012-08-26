// 
//  --- our app behavior logic ---
//
run(function () {
    // immediately invoked on first run
alert("step 0");    
   if (navigator.network.connection.type == Connection.NONE) {
        alert("No internet connection - we won't be able to show you any maps or stocks");
    } else {
        alert("We can reach the Interwebz - get ready for some awesome maps and real-time goodness!");
    }
   
alert("step 0b");
/*    
    var lsClient = new LightstreamerClient("http://push.lightstreamer.com","DEMO");
alert("step 0c");
    lsClient.addListener({
      onStatusChange: function(newStatus) {
        x$("#connection_status").html(newStatus);
      }
    });
alert("step 1");
    lsClient.connect();
alert("step 2");
    var grid = new DynaGrid("stocks",true);
    grid.setSort("stock_name");
    grid.addListener({
      onVisualUpdate: function(key,info) {
        if (info == null) {
          return; //cleaning
        }
        info.setHotTime(500);
        info.setHotToColdTime(300);
        info.setAttribute("#F7941E", "transparent", "backgroundColor");
        info.setAttribute("white", "black", "color");
      }
    });
alert("step 3");    
    var sub = new Subscription("MERGE",["item3","item4","item5","item6","item7"],grid.extractFieldList()); 
    sub.addListener(grid);
    sub.setDataAdapter("QUOTE_ADAPTER");
    sub.setRequestedSnapshot("yes");

    lsClient.subscribe(sub);
    
alert("step 4");    
*/
    // a little inline controller
    when('welcome');
    when('sld');
    when('settings', function() {
      // load settings from store and make sure we persist radio buttons.
      store.get('config', function(saved) {
        if (saved) {
          if (saved.map) {
            x$('input[value=' + saved.map + ']').attr('checked',true);
          }
          if (saved.zoom) {
            x$('input[name=zoom][value="' + saved.zoom + '"]').attr('checked',true);
          }
        }
      });
    });
    when('map', function () {
        store.get('config', function (saved) {
            // construct a gmap str
            var map  = saved ? saved.map || ui('map') : ui('map')
            ,   zoom = saved ? saved.zoom || ui('zoom') : ui('zoom')
            ,   path = "http://maps.google.com/maps/api/staticmap?center=";
      
            navigator.geolocation.getCurrentPosition(function (position) {
                var location = "" + position.coords.latitude + "," + position.coords.longitude;
                path += location + "&zoom=" + zoom;
                path += "&size=250x250&maptype=" + map + "&markers=color:red|label:P|";
                path += location + "&sensor=false";

                x$('img#static_map').attr('src', path);
            }, function () {
                x$('img#static_map').attr('src', "assets/img/gpsfailed.png");
            });
        });
    });
    when('save', function () {
        store.save({
            key:'config',
            map:ui('map'),
            zoom:ui('zoom')
        });
        display('#welcome');
    });

alert("step 5");
});