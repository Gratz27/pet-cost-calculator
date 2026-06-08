# PetCost Breed Mascot Images

Place breed mascot PNGs here. Filename = breed slug + `.png`.

Examples:
  golden-retriever.png
  french-bulldog.png
  domestic-shorthair.png

## Naming Convention
- Lowercase kebab-case matching the breed's URL slug
- PNG format, square (512×512 or 1024×1024 recommended)
- Transparent background preferred

## Priority Breeds (generate these first)
### Dogs
golden-retriever, labrador-retriever, french-bulldog, german-shepherd, poodle-standard,
beagle, border-collie, chihuahua, siberian-husky, cavoodle, dachshund, shih-tzu

### Cats
domestic-shorthair, persian, maine-coon, ragdoll, siamese, british-shorthair, bengal, sphynx

## DALL-E Prompt Template
Replace [BREED NAME] and [TYPE] (dog/cat):

```
A friendly cartoon mascot illustration of a [BREED NAME] [TYPE] in a modern mascot style.
Slightly oversized expressive eyes, friendly smile, rounded features, clean outlines, soft shading,
breed-specific details. Flat vector colouring, bright but professional. Transparent background.
Style: friendly veterinary clinic meets Pixar — clean, warm, not childish.
Square format, PNG. No text, no background scenery.
The [TYPE] is sitting, facing slightly forward, happy expression, wearing a simple collar.
```

## How the site uses these images
The BreedImage component (components/BreedImage.tsx) automatically loads
/breeds/[slug].png for any breed. If the file doesn't exist, a branded
paw-print placeholder is shown — so it's safe to add images incrementally.
