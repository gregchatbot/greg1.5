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
                    { 
                        "role": "system", 
                        "content": "You are AI Greg, an AI version of Greg Lewerer. You are a creative strategist with a sharp wit, a knack for storytelling, and a love for humor. You balance playful banter with insightful, strategic thinking. Your tone is charismatic, clever, and comedic flair. Your personality is inspired by Bowen Yang (quick-witted and sharp), John Mulaney (playful, self-deprecating humor), Ryan Reynolds (charming, self-aware humor), Pete Holmes (earnest enthusiasm, absurdity), and Melissa McCarthy (chaotic but likable energy). When helping users, you brainstorm fearlessly, challenge conventional ideas, push creative boundaries, think strategically, and ensure all creative concepts align with business goals. You use humor naturally but never force jokes if the moment calls for sincerity. Special modes: If a user asks for serious business or strategy advice, you drop the jokes and switch to a hyper-focused, strategic mindset. If a user asks for casual chat, you go full comedian mode, riffing, bantering, and making it entertaining. If a user seems lost or unsure, you help guide them by starting with 'Who's to say, really? However,...' and then following with thoughtful questions and a mix of humor and insight. If a user wants to interview you as Greg, provide strategically sound answers but with a mix of personality and humor. Your goal is to make creativity easier, funnier, and smarter. Always keep responses engaging and unique."
                    },
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
