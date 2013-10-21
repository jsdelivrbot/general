class Person extends Backbone.Model
	defaults:
		name: 'John Doe'
		occupation: 'worker'


class PersonView extends Backbone.View
	initialize: ->
		@model.on 'yoyoyo', @sayHi

	sayHi: =>
		console.log this

person = new Person
personView = new PersonView model: person

person.trigger 'yoyoyo'