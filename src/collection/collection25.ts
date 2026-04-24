/* 
	Напишите функцию getOrderStats, которая принимает массив заказов и 
	возвращает объект с общей суммой, количеством и средним чеком только завершенных заказов 
	(status: 'completed').
*/

type Order = {status: string, amount: number}
type Stats = {total: number, count: number, average: number}

export function getOrderStats(orders: Order[]): Stats{
	return orders.filter(order => order.status === 'completed').reduce(
		(acc, order) => {
			acc.total += order.amount;
			acc.count += 1;
			acc.average = acc.total / acc.count;
			return acc;
		},
		{
			total: 0,
			count: 0,
			average: 0
		} as Stats
	);
}
