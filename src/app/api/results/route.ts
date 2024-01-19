import voucher_codes from "voucher-code-generator";
import Coupon from "@/models/Coupon";
import Contestant from "@/models/Contestant";
import connectDB from "../lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	await connectDB();

	const king = await Contestant.findOne(
		{
			"role.candidateForKing": true,
		},
		["contestantId", "name", "votes.king"],
		{ sort: { "votes.king": -1 } }
	);

	const queen = await Contestant.findOne(
		{
			"role.candidateForQueen": true,
		},
		["contestantId", "name", "votes.queen"],
		{ sort: { "votes.queen": -1 } }
	);

	const prince = await Contestant.findOne(
		{
			"role.candidateForPrince": true,
		},
		["contestantId", "name", "votes.prince"],
		{ sort: { "votes.prince": -1 } }
	);

	// console.log(prince.votes);

	const princess = await Contestant.findOne(
		{
			"role.candidateForPrincess": true,
		},
		["contestantId", "name", "votes.princess"],
		{ sort: { "votes.princess": -1 } }
	);

	const singer = await Contestant.findOne(
		{
			"role.candidateForSinger": true,
		},
		["contestantId", "name", "votes.singer"],
		{ sort: { "votes.singer": -1 } }
	);

	const performance = await Contestant.findOne(
		{
			"role.candidateForPerformance": true,
		},
		["contestantId", "name", "votes.performance"],
		{ sort: { "votes.performance": -1 } }
	);

	return NextResponse.json({
		fresherKing: {
			contestantId: king.contestantId,
			name: king.name,
			votes: king.votes.king,
		},
		fresherQueen: {
			constestandId: queen.contestantId,
			name: queen.name,
			votes: queen.votes.queen,
		},
		fresherPrince: {
			contestantId: prince.contestantId,
			name: prince.name,
			votes: prince.votes.prince,
		},
		fresherPrincess: {
			contestantId: princess.contestantId,
			name: princess.name,
			votes: princess.votes.princess,
		},
		bestSinger: {
			contestantId: singer.contestantId,
			name: singer.name,
			votes: singer.votes.singer,
		},
		bestPerformance: {
			contestandtId: performance.contestantId,
			name: performance.name,
			votes: performance.votes.performance,
		},
	});
}
