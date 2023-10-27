'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface) {
    let now = new Date()

    const locations = await queryInterface.bulkInsert('locations', [
      { name: 'Pureza', created_at: now, updated_at: now },
      { name: 'Colônia', created_at: now, updated_at: now },
      { name: 'Cambiasca', created_at: now, updated_at: now },
      { name: 'Ernesto Machado', created_at: now, updated_at: now },
      { name: 'Valão dos Milagres', created_at: now, updated_at: now },
    ], { returning: true })

    now = new Date()

    const inventories = await queryInterface.bulkInsert('inventories', [
      { location_id: locations[0].id, created_at: now, updated_at: now },
      { location_id: locations[1].id, created_at: now, updated_at: now },
      { location_id: locations[2].id, created_at: now, updated_at: now },
      { location_id: locations[3].id, created_at: now, updated_at: now },
      { location_id: locations[4].id, created_at: now, updated_at: now },
    ])

    now = new Date()

    await queryInterface.bulkInsert('boards', [
      { location_id: locations[0].id, created_at: now, updated_at: now },
      { location_id: locations[1].id, created_at: now, updated_at: now },
      { location_id: locations[2].id, created_at: now, updated_at: now },
      { location_id: locations[3].id, created_at: now, updated_at: now },
      { location_id: locations[4].id, created_at: now, updated_at: now },
    ])

    let fakeSubscribers = []
    for (let i = 0; i < 5000; i++) {
      now = new Date()
      fakeSubscribers.push({
        name: faker.person.fullName(),
        location_id: locations[Math.floor(Math.random() * 4)].id,
        birthday: faker.date.birthdate(),
        created_at: now,
        updated_at: now
      })
    }

    await queryInterface.bulkInsert('subscribers', fakeSubscribers)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('subscribers');
    await queryInterface.bulkDelete('boards');
    await queryInterface.bulkDelete('inventories');
    await queryInterface.bulkDelete('locations');
  }
};
