import { useState } from 'react';

function App() {
  const [challenge, setChallenge] = useState<any>(null);

  const createChallenge = async () => {
    try {
      const response = await fetch('/api/challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), 
      });

      if (!response.ok) throw new Error('Erro ao criar challenge');

      const data = await response.json();
      setChallenge(data);
    } catch (error) {
      console.error('Erro ao criar challenge:', error);
    }
  };

  return (
    <div>
      <button onClick={createChallenge}>Criar Challenge</button>
      {challenge && (
        <pre>{JSON.stringify(challenge, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
