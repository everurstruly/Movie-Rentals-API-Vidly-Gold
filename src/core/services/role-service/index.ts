import { RoleDocument, RoleModel } from 'src/core/models/role-model';
import * as roleSchema from 'src/core/schema/role-schema';
import * as mongooseRepositoryCreator from 'src/core/services/_repository/mongoose-adapter';

export type RoleId = string;
export type RoleDto = Omit<RoleDocument, '_id'>;

const RoleRepository = mongooseRepositoryCreator.CreateRepository<
  RoleDto,
  RoleDocument
>(RoleModel, {
  async findDuplicate(this: any, dto: RoleDto) {
    const { title, level } = dto;
    const [existingUser] = await this.find({
      pagination: { limit: 1 },
      where: { title, level },
    });

    return existingUser;
  },
});

class RoleService extends RoleRepository {
  register = async (form: roleSchema.RegistrationInput) => {
    const existingRole = await this.findDuplicate(form);
    if (existingRole) return { unavailableAttributes: existingRole };
    return this.createOne(form);
  };

  edit = async (id: RoleId, form: roleSchema.EditInput) => {
    const existingRole = await this.findDuplicate(form);
    if (existingRole) return { unavailableAttributes: existingRole };
    return this.updateOne(id, form);
  };
}
