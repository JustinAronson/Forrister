/*global THREE Vue settings Terrain shuffleArray getRandom */
/*
 * A game to play with witch friends
 * Tap the fire to assign hats
 */

settings.scenes.forest = {
  stepRate: 0.2,
  
  sphereColor:"blue",
  
  roomData: {ambientLight: .3,
  skyColor: "#000000",
  
  snowTimer: 0,
  rainTimer: 0,
  fireParticles: 30,
  lightIntensity: 0.3,
  fireVolume: 0.5,
  },
    
  sitting: true,
  
  wagging: true,
  
  selectedHatType: "None",
  hatTypes: ["None", "Top Hat"],
  // Custom controllable values go here

  setup() {
    console.log("Setup!");
    // Do something when we start this mode
  },

  // Do something every n seconds
  // Not a good place to set Firebase data each frame,
  // that's a lot of read/write calls and could go past the free limit
  step(t) {
    this.roomData.rainTimer -= 0.5
  },

  setupAvatar(avatar) {
    // Start evenyone with a black hat

    // This doesn't work
    //  	avatar.hatColor = new THREE.Vector3(0, 0, 20)
    // We need to use Vue to make the color *reactive*
    Vue.set(avatar, "hatColor", new THREE.Vector3(0, 0, 20));
    Vue.set(avatar, "hatHeight", 1);
    Vue.set(avatar, "skirtLength", Math.random()*.7 + .4);
    Vue.set(avatar, "wagging", true)
    Vue.set(avatar, "sitting", false)
    
    avatar.pushToServer()
    
    console.log("Set up avatars")
    
  },
};

// settings.activeSceneID = "forest";

/*==========================================================
 * Controls - for avatar creation or other interactions
 * Note that they disappear in VR mode!
 ==========================================================*/
Vue.component("forest-controls", {
  template: `<div>
      <div>
        Moonlight:<input v-model="settings.roomData.ambientLight" type="range" min="0" max="3" step=".12"/>

        Sky Color:<input v-model="settings.roomData.skyColor"  type="color"  />

      </div>
      <!-- custom avatar controls -->
       <div>
         
         Hat Selector
       <select v-model="settings.selectedHat">
         <option v-for="(hatType) in settings.hatTypes">{{hatType}}</option>
       </select>
         <!--Sit Down: <input type="checkbox" v-model="userAvatar.data.sitting" v-on:change="pushChanges()" />
         Wag Tail: <input type="checkbox" v-model="settings.wagging" v-on:change="pushChanges()" />-->
        Sit Down: <input type="checkbox" v-model="settings.sitting" />
         Wag Tail: <input type="checkbox" v-model="settings.wagging" />
      </div>
	</div>`,
  methods: {
    pushChanges() {
      console.log("Sitting: " + this.userAvatar.serverData.sitting)
      console.log("Wagging: " + this.userAvatar.serverData.wagging)
      console.log("Pushed Changes")
      this.userAvatar.pushToServer()
    }
  },
  props: ["userAvatar", "avatars", "settings"],
});

/*==========================================================
 * A scene 
 ==========================================================*/
