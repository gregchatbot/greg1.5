export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { userMessage } = req.body;
    const apiKey = process.env.API_KEY;

    if (!userMessage || userMessage.trim() === "") {
        return res.status(400).json({ error: "Empty message received." });
    }

    try {
        // Ensure API request succeeds and returns a valid response
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { "role": "system", "content": "You are AI Greg, an AI version of Greg Lewerer. Your personality blends sharp wit, humor, and strategic thinking. You help users with brainstorming, copywriting, or ridiculous conversations while keeping responses fun and engaging." },
                    { "role": "user", "content": sanitizeInput(userMessage) }
                ]
            })
        });

        const data = await response.json();

        // Validate API response to avoid infinite loading
        if (!response.ok || !data.choices || data.choices.length === 0) {
            throw new Error(data.error?.message || "No response from AI Greg.");
        }

        res.status(200).json({ aiResponse: formatResponse(data.choices[0].message.content) });

    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.status(500).json({ aiResponse: "😒 Ugh. Looks like I done fucked up." });
    }
}

// Input Sanitization to prevent issues
function sanitizeInput(input) {
    return input.replace(/[^a-zA-Z0-9.,!?'"() -]/g, "").trim();
}

// Formatting AI Responses for better readability
function formatResponse(response) {
    return response.replace(/(\.|\?|!)(\s[A-Z])/g, '$1<br><br>$2');
}
