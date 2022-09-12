/**
 * OAuth2 token model.
 */
export interface OAuth2Token {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expiresIn: number;
  scope: string;
}
