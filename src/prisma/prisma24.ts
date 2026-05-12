import { prisma } from './prisma_init'

export async function find_students_with_all_courses() {
    // TODO: Найти студентов, у которых есть оценки по всем существующим курсам
    // Использовать обработку в TypeScript
    // Вернуть массив студентов с информацией о person
    const totalCoursesCount = await prisma.course.count();

    const students = await prisma.student.findMany({
        include: {
            person: true,
            grades: {
                select: { courseId: true }
            }
        }
    });

    const studentsWithAll = students.filter(student => {
        const studentUniqueCourses = new Set(student.grades.map(g => g.courseId));
        return studentUniqueCourses.size === totalCoursesCount && totalCoursesCount > 0;
    });

    return studentsWithAll.map(s => ({
        id: s.id,
        personId: s.personId,
        person: s.person
    }));
}