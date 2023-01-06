import React, { useEffect } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Question from './components/Question';
import circle1 from './assets/circle1.png';
import circle2 from './assets/circle2.png';
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
	const [time, setTime] = React.useState(0);
	const [isCounting, setIsCounting] = React.useState(false);
	const [input, setInput] = React.useState({
		category: '',
		difficulty: '',
		type: '',
		questions: '5',
	});
	

	React.useEffect(() => {
		fetch(
			`https://opentdb.com/api.php?amount=${input.questions}&category=${input.category}&difficulty=${input.difficulty}&type=${input.type}`
		)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setQuestions(() => {
					return data.results.map(obj => {
						return {
							...obj,
							id: nanoid(),
						};
					});
				});
			});
	}, [newGame]);

	const selectedQuestions = questions.map(question => {
		return <Question key={question.id} {...question} check={check} checkAnwers={checkAnwers} />;
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setInput(prevInput => ({
			...prevInput,
			[name]: value,
		}));
	}
	console.log(input);

	function handleStart() {
		if (check) {
			setStart(false);
			setCheck(false);
		} else {
			setIsCounting(true);
			setTime(3);
			setNewGame(prevState => !prevState);
			setTimeout(() => {
				setStart(true);
				setIsCounting(false);
			}, 3000);
		}
	}

	function handleCheck() {
		setCheck(prevCheck => !prevCheck);
	}

	function handleNewGame() {
		setNewGame(prevState => !prevState);
		setCheck(prevCheck => !prevCheck);
	}

	useEffect(() => {
		if (time > 0) {
			setTimeout(() => {
				setTime(prevTime => prevTime - 1);
			}, 1000);
		}
	}, [time]);

	function questionsNumber() {
		let optionsArr = [];
		for (let i = 0; i < 16; i++) {
			optionsArr.push(<option key={i} value={i + 5}>{`${i + 5} questions`}</option>);
		}
		return optionsArr;
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
							<button onClick={handleStart} className='question__btn'>
								Change properties
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
					<Text className='welcome-site__text'>Test your knowledge</Text>
					<form>
						<select name='category' onChange={handleChange} value={input.category}>
							<option value='anyCategory'>Any Category</option>
							<option value='9'>General Knowlage</option>
							<option value='10'>Books</option>
							<option value='11'>Film</option>
							<option value='12'>Music</option>
							<option value='15'>Video Games</option>
							<option value='17'>Science & Nature</option>
							<option value='18'>Computers</option>
							<option value='21'>Sports</option>
							<option value='22'>Geography</option>
							<option value='23'>History</option>
							<option value='28'>Vehicles</option>
						</select>
						<select name='difficulty' onChange={handleChange} value={input.difficulty}>
							<option value='anyDifficulty'>Any Difficulty</option>
							<option value='easy'>Easy</option>
							<option value='medium'>Medium</option>
							<option value='hard'>Hard</option>
						</select>
						<select name='type' onChange={handleChange} value={input.type}>
							<option value='anyType'>Any Type</option>
							<option value='multiple'>Multiple Choice</option>
							<option value='boolean'>True/ False</option>
						</select>
						<select name='questions' onChange={handleChange} value={input.questions}>
							{questionsNumber()}
						</select>
					</form>
					<button onClick={handleStart} className='welcome-site__btn'>
						{isCounting ? `${time}` : 'Start Quiz'}
					</button>
				</Wrapper>
			)}
		</div>
	);
}

export default App;
