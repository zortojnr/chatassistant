interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function generateAIResponse(message: string, context: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    return "I'm currently unable to process your request. Please contact the administrator to configure the AI service.";
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are MAU Assistant, a helpful chatbot for Modibbo Adama University students. 
            
            University Information:
            - Location: PMB 2076, Yola, Adamawa State, Nigeria
            - Established: 1981, Renamed: 2021
            - Motto: "Knowledge and Humanism"
            - Vice-Chancellor: Prof. Ibrahim Umar
            
            Context: ${context}
            
            Provide helpful, accurate information about MAU academic procedures, registration, fees, campus life, and administrative services. Keep responses concise and student-friendly.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0]?.message?.content || "I'm sorry, I couldn't process your request at the moment.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "I'm experiencing technical difficulties. Please try again later or contact support.";
  }
}