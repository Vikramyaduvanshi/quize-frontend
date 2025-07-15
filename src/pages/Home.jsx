import "../index.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>🎯 Welcome to QuizMaster</h1>
        <p>Practice, Prepare, and Perform! Build and take quizzes to test your knowledge.</p>

        {/* <div className="home-buttons">
          <button onClick={() => navigate("/topics")}>📝 Create a Quiz</button>
          <button onClick={() => navigate("/quizzes")}>📚 Take a Quiz</button>
        </div> */}
      </div>

      {/* Optional: Add this if you want to show an image */}
      <div className="home-image">
        <img src="image/Asian family-bro.svg" alt="Quiz Banner" />
      </div>
    </div>
  );
}
