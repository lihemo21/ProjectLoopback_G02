import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PersonModel, PersonModelRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class PersonModelRepository extends DefaultCrudRepository<
  PersonModel,
  typeof PersonModel.prototype.id,
  PersonModelRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof PersonModel.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(PersonModel, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
