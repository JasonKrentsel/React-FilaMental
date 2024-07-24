import axiosInstance from "./axiosService";

// need code for uploading files to the server
// need code for deleting files from the server
// need code for creating directories on the server
// need code for deleting directories on the server

export const uploadFile = (file: File, dir_path: string) => {
	const formData = new FormData();
	formData.append("file", file);
	axiosInstance.post(`/filesystem/dir/${dir_path}/files/`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};
