import { RentalDocument, RentalModel } from 'src/core/models/rental-model';
import * as mongooseRepositoryCreator from 'src/core/services/_repository/mongoose-adapter';

export type RentalId = string;
export type RentalDto = Omit<RentalDocument, '_id'>;

const RentalRepository = mongooseRepositoryCreator.CreateRepository<
  RentalDto,
  RentalDocument
>(RentalModel);

class RentalService extends RentalRepository {}
