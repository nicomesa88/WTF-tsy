// Key: 'xzygmt6pfpvy3kj9bafyxbta'

// URL: https://openapi.etsy.com/v2/listings/active.js?


// Global Variables


var apiKey = 'xzygmt6pfpvy3kj9bafyxbta'


// Models

var ListModel = Backbone.Model.extend({
    _apiKey: apiKey,
    url: 'https://openapi.etsy.com/v2/listings/active.js?'

})

var DetailedModel = Backbone.Model.extend({
    _apiKey: apiKey,
    url: 'https://openapi.etsy.com/v2/listings/'
})

// Views

var ListView = Backbone.View.extend({
    el: "#container",

     initialize: function(someModel) {
         this.model = someModel
         var boundRenderFunction = this._render.bind(this)
         this.model.on("sync", boundRenderFunction)
     },

     events: {
         "click img": "_triggerDetailView",
     },

     _triggerDetailView: function(clickEvent) {

         var imgNode = clickEvent.target
         window.location.hash = "details/" + imgNode.getAttribute("listingId")
     },

     _render: function() {
         var resultsArray = this.model.get("results")
         var htmlString = ""
         for (var i = 0; i < resultsArray.length; i++) {
             var listingObj = resultsArray[i]
             var listingId = listingObj.listing_id
             var title = listingObj.title
             var seller = listingObj.Shop.shop_name
             var price = listingObj.price
             var imageArray = listingObj.Images
             if (imageArray.length > 0) {
                 var imageURL = imageArray[0].url_170x135
             } else {
                 var imageURL = images/placeholder.png
             }
             htmlString += '<div class="listing">'
             htmlString += '<div class="home-image">' + '<img listingId="' + listingId + '" src="' + imageURL + '">' + '</div>'
             htmlString += '<div class="title-data">' + '<p class="title">' + title + '</p>' + '</div>'
             htmlString += '<div class="seller-data">' + '<p class="seller">' + seller + '</p>'
             htmlString += '<p class="price">' + "$" + price + '</p>' + '</div>'
             htmlString += '</div>'
         }
         this.el.innerHTML = htmlString
     }
 })

var DetailedView = Backbone.View.extend({
     el: "#container",

     initialize: function(someModel) {
         this.model = someModel
         var boundRenderFunc = this._render.bind(this)
         this.model.on("sync", boundRenderFunc)
     },

     _render: function() {
         var resultsObj = this.model.get("results")
         var htmlString = ""
         var listingObj = resultsObj[0]
         var listingId = listingObj.listing_id
         var title = listingObj.title
         var seller = listingObj.Shop.shop_name
         var description = listingObj.description
         var price = listingObj.price
         var imageArray = listingObj.Images
            if (imageArray.length > 0) {
                var imageURL = imageArray[0].url_570xN
            }
            else {

             var imageURL = images/placeholder.png

            }

         htmlString += '<div class="detail-listing">'
         htmlString += '<div class="detail-title-data">' + '<p class="detail-title">' + title + '</p>' + '</div>'
         htmlString += '<div class="detail-image">' + '<img listingId="' + listingId + '" src="' + imageURL + '">' + '</div>'
         htmlString += '<div class="detail-description-data">' + '<p class="detail-description">' + description + '</p>' + '</div>'

         htmlString += '<div class="detail-seller-data">' + '<p class="detail-seller">' + seller + '</p>'
         htmlString += '<p class="detail-price">' + "$" + price + '</p>' + '</div>'
         htmlString += '</div>'
         this.el.innerHTML = htmlString
     }
})

var SearchView = Backbone.View.extend({
     el: "#header",

     initialize: function(someModel) {
         this.model = someModel
         var boundRenderFunc = this._render.bind(this)
         this.model.on("sync", boundRenderFunc)
     },

     events: {
         "keydown input": "_searchByKeyword"
     },

     _searchByKeyword: function(keyEvent) {
         var searchTerm = keyEvent.target.value
         console.log(keyEvent.target)
         if (keyEvent.keyCode === 13) {
             location.hash = "search/" + searchTerm
         }
     },

     _render: function() {
var htmlString = '<a href="#home" id="etsy-logo"><p id="logo" src="images/etsy-logo.jpg">' + 'WTF-STY' + '</p></a>'
         htmlString +='<input class="search-el" placeholder="Search for items or shops">'
         htmlString += '<header id="header">' + '<ul>' +
             '<a href="#search/human teeth"><li class="tab">Human Teeth</li></a>' +
             '<a href="#search/human hair"><li class="tab">Human Hair</li></a>' +
             '<a href="#search/dick socks"><li class="tab"> Dick Socks</li></a>' +
             '<a href="#search/bones"><li class="tab">Bones</li></a>' +
             '<a href="#search/bronies"><li class="tab">Bronies</li></a>' +
             '<a href="#taxadermy/"><li class="tab">Taxadermy</li></a>' +
             '<a href="#search/kids baby"><li class="tab">Kids & Baby</li></a>' +
             '<a href="#search/Mouth gag"><li class="tab">Mouth Gag</li></a>' + '</ul>' + '</header>'
         this.el.innerHTML = htmlString
     }
 })

// Router


var EtsyRouter = Backbone.Router.extend ({
    routes: {
        "home/:wtf" : "listViewHandler",
        "details/:id": "detailedViewHandler",
        "search/:keywords": "searchViewHandler",
        "*default" : "listViewHandler"
    },

    homeHandler: function() {
        var listModel = new ListModel()
         var listView = new ListView(listModel)
         var searchView = new SearchView(listModel)
         var promise = listModel.fetch({
                 dataType: "jsonp",
                 data: {
                     includes: "Images,Shop",
                     api_key: listModel._apiKey
                 }
             })

         promise.then(listView._render.bind(listView))
     },

    listViewHandler: function() {
         var listModel = new ListModel()
         var listView = new ListView(listModel)
         var searchView = new SearchView(listModel)
         var promise = listModel.fetch({
                 dataType: "jsonp",
                 data: {
                    keywords: "weird",
                     includes: "Images,Shop",
                     api_key: listModel._apiKey
                 }
             })

         promise.then(listView._render.bind(listView))
     },

     detailedViewHandler: function(listingId) {
         var detailModel = new DetailedModel()
         var detailView = new DetailedView(detailModel)
         detailModel.url += listingId + ".js"
         console.log(detailModel.url)
         var promise = detailModel.fetch({
             dataType: "jsonp",
             data: {
                 includes: "Images,Shop",
                 api_key: detailModel._apiKey
             }
         })
         promise.then(detailView._render.bind(detailView))
     },

     searchViewHandler: function(keywords) {
         var searchModel = new ListModel()
         var listView = new ListView(searchModel)
         var searchView = new SearchView(searchModel)
         var promise = searchModel.fetch({
             dataType: "jsonp",
             data: {
                 keywords: keywords,
                 includes: "Images,Shop",
                 api_key: searchModel._apiKey
             }
         })

         promise.then(searchView._render.bind(searchView))
     },

    initialize: function () {
        Backbone.history.start()
    }
})

var rtr = new EtsyRouter