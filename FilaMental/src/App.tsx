import { Divider, List, ListItem, Stack, Typography } from "@mui/material";
import FileSelect from "./components/file-system/FileSelect";
import useFiles, { File } from "./hooks/useFiles";
import { useState } from "react";
import FileUpload from "./components/file-system/FileUpload";
import NewFolder from "./components/file-system/NewFolder";

function App() {
	// Handle getting the files from the server
	const { fileSystem } = useFiles();
	const [selectedFiles, setSelectedFiles] = useState<
		{
			file: File;
			settingsVectorStore: {
				useVectorStore: boolean;
				chunkCount: number;
			};
		}[]
	>([]);

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
				{ file, settingsVectorStore: { useVectorStore, chunkCount } },
			];
		} else if (fileIndex !== -1 && !useRAG) {
			newSelectedFiles.splice(fileIndex, 1);
		} else if (fileIndex !== -1) {
			const newSelectedFileEntry = {
				file,
				settingsVectorStore: { useVectorStore, chunkCount },
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
						<Stack key={file.file.path} direction='row' spacing={2}>
							<Typography variant='body1'>
								{file.file.path}
							</Typography>
							<Typography variant='body1'>
								Vector Store:{" "}
								{file.settingsVectorStore.useVectorStore
									? "Enabled"
									: "Disabled"}
							</Typography>
							{file.settingsVectorStore.useVectorStore && (
								<Typography variant='body1'>
									Chunk Count:{" "}
									{file.settingsVectorStore.chunkCount}
								</Typography>
							)}
						</Stack>
					))
				)}
			</List>
			<Divider />
		</>
	);
}

export default App;
