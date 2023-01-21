import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useState, type FormEvent } from "react";
import { API_URL } from "../utils/constants";

const availableWeekdays = [
	"Domingo",
	"Segunda-feira",
	"Terça-feira",
	"Quarta-feira",
	"Quinta-feira",
	"Sexta-feira",
	"Sábado",
];

export function NewHabitForm() {
	const [title, setTitle] = useState("");
	const [weekdays, setWeekdays] = useState<number[]>([]);

	async function handleFormSubmit(event: FormEvent) {
		event.preventDefault();

		if (!title || !weekdays.length) {
			alert("Preencha todos os campos");
			return;
		}

		await fetch(API_URL + "/habits", {
			body: JSON.stringify({ title, weekdays }),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});

		setTitle("");
		setWeekdays([]);

		alert("Hábito criado com sucesso!");
	}

	function handleWeekdayToggle(weekday: number, checked: boolean) {
		if (checked) {
			setWeekdays((prev) => [...prev, weekday]);
		} else {
			setWeekdays((prev) => prev.filter((wd) => wd !== weekday));
		}
	}

	return (
		<form className="mt-6 flex w-full flex-col" onSubmit={handleFormSubmit}>
			<label className="font-semibold leading-tight" htmlFor="title">
				Qual é o seu comprometimento?
			</label>

			<input
				autoFocus
				className="mt-3 rounded-lg bg-zinc-800 p-4 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
				id="title"
				onChange={(event) => setTitle(event.target.value)}
				placeholder="ex.: Exercícios, dormir bem, etc…"
				type="text"
				value={title}
			/>

			<label className="mt-4 font-semibold leading-tight" htmlFor="">
				Qual é a recorrência?
			</label>

			<div className="mt-3 flex flex-col gap-2">
				{availableWeekdays.map((weekday, idx) => (
					<Checkbox.Root
						checked={weekdays.includes(idx)}
						className="group flex items-center gap-3 focus:outline-none"
						key={idx}
						onCheckedChange={(checked) => handleWeekdayToggle(idx, Boolean(checked))}
					>
						<div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900 group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
							<Checkbox.Indicator>
								<Check className="text-white" size={20} />
							</Checkbox.Indicator>
						</div>

						<span className="leading-tight">{weekday}</span>
					</Checkbox.Root>
				))}
			</div>

			<button
				className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 font-semibold transition-colors hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
				type="submit"
			>
				<Check size={20} weight="bold" />
				Confirmar
			</button>
		</form>
	);
}
