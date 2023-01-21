/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable @typescript-eslint/no-floating-promises */

import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants.js";

interface HabitListProps {
	date: Date;
	onCompletedChange(completed: number): void;
}

interface HabitsInfo {
	completedHabits: string[];
	possibleHabits: {
		created_at: string;
		id: string;
		title: string;
	}[];
}

export function HabitList({ date, onCompletedChange }: HabitListProps) {
	const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

	useEffect(() => {
		fetch(API_URL + "/day?date=" + date.toISOString()).then(async (res) => {
			const data = await res.json();
			setHabitsInfo(data);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

	async function handleHabitToggle(habitId: string) {
		await fetch(`${API_URL}/habits/${habitId}/toggle`, { method: "PATCH" });

		let completedHabits: string[];

		if (habitsInfo!.completedHabits.includes(habitId)) {
			completedHabits = habitsInfo!.completedHabits.filter((habit) => habit !== habitId);
		} else {
			completedHabits = [...habitsInfo!.completedHabits, habitId];
		}

		setHabitsInfo({ ...habitsInfo!, completedHabits });

		onCompletedChange(completedHabits.length);
	}

	return (
		<div className="mt-6 flex flex-col gap-3">
			{habitsInfo?.possibleHabits.map((habit) => (
				<Checkbox.Root
					checked={habitsInfo.completedHabits.includes(habit.id)}
					className="group flex items-center gap-3 focus:outline-none disabled:cursor-not-allowed"
					disabled={isDateInPast}
					key={habit.id}
					onCheckedChange={async () => handleHabitToggle(habit.id)}
				>
					<div className="group-focus:ring-offset-background flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
						<Checkbox.Indicator>
							<Check className="text-white" size={20} />
						</Checkbox.Indicator>
					</div>

					<span className="text-xl font-semibold leading-tight group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:line-through">
						{habit.title}
					</span>
				</Checkbox.Root>
			))}
		</div>
	);
}
