import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface QueryBarProps {
	handleSubmit: (message: string) => void;
	handleClear: () => void;
}

const QueryBar = ({ handleSubmit, handleClear }: QueryBarProps) => {
	const [message, setMessage] = useState("");

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(message);
			}}
			style={{
				width: "100%",
			}}>
			<Stack
				direction='row'
				spacing={2}
				alignItems='center'
				justifyContent='center'>
				<TextField
					type='text'
					label='Message'
					variant='filled'
					multiline
					fullWidth
					maxRows={4}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Button variant='contained' type='submit'>
					Send
				</Button>
				<Button variant='contained' onClick={handleClear}>
					Clear
				</Button>
			</Stack>
		</form>
	);
};

export default QueryBar;
