import { useState } from "react";
import useFiles, { Directory, FileDB } from "../../hooks/useFiles";
import { Box, Grid, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import FolderCard from "./Cards/FolderCard";
import FileCard from "./Cards/FileCard";
import FileUploadButton from "./Buttons/FileUploadButton";
import NewFolderButton from "./Buttons/NewFolderButton";
import DeleteButton from "./Buttons/DeleteButton";
import "./FileExplorer.css";

interface FileExplorerProps {
	greenSelectedFiles: FileDB[];
	setGreenSelectedFiles: (files: FileDB[]) => void;
}

const FileExplorer = ({ greenSelectedFiles, setGreenSelectedFiles }: FileExplorerProps) => {
	const [currentDirectory, setCurrentDirectory] = useState<Directory>(new Directory());
	const [blueSelectedFiles, setBlueSelectedFiles] = useState<FileDB[]>([]);
	const [blueSelectedFolders, setBlueSelectedFolders] = useState<Directory[]>([]);

	const { isLoading } = useFiles(setCurrentDirectory);
	const [depth, setDepth] = useState(0);

	const onFolderEnter = (subdirName: string) => {
		setCurrentDirectory(currentDirectory.subdirectories.find((dir) => dir.name === subdirName) as Directory);
		setDepth(depth + 1);
		setBlueSelectedFiles([]);
	};

	const onFolderLeave = (newDepth: number) => {
		const diff = depth - newDepth;
		let parent = currentDirectory;
		for (let i = 0; i < diff; i++) {
			parent = parent.parent as Directory;
		}
		setCurrentDirectory(parent);
		setDepth(newDepth);
		setBlueSelectedFiles([]);
	};

	const addItemToStateArray = <T extends { full_path: string }>(
		item: T,
		stateArray: T[],
		setStateArray: (items: T[]) => void
	) => {
		if (!stateArray.includes(item)) {
			setStateArray([...stateArray, item]);
		}
	};

	const removeItemFromStateArray = <T extends { full_path: string }>(
		item: T,
		stateArray: T[],
		setStateArray: (items: T[]) => void
	) => {
		const newStateArray = stateArray.filter((f) => f.full_path !== item.full_path);
		setStateArray(newStateArray);
	};

	// create an array of grid folder cards
	class FolderCardData {
		element: JSX.Element;

		constructor(dir: Directory) {
			this.element = (
				<Grid item key={dir.full_path}>
					<FolderCard
						name={dir.name}
						numFiles={dir.files.length}
						onFolderEnter={onFolderEnter}
						onBlueSelect={() => {
							addItemToStateArray(dir, blueSelectedFolders, setBlueSelectedFolders);
						}}
					/>
				</Grid>
			);
		}
	}

	const folderCards = currentDirectory.subdirectories.map((dir) => {
		return new FolderCardData(dir);
	});
	// create an array of grid file cards
	class fileCardData {
		element: JSX.Element;

		constructor(file: FileDB) {
			this.element = (
				<Grid item key={file.full_path}>
					<FileCard
						name={file.name}
						selectState={greenSelectedFiles.includes(file) ? "green" : "none"}
						onBlueSelect={() => {
							addItemToStateArray(file, blueSelectedFiles, setBlueSelectedFiles);
						}}
						onGreenSelect={() => {
							removeItemFromStateArray(file, blueSelectedFiles, setBlueSelectedFiles);
							addItemToStateArray(file, greenSelectedFiles, setGreenSelectedFiles);
						}}
						onDeSelect={() => {
							removeItemFromStateArray(file, greenSelectedFiles, setGreenSelectedFiles);
						}}
					/>
				</Grid>
			);
		}
	}

	const fileCards = currentDirectory.files.map((file) => {
		return new fileCardData(file);
	});

	if (isLoading) return <Typography>Loading...</Typography>;

	return (
		<Box width='100%' bgcolor='lightgray' margin={0}>
			<Stack width='100%'>
				<Paper elevation={1} sx={{ backgroundColor: "lightgray", borderRadius: 0 }}>
					<Tabs value={depth} onChange={(_, newValue) => onFolderLeave(newValue)} indicatorColor='primary'>
						{currentDirectory.full_path.split("-").map((dir, index) => (
							<Tab key={index} value={index} label={dir} />
						))}
					</Tabs>
				</Paper>

				<Box height='200px'>
					{folderCards.length > 0 || fileCards.length > 0 ? (
						<Grid container spacing={1} padding={1}>
							{folderCards.map((item) => item.element)}
							{fileCards.map((item) => item.element)}
						</Grid>
					) : (
						<Typography variant='body1' padding={2} color='grey'>
							No files or folders in this directory
						</Typography>
					)}
				</Box>

				<Stack direction='row' spacing={2} margin={2}>
					<FileUploadButton
						onUpload={(file: File) => setCurrentDirectory(currentDirectory.uploadFile(file))}
					/>
					<NewFolderButton dir_path={currentDirectory.full_path} />

					{blueSelectedFiles.length > 0 && (
						<DeleteButton text={`Delete ${blueSelectedFiles.length} items`} onDelete={() => {}} />
					)}
				</Stack>
			</Stack>
		</Box>
	);
};

export default FileExplorer;
