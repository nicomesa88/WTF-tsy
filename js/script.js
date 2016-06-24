// Key: 'xzygmt6pfpvy3kj9bafyxbta'

// URL: https://openapi.etsy.com/v2/listings/active.js?

// Models

var ListModel = Backbone.Model.extend{(

)}

var DetailedModel = Backbone.Model.extend{(

)}

// Views

var ListView = Backbone.View.extend{(

)}

var DetailedView = Backbone.View.extend{(

)}

// Router


var EtsyRouter = Backbone.Router.extend {(
    routes: {


        "*default": "redirect"
    },

    initialize: function () {
        Backbone.History.start()
    }
)}

var rtr = new EtsyRouter