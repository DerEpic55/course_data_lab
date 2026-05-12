import { prisma } from './prisma_init'

export async function find_student_progress_by_semester() {
    // TODO: Найти прогресс студентов по семестрам (группировка по месяцу создания оценок)
    // Использовать обработку в TypeScript
    // Вернуть массив с прогрессом по студентам и месяцам
    const grades = await prisma.grade.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    });

    const grouped = grades.reduce((acc, item) => {
        const sId = item.studentId;
        const month = item.createdAt.toISOString().substring(0, 7);

        if (!acc[sId]) {
            acc[sId] = {};
        }

        if (!acc[sId][month]) {
            acc[sId][month] = { sum: 0, count: 0 };
        }

        acc[sId][month].sum += item.grade;
        acc[sId][month].count += 1;

        return acc;
    }, {} as Record<number, Record<string, { sum: number, count: number }>>);

    return Object.entries(grouped).map(([studentId, months]) => ({
        studentId: Number(studentId),
        progress: Object.entries(months).map(([month, stats]) => ({
            month,
            averageGrade: stats.sum / stats.count,
            gradeCount: stats.count
        }))
    }));
}