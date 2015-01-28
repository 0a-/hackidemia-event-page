var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Event Model
 * ==========
 */

var Event = new keystone.List('Event', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true }
});

Event.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    front_description1: { type: Types.Html, height: 200 },
    front_description2: { type: Types.Html, height: 300 },
    venue: {type: String},
    facebook_url : {type: String},
    time: { type: Types.Datetime },
    image: { type: Types.CloudinaryImage }
});

Event.schema.virtual('content.full').get(function() {
    return this.content.extended || this.content.brief;
});

Event.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Event.register();
