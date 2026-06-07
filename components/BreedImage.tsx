"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Dog CEO API breed paths — confirmed valid paths only
const DOG_BREED_PATH: Record<string, string> = {
  // A
  "affenpinscher":                    "affenpinscher",
  "afghan-hound":                     "hound-afghan",
  "airedale-terrier":                 "airedale",
  "akita":                            "akita",
  "alaskan-malamute":                 "malamute",
  "anatolian-shepherd-dog":           "germanshepherd",
  "australian-cattle-dog":            "cattledog-australian",
  "australian-shepherd":              "australian-shepherd",
  "australian-silky-terrier":         "terrier-silky",
  "australian-terrier":               "terrier-australian",
  "azawakh":                          "saluki",
  // B
  "barbet":                           "frise",
  "basenji":                          "basenji",
  "basset-bleu-de-gascogne":          "hound-basset",
  "basset-fauve-de-bretagne":         "hound-basset",
  "basset-griffon-vendeen-grand":     "hound-basset",
  "basset-griffon-vendeen-petit":     "hound-basset",
  "basset-hound":                     "hound-basset",
  "bavarian-mountain-hound":          "hound-blood",
  "beagle":                           "beagle",
  "bearded-collie":                   "collie-border",
  "beauceron":                        "germanshepherd",
  "bedlington-terrier":               "terrier-bedlington",
  "belgian-shepherd-dog-groenendael": "groenendael",
  "belgian-shepherd-dog-laekenois":   "malinois",
  "belgian-shepherd-dog-malinois":    "malinois",
  "belgian-shepherd-dog-tervueren":   "tervuren",
  "bergamasco-shepherd-dog":          "komondor",
  "bernese-mountain-dog":             "mountain-bernese",
  "bichon-frise":                     "frise",
  "bloodhound":                       "hound-blood",
  "bolognese":                        "maltese",
  "border-collie":                    "collie-border",
  "border-terrier":                   "terrier-border",
  "borzoi":                           "borzoi",
  "boston-terrier":                   "terrier-boston",
  "bouvier-des-flandres":             "bouvier",
  "boxer":                            "boxer",
  "bracco-italiano":                  "pointer-germanlonghair",
  "briard":                           "briard",
  "british-bulldog":                  "bulldog-english",
  "brittany":                         "spaniel-brittany",
  "bull-terrier":                     "bullterrier",
  "bull-terrier-miniature":           "bullterrier",
  "bulldog":                          "bulldog-english",
  "bullmastiff":                      "mastiff-bull",
  // C
  "cairn-terrier":                    "terrier-cairn",
  "canaan-dog":                       "basenji",
  "cane-corso":                       "mastiff-bull",
  "cardigan-welsh-corgi":             "corgi-cardigan",
  "cavalier-king-charles-spaniel":    "spaniel-cocker",
  "central-asian-shepherd-dog":       "mastiff-bull",
  "cesky-terrier":                    "terrier-scottish",
  "chesapeake-bay-retriever":         "retriever-chesapeake",
  "chihuahua-long-coat":              "chihuahua",
  "chihuahua-smooth-coat":            "chihuahua",
  "chinese-crested":                  "chihuahua",
  "chow-chow":                        "chow",
  "clumber-spaniel":                  "spaniel-clumber",
  "cocker-spaniel":                   "spaniel-cocker",
  "collie-rough":                     "collie-border",
  "collie-smooth":                    "collie-border",
  "coton-de-tulear":                  "cotondetulear",
  "curly-coated-retriever":           "retriever-curly",
  // D
  "dachshund-long-haired":            "dachshund",
  "dachshund-miniature-long-haired":  "dachshund-miniature",
  "dachshund-miniature-smooth-haired":"dachshund-miniature",
  "dachshund-miniature-wire-haired":  "dachshund-miniature",
  "dachshund-smooth-haired":          "dachshund",
  "dachshund-wire-haired":            "dachshund",
  "dalmatian":                        "dalmatian",
  "dandie-dinmont-terrier":           "terrier-dandie",
  "deerhound":                        "deerhound-scottish",
  "dobermann":                        "doberman",
  "dogue-de-bordeaux":                "mastiff-bull",
  "dutch-shepherd-dog":               "malinois",
  // E
  "english-bulldog":                  "bulldog-english",
  "english-setter":                   "setter-english",
  "english-springer-spaniel":         "springer-english",
  "english-toy-terrier-black-tan":    "terrier-toy",
  "entlebucher-mountain-dog":         "entlebucher",
  "estrela-mountain-dog":             "mountain-bernese",
  "eurasier":                         "keeshond",
  // F
  "field-spaniel":                    "spaniel-field",
  "finnish-lapphund":                 "finnish-lapphund",
  "finnish-spitz":                    "keeshond",
  "flat-coated-retriever":            "retriever-flatcoated",
  "fox-terrier-smooth":               "terrier-fox",
  "fox-terrier-wire":                 "terrier-fox",
  "french-bulldog":                   "bulldog-french",
  // G
  "german-pinscher":                  "pinscher-miniature",
  "german-shepherd-dog":              "germanshepherd",
  "german-shorthaired-pointer":       "pointer-germanlonghair",
  "german-spitz-klein":               "pomeranian",
  "german-spitz-mittel":              "pomeranian",
  "german-wirehaired-pointer":        "pointer-germanlonghair",
  "giant-schnauzer":                  "schnauzer-giant",
  "glen-of-imaal-terrier":            "terrier-cairn",
  "golden-retriever":                 "retriever-golden",
  "gordon-setter":                    "setter-gordon",
  "grand-basset-griffon-vendeen":     "hound-basset",
  "great-dane":                       "dane-great",
  "greyhound":                        "greyhound-italian",
  "griffon-bruxellois":               "terrier-norfolk",
  // H
  "hamiltonstovare":                  "hound-basset",
  "havanese":                         "havanese",
  "hovawart":                         "retriever-golden",
  "hungarian-kuvasz":                 "kuvasz",
  "hungarian-puli":                   "puli",
  "hungarian-pumi":                   "poodle-miniature",
  "hungarian-vizsla":                 "vizsla",
  "hungarian-wire-haired-vizsla":     "vizsla",
  "husky":                            "husky",
  // I
  "ibizan-hound":                     "hound-ibizan",
  "icelandic-sheepdog":               "sheepdog-shetland",
  "irish-red-and-white-setter":       "setter-irish",
  "irish-setter":                     "setter-irish",
  "irish-terrier":                    "terrier-irish",
  "irish-water-spaniel":              "spaniel-irish",
  "irish-wolfhound":                  "wolfhound-irish",
  "italian-greyhound":                "greyhound-italian",
  "italian-spinone":                  "pointer-germanlonghair",
  // J
  "jack-russell-terrier":             "terrier-russell",
  "japanese-akita":                   "akita",
  "japanese-chin":                    "pekinese",
  "japanese-shiba-inu":               "shiba",
  "japanese-spitz":                   "samoyed",
  // K
  "keeshond":                         "keeshond",
  "kerry-blue-terrier":               "terrier-kerryblue",
  "king-charles-spaniel":             "spaniel-cocker",
  "komondor":                         "komondor",
  "kooikerhondje":                    "spaniel-cocker",
  "korean-jindo":                     "shiba",
  // L
  "labrador-retriever":               "retriever-labrador",
  "lagotto-romagnolo":                "spaniel-cocker",
  "lakeland-terrier":                 "terrier-lakeland",
  "lancashire-heeler":                "terrier-yorkshire",
  "leonberger":                       "leonberg",
  "lhasa-apso":                       "lhasa",
  "lowchen":                          "maltese",
  // M
  "maltese":                          "maltese",
  "manchester-terrier":               "terrier-yorkshire",
  "maremma-sheepdog":                 "samoyed",
  "mastiff":                          "mastiff-bull",
  "miniature-pinscher":               "pinscher-miniature",
  "miniature-schnauzer":              "schnauzer-miniature",
  "mixed-breed-dog":                  "retriever-labrador",
  // N
  "neapolitan-mastiff":               "mastiff-bull",
  "newfoundland":                     "newfoundland",
  "norfolk-terrier":                  "terrier-norfolk",
  "norwegian-buhund":                 "buhund-norwegian",
  "norwegian-elkhound":               "elkhound-norwegian",
  "norwegian-lundehund":              "elkhound-norwegian",
  "norwich-terrier":                  "terrier-norwich",
  "nova-scotia-duck-tolling-retriever":"retriever-golden",
  // O
  "old-english-sheepdog":             "sheepdog-english",
  "other-breed-not-listed":           "retriever-labrador",
  "otterhound":                       "otterhound",
  // P
  "papillon":                         "papillon",
  "parson-russell-terrier":           "terrier-russell",
  "pekingese":                        "pekinese",
  "pembroke-welsh-corgi":             "corgi-cardigan",
  "perro-de-presa-canario":           "mastiff-bull",
  "pharaoh-hound":                    "hound-ibizan",
  "pitbull":                          "pitbull",
  "pointer":                          "pointer",
  "polish-lowland-sheepdog":          "sheepdog-english",
  "pomeranian":                       "pomeranian",
  "poodle-miniature":                 "poodle-miniature",
  "poodle-standard":                  "poodle-standard",
  "poodle-toy":                       "poodle-toy",
  "portuguese-podengo":               "hound-ibizan",
  "portuguese-pointer":               "pointer",
  "portuguese-water-dog":             "waterdog-spanish",
  "pug":                              "pug",
  "puli":                             "puli",
  "pyrenean-mastiff":                 "pyrenees",
  "pyrenean-mountain-dog":            "pyrenees",
  "pyrenean-sheepdog-long-haired":    "sheepdog-shetland",
  "pyrenean-sheepdog-smooth-faced":   "sheepdog-shetland",
  // R
  "rhodesian-ridgeback":              "ridgeback-rhodesian",
  "rottweiler":                       "rottweiler",
  "russian-black-terrier":            "schnauzer-giant",
  "russian-toy":                      "chihuahua",
  // S
  "saluki":                           "saluki",
  "samoyed":                          "samoyed",
  "schipperke":                       "schipperke",
  "schnauzer":                        "schnauzer-miniature",
  "scottish-terrier":                 "terrier-scottish",
  "sealyham-terrier":                 "terrier-sealyham",
  "segugio-italiano":                 "hound-basset",
  "shar-pei":                         "chow",
  "shetland-sheepdog":                "sheepdog-shetland",
  "shih-tzu":                         "shihtzu",
  "siberian-husky":                   "husky",
  "skye-terrier":                     "terrier-skye",
  "sloughi":                          "saluki",
  "slovakian-rough-haired-pointer":   "pointer-germanlonghair",
  "soft-coated-wheaten-terrier":      "terrier-wheaten",
  "spanish-water-dog":                "waterdog-spanish",
  "st-bernard":                       "stbernard",
  "staffordshire-bull-terrier":       "bullterrier-staffordshire",
  "staffy":                           "bullterrier-staffordshire",
  "sussex-spaniel":                   "spaniel-sussex",
  "swedish-lapphund":                 "finnish-lapphund",
  "swedish-vallhund":                 "sheepdog-shetland",
  // T
  "tibetan-mastiff":                  "mastiff-tibetan",
  "tibetan-spaniel":                  "pekinese",
  "tibetan-terrier":                  "terrier-tibetan",
  "tosa":                             "mastiff-bull",
  // V/W
  "weimaraner":                       "weimaraner",
  "welsh-springer-spaniel":           "spaniel-welsh",
  "welsh-terrier":                    "terrier-welsh",
  "west-highland-white-terrier":      "terrier-westhighland",
  "whippet":                          "whippet",
  "white-swiss-shepherd-dog":         "germanshepherd",
  // X/Y
  "xoloitzcuintle-mexican-hairless":  "mexicanhairless",
  "yorkie":                           "terrier-yorkshire",
  "yorkshire-terrier":                "terrier-yorkshire",
};

