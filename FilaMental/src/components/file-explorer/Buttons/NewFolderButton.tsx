import { Button } from "@mui/material";

interface NewFolderButtonProps {
	dir_path: string;
}

const NewFolderButton = ({ dir_path }: NewFolderButtonProps) => {
	return (
		<Button
			variant='contained'
			color='primary'
			sx={{ padding: "0px", paddingLeft: "10px", paddingRight: "10px" }}
			onClick={(event) => event.stopPropagation()}
			disabled>
			New Folder in {dir_path}
		</Button>
	);
};

export default NewFolderButton;
