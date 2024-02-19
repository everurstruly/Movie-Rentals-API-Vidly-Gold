import {
  JwtSessionDocument,
  JwtSessionModel,
} from 'src/core/models/jwt-session-model';
import * as mongooseRepositoryCreator from 'src/core/services/_repository/mongoose-adapter';
import * as jwtSessionSchema from 'src/core/schema/jwt-session-schema';

const CreateJwtSessionRepository =
  mongooseRepositoryCreator.CreateRepository<JwtSessionDocument>;

const JwtSessionRepository = CreateJwtSessionRepository(JwtSessionModel, {
  async findDuplicate(dto: Omit<JwtSessionDocument, '_id'>) {
    const self = this as InstanceType<
      ReturnType<typeof CreateJwtSessionRepository>
    >;
    const { clientId, subject } = dto;
    const [existingSession] = await self.find({
      pagination: { limit: 1 },
      where: { clientId, subject },
    });

    return existingSession;
  },
});

export class JwtSessionService extends JwtSessionRepository {
  open = async (form: jwtSessionSchema.OpenSessionCredentialsInput) => {
    const retrivedSession = await this.findDuplicate(form);
    if (retrivedSession) {
      return {
        alreadyOpened: retrivedSession.clientId,
      };
    }

    return this.createOne({
      ...form,
      refreshTokenFamily: [form.refreshToken],
    });
  };

  get = async (session: jwtSessionSchema.AccessSessionCredentialsInput) => {
    const [retrivedSession] = await this.find({
      pagination: { limit: 1 },
      where: session,
    });

    if (typeof retrivedSession === 'undefined') return null;
    return retrivedSession;
  };

  close = async (session: jwtSessionSchema.AccessSessionCredentialsInput) => {
    const [retrivedSession] = await this.find({
      pagination: { limit: 1 },
      where: session,
    });

    if (typeof retrivedSession === 'undefined') return null;
    return this.deleteOne(retrivedSession._id.toString());
  };

  keep = async (session: jwtSessionSchema.RefreshSessionCredentialsInput) => {
    const {
      accessToken,
      refreshToken,
      currentRefreshToken,
      ...targetedSession
    } = session;

    const [retrivedSession] = await this.find({
      pagination: { limit: 1 },
      where: targetedSession,
    });

    if (typeof retrivedSession === 'undefined') return null;

    if (retrivedSession.refreshToken !== currentRefreshToken) {
      if (!retrivedSession.refreshTokenFamily.includes(currentRefreshToken)) {
        return { expired: session };
      }

      const sessionToClose = {
        ...targetedSession,
        accessToken,
      };

      const closedSession = await this.close(sessionToClose);
      return { hijacked: closedSession as NonNullable<typeof closedSession> };
    }

    const sessionUpdates = {
      accessToken,
      refreshToken,
      refreshTokenFamily: [refreshToken, ...retrivedSession.refreshTokenFamily],
    };

    return this.updateOne(retrivedSession._id.toString(), sessionUpdates);
  };
}
