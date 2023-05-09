class PreloadScene extends Phaser.Scene {
    constructor() {
      super({ key: 'PreloadScene' });
    }
  
    preload() {
      this.load.spritesheet('character', 'assets/character.png', {
        frameWidth: 32, frameHeight: 32,
      });

      //kitchen scene
      this.load.image('kitchen bg', 'assets/kitchen bg.png');
      this.load.image('kcounter', 'assets/kitchen_counter.png');
      this.load.image('kcuttingboard', 'assets/kitchen_cuttingboard.png');
      this.load.image('kdrawer', 'assets/kitchen_drawer.png');
      this.load.image('kfridge', 'assets/kitchen_fridge.png');
      this.load.image('klongcounter', 'assets/kitchen_longcounter.png');
      this.load.image('ksink', 'assets/kitchen_sink.png');
      this.load.image('kstove', 'assets/kitchen_stove.png');

      //food
      this.load.image('fburger', 'assets/food_burger.png');
      this.load.image('fspaget', 'assets/food_spaget.png');
      this.load.image('frata', 'assets/food_rata.png');

      //dining scene
      this.load.image('dining bg', 'assets/dining bg.png');
      this.load.image('dtable', 'assets/dining_table.png');
      this.load.image('dbigtable', 'assets/dining_bigtable.png');
      this.load.image('remy', 'assets/remy.png');
      this.load.spritesheet('ego', 'assets/ego.png', {
        frameWidth: 32, frameHeight: 32,
      });
    }
  
    create() {
      this.scene.start('DiningCut');
    }
  }
class MainScene extends Phaser.Scene {

    constructor() {
      super({ key: 'MainScene' });
    }
  
