const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");

function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    const userBubble = document.createElement("div");
    userBubble.classList.add("user-message");
    userBubble.textContent = userMessage;
    chatBox.appendChild(userBubble);

    let loader = document.createElement("div");
    loader.classList.add("loader");
    loader.innerHTML = `<img src="https://i.postimg.cc/8kxpcspj/Greg-Talking.png" alt="Thinking..." width="50">`;
    chatBox.appendChild(loader);
    chatBox.scrollTop = chatBox.scrollHeight;

    fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userMessage }),
    })
    .then(response => response.json())
    .then(data => {
        chatBox.removeChild(loader);
        const aiMessage = document.createElement("div");
        aiMessage.classList.add("ai-message");
        aiMessage.innerHTML = `<strong>Greg, But AI:</strong> ${data.aiResponse}`;
        chatBox.appendChild(aiMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
        chatBox.removeChild(loader);
        let errorMessage = document.createElement("div");
        errorMessage.classList.add("ai-message");
        errorMessage.innerHTML = `<strong>Greg, But AI:</strong> Oops, something went wrong. Try again?`;
        chatBox.appendChild(errorMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    chatInput.value = '';
    chatInput.blur();
}

// Event listeners
sendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});
