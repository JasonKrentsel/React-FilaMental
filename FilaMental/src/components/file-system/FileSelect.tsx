import { File, FileSystem } from "../../hooks/useFiles";
import Folder from "./FolderEntry";
import FileEntry from "./FileEntry";

interface FileSelectProps {
	fileSystem: FileSystem;
	onFileSettingUpdate: (
		file: File,
		useRAG: boolean,
		useVectorStore: boolean,
		chunkCount: number
	) => void;
}

const FileSelect = ({ fileSystem, onFileSettingUpdate }: FileSelectProps) => {
	const renderFileSystem = (fileSystem: FileSystem): React.ReactNode => {
		return (
			<>
				{fileSystem.directories.map((directory) => (
					<Folder key={directory.name} folder={directory}>
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

	return <>{renderFileSystem(fileSystem)}</>;
};

export default FileSelect;
