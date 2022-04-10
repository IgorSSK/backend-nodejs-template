import { Optional } from '@common/types';

export interface Validator {
  validate: () => Optional<Error>
}
