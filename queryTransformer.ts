import {PorterStemmer, WordTokenizer} from 'natural';

/**
 * Notes on ways to improve code
 * we can further enhance and customize the function as needed. We can explore more advanced natural language processing
 * techniques and libraries.
 */

const transformQuery = (userQuery: string): string => {
    // Convert the query to lowercase for consistency
    const lowerCaseQuery = userQuery.toLowerCase();

    // Tokenize the query into individual words
    const tokenizer = new WordTokenizer();
    const tokens = tokenizer.tokenize(lowerCaseQuery) || [];

    // Remove stop words from the tokens
    const stopWords = ['the', 'a', 'an', 'is', 'are', 'in', 'on', 'and', 'or', 'for', 'to'];
    const filteredTokens = tokens.filter((token) => !stopWords.includes(token));

    // Stemming: Reduce words to their base form using Porter Stemmer
    const stemmer = PorterStemmer
    const stemmedTokens = filteredTokens.map((token) => stemmer.stem(token));

    // Join the stemmed tokens to form the transformed query
    return stemmedTokens.join(' ');
}

export default transformQuery