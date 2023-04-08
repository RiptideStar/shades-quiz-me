import React, { useState } from 'react';
import Question from './Question';
import { QuizData } from '../types';

interface Props {
  data: QuizData;
}

function Quiz(props: Props) {
  const { data } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswer = (isCorrect: boolean, pointsEarned: number) => {
    const score = isCorrect
      ? pointsEarned
      : 0;
    setTotalScore(totalScore + score);
    // setCurrentIndex(currentIndex + 1);
  };

  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setTotalScore(0);
  };

  const handleOnQuestionComplete = () => {
      setCurrentIndex(currentIndex + 1);
  }

  const currentQuestion = data.questions[currentIndex];

  return (
    <div>
      {currentIndex < data.questions.length ? (
        <Question
          key={currentIndex}
          imageUrl={currentQuestion.imageUrl}
          title={currentQuestion.title}
          answers={currentQuestion.answers}
          pointsPerQuestion={data.pointsPerQuestion}
          bonusPointsPerSecond={data.bonusPointsPerSecond}
          correctAnswer={currentQuestion.correctAnswer}
          timePerQuestion={data.timePerQuestion}
          questionIndex={currentIndex}
          totalQuestions={data.questions.length}
          onAnswerSelected={handleAnswer}
          onQuestionComplete={handleOnQuestionComplete}
        />
      ) : (
        <div>
          <h1>Your score: {totalScore}</h1>
          <button onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
