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
    id: '463e3820-e7ad-11e6-bf7e-ad002e0cffcb'
  }
  testSchema = {
    id: {
      type: 'uuid'
    }
  }
})

test('returns undefined when string input is valid uuid type', t => {
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when input is not a valid string', t => {
  testData.id = 1
  t.is(validate(testData, testSchema).id, 'must be a string')
})

test('returns an error when input is not a valid uuid type', t => {
  testData.id = 'wrong type'
  t.is(validate(testData, testSchema).id, 'must be a uuid')
})
