import { prisma } from './prisma_init'

export async function find_top_students(limit: number) {
    // TODO: Найти топ N студентов по среднему баллу
    // Учитывать только студентов, у которых есть хотя бы одна оценка
    // Вернуть массив с id студента, именем, средним баллом и количеством оценок
    // Отсортировать по убыванию среднего балла
    const stats = await prisma.grade.groupBy({
        by: ['studentId'],
        _avg: {
            grade: true,
        },
        _count: {
            grade: true,
        },
        orderBy: {
            _avg: {
                grade: 'desc',
            },
        },
        take: limit,
    });

    const result = [];

    for (const stat of stats) {
        const student = await prisma.student.findUnique({
            where: { id: stat.studentId },
            select: {
                person: {
                    select: {
                        name: true
                    }
                }
            }
        });

        result.push({
            id: stat.studentId,
            studentName: student?.person?.name,
            averageGrade: stat._avg.grade,
            gradeCount: stat._count.grade,
        });
    }

    return result;
}