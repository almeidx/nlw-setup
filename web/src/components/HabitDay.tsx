import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import { HabitList } from "./HabitList";
import { ProgressBar } from "./ProgressBar";

interface HabitDayProps {
	amount: number | undefined;
	date: Date;
	defaultCompleted: number | undefined;
}

export function HabitDay({ amount = 0, defaultCompleted = 0, date }: HabitDayProps) {
	const [completed, setCompleted] = useState(defaultCompleted);

	const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

	const dayjsDate = dayjs(date);
	const dayAndMonth = dayjsDate.format("DD/MM");
	const dayOfWeek = dayjsDate.format("dddd");

	return (
		<Popover.Root>
			<Popover.Trigger
				className={clsx(
					"focus:ring-offset-background h-10 w-10 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2",
					{
						"bg-zinc-900 border-zinc-800": completedPercentage === 0,
						"bg-violet-900 border-violet-700": completedPercentage > 0 && completedPercentage < 20,
						"bg-violet-800 border-violet-600": completedPercentage >= 20 && completedPercentage < 40,
						"bg-violet-700 border-violet-500": completedPercentage >= 40 && completedPercentage < 60,
						"bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
						"bg-violet-500 border-violet-400": completedPercentage >= 80,
					},
				)}
			/>

			<Popover.Portal>
				<Popover.Content className="flex min-w-[320px] flex-col rounded-2xl bg-zinc-900 p-6">
					<span className="font-semibold text-zinc-400">{dayOfWeek}</span>
					<span className="mt-1 text-3xl font-extrabold leading-tight">{dayAndMonth}</span>

					<ProgressBar progress={completedPercentage} />

					<HabitList date={date} onCompletedChange={() => setCompleted(completed)} />

					<Popover.Arrow className="fill-zinc-900" height={8} width={16} />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
