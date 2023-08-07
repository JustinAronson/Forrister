# A6: Group AFrame hangout spot

### Your name:

Justin Aronson, app: Forrister
 
 
### What were your three insights

Movement can create a cognitive load on users, so general game rules need to be somewhat reduced or simplified when the player is moving. This reminds
me a bit of playing TF2 back in the day - when I was jumping around as Scout I could only focus on where I wanted to move and subsequently missed everything

If large objects are moving in the scene, users can think that they are moving - this can cause motion sickness.

In VR, the "camera" is equivalent to your eyes - this is different than typical games where there is a bit of separation between the screen and
your body. As such, moving the camera when the user is not expected to be moved can cause motion sickness.
 
 
### Describe your app

A very cozy campfire scene, with music coming from the hut nearby and a fire to keep the users warm. It is particle heavy, with the fire being made of many individual particles.
 

### What are 3 words to capture the mood of your app

Warm, cozy, intimate
   
### How are your avatars built?

The avatars are built from various boxes that change positions depending on whether the user is sitting and/or wagging their tail. There
is also a top hat that users can put on. The speed at which the wolves wag their tails is dependent on the size of the fire. The avatars
were built to mimic minecraft wolves.

   
### What are your three ways that players can customize their avatar?

They can sit, wag their tails, and adorn a top hat.


### How do players move, and what from the readings makes you think that is safe to not trigger motion-sickness?

I think a teleport system, where you look at the area you would want to teleport to, would be safe to not trigger motion-sickness. The actual period
of movement would be relatively small, so the cognitive load would be minimized. Further, it would encourage the user to look all over the scene.
You could also teleport to upside-down surfaces, which adds to the imaginative mapping of the space.

The audio is also space dependent - the farther you get from the fire, the quiter it is. This can provide non-visual feedback to the user.


### What is your "cheese plate"? (a thing you can interact with) How will that give players something to talk about?

The fire grows when players tap it. The number of particles increases, and the sound and brightness of the fire grow as well. The water bucket
next to the fire can also put out the fire if someone clicks it. That will give players something to talk about because they can try to figure
out who put out the fire, or they could attempt to see how large they can make the fire before it causes lag (or blows out someones headphones
if the volume gets super loud).
 
 
### What is your "chat pet"? (a mode or timed event) How will that give players something to talk about?

A rain mode is triggered when someone taps the umbrella. During this mode, the fire is extinguished and you cannot interact with it.
Additionally, lightning and thunder will appear in the sky during the rain storm. This would give players something to talk about because they could
talk about dogs in the rain getting scared of thunder, or they could try in vain to ignite the fire.
 
### What postmortem did you watch, and what did they recommend for movement or interaction?

I watched the Rick and Morty postmortem. They recommended using gameplay to position players in areas that would be safe for teleportation - this way
you would not end up teleporting into geometry. They also said that if something looks interactable, it must be interactable. This came into play
when they had to design the garage door that is in the Rick and Morty show, but they were unable to make the door openable and render the rest of the
house. As such, they put in a real fake doors joke, which solves the issue of the door not being interactable.
 
  
### How can users move around your scnee

Not implemented

### Why would someone want to spend time with friends in your virtual space?

The main appeal of my app is its envoriment, atmosphere, and stylization. It provides a cozy atmosphere with a lot of environmental interaction
which can make the scene immersive. The style of the avatars and fire is also cute and pleasing to look at.
 
 
### PLAYTESTING: list 3 people who playtested your game and summarize their feedback

Daniel Zhao: The scene was a bit laggy (probably because of the large number of particles). Scene was cute and the fire was relaxing.

Ryan Newkirk: Atmosphere and sounds were strong points. Sometimes, when new avatars joined they would often briefly appear in the fire and that was funny

Samantha Morris: The avatars wagging their tails was very cute. Interacting with the fire and the sky color was engaging.


### PLAYTESTING: describe 3 games you playtested and what you learned

Coffee shop simulator: I learned that changing other people's avatar colors can be a great talking point, especially when they can see
your sceen :)

SnowPeople: I learned that moving where the camera is looking can be super intuitive in VR, but it is important that little lag exists between
pointing in a direction and moving in the same direction.

