'use strict'

const columnAndTypes = [{
    name: 'is_admin',
    type: (Sequelize) => {
        return {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    }
}];

module.exports = {
    up: (QueryInterface, Sequelize) => {
        return Promise.all(
            columnAndTypes.map(c => {
                return QueryInterface.addColumn(
                    'Users',
                    c.name,
                    c.type(Sequelize)
                )
            })
        )
    },

    down: (QueryInterface, Sequelize) => {
        return Promise.all(
            columnAndTypes.map(c => {
                return QueryInterface.removeColumn(
                    'User',
                    c.name
                )
            })
        )
    }
}