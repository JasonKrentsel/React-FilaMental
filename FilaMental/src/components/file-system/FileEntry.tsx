import { Divider, Stack, Typography } from "@mui/material";
import { File } from "../../hooks/useFiles";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import RAGSettings from "./RAGSettings";
import { useState } from "react";
import "./FileSystem.css";

interface FileProps {
	file: File;
	onFileSettingUpdate: (
		file: File,
		useRAG: boolean,
		useVectorStore: boolean,
		chunkCount: number
	) => void;
}

const FileEntry = ({ file, onFileSettingUpdate }: FileProps) => {
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
				<RAGSettings
					verbose={isHovered}
					file={file}
					onFileSettingUpdate={onFileSettingUpdate}
				/>
			</Stack>
		</>
	);
};

export default FileEntry;
