import {customsearch, customsearch_v1} from "@googleapis/customsearch";
import Schema$Result = customsearch_v1.Schema$Result;

const customSearch = customsearch('v1')

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID

export async function performWebSearch(transformedQuery: string): Promise<Schema$Result[]> {
    const params = {
        q: transformedQuery,
        num: 2, // we can increase the number of fetched pages to get more content
        auth: GOOGLE_API_KEY,
        cx: GOOGLE_SEARCH_ENGINE_ID
    }

    try {
        const response = await customSearch.cse.list(params)
        if (response.data.items) return response.data.items
        else return []
    } catch (error) {
        console.error('Error performing web search:', error);
        return [];
    }
}
