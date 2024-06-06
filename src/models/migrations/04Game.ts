import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Game1717663947843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "games",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "category_id",
            type: "int",
            isNullable: false,
          },
        ],
        foreignKeys: [
            {
              columnNames: ["category_id"],
              referencedTableName: "category",
              referencedColumnNames: ["id"],
              onDelete: "CASCADE",
            },
          ],
      })
    ) 
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("games")
  }
}
