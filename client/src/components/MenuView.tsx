import { useContext } from 'react';
import { gameContext } from '../GameContext';
import QuizList from './QuizList';
import StartQuiz from './StartQuiz';

const MenuView = () => {
  const { gameStarted } = useContext(gameContext);

  return (
    <>
      {!gameStarted && (
        <>
          <QuizList />
          <StartQuiz />
        </>
      )}

      {gameStarted && <h1>XD</h1>}
    </>
  );
};

export default MenuView;
