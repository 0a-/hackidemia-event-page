var keystone = require('keystone'),
    Types = keystone.Field.Types;


var Section = new keystone.List('Section');

Section.add({
    title: { type: String, required: true,  initial: true},
    words: { type: Types.Html, height: 200 },
});

Section.defaultColumns = 'title, words';
Section.register();

