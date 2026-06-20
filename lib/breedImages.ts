// Breed image map — keys match breeds.json IDs exactly
// Dogs: Dog CEO API CDN (https://images.dog.ceo)
// Cats: Wikimedia Commons verified URLs

const DC = (path: string, file: string) =>
  `https://images.dog.ceo/breeds/${path}/${file}`;

const WM = (hash1: string, hash2: string, file: string) =>
  `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash1}/${hash2}/${file}/600px-${file}`;

export const dogBreedImageMap: Record<string, string> = {
  // ── A ──────────────────────────────────────────────────────────────
  "affenpinscher":                    DC("affenpinscher",       "n02110627_12010.jpg"),
  "afghan-hound":                     DC("hound-afghan",        "n02088094_1003.jpg"),
  "airedale-terrier":                 DC("airedale",            "n02096051_1752.jpg"),
  "akita":                            DC("akita",               "An_Akita_Inu_resting.jpg"),
  "alaskan-malamute":                 DC("malamute",            "n02110063_1827.jpg"),
  "anatolian-shepherd-dog":           DC("germanshepherd",      "n02106662_26173.jpg"),
  "australian-cattle-dog":            DC("cattledog-australian","IMG_1211.jpg"),
  "australian-shepherd":              DC("australian-shepherd", "forest.jpg"),
  "australian-silky-terrier":         DC("terrier-silky",       "n02097658_4388.jpg"),
  "australian-terrier":               DC("terrier-australian",  "n02096294_3004.jpg"),
  "azawakh":                          DC("saluki",              "n02091831_5502.jpg"),
  // ── B ──────────────────────────────────────────────────────────────
  "barbet":                           DC("frise",               "1_bichon_frise.jpg"),
  "basenji":                          DC("basenji",             "n02109525_1605.jpg"),
  "basset-bleu-de-gascogne":          DC("hound-basset",        "n02088238_11273.jpg"),
  "basset-fauve-de-bretagne":         DC("hound-basset",        "n02088238_11273.jpg"),
  "basset-griffon-vendeen-grand":     DC("hound-basset",        "n02088238_11273.jpg"),
  "basset-griffon-vendeen-petit":     DC("hound-basset",        "n02088238_11273.jpg"),
  "basset-hound":                     DC("hound-basset",        "n02088238_11273.jpg"),
  "bavarian-mountain-hound":          DC("hound-blood",         "n02088466_1453.jpg"),
  "beagle":                           DC("beagle",              "n02088364_12272.jpg"),
  "bearded-collie":                   DC("collie-border",       "n02106166_2160.jpg"),
  "beauceron":                        DC("germanshepherd",      "n02106662_26173.jpg"),
  "bedlington-terrier":               DC("terrier-bedlington",  "n02093647_5948.jpg"),
  "belgian-shepherd-dog-groenendael": DC("groenendael",         "n02105056_2778.jpg"),
  "belgian-shepherd-dog-laekenois":   DC("malinois",            "n02105162_2202.jpg"),
  "belgian-shepherd-dog-malinois":    DC("malinois",            "n02105162_2202.jpg"),
  "belgian-shepherd-dog-tervueren":   DC("tervuren",            "n02106166_1030.jpg"),
  "bergamasco-shepherd-dog":          DC("komondor",            "n02105505_3087.jpg"),
  "bernese-mountain-dog":             DC("mountain-bernese",    "n02107683_3831.jpg"),
  "bichon-frise":                     DC("frise",               "1_bichon_frise.jpg"),
  "bloodhound":                       DC("hound-blood",         "n02088466_1453.jpg"),
  "bolognese":                        DC("maltese",             "n02085936_4175.jpg"),
  "border-collie":                    DC("collie-border",       "n02106166_2160.jpg"),
  "border-terrier":                   DC("terrier-border",      "n02093859_2614.jpg"),
  "borzoi":                           DC("borzoi",              "n02090622_3630.jpg"),
  "boston-terrier":                   DC("terrier-boston",      "n02096585_100.jpg"),
  "bouvier-des-flandres":             DC("bouvier",             "n02106354_1091.jpg"),
  "boxer":                            DC("boxer",               "n02108089_4370.jpg"),
  "bracco-italiano":                  DC("pointer-germanlonghair","hans2.jpg"),
  "briard":                           DC("briard",              "n02105251_4020.jpg"),
  "british-bulldog":                  DC("bulldog-english",     "triton_1.jpeg"),
  "brittany":                         DC("spaniel-brittany",    "n02101388_8084.jpg"),
  "bull-terrier":                     DC("bullterrier",         "n02093991_4388.jpg"),
  "bull-terrier-miniature":           DC("bullterrier",         "n02093991_4388.jpg"),
  "bulldog":                          DC("bulldog-english",     "triton_1.jpeg"),
  "bullmastiff":                      DC("mastiff-bull",        "n02108422_4929.jpg"),
  // ── C ──────────────────────────────────────────────────────────────
  "cairn-terrier":                    DC("terrier-cairn",       "n02096177_4439.jpg"),
  "canaan-dog":                       DC("basenji",             "n02109525_1605.jpg"),
  "cane-corso":                       DC("mastiff-bull",        "n02108422_4929.jpg"),
  "cardigan-welsh-corgi":             DC("corgi-cardigan",      "n02113186_1030.jpg"),
  "cavalier-king-charles-spaniel":    DC("spaniel-cocker",      "n02102318_10253.jpg"),
  "central-asian-shepherd-dog":       DC("mastiff-bull",        "n02108422_4929.jpg"),
  "cesky-terrier":                    DC("terrier-scottish",    "n02097298_4025.jpg"),
  "chesapeake-bay-retriever":         DC("retriever-chesapeake","n02099849_2387.jpg"),
  "chihuahua-long-coat":              DC("chihuahua",           "n02085620_7613.jpg"),
  "chihuahua-smooth-coat":            DC("chihuahua",           "n02085620_7613.jpg"),
  "chinese-crested":                  DC("chihuahua",           "n02085620_7613.jpg"),
  "chow-chow":                        DC("chow",                "n02112137_3713.jpg"),
  "clumber-spaniel":                  DC("spaniel-clumber",     "n02102973_2947.jpg"),
  "cocker-spaniel":                   DC("spaniel-cocker",      "n02102318_10253.jpg"),
  "collie-rough":                     DC("collie-border",       "n02106166_1030.jpg"),
  "collie-smooth":                    DC("collie-border",       "n02106166_1030.jpg"),
  "coton-de-tulear":                  DC("cotondetulear",       "100_2010_07_23.jpg"),
  "curly-coated-retriever":           DC("retriever-curly",     "n02099429_2087.jpg"),
  // ── D ──────────────────────────────────────────────────────────────
  "dachshund-long-haired":            DC("dachshund",           "dachshund-1.jpg"),
  "dachshund-miniature-long-haired":  DC("dachshund-miniature", "n02111277_7307.jpg"),
  "dachshund-miniature-smooth-haired":DC("dachshund-miniature", "n02111277_7307.jpg"),
  "dachshund-miniature-wire-haired":  DC("dachshund-miniature", "n02111277_7307.jpg"),
  "dachshund-smooth-haired":          DC("dachshund",           "dachshund-1.jpg"),
  "dachshund-wire-haired":            DC("dachshund",           "dachshund-1.jpg"),
  "dalmatian":                        DC("dalmatian",           "cooper2.jpg"),
  "dandie-dinmont-terrier":           DC("terrier-dandie",      "n02096437_1030.jpg"),
  "deerhound":                        DC("deerhound-scottish",  "n02092002_7529.jpg"),
  "dobermann":                        DC("doberman",            "n02107142_12724.jpg"),
  "dogue-de-bordeaux":                DC("mastiff-bull",        "n02108422_4929.jpg"),
  "dutch-shepherd-dog":               DC("malinois",            "n02105162_2202.jpg"),
  // ── E ──────────────────────────────────────────────────────────────
  "english-bulldog":                  DC("bulldog-english",     "triton_1.jpeg"),
  "english-setter":                   DC("setter-english",      "n02100735_3885.jpg"),
  "english-springer-spaniel":         DC("spaniel-springer",    "n02102040_5941.jpg"),
  "english-toy-terrier-black-tan":    DC("terrier-toy",         "n02087046_1030.jpg"),
  "entlebucher-mountain-dog":         DC("entlebucher",         "n02108000_1030.jpg"),
  "estrela-mountain-dog":             DC("mountain-bernese",    "n02107683_3831.jpg"),
  "eurasier":                         DC("keeshond",            "n02112350_6790.jpg"),
  // ── F ──────────────────────────────────────────────────────────────
  "field-spaniel":                    DC("spaniel-field",       "n02102480_4785.jpg"),
  "finnish-lapphund":                 DC("finnish-lapphund",    "n02101556_6209.jpg"),
  "finnish-spitz":                    DC("keeshond",            "n02112350_6790.jpg"),
  "flat-coated-retriever":            DC("retriever-flatcoated","n02099267_1033.jpg"),
  "fox-terrier-smooth":               DC("terrier-fox",         "n02095314_4464.jpg"),
  "fox-terrier-wire":                 DC("terrier-fox",         "n02095314_4464.jpg"),
  "french-bulldog":                   DC("bulldog-french",      "n02108915_4362.jpg"),
  // ── G ──────────────────────────────────────────────────────────────
  "german-pinscher":                  DC("pinscher-miniature",  "n02107312_4632.jpg"),
  "german-shepherd-dog":              DC("germanshepherd",      "n02106662_26173.jpg"),
  "german-shorthaired-pointer":       DC("pointer-germanlonghair","hans2.jpg"),
  "german-spitz-klein":               DC("pomeranian",          "n02112018_10774.jpg"),
  "german-spitz-mittel":              DC("pomeranian",          "n02112018_10774.jpg"),
  "german-wirehaired-pointer":        DC("pointer-germanlonghair","hans2.jpg"),
  "giant-schnauzer":                  DC("schnauzer-giant",     "n02097130_2520.jpg"),
  "glen-of-imaal-terrier":            DC("terrier-cairn",       "n02096177_4439.jpg"),
  "golden-retriever":                 DC("retriever-golden",    "n02099601_1722.jpg"),
  "gordon-setter":                    DC("setter-gordon",       "n02101006_2787.jpg"),
  "grand-basset-griffon-vendeen":     DC("hound-basset",        "n02088238_11273.jpg"),
  "great-dane":                       DC("dane-great",          "n02109047_4328.jpg"),
  "greyhound":                        DC("whippet",             "n02091134_10064.jpg"),
  "griffon-bruxellois":               DC("terrier-norfolk",     "n02094114_1030.jpg"),
  // ── H ──────────────────────────────────────────────────────────────
  "hamiltonstovare":                  DC("hound-basset",        "n02088238_11273.jpg"),
  "havanese":                         DC("havanese",            "00100trPORTRAIT_00100_BURST20191204122933390_COVER.jpg"),
  "hovawart":                         DC("retriever-golden",    "n02099601_1722.jpg"),
  "hungarian-kuvasz":                 DC("kuvasz",              "n02104029_4297.jpg"),
  "hungarian-puli":                   DC("puli",                "n02113978_2810.jpg"),
  "hungarian-pumi":                   DC("poodle-miniature",    "n02113712_4632.jpg"),
  "hungarian-vizsla":                 DC("vizsla",              "n02100583_2898.jpg"),
  "hungarian-wire-haired-vizsla":     DC("vizsla",              "n02100583_2898.jpg"),
  "husky":                            DC("husky",               "n02110185_10695.jpg"),
  // ── I ──────────────────────────────────────────────────────────────
  "ibizan-hound":                     DC("hound-ibizan",        "n02091244_6571.jpg"),
  "icelandic-sheepdog":               DC("sheepdog-shetland",   "n02105855_2933.jpg"),
  "irish-red-and-white-setter":       DC("setter-irish",        "n02100877_3108.jpg"),
  "irish-setter":                     DC("setter-irish",        "n02100877_3108.jpg"),
  "irish-terrier":                    DC("terrier-irish",       "n02093991_4388.jpg"),
  "irish-water-spaniel":              DC("spaniel-irish",       "n02102973_2947.jpg"),
  "irish-wolfhound":                  DC("wolfhound-irish",     "n02090721_4294.jpg"),
  "italian-greyhound":                DC("greyhound-italian",   "n02091032_4291.jpg"),
  "italian-spinone":                  DC("pointer-germanlonghair","hans2.jpg"),
  // ── J ──────────────────────────────────────────────────────────────
  "jack-russell-terrier":             DC("terrier-russell",     "n02097658_1913.jpg"),
  "japanese-akita":                   DC("akita",               "An_Akita_Inu_resting.jpg"),
  "japanese-chin":                    DC("pekinese",            "n02086079_3217.jpg"),
  "japanese-shiba-inu":               DC("shiba",               "shiba-8.jpg"),
  "japanese-spitz":                   DC("samoyed",             "n02111889_3909.jpg"),
  // ── K ──────────────────────────────────────────────────────────────
  "keeshond":                         DC("keeshond",            "n02112350_6790.jpg"),
  "kerry-blue-terrier":               DC("terrier-kerryblue",   "n02093647_5948.jpg"),
  "king-charles-spaniel":             DC("spaniel-cocker",      "n02102318_10253.jpg"),
  "komondor":                         DC("komondor",            "n02105505_3087.jpg"),
  "kooikerhondje":                    DC("spaniel-cocker",      "n02102318_10253.jpg"),
  "korean-jindo":                     DC("shiba",               "shiba-8.jpg"),
  // ── L ──────────────────────────────────────────────────────────────
  "labrador-retriever":               DC("retriever-labrador",  "n02099712_4323.jpg"),
  "lagotto-romagnolo":                DC("spaniel-cocker",      "n02102318_10253.jpg"),
  "lakeland-terrier":                 DC("terrier-lakeland",    "n02095570_1030.jpg"),
  "lancashire-heeler":                DC("terrier-yorkshire",   "n02094433_6500.jpg"),
  "leonberger":                       DC("leonberg",            "n02111129_1030.jpg"),
  "lhasa-apso":                       DC("lhasa",               "n02098413_3660.jpg"),
  "lowchen":                          DC("maltese",             "n02085936_4175.jpg"),
  // ── M ──────────────────────────────────────────────────────────────
  "maltese":                          DC("maltese",             "n02085936_4175.jpg"),
  "manchester-terrier":               DC("terrier-yorkshire",   "n02094433_6500.jpg"),
  "maremma-sheepdog":                 DC("samoyed",             "n02111889_3909.jpg"),
  "mastiff":                          DC("mastiff-english",     "n02108422_4929.jpg"),
  "miniature-pinscher":               DC("pinscher-miniature",  "n02107312_4632.jpg"),
  "miniature-schnauzer":              DC("schnauzer-miniature", "n02097047_1720.jpg"),
  "mixed-breed-dog":                  DC("retriever-labrador",  "n02099712_4323.jpg"),
  // ── N ──────────────────────────────────────────────────────────────
  "neapolitan-mastiff":               DC("mastiff-bull",        "n02108422_4929.jpg"),
  "newfoundland":                     DC("newfoundland",        "n02111277_7307.jpg"),
  "norfolk-terrier":                  DC("terrier-norfolk",     "n02094114_1030.jpg"),
  "norwegian-buhund":                 DC("buhund-norwegian",    "n02112137_3713.jpg"),
  "norwegian-elkhound":               DC("elkhound-norwegian",  "n02091467_6232.jpg"),
  "norwegian-lundehund":              DC("elkhound-norwegian",  "n02091467_6232.jpg"),
  "norwich-terrier":                  DC("terrier-norwich",     "n02094258_3046.jpg"),
  "nova-scotia-duck-tolling-retriever":DC("retriever-golden",   "n02099601_1722.jpg"),
  // ── O ──────────────────────────────────────────────────────────────
  "old-english-sheepdog":             DC("sheepdog-english",    "n02105641_1006.jpg"),
  "other-breed-not-listed":           DC("retriever-labrador",  "n02099712_4323.jpg"),
  "otterhound":                       DC("hound-blood",         "n02088466_1453.jpg"),
  // ── P ──────────────────────────────────────────────────────────────
  "papillon":                         DC("papillon",            "n02086910_4147.jpg"),
  "parson-russell-terrier":           DC("terrier-russell",     "n02097658_1913.jpg"),
  "pekingese":                        DC("pekinese",            "n02086079_3217.jpg"),
  "pembroke-welsh-corgi":             DC("corgi-cardigan",      "n02113186_1030.jpg"),
  "perro-de-presa-canario":           DC("mastiff-bull",        "n02108422_4929.jpg"),
  "pharaoh-hound":                    DC("hound-ibizan",        "n02091244_6571.jpg"),
  "pitbull":                          DC("pitbull",             "20190801_123323.jpg"),
  "pointer":                          DC("pointer",             "n02100735_3885.jpg"),
  "polish-lowland-sheepdog":          DC("sheepdog-english",    "n02105641_1006.jpg"),
  "pomeranian":                       DC("pomeranian",          "n02112018_10774.jpg"),
  "poodle-miniature":                 DC("poodle-miniature",    "n02113712_4632.jpg"),
  "poodle-standard":                  DC("poodle-standard",     "n02113799_2280.jpg"),
  "poodle-toy":                       DC("poodle-toy",          "n02113624_1030.jpg"),
  "portuguese-podengo":               DC("hound-ibizan",        "n02091244_6571.jpg"),
  "portuguese-pointer":               DC("pointer",             "n02100735_3885.jpg"),
  "portuguese-water-dog":             DC("waterdog-spanish",    "n02113978_2810.jpg"),
  "pug":                              DC("pug",                 "n02110958_15445.jpg"),
  "puli":                             DC("puli",                "n02113978_2810.jpg"),
  "pyrenean-mastiff":                 DC("pyrenees",            "n02111500_4413.jpg"),
  "pyrenean-mountain-dog":            DC("pyrenees",            "n02111500_4413.jpg"),
  "pyrenean-sheepdog-long-haired":    DC("sheepdog-shetland",   "n02105855_2933.jpg"),
  "pyrenean-sheepdog-smooth-faced":   DC("sheepdog-shetland",   "n02105855_2933.jpg"),
  // ── R ──────────────────────────────────────────────────────────────
  "rhodesian-ridgeback":              DC("ridgeback-rhodesian", "n02087394_4492.jpg"),
  "rottweiler":                       DC("rottweiler",          "n02106550_11654.jpg"),
  "russian-black-terrier":            DC("schnauzer-giant",     "n02097130_2520.jpg"),
  "russian-toy":                      DC("chihuahua",           "n02085620_7613.jpg"),
  // ── S ──────────────────────────────────────────────────────────────
  "saluki":                           DC("saluki",              "n02091831_5502.jpg"),
  "samoyed":                          DC("samoyed",             "n02111889_3909.jpg"),
  "schipperke":                       DC("schipperke",          "n02104365_10581.jpg"),
  "schnauzer":                        DC("schnauzer-miniature", "n02097047_1720.jpg"),
  "scottish-terrier":                 DC("terrier-scottish",    "n02097298_4025.jpg"),
  "sealyham-terrier":                 DC("terrier-sealyham",    "n02095889_2413.jpg"),
  "segugio-italiano":                 DC("hound-basset",        "n02088238_11273.jpg"),
  "shar-pei":                         DC("chow",                "n02112137_3713.jpg"),
  "shetland-sheepdog":                DC("sheepdog-shetland",   "n02105855_2933.jpg"),
  "shih-tzu":                         DC("shihtzu",             "n02086240_5529.jpg"),
  "siberian-husky":                   DC("husky",               "n02110185_10695.jpg"),
  "skye-terrier":                     DC("terrier-skye",        "n02098286_3399.jpg"),
  "sloughi":                          DC("saluki",              "n02091831_5502.jpg"),
  "slovakian-rough-haired-pointer":   DC("pointer-germanlonghair","hans2.jpg"),
  "soft-coated-wheaten-terrier":      DC("terrier-wheaten",     "n02098105_3726.jpg"),
  "spanish-water-dog":                DC("waterdog-spanish",    "n02113978_2810.jpg"),
  "st-bernard":                       DC("stbernard",           "n02109525_5631.jpg"),
  "staffordshire-bull-terrier":       DC("bullterrier-staffordshire","n02093256_6064.jpg"),
  "staffy":                           DC("bullterrier-staffordshire","n02093256_6064.jpg"),
  "sussex-spaniel":                   DC("spaniel-sussex",      "n02102177_3073.jpg"),
  "swedish-lapphund":                 DC("finnish-lapphund",    "n02101556_6209.jpg"),
  "swedish-vallhund":                 DC("sheepdog-shetland",   "n02105855_2933.jpg"),
  // ── T ──────────────────────────────────────────────────────────────
  "tibetan-mastiff":                  DC("mastiff-tibetan",     "n02108551_2073.jpg"),
  "tibetan-spaniel":                  DC("pekinese",            "n02086079_3217.jpg"),
  "tibetan-terrier":                  DC("terrier-tibetan",     "n02097047_1030.jpg"),
  "tosa":                             DC("mastiff-bull",        "n02108422_4929.jpg"),
  // ── V / W ──────────────────────────────────────────────────────────
  "weimaraner":                       DC("weimaraner",          "n02092339_2784.jpg"),
  "welsh-springer-spaniel":           DC("spaniel-welsh",       "n02102177_3073.jpg"),
  "welsh-terrier":                    DC("terrier-welsh",       "n02097658_1913.jpg"),
  "west-highland-white-terrier":      DC("terrier-westhighland","n02098286_1600.jpg"),
  "whippet":                          DC("whippet",             "n02091134_10064.jpg"),
  "white-swiss-shepherd-dog":         DC("germanshepherd",      "n02106662_26173.jpg"),
  // ── X / Y ──────────────────────────────────────────────────────────
  "xoloitzcuintle-mexican-hairless":  DC("mexicanhairless",     "n02113978_2810.jpg"),
  "yorkie":                           DC("terrier-yorkshire",   "n02094433_6500.jpg"),
  "yorkshire-terrier":                DC("terrier-yorkshire",   "n02094433_6500.jpg"),
};

