import { Stack, Typography, Collapse, Box, Divider } from "@mui/material";
import { ReactNode, useState } from "react";
import { FileSystem } from "../../hooks/useFiles";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import "./FileSystem.css";
import NewFolderButton from "./NewFolderButton";
import FileUploadButton from "./FileUploadButton";

interface FolderEntryProps {
	folder: FileSystem;
	onFileSystemUpdate: () => void;
	children?: ReactNode;
}

const ExpandIcon = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
	transition: "transform 0.3s",
	transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
	display: "flex",
	alignItems: "center",
}));

const FolderEntry = ({
	folder,
	onFileSystemUpdate,
	children,
}: FolderEntryProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const onFileUpload = (file: File) => {
		folder.files.push({
			name: file.name,
			full_path: folder.full_path + "/" + file.name,
		});
		setIsOpen(true);
		onFileSystemUpdate();
	};

	return (
		<Box bgcolor={isHovered ? "lightblue" : "transparent"}>
			<Stack
				direction='row'
				spacing={2}
				alignItems='center'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => setIsOpen(!isOpen)}>
				<FolderIcon className='folder-color' />
				<Typography variant='h6'>{folder.name}</Typography>

				{isHovered && (
					<>
						<FileUploadButton
							dir_path={folder.full_path}
							onUpload={onFileUpload}
						/>
						<NewFolderButton dir_path={folder.full_path} />
					</>
				)}

				<Stack
					direction='row'
					justifyContent='flex-end'
					flexGrow={1}
					paddingRight='1%'>
					<ExpandIcon isOpen={isOpen}>
						<ExpandMoreIcon />
					</ExpandIcon>
				</Stack>
			</Stack>

			<Collapse in={isOpen}>
				<div
					style={{
						paddingLeft: "5%",
					}}>
					<Divider />
					{folder.files.length === 0 &&
					folder.subdirectories.length === 0 ? (
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
