import crypto from 'node:crypto';
import { InvalidUuidError } from '../errors/InvalidUuidError';

export abstract class Entity {
  protected setCurrentDate(dateToParse?: string | number | Date): Date {
    if (!dateToParse) {
      return new Date();
    }
    if (isNaN(new Date(dateToParse).getTime())) {
      return new Date();
    }
    return new Date(dateToParse);
  }

  protected setId(id?: string): string {
    if (!id) {
      return crypto.randomUUID();
    }
    if (!this.isUuid(id)) {
      throw new InvalidUuidError({ location: __filename, method: 'setId' });
    }
    return id;
  }

  private isUuid(uuid: string): boolean {
    const uuidV4Regex =
      /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    return typeof uuid === 'string' && uuidV4Regex.test(uuid);
  }
}
