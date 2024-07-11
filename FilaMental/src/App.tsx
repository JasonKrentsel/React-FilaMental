import { Divider, List, ListItem, Typography } from "@mui/material";
import FileSelect from "./components/file-system/FileSelect";
import useFiles, { File } from "./hooks/useFiles";
import { useEffect, useState } from "react";

function App() {
	// Handle getting the files from the server
	const { fileSystem } = useFiles();
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	useEffect(() => {
		setSelectedFiles(fileSystem.files);
	}, [fileSystem]);

	return (
		<>
			<Typography variant='h4'>
				File System Rendering and Selection Test
			</Typography>
			<Divider />
			<FileSelect fileSystem={fileSystem} />
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
						<ListItem key={file.path}>
							<Typography variant='body1'>{file.path}</Typography>
						</ListItem>
					))
				)}
			</List>
		</>
	);
}

export default App;
