// Fixed, approximate USD→NPR conversion rate used only for one-time migration
// of legacy USD-scale demo data. Not a live exchange rate.
const USD_TO_NPR_RATE = 133;

// Round an amount UP to the nearest 500 NRS
const roundUpTo500 = (amount) => Math.ceil((Number(amount) || 0) / 500) * 500;

// Convert a legacy USD-scale number into a rounded NRS amount (migration use only)
const usdToNpr = (usdAmount) => roundUpTo500(Number(usdAmount || 0) * USD_TO_NPR_RATE);

// Format an already-NRS amount for display, e.g. "Rs 13,500"
const formatNPR = (amount) => `Rs ${Math.round(Number(amount) || 0).toLocaleString('en-IN')}`;

module.exports = { USD_TO_NPR_RATE, roundUpTo500, usdToNpr, formatNPR };
