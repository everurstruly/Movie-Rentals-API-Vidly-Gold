import {
  CustomerDocument,
  CustomerModel,
} from "src/core/models/customer-model";

export interface CustomerSeed extends CustomerDocument {}

export const seedCustomerModel = async (seeds: CustomerSeed[]) => {
  await CustomerModel.deleteMany({});
  await CustomerModel.create(seeds);
};
