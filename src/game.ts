import * as BABYLON from 'babylonjs';

export class Game {
    readonly LANE_NUMNER = 3;
    readonly LANE_INTERVAL = 5;

    private _canvas: HTMLCanvasElement;
    private _scene: BABYLON.Scene;
    private _engine: BABYLON.Engine;
    private _camera: BABYLON.UniversalCamera;
    private _light: BABYLON.Light;
    private _score: number;
    private _toadModel: any;
    private _endings: Array<BABYLON.Mesh>;
    private _lanePositions: Array<number>

    constructor(canvasElement: string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);
        this._score = 0;
        this._lanePositions = new Array<number>(this.LANE_NUMNER);
        this._endings = new Array<BABYLON.Mesh>(this.LANE_NUMNER);
    }

    createScene() : void {

        this._camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 6, -10), this._scene);
        this._camera.setTarget(new BABYLON.Vector3(0, 0, 10)); //TODO: Whats this for? 
        this._camera.attachControl(this._canvas, true);

        //if z < 0, light moves me. If z > 0 light moves away from me 
        const light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 35, 3), this._scene); 

        let currentLanePosition = this.LANE_INTERVAL * -1;
        for (let i = 0; i < this.LANE_NUMNER; i++) {
            this._lanePositions[i] = currentLanePosition;
            this.createLane(i, currentLanePosition);
            const ending = this.createEnding(i, currentLanePosition);
            this._endings[i] = ending;
            currentLanePosition += this.LANE_INTERVAL;
        }

    }

    createLane(id: number, position: number): void {
        let lane = BABYLON.Mesh.CreateBox("lane" + id, 1, this._scene);
        lane.scaling.y = 0.1;
        lane.scaling.x = 3;
        lane.scaling.z = 1000;
        lane.position.x = position;
        lane.position.z = lane.scaling.z/2 - 200;
    }

    createEnding(id: number, position: number) : BABYLON.Mesh {
        let ground = BABYLON.Mesh.CreateGround("ground" + id, 3, 4, 1, this._scene);
        ground.position.x = position;
        ground.position.y = 0.1;
        ground.position.z = 1;
        let mat = new BABYLON.StandardMaterial("mat", this._scene);
        mat.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);
        ground.material = mat;
        return ground;
    }
 
    animate() : void {
        // Run the render loop.
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }

}