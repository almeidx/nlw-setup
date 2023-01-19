import { Check } from "phosphor-react";

export function NewHabitForm() {
	return (
		<form className="mt-6 flex w-full flex-col">
			<label className="font-semibold leading-tight" htmlFor="title">
				Qual é o seu comprometimento?
			</label>
			<input
				autoFocus
				className="mt-3 rounded-lg bg-zinc-800 p-4 placeholder:text-zinc-400	"
				id="title"
				placeholder="ex.: Exercícios, dormir bem, etc…"
				type="text"
			/>

			<label className="mt-4 font-semibold leading-tight" htmlFor="">
				Qual é a recorrência?
			</label>

			<button
				className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 font-semibold hover:bg-green-500"
				type="submit"
			>
				<Check size={20} weight="bold" />
				Confirmar
			</button>
		</form>
	);
}
