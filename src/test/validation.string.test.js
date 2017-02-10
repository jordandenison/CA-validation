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
      type: 'string'
    }
  }
})

test('returns undefined when string input is valid string', t => {
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when string input is not a valid string', t => {
  testData.name = 1
  t.is(validate(testData, testSchema).name, 'must be a string')
})

test('returns undefined when string is between min and max length', t => {
  testSchema.name.min = 0
  testSchema.name.max = 5
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when string is below min length', t => {
  testData.name = 't'
  testSchema.name.min = 2
  testSchema.name.max = 5
  t.is(validate(testData, testSchema).name, 'must be between 2 and 5 characters')
})

test('returns an error when string is above max length', t => {
  testData.name = 'tester'
  testSchema.name.min = 2
  testSchema.name.max = 5
  t.is(validate(testData, testSchema).name, 'must be between 2 and 5 characters')
})

test('returns undefined when string is above min length', t => {
  testSchema.name.min = 2
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when string is below min length', t => {
  testData.name = 't'
  testSchema.name.min = 2
  t.is(validate(testData, testSchema).name, 'must be more than 2 characters')
})

test('returns undefined when string is below max length', t => {
  testSchema.name.max = 5
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when string is above max length', t => {
  testSchema.name.max = 3
  t.is(validate(testData, testSchema).name, 'must be less than 3 characters')
})

test('returns undefined when string is required and present', t => {
  testSchema.name.required = true
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when string is not required and not present', t => {
  delete testData.name
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when string is not required and is null', t => {
  testData.name = null
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when string is required and not present', t => {
  delete testData.name
  testSchema.name.required = true
  t.is(validate(testData, testSchema).name, 'is required')
})
