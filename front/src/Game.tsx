import React, { useEffect, useState } from 'react';
import './Game.css';

const Game: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [originalLetters, setOriginalLetters] = useState<string[]>([]);
  const [centerLetter, setCenterLetter] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [challengeId, setChallengeId] = useState<string | null>(null);

  useEffect(() => {
    const initializeGame = async () => {
      try {
        // Cria o usuário
        const userRes = await fetch('http://localhost:4000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const userData = await userRes.json();
        setUserId(userData.id);

        // Cria o desafio
        const challengeRes = await fetch('http://localhost:4000/api/challenges', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        
        const challengeData = await challengeRes.json();
        setChallengeId(challengeData.id);
        console.log('User response:', userData);
        console.log('Challenge response:', challengeData);

        const splitLetters = challengeData.letters.split('');
        setOriginalLetters(splitLetters);
        setLetters(splitLetters);
        setCenterLetter(challengeData.centerLetter);
      } catch (error) {
        console.error('Erro ao iniciar o jogo:', error);
      }
    };

    initializeGame();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !foundWords.includes(inputValue)) {
      setFoundWords([...foundWords, inputValue]);
      setInputValue('');
    }
  };

  const shuffleLetters = () => {
    const shuffled = [...originalLetters].sort(() => Math.random() - 0.5);
    setLetters(shuffled);
  };

  return (
    <div className="game-container">
      <div className="top-bar">
        <div className="top-bar-corner"></div>
        <h1>ComBe</h1>
        <div className="top-bar-corner"></div>
      </div>

      <div className="main-content">
        <div className="game-section left-section">
          <form onSubmit={handleSubmit} className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Comece a digitar."
              className="input-field"
            />
          </form>

          <div className="hexagon-container">
            <div className="hexagon top-left">{letters[0]}</div>
            <div className="hexagon top-right">{letters[1]}</div>

            <div className="hexagon mid-left">{letters[2]}</div>
            <div className="hexagon center">{centerLetter}</div>
            <div className="hexagon mid-right">{letters[3]}</div>

            <div className="hexagon bottom-left">{letters[4]}</div>
            <div className="hexagon bottom-right">{letters[5]}</div>
          </div>

          <button onClick={shuffleLetters} className="reload-button">
            ↻
          </button>
        </div>

        <div className="game-section right-section">
          <div className="found-words-container">
            <h3>Palavras encontradas:</h3>
            <div className="found-words-list">
              {foundWords.length > 0 ? (
                <ul>
                  {foundWords.map((word, index) => (
                    <li key={index}>{word}</li>
                  ))}
                </ul>
              ) : (
                <p className="empty-message">Nenhuma palavra ainda</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
