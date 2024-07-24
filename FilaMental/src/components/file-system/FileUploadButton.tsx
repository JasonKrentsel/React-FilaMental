import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Add this import
import { uploadFile } from "../../services/fileSystemService";

interface FileUploadButtonProps {
	dir_path: string;
	onUpload: (file: File) => void;
}

const FileUploadButton = ({ dir_path, onUpload }: FileUploadButtonProps) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			uploadFile(file, dir_path);
			onUpload(file);
		}
	};

	return (
		<Button
			component='label'
			role={undefined}
			variant='contained'
			tabIndex={-1}
			startIcon={<CloudUploadIcon />}
			sx={{ padding: "0px", paddingLeft: "10px", paddingRight: "10px" }}>
			Upload file
			<input type='file' hidden onChange={handleFileChange} />
		</Button>
	);
};

export default FileUploadButton;
