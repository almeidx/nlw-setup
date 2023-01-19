import { generateDatesFromStartOfYear } from "../utils/generate-dates-from-start-of-year.js";
import { HabitDay } from "./HabitDay";

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

const MINIMUM_SUMMARY_DATES_LENGTH = 18 * 7; // 18 weeks

const summaryDates = generateDatesFromStartOfYear();
const amountToFill = MINIMUM_SUMMARY_DATES_LENGTH - summaryDates.length;

export function SummaryTable() {
	return (
		<div className="flex w-full">
			<div className="grid-rows-7 grid grid-flow-row gap-3">
				{weekdays.map((weekday, idx) => (
					<div className="flex h-10 w-10 items-center justify-center text-xl text-zinc-400" key={idx}>
						{weekday}
					</div>
				))}
			</div>

			<div className="grid-rows-7 grid grid-flow-col gap-3">
				{summaryDates.map((date) => (
					<HabitDay amount={5} completed={Math.round(Math.random() * 5)} key={date.toString()} />
				))}

				{amountToFill > 0 &&
					Array.from({ length: amountToFill }, (_, idx) => (
						<div
							className="h-10 w-10 cursor-not-allowed rounded-lg border-2 border-zinc-800 bg-zinc-900 opacity-40"
							key={idx}
						/>
					))}
			</div>
		</div>
	);
}
