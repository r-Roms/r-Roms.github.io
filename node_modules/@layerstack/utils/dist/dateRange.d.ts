import { PeriodType } from './date_types.js';
import type { LocaleSettings } from './locale.js';
export type DateRange = {
    from: Date | null;
    to: Date | null;
    periodType?: PeriodType | null;
};
export declare function getDateRangePresets(settings: LocaleSettings, periodType: PeriodType): {
    label: string;
    value: DateRange;
}[];
export declare function getPreviousYearPeriodOffset(periodType: PeriodType, options?: {
    referenceDate?: Date;
    alignDayOfWeek?: boolean;
}): -1 | -4 | -364 | -366 | -365 | -52 | -26 | -12 | undefined;
export type PeriodComparison = 'prevPeriod' | 'prevYear' | 'fiftyTwoWeeksAgo';
export declare function getPeriodComparisonOffset(settings: LocaleSettings, view: PeriodComparison, period: DateRange | undefined): number | undefined;
//# sourceMappingURL=dateRange.d.ts.map