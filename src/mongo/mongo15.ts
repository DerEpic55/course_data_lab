import type { Db } from "mongodb"

export class Customer {
    name: string
    email: string
    phone?: string
    address?: string
    constructor(name: string, email: string, phone?: string, address?: string) {
        this.name = name
        this.email = email
        this.phone = phone
        this.address = address
    }
}

export async function find_customers_with_phone(db: Db): Promise<Customer[]> {
    // TODO: Найти всех клиентов, у которых указан телефонный номер
	return db.collection("customers").find<Customer>({
        phone: {$exists: true, $ne: null}
    }).toArray();
}


