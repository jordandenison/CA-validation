var regexp = require('./regexp')

var validators = {
  boolean: function (data) {
    if (typeof data !== 'boolean') {
      return 'must be a boolean'
    }
  },
  uuid: function (data) {
    if (typeof data !== 'string') {
      return 'must be a string'
    }

    if (!regexp.uuid.test(data)) {
      return 'must be a uuid'
    }
  },
  number: function (data, schema, field) {
    if (typeof data !== 'number') {
      return 'must be a number'
    }

    if (schema[field].hasOwnProperty('max') && schema[field].hasOwnProperty('min')) {
      if (data > schema[field].max || data < schema[field].min) {
        return 'must be between ' + schema[field].min + ' and ' + schema[field].max
      }
    } else if (schema[field].hasOwnProperty('max')) {
      if (data > schema[field].max) {
        return 'must be below ' + schema[field].max
      }
    } else if (schema[field].hasOwnProperty('min')) {
      if (data < schema[field].min) {
        return 'must be above ' + schema[field].min
      }
    }
  },
  string: function (data, schema, field) {
    if (typeof data !== 'string') {
      return 'must be a string'
    }

    if (schema[field].hasOwnProperty('max') && schema[field].hasOwnProperty('min')) {
      if (data.length > schema[field].max || data.length < schema[field].min) {
        return 'must be between ' + schema[field].min + ' and ' + schema[field].max + ' characters'
      }
    } else if (schema[field].hasOwnProperty('max')) {
      if (data.length > schema[field].max) {
        return 'must be less than ' + schema[field].max + ' characters'
      }
    } else if (schema[field].hasOwnProperty('min')) {
      if (data.length < schema[field].min) {
        return 'must be more than ' + schema[field].min + ' characters'
      }
    }
  },
  array: function (data, schema, field, options) {
    if (!(data instanceof Array)) {
      return 'must be an array'
    }

    var containsInvalidType
    if (typeof schema[field].of === 'string') {
      containsInvalidType = data.some(function (item) { return validators[schema[field].of](item, schema, field) })
      if (containsInvalidType) {
        return 'must be an array of ' + schema[field].of
      }
    } else if (schema[field].of) {
      containsInvalidType = data.some(function (item) { return validators.objectInArray(item, schema[field].of, options) })
      if (containsInvalidType) {
        return 'must be an array of ' + JSON.stringify(schema[field].of)
      }
    }
  },
  objectInArray: function (data, schema, options) {
    if (!(data instanceof Object) || data instanceof Array) {
      return 'must be an object'
    }

    var fieldSchema = Object.keys(options.partial ? data : schema).reduce(function (result, dataField) {
      result[dataField] = schema[dataField]
      return result
    }, {})

    return validate(data, fieldSchema, options)
  },
  object: function (data, schema, field, options) {
    if (!(data instanceof Object) || data instanceof Array) {
      return 'must be an object'
    }

    var fieldSchema = Object.keys(options.partial ? data : schema[field]).reduce(function (result, dataField) {
      if (dataField === 'type') { return result }
      result[dataField] = schema[field][dataField]
      return result
    }, {})

    return validate(data, fieldSchema)
  },
  enum: function (data, schema, field) {
    var strError = validators.string(data, schema, field)
    if (strError) { return strError }

    if (schema[field].types.indexOf(data) === -1) { return `must be one of ${schema[field].types.join(', ')}` }
  },
  email: function (data, schema, field) {
    var strError = validators.string(data, schema, field)
    if (strError) { return strError }

    if (!regexp.email.test(data)) {
      return 'must be a valid email address'
    }
  }
}

var process = function (data, schema, options) {
  return function (errors, field) {
    if (!field || !schema[field]) { return errors }

    if (schema[field].required) {
      if (data[field] === null || data[field] === void 0) {
        if (schema[field].defaultValue) { return errors }
        errors[field] = 'is required'
        return errors
      }
    } else if (data[field] === null || data[field] === void 0) {
      return errors
    }

    var error = validators[schema[field].type](data[field], schema, field, options)
    if (error) { errors[field] = error }
    return errors
  }
}

function validate (data, schema, options) {
  if (!options) { options = {} }

  var fields = Object.keys(options.partial ? data : schema)
  var errorsResult = fields.reduce(process(data, schema, options), {})

  if (Object.keys(errorsResult).length) { return errorsResult }
}

module.exports = validate
