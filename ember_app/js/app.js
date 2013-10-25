App = Ember.Application.create();

App.Ticket = Ember.Object.extend({
  name: null,
  priority: null,

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
    this.route("edit", {path: "/:ticket_slug"});
  });
});

App.TicketsRoute = Ember.Route.extend({
  model: function() {
    return [];
  }
});

App.TicketsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('tickets');
  }
});


App.TicketsIndexController = Ember.ArrayController.extend({

  actions: {
    addItem: function() {
      name = this.get("name")
      priority = this.get("priority")
      ticket = App.Ticket.create({
        name: name,
        priority: priority
      })
      this.pushObject(ticket);
    }
  }
});

App.TicketsEditRoute = Ember.Route.extend({
  model: function(params) {
    this.modelFor('Tickets').find('slug', params.ticket_slug)
  },

  serialize: function(model) {
    // this will make the URL `/posts/foo-post`
    return { ticket_slug: model.get('slug') };
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('tickets');
  }
});
