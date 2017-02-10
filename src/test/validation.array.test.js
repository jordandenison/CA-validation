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
    groups: [ 'group1', 'group2' ]
  }
  testSchema = {
    groups: {
      type: 'array'
    }
  }
})

test('returns undefined when array input is valid array', t => {
  t.is(validate(testData, testSchema), void 0)
})

test('returns an error when array input is not an array', t => {
  testData.groups = {}
  t.is(validate(testData, testSchema).groups, 'must be an array')
})

test('returns undefined when array items are of proper type', t => {
  testSchema.groups.of = 'string'
  t.is(validate(testData, testSchema), void 0)
})

test('returns an errors when array items are not all of proper type', t => {
  testData.groups = [ 1, 'group2' ]
  testSchema.groups.of = 'string'
  t.is(validate(testData, testSchema).groups, 'must be an array of string')
})

test('returns undefined when array of simple items are of objects are all of proper type', t => {
  testData.groups = [
    { name: 'test1' },
    { name: 'test2' },
    { name: 'test3' }
  ]
  testSchema.groups.of = {
    name: {
      type: 'string',
      required: true
    }
  }
  t.is(validate(testData, testSchema), void 0)
})

test('returns undefined when array of complex items are of objects are all of proper type', t => {
  testData.groups = [
    { name: 'test1', id: 'test1', otherProp: 4, differentOtherProp: true, optionalProp: 'test' },
    { name: 'test2', id: 'test2', otherProp: 0, differentOtherProp: false },
    { name: 'test3', id: 'test3', otherProp: 2, differentOtherProp: true }
  ]
  testSchema.groups.of = {
    name: {
      type: 'string',
      required: true
    },
    id: {
      type: 'string',
      required: true
    },
    otherProp: {
      type: 'number',
      required: true
    },
    differentOtherProp: {
      type: 'boolean',
      required: true
    },
    optionalProp: {
      type: 'string'
    }
  }
  t.is(validate(testData, testSchema), void 0)
})

test('returns an errors when array of simple items are not all of proper type', t => {
  testData.groups = [
    { name: 'test1' },
    { name: 'test2' },
    { notName: 'test3' }
  ]
  testSchema.groups.of = {
    name: {
      type: 'string',
      required: true
    }
  }
  t.is(validate(testData, testSchema).groups, `must be an array of ${JSON.stringify(testSchema.groups.of)}`)
})

test('returns an errors when array of complex items are not all of proper type', t => {
  testData.groups = [
    { id: 'test1', otherProp: 'string', differentOtherProp: true, optionalProp: 'test' },
    { name: 'test2', id: 'test2', otherProp: 0, differentOtherProp: false },
    { name: 'test3', id: 3, otherProp: 2 }
  ]
  testSchema.groups.of = {
    name: {
      type: 'string',
      required: true
    },
    id: {
      type: 'string',
      required: true
    },
    otherProp: {
      type: 'number',
      required: true
    },
    differentOtherProp: {
      type: 'boolean',
      required: true
    },
    optionalProp: {
      type: 'string'
    }
  }
  t.is(validate(testData, testSchema).groups, `must be an array of ${JSON.stringify(testSchema.groups.of)}`)
})

test('returns undefined when array of simple items are of objects are partially updated and all of proper type', t => {
  testData.groups = [
    { name: 'test1' },
    { name: 'test2' },
    { name: 'test3' }
  ]
  testSchema.groups.of = {
    name: {
      type: 'string',
      required: true
    },
    other: {
      type: 'boolean',
      required: true
    }
  }
  t.is(validate(testData, testSchema, { partial: true }), void 0)
})

test('returns undefined when array of complex items are of objects are all of proper type', t => {
  testData.groups = [
    { name: 'test1', id: 'test1', differentOtherProp: true, optionalProp: 'test' },
    { id: 'test2', otherProp: 0, differentOtherProp: false },
    { name: 'test3', otherProp: 2, differentOtherProp: true }
  ]
  testSchema.groups.of = {
    name: {
      type: 'string',
      required: true
    },
    id: {
      type: 'string',
      required: true
    },
    otherProp: {
      type: 'number',
      required: true
    },
    differentOtherProp: {
      type: 'boolean',
      required: true
    },
    optionalProp: {
      type: 'string'
    }
  }
  t.is(validate(testData, testSchema, { partial: true }), void 0)
})

test('returns an errors when array of simple items are partially updated and not all of proper type', t => {
  testData.groups = [
    { other: 1 },
    { name: 'test2', other: false },
    { other: true }
  ]
  testSchema.groups.of = {
    name: {
      type: 'string',
      required: true
    },
    other: {
      type: 'boolean',
      required: true
    }
  }
  t.is(validate(testData, testSchema, { partial: true }).groups, `must be an array of ${JSON.stringify(testSchema.groups.of)}`)
})
