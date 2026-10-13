/**
 * Macroeconomic & digital demographic indicators for India.
 * Pulls from the official World Bank Open Data API with static fallback indicators.
 */

export interface MacroIndicators {
  country: string;
  gdpGrowthRate: string;
  internetPenetrationRate: string;
  upiMonthlyVolume: string;
  smartphoneUsers: string;
  source: string;
}

const FALLBACK_INDICATORS: MacroIndicators = {
  country: 'India',
  gdpGrowthRate: '6.8% - 7.2% annual GDP growth (World Bank 2024)',
  internetPenetrationRate: '52.4% of total population (~820M active internet users)',
  upiMonthlyVolume: '14.96 Billion transactions / month (NPCI September 2024, ~₹20.6 Lakh Crore value)',
  smartphoneUsers: '~650 Million active smartphone users (Tier 2/3 driving 65% of net additions)',
  source: 'World Bank Open Data / NPCI / TRAI Telecommunications Report',
};

/**
 * Fetches recent GDP growth data from World Bank Open API for India (IND),
 * falling back to verified demographic baseline if unavailable or timed out.
 */
export async function getMacroIndicators(): Promise<MacroIndicators> {
  try {
    const url = 'https://api.worldbank.org/v2/country/IND/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=3';
    const res = await fetch(url, {
      signal: AbortSignal.timeout(3000),
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) return FALLBACK_INDICATORS;

    const data = await res.json() as [unknown, Array<{ date: string; value: number | null }>];
    const records = data[1] || [];
    const latestValid = records.find((r) => r.value !== null);

    if (latestValid && latestValid.value !== null) {
      return {
        ...FALLBACK_INDICATORS,
        gdpGrowthRate: `${latestValid.value.toFixed(1)}% annual growth (World Bank ${latestValid.date})`,
        source: 'Live World Bank Open Data API (indicator: NY.GDP.MKTP.KD.ZG)',
      };
    }
  } catch {
    // Graceful fallback
  }

  return FALLBACK_INDICATORS;
}

export function formatMacroContext(macro: MacroIndicators): string {
  return `### Indian Macroeconomic & Digital Landscape (${macro.source})
- GDP Growth Profile: ${macro.gdpGrowthRate}
- Digital Penetration: ${macro.internetPenetrationRate}
- Payment Rails (UPI): ${macro.upiMonthlyVolume}
- Smartphone Reach: ${macro.smartphoneUsers}
`;
}
