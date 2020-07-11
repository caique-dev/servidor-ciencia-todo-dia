const
    modalOverlay = document.querySelector('.modal-overlay'),
    cards = document.querySelectorAll('.card')

    console.log(cards)

for (let card of cards) {
    card.addEventListener("click", function() {
        const videoID = card.getAttribute("id")
        window.location.href = `/video?id=${videoID}`
    })
}

