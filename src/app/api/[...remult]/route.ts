import { remultNextApp } from 'remult/remult-next'
import { Art } from '../../../shared/art'

const api = remultNextApp({
    entities: [Art]
})

export const { POST, PUT, DELETE, GET } = api