export type CustomErrorConstructor = {
  location: string;
  method: string;
};

export type Product = {
  id?: string;
  title: string;
  description: string;
  value: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};
