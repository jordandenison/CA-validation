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
    active: true
  }
  testSchema = {
    active: {
      type: 'boolean'
    }
  }
})

test('returns undefined when boolean input is valid boolean', t => {
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when boolean input is not a valid boolean', t => {
  testData.active = 1
  t.is(validate(testData, testSchema).active, 'must be a boolean')
})

test('returns undefined when boolean is required and present', t => {
  testSchema.active.required = true
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when boolean is not required and not present', t => {
  delete testSchema.active
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when boolean is not required and is null', t => {
  testSchema.active = null
  t.is(validate(testData, testSchema), void 0)
})
