import {
  Card,
  CardContent,
  Container,
  List,
  ListItemText,
  makeStyles,
  TextField,
  Theme,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Snackbar,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import { IQuestionData, IQuizRequest } from '../RequestApiModels';
import QuestionMaker from './QuestionMaker';
import { fetchPostApi } from '../api';
import { ICode } from '../ResponseApiModels';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: theme.palette.background.default,
  },
  divider: {
    marginBottom: '25px',
  },
  margin: {
    marginTop: '15px',
  },
  wrapper: {
    marginTop: '25px',
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    right: '15px',
    top: '15px',
  },
}));

interface IProps {
  onCreate(code: ICode): void;
  onClose(): void;
}

const defaultValue: IQuizRequest = {
  author: '',
  description: '',
  data: [],
};

const CreateQuiz = ({ onCreate, onClose }: IProps) => {
  const classes = useStyles();

  const [quiz, setQuiz] = useState(defaultValue);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMassage] = useState('');

  const onQuestionCreated = (question: IQuestionData) => {
    setQuiz({
      author: quiz.author,
      description: quiz.description,
      data: [...quiz.data, question],
    });
  };

  const handleDeleteQuestion = (index: number) => {
    const { author, data, description } = quiz;
    setQuiz({
      author,
      description,
      data: data.filter((q, i) => i !== index),
    });
  };

  const handleAuthorChange = (author: string) => {
    const { data, description } = quiz;
    setQuiz({
      author,
      data,
      description,
    });
  };

  const handleDescriptionChange = (description: string) => {
    const { data, author } = quiz;
    setQuiz({
      author,
      data,
      description,
    });
  };

  const handleErrorClose = () => {
    setError(false);
    setErrorMassage('');
  };

  const handleCreateQuiz = () => {
    if (quiz.author.trim().length <= 2) {
      setError(true);
      setErrorMassage('Author name must have at least 3 characters!');
      return;
    }

    setLoading(true);

    const url = '/quiz';
    fetchPostApi<ICode>(url, quiz)
      .then((x) => {
        onCreate(x);
        setQuiz(defaultValue);
      })
      .catch((e) => {
        setError(true);
        setErrorMassage(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="md" className={classes.margin}>
      <IconButton className={classes.close} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Card className={[classes.card, classes.divider].join(' ')}>
        <CardContent>
          <TextField
            label="Author"
            color="secondary"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => handleAuthorChange(e.target.value)}
          ></TextField>
          <TextField
            multiline
            label="Description"
            color="secondary"
            fullWidth={true}
            variant="outlined"
            className={classes.margin}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
        </CardContent>
      </Card>
      <Card className={[classes.card, classes.divider].join(' ')}>
        <CardContent>
          <QuestionMaker onQuestionCreated={onQuestionCreated} />
        </CardContent>
      </Card>
      {quiz.data.length > 0 && (
        <>
          <Card className={classes.card}>
            <List>
              {quiz.data.map((q, index) => (
                <ListItem key={index}>
                  <ListItemText>{q.question}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteQuestion(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Card>
          <div className={classes.wrapper}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleCreateQuiz}
            >
              {loading ? <CircularProgress /> : 'Create Quiz'}
            </Button>
          </div>
        </>
      )}

      <Snackbar open={error} onClose={handleErrorClose} autoHideDuration={5000}>
        <Alert severity="error" onClose={handleErrorClose}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateQuiz;
