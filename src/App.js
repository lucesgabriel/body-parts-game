import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import './App.css';
import BodyImage from './components/Game/BodyImage';
import { bodyParts, quizMessages } from './constants/bodyParts';
import { useAudio } from './hooks/useAudio';
import ProgressBar from './components/ProgressBar';

const GameContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
`;

const QuizContainer = styled.div`
  text-align: center;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(4px);
  max-width: 600px;
`;

const Message = styled.p`
  font-size: 24px;
  color: ${props => props.isCorrect ? '#27ae60' : '#e74c3c'};
  margin: 15px 0;
  font-weight: 600;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Button = styled.button`
  background: ${props => props.primary ? '#3498db' : '#e74c3c'};
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  margin: 10px;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    background: ${props => props.primary ? '#2980b9' : '#c0392b'};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Instructions = styled.p`
  font-size: 1.2em;
  color: #34495e;
  margin: 20px 0;
  line-height: 1.6;
  font-family: 'Poppins', sans-serif;
`;

const Score = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  color: #2c3e50;
  z-index: 1000;
`;

function App() {
  const [quizMode, setQuizMode] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [message, setMessage] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const { playAudio, stopAudio } = useAudio();

  const getRandomMessage = (messages) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const startQuiz = () => {
    setQuizMode(true);
    setCorrectAnswers(0);
    selectNewTarget();
  };

  const selectNewTarget = useCallback(() => {
    const randomPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];
    setCurrentTarget(randomPart.id);
    setMessage(`Find the ${randomPart.name}!`);
  }, []);

  const handlePartClick = (part) => {
    stopAudio();

    if (!quizMode) {
      playAudio(part.name);
      return;
    }

    const isCorrect = part.id === currentTarget;
    
    if (isCorrect) {
      // Aseguramos que no exceda el total de partes
      setCorrectAnswers(prev => Math.min(prev + 1, bodyParts.length));
      playAudio(`Correct! That's the ${part.name}`);
      setMessage(getRandomMessage(quizMessages.correct));
      
      // Si completamos todas las partes
      if (correctAnswers + 1 >= bodyParts.length) {
        setTimeout(() => {
          playAudio('Congratulations! You have learned all body parts!');
          setMessage('Congratulations! You have learned all body parts!');
          setQuizMode(false);
          setCorrectAnswers(0); // Reiniciamos para la próxima ronda
        }, 1500);
      } else {
        setTimeout(() => {
          selectNewTarget();
        }, 2000);
      }
    } else {
      playAudio(`That's the ${part.name}. Try to find the ${bodyParts.find(p => p.id === currentTarget).name}`);
      setMessage(`That's the ${part.name}. Try to find the ${bodyParts.find(p => p.id === currentTarget).name}!`);
    }
  };

  return (
    <GameContainer>
      <Header>Learn Body Parts!</Header>
      
      {!quizMode && (
        <div style={{ textAlign: 'center' }}>
          <p>Click on body parts to learn their names!</p>
          <Button onClick={startQuiz}>Start Quiz Mode</Button>
        </div>
      )}

      {quizMode && (
        <QuizContainer>
          <Message isCorrect={quizMessages.correct.includes(message)}>
            {message}
          </Message>
          <Button onClick={() => {
            setQuizMode(false);
            setCorrectAnswers(0);
          }}>Exit Quiz</Button>
        </QuizContainer>
      )}

      <BodyImage 
        onPartClick={handlePartClick}
        quizMode={quizMode}
        currentTarget={currentTarget}
      />

      {quizMode && (
        <ProgressBar 
          correct={correctAnswers} 
          total={bodyParts.length} 
        />
      )}
    </GameContainer>
  );
}

export default App;
