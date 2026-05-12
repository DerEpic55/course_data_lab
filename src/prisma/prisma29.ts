import { prisma } from './prisma_init'

export async function find_students_with_same_names() {
    // TODO: Найти студентов с одинаковыми именами
    // Использовать обработку в TypeScript
    // Вернуть массив групп студентов с одинаковыми именами
    const students = await prisma.student.findMany({
        include: { person: true }
    });

    if (!students || students.length === 0) return [];

    const groupsMap: Record<string, any[]> = {};

    for (const student of students) {
        const name = student.person?.name;
        if (!name) continue;

        if (!groupsMap[name]) {
            groupsMap[name] = [];
        }
        groupsMap[name].push(student);
    }

    const result = Object.entries(groupsMap)
        .filter(([_, group]) => group.length > 1)
        .map(([name, group]) => ({
            name: name,
            students: group
        }));

    return result;
}