export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { userMessage } = req.body;
    const apiKey = process.env.API_KEY;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4-turbo", // Ensure this matches your Greg, But AI GPT deployment model
                messages: [
                    { "role": "system", "content": "You are Greg, But AI, an advanced chatbot version of Greg Lewerer. Your responses should match the unique personality and tone of Greg, focusing on wit, humor, and strategic insight. Keep it engaging, concise, and conversational." },
                    { "role": "user", "content": userMessage }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Unknown error from OpenAI");
        }

        res.status(200).json({ aiResponse: data.choices[0].message.content.replace(/\n/g, '<br>') });

    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.status(500).json({ aiResponse: "Ahhh HORSESHIT! I done messed up. Let me know and I will fix it." });
    }
}
