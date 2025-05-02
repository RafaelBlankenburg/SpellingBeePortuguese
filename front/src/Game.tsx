import React, { useState } from 'react';
import './Game.css';

const Game: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>(['C', 'O', 'M', 'B', 'E', 'R']);
  const [centerletter] = useState<string[]>(['A']);

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
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
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
          <div className="hexagon center">{centerletter[0]}</div>
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