import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt, columnVarchar } from "../columns";
import { columnFK } from "../columns/columnFK";

export class PasswordRecovery1643325632406 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "password_recoveries",
            columns: [
                columnId,
                columnVarchar("token"),
                columnFK('userId'),
                {
                    name: 'resetAt',
                    type: 'datetime',
                    isNullable: true
                },
                columnCreatedAt,
                columnUpdatedAt,
            ]
        }));
        await queryRunner.createForeignKey("password_recoveries", new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            name: 'FK_password_recoveries_users',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('password_recoveries', 'FK_password_recoveries_users');
        await queryRunner.dropTable('password_recoveries');
    }

}