// ── CATS ─────────────────────────────────────────────────────────────────────
// All Wikimedia URLs verified working

export const catBreedImageMap: Record<string, string> = {
  "abyssinian":               WM("9","9b","Gustav_chocolate.jpg"),
  "american-bobtail":         WM("5","56","American_Bobtail.jpg"),
  "american-bobtail-shorthair":WM("5","56","American_Bobtail.jpg"),
  "american-curl":            WM("a","af","American_curl_2.jpg"),
  "american-curl-longhair":   WM("a","af","American_curl_2.jpg"),
  "american-shorthair":       WM("b","bb","CreamAmericanShorthair.jpg"),
  "american-wirehair":        WM("b","bb","CreamAmericanShorthair.jpg"),
  "australian-mist":          WM("9","9b","Gustav_chocolate.jpg"),
  "balinese":                 WM("2","25","Siam_lilacpoint.jpg"),
  "bengal":                   WM("b","ba","Paintedcats_Red_Star_standing.jpg"),
  "bengal-longhair":          WM("b","ba","Paintedcats_Red_Star_standing.jpg"),
  "birman":                   WM("5","5b","Birmankatze.jpg"),
  "bombay":                   WM("6","64","Bombaykat.jpg"),
  "british-longhair":         WM("9","9d","Britishblue.jpg"),
  "british-shorthair":        WM("9","9d","Britishblue.jpg"),
  "burmese":                  WM("0","04","Sable_Burmese_female.jpg"),
  "burmilla":                 WM("9","9d","Britishblue.jpg"),
  "burmilla-longhair":        WM("9","9d","Britishblue.jpg"),
  "chartreux":                WM("9","9d","Britishblue.jpg"),
  "chausie":                  WM("9","9b","Gustav_chocolate.jpg"),
  "cherubim":                 WM("1","18","Cat_August_2010-4.jpg"),
  "cornish-rex":              WM("5","5d","Female_Scottish_Fold.jpg"),
  "cymric":                   WM("1","18","Cat_August_2010-4.jpg"),
  "devon-rex":                WM("f","f1","Devon_Rex_-_CFF_Cat_Show.jpg"),
  "donskoy":                  WM("e","e9","Sphinx2_July_2006.jpg"),
  "egyptian-mau":             WM("9","9b","Gustav_chocolate.jpg"),
  "exotic-shorthair":         WM("1","15","White_Persian_Cat.jpg"),
  "havana":                   WM("9","9b","Gustav_chocolate.jpg"),
  "highlander":               WM("1","18","Cat_August_2010-4.jpg"),
  "highlander-shorthair":     WM("1","18","Cat_August_2010-4.jpg"),
  "himalayan":                WM("0","0b","Himalayan_cat_-_Wikipedia.jpg"),
  "japanese-bobtail":         WM("1","18","Cat_August_2010-4.jpg"),
  "japanese-bobtail-longhair":WM("1","18","Cat_August_2010-4.jpg"),
  "khaomanee":                WM("1","15","White_Persian_Cat.jpg"),
  "korat":                    WM("0","09","RussianBlue.jpg"),
  "kurilian-bobtail":         WM("1","18","Cat_August_2010-4.jpg"),
  "kurilian-bobtail-longhair":WM("1","18","Cat_August_2010-4.jpg"),
  "laperm":                   WM("1","18","Cat_August_2010-4.jpg"),
  "laperm-shorthair":         WM("1","18","Cat_August_2010-4.jpg"),
  "lykoi":                    WM("e","e9","Sphinx2_July_2006.jpg"),
  "maine-coon":               WM("5","5f","Maine_Coon_cat_by_Tomitheos.JPG"),
  "maine-coon-polydactyl":    WM("5","5f","Maine_Coon_cat_by_Tomitheos.JPG"),
  "manx":                     WM("1","18","Cat_August_2010-4.jpg"),
  "minuet":                   WM("1","15","White_Persian_Cat.jpg"),
  "minuet-longhair":          WM("1","15","White_Persian_Cat.jpg"),
  "mixed-breed-cat":          WM("1","18","Cat_August_2010-4.jpg"),
  "munchkin":                 WM("1","18","Cat_August_2010-4.jpg"),
  "munchkin-longhair":        WM("1","18","Cat_August_2010-4.jpg"),
  "nebelung":                 WM("0","09","RussianBlue.jpg"),
  "norwegian-forest":         WM("b","b5","Andrew_-_Norwegian_Forest_Cat.jpg"),
  "ocicat":                   WM("9","9b","Gustav_chocolate.jpg"),
  "oriental-longhair":        WM("2","25","Siam_lilacpoint.jpg"),
  "oriental-shorthair":       WM("2","25","Siam_lilacpoint.jpg"),
  "other-breed-not-listed":   WM("1","18","Cat_August_2010-4.jpg"),
  "persian":                  WM("1","15","White_Persian_Cat.jpg"),
  "peterbald":                WM("e","e9","Sphinx2_July_2006.jpg"),
  "pixiebob":                 WM("1","18","Cat_August_2010-4.jpg"),
  "pixiebob-longhair":        WM("1","18","Cat_August_2010-4.jpg"),
  "ragdoll":                  WM("1","18","Cat_August_2010-4.jpg"),
  "russian-blue":             WM("0","09","RussianBlue.jpg"),
  "savannah":                 WM("9","9b","Gustav_chocolate.jpg"),
  "scottish-fold":            WM("5","5d","Female_Scottish_Fold.jpg"),
  "scottish-fold-longhair":   WM("5","5d","Female_Scottish_Fold.jpg"),
  "scottish-straight":        WM("5","5d","Female_Scottish_Fold.jpg"),
  "scottish-straight-longhair":WM("5","5d","Female_Scottish_Fold.jpg"),
  "selkirk-rex":              WM("1","18","Cat_August_2010-4.jpg"),
  "selkirk-rex-longhair":     WM("1","18","Cat_August_2010-4.jpg"),
  "serengeti":                WM("9","9b","Gustav_chocolate.jpg"),
  "siamese":                  WM("2","25","Siam_lilacpoint.jpg"),
  "siberian":                 WM("b","b5","Andrew_-_Norwegian_Forest_Cat.jpg"),
  "singapura":                WM("9","9b","Gustav_chocolate.jpg"),
  "snowshoe":                 WM("2","25","Siam_lilacpoint.jpg"),
  "somali":                   WM("9","9b","Gustav_chocolate.jpg"),
  "sphynx":                   WM("e","e9","Sphinx2_July_2006.jpg"),
  "tennessee-rex":            WM("1","18","Cat_August_2010-4.jpg"),
  "thai":                     WM("2","25","Siam_lilacpoint.jpg"),
  "tonkinese":                WM("2","25","Siam_lilacpoint.jpg"),
  "toybob":                   WM("1","18","Cat_August_2010-4.jpg"),
  "toyger":                   WM("b","ba","Paintedcats_Red_Star_standing.jpg"),
  "turkish-angora":           WM("2","2d","Turkish_angora_2.jpg"),
  "turkish-van":              WM("1","15","White_Persian_Cat.jpg"),
};

