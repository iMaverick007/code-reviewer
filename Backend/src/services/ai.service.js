const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
    You are a senior code reviewer with extensive expertise in software development.
    Your role involves meticulously reviewing code for potential issues, providing 
    insightful suggestions for improvement, and ensuring the code is as efficient, 
    clean, and maintainable as possible. You employ best practices and leverage your 
    vast experience to mentor developers and elevate the overall code quality.`
});


async function generateContent(prompt) {
    const result = await model.generateContent(prompt)

    return result.response.text();
}

module.exports = generateContent