exports.index = function(req, res){
  res.render('index', { currentTime: new Date() });
};