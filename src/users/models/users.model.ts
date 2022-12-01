import {
  Table,
  Model,
  Column,
  AllowNull,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ underscored: true })
export class User extends Model {
  @AllowNull(false)
  @PrimaryKey
  @Column
  email: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  image: string;

  @Column(DataType.BLOB)
  pdf: string;

  @AllowNull(false)
  @Column
  password: string;
}
