import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrderProducts1724762690125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'order_products',
            new TableColumn({
                name: 'order_id',
                type: 'uuid',
                isNullable: true,
            })
          
        );
        await queryRunner.createForeignKey('order_products', new TableForeignKey({
            name: 'OrdersByProducts',
            columnNames: ['order_id'],
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
         }));
        }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('order_products', 'OrdersByProducts');
        await queryRunner.dropColumn('order_products', 'order_id');
    }


}
