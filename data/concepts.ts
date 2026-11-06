export const CONCEPTS = [
  {
    n: "1.1",
    l: 1,
    t: "What is RAG?",
    d: "Retrieval-Augmented Generation. Instead of answering only from what the LLM memorised in training, the system first retrieves relevant passages from your own documents, then generates an answer grounded in those passages, with sources.",
    a: "Closed-book vs open-book exam. A plain LLM is closed-book — it must recall. RAG is open-book — it looks things up first, then answers.",
    e: "Ask “What is our leave policy?” A plain LLM guesses “30 days”. RAG retrieves the actual policy PDF and answers “25 days, Section 4.2” with a link.",
    w: [
      ["Instagram source — What is RAG?", "https://www.instagram.com/reel/DRJiUtkEWBl/"],
      ["Instagram source — RAG in 60s", "https://www.instagram.com/reel/De6mrMTh7bM/"],
      ["Instagram source — Closed vs open book", "https://www.instagram.com/reel/DebEiiiv2L5/"]
    ]
  },
  {
    n: "1.2",
    l: 1,
    t: "The naive RAG pipeline — 6 steps",
    d: "Offline: (1) ingest, (2) chunk, (3) embed, (4) store in a vector DB. Online: (5) embed the question and retrieve similar chunks, (6) send chunks + question to the LLM to generate.",
    a: "A library. Offline you catalogue every book by topic. Online you find the right books, open the right pages, and write from them — you never memorise the whole library.",
    e: "A 500-page PDF becomes ~1,000 chunks. A question retrieves the best 5 chunks, not all 500 pages — so the answer arrives in seconds.",
    w: [
      ["Instagram source — RAG as a smart employee", "https://www.instagram.com/reel/DahGoZMg_rk/"],
      ["Instagram source — Naive vs correct pipeline", "https://www.instagram.com/reel/Dbv3_JBEuad/"],
      ["Instagram source — 500-page PDF in 2s", "https://www.instagram.com/reel/DfE8dlbpqJ7/"]
    ]
  },
  {
    n: "1.3",
    l: 1,
    t: "RAG vs fine-tuning vs long context",
    d: "RAG changes what the model knows at query time. Fine-tuning changes how the model behaves (style, format, skill). A long context window just lets you paste more text — it doesn't select, rank, or cite evidence.",
    a: "RAG = giving a cook the recipe book. Fine-tuning = training the cook's style. Long context = a bigger kitchen bench — the recipes still need finding.",
    e: "Leave changes 20 → 25 days. RAG: update one document, re-index, done. Fine-tuning: retrain, expensive and slow. Need citations? RAG wins even if you fine-tuned.",
    w: [
      ["Instagram source — Knowledge vs behaviour", "https://www.instagram.com/reel/DeM04phOlRx/"],
      ["Instagram source — The senior-candidate trap", "https://www.instagram.com/reel/DeKNxhrxWpE/"],
      ["Instagram source — Why RAG, not fine-tuning?", "https://www.instagram.com/reel/DeoHNiWTxi-/"]
    ]
  },
  {
    n: "1.4",
    l: 1,
    t: "LLM, RAG, Agent, MCP — the stack",
    d: "LLM = reasoning and language. RAG = LLM + your books (grounded, current). Agent = LLM + hands (plans, uses tools, acts). MCP = the standard wiring connecting agents to tools and data.",
    a: "Brain, brain + books, brain + hands, nervous system. Each layer adds a capability; none replaces the one below it.",
    e: "“What is our refund policy?” needs RAG. “Refund this order” needs an agent with tools. Both need the LLM underneath.",
    w: [
      ["Instagram source — Brain / books / hands / nerves", "https://www.instagram.com/p/DaO_0vrE54N/"]
    ]
  },
  {
    n: "1.5",
    l: 1,
    t: "Data ingestion & preprocessing",
    d: "Collect documents (PDFs, Word, web, Confluence, APIs, databases), clean them, and preserve structure — headings, tables, dates — as metadata. If this stage is broken, every later stage is broken.",
    a: "Cooking prep. You can't fix a dish made from spoiled ingredients by cooking it better. Parsing is the washing and chopping.",
    e: "A scanned PDF looks perfect on screen, but the parser skips its scanned pages. The evidence was never extracted — so nothing downstream can retrieve it.",
    w: [
      ["Instagram source — RAG topics, start to finish", "https://www.instagram.com/reel/DVyLV4WEhdv/"],
      ["Instagram source — “Vector DB” is half an answer", "https://www.instagram.com/reel/De4IoMSjrTD/"]
    ]
  },
  {
    n: "2.1",
    l: 2,
    t: "Chunking — why split at all?",
    d: "Split documents into small, self-contained, searchable units. Whole documents bury answers, blow up context windows, and dilute similarity scores. Chunks retrieve exact evidence.",
    a: "Cutting a textbook into flashcards. You don't hand someone the whole textbook for one question — you hand them the one card that answers it.",
    e: "200-page handbook, question: “Am I eligible for health insurance?” Good chunking retrieves the Eligibility section alone, not a 10-page wall of benefits text.",
    w: [
      ["Instagram source — Why chunk?", "https://www.instagram.com/reel/DeDdJQ-ibPF/"],
      ["Instagram source — RAG Splitter: Chunking", "https://www.instagram.com/reel/DdSsWcPAYtC/"]
    ]
  },
  {
    n: "2.2",
    l: 2,
    t: "Chunking strategies & overlap",
    d: "Fixed-size (simple, breaks meaning), recursive (paragraph → sentence → word, split only when over limit), token-based, sentence, semantic (topic change, expensive), structure-aware (headings, tables, code). Overlap repeats a little text across boundaries so a rule and its condition never separate.",
    a: "Cutting a cake. Fixed-size cuts blindly through a slice. Recursive cuts along natural lines. Overlap leaves frosting on both sides of the cut.",
    e: "“Refund within 30 days” in one chunk, “Only unopened products” in the next, no overlap → confidently wrong refund answer. A real documented case: a chunker split a table mid-row and diagnosis took 4 hours.",
    w: [
      ["Instagram source — Chunking Strategies", "https://www.instagram.com/reel/DdqXXtggY79/"],
      ["Instagram source — The refund-policy failure", "https://www.instagram.com/p/DYrg-G4FNfm/"]
    ]
  },
  {
    n: "2.3",
    l: 2,
    t: "Embeddings & similarity",
    d: "An embedding turns text into a vector so similar meanings sit close in vector space. The question is embedded with the same model; retrieval is similarity search — cosine (most common), dot product, or L2 distance.",
    a: "GPS coordinates for meaning. Two sentences about the same thing get nearby coordinates even with no shared words.",
    e: "“Why did our cloud bill go up?” finds “Compute expenditure increased 38% due to GPU workloads” — keyword search misses it, embedding search finds it.",
    w: [
      ["Instagram source — 8 Embedding Models", "https://www.instagram.com/reel/DfO1Aj-goqd/"]
    ]
  },
  {
    n: "2.4",
    l: 2,
    t: "Choosing an embedding model",
    d: "Judge on retrieval accuracy, latency, cost, language support, dimensions, and DB compatibility — tested on your questions. Bigger isn't automatically better. Domain-tuned models beat generic ones for specialised vocabulary.",
    a: "Choosing a translator. The most famous translator isn't best for a medical contract — you want the one who knows medical terms, fast, in budget.",
    e: "text-embedding-3-small for cheap/fast search; 3-large for best quality; BGE-small for local RAG; E5-large when you need query:/passage: prefixes. Test all on the same 100 questions.",
    w: [
      ["Instagram source — 8 Embedding Models compared", "https://www.instagram.com/reel/DfO1Aj-goqd/"]
    ]
  },
  {
    n: "2.5",
    l: 2,
    t: "Vector databases — five types",
    d: "(1) Specialised: Pinecone, Qdrant, Milvus. (2) Vector search engines: Weaviate. (3) Inside an existing DB: PostgreSQL + pgvector, MongoDB. (4) Search engines + vectors: Elasticsearch, OpenSearch. (5) In-memory libraries: FAISS — a library, not a full DB.",
    a: "A library catalogue vs a filing cabinet. A cabinet finds exact labels. A vector DB finds “books about this idea” even when the title words differ.",
    e: "Already on PostgreSQL? Start with pgvector. Need managed scale? Pinecone. Keyword + vector in one place? Elasticsearch. Prototyping? FAISS.",
    w: [
      ["Instagram source — Types of Vector DBs", "https://www.instagram.com/reel/De0tM-KgpNO/"],
      ["Instagram source — Top 50 Vector DB Qs", "https://www.instagram.com/reel/De4W7L9zUQU/"]
    ]
  }
];