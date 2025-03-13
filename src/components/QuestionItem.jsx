import React, { useState } from 'react';

const QuestionItem = ({ question, onSelectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleSelect = (option) => {
    setSelectedAnswer(option);
    onSelectAnswer(question.id, option);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{question.question}</h3>
      {question.options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => handleSelect(option)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default QuestionItem;