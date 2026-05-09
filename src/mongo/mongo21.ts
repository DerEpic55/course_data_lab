import type { Db } from "mongodb"

export class Customer {
    name: string
    totalPurchases: number
    membershipLevel: string
    constructor(name: string, totalPurchases: number, membershipLevel: string) {
        this.name = name
        this.totalPurchases = totalPurchases
        this.membershipLevel = membershipLevel
    }
}

export interface CustomerCategory {
    name: string
    totalPurchases: number
    membershipLevel: string
    category: "VIP" | "Regular" | "New"
}

export async function get_customer_categories(db: Db): Promise<CustomerCategory[]> {
    // TODO: Классифицировать клиентов: 
    // "VIP" если totalPurchases > 1000 ИЛИ membershipLevel = "premium"
    // "Regular" если totalPurchases между 100 и 1000
    // "New" в остальных случаях
	return await db.collection<Customer>("customers").aggregate([
        {
            $addFields: {
                category: {
                    $switch: {
                        branches: [
                            {
                                // VIP: покупки > 1000 ИЛИ статус premium
                                case: { $or: [
                                    { $gt: ["$totalPurchases", 1000] },
                                    { $eq: ["$membershipLevel", "premium"] }
                                ] },
                                then: "VIP"
                            },
                            {
                                // Regular: покупки от 100 до 1000 (включительно)
                                case: { $and: [
                                    { $gte: ["$totalPurchases", 100] },
                                    { $lte: ["$totalPurchases", 1000] }
                                ] },
                                then: "Regular"
                            }
                        ],
                        // Все остальные случаи
                        default: "New"
                    }
                }
            }
        }
    ]).toArray() as CustomerCategory[]
}