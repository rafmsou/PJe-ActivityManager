var db = null;

exports.getDbConnection = function(){
    
    if(db == null){
        
        var mongojs = require("mongojs");
        db = mongojs('127.0.0.1:8000/temp', ['process', 'requestLog', 'processActivity']);
        
        db.on('error',function(err) {
            console.log('database error', err);
        });
        
        db.on('ready',function() {
            console.log('database connected.');
        });
    }
    
    return db;
}
