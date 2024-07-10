import { Typography } from "@mui/material";
import { File } from "../../hooks/useFiles";

interface FileProps {
	file: File;
}

const FileEntry = ({ file }: FileProps) => {
	return <Typography>{file.name}</Typography>;
};

export default FileEntry;