    create() {
        this.add.image(310, 240, 'kitchen bg').setOrigin(0, 0);
    
        this.cameras.main.setZoom(3);
    
        //wall appliances
        const kStove1 = this.physics.add.staticImage(400+8, 275, 'kstove');
        const kStove2 = this.physics.add.staticImage(416+8, 275, 'kstove');
        const kStove3 = this.physics.add.staticImage(384+8, 275, 'kstove');
        const kStove4 = this.physics.add.staticImage(368+8, 275, 'kstove');

        kStove4.setInteractive(); 
        const kCounter1 = this.physics.add.staticImage(328, 285, 'kcounter');
        const kCounter2 = this.physics.add.staticImage(328, 275, 'kcounter');
        const kCounter3 = this.physics.add.staticImage(328, 295, 'kcounter');
        const kCounter4 = this.physics.add.staticImage(328, 305, 'kcounter');
        const kLongCounter1 = this.physics.add.staticImage(352, 275, 'klongcounter')
        const kFridge1 = this.physics.add.staticImage(432+8, 271.5, 'kfridge');
        const kFridge2 = this.physics.add.staticImage(448+8, 271.5, 'kfridge');
        const kFridge3 = this.physics.add.staticImage(448+24, 271.5, 'kfridge');
        const kFridge4 = this.physics.add.staticImage(328, 315, 'kfridge');

        //center appliances
        const kStove5 = this.physics.add.staticImage(376, 319, 'kstove');
        const kCounter5 = this.physics.add.staticImage(376, 309, 'kcounter');
        const kCuttingBoard = this.physics.add.staticImage(400, 309, 'kcuttingboard');
        const kCounter6 = this.physics.add.staticImage(392, 319, 'kdrawer');
        const kCounter7 = this.physics.add.staticImage(408, 319, 'kcounter');
        const remy = this.physics.add.staticImage(328, 295, 'remy');
        remy.setDepth(8);

        this.appliances = this.physics.add.staticGroup([kStove1, kStove2, kStove3, kStove4, kCounter2, kCounter1, kCounter3, kCounter4, kCounter5, kCounter6, kCounter7, kLongCounter1, kFridge1, kFridge2, kFridge3, kFridge4, kCuttingBoard, kStove5]);
    
        //food labels
        this.itemPicked = false;
        if(!this.registry.has('fRataPressed')){
          this.dialogBox = this.createDialogBox("REMY: Hmm... perspective!");
          this.time.delayedCall(5000, () => {
            this.dialogBox = this.createDialogBox("REMY: Go to the refrigerators and pick a dish for him.");
          })
          this.time.delayedCall(10000, () => {
            this.dialogBox = this.createDialogBox("REMY: Place the dish on the top-left most stove and cook it.");
          })
          this.registry.set('fRataPressed', false);
          this.registry.set('fSpagetPressed', false);
          this.registry.set('fBurgerPressed', false);
          this.fRata = this.physics.add.staticImage(440, 267, 'frata');
          this.fSpaget = this.physics.add.staticImage(456, 267, 'fspaget');
          this.fBurger = this.physics.add.staticImage(472, 267, 'fburger');

        }
        else{
          if(this.registry.get('fRataPressed')){
            this.fRata = this.physics.add.staticImage(999, 999, 'frata');
            this.fRata.setPosition(this.player.x, this.player.y +10)
            this.fRata.setDepth(7)
            this.itemPicked = true;
            this.fSpaget = this.physics.add.staticImage(456, 267, 'fspaget');
            this.fBurger = this.physics.add.staticImage(472, 267, 'fburger');
          }
          else if(this.registry.get('fSpagetPressed')){
            this.fSpaget = this.physics.add.staticImage(999, 999, 'fspaget');
            this.fSpaget.setPosition(this.player.x, this.player.y +10)
            this.fSpaget.setDepth(7)
            this.itemPicked = true
            this.fRata = this.physics.add.staticImage(440, 267, 'frata');
            this.fBurger = this.physics.add.staticImage(472, 267, 'fburger');
          }
          else if(this.registry.get('fBurgerPressed')){
            this.fBurger = this.physics.add.staticImage(999, 999, 'fburger');
            this.fBurger.setPosition(this.player.x, this.player.y +10)
            this.fBurger.setDepth(7)
            this.itemPicked = true;
            this.fRata = this.physics.add.staticImage(440, 267, 'frata');
            this.fSpaget = this.physics.add.staticImage(456, 267, 'fspaget');
          }
        }

        kFridge1.setInteractive();
        kFridge2.setInteractive();
        kFridge3.setInteractive();

        kFridge1.on('pointerdown', () => {
          if(this.isPlayerNear(this.player, kFridge1, 50) && !this.registry.get('fRataPressed') && !this.itemPicked){
            this.fRata.setPosition(this.player.x, this.player.y +10);
            this.fRata.setDepth(7);
            this.registry.set('fRataPressed', true);
            this.itemPicked = true;
          }
          else if(this.isPlayerNear(this.player, kFridge1, 50) && this.registry.get('fRataPressed') && this.itemPicked){
            this.fRata.setPosition(440, 267);
            this.registry.set('fRataPressed', false);
            this.itemPicked = false;
            this.fRata.setVisible(true);
            this.fRata.setDepth(5);
          }
        });
        kFridge2.on('pointerdown', () => {
          if(this.isPlayerNear(this.player, kFridge2, 50) && !this.registry.get('fSpagetPressed') && !this.itemPicked){
            this.fSpaget.setPosition(this.player.x, this.player.y +10);
            this.fSpaget.setDepth(7);
            this.registry.set('fSpagetPressed', true);
            this.itemPicked = true;
          }
          else if(this.isPlayerNear(this.player, kFridge2, 50) && this.registry.get('fSpagetPressed') && this.itemPicked){
            this.fSpaget.setPosition(456, 267);
            this.registry.set('fSpagetPressed', false);
            this.itemPicked = false;
            this.fSpaget.setVisible(true);
            this.fSpaget.setDepth(5);
          }
        });
        kFridge3.on('pointerdown', () => {
          if(this.isPlayerNear(this.player, kFridge3, 50) && !this.registry.get('fBurgerPressed') && !this.itemPicked){
            this.fBurger.setPosition(this.player.x, this.player.y +10);
            this.fBurger.setDepth(7);
            this.registry.set('fBurgerPressed', true);
            this.itemPicked = true;
          }
          else if(this.isPlayerNear(this.player, kFridge3, 50) && this.registry.get('fBurgerPressed') && this.itemPicked){
            this.fBurger.setPosition(472, 267);
            this.registry.set('fBurgerPressed', false);
            this.itemPicked = false;
            this.fBurger.setVisible(true);
            this.fBurger.setDepth(5);
          }
        });
        
        kStove4.setDepth(4);
        kStove4.on('pointerdown', () => {
          if(this.isPlayerNear(this.player, kStove4, 50) && this.itemPicked){
            this.pbar = this.createProgressBar(kStove4.x - 20, kStove4.y-20, 10000);
            if(this.registry.get('fRataPressed')){
              this.fRata.setDepth(10);
              this.fRata.setPosition(368+8, 300);
              this.registry.set('fRataPressed', false);
            }
            else if(this.registry.get('fSpagetPressed')){
              this.fSpaget.setDepth(10);
              this.fSpaget.setPosition(368+8, 300);
              this.registry.set('fSpagetPressed', false);
            }
            else if(this.registry.get('fBurgerPressed')){
              this.fBurger.setDepth(10);
              this.fBurger.setPosition(368+8, 300);
              this.registry.set('fBurgerPressed', false);
            }
            this.itemPicked = false;
          }
          else if(this.isPlayerNear(this.player, kStove4, 50) && !this.itemPicked){
            this.itemPicked = true;
            if(!this.registry.get('fRataPressed')){
              this.registry.set('fRataPressed', true);
            }
            else if(!this.registry.get('fSpagetPressed')){
              this.registry.set('fSpagetPressed', true);
            }
            else if(!this.registry.get('fBurgerPressed')){
              this.registry.set('fBurgerPressed', true);
            }

            this.dialogBox = this.createDialogBox("REMY: Bring it to Ego, quick!");
          }
        });


        //walls
        const leftWall = this.add.rectangle(311,350,16,480, 0x000000);
        const rightTopWall = this.add.rectangle(492, 215, 25, 100, 0x000000);
        const rightWall = this.add.rectangle(488, 280, 18, 38, 0xeeddf7);
        const rightBottomWall = this.add.rectangle(492, 365, 25, 100, 0x000000);
        const topWall = this.add.rectangle(300, 224, 800, 16, 0x000000);
        const bottomWall = this.add.rectangle(300, 360, 800, 16, 0x000000);

        this.physics.add.existing(leftWall, true);
        this.physics.add.existing(rightTopWall, true);
        this.physics.add.existing(rightBottomWall, true);
        this.physics.add.existing(rightWall, true);
        this.physics.add.existing(topWall, true);
        this.physics.add.existing(bottomWall, true);

        const walls = this.physics.add.staticGroup([leftWall, rightTopWall, rightWall, rightBottomWall, topWall, bottomWall]);
        
        //player
        this.player = this.physics.add.sprite(450, 300, 'character');
        this.player.setCollideWorldBounds(true);

        this.player.body.setSize(14, 6);
        this.player.body.setOffset(9, 23);
    
        //colliders
        this.physics.add.collider(this.player, this.appliances);
        this.physics.add.collider(this.player, walls);
    
        this.createAnimations();

        //set depths
        kCounter1.setDepth(1);
        kCounter2.setDepth(0);
        kCounter3.setDepth(2);
        kCounter4.setDepth(3);
        kFridge4.setDepth(4);
        kStove5.setDepth(5);
        this.player.setDepth(6);

       
        //move to dining hall
        const triggerBlock = this.add.rectangle(488, 307, 18, 16, 0xff0000, 0.5);
        this.physics.add.existing(triggerBlock, true);

        this.physics.add.overlap(this.player, triggerBlock, this.changeScene, null, this);
    }


