import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, PersonModel, Product} from '../models';
import {PersonModelRepository} from './person-model.repository';
import {ProductRepository} from './product.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly person: BelongsToAccessor<PersonModel, typeof Pedido.prototype.id>;

  public readonly product: HasOneRepositoryFactory<Product, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonModelRepository') protected personModelRepositoryGetter: Getter<PersonModelRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Pedido, dataSource);
    this.product = this.createHasOneRepositoryFactoryFor('product', productRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.person = this.createBelongsToAccessorFor('person', personModelRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
