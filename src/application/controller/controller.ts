import { HttpResponse, badRequest, serverError } from '@application/helpers/http';
import { ValidationComposite } from '@application/validation/composite';
import { Validator } from '@application/validation/validators/validator';
import { Maybe } from '@common/types';

declare global {
  interface Object {
    isNullOrEmpty: (obj: object) => boolean
  }
}

// eslint-disable-next-line no-extend-native
Object.prototype.isNullOrEmpty = (obj: object): boolean => obj === null || obj === undefined

export abstract class IController {
  abstract perform (httpRequest: any): Promise<HttpResponse>;

  buildValidators (httpRequest: any): Validator[] {
    return [];
  }

  async handle (httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest);
    if (error !== null && error !== undefined) return badRequest(error);
    try {
      return await this.perform(httpRequest);
    } catch (error) {
      return serverError(error);
    }
  }

  private validate (httpRequest: any): Maybe<Error> {
    const validators = this.buildValidators(httpRequest);
    return new ValidationComposite(validators).validate();
  }
}
