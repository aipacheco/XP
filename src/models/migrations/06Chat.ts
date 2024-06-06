import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Chat1717670185305 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "chats",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "ad_id",
            type: "int",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "message",
            type: "text",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["ad_id"],
            referencedTableName: "ad",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("chats")
  }
}
