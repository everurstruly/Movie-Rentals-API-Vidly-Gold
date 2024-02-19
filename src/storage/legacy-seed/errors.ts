export class InvalidSeedFileNameError extends Error {
  constructor(msg?: string) {
    const defaultMsg = "Provide credible information for the seed file names";
    const message = msg || defaultMsg;
    super(message);
    this.name = "InvalidSeedFileNameError";
  }
}
