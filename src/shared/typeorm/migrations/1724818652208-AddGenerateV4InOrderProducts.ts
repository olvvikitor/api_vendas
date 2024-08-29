import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGenerateV4InOrderProducts1724818652208 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Certifique-se de que a extensão uuid-ossp está ativada
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    
        // Modifique a tabela existente para configurar o campo id
        await queryRunner.query(`ALTER TABLE "order_products" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverta a alteração do campo id para o estado anterior
        await queryRunner.query(`ALTER TABLE "order_products" ALTER COLUMN "id" DROP DEFAULT`);
      }

}
