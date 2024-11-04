import ContentItem from '../views/pages/content-item';
import Search from '../views/pages/search';
import Detail from '../views/pages/detail';

const routes = {
    '/search': Search,
  '/': ContentItem,
  '/restaurant/:id': Detail,
};

export default routes;