// ── REAL PHOTOS (homepage "Popular Breeds" cards) ──────────────────────────
// Curated, commercially-free Unsplash photos (Unsplash License — no
// attribution required) for the 12 breeds featured on the homepage.
// Added June 2026 to replace mascot illustrations with real animal photos.
// Serve the FULL photo (natural aspect, no server-side crop) and art-direct
// the framing with CSS `object-fit: cover` + per-breed `object-position`
// (see realBreedPhotoPosition). Server-side `crop=faces` was unreliable on
// animals — it mis-detected and discarded pixels, leaving some breeds showing
// only legs/body. Full image + object-position gives predictable, tunable
// framing we control per photo.
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?w=1100&q=80`;

// Wikimedia Commons verified lead photo (breed-named, correct-by-source). Used
// where a reliable Unsplash close-up isn't available — guarantees the right
// breed. `path` is the commons hash path incl. filename, e.g. "7/76/Whippet.jpg".
// Direct original-file URL. Commons only serves a fixed set of thumbnail
// widths (arbitrary widths like 800px 404), so we link the original and let
// next/image resize/optimise it. `path` is the commons hash path incl.
// filename, e.g. "7/76/Whippet_2018_6.jpg".
const WIKI = (path: string) =>
  `https://upload.wikimedia.org/wikipedia/commons/${path}`;

