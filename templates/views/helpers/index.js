var moment = require('moment');
var _ = require('underscore');
var hbs = require('handlebars');
var keystone = require('keystone');
var cloudinary = require('cloudinary');


// Declare Constants
var CLOUDINARY_HOST = 'http://res.cloudinary.com';

// Collection of templates to interpolate
var linkTemplate = _.template('<a href="<%= url %>"><%= text %></a>');
var scriptTemplate = _.template('<script src="<%= src %>"></script>');
var cssLinkTemplate = _.template('<link href="<%= href %>" rel="stylesheet">');
var cloudinaryUrlLimit = _.template(CLOUDINARY_HOST + '/<%= cloudinaryUser %>/image/upload/c_limit,f_auto,h_<%= height %>,w_<%= width %>/<%= publicId %>.jpg');


module.exports = function() {
	
	var _helpers = {};
	
	/**
	 * Generic HBS Helpers
	 * ===================
	 */
	
	// standard hbs equality check, pass in two values from template
	// {{#ifeq keyToCheck data.myKey}} [requires an else blockin template regardless]
	_helpers.ifeq = function(a, b, options) {
		if (a == b) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	};
	
	/**
	 * Port of Ghost helpers to support cross-theming
	 * ==============================================
	 * 
	 * Also used in the default keystonejs-hbs theme
	 */
	
	// ### Date Helper
	// A port of the Ghost Date formatter similar to the keystonejs - jade interface
	//
	//
	// *Usage example:*
	// `{{date format='MM YYYY}}`
	// `{{date publishedDate format='MM YYYY'`
	//
	// Returns a string formatted date
	// By default if no date passed into helper than then a current-timestamp is used
	//
	// Options is the formatting and context check this.publishedDate
	// If it exists then it is formated, otherwise current timestamp returned
	
	_helpers.date = function(context, options) {
		if (!options && context.hasOwnProperty('hash')) {
			options = context;
			context = undefined;
			
			if (this.publishedDate) {
				context = this.publishedDate;
			}
		}
		
		// ensure that context is undefined, not null, as that can cause errors
		context = context === null ? undefined : context;
		
		var f = options.hash.format || 'MMM Do, YYYY',
			timeago = options.hash.timeago,
			date;
		
		// if context is undefined and given to moment then current timestamp is given
		// nice if you just want the current year to define in a tmpl
		if (timeago) {
			date = moment(context).fromNow();
		} else {
			date = moment(context).format(f);
		}
		return date;
	};

	
	/* To Implement [Ghost Helpers](http://docs.ghost.org/themes/#helpers)
	 * The [source](https://github.com/TryGhost/Ghost/blob/master/core/server/helpers/index.js)
	 *
	 * * `Foreach` Extended Helper
	 * * `Asset` Helper
	 * * `Content` Helper
	 * * `Excerpt` Helper
	 * * `Has` Helper
	 * * `Encode` Helper
	 * * Pagination
	 * * BodyClass
	 * * PostClass
	 * * meta_title
	 * * meta_description
	 * * ghost_[footer/header]
	 *
	 */
	
	/**
	 * KeystoneJS specific helpers
	 * ===========================
	 */
	
	// block rendering for keystone admin css
	_helpers.isAdminEditorCSS = function(user, options) {
		var output = '';
		if (typeof(user) !== 'undefined' && user.isAdmin) {
			output = cssLinkTemplate({
				href: "/keystone/styles/content/editor.min.css"
			});
		}
		return new hbs.SafeString(output);
	};
	
	// block rendering for keystone admin js
	_helpers.isAdminEditorJS = function(user, options) {
		var output = '';
		if (typeof(user) !== 'undefined' && user.isAdmin) {
			output = scriptTemplate({
				src: '/keystone/js/content/editor.js'
			});
		}
		return new hbs.SafeString(output);
	};
	
	// Used to generate the link for the admin edit post button
	_helpers.adminEditableUrl = function(user, options) {
		var rtn = keystone.app.locals.editable(user, {
			'list': 'Post',
			'id': options
		});
		return rtn;
	};

	

	//helper for index.hbs
	_helpers.make = function(n, block) {
	    var accum = '';
	    for(var i = 1; !(i > n); ++i)
	        accum += block.fn(i);
	    return accum;
	};
	_helpers.equal = function(lvalue, rvalue, options) {
	    if (arguments.length !== 3)
	        throw new Error("oh no we need 3 values :(");
	    if( lvalue!=rvalue ) {
	        return options.inverse(this);
	    } else {
	        return options.fn(this);
	    }
	};
    

    _helpers.getDate = function(time){
        if(time!==undefined){
            return moment(time).format('DD');
        }else{
            return "TO";
        }

    };
    _helpers.getMonth = function(time){
        if(time!==undefined){
            return moment(time).format('MMM');
        }else{
            return "be determined";
        }
    };
    _helpers.getTime = function(time){
        if(time!==undefined){
            return moment(time).format('h:mm a');
        }else{
            return "TBD";
        }
    }
    _helpers.getEnv = function(string){
        return process.env[string]
    }

    _helpers.getSection = function(array,name){
        var a =0;
        while(a<array.length){
            if(array[a].title == name){
                return array[a].words;
            }
            a++;
        }
        return "";
    }
	
	// ### CloudinaryUrl Helper
	// Direct support of the cloudinary.url method from Handlebars (see
	// cloudinary package documentation for more details).
	//
	// *Usage examples:*
	// `{{{cloudinaryUrl image width=640 height=480 crop='fill' gravity='north'}}}`
	// `{{#each images}} {{cloudinaryUrl width=640 height=480}} {{/each}}`
	//
	// Returns an src-string for a cloudinary image
	
	_helpers.cloudinaryUrl = function(context, options, default_string) {

		// if we dont pass in a context and just kwargs
		// then `this` refers to our default scope block and kwargs
		// are stored in context.hash
		if (!options && context.hasOwnProperty('hash')) {
			// strategy is to place context kwargs into options
			options = context;
			// bind our default inherited scope into context
			context = this;
		}
		
		// safe guard to ensure context is never null
		context = context === null ? undefined : context;
		
		if ((context) && (context.public_id)) {
			var imageName = context.public_id.concat('.',context.format);
			return cloudinary.url(imageName, options.hash);
		}
		else {
			return default_string
		}		
	};
	
	// ### Content Url Helpers
	// KeystoneJS url handling so that the routes are in one place for easier
	// editing.  Should look at Django/Ghost which has an object layer to access
	// the routes by keynames to reduce the maintenance of changing urls
	
	// Direct url link to a specific post
	_helpers.postUrl = function(postSlug, options) {
		return ('/blog/post/' + postSlug);
	};
	
	// might be a ghost helper
	// used for pagination urls on blog
	_helpers.pageUrl = function(pageNumber, options) {
		return '/blog?page=' + pageNumber;
	};
	
	// ### Pagination Helpers
	// These are helpers used in rendering a pagination system for content
	// Mostly generalized and with a small adjust to `_helper.pageUrl` could be universal for content types
	
	/*
	* expecting the data.posts context or an object literal that has `previous` and `next` properties
	* ifBlock helpers in hbs - http://stackoverflow.com/questions/8554517/handlerbars-js-using-an-helper-function-in-a-if-statement
	* */
	_helpers.ifHasPagination = function(postContext, options){
		// if implementor fails to scope properly or has an empty data set
		// better to display else block than throw an exception for undefined
		if(_.isUndefined(postContext)){
			return options.inverse(this);
		}
		if(postContext.next || postContext.previous){
			return options.fn(this);
		}
		return options.inverse(this);
	};
	
	_helpers.paginationNavigation = function(pages, currentPage, totalPages, options){
		var html = '';
		
		// pages should be an array ex.  [1,2,3,4,5,6,7,8,9,10, '....']
		// '...' will be added by keystone if the pages exceed 10
		_.each(pages, function(page, ctr){
			// create ref to page, so that '...' is displayed as text even though int value is required
			var pageText = page,
			// create boolean flag state if currentPage
			isActivePage = ((page === currentPage)? true:false),
			// need an active class indicator
			liClass = ((isActivePage)? ' class="active"':'');

			// if '...' is sent from keystone then we need to override the url
			if(page === '...'){
				// check position of '...' if 0 then return page 1, otherwise use totalPages
				page = ((ctr)? totalPages:1);
			}

			// get the pageUrl using the integer value
			var pageUrl = _helpers.pageUrl(page);
			// wrapup the html
			html += '<li'+liClass+'>'+ linkTemplate({url:pageUrl,text:pageText})+'</li>\n';
		});
		return html;
	};

        // special helper to ensure that we always have a valid page url set even if
        // the link is disabled, will default to page 1
        _helpers.paginationPreviousUrl = function(previousPage, totalPages){
            if(previousPage === false){
                previousPage = 1;
            }
            return _helpers.pageUrl(previousPage);
        };

        // special helper to ensure that we always have a valid next page url set
        // even if the link is disabled, will default to totalPages
        _helpers.paginationNextUrl = function(nextPage, totalPages){
            if(nextPage === false){
                nextPage = totalPages;
            }
            return _helpers.pageUrl(nextPage);
        };


	//  ### Flash Message Helper
	//  KeystoneJS supports a message interface for information/errors to be passed from server
	//  to the front-end client and rendered in a html-block.  FlashMessage mirrors the Jade-Mixing
	//  for creating the message.  But Part of the logic is in the default.layout.  Decision was to
	//  surface more of the interface in the client html rather than abstracting behind a helper.
	//
	//  @messages:[]
	//
	//  *Usage example:*
	//  `{{#if messages.warning}}
	//      <div class="alert alert-warning">
	//          {{{flashMessages messages.warning}}}
	//      </div>
	//   {{/if}}`
	
	_helpers.flashMessages = function(messages) {
		var output = '';
		for (var i = 0; i < messages.length; i++) {
			
			if (messages[i].title) {
				output += '<h4>' + messages[i].title + '</h4>';
			}
			
			if (messages[i].detail) {
				output += '<p>' + messages[i].detail + '</p>';
			}
			
			if (messages[i].list) {
				output += '<ul>';
				for (var ctr = 0; ctr < messages[i].list.length; ctr++) {
					output += '<li>' + messages[i].list[ctr] + '</li>';
				}
				output += '</ul>';
			}
		}
		return new hbs.SafeString(output);
	};
	
	return _helpers;
};
