export interface QuizData {
    questions: QuestionData[];
    pointsPerQuestion: number;
    bonusPointsPerSecond: number;
    timePerQuestion: number;
  }
  
  export interface QuestionData {
    imageUrl: string;
    title: string;
    answers: string[];
    correctAnswer: string;
    time: number;
  }
  
  export interface Answer {
    text: string;
    isCorrect: boolean;
    isSelected: boolean;
  }
  