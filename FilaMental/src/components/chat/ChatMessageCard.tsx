import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { ChatMessage } from "./ChatInterface";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";

interface ChatMessageCardProps {
	message: ChatMessage;
}

const ChatMessageCard = ({ message }: ChatMessageCardProps) => {
	return (
		<Card>
			<CardContent>
				<Stack
					direction='row'
					display='flex'
					alignItems='center'
					spacing={1}>
					{message.role === "user" ? (
						<PersonIcon fontSize='small' />
					) : (
						<SmartToyIcon fontSize='small' />
					)}
					<Typography variant='caption'>{message.role}</Typography>
				</Stack>
				<Divider />
				<Typography variant='body1' style={{ whiteSpace: "pre-wrap" }}>
					{message.content}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ChatMessageCard;
