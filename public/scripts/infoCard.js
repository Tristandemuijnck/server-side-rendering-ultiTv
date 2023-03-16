const extraInfo = document.getElementsByClassName("player-extra-info")
const modal = document.getElementsByClassName("modal")
const closeBtn = document.getElementsByClassName("close")

const extraInfoForm = document.getElementsByClassName("player-extra-info-form")

console.log(extraInfoForm)

// for (let a = 0; a < extraInfoForm.length; a++) {
//     console.log(extraInfoForm[a]);
    
//     extraInfoForm[a].addEventListener("submit", (e) => {
//         // e.preventDefault()
//         modal[a].style.display = "block"
//     })

//     closeBtn[a].addEventListener("click", () => {
//         modal[a].style.display = "none"
//     })

//     window.addEventListener("click", (e) => {
//         if (e.target == modal[a]) {
//             modal[a].style.display = "none"
//         }
//     })
// }

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