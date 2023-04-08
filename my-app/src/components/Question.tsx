import React, { useState, useEffect } from 'react';
import "./Question.css"

type Props = {
  imageUrl: string;
  title: string;
  answers: string[];
  correctAnswer: string;
  pointsPerQuestion: number;
  bonusPointsPerSecond: number;
  timePerQuestion: number;
  questionIndex: number;
  totalQuestions: number;
  onAnswerSelected: (isCorrect: boolean, pointsEarned: number) => void;
  onQuestionComplete: () => void;
};

const Question: React.FC<Props> = ({
  imageUrl,
  title,
  answers,
  correctAnswer,
  pointsPerQuestion,
  bonusPointsPerSecond,
  timePerQuestion,
  questionIndex,
  totalQuestions,
  onAnswerSelected,
  onQuestionComplete
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(timePerQuestion);
  const [isAnswered, setIsAnswered] = useState(false);
  const [didTimerRunOut, setDidTimerRunOut] = useState(false);
  let timer: any;
  const [pointsEarned, setPointsEarned] = useState<number>(0);


  useEffect(() => {
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setSelectedAnswer(null);
      setIsAnswered(true);
      setDidTimerRunOut(true);
      // const pointsEarned = pointsPerQuestion;
      onAnswerSelected(false, pointsEarned);
    }

    return () => clearInterval(timer);
  }, [timeRemaining, correctAnswer, pointsPerQuestion, onAnswerSelected]);

  const handleAnswerSelected = (answer: string) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      clearInterval(timer);
      
      const isCorrect = answer === correctAnswer;
      const timeLeft = timeRemaining > 0 ? timeRemaining : 0;
      const pointsEarned = isCorrect
        ? pointsPerQuestion + timeLeft * bonusPointsPerSecond
        : 0;
      setPointsEarned(pointsEarned);
      onAnswerSelected(isCorrect, pointsEarned);
    }
  };

  const progress = Math.round((questionIndex + 1) / totalQuestions * 100);

  return (
    <div>
      <img src={imageUrl} alt={title} className="question-image" width="300" height="200" />
      <h2>{title}</h2>
      <div className="answers-container">
        {answers.map((answer) => (
          <button key={answer} onClick={() => handleAnswerSelected(answer)} style={{ width: "35%", marginBottom: "10px" }}>
            {answer}
          </button>
        ))}
      </div>

      <p>Time remaining: {timeRemaining}</p>
      {didTimerRunOut ? (
        <p>
          The correct answer: {correctAnswer}
        </p>
      ) : selectedAnswer !== null && (
        <div>
          <p>
            Your answer: {selectedAnswer} (
            {selectedAnswer === correctAnswer ? 'correct' : 'incorrect'})
          </p>
          {selectedAnswer !== correctAnswer && (
            <p>
              The correct answer: {correctAnswer}
            </p>
          )}
        </div>
      )}
      {isAnswered && (
        <div>
          <button onClick={() => onQuestionComplete()}>Next</button>
          <p>Points Earned: {pointsEarned}</p>
        </div>
      )}

      <p>Question {questionIndex + 1} of {totalQuestions}</p>
        <div className="progress-bar-outer">
          <div className="progress-bar-inner" style={{width: `${progress}%`}}>{progress}%</div>
        </div>
    </div>
  );
};

export default Question;
