import { Divider, List, ListItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FileDB } from "./hooks/useFiles";
import FileExplorer from "./components/file-explorer/FileExplorer";

function App() {
	const [selectedFiles, setSelectedFiles] = useState<FileDB[]>([]);

	return (
		<>
			<Typography variant='h4'>
				File System Rendering and Selection Test
			</Typography>
			<Divider />
			<FileExplorer
				greenSelectedFiles={selectedFiles}
				setGreenSelectedFiles={setSelectedFiles}
			/>
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
						<Stack key={file.full_path} direction='row' spacing={2}>
							<Typography variant='body1'>
								{file.full_path}
							</Typography>
						</Stack>
					))
				)}
			</List>
			<Divider />
			<Typography variant='h5'>Chat</Typography>
			<Divider />
		</>
	);
}

export default App;
