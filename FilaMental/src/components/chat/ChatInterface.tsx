import { Stack } from "@mui/material";
import ChatHistoryDisplay from "./ChatHistoryDisplay";
import QueryBar from "./QueryBar";
import { useState } from "react";
import { ChatMessage, generateResponse } from "../../services/AI-response";
import { FileDB } from "../../hooks/useFiles";

interface ChatInterfaceProps {
	selectedFiles: FileDB[];
}

const ChatInterface = ({ selectedFiles }: ChatInterfaceProps) => {
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

	//temporary chat submit function
	//TODO: implement chat submission, including file context
	const handleChatSubmit = (message: string) => {
		const newChatHistory: ChatMessage[] = [...chatHistory, { role: "User", content: message }];

		const response = generateResponse({
			chatHistory: newChatHistory,
			selectedFiles,
		});

		response.then((response) => {
			setChatHistory([...newChatHistory, response]);
		});
	};

	const handleClear = () => {
		setChatHistory([]);
	};

	return (
		<>
			<Stack direction='column' spacing={2} width='100%' alignItems='center'>
				<QueryBar handleSubmit={handleChatSubmit} handleClear={handleClear} />
				<ChatHistoryDisplay chatHistory={chatHistory} />
			</Stack>
		</>
	);
};

export default ChatInterface;
