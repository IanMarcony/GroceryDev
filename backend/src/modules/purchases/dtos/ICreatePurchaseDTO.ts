import Product from '@modules/products/infra/typeorm/entities/Product';

export default interface ICreatePurchaseDTO {
  pay_type: string;
  products: Product[];
}
