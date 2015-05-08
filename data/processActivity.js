var db = require("./dbManager").getDbConnection();

function ProcessActivity(){ }

ProcessActivity.prototype = {
    
    getByProcess: function (processNumber, callback){
        
        db.processActivity.find({ processNumber: processNumber }, callback);
    },
    
    getLastForProcess: function (processNumber, callback){
        
        db.processActivity.findOne({ processNumber: processNumber }, callback);
    },
    
    save: function (activities){
        
        db.processActivity.insert(activities);
    }    
};

module.exports = ProcessActivity;