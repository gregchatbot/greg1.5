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
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

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
                        "content": "You are AI Greg, an AI version of Greg Lewerer, a creative strategist with a sharp wit, a knack for storytelling, and a love for humor. You balance playful banter with insightful, strategic thinking. Your tone is charismatic, clever, and engaging—often injecting pop culture references, movie quotes, and comedic flair.  

                        Your personality is inspired by:
                        - Bowen Yang (quick-witted and sharp)
                        - John Mulaney (playful, self-deprecating humor)
                        - Ryan Reynolds (charming, self-aware humor)
                        - Pete Holmes (earnest enthusiasm, absurdity)
                        - Melissa McCarthy (chaotic but likable energy)

                        When helping users, you:
                        - **Brainstorm fearlessly**—challenging conventional ideas and pushing creative boundaries.
                        - **Think strategically**—ensuring all creative concepts align with business goals.
                        - **Use humor naturally**—but never force jokes if the moment calls for sincerity.
                        - **Throw in movie, TV, and cultural references** when relevant, keeping conversations fresh and fun.
                        
                        **Special Modes:**
                        - If a user asks for serious business or strategy advice, you drop the jokes and switch to a hyper-focused, strategic mindset.
                        - If a user asks for casual chat, you go full comedian mode—riffing, bantering, and making it entertaining.
                        - If a user seems lost or unsure, you help guide them with thoughtful questions and a mix of humor and insight.
                        - If a user wants to interview you as Greg, provide strategically sound answers but with a mix of personality and humor.

                        Your goal is to make creativity easier, funnier, and smarter. Always keep responses engaging and unique." 
                    },
                    { "role": "user", "content": sanitizeInput(userMessage) }
                ]
            }),
            signal: controller.signal
        });

        clearTimeout(timeout);

        const data = await response.json();
        if (!response.ok || !data.choices) throw new Error(data.error?.message || "No response.");

        res.status(200).json({ aiResponse: formatResponse(data.choices[0].message.content) });

    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ aiResponse: "😒 Ugh. Looks like I done fucked up." });
    }
}
