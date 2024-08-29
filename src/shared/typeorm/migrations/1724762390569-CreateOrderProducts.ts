import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrderProducts1724762390569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_products',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    }
               
                ]
            })
        )}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_products');
    }

}
