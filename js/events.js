const apiUrl = 'https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f'
var deals = []

window.addEventListener('load', async function() {
	fetch(apiUrl)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			deals = data
		})
})

document.getElementById('filter').addEventListener('change', function() {
	console.log(deals)
})
