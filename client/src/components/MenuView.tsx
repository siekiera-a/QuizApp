import { useContext } from 'react';
import { gameContext, State } from '../GameContext';
import Game from './Game';
import QuizList from './QuizList';
import StartQuiz from './StartQuiz';

const MenuView = () => {
  const { gameState } = useContext(gameContext);

  return (
    <div className={'box'}>
      {gameState === State.NotStarted && (
        <>
          <QuizList />
          <StartQuiz />
        </>
      )}

      {gameState === State.InProgress && <Game />}
    </div>
  );
};

export default MenuView;
