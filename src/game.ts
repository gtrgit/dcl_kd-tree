import { Board } from "./tiles/board";
import resources from "./resources";

/// --- Set up a system ---

const tileList: Entity[] = [];

const ent = new Entity();
ent.addComponent(resources.models.hexBlue);
ent.addComponent(new Transform({ position: new Vector3(2, 1, 2) }));
tileList.push(ent);
engine.addEntity(ent);

const ent2 = new Entity();
ent2.addComponent(resources.models.hexBlue);
ent2.addComponent(new Transform({ position: new Vector3(4, 1, 2) }));
tileList.push(ent2);

engine.addEntity(ent2);

new Board({ position: new Vector3(20, 0, 20) }, tileList);
