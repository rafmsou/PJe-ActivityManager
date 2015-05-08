var db = require("./dbManager").getDbConnection();

function RequestLog(){ }

RequestLog.prototype = {
    
    error: function(processNumber, date, logText){
        
        db.requestLog.insert({ processNumber: processNumber, date: date, logText: logText, logType: 'error' });
    },
    info: function(processNumber, date, logText){
        
        db.requestLog.insert({ processNumber: processNumber, date: date, logText: logText, logType: 'info' });
    },
    getByProcess: function(processNumber, callback){
        
        db.requestLog.find({ processNumber: processNumber }, callback);
    }
};

module.exports = RequestLog;