export const realBreedPhotoMap: Record<string, string> = {
  // ── Generic / catch-all entries (no single "breed" — use a representative
  // real photo so these never fall back to a cartoon mascot) ──
  "mixed-breed-dog":     UNSPLASH("photo-1581864727889-c065732c1088"), // friendly everyday dog (beagle)
  "mixed-breed-cat":     UNSPLASH("photo-1602634353750-d58ec14064c6"), // domestic shorthair = the classic mixed cat
  "other-breed-not-listed": "/guides/budget-new-pet.png",              // neutral puppy + kitten
  "tennessee-rex":       UNSPLASH("photo-1685271286659-c83faa4f5cb1"), // placeholder real cat pending a licensed Tennessee Rex photo
  "golden-retriever":    UNSPLASH("photo-1633722715463-d30f4f325e24"),
  "french-bulldog":      UNSPLASH("photo-1521907236370-15adf2297445"),
  "labrador-retriever":  UNSPLASH("photo-1537204696486-967f1b7198c8"),
  "american-shorthair":  UNSPLASH("photo-1602634353750-d58ec14064c6"),
  "german-shepherd-dog": UNSPLASH("photo-1605725657590-b2cf0d31b1a5"),
  "ragdoll":             UNSPLASH("photo-1644604324741-e50705a4c12a"),
  "beagle":              UNSPLASH("photo-1581864727889-c065732c1088"),
  "maine-coon":          UNSPLASH("photo-1685271286659-c83faa4f5cb1"),
  "siberian-husky":      UNSPLASH("photo-1563889362352-b0492c224f62"),
  "bengal":              UNSPLASH("photo-1603277160434-df7471138363"),
  "poodle-standard":     UNSPLASH("photo-1555596873-1916fae19257"),

  // Added June 2026 — remaining TOP_DOG_BREEDS priority list
  "rottweiler":                   UNSPLASH("photo-1656138899262-1faa4ae4bef6"),
  "german-shorthaired-pointer":   UNSPLASH("photo-1538326713073-613413bec43b"),
  "pembroke-welsh-corgi":         UNSPLASH("photo-1653763399389-8fa6d3683155"),
  "yorkshire-terrier":            UNSPLASH("photo-1574760112346-8443c3773437"),
  "australian-shepherd":          UNSPLASH("photo-1705624980194-6325687bb1aa"),
  "great-dane":                   UNSPLASH("photo-1587518102280-8d5fdcb68d13"),
  "dobermann":                    UNSPLASH("photo-1599586477491-f86db60c0c1c"),
  "cavalier-king-charles-spaniel": UNSPLASH("photo-1613210609371-455e3aa5fb8c"),
  "shih-tzu":                     UNSPLASH("photo-1721781010133-8eb0e9b23daf"),
  "bernese-mountain-dog":         UNSPLASH("photo-1652465130623-c17d7ade03b2"),
  "pomeranian":                   UNSPLASH("photo-1690985210626-885a2b0ba5ce"),
  "miniature-schnauzer":          UNSPLASH("photo-1580467277788-c6e040296602"),
  "maltese":                      UNSPLASH("photo-1621878135994-8b56a55d4af5"),
  "weimaraner":                   UNSPLASH("photo-1567856481823-b0e89457f52a"),

  // Added June 2026 — remaining top-priority cat breeds
  "persian":                      UNSPLASH("photo-1591429939960-b7d5add10b5c"),
  "siamese":                      UNSPLASH("photo-1568152950566-c1bf43f4ab28"),
  "british-shorthair":            UNSPLASH("photo-1599156616188-38c914c6ccad"),
  "abyssinian":                   UNSPLASH("photo-1598005532299-f48db04a2637"),
  "russian-blue":                 UNSPLASH("photo-1602268867508-b058cb9c3e99"),
  "sphynx":                       UNSPLASH("photo-1547565322-847851d7ef2f"),
  "norwegian-forest":             UNSPLASH("photo-1653744060485-2a4ded2b00c3"),
  "birman":                       UNSPLASH("photo-1632041068365-215243fd40f0"),
  "burmese":                      UNSPLASH("photo-1547960450-2ea08b931270"),

  // Added June 2026 — long-tail dog breeds, batch 1 (A)
  "affenpinscher":                UNSPLASH("photo-1630063812164-fe6e50f2ad49"),
  "afghan-hound":                 UNSPLASH("photo-1588269845464-8993565cac3a"),
  "airedale-terrier":             UNSPLASH("photo-1675178898454-f92e52ec9226"),
  "akita":                        UNSPLASH("photo-1691971514997-e414390a2d3b"),
  "alaskan-malamute":             UNSPLASH("photo-1543333108-4f3e0f5a7d11"),

  // Added June 2026 — long-tail dog breeds, batch 2 (A continued)
  "anatolian-shepherd-dog":        UNSPLASH("photo-1762192584614-7cfbb3ea8966"),
  "australian-cattle-dog":         UNSPLASH("photo-1602431694956-0da68eb649b4"),
  "australian-terrier":            UNSPLASH("photo-1647445024848-907e1edd1072"),
  "australian-silky-terrier":      UNSPLASH("photo-1726416709320-315c591b7482"),
  "azawakh":                       UNSPLASH("photo-1583786693544-e352f898888d"),

  // Added June 2026 — long-tail dog breeds, batch 3 (B)
  "basenji":                       UNSPLASH("photo-1604319781834-9cb373738599"),
  "basset-hound":                  UNSPLASH("photo-1619754226841-99b374dccbc0"),
  "bearded-collie":                UNSPLASH("photo-1594811851726-fa98b36ff029"),
  "beauceron":                     UNSPLASH("photo-1561772586-6e9e10c6791b"),

  // Added June 2026 — long-tail dog breeds, batch 4 (B continued)
  "belgian-shepherd-dog-groenendael": UNSPLASH("photo-1572040347107-5758abf3ac4e"),
  "belgian-shepherd-dog-malinois":    UNSPLASH("photo-1599826023510-a98d08764aec"),
  "belgian-shepherd-dog-tervueren":   UNSPLASH("photo-1655235208121-3f09c8cebc79"),
  "bergamasco-shepherd-dog":          UNSPLASH("photo-1774853974216-af9446111a65"),
  "bloodhound":                       UNSPLASH("photo-1616725693607-158e2b9781e1"),

  // Added June 2026 — long-tail dog breeds, batch 5 (B continued)
  "bichon-frise":                     UNSPLASH("photo-1587539975099-5aecb74902d4"),
  "bolognese":                        UNSPLASH("photo-1560132248-d946352460e3"),
  "border-terrier":                   UNSPLASH("photo-1604833124060-7f81db9c38de"),
  "boston-terrier":                   UNSPLASH("photo-1623010830364-860f2c821d5d"),

  // Added June 2026 — long-tail dog breeds, batch 6 (B continued)
  "border-collie":                    UNSPLASH("photo-1610380403786-fe1d70ead50d"),
  "bouvier-des-flandres":             UNSPLASH("photo-1768768225020-1158f3e6cc35"),
  "boxer":                            UNSPLASH("photo-1529158299404-547993c51cc7"),
  "bracco-italiano":                  UNSPLASH("photo-1591809852955-b391ea5a90c7"),
  "briard":                           UNSPLASH("photo-1633327273196-de1e0e9b01e3"),
  "brittany":                         UNSPLASH("photo-1554984908-85d5698d1628"),

  // Added June 2026 — long-tail dog breeds, batch 7
  "basset-bleu-de-gascogne":          UNSPLASH("photo-1758398061812-b519e7069adc"),
  "basset-griffon-vendeen-grand":     UNSPLASH("photo-1554842863-766951f51658"),
  "basset-griffon-vendeen-petit":     UNSPLASH("photo-1617748418149-1c5f78b8ac6e"),

  // Added June 2026 — long-tail dog breeds, batch 8
  "bull-terrier":                     UNSPLASH("photo-1549608536-d2ad340085f8"),
  "bull-terrier-miniature":           UNSPLASH("photo-1585060423772-a39f0b543c61"),
  "english-bulldog":                  UNSPLASH("photo-1598282506352-db1cdeaf834c"),
  "british-bulldog":                  UNSPLASH("photo-1648047404073-a771e51b7851"),
  "bulldog":                          UNSPLASH("photo-1611611158876-41699b77a059"),

  // Added June 2026 — long-tail dog breeds, batch 9
  "bullmastiff":                      UNSPLASH("photo-1677899997050-950369b117b2"),
  "cairn-terrier":                    UNSPLASH("photo-1780186662252-541efe20d5c7"),
  "cane-corso":                       UNSPLASH("photo-1675025328986-206b1192a557"),
  "cardigan-welsh-corgi":             UNSPLASH("photo-1654535871917-baece3920f1b"),

  // Added June 2026 — long-tail dog breeds, batch 10
  "central-asian-shepherd-dog":       UNSPLASH("photo-1617181804237-3371bac65af7"),
  "chesapeake-bay-retriever":         UNSPLASH("photo-1609038457060-a11114445bad"),
  "chihuahua-long-coat":              UNSPLASH("photo-1555523940-8c7a0233a104"),
  "chihuahua-smooth-coat":            UNSPLASH("photo-1608228028188-acdf9ebd3044"),
  "chow-chow":                        UNSPLASH("photo-1642711512184-d4933d282ccd"),

  // Added June 2026 — long-tail dog breeds, batch 11
  "cesky-terrier":                    UNSPLASH("photo-1781062565114-d645e6ee026e"),
  "chinese-crested":                  UNSPLASH("photo-1769169876441-587d5f12a116"),

  // Added June 2026 — long-tail dog breeds, batch 12
  "cocker-spaniel":                   UNSPLASH("photo-1580905767068-18809fd88640"),
  "collie-rough":                     UNSPLASH("photo-1587300003388-59208cc962cb"),
  "collie-smooth":                    UNSPLASH("photo-1606390026124-a89c154c2570"),
  "shar-pei":                         UNSPLASH("photo-1664474205071-82d0b93bdca1"),

  // Added June 2026 — long-tail dog breeds, batch 13
  "curly-coated-retriever":           UNSPLASH("photo-1645941088606-cd887502b734"),
  "dalmatian":                        UNSPLASH("photo-1626435872669-8bcb32be46dc"),
  "dogue-de-bordeaux":                UNSPLASH("photo-1567886932351-19e78e3e56c8"),
  "dutch-shepherd-dog":               UNSPLASH("photo-1667396211009-743a02559601"),

  // Added June 2026 — long-tail dog breeds, batch 14
  "english-springer-spaniel":         UNSPLASH("photo-1579213838826-51de388c360c"),
  "entlebucher-mountain-dog":         UNSPLASH("photo-1652465130595-95b78f57208b"),
  "eurasier":                         UNSPLASH("photo-1711217012935-859598ad35ed"),
  "field-spaniel":                    UNSPLASH("photo-1780715619323-91ee169a6f10"),

  // Added June 2026 — long-tail dog breeds, batch 15
  "dandie-dinmont-terrier":            UNSPLASH("photo-1585866139885-0dff14c14090"),
  "deerhound":                         UNSPLASH("photo-1779108907238-4de3f83f06c6"),
  "finnish-spitz":                     UNSPLASH("photo-1653933180968-276b11861997"),
  "flat-coated-retriever":             UNSPLASH("photo-1644076829117-33c549118444"),

  // Added June 2026 — long-tail dog breeds, batch 16
  "english-setter":                    UNSPLASH("photo-1775841019106-df88a5416e94"),
  "fox-terrier-wire":                  UNSPLASH("photo-1761338928221-d55054530e98"),

  // Added June 2026 — long-tail dog breeds, batch 17
  "giant-schnauzer":                   UNSPLASH("photo-1623763300849-1c5c8cbc5f56"),
  "gordon-setter":                     UNSPLASH("photo-1746781878900-468f8f6a76a3"),

  // Added June 2026 — long-tail dog breeds, batch 18
  "german-spitz-klein":                UNSPLASH("photo-1636733008726-9c8b41059c86"),
  "german-spitz-mittel":               UNSPLASH("photo-1629980263158-be45c249a0f9"),
  "greyhound":                         UNSPLASH("photo-1549355517-0a46fac40ff1"),
  "havanese":                          UNSPLASH("photo-1758875619166-a00ac1650ce4"),

  // Added June 2026 — long-tail dog breeds, batch 19
  "grand-basset-griffon-vendeen":      UNSPLASH("photo-1758398061812-b519e7069adc"),
  "griffon-bruxellois":                UNSPLASH("photo-1576873689391-60d690f6f930"),
  "hungarian-vizsla":                  UNSPLASH("photo-1618398130625-4dbbd7488847"),

  // Added June 2026 — long-tail dog breeds, batch 20
  "hungarian-wire-haired-vizsla":      UNSPLASH("photo-1699196722505-2cd2be4f6a39"),
  "irish-setter":                      UNSPLASH("photo-1671011401064-a25edcaa827c"),
  "irish-terrier":                     UNSPLASH("photo-1607964296542-54d29168d2c4"),
  "irish-water-spaniel":               UNSPLASH("photo-1648976286905-2f77ed1eb58c"),
  "irish-wolfhound":                   UNSPLASH("photo-1579636138927-1896a29be1e2"),
  "italian-greyhound":                 UNSPLASH("photo-1633835080106-0832760e904b"),

  // Added June 2026 — long-tail dog breeds, batch 21
  "hungarian-pumi":                    UNSPLASH("photo-1592592836163-8cac4564d674"),
  "italian-spinone":                   UNSPLASH("photo-1628105123823-cc268214bc07"),
  "jack-russell-terrier":              UNSPLASH("photo-1532275522382-fc0742e109d9"),

  // Added June 2026 — long-tail dog breeds, batch 22
  "japanese-akita":                    UNSPLASH("photo-1691971514997-e414390a2d3b"),
  "japanese-chin":                     UNSPLASH("photo-1559612963-6852ec2a6f07"),
  "japanese-shiba-inu":                UNSPLASH("photo-1578133507770-a35cc3c786e6"),

  // Added June 2026 — long-tail dog breeds, batch 23
  "finnish-lapphund":                  UNSPLASH("photo-1665596594542-2df61cedad97"),
  "japanese-spitz":                    UNSPLASH("photo-1623253061281-454d99964c9e"),

  // Added June 2026 — long-tail dog breeds, batch 24
  "hovawart":                          UNSPLASH("photo-1593944240078-4ff256a26ff3"),
  "german-pinscher":                   UNSPLASH("photo-1614613414597-73d23d02abd4"),

  // Added June 2026 — long-tail dog breeds, batch 25
  "fox-terrier-smooth":                UNSPLASH("photo-1558309887-705acbec8733"),

  // Added June 2026 — long-tail cat breeds, batch 1
  "american-bobtail":                  UNSPLASH("photo-1612531822780-ce3193485c08"),
  "american-curl":                     UNSPLASH("photo-1626872295737-bb17a7d45cac"),
  "american-wirehair":                 UNSPLASH("photo-1737837052476-6579dca81af3"),

  // Added June 2026 — long-tail cat breeds, batch 2
  "australian-mist":                   UNSPLASH("photo-1778503240192-2515dec71876"),
  "balinese":                          UNSPLASH("photo-1779489640817-b9b38f97ba0b"),
  "bombay":                            UNSPLASH("photo-1597366431550-7b151ed08c75"),

  // Added June 2026 — long-tail cat breeds, batch 3
  "american-bobtail-shorthair":        UNSPLASH("photo-1614381016538-5f80a0852fea"),
  "american-curl-longhair":            UNSPLASH("photo-1455970022149-a8f26b6902dd"),
  "bengal-longhair":                   UNSPLASH("photo-1603277160434-df7471138363"),

  // Added June 2026 — long-tail cat breeds, batch 4
  "british-longhair":                  UNSPLASH("photo-1617696448256-e92b5761bea3"),
  "burmilla":                           UNSPLASH("photo-1561948946-cb70f9e73ca5"),
  "burmilla-longhair":                 UNSPLASH("photo-1585137173132-cf49e10ad27d"),

  // Added June 2026 — long-tail cat breeds, batch 5
  "chartreux":                          UNSPLASH("photo-1570117268106-8e369647c733"),
  "chausie":                            UNSPLASH("photo-1619678791375-7f35c6e8599c"),
  "cymric":                             UNSPLASH("photo-1612532275214-e4ca76d0e4d1"),

  // Added June 2026 — long-tail cat breeds, batch 6
  "cornish-rex":                        UNSPLASH("photo-1606464584000-0d7178815c7e"),
  "donskoy":                            UNSPLASH("photo-1701007268888-3725e298c6db"),
  "exotic-shorthair":                   UNSPLASH("photo-1516470544373-df3edeb89d80"),

  // Added June 2026 — long-tail cat breeds, batch 7
  "devon-rex":                          UNSPLASH("photo-1767884267033-4e832b3055f9"),

  // Added June 2026 — long-tail cat breeds, batch 8
  "egyptian-mau":                       UNSPLASH("photo-1608848461950-0fe51dfc41cb"),

  // Added June 2026 — long-tail cat breeds, batch 9
  "himalayan":                          UNSPLASH("photo-1705305413876-b2bb916fb99a"),

  // Added June 2026 — long-tail cat breeds, batch 10
  "korat":                              UNSPLASH("photo-1649472729650-9803247c67d7"),

  // Added June 2026 — long-tail cat breeds, batch 11
  "khaomanee":                          UNSPLASH("photo-1585699777545-355976789272"),

  // Added June 2026 — long-tail cat breeds, batch 12
  "manx":                               UNSPLASH("photo-1612632237538-2de30e25af6f"),
  "munchkin":                           UNSPLASH("photo-1596854407944-bf87f6fdd49e"),

  // Added June 2026 — long-tail cat breeds, batch 13
  "nebelung":                           UNSPLASH("photo-1534803359379-964dadf6c290"),
  "ocicat":                             UNSPLASH("photo-1692900736092-1965c8b3313a"),

  // Added June 2026 — long-tail cat breeds, batch 14
  "snowshoe":                           UNSPLASH("photo-1549878569-a8105b1188b8"),
  "somali":                             UNSPLASH("photo-1593017905337-791cd7820b06"),

  // Added June 2026 — long-tail cat breeds, batch 15
  "siberian":                           UNSPLASH("photo-1542279836-8369a296a95b"),
  "turkish-angora":                     UNSPLASH("photo-1593627010886-d34828365da7"),
  "turkish-van":                        UNSPLASH("photo-1606736627934-7b647180530f"),

  // Added June 2026 — long-tail cat breeds, batch 16
  "tonkinese":                          UNSPLASH("photo-1680110847149-80f03b99ac8d"),
  "thai":                               UNSPLASH("photo-1568152950566-c1bf43f4ab28"),

  // Added June 2026 — long-tail cat breeds, batch 17
  "serengeti":                          UNSPLASH("photo-1614873378890-8a880515b724"),
  "selkirk-rex":                        UNSPLASH("photo-1614168882266-4bcc7522feae"),

  // Added June 2026 — long-tail cat breeds, batch 18
  "oriental-shorthair":                 UNSPLASH("photo-1612467669054-4a7101fed458"),

  // Added June 2026 — long-tail cat breeds, batch 19
  "oriental-longhair":                  UNSPLASH("photo-1550921482-1dfcceed3452"),
  "japanese-bobtail":                   UNSPLASH("photo-1503777119540-ce54b422baff"),

  // Added June 2026 — long-tail cat breeds, batch 20
  "scottish-fold":                      UNSPLASH("photo-1595433708220-3aa013e5e43f"),
  "scottish-fold-longhair":             UNSPLASH("photo-1634206332775-3da1b8b3c73c"),
  "scottish-straight":                  UNSPLASH("photo-1513451713350-dee890297c4a"),
  "scottish-straight-longhair":         UNSPLASH("photo-1525785967371-87ba44b3e6cf"),
  "minuet":                             UNSPLASH("photo-1515002246390-7bf7e8f87b54"),
  "minuet-longhair":                    UNSPLASH("photo-1455970022149-a8f26b6902dd"),

  // Added June 2026 — long-tail cat breeds, batch 21 (final cats)
  "japanese-bobtail-longhair":          UNSPLASH("photo-1778436193884-3fc534c811d8"),

  // Added June 2026 — long-tail dog breeds, batch 22
  "pug":                                UNSPLASH("photo-1523626752472-b55a628f1acc"),
  "mastiff":                            UNSPLASH("photo-1584128144719-15c684fbcb3b"),
  "newfoundland":                       UNSPLASH("photo-1742007019876-1de27c7d70a6"),
  "old-english-sheepdog":               UNSPLASH("photo-1622536623059-8277a04654f5"),
  "komondor":                           UNSPLASH("photo-1697194585884-6e5967b4347b"),


  // Wikimedia Commons verified photos — batch 1 (high-traffic mascots + dup fixes)
  "whippet":                          WIKI("7/76/Whippet_2018_6.jpg"),
  "samoyed":                          WIKI("1/18/Samojed00.jpg"),
  "rhodesian-ridgeback":              WIKI("0/01/Rhodesian_ridgeback.jpg"),
  "west-highland-white-terrier":      WIKI("2/2c/West_Highland_White_Terrier_Krakow.jpg"),
  "scottish-terrier":                 WIKI("0/07/Scottish_Terrier_Photo_of_Face.jpg"),
  "pekingese":                        WIKI("2/24/1AKC_Pekingese_Dog_Show_2011.jpg"),
  "keeshond":                         WIKI("2/26/Keeshond_Majic_standing_cropped.jpg"),
  "leonberger":                       WIKI("7/76/Leonberger_male.jpg"),
  "lhasa-apso":                       WIKI("8/87/Aishia.jpg"),
  "shetland-sheepdog":                WIKI("b/b5/Shetland_Sheepdog_sable.jpg"),
  "schipperke":                       WIKI("5/58/Schipperke0001.jpg"),
  "saluki":                           WIKI("3/31/Red_Smooth_Saluki.jpg"),
  "estrela-mountain-dog":             WIKI("1/1c/Estrela_Mountain_Dog_6_month_old_male.jpg"),
  "basset-fauve-de-bretagne":         WIKI("a/ad/Basset_Fauve_de_Bretagne_600.jpg"),
  "kurilian-bobtail":                 WIKI("7/71/KURILIAN_BOBTAIL_Maschio_Veika_2011_(cropped).JPG"),
  "kurilian-bobtail-longhair":        WIKI("7/71/KURILIAN_BOBTAIL_Maschio_Veika_2011_(cropped).JPG"),


  // Dachshund — distinct photo per coat type (was 6x the same image)
  "dachshund-smooth-haired":          WIKI("f/fd/Dachshund_Liver_and_Tan.jpg"),
  "dachshund-miniature-smooth-haired":WIKI("f/fd/Dachshund_Liver_and_Tan.jpg"),
  "dachshund-long-haired":            WIKI("f/f7/Std_Dachshund_600.jpg"),
  "dachshund-miniature-long-haired":  WIKI("f/f7/Std_Dachshund_600.jpg"),
  "dachshund-wire-haired":            WIKI("6/69/Wire-Haired_Standard_Dachshund_(15688246980).jpg"),
  "dachshund-miniature-wire-haired":  WIKI("6/69/Wire-Haired_Standard_Dachshund_(15688246980).jpg"),


  // Replaced weak/incorrect source photos with verified Wikimedia (audit)
  "borzoi":                           WIKI("d/de/Chart_rosyjski_borzoj_rybnik-kamien_pl.jpg"),
  "ibizan-hound":                     WIKI("e/ef/Podenco_z_ibizy_645.jpg"),
  "icelandic-sheepdog":               WIKI("7/74/Icelandic_Sheepdog_Alisa_von_Lehenberg.jpg"),
  "bavarian-mountain-hound":          WIKI("5/5d/Zoran_Spod_Ruskiej_Granicy_the_Bavarian_Mountain_Hound.jpg"),
  "hungarian-puli":                   WIKI("a/a2/Ch_Prydain_Nuzzle_Fuzzle,_NA,OAJ,HT.jpg"),
  "barbet":                           WIKI("8/89/Barbet-brown.jpg"),


  // ── Batch: remaining mascot replacements (Wikipedia/Wikimedia verified) ──
  "pharaoh-hound":                      WIKI("5/51/Pies_faraona_e34.jpg"),
  "kooikerhondje":                      WIKI("f/f0/Kooiker03.jpg"),
  "hungarian-kuvasz":                   WIKI("7/76/Kuvasz_named_Kan.jpg"),
  "clumber-spaniel":                    WIKI("4/40/Clumber_spaniel_rybnik_kamien_pppl.jpg"),
  "norwegian-lundehund":                WIKI("1/10/Lundehund-2003.jpg"),
  "parson-russell-terrier":             WIKI("f/fe/05052881_PRT_braun_rau.jpg"),
  "german-wirehaired-pointer":          WIKI("2/25/Dan_vom_hardenberg_%28cropped%29.jpg"),
  "korean-jindo":                       WIKI("3/38/ARIRANG.jpg"),
  "bedlington-terrier":                 WIKI("f/fe/Boutchie_apres_championnat_004.JPG"),
  "lakeland-terrier":                   WIKI("7/78/Lakeland_Terrier.jpg"),
  "english-toy-terrier-black-tan":      WIKI("c/ca/ENGLISH_TOY_TERRIER%2C_NO_JV-14_NO_UCH_X-Pected_Dine_Mites_X-Factor_%2823995274170%29.jpg"),
  "irish-red-and-white-setter":         WIKI("0/04/Irish_Red_And_White_Setter_2005.jpg"),
  "hamiltonstovare":                    WIKI("5/52/Hamiltonstovare_600.jpg"),
  "kerry-blue-terrier":                 WIKI("f/f4/Kerry_Blue_Terrier.jpg"),
  "norwich-terrier":                    WIKI("d/db/Norwichterrier.jpg"),
  "nova-scotia-duck-tolling-retriever": WIKI("6/67/Duck_Toller.jpg"),
  "miniature-pinscher":                 WIKI("a/a1/Miniature_pinscher.jpg"),
  "norwegian-elkhound":                 WIKI("3/32/Elkhound2020_%28cropped%29.jpg"),
  "pointer":                            WIKI("8/85/English_Pointer_orange-white.jpg"),
  "king-charles-spaniel":               WIKI("b/bc/King_Charles_Spaniel_200.jpg"),
  "glen-of-imaal-terrier":              WIKI("d/d4/Blue_Brindle_Adult_Glen_of_Imaal_Terrier.jpg"),
  "otterhound":                         WIKI("5/5f/Two_otterhounds.jpg"),
  "norfolk-terrier":                    WIKI("b/be/Norfolk_terrier_CAC.jpg"),
  "polish-lowland-sheepdog":            WIKI("2/22/Polski_owczarek_nizinny_rybnik-kamien_pl.jpg"),
  "lowchen":                            WIKI("4/47/Adult_Lowchen_Gaiting.jpg"),
  "coton-de-tulear":                    WIKI("b/bd/Coton_de_Tular_1.jpg"),
  "lancashire-heeler":                  WIKI("2/21/Grupp_1%2C_LANCASHIRE_HEELER%2C_NO_UCH_NO_V-14_NO_V-15_SE_UCH_St%C3%A5hlskyttens_Longed_For_Antony_%2824284065606%29.jpg"),
  "lagotto-romagnolo":                  WIKI("c/cc/Bellalagotto4.jpg"),
  "norwegian-buhund":                   WIKI("3/3b/Norwegian_Buhund_600.jpg"),
  "canaan-dog":                         WIKI("f/fe/CanaanDogChakede.jpg"),
  "manchester-terrier":                 WIKI("6/62/Mancherster_Terrier.jpg"),
  "neapolitan-mastiff":                 WIKI("c/cd/Mastino_sylwetka.jpg"),
  "sloughi":                            WIKI("f/f5/Sloughi_male.jpg"),
  "pyrenean-mountain-dog":              WIKI("0/02/Great_Pyrenees_Mountain_Dog_2.png"),
  "pyrenean-sheepdog-long-haired":      WIKI("5/5d/Berger-des-Pyrenees_Ellea_800x600.jpg"),
  "portuguese-water-dog":               WIKI("0/09/C%C3%A3o_de_agua_Portugu%C3%AAs_2.jpg"),
  "sealyham-terrier":                   WIKI("1/15/SealyhamTerrier01.jpg"),
  "russian-black-terrier":              WIKI("b/bd/Wystawa_Rybnik_02.10.2011_czarny_terier_rosyjski_2pl.jpg"),
  "schnauzer":                          WIKI("3/35/Standard_Grey_Schnauzer_%28cropped%29.JPG"),
  "portuguese-podengo":                 WIKI("6/6b/Evitarocks_%28cropped%29.jpg"),
  "portuguese-pointer":                 WIKI("6/60/Portuguesepointer2.jpg"),
  "skye-terrier":                       WIKI("6/61/Skye_terrier_800.jpg"),
  "spanish-water-dog":                  WIKI("2/2a/Perro_agua_%28cropped%29.jpg"),
  "pyrenean-mastiff":                   WIKI("6/68/MasPiri-Lula-ESP.jpg"),
  "russian-toy":                        WIKI("6/6f/RusskiyToyWelpe9Mon.JPG"),
  "swedish-vallhund":                   WIKI("0/03/V%C3%A4stg%C3%B6taspets_hane_5_%C3%A5r.jpg"),
  "xoloitzcuintle-mexican-hairless":    WIKI("b/bb/BIR_Grupp_5-_MEXIKANSK_NAKENHUND%2C_Lokal_Hero%E2%80%99s_King_Og_Hart%E2%80%99s_Istas_%2823607403303%29.jpg"),
  "staffordshire-bull-terrier":         WIKI("d/de/%D7%A1%D7%90%D7%98%D7%A3_%D7%90%D7%A0%D7%92%D7%9C%D7%99.jpg"),
  "poodle-miniature":                   WIKI("f/f8/Full_attention_%288067543690%29.jpg"),
  "welsh-terrier":                      WIKI("7/7c/Terier_walijski_suka_2009_pl.jpg"),
  "tibetan-mastiff":                    WIKI("c/c1/BIR_Grupp_2-_TIBETANSK_MASTIFF%2C_Legenda_Tibeta_Temudzhin_%2823938629470%29.jpg"),
  "pitbull":                            WIKI("b/b0/001_American_Pit_Bull_Terrier.jpg"),
  "white-swiss-shepherd-dog":           WIKI("3/3e/Kandestack_62406.jpg"),
  "tibetan-terrier":                    WIKI("5/59/Tibet_Terrier_Bennie_%28cropped%29.jpg"),
  "maremma-sheepdog":                   WIKI("3/35/Pastore_Maremmano-Abruzzese%2C_young_dog_%28cropped%29.jpg"),
  "welsh-springer-spaniel":             WIKI("a/ab/Welsh_Springer_Spaniel_1.jpg"),
  "sussex-spaniel":                     WIKI("c/c9/Sussex_spaniel_t43.jpg"),
  "swedish-lapphund":                   WIKI("0/0f/Svensk_lapphund.JPG"),
  "havana":                             WIKI("b/b6/Havana_kittens.jpg"),
  "singapura":                          WIKI("3/3b/Singapura_Cats.jpg"),
  "pixiebob":                           WIKI("8/8c/Jarnac_Bepacific_feb07.jpg"),
  "savannah":                           WIKI("c/c4/Savannah_Cat_portrait.jpg"),
  "peterbald":                          WIKI("b/b7/Tamila_the_lilac_tabby_Peterbald_cat.jpg"),
  "toyger":                             WIKI("c/ca/Toyger_-_Cornish_Rex_presentation_show_Riihim%C3%A4ki_2008-11-16_IMG_0101.JPG"),
  "cherubim":                           WIKI("f/f3/20050922AmarilloRes.jpg"),
  "laperm":                             WIKI("e/e1/Laperm_LH_blacktortie_white.jpg"),
  "lykoi":                              WIKI("1/1e/8-month-old_male_Lykoi.jpg"),
  "toybob":                             WIKI("7/7a/TOB_Velena-Kutc_%2815818956518%29_%28cropped%29.jpg"),
  "papillon":                           WIKI("3/3b/Papillon-dog-black.jpg"),
  "tosa":                               WIKI("c/c4/Tosa_Inu_-_Boss.jpg"),
  "segugio-italiano":                   WIKI("6/6d/Segugioitalianopelorasofulvo.JPG"),
  "soft-coated-wheaten-terrier":        WIKI("d/d8/Soft_Coated_Wheaten_Terrier_600.jpg"),
  "perro-de-presa-canario":             WIKI("8/8f/Perro_de_Presa_Canario_2006_pl.jpg"),
  "tibetan-spaniel":                    WIKI("3/38/Tibetansk_spaniel.jpg"),
  "slovakian-rough-haired-pointer":     WIKI("1/1e/Wyzel_slowacki_szorstkowlosy_rybnik-kamien_pl.jpg"),
  "belgian-shepherd-dog-laekenois":     WIKI("a/ad/Belgian_Laekenois_600.jpg"),
  "staffy":                             WIKI("d/de/%D7%A1%D7%90%D7%98%D7%A3_%D7%90%D7%A0%D7%92%D7%9C%D7%99.jpg"),
  "puli":                               WIKI("a/a2/Ch_Prydain_Nuzzle_Fuzzle,_NA,OAJ,HT.jpg"),
  "pixiebob-longhair":                  WIKI("8/8c/Jarnac_Bepacific_feb07.jpg"),
  "laperm-shorthair":                   WIKI("e/e1/Laperm_LH_blacktortie_white.jpg"),
  "pyrenean-sheepdog-smooth-faced":     WIKI("5/5d/Berger-des-Pyrenees_Ellea_800x600.jpg"),
  // Variant breeds reusing a verified photo of the same animal
  "husky":                              UNSPLASH("photo-1563889362352-b0492c224f62"),
  "yorkie":                             UNSPLASH("photo-1574760112346-8443c3773437"),
  "maine-coon-polydactyl":              UNSPLASH("photo-1685271286659-c83faa4f5cb1"),
  "munchkin-longhair":                  UNSPLASH("photo-1596854407944-bf87f6fdd49e"),
  "selkirk-rex-longhair":               UNSPLASH("photo-1614168882266-4bcc7522feae"),
  "st-bernard":                         WIKI("4/44/Saint-bernard-standing.jpg"),
  "poodle-toy":                         WIKI("1/11/White_Toy_poodle.jpg"),
  "highlander":                         WIKI("4/4e/2017-Highlander-Cat-Sherlock.jpg"),
  "highlander-shorthair":               WIKI("4/4e/2017-Highlander-Cat-Sherlock.jpg"),
};

