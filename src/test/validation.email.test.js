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
    email: 'test@test.com'
  }
  testSchema = {
    email: {
      type: 'email'
    }
  }
})

test('returns undefined when default email input is valid email', t => {
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when email input 1 is valid email', t => {
  testData.email = 'jordan.denison@clevertech.biz'
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when email input 2 is valid email', t => {
  testData.email = 'jordan.denison@clevertech.biz.biz.biz.biz'
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when email input 3 is valid email', t => {
  testData.email = 'jordanrjodanrjodanojnri0ansdnsa.sdasd.sdasdasda.asdajordan.denison@clevertech.biz.biz.biz.biz'
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when email input 4 is valid email', t => {
  testData.email = 'hi@reallyreallylongdomainnamewellokmaybenotthatlong.ca'
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when email input 5 is valid email', t => {
  testData.email = 't@t.co'
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when email input is not a valid string', t => {
  testData.email = 1
  t.is(validate(testData, testSchema).email, 'must be a string')
})

test('returns an error when invalid email input 1 is not a valid email', t => {
  testData.email = 'test@test.'
  t.is(validate(testData, testSchema).email, 'must be a valid email address')
})

test('returns an error when invalid email input 2 is not a valid email', t => {
  testData.email = 'test@test.c'
  t.is(validate(testData, testSchema).email, 'must be a valid email address')
})

test('returns an error when invalid email input 3 is not a valid email', t => {
  testData.email = 'test@test@test.com'
  t.is(validate(testData, testSchema).email, 'must be a valid email address')
})
