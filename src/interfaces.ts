export interface ILog {
  pass: number;
  fail: number;
  lost: number;
  total: number;
  ok: boolean;
}

export interface IHash {
  hash: string;
  salt: string;
}
