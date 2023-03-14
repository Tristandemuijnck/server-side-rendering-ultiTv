const extraInfo = document.getElementsByClassName("player-extra-info")
const modal = document.getElementsByClassName("modal")
const closeBtn = document.getElementsByClassName("close")

// console.log(modal)

for (let i = 0; i < extraInfo.length; i++) {
    extraInfo[i]
    const playerId = extraInfo[i].id;
    // console.log(playerId)

    extraInfo[i].addEventListener("click", () => {
        modal[i].style.display = "block"
    })

    closeBtn[i].addEventListener("click", () => {
        modal[i].style.display = "none"
    })

    window.addEventListener("click", (e) => {
        if (e.target == modal[i]) {
            modal[i].style.display = "none"
        }
    })
}