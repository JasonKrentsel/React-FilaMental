import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploadButtonProps {
	onUpload: (file: File) => void;
}

const FileUploadButton = ({ onUpload }: FileUploadButtonProps) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			onUpload(file);
		}
	};

	return (
		<Button
			component='label'
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
