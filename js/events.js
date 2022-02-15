var bookingList = [] // used for filtering

/**
 * Load the booking list and sort it by popularity
 */
window.addEventListener('load', async function() {
	const deals = await getBookingList()
	bookingList = deals

	deals.sort((a, b) => {
		return b.reviews - a.reviews
	})
	
	showDeals(deals)
})

/**
 * Filter the booking list by the selected month
 */
document.getElementById('filter').addEventListener('change', async function() {
	const deals = await getBookingList() // Reload the booking list

	deals.forEach(deal => {
		deal.dates = deal.dates.filter(date => {
			const formatedDate = new Date(date.start)

			return formatedDate.getMonth() === Number(this.value)
		})
	})

	showDeals(deals)
})

/**
 * Sort the booking list by the selected option
 */
document.getElementById('sort').addEventListener('change', function() {
	if (this.value === 'popularity') {
		bookingList.sort((a, b) => {
			return b.reviews - a.reviews
		})
	}

	if (this.value === 'highest') {
		bookingList.forEach(deal => {
			deal.dates.sort((a, b) => {
				if (a && b) {
					return b.eur - a.eur
				}
			})
		})

		bookingList.sort((a, b) => {
			if (a.dates[0] && b.dates[0]) {
				return b.dates[0].eur - a.dates[0].eur
			}
		})
	}

	if (this.value === 'lowest') {
		bookingList.forEach(deal => {
			deal.dates.sort((a, b) => {
				if (a && b) {
					return a.eur - b.eur
				}
			})
		})

		bookingList.sort((a, b) => {
			if (a.dates[0] && b.dates[0]) {
				return a.dates[0].eur - b.dates[0].eur
			}
		})
	}

	if (this.value === 'longest') {
		bookingList.sort((a, b) => {
			return b.length - a.length
		})
	}

	if (this.value === 'shortest') {
		bookingList.sort((a, b) => {
			return a.length - b.length
		})
	}

	showDeals(bookingList)
})

/**
 * Fetch the booking list
 * 
 * @returns {Promise<Array>}
 */
function getBookingList() {
	return fetch('https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f'	)
		.then(response => response.json())
		.then(data => {
			return data
		})
}

/**
 *  Load the booking list
 * 
 * @param {*} bookingList
 */
function showDeals(bookingList) {
	const bookingListElement = document.getElementById('booking-list')
	bookingListElement.innerHTML = ''

	bookingList = bookingList.filter(n => n.length > 0)
	console.log(bookingList)

	bookingList.forEach(deal => {
		if (deal && deal.dates.length > 0) {
			const date = deal.dates[0]
		
			const template = `
			<div class="booking-card">
				<img class="image" src="https://cdn.tourradar.com/s3/tour/645x430/43444_d8912a9b.jpg" />
				<div class="rating-stars">
					<h4 class="title">${deal.name}</h4>
					<div class="stars">
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star"></i>
						<i class="fa-solid fa-star-half-stroke"></i>
					</div>
					<span class="reviews">
						${deal.reviews || '0'} reviews
					</span>
					<p class="message">
						"My husband and i went on this trip and we must admit, this is one of the best vacations..."
					</p>
				</div>
				<hr class="divider">
				<div class="booking-info">
					<div class="info destinations">
						<span class="label">destinations</span>
						<span class="value">Sofia, Plovdiv, Bachkovo</span>
					</div>
					<div class="info start-ends">
						<span class="label">starts / ends in</span>
						<span class="value">Sofia / Sofia</span>
					</div>
					<div class="info operator">
						<span class="label">Operator</span>
						<span class="value">Bamba Experience</span>
					</div>
				</div>
				<div class="price-duration">
					<div class="item duration">
						<span class="label">duration</span>
						<span class="value">${deal.length} days</span>
					</div>
					<div class="item price">
						<span class="label">from</span>
						<span class="value">€${date.eur}</span>
					</div>
				</div>
				<hr class="divider">
				<div class="orders-left">
					<div class="day">
						<span class="label">28 APR 2019</span>
						<span class="value">10 spaces left</span>
					</div>
					<div class="day">
						<span class="label">28 APR 2019</span>
						<span class="value">10 spaces left</span>
					</div>
				</div>
				<button class="button">View tour</button>
			</div>
			`
			
			bookingListElement.innerHTML += template
		}
	})

}