    isPlayerNear(player, object, distance) {
      return Phaser.Math.Distance.Between(player.x, player.y, object.x, object.y) <= distance;
    }

    createAnimations() {
      const anims = this.anims;
  
      // Create the animations for the character
      anims.create({
        key: 'down',
        frames: anims.generateFrameNumbers('character', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });
  
      anims.create({
        key: 'left',
        frames: anims.generateFrameNumbers('character', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1,
      });
  
      anims.create({
        key: 'right',
        frames: anims.generateFrameNumbers('character', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1,
      });
  
      anims.create({
        key: 'up',
        frames: anims.generateFrameNumbers('character', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1,
      });
    }

    changeScene(player, triggerBlock) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start('DiningScene');
        });
    }
    
    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        const speed = 80;
    
        // Horizontal movement
        if (cursors.left.isDown && !(cursors.up.isDown || cursors.down.isDown)) {
            this.player.setVelocityX(-speed);
            this.player.anims.play('left', true);
            if(this.registry.get('fRataPressed') && this.itemPicked){
              this.fRata.setVisible(true);
              this.fRata.setDepth(5);
              this.fRata.setPosition(this.player.x-8, this.player.y + 8);
            }
            if(this.registry.get('fBurgerPressed') && this.itemPicked){
              this.fBurger.setVisible(true);
              this.fBurger.setDepth(5);
              this.fBurger.setPosition(this.player.x-8, this.player.y + 8);
            }
            if(this.registry.get('fSpagetPressed') && this.itemPicked){
              this.fSpaget.setVisible(true);
              this.fSpaget.setDepth(5);
              this.fSpaget.setPosition(this.player.x-8, this.player.y + 8);
            }
        } else if (cursors.right.isDown && !(cursors.up.isDown || cursors.down.isDown)) {
            this.player.setVelocityX(speed);
            this.player.anims.play('right', true);
            if(this.registry.get('fRataPressed') && this.itemPicked){
              this.fRata.setVisible(true);
              this.fRata.setDepth(5);
              this.fRata.setPosition(this.player.x+8, this.player.y + 8);
            }
            if(this.registry.get('fBurgerPressed') && this.itemPicked){
              this.fBurger.setVisible(true);
              this.fBurger.setDepth(5);
              this.fBurger.setPosition(this.player.x+8, this.player.y + 8);
            }
            if(this.registry.get('fSpagetPressed') && this.itemPicked){
              this.fSpaget.setVisible(true);
              this.fSpaget.setDepth(5);
              this.fSpaget.setPosition(this.player.x+8, this.player.y + 8);
            }
        } else {
            this.player.setVelocityX(0);
        }
    
        // Vertical movement
        if (cursors.up.isDown && !(cursors.left.isDown || cursors.right.isDown)) {
            this.player.setVelocityY(-speed);
            this.player.anims.play('up', true);
            if(this.registry.get('fRataPressed') && this.itemPicked){
              this.fRata.setVisible(false);
            }
            if(this.registry.get('fBurgerPressed') && this.itemPicked){
              this.fBurger.setVisible(false);
            }
            if(this.registry.get('fSpagetPressed') && this.itemPicked){
              this.fSpaget.setVisible(false);
            }
        } else if (cursors.down.isDown && !(cursors.left.isDown || cursors.right.isDown)) {
            this.player.setVelocityY(speed);
            this.player.anims.play('down', true);
            if(this.registry.get('fRataPressed') && this.itemPicked){
              this.fRata.setVisible(true);
              this.fRata.setDepth(7);
              this.fRata.setPosition(this.player.x, this.player.y + 10);
            }
            if(this.registry.get('fBurgerPressed') && this.itemPicked){
              this.fBurger.setVisible(true);
              this.fBurger.setDepth(7);
              this.fBurger.setPosition(this.player.x, this.player.y + 10);
            }
            if(this.registry.get('fSpagetPressed') && this.itemPicked){
              this.fSpaget.setVisible(true);
              this.fSpaget.setDepth(7);
              this.fSpaget.setPosition(this.player.x, this.player.y + 10);
            }
        } else {
            this.player.setVelocityY(0);
        }
    
        if (!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
            this.player.anims.stop();
        }
    }

