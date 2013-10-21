// Person Model
var Person = Backbone.Model.extend({
	defaults: {
		name: 'John Doe',
		age: 30,
		occupation: 'worker'
	}
});

// A List of People
var PeopleCollection = Backbone.Collection.extend({
	model: Person
});

// The View for a Person
var PersonView = Backbone.View.extend({
	tagName: 'li',

	template: _.template( $('#personTemplate').html() ),

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
	}
});

var peopleCollection = new PeopleCollection([
	{
		name: 'Jeffrey Way',
		age: 27
	},
	{
		name: 'John Doe',
		age: 50,
		occupation: 'web designer'
	},
	{
		name: 'Sally Doe',
		age: 29,
		occupation: 'graphic designer'
	}
]);

console.log(peopleCollection);

