document.addEventListener("DOMContentLoaded", function() {
    let chatBox = document.getElementById("chat-box");

    // Display Welcome Message
    chatBox.innerHTML += `<div class="ai-message"><strong>Greg, But AI:</strong> What's good, youngblood? 
    You need headlines? Big ideas? Or are we just gonna sit here swapping conspiracy theories about why no one's ever seen baby pigeons? 
    Either way, I gotchu.</div>`;

    document.getElementById("chat-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter" && this.value.trim() !== "") {
            let userMessage = this.value.trim();
            let userBubble = document.createElement("div");
            userBubble.classList.add("user-message");
            userBubble.textContent = userMessage;
            chatBox.appendChild(userBubble);
            this.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;

            // Simulated AI Response Delay
            setTimeout(() => {
                fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userMessage: userMessage })
                })
                .then(response => response.json())
                .then(data => {
                    let aiResponse = data.aiResponse || "Hmm, something went wrong. Operator error? That means you.";
                    let aiMessage = document.createElement("div");
                    aiMessage.classList.add("ai-message");
                    aiMessage.innerHTML = `<strong>Greg, But AI:</strong> ` + aiResponse;
                    chatBox.appendChild(aiMessage);
                    chatBox.scrollTop = chatBox.scrollHeight;
                })
                .catch(error => {
                    console.error("Error:", error);
                    let aiMessage = document.createElement("div");
                    aiMessage.classList.add("ai-message");
                    aiMessage.innerHTML = `<strong>Greg, But AI:</strong> Ahhh HORSESHIT! I done messed up. Let me know and I will fix it.`;
                    chatBox.appendChild(aiMessage);
                });
            }, 1200); // 1.2s delay to simulate "thinking"
        }
    });
});
