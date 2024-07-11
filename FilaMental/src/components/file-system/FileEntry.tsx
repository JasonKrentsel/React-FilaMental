import "./file-system.css";
import { Stack, Typography } from "@mui/material";
import { File } from "../../hooks/useFiles";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface FileProps {
	file: File;
}

const FileEntry = ({ file }: FileProps) => {
	return (
		<>
			<Stack
				direction='row'
				spacing={2}
				alignItems='center'
				className='hoverable-select'>
				<InsertDriveFileIcon />
				<Typography variant='subtitle1'>{file.name}</Typography>
			</Stack>
		</>
	);
};

export default FileEntry;
