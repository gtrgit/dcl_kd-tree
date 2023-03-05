import {Board} from './tiles/board'
import resources from "./resources"

/// --- Set up a system ---

let  tileList:Entity[] = []


let ent = new Entity()
ent.addComponent(resources.models.hexBlue)
ent.addComponent(new Transform({position: new Vector3(2,1,2)}))
 tileList.push(ent)
engine.addEntity(ent)

let ent2 = new Entity()
ent2.addComponent(resources.models.hexBlue)
ent2.addComponent(new Transform({position: new Vector3(4,1,2)}))
 tileList.push(ent2)
ent2.addComponent(new OnPointerDown((e) => {
  for (let i = 0; i < tileList.length; i++){
    // log(tileList[i].getComponent(Transform).position)
  }
})
)

engine.addEntity(ent2)




let board = new Board({position: new Vector3(20,0,20)},tileList)
