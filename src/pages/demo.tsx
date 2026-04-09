import React from 'react';
import Layout from '@theme/Layout';

function Demo(): React.JSX.Element {
  return (
    <Layout title="Demo" description="Watch Oversight in action">
      <div className="container" style={{padding: '2rem 0'}}>
        <h1>Demo & Tutorial</h1>
        <p>
          Watch a complete walkthrough of Oversight — from uploading your first conversation file
          to interpreting analysis results and monitoring live chat sessions.
        </p>

        <h2>Tutorial Video</h2>
        <p>
          This walkthrough covers installation through core usage. After watching, you should be
          able to go from zero to completing the primary workflow without additional documentation.
        </p>

        <div className="video-placeholder">
          <p><strong>Tutorial / Demo Video</strong></p>
          <p>TODO: Replace with YouTube embed once video is ready</p>
        </div>
      </div>
    </Layout>
  );
}

export default Demo;
