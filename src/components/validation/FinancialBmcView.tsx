'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FinancialModel } from '@/schemas/financial-model.schema';

interface Props { bmc: FinancialModel['bmc'] }

interface BmcSectionDef {
  key: keyof FinancialModel['bmc'];
  label: string;
}

const BMC_SECTIONS: BmcSectionDef[] = [
  { key: 'key_partners', label: 'Key Partners' },
  { key: 'key_activities', label: 'Key Activities' },
  { key: 'key_resources', label: 'Key Resources' },
  { key: 'value_proposition', label: 'Value Proposition' },
  { key: 'customer_relationships', label: 'Customer Relationships' },
  { key: 'channels', label: 'Channels' },
  { key: 'customer_segments', label: 'Customer Segments' },
  { key: 'cost_structure_items', label: 'Cost Structure' },
  { key: 'revenue_streams', label: 'Revenue Streams' },
];

export function FinancialBmcView({ bmc }: Props) {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-3">Business Model Canvas</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {BMC_SECTIONS.map(({ key, label }) => {
          const value = bmc[key];
          const isSingle = typeof value === 'string';

          return (
            <Card key={key} className="text-sm">
              <CardHeader className="pb-1 pt-3 px-3">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                {isSingle ? (
                  <p>{value}</p>
                ) : (
                  <ul className="space-y-0.5">
                    {Array.isArray(value) && value.map((item) => (
                      <li key={item} className="text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
