import React, { useState } from 'react';
import Quiz from './components/Quiz';
import { QuizData } from './types';

const defaultQuizData: QuizData = {
  questions: [
    {
      imageUrl: 'https://i.gocollette.com/img/destination-page/europe/france/france-ms1.jpg?h=720&w=1280&la=en-AU',
      title: 'What is the capital of France?',
      answers: ['Paris', 'London', 'Rome', 'Berlin'],
      correctAnswer: 'Paris',
      time: 15
    },
    {
      imageUrl: 'https://www.hdwallpapers.in/download/dolomites_mountains_4k-wide.jpg',
      title: 'What is the highest mountain in the world?',
      answers: ['Mount Kilimanjaro', 'Mount Everest', 'Mount Denali', 'Mount Fuji'],
      correctAnswer: 'Mount Everest',
      time: 15
    },
    {
      imageUrl: 'https://th.bing.com/th/id/R.77f7b98d95daf8cdbf8c29bc0de5d429?rik=WaNYXoGpuQPLcA&riu=http%3a%2f%2fimages.all-free-download.com%2fimages%2fgraphiclarge%2fnatures_own_stripes_513169.jpg&ehk=v814uQTnqy0oecazvS53MYsFs0P3d%2fiuPvNZsp6Abgw%3d&risl=&pid=ImgRaw&r=0',
      title: 'What is the largest country in the world?',
      answers: ['Russia', 'China', 'USA', 'Canada'],
      correctAnswer: 'Russia',
      time: 15
    },
  ],
  pointsPerQuestion: 10,
  bonusPointsPerSecond: 5,
  timePerQuestion: 15,
};

const App: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        setQuizData(json);
      } catch (error) {
        console.error(error);
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const startDefaultQuiz = () => {
    setQuizData(defaultQuizData);
  };

  return (
    <div>
      {!quizData && (
        <div>
          <h1>Welcome to the Quiz!</h1>
          <button onClick={startDefaultQuiz}>Play Default Quiz</button>
          <div>
            <label htmlFor="file-upload">Upload a JSON file:</label>
            <input id="file-upload" type="file" accept=".json" onChange={handleFileUpload} />
          </div>
        </div>
      )}
      {quizData && <Quiz data={quizData} />}
    </div>
  );
};

export default App;
