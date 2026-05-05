import type { Db } from "mongodb"

export class Book {
    title: string
    author: string
    year: number
    constructor(title: string, author: string, year: number) {
        this.title = title
        this.author = author
        this.year = year
    }
}

export async function add_books(db: Db, books: Book[]){
    // TODO: Создать коллекцию "books" и добавить массив книг
    await db.createCollection("books");
    await db.collection("books").insertMany(books);
}

