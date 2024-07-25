import { FolderIcon } from "@heroicons/react/20/solid";
import CardBase from "./CardBase";

interface FolderCardProps {
	name: string;
	numFiles: number;
	onFolderEnter?: (subdirName: string) => void;
	selectState?: "blue" | "none";
	onBlueSelect?: () => void;
}

const FolderCard = ({
	name,
	numFiles,
	onFolderEnter,
	onBlueSelect,
	selectState = "none",
}: FolderCardProps) => {
	return (
		<CardBase
			icon={<FolderIcon style={{ color: "orange" }} />}
			headerText={name}
			subText={`${numFiles} files`}
			onGreenSelect={() => onFolderEnter?.(name)}
			onBlueSelect={onBlueSelect}
			selectState={selectState}
		/>
	);
};

export default FolderCard;
