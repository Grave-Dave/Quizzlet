import React from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Question from './components/Question';
import circle1 from './assets/circle1.png'
import circle2 from './assets/circle2.png'
import './App.scss';

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const Title = styled.h1`
	margin-bottom: 0.5em;
	font-size: 3.5rem;
`;

const Text = styled.p`
	margin-bottom: 1.5em;
	font-size: 2rem;
`;
function App() {
	const [start, setStart] = React.useState(false);
	const [questions, setQuestions] = React.useState([]);
	const [check, setCheck] = React.useState(false);
	const [win, setWin] = React.useState(false);
	const [newGame, setNewGame] = React.useState(false);

	React.useEffect(() => {
		fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple&encode=base64')
			.then(res => res.json())
			.then(data =>
				setQuestions(() => {
					return data.results.map(obj => {
						return {
							...obj,
							id: nanoid(),
						};
					});
				})
			);
	}, [newGame]);

	const selectedQuestions = questions.map(question => {
		return <Question key={question.id} {...question} check={check} checkAnwers={checkAnwers} />;
	});

	function handleStart() {
		setStart(true);
	}

	function handleCheck() {
		setCheck(prevCheck => !prevCheck);
	}

	function handleNewGame() {
		setNewGame(prevState => !prevState);
		setCheck(prevCheck => !prevCheck);
	}

	// ** WIN CONDITIONS---------------------------------------

	const [score, setScore] = React.useState(0);

	function checkAnwers(answer, id) {
		if (check) {
			questions.forEach(question => {
				if (question.id === id && question.correct_answer === answer) setScore(prevScore => prevScore + 1);
			});
		}
	}

	React.useEffect(() => {
		if (score === 5) setWin(true);
		if (!check) setWin(false);
		console.log(score);
	}, [score]);

	React.useEffect(() => {
		setScore(0);
	}, [newGame]);

	return (
		<div className='App'>
			{win && <Confetti />}
			<img className='decor-one' src={circle1} />
			<img className='decor-two' src={circle2} />
			{start ? (
				<section className='questions'>
					{selectedQuestions}
					{check ? (
						<div className='check-box'>
							<p className='check-result'>You scored {score}/5 correct answers</p>
							<button onClick={handleNewGame} className='question__btn'>
								{check ? 'New game' : 'Check Answers'}
							</button>
						</div>
					) : (
						<button onClick={handleCheck} className='question__btn'>
							{check ? 'New game' : 'Check Answers'}
						</button>
					)}
				</section>
			) : (
				<Wrapper className='welcome-site'>
					<Title className='welcome-site__header'>Quizzical</Title>
					<Text className='welcome-site__text'>Test your general knowledge</Text>
					<button onClick={handleStart} className='welcome-site__btn'>
						Start Quiz
					</button>
				</Wrapper>
			)}
		</div>
	);
}

export default App;
