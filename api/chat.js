document.addEventListener("DOMContentLoaded", function () {
    let chatBox = document.getElementById("chat-box");
    let chatInput = document.getElementById("chat-input");
    
    // Initial Greeting
    chatBox.innerHTML += `<div class='ai-message'><strong>Greg, But AI:</strong> What's good, youngblood? Need ideas, headlines, or just wanna swap conspiracy theories about baby pigeons? Either way, I gotchu.</div>`;

    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && chatInput.value.trim() !== "") {
            let userMessage = chatInput.value.trim();
            chatBox.innerHTML += `<div class='user-message'>${userMessage}</div>`;
            chatInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;

            // Show loader while processing response
            let loader = document.createElement("div");
            loader.classList.add("ai-message");
            loader.innerHTML = "Thinking...";
            chatBox.appendChild(loader);
            chatBox.scrollTop = chatBox.scrollHeight;

            fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessage: userMessage })
            })
            .then(response => response.json())
            .then(data => {
                loader.remove(); // Remove loader once response is ready
                let aiResponse = data.aiResponse || "Error: Brain lag. Try again!";
                chatBox.innerHTML += `<div class='ai-message'><strong>Greg, But AI:</strong> ${aiResponse}</div>`;
                chatBox.scrollTop = chatBox.scrollHeight;
            })
            .catch(error => {
                console.error("Error:", error);
                loader.remove();
                chatBox.innerHTML += `<div class='ai-message'><strong>Greg, But AI:</strong> Ahhh HORSESHIT! I done messed up. Let me know and I will fix it.</div>`;
            });
        }
    });
});
