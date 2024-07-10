import { useEffect, useState } from "react";

export interface File {
	name: string;
	path: string;
	type: string;
}

export interface FileSystem {
	name: string;
	path: string;
	files: File[];
	directories: FileSystem[];
}

const useFiles = () => {
	const [fileSystem, setFileSystem] = useState<FileSystem>({
		name: "",
		path: "",
		files: [],
		directories: [],
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// handle getting the file system from backend

	// for testing purposes, generic file system
	useEffect(() => {
		setError("");
		setIsLoading(false);

		const testingFileSystem: FileSystem = {
			name: "root",
			path: "/",
			files: [
				{ name: "file1.txt", path: "file1.txt", type: "text/plain" },
				{ name: "file2.txt", path: "file2.txt", type: "text/plain" },
				{ name: "file3.txt", path: "file3.txt", type: "text/plain" },
			],
			directories: [
				{
					name: "folder1",
					path: "folder1",
					files: [
						{
							name: "subfile1.txt",
							path: "folder1/subfile1.txt",
							type: "text/plain",
						},
						{
							name: "subfile2.txt",
							path: "folder1/subfile2.txt",
							type: "text/plain",
						},
						{
							name: "subfile3.txt",
							path: "folder1/subfile3.txt",
							type: "text/plain",
						},
					],
					directories: [],
				},
				{
					name: "folder2",
					path: "folder2",
					files: [],
					directories: [
						{
							name: "subfolder1",
							path: "folder2/subfolder1",
							files: [
								{
									name: "subfile1.txt",
									path: "folder2/subfolder1/subfile1.txt",
									type: "text/plain",
								},
								{
									name: "subfile2.txt",
									path: "folder2/subfolder1/subfile2.txt",
									type: "text/plain",
								},
								{
									name: "subfile3.txt",
									path: "folder2/subfolder1/subfile3.txt",
									type: "text/plain",
								},
							],
							directories: [],
						},
					],
				},
				{
					name: "folder3",
					path: "folder3",
					files: [],
					directories: [],
				},
			],
		};

		setFileSystem(testingFileSystem);
	}, []);

	return { fileSystem, error, isLoading };
};

export default useFiles;
