import { Box, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";

interface CardBaseProps {
	icon: React.ReactNode;
	headerText: string;
	subText?: string;

	selectState?: "none" | "blue" | "green";

	onBlueSelect?: () => void;
	onGreenSelect?: () => void;
	onDeSelect?: () => void;
}

const CardBase = ({
	icon,
	headerText,
	subText,
	selectState = "none",
	onBlueSelect,
	onGreenSelect,
	onDeSelect,
}: CardBaseProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isBlueSelected, setIsBlueSelected] = useState(false);
	const [isGreenSelected, setIsGreenSelected] = useState(false);

	useEffect(() => {
		setIsBlueSelected(selectState === "blue");
		setIsGreenSelected(selectState === "green");
	}, [selectState]);

	return (
		<Tooltip
			title={headerText}
			arrow
			slotProps={{
				popper: {
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, -15],
							},
						},
					],
				},
			}}>
			<Box
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => {
					if (isGreenSelected) {
						setIsBlueSelected(false);
						setIsGreenSelected(false);
						onDeSelect?.();
					}
					if (isBlueSelected) {
						setIsBlueSelected(false);
						setIsGreenSelected(true);
						onGreenSelect?.();
					}
					if (!isBlueSelected && !isGreenSelected) {
						setIsBlueSelected(true);
						setIsGreenSelected(false);
						onBlueSelect?.();
					}
				}}
				sx={{
					backgroundColor: isGreenSelected ? "lightgreen" : isBlueSelected ? "lightblue" : "transparent",
					"&::before": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: isHovered ? "rgba(224, 255, 255, 0.15)" : "transparent",
						pointerEvents: "none",
					},
					position: "relative",
					borderRadius: "5px",
					overflow: "hidden",
				}}>
				<Stack
					direction='row'
					height={50}
					maxHeight={50}
					width='auto'
					minWidth='100px'
					maxWidth='200px'
					padding={"3px"}>
					<Box minWidth={50} maxWidth={50} minHeight={50} maxHeight={50}>
						{icon}
					</Box>

					<Stack>
						<Typography variant='subtitle2'>
							{headerText.length > 25 ? headerText.substring(0, 22) + "..." : headerText}
						</Typography>
						<Typography variant='body2' fontSize={10} color='grey'>
							{subText}
						</Typography>
					</Stack>
				</Stack>
			</Box>
		</Tooltip>
	);
};

export default CardBase;
