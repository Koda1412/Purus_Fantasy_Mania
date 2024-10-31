

const assets = {
    charModelAsset: new pc.Asset("model_main", "model", { url: "../../assets/models/Mage.glb" }),
    charTextureAsset: new pc.Asset("tex_main", "texture", { url: "../../assets/textures/mage_texture.png" }),
    
    enemyModelAsset: new pc.Asset("model_enemy", "model", { url: "../../assets/models/Barbarian.glb" }),
    enemyTextureAsset: new pc.Asset("tex_enemy", "texture", { url: "../../assets/textures/barbarian_texture.png" }),
    
    enemy2ModelAsset: new pc.Asset("model_enemy_2", "model", { url: "../../assets/models/Rogue.glb" }),
    enemy2TextureAsset: new pc.Asset("tex_enemy_2", "texture", { url: "../../assets/textures/rogue_texture.png" }),
   
    enemy3ModelAsset: new pc.Asset("model_enemy_3", "model", { url: "../../assets/models/Knight.glb" }),
    enemy3TextureAsset: new pc.Asset("tex_enemy_3", "texture", { url: "../../assets/textures/knight_texture.png" }),
   
    enemy4ModelAsset: new pc.Asset("model_enemy_4", "model", { url: "../../assets/models/boss/Skeleton_Minion.glb" }),
    
    boss1ModelAsset: new pc.Asset("model_boss_1", "model", { url: "../../assets/models/boss/Skeleton_Rogue.glb" }),
    boss2ModelAsset: new pc.Asset("model_boss_2", "model", { url: "../../assets/models/boss/Skeleton_Mage.glb" }),
    boss3ModelAsset: new pc.Asset("model_boss_3", "model", { url: "../../assets/models/boss/Skeleton_Warrior.glb" }),
    bossTextureAsset: new pc.Asset("tex_boss", "texture", { url: "../../assets/textures/skeleton_texture.png" }),
   

    planeTextureAsset: new pc.Asset("plane_tex", "texture", { url: "../../assets/textures/grass.jpg" }),
    dirtTextureAsset: new pc.Asset("dirt_tex", "texture", { url: "../../assets/textures/sand.jpg" }),
    winterTextureAsset: new pc.Asset("winter_tex", "texture", { url: "../../assets/textures/snow.jpg" }),
    
    bombModelAsset: new pc.Asset("bomb_model", "model", { url: "../../assets/models/cartoon_bomb.glb" }),
    enemyBombModelAsset: new pc.Asset("enemy_bomb_model", "model", { url: "../../assets/models/enemy_Bomb.glb" }),
    boss1BombModelAsset: new pc.Asset("boss_bomb_model", "model", { url: "../../assets/models/boss_Bomb_Desert.glb" }),
    boss2BombModelAsset: new pc.Asset("boss_bomb_mode2", "model", { url: "../../assets/models/boss_Bomb_Mage.glb" }),
    boss3BombModelAsset: new pc.Asset("boss_bomb_mode3", "model", { url: "../../assets/models/boss_Bomb_Ice.glb" }),


    explosionBombModelAsset: new pc.Asset("explosion_bomb_model", "model", { url: "../../assets/models/explosion.glb" }),
    explosionEnemyBombModelAsset: new pc.Asset("explosion_bomb_model", "model", { url: "../../assets/models/enemy_explosion.glb" }),

    cornModelAsset: new pc.Asset("corn_model", "model", { url: "../../assets/models/obstacles/corn_1.glb" }),
    cactusflowerModelAsset: new pc.Asset("cactusflower_model", "model", { url: "../../assets/models/obstacles/cactusflower_1.glb" }),
    treeAModelAsset: new pc.Asset("tree_A_model", "model", { url: "../../assets/models/obstacles/cartoon_tree.glb" }),
    cartoonTreeModelAsset: new pc.Asset("tree_cartoon_model", "model", { url: "../../assets/models/obstacles/cartoon_tree_1.glb" }),
    sunflowerModelAsset: new pc.Asset("sunflower_model", "model", { url: "../../assets/models/obstacles/lowpoly_sunflower.glb" }),
    flowerModelAsset: new pc.Asset("flower_model", "model", { url: "../../assets/models/obstacles/flowers.glb" }),
    pineModelAsset: new pc.Asset("pine_model", "model", { url: "../../assets/models/obstacles/tree_lowpoly.glb" }),
    treeStumpModelAsset: new pc.Asset("tree_stump_model", "model", { url: "../../assets/models/obstacles/stylized_trunk.glb" }),
    woodlogModelAsset: new pc.Asset("woodlog_model", "model", { url: "../../assets/models/obstacles/woodlog.glb" }),
    
    cactusModelAsset: new pc.Asset("cactus_model", "model", { url: "../../assets/models/obstacles/stylized_cactus.glb" }),
    cactus2ModelAsset: new pc.Asset("cactus2_model", "model", { url: "../../assets/models/obstacles/cactus_2.glb" }),
    cactus3ModelAsset: new pc.Asset("cactus3_model", "model", { url: "../../assets/models/obstacles/cactus_3.glb" }),
    cactus4ModelAsset: new pc.Asset("cactus4_model", "model", { url: "../../assets/models/obstacles/cactus_4.glb" }),
    cactus5ModelAsset: new pc.Asset("cactus5_model", "model", { url: "../../assets/models/obstacles/cactus_5.glb" }),
    cactus1ModelAsset: new pc.Asset("cactus1_model", "model", { url: "../../assets/models/obstacles/cactus_1.glb" }),
    
    palmModelAsset: new pc.Asset("palm_model", "model", { url: "../../assets/models/obstacles/palmtree_1.glb" }),
    treeBModelAsset: new pc.Asset("tree_B_model", "model", { url: "../../assets/models/tree_B.glb" }),
    treeCModelAsset: new pc.Asset("tree_C_model", "model", { url: "../../assets/models/tree_A.glb" }),
    wheatModelAsset: new pc.Asset("wheat_model", "model", { url: "../../assets/models/obstacles/wheat.glb" }),
    rockModelAsset: new pc.Asset("rock_model", "model", { url: "../../assets/models/obstacles/rock_1.glb" }),
    cloudModelAsset: new pc.Asset("cloud_model", "model", { url: "../../assets/models/cloud.glb" }),
    
    berriesModelAsset: new pc.Asset("berries_model", "model", { url: "../../assets/models/obstacles/winter/bushberries.glb" }),
    treeSnowModelAsset: new pc.Asset("treeSnow_model", "model", { url: "../../assets/models/obstacles/winter/birchtree_snow.glb" }),
    treeDeathSnowModelAsset: new pc.Asset("treeDeathSnow_model", "model", { url: "../../assets/models/obstacles/winter/birchtree_dead_snow.glb" }),
    commonTreeSnowModelAsset: new pc.Asset("commonTreeSnow_model", "model", { url: "../../assets/models/obstacles/winter/commontree_snow.glb" }),
    rockSnowModelAsset: new pc.Asset("rockSnow_model", "model", { url: "../../assets/models/obstacles/winter/rock_snow.glb" }),
    pineSnowModelAsset: new pc.Asset("pineSnow_model", "model", { url: "../../assets/models/obstacles/winter/pinetree_snow.glb" }),
    willowSnowModelAsset: new pc.Asset("willowSnow_model", "model", { url: "../../assets/models/obstacles/winter/willow_snow.glb" }),
    woodlogSnowModelAsset: new pc.Asset("woodlogSnow_model", "model", { url: "../../assets/models/obstacles/winter/woodlog_snow.glb" }),
    bushSnowModelAsset: new pc.Asset("bushSnow_model", "model", { url: "../../assets/models/obstacles/winter/bush_snow.glb" }),


    obstacleTextureAsset: new pc.Asset("obstacle_tex", "texture", { url: "../../assets/textures/object_tex.png" }),
    
    charAttackAnimationAsset: new pc.Asset("anim_attack", "animation", { url: "../../assets/animations/Melee_Attack_Chop.glb" }),
    charRun2AnimationAsset: new pc.Asset("anim_run2", "animation", { url: "../../assets/animations/Running.glb" }),
    charIdleAnimationAsset: new pc.Asset("anim_idle", "animation", { url: "../../assets/animations/Unarmed_Idle.glb" }),
    charRunAnimationAsset: new pc.Asset("anim_run", "animation", { url: "../../assets/animations/Walking_A.glb"},),

};
