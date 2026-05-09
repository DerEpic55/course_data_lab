import type { Db } from "mongodb"

export class Car {
    brand: string
    model: string
    year: number
    price: number
    constructor(brand: string, model: string, year: number, price: number) {
        this.brand = brand
        this.model = model
        this.year = year
        this.price = price
    }
}

export async function find_cars_in_range(db: Db, minYear: number, maxPrice: number): Promise<Car[]> {
    // TODO: Найти автомобили с годом выпуска >= minYear и ценой <= maxPrice
	return db.collection("cars").find<Car>({
        year: {$gte: minYear},
        price: {$lte: maxPrice}
    }).toArray();
}