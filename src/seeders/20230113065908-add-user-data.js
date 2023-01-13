'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'user_type',
      [
        {
          id: '1',
          role_name: 'Normal',
        },
        {
          id: '2',
          role_name: 'Admin',
        },
        {
          id: '3',
          role_name: 'Ban',
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'users',
      [
        {
          phone_number: '+66998541030',
          name: 'mosmo',
          user_type: 1,
        },
        {
          phone_number: '+66998541031',
          name: 'mosmo',
          user_type: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
