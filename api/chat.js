document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const loader = document.getElementById("loader"); // The new loader animation

    // Add Greg's Opening Message
    function addBotMessage(message) {
        let botMessage = document.createElement("div");
        botMessage.classList.add("ai-message");
        botMessage.innerHTML = `<strong>Greg, But AI:</strong> ${message}`;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Show Initial Bot Message
    addBotMessage("What's good, youngblood? You need headlines? Big ideas? Or are we just going to sit here swapping conspiracy theories about why no one's ever seen baby pigeons? Either way, I got you.");

    // Add User Message Function
    function addUserMessage(message) {
        let userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.textContent = message;
        chatBox.appendChild(userMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Handle User Input
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && chatInput.value.trim() !== "") {
            let userMessage = chatInput.value.trim();
            chatInput.value = "";

            addUserMessage(userMessage);
            showLoader();

            // Fetch AI Response
            fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userMessage: userMessage })
            })
            .then(response => response.json())
            .then(data => {
                hideLoader();
                let aiResponse = data.aiResponse || "Something went wrong. Try again.";
                addBotMessage(aiResponse);
            })
            .catch(error => {
                console.error("Error:", error);
                hideLoader();
                addBotMessage("There was an error processing your request. Let me know and I will fix it.");
            });
        }
    });

    // Show Loader Animation
    function showLoader() {
        loader.style.display = "block";
    }

    // Hide Loader Animation
    function hideLoader() {
        loader.style.display = "none";
    }
});
