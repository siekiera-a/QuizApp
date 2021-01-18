import { createContext, useState } from 'react';
import { fetchApi, fetchPostApi } from './api';
import { IAnswerData, IAnswerRequest } from './RequestApiModels';
import {
  IQuestion,
  IQuizQuestions,
  ISubmitResponse,
} from './ResponseApiModels';

interface IGame {
  quiz: IQuizQuestions;
  data: IAnswerData[];
  state: State;
}

export enum State {
  NotStarted,
  InProgress,
}

interface IGameContext {
  game?: IGame;
  gameState: State;
  startGame(code: string): Promise<boolean>;
  endGame(): void;
  error: boolean;
  errorMessage: string;
  answerTheQuestion(id: number, answers: number[]): void;
  hasNextQuestion(): boolean;
  getQuestion(): Promise<IQuestion | undefined>;
  clearErrors(): void;
  submitAnswers(user: string): Promise<ISubmitResponse | undefined>;
}

const defaultValue: IGameContext = {
  game: undefined,
  gameState: State.NotStarted,
  startGame: (code: string) => new Promise((resolve) => resolve(false)),
  endGame: () => void 0,
  error: false,
  errorMessage: '',
  answerTheQuestion: (id: number, answers: number[]) => void 0,
  hasNextQuestion: () => false,
  getQuestion: () => new Promise((resolve, reject) => resolve(undefined)),
  clearErrors: () => void 0,
  submitAnswers: (user: string) =>
    new Promise((resolve, reject) => resolve(undefined)),
};

export const gameContext = createContext<IGameContext>(defaultValue);

const { Provider } = gameContext;

interface IContextProviderProps {
  children?: React.ReactNode;
}

const saveQuiz = (code: string, game: IGame) => {
  sessionStorage.setItem(code, JSON.stringify(game));
};

let questionNumber = 0;
let code: string = '';

export function GameContextProvider({ children }: IContextProviderProps) {
  const [game, setGame] = useState<IGame>();
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const loadQuiz = async (): Promise<boolean> => {
    const quizString = sessionStorage.getItem(code);

    if (quizString) {
      const g = JSON.parse(quizString) as IGame;
      g.data = [];
      g.state = State.InProgress;
      setGame(g);
      saveQuiz(code, g);
      return true;
    } else {
      const url = `/quiz/${code}`;
      try {
        const response: IQuizQuestions = await fetchApi<IQuizQuestions>(url);

        const g = {
          quiz: response,
          data: [],
          state: State.InProgress,
        };

        setGame(g);
        saveQuiz(code, g);
        return true;
      } catch (e) {
        setError(true);
        setErrorMessage(e.message);
      }
    }

    return false;
  };

  const startGame = async (gameCode: string): Promise<boolean> => {
    code = gameCode;
    const loaded = await loadQuiz();
    questionNumber = 0;
    return loaded;
  };

  const endGame = () => {
    setError(false);
    setErrorMessage('');
    setGame(undefined);
    sessionStorage.removeItem(code);
    code = '';
  };

  const getQuestion = async (): Promise<IQuestion | undefined> => {
    if (!hasNextQuestion()) {
      return undefined;
    }

    const url = `/quiz/question/${game?.quiz.questions[questionNumber]}`;
    try {
      return await fetchApi<IQuestion>(url);
    } catch (e) {
      setError(true);
      setErrorMessage(e.message);
      return undefined;
    }
  };

  const hasNextQuestion = (): boolean => {
    if (!game || questionNumber >= game.quiz.questions.length) {
      return false;
    }

    return true;
  };

  const answerTheQuestion = (id: number, answers: number[]) => {
    if (game) {
      const newGame: IGame = {
        quiz: game.quiz,
        data: [
          ...game.data.filter((x) => x.question !== id),
          { question: id, answers },
        ],
        state: game.state,
      };

      setGame(newGame);
      saveQuiz(code, newGame);
      questionNumber++;
    }
  };

  const submitAnswers = async (
    user: string
  ): Promise<ISubmitResponse | undefined> => {
    if (game && user.length > 0) {
      const url = `/submit/${game.quiz.id}`;
      const requestData: IAnswerRequest = {
        user,
        data: game.data,
      };
      try {
        const response = await fetchPostApi<ISubmitResponse>(url, requestData);
        return response;
      } catch (e) {
        setError(true);
        setErrorMessage(e.message);
      }
    }
    return undefined;
  };

  const clearErrors = () => {
    setError(false);
    setErrorMessage('');
  };

  return (
    <Provider
      value={{
        game,
        gameState: game?.state || State.NotStarted,
        startGame,
        endGame,
        error,
        errorMessage,
        getQuestion,
        hasNextQuestion,
        answerTheQuestion,
        clearErrors,
        submitAnswers,
      }}
    >
      {children}
    </Provider>
  );
}
