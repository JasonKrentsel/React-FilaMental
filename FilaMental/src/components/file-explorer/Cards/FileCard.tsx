import { DocumentIcon } from "@heroicons/react/20/solid";
import CardBase from "./CardBase";

interface FileCardProps {
	name: string;
	selectState?: "none" | "blue" | "green";
	onBlueSelect?: () => void;
	onGreenSelect?: () => void;
	onDeSelect?: () => void;
}

const FileCard = ({
	name,
	selectState = "none",
	onBlueSelect,
	onGreenSelect,
	onDeSelect,
}: FileCardProps) => {
	return (
		<CardBase
			icon={<DocumentIcon style={{ color: "cornflowerblue" }} />}
			headerText={name}
			subText='X tokens'
			selectState={selectState}
			onBlueSelect={onBlueSelect}
			onGreenSelect={onGreenSelect}
			onDeSelect={onDeSelect}
		/>
	);
};

export default FileCard;
