import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddClientIdOrders1724545593964 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'client_id',
                type: 'uuid',
                isNullable: true,
            })
          
        );
        await queryRunner.createForeignKey('orders', new TableForeignKey({
            name: 'OrdersByClients',
            columnNames: ['client_id'],
            referencedTableName: 'clients',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
         }));
        }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersByClients');
        await queryRunner.dropColumn('orders', 'client_id');
    }

}
