import { z } from "zod";

export type TimeUnit = "ms" | "mn" | "min" | "s" | "h" | "d" | "days" | "wk";

export const MacroTimeSchema = z.custom<`${string}${TimeUnit}`>(
  (value: any) => {
    if (isNaN(parseInt(value))) return false;
    return true;
  }
);

export type MacroTime = z.infer<typeof MacroTimeSchema>;

class TimeBaseConvertor {
  a_second_ms = 1000;
  a_minute_ms = 60 * this.a_second_ms;
  a_hour_ms = 60 * this.a_minute_ms;
  a_day_ms = 24 * this.a_hour_ms;
  a_week_ms = 7 * this.a_day_ms;

  unitBaseMiliSecondsMapping: { [K in TimeUnit]: number } = {
    ms: 1,
    s: this.a_second_ms,
    mn: this.a_minute_ms,
    min: this.a_minute_ms,
    h: this.a_hour_ms,
    d: this.a_day_ms,
    wk: this.a_week_ms,
    days: this.a_day_ms,
  };

  getMacroTimeAsMilliSeconds(macroTime: MacroTime) {
    const digits = parseInt(macroTime);
    const unit = macroTime.slice(`${digits}`.length) as TimeUnit;
    return digits * this.unitBaseMiliSecondsMapping[unit];
  }

  getMilliSecondsAsMacroTime(miliSeconds: MacroTime) {
    const digits = parseInt(miliSeconds);
    const unit = miliSeconds.slice(`${digits}`.length) as TimeUnit;
    return digits / this.unitBaseMiliSecondsMapping[unit];
  }
}

export function getMacroTimeAsMilliSeconds(
  ...macroTimeSeries: MacroTime[]
): number {
  const convertor = new TimeBaseConvertor();
  return macroTimeSeries.reduce((total, time) => {
    return total + convertor.getMacroTimeAsMilliSeconds(time);
  }, 0);
}

export function getMilliSecondsAsMacroTimes(
  ...miliSecondsSeries: MacroTime[]
): number {
  const convertor = new TimeBaseConvertor();
  return miliSecondsSeries.reduce((total, time) => {
    return Math.floor(total + convertor.getMilliSecondsAsMacroTime(time));
  }, 0);
}

const DateOfBirthSchema = z.string().datetime();
type DateOfBirth = z.TypeOf<typeof DateOfBirthSchema>;

export function getAgeFromDateOfBirth(dateOfBirth: string) {
  const dob = DateOfBirthSchema.parse(dateOfBirth);
  const presentYear = new Date().getFullYear();
  const dobYear = new Date(dob).getFullYear();
  return presentYear - dobYear;
}
