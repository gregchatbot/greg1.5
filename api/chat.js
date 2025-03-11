export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { userMessage } = req.body;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { "role": "system", "content": "You are Greg, But AI, a creative AI chatbot. Your tone is witty, humorous, and clever. Be engaging, insightful, and occasionally ridiculous. Do not repeat the opening phrase in every response." },
                    { "role": "user", "content": userMessage }
                ]
            })
        });

        const data = await response.json();

        if (!data.choices || data.choices.length === 0) {
            return res.status(500).json({ aiResponse: "Uh-oh, I think I just had a brain freeze. Try again!" });
        }

        res.status(200).json({ aiResponse: data.choices[0].message.content });

    } catch (error) {
        console.error("Chat API Error:", error);
        res.status(500).json({ aiResponse: "Ahhh HORSESHIT! Something went wrong. Let me know and I will fix it." });
    }
}
