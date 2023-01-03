export default function Btn(props) {
	// console.log(props);

	const held = {
		backgroundColor: props.isHeld ? '#D6DBF5' : '',
	};
	const check = {
		backgroundColor: props.isHeld && props.value !== props.correct ? '#F8BCBC' : props.value === props.correct ? '#94D7A2' : '',
	};

	return (
		<div>
			{!props.check && <button style={held} onClick={props.checkBtn} className='answer'>
				{atob(props.value)}
			</button>}
			{props.check && <button disabled style={check} onClick={props.checkBtn} className='answer'>
				{atob(props.value)}
			</button>}
		</div>
	);
}
