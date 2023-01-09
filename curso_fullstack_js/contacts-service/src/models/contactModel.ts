import sequelize, {Optional, Model} from "sequelize";
import db from 'ms-commons/data/db';
import {IContact} from './IContact';

interface IContactCreationAttributes extends Optional<IContact, "id">{}

export interface IContactModel extends Model<IContact, IContactCreationAttributes>, IContact {}

export default db.define<IContactModel>('contacts', {
    id: {
        type: sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    accountId: {
        type: sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    name: {
        type: sequelize.STRING(150),
        allowNull: true
    },
    email: {
        type: sequelize.STRING(150),
        allowNull: false
    },
    phone: {
        type: sequelize.STRING(12),
        allowNull: true
    },
    status: {
        type: sequelize.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 100
    }
}, {
    indexes: [{
        unique: true,
        fields: ['accountId', 'email']
    }]
})