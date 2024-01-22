"use client";
import { useMemo, useState } from "react";
import Card, {
	dataSelections,
	dataOthers,
} from "./components/Card";
import { useOptionContext } from "./context/OptionContext";
import { ICard } from "./types/interfaces";
import instance from "@/utils/axios";
import { useQuery } from "react-query";
import { Metadata } from "next";
import { LineWave, Triangle } from "react-loader-spinner";

const metadata: Metadata = {
	title: "Fresher Welcome 2024",
};

export default function Home() {
	const { option, setOption } = useOptionContext();
	const [show, setShow] = useState<Boolean>(false);

	const data = useMemo(() => {
		if (option === "kq") return dataSelections;
		else return dataOthers;
	}, [option]);

	const getServerStatus = async () => {
		try {
			const resp = await instance.get("/toggleServer");
			const { data } = resp;
			setShow(data.show);
		} catch (e) {
			console.log(e);
			return undefined;
		}
	};

	const { status, isFetching } = useQuery(
		"serverStatus",
		getServerStatus
	);

	// useEffect(() => {
	// 	instance
	// 		.get("/toggleServer")
	// 		.then((res) => {
	// 			setShow(res.data.show);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	return !show ? (
		<main className="text-center min-h-[70vh]">
			{status === "loading" && (
				<div>
					<div className="min-h-[20vh]"></div>
					<div className="flex flex-col justify-center items-center">
						<Triangle
							visible={true}
							height="80"
							width="80"
							color="#000"
							wrapperStyle={{}}
						/>
					</div>
				</div>
			)}
			{status === "success" && (
				<div>
					<div className="min-h-[20vh]"></div>
					<div className="flex flex-col justify-center items-center">
						<h3>Voting is not opened yet...</h3>
						<h3>Please Be Patient 🙏 </h3>
					</div>
				</div>
			)}
		</main>
	) : (
		<main className="min-h-screen">
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
