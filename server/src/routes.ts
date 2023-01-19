import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma.js";

export async function appRoutes(app: FastifyInstance) {
	app.post<{ Body: { title: string; weekdays: number[] } }>(
		"/habits",
		{
			schema: {
				body: {
					type: "object",
					properties: {
						title: { type: "string" },
						weekdays: { type: "array", items: { type: "number", minimum: 0, maximum: 6 } },
					},
					required: ["title", "weekdays"],
				},
			},
		},
		async (request) => {
			const { title, weekdays } = request.body;

			const today = dayjs().startOf("day").toDate();

			await prisma.habit.create({
				data: {
					title,
					created_at: today,
					weekdays: {
						create: weekdays.map((weekday) => ({ weekday })),
					},
				},
			});
		},
	);

	app.get<{ Querystring: { date: string } }>(
		"/day",
		{
			schema: {
				querystring: {
					type: "object",
					properties: {
						date: { type: "string", format: "date-time" },
					},
					required: ["date"],
				},
			},
		},
		async (request) => {
			const { date: rawDate } = request.query;

			const parsedDate = dayjs(rawDate).startOf("day");

			const weekday = parsedDate.get("day");
			const date = parsedDate.toDate();

			const possibleHabits = await prisma.habit.findMany({
				where: {
					created_at: { lte: date },
					weekdays: { some: { weekday } },
				},
			});

			const day = await prisma.day.findUnique({
				where: { date },
				include: {
					dayHabits: {
						select: { habit_id: true },
					},
				},
			});

			const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.habit_id) ?? [];

			return { possibleHabits, completedHabits };
		},
	);

	// broken?
	app.patch<{ Params: { id: string } }>(
		"/habits/:id/toggle",
		{
			schema: {
				params: {
					type: "object",
					properties: {
						id: { type: "string", format: "uuid" },
					},
					required: ["id"],
				},
			},
		},
		async (request) => {
			const { id } = request.params;

			const today = dayjs().startOf("day").toDate();

			let day = await prisma.day.findUnique({ where: { date: today } });

			day ??= await prisma.day.create({ data: { date: today } });

			const dayHabit = await prisma.dayHabit.findUnique({
				where: { day_id_habit_id: { day_id: day.id, habit_id: id } },
			});

			if (dayHabit) {
				await prisma.dayHabit.delete({ where: { id: dayHabit.id } });
			} else {
				await prisma.dayHabit.create({ data: { day_id: day.id, habit_id: id } });
			}
		},
	);

	app.get("/summary", async () => {
		return prisma.$queryRaw`
			SELECT
				D.id,
				D.date,
				(
					SELECT
						cast(COUNT(*) as float)
					FROM day_habits DH
					WHERE DH.day_id = D.id
				) as completed,
				(
					SELECT
						cast(COUNT(*) as float)
					FROM habit_weekdays HW
					JOIN habits H
						ON H.id = HW.habit_id
					WHERE
						HW.weekday = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
						AND H.created_at <= D.date
				) as amount
			FROM days D
		`;
	});
}
