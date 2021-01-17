import { CircularProgress, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { fetchApi } from '../api';
import { IError, IQuestion, IQuizQuestions } from '../ResponseApiModels';
import Question from './Question';

interface IParams {
  code: string;
  question: string;
}

interface IQuizStorage {
  quiz: IQuizQuestions;
  data: {
    question: number;
    answers: number[];
  }[];
}

const getQuestions = async (code: string): Promise<IQuizQuestions | IError> => {
  const url = `/quiz/${code}`;
  try {
    const response = await fetchApi<IQuizQuestions>(url);
    return response;
  } catch (e) {
    return { message: e.message };
  }
};

const getQuestion = async (id: number): Promise<IQuestion | IError> => {
  const url = `/quiz/question/${id}`;

  try {
    const response = await fetchApi<IQuestion>(url);
    return response;
  } catch (e) {
    return { message: e.message };
  }
};

const useStyles = makeStyles({
  center: {
    textAlign: 'center',
  },
});

const Game = ({
  match: {
    params: { code, question },
  },
}: RouteComponentProps<IParams>) => {
  const history = useHistory();
  const classes = useStyles();

  const [, setQuizLoaded] = useState(false);
  const [questionData, setQuestionData] = useState<IQuestion>();

  useEffect(() => {
    const questionNumber = +question;
    const quizString: string | null = sessionStorage.getItem(code);

    // check if given quiz is started
    if (quizString === null) {
      // first question - call api
      if (questionNumber === 1) {
        getQuestions(code).then((data) => {
          // error occured
          if ('message' in data) {
            history.push({ pathname: '/error', state: data });
          } else {
            sessionStorage.setItem(code, JSON.stringify({ quiz: data }));
            setQuizLoaded(true);
          }
        });
      } else {
        history.replace({
          pathname: `/error`,
          state: { message: 'Start the quiz first!', link: `/play/${code}/1` },
        });
        return;
      }
    } else {
      const quizData: IQuizStorage = JSON.parse(quizString as string);
      const questionsIds: number[] = quizData.quiz.questions;

      if (questionNumber > questionsIds.length) {
        history.replace({
          pathname: `/error`,
          state: { message: 'Invalid question!' },
        });
        return;
      }

      const questionId = questionsIds[questionNumber - 1];

      // get question and aswers
      getQuestion(questionId).then((d) => {
        if ('message' in d) {
          // error occured
          history.push({ pathname: '/error', state: d });
        } else {
          setQuestionData(d as IQuestion);
        }
      });
    }
  }, [code, question, history]);

  return questionData === undefined ? (
    <div className={classes.center + ' box'}>
      <CircularProgress />
    </div>
  ) : (
    <Question
      id={questionData.id}
      answers={questionData.answers}
      text={questionData.text}
    />
  );
};

export default Game;
