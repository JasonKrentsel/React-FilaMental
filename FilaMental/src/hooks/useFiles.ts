import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosService";
import { CanceledError } from "axios";

export interface File {
	name: string;
	full_path: string;
	//type: string;
}

export interface FileSystem {
	name: string;
	full_path: string;
	files: File[];
	subdirectories: FileSystem[];
}

const useFiles = () => {
	const [fileSystem, setFileSystem] = useState<FileSystem>({
		name: "",
		full_path: "",
		files: [],
		subdirectories: [],
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// handle getting the file system from backend
	useEffect(() => {
		const controller = new AbortController();

		setIsLoading(true);
		axiosInstance
			.get<FileSystem[]>("/filesystem/dir/")
			.then((response) => {
				setFileSystem(response.data[0]);
			})
			.catch((error) => {
				if (!(error instanceof CanceledError)) setError(error.message);
			})
			.finally(() => setIsLoading(false));

		return () => controller.abort();
	}, []);

	return { fileSystem, error, isLoading };
};

export default useFiles;
