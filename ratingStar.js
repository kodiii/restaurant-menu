const ratingStars = [...document.getElementsByClassName("fa-star")]
console.log(ratingStars.length)

function executeRating(stars) {
    const starClassActive = "fa-solid fas fa-star"
    const starClassInactive = "fa-solid far fa-star"
    const starsLength = stars.length
    let i

    stars.map((star) => {
        star.onclick = () => {
            i = stars.indexOf(star)
            if (star.className === starClassInactive) {
                for (i; i >= 0; i--) stars[i].className = starClassActive
            } else {
                for (i; i < starsLength; i++) stars[i].className = starClassInactive
            }
        }
    })
}
executeRating(ratingStars)
