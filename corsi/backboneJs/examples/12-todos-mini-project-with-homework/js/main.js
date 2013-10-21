(function() {

window.App = {
	Models: {},
	Collections: {},
	Views: {}
};

window.template = function(id) {
	return _.template( $('#' + id).html() );
};

App.Models.Task = Backbone.Model.extend({
	validate: function(attrs) {
		if ( ! $.trim(attrs.title) ) {
			return 'A task requires a valid title.';
		}
	}
});

App.Collections.Tasks = Backbone.Collection.extend({
	model: App.Models.Task

	// Homework #1
	// What if you wanted to sort the tasks, according to
	// priority - from most to least (1-5 scale).
	// Use Backbone's comparator method to add this functionality
	// http://backbonejs.org/#Collection-comparator
});

App.Views.Tasks = Backbone.View.extend({
	tagName: 'ul',

	initialize: function() {
		this.collection.on('add', this.addOne, this);
	},

	render: function() {
		this.collection.each(this.addOne, this);

		return this;
	},

	addOne: function(task) {
		var taskView = new App.Views.Task({ model: task });

		this.$el.append(taskView.render().el);
	}
});

App.Views.Task = Backbone.View.extend({
	tagName: 'li',

	template: template('taskTemplate'),

	initialize: function() {
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},

	events: {
		'click .edit': 'editTask',
		'click .delete': 'destroy'
	},

	editTask: function() {
		var newTaskTitle = prompt('What would you like to change the text to?', this.model.get('title'));

		if ( !newTaskTitle ) return;
		this.model.set('title', newTaskTitle);
	},

	destroy: function() {
		this.model.destroy();
	},

	remove: function() {
		this.$el.remove();
	},

	render: function() {
		var template = this.template( this.model.toJSON() );

		this.$el.html(template);

		return this;
	}
});


App.Views.AddTask = Backbone.View.extend({
	el: '#addTask',

	events: {
		'submit': 'submit'
	},

	submit: function(e) {
		e.preventDefault();

		var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();

		// Homework #2
		// Below, we've separated this process into two steps.
		// Remember, though, that a collection can also accept a simple
		// object, because we've already defined what type of Model
		// to associated it with. Combine the two lines below into one.

		var task = new App.Models.Task({ title: newTaskTitle });
		this.collection.add(task);

		// Homework #3
		// What if, instead of creating the model as we did above,
		// you abstracted this functionality away to its own method?
		// How would you do that?
	}
});


var tasksCollection = new App.Collections.Tasks([
	{
		title: 'Go to the store',
		priority: 4
	},
	{
		title: 'Go to the mall',
		priority: 3
	},
	{
		title: 'Get to work',
		priority: 5
	}
]);

// Homework #4
// It's too bad that we have to inject the collection into the AddTask type.
// Can you find a way to remove this need?
var addTaskView = new App.Views.AddTask({ collection: tasksCollection });

var tasksView = new App.Views.Tasks({ collection: tasksCollection });
$('.tasks').html(tasksView.render().el);

})();