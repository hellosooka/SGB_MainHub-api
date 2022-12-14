import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  DataType,
  Table,
  Column,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { GameTags } from './games-tags.model';
import { GamesUsers } from './games-users.model';
import { Tag } from './tags/tags.model';

interface GameCreationAttrs {
  title: string;
  description: string;
  price: number;
  image: string;
  link: string;
}

@Table({ tableName: 'games' })
export class Game extends Model<Game, GameCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Game title!' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Game description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({})
  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0, allowNull: false })
  price: number;

  @ApiProperty({ example: 'http://google.com', description: 'link to game' })
  @Column({ type: DataType.STRING, allowNull: false })
  link: string;

  @ApiProperty({
    example: [User],
    description: 'This is One to Many prop from USER',
  })
  @BelongsToMany(() => User, () => GamesUsers)
  users: User[];

  @BelongsToMany(() => Tag, () => GameTags)
  tags: [];
}
