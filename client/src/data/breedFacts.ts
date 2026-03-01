export interface BreedFact {
  id: string;
  fact: string;
}

export const breedFacts: Record<string, string> = {
  // Dogs
  'labrador-retriever': 'Labradors are the most popular dog breed in the US, UK, and Canada. They were originally bred as fishing dogs in Newfoundland!',
  'french-bulldog': 'French Bulldogs can\'t swim due to their heavy front bodies, so keep them away from deep water. They are also known as "Frog Dogs" because of how they lay!',
  'golden-retriever': 'Golden Retrievers are known to have "soft mouths," meaning they can carry a raw egg in their mouth without breaking it.',
  'german-shepherd': 'German Shepherds are the third most intelligent dog breed, capable of learning a new command after just 5 repetitions.',
  'poodle': 'Poodles come in three sizes (Standard, Miniature, Toy) but are all the same breed. Their fancy haircut was originally designed to keep their joints warm in cold water!',
  'bulldog': 'Bulldogs were originally bred for bull-baiting, but today they are one of the gentlest and most affectionate family companions.',
  'beagle': 'Beagles have approximately 220 million scent receptors, compared to about 5 million in humans. Their ears help trap scents around their nose!',
  'rottweiler': 'Rottweilers were originally used to herd livestock and pull carts for butchers. They are one of the oldest herding breeds.',
  'dachshund': 'Dachshund means "badger dog" in German. Their long bodies were bred to help them dig into badger dens.',
  'corgi': 'Pembroke Welsh Corgis are the favorite breed of Queen Elizabeth II, who owned over 30 of them during her reign.',
  'siberian-husky': 'Huskies can run up to 100 miles per day. Their thick double coat keeps them warm in temperatures as low as -60°F (-51°C).',
  'great-dane': 'Despite their massive size, Great Danes are often called "gentle giants" and believe they are lap dogs.',
  'doberman-pinscher': 'Dobermans were originally bred by a tax collector named Louis Dobermann to protect him while he made his rounds.',
  'australian-shepherd': 'Australian Shepherds are actually from the United States, not Australia! They were bred by Basque shepherds who emigrated to the US.',
  'shih-tzu': 'The name "Shih Tzu" means "Lion Dog." They were bred to be companions for Chinese royalty and lived in palaces.',
  'boxer': 'Boxers are named for their habit of standing on their hind legs and "boxing" with their front paws when playing.',
  'cavalier-king-charles-spaniel': 'This breed was named after King Charles II, who reportedly never went anywhere without at least two or three of these spaniels.',
  'pug': 'Pugs are one of the oldest dog breeds, dating back to 400 B.C. They were the companions of Buddhist monks in Tibet.',
  'border-collie': 'Border Collies are widely considered the most intelligent dog breed. One Border Collie named Chaser knew over 1,000 words!',
  'chihuahua': 'Chihuahuas are the smallest dog breed in the world and are named after the Mexican state of Chihuahua.',

  // Cats
  'persian': 'Persian cats have been popular since the 1600s. They are known for their sweet, gentle nature and require daily grooming.',
  'maine-coon': 'Maine Coons are the largest domesticated cat breed. They are excellent mousers and often enjoy playing in water!',
  'ragdoll': 'Ragdolls get their name from their tendency to go limp like a ragdoll when picked up. They are known for their puppy-like behavior.',
  'siamese': 'Siamese cats are one of the oldest Asian cat breeds. They are known for being very vocal and "talking" to their owners.',
  'bengal': 'Bengals are a hybrid breed, created by crossing domestic cats with the Asian Leopard Cat. They love to climb and play fetch.',
  'sphynx': 'Sphynx cats are not actually hairless; they have a fine layer of down. They feel like warm suede and need regular baths to remove oils.',
  'british-shorthair': 'The British Shorthair is the inspiration for the Cheshire Cat in Alice in Wonderland. They are known for their "teddy bear" appearance.',
  'scottish-fold': 'All Scottish Fold cats can trace their lineage back to a single barn cat named Susie, found in Scotland in 1961.',
  'abyssinian': 'Abyssinians are one of the oldest known cat breeds, resembling the cats depicted in ancient Egyptian art.',
  'birman': 'Legend says Birmans got their blue eyes and white paws from a goddess. They are known as the "Sacred Cat of Burma".'
};

export const getBreedFact = (breedId: string, petType: 'dog' | 'cat'): string => {
  // Try to find a specific fact
  if (breedFacts[breedId]) {
    return breedFacts[breedId];
  }

  // Generic facts if no specific one exists
  const genericDogFacts = [
    'Dogs have a sense of time and can predict future events, such as regular walk times.',
    'Your dog\'s whiskers are highly sensitive touch receptors that help them navigate in the dark.',
    'Dogs curl up in a ball when they sleep to protect their organs—a holdover from their wild ancestors.',
    'A dog\'s nose print is unique, much like a human\'s fingerprint.',
    'Tail wagging has its own language. Apparently, dogs wag their tail to the right when they\'re happy and to the left when they\'re frightened.'
  ];

  const genericCatFacts = [
    'Cats spend 70% of their lives sleeping.',
    'A cat\'s ear has 32 muscles, allowing them to rotate their ears 180 degrees.',
    'Cats can jump up to six times their length.',
    'A group of kittens is called a "kindle," and a group of adult cats is called a "clowder."',
    'Cats have a specialized collarbone that allows them to always land on their feet.'
  ];

  const facts = petType === 'dog' ? genericDogFacts : genericCatFacts;
  // Use a simple hash of the breed ID to pick a consistent fact for that breed
  const index = breedId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % facts.length;
  
  return facts[index];
};
