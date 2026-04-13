import React from 'react';
import Layout from '@theme/Layout';

function Home(): React.JSX.Element {
  return (
    <Layout title="Home" description="A real-time AI oversight system that turns chatbot failures into immediate interventions instead of post-mortems.">
      <header className="hero">
        <div className="container">
          <h1 className="hero__title">oversight</h1>
          <p className="hero__catchline">
            A real-time AI oversight system that turns chatbot failures into
            immediate interventions instead of post-mortems.
          </p>

          <div className="hero__video">
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/jjpF-YybdQc?rel=0&modestbranding=1"
                title="Oversight Promotional Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="hero__description">
            <p>
              Picture this: In a world where you're constantly dealing with chatbots, what if
              you could have oversight and intervene as soon as the chatbot goes off the rails?
            </p>
            <p>
              Oversight is a web application for AI conversation quality assurance. Analysts
              upload chatbot conversation logs or watch live sessions and get automated detection
              of hallucinations, bias, and toxicity — powered by Google Gemini and Groq Llama.
            </p>
            <p>
              Every assistant message is checked in real time. Sessions that cross a violation
              threshold are automatically escalated to a human agent and the analyst is alerted
              by email. The result is an audit trail with per-turn flagged issues, confidence
              scores, and trend analytics across all monitored conversations.
            </p>
          </div>
        </div>
      </header>
    </Layout>
  );
}

export default Home;
