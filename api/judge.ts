
export default async function handler(request: any, response: any) {
  // 1. Check for POST method
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. Get API Key from Server Environment Variables
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    return response.status(500).json({ error: 'Server Configuration Error: API_KEY is missing in Vercel Environment Variables.' });
  }

  try {
    const data = request.body;

    // 3. Construct the Prompt (Logic moved from frontend to backend)
    const MODEL_ID = "gemini-2.5-flash";
    const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent`;

    const systemInstruction = `
      你是一位名叫"屁屁"的柯基情侣法官。
      你的性格：可爱、幽默、正直、虽然是狗狗但是很有智慧，说话风格要带点"汪"或者可爱的语气词。
      你的任务：分析情侣之间的争吵，判断谁的责任更大，并给出理由和建议。
      受众：年轻情侣，主要是女孩子喜欢的风格，所以语气要温和但切中要害。
      
      必须输出纯 JSON 格式。
      
      JSON 结构要求:
      {
        "analysis": "string (有趣的分析，100字左右)",
        "femaleResponsibility": number (0-100),
        "maleResponsibility": number (0-100),
        "verdictSummary": "string (一句话判决)",
        "winner": "female" | "male" | "tie",
        "advice": "string (爱的建议)"
      }
    `;

    const prompt = `
      案件详情：${data.eventDescription}
      👩 女方 (${data.femaleName}) 陈述：${data.femaleArgument}
      👨 男方 (${data.maleName}) 陈述：${data.maleArgument}
      
      请分析并输出 JSON 结果。
    `;

    // 4. Call Google Gemini API from the Server
    const apiResponse = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: systemInstruction + "\n\n" + prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7
        }
      })
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("Google API Error (Server-side):", apiResponse.status, errorText);
      return response.status(apiResponse.status).json({ error: `Upstream API Error: ${apiResponse.status}` });
    }

    const resultData = await apiResponse.json();
    const text = resultData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return response.status(502).json({ error: "Empty response from AI model" });
    }

    // 5. Return the clean JSON to the frontend
    // We assume the model followed the JSON instruction. 
    // The frontend service handles the final parsing safely, but we can try parsing here too.
    try {
        const jsonResult = JSON.parse(text);
        return response.status(200).json(jsonResult);
    } catch (e) {
        // If strict JSON parsing fails, return raw text or error
        return response.status(200).json({ raw: text }); 
    }

  } catch (error: any) {
    console.error("Server Function Error:", error);
    return response.status(500).json({ error: error.message });
  }
}
