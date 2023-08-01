# GPT-Researcher

GPT-Researcher is a simplified backend service that receives user queries, performs web searches, analyzes the content
from the search results, and returns a concise summary using OpenAI's Language Model.

## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Setting Up Environment Variables](#setting-up-environment-variables)
- [Usage](#usage)
- [License](#license)

## Getting Started

Follow these instructions to set up and run the GPT-Researcher application locally.

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)
- OpenAI API Key (sign up at https://platform.openai.com/overview)
- Google Search engine ID and API key (sign up at https://developers.google.com/custom-search/v1/overview)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/GPT-Researcher.git
cd GPT-Researcher
```

1. Install the dependencies:

```bash
npm install
```

### Setting Up Environment Variables

1. Create a new `.env` file in the root directory of the project.
2. Copy the contents of `.env.example` into `.env`.
3. Provide your actual API keys in the `.env` file.

**Note**: Ensure that you do not commit the .env file to version control, as it contains sensitive information.

## Usage

To run the GPT-Researcher application, follow these steps:

1. Open the terminal and run the application:

```bash
npm start
```

2. Make a POST request to the API endpoint `/query`.

```bash
curl -X POST -H "Content-Type: application/json" -d '{"query": "How to write hello world program in JavaScript"}' http://localhost:3000/query 
```

3. The server will respond with a string containing the final summary.

```json
"A concise summary of the content related to writing hello world program in JavaScript programming language."
```

The application will perform the following steps:

- Receive the user query as a JSON object in the request body.
- Transform the query into a search engine-friendly format.
- Perform a web search using the Google Custom Search API.
- Analyze the content from the search results.
- Generate a concise summary using OpenAI's Language Model.
- Return the final summary in the response.

## License

This project is licensed under the [MIT License.](LICENSE)
