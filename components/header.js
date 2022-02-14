class Header extends HTMLElement {
	constructor() {
		super()
	}

	connectedCallback() {
		this.innerHTML = `
    <style>
        @import url("../css/components/header.css");
    </style>
    <header class="custom-header _flex">
        <div class="logo">
            <img src="./assets/logo-primary.png" height="40px" class="image" />
        </div>

        <button class="nav-toggle">
            <i class="fa-solid fa-bars"></i>
        </button>

        <nav class="navbar">
            <ul data-visible="false" class="list _flex">
                <li class="item">
                    <a href="index.html" class="link"> home </a>
                </li>
                <li class="item">
                    <a href="index.html" class="link"> destinations </a>
                </li>
                <li class="item -active">
                    <a href="index.html" class="link"> special offers </a>
                </li>
                <li class="item">
                    <a href="index.html" class="link"> about us </a>
                </li>
            </ul>
        </nav>
    </header>
    `
	}
}

customElements.define('custom-header', Header)

const navBar = document.querySelector('.custom-header > .navbar > .list')
const navToggle = document.querySelector('.custom-header > .nav-toggle')

navToggle.addEventListener('click', () => {
	const visibility = navBar.getAttribute('data-visible')

	navBar.setAttribute('data-visible', visibility === 'false' ? true : false)
})