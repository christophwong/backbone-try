var GroceryItem = Backbone.Model.extend({

});

var GroceryList = Backbone.Collection.extend({
  model: GroceryItem,
  url: '/groceries',
  parse: function(response){
    return response.groceries;
  }
});



var ButtonView = Backbone.View.extend({

  id:"generate-button",

  initialize: function() {
    // this.listenTo(this.model, "change", this.render);
  },

  events: {
    "click .button":   "generateList"
  },

  generateList: function(){

  },

  template: _.template("<button>Generate</button>"),
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

var MeatView = Backbone.View.extend({

  className: "meat",
  initialize: function(){
    this.listenTo(this.collection, "reset", this.render);
  },

  template: _.template("<h3>Meat:</h3><br><ul>"
    +"<% _.each(collection, function(item) { %> <li><%= item.name %></li> <% }); %>"+"</ul>"),
  render: function() {
    console.log(this.collection);
    this.$el.html(this.template({collection: this.collection.toJSON()}));
    return this;
  }
});



var PageView = Backbone.View.extend({

  el:"#container",

  initialize: function() {
    var groceryList = new GroceryList();
    this.buttonView = new ButtonView({
      collection: groceryList
    });
    this.meatView = new MeatView({
      collection: groceryList
    });
  },

  buttonView: null,
  meatView: null,

  template: _.template("<h1>Shop whatever</h1>"),
  render: function() {
    this.$el.html(this.template());
    this.$el.append(this.buttonView.render().el);
    this.$el.append(this.meatView.render().el);
    return this;
  }

});

var Workspace = Backbone.Router.extend({

  routes: {
    "home": "home"
  },

  home: function() {
    var pageView = new PageView();

    pageView.render();
    pageView.buttonView.collection.fetch({reset:true});
  }
});

var workspace = new Workspace();
Backbone.history.start();
