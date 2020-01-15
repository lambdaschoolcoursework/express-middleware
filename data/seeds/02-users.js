exports.seed = function(knex, Promise) {
	return knex('users').insert([
		{
			name: 'Frodo Baggins'
		},
		{
			name: 'Samwise Gamgee'
		},
		{
			name: 'Meriadoc Brandybuck'
		},
		{
			name: 'Peregrin Took'
		},
		{
			name: 'Mithrandir'
		},
		{
			name: 'Boromir'
		},
		{
			name: 'Legolas'
		},
		{
			name: 'Gimli'
		},
		{
			name: 'Aragorn'
		},
	]);
};