Fish in the Sea: I learned that teleportation movement controls can be non-motion sickness triggering, but that it is hard to gauge when you have teleported
if the scene background looks roughly the same from every position. Some foreground elements should be included so that surroundings can be
judged.
 
 
### VR TESTING: What did you notice most when you played "First Steps" (or other hand-tracked VR)?

I really noticed the disconnect between VR and reality. I couldn't tell what my surroundings in the real world were at all, and it was a bit
disconcerting when I took off the headset and was looking in a completely different direction than I was when I put it on.
 
### VR TESTING: How did First Steps use your hands that you couldn't replicate with a mouse/keyboard? 

First Steps allowed me to move objects in 3 dimensions. With a mouse/keyboard, there are no good ways to move objects in the z dimension.
It also allowed me to easily rotate objects in a way that seemed smooth and seamless.
 
### FINAL THOUGHTS: Do you think AR/VR will be more or less popular worldwide by next spring's class? Why?

I think that it will become more popular, especially now that Apple just released an AR headset. I think that as it becomes easier to develop
for the headsets, more people will become interested. Also, as the price of VR drops I think it will become more popular.
 
  
### FINAL THOUGHTS: Did you see anything in this class (your work, others' work, examples) that you think could really take off in VR in a way that we haven't seen before?

I feel like most of the things we are designing have been done before, in better ways, and still failed. However, I think the concept of building your own VR
spaces with relatively simple tools like A-Frame could make VR a lot more interesting. Early in the class I joked that the only way I would be able to
get my grandparents to use VR was if I developed a VR project. It came around, since I actually showed them this project. I think that simplified ways to
build VR spaces could make them a lot more popular.
 
 
### FINAL THOUGHTS: What would make VR work when it hasn't before?

I think that unintrusive AR could work. My main issue with VR is how disconnected it is from the real world - I do not like not knowing where I am in the world.
If spatial awareness was preserved when in AR/VR, I would be much more interested in using it.
 
### Shoutouts and credits

Wind Audio: https://www.soundjay.com/wind-sound-effect.html filtered with https://audiomass.co/
Tree models: https://sketchfab.com/3d-models/low-poly-tree-concept-e815f8acd6d34528a82feef38d5af880
https://sketchfab.com/3d-models/low-poly-tree-6d986e0b24b54d85a5354e5cac6207a1
https://sketchfab.com/3d-models/giant-low-poly-tree-acfd2b7f80894848b56c2ac8e7e59572
https://sketchfab.com/3d-models/spruce-tree-low-poly-b68f79aee62f4e849be265c903f724f5
Campfire model: https://sketchfab.com/3d-models/low-poly-campfire-4d0e13c9b7da40958233b4a551e30522#download
Top hat model: https://sketchfab.com/3d-models/voxel-top-hat-ea9a1d9276584ebda27f3db37fe9c52e
Santa hat model: https://sketchfab.com/3d-models/low-poly-santa-hat-7010557be50e459da9d0a2bcc0cfff4a#download
Beanie model: https://sketchfab.com/3d-models/winter-hat-637a36cb74204c719883af7feb4b7c28
Cowboy hat model: https://sketchfab.com/3d-models/low-poly-hat-60b347d669fb4d0fb9799480f6638b38
Water Bucket: https://sketchfab.com/3d-models/wooden-water-bucket-01ee5411d99d4957baf334fe7126f66a
Woodcutter hut: https://sketchfab.com/3d-models/stylised-medieval-buildings-woodcutter-hut-3ba53fe4bf9549a4a8e756ff83d65c06
Guitar Audio: https://pixabay.com/users/william_king-33448498/
Quenching Audio: https://bigsoundbank.com/sound-1697-quenching-cooling-4.html
Thunder Audio: https://elements.envato.com/thunder-8B9LWP2?utm_source=mixkit&utm_medium=referral&utm_campaign=elements_mixkit_cs_sfx_tag&_ga=2.61364268.1491620162.1685469969-830005498.1685469969
Rain Audio: https://www.soundjay.com/rain-sound-effect.html
Umbrella: https://sketchfab.com/3d-models/stylized-umbrella-0f5bf2fab1eb425dae1b58dcacba6267
Fire Audio: https://github.com/markusneuy/campfire_vr
Fire Particles: https://github.com/markusneuy/campfire_vr
Snow Particles: https://github.com/c-frame/aframe-particle-system-component/tree/master
 
### Your Glitch link
 
https://ja-arvr-a6.glitch.me/

