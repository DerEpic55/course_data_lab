import { prisma } from './prisma_init'

export async function find_courses_by_title_paginated(
    titlePattern: string, 
    skip: number, 
    take: number
) {
    // TODO: Найти курсы, в названии которых содержится указанная подстрока
    // Применить пагинацию (skip, take) и отсортировать по дате создания (новые первыми)
    // Вернуть массив курсов
    return prisma.course.findMany({
        skip: skip,
        take: take,
        where:{
            title:{
                contains: titlePattern
            }
        },
        orderBy:{
            createdAt: "asc"
        }
    });
}