    createDialogBox(text) {
      if (this.dialogBox) {
          this.dialogBox.destroy();
      }
      if(this.typingEvent){
        this.typingEvent.destroy();
      }
  
      const screenWidth = this.cameras.main.width;
      const screenHeight = this.cameras.main.height;
      const dialogWidth = screenWidth * 0.25;
      const dialogHeight = screenHeight * 0.1;
      const x = 300;
      const y = 325;
  
      const dialogBox = this.add.rectangle(x, y, dialogWidth, dialogHeight, 0x000000, 0.5);
      dialogBox.setStrokeStyle(2, 0xffffff, 1);
      dialogBox.setOrigin(0, 0);
      dialogBox.setDepth(100);
  
      const dialogText = this.add.text(x + 20, y + 10, '', {
          fontFamily: 'Verdana',
          fontSize: '10px',
          fill: '#ffffff',
          wordWrap: { width: dialogWidth - 40 },
      });

      dialogText.setDepth(101);
  
      let currentChar = 0;
      const typeSpeed = 50;
  
      this.typingEvent = this.time.addEvent({
          delay: typeSpeed,
          callback: () => {
              dialogText.text += text[currentChar];
              currentChar++;
  
              if (currentChar >= text.length) {
                  this.typingEvent.destroy();
                  this.time.delayedCall(1500, () => {
                    this.typingEvent.remove();
                    this.dialogBox.destroy();
                    this.dialogBox = null;
                    dialogText.setVisible(false);
                  })
              }
          },
          callbackScope: this,
          loop: true,
      });

      this.dialogBox = dialogBox;
      return dialogBox;
    }
    
