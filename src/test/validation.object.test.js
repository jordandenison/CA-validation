/**
 * External dependencies
 */
const test = require('ava')

/**
 * SUT
 */
const validate = require('../index')

let testData
let testSchema

test.beforeEach(() => {
  testData = {
    address: {
      street: 'test st',
      city: 'test city'
    }
  }
  testSchema = {
    address: {
      type: 'object',
      street: {
        type: 'string',
        min: 2,
        max: 100,
        required: true
      },
      city: {
        type: 'string',
        min: 2,
        max: 100,
        required: true
      }
    }
  }
})

test('returns undefined when object input is valid object', t => {
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when object input is not an object', t => {
  testData.address = []
  t.is(validate(testData, testSchema).address, 'must be an object')
})

test('returns an error when object input is not valid', t => {
  testData.address.street = 1
  t.is(validate(testData, testSchema).address.street, 'must be a string')
})

test('returns an error when object input is missing a required field', t => {
  delete testData.address.street
  t.is(validate(testData, testSchema).address.street, 'is required')
})

test('returns undefined when partial object input is valid', t => {
  delete testData.address.street
  t.is(validate(testData, testSchema, { partial: true }), void 0)
})
