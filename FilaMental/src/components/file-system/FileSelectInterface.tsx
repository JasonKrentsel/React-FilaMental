import { File, FileSystem } from "../../hooks/useFiles";
import Folder from "./FolderEntry";
import FileEntry from "./FileEntry";
import { useState } from "react";
import FileUploadButton from "./FileUploadButton";
import NewFolderButton from "./NewFolderButton";
import { Stack } from "@mui/material";

interface FileSelectInterfaceProps {
	fileSystem: FileSystem;
	onFileSettingUpdate: (
		file: File,
		useRAG: boolean,
		useVectorStore: boolean,
		chunkCount: number
	) => void;
}

const FileSelectInterface = ({
	fileSystem,
	onFileSettingUpdate,
}: FileSelectInterfaceProps) => {
	const [, setFsVariable] = useState(fileSystem);

	const fileSystemUpdate = () => {
		setFsVariable(fileSystem);
	};

	const renderFileSystem = (fileSystem: FileSystem): React.ReactNode => {
		return (
			<>
				{fileSystem.subdirectories.map((directory) => (
					<Folder
						key={directory.name}
						folder={directory}
						onFileSystemUpdate={fileSystemUpdate}>
						{renderFileSystem(directory)}
					</Folder>
				))}
				{fileSystem.files.map((file) => (
					<FileEntry
						key={file.name}
						file={file}
						onFileSettingUpdate={onFileSettingUpdate}
					/>
				))}
			</>
		);
	};

	return (
		<>
			{renderFileSystem(fileSystem)}
			<Stack direction='row' spacing={2} sx={{ margin: "10px 0" }}>
				<FileUploadButton
					dir_path={fileSystem.full_path}
					onUpload={fileSystemUpdate}
				/>
				<NewFolderButton dir_path={fileSystem.full_path} />
			</Stack>
		</>
	);
};

export default FileSelectInterface;
