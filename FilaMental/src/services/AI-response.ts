import { File } from "../hooks/useFiles";

export interface ChatMessage {
	role: "User" | "FilaMental";
	content: string;
}

export interface RAGSettings {
	useVectorStore: boolean;
	chunkCount: number;
}

export interface FileRAG {
	file: File;
	settings: RAGSettings;
}

export interface FilaMentalResponseRequest {
	selectedFiles: FileRAG[];
	chatHistory: ChatMessage[];
}

export const generateResponse = async (
	request: FilaMentalResponseRequest
): Promise<ChatMessage> => {
	const response = "TEST response to: \n" + JSON.stringify(request);
	const data = { content: response, role: "FilaMental" } as ChatMessage;
	return data;
};
