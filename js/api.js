

const API_KEY = "";    // PASTE YOUR GEMINI API KEY HERE 

const API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const GeminiAPI = {
  async fetchResponse(userPrompt) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userPrompt
                }
              ]
            }
          ]
        }),
      });

      const data = await response.json();

      console.log(data); // Debug

      if (data.candidates) {
        return data.candidates[0].content.parts[0].text;
      }

      return JSON.stringify(data, null, 2);

    } catch (error) {
      console.error(error);
      return "Error connecting to Gemini API.";
    }
  }
};
