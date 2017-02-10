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
    name: 'type1'
  }
  testSchema = {
    name: {
      type: 'enum',
      types: [ 'type1', 'type2', 'type3' ]
    }
  }
})

test('returns undefined when string input is valid enum type', t => {
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when number is represented as string input and is valid enum type', t => {
  testData.name = '1'
  testSchema.name.types = [ '1', '2' ]
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when input is not a valid string', t => {
  testData.name = 1
  t.is(validate(testData, testSchema).name, 'must be a string')
})

test('returns an error when input is not a valid enum type', t => {
  testData.name = 'wrong type'
  t.is(validate(testData, testSchema).name, 'must be one of type1, type2, type3')
})
