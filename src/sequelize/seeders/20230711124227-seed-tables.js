'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface) {
    let now = new Date()

    const locations = await queryInterface.bulkInsert('locations', [
      { name: 'Minas Tirith', created_at: now, updated_at: now },
      { name: 'Ithilien', created_at: now, updated_at: now },
      { name: 'Osgiliath', created_at: now, updated_at: now },
      { name: 'Edoras', created_at: now, updated_at: now },
      { name: 'Folde Ocidental', created_at: now, updated_at: now },
    ], { returning: true })

    now = new Date()

    const inventories = await queryInterface.bulkInsert('inventories', [
      { location_id: locations[0].id, created_at: now, updated_at: now },
      { location_id: locations[1].id, created_at: now, updated_at: now },
      { location_id: locations[2].id, created_at: now, updated_at: now },
      { location_id: locations[3].id, created_at: now, updated_at: now },
      { location_id: locations[4].id, created_at: now, updated_at: now },
    ], { returning: true })

    now = new Date()

    const boards = await queryInterface.bulkInsert('boards', [
      { location_id: locations[0].id, created_at: now, updated_at: now },
      { location_id: locations[1].id, created_at: now, updated_at: now },
      { location_id: locations[2].id, created_at: now, updated_at: now },
      { location_id: locations[3].id, created_at: now, updated_at: now },
      { location_id: locations[4].id, created_at: now, updated_at: now },
    ], { returning: true })

    now = new Date()

    await queryInterface.bulkInsert('repositions', [
      { quantity: 10000, inventory_id: inventories[0].id, date: now, created_at: now, updated_at: now },
      { quantity: 10000, inventory_id: inventories[1].id, date: now, created_at: now, updated_at: now },
      { quantity: 10000, inventory_id: inventories[2].id, date: now, created_at: now, updated_at: now },
      { quantity: 10000, inventory_id: inventories[3].id, date: now, created_at: now, updated_at: now },
      { quantity: 10000, inventory_id: inventories[4].id, date: now, created_at: now, updated_at: now },
    ])

    now = new Date()

    await queryInterface.bulkInsert('withdrawals', [{
      quantity: 1000,
      first_ticket: "1",
      last_ticket: "1000",
      inventory_id: inventories[0].id,
      date: now,
      created_at: now,
      updated_at: now
    }, {
      quantity: 1000,
      first_ticket: "1",
      last_ticket: "1000",
      inventory_id: inventories[1].id,
      date: now,
      created_at: now,
      updated_at: now
    }, {
      quantity: 1000,
      first_ticket: "1",
      last_ticket: "1000",
      inventory_id: inventories[2].id,
      date: now,
      created_at: now,
      updated_at: now
    }, {
      quantity: 1000,
      first_ticket: "1",
      last_ticket: "1000",
      inventory_id: inventories[3].id,
      date: now,
      created_at: now,
      updated_at: now
    }, {
      quantity: 1000,
      first_ticket: "1",
      last_ticket: "1000",
      inventory_id: inventories[4].id,
      date: now,
      created_at: now,
      updated_at: now
    }])

    now = new Date()

    const subscribers = await queryInterface.bulkInsert('subscribers', [
      {
        name: 'Eomer',
        location_id: locations[3].id,
        birthday: new Date('1990-01-31'),
        created_at: now,
        updated_at: now
      }, {
        name: 'Eowyn',
        location_id: locations[1].id,
        birthday: new Date('1990-01-31'),
        created_at: now,
        updated_at: now
      }, {
        name: 'Boromir',
        location_id: locations[0].id,
        birthday: new Date('1990-01-31'),
        created_at: now,
        updated_at: now
      }, {
        name: 'Faramir',
        location_id: locations[1].id,
        birthday: new Date('1990-01-31'),
        created_at: now,
        updated_at: now
      },
    ], { returning: true })

    now = new Date()

    await queryInterface.bulkInsert('ticket_requests', [{
      quantity: 60,
      subscriber_id: subscribers[0].id,
      board_id: boards[3].id,
      date: now,
      created_at: now,
      updated_at: now
    }, {
      quantity: 60,
      subscriber_id: subscribers[1].id,
      board_id: boards[1].id,
      date: now,
      created_at: now,
      updated_at: now
    }, {
      quantity: 60,
      subscriber_id: subscribers[2].id,
      board_id: boards[0].id,
      date: now,
      created_at: now,
      updated_at: now
    }, {
      quantity: 60,
      subscriber_id: subscribers[3].id,
      board_id: boards[1].id,
      date: now,
      created_at: now,
      updated_at: now
    }])

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
    await queryInterface.bulkDelete('ticket_requests');
    await queryInterface.bulkDelete('subscribers');
    await queryInterface.bulkDelete('repositions');
    await queryInterface.bulkDelete('withdrawals');
    await queryInterface.bulkDelete('boards');
    await queryInterface.bulkDelete('inventories');
    await queryInterface.bulkDelete('locations');
  }
};