Vue.component("forest-scene", {
  template: `
	<a-entity id="forest-scene">
  
  <!-- Floor -->
  <a-plane
      position="0.0 0.0 0.0"
      rotation="-90 0 0"
      width="70"
      height="70"
      material="color: #709160; roughness: 1.0; metalness: 0.0;"
      shadow="receive: true; cast: false"
  ></a-plane>
  
  <!-- Sky and moon -->
  <a-entity :light="moonlight()"></a-entity>
        <a-entity position="-100.0 100.0 -100.0" geometry="primitive: sphere; radius: 10.0;" material="shader: flat; color: #fff;"
            id="moon"></a-entity>
        <a-sky radius="5000" :material="skyColor()"></a-sky>
        
  <!-- TREES -->
  <a-entity gltf-model="#tree1" scale="1.0 0.5 1.0" position="-4.0 0.0 6.0" rotation="0 35 0" shadow="receive: true; cast: true" sound="src: url(https://cdn.glitch.global/1db7bd29-88b9-4cd9-8a14-6233cdf14f19/audiomass-output.mp3?v=1685239049471); autoplay: true; loop: true; refDistance: 4.0; rolloffFactor: 0; volume: 0.08; distanceModel: exponential;" visible=""></a-entity>
  <terrain :terrain="terrain" />
  
  <!-- SNOW/RAIN -->
  <a-entity position="0 30.25 0" :particle-system="percipitationString()"></a-entity>
  
  <!-- FIREPLACE -->
  <a-entity id="campfire-with-particles" position="0 0 0">
    <a-entity gltf-model="#campfire" scale="1.3 1.5 1.3" position="0 -0.2 0" shadow="receive: false; cast: false"
      @click="increaseFire()"> </a-entity>
    <a-entity :fire="fireString()" position="0.0 -0.1 0.0" 
      :sound="fireAudio()" 
      rotation="" scale="" visible=""
      @click="increaseFire()"
      ></a-entity>
    <a-entity gltf-model="#waterBucket" scale="15 15 15" position="0.7 0 0.7" shadow="receive: false; cast: true"
      @click="decreaseFire()"> </a-entity>
      <a-entity animation="property: position; dur: 163; to: 0 0.05 0.0; loop: true; dir: alternate; easing: linear;">
        <a-entity position="0.0 1.5 0.0" animation="property: position; dur: 223; fill: forwards; to: 0.0 1.5 0.05; loop: true; dir: alternate; easing: easeInOutCirc">
                <a-entity :light="lightString()" :animation="fireAnimation()">
                    </a-entity>
        </a-entity>
        
    </a-entity>
    
  </a-entity>  
		
  <!-- HUT -->
  <a-entity gltf-model="#hut" scale="1 1 1" position="-6 0 -4" rotation="0 180 0" shadow="receive: true; cast: true"
      sound="src: url(https://cdn.glitch.global/1db7bd29-88b9-4cd9-8a14-6233cdf14f19/audiomass-output%20(1).mp3?v=1685466439049); autoplay: true; loop: true; refDistance: 4.0; rolloffFactor: 1; volume: 0.3; distanceModel: exponential;"> </a-entity>
      
  <a-entity gltf-model="#umbrella" scale="0.3 0.3 0.3" position="3 0.1 -2" rotation="0 90 -45" shadow="receive: true; cast: true"
      @click="startRain()"> </a-entity>


        
        
    </a-entity>`,
  
  computed: {

  },
  
  watch: {
    
    // When the music-player data changes, pause or restart the song
    "settings.roomData.fireParticles"() {
      if (this.settings.roomData.fireParticles == 30) {
        var audio = new Audio('https://cdn.glitch.global/1db7bd29-88b9-4cd9-8a14-6233cdf14f19/FIRESizz_Quenching%20cooling%204%20(ID%201697)_BSB.mp3?v=1685311522110');
        audio.volume = 0.2
        audio.play();
      }
    },
  },


  methods: {
    fireAnimation() {
      return `property: light.intensity; dur: 500; to: ${this.settings.roomData.lightIntensity + 0.08}; loop: true; dir: alternate; easing: easeInOutCirc`
    },
    startRain() {
      this.settings.roomData.rainTimer = 100
      this.settings.roomData.fireParticles = 0
      this.settings.roomData.lightIntensity = 0
      this.settings.roomData.fireVolume=0
    },
    percipitationString() {
      if (this.settings.roomData.snowTimer > 0) {
        return `preset: snow; particleCount:5000`
      } else if (this.settings.roomData.rainTimer > 0) {
        return `preset: rain; particleCount:5000`
      }
      return `preset: snow; particleCount: 1`
    },
    
    moonlight() {
      return `type: hemisphere; color: #0E192B; groundColor: #1D0A57; intensity: ${this.settings.roomData.ambientLight}`
    },
    
    skyColor() {
      
      if (this.settings.roomData.rainTimer > 0) {
        if (this.settings.roomData.rainTimer == 100) {
          this.decreaseFire()
        }
        if (this.settings.roomData.rainTimer == 50) {
          var audio = new Audio('https://cdn.glitch.global/1db7bd29-88b9-4cd9-8a14-6233cdf14f19/audiomass-output%20(2).mp3?v=1685470253205')
          audio.play()
        }
        
        if (((54 < this.settings.roomData.rainTimer) && (this.settings.roomData.rainTimer < 55)) ||
           ((52 < this.settings.roomData.rainTimer) && (this.settings.roomData.rainTimer < 53))) {
          return `shader: flat; color: #fcec0a`
        }
      }
      return `shader: flat; color: ${this.settings.roomData.skyColor}`
    },
    
    fireString() {
      return `particles: ${Math.floor(this.settings.roomData.fireParticles)};`
    },
    
    lightString() {
      return `type: point; color: #FFA200; intensity: ${this.settings.roomData.lightIntensity}; distance: 10.0; castShadow: true; shadowMapHeight: 1024; shadowMapWidth: 1024;`
    },
    
    fireAudio() {
      return `src: url(https://cdn.glitch.global/1db7bd29-88b9-4cd9-8a14-6233cdf14f19/fire.mp3?v=1685236674567); autoplay: true; loop: true; refDistance: 1.0; rolloffFactor: 1.0; volume: ${this.settings.roomData.fireVolume}; distanceModel: exponential;`
    },
    
    increaseFire() {
      if (this.settings.roomData.rainTimer <= 0) {
        this.settings.roomData.fireParticles += 50
        this.settings.roomData.lightIntensity += 0.1
        this.settings.roomData.fireVolume += 0.2
      }
    },
    
    decreaseFire() {
      
      this.settings.roomData.fireParticles = 30
      this.settings.roomData.lightIntensity = 0.3
      this.settings.roomData.fireVolume=0.5
      
      
    },
    
    
    clickPiano() {
      console.log("CLICK PIANO")
      // Get piano object
      this.$refs.piano.changeColor({
        "Node-Mesh_5": "magenta",
        "Node-Mesh": "magenta"
      }) 
      
    },
    
    guessColor(sphere) {
      console.log(sphere);
      console.log(`You guess ${sphere.color.toAFrame()}`);

      // Is this my hat color?

      const d = sphere.color.distanceTo(this.userAvatar.hatColor);
      let c0 = sphere.color.toAFrame();
      let c1 = this.userAvatar.hatColor.toAFrame();
      console.log("Guess:", c0, "Yours:", c1);
      if (d < 10) {
        console.log("RIGHT");
      } else {
        console.log("WRONG");
      }
    },

    cauldronClick() {
      console.log("START THE GAME");

      // Make a random list of colors
      // and assign one to each player
      let possibleColors = [
        new THREE.Vector3(100, 0, 90),
        new THREE.Vector3(100, 0, 10),
        new THREE.Vector3(320, 100, 50),
        new THREE.Vector3(220, 100, 50),
      ];

      this.avatars.forEach((a) => (a.hatColor = getRandom(possibleColors)));

      // Make clickable spheres
      let spheres = this.avatars.map((a, index) => {
        return {
          color: a.hatColor,
          pos: new THREE.Vector3(0, 0.7 + 0.6 * index, 0),
          points: 5,
        };
      });
      shuffleArray(spheres);
      this.hatSpheres = spheres;
      console.log(
        "Secret hat colors",
        this.hatSpheres.map((s) => s.pos.toAFrame())
      );
    },
  },

  mounted() {},
  data() {
    return {
      hatSpheres: [],
      terrain: new Terrain(),
    };
  },
  props: ["avatars", "settings", "userAvatar"],
});

