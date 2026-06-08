"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Dog CEO API paths — format: "breed" (no sub) or "breed/sub" (with sub)
// Verified against https://dog.ceo/api/breeds/list/all
const DOG_PATH: Record<string, string> = {
  // A
  "affenpinscher":                    "affenpinscher",
  "afghan-hound":                     "hound/afghan",
  "airedale-terrier":                 "airedale",
  "akita":                            "akita",
  "alaskan-malamute":                 "malamute",
  "anatolian-shepherd-dog":           "german/shepherd",
  "australian-cattle-dog":            "cattledog/australian",
  "australian-shepherd":              "australian/shepherd",
  "australian-silky-terrier":         "terrier/silky",
  "australian-terrier":               "terrier/australian",
  "azawakh":                          "saluki",
  // B
  "barbet":                           "frise/bichon",
  "basenji":                          "basenji",
  "basset-bleu-de-gascogne":          "hound/basset",
  "basset-fauve-de-bretagne":         "hound/basset",
  "basset-griffon-vendeen-grand":     "hound/basset",
  "basset-griffon-vendeen-petit":     "hound/basset",
  "basset-hound":                     "hound/basset",
  "bavarian-mountain-hound":          "hound/blood",
  "beagle":                           "beagle",
  "bearded-collie":                   "rough/collie",
  "beauceron":                        "german/shepherd",
  "bedlington-terrier":               "terrier/bedlington",
  "belgian-shepherd-dog-groenendael": "groenendael",
  "belgian-shepherd-dog-laekenois":   "malinois",
  "belgian-shepherd-dog-malinois":    "malinois",
  "belgian-shepherd-dog-tervueren":   "tervuren",
  "bergamasco-shepherd-dog":          "komondor",
  "bernese-mountain-dog":             "mountain/bernese",
  "bichon-frise":                     "frise/bichon",
  "bloodhound":                       "hound/blood",
  "bolognese":                        "maltese",
  "border-collie":                    "collie/border",
  "border-terrier":                   "terrier/border",
  "borzoi":                           "borzoi",
  "boston-terrier":                   "terrier/boston",
  "bouvier-des-flandres":             "bouvier",
  "boxer":                            "boxer",
  "bracco-italiano":                  "pointer/germanlonghair",
  "briard":                           "briard",
  "british-bulldog":                  "bulldog/english",
  "brittany":                         "spaniel/brittany",
  "bull-terrier":                     "bullterrier/staffordshire",
  "bull-terrier-miniature":           "bullterrier/staffordshire",
  "bulldog":                          "bulldog/english",
  "bullmastiff":                      "mastiff/bull",
  // C
  "cairn-terrier":                    "terrier/cairn",
  "canaan-dog":                       "basenji",
  "cane-corso":                       "mastiff/bull",
  "cardigan-welsh-corgi":             "corgi/cardigan",
  "cavalier-king-charles-spaniel":    "spaniel/cocker",
  "central-asian-shepherd-dog":       "mastiff/bull",
  "cesky-terrier":                    "terrier/scottish",
  "chesapeake-bay-retriever":         "retriever/chesapeake",
  "chihuahua-long-coat":              "chihuahua",
  "chihuahua-smooth-coat":            "chihuahua",
  "chinese-crested":                  "chihuahua",
  "chow-chow":                        "chow",
  "clumber-spaniel":                  "clumber",
  "cocker-spaniel":                   "spaniel/cocker",
  "collie-rough":                     "rough/collie",
  "collie-smooth":                    "rough/collie",
  "coton-de-tulear":                  "cotondetulear",
  "curly-coated-retriever":           "retriever/curly",
  // D
  "dachshund-long-haired":            "dachshund",
  "dachshund-miniature-long-haired":  "dachshund",
  "dachshund-miniature-smooth-haired":"dachshund",
  "dachshund-miniature-wire-haired":  "dachshund",
  "dachshund-smooth-haired":          "dachshund",
  "dachshund-wire-haired":            "dachshund",
  "dalmatian":                        "dalmatian",
  "dandie-dinmont-terrier":           "terrier/dandie",
  "deerhound":                        "deerhound/scottish",
  "dobermann":                        "doberman",
  "dogue-de-bordeaux":                "mastiff/bull",
  "dutch-shepherd-dog":               "malinois",
  // E
  "english-bulldog":                  "bulldog/english",
  "english-setter":                   "setter/english",
  "english-springer-spaniel":         "springer/english",
  "english-toy-terrier-black-tan":    "terrier/toy",
  "entlebucher-mountain-dog":         "entlebucher",
  "estrela-mountain-dog":             "mountain/bernese",
  "eurasier":                         "keeshond",
  // F
  "field-spaniel":                    "spaniel/irish",
  "finnish-lapphund":                 "finnish/lapphund",
  "finnish-spitz":                    "keeshond",
  "flat-coated-retriever":            "retriever/flatcoated",
  "fox-terrier-smooth":               "terrier/fox",
  "fox-terrier-wire":                 "terrier/fox",
  "french-bulldog":                   "bulldog/french",
  // G
  "german-pinscher":                  "pinscher/miniature",
  "german-shepherd-dog":              "german/shepherd",
  "german-shorthaired-pointer":       "pointer/germanlonghair",
  "german-spitz-klein":               "pomeranian",
  "german-spitz-mittel":              "pomeranian",
  "german-wirehaired-pointer":        "pointer/germanlonghair",
  "giant-schnauzer":                  "schnauzer/giant",
  "glen-of-imaal-terrier":            "terrier/cairn",
  "golden-retriever":                 "retriever/golden",
  "gordon-setter":                    "setter/gordon",
  "grand-basset-griffon-vendeen":     "hound/basset",
  "great-dane":                       "dane/great",
  "greyhound":                        "greyhound/italian",
  "griffon-bruxellois":               "terrier/norfolk",
  // H
  "hamiltonstovare":                  "hound/basset",
  "havanese":                         "havanese",
  "hovawart":                         "retriever/golden",
  "hungarian-kuvasz":                 "kuvasz",
  "hungarian-puli":                   "puli",
  "hungarian-pumi":                   "poodle/miniature",
  "hungarian-vizsla":                 "vizsla",
  "hungarian-wire-haired-vizsla":     "vizsla",
  "husky":                            "husky",
  // I
  "ibizan-hound":                     "hound/ibizan",
  "icelandic-sheepdog":               "sheepdog/shetland",
  "irish-red-and-white-setter":       "setter/irish",
  "irish-setter":                     "setter/irish",
  "irish-terrier":                    "terrier/irish",
  "irish-water-spaniel":              "spaniel/irish",
  "irish-wolfhound":                  "wolfhound/irish",
  "italian-greyhound":                "greyhound/italian",
  "italian-spinone":                  "pointer/germanlonghair",
  // J
  "jack-russell-terrier":             "terrier/russell",
  "japanese-akita":                   "akita",
  "japanese-chin":                    "pekinese",
  "japanese-shiba-inu":               "shiba",
  "japanese-spitz":                   "spitz/japanese",
  // K
  "keeshond":                         "keeshond",
  "kerry-blue-terrier":               "terrier/kerryblue",
  "king-charles-spaniel":             "spaniel/cocker",
  "komondor":                         "komondor",
  "kooikerhondje":                    "spaniel/cocker",
  "korean-jindo":                     "shiba",
  // L
  "labrador-retriever":               "labrador",
  "lagotto-romagnolo":                "spaniel/cocker",
  "lakeland-terrier":                 "terrier/lakeland",
  "lancashire-heeler":                "terrier/yorkshire",
  "leonberger":                       "leonberg",
  "lhasa-apso":                       "lhasa",
  "lowchen":                          "maltese",
  // M
  "maltese":                          "maltese",
  "manchester-terrier":               "terrier/yorkshire",
  "maremma-sheepdog":                 "samoyed",
  "mastiff":                          "mastiff/bull",
  "miniature-pinscher":               "pinscher/miniature",
  "miniature-schnauzer":              "schnauzer/miniature",
  "mixed-breed-dog":                  "labrador",
  // N
  "neapolitan-mastiff":               "mastiff/bull",
  "newfoundland":                     "newfoundland",
  "norfolk-terrier":                  "terrier/norfolk",
  "norwegian-buhund":                 "buhund/norwegian",
  "norwegian-elkhound":               "elkhound/norwegian",
  "norwegian-lundehund":              "elkhound/norwegian",
  "norwich-terrier":                  "terrier/norwich",
  "nova-scotia-duck-tolling-retriever":"retriever/flatcoated",
  // O
  "old-english-sheepdog":             "sheepdog/english",
  "other-breed-not-listed":           "labrador",
  "otterhound":                       "otterhound",
  // P
  "papillon":                         "papillon",
  "parson-russell-terrier":           "terrier/russell",
  "pekingese":                        "pekinese",
  "pembroke-welsh-corgi":             "pembroke",
  "perro-de-presa-canario":           "mastiff/bull",
  "pharaoh-hound":                    "hound/ibizan",
  "pitbull":                          "pitbull",
  "pointer":                          "pointer/german",
  "polish-lowland-sheepdog":          "sheepdog/english",
  "pomeranian":                       "pomeranian",
  "poodle-miniature":                 "poodle/miniature",
  "poodle-standard":                  "poodle/standard",
  "poodle-toy":                       "poodle/toy",
  "portuguese-podengo":               "hound/ibizan",
  "portuguese-pointer":               "pointer/german",
  "portuguese-water-dog":             "waterdog/spanish",
  "pug":                              "pug",
  "puli":                             "puli",
  "pyrenean-mastiff":                 "pyrenees",
  "pyrenean-mountain-dog":            "pyrenees",
  "pyrenean-sheepdog-long-haired":    "sheepdog/shetland",
  "pyrenean-sheepdog-smooth-faced":   "sheepdog/shetland",
  // R
  "rhodesian-ridgeback":              "ridgeback/rhodesian",
  "rottweiler":                       "rottweiler",
  "russian-black-terrier":            "schnauzer/giant",
  "russian-toy":                      "chihuahua",
  // S
  "saluki":                           "saluki",
  "samoyed":                          "samoyed",
  "schipperke":                       "schipperke",
  "schnauzer":                        "schnauzer/miniature",
  "scottish-terrier":                 "terrier/scottish",
  "sealyham-terrier":                 "terrier/sealyham",
  "segugio-italiano":                 "segugio/italian",
  "shar-pei":                         "sharpei",
  "shetland-sheepdog":                "sheepdog/shetland",
  "shih-tzu":                         "shihtzu",
  "siberian-husky":                   "husky",
  "skye-terrier":                     "terrier/skye",
  "sloughi":                          "saluki",
  "slovakian-rough-haired-pointer":   "pointer/germanlonghair",
  "soft-coated-wheaten-terrier":      "terrier/wheaten",
  "spanish-water-dog":                "waterdog/spanish",
  "st-bernard":                       "stbernard",
  "staffordshire-bull-terrier":       "bullterrier/staffordshire",
  "staffy":                           "bullterrier/staffordshire",
  "sussex-spaniel":                   "spaniel/sussex",
  "swedish-lapphund":                 "finnish/lapphund",
  "swedish-vallhund":                 "sheepdog/shetland",
  // T
  "tibetan-mastiff":                  "mastiff/tibetan",
  "tibetan-spaniel":                  "pekinese",
  "tibetan-terrier":                  "terrier/tibetan",
  "tosa":                             "mastiff/bull",
  // V/W
  "weimaraner":                       "weimaraner",
  "welsh-springer-spaniel":           "spaniel/welsh",
  "welsh-terrier":                    "terrier/welsh",
  "west-highland-white-terrier":      "terrier/westhighland",
  "whippet":                          "whippet",
  "white-swiss-shepherd-dog":         "german/shepherd",
  // X/Y
  "xoloitzcuintle-mexican-hairless":  "mexicanhairless",
  "yorkie":                           "terrier/yorkshire",
  "yorkshire-terrier":                "terrier/yorkshire",
};

