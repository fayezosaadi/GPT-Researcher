import axios from "axios";
import * as cheerio from "cheerio";
import {customsearch_v1} from "@googleapis/customsearch";
import Schema$Result = customsearch_v1.Schema$Result;

export interface AnalyzedContent {
    content: string
}

/**
 * Notes on ways to improve code
 * we can perform more sophisticated content analysis, such as keyword extraction, sentiment analysis, using other NLP libraries or APIs.
 */

const analyzeContent = async (searchResults: Schema$Result[]): Promise<AnalyzedContent[]> => {
    // Define the maximum number of characters per page
    const maxContentLength = 5000;
    const fetchPage = async (result: Schema$Result) => {
        try {
            // Return an empty string if search result doesn't contain page url
            if (!result.link) return {content: ''}

            const response = await axios.get(result.link);
            const htmlContent = response.data;

            // Extract relevant content from the HTML using Cheerio
            const $ = cheerio.load(htmlContent);

            // Preprocess: Remove unnecessary elements (e.g., navigation, sidebar, footer)
            $('nav, aside, footer').remove();

            // Extract content from the page's main article
            const main = $('main').text();
            const body = $('body').text();
            let content = main.length === 0 ? body : main

            // Limit content length per page, take the first maxContentLength characters, this is to avoid running into
            // openai token limitation errors
            if (content.length > maxContentLength) content = content.slice(0, maxContentLength)

            return {content}
        } catch (error) {
            console.error(`Error while analyzing content from ${result.link}:`, error);
            return {content: ''}
        }
    }

    return await Promise.all(searchResults.map(result => fetchPage(result)))
}

export default analyzeContent