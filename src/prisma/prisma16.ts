import { prisma } from './prisma_init'

export async function find_students_with_most_courses() {
    // TODO: Найти студентов с максимальным количеством уникальных курсов
    // Использовать обработку данных в TypeScript (не агрегацию Prisma)
    // Вернуть массив студентов с информацией о person и количеством курсов
    const students = await prisma.student.findMany({
        include: {
            person: true,
            grades: {
                select: {
                    courseId: true 
                }
            }
        }
    });

    const studentsWithCount = students.map(student => {
    const uniqueCoursesCount = new Set(student.grades.map(g => g.courseId)).size;
        
    return {
        id: student.id,
        name: student.person.name,
        person: student.person,
        courseCount: uniqueCoursesCount
    };
    });

    const maxCourses = Math.max(...studentsWithCount.map(s => s.courseCount));

    if (maxCourses === 0) return [];

    return studentsWithCount.filter(s => s.courseCount === maxCourses);
}