import resources from "../resources";
// import { HexSelector } from './hexSelector'
// import { Dash_AnimationQueue, Dash_Ease, } from "dcldash"
// import { DashAnim } from './dash_anim'
// import {attack} from './attack'
// import {Ui} from './modules/ui'
// import { PlayerFlags } from './board'

export class HexTile extends Entity {
  private initialTile: GLTFShape = resources.models.hexBlue;
  constructor(transform: TranformConstructorArgs) {
    super();
    engine.addEntity(this);
    //Tile initial shape
    this.addComponent(this.initialTile);
    this.addComponent(new Transform(transform));
  }
}
