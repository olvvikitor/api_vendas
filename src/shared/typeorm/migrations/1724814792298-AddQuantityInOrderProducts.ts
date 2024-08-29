import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddQuantityInOrderProducts1724814792298 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('order_products', new TableColumn({
          name: 'quantity',
          type: 'integer', 
        }));
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order_products', 'quantity');
      }

}
