const extraInfo = document.getElementsByClassName("player-extra-info")
const modal = document.getElementsByClassName("modal")
const closeBtn = document.getElementsByClassName("close")
const playerInfoP = document.getElementsByClassName("playerInfo")
const extraInfoForm = document.getElementsByClassName("player-extra-info-form")
const extraInfoFormPlayer = document.getElementsByName("playerId")

for (let index = 0; index < extraInfoForm.length; index++) {
    // Check for form submit
    extraInfoForm[index].addEventListener("submit", async (e) => {
        // Prevent browser from reloading
        e.preventDefault()
        
        // Get player id from form
        const playerId = extraInfoFormPlayer[index].value;

        // Fetch player data from JSON files
        let data = await fetch(`../api/facts/Player/${playerId}.json`)
        .then(res => res.json())
        .then(data => data)

        // Create empty string for player info
        let playerInfo = ""

        // Loop through player JSON data
        data.forEach(player => {
            // Create string with player info
            let playerInfoContent = `
                <strong>${player.title}</strong> - ${player.content}<br>
            `
            // Add player info to player info string
            playerInfo += playerInfoContent
        });

        // Add player info to modal
        playerInfoP[index].innerHTML = playerInfo

        // Show modal with player info
        modal[index].classList.toggle("modal-show")
    })    

    // Check for click on close button inside modal
    closeBtn[index].addEventListener("click", () => {
        // Close modal
        modal[index].classList.toggle("modal-show")
    })

    // Check for click outside modal
    window.addEventListener("click", (e) => {
        // If an element outside of the modal is clicked
        if (e.target == modal[index]) {
            // Close modal
            modal[index].classList.toggle("modal-show")
        }
    })
}