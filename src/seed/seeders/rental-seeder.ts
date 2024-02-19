import { CustomerModel } from "src/core/models/customer-model";
import { MovieModel } from "src/core/models/movie-model";
import { UserModel } from "src/core/models/user-model";
import {
  RentalDocument,
  RentalCheckedIn,
  RentalCheckedOut,
  RentalModel,
} from "src/core/models/rental-model";
import { DeferedSeedField, ObjectIdString } from "./shared/types";

interface RentalSeedCheckedIn extends Omit<RentalCheckedIn, "byUserId"> {
  byUserId: DeferedSeedField<ObjectIdString>;
}

interface RentalSeedCheckedOut extends Omit<RentalCheckedOut, "byUserId"> {
  byUserId: DeferedSeedField<ObjectIdString>;
}

export interface RentalSeed
  extends Omit<
    RentalDocument,
    "customerId" | "purchases" | "checkedOut" | "checkedIn"
  > {
  customerId: DeferedSeedField<ObjectIdString>;
  purchases: {
    movieId: DeferedSeedField<ObjectIdString>;
    chargedPrice: number;
  }[];
  checkedOut: RentalSeedCheckedOut;
  checkedIn: RentalSeedCheckedIn;
  chargedLateFee: number;
}

export const seedRentalModel = async (seeds: RentalSeed[]) => {
  await RentalModel.deleteMany({});

  for (let deferredSeed of seeds) {
    const seed = { ...deferredSeed };
    if (typeof seed.customerId === "object") {
      const { fillBy, subWith } = seed.customerId;
      const customerInDb = await CustomerModel.getOne(fillBy);
      const id = customerInDb ? customerInDb._id : subWith;
      seed.customerId = id.toString();
    }

    const { purchases } = seed;
    if (typeof purchases[0].movieId === "object") {
      const purchaseMappedToDoc = await Promise.all(
        [...purchases].map(async (pch) => {
          if (typeof pch.movieId === "string") return pch;
          const { fillBy, subWith } = pch.movieId;
          const movieInDb = await MovieModel.getOne(fillBy);
          const id = movieInDb ? movieInDb._id : subWith;
          pch.movieId = id.toString();
          return pch;
        })
      );

      seed.purchases = purchaseMappedToDoc;
    }

    const { checkedOut, checkedIn } = seed;
    if (typeof checkedOut.byUserId === "object") {
      const { fillBy, subWith } = checkedOut.byUserId;
      const userInDb = await UserModel.getOne(fillBy);
      const id = userInDb ? userInDb._id : subWith;
      checkedOut.byUserId = id.toString();

      if (
        userInDb &&
        typeof checkedIn.byUserId !== "string" &&
        subWith === checkedIn.byUserId.subWith
      ) {
        checkedIn.byUserId = id.toString();
      }
    }

    if (typeof checkedIn.byUserId === "object") {
      const { fillBy, subWith } = checkedIn.byUserId;
      const userInDb = await UserModel.getOne(fillBy);
      const id = userInDb ? userInDb._id : subWith;
      checkedIn.byUserId = id.toString();
    }

    await RentalModel.create(seed);
  }
};
