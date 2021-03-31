import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePurchasesProducts1617143553352
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchases_products_products',
        columns: [
          {
            name: 'purchasesId',
            type: 'varchar',
          },
          {
            name: 'productsId',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_purchase',
            referencedTableName: 'purchases',
            referencedColumnNames: ['id'],
            columnNames: ['purchasesId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_product',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['productsId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchases_products_products');
  }
}
