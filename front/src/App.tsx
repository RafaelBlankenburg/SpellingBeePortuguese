import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };

  return (
    <div className="container">
    <div className="page">
      <div className="black-bar left" />
      <div className="content">
        <h1 className="title">Bem vindo ao</h1>
        <h2 className="subtitle">ComBe</h2>
        <button className="start-button" onClick={handleStart}>INICIAR</button>
      </div>
      <div className="black-bar right" />
    </div>
  
    </div>
  );
}

export default App;
