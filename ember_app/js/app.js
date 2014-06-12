App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000'
});

App.Todo = DS.Model.extend({

  name: DS.attr(),
  priority: DS.attr(),

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
  this.resource("todos", function() {
    this.route("edit", {path: "/:id"});
  });
});

App.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

App.TodosIndexController = Ember.ArrayController.extend({

  actions: {
    addItem: function() {
      name = this.get("name")
      priority = this.get("priority")
      todo =  this.store.createRecord('todo', {
        name: name,
        priority: priority
      });
      todo.save();
    }
  }
});

App.TodosEditRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('todo', params.id)
  },

  serialize: function(model) {
    // this will make the URL `/posts/foo-post`
    return { id: model.get('id') };
  }
});

App.TodosEditController = Ember.ObjectController.extend({

  actions: {
    updateItem: function(router, event) {
      self = this;
      this.get("model").save().then(function() {
        self.transitionToRoute('todos');
      });
    }
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('todos');
  }
});
