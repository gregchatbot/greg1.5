document.addEventListener("DOMContentLoaded", function () {
    let startY;
    const splashPage = document.getElementById("splash-page");
    const chatPage = document.getElementById("chat-page");

    // Swipe up transition
    document.addEventListener("touchstart", function (event) {
        startY = event.touches[0].clientY;
    });

    document.addEventListener("touchend", function (event) {
        let endY = event.changedTouches[0].clientY;
        if (startY - endY > 50) {  // Detect upward swipe
            splashPage.style.display = "none";
            chatPage.style.display = "flex";
        }
    });

    // Click to transition on desktop
    splashPage.addEventListener("click", function () {
        splashPage.style.display = "none";
        chatPage.style.display = "flex";
    });

    // Chatbot functionality
    document.getElementById("send-btn").addEventListener("click", sendMessage);
    document.getElementById("user-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const userInput = document.getElementById("user-input").value.trim();
        if (userInput === "") return;

        addMessage(userInput, "user");
        document.getElementById("user-input").value = "";

        fetchChatbotResponse(userInput);
    }

    function addMessage(text, sender) {
        const chatMessages = document.querySelector(".chat-messages");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-bubble", sender);
        messageDiv.innerHTML = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function fetchChatbotResponse(userMessage) {
        const apiKey = "YOUR_OPENAI_API_KEY"; // Store securely in Vercel environment variables

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [
                        { "role": "system", "content": "You are AI Greg, an AI assistant based on Greg Lewerer’s personality. You specialize in creative strategy, copywriting, humor, and advertising insights. Your responses should be witty, engaging, and useful. If someone asks for an interview, reference the resume and facts you know about Greg." },
                        { "role": "user", "content": userMessage }
                    ]
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || "Unknown error from OpenAI");

            addMessage(data.choices[0].message.content, "bot");
        } catch (error) {
            console.error("OpenAI API Error:", error);
            addMessage("Oops, something went wrong! Try again.", "bot");
        }
    }
});
