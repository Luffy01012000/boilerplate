/**
 * sequelize-typescript
 */

import { Optional } from 'sequelize'
import { Table, Model, Column, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript'

interface UserAttributes {
    id: number
    firstname: string
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

@Table({
    timestamps: true,
    tableName: 'Users',
    modelName: 'User'
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string
    @Column({
        type: DataType.STRING
    })
    declare firstname: string

    @CreatedAt
    declare created_at: Date

    @UpdatedAt
    declare updated_at: Date
}

