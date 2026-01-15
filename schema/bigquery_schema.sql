-- BigQuery Schema
-- Definition for Ultimate Fortune Telling App
-- ==========================================
-- 1. Western Astrology (西洋占星術 - 深層)
-- (Existing tables retained: master_zodiac_degrees, master_aspects, master_houses)
CREATE OR REPLACE TABLE `fortune_telling_db.master_zodiac_degrees` (
    sign_name STRING, degree INT64,
    sabian_symbol_ja STRING, sabian_symbol_en STRING, meaning_text STRING,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE OR REPLACE TABLE `fortune_telling_db.master_aspects` (
    aspect_name STRING, angle FLOAT64, orb_tight FLOAT64, orb_wide FLOAT64,
    meaning_positive STRING, meaning_negative STRING,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE OR REPLACE TABLE `fortune_telling_db.master_houses` (
    house_number INT64, core_meaning STRING, keywords ARRAY<STRING>,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. Oriental & Animal Fortune (算命学・四柱推命・どうぶつ占い)
-- ==========================================
-- (Existing tables retained: master_tsuhensei, master_juni_dagyu, master_tenchuseatsu)
CREATE OR REPLACE TABLE `fortune_telling_db.master_tsuhensei` (
    stem_relation_id STRING, name_shichu STRING, name_sanmei STRING,
    keywords ARRAY<STRING>, personality_traits STRING, vocation_suitability STRING,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE OR REPLACE TABLE `fortune_telling_db.master_juni_dagyu` (
    name_shichu STRING, name_sanmei STRING, animal_correspondence STRING,
    energy_score INT64, meaning_text STRING,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE OR REPLACE TABLE `fortune_telling_db.master_tenchuseatsu` (
    group_name STRING, favorable_action STRING, unfavorable_action STRING,
    cycle_years ARRAY<INT64>,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- *** NEW: Animal Fortune Specifics (12 Animals x Colors/Groups = 60 Types) ***
CREATE OR REPLACE TABLE `fortune_telling_db.master_animal_fortune` (
    animal_name STRING, -- e.g. "Cheetah", "Black Panther"
    color_group STRING, -- "Yellow", "Gold", "Green", "Silver"
    id_60 INT64,        -- 1-60 mapping corresponding to Oriental 60 Stem-Branches
    catchphrase STRING, -- "Chasing dreams at full speed"
    personality_detail STRING,
    famous_people ARRAY<STRING>,
    compatibility_best STRING, -- e.g. "Pegasus"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 3. Nine Star Ki (九星気学)
-- ==========================================
-- (Existing tables retained)
CREATE OR REPLACE TABLE `fortune_telling_db.master_kyusei_keisha` (
    honmei_star INT64, getsumei_star INT64, keisha_palace STRING,
    dokai_palace STRING, meaning_text STRING,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 4. Indian & Shukuyo (宿曜占星術)
-- ==========================================
-- *** UPDATED: Nakshatras aligned with Shukuyo (27 Inns) ***
CREATE OR REPLACE TABLE `fortune_telling_db.master_shukuyo_inns` (
    id INT64, -- 1-27
    name_shukuyo STRING, -- 昴宿, 畢宿...
    name_sanskrit STRING, -- Krittika, Rohini...
    group_type STRING, -- 安住宿, 和善宿, 悪害宿...
    character_trait STRING,
    compatibility_group STRING, -- Logic for 'Eishin', 'Ankai' relations
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 5. Zi Wei Dou Shu (紫微斗数)
-- ==========================================
-- *** NEW: Purple Star Astrology ***
CREATE OR REPLACE TABLE `fortune_telling_db.master_ziwei_stars` (
    star_name STRING, -- 紫微, 天機, 太陽, 武曲, 天同, 廉貞...
    brightness_level STRING, -- 廟, 旺, 得, 利, 平, 陷
    category STRING, -- Main (14), Auxiliary (good/bad)
    meaning_text STRING,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE OR REPLACE TABLE `fortune_telling_db.master_ziwei_palaces` (
    palace_name STRING, -- 命宮, 兄弟宮, 夫妻宮...
    meaning_text STRING,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 6. Interpretations (Unified)
-- ==========================================
CREATE OR REPLACE TABLE `fortune_telling_db.interpretations` (
    id STRING,
    fortune_system STRING, -- Now includes 'ANIMAL', 'SHUKUYO', 'ZIWEI'
    
    -- Targeting Keys
    primary_key STRING, -- e.g. 'Animal_Cheetah', 'Shuku_Subaru'
    secondary_key STRING, -- e.g. 'Gold' (Animal Color), 'Eishin_Distance_Short'
    
    context STRING, 
    content_text STRING,
    reliability_score FLOAT64,
    source_ref STRING,
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
