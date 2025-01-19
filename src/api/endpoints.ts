export type EndpointFunction = (params: any) => string;


export type Endpoint = string | EndpointFunction;

export type Endpoints = {
  auth: {
    getConfig: string;
    create: string;
  };
  todo: {
    getAll: string;
    getById: (id: string) => string;
    create: string;
    update: (id: string) => string;
    partialUpdate: (id: string) => string;
    delete: (id: string) => string;
    filter: (filters: Record<string, string>) => string;
  };
  users: {
    getAll: string;
    getById: (id: string) => string;
    create: string;
    update: (id: string) => string;
    partialUpdate: (id: string) => string;
    delete: (id: string) => string;
    filter: (filters: Record<string, string>) => string;
  };
};

export const endpoints: Endpoints = {
  auth: {
    getConfig: '/',
    create:'/create'
  },
  todo: {
    getAll: '/todo',
    getById: (id: string) => `/todo/${id}`,
    create: '/todo',
    update: (id: string) => `/todo/${id}`,
    partialUpdate: (id: string) => `/todo/${id}/partial-update`,
    delete: (id: string) => `/todo/${id}`,
    filter: (filters: Record<string, string>) => `/todo?${new URLSearchParams(filters).toString()}`,
  },
  users: {
    getAll: '/users',
    getById: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    partialUpdate: (id: string) => `/users/${id}/partial-update`,
    delete: (id: string) => `/users/${id}`,
    filter: (filters: Record<string, string>) => `/users/filter?${new URLSearchParams(filters).toString()}`,
  },
};
