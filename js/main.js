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

//nav
const nav = document.querySelector('.nav')
const navHeight = nav.getBoundingClientRect().height

const allSection = document.querySelectorAll('.section')
const allLazyImg = document.querySelectorAll('img[data-src]')

//slider
const allSlides = document.querySelectorAll('.slide')
const sliderBtnRight = document.querySelector('.slider__btn--right')
const sliderBtnLeft = document.querySelector('.slider__btn--left')
const dotsContainer = document.querySelector('.dots')

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

//implementing menu fade animation

const handlerNavFade = function (e) {
	if (e.target.classList.contains('nav__link')) {
		const clickedLink = e.target
		const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link')
		const logo = clickedLink.closest('.nav').querySelector('img')
		siblings.forEach(link => {
			if (link !== clickedLink) link.style.opacity = this
		})
		logo.style.opacity = this
	}
}

//stickyNav + observer

const stickyNav = entries => {
	const [entry] = entries

	if (!entry.isIntersecting) nav.classList.add('sticky')
	else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
})
headerObserver.observe(header)

//revealing section + observer

// const revealSection = entries => {
// 	const [entry] = entries
// 	if (!entry.isIntersecting) return

// 	entry.target.classList.remove('section--hidden')
// 	sectionObserver.unobserve(entry.target)
// }

// const sectionObserver = new IntersectionObserver(revealSection, {
// 	root: null,
// 	threshold: 0.15,
// })
// allSection.forEach(section => {
// 	section.classList.add('section--hidden')
// 	sectionObserver.observe(section)
// })

// lazy img

const loadImg = entries => {
	const [entry] = entries

	if (!entry.isIntersecting) return

	entry.target.src = entry.target.dataset.src
	entry.target.addEventListener('load', () => {
		entry.target.classList.remove('lazy-img')
	})
	imgObserver.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, { root: null, threshold: 0, rootMargin: '200px' })

allLazyImg.forEach(img => {
	imgObserver.observe(img)
})

// slider
let curSlide = 0
const lastSlide = allSlides.length - 1

const createDots = () => {
	allSlides.forEach((_, i) => {
		dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
	})
}
createDots()

const activeDot = slide => {
	document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

	document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}
activeDot(0)

const goToSlide = slide => {
	allSlides.forEach((s, i) => {
		s.style.transform = `translateX(${100 * (i - slide)}%)`
	})
}
goToSlide(0)

const nextSlide = () => {
	if (+curSlide === lastSlide) curSlide = 0
	else curSlide++
	goToSlide(curSlide)
	activeDot(curSlide)
}
const prevSlide = () => {
	if (+curSlide === 0) curSlide = lastSlide
	else curSlide--
	goToSlide(curSlide)
	activeDot(curSlide)
}

//listeners

nav.addEventListener('mouseover', handlerNavFade.bind(0.5))
nav.addEventListener('mouseout', handlerNavFade.bind(1))

sliderBtnRight.addEventListener('click', nextSlide)
sliderBtnLeft.addEventListener('click', prevSlide)

dotsContainer.addEventListener('click', e => {
	if (e.target.classList.contains('dots__dot')) {
		curSlide = e.target.dataset.slide

		goToSlide(curSlide)
		activeDot(curSlide)
	}
})

 