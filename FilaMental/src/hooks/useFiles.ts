import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosService";
import { CanceledError } from "axios";

export interface FileDB {
	name: string;
	full_path: string;
}

interface DirectoryResponse {
	name: string;
	full_path: string;
	files: FileDB[];
	subdirectories: DirectoryResponse[];
}

export class Directory {
	name: string;
	full_path: string;
	files: FileDB[];
	subdirectories: Directory[];

	parent: Directory | null;

	constructor(
		name: string = "",
		full_path: string = "",
		files: FileDB[] = [],
		subdirectories: DirectoryResponse[] = [],
		parent: Directory | null = null
	) {
		this.name = name;
		this.full_path = full_path;
		this.files = files;
		this.subdirectories = subdirectories.map(
			(dir) =>
				new Directory(
					dir.name,
					dir.full_path,
					dir.files,
					dir.subdirectories,
					this
				)
		);
		this.parent = parent;
	}

	getRoot(): Directory {
		if (this.parent) {
			return this.parent.getRoot();
		}
		return this;
	}

	getSubdirectoryByName(name: string): Directory | null {
		return this.subdirectories.find((dir) => dir.name === name) || null;
	}

	copy(): Directory {
		return new Directory(
			this.name,
			this.full_path,
			this.files,
			this.subdirectories,
			this.parent
		);
	}

	uploadFile(file: File) {
		const newDir = this.copy();

		newDir.files.push({
			name: file.name,
			full_path: this.full_path + "-" + file.name,
		});
		const formData = new FormData();
		formData.append("file", file);
		axiosInstance
			.post(`/filesystem/dir/${newDir.full_path}/files/`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.catch(() => {
				newDir.files.pop();
			});
		return newDir;
	}
}

const useFiles = (setStateVariable: (dir: Directory) => void) => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// handle getting the file system from backend
	useEffect(() => {
		const controller = new AbortController();

		setIsLoading(true);
		axiosInstance
			.get<DirectoryResponse[]>("/filesystem/dir/")
			.then((response) => {
				const root = new Directory(
					response.data[0].name,
					response.data[0].full_path,
					response.data[0].files,
					response.data[0].subdirectories,
					null
				);

				setStateVariable(root);
			})
			.catch((error) => {
				if (!(error instanceof CanceledError)) setError(error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});

		return () => controller.abort();
	}, [setStateVariable]);

	return { error, isLoading };
};

export default useFiles;
