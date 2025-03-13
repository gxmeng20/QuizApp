// 获取题目数据
export const fetchQuestions = async () => {
  const response = await fetch('/api/questions');
  const text = await response.text();
  console.error("text:"+ text);
  console.error("res:"+ JSON.stringify( response));
  if (!response.ok) {
    console.error("not ok");
    throw new Error('无法获取题目数据');
  } else {
    console.error("ok!");
  }

  //return response.json();
  return JSON.parse(text);
};

// 更新题目统计数据
export const updateQuestionStats = async (questionId, isCorrect) => {

  const response = await fetch('/api/questions/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questionId, isCorrect }),
  });
  if (!response.ok) {
    throw new Error('无法更新题目数据');
  }
  return response.json();
};