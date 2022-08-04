const getCharacterMemo = ({ hash, name, appearance, story }) => {
  if ([hash, name, appearance, story].every((attribute) => attribute === undefined)) {
    hash = "0x0123456789abcdef0123456789abcdef0123456789"
    name = "Ally Cat"
    appearance = "Has huge shiny eyes like his father and long whiskers, dirt does not seem to stick to him."
    story = `It all began on a stormy night in September. In a dark alley behind a bagel shop in Washington DC, a stray cat gave birth to a litter of 9 kittens, the way all street cats do, alone. Within the first few weeks these kittens quickly grew into hardy street cats, under the watchful eye of their mother, all except one.
    
    With huge eyes and long whiskers, this little cat took no interest in pouncing on birds, tearing apart mice or attacking large dogs. Instead, he stared. Stared at the moon, at insects, at buildings, at pretty much everything.  He never begged, people simply fed him, and he preferred not to go out at night. 
    
    By week three his mother knew that this little cat did not belong to the streets, he never lost weight and dirt didn’t seem to stick to him.  With a heavy heart she took him aside to explain he had to leave, but before she spoke, he said, ‘Mother I love you, but I must leave.  The world is so much more this alley.  It needs exploring.’  ‘You have your father’s eyes,’ she replied. ‘Who was my father?’, he asked. She looked at him as if seeing him for the first time.  ‘He was an explorer like you, he dreamed of leaving his paw print on the moon.’ A sadness fell over the young cat’s face, ‘Will I ever find him?’  ‘You won’t if you stay here’, she smiled, as she tried to brush some dirt on to him.  ‘But before you go off into the world, you’ll need to know about the world, it isn’t always a nice place. Go to the University and use those big eyes of yours to get yourself educated.
    
    ‘Say goodbye to Scarface, Sniff, White Paw, Flees, Patch, Kink and the twins’, he smiled.  ‘Funny how we never thought of a name for me.’  And with that he was off, a glint in his eye.  
    
    ‘Never had a kitten that went to college’, his mother mused.
    `
  }
  return { hash, name, appearance, story }
}

export default getCharacterMemo