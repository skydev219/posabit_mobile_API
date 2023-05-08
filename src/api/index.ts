import { Router } from 'express';
import brandRoute from './routes/brand.route';
import companyRoute from './routes/company.route';
import menuRoute from './routes/menu.route';
import productRoute from './routes/product.route';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  companyRoute(app);
  productRoute(app);
  menuRoute(app);
  brandRoute(app);

  return app;
};
