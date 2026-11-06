# RAG Knowledge

A comprehensive step-by-step guide to RAG (Retrieval-Augmented Generation) from basic to production-ready.

## Overview

This website provides:
- **53 concepts** organized into **7 learning levels**
- Plain analogies and worked examples for each concept
- Links to original Instagram source videos
- **20 interview eliminator questions** to test your knowledge

## The 6-Step RAG Pipeline

1. **Ingest** - Collect & clean PDFs, web, Confluence, APIs
2. **Chunk** - Split into small, self-contained pieces
3. **Embed** - Turn each chunk into a vector
4. **Store** - Vector DB + metadata & permissions
5. **Retrieve** - Embed question, find & rerank top chunks
6. **Generate** - LLM answers from evidence, with citations

## Levels

| Level | Focus |
|-------|-------|
| 1 | Basics - What RAG is and why it exists |
| 2 | Building Blocks - Chunking, embeddings, vector databases |
| 3 | Retrieval - Finding the right evidence |
| 4 | Ranking & Generation - From "close" to "correct" |
| 5 | Evaluation & Debugging - Proving it works |
| 6 | Advanced Architectures - When plain RAG is wrong |
| 7 | Production - From demo to reliable system |

## Deployment to Vercel

This is a static HTML site ready for Vercel deployment:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the static site
   - Click "Deploy"

3. **Configure (optional):**
   - The `vercel.json` configures static site deployment
   - Routes direct all requests to `index.html`

## Local Development

To view locally:

```bash
# Using Python's simple HTTP server
python -m http.server 8000

# Or using Node.js
npx serve .
```

Then open http://localhost:8000 in your browser.

## Technologies Used

- HTML5 with Semantic Elements
- CSS Custom Properties (variables) for theming
- Responsive design with CSS Grid
- Dark mode support
- Pure client-side JavaScript (no build required)
- Google Fonts: Newsreader & IBM Plex

## License

This is a knowledge resource for learning RAG concepts. Original Instagram content is linked but not reproduced.