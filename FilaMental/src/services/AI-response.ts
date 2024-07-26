import { FileDB } from "../hooks/useFiles";
import axiosInstance from "./axiosService";

export interface ChatMessage {
	role: "User" | "FilaMental" | "System";
	content: string;
}

export interface RAGSettings {
	useVectorStore: boolean;
	chunkCount: number;
}

export interface FileRAG {
	file: FileDB;
	settings: RAGSettings;
}

export interface FilaMentalResponseRequest {
	selectedFiles: FileDB[];
	chatHistory: ChatMessage[];
}

export const generateResponse = async (request: FilaMentalResponseRequest): Promise<ChatMessage> => {
	const constroller = new AbortController();

	// the format of a chat request goes as follows:
	// {
	// 	message: string,
	// 	files_paths: string[]
	// }
	const data = {
		message: request.chatHistory[request.chatHistory.length - 1].content,
		files_paths: request.selectedFiles.map((file) => file.full_path),
	};

	let response_message = "";
	let role: "FilaMental" | "System" = "FilaMental";

	const response = await axiosInstance.post("/chat/", data, { signal: constroller.signal });

	if (response.status !== 200) {
		role = "System";
		response_message = "[[ERROR]] an error occurred while getting a response from the server";
	} else {
		response_message = response.data.response;
	}

	return {
		content: response_message,
		role: role,
	} as ChatMessage;
};
