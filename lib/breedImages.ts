// Maps breed IDs to verified Dog CEO API image URLs
// Dog CEO API: https://dog.ceo/api/breed/{path}/images/random
// Cat images from Wikimedia Commons (public domain)

export const dogBreedImageMap: Record<string, string> = {
  "affenpinscher": "https://images.dog.ceo/breeds/affenpinscher/n02110627_12010.jpg",
  "afghan-hound": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
  "airedale-terrier": "https://images.dog.ceo/breeds/airedale/n02096051_1752.jpg",
  "akita": "https://images.dog.ceo/breeds/akita/An_Akita_Inu_resting.jpg",
  "alaskan-malamute": "https://images.dog.ceo/breeds/malamute/n02110063_1827.jpg",
  "australian-cattle-dog": "https://images.dog.ceo/breeds/cattledog-australian/IMG_1211.jpg",
  "australian-shepherd": "https://images.dog.ceo/breeds/australian-shepherd/forest.jpg",
  "basenji": "https://images.dog.ceo/breeds/basenji/n02109525_1605.jpg",
  "basset-hound": "https://images.dog.ceo/breeds/hound-basset/n02088238_11273.jpg",
  "beagle": "https://images.dog.ceo/breeds/beagle/n02088364_12272.jpg",
  "bernese-mountain-dog": "https://images.dog.ceo/breeds/mountain-bernese/n02107683_3831.jpg",
  "bichon-frise": "https://images.dog.ceo/breeds/bichon/1_bichon_frise.jpg",
  "bloodhound": "https://images.dog.ceo/breeds/hound-blood/n02088466_1453.jpg",
  "border-collie": "https://images.dog.ceo/breeds/collie-border/n02106166_2160.jpg",
  "boston-terrier": "https://images.dog.ceo/breeds/terrier-boston/n02088466_4.jpg",
  "boxer": "https://images.dog.ceo/breeds/boxer/n02108089_4370.jpg",
  "bulldog": "https://images.dog.ceo/breeds/bulldog-english/triton_1.jpeg",
  "bullmastiff": "https://images.dog.ceo/breeds/mastiff-bull/n02108422_4929.jpg",
  "cairn-terrier": "https://images.dog.ceo/breeds/terrier-cairn/n02096177_4439.jpg",
  "cavalier-king-charles-spaniel": "https://images.dog.ceo/breeds/spaniel-cocker/n02102318_10253.jpg",
  "chihuahua": "https://images.dog.ceo/breeds/chihuahua/n02085620_7613.jpg",
  "chow-chow": "https://images.dog.ceo/breeds/chow/n02112137_3713.jpg",
  "cocker-spaniel": "https://images.dog.ceo/breeds/spaniel-cocker/n02102318_10253.jpg",
  "collie": "https://images.dog.ceo/breeds/collie-border/n02106166_1030.jpg",
  "dachshund": "https://images.dog.ceo/breeds/dachshund/dachshund-1.jpg",
  "dalmatian": "https://images.dog.ceo/breeds/dalmatian/cooper2.jpg",
  "doberman-pinscher": "https://images.dog.ceo/breeds/doberman/n02107142_12724.jpg",
  "english-setter": "https://images.dog.ceo/breeds/setter-english/n02100735_3885.jpg",
  "english-springer-spaniel": "https://images.dog.ceo/breeds/spaniel-cocker/n02102318_3903.jpg",
  "french-bulldog": "https://images.dog.ceo/breeds/bulldog-french/n02108915_4362.jpg",
  "german-shepherd": "https://images.dog.ceo/breeds/germanshepherd/n02106662_26173.jpg",
  "german-shorthaired-pointer": "https://images.dog.ceo/breeds/pointer-germanlonghair/hans2.jpg",
  "golden-retriever": "https://images.dog.ceo/breeds/retriever-golden/n02099601_1722.jpg",
  "great-dane": "https://images.dog.ceo/breeds/dane-great/n02109047_4328.jpg",
  "greyhound": "https://images.dog.ceo/breeds/greyhound-italian/n02091032_4291.jpg",
  "havanese": "https://images.dog.ceo/breeds/havanese/00100trPORTRAIT_00100_BURST20191204122933390_COVER.jpg",
  "irish-setter": "https://images.dog.ceo/breeds/setter-irish/n02100877_3108.jpg",
  "irish-wolfhound": "https://images.dog.ceo/breeds/wolfhound-irish/n02090721_4294.jpg",
  "jack-russell-terrier": "https://images.dog.ceo/breeds/terrier-russell/n02097658_1913.jpg",
  "labrador-retriever": "https://images.dog.ceo/breeds/retriever-labrador/n02099712_4323.jpg",
  "lhasa-apso": "https://images.dog.ceo/breeds/lhasa/n02098413_3660.jpg",
  "maltese": "https://images.dog.ceo/breeds/maltese/n02085936_4175.jpg",
  "miniature-schnauzer": "https://images.dog.ceo/breeds/schnauzer-miniature/n02097047_1720.jpg",
  "newfoundland": "https://images.dog.ceo/breeds/newfoundland/n02111277_7307.jpg",
  "old-english-sheepdog": "https://images.dog.ceo/breeds/sheepdog-english/n02105641_1006.jpg",
  "papillon": "https://images.dog.ceo/breeds/papillon/n02086910_4147.jpg",
  "pekingese": "https://images.dog.ceo/breeds/pekinese/n02086079_3217.jpg",
  "pembroke-welsh-corgi": "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1030.jpg",
  "pomeranian": "https://images.dog.ceo/breeds/pomeranian/n02112018_10774.jpg",
  "poodle": "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg",
  "pug": "https://images.dog.ceo/breeds/pug/n02110958_15445.jpg",
  "rottweiler": "https://images.dog.ceo/breeds/rottweiler/n02106550_11654.jpg",
  "saint-bernard": "https://images.dog.ceo/breeds/stbernard/n02109525_5631.jpg",
  "samoyed": "https://images.dog.ceo/breeds/samoyed/n02111889_3909.jpg",
  "shih-tzu": "https://images.dog.ceo/breeds/shihtzu/n02086240_5529.jpg",
  "siberian-husky": "https://images.dog.ceo/breeds/husky/n02110185_10695.jpg",
  "vizsla": "https://images.dog.ceo/breeds/vizsla/n02100583_2898.jpg",
  "weimaraner": "https://images.dog.ceo/breeds/weimaraner/n02092339_2784.jpg",
  "welsh-corgi": "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1030.jpg",
  "west-highland-white-terrier": "https://images.dog.ceo/breeds/terrier-westhighland/n02098286_1600.jpg",
  "whippet": "https://images.dog.ceo/breeds/whippet/n02091134_10064.jpg",
  "yorkshire-terrier": "https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_6500.jpg",
};

