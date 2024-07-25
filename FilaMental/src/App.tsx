import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { FileDB } from "./hooks/useFiles";
import FileExplorer from "./components/file-explorer/FileExplorer";
import ChatInterface from "./components/chat/ChatInterface";
import { FileRAG } from "./services/AI-response";
import SelectedFilesRAGSettings from "./components/settings-RAG/selectedFilesRAGSettings";

function App() {
	const [selectedFiles, setSelectedFiles] = useState<FileDB[]>([]);
	const [filesRAG, setFilesRAG] = useState<FileRAG[]>([]);

	return (
		<Box bgcolor='AliceBlue'>
			<Divider />
			<FileExplorer greenSelectedFiles={selectedFiles} setGreenSelectedFiles={setSelectedFiles} />
			<Divider />
			<Typography variant='h5'>Selected Files</Typography>
			<Divider />
			<SelectedFilesRAGSettings selectedFiles={selectedFiles} filesRAG={filesRAG} setFilesRAG={setFilesRAG} />
			<Divider />
			<Typography variant='h5'>Chat</Typography>
			<Divider />
			<ChatInterface selectedFiles={filesRAG} />
		</Box>
	);
}

export default App;
