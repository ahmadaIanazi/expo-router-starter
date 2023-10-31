import { create } from 'zustand';
import { ReactNode } from 'react';
import { Types as TypesFromLayout } from '@/app/(bottom)'

type RouteNames = keyof typeof routesComponentsObject;
type Types = { [K in keyof typeof TypesFromLayout]: void };

export interface BottomState {
  open: boolean;
  data: any | null;
  route: 'none' | Types | RouteNames;
}

export interface routeState {
    name: string;
    component: ReactNode
  }

interface RoutesAndComponents {
  [route: string]: ReactNode;
}

export interface BottomRouteUpdate {
  bottomState: BottomState;
  setBottom: (res: BottomState) => void;
  bottom: {
    open: (route: 'none' | Types | RouteNames, data?: any | null) => void;
    close: () => void;
  };
  defaultState: BottomState;
  routeComponents: RoutesAndComponents;
  routesArray: string[];
  setRouteComponents: (res: any) => void;
  setRoutesArray: (res: any) => void;
}

export const useBottomStore = create<BottomRouteUpdate>((set, get) => ({
  bottomState: {
    open: false,
    data: null,
    route: 'none',
  },
  setBottom: (res: BottomState) => {
    set({ bottomState: res });
  },
  closeBottom: () => {
    set({
      bottomState: {
        open: false,
        data: null,
        route: 'none',
      },
    });
  },
  bottom: {
    open: (route: 'none' | Types | RouteNames, data: any | null = null) => {
      set({
        bottomState: {
          open: true,
          data: data,
          route: route,
        },
      });
    },
    close: () => {
      set({
        bottomState: {
          open: false,
          data: null,
          route: 'none',
        },
      });
    },
  },
  defaultState: {
    open: false,
    data: null,
    route: 'none',
  },

  routesObject: {},
  // setRoutesObject: (object) => {
  //   set({ routesObject: object });
  // },

  routesArray: ['none'],
  setRoutesArray: (array) => {
    set({ routesArray: array });
  },
  routeComponents: {
    'none': null,
  },
  setRouteComponents: (object) => {
    console.log('ROUTE COMPONENT:', object?.length);
    set({ routeComponents: object });
  },
}));

export const bottom = useBottomStore.getState().bottom;
export const routesComponentsObject: any = useBottomStore.getState().routeComponents;
