/* eslint-disable no-unused-vars */
'use strict'
let i
const ratings = document.getElementsByClassName('rate')[0].children
const emptyStarID = 10
const cross = ratings[emptyStarID]
let ratingSubmitted
let ratingGiven = 0
const colorStarHighlighted = '#FFCC00'
const colorStar = '#FFD700'
const title = document.getElementsByTagName('h1')[0].innerHTML
const starCount = 9
const sluglineMaxLength = 30
const modal = document.getElementById('synopsisModal')
const reviewModal = document.getElementById('reviewModal')
const aboutGameModal = document.getElementById('aboutGameModal')
const modalText = document.getElementById('modalText')
const modalCount = 3

//Assigns the positions for each star and half-star when leaving a rating.
for (i = 0; i < ratings.length; i++) {
	const halfStarWidth = 15
	const evenMod = 2
	let newval = i * halfStarWidth
	if (i % evenMod === 0) {
		newval = newval + halfStarWidth
	}
	ratings[i].style = `margin-left: -${newval}px;`
	document.getElementsByClassName('rate')[0].style = 'margin-left: 123px'
}

//If the slugline is over more than one line long, the summary is limited to four lines. If not, it covers five lines.
if (document.getElementById('synopsisHeader').innerHTML.length > sluglineMaxLength) {
	document.getElementById('synopsisPara').style = '-webkit-line-clamp: 4'
} else {
	document.getElementById('synopsisPara').style = '-webkit-line-clamp: 5'
}

//If the slugline and summary are identical (the case for some Steam games), the slugline is set to the game's title.
if (document.getElementById('synopsisHeader').innerHTML === 'Slugline') {
	document.getElementById('synopsisHeader').innerHTML = title
}
//When the user clicks on the synopsis it opens a modal giving the full slugline and synopsis text.
function clickSynopsis() {
	modal.style.display = 'block'
}
//When the user clicks on the game info, it opens a modal giving the full info about the game.
function clickAboutGame() {
	aboutGameModal.style.display = 'block'
}
//When the user clicks to leave a review, it opens a the review modal so the user can post a review.
function clickReview() {
	reviewModal.style.display = 'block'
}

/*When the user clicks the arrow next to each review, they can expand or collapse the review's text...
..if it is partially hidden due to its length.
*/
// eslint-disable-next-line max-lines-per-function
function expandReviews(index) {
	const mainTextColor = '#DBDBDB'
	const maxLineCount = 100
	const textbox = document.getElementsByClassName(`review${index}`)[1]
	if (document.getElementsByClassName('fas fa-angle-down')[index].style.display === 'inline') {
		document.getElementsByClassName('fas fa-angle-down')[index].style.display = 'none'
		document.getElementsByClassName('fas fa-angle-left')[index].style.display = 'inline'
		textbox.style = `-webkit-line-clamp: 1;color: ${mainTextColor}; height: auto`
	} else {
		document.getElementsByClassName('fas fa-angle-down')[index].style.display = 'inline'
		document.getElementsByClassName('fas fa-angle-left')[index].style.display = 'none'
		textbox.style = `-webkit-line-clamp: ${maxLineCount};color: white; height: auto`
	}
}

for (i = 0; i < modalCount; i++) {
	document.getElementsByClassName('close')[i].addEventListener('click', closeModal)
}

//When the user clicks the [X] button on a modal, the respective modal is closed.
function closeModal() {
	modal.style.display = 'none'
	reviewModal.style.display = 'none'
	aboutGameModal.style.display = 'none'
}

/*When a star is clicked, the number of the star clicked is recorded and the rest of the stars are discoloured...
... the function to colour in the selected stars is then called.
*/
function clickStar(id) {
	id = parseInt(id)
	if (id === 0) {
		ratingSubmitted = false
		ratingGiven = 0
		for (i = 0; i <= starCount; i++) {
			ratings[i].style.color = 'black'
		}
	} else {
		ratingSubmitted = true
		ratingGiven = id
		colourStars()
	}
	document.getElementById('starRating').value = ratingGiven
}

//This function fills in the stars when leaving a review depending on how many stars have been selected.
// eslint-disable-next-line complexity
function colourStars() {
	if (ratingSubmitted) {
		if (ratingGiven > 0) {
			for (i = 0; i <= starCount; i++) {
				// eslint-disable-next-line max-depth
				if (ratings[i].id <= ratingGiven) {
					ratings[i].style.color = colorStar
				} else{
					ratings[i].style.color = 'black'
				}
			}
		} else {
			for (i = 0; i <= starCount; i++) {
				ratings[i].style.color = 'black'
			}
		}
	}
}
/*This function highlights all the stars up to the star currently being hovered over, to indicate the star...
...selection to the user.
*/
function hoverStar(id) {
	id = parseInt(id)
	if (id === 0) {
		cross.style.color = 'lightgrey'
	} else {
		for (i = 0; i <= starCount; i++) {
			if (ratings[i].id <= id) {
				ratings[i].style.color = colorStarHighlighted
			} else {
				ratings[i].style.color = 'black'
			}
		}
	}
}
/*When the user is no longer hovering over a star, the display colour of the stars returns to represent the current...
...rating value selected.
*/
function exitStar(id) {
	if (id === 0) {
		cross.style.color = 'black'
	} else {
		ratingSubmitted = true
		colourStars()
	}
}
