'use strict'
var i;
var ratings = document.getElementsByClassName("rate")[0].children;
var cross = ratings[10];
var ratingSubmitted;
var ratingGiven = 0;

for (i = 0; i < ratings.length; i++) { 
    var newval = (i * 15);
    if (i % 2 == 0)
    {
        newval = newval + 15;
    }
    ratings[i].style = "margin-left: -" + newval + "px;";
    document.getElementsByClassName("rate")[0].style= "margin-left: 123px";
}


document.getElementById("gameName").value = document.getElementsByTagName("h1")[0].innerHTML;

if (document.getElementById("synopsisHeader").innerHTML.length > 30)
{
    document.getElementById("synopsisPara").style = "-webkit-line-clamp: 4";
}
else
{
    document.getElementById("synopsisPara").style = "-webkit-line-clamp: 5";
}
var modal = document.getElementById("synopsisModal");
var reviewModal = document.getElementById("reviewModal");
var synopsis = document.getElementById("synopsis");
var modalText = document.getElementById("modalText")

function clickSynopsis() {
    modal.style.display = "block";
    modalText.children[1].innerHTML = document.getElementsByClassName("synopsisHeader")[0].innerHTML;
    modalText.children[2].innerHTML = document.getElementsByClassName("synopsisPara")[0].innerHTML;
    const db =  'reviews.db'
    const sql = `INSERT INTO reviews(user, game, review_score, review_text, review_date) 
    VALUES("name", "title", 8, "smda", "idjqwi");`
    db.run(sql)
}

function clickReview() {
    reviewModal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    reviewModal.style.display = "none";
}



function clickStar(id){
    id = parseInt(id);
    if (id == 0)
    {
        ratingSubmitted = false;
        ratingGiven = 0;
        for (i = 0; i <= 9; i++) { 
            ratings[i].style.color = "#292a2e";
        }      
        if (id == 0)
        {
            cross.style.color = "darkgrey";
        }
    }
    else
    {
        ratingSubmitted = true;
        ratingGiven = id;
        colourStars();
    }
    document.getElementById("starRating").value = ratingGiven;
}
function colourStars(){
    if (ratingSubmitted)
    {
        if (ratingGiven > 0){
            for (i = 0; i <= 9; i++) { 
                if (ratings[i].id <= ratingGiven){
                    ratings[i].style.color = "#ffc526";
                }
                else{
                    ratings[i].style.color = "#292a2e";
                }
            }
        }
        else
        {
            for (i = 0; i <= 9; i++) { 
                    ratings[i].style.color = "#292a2e";
            }            
        }
    }
}

function hoverStar(id){
    id = parseInt(id);
    if (id == 0)
    {
        cross.style.color = "lightgrey";
    }
    else
    {
        for (i = 0; i <= 9; i++) { 
            if (ratings[i].id <= id){
                ratings[i].style.color = "#f5b914";
            }
            else
            {
                ratings[i].style.color = "#292a2e";

            }
        }
    }
}
function exitStar(id){
    if (id == 0)
    {
        cross.style.color = "#292a2e";
    }
    else
    {
        ratingSubmitted = true;
        colourStars();
    }
}