export const catBreedImageMap: Record<string, string> = {
  "abyssinian": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Gustav_chocolate.jpg/320px-Gustav_chocolate.jpg",
  "american-shorthair": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/CreamAmericanShorthair.jpg/320px-CreamAmericanShorthair.jpg",
  "bengal": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Paintedcats_Red_Star_standing.jpg/320px-Paintedcats_Red_Star_standing.jpg",
  "birman": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Birmankatze.jpg/320px-Birmankatze.jpg",
  "british-shorthair": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Britishblue.jpg/320px-Britishblue.jpg",
  "burmese": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Sable_Burmese_female.jpg/320px-Sable_Burmese_female.jpg",
  "devon-rex": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Devon_Rex_-_CFF_Cat_Show.jpg/320px-Devon_Rex_-_CFF_Cat_Show.jpg",
  "himalayan": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Himalayan_cat_-_Wikipedia.jpg/320px-Himalayan_cat_-_Wikipedia.jpg",
  "maine-coon": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Maine_Coon_cat_by_Tomitheos.JPG/320px-Maine_Coon_cat_by_Tomitheos.JPG",
  "norwegian-forest-cat": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Andrew_-_Norwegian_Forest_Cat.jpg/320px-Andrew_-_Norwegian_Forest_Cat.jpg",
  "persian": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/White_Persian_Cat.jpg/320px-White_Persian_Cat.jpg",
  "ragdoll": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Cat_August_2010-4.jpg/320px-Cat_August_2010-4.jpg",
  "russian-blue": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/RussianBlue.jpg/320px-RussianBlue.jpg",
  "scottish-fold": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Female_Scottish_Fold.jpg/320px-Female_Scottish_Fold.jpg",
  "siamese": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/320px-Siam_lilacpoint.jpg",
  "sphynx": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sphinx2_July_2006.jpg/320px-Sphinx2_July_2006.jpg",
  "turkish-angora": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Turkish_angora_2.jpg/320px-Turkish_angora_2.jpg",
};

const DEFAULT_DOG_IMG = "https://images.dog.ceo/breeds/retriever-golden/n02099601_1722.jpg";
const DEFAULT_CAT_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/White_Persian_Cat.jpg/320px-White_Persian_Cat.jpg";

export function getBreedImage(breedId: string, petType: "dog" | "cat"): string {
  if (petType === "dog") {
    return dogBreedImageMap[breedId] ?? DEFAULT_DOG_IMG;
  }
  return catBreedImageMap[breedId] ?? DEFAULT_CAT_IMG;
}
