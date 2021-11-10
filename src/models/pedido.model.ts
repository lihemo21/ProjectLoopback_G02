import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {PersonModel} from './person-model.model';
import {Product} from './product.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_product: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  state: number;

  @belongsTo(() => PersonModel)
  personId: string;

  @hasOne(() => Product, {keyTo: 'PedidoId'})
  product: Product;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
