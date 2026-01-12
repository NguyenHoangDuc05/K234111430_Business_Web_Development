export const TZ_VN = 7;

function INT(d: number) {
  return Math.floor(d);
}

export function jdFromDate(dd: number, mm: number, yy: number) {
  const a = INT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;

  let jd =
    dd +
    INT((153 * m + 2) / 5) +
    365 * y +
    INT(y / 4) -
    INT(y / 100) +
    INT(y / 400) -
    32045;
  if (jd < 2299161) {
    jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
  }
  return jd;
}

export function jdToDate(jd: number) {
  let a, b, c;
  if (jd > 2299160) {
    a = jd + 32044;
    b = INT((4 * a + 3) / 146097);
    c = a - INT((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = INT((4 * c + 3) / 1461);
  const e = c - INT((1461 * d) / 4);
  const m = INT((5 * e + 2) / 153);
  const day = e - INT((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * INT(m / 10);
  const year = b * 100 + d - 4800 + INT(m / 10);
  return { day, month, year };
}
function NewMoon(k: number) {
  // Meeus - New Moon time
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;

  let Jd1 =
    2415020.75933 +
    29.53058868 * k +
    0.0001178 * T2 -
    0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

  const M =
    359.2242 +
    29.10535608 * k -
    0.0000333 * T2 -
    0.00000347 * T3;

  const Mpr =
    306.0253 +
    385.81691806 * k +
    0.0107306 * T2 +
    0.00001236 * T3;

  const F =
    21.2964 +
    390.67050646 * k -
    0.0016528 * T2 -
    0.00000239 * T3;

  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) +
    0.0021 * Math.sin(2 * dr * M);
  C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
  C1 -= 0.0004 * Math.sin(3 * dr * Mpr);
  C1 += 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
  C1 -=
    0.0074 * Math.sin((M - Mpr) * dr) +
    0.0004 * Math.sin((2 * F + M) * dr);
  C1 -=
    0.0004 * Math.sin((2 * F - M) * dr) -
    0.0006 * Math.sin((2 * F + Mpr) * dr);
  C1 +=
    0.0010 * Math.sin((2 * F - Mpr) * dr) +
    0.0005 * Math.sin((2 * Mpr + M) * dr);

  let deltat: number;
  if (T < -11) {
    deltat =
      0.001 +
      0.000839 * T +
      0.0002261 * T2 -
      0.00000845 * T3 -
      0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }

  return Jd1 + C1 - deltat;
}

function getNewMoonDay(k: number, timeZone: number) {
  return INT(NewMoon(k) + 0.5 + timeZone / 24);
}

function SunLongitude(jdn: number) {
  // True solar longitude
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;

  const M =
    357.52910 +
    35999.05030 * T -
    0.0001559 * T2 -
    0.00000048 * T * T2;

  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;

  const DL =
    (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M) +
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.000290 * Math.sin(dr * 3 * M);

  let L = (L0 + DL) * dr;
  L = L - Math.PI * 2 * INT(L / (Math.PI * 2));
  return L;
}

function getSunLongitude(dayNumber: number, timeZone: number) {
  return INT((SunLongitude(dayNumber - 0.5 - timeZone / 24) / Math.PI) * 6);
}

function getLunarMonth11(yy: number, timeZone: number) {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = INT(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) nm = getNewMoonDay(k - 1, timeZone);
  return nm;
}

function getLeapMonthOffset(a11: number, timeZone: number) {
  const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);

  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);

  return i - 1;
}

export function convertSolar2Lunar(
  dd: number,
  mm: number,
  yy: number,
  timeZone = TZ_VN
) {
  dd = Number(dd);
  mm = Number(mm);
  yy = Number(yy);

  const dayNumber = jdFromDate(dd, mm, yy);

  const k = INT((dayNumber - 2415021.076998695) / 29.530588853);

  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);

  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear: number;

  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }

  const lunarDay = INT(dayNumber - monthStart + 1);

  let diff = INT((monthStart - a11) / 29);
  let lunarLeap = 0;
  let lunarMonth = diff + 11;

  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) lunarLeap = 1;
    }
  }

  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

  return {
    lunarDay: INT(lunarDay),
    lunarMonth: INT(lunarMonth),
    lunarYear: INT(lunarYear),
    lunarLeap: INT(lunarLeap),
  };
}

const CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
const CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

export function canChiYear(year: number) {
  year = INT(Number(year));
  return `${CAN[(year + 6) % 10]} ${CHI[(year + 8) % 12]}`;
}

export function canChiDay(jd: number) {
  jd = INT(Number(jd));
  return `${CAN[(jd + 9) % 10]} ${CHI[(jd + 1) % 12]}`;
}

export function canChiMonth(lunarMonth: number, lunarYear: number) {
  lunarMonth = INT(Number(lunarMonth));
  lunarYear = INT(Number(lunarYear));
  const canIndex = (lunarYear * 12 + lunarMonth + 3) % 10;
  const chiIndex = (lunarMonth + 1) % 12;

  return `${CAN[canIndex]} ${CHI[chiIndex]}`;
}

export function weekdayVN(dd: number, mm: number, yy: number) {
  const d = new Date(INT(yy), INT(mm) - 1, INT(dd));
  const w = d.getDay(); 
  const map = ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'];
  return map[w];
}
