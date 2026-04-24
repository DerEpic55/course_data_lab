/* 
	Напишите функцию calculateTotalProgress, которая вычисляет общий прогресс пользователей, 
	учитывая только активных и с прогрессом > 50%.
*/

type User = {active: boolean, progress: number}

export function calculateTotalProgress(users: User[]): number {
	const activeUsers : User[] = users.filter(user => user.active === true && user.progress > 50);
	return activeUsers
		.reduce(
			(acc, user) => {
				acc += user.progress;
				return acc 
			},
			0
		) / activeUsers.length;
}