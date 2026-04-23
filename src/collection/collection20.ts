/* 	
	Напишите функцию groupUnfinishedHighPriorityTasks, 
	которая группирует задачи по категориям, 
	фильтруя только незавершенные высокоприоритетные задачи.
*/

export type Task = { category: string; priority: string; completed: boolean };

export function groupUnfinishedHighPriorityTasks(tasks: Task[]): Map<string, Task[]> {
	return tasks.reduce(
		(acc, task) => {
			if(!task.completed && task.priority === 'high'){
				const category = task.category;
				const group = acc.get(category) ?? [];
				
				group.push(task);
				acc.set(category, group);
			}

			return acc;
		},
		new Map<string, Task[]>
	);
}


