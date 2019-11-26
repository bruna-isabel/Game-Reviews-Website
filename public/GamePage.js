'use strict'
let i
const ratings = document.getElementsByClassName('rate')[0].children
const cross = ratings[10]
let ratingSubmitted
let ratingGiven = 0
const colorStarHighlighted = '#FFCC00'
const colorStar = '#FFD700'
const scoreText = document.getElementById('score/10text').innerHTML

for (i = 0; i < ratings.length; i++) {
	let newval = i * 15
	if (i % 2 === 0) {
		newval = newval + 15
	}
	ratings[i].style = `margin-left: -${newval}px;`
	document.getElementsByClassName('rate')[0].style = 'margin-left: 123px'
}


if (document.getElementById('synopsisHeader').innerHTML.length > 30) {
	document.getElementById('synopsisPara').style = '-webkit-line-clamp: 4'
} else {
	document.getElementById('synopsisPara').style = '-webkit-line-clamp: 5'
}

const modal = document.getElementById('synopsisModal')
const reviewModal = document.getElementById('reviewModal')
const aboutGameModal = document.getElementById('aboutGameModal')
const modalText = document.getElementById('modalText')

if (scoreText.includes('0 reviews')) {
	document.getElementById('score/10text').innerHTML = 'No reviews yet. Be the first to leave a review!'
}


function clickSynopsis() {
	modal.style.display = 'block'
	modalText.children[1].innerHTML = document.getElementsByClassName('synopsisHeader')[0].innerHTML
	modalText.children[2].innerHTML = document.getElementsByClassName('synopsisPara')[0].innerHTML
}

function clickAboutGame() {
	aboutGameModal.style.display = 'block'
}

function clickReview() {
	reviewModal.style.display = 'block'
}


// eslint-disable-next-line max-lines-per-function
function expandReviews(index) {
	const mainTextColor = '#DBDBDB'
	const textbox = document.getElementsByClassName(`review${index}`)[1]
	if (document.getElementsByClassName('fas fa-angle-down')[index].style.display === 'none') {
		document.getElementsByClassName('fas fa-angle-down')[index].style.display = 'inline'
		document.getElementsByClassName('fas fa-angle-left')[index].style.display = 'none'
		textbox.style = `-webkit-line-clamp: 1;color: ${mainTextColor}; height: auto`
	} else {
		document.getElementsByClassName('fas fa-angle-down')[index].style.display = 'none'
		document.getElementsByClassName('fas fa-angle-left')[index].style.display = 'inline'
		for (i = 1; i < 100; i++) {
			textbox.style = `-webkit-line-clamp: ${i};color: white; height: auto`
		}
	}


}

function closeModal() {
	modal.style.display = 'none'
	reviewModal.style.display = 'none'
	aboutGameModal.style.display = 'none'
}


function clickStar(id) {
	id = parseInt(id)
	if (id === 0) {
		ratingSubmitted = false
		ratingGiven = 0
		for (i = 0; i <= 9; i++) {
			ratings[i].style.color = 'black'
		}
		if (id === 0) {
			cross.style.color = 'darkgrey'
		}
	} else {
		ratingSubmitted = true
		ratingGiven = id
		colourStars()
	}
	document.getElementById('starRating').value = ratingGiven
}
function colourStars() {
	if (ratingSubmitted) {
		if (ratingGiven > 0) {
			for (i = 0; i <= 9; i++) {
				if (ratings[i].id <= ratingGiven) {
					ratings[i].style.color = colorStar
				} else{
					ratings[i].style.color = 'black'
				}
			}
		} else {
			for (i = 0; i <= 9; i++) {
				ratings[i].style.color = 'black'
			}
		}
	}
}

function hoverStar(id) {
	id = parseInt(id)
	if (id === 0) {
		cross.style.color = 'lightgrey'
	} else {
		for (i = 0; i <= 9; i++) {
			if (ratings[i].id <= id) {
				ratings[i].style.color = colorStarHighlighted
			} else {
				ratings[i].style.color = 'black'
			}
		}
	}
}

function exitStar(id) {
	if (id === 0) {
		cross.style.color = 'black'
	} else {
		ratingSubmitted = true
		colourStars()
	}
}

function truncate(input, maxLength) {
	if (input.length > maxLength && !input.includes(' '))
		return `${input.substring(0,maxLength)}...`
	else
		return input
}
