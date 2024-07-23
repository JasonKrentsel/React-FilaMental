import { Divider, List, ListItem, Stack, Typography } from "@mui/material";
import FileSelect from "./components/file-system/FileSelect";
import useFiles, { File } from "./hooks/useFiles";
import { useState } from "react";
import FileUpload from "./components/file-system/FileUpload";
import NewFolder from "./components/file-system/NewFolder";
import ChatInterface from "./components/chat/ChatInterface";
import { FileRAG } from "./services/AI-response";

function App() {
	// Handle getting the files from the server
	const { fileSystem } = useFiles();
	const [selectedFiles, setSelectedFiles] = useState<FileRAG[]>([]);

	const onFileSettingUpdate = (
		file: File,
		useRAG: boolean,
		useVectorStore: boolean,
		chunkCount: number
	) => {
		let newSelectedFiles = [...selectedFiles];

		const fileIndex = newSelectedFiles.findIndex((f) => f.file === file);
		if (fileIndex === -1 && useRAG) {
			newSelectedFiles = [
				...newSelectedFiles,
				{ file, settings: { useVectorStore, chunkCount } },
			];
		} else if (fileIndex !== -1 && !useRAG) {
			newSelectedFiles.splice(fileIndex, 1);
		} else if (fileIndex !== -1) {
			const newSelectedFileEntry = {
				file,
				settings: { useVectorStore, chunkCount },
			};
			newSelectedFiles[fileIndex] = newSelectedFileEntry;
		}

		setSelectedFiles(newSelectedFiles);
	};

	return (
		<>
			<Typography variant='h4'>
				File System Rendering and Selection Test
			</Typography>
			<Divider />
			<FileSelect
				fileSystem={fileSystem}
				onFileSettingUpdate={onFileSettingUpdate}
			/>
			<Stack direction='row' spacing={2} padding={2}>
				<FileUpload />
				<NewFolder />
			</Stack>
			<Divider />
			<Typography variant='h5'>Selected Files</Typography>
			<Divider />
			<List>
				{selectedFiles.length === 0 ? (
					<ListItem>
						<Typography variant='body1'>
							No files selected
						</Typography>
					</ListItem>
				) : (
					selectedFiles.map((file) => (
						<Stack
							key={file.file.full_path}
							direction='row'
							spacing={2}>
							<Typography variant='body1'>
								{file.file.full_path}
							</Typography>
							<Typography variant='body1'>
								Vector Store:{" "}
								{file.settings.useVectorStore
									? "Enabled"
									: "Disabled"}
							</Typography>
							{file.settings.useVectorStore && (
								<Typography variant='body1'>
									Chunk Count: {file.settings.chunkCount}
								</Typography>
							)}
						</Stack>
					))
				)}
			</List>
			<Divider />
			<Typography variant='h5'>Chat</Typography>
			<Divider />
			<ChatInterface selectedFiles={selectedFiles} />
		</>
	);
}

export default App;
