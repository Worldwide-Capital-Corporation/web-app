/**
 * MFA model.
 */
export interface MultiFactorAuthentication {
  usingAuthenticator: boolean;
  authenticatorEnrolled: boolean;
  qrCodeImage: string;
  otpDeliveryMethods: [MultiFactorAuthenticationDelivery];
}

export interface MultiFactorAuthenticationDelivery {
  name: string;
  target: string;
}