    createProgressBar(x, y, duration) {
      const barWidth = 40;
      const barHeight = 6;
      const borderWidth = 2;
    
      const border = this.add.graphics({ x, y });
      border.lineStyle(borderWidth, 0xFFFFFF, 1);
      border.strokeRect(0, 0, barWidth, barHeight);
    
      const progressBar = this.add.graphics({ x: x + borderWidth, y: y + borderWidth });
      progressBar.fillRect(0, 0, barWidth - borderWidth * 2, barHeight - borderWidth * 2);
      
      
      const progressTween = this.tweens.add({
        targets: progressBar,
        scaleX: 0,
        duration: duration,
        ease: 'Linear',
        onUpdate: () => {
          if(this.itemPicked){
            progressTween.stop();
            progressBar.destroy();
            border.destroy();
          }else {
            if(progressTween.elapsed <= 2000){
              progressBar.fillStyle(0xFF0000, 1);
              this.registry.set('food', 'frozen food');
            } 
            else if(progressTween.elapsed >= 2000 && progressTween.elapsed <= 4000){
              progressBar.fillStyle(0xFFFF00, 1);
              this.registry.set('food', 'undercooked');
            }
            else if(progressTween.elapsed>= 4000 && progressTween.elapsed <= 6000){
              progressBar.fillStyle(0x00FF00, 1);
              this.registry.set('food', 'DELICIOUS');
            }
            else if(progressTween.elapsed >= 6000 && progressTween.elapsed <= 8000){
              progressBar.fillStyle(0xFFFF00, 1);
              this.registry.set('food', 'undercooked');
            }
            else if(progressTween.elapsed >= 8000){
              progressBar.fillStyle(0xFF0000, 1);
              this.registry.set('food', 'frozen food');
            }
          }
    
        },
        onComplete: () => {
          progressBar.destroy();
          border.destroy();
        },
      })

      return progressBar;
      }
}
class DiningScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DiningScene' });
    }

    preload(){
    }

    isPlayerNear(player, object, distance) {
      return Phaser.Math.Distance.Between(player.x, player.y, object.x, object.y) <= distance;
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setZoom(3);
        this.add.image(290, 240, 'dining bg').setOrigin(0, 0);

        const dTable1 = this.physics.add.staticImage(374, 300, 'dtable');
        const dTable2 = this.physics.add.staticImage(444, 300, 'dtable');
        const dTable4 = this.physics.add.staticImage(405, 343, 'dbigtable');

        this.tables = this.physics.add.staticGroup([dTable1, dTable2, dTable4]);

        this.player = this.physics.add.sprite(320, 300, 'character');
        this.player.setCollideWorldBounds(true);

        this.player.body.setSize(14, 6);
        this.player.body.setOffset(9, 23);

        //ego
        this.ego = this.physics.add.sprite(405, 322, 'ego');
        this.ego.setCollideWorldBounds(true);
        this.ego.setInteractive();

        this.ego.body.setSize(14, 10);
        this.ego.body.setOffset(9,23);
        this.ego.setImmovable(true)

        this.anims.create({
        key: 'egoIdle',
        frames: this.anims.generateFrameNumbers('ego', { start: 0, end: 0 }),
        frameRate: 2,
        repeat: -1,
        });

        //table bodies
        dTable1.body.setSize(30, 15);
        dTable1.body.setOffset(0, 10);
        dTable2.body.setSize(30, 15);
        dTable2.body.setOffset(0, 10);
        dTable4.body.setSize(40, 15);
        dTable4.body.setOffset(0, 10);

        this.fRata = this.physics.add.staticImage(999, 999, 'frata');
        this.fSpaget = this.physics.add.staticImage(999, 999, 'fspaget');
        this.fBurger = this.physics.add.staticImage(999, 999, 'fburger');

        dTable4.setDepth(3)
        dTable4.setInteractive();

        if(!this.registry.has('firstDiagShown')){
          this.registry.set('firstDiagShown', false);
        }
        if(!this.registry.get('firstDiagShown')){
          this.registry.set('firstDiagShown', true);
          this.remy = this.physics.add.staticImage(320, 280, 'remy');
          this.remy.setDepth(4);
          this.dialogBox = this.createDialogBox("REMY: That's Anton Ego, Paris' harshest food critic! He has high expectations and we must live up to them ...");
          this.time.delayedCall(7000, () => {
            this.dialogBox = this.createDialogBox("REMY: Quick! Go take his order!");
          })
          this.time.delayedCall(9000, () =>{
            this.remy.setVisible(false);
          })
          this.ego.setInteractive();
          let antonClicked = false;
          this.ego.on('pointerdown', () => {
          if(this.isPlayerNear(this.player, this.ego, 50) && !antonClicked){
            antonClicked = true;
            this.dialogBox = this.createDialogBox("ANTON: After hearing about the overheated puffery surrounding your new chef, you know what I'm craving?")
            this.time.delayedCall(7000, () => {
              this.dialogBox = this.createDialogBox("ANTON: A little perspective.");
            })
            this.time.delayedCall(10000, () => {
              this.dialogBox = this.createDialogBox("ANTON: That's it! I'd like some fresh, well seasoned perspective.");
            })
            this.time.delayedCall(14000, () => {
              let antonClicked = false;
              this.ego.on('pointerdown', () => {
              if(this.isPlayerNear(this.player, this.ego, 50) && !antonClicked && this.typingEvent){
                antonClicked = true;
                this.dialogBox = this.createDialogBox("ANTON: Just some perspective is all, is that so hard?");
              }
          })
            })
          }
          })
        }else{
          let antonClicked = false;
          this.ego.on('pointerdown', () => {
            if(this.isPlayerNear(this.player, this.ego, 50) && !antonClicked && this.typingEvent){
              antonClicked = true;
              let text = "ANTON: This food is ..." + this.registry.get('food');
              this.dialogBox = this.createDialogBox(text);
            }
          }); 
        }
        

        //walls
        const leftWall = this.add.rectangle(282,350,25,100, 0x000000);
        const rightWall = this.add.rectangle(518, 215, 25, 800, 0x000000);
        const topWall = this.add.rectangle(300, 284, 800, 16, 0x000000,0);
        const bottomWall = this.add.rectangle(300, 369, 800, 16, 0x000000);

        this.physics.add.existing(leftWall, true);
        this.physics.add.existing(rightWall, true);
        this.physics.add.existing(topWall, true);
        this.physics.add.existing(bottomWall, true);

        const walls = this.physics.add.staticGroup([leftWall, rightWall, topWall, bottomWall]);
        
        //add colliders
        this.physics.add.collider(this.player, this.tables);
        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, this.ego);

        const triggerBlock = this.add.rectangle(300, 310, 20, 32, 0x370a0d);
        triggerBlock.setDepth(0);
        this.physics.add.existing(triggerBlock, true);

        this.physics.add.overlap(this.player, triggerBlock, this.changeScene, null, this);

        const rug = this.add.rectangle(488, 320, 35, 40, 0x370a0d);

        this.createAnimations();

    }

    changeScene(player, triggerBlock) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            this.scene.start('MainScene');
        });
    }

    checkOverlap(player, trigger) {
        return (
            player.x < trigger.x + trigger.width &&
            player.x + player.width > trigger.x &&
            player.y < trigger.y + trigger.height &&
            player.y + player.height > trigger.y
        );
    }    

    createAnimations() {
        const anims = this.anims;
    
        // Create the animations for the character
        anims.create({
          key: 'down',
          frames: anims.generateFrameNumbers('character', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1,
        });
    
        anims.create({
          key: 'left',
          frames: anims.generateFrameNumbers('character', { start: 4, end: 7 }),
          frameRate: 10,
          repeat: -1,
        });
    
        anims.create({
          key: 'right',
          frames: anims.generateFrameNumbers('character', { start: 8, end: 11 }),
          frameRate: 10,
          repeat: -1,
        });
    
        anims.create({
          key: 'up',
          frames: anims.generateFrameNumbers('character', { start: 12, end: 15 }),
          frameRate: 10,
          repeat: -1,
        });
      }

      

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        const speed = 80;
        if(this.registry.get("firstDiagShown")){
          this.remy.setPosition(this.player.x, this.player.y -20);
        }
        // Horizontal movement
        if (cursors.left.isDown && !(cursors.up.isDown || cursors.down.isDown)) {
          this.player.setVelocityX(-speed);
          this.player.anims.play('left', true);
          if(this.registry.get('fRataPressed')){
            this.fRata.setVisible(true);
            this.fRata.setDepth(1);
            this.fRata.setPosition(this.player.x-8, this.player.y + 8);
          }
          if(this.registry.get('fBurgerPressed')){
            this.fBurger.setVisible(true);
            this.fBurger.setDepth(1);
            this.fBurger.setPosition(this.player.x-8, this.player.y + 8);
          }
          if(this.registry.get('fSpagetPressed')){
            this.fSpaget.setVisible(true);
            this.fSpaget.setDepth(1);
            this.fSpaget.setPosition(this.player.x-8, this.player.y + 8);
          }
      } else if (cursors.right.isDown && !(cursors.up.isDown || cursors.down.isDown)) {
          this.player.setVelocityX(speed);
          this.player.anims.play('right', true);
          if(this.registry.get('fRataPressed')){
            this.fRata.setVisible(true);
            this.fRata.setDepth(1);
            this.fRata.setPosition(this.player.x+8, this.player.y + 8);
          }
          if(this.registry.get('fBurgerPressed')){
            this.fBurger.setVisible(true);
            this.fBurger.setDepth(1);
            this.fBurger.setPosition(this.player.x+8, this.player.y + 8);
          }
          if(this.registry.get('fSpagetPressed')){
            this.fSpaget.setVisible(true);
            this.fSpaget.setDepth(1);
            this.fSpaget.setPosition(this.player.x+8, this.player.y + 8);
          }
      } else {
          this.player.setVelocityX(0);
      }
  
      // Vertical movement
      if (cursors.up.isDown && !(cursors.left.isDown || cursors.right.isDown)) {
          this.player.setVelocityY(-speed);
          this.player.anims.play('up', true);
          if(this.registry.get('fRataPressed')){
            this.fRata.setVisible(false);
          }
          if(this.registry.get('fBurgerPressed')){
            this.fBurger.setVisible(false);
          }
          if(this.registry.get('fSpagetPressed')){
            this.fSpaget.setVisible(false);
          }
      } else if (cursors.down.isDown && !(cursors.left.isDown || cursors.right.isDown)) {
          this.player.setVelocityY(speed);
          this.player.anims.play('down', true);
          if(this.registry.get('fRataPressed')){
            this.fRata.setVisible(true);
            this.fRata.setDepth(2);
            this.fRata.setPosition(this.player.x, this.player.y + 10);
          }
          if(this.registry.get('fBurgerPressed')){
            this.fBurger.setVisible(true);
            this.fBurger.setDepth(2);
            this.fBurger.setPosition(this.player.x, this.player.y + 10);
          }
          if(this.registry.get('fSpagetPressed')){
            this.fSpaget.setVisible(true);
            this.fSpaget.setDepth(2);
            this.fSpaget.setPosition(this.player.x, this.player.y + 10);
          }
      } else {
          this.player.setVelocityY(0);
      }
    
        if (!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
            this.player.anims.stop();
        }

        if((this.player.x >= 405 && this.player.y >= 343) || (this.player.x <= 445 && this.player.y >= 343)){
          this.player.setDepth(4)
          if(this.registry.get('fRataPressed')){
            this.fRata.setDepth(4);
          }
          if(this.registry.get('fBurgerPressed')){
            this.fBurger.setDepth(4);
          }
          if(this.registry.get('fSpagetPressed')){
            this.fSpaget.setDepth(4);
          }
        }
        else{
          this.player.setDepth(1)
          this.ego.setDepth(2)
        }

        this.physics.world.overlap(this.player, this.triggerBlock, () => {

            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('MainScene');
            });
        });
    }
    
    createDialogBox(text) {
      if (this.dialogBox) {
          this.dialogBox.destroy();
      }
      if(this.typingEvent){
        this.typingEvent.destroy();
      }
  
      const screenWidth = this.cameras.main.width;
      const screenHeight = this.cameras.main.height;
      const dialogWidth = screenWidth * 0.25;
      const dialogHeight = screenHeight * 0.1;
      const x = 300;
      const y = 325;
  
      const dialogBox = this.add.rectangle(x, y, dialogWidth, dialogHeight, 0x000000, 0.5);
      dialogBox.setStrokeStyle(2, 0xffffff, 1);
      dialogBox.setOrigin(0, 0);
      dialogBox.setDepth(100);
  
      const dialogText = this.add.text(x + 20, y + 10, '', {
          fontFamily: 'Verdana',
          fontSize: '10px',
          fill: '#ffffff',
          wordWrap: { width: dialogWidth - 40 },
      });

      dialogText.setDepth(101);
  
      let currentChar = 0;
      const typeSpeed = 50;
  
      this.typingEvent = this.time.addEvent({
          delay: typeSpeed,
          callback: () => {
              dialogText.text += text[currentChar];
              currentChar++;
  
              if (currentChar >= text.length) {
                  this.typingEvent.destroy();
                  this.time.delayedCall(1500, () => {
                    this.typingEvent.remove();
                    this.dialogBox.destroy();
                    this.dialogBox = null;
                    dialogText.setVisible(false);
                  })
              }
          },
          callbackScope: this,
          loop: true,
      });

      this.dialogBox = dialogBox;
      return dialogBox;
  }
  
  }



