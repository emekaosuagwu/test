/**
 * Take in status and error and send response from the server using the supplied status and errors as
 * status and details of the error respectively.
 *
 * @arg  {object} responseObj - express response object
 * @arg  {number} status - Http status of the response
 * @arg  {(string|object)} details - either a custom composed string or a error from mongdb or other library
 * @returns  {object} An express response object together with payload and status
 */

 export const errorResponseWithStatus = (responseObject, status, details) => {
   const payload = {};
   payload.error = { status: status, details: details };
   responseObject.status(status).send(payload);
 };
