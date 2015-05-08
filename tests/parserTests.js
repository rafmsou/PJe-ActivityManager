var fs = require('fs'), trim = require('trim'), filename = '/home/rafael/Apps/node-sample/tests/processo-sample.htm';
var ProcessActivity = require('../data/processActivity.js');

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;

  var cheerio = require('cheerio');
  $ = cheerio.load(data);

  var tbProcessos = $('#consultaProcessos');
  console.log(tbProcessos.length);

  if( tbProcessos.length > 0 )
  {
      tbProcessos.find('tbody tr').each(function(i, element){

        var items = $(element).find('td div').text().split('\n');
        var arr = [];

        for(var z = 0; z < items.length; z++){
          var text = trim(items[z]);
          if(text !== '')
            arr.push(text);
        }

        var x = { processNumber: '12345-678-90', date: parseBrazilianDate(arr[0]), description: arr[1] };

        var processActivity = new ProcessActivity();
        processActivity.save([x]);
      });
  }
});

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
