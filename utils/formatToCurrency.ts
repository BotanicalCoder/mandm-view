const formatToCurrency = (
  v: number,
  useCompact: boolean = false,
  useNarrow: boolean = true,
  currCode: string
): string => {
  const Cur = new Intl.NumberFormat("en-GB", {
    currency: currCode,
    style: "currency",
    currencyDisplay: useNarrow ? "narrowSymbol" : "symbol",
    notation: useCompact ? "compact" : undefined,
  });

  return Cur.format(v);
};

export default formatToCurrency;
