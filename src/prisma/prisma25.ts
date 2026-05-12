import { prisma } from './prisma_init'

export async function update_courses_without_grades_description() {
    // TODO: Обновить описание курсов без оценок на "Нет оценок"
    // Использовать один запрос updateMany средствами Prisma
    // Вернуть количество обновленных курсов
    const result = await prisma.course.updateMany({
        data:{
            description: 'Нет оценок'
        },
        where: {
            grades:{
                none: {}
            }
        }
    });

    return result.count;
}