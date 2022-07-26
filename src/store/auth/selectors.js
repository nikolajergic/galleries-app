export function selectIsAuthenticated(state) {
    return !!state.auth.token;
  }
  export function selectActiveUser(state) {
    return state.auth.activeUser;
  }
  