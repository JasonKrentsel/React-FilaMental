import { Box, Grid } from "@mui/material";
import { ChatMessage } from "./ChatInterface";
import ChatMessageCard from "./ChatMessageCard";

interface ChatHistoryDisplayProps {
	chatHistory: ChatMessage[];
}

const ChatHistoryDisplay = ({ chatHistory }: ChatHistoryDisplayProps) => {
	return (
		<Box width='100%'>
			{chatHistory.map((message, index) => {
				if (message.role === "user") {
					return (
						<Grid container key={index}>
							<Grid item xs={6} />
							<Grid item xs={6} padding={2}>
								<ChatMessageCard message={message} />
							</Grid>
						</Grid>
					);
				} else {
					return (
						<Grid container key={index}>
							<Grid item xs={6} padding={2}>
								<ChatMessageCard message={message} />
							</Grid>
							<Grid item xs={6} />
						</Grid>
					);
				}
			})}
		</Box>
	);
};

export default ChatHistoryDisplay;
