import { Stack, Typography, Collapse, Box } from "@mui/material";
import { ReactNode, useState } from "react";
import { FileSystem } from "../../hooks/useFiles";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

interface FolderEntryProps {
	folder: FileSystem;
	children?: ReactNode;
}

const ExpandIcon = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
	transition: "transform 0.3s",
	transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
	display: "flex",
	alignItems: "center",
}));

const FolderEntry = ({ folder, children }: FolderEntryProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Box bgcolor={isHovered ? "lightblue" : "transparent"}>
			<Stack
				direction='row'
				spacing={2}
				alignItems='center'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => setIsOpen(!isOpen)}>
				<FolderIcon />
				<Typography variant='h6'>{folder.name}</Typography>
				<ExpandIcon isOpen={isOpen}>
					<ExpandMoreIcon />
				</ExpandIcon>
			</Stack>

			<Collapse in={isOpen}>
				<div
					style={{
						paddingLeft: "5%",
					}}>
					{folder.files.length === 0 &&
					folder.directories.length === 0 ? (
						<Typography variant='body2'>
							This folder is empty
						</Typography>
					) : (
						<Stack>{children}</Stack>
					)}
				</div>
			</Collapse>
		</Box>
	);
};

export default FolderEntry;
