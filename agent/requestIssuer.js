// suit 01:              1001877-88.2014.5.02.0000
// suit 02:              1001313-03.2013.05.02.0467
// alternate domain 01:  pje.trt2.jus.br

var https = require('follow-redirects').https;
var trim = require('trim');
var RequestLog = require('../data/requestLog');
var ProcessActivity = require('../data/processActivity.js');

exports.requestProcessData = function(pNumber, callback)
{
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    
    var activities = [];
    
    https.get({ 
      hostname: 'pje.trtsp.jus.br', 
      port: 443,  
      path: '/consultaprocessual/pages/consultas/ListaProcessos.seam?numero_unic=' + pNumber },
      function (res) { 
    	  console.log(res.statusCode);
    	  var body = '';
    	  
    	  res.on("data", function(chunk) {
    	    body += chunk;
        });
      
        res.on('end', function () {
          
          var cheerio = require('cheerio');
    	    $ = cheerio.load(body.toString());
    	    
    	    var tbProcessos = $('#consultaProcessos');
    	    console.log(tbProcessos.length);
    
          var processActivity = new ProcessActivity();
          processActivity.getLastForProcess(pNumber, function(err, doc){
            
            if(err && !doc) return;

            if( tbProcessos.length > 0 )
            {
                  		    
      		     tbProcessos.find('tbody tr').each(function(i, element){
          
                 var obj = parseActivityElement(element);
                 if(!doc || obj.date > doc.date)
                    activities.push({ processNumber: pNumber, activityDate: obj.date, description: obj.description, dateIns: new Date(), seen: false });
              });
      		    
      		    //save log
      		    var requestLog = new RequestLog();
      		    var logText = 'Items Length: ' + tbProcessos.find('tr').length;
      		    requestLog.info(pNumber, new Date(), logText);
      		    
      		    //save actual activities
      		    processActivity.save(activities);
      		    
            }
            
          });
  
        });
          
    }).on('error', function(e) {
      
      console.log("Got error: " + e.message);
      var requestLog = new RequestLog();
      requestLog.error(pNumber, new Date(), e.message);
    });
};

function parseActivityElement(element){
  
  var arr = [];
  var date_index = 0, description_index = 1;
  
  var items = $(element).find('td div').text().split('\n');
  
  for(var z = 0; z < items.length; z++){
    var text = trim(items[z]);
    if(text !== '')
      arr.push(text);
  }
  
  var result =  { 
    date: parseBrazilianDate(arr[date_index]), 
    description: arr[description_index] 
  };
  
  return result;
}

function parseBrazilianDate(str){
  
  var day = parseInt(str.substring(0, 2), 10);
    var month = parseInt(str.substring(3, 5), 10);
    var year = parseInt(str.substring(6, 10), 10);

    var hour = 0, minutes = 0;

    if (str.indexOf(":") >= 0) {
        var time = str.split(" ")[1].split(":");
        hour = time[0];
        minutes = time[1];
    }

    return new Date(year, month - 1, day, hour, minutes);
}