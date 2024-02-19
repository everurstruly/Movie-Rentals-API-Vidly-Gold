import asyncRouteHandler from 'src/core/middleware/shared/async-middleware';
import { RoleService } from 'src/core/services/role-service';
import * as projSchema from 'src/core/schema';
import * as roleSchema from 'src/core/schema/role-schema';
import * as arrayUtils from 'src/common/utils/datatype/array-utils';

const roleService = new RoleService();

export const getAllRoles = asyncRouteHandler(async (req, res, next) => {
  const retrivedRoles = await roleService.find({
    limit: 25,
  });

  if (arrayUtils.isEmptyArray(retrivedRoles)) {
    return res.kit.formatter
      .ctx({ message: 'Could not find roles' })
      .send.NotFound();
  }

  return res.kit.formatter.data(retrivedRoles).send.OK();
});

export const registerRole = asyncRouteHandler(async (req, res, next) => {
  const roleToRegister = (
    req.locals.resourceValidation
      .role as projSchema.SuccessfulValidationResponse
  ).value as roleSchema.RegistrationInput;

  const registeredRole = await roleService.register(roleToRegister);
  if ('unavailableAttributes' in registeredRole) {
    return res.kit.formatter
      .ctx({ message: 'Role already exists' })
      .send.Forbidden();
  }

  return res.kit.formatter.data(registeredRole).send.Created();
});

export const getRole = asyncRouteHandler(async (req, res, next) => {
  const { roleId } = req.locals.objectIdParamsValidation;
  const retrivedRole = await roleService.getOne(roleId.value);
  if (!retrivedRole) {
    return res.kit.formatter
      .ctx({ message: `Could not find Role, by the id: ${roleId.value}` })
      .send.NotFound();
  }

  return res.kit.formatter.data(retrivedRole).send.OK();
});

export const editRole = asyncRouteHandler(async (req, res, next) => {
  const { roleId } = req.locals.objectIdParamsValidation;
  const roleUpdates = (
    req.locals.resourceValidation
      .role as projSchema.SuccessfulValidationResponse
  ).value as roleSchema.EditInput;

  const editedRoleFields = await roleService.edit(roleId.value, roleUpdates);
  if (editedRoleFields === null) {
    const message = `Could not update Role, by the id: ${roleId.value}`;
    return res.kit.formatter.ctx({ message }).send.NotFound();
  }

  if ('unavailableAttributes' in editedRoleFields) {
    return res.kit.formatter
      .ctx({ message: 'Role already exists' })
      .send.Forbidden();
  }

  if (arrayUtils.isEmptyArray(editedRoleFields)) {
    return res.kit.formatter.send.NotModified();
  }

  const updatedRole = await roleService.getOne(roleId.value);
  return res.kit.formatter.data(updatedRole).send.OK();
});

export const deleteRole = asyncRouteHandler(async (req, res, next) => {
  const { roleId } = req.locals.objectIdParamsValidation;
  const deletedRole = await roleService.deleteOne(roleId.value);
  if (!deletedRole) {
    return res.kit.formatter
      .ctx({ message: `Could not delete Role, by the id: ${roleId.value}` })
      .send.NotFound();
  }

  return res.kit.formatter.data(deletedRole).send.OK();
});
