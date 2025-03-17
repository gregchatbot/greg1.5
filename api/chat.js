document.addEventListener("DOMContentLoaded", function () {
    let startY;
    const splashPage = document.getElementById("splash-page");
    const chatPage = document.getElementById("chat-page");

    // Mobile Swipe Up Transition
    document.addEventListener("touchstart", function (event) {
        startY = event.touches[0].clientY;
    });

    document.addEventListener("touchend", function (event) {
        let endY = event.changedTouches[0].clientY;
        if (startY - endY > 50) {  
            splashPage.style.display = "none";
            chatPage.style.display = "flex";
            addMessage("🔥 WELCOME TO THE THUNDERDOME. 🔥<br><br>Are we shaping history, shootin’ the shit, or flipping the switch to GreggyPro Mode for an official interview?<br><br>Your move, hotshot.", "bot");
        }
    });

    // Desktop Scroll Transition
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {  
            splashPage.style.display = "none";
            chatPage.style.display = "flex";
            addMessage("🔥 WELCOME TO THE THUNDERDOME. 🔥<br><br>Are we shaping history, shootin’ the shit, or flipping the switch to GreggyPro Mode for an official interview?<br><br>Your move, hotshot.", "bot");
        }
    });

    function addMessage(text, sender) {
        const chatMessages = document.querySelector(".chat-messages");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-bubble", sender);
        messageDiv.innerHTML = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
