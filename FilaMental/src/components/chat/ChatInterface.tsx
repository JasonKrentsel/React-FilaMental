import { Stack } from "@mui/material";
import ChatHistoryDisplay from "./ChatHistoryDisplay";
import QueryBar from "./QueryBar";
import { useState } from "react";

export interface ChatMessage {
	role: string;
	content: string;
}

interface ChatInterfaceProps {
	handleChatSubmit: (chatHistory: ChatMessage[]) => void;
}

const ChatInterface = ({ handleChatSubmit }: ChatInterfaceProps) => {
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

	const handleSubmit = (message: string) => {
		setChatHistory([...chatHistory, { role: "user", content: message }]);
		handleChatSubmit(chatHistory);
	};

	return (
		<>
			<Stack
				direction='column'
				spacing={2}
				width='100%'
				alignItems='center'>
				<QueryBar handleSubmit={handleSubmit} />
				<ChatHistoryDisplay chatHistory={chatHistory} />
			</Stack>
		</>
	);
};

export default ChatInterface;
