var Person = Backbone.Model.extend({
	defaults: {
		name: 'John Doe',
		age: 30,
		occupation: 'worker'
	},
	work: function() {
		return this.get('name') + ' is working.';
	}
});

