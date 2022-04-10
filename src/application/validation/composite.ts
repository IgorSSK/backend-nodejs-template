import { Validator } from '@application/validation/validators/validator'
import { Maybe } from '@common/types'

export class ValidationComposite implements Validator {
  constructor (private readonly validators: Validator[]) {}

  validate (): Maybe<Error> {
    for (const validator of this.validators) {
      const error = validator.validate()
      if (error !== undefined) return error
    }
  }
}
