import { isUuid, uuid } from 'uuidv4';
import { InvalidUuidError } from '../errors/InvalidUuidError';

export abstract class Entity {
  protected setCreatedAt(dateToParse?: string | number | Date) {
    if (!dateToParse) {
      return new Date();
    }
    if (isNaN(new Date(dateToParse).getTime())) {
      return new Date();
    }
    return new Date(dateToParse);
  }
  protected setUpdatedAt(dateToParse?: string | number | Date) {
    if (!dateToParse) {
      return new Date();
    }
    if (isNaN(new Date(dateToParse).getTime())) {
      return new Date();
    }
    return new Date(dateToParse);
  }

  protected setId(id?: string) {
    if (!id) {
      return uuid();
    }
    if (!isUuid(id)) {
      throw new InvalidUuidError({ location: __filename, method: 'setId' });
    }
    return id;
  }
}
