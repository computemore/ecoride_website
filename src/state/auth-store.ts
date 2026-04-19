export interface AuthState {
  isAuthenticated: boolean;
  profileImageUrl?: string;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
};