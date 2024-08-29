import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductIdToOrderProducts1724762978505 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'order_products',
            new TableColumn({
                name: 'product_id',
                type: 'uuid',
                isNullable: true,
            })
          
        );
        await queryRunner.createForeignKey('order_products', new TableForeignKey({
            name: 'OrdersByProductsByProductId',
            columnNames: ['product_id'],
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
         }));
        }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('order_products', 'OrdersByProductsByProductId');
        await queryRunner.dropColumn('order_products', 'product_id');
    }


}
