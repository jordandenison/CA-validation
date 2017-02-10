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
    name: 'test'
  }
  testSchema = {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    }
  }
})

test('returns undefined when only partial data is valid', t => {
  t.is(validate(testData, testSchema, { partial: true }), void 0)
})

test('returns an error when partial data is passed and partial option not set', t => {
  t.is(validate(testData, testSchema).email, 'is required')
})
