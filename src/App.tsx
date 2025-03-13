import React, { useState, useEffect } from "react";
import axios from "axios";
type Question = { id: number; text: string ,options:[],correctCount:number,question:string,wrongCount:number,tags:[]};
type Result = {isCorrect:boolean,correctAnswer:string,userAnswer:string,question:string}
const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");
  const [newTag, setNewTag] = useState("");
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<Result[]>([]);

  // 获取题目数据
  useEffect(() => {
    axios.get("/api/questions")
      .then(response => setQuestions(response.data))
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  // 根据标签过滤题目
  useEffect(() => {
    const url = selectedTag === "All"
      ? "/api/questions"
      : `/api/questions/filter?tag=${selectedTag}`;

    axios.get(url)
      .then(response => setQuestions(response.data))
      .catch(error => console.error("Error filtering questions:", error));
  }, [selectedTag]);

  // 处理用户答题
  const handleAnswer = (questionId:any, answer:any) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  // 提交答案并计分
  const handleSubmit = () => {
    axios.post("/api/submit", { answers: userAnswers })
      .then(response => {
        setScore(response.data.score);
        setResults(response.data.results);
        //setQuestions(response.data.questions); // 更新题目数据（包括答对答错次数）
        setShowResult(true);
      })
      .catch(error => console.error("Error submitting answers:", error));
  };

  // 添加新标签
  const handleAddTag = (questionId:any) => {
    if (newTag.trim() === "") return;
    axios.post(`/api/questions/${questionId}/tags`, { tag: newTag })
      .then(response => {
        console.error(response);
       // setQuestions(questions.map(q => q.id === questionId ? response.data : q));
        setNewTag("");
      })
      .catch(error => console.error("Error adding tag:", error));
  };

  // 重新开始
  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResult(false);
    setScore(0);
    setResults([]);
  };

  console.error(questions);

  if (questions == null)
  {
    return <div>Loading...</div>;
  }
  if (questions.length === 0) return <div>Loading...</div>;


  return (
    <div className="app">
      <h1>Quiz System</h1>
      <div className="tag-filter">
        <h3>Filter by Tag:</h3>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="All">All</option>
          {Array.from(new Set(questions.flatMap(q => q.tags))).map((tag, index) => (
            <option key={index} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {showResult ? (
        <div className="result">
          <h2>Your Score: {score}/{questions.length}</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <p><strong>Question:</strong> {result.question}</p>
                <p><strong>Your Answer:</strong> {result.userAnswer}</p>
                <p><strong>Correct Answer:</strong> {result.correctAnswer}</p>
                <p><strong>Result:</strong> {result.isCorrect ? "Correct" : "Incorrect"}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question">
          <h2>{questions[currentQuestion].question}</h2>
          <p>
            Correct: {questions[currentQuestion].correctCount} | Incorrect: {questions[currentQuestion].wrongCount}
          </p>
          <ul>
            {questions[currentQuestion].options.map((option:any, index:any) => (
              <li key={index}>
                <button onClick={() => handleAnswer(questions[currentQuestion].id, option)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <div className="add-tag">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter a new tag"
            />
            if （questions[currentQuestion]）{
              <button onClick={() => handleAddTag(questions[currentQuestion].id)}>
                Add Tag
              </button>
            }
            
          </div>
          <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
            Next Question
          </button>
          {currentQuestion === questions.length - 1 && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;