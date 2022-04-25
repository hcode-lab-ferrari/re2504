import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt } from "../columns";

export class TimeOptions1645571102738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "time_options",
            columns: [
                columnId,
                {
                    name: "day",
                    type: "tinyint",
                    isNullable: false,
                }, {
                    name: "time",
                    type: "time",
                    isNullable: false,
                },
                columnCreatedAt,
                columnUpdatedAt,
            ]
        }));

        for (let i = 0; i <= 6; i++) {
            await queryRunner.query(`INSERT INTO time_options(day, time) VALUES (${i}, '09:00'), (${i}, '10:00'), (${i}, '11:00'), (${i}, '12:00');`);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("time_options");
    }

}
