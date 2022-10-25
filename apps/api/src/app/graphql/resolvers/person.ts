import { Person as PersonGql } from '@ukol/graphql';
import { Context } from '../context';

const personQueries = {
  person: async (parent, args, context: Context, info) => {
    // fetch
    const model = await context.prisma.person.findFirst({
      where: { uuid: args.uuid }
    });

    // transpose db model to graphql model
    const gql: PersonGql = {
      uuid: model.uuid,
      name: model.name,
    };

    return gql;
  },
};

export default personQueries;
