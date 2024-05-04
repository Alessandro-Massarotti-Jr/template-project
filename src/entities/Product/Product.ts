import { Type } from '../../types';
import { Entity } from '../Entity';

export class Product extends Entity {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly value: number;
  public readonly quantity: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: Type.Product) {
    super();
    this.id = this.setId(props.id);
    this.title = props.title;
    this.description = props.description;
    this.value = props.value ?? 0;
    this.quantity = props.quantity ?? 0;
    this.createdAt = this.setCreatedAt(props.createdAt);
    this.updatedAt = this.setUpdatedAt(props.updatedAt);
  }

  public getAllStockValue() {
    return this.quantity * this.value;
  }
}
