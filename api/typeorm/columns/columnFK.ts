import { TableColumnOptions } from "typeorm";

export function columnFK(name: string = "name", isNullable: boolean = false, isPrimary: boolean = false) {

    return {
        name,
        type: "int",
        isNullable,
        isPrimary
    } as TableColumnOptions

}