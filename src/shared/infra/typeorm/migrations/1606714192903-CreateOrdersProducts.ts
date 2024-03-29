import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateOrdersProducts1606714192903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'orders_products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'product_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'order_id',
              type: 'uuid',
              isNullable: true,
            },
            {
              name: 'price',
              type: 'decimal',
              precision: 10,
              scale: 2,
            },
            {
              name: 'quantity',
              type: 'int',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );

      await queryRunner.createForeignKey(
        'orders_products',
        new TableForeignKey({
          name: 'OrdersProductsProduct',
          columnNames: ['product_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'products',
          onDelete: 'SET NULL',
        }),
      );

      await queryRunner.createForeignKey(
        'orders_products',
        new TableForeignKey({
          name: 'OrdersProductsOrder',
          columnNames: ['order_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'orders',
          onDelete: 'SET NULL',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey(
        'orders_products',
        'OrdersProductsOrder',
      );
      await queryRunner.dropForeignKey(
        'orders_products',
        'OrdersProduct-ProductId',
      );
      await queryRunner.dropTable('orders_products');
    }

}
