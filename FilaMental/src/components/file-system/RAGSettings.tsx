import { Box, Checkbox, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "./RagSettings.css";

interface RAGSettingsProps {
	verbose: boolean;
}

const RAGSettings = ({ verbose }: RAGSettingsProps) => {
	const [enableRAG, setEnableRAG] = useState(false);
	const [enableVectorStore, setEnableVectorStore] = useState(false);
	const [chunkCount, setChunkCount] = useState(2);

	const disableRag = () => {
		setEnableRAG(false);
		setEnableVectorStore(false);
	};

	return (
		<>
			{verbose ? (
				<Stack direction='row' alignItems='center'>
					<Typography variant='body1'>enable RAG</Typography>
					<Checkbox
						checked={enableRAG}
						onChange={(e) => {
							setEnableRAG(e.target.checked);
							if (!e.target.checked) {
								disableRag();
							}
						}}
					/>
					<Typography variant='body1'>enable Vector Store</Typography>
					<Checkbox
						checked={enableVectorStore}
						onChange={(e) => setEnableVectorStore(e.target.checked)}
						disabled={!enableRAG}
					/>
					<Typography variant='body1'>Chunks</Typography>
					<Box padding={1} width={10}>
						<input
							type='number'
							min='2'
							value={chunkCount}
							onChange={(e) =>
								setChunkCount(Number(e.target.value))
							}
						/>
					</Box>
				</Stack>
			) : (
				<Stack direction='row' alignItems='center' spacing={1}>
					{enableRAG ? (
						<CheckCircleIcon className='green-icon' />
					) : (
						<RemoveCircleIcon className='grey-icon' />
					)}
					<Typography variant='body2'>RAG</Typography>
					{enableRAG && (
						<>
							<Divider orientation='vertical' flexItem />
							{enableVectorStore ? (
								<CheckCircleIcon className='green-icon' />
							) : (
								<RemoveCircleIcon className='grey-icon' />
							)}
							<Typography variant='body2'>VS</Typography>
						</>
					)}
					{enableVectorStore && (
						<>
							<Divider orientation='vertical' flexItem />
							<Typography variant='body2'>
								{chunkCount} Chunks
							</Typography>
						</>
					)}
				</Stack>
			)}
		</>
	);
};

export default RAGSettings;
