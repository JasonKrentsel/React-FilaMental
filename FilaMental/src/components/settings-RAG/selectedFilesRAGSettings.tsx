import { List, ListItem, Stack, TextField, Typography } from "@mui/material";
import { FileDB } from "../../hooks/useFiles";
import { FileRAG } from "../../services/AI-response";

interface SelectedFilesRAGSettingsProps {
	selectedFiles: FileDB[];
	filesRAG: FileRAG[];
	setFilesRAG: (files: FileRAG[]) => void;
}

const selectedFilesRAGSettings = ({ selectedFiles, filesRAG, setFilesRAG }: SelectedFilesRAGSettingsProps) => {
	return (
		<List>
			{selectedFiles.length === 0 ? (
				<ListItem>
					<Typography variant='body1' color='grey'>
						No files selected
					</Typography>
				</ListItem>
			) : (
				selectedFiles.map((file) => (
					<ListItem key={file.full_path}>
						<Stack key={file.full_path} direction='row' spacing={2}>
							<Typography variant='body1'>{file.full_path}</Typography>

							<TextField
								type='number'
								label='Tokens per chunk'
								variant='outlined'
								size='small'
								defaultValue={500}
								onChange={(e) => {
									const newFilesRAG = filesRAG.map((f) =>
										f.file.full_path === file.full_path
											? {
													...f,
													tokensPerChunk: Number(e.target.value),
											  }
											: f
									);
									setFilesRAG(newFilesRAG);
								}}
							/>
							<TextField
								type='number'
								label='Token Overlap'
								variant='outlined'
								size='small'
								defaultValue={100}
								onChange={(e) => {
									const newFilesRAG = filesRAG.map((f) =>
										f.file.full_path === file.full_path
											? {
													...f,
													tokenOverlap: Number(e.target.value),
											  }
											: f
									);
									setFilesRAG(newFilesRAG);
								}}
							/>
						</Stack>
					</ListItem>
				))
			)}
		</List>
	);
};

export default selectedFilesRAGSettings;
