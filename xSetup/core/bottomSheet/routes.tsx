// extract_routes.tsx
import Examples from '@/boards/Examples';
import Bottom from './Bottom';

type RouteKeys = keyof typeof Bottom;

export type routes = '-1' | RouteKeys;

export const RoutesToTypes = {
  '-1': <Examples />,
};
