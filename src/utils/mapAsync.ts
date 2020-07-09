export const mapAsync = <T extends any>(array: any[]) => (
  fn: (value: string, index: number, array: any[]) => Promise<T>
) => Promise.all<T>(array.map(fn));

export default mapAsync;
