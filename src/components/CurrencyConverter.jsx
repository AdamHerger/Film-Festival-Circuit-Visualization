const conversionRates = {
  $: 1,
  USD: 1,
  EUR: 1.17,
  AUD: 0.71,
  NZD: 0.59,
  CAD: 0.73,
  GBP: 1.36,
  CHF: 1.25,
  SEK: 0.11,
  INR: 0.01,
  THB: 0.03,
  FRF: 0.18,
  RUR: 0.012,
  JPY: 0.0064,
  FIM: 0.197,
  DEM: 0.59,
  NOK: 0.11,
  DKK: 0.16,
  KRW: 0.00072,
  PLN: 0.27,
  BRL: 0.19,
  HUF: 0.0032,
  SGD: 0.67,
  ILS: 0.33,
  ZAR: 0.062,
  TRL: 0.021,
  MXN: 0.059,
  IQD: 0.00076,
  NGN: 0.00074,
  BRL: 0.19,
  BGL: 0.5969,
  DOP: 0.017,
  MYR: 0.25,
  ARS: 0.00067,
};
function CurrencyConverter(string) {
  if (!string || string === "NA") return -1;
  const spaceIndex = string.indexOf(" ");
  const cut = spaceIndex === -1 ? string : string.slice(0, spaceIndex);
  let currency;
  if (cut.startsWith("$")) currency = "$";
  else {
    currency = cut.substring(0, 3).toUpperCase();
  }
  const rate = conversionRates[currency];
  if (rate === undefined) return -1;
  const number = parseInt(cut.replaceAll(/\D/g, ""));
  return number * rate;
}
export default CurrencyConverter;
