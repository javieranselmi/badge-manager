var config = {
	templates: [{
		name: "ribbon",
		html: '<div class="ribbon" style="background-color:${background_color};display:inline">${text}</div>'
	}],
	badges: [{
		name: '5%_red_ribbon',
		template: 'ribbon',	
		variables: {
			text: '5%',
			background_color: 'red'
		}
	},
	{
		name: '10%_yellow_ribbon',
		template: 'ribbon',	
		variables: {
			text: '10%',
			background_color: 'green'
		}
	}]
}