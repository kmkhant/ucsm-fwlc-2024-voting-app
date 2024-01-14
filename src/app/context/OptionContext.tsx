import { useContext, createContext, useState } from "react";
import { OptionContextProps } from "../types/interfaces";

// create context object
const OptionContext = createContext<OptionContextProps>({
	option: "kq",
	setOption: () => {},
});

export const OptionStateContext = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [option, setOption] = useState<string>("kq");
	return (
		<OptionContext.Provider value={{ option, setOption }}>
			{children}
		</OptionContext.Provider>
	);
};

export const useOptionContext = () =>
	useContext(OptionContext);
