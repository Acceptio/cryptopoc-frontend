import { INDEX_PATH } from 'routes';

const selectRoutingLocationFromState = state => state.routing.location;

const selectLocationPathname = state => {
  const location = selectRoutingLocationFromState(state);
  let toReturn = '';
  if (location) {
    toReturn = location.pathname;
  }
  return toReturn;
};

export const selectIsLogoutLocation = state => selectLocationPathname(state) !== INDEX_PATH && !!selectLocationPathname(state);
