import resources from "../resources";
// import {HexTile} from "./hexTile"
import KDTree from "../kdTree";
// import { Point2D } from "../types/point2d";

export class Board extends Entity {
  private hexTransform: TranformConstructorArgs = new Transform();
  private hexPos: TranformConstructorArgs[] = [];
  private tree: KDTree = new KDTree();
  private points: any = [];
  private tileList: Entity[] = [];

  constructor(transform: TranformConstructorArgs, tileList: Entity[]) {
    super();
    engine.addEntity(this);
    this.addComponent(new Transform(transform));
    this.tileList = tileList;
    this.placeHexTiles(16, 16);

    this.raySys(this.getComponent(Transform).position);
  }

  raySys(boardPosition: Vector3) {
    let timer: number = 0.3;
    class BoardSystems implements ISystem {
      //TODO tree points need to me imported and the data is generated outside class
      private tree: KDTree = new KDTree();
      private nearest: any = [];
      private points: any = [];
      private tileList: Entity[] = [];
      //TODO: pass in the point and tree data
      constructor(points: any, tree: KDTree, tileList: Entity[]) {
        this.points = points;
        this.tree = tree;
        this.tileList = tileList;
      }
      update(dt: number) {
        if (timer > 0) {
          timer -= dt;
        } else {
          timer = 0.3;
          this.handleMove(
            Camera.instance.feetPosition.x,
            Camera.instance.feetPosition.z
          );
        }
      }

      // renderTree(tree){
      //   this.drawPoint(node.point);

      // }
      offset(x: number, z: number) {
        //TODO import the transform for the board and do a vector.add
      }

      drawHighlightedPoint([x, z], color: GLTFShape) {
        const result: Entity[] = this.tileList.filter(
          (posMatch) =>
            posMatch.getComponent(Transform).position.x === x &&
            posMatch.getComponent(Transform).position.z === z
        );
        this.changeTileToPlayer(result, color);
      }
      drawPoint([x, z]) {
        resources.models.hexGreen;
      }
      handleMove(x: number, z: number) {
        this.removeSelection(this.nearest, resources.models.hexBlue);
        const k = 20;
        this.nearest = this.tree.nearest([x, z], k);

        this.highlightSelected(this.nearest, resources.models.hexGreen);
      }

      removeSelection(arr: any, color: GLTFShape) {
        arr.forEach((point) => {
          this.drawHighlightedPoint(point, color);
        });
      }

      highlightSelected(selected, color: GLTFShape) {
        selected.forEach((element) => {
          this.drawHighlightedPoint(element, color);
        });
      }

      changeTileToPlayer(changeEnt: Entity[], newTile: GLTFShape) {
        changeEnt.forEach((ent) => {
          ent.addComponentOrReplace(newTile);
        });
      }
    }
    engine.addSystem(new BoardSystems(this.points, this.tree, this.tileList));
  }
  drawHexMap() {
    for (let i = 0; i < this.hexPos.length; i++) {
      const ent = new Entity();
      ent.addComponent(resources.models.hexBlue);
      ent.addComponent(new Transform(this.hexPos[i]));
      this.tileList.push(ent);
      engine.addEntity(ent);
    }
  }

  placeHexTiles(rows: number, cols: number) {
    for (let x: number = 0; x < cols; x++) {
      this.hexTransform = {
        position: new Vector3(x + 0.5, 0, 1.25),
        scale: new Vector3(0.9, 1, 0.9),
      };
      this.hexPos.push(this.hexTransform);
      for (let z = 0; z < rows; z++) {
        if (z < 1.77) {
          z = z + 1;
        } else {
          z = z + 0.5;
        }

        this.hexTransform = {
          position: new Vector3(x, 0, z + 1),
          scale: new Vector3(0.9, 1, 0.9),
        };
        this.hexPos.push(this.hexTransform);
        if (this.hexTransform.position) {
          this.points.push(
            `${this.hexTransform.position.x} 
             ${this.hexTransform.position.z}`
          );
          this.tree.insert([
            this.hexTransform.position.x,
            this.hexTransform.position.z,
          ]);
        }
      }
    }

    for (let x = 0; x < cols; x++) {
      this.hexTransform = {
        position: new Vector3(x, 0, 1),
        scale: new Vector3(0.9, 1, 0.9),
      };
      this.hexPos.push(this.hexTransform);

      for (let y = 0.75; y < rows; y++) {
        if (y < 1.77) {
          y = y + 1;
        } else {
          y = y + 0.5;
        }

        this.hexTransform = {
          position: new Vector3(x + 0.5, 0, y + 1),
          scale: new Vector3(0.9, 1, 0.9),
        };
        this.hexPos.push(this.hexTransform);
        if (this.hexTransform.position) {
          this.points.push(
            `${this.hexTransform.position.x} ${this.hexTransform.position.z}`
          );
          this.tree.insert([
            this.hexTransform.position.x,
            this.hexTransform.position.z,
          ]);
        }
      }
    }
    //todo make another loop to fill in the gaps
    this.drawHexMap();
  }
}
