import {
  CustomerDocument,
  CustomerModel,
} from 'src/core/models/customer-model';
import * as mongooseRepositoryCreator from 'src/core/services/_repository/mongoose-adapter';

export type CustomerId = string;
export type CustomerDto = Omit<CustomerDocument, '_id'>;

const CustomerRepository = mongooseRepositoryCreator.CreateRepository<
  CustomerDto,
  CustomerDocument
>(CustomerModel);

class CustomerService extends CustomerRepository {}
