import React from 'react';

const Result = ({ score, total, questions }) => {
  return (
    <div>
      <h2>答题结果</h2>
      <p>你的得分是: {score} / {total}</p>
      <h3>每道题目的答题情况：</h3>
      {questions.map((question) => (
        <div key={question.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h4>{question.question}</h4>
          <p>正确答案: {question.answer}</p>
          <p>做对次数: {question.correctCount}</p>
          <p>做错次数: {question.wrongCount}</p>
        </div>
      ))}
    </div>
  );
};

export default Result;