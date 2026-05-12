import { prisma } from './prisma_init'

export async function find_oldest_and_newest_students() {
    // TODO: Найти самого старого и самого нового студента по дате создания
    // Вернуть объект { oldest: студент, newest: студент } с информацией о person
    const oldest = await prisma.student.findFirst({
        orderBy: [
            { createdAt: 'asc' },
            { id: 'asc' }
        ],
        include: { person: true }
    });

    const newest = await prisma.student.findFirst({
        orderBy: [
            { createdAt: 'desc' },
            { id: 'desc' }
        ],
        include: { person: true }
    });

    return {
        oldest,
        newest
    };
}