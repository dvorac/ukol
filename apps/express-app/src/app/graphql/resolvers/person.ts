const personQueries = {
  person: async(parent, args, context, info) => {
    return { id: args.id, name: 'Dustin' }
  }
};

export default personQueries;