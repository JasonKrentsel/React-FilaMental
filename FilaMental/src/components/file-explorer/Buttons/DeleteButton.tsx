import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteButtonProps {
	text: string;
	onDelete: () => void;
}

const DeleteButton = ({ text, onDelete }: DeleteButtonProps) => {
	const doConfirmation = () => {
		if (
			confirm(
				"Are you sure you want to delete the selected files? This action is irreversible."
			)
		) {
			onDelete();
		}
	};

	return (
		<Button
			component='label'
			variant='contained'
			color='error'
			tabIndex={-1}
			startIcon={<DeleteIcon />}
			sx={{ padding: "0px", paddingLeft: "10px", paddingRight: "10px" }}
			onClick={doConfirmation}>
			{text}
		</Button>
	);
};

export default DeleteButton;
