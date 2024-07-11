import { Divider, Stack, Typography } from "@mui/material";
import { File } from "../../hooks/useFiles";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RAGSettings from "./RAGSettings";
import { useState } from "react";
import "./FileSystem.css";

interface FileProps {
	file: File;
}

const FileEntry = ({ file }: FileProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<>
			<Stack
				direction='row'
				spacing={2}
				alignItems='center'
				bgcolor={isHovered ? "lightblue" : "background.transparent"}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<InsertDriveFileIcon className='file-color' />
				<Typography variant='subtitle1'>{file.name}</Typography>
				<Divider orientation='vertical' flexItem />
				<RAGSettings verbose={isHovered} />
			</Stack>
		</>
	);
};

export default FileEntry;
