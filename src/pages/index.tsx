import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function Home(): React.JSX.Element {
  return (
    <Layout title="Home" description="AI Chatbot Conversation Quality Assurance">
      <header className="hero">
        <div className="container">
          <h1 className="hero__title">Oversight</h1>
          <p className="hero__subtitle">
            by The pAInters
          </p>
          <p style={{maxWidth: 640, margin: '1rem auto', fontSize: '1.1rem', lineHeight: 1.7}}>
            Oversight is a web application for AI conversation quality assurance. Analysts upload
            chatbot conversation logs or watch live sessions and get automated detection of
            hallucinations, bias, and toxicity — powered by Google Gemini and Groq Llama. Every
            assistant message is checked in real time; sessions that cross a violation threshold are
            automatically escalated to a human agent and the analyst is alerted by email. The result
            is an audit trail with per-turn flagged issues, confidence scores, and trend analytics
            across all monitored conversations.
          </p>

          <div className="video-placeholder">
            <p><strong>Promotional Video</strong></p>
            <p>TODO: Replace with YouTube embed once video is ready</p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Hallucination Detection</h3>
              <p>
                Detect fabricated citations, self-contradictions, overconfident claims, and hardcoded
                facts in AI assistant responses with configurable analysis providers.
              </p>
            </div>
            <div className="feature-card">
              <h3>Bias & Toxicity Analysis</h3>
              <p>
                Identify gender, racial, and age bias alongside hostile language, condescension, and
                inappropriate content with per-turn confidence scoring.
              </p>
            </div>
            <div className="feature-card">
              <h3>Live Chat Monitoring</h3>
              <p>
                Monitor customer chatbot conversations in real time. Violations automatically escalate
                to a live agent, end the session, and alert analysts via email.
              </p>
            </div>
          </div>

          <div className="cta-buttons">
            <Link className="button button--primary button--lg" to="/docs/setup">
              Setup Guide
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/getting-started">
              Getting Started
            </Link>
            <Link className="button button--secondary button--lg" href="https://the-painters-product.vercel.app">
              Try the Live App
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}

export default Home;
