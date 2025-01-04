export function createStars(scene: Phaser.Scene) {
    let stars: Phaser.Physics.Arcade.Group;

    stars = scene.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.25, 0.3));
    });

    return stars;
}
