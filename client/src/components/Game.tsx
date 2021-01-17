import { CircularProgress, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { gameContext } from '../GameContext';
import { IQuestion } from '../ResponseApiModels';
import Question from './Question';

const useStyles = makeStyles({
  center: {
    textAlign: 'center',
  },
});

const Game = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>();
  const [question, setQuestion] = useState<IQuestion>();
  const [nextQuestion, setNextQuestion] = useState<boolean>();

  const { hasNextQuestion, answerTheQuestion, getQuestion } = useContext(
    gameContext
  );

  useEffect(() => {
    if (hasNextQuestion()) {
      setLoading(true);
      getQuestion().then((q) => {
        setQuestion(q);
        setLoading(false);
      });
    }
  }, [nextQuestion]);

  const handleSubmit = (question: number, answers: number[]) => {
    answerTheQuestion(question, answers);
    if (hasNextQuestion()) {
      setNextQuestion(true);
    } else {
      // submit
    }
  };

  console.log(loading);

  return loading ? (
    <div className={classes.center + ' box'}>
      <CircularProgress />
    </div>
  ) : (
    <>
      {question && (
        <Question
          id={question.id}
          answers={question.answers}
          text={question.text}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Game;
