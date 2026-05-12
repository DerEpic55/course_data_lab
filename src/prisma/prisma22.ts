import { prisma } from './prisma_init'

export async function find_courses_min_max_average() {
    // TODO: Найти курсы с минимальной и максимальной средней оценкой
    // Использовать обработку в TypeScript (не агрегацию Prisma)
    // Вернуть объект { min: курс, max: курс } с дополнительным полем averageGrade
    const courses = await prisma.course.findMany({
        include: { grades: true }
    });

    const coursesWithAvg = courses
        .filter(c => c.grades.length > 0)
        .map(c => ({
            ...c,
            averageGrade: c.grades.reduce((sum, g) => sum + g.grade, 0) / c.grades.length
        }));

    if (coursesWithAvg.length === 0) return { min: null, max: null };

    const sorted = [...coursesWithAvg].sort((a, b) => a.averageGrade - b.averageGrade);

    return {
        min: sorted[0],
        max: sorted[sorted.length - 1]
    };
}