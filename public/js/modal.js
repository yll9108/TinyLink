let modal = document.getElementById("exampleModal");
let back = document.getElementById("back-drop-modal")
const buttons = document.getElementsByClassName("buttons-close")
Array.from(buttons).forEach(btn => {
    btn.addEventListener("click", function () {
        modal.style.display = "none"
        back.classList.remove("modal-backdrop", "fade", "show")
    });
});