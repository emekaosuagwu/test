/**
 * Email template to be used to send password recovery email to user
 * @arg {string} token - token to be sent to users for password recovery
 * @return {string} Returns an HTML string that will be sent together with a url that contains user token
 */

export const PasswordRecoveryTemplate = (token) => (
  `
  <h3>Dear User,</h3>
  <p>Follow this link to recover your password
  <a href="https://trouvise.io/recovery/${token}">https://trouvise.io/recovery/${token}</a></p>
  `
);

/**
 * Email template to be used to complete profile registration
 * @arg {string} token - jwt tokenized user ID to be sent to users for profile registration
 * @return {string} Returns an HTML string that will be sent together with a url that contains user token
 */

export const CompleteRegistrationTemplate = (token) => (
  `
  <h3>Dear User,</h3>
  <p>Follow this link to complete your profile registration
  <a href="https://trouvise.io/complete_registration/${token}">https://trouvise.io/complete_registration/${token}</a></p>
  `
);