// Cat breed IDs for The Cat API (https://thecatapi.com)
// Verified against https://api.thecatapi.com/v1/breeds
const CAT_API_ID: Record<string, string> = {
  "abyssinian":                "abys",
  "american-bobtail":          "abob",
  "american-bobtail-shorthair":"abob",
  "american-curl":             "acur",
  "american-curl-longhair":    "acur",
  "american-shorthair":        "asho",
  "american-wirehair":         "awir",
  "australian-mist":           "amis",
  "balinese":                  "bali",
  "bengal":                    "beng",
  "bengal-longhair":           "beng",
  "birman":                    "birm",
  "bombay":                    "bomb",
  "british-longhair":          "bslo",
  "british-shorthair":         "bsho",
  "burmese":                   "bure",
  "burmilla":                  "buri",
  "burmilla-longhair":         "buri",
  "chartreux":                 "char",
  "chausie":                   "chau",
  "cherubim":                  "mcoo",
  "cornish-rex":               "crex",
  "cymric":                    "cymr",
  "devon-rex":                 "drex",
  "donskoy":                   "dons",
  "egyptian-mau":              "emau",
  "exotic-shorthair":          "esho",
  "havana":                    "hbro",
  "highlander":                "sfol",
  "highlander-shorthair":      "sfol",
  "himalayan":                 "hima",
  "japanese-bobtail":          "jbob",
  "japanese-bobtail-longhair": "jbob",
  "khaomanee":                 "khao",
  "korat":                     "kora",
  "kurilian-bobtail":          "kuri",
  "kurilian-bobtail-longhair": "kuri",
  "laperm":                    "lape",
  "laperm-shorthair":          "lape",
  "lykoi":                     "sphy",
  "maine-coon":                "mcoo",
  "maine-coon-polydactyl":     "mcoo",
  "manx":                      "manx",
  "minuet":                    "pers",
  "minuet-longhair":           "pers",
  "mixed-breed-cat":           "mcoo",
  "munchkin":                  "munc",
  "munchkin-longhair":         "munc",
  "nebelung":                  "nebe",
  "norwegian-forest":          "norw",
  "ocicat":                    "ocic",
  "oriental-longhair":         "orie",
  "oriental-shorthair":        "orie",
  "other-breed-not-listed":    "mcoo",
  "persian":                   "pers",
  "peterbald":                 "dons",
  "pixiebob":                  "pixi",
  "pixiebob-longhair":         "pixi",
  "ragdoll":                   "ragd",
  "russian-blue":              "rblu",
  "savannah":                  "sava",
  "scottish-fold":             "sfol",
  "scottish-fold-longhair":    "sfol",
  "scottish-straight":         "sfol",
  "scottish-straight-longhair":"sfol",
  "selkirk-rex":               "srex",
  "selkirk-rex-longhair":      "srex",
  "serengeti":                 "beng",
  "siamese":                   "siam",
  "siberian":                  "sibe",
  "singapura":                 "sing",
  "snowshoe":                  "snow",
  "somali":                    "soma",
  "sphynx":                    "sphy",
  "tennessee-rex":             "crex",
  "thai":                      "siam",
  "tonkinese":                 "tonk",
  "toybob":                    "jbob",
  "toyger":                    "toyg",
  "turkish-angora":            "tang",
  "turkish-van":               "tvan",
};

