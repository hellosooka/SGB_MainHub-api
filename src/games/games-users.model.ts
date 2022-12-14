import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Game } from './games.model';

@ApiTags('User games')
@Table({ tableName: 'user_games', createdAt: false, updatedAt: false })
export class GamesUsers extends Model<GamesUsers> {
  @ApiProperty({ example: '1', description: 'Unique Identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Game id' })
  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  gameId: number;

  @ApiProperty({ example: 1, description: 'User id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
