import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { FileDB } from "./hooks/useFiles";
import FileExplorer from "./components/file-explorer/FileExplorer";
import ChatInterface from "./components/chat/ChatInterface";
import SelectedFilesRAGSettings from "./components/settings-RAG/selectedFilesRAGSettings";

function App() {
	const [selectedFiles, setSelectedFiles] = useState<FileDB[]>([]);

	return (
		<Box bgcolor='AliceBlue'>
			<Divider />
			<FileExplorer greenSelectedFiles={selectedFiles} setGreenSelectedFiles={setSelectedFiles} />
			<Divider />
			<Typography variant='h5'>Selected Files</Typography>
			<Divider />
			<SelectedFilesRAGSettings selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
			<Divider />
			<Typography variant='h5'>Chat</Typography>
			<Divider />
			<ChatInterface selectedFiles={selectedFiles} />
		</Box>
	);
}

export default App;
