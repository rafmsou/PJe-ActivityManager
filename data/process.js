var db = require("./dbManager").getDbConnection();

function Process(number, activity_list){
        
    this.number = number;
    this.activity_list = activity_list;
}

Process.prototype = {
    
  //callback: func(data, err)
  getAll: function(callback){
      
      db.Process.find(callback);
  }  
  
};

module.exports = Process;