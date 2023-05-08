export class ErrorResponse extends Error {
  code: number;

  constructor(_code: number, _message: string) {
    super(_message);
    this.code = _code;
  }
}
