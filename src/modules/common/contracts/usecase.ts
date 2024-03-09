export interface Usecase<Input, Output> {
  execute(data: Input): PromiseLike<Output>;
}
