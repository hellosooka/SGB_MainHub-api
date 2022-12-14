import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChangeRoleDto } from './dto/change-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) { }

  async createRole(dto: CreateRoleDto) {
    const role = await this.getRoleByValue(dto.value);
    if (role) {
      throw new HttpException('Role already exist', HttpStatus.CONFLICT);
    }
    return await this.rolesRepository.create(dto);
  }

  async deleteRole(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    role.destroy();
    return role;
  }

  async getAllRoles() {
    const roles = await this.rolesRepository.findAll();
    return roles;
  }

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });
    if (role) {
      return role;
    }
    throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
  }

  async changeRole(value: string, dto: ChangeRoleDto) {
    const role = await this.getRoleByValue(value);
    if (!role) {
      throw new HttpException('role not found', HttpStatus.NOT_FOUND);
    }
    role.value = dto.value;
    role.description = dto.description;
    await role.save();
    return role;
  }
}
