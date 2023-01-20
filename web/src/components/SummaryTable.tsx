/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable @typescript-eslint/no-floating-promises */

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants.js";
import { generateDatesFromStartOfYear } from "../utils/generate-dates-from-start-of-year.js";
import { HabitDay } from "./HabitDay";

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

const MINIMUM_SUMMARY_DATES_LENGTH = 18 * 7; // 18 weeks

const summaryDates = generateDatesFromStartOfYear();
const amountToFill = MINIMUM_SUMMARY_DATES_LENGTH - summaryDates.length;

interface Summary {
	amount: number;
	completed: number;
	date: string;
	id: string;
}

export function SummaryTable() {
	const [summary, setSummary] = useState<Summary[]>([]);

	useEffect(() => {
		fetch(API_URL + "/summary").then(async (res) => {
			setSummary(await res.json());
		});
	}, []);

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
				{summaryDates.map((date) => {
					const summaryItem = summary.find((day) => dayjs(date).isSame(day.date, "day"));

					return (
						<HabitDay
							amount={summaryItem?.amount}
							completed={summaryItem?.completed}
							date={date}
							key={date.toString()}
						/>
					);
				})}

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
