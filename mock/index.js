import user from './user';
import role from './role';
import article from './article';
import search from './remote-search';

const mocks = [...user, ...role, ...article, ...search].map((route) => {
  return {
    ...route,
    url: `/dev-api${route.url}`,
  };
});

export default mocks;
