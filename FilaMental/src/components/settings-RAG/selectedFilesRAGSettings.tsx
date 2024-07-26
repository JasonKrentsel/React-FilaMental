import { IconButton, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FileDB } from "../../hooks/useFiles";

interface SelectedFilesRAGSettingsProps {
	selectedFiles: FileDB[];
	setSelectedFiles: (files: FileDB[]) => void;
}

const selectedFilesRAGSettings = ({ selectedFiles, setSelectedFiles }: SelectedFilesRAGSettingsProps) => {
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
					<Paper key={file.full_path} sx={{ m: 1, px: 1, py: 0 }}>
						<Stack direction='row' spacing={2} alignItems='center'>
							<Typography variant='body1'>{file.full_path}</Typography>
							<IconButton
								onClick={() => {
									const updatedFiles = selectedFiles.filter((f) => f.full_path !== file.full_path);
									setSelectedFiles(updatedFiles);
								}}>
								<DeleteIcon />
							</IconButton>
						</Stack>
					</Paper>
				))
			)}
		</List>
	);
};

export default selectedFilesRAGSettings;
