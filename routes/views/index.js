var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		events: []
	};
	
	view.on('init', function(next) {
		var counter = 0;

		keystone.list("Event").model.find()
	    .sort('-time')
	    .limit(3)
	    .exec(function(err, data) {
         locals.data.events = data;
         counter++;
         if(counter===2){
	       next(err);
         }
	    });

    	keystone.list("Person").model.find()
	    .sort('-time')
	    .exec(function(err, data) {
           console.log(data);
	       locals.data.people = data;
	       counter++;
           if(counter===2){
	         next(err);
           }
	    });

		
	});
	
	// Render the view
	view.render('index');
	
};
