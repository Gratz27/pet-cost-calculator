import { writeFileSync } from 'fs';

const DOG_BREEDS = [
  ["affenpinscher","Affenpinscher"],["afghan-hound","Afghan Hound"],["airedale-terrier","Airedale Terrier"],
  ["akita","Akita (dog)"],["alaskan-malamute","Alaskan Malamute"],["american-eskimo-dog","American Eskimo Dog"],
  ["american-staffordshire-terrier","American Staffordshire Terrier"],["australian-cattle-dog","Australian Cattle Dog"],
  ["australian-shepherd","Australian Shepherd"],["australian-terrier","Australian Terrier"],["basenji","Basenji"],
  ["basset-hound","Basset Hound"],["beagle","Beagle"],["bearded-collie","Bearded Collie"],["belgian-malinois","Belgian Malinois"],
  ["bernese-mountain-dog","Bernese Mountain Dog"],["bichon-frise","Bichon Frisé"],["bloodhound","Bloodhound"],
  ["border-collie","Border Collie"],["border-terrier","Border Terrier"],["boston-terrier","Boston Terrier"],
  ["boxer","Boxer (dog)"],["briard","Briard"],["brittany","Brittany (dog)"],["bull-terrier","Bull Terrier"],
  ["bulldog","Bulldog"],["bullmastiff","Bullmastiff"],["cairn-terrier","Cairn Terrier"],["cane-corso","Cane Corso"],
  ["cardigan-welsh-corgi","Cardigan Welsh Corgi"],["cavalier-king-charles-spaniel","Cavalier King Charles Spaniel"],
  ["chesapeake-bay-retriever","Chesapeake Bay Retriever"],["chihuahua","Chihuahua (dog)"],["chow-chow","Chow Chow"],
  ["cocker-spaniel","Cocker Spaniel"],["collie","Rough Collie"],["dachshund","Dachshund"],["dalmatian","Dalmatian (dog)"],
  ["doberman-pinscher","Dobermann"],["english-cocker-spaniel","English Cocker Spaniel"],["english-setter","English Setter"],
  ["english-springer-spaniel","English Springer Spaniel"],["french-bulldog","French Bulldog"],["german-shepherd","German Shepherd"],
  ["german-shorthaired-pointer","German Shorthaired Pointer"],["giant-schnauzer","Giant Schnauzer"],["golden-retriever","Golden Retriever"],
  ["gordon-setter","Gordon Setter"],["great-dane","Great Dane"],["great-pyrenees","Great Pyrenees"],["greyhound","Greyhound"],
  ["havanese","Havanese dog"],["irish-setter","Irish Setter"],["irish-terrier","Irish Terrier"],["irish-wolfhound","Irish Wolfhound"],
  ["italian-greyhound","Italian Greyhound"],["jack-russell-terrier","Jack Russell Terrier"],["keeshond","Keeshond"],
  ["kerry-blue-terrier","Kerry Blue Terrier"],["komondor","Komondor"],["labrador-retriever","Labrador Retriever"],
  ["lhasa-apso","Lhasa Apso"],["maltese","Maltese dog"],["mastiff","English Mastiff"],["miniature-pinscher","Miniature Pinscher"],
  ["miniature-schnauzer","Miniature Schnauzer"],["newfoundland","Newfoundland dog"],["norwegian-elkhound","Norwegian Elkhound"],
  ["old-english-sheepdog","Old English Sheepdog"],["papillon","Papillon dog"],["pekingese","Pekingese"],
  ["pembroke-welsh-corgi","Pembroke Welsh Corgi"],["pomeranian","Pomeranian (dog)"],["poodle","Poodle"],
  ["portuguese-water-dog","Portuguese Water Dog"],["pug","Pug"],["rhodesian-ridgeback","Rhodesian Ridgeback"],
  ["rottweiler","Rottweiler"],["saint-bernard","Saint Bernard (dog)"],["saluki","Saluki"],["samoyed","Samoyed dog"],
  ["schipperke","Schipperke"],["scottish-terrier","Scottish Terrier"],["shetland-sheepdog","Shetland Sheepdog"],
  ["shiba-inu","Shiba Inu"],["shih-tzu","Shih Tzu"],["siberian-husky","Siberian Husky"],
  ["soft-coated-wheaten-terrier","Soft-coated Wheaten Terrier"],["staffordshire-bull-terrier","Staffordshire Bull Terrier"],
  ["tibetan-mastiff","Tibetan Mastiff"],["vizsla","Vizsla"],["weimaraner","Weimaraner"],
  ["west-highland-white-terrier","West Highland White Terrier"],["whippet","Whippet"],
  ["wire-fox-terrier","Wire Fox Terrier"],["yorkshire-terrier","Yorkshire Terrier"],
];

const CAT_BREEDS = [
  ["abyssinian","Abyssinian cat"],["american-bobtail","American Bobtail"],["american-curl","American Curl"],
  ["american-shorthair","American Shorthair"],["balinese","Balinese cat"],["bengal","Bengal cat"],
  ["birman","Birman"],["bombay","Bombay cat"],["british-shorthair","British Shorthair"],["burmese","Burmese cat"],
  ["chartreux","Chartreux"],["cornish-rex","Cornish Rex"],["devon-rex","Devon Rex"],["egyptian-mau","Egyptian Mau"],
  ["exotic-shorthair","Exotic Shorthair"],["himalayan","Himalayan cat"],["japanese-bobtail","Japanese Bobtail"],
  ["maine-coon","Maine Coon"],["manx","Manx cat"],["munchkin","Munchkin cat"],["norwegian-forest-cat","Norwegian Forest cat"],
  ["ocicat","Ocicat"],["persian","Persian cat"],["ragdoll","Ragdoll"],["russian-blue","Russian Blue"],
  ["savannah","Savannah cat"],["scottish-fold","Scottish Fold"],["siamese","Siamese cat"],["siberian","Siberian cat"],
  ["singapura","Singapura cat"],["somali","Somali cat"],["sphynx","Sphynx cat"],["tonkinese","Tonkinese cat"],
  ["turkish-angora","Turkish Angora"],["turkish-van","Turkish Van"],
];

async function fetchWikiImage(title) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(url, { headers: { 'User-Agent': 'PetCostCalculator/1.0 (research)' } });
    if (!res.ok) return null;
    const data = await res.json();
    const src = data.originalimage?.source || data.thumbnail?.source;
    if (!src) return null;
    // Normalise to 600px wide Wikimedia thumb
    return src.replace(/\/\d+px-/, '/600px-');
  } catch { return null; }
}

const dogs = {};
const cats = {};

console.log('Dogs:');
for (const [id, title] of DOG_BREEDS) {
  const url = await fetchWikiImage(title);
  dogs[id] = url;
  console.log(`  ${id}: ${url ? '✓' : '✗ MISSING'}`);
  await new Promise(r => setTimeout(r, 200));
}

console.log('\nCats:');
for (const [id, title] of CAT_BREEDS) {
  const url = await fetchWikiImage(title);
  cats[id] = url;
  console.log(`  ${id}: ${url ? '✓' : '✗ MISSING'}`);
  await new Promise(r => setTimeout(r, 200));
}

writeFileSync('/sessions/funny-adoring-bardeen/mnt/outputs/breed-images.json', JSON.stringify({ dogs, cats }, null, 2));
console.log('\nDone → breed-images.json');
