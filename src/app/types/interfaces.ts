import { StaticImageData } from "next/image";
import React from "react";

export interface OptionContextProps {
	option: string;
	setOption: React.Dispatch<React.SetStateAction<string>>;
}

export interface ICard {
	contestantId: string;
	name: string;
	image: StaticImageData | string;
	description?: string;
	isMale?: boolean;
	isFemale?: boolean;
	isSinger?: boolean;
	isPerformance?: boolean;
}
