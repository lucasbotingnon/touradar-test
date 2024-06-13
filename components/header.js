class Header extends HTMLElement {
    constructor() {
        super()

        this.innerHTML = `
    <style>
        @import url("../css/components/header.css");
    </style>
    <header class="custom-header _flex">
        <div class="logo">
            <svg class="image" xmlns="http://www.w3.org/2000/svg" width="177" height="29.5" viewBox="-2.4 199.9 201 33.5" fill="#409CD1"><title>tourradar.com</title><path d="M24 206.3c-7.6 0-11.2 3-11.2 7.7v11.5c0 4.7 3.6 7.8 11.3 7.8 7.8 0 11.4-3 11.4-7.8V214c0-4.7-3.6-7.7-11.3-7.7zm4.6 18.6c0 2-1.5 2.8-4.5 2.8-2.8 0-4.4-1-4.4-3v-10.2c0-2 1.5-2.8 4.5-2.8s4.6 1 4.6 2.8V225zm146.7-15v-3.3h-6.8v26h7V216c1-1 3.6-2.8 7.4-3h1.3v-6.7H183c-3.8 0-6.3 2.3-7.7 3.8zm-20.4-3.7c-7.6 0-10.7 3-10.7 7.6v1.4h6.4V214c0-1.7 1-2.5 4-2.5s4 1 4 3v3.3h-7.3c-5.2 0-8 3-8 6.6v2.4c0 3.5 2.5 6.6 7.7 6.6 3.8 0 6.3-1.6 8-3v2.6h6.4V214c0-4.8-2.8-7.7-10.5-7.7zm3.7 19.3c-1.2 1-3.4 2.3-5.8 2.3-1.7 0-2.7-.6-2.7-2v-1c0-1.3.5-2.3 2.5-2.3h6v3zM4.7 200h-7v25c0 5.2 2.3 7.8 10 7.8h2.8V227H8.8c-3 0-4.2-.8-4.2-2.7V213h6.2v-6.5H4.6V200zm75 13v-6.7h-1.4c-3.8 0-6.3 2.3-7.7 3.8v-3.3h-6.8v26h7V216c1-1 3.6-2.8 7.4-3h1.5zM54 225c-1 .8-3.2 2.3-5.8 2.3-2.2 0-2.8-1-2.8-2.8v-17.8h-7v19.5c0 4 3 7 7.7 7 4.3 0 6.8-1.7 8.2-3v2.6H61v-26h-7V225zm79.7-16c-1.5-1.2-4-2.7-8-2.7-5.3 0-7.7 3-7.7 7.7v11.6c0 4.7 2.4 7.7 7.6 7.7 4.2 0 7-1.8 8.3-3v2.6h6.6v-33h-7v9zm0 16c-1 .7-3.4 2.3-6 2.3s-2.8-1.4-2.8-2.8V215c0-1.4.3-2.7 2.8-2.7 2.6 0 5 1.6 6 2.4V225zM188 207.5h1.6v4.2h1v-4.2h1.7v-.8H188M197.2 206.7l-1.3 3.6-1.4-3.6H193v5h1v-4l1.5 4h.8l1.4-4v4h1v-5"></path><path d="M104.4 206.3c-7.5 0-10.6 3-10.6 7.6v1.4h6.4V214c0-1.7 1-2.5 4-2.5s4 1 4 3v3.3h-7.3c-5.3 0-8 3-8 6.6v2.4c0 3.5 2.4 6.6 7.6 6.6 3.7 0 6.2-1.6 7.8-3v2.6h6.5v-19c0-5-3-7.7-10.6-7.7zm3.8 19.2c-1.2 1-3.4 2.3-5.8 2.3-1.6 0-2.6-.5-2.6-2v-.8c0-1.4.5-2.4 2.5-2.4h6v3zM83 210v6h-1.5c-2.3.2-4.2 1-5.5 1.6v15h7V216c1-1 3.6-2.8 7.4-3h1.4v-6.7h-1.4c-3.6 0-6 2.2-7.5 3.6z"></path></svg>
        </div>

        <button class="nav-toggle">
            <i class="fa-solid fa-bars"></i>
        </button>

        <nav class="navbar">
            <ul data-visible="false" class="list _flex">
                <li class="item">
                    <a href="../index.html" class="link"> home </a>
                </li>
                <li class="item">
                    <a href="../index.html" class="link"> destinations </a>
                </li>
                <li class="item -active">
                    <a href="../index.html" class="link"> special offers </a>
                </li>
                <li class="item">
                    <a href="../index.html" class="link"> about us </a>
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

    navBar.setAttribute('data-visible', visibility === 'false' ? 'true' : 'false');
})

let resizeTimer
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper')
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper')
    }, 400)
})