/*==========================================================
 * Each avatar 
 * The avatar doesn't get drawn for the player
 ==========================================================*/

// This pieces moves with their body position,
// ie, only if you move them
// or have a 6DoF headset, like the Quest
Vue.component("forest-avatar-body", {
  template: `<a-entity class="forest-body">
      <!-- legs -->
      <a-box
        width=".15" height="1.2" depth=".15" shadow="receive: true; cast: true"
        :color="avatar.color.toHSL({shade:.3})"
        :position="pos('Front 1')"
        :rotation="rot('Front 1')"/>
        
      <a-box
        width=".15" :height="height('Back 1')" depth=".15" shadow="receive: true; cast: true"
        :color="avatar.color.toHSL({shade:.3})"
        :position="pos('Back 1')"
        :rotation="rot('Back 1')"/>
        
      <a-box
        width=".15" :height="height('Back 2')" depth=".15" shadow="receive: true; cast: true"
        :color="avatar.color.toHSL({shade:.3})"
        :position="pos('Back 2')"
        :rotation="rot('Back 2')"/>
        
      <a-box
        width=".15" height="1.2" depth=".15" shadow="receive: true; cast: true"
        :color="avatar.color.toHSL({shade:.3})"
        :position="pos('Front 2')"
        :rotation="rot('Front 2')"/>
     
      <!-- Body -->
      <a-box 
        width=".65" height=".65" :depth="height('Body 1')"  shadow="receive: true; cast: true"
        :color="avatar.color.toHSL({shade:.3})" 
        :position="pos('Body 1')"
        :rotation="rot('Body 1')"/>
      <a-box 
        width=".5" height=".5" :depth="height('Body 2')" shadow="receive: true; cast: true"
        :color="avatar.color.toHSL({shade:.3})" 
        :position="pos('Body 2')"
        :rotation="rot('Body 2')"/>
        
      <!-- Tail -->
      <a-entity :animation="animationString()" :position="pos('Tail')"
      :rotation="rot('Tail')">
      <a-box 
        width=".15" height=".15" :depth="height('Tail')" shadow="receive: true; cast: true"
        :color="avatar.color.toHSL({shade:.3})" 
        position="0 0 -0.22"
        > 
        </a-box>
        
      </a-entity>


    </a-entity>
	`,
  
  watch: {
    "avatar.data.wagging"() {
      console.log("Wagging changed", this.avatar);
      this.animationString();
    },
  },
  
  methods: {
    isSitting() {
      // if (this.avatar.serverData.sitting == undefined) {
      //   this.avatar.serverData.sitting = false
      //   this.avatar.pushToServer()
      // } else if (this.avatar.serverData.sitting == true) {
      //   console.log("Sitting: "+ this.avatar.serverData.sitting)
      // }
      // return this.avatar.serverData.sitting
      
      if (this.settings.sitting == undefined) {
        this.settings.sitting = false
      }
      return this.settings.sitting
    },
    
    isWagging() {
      // if (this.avatar.serverData.wagging == undefined) {
      //   this.avatar.serverData.wagging = false
      //   this.avatar.pushToServer()
      // }
      // console.log("Wagging: "+ this.avatar.serverData.wagging)
      // console.log(this.avatar)
      // return this.avatar.serverData.wagging
      
      return this.settings.wagging
    },
    
    animationString() {
      
      if (this.isWagging()) {
        //Get tails to wag faster when fire is larger
        return `property: rotation; to: 10 45 0; from: 10 -45 0; dur: ${10000/(this.settings.roomData.fireParticles**0.5)}; easing: easeInOutCirc; loop: true; dir: alternate; enabled: true`
      } else {
        return "enabled: false"
      }
      
    },
    
    rot(bodyPart) {
      let tailY = 0
      if (this.isWagging()) {
        tailY=-45
      }
      
      let rotDictStanding = {
        "Front 1": "0 0 0",
        "Front 2": "0 0 0",
        "Back 1":"0 0 0",
        "Back 2":"0 0 0",
        "Body 1":"0 0 0",
        "Body 2":"0 0 0",
        "Tail": "-45 " + tailY + " 0"
      }
      
      let rotDictSitting= {
        "Front 1": "-15 0 0",
        "Front 2": "-15 0 0",
        "Back 1":"-85 0 0",
        "Back 2":"-85 0 0",
        "Body 1":"-10 0 0",
        "Body 2":"-45 0 0",
        "Tail": "10 " + tailY + " 0"
      }
      
      if (this.isSitting()) {
        return rotDictSitting[bodyPart]
      } else {
        return rotDictStanding[bodyPart]
      }
    },
    
    height(bodyPart) {
      let heightDictStanding = {
        "Front 1": "-0.12 0 0.4",
        "Front 2": "0.12 0 0.4",
        "Back 1":"1.35",
        "Back 2":"1.35",
        "Body 1":".5",
        "Body 2":".7",
        "Tail": ".5"
      }
      
      let heightDictSitting= {
        "Front 1": "0 0 0.4",
        "Front 2": "0.12 0 0.4",
        "Back 1":".5",
        "Back 2":".5",
        "Body 1":".5",
        "Body 2":".9",
        "Tail": ".8"
      }
      
      if (this.isSitting()) {
        return heightDictSitting[bodyPart]
      } else {
        return heightDictStanding[bodyPart]
      }
    },
    
    pos(bodyPart) {
      let posDictStanding = {
        "Front 1": "-0.12 0 0.4",
        "Front 2": "0.12 0 0.4",
        "Back 1":"-0.12 0 -0.5",
        "Back 2":"0.12 0 -0.5",
        "Body 1":"0 0.925 0.25",
        "Body 2":"0 0.925 -0.35",
        "Tail": "0 0.925 -0.7"
      }
      
      let posDictSitting= {
        "Front 1": "-0.12 0 0.4",
        "Front 2": "0.12 0 0.4",
        "Back 1":"-0.12 0.2 -0.2",
        "Back 2":"0.12 0.2 -0.2",
        "Body 1":"0 0.925 0.25",
        "Body 2":"0 0.6 -0.35",
        "Tail": "0 0.6 -0.8"
      }
      
      if (this.isSitting()) {
        return posDictSitting[bodyPart]
      } else {
        return posDictStanding[bodyPart]
      }
    }
  },
  props: ["avatar", "settings"],
});

