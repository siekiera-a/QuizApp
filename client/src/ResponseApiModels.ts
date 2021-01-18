// response
export interface IQuiz {
  id: number,
  code: string,
  author: string,
  creationTime: string,
  description: string
}

export interface IGetQuiz {
  hasNext: boolean,
  hasPrev: boolean,
  page: number,
  pages: number,
  total: number,
  items: IQuiz[]
}

export interface ICode {
  code: string
}

export interface IQuizQuestions {
  id: number,
  questions: number[]
}

export interface IAnswer {
  id: number,
  text: string
}

export interface IQuestion {
  id: number,
  text: string,
  answers: IAnswer[]
}

export interface ISubmitResponse {
  user: string,
  score: number,
  total: number,
  scoreInPercent: number
}

export interface IScore {
  user: string,
  score: number,
  datetime: string
}

export interface ILeaderboard {
  author: string,
  code: string,
  description: string,
  creationTime: string,
  scores: IScore[]
}

export interface IError {
  message: string
}

export { }
