//faz com que o ReactNavigation conheça as rotas
export declare global {
  namespace ReactNavigation {
      interface RootParamList {
          home: undefined;
          new: undefined;
          habit: {
              date: string;
          }
      }
  }
}