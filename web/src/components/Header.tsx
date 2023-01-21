import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "phosphor-react";
import logoSvg from "../assets/logo.svg";
import { NewHabitForm } from "./NewHabitForm";

export function Header() {
	return (
		<div className="mx-auto flex w-full max-w-3xl items-center justify-between">
			<img alt="Logótipo com o texto Habits" src={logoSvg} />

			<Dialog.Root>
				<Dialog.Trigger className="focus:ring-offset-background flex items-center gap-3 rounded-lg border border-violet-500 px-6 py-4 font-semibold transition-colors hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2">
					<Plus className="text-violet-500" size={20} />
					Novo hábito
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/80" />

					<Dialog.Content className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-zinc-900 p-10">
						<Dialog.Close className="absolute right-6 top-6 rounded-lg text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
							<X aria-label="Fechar" size={24} />
						</Dialog.Close>

						<Dialog.Title className="text-3xl font-extrabold leading-tight">Criar hábito</Dialog.Title>

						<NewHabitForm />
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}
