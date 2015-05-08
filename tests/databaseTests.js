var RequestLog = require('../data/requestLog');

var rl = new RequestLog();

rl.getByProcess(2546547879211, function(err, data){
    
    if(err && err != null) return;
    
    var obj = data[0];
    
    // var tz = require("timezone");
    // var br = tz(require("timezone/Brazil"));
    // var f = br(obj.date, "%d/%m/%Y %H:%M:%S", "Brazil/East");
    
    var tz = require("timezone");
    var f = tz(obj.date, "%d/%m/%Y %H:%M:%S", "Brazil/East", require("timezone/Brazil"));

    console.log(f);
});