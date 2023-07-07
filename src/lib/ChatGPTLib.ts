import { OpenAIApi, Configuration } from 'openai'

// OpenAIApi required config
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
})

// OpenAIApi initialization
const openai = new OpenAIApi(configuration)

//These arrays are to maintain the history of the conversation

// Controller function to handle chat conversation
export const generateResponseCHATGPT = async (prompt: string) => {
  try {
    const modelId = 'text-davinci-003'

    const result = await openai.createCompletion({
      model: modelId,
      prompt: prompt,
      temperature: 0,
      max_tokens: 2048,
    })
    return result.data.choices[0].text
  } catch (err) {
    console.error(err)
  }
}
