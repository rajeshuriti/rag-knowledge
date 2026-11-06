'use client';

import React, { useState, useEffect } from 'react';
import { LEVELS } from './data/levels';
import { CONCEPTS } from './data/concepts';
import { QUESTIONS } from './data/questions';

export default function Home() {
  const [doneSet, setDoneSet] = useState<Record<string, number>>({});
  const [activeLevel, setActiveLevel] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rag_doneSet');
      if (saved) setDoneSet(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleDone = (n: string) => {
    const next = { ...doneSet };
    if (next[n]) {
      delete next[n];
    } else {
      next[n] = 1;
    }
    setDoneSet(next);
    try {
      localStorage.setItem('rag_doneSet', JSON.stringify(next));
    } catch {}
  };

  const doneCount = Object.keys(doneSet).length;
  const progressPercent = (doneCount / CONCEPTS.length) * 100;

  return (
    <div>
      <header className="hero">
        <div className="wrap">
          <div className="hero-top">
            <span className="pill green">Start here • Read in order</span>
            <span className="pill">53 concepts</span>
            <span className="pill">7 levels</span>
            <span className="pill">71 Instagram source posts</span>
          </div>
          <h1>
            RAG, basic to <em>advanced</em> —<br />
            step by step.
          </h1>
          <p className="lede">
            Every concept in learning order, with what it is, a plain analogy, a worked example, and the original Instagram video that teaches it. Built from an Instagram RAG series plus a full Instagram RAG interview sweep. Don't jump to Agentic RAG until Levels 1–4 are solid — that's exactly where interviewers catch people.
          </p>
          <div className="stats">
            <div className="stat">
              <b>53</b>
              <span>Concepts, in order</span>
            </div>
            <div className="stat">
              <b>7</b>
              <span>Levels: basics → production</span>
            </div>
            <div className="stat">
              <b>20</b>
              <span>Eliminator interview questions</span>
            </div>
            <div className="stat">
              <b>100+</b>
              <span>Video &amp; post links</span>
            </div>
          </div>
          <div className="pipeline">
            <h3>The whole system in 6 steps — memorise this first</h3>
            <p>Offline you index. Online you retrieve and generate. Everything on this page is a deeper version of one of these steps.</p>
            <div className="steps">
              <div className="step">
                <b>01</b>
                <strong>Ingest</strong>
                <span>Collect &amp; clean PDFs, web, Confluence, APIs</span>
              </div>
              <div className="step">
                <b>02</b>
                <strong>Chunk</strong>
                <span>Split into small, self-contained pieces</span>
              </div>
              <div className="step">
                <b>03</b>
                <strong>Embed</strong>
                <span>Turn each chunk into a vector</span>
              </div>
              <div className="step">
                <b>04</b>
                <strong>Store</strong>
                <span>Vector DB + metadata &amp; permissions</span>
              </div>
              <div className="step">
                <b>05</b>
                <strong>Retrieve</strong>
                <span>Embed question, find &amp; rerank top chunks</span>
              </div>
              <div className="step">
                <b>06</b>
                <strong>Generate</strong>
                <span>LLM answers from evidence, with citations</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="toolbar">
        <div className="wrap">
          <div className="toolbar-inner">
            <div className="search">
              <input
                id="search"
                type="search"
                placeholder="Search concepts — try “chunking”, “HyDE”, “rerank”, “GraphRAG”…"
                aria-label="Search concepts"
                value={query}
                onChange={(e) => setQuery(e.target.value.toLowerCase().trim())}
              />
            </div>
            <div className="filters" id="filters">
              <button
                className={`fbtn ${activeLevel === 'all' ? 'active' : ''}`}
                onClick={() => setActiveLevel('all')}
              >
                All levels
              </button>
              {LEVELS.map((L) => (
                <button
                  key={L.id}
                  className={`fbtn ${activeLevel === String(L.id) ? 'active' : ''}`}
                  onClick={() => setActiveLevel(String(L.id))}
                >
                  L{L.id} {L.name}
                </button>
              ))}
            </div>
            <span className="progress" id="progressText">
              {doneCount} / {CONCEPTS.length} done
            </span>
          </div>
          <div className="progressbar">
            <i id="progressBar" style={{ width: `${progressPercent}%` }}></i>
          </div>
        </div>
      </div>

      <main className="wrap" id="app">
        {LEVELS.map((L) => {
          const levelConcepts = CONCEPTS.filter((c) => c.l === L.id);
          const visibleConcepts = levelConcepts.filter((c) => {
            const okL = activeLevel === 'all' || activeLevel === String(L.id);
            const searchStr = `${c.n} ${c.t} ${c.d} ${c.a} ${c.e}`.toLowerCase();
            const okQ = !query || searchStr.includes(query);
            return okL && okQ;
          });

          if (visibleConcepts.length === 0 && (activeLevel !== 'all' && activeLevel !== String(L.id))) {
            return null;
          }

          return (
            <section
              key={L.id}
              className={`level ${visibleConcepts.length === 0 ? 'hidden' : ''}`}
              data-level={L.id}
              id={`level-${L.id}`}
            >
              <div className="level-head">
                <div className="level-num" style={{ background: L.color }}>
                  {L.id}
                </div>
                <div>
                  <h2>
                    Level {L.id} — {L.name}
                  </h2>
                  <p>{L.sub}</p>
                </div>
              </div>
              <div className="cards">
                {levelConcepts.map((c) => {
                  const searchStr = `${c.n} ${c.t} ${c.d} ${c.a} ${c.e}`.toLowerCase();
                  const okL = activeLevel === 'all' || activeLevel === String(L.id);
                  const okQ = !query || searchStr.includes(query);
                  const show = okL && okQ;

                  return (
                    <article
                      key={c.n}
                      className={`card ${doneSet[c.n] ? 'done' : ''} ${!show ? 'hidden' : ''}`}
                      data-search={searchStr}
                    >
                      <div className="card-top">
                        <h3>
                          <span>Concept {c.n} · Level {L.id}</span>
                          {c.t}
                        </h3>
                        <button
                          className="done-btn"
                          type="button"
                          onClick={() => toggleDone(c.n)}
                        >
                          {doneSet[c.n] ? '✓ Done' : 'Mark done'}
                        </button>
                      </div>
                      <div className="label desc">Description</div>
                      <p>{c.d}</p>
                      <div className="label analogy">💡 Analogy</div>
                      <p>{c.a}</p>
                      <div className="label example">Example</div>
                      <p>{c.e}</p>
                      <div className="watch">
                        <span>▶ Watch — original video</span>
                        {c.w.map((w, idx) => (
                          <a key={idx} href={w[1]} target="_blank" rel="noopener">
                            {w[0]} ↗
                          </a>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      <section className="section">
        <div className="wrap">
          <h2>The 20 questions that appear everywhere</h2>
          <p>
            Multiple sources independently call these eliminators. If you can't answer all 20 out loud without notes, start here — they <em>are</em> the interview.
          </p>
          <div className="qgrid" id="qgrid">
            {QUESTIONS.map((q, i) => (
              <div className="q" key={i}>
                <b>Q{i + 1}</b>
                <strong>{q[0]}</strong>
                <p>{q[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Study roadmap — don't move on until you can do this</h2>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Level</th>
                  <th>Checkpoint</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><strong>Basics</strong></td>
                  <td>Explain RAG in 60 seconds, draw the 6-step pipeline, state RAG vs fine-tuning without hesitating</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><strong>Building blocks</strong></td>
                  <td>Choose a chunking strategy, embedding model, and vector DB for a given corpus — with reasons, not names</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><strong>Retrieval</strong></td>
                  <td>Design hybrid retrieval with filters, rewrite a vague query, explain HyDE's cost</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td><strong>Ranking &amp; generation</strong></td>
                  <td>Explain Retrieve → Rerank (bi vs cross), write a grounded prompt, handle old-vs-new policy correctly</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td><strong>Evaluation</strong></td>
                  <td>Build a golden set, name Recall@k / MRR / faithfulness, debug one failed question backwards out loud</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td><strong>Advanced</strong></td>
                  <td>Pick Graph vs Agentic vs ColPali vs vectorless for a scenario — and say when plain RAG is enough</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td><strong>Production</strong></td>
                  <td>Design 10M docs / &lt;2s / citations, with latency budget, freshness plan, permission tests, monitoring</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '14px' }}>
            <strong>30-minute drill:</strong> ① Read the 20 questions out loud. ② Pick your weakest topic and answer every question in it. ③ Whiteboard one system-design scenario — 10M docs / &lt;2s / citations recurs most.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Practice banks &amp; key sources</h2>
          <p>
            Counts are the sources' own claims. Most full answers sit behind a follow / comment / paid PDF — those PDFs are not reproduced here. Use these for revision <em>after</em> each level, not before.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Collection</th>
                  <th>Source</th>
                  <th>Focus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="https://www.instagram.com/p/DeefgGhAA9s/" target="_blank" rel="noopener">300 RAG Q&amp;A Handbook ↗</a></td>
                  <td>Instagram source</td>
                  <td>Fundamentals → security, the largest bank found</td>
                </tr>
                <tr>
                  <td><a href="https://www.instagram.com/p/Deb66XNgeHv/" target="_blank" rel="noopener">105 RAG Questions ↗</a></td>
                  <td>Instagram source</td>
                  <td>Pipeline, reranking, MRR / nDCG, faithfulness</td>
                </tr>
                <tr>
                  <td><a href="https://www.instagram.com/p/DemJUaIlKHM/" target="_blank" rel="noopener">72 Evaluation Questions ↗</a></td>
                  <td>Instagram source</td>
                  <td>Evaluation only: metrics, RAGAS, LLM-as-judge</td>
                </tr>
                <tr>
                  <td><a href="https://www.instagram.com/p/DeeEhg5DlxV/" target="_blank" rel="noopener">60 Agentic RAG Q&amp;A ↗</a></td>
                  <td>Instagram source</td>
                  <td>Planner, orchestration, LangGraph, loop safety</td>
                </tr>
                <tr>
                  <td><a href="https://www.instagram.com/reel/DevTS3sRcPf/" target="_blank" rel="noopener">50 Qs — Basics to Production ↗</a></td>
                  <td>Instagram source</td>
                  <td>7 sections, fundamentals to system design</td>
                </tr>
                <tr>
                  <td><a href="https://www.instagram.com/p/DeO-V41GOQ9/" target="_blank" rel="noopener">50 Qs with difficulty labels ↗</a></td>
                  <td>Instagram source</td>
                  <td>Junior / Mid / Senior / Staff + cheat sheet</td>
                </tr>
                <tr>
                  <td><a href="https://www.instagram.com/netsetostech" target="_blank" rel="noopener">Instagram source — Core RAG series ↗</a></td>
                  <td>Instagram source</td>
                  <td>20 core RAG reels + 7 carousels this guide is built on</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout" style={{ marginTop: '16px' }}>
            <strong>Production checklist — tape this to the wall:</strong> Permissions at retrieval (tested with a forbidden user) • Freshness: upsert + delete, never rebuild in place • Validity metadata on every chunk • Hybrid + rerank (retrieve ~20–100 → send 5) • Citations required, abstention tested • Golden set on every change • Monitor the full pipeline, not just the LLM.
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <strong style={{ color: 'var(--ink)' }}>Sources &amp; limits, plainly.</strong> Links go to the original Instagram posts as found on 2 Nov 2026 (20 reels, 21 Aug – 2 Nov 2026, plus 7 carousels; interview sweep: 71 posts). This is a synthesised study reference, not word-for-word transcripts. PDFs offered via comments on the source posts are not included. Instagram search is ranked, not a census — a post deleted or renamed after that date is outside this guide's control. Progress marks on this page live only in this session.
        </div>
      </footer>
    </div>
  );
}