// Cat images — verified Wikimedia URLs
const CAT_IMAGES: Record<string, string> = {
  "abyssinian":                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/600px-Gustav_chocolate.jpg",
  "american-bobtail":          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "american-bobtail-shorthair":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "american-curl":             "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/American_curl_2.jpg/600px-American_curl_2.jpg",
  "american-curl-longhair":    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/American_curl_2.jpg/600px-American_curl_2.jpg",
  "american-shorthair":        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/CreamAmericanShorthair.jpg/600px-CreamAmericanShorthair.jpg",
  "american-wirehair":         "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/CreamAmericanShorthair.jpg/600px-CreamAmericanShorthair.jpg",
  "australian-mist":           "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/600px-Gustav_chocolate.jpg",
  "balinese":                  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/600px-Siam_lilacpoint.jpg",
  "bengal":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Paintedcats_Red_Star_standing.jpg/600px-Paintedcats_Red_Star_standing.jpg",
  "bengal-longhair":           "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Paintedcats_Red_Star_standing.jpg/600px-Paintedcats_Red_Star_standing.jpg",
  "birman":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Birmankatze.jpg/600px-Birmankatze.jpg",
  "bombay":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/600px-Gustav_chocolate.jpg",
  "british-longhair":          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Britishblue.jpg/600px-Britishblue.jpg",
  "british-shorthair":         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Britishblue.jpg/600px-Britishblue.jpg",
  "burmese":                   "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Sable_Burmese_female.jpg/600px-Sable_Burmese_female.jpg",
  "burmilla":                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Britishblue.jpg/600px-Britishblue.jpg",
  "burmilla-longhair":         "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Britishblue.jpg/600px-Britishblue.jpg",
  "chartreux":                 "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Britishblue.jpg/600px-Britishblue.jpg",
  "chausie":                   "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/600px-Gustav_chocolate.jpg",
  "cherubim":                  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "cornish-rex":               "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Devon_Rex_-_CFF_Cat_Show.jpg/600px-Devon_Rex_-_CFF_Cat_Show.jpg",
  "cymric":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "devon-rex":                 "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Devon_Rex_-_CFF_Cat_Show.jpg/600px-Devon_Rex_-_CFF_Cat_Show.jpg",
  "donskoy":                   "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sphinx2_July_2006.jpg/600px-Sphinx2_July_2006.jpg",
  "egyptian-mau":              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/600px-Gustav_chocolate.jpg",
  "exotic-shorthair":          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/White_Persian_Cat.jpg/600px-White_Persian_Cat.jpg",
  "havana":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/600px-Gustav_chocolate.jpg",
  "highlander":                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "highlander-shorthair":      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "himalayan":                 "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Himalayan_cat_-_Wikipedia.jpg/600px-Himalayan_cat_-_Wikipedia.jpg",
  "japanese-bobtail":          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "japanese-bobtail-longhair": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "khaomanee":                 "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/White_Persian_Cat.jpg/600px-White_Persian_Cat.jpg",
  "korat":                     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/RussianBlue.jpg/600px-RussianBlue.jpg",
  "kurilian-bobtail":          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "kurilian-bobtail-longhair": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "laperm":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "laperm-shorthair":          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "lykoi":                     "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sphinx2_July_2006.jpg/600px-Sphinx2_July_2006.jpg",
  "maine-coon":                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Maine_Coon_cat_by_Tomitheos.JPG/600px-Maine_Coon_cat_by_Tomitheos.JPG",
  "maine-coon-polydactyl":     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Maine_Coon_cat_by_Tomitheos.JPG/600px-Maine_Coon_cat_by_Tomitheos.JPG",
  "manx":                      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "minuet":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/White_Persian_Cat.jpg/600px-White_Persian_Cat.jpg",
  "minuet-longhair":           "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/White_Persian_Cat.jpg/600px-White_Persian_Cat.jpg",
  "mixed-breed-cat":           "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "munchkin":                  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "munchkin-longhair":         "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "nebelung":                  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/RussianBlue.jpg/600px-RussianBlue.jpg",
  "norwegian-forest":          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Andrew_-_Norwegian_Forest_Cat.jpg/600px-Andrew_-_Norwegian_Forest_Cat.jpg",
  "ocicat":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/600px-Gustav_chocolate.jpg",
  "oriental-longhair":         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/600px-Siam_lilacpoint.jpg",
  "oriental-shorthair":        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/600px-Siam_lilacpoint.jpg",
  "other-breed-not-listed":    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "persian":                   "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/White_Persian_Cat.jpg/600px-White_Persian_Cat.jpg",
  "peterbald":                 "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sphinx2_July_2006.jpg/600px-Sphinx2_July_2006.jpg",
  "pixiebob":                  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "pixiebob-longhair":         "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "ragdoll":                   "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "russian-blue":              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/RussianBlue.jpg/600px-RussianBlue.jpg",
  "savannah":                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Paintedcats_Red_Star_standing.jpg/600px-Paintedcats_Red_Star_standing.jpg",
  "scottish-fold":             "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Female_Scottish_Fold.jpg/600px-Female_Scottish_Fold.jpg",
  "scottish-fold-longhair":    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Female_Scottish_Fold.jpg/600px-Female_Scottish_Fold.jpg",
  "scottish-straight":         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Female_Scottish_Fold.jpg/600px-Female_Scottish_Fold.jpg",
  "scottish-straight-longhair":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Female_Scottish_Fold.jpg/600px-Female_Scottish_Fold.jpg",
  "selkirk-rex":               "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "selkirk-rex-longhair":      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "serengeti":                 "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/600px-Gustav_chocolate.jpg",
  "siamese":                   "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/600px-Siam_lilacpoint.jpg",
  "siberian":                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Andrew_-_Norwegian_Forest_Cat.jpg/600px-Andrew_-_Norwegian_Forest_Cat.jpg",
  "singapura":                 "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/600px-Gustav_chocolate.jpg",
  "snowshoe":                  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/600px-Siam_lilacpoint.jpg",
  "somali":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/600px-Gustav_chocolate.jpg",
  "sphynx":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sphinx2_July_2006.jpg/600px-Sphinx2_July_2006.jpg",
  "tennessee-rex":             "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "thai":                      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/600px-Siam_lilacpoint.jpg",
  "tonkinese":                 "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/600px-Siam_lilacpoint.jpg",
  "toybob":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg",
  "toyger":                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Paintedcats_Red_Star_standing.jpg/600px-Paintedcats_Red_Star_standing.jpg",
  "turkish-angora":            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Turkish_angora_2.jpg/600px-Turkish_angora_2.jpg",
  "turkish-van":               "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/White_Persian_Cat.jpg/600px-White_Persian_Cat.jpg",
};

const DEFAULT_DOG_PATH = "retriever-labrador";
const DEFAULT_DOG_IMG = "https://images.dog.ceo/breeds/retriever-labrador/n02099712_4323.jpg";
const DEFAULT_CAT_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/600px-Cat_August_2010-4.jpg";

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
      setSrc(CAT_IMAGES[breedId] ?? DEFAULT_CAT_IMG);
      return;
    }
    const path = DOG_BREED_PATH[breedId] ?? DEFAULT_DOG_PATH;
    fetch(`https://dog.ceo/api/breed/${path}/images/random`)
      .then(r => r.json())
      .then(d => {
        if (d.status === "success" && d.message) {
          setSrc(d.message);
        } else {
          setSrc(DEFAULT_DOG_IMG);
        }
      })
      .catch(() => setSrc(DEFAULT_DOG_IMG));
  }, [breedId, petType]);

  if (!src) {
    return <div className="absolute inset-0 bg-[#E8F5E9] animate-pulse" />;
  }

  const fallback = petType === "cat" ? DEFAULT_CAT_IMG : DEFAULT_DOG_IMG;

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      unoptimized
      className={className}
      sizes={sizes}
      onError={() => setSrc(fallback)}
    />
  );
}
