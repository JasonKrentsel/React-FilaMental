import { Box, Grid } from "@mui/material";
import { ChatMessage } from "../../services/AI-response";
import ChatMessageCard from "./ChatMessageCard";

interface ChatHistoryDisplayProps {
	chatHistory: ChatMessage[];
}

const ChatHistoryDisplay = ({ chatHistory }: ChatHistoryDisplayProps) => {
	return (
		<Box width='100%'>
			{chatHistory.map((message, index) => {
				if (message.role === "User") {
					return (
						<Grid container key={index}>
							<Grid item xs={2} />
							<Grid item xs={10} padding={2}>
								<ChatMessageCard message={message} />
							</Grid>
						</Grid>
					);
				} else {
					return (
						<Grid container key={index}>
							<Grid item xs={10} padding={2}>
								<ChatMessageCard message={message} />
							</Grid>
							<Grid item xs={2} />
						</Grid>
					);
				}
			})}
		</Box>
	);
};

export default ChatHistoryDisplay;
