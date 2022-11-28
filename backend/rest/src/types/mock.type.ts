export type MockRepository<T = any> = Partial<Record<keyof T, jest.Mock>>;
