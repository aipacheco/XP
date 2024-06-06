import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Ad1717669093252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "ad",
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
            name: "description",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "location",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "image",
            type: "varchar",
            length: "250",
          },
          {
            name: "game_id",
            type: "int",
          },
          {
            name: "creator_id",
            type: "int",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["creator_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["game_id"],
            referencedTableName: "games",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("ad")
  }
}
