let platforms: Phaser.Physics.Arcade.StaticGroup;

export default function create(this: Phaser.Scene) {
    // background 
    this.add.image(400, 300, "sky");

    platforms = this.physics.add.staticGroup();

    // floors and base
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");
}
