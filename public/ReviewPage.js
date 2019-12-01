'use strict'
let i
// eslint-disable-next-line max-lines-per-function
function expandReviews(index) {
	const mainTextColor = '#DBDBDB'
	const textbox = document.getElementsByClassName(`review${index}`)[1]
	if (document.getElementsByClassName('fas fa-angle-down')[index].style.display === 'inline') {
		document.getElementsByClassName('fas fa-angle-down')[index].style.display = 'none'
		document.getElementsByClassName('fas fa-angle-left')[index].style.display = 'inline'
		textbox.style = `-webkit-line-clamp: 1;color: ${mainTextColor}; height: auto`
	} else {
		document.getElementsByClassName('fas fa-angle-down')[index].style.display = 'inline'
		document.getElementsByClassName('fas fa-angle-left')[index].style.display = 'none'
		for (i = 1; i < 100; i++) {
			textbox.style = `-webkit-line-clamp: ${i};color: white; height: auto`
		}
	}
}

if (document.getElementById('score/10text').innerHTML.includes('from 0 reviews')) {
	document.getElementById('score/10text').innerHTML = 'No Reviews.'
}

function leaveReviewComment(index) {
	const commentArea = document.getElementsByClassName('commentTableContainer')[index]
	if (commentArea.style.display === 'block') {
		commentArea.style.display = 'none'
	} else {
		commentArea.style.display = 'block'
	}
}