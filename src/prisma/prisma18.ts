import { prisma } from './prisma_init'

export async function find_students_with_excellent_grades() {
    // TODO: Найти всех студентов, у которых есть хотя бы одна оценка 5
    // Использовать обработку данных в TypeScript (не фильтрацию Prisma)
    // Вернуть массив студентов с информацией о person
    const students = await prisma.student.findMany({
        include: {
            person: true,
            grades: true
        }
    });
    const excellentStudents = students.filter(student => {
        return student.grades.some(grade => grade.grade === 5);
    });
    
    return excellentStudents.map(student => ({
        id: student.id,
        personId: student.personId,
        person: student.person
    }));
}