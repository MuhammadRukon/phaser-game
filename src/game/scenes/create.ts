type Sprite = Phaser.Physics.Arcade.Sprite;

export let player: Sprite;
let platforms: Phaser.Physics.Arcade.StaticGroup;

export default function create(this: Phaser.Scene) {
    // background
    this.add.image(400, 300, "sky");

    //player creation
    player = this.physics.add.sprite(100, 450, "dude");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // left view of player
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });
    //still view of player
    this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
    });
    // right view of player
    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });

    // floors and base
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");

    // enable collisions between player and platforms
    this.physics.add.collider(player, platforms);
}
