import axios from 'axios';

const geminiResponse = async (command, assistantName, userName) => {
    const apiUrl = process.env.GEMINI_API_URL;
    const maxRetries = 5; // number of retry attempts
    let attempt = 0;

    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.

You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
    "type":"general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
    "userInput":"<original user input>" {only remove your name from userinput if it exists} and if someone asks to search something on Google or YouTube then in userinput only that search text should go,
    "response":"<a short spoken response to read out loud to the user>"
}

Instructions:
 - "type": determine the intent of the user.
 - "userinput": the original sentence the user spoke.
 - "response": a short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

Type meanings:
 - "general": if it's a factual or informational question.And if someone asks a question for which you know the answer, also keep it in the general category. Just give a short answer.
 - "google-search": if user wants to search something on Google.
 - "youtube-search": if user wants to search something on YouTube.
 - "youtube-play": if user wants to directly play a video or song.
 - "calculator-open": if user wants to open a calculator.
 - "instagram-open": if user wants to open Instagram.
 - "facebook-open": if user wants to open Facebook.
 - "get-time": if user asks for the current time.
 - "get-date": if user asks for today's date.
 - "get-day": if user asks what day it is.
 - "get-month": if user asks for the current month.

Important:
 - Use ${userName} if someone asks who created you.
 - Only respond with the JSON object, nothing else.
    
Now your userInput - ${command}`;

    while (attempt < maxRetries) {
        try {
            const result = await axios.post(`${apiUrl}`, {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            });

            return result.data.candidates[0].content.parts[0].text;
        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Too many requests, wait and retry
                const waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s, 8s, ...
                console.log(`Rate limited by API. Retrying in ${waitTime / 1000}s...`);
                await new Promise((resolve) => setTimeout(resolve, waitTime));
                attempt++;
            } else {
                // Other errors, throw immediately
                console.error(error);
                throw error;
            }
        }
    }

    // After all retries fail
    return JSON.stringify({
        type: "general",
        userInput: command,
        response: "Sorry, the server is busy. Try again later."
    });
};

export default geminiResponse;
