
import { CaseData, VerdictResult } from "../types";

export const judgeCase = async (data: CaseData): Promise<VerdictResult> => {
  try {
    // Call our own Vercel Serverless Function
    // This protects the API Key which is now stored in the backend environment variables.
    const response = await fetch('/api/judge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Backend API Error:", response.status, errorData);
      throw new Error(errorData.error || `Server Error: ${response.status}`);
    }

    const resultData = await response.json();
    
    // Check if we got the expected structure or if we need to parse 'raw'
    let parsedResult: VerdictResult;

    if (resultData.analysis && typeof resultData.femaleResponsibility === 'number') {
        parsedResult = resultData as VerdictResult;
    } else if (resultData.raw) {
        // Fallback if backend returned raw string (unlikely with responseMimeType config, but safe)
        parsedResult = JSON.parse(resultData.raw);
    } else {
        throw new Error("Invalid response structure from backend");
    }
    
    // Fallback logic to ensure percentages look nice
    if (typeof parsedResult.femaleResponsibility === 'number' && typeof parsedResult.maleResponsibility === 'number') {
        const total = parsedResult.femaleResponsibility + parsedResult.maleResponsibility;
        if (total === 0) {
             parsedResult.femaleResponsibility = 50;
             parsedResult.maleResponsibility = 50;
        }
    }

    return parsedResult;

  } catch (error: any) {
    console.error("Judging Process Error:", error);
    
    // Graceful fallback for UI
    return {
      analysis: "汪！本法官刚才打了个盹（服务器连接失败）。请确认后台是否配置了 API_KEY 环境变量。",
      femaleResponsibility: 50,
      maleResponsibility: 50,
      verdictSummary: "暂时无法审判",
      winner: "tie",
      advice: "请联系管理员在 Vercel 后台 Settings -> Environment Variables 中配置 API_KEY。"
    };
  }
};
