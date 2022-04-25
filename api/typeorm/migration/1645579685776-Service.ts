import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
    columnCreatedAt,
    columnId,
    columnUpdatedAt,
    columnVarchar,
} from '../columns';

export class Service1645579685776 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'services',
                columns: [
                    columnId,
                    columnVarchar('name', false, '45'),
                    {
                        name: 'description',
                        type: 'mediumtext',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    columnCreatedAt,
                    columnUpdatedAt,
                ],
            }),
        );

        await queryRunner.query(
            `INSERT INTO services (name, description, price) VALUES('Revisão', 'Verificação mínima necessária', 100)`,
        );
        await queryRunner.query(
            `INSERT INTO services (name, description, price) VALUES('Alinhamento', 'Alinhamento e balanceamento do veículo', 400)`,
        );
        await queryRunner.query(
            `INSERT INTO services (name, description, price) VALUES('Filtros', 'Troca do filtro de ar e combustível', 200)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('services');
    }
}
