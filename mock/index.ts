import user from './user';
import role from './role';
import article from './article';
import search from './remote-search';

export function getMocks(baseApi = '/dev-api'): any[] {
  const mocks = [...user, ...role, ...article, ...search].map((route) => {
    return {
      ...route,
      url: `${baseApi}${route.url}`,
    };
  });

  return mocks;
}

export default getMocks();
