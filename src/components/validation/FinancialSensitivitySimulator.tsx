'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, ShieldAlert, Zap, Calculator } from 'lucide-react';

interface Props {
  initialAOV?: number;
  initialTakeRate?: number;
  initialDeliveryCost?: number;
  initialCAC?: number;
  initialFixedOpEx?: number;
}

export function FinancialSensitivitySimulator({
  initialAOV = 1400,
  initialTakeRate = 16,
  initialDeliveryCost = 55,
  initialCAC = 340,
  initialFixedOpEx = 375000,
}: Props) {
  const [aov, setAov] = useState<number>(initialAOV);
  const [takeRate, setTakeRate] = useState<number>(initialTakeRate);
  const [deliveryCost, setDeliveryCost] = useState<number>(initialDeliveryCost);
  const [cac, setCac] = useState<number>(initialCAC);
  const [monthlyChurn, setMonthlyChurn] = useState<number>(6); // 6% monthly churn

  // Dynamic Unit Economic Computations
  const math = useMemo(() => {
    const grossRevenuePerOrder = (aov * takeRate) / 100;
    const paymentGatewayFee = aov * 0.018; // 1.8% standard Indian PG fee (Razorpay/Cashfree)
    const cm1 = grossRevenuePerOrder;
    const cm2 = grossRevenuePerOrder - deliveryCost - paymentGatewayFee;
    const cm2Percent = aov > 0 ? (cm2 / aov) * 100 : 0;

    // LTV Model: average 2 orders per active month per customer
    const expectedLifespanMonths = monthlyChurn > 0 ? Math.min(100 / monthlyChurn, 36) : 36;
    const lifetimeOrders = expectedLifespanMonths * 2;
    const customerLTV = lifetimeOrders * Math.max(cm2, 0);
    const ltvToCac = cac > 0 ? customerLTV / cac : 0;

    // Break-even orders per month against fixed OpEx
    const breakEvenOrdersMonthly = cm2 > 0 ? Math.ceil(initialFixedOpEx / cm2) : Infinity;
    const breakEvenDaily = isFinite(breakEvenOrdersMonthly) ? Math.ceil(breakEvenOrdersMonthly / 30) : 0;

    return {
      grossRevenuePerOrder,
      paymentGatewayFee,
      cm1,
      cm2,
      cm2Percent,
      expectedLifespanMonths: Math.round(expectedLifespanMonths),
      customerLTV: Math.round(customerLTV),
      ltvToCac: Number(ltvToCac.toFixed(2)),
      breakEvenOrdersMonthly,
      breakEvenDaily,
      isProfitableOnOrder: cm2 > 0,
    };
  }, [aov, takeRate, deliveryCost, cac, monthlyChurn, initialFixedOpEx]);

  // Determine health rating
  const ltvRating = useMemo(() => {
    if (math.ltvToCac >= 4.0) return { label: 'Venture Exceptional (>4x)', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' };
    if (math.ltvToCac >= 3.0) return { label: 'Venture Healthy (3x-4x)', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' };
    if (math.ltvToCac >= 1.5) return { label: 'Fragile Unit Economics (1.5x-3x)', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
    return { label: 'Value-Destroying (<1.5x)', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' };
  }, [math.ltvToCac]);

  return (
    <Card className="border-primary/20 shadow-sm bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                Real-Time Unit Economics & Sensitivity Simulator
                <Badge variant="outline" className="text-xs font-mono font-medium border-primary/30">
                  Interactive Monte Carlo
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs">
                Stress-test margin sensitivity in real time. Adjust sliders to see immediate impact on CM2, LTV:CAC, and break-even order volume.
              </CardDescription>
            </div>
          </div>
          <Badge className={`px-2.5 py-1 text-xs font-semibold border ${ltvRating.color}`}>
            {ltvRating.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-2">
        {/* Scenario Presets Bar */}
        <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-muted/60 border text-xs">
          <span className="font-semibold text-muted-foreground flex items-center gap-1.5 mr-1">
            <Zap className="h-3.5 w-3.5 text-primary" />
            Scenario Presets:
          </span>
          <button
            type="button"
            onClick={() => {
              setAov(1800);
              setTakeRate(22);
              setDeliveryCost(40);
              setCac(280);
              setMonthlyChurn(4);
            }}
            className="px-2.5 py-1 rounded bg-background hover:bg-primary/10 hover:text-primary border transition-colors font-medium text-[11px]"
          >
            🌱 Seed Bootstrap
          </button>
          <button
            type="button"
            onClick={() => {
              setAov(1400);
              setTakeRate(16);
              setDeliveryCost(55);
              setCac(450);
              setMonthlyChurn(6);
            }}
            className="px-2.5 py-1 rounded bg-background hover:bg-primary/10 hover:text-primary border transition-colors font-medium text-[11px]"
          >
            🚀 Venture Scale
          </button>
          <button
            type="button"
            onClick={() => {
              setAov(800);
              setTakeRate(10);
              setDeliveryCost(75);
              setCac(850);
              setMonthlyChurn(14);
            }}
            className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border border-rose-500/20 transition-colors font-medium text-[11px]"
          >
            ⚡ Downturn Stress-Test
          </button>
          <button
            type="button"
            onClick={() => {
              setAov(4500);
              setTakeRate(12);
              setDeliveryCost(120);
              setCac(1200);
              setMonthlyChurn(2);
            }}
            className="px-2.5 py-1 rounded bg-background hover:bg-primary/10 hover:text-primary border transition-colors font-medium text-[11px]"
          >
            🏢 High-Ticket B2B
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 rounded-xl bg-muted/40 border">
          {/* Slider 1: AOV */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-muted-foreground">Average Order Value (AOV)</span>
              <span className="font-bold text-foreground">₹{aov.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={200}
              max={5000}
              step={50}
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-muted-foreground/20 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>₹200 (Micro)</span>
              <span>₹2,500</span>
              <span>₹5,000 (Bulk)</span>
            </div>
          </div>

          {/* Slider 2: Take Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-muted-foreground">Take-Rate / Gross Margin</span>
              <span className="font-bold text-foreground">{takeRate}%</span>
            </div>
            <input
              type="range"
              min={3}
              max={35}
              step={0.5}
              value={takeRate}
              onChange={(e) => setTakeRate(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-muted-foreground/20 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>3% (Volume B2B)</span>
              <span>18% (Zomato)</span>
              <span>35% (SaaS/Luxury)</span>
            </div>
          </div>

          {/* Slider 3: Delivery / Cold Chain Cost */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-muted-foreground">Delivery / Cold Fulfillment Cost</span>
              <span className="font-bold text-foreground">₹{deliveryCost}</span>
            </div>
            <input
              type="range"
              min={15}
              max={250}
              step={5}
              value={deliveryCost}
              onChange={(e) => setDeliveryCost(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-muted-foreground/20 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>₹15 (Batched)</span>
              <span>₹65 (Standard)</span>
              <span>₹250 (Refrigerated)</span>
            </div>
          </div>

          {/* Slider 4: Blended CAC */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-muted-foreground">Blended Customer Acquisition Cost</span>
              <span className="font-bold text-foreground">₹{cac}</span>
            </div>
            <input
              type="range"
              min={50}
              max={2000}
              step={25}
              value={cac}
              onChange={(e) => setCac(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-muted-foreground/20 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>₹50 (Organic/BTL)</span>
              <span>₹450 (Meta Ads)</span>
              <span>₹2,000 (Field Sales)</span>
            </div>
          </div>

          {/* Slider 5: Monthly Churn */}
          <div className="space-y-2 md:col-span-2 lg:col-span-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-muted-foreground">Monthly Customer Churn %</span>
              <span className="font-bold text-foreground">{monthlyChurn}% (~{math.expectedLifespanMonths} mos customer lifespan)</span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              step={1}
              value={monthlyChurn}
              onChange={(e) => setMonthlyChurn(Number(e.target.value))}
              className="w-full accent-primary h-1.5 bg-muted-foreground/20 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>1% (Enterprise Sticky)</span>
              <span>7% (Marketplace Average)</span>
              <span>25% (High Churn / Leaky Bucket)</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Card 1: CM2 per Order */}
          <div className={`p-3.5 rounded-xl border ${math.isProfitableOnOrder ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">CM2 per Order</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className={`text-xl sm:text-2xl font-bold font-mono ${math.isProfitableOnOrder ? 'text-emerald-600' : 'text-rose-600'}`}>
                {math.isProfitableOnOrder ? '+' : ''}₹{math.cm2.toFixed(1)}
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">({math.cm2Percent.toFixed(1)}%)</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              After ₹{deliveryCost} delivery & ₹{math.paymentGatewayFee.toFixed(1)} PG fee
            </p>
          </div>

          {/* Card 2: LTV to CAC Ratio */}
          <div className="p-3.5 rounded-xl border bg-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">LTV : CAC Ratio</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold font-mono text-primary">
                {math.ltvToCac}x
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Est. Customer LTV: ₹{math.customerLTV.toLocaleString()}
            </p>
          </div>

          {/* Card 3: Monthly Break-Even Orders */}
          <div className="p-3.5 rounded-xl border bg-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Break-Even Volume</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold font-mono text-foreground">
                {isFinite(math.breakEvenOrdersMonthly) ? math.breakEvenOrdersMonthly.toLocaleString() : 'N/A'}
              </span>
              <span className="text-[11px] text-muted-foreground">orders/mo</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              ~{math.breakEvenDaily} orders/day against ₹{initialFixedOpEx.toLocaleString()} OpEx
            </p>
          </div>

          {/* Card 4: Payback Period */}
          <div className="p-3.5 rounded-xl border bg-card">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">CAC Payback</p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold font-mono text-foreground">
                {math.cm2 > 0 ? (cac / (math.cm2 * 2)).toFixed(1) : '∞'}
              </span>
              <span className="text-[11px] text-muted-foreground">months</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              Assumes 2 recurring orders/month
            </p>
          </div>
        </div>

        {/* Dynamic Insight Banner */}
        <div className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
          math.cm2 <= 0 
            ? 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200' 
            : math.ltvToCac < 3.0 
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
        }`}>
          {math.cm2 <= 0 ? (
            <ShieldAlert className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
          ) : math.ltvToCac < 3.0 ? (
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
          )}
          <div>
            {math.cm2 <= 0 ? (
              <span className="font-medium">
                <strong>Subsidized / Toxic Order Warning:</strong> At ₹{deliveryCost} fulfillment and {takeRate}% take-rate on ₹{aov} AOV, you are losing <strong>₹{Math.abs(math.cm2).toFixed(1)} per order</strong>. Every additional user accelerates your cash burn (the classic Dunzo/TinyOwl failure mode). Increase AOV or bundle orders into batch runs.
              </span>
            ) : math.ltvToCac < 3.0 ? (
              <span className="font-medium">
                <strong>Fragile Unit Economics:</strong> LTV:CAC of {math.ltvToCac}x provides insufficient margin buffer for Meta ad price spikes. Aim for LTV:CAC &gt; 3.0x by reducing churn from {monthlyChurn}% or shifting customer acquisition to organic B2B anchor referrals.
              </span>
            ) : (
              <span className="font-medium">
                <strong>Venture-Grade Unit Economics:</strong> With +₹{math.cm2.toFixed(1)} CM2 and {math.ltvToCac}x LTV:CAC, unit economics are highly accretive. You can safely sustain a CAC of ₹{cac} while reaching operating break-even at ~{math.breakEvenDaily} daily orders.
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
