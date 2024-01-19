import Coupon from "@/models/Coupon";
import Contestant from "@/models/Contestant";
import connectDB from "../lib/connectDB";
import { NextResponse } from "next/server";

interface IRequest {
	contestantId: string;
	coupon: string;
	candidateForKing?: boolean;
	candidateForPrince?: boolean;
	candidateForSinger?: boolean;
	candidateForQueen?: boolean;
	candidateForPrincess?: boolean;
	candidateForPerformance?: boolean;
}

export async function POST(request: Request) {
	await connectDB();

	const {
		contestantId,
		coupon,
		candidateForKing,
		candidateForPrince,
		candidateForQueen,
		candidateForPrincess,
		candidateForSinger,
		candidateForPerformance,
	}: IRequest = await request.json();

	// console.log(coupon);

	// Check if coupon is valid and already generated
	const currentCoupon = await Coupon.findOne({
		coupon,
	});

	if (!currentCoupon) {
		return new Response(
			JSON.stringify({ message: "Invalid coupon" }),
			{
				headers: { "content-type": "application/json" },
				status: 400,
			}
		);
	}

	if (!contestantId) {
		return new Response(
			JSON.stringify({
				message: "No ContestantId Provided",
			}),
			{
				headers: { "content-type": "application/json" },
				status: 400,
			}
		);
	}

	// Check if contestant is valid
	const currentContestant = await Contestant.findOne({
		contestantId,
	});

	if (!currentContestant) {
		return new Response(
			JSON.stringify({
				message: "Invalid Contestant Id",
			}),
			{
				headers: { "content-type": "application/json" },
				status: 400,
			}
		);
	}

	// handle king vote
	if (candidateForKing) {
		// check if contestant is a valid candidate for king
		if (!currentContestant.role.candidateForKing) {
			return new Response(
				JSON.stringify({
					message: "Candidate is not for King",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		}

		// check if contestant is already voted for king
		if (currentCoupon.stats.king.isKingVoted) {
			return NextResponse.json(
				{
					message: `Already voted ${currentCoupon.stats.king.votedKing} for King using this coupon`,
				},
				{ status: 400 }
			);
		}

		// check if contestant is already voted for prince
		if (currentCoupon.stats.prince.isPrinceVoted) {
			// check if voted contestant is being voted for prince with this coupon
			if (
				currentCoupon.stats.prince.votedPrince ==
				contestantId
			) {
				return NextResponse.json(
					{
						message: `Already voted ${currentCoupon.stats.prince.votedPrince} for Prince using this coupon`,
					},
					{ status: 400 }
				);
			}
		}
		// handle vote
		// add voted king to coupon
		currentCoupon.stats.king.votedKing = contestantId;

		// handle king vote
		currentCoupon.stats.king.isKingVoted = true;

		// increase vote count
		currentContestant.votes.king += 1;

		const updatedContestant =
			await Contestant.findOneAndUpdate(
				{
					contestantId,
				},
				currentContestant,
				{ new: true }
			);

		const updatedCoupon = await Coupon.findOneAndUpdate(
			{
				coupon,
			},
			currentCoupon,
			{ new: true }
		);
	}

	// handle prince vote
	if (candidateForPrince) {
		// check if contestant is a valid candidate for king
		if (!currentContestant.role.candidateForPrince) {
			return NextResponse.json(
				{ message: "Candidate is not for Prince" },
				{ status: 400 }
			);
		}

		// check if coupon is already voted for prince
		if (currentCoupon.stats.prince.isPrinceVoted) {
			return NextResponse.json(
				{
					message: `Already voted ${currentCoupon.stats.prince.votedPrince} for Prince using this coupon`,
				},
				{ status: 400 }
			);
		}
		// check if contestant is already voted for king
		if (currentCoupon.stats.king.isKingVoted) {
			// check if voted contestant is being voted for king with this coupon
			if (
				currentCoupon.stats.king.votedKing == contestantId
			) {
				return NextResponse.json(
					{
						message: `You already voted ${currentCoupon.stats.king.votedKing} for King using this coupon`,
					},
					{ status: 400 }
				);
			}
		}
		// handle vote
		// add voted prince to coupon
		currentCoupon.stats.prince.votedPrince = contestantId;

		// set prince vote
		currentCoupon.stats.prince.isPrinceVoted = true;

		// increase vote count
		currentContestant.votes.prince += 1;

		const updatedContestant =
			await Contestant.findOneAndUpdate(
				{
					contestantId,
				},
				currentContestant,
				{ new: true }
			);

		const updatedCoupon = await Coupon.findOneAndUpdate(
			{
				coupon,
			},
			currentCoupon,
			{ new: true }
		);
	}

	// handle queen vote
	if (candidateForQueen) {
		// check if contestant is a valid candidate for queen
		if (!currentContestant.role.candidateForQueen) {
			return new Response(
				JSON.stringify({
					message: "Candidate is not for Queen",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		}

		// check if contestant is already voted for queen
		if (currentCoupon.stats.queen.isQueenVoted) {
			return NextResponse.json(
				{
					message: `Already voted ${currentCoupon.stats.queen.votedQueen} for Queen using this coupon`,
				},
				{ status: 400 }
			);
		}

		// check if contestant is already voted for princess
		if (currentCoupon.stats.princess.isPrincessVoted) {
			// check if voted contestant is being voted for princess with this coupon
			if (
				currentCoupon.stats.princess.votedPrincess ==
				contestantId
			) {
				return NextResponse.json(
					{
						message: `Already voted ${currentCoupon.stats.princess.votedPrincess} for Princess using this coupon`,
					},
					{ status: 400 }
				);
			}
		}
		// handle vote
		// add voted queen to coupon
		currentCoupon.stats.queen.votedQueen = contestantId;

		// handle queen vote
		currentCoupon.stats.queen.isQueenVoted = true;

		// increase vote count
		currentContestant.votes.queen += 1;

		const updatedContestant =
			await Contestant.findOneAndUpdate(
				{
					contestantId,
				},
				currentContestant,
				{ new: true }
			);

		const updatedCoupon = await Coupon.findOneAndUpdate(
			{
				coupon,
			},
			currentCoupon,
			{ new: true }
		);
	}

	// handle princess vote
	if (candidateForPrincess) {
		// check if contestant is a valid candidate for queen
		if (!currentContestant.role.candidateForPrincess) {
			return new Response(
				JSON.stringify({
					message: "Candidate is not for Princess",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		}

		// check if contestant is already voted for princess
		if (currentCoupon.stats.princess.isPrincessVoted) {
			return NextResponse.json(
				{
					message: `Already voted ${currentCoupon.stats.princess.votedPrincess} for Princess using this coupon`,
				},
				{ status: 400 }
			);
		}

		// check if contestant is already voted for queen
		if (currentCoupon.stats.queen.isQueenVoted) {
			// check if voted contestant is being voted for queen with this coupon
			if (
				currentCoupon.stats.queen.votedQueen == contestantId
			) {
				return NextResponse.json(
					{
						message: `Already voted ${currentCoupon.stats.queen.votedQueen} for Queen using this coupon`,
					},
					{ status: 400 }
				);
			}
		}
		// handle vote
		// add voted princess to coupon
		currentCoupon.stats.princess.votedPrincess =
			contestantId;

		// handle princess vote
		currentCoupon.stats.princess.isPrincessVoted = true;

		// increase vote count
		currentContestant.votes.princess += 1;

		const updatedContestant =
			await Contestant.findOneAndUpdate(
				{
					contestantId,
				},
				currentContestant,
				{ new: true }
			);

		const updatedCoupon = await Coupon.findOneAndUpdate(
			{
				coupon,
			},
			currentCoupon,
			{ new: true }
		);
	}

	// handle singer vote
	if (candidateForSinger) {
		// check if contestant is a valid candidate for singer
		if (!currentContestant.role.candidateForSinger) {
			return new Response(
				JSON.stringify({
					message: "Candidate is not for Singer",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		}

		// check if contestant is already voted for singer
		if (currentCoupon.stats.isSingerVoted) {
			return new Response(
				JSON.stringify({
					message: "Already Voted for the Singer",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		} else {
			// handle vote
			currentCoupon.stats.isSingerVoted = true;

			// increase vote count
			currentContestant.votes.singer += 1;

			const updatedContestant =
				await Contestant.findOneAndUpdate(
					{
						contestantId,
					},
					currentContestant,
					{ new: true }
				);

			const updatedCoupon = await Coupon.findOneAndUpdate(
				{
					coupon,
				},
				currentCoupon,
				{ new: true }
			);
		}
	}

	// handle performance vote
	if (candidateForPerformance) {
		// check if contestant is a valid candidate for performance
		if (!currentContestant.role.candidateForPerformance) {
			return new Response(
				JSON.stringify({
					message: "Candidate is not for Performance",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		}

		// check if contestant is already voted for prince
		if (currentCoupon.stats.isPerformanceVoted) {
			return new Response(
				JSON.stringify({
					message: "Already Voted for the Performance",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		} else {
			// handle vote
			currentCoupon.stats.isPerformanceVoted = true;

			// increase vote count
			currentContestant.votes.performance += 1;

			const updatedContestant =
				await Contestant.findOneAndUpdate(
					{
						contestantId,
					},
					currentContestant,
					{ new: true }
				);

			const updatedCoupon = await Coupon.findOneAndUpdate(
				{
					coupon,
				},
				currentCoupon,
				{ new: true }
			);
		}
	}

	return new Response(
		JSON.stringify({
			message: "Vote Success",
		}),
		{
			headers: { "content-type": "application/json" },
			status: 200,
		}
	);
}
