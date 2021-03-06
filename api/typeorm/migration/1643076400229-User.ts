import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt, columnVarchar } from "../columns";

export class User1643076400229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "persons",
            columns: [
                columnId,
                columnVarchar("name", false, "250"),
                {
                    name: "birthAt",
                    type: "date",
                    isNullable: true
                },
                columnVarchar("phone", true, "16"),
                columnVarchar("document", true, "14"),
                columnCreatedAt,
                columnUpdatedAt,
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "users",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
            }, {
                name: "email",
                type: "varchar",
                length: "250",
                isNullable: false,
                isUnique: true,
            }, {
                name: "password",
                type: "varchar",
                length: "250",
                isNullable: false,
            }, {
                name: "photo",
                type: "varchar",
                length: "255",
                isNullable: true,
            }, {
                name: "personId",
                type: "int",
                isNullable: false,
            }, {
                name: "createdAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP",
            }, {
                name: "updatedAt",
                type: "datetime",
                default: "CURRENT_TIMESTAMP",
            }]
        }));

        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "persons",
            name: "FK_users_persons",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("users", "FK_users_persons");
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("persons");
    }

}
