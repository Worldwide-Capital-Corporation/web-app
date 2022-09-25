/**
 * MFA model.
 */
export interface MultiFactorAuthentication {
  enrolled: boolean;
  qrCode: string;
}
