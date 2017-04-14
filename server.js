var express = require('express');
var path = require('path');
var app = express();

const months = ["January", "February", "March", "April", "May", "June", "July", 
"August", "September", "October", "November", "December"];

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/:date', function(req, res) {
    
    // Retrieving date requested for conversion
    var givenDate = req.params.date;
    
    // Converting date from a String to a Date format
    var parsedDate = parseDate(givenDate);
    
    if (parsedDate) {
      
      var unixTime = toUnixTime(parsedDate);
      var naturalTime = toNaturalTime(parsedDate);
       
      res.send( {'unix' : unixTime, 'natural': naturalTime} );
      
    } else {
      
      res.send( {'unix' : null, 'natural': null} );
    
    }
    
    res.end();
    
});


app.listen(8080, function () {
  console.log('Timestamp service listening on port 8080!');
});

function parseDate(dateStr) {
  
  if (!isNaN(dateStr)) {
    // Handle as unix epoch time
    
    // Converting our unix timestamp from seconds to millis (millis expected)
    return new Date(parseInt(dateStr) * 1000);
    
  } else {
    // Handle natural date string
    
    // Use Javascript's Date.parse to parse date strings in a number of forms
    var millis = Date.parse(dateStr);
    
    if (isNaN(millis)) {
      // If Date.parse fails, it returns NaN
      return false;
      
    } else {
      // Otherwise, a date was successfully identified and parsed
      return new Date(millis);
      
    }
  }
  
}

// Converts a Date value to the equivalent UNIX epoch time (number).
function toUnixTime(date) {
  
  // Date.getTime() returns epoch time in millis, so we divided to get seconds.
  return (date.getTime() / 1000);
  
}

// Converts a Date value to the equivalent natural language 
function toNaturalTime(date) {
  
  return "" + date.getDate() + " " + months[date.getMonth()] + ", " 
  + date.getFullYear();
  
}