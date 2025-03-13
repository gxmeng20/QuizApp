import React from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = ({ questions, onSelectAnswer, onSubmit }) => {
  if (null !=questions)  
  {
    console.error("11111 questions:"+questions);
   // q = JSON.parse(questions);
    //console.error("11111 q:"+q);
    return (
      <div>
        {
        
        questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onSelectAnswer={onSelectAnswer}
          />
        ))}
        <button onClick={onSubmit}>提交答案</button>
      </div>
    );
  } 
  else
  { 
    return (
      <div>
       
      </div>
    );
  }
};

export default QuestionList;