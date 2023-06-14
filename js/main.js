'use strict'

///////////////////////////////////////
// Modal window
const header = document.querySelector('.header')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')

//smooth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

//tab component
const tabContainer = document.querySelector('.operations__tab-container')
const allTabs = tabContainer.querySelectorAll('.operations__tab')
const allTabsContent = document.querySelectorAll('.operations__content')

const openModal = e => {
	e.preventDefault()
	modal.classList.remove('hidden')
	overlay.classList.remove('hidden')
}

const closeModal = () => {
	modal.classList.add('hidden')
	overlay.classList.add('hidden')
}

const createCookieMessage = () => {
	const message = document.createElement('div')

	message.classList.add('cookie-message')
	message.innerHTML =
		'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'
	header.append(message)

	//Delete cookie element

	document.querySelector('.btn--close-cookie').addEventListener('click', () => message.remove())

	//styles

	message.style.backgroundColor = '#37383d'
	message.style.width = '120%'
	message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'
}
createCookieMessage()

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal()
	}
})

btnScrollTo.addEventListener('click', e => {
	section1.scrollIntoView({ behavior: 'smooth' })
})

//Implementing smoot scroll navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
	e.preventDefault()
	if (e.target.classList.contains('nav__link')) {
		const targetSection = e.target.getAttribute('href')
		document.querySelector(targetSection).scrollIntoView({ behavior: 'smooth' })
	}
})

//implementing tab component

tabContainer.addEventListener('click', e => {
	const clickedTab = e.target.closest('.operations__tab')

	if (!clickedTab) return

	allTabs.forEach(tab => tab.classList.remove('operations__tab--active'))
	clickedTab.classList.add('operations__tab--active')

	allTabsContent.forEach(content => content.classList.remove('operations__content--active'))

	document.querySelector(`.operations__content--${clickedTab.dataset.tab}`).classList.add('operations__content--active')
})
