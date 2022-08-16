import { Person as PersonModel}  from '../../db/models';
import { Person as PersonGql } from '@elevatorian/graphql';

const personQueries = {
  person: async(parent, args, context, info) => {
    // fetch
    const model = await PersonModel.query()
      .findOne('uuid', args.uuid);

    // transpose db model to graphql model
    const gql: PersonGql = {
      uuid: model.uuid,
      name: model.name
    }

    return gql;
  }
};

export default personQueries;