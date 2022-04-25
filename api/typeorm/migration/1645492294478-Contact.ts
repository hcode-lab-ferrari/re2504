import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt, columnVarchar } from "../columns";
import { columnFK } from "../columns/columnFK";

export class Contact1645492294478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "contacts",
            columns: [
                columnId,
                columnFK('personId'),
                columnVarchar("email", false, "250"),
                {
                    name: "message",
                    type: "text",
                    isNullable: false,
                },
                columnCreatedAt,
                columnUpdatedAt,
            ]
        }));

        await queryRunner.createForeignKey("contacts", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "persons",
            name: "FK_contacts_persons",
            onDelete: "CASCADE",
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("contacts", "FK_contacts_persons");
        await queryRunner.dropTable("contacts");
    }

}
