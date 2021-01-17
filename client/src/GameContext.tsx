import { createContext, useState } from 'react';
import { fetchApi } from './api';
import { IQuizQuestions } from './ResponseApiModels';

interface IGame {
  quiz: IQuizQuestions;
  data: {
    question: number;
    answers: number[];
  }[];
}

interface IGameContext {
  game?: IGame;
  gameStarted: boolean;
  startGame(code: string): Promise<boolean>;
  endGame(): void;
  error: boolean;
  errorMessage: string;
}

const defaultValue: IGameContext = {
  game: undefined,
  gameStarted: false,
  startGame: (code: string) => new Promise((resolve) => resolve(false)),
  endGame: () => void 0,
  error: false,
  errorMessage: '',
};

export const gameContext = createContext<IGameContext>(defaultValue);

const { Provider } = gameContext;

interface IContextProviderProps {
  children?: React.ReactNode;
}

export function GameContextProvider({ children }: IContextProviderProps) {
  const [game, setGame] = useState<IGame>();
  const [gameStarted, setGameStarted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [code, setCode] = useState<string>('');

  const saveQuiz = () => {
    sessionStorage.setItem(code, JSON.stringify(game));
  };

  const loadQuiz = async (): Promise<boolean> => {
    const quizString = sessionStorage.getItem(code);

    if (quizString) {
      setGame(JSON.parse(quizString) as IGame);
      return true;
    } else {
      const url = `/quiz/${code}`;
      try {
        const response = await fetchApi<IQuizQuestions>(url);

        setGame({
          quiz: response,
          data: [],
        });

        saveQuiz();
        return true;
      } catch (e) {
        setError(true);
        setErrorMessage(e.message);
      }
    }

    return false;
  };

  const startGame = async (code: string): Promise<boolean> => {
    setCode(code);
    setGameStarted(true);
    return await loadQuiz();
  };

  const endGame = () => {
    setGameStarted(false);
    setCode('');
    sessionStorage.removeItem(code);
  };

  return (
    <Provider
      value={{ game, gameStarted, startGame, endGame, error, errorMessage }}
    >
      {children}
    </Provider>
  );
}
