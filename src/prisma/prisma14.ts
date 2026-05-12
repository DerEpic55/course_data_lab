import { prisma } from './prisma_init'

export async function find_students_above_course_average(courseTitle: string) {
    // TODO: Найти студентов, у которых есть оценки по указанному курсу выше среднего балла по этому курсу
    // Вернуть массив студентов с информацией о person и их оценкой
    // Использовать два отдельных запроса: первый для нахождения среднего балла, второй для поиска студентов
    const aggregate = await prisma.grade.aggregate({
        where: {
            course: { title: courseTitle }
        },
        _avg: { grade: true }
    });

    const averageGrade = aggregate._avg.grade;
    if (averageGrade === null) return [];

    const grades = await prisma.grade.findMany({
        where: {
            course: { title: courseTitle },
            grade: { gt: averageGrade }
        },
        include: {
            student: {
                include: { person: true }
            }
        }
    });

    return grades.map(g => ({
        id: g.student.id,
        grade: g.grade,
        name: g.student.person.name,
        person: g.student.person
    }));
}