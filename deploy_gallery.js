const fs = require('fs');
const src = "C:/Users/Sim's/.gemini/antigravity/brain/d5aa5067-2fcb-48ff-987e-d41735d14a6a/gallery.html";
const dest = 'public/gallery.html';

let content = fs.readFileSync(src, 'utf8');

const mapping = [
  ['main.jpg', '/assets/segye_occult/segye_main.jpg'],
  ['vol1_prologue.jpg', '/assets/segye_occult/01_vol1_prologue.jpg'],
  ['vol1.jpg', '/assets/segye_occult/01_vol1_encounter.jpg'],
  ['vol1_epilogue.jpg', '/assets/segye_occult/01_vol1_epilogue.jpg'],
  ['vol1_extra1_locker_hide.jpg', '/assets/segye_occult/01_vol1_extra1_locker_hide.jpg'],
  ['vol1_extra2_talisman_cut.jpg', '/assets/segye_occult/01_vol1_extra2_talisman_cut.jpg'],
  ['vol2_prologue.jpg', '/assets/segye_occult/02_vol2_prologue.jpg'],
  ['vol2.jpg', '/assets/segye_occult/02_vol2_patrol_rooftop.jpg'],
  ['vol2_epilogue.jpg', '/assets/segye_occult/02_vol2_epilogue.jpg'],
  ['vol2_extra1_ramen_blow.jpg', '/assets/segye_occult/02_vol2_extra1_ramen_blow.jpg'],
  ['vol2_extra2_windy_cardigan.jpg', '/assets/segye_occult/02_vol2_extra2_windy_cardigan.jpg'],
  ['vol3_prologue.jpg', '/assets/segye_occult/03_vol3_prologue.jpg'],
  ['vol3.jpg', '/assets/segye_occult/03_vol3_rain_hideout.jpg'],
  ['vol3_epilogue.jpg', '/assets/segye_occult/03_vol3_epilogue.jpg'],
  ['vol3_extra1_wet_hair_dry.jpg', '/assets/segye_occult/03_vol3_extra1_wet_hair_dry.jpg'],
  ['vol3_extra2_thunder_hug.jpg', '/assets/segye_occult/03_vol3_extra2_thunder_hug.jpg'],
  ['vol4_prologue.jpg', '/assets/segye_occult/04_vol4_prologue.jpg'],
  ['vol4.jpg', '/assets/segye_occult/04_vol4_tengen_jealousy.jpg'],
  ['vol4_epilogue.jpg', '/assets/segye_occult/04_vol4_epilogue.jpg'],
  ['vol4_extra1_tengen_tease.jpg', '/assets/segye_occult/04_vol4_extra1_tengen_tease.jpg'],
  ['vol4_extra2_ramen_date.jpg', '/assets/segye_occult/04_vol4_extra2_ramen_date.jpg']
];

mapping.forEach(([brainPath, webPath]) => {
  content = content.replaceAll(brainPath, webPath);
});

fs.writeFileSync(dest, content, 'utf8');
console.log('Successfully written public/gallery.html with web-accessible asset paths!');
