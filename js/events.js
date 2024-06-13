let bookingList = [] // used for filtering

window.addEventListener('load', async function () {
    const deals = await getBookingList()
    bookingList = deals

    deals.sort((a, b) => {
        return b.reviews - a.reviews
    })

    showDeals(deals)
})

document.getElementById('filter').addEventListener('change', async function () {
    const deals = await getBookingList() // Reload the booking list
    bookingList = deals

    deals.forEach(deal => {
        deal.dates = deal.dates.filter(date => {
            const formatedDate = new Date(date.start)

            return formatedDate.getMonth() === Number(this.value)
        })
    })

    showDeals(deals)
})

document.getElementById('sort').addEventListener('change', function () {
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

function getBookingList() {
    return fetch('https://mocki.io/v1/11356aa2-6371-41d4-9d49-77a5e9e9924f')
        .then(response => response.json())
        .then(data => {
            return data
        })
}

function showDeals(bookingList) {
    const bookingListElement = document.getElementById('booking-list')
    bookingListElement.innerHTML = ''

    bookingList = bookingList.filter(n => n.length > 0)

    bookingList.forEach(deal => {
        if (deal && deal.dates.length > 0) {
            const date = deal.dates[0]

            const template = `
			<div class="booking-card"> 
				<i class="fa-solid fa-heart"></i>
				${date.eur > 1500 ? '<span class="offer-percent"><strong class="text">25%</strong></span>' : ''}
				<img alt="Place" class="image" src="${deal.images[1] ? deal.images[1].url : 'https://cdn.tourradar.com/s3/tour/645x430/14263_da44e9a6.jpg'}" />
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
						"My husband and I went on this trip, and we must admit, this is one of the best vacations..."
					</p>
				</div>
				<hr class="divider">
				<div class="booking-info">
					<div class="info destinations">
						<span class="label">destinations</span>
						<span class="value">
							${deal.cities[0].name}, ${deal.cities[1].name}
							<a href="#" class="more">+${deal.cities.length - 2} more</a>
						</span>
					</div>
					<div class="info start-ends">
						<span class="label">starts / ends in</span>
						<span class="value">
							${deal.cities[0].name} / ${deal.cities[1].name}
						</span>
					</div>
					<div class="info operator">
						<span class="label">Operator</span>
						<span class="value">
							${deal.operator_name}
						</span>
					</div>
				</div>
				<div class="price-duration">
					<div class="item duration">
						<span class="label">duration</span>
						<span class="value">${deal.length} days</span>
					</div>
					<div class="item price">
						<span class="label">from</span>
						<span class="value">€${date.eur.toLocaleString()}</span>
					</div>
				</div>
				<hr class="divider">
				<div class="orders-left">
					<div class="day">
						<span class="label">${new Date(date.start).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })}</span>
						<span class="value ${date.availability < 4 ? 'danger' : ''}">${date.availability > 10 ? '10+' : date.availability} spaces left</span>
					</div>
					<div class="day">
						<span class="label">${new Date(deal.dates[1].start).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })}</span>
						<span class="value ${deal.dates[1].availability < 4 ? 'danger' : ''}">${deal.dates[1].availability > 10 ? '10+' : deal.dates[1].availability} spaces left</span>
					</div>
				</div>
				<button class="button">View tour</button>
			</div>
			`

            bookingListElement.innerHTML += template
        }
    })

}