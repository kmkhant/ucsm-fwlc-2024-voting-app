import Coupon from "@/models/Coupon";
import Contestant from "@/models/Contestant";
import connectDB from "../lib/connectDB";

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

		// check if contestant is already voted for prince instead of king
		if (currentCoupon.stats.isPrinceVoted) {
			return new Response(
				JSON.stringify({
					message: "Already Voted for the Prince",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		}

		// check if contestant is already voted for king
		if (currentCoupon.stats.isKingVoted) {
			return new Response(
				JSON.stringify({
					message: "Already Voted for the King",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		} else {
			// handle vote
			currentCoupon.stats.isKingVoted = true;

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

			// console.log("BEFORE UPDATE COUPON");

			const updatedCoupon = await Coupon.findOneAndUpdate(
				{
					coupon,
				},
				currentCoupon,
				{ new: true }
			);
		}
	}

	// handle prince vote
	if (candidateForPrince) {
		// check if contestant is a valid candidate for king
		if (!currentContestant.role.candidateForPrince) {
			return new Response(
				JSON.stringify({
					message: "Candidate is not for Prince",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		}
		// check if contestant is already voted for king instead of prince
		if (currentCoupon.stats.isKingVoted) {
			return new Response(
				JSON.stringify({
					message: "Already Voted for the King",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		}

		// check if contestant is already voted for prince
		if (currentCoupon.stats.isPrinceVoted) {
			return new Response(
				JSON.stringify({
					message: "Already Voted for the Prince",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		} else {
			// handle vote
			currentCoupon.stats.isPrinceVoted = true;

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
		// check if contestant is already voted for princess instead of queen
		if (currentCoupon.stats.isPrincessVoted) {
			return new Response(
				JSON.stringify({
					message: "Already Voted for the Princess",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		}

		// check if contestant is already voted for queen
		if (currentCoupon.stats.isQueenVoted) {
			return new Response(
				JSON.stringify({
					message: "Already Voted for the Queen",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		} else {
			// handle vote
			currentCoupon.stats.isQueenVoted = true;

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
	}

	// handle princess vote
	if (candidateForPrincess) {
		// check if contestant is a valid candidate for princess
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
		// check if contestant is already voted for queen instead of princess
		if (currentCoupon.stats.isQueenVoted) {
			return new Response(
				JSON.stringify({
					message: "Already Voted for the Queen",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		}

		// check if contestant is already voted for princess
		if (currentCoupon.stats.isPrincessVoted) {
			return new Response(
				JSON.stringify({
					message: "Already Voted for the Princess",
				}),
				{
					headers: { "content-type": "application/json" },
					status: 400,
				}
			);
		} else {
			// handle vote
			currentCoupon.stats.isPrincessVoted = true;

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
