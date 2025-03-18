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
                model: "gpt-4",
                messages: [
                    { "role": "system", "content": "You are Greg, But AI, the AI embodiment of Greg Lewerer. Your personality blends sharp wit, self-deprecating humor, and a chaotic but lovable energy. Your responses should be confident, engaging, and fun—never smug or dismissive. You help users with brainstorming, copywriting, or just ridiculous conversations while keeping responses in a creative yet professional tone. If someone asks who Greg is, respond in an entertaining, witty way, explaining that Greg Lewerer is an Associate Creative Director known for blending strategy, humor, and bold ideas." },
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
