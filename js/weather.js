// simple weather
$.simpleWeather({
  location: 'Cleveland, OH',
  woeid: '',
  unit: 'f',
  success: function(weather) {
    // set the icon based on current conditions
    var theIcon;
    switch(weather.currently) {
      case 'Cloudy/Windy':
      case 'Mostly Cloudy':
      case 'Cloudy':
        theIcon = 'ion-ios-cloudy'
        break;
      case 'Sunny':
      case 'Fair':
        theIcon = 'ion-ios-sunny'
        break;
      case 'Partly Cloudy':
        theIcon = 'ion-ios-partlysunny'
        break;
      case 'Rainy':
      case 'Light Rain':
        theIcon = 'ion-ios-rainy'
        break;
      case 'Snowy':
      case 'Light Snow':
        theIcon = 'ion-ios-snowy'
      default:
        break;
    }

    loc = '<h4>'+weather.city+', '+weather.region+'</h4>';
    icon = '<i class="'+theIcon+'"></i>';
    html = '<p>'+weather.temp+'&deg;'+weather.units.temp+'</p>';

    $('#location').html(loc)
    $('#weatherIcon').html(icon);
    $('#weather').html(html);
  },
  error: function(error) {
    $('#weather').html('<p>'+error+'</p>');
  }
});
