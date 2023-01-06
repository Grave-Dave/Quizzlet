import he from 'he'

export default function Btn(props) {
	
	const held = {
		backgroundColor: props.isHeld ? '#D6DBF5' : '',
	};
	const check = {
		backgroundColor: props.isHeld && props.value !== props.correct ? '#F8BCBC' : props.value === props.correct ? '#94D7A2' : '',
	};

	return (
		<div>
			{props.value && !props.check && <button style={held} onClick={props.checkBtn} className='answer'>
				{he.decode(props.value)}
			</button>}
			{props.value && props.check && <button disabled style={check} onClick={props.checkBtn} className='answer'>
				{he.decode(props.value)}
			</button>}
		</div>
	);
}
