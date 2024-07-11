import { FileSystem } from "../../hooks/useFiles";
import Folder from "./FolderEntry";
import File from "./FileEntry";
import { Divider } from "@mui/material";

interface FileSelectProps {
	fileSystem: FileSystem;
}

const renderFileSystem = (fileSystem: FileSystem) => {
	return (
		<>
			{fileSystem.directories.map((directory) => (
				<Folder key={directory.name} folder={directory}>
					{renderFileSystem(directory)}
				</Folder>
			))}
			<Divider />
			{fileSystem.files.map((file) => (
				<File key={file.name} file={file} />
			))}
		</>
	);
};

const FileSelect = ({ fileSystem }: FileSelectProps) => {
	return <>{renderFileSystem(fileSystem)}</>;
};

export default FileSelect;
