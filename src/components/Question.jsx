import '../App.scss';
import Btn from './Btn';
import React from 'react';
import { nanoid } from 'nanoid';

export default function Questions(props) {
	// console.log(props);

	// **creating an array of four random numbers without repetition from 0 to 3
	const numArr = [];
	let randomNum = 4;
	while (numArr.length < randomNum) {
		let num = Math.floor(Math.random() * 4);
		if (numArr.indexOf(num) === -1) numArr.push(num);
	}
	// console.log(numArr);

	const [btnsInfo, setBtnsInfo] = React.useState(createBtn());

	// ** creating an array of objects with button data. the value of the button is taken on the basis of random numbers array
	function createBtn() {
		const btnArr = [];
		for (let i = 0; i < 4; i++) {
			btnArr.push({
				id: nanoid(),
				value: numArr[i] === 3 ? props.correct_answer : props.incorrect_answers[numArr[i]],
				isHeld: false,
			});
		}
		return btnArr;
	}

	// ** checking the selected answer based on the listener

	console.log(props.correct_answer);
	function checkBtn(id) {
		setBtnsInfo(prevState => {
			return prevState.map(btn => {
				return btn.id === id
					? {
							...btn,
							isHeld: !btn.isHeld,
					  }
					: { ...btn, isHeld: false };
			});
		});
	}

	// **checking the correct answers

	React.useEffect(()=>{
		const answerArr=[]
		const answer = () => {			
			 btnsInfo.map(btn=>{
				if (btn.isHeld){
					answerArr.push(btn.value)
				} 
			})}
			answer()	
		
		props.checkAnwers(...answerArr, props.id)
	},[props.check, btnsInfo])


	const btns = btnsInfo.map(obj => {
		return <Btn key={obj.id} {...obj} checkBtn={() => checkBtn(obj.id)} correct={props.correct_answer} check={props.check} />;
	});

	return (
		<div className='question'>
			<h1 className='question__text'>{atob(props.question)}</h1>
			<div className='answer-box'>{btns}</div>
		</div>
	);
}
