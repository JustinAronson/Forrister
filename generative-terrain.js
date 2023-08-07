Vue.component("terrain", {
	template: `<a-entity class="terrain">
		<a-entity 
			v-for="(b,index) in terrain.boulders"
			:key="index"
      :gltf-model="b.model"
			:scale="b.scale"
			:rotation="b.rot.toAFrame()"
			:position="b.pos.toAFrame()"></a-entity>
		
	</a-entity>`,

	props: ["terrain"]
})

class Terrain {
	constructor() {
		let count = 100; 
		this.boulders = []
		for (var i = 0; i < count; i++) {
			let y = 0
			let r = 10 + Math.random()*10
			let theta = .4*i
			let color =  new THREE.Vector3(40 + Math.random()*30, 10, 20 + Math.random()*30)
			let pos = new THREE.Vector3().addPolar({r, theta, y})
      let modelNumber = Math.floor(Math.random()*3.99) + 1
      let model = `#tree${modelNumber}`
      let scale
      if (modelNumber == 1) {
        scale = new THREE.Vector3(1, 0.5, 1)
      } else if (modelNumber == 2) {
        scale = new THREE.Vector3(100, 100, 100)
      } else if (modelNumber == 3) {
        scale = new THREE.Vector3(1, 1, 1)
      } else if (modelNumber == 4) {
        scale = new THREE.Vector3(0.02, 0.01, 0.02)
      }
			// console.log(size)
			let rot = new THREE.Vector3(0, Math.random()*100, 0)
			this.boulders.push({
				pos,
				rot,
				scale,
        model
			})
			// console.log(color, color.toHSL())
		}
	}
}