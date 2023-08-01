import express, {Express, Request, Response} from 'express';
import transformQuery from "./queryTransformer";
import {performWebSearch} from "./webSearch";
import analyzeContent, {AnalyzedContent} from "./contentAnalysis";
import generateSummary from "./responseGeneration";
import {customsearch_v1} from "@googleapis/customsearch";
import Schema$Result = customsearch_v1.Schema$Result;

const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.post('/query', async (req: Request, res: Response) => {
    try {
        const userQuery: string = req.body.query;
        const transformedQuery: string = transformQuery(userQuery);
        const searchResults: Schema$Result[] = await performWebSearch(transformedQuery);
        const searchResultsAnalyzed: AnalyzedContent[] = await analyzeContent(searchResults)
        const summary: string = await generateSummary(searchResultsAnalyzed, userQuery);
        res.json(summary);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
