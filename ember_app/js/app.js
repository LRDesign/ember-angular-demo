App = Ember.Application.create();

App.TicketController = Ember.ObjectController.extend({

  slug: function() {
    return this.get('name')
    .toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'');
  }.property('name'),

  abbreviation: function () {
    shortName = this.get('name');
    return shortName.slice(0,3);
  }.property('name')

});

App.Router.map(function() {
  // put your routes here
  this.resource("tickets", function() {
    //this.route("edit", {path: "/:ticket_slug"});
  });
});

App.TicketsRoute = Ember.Route.extend({
  model: function() {
    return EmberFire.Array.create({
      ref: new Firebase("https://ember-angular-demo.firebaseio.com/tickets")
    });
  }
});

App.TicketsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('tickets');
  }
});


App.TicketsIndexController = Ember.ArrayController.extend({

  itemController: 'ticket',

  actions: {
    addItem: function() {
      name = this.get("name")
      priority = this.get("priority")
      slug = name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
      ticket = {
        name: name,
        priority: priority,
        slug: slug
      }
      this.pushObject(ticket);
    }
  }
});

App.TicketsEditRoute = Ember.Route.extend({
  /*model: function(params) {
    return this.modelFor('tickets').find('slug', params.ticket_slug)
  },

  serialize: function(model) {
    // this will make the URL `/posts/foo-post`
    return { ticket_slug: model.slug };
  }*/
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('tickets');
  }
});
