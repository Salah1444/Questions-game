# Question Game

A multiple-choice trivia game built with React. Answer questions from a local question bank, track your correct answers, and see your result after a 10-question round.

## Getting started

### Requirements

- Node.js
- npm

### Install and run

From the project directory, install dependencies and start the development server:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page reloads when you make changes.

## How to play

- Choose one of the multiple-choice answers to see whether it is correct.
- The game shows feedback, then moves on to another question.
- Choose **I Don't Know** to skip a question.
- At the end of the round, view your score and choose **Try Again** to start over.

Questions and answers are stored in [`src/data/QuestionReponse.json`](./src/data/QuestionReponse.json).

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the app in development mode. |
| `npm test` | Run the tests in interactive watch mode. |
| `npm run build` | Create an optimized production build in `build/`. |
| `npm run eject` | Eject the Create React App configuration. This is irreversible. |

## Built with

- React
- React Router
- Bootstrap
- Create React App
