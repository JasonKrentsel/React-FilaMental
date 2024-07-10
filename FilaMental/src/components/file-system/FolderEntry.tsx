import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { FileSystem } from "../../hooks/useFiles";

interface FolderEntryProps {
	folder: FileSystem;
	children?: ReactNode;
}

const FolderEntry = ({ folder, children }: FolderEntryProps) => {
	return (
		<>
			<Accordion
				className=''
				square
				elevation={0}
				sx={{ border: "1px solid black", padding: 0 }}>
				<AccordionSummary>
					<Typography variant='h6'>{folder.name}</Typography>
				</AccordionSummary>
				<AccordionDetails>{children}</AccordionDetails>
			</Accordion>
		</>
	);
};

export default FolderEntry;
