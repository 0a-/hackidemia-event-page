if(process.env.CLOUDINARY_URL){

    var keystone = require('keystone'),
        Types = keystone.Field.Types;

    var Person = new keystone.List('Person');

    Person.add({
        name: { type: String, required: true, index: true },
        twitter: {type: String, required: false},
        facebook: {type: String, required: false},
        gplus: {type: String, required: false},
        github: {type: String, required: false},
        website: {type: String, required: false},
        linkin: {type: String, required: false},
        image: { type: Types.CloudinaryImage, required: false },
        webimage: {type: String, required: false}
    });

    Person.defaultColumns = 'name';
    Person.register();

}