// Per-breed object-position overrides for the real photos above — lets us
// re-centre the crop when the subject isn't dead-centre in the source photo.
// Defaults to "center" if not listed here.
// Per-breed object-position overrides. With imgix `crop=faces` now centring
// the animal's face server-side, the CSS default of "center" is correct for
// almost everything — add an entry here only for the rare photo that still
// needs nudging after the server-side crop.
export const realBreedPhotoPosition: Record<string, string> = {
  "dachshund-smooth-haired": "75% 50%",
  "dachshund-miniature-smooth-haired": "75% 50%",
  "dachshund-long-haired": "28% 50%",
  "dachshund-miniature-long-haired": "28% 50%",
  "dachshund-wire-haired": "25% 50%",
  "dachshund-miniature-wire-haired": "25% 50%",
};

const DEFAULT_DOG_IMG = DC("retriever-labrador", "n02099712_4323.jpg");
const DEFAULT_CAT_IMG = WM("1","18","Cat_August_2010-4.jpg");

export function getBreedImage(breedId: string, petType: "dog" | "cat"): string {
  if (petType === "dog") {
    return dogBreedImageMap[breedId] ?? DEFAULT_DOG_IMG;
  }
  return catBreedImageMap[breedId] ?? DEFAULT_CAT_IMG;
}
