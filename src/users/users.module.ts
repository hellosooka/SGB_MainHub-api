import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { GamesUsers } from 'src/games/games-users.model';
import { Game } from 'src/games/games.model';
import { GamesModule } from 'src/games/games.module';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, Game, GamesUsers]),
    RolesModule,
    GamesModule,
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
