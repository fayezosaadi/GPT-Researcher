import {Configuration, OpenAIApi} from 'openai';
import {AnalyzedContent} from "./contentAnalysis";

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY})
const openai = new OpenAIApi(configuration)

/**
 * Notes on ways to improve code
 * the quality of the summary may depend on the model used, the prompt, and the specific API parameters. We can adjust
 * the max_tokens and temperature to control the summary's length and level of randomness. We should experiment with
 * different values to achieve the desired results.
 */

const generateSummary = async (analyzedContent: AnalyzedContent[], originalQuery: string): Promise<string> => {
    const prompt = analyzedContent.map(result => result.content).join('\n');
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-0613', // Replace with the desired language model engine
            messages: [
                {
                    role: 'assistant',
                    content: `You are a highly skilled AI trained in web pages comprehension and summarization. I would 
                    like you to read the following text that contains information about this query ${originalQuery} and 
                    summarize it into a concise summary. Aim to retain the most important and practical points in the 
                    body of the document, providing a coherent and readable summary that could help a person understand 
                    the main points. Please avoid unnecessary details, irrelevant information or tangential points.`
                },
                {role: 'user', content: prompt},
            ],
            max_tokens: 200,
            temperature: 0,
        });
        const summary = response.data.choices[0].message ? response.data.choices[0].message.content : ''
        return summary || ''

    } catch (error: any) {
        if (error.response) console.error(error.response.data)
        else console.error(error.message)

        return ''
    }
}

export default generateSummary