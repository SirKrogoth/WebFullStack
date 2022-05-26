import database from '../db';
import Sequelize, { Model, Optional } from 'sequelize';
import { IAccount } from './IAccount';

interface AccountCreationAttributes extends Optional<IAccount, "id">{}

export interface AccountModel extends Model<IAccount, AccountCreationAttributes>, IAccount {}

export default database.define<AccountModel>('account', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.SMALLINT.UNSIGNED,
        defaultValue: 100,
        allowNull: true
    },
    domain: {
        type: Sequelize.STRING,
        allowNull: false 
    }
});