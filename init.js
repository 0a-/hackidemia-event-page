// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone'),
    handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
    'host': '0.0.0.0',
    'name': 'HacKIDemiaEventPage',
    'brand': 'HacKIDemia',
    'less': 'public',
    'static': 'public',
    'favicon': 'public/favicon.ico',
    'views': 'templates/views',
    'view engine': 'hbs',
    'custom engine': handlebars.create({
        layoutsDir: 'templates/views/layouts',
        partialsDir: 'templates/views/partials',
        defaultLayout: 'default',
        helpers: new require('./templates/views/helpers')(),
        extname: '.hbs'
    }).engine,
    'auto update': true,
    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': '(9&%;!KH7*@R7yO5LqG2/gW1LkGv/o~UJadkpZPU<i+PG-Mb$(|hwKimF"=!7PE9'

});

keystone.import('models');

keystone.set('locals', {
    _: require('underscore'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable
});

if(process.env.inited){
var User = keystone.list('User');
User.model.findOne({},function(err,user){

    if(!user){ 
    require("./data_seeding.js")();
    require("./default_data_seeding.js")();

    }
 
});
}

keystone.set('routes', require('./routes'));
keystone.start();
