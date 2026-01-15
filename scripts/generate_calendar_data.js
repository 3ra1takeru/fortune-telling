const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Astronomy = require('astronomy-engine');
const dayjs = require('dayjs');

// Config
const START_YEAR = 1950;
const END_YEAR = 2030;
const OUTPUT_FILE = './master_calendar.csv';

// Helpers
function getZodiacSign(longitude) {
    const signs = [
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];
    return signs[Math.floor(longitude / 30) % 12];
}

// Sexagenary Cycle (Jikkan Junishi)
// Simple approximation for Days (Day count modulo 60)
// Reference: 2024-01-01 was Kinoe-Ne (0) - This is an assumption for mock data validity
const REF_GANSHI_DATE = dayjs('2024-01-01');
function getGanshiDay(date) {
    const d = dayjs(date);
    const diff = d.diff(REF_GANSHI_DATE, 'day');
    let id = diff % 60;
    if (id < 0) id += 60;
    return Math.floor(id);
}

function getNineStar(year, month, day) {
    // Simple Year Calculation for Nine Star
    // 2024 = 3 (Sanpeki). Logic: sum digits...
    // Algorithm: (11 - (year - 1900 + 1 + 9) % 9) % 9 ... wait simpler:
    // Remainder of (Year digits sum) stuff.
    // Let's use a lookup or simple mod.
    // 2024 -> 3. 2023 -> 4. 2025 -> 2.
    // Series: ... 1, 9, 8, 7, 6, 5, 4, 3, 2, ...
    // (12 - (year % 9)) % 9. If 0 -> 9.
    // ex: 2024 % 9 = 8. 12-8=4? No.
    // 2024 sum = 8. 11-8 = 3. Yes.
    let sum = 0;
    let yStr = year.toString();
    for (let i = 0; i < yStr.length; i++) sum += parseInt(yStr[i]);
    while (sum > 9) {
        let s2 = 0;
        let s2Str = sum.toString();
        for (let j = 0; j < s2Str.length; j++) s2 += parseInt(s2Str[j]);
        sum = s2;
    }
    const stars = ["9Purple", "1White", "2Black", "3Blue", "4Green", "5Yellow", "6White", "7Red", "8White"];
    let starNum = 11 - sum;
    if (starNum > 9) starNum -= 9;
    if (starNum <= 0) starNum += 9; // Should be handled
    // 2024: 2+0+2+4=8. 11-8=3 (3Blue). Correct.
    return starNum; // INT 1-9
}

async function generate() {
    const csvWriter = createCsvWriter({
        path: OUTPUT_FILE,
        header: [
            { id: 'date_key', title: 'date_key' },
            { id: 'year', title: 'year' },
            { id: 'month', title: 'month' },
            { id: 'day', title: 'day' },
            { id: 'western_sun_sign', title: 'western_sun_sign' },
            { id: 'western_moon_sign', title: 'western_moon_sign' },
            { id: 'ganshi_day_id', title: 'ganshi_day_id' },
            { id: 'nine_star_year', title: 'nine_star_year' },
            { id: 'moon_phase', title: 'moon_phase' }
        ]
    });

    const records = [];
    let currentDate = dayjs(`${START_YEAR}-01-01`);
    const endDate = dayjs(`${END_YEAR}-12-31`);

    console.log(`Generating calendar data from ${START_YEAR} to ${END_YEAR}...`);

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
        const jsDate = currentDate.toDate();
        const astroTime = Astronomy.MakeTime(jsDate);

        // Astronomy Calc
        const sunPos = Astronomy.SunPosition(astroTime);
        const moonPos = Astronomy.EclipticGeoMoon(astroTime);
        const moonPhase = Astronomy.MoonPhase(astroTime); // 0-360

        // Zodiac
        const sunSign = getZodiacSign(sunPos.EclipticLongitude);
        const moonSign = getZodiacSign(moonPos.EclipticLongitude);

        // Oriental
        const ganshiDay = getGanshiDay(jsDate);
        const nineStar = getNineStar(currentDate.year());

        records.push({
            date_key: currentDate.format('YYYY-MM-DD'),
            year: currentDate.year(),
            month: currentDate.month() + 1,
            day: currentDate.date(),
            western_sun_sign: sunSign,
            western_moon_sign: moonSign,
            ganshi_day_id: ganshiDay,
            nine_star_year: nineStar,
            moon_phase: moonPhase.toFixed(2)
        });

        currentDate = currentDate.add(1, 'day');
    }

    await csvWriter.writeRecords(records);
    console.log('Done! CSV generated.');
}

generate();
