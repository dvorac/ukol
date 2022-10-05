/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('person').del();
  await knex('person').insert([
    { uuid: 'c4a2160e-a73b-497c-92c5-6edaa812cd25', name: 'Dustin' },
    { uuid: 'e21f9dec-f246-46c3-b20f-64d5c859fe39', name: 'Howard' },
    { uuid: 'e7f00e90-bd24-439c-9afa-08e3849cac2e', name: 'Ronald' },
  ]);
};
