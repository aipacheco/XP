import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Users1708952337364 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "username",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "100",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "avatar",
            type: "varchar",
            length: "250",
            default: "'https://res.cloudinary.com/dptbxi3iu/image/upload/v1717665018/XP/descarga_1_ozfz0e.jpg'",
          },
          {
            name: "isActive",
            type: "boolean",
            default: true,
          },
          {
            name: "role_id",
            type: "int",
            default: 1,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["role_id"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users")
  }
}
