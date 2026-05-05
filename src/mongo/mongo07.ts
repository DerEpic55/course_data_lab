import type { Db } from "mongodb"

export class Movie {
    title: string
    rating: number
    year: number
    constructor(title: string, rating: number, year: number) {
        this.title = title
        this.rating = rating
        this.year = year
    }
}

export async function find_top_rated_movies(db: Db, limit: number): Promise<Movie[]> {
    // TODO: Найти топ-N фильмов по рейтингу (отсортировать по убыванию рейтинга)
	return db.collection("movies").find<Movie>({}).limit(limit).sort({rating: -1}).toArray();
}


