export type CodeConversionInputMsg = {
  codeInput: string;
  /** @deprecated */
  pglang: string; // ProgramLang;
};

export type CodeConversionOutputMsg = {
  codeOutput: string | undefined;
  errorName?: string;
  errorMsg?: string;
};
