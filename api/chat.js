document.addEventListener("DOMContentLoaded", function () {
    function updateHeaderImage() {
        const headerImg = document.getElementById("header-image");
        if (window.innerWidth <= 768) {
            headerImg.src = "https://i.postimg.cc/ncCgg1BW/Greg-but-ai-New-Mobile.png";
        } else {
            headerImg.src = "https://i.postimg.cc/N0h31ryz/Greg-but-ai-Newdesktop.png";
        }
    }

    updateHeaderImage();
    window.onresize = updateHeaderImage;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="ai-message"><strong>Greg, But AI:</strong> What's good, youngblood? You need headlines? Big ideas? Or are we just gonna sit here swapping crazy conspiracy theories about why no one's ever seen baby pigeons? Either way, I gotchu.</div>`;

    document.getElementById("chat-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter" && this.value.trim() !== "") {
            let userMessage = this.value.trim();

            // Create user message bubble
            let userBubble = document.createElement("div");
            userBubble.classList.add("user-message");
            userBubble.textContent = userMessage;
            chatBox.appendChild(userBubble);
            this.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;

            // Create and append the loading animation
            let loader = document.createElement("div");
            loader.classList.add("loader");
            loader.innerHTML = `<img src="https://i.postimg.cc/8kxpcspj/Greg-Talking.png" alt="Thinking...">`;
            chatBox.appendChild(loader);

            // Fetch AI response from backend
            fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userMessage: userMessage }),
            })
                .then((response) => response.json())
                .then((data) => {
                    chatBox.removeChild(loader);
                    let aiResponse = data.aiResponse || "Hmm, something went wrong. Operator error? That means you.";

                    let aiMessage = document.createElement("div");
                    aiMessage.classList.add("ai-message");
                    aiMessage.innerHTML = `<strong>Greg, But AI:</strong> ` + aiResponse;
                    chatBox.appendChild(aiMessage);

                    chatBox.scrollTop = chatBox.scrollHeight;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    chatBox.removeChild(loader);

                    let errorMessage = document.createElement("div");
                    errorMessage.classList.add("ai-message");
                    errorMessage.innerHTML = `<strong>Greg, But AI:</strong> Ahhh HORSESHIT! I done messed up. Let me know and I will fix it.`;
                    chatBox.appendChild(errorMessage);
                });
        }
    });
});
