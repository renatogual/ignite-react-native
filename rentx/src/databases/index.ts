
import Database from '@nozbe/watermelondb/Database'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { User } from './model/User'
import { schemas } from './schema'
import { Car } from './model/Car'

const adapter = new SQLiteAdapter({
  schema: schemas,
})

export const database = new Database({
  adapter,
  modelClasses: [User, Car],
})