import * as Checkbox from "@radix-ui/react-checkbox";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { ProgressBar } from "./ProgressBar";

interface HabitDayProps {
	amount: number | undefined;
	completed: number | undefined;
	date: Date;
}

export function HabitDay({ amount = 0, completed = 0, date }: HabitDayProps) {
	const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

	const dayjsDate = dayjs(date);
	const dayAndMonth = dayjsDate.format("DD/MM");
	const dayOfWeek = dayjsDate.format("dddd");

	return (
		<Popover.Root>
			<Popover.Trigger
				className={clsx("h-10 w-10 rounded-lg border-2", {
					"bg-zinc-900 border-zinc-800": completedPercentage === 0,
					"bg-violet-900 border-violet-700": completedPercentage > 0 && completedPercentage < 20,
					"bg-violet-800 border-violet-600": completedPercentage >= 20 && completedPercentage < 40,
					"bg-violet-700 border-violet-500": completedPercentage >= 40 && completedPercentage < 60,
					"bg-violet-600 border-violet-500": completedPercentage >= 60 && completedPercentage < 80,
					"bg-violet-500 border-violet-400": completedPercentage >= 80,
				})}
			/>

			<Popover.Portal>
				<Popover.Content className="flex min-w-[320px] flex-col rounded-2xl bg-zinc-900 p-6">
					<span className="font-semibold text-zinc-400">{dayOfWeek}</span>
					<span className="mt-1 text-3xl font-extrabold leading-tight">{dayAndMonth}</span>

					<ProgressBar progress={completedPercentage} />

					<div className="mt-6 flex flex-col gap-3">
						<Checkbox.Root className="group flex items-center gap-3">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
								<Checkbox.Indicator>
									<Check className="text-white" size={20} />
								</Checkbox.Indicator>
							</div>

							<span className="text-xl font-semibold leading-tight group-data-[state=checked]:text-zinc-400 group-data-[state=checked]:line-through">
								Beber 2L de água
							</span>
						</Checkbox.Root>
					</div>

					<Popover.Arrow className="fill-zinc-900" height={8} width={16} />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
