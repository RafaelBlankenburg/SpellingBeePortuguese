import React, { useEffect, useState } from 'react';
import './Game.css';

const Game: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [centerLetter, setCenterLetter] = useState('');
  const [userId, setUserId] = useState('');
  const [challengeId, setChallengeId] = useState('');
  const [userScore, setUserScore] = useState<number>(0);

  useEffect(() => {
    const fetchUserWords = async (userId: string, challengeId: string) => {
  try {
    console.log("cha: " + challengeId +"\nuse: " + userId);
    const res = await fetch(
      `http://localhost:4000/api/userwords?user_id=${userId}&challenge_id=${challengeId}`, 
      { method: 'GET' }
    );
    if (!res.ok) throw new Error('Erro ao buscar palavras');
    const words = await res.json(); 
    setFoundWords(words.map((w: { word: string }) => w.word.toUpperCase()));
  } catch (error) {
    console.error('Erro ao buscar palavras do usuário:', error);
  }
};
    const initializeGame = async () => {
      try {

        const storedUserId = localStorage.getItem('userId');
        let currentUserId = storedUserId;
        if (!storedUserId) {
          const userRes = await fetch('http://localhost:4000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          const userData = await userRes.json();
          currentUserId = userData.id as string; 
          localStorage.setItem('userId', currentUserId);
        }

        setUserId(currentUserId || '');
        const challengeRes = await fetch('http://localhost:4000/api/challenges', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const challengeData = await challengeRes.json();
        setChallengeId(challengeData.id);
        setLetters(challengeData.letters.split(''));
        setCenterLetter(challengeData.centerLetter);
        await fetchUserWords(currentUserId || '', challengeData.id);
      } catch (error) {
        console.error('Erro ao iniciar o jogo:', error);
      }
    };

    initializeGame();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toUpperCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed || foundWords.includes(trimmed)) return;
    setInputValue('');

    try {
      const res = await fetch(`http://localhost:4000/api/challenges/${challengeId}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: trimmed,
          user_id: userId
        })
      });

      if (!res.ok) throw new Error('Erro na validação');

      setFoundWords((prev) => [...prev, trimmed.toUpperCase()]);
    } catch (error) {
      console.error('Erro ao validar palavra:', error);
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
            {letters.length === 6 ? (
              <>
                <div className="hexagon top-left">{letters[0]}</div>
                <div className="hexagon top-right">{letters[1]}</div>

                <div className="hexagon mid-left">{letters[2]}</div>
                <div className="hexagon center">{centerLetter}</div>
                <div className="hexagon mid-right">{letters[3]}</div>

                <div className="hexagon bottom-left">{letters[4]}</div>
                <div className="hexagon bottom-right">{letters[5]}</div>
              </>
            ) : (
              <p>Carregando letras...</p>
            )}
          </div>

          <button onClick={shuffleLetters} className="reload-button">
            ↻
          </button>
        </div>

        <div className="game-section right-section">
          <div className="score-box">
            <h3>Pontuação</h3>
            <p>{userScore}</p>
          </div>

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