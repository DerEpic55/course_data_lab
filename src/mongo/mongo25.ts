import type { Db } from "mongodb"

export class Department {
    _id: string
    name: string
    manager: string
    constructor(_id: string, name: string, manager: string) {
        this._id = _id
        this.name = name
        this.manager = manager
    }
}

export class Employee {
    _id: string
    name: string
    departmentId: string
    position: string
    salary: number
    constructor(_id: string, name: string, departmentId: string, position: string, salary: number) {
        this._id = _id
        this.name = name
        this.departmentId = departmentId
        this.position = position
        this.salary = salary
    }
}

export class Project {
    name: string
    departmentId: string
    budget: number
    status: string
    constructor(name: string, departmentId: string, budget: number, status: string) {
        this.name = name
        this.departmentId = departmentId
        this.budget = budget
        this.status = status
    }
}

export interface DepartmentDetails {
    _id: string
    name: string
    manager: string
    employees: Array<{
        name: string
        position: string
        salary: number
    }>
    projects: Array<{
        name: string
        budget: number
        status: string
    }>
    totalBudget: number
    employeeCount: number
}

export async function get_department_details(db: Db): Promise<DepartmentDetails[]> {
    // TODO: Получить детальную информацию по отделам: сотрудники и проекты
	return await db.collection("departments").aggregate([
        {
            $lookup: {
                from: "employees",
                localField: "_id",
                foreignField: "departmentId",
                as: "employees"
            }
        },
        {
            $lookup: {
                from: "projects",
                localField: "_id",
                foreignField: "departmentId",
                as: "projects"
            }
        },
        {
            $addFields: {
                // Считаем сумму бюджетов всех проектов отдела
                totalBudget: { $sum: "$projects.budget" },
                // Считаем количество сотрудников в массиве
                employeeCount: { $size: "$employees" }
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                manager: 1,
                totalBudget: 1,
                employeeCount: 1,
                "employees.name": 1,
                "employees.position": 1,
                "employees.salary": 1,
                "projects.name": 1,
                "projects.budget": 1,
                "projects.status": 1
            }
        }
        
    ]).toArray() as DepartmentDetails[]
}