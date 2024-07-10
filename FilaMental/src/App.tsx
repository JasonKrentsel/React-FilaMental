import FileSelect from "./components/file-system/FileSelect";
import useFiles from "./hooks/useFiles";

function App() {
	// Handle getting the files from the server
	const { fileSystem } = useFiles();

	return (
		<>
			<h1>Heading</h1>
			<FileSelect fileSystem={fileSystem} />
		</>
	);
}

export default App;
