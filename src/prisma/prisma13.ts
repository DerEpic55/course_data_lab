import { prisma } from './prisma_init'

export async function find_top_courses(limit: number) {
    // TODO: Найти топ N курсов по средней оценке
    // Для каждого курса вычислить среднюю оценку из всех его оценок
    // Вернуть массив с id курса, названием и средней оценкой
    // Отсортировать по убыванию средней оценки
    // Использовать вычисление средней оценки в TypeScript коде (не через агрегацию Prisma)
        const courses = await prisma.course.findMany({
        include: {
            grades: true
        }
    });

    const courseStats = courses
        .filter(course => course.grades.length > 0)
        .map(course => {
            const sum = course.grades.reduce((acc, curr) => acc + curr.grade, 0);
            const avg = sum / course.grades.length;

            return {
                id: course.id,
                title: course.title, 
                averageGrade: avg
            };
        });

    courseStats.sort((a, b) => b.averageGrade - a.averageGrade);

    return courseStats.slice(0, limit);
}