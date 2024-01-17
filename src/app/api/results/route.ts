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
		{ sort: { "votes.king": -1 } }
	).select("contestantId name votes.king");

	const queen = await Contestant.findOne(
		{
			"role.candidateForQueen": true,
		},
		{ sort: { "votes.queen": -1 } }
	).select("contestantId name votes.queen");

	const prince = await Contestant.findOne(
		{
			"role.candidateForPrince": true,
		},
		{ sort: { "votes.prince": -1 } }
	).select("contestantId name votes.prince");

	// console.log(prince.votes);

	const princess = await Contestant.findOne(
		{
			"role.candidateForPrincess": true,
		},
		{ sort: { "votes.princess": -1 } }
	).select("contestantId name votes.princess");

	const singer = await Contestant.findOne(
		{
			"role.candidateForSinger": true,
		},
		{ sort: { "votes.singer": -1 } }
	).select("contestantId name votes.singer");

	const performance = await Contestant.findOne(
		{
			"role.candidateForPerformance": true,
		},
		{ sort: { "votes.performance": -1 } }
	).select("contestantId name votes.performance");

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