// This piece moves with their head tilt
Vue.component("forest-avatar-head", {
  template: `<a-entity class="forest-body">
          
        <!-- HEAD -->
        <a-box 
          width=".5" height=".5" depth="0.3" 
          :color="avatar.color.toHSL({shade:.3})" 
          position="0 0 0" />
        
        <!-- NOSE -->
        <a-box 
          width=".25" height=".25" depth="0.2" 
          :color="avatar.color.toHSL({shade:.3})" 
          position="0 -0.125 0.25" />

        <!-- EARS -->
        <a-box 
          width=".15" height=".15" depth="0.07" 
          :color="avatar.color.toHSL({shade:.3})" 
          position="-0.125 0.3 -0.05" />
          
        <a-box 
          width=".15" height=".15" depth="0.07" 
          :color="avatar.color.toHSL({shade:.3})" 
          position="0.125 0.3 -0.05" />
          
        <!-- HATS -->
        <a-entity :gltf-model="hatModel()" :scale="hatScale()" :position="hatPosition()" shadow="receive: false; cast: false"></a-entity>  
       
    </a-entity>
	`,
  
  computed: {
  },

  mounted() {
  },

  watch: {

  },

  methods: {
    
    hatScale() {
      let scaleDict = {'Top Hat': "0.3 0.6 0.3", 'Santa Hat': "0.05 0.05 0.05",
                       'Cowboy Hat': "0.3 0.3 0.3", 'Beanie': "0.3 0.3 0.3"}
      if (this.settings.selectedHat != undefined && this.settings.selectedHat != 'None') {
        return scaleDict[this.settings.selectedHat]
      } else {
        return `0.01 0.01 0.01`
      }
    },
    
    hatPosition() {
      let posDict = {'Top Hat': "0 -0.95 0.05", 'Santa Hat': "0.05 0.05 0.05",
                       'Cowboy Hat': "0.3 0.3 0.3", 'Beanie': "0.3 0.3 0.3"}
      if (this.settings.selectedHat != undefined && this.settings.selectedHat != 'None') {
        return posDict[this.settings.selectedHat]
      } else {
        return `0 -1 0`
      }
    },
    
    hatModel() {
      if (this.settings.selectedHat != undefined && this.settings.selectedHat != 'None') {
        return `#${this.settings.selectedHat}`
      } else {
        return `#Top Hat`
      }
      
    },
  },

  props: ["avatar", "settings"],
});

// This piece isn't moved at all
// You probably don't need to use it
Vue.component("forest-avatar-noposition", {
  template: `<a-entity>

  </a-entity>`,

  props: ["avatar", "settings"],
});

Vue.component("forest-avatar-hand", {
  template: `<a-entity>
     <a-sphere 
        radius=".03"  
        :color="avatar.headColor.toHSL({shade:.4})" 
      />
  </a-entity>`,

  props: ["avatar", "settings", "side", "userAvatar"],
});
