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
    page: 1
  }
  testSchema = {
    page: {
      type: 'number'
    }
  }
})

test('returns undefined when number input is valid number', t => {
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when number input is not a valid number', t => {
  testData.page = '1'
  t.is(validate(testData, testSchema).page, 'must be a number')
})

test('returns undefined when number is between min and max length', t => {
  testSchema.page.min = 0
  testSchema.page.max = 2
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when number is below min length', t => {
  testData.page = 1
  testSchema.page.min = 2
  testSchema.page.max = 5
  t.is(validate(testData, testSchema).page, 'must be between 2 and 5')
})

test('returns an error when number is above max length', t => {
  testData.page = 6
  testSchema.page.min = 2
  testSchema.page.max = 5
  t.is(validate(testData, testSchema).page, 'must be between 2 and 5')
})

test('returns undefined when number is above min length', t => {
  testSchema.page.min = 0
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when number is below min length', t => {
  testData.page = 1
  testSchema.page.min = 2
  t.is(validate(testData, testSchema).page, 'must be above 2')
})

test('returns undefined when number is below max length', t => {
  testSchema.page.max = 5
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when number is above max length', t => {
  testSchema.page.max = 0
  t.is(validate(testData, testSchema).page, 'must be below 0')
})

test('returns undefined when number is required and present', t => {
  testSchema.page.required = true
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when number is not required and not present', t => {
  delete testSchema.page
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when number is not required and is null', t => {
  testSchema.page = null
  t.is(validate(testData, testSchema), void 0)
})
