import { useState } from "react";

interface QueryBarProps {
	handleSubmit: (message: string) => void;
}

const QueryBar = ({ handleSubmit }: QueryBarProps) => {
	const [message, setMessage] = useState("");

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(message);
			}}>
			<input
				type='text'
				placeholder='chat'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button type='submit'>Send</button>
		</form>
	);
};

export default QueryBar;
