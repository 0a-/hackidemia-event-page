var keystone = require('keystone');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
        locals = res.locals;
    
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'init';

    locals.data = {
        events: []
    };
    
    view.on('init', function(next) {
        
        keystone.list("Event").model.find()
        .where('state', 'published')
        .sort('-time')
        .limit(3)
        .exec(function(err, data) {
           locals.data.events = data;
           next(err);
        });
        
    });
    
    // Render the view
    view.render('init');
    
};
