import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import { Logger } from 'winston';
import { IProduct } from '@/models/product.model';

@EventSubscriber()
export default class ProductSubscriber {
  @On(events.product.create)
  public onProductAdded({ sku }: Partial<IProduct>) {
    const Logger: Logger = Container.get('logger');

    try {
      /**
       * @TODO implement this
       */
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.product.create}: %o`, e);

      // Throw the error so the process dies (check src/app.ts)
      throw e;
    }
  }
}