class DiningCut extends Phaser.Scene {
    constructor() {
        super({ key: 'DiningCut'});
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.cameras.main.setZoom(3);
        this.add.image(290, 240, 'dining bg').setOrigin(0, 0);

        const dTable1 = this.physics.add.staticImage(374, 300, 'dtable');
        const dTable2 = this.physics.add.staticImage(444, 300, 'dtable');
        const dTable4 = this.physics.add.staticImage(405, 343, 'dbigtable');

        dTable4.setDepth(3)

        this.tables = this.physics.add.staticGroup([dTable1, dTable2, dTable4]);

        this.ego = this.physics.add.sprite(550, 322, 'ego');
        this.ego.setCollideWorldBounds(true);
        this.ego.setDepth(2);
        this.ego.body.setSize(14, 6);
        this.ego.body.setOffset(9,23);

        this.moveEgoToTable();

        this.anims.create({
            key: 'egoIdle',
            frames: this.anims.generateFrameNumbers('ego', { start: 0, end: 0 }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: 'egoWalk',
            frames: this.anims.generateFrameNumbers('ego', { start: 1, end: 4 }),
            frameRate: 2,
            repeat: -1,
        });

        this.add.rectangle(300, 310, 20, 32, 0x370a0d);
        this.add.rectangle(488, 320, 35, 40, 0x370a0d);
    }

    moveEgoToTable() {
        this.tweens.add({
            targets: this.ego,
            x: 405,
            duration: 6000,
            onStart: () => {
                this.ego.play('egoWalk');
            },
            onUpdate: (tween, target) => {
                if (target.x > 405) {
                    this.ego.play('egoWalk', true);
                } else {
                    this.ego.play('egoIdle', true);
                }
            },
            onComplete: () => {
                this.ego.play('egoIdle');
                this.time.delayedCall(2000, () => {
                    this.scene.start('DiningScene');
                });
            }
        });
    }
}
  const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [PreloadScene, DiningCut, DiningScene, MainScene]
};

const game = new Phaser.Game(config);