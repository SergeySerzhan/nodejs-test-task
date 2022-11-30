import {
  Table,
  Model,
  Column,
  AllowNull,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table({ underscored: true })
export class User extends Model {
  @Column
  @PrimaryKey
  @AllowNull(false)
  email: string;

  @Column
  @AllowNull(false)
  firstName: string;

  @Column
  @AllowNull(false)
  lastName: string;

  @Column
  @AllowNull(false)
  image: string;

  @Column(DataType.BLOB)
  pdf: string;
}
