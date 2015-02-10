var keystone = require('keystone');

exports = module.exports = function(req, res) {
    var q = req.query;
    if (q.inited === "true") {
        if (!process.env.inited) {
            var fs = require('fs');
            //create .env
            var string = "inited = true \n" + q.cloud_url + "\n";
            string += "region =\"" + q.region + "\"\n facebook=\"" + q.fbPage + "\"\n subdomain=\"" + q.subDomain + "\"\n contactEmail=\"" + q.contact + "\"";
            fs.writeFile('.env', string, function(err) {
                if (err) return console.log(err);
                console.log(string + " > .env");
            });
            //create data seed for admin
            var dbseed = " var keystone = require('keystone'), User = keystone.list('User');";
            dbseed += "var admin = { email: " + q.admin_email + ", password: " + q.admin_pass + ", name:{ first: " + q.admin_name + "}};";
            dbseed += "var a = new User.model(admin); a.isAdmin = true; a.save(function(err){";
            dbseed += "if (err){ return console.log(err) }else{ console.log('admin added'); }});";
            fs.writeFile('data_seeding', dbseed, function(err) {
                if (err) return console.log(err);
                console.log("created db seed for admin");
            });
        }

    } else {

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
    }
};