// Fallbacks — known-good static URLs
const FALLBACK_DOG = "https://images.dog.ceo/breeds/labrador/n02099712_4354.jpg";
const FALLBACK_CAT = "https://cdn2.thecatapi.com/images/IFXsxmXLm.jpg";

interface Props {
  breedId: string;
  petType: "dog" | "cat";
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}

export default function BreedImage({ breedId, petType, alt, fill, className, sizes }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (petType === "cat") {
      // Fetch from The Cat API using breed_ids param
      const catApiId = CAT_API_ID[breedId] ?? "mcoo";
      fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${catApiId}&limit=1`)
        .then(r => r.json())
        .then(d => setSrc(d[0]?.url ?? FALLBACK_CAT))
        .catch(() => setSrc(FALLBACK_CAT));
      return;
    }
    // Dog: fetch random image from Dog CEO API using verified slash-format path
    const path = DOG_PATH[breedId] ?? "labrador";
    fetch(`https://dog.ceo/api/breed/${path}/images/random`)
      .then(r => r.json())
      .then(d => setSrc(d.status === "success" ? d.message : FALLBACK_DOG))
      .catch(() => setSrc(FALLBACK_DOG));
  }, [breedId, petType]);

  if (!src) {
    // Green pulse placeholder while image loads
    return <div className="absolute inset-0 bg-[#E8F5E9] animate-pulse" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      onError={() => setSrc(petType === "cat" ? FALLBACK_CAT : FALLBACK_DOG)}
    />
  );
}
