"use client";
import { useMemo, useState } from "react";
import Card, {
	dataSelections,
	dataOthers,
} from "./components/Card";
import { useOptionContext } from "./context/OptionContext";
import { ICard } from "./types/interfaces";

export default function Home() {
	const { option, setOption } = useOptionContext();

	const data = useMemo(() => {
		if (option === "kq") return dataSelections;
		else return dataOthers;
	}, [option]);

	return (
		<main className="">
			<div className="flex pl-4 mb-6 items-center">
				<button
					className={`ml-4 inline-block font-semibold ${
						option === "kq" ? "" : "text-gray-400"
					}`}
					onClick={() => setOption("kq")}
				>
					Selections
				</button>
				<button
					className={`ml-4 inline-block font-semibold ${
						option !== "kq" ? "" : "text-gray-400"
					}`}
					onClick={() => setOption("others")}
				>
					Others
				</button>
			</div>
			<section className="flex flex-col justify-center items-center pb-8">
				{data.map((card, idx) => (
					<Card key={idx} {...card} />
				))}
			</section>
		</main>
	);
}
