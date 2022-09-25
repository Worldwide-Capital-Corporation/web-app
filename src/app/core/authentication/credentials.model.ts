/**
 * Credentials model.
 */
export interface Credentials {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  authenticated: boolean;
  base64EncodedAuthenticationKey?: string;
  isTwoFactorAuthenticationRequired?: boolean;
  isMFAAuthenticationRequired?: boolean;
  officeId: number;
  officeName: string;
  staffId?: number;
  staffDisplayName?: string;
  organizationalRole?: any;
  permissions: string[];
  roles: any;
  userId: number;
  username: string;
  shouldRenewPassword: boolean;
  rememberMe?: boolean;
}
