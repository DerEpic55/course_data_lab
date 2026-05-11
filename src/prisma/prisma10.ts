import { prisma } from './prisma_init'

export async function get_course_average_grade(courseTitle: string): Promise<number | null> {
    // TODO: Найти среднюю оценку по указанному курсу
    // Вернуть среднее значение или null если курс не найден или нет оценок
    const result = await prisma.grade.aggregate({
        where: {
            course:{
                title: courseTitle
            }
        },
        _avg:{
            grade: true
        }
    });

    return result._avg.grade;
}