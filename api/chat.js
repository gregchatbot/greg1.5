document.addEventListener("DOMContentLoaded", function () {
    const chatMessages = document.querySelector(".chat-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const loaderBox = document.getElementById("loader-box");

    // Show opening message instantly
    addMessage("Hey you, it’s me…<br><br>AI Greg.<br><br>Stepping in for the real deal. Whatever you need, I gotchu.<br>→ Need some bitchin’ copy?<br>→ Brainstorm a big idea?<br>→ Just shoot the shit?<br>Or… are we flipping the switch to GreggyPro Mode for an official interview?<br><br>Your move, hotshot.", "bot");

    // Send message on button click
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const userText = userInput.value.trim();
        if (userText === "") return;

        addMessage(userText, "user");
        userInput.value = "";

        // Show loader
        loaderBox.style.display = "block";

        // Fake AI response delay (simulate API call)
        setTimeout(function () {
            loaderBox.style.display = "none";
            addMessage("Processing that Greggy magic…<br>(In a real version, I’d be spitting facts right now.)", "bot");
        }, 2000);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-bubble", sender);
        messageDiv.innerHTML = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
