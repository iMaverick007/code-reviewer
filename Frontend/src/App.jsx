import { useState, useEffect } from "react";
import axios from "axios";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import "./App.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const App = () => {
  const [code, setCode] = useState(`function sum() { return a + b; }`);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false); 

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    setDisabled(true); 
    try {
      const response = await axios.post('https://code-reviewer-backend-rqyb.onrender.com/ai/get-review', { code });
      setReview(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to get code review. Please try again later.");
      setReview("");
    }
    setLoading(false);
    setDisabled(false); 
  }

  return (
    <main className="container">
      <div className="editor-container">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => prism.highlight(code, prism.languages.javascript, 'javascript')}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            border: "1px solid #ddd",
            borderRadius: "5px",
            height: "100%",
            width: "100%",
          }}
        />
        <button 
          onClick={reviewCode} 
          className="review-button" 
          disabled={disabled}
        >
          Review
        </button>
        {loading && <div className="loader">Loading...</div>}
      </div>
      <div className="review-container">
        {error && <div className="error-message">{error}</div>}
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
};

export default App;