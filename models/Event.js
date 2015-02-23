var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Event Model
 * ==========
 */

var Event = new keystone.List('Event');

Event.add({
    title: { type: String, required: true, initial: true },
    front_description1: { type: Types.Html, height: 200 },
    front_description2: { type: Types.Html, height: 300 },
    venue: {type: String},
    facebook_url : {type: String},
    time: { type: Types.Datetime }
});


Event.defaultColumns = 'title, author|20%, publishedDate|20%';
Event.register();
