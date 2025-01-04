type Sprite = Phaser.Physics.Arcade.Sprite;

export let player: Sprite;
let platforms: Phaser.Physics.Arcade.StaticGroup;

let score: number = 0;
let scoreText: Phaser.GameObjects.Text;

type GroupType = Phaser.Physics.Arcade.Group;

let stars: GroupType;
let bomb: Sprite;
let bombs: GroupType;
let gameOver: boolean = false;

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

    //stars creation
    // start creation
    stars = this.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.25, 0.3));
    });

    // enable collisions between ground and stars
    this.physics.add.collider(stars, platforms);

    // star collection
    this.physics.add.overlap(player, stars, collectStar, null, this);
    function collectStar(player: Sprite, star: Sprite) {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText("Score: " + score);

        if (stars.countActive(true) === 0) {
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x =
                player.x < 400
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);

            bomb = bombs.create(x, 16, "bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }
    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    function hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);
        player.anims.play("turn");

        gameOver = true;
    }

    scoreText = this.add.text(16, 16, "score: 0", {
        fontSize: "32px",
        fill: "#000",
    });
}
