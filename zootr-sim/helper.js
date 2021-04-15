var logic = require("./logic.js");

var adult_trade = ["Pocket Egg", "Pocket Cucco", "Cojiro", "Odd Mushroom", "Poachers Saw", "Broken Sword", "Prescription", "Eyeball Frog", "Eyedrops", "Claim Check"];

var gossipStoneMap = {
	"Death Mountain Crater Gossip Stone": "Death Mountain Crater (Bombable Wall)",
	"Death Mountain Trail Gossip Stone": "Death Mountain Trail (Biggoron)",
	"Desert Colossus Gossip Stone": "Desert Colossus (Spirit Temple)",
	"Dodongos Cavern Gossip Stone": "Dodongos Cavern (Bombable Wall)",
	"Gerudo Valley Gossip Stone": "Gerudo Valley (Waterfall)",
	"Goron City Maze Gossip Stone": "Goron City (Maze)",
	"Goron City Medigoron Gossip Stone": "Goron City (Medigoron)",
	"Graveyard Gossip Stone": "Graveyard (Shadow Temple)",
	"Hyrule Castle Malon Gossip Stone": "Hyrule Castle (Malon)",
	"Hyrule Castle Rock Wall Gossip Stone": "Hyrule Castle (Rock Wall)",
	"Castle Storms Grotto Gossip Stone": "Hyrule Castle (Storms Grotto)",
	"Field Valley Grotto Gossip Stone": "Hyrule Field (Hammer Grotto)",
	"Deku Tree Gossip Stone (Left)": "Kokiri Forest (Deku Tree Left)",
	"Deku Tree Gossip Stone (Right)": "Kokiri Forest (Deku Tree Right)",
	"Kokiri Forest Gossip Stone": "Kokiri Forest (Storms)",
	"Lake Hylia Lab Gossip Stone": "Lake Hylia (Lab)",
	"Lake Hylia Gossip Stone (Southeast)": "Lake Hylia (Southeast Corner)",
	"Lake Hylia Gossip Stone (Southwest)": "Lake Hylia (Southwest Corner)",
	"Lost Woods Gossip Stone": "Lost Woods (Bridge)",
	"Sacred Forest Meadow Maze Gossip Stone (Lower)": "Sacred Forest Meadow (Maze Lower)",
	"Sacred Forest Meadow Maze Gossip Stone (Upper)": "Sacred Forest Meadow (Maze Upper)",
	"Sacred Forest Meadow Saria Gossip Stone": "Sacred Forest Meadow (Saria)",
	"Temple of Time Gossip Stone (Left)": "Temple of Time (Left)",
	"Temple of Time Gossip Stone (Left-Center)": "Temple of Time (Left-Center)",
	"Temple of Time Gossip Stone (Right)": "Temple of Time (Right)",
	"Temple of Time Gossip Stone (Right-Center)": "Temple of Time (Right-Center)",
	"Zoras Domain Gossip Stone": "Zoras Domain (Mweep)",
	"Zoras Fountain Fairy Gossip Stone": "Zoras Fountain (Fairy)",
	"Zoras Fountain Jabu Gossip Stone": "Zoras Fountain (Jabu)",
	"Zoras River Plateau Gossip Stone": "Zoras River (Plateau)",
	"Zoras River Waterfall Gossip Stone": "Zoras River (Waterfall)",
	"Field West Castle Town Grotto Gossip Stone": "Hyrule Field (Castle Moat Grotto)",
	"Remote Southern Grotto Gossip Stone": "Hyrule Field (Rock Grotto)",
	"Field Near Lake Outside Fence Grotto Gossip Stone": "Hyrule Field (Open Grotto)",
	"Kakariko Back Grotto Gossip Stone": "Kakariko (Potion Grotto)",
	"Zora River Plateau Open Grotto Gossip Stone": "Zoras River (Open Grotto)",
	"Kokiri Forest Storms Grotto Gossip Stone": "Kokiri Forest (Storms Grotto)",
	"Lost Woods Generic Grotto Gossip Stone": "Lost Woods (Rock Grotto)",
	"Mountain Storms Grotto Gossip Stone": "Death Mountain Trail (Storms Grotto)",
	"Top of Crater Grotto Gossip Stone": "Death Mountain Crater (Rock Grotto)",
};

var hintItemsMeanings = {
	"mystic training": "Magic Meter",
	"pixie dust": "Magic Meter",
	"a green rectangle": "Magic Meter",
	"a Magic Meter": "Magic Meter",
	"a white outline": "Double Defense",
	"damage decrease": "Double Defense",
	"strengthened love": "Double Defense",
	"Double Defense": "Double Defense",
	"a seed shooter": "Slingshot",
	"a rubberband": "Slingshot",
	"a child's catapult": "Slingshot",
	"a Slingshot": "Slingshot",
	"a banana": "Boomerang",
	"a stun stick": "Boomerang",
	"the Boomerang": "Boomerang",
	"a wizardly legume": "Magic Bean",
	"an archery enabler": "Bow",
	"a danger dart launcher": "Bow",
	"a Bow": "Bow",
	"an explosive container": "Bomb Bag",
	"a blast bag": "Bomb Bag",
	"a Bomb Bag": "Bomb Bag",
	"Dampe's keepsake": "Progressive Hookshot",
	"the Grapple Beam": "Progressive Hookshot",
	"the BOING! chain": "Progressive Hookshot",
	"a Hookshot": "Progressive Hookshot",
	"power gloves": "Progressive Strength Upgrade",
	"metal mittens": "Progressive Strength Upgrade",
	"the heavy lifty": "Progressive Strength Upgrade",
	"a Strength Upgrade": "Progressive Strength Upgrade",
	"a deeper dive": "Progressive Scale",
	"a piece of Zora": "Progressive Scale",
	"a Zora Scale": "Progressive Scale",
	"the dragon smasher": "Hammer",
	"the metal mallet": "Hammer",
	"the heavy hitter": "Hammer",
	"the Megaton Hammer": "Hammer",
	"sink shoes": "Iron Boots",
	"clank cleats": "Iron Boots",
	"the Iron Boots": "Iron Boots",
	"butter boots": "Hover Boots",
	"sacred slippers": "Hover Boots",
	"spacewalkers": "Hover Boots",
	"the Hover Boots": "Hover Boots",
	"a butter knife": "Kokiri Sword",
	"a starter slasher": "Kokiri Sword",
	"a switchblade": "Kokiri Sword",
	"the Kokiri Sword": "Kokiri Sword",
	"the biggest blade": "Biggoron Sword",
	"a colossal cleaver": "Biggoron Sword",
	"the Biggoron Sword": "Biggoron Sword",
	"evil's bane": "Master Sword",
	"the Master Sword": "Master Sword",
	"a wooden ward": "Deku Shield",
	"a triumph fork": "Triforce Piece",
	"a burnable barrier": "Deku Shield",
	"a Deku Shield": "Deku Shield",
	"a steel safeguard": "Hylian Shield",
	"Like Like's metal meal": "Hylian Shield",
	"a Hylian Shield": "Hylian Shield",
	"the reflective rampart": "Mirror Shield",
	"Medusa's weakness": "Mirror Shield",
	"a silvered surface": "Mirror Shield",
	"the Mirror Shield": "Mirror Shield",
	"teleportation": "Farores Wind",
	"a relocation rune": "Farores Wind",
	"a green ball": "Farores Wind",
	"a green gust": "Farores Wind",
	"Farore's Wind": "Farores Wind",
	"a safe space": "Nayrus Love",
	"an impregnable aura": "Nayrus Love",
	"a blue barrier": "Nayrus Love",
	"a blue crystal": "Nayrus Love",
	"Nayru's Love": "Nayrus Love",
	"an inferno": "Dins Fire",
	"a heat wave": "Dins Fire",
	"a red ball": "Dins Fire",
	"Din's Fire": "Dins Fire",
	"the furnace firearm": "Fire Arrows",
	"the burning bolts": "Fire Arrows",
	"a magma missile": "Fire Arrows",
	"the Fire Arrows": "Fire Arrows",
	"the refrigerator rocket": "Ice Arrows",
	"the frostbite bolts": "Ice Arrows",
	"an iceberg maker": "Ice Arrows",
	"the Ice Arrows": "Ice Arrows",
	"the shining shot": "Light Arrows",
	"the luminous launcher": "Light Arrows",
	"Ganondorf's bane": "Light Arrows",
	"the lighting bolts": "Light Arrows",
	"the Light Arrows": "Light Arrows",
	"a lie detector": "Lens of Truth",
	"a ghost tracker": "Lens of Truth",
	"true sight": "Lens of Truth",
	"a detective's tool": "Lens of Truth",
	"the Lens of Truth": "Lens of Truth",
	"a flute": "Ocarina",
	"a music maker": "Ocarina",
	"an Ocarina": "Ocarina",
	"ruby robes": "Goron Tunic",
	"fireproof fabric": "Goron Tunic",
	"cooking clothes": "Goron Tunic",
	"a Goron Tunic": "Goron Tunic",
	"a sapphire suit": "Zora Tunic",
	"scuba gear": "Zora Tunic",
	"a swimsuit": "Zora Tunic",
	"a Zora Tunic": "Zora Tunic",
	"a horse": "Epona",
	"a four legged friend": "Epona",
	"Epona": "Epona",
	"a song of royal slumber": "Zeldas Lullaby",
	"a triforce tune": "Zeldas Lullaby",
	"Zelda's Lullaby": "Zeldas Lullaby",
	"an equestrian etude": "Eponas Song",
	"Malon's melody": "Eponas Song",
	"a ranch song": "Eponas Song",
	"Epona's Song": "Eponas Song",
	"a song of dancing Gorons": "Sarias Song",
	"Saria's phone number": "Sarias Song",
	"Saria's Song": "Sarias Song",
	"Sunny Day": "Suns Song",
	"the ReDead's bane": "Suns Song",
	"the Gibdo's bane": "Suns Song",
	"the Sun's Song": "Suns Song",
	"a song 7 years long": "Song of Time",
	"the tune of ages": "Song of Time",
	"the Song of Time": "Song of Time",
	"Rain Dance": "Song of Storms",
	"a thunderstorm tune": "Song of Storms",
	"windmill acceleration": "Song of Storms",
	"the Song of Storms": "Song of Storms",
	"the song of tall trees": "Minuet of Forest",
	"an arboreal anthem": "Minuet of Forest",
	"a green spark trail": "Minuet of Forest",
	"the Minuet of Forest": "Minuet of Forest",
	"a song of lethal lava": "Bolero of Fire",
	"a red spark trail": "Bolero of Fire",
	"a volcanic verse": "Bolero of Fire",
	"the Bolero of Fire": "Bolero of Fire",
	"a song of a damp ditch": "Serenade of Water",
	"a blue spark trail": "Serenade of Water",
	"the lake's lyric": "Serenade of Water",
	"the Serenade of Water": "Serenade of Water",
	"a song of sandy statues": "Requiem of Spirit",
	"an orange spark trail": "Requiem of Spirit",
	"the desert ditty": "Requiem of Spirit",
	"the Requiem of Spirit": "Requiem of Spirit",
	"a song of spooky spirits": "Nocturne of Shadow",
	"a graveyard boogie": "Nocturne of Shadow",
	"a haunted hymn": "Nocturne of Shadow",
	"a purple spark trail": "Nocturne of Shadow",
	"the Nocturne of Shadow": "Nocturne of Shadow",
	"a luminous prologue melody": "Prelude of Light",
	"a yellow spark trail": "Prelude of Light",
	"the temple traveler": "Prelude of Light",
	"the Prelude of Light": "Prelude of Light",
	"a glass container": "Bottle",
	"an empty jar": "Bottle",
	"encased air": "Bottle",
	"a Bottle": "Bottle",
	"a call for help": "Bottle with Letter",
	"the note that Mweeps": "Bottle with Letter",
	"an SOS call": "Bottle with Letter",
	"a fishy stationery": "Bottle with Letter",
	"Ruto's Letter": "Bottle with Letter",
	"cow juice": "Bottle with Milk",
	"a white liquid": "Bottle with Milk",
	"a baby's breakfast": "Bottle with Milk",
	"a Milk Bottle": "Bottle with Milk",
	"a vitality vial": "Bottle with Red Potion",
	"a red liquid": "Bottle with Red Potion",
	"a Red Potion Bottle": "Bottle with Red Potion",
	"a magic mixture": "Bottle with Green Potion",
	"a green liquid": "Bottle with Green Potion",
	"a Green Potion Bottle": "Bottle with Green Potion",
	"an ailment antidote": "Bottle with Blue Potion",
	"a blue liquid": "Bottle with Blue Potion",
	"a Blue Potion Bottle": "Bottle with Blue Potion",
	"an imprisoned fairy": "Bottle with Fairy",
	"an extra life": "Bottle with Fairy",
	"Navi's cousin": "Bottle with Fairy",
	"a Fairy Bottle": "Bottle with Fairy",
	"an aquarium": "Bottle with Fish",
	"a deity's snack": "Bottle with Fish",
	"a Fish Bottle": "Bottle with Fish",
	"a conflagration canteen": "Bottle with Blue Fire",
	"an icemelt jar": "Bottle with Blue Fire",
	"a Blue Fire Bottle": "Bottle with Blue Fire",
	"an insectarium": "Bottle with Bugs",
	"Skulltula finders": "Bottle with Bugs",
	"a Bug Bottle": "Bottle with Bugs",
	"a spooky ghost": "Bottle with Poe",
	"a face in the jar": "Bottle with Poe",
	"a Poe Bottle": "Bottle with Poe",
	"the spookiest ghost": "Bottle with Big Poe",
	"a sidequest spirit": "Bottle with Big Poe",
	"a Big Poe Bottle": "Bottle with Big Poe",
	"the shake stone": "Stone of Agony",
	"the Rumble Pak (TM)": "Stone of Agony",
	"the Stone of Agony": "Stone of Agony",
	"a girl club membership": "Gerudo Membership Card",
	"a desert tribe's pass": "Gerudo Membership Card",
	"the Gerudo Card": "Gerudo Membership Card",
	"a mo' money holder": "Progressive Wallet",
	"a gem purse": "Progressive Wallet",
	"a portable bank": "Progressive Wallet",
	"a Wallet": "Progressive Wallet",
	"a lumber rack": "Deku Stick Capacity",
	"more flammable twigs": "Deku Stick Capacity",
	"Deku Stick Capacity": "Deku Stick Capacity",
	"more nuts": "Deku Nut Capacity",
	"flashbang storage": "Deku Nut Capacity",
	"Deku Nut Capacity": "Deku Nut Capacity",
	"a lot of love": "Heart Container",
	"a Valentine's gift": "Heart Container",
	"a boss's organ": "Heart Container",
	"a Heart Container": "Heart Container",
	"a little love": "Piece of Heart",
	"a broken heart": "Piece of Heart",
	"a Piece of Heart": "Piece of Heart",
	"a victory valentine": "Piece of Heart (Treasure Chest Game)",
	"a free heal": "Recovery Heart",
	"a hearty meal": "Recovery Heart",
	"a Band-Aid": "Recovery Heart",
	"a Recovery Heart": "Recovery Heart",
	"the dollar of defeat": "Rupee (Treasure Chest Game)",
	"a breakable branch": "Deku Stick (1)",
	"a Deku Stick": "Deku Stick (1)",
	"a unique coin": "Rupee (1)",
	"a penny": "Rupee (1)",
	"a green gem": "Rupee (1)",
	"a Green Rupee": "Rupee (1)",
	"a common coin": "Rupees (5)",
	"a blue gem": "Rupees (5)",
	"a Blue Rupee": "Rupees (5)",
	"couch cash": "Rupees (20)",
	"a red gem": "Rupees (20)",
	"a Red Rupee": "Rupees (20)",
	"big bucks": "Rupees (50)",
	"a purple gem": "Rupees (50)",
	"wealth": "Rupees (50)",
	"a Purple Rupee": "Rupees (50)",
	"a juicy jackpot": "Rupees (200)",
	"a yellow gem": "Rupees (200)",
	"a giant gem": "Rupees (200)",
	"great wealth": "Rupees (200)",
	"a Huge Rupee": "Rupees (200)",
	"a chicken dilemma": "Weird Egg",
	"the Weird Egg": "Weird Egg",
	"an autograph": "Zeldas Letter",
	"royal stationery": "Zeldas Letter",
	"royal snail mail": "Zeldas Letter",
	"Zelda's Letter": "Zeldas Letter",
	"a Cucco container": "Pocket Egg",
	"a Cucco, eventually": "Pocket Egg",
	"a fowl youth": "Pocket Egg",
	"the Pocket Egg": "Pocket Egg",
	"a little clucker": "Pocket Cucco",
	"the Pocket Cucco": "Pocket Cucco",
	"a cerulean capon": "Cojiro",
	"Cojiro": "Cojiro",
	"a powder ingredient": "Odd Mushroom",
	"an Odd Mushroom": "Odd Mushroom",
	"Granny's goodies": "Odd Potion",
	"an Odd Potion": "Odd Potion",
	"a tree killer": "Poachers Saw",
	"the Poacher's Saw": "Poachers Saw",
	"a shattered slicer": "Broken Sword",
	"the Broken Sword": "Broken Sword",
	"a pill pamphlet": "Prescription",
	"a doctor's note": "Prescription",
	"the Prescription": "Prescription",
	"a perceiving polliwog": "Eyeball Frog",
	"the Eyeball Frog": "Eyeball Frog",
	"a vision vial": "Eyedrops",
	"the Eyedrops": "Eyedrops",
	"a three day wait": "Claim Check",
	"the Claim Check": "Claim Check",
	"a dungeon atlas": "Map",
	"blueprints": "Map",
	"a Map": "Map",
	"a treasure tracker": "Compass",
	"a magnetic needle": "Compass",
	"a Compass": "Compass",
	"a master of unlocking": "BossKey",
	"a dungeon's master pass": "BossKey",
	"a Boss Key": "BossKey",
	"a tool for unlocking": "SmallKey",
	"a dungeon pass": "SmallKey",
	"a lock remover": "SmallKey",
	"a lockpick": "SmallKey",
	"a Small Key": "SmallKey",
	"a get out of jail free card": "FortressSmallKey",
	"a Jail Key": "FortressSmallKey",
	"something mysterious": "KeyError",
	"an unknown treasure": "KeyError",
	"An Error (Please Report This)": "KeyError",
	"a few danger darts": "Arrows (5)",
	"a few sharp shafts": "Arrows (5)",
	"Arrows (5 pieces)": "Arrows (5)",
	"some danger darts": "Arrows (10)",
	"some sharp shafts": "Arrows (10)",
	"Arrows (10 pieces)": "Arrows (10)",
	"plenty of danger darts": "Arrows (30)",
	"plenty of sharp shafts": "Arrows (30)",
	"Arrows (30 pieces)": "Arrows (30)",
	"a few explosives": "Bombs (5)",
	"a few blast balls": "Bombs (5)",
	"Bombs (5 pieces)": "Bombs (5)",
	"some explosives": "Bombs (10)",
	"some blast balls": "Bombs (10)",
	"Bombs (10 pieces)": "Bombs (10)",
	"lots-o-explosives": "Bombs (20)",
	"plenty of blast balls": "Bombs (20)",
	"Bombs (20 pieces)": "Bombs (20)",
	"a gift from Ganon": "Ice Trap",
	"a chilling discovery": "Ice Trap",
	"frosty fun": "Ice Trap",
	"an Ice Trap": "Ice Trap",
	"wizardly legumes": "Magic Bean",
	"a Magic Bean": "Magic Bean",
	"mice bombs": "Bombchus",
	"proximity mice": "Bombchus",
	"wall crawlers": "Bombchus",
	"trail blazers": "Bombchus",
	"Bombchus": "Bombchus",
	"a few mice bombs": "Bombchus (5)",
	"a few proximity mice": "Bombchus (5)",
	"a few wall crawlers": "Bombchus (5)",
	"a few trail blazers": "Bombchus (5)",
	"Bombchus (5 pieces)": "Bombchus (5)",
	"some mice bombs": "Bombchus (10)",
	"some proximity mice": "Bombchus (10)",
	"some wall crawlers": "Bombchus (10)",
	"some trail blazers": "Bombchus (10)",
	"Bombchus (10 pieces)": "Bombchus (10)",
	"plenty of mice bombs": "Bombchus (20)",
	"plenty of proximity mice": "Bombchus (20)",
	"plenty of wall crawlers": "Bombchus (20)",
	"plenty of trail blazers": "Bombchus (20)",
	"Bombchus (20 pieces)": "Bombchus (20)",
	"some nuts": "Deku Nuts (5)",
	"some flashbangs": "Deku Nuts (5)",
	"some scrub spit": "Deku Nuts (5)",
	"Deku Nuts (5 pieces)": "Deku Nuts (5)",
	"lots-o-nuts": "Deku Nuts (10)",
	"plenty of flashbangs": "Deku Nuts (10)",
	"plenty of scrub spit": "Deku Nuts (10)",
	"Deku Nuts (10 pieces)": "Deku Nuts (10)",
	"catapult ammo": "Deku Seeds (30)",
	"lots-o-seeds": "Deku Seeds (30)",
	"Deku Seeds (30 pieces)": "Deku Seeds (30)",
	"proof of destruction": "Gold Skulltula Token",
	"an arachnid chip": "Gold Skulltula Token",
	"spider remains": "Gold Skulltula Token",
	"one percent of a curse": "Gold Skulltula Token",
	"a Gold Skulltula Token": "Gold Skulltula Token",
	"is a foolish choice": "Foolish Choice",
	"way of the hero": "Way of the Hero",
	"Forest Trial protects": "Forest Trial",
	"Fire Trial protects": "Fire Trial",
	"Water Trial protects": "Water Trial",
	"Spirit Trial protects": "Spirit Trial",
	"Shadow Trial protects": "Shadow Trial",
	"Light Trial protects": "Light Trial",
};

var hintLocationsMeanings = {
	"the Skull Kid grants": "Skull Kid",
	"collecting cuccos rewards": "Anjus Chickens",
	"Big Poes leads to": "10 Big Poes",
	"ghost hunters will be rewarded with": "10 Big Poes",
	"the Skull Mask yields": "Deku Theater Skull Mask",
	"the Mask of Truth yields": "Deku Theater Mask of Truth",
	"slaying 20 Gold Skulltulas reveals": "20 Gold Skulltula Reward",
	"slaying 30 Gold Skulltulas reveals": "30 Gold Skulltula Reward",
	"slaying 40 Gold Skulltulas reveals": "40 Gold Skulltula Reward",
	"slaying 50 Gold Skulltulas reveals": "50 Gold Skulltula Reward",
	"the treasure thrown by Princess Zelda is": "Ocarina of Time",
	"the Ocarina of Time teaches": "Song from Ocarina of Time",
	"Biggoron crafts": "Biggoron",
	"an amphibian feast yields": "Frog Ocarina Game",
	"the croaking choir's magnum opus awards": "Frog Ocarina Game",
	"the froggy finale yields": "Frog Ocarina Game",
	"the final reward from the Frogs of Zora's River is": "Frog Ocarina Game",
	"shooting in youth grants": "Child Shooting Gallery",
	"shooting in maturity grants": "Adult Shooting Gallery",
	"the first explosive prize is": "Bombchu Bowling Bomb Bag",
	"the second explosive prize is": "Bombchu Bowling Piece of Heart",
	"the bovine bounty of a horseback hustle gifts": "Links House Cow",
	"in Gerudo Valley the hammer unlocks": "Gerudo Valley Hammer Rocks Chest",
	"a spider in the Wasteland hold": "GS Wasteland Ruins",
	"unfreezing King Zora grants": "King Zora Thawed",
	"in the Crater a scrub sells": "DMC Deku Scrub Bombs",
	"within a tree, a spider on the ceiling holds": "GS Deku Tree MQ Basement Ceiling",
	"in the belly of a deity, a school of stingers guard": "Boomerang Chest",
	"high in the Fire Temple, a spider holds": "GS Fire Temple MQ Above Fire Wall Maze",
	"fishing in youth bestows": "Child Fishing",
	"fishing in maturity bestows": "Adult Fishing",
	"gambling grants": "Treasure Chest Game",
	"there is a 1/32 chance to win": "Treasure Chest Game",
	"the treasure chest game grants": "Treasure Chest Game",
	"Darunia's dance leads to": "Darunias Joy",
	"mastery of horseback archery grants": "Horseback Archery 1500 Points",
	"scoring 1500 in horseback archery grants": "Horseback Archery 1500 Points",
	"staring into the sun grants": "Lake Hylia Sun",
	"shooting the sun grants": "Lake Hylia Sun",
	"playing Sun's Song in a grave spawns": "Heart Piece Grave Chest",
	"in Goron City the hammer unlocks": "Goron City Leftmost Maze Chest",
	"a storm near the castle reveals": "GS Hyrule Castle Grotto",
	"buried near the valley a spider holds": "GS Hyrule Field Near Gerudo Valley",
	"a spider high above the icy waters holds": "GS Zora's Fountain Hidden Cave",
	"deep in the forest, shadows guard a chest containing": "Forest Temple Floormaster Chest",
	"a Floormaster in Forest Temple guards": "Forest Temple Floormaster Chest",
	"high in the Fire Temple, Pierre hid": "Fire Temple Scarecrow Chest",
	"high in the Fire Temple, Flare Dancers hid": "Fire Temple MQ West Tower Top Chest/Fire Temple Megaton Hammer Chest",
	"deep under the lake, beyond the currents, hides": "Water Temple River Chest",
	"the Water Temple River Chest holds": "Water Temple River Chest",
	"deep under the lake, the gilded chest contains": "Water Temple MQ Boss Key Chest/Water Temple Boss Key Chest",
	"the Water Temple Gilded Chest holds": "Water Temple MQ Boss Key Chest/Water Temple Boss Key Chest",
	"deep under the lake, the apparent key is really": "Water Temple MQ Freestanding Key",
	"deep under the lake, the locked spider holds": "GS Water Temple MQ North Basement",
	"those who seek sunken silver rupees will find": "Gerudo Training Grounds MQ Underwater Silver Rupee Chest/Gerudo Training Grounds Underwater Silver Rupee Chest",
	"the final prize of the thieves' training is": "Gerudo Training Grounds MQ Ice Arrows Chest/Gerudo Training Grounds Maze Path Final Chest",
	"Dead Hand holds": "Bottom of the Well MQ Compass Chest/Bottom of the Well Defeat Boss",
	"Dead Hand in the well holds": "Bottom of the Well MQ Compass Chest/Bottom of the Well Defeat Boss",
	"upon the Colossus's right hand is": "Silver Gauntlets Chest",
	"upon the Colossus's left hand is": "Mirror Shield Chest",
	"within the Colossus a temporal paradox yields": "Spirit Temple MQ Child Center Chest",
	"within the Colossus a symphony yields": "Spirit Temple MQ Lower Adult Right Chest",
	"within the Colossus a spider's symphony yields": "GS Spirit Temple MQ Lower Adult Right",
	"shadows in an invisible maze guard": "Shadow Temple MQ Bomb Flower Chest/Shadow Temple Hidden Floormaster Chest",
	"after a free boat ride comes": "Shadow Temple MQ Bomb Flower Chest/Shadow Temple Hidden Floormaster Chest",
	"deep in the Wasteland is": "Haunted Wasteland Structure Chest",
	"beneath the sands, flames reveal": "Haunted Wasteland Structure Chest",
	"in the Composers' Grave, darkness hides": "Composer Grave Chest",
	"the Composer Brothers hid": "Composer Grave Chest",
	"in the Composers' Grave, ReDead guard": "Song from Composer Grave",
	"the Composer Brothers wrote": "Song from Composer Grave",
	"deep in the forest Sheik teaches": "Sheik Forest Song",
	"Sheik waits at a monument to time to teach": "Sheik at Temple",
	"the crater's melody is": "Sheik in Crater",
	"the frozen cavern echoes with": "Sheik in Ice Cavern",
	"a ravaged village mourns with": "Sheik in Kakariko",
	"a hero ventures beyond the Wasteland to learn": "Sheik at Colossus",
	"under the icy waters lies": "Zoras Fountain Bottom Freestanding PoH",
	"riding a beanstalk in the desert leads to": "Colossus Freestanding PoH",
	"riding a beanstalk in the crater leads to": "DM Crater Volcano Freestanding PoH",
	"spinning Goron pottery contains": "Goron City Pot Freestanding PoH",
	"within a tree, a temporal stone contains": "Deku Tree MQ After Spinning Log Chest",
	"in the belly of a deity, a spider surrounded by shadows holds": "GS Jabu Jabu MQ Invisible Enemies Room",
	"protects Ganon's Tower": "Required Trials",
	'an ancient tree': 'Deku Tree',
	'Deku Tree': 'Deku Tree',
	'an immense cavern': 'Dodongos Cavern',
	'Dodongo\'s Cavern': 'Dodongos Cavern',
	'the belly of a deity': 'Jabu Jabus Belly',
	'Jabu Jabu\'s Belly': 'Jabu Jabus Belly',
	'a deep forest': 'Forest Temple',
	'Forest Temple': 'Forest Temple',
	'a high mountain': 'Fire Temple',
	'Fire Temple': 'Fire Temple',
	'a vast lake': 'Water Temple',
	'Water Temple': 'Water Temple',
	'the house of the dead': 'Shadow Temple',
	'Shadow Temple': 'Shadow Temple',
	'the goddess of the sand': 'Spirit Temple',
	'Spirit Temple': 'Spirit Temple',
	'a frozen maze': 'Ice Cavern',
	'Ice Cavern': 'Ice Cavern',
	'a shadow\'s prison': 'Bottom of the Well',
	'Bottom of the Well': 'Bottom of the Well',
	'the test of thieves': 'Gerudo Training Grounds',
	'Gerudo Training Grounds': 'Gerudo Training Grounds',
	'outside Ganon\'s Castle': 'Outside Ganon\'s Castle',
	'a conquered citadel': 'Ganon\'s Castle',
	'Ganon\'s Castle': 'Ganon\'s Castle',
	'Death Mountain Trail': 'Death Mountain Trail',
	'Graveyard': 'Graveyard',
	'Goron City': 'Goron City',
	'Lost Woods': 'Lost Woods',
	'Temple of Time': 'Temple of Time',
	'Haunted Wasteland': 'Haunted Wasteland',
	'Desert Colossus': 'Desert Colossus',
	'Lost Woods': 'Lost Woods',
	'Kokiri Forest': 'Kokiri Forest',
	'Death Mountain Crater': 'Death Mountain Crater',
	'Desert Colossus': 'Desert Colossus',
	'Lon Lon Ranch': 'Lon Lon Ranch',
	'Sacred Forest Meadow': 'Sacred Forest Meadow',
	'Gerudo\'s Fortress': 'Gerudo Fortress',
	'Kakariko Village': 'Kakariko Village',
	'Market': 'Market',
	'Gerudo Valley': 'Gerudo Valley',
	'Lake Hylia': 'Lake Hylia',
	'Zora\'s River': 'Zora\'s River',
	'Zora\'s Domain': 'Zora\'s Domain',
	'Zora\'s Fountain': 'Zora\'s Fountain',
	'Hyrule Castle': 'Hyrule Castle',
	'Hyrule Field': 'Hyrule Field',
};

function parseLogicRule(save_file, rule) {
	if (!save_file.use_logic) {
		return true;
	}
	var items = save_file["current_items"];
	var settings = save_file["settings"];
	var age = save_file["current_age"];
	var logicEvaluation = {
		True: () => true,
		False: () => false,
		is_starting_age: () => true,
		Time_Travel: () => true,
		open_forest: () => settings.get("open_forest") == "open",
		can_use: x => ((x == "Sticks" && logicEvaluation.is_child()) || x == "Nuts" || (x.replace(/_/g, " ") == "Goron Tunic" && logicEvaluation.is_adult()) || (x.replace(/_/g, " ") == "Zora Tunic" && logicEvaluation.is_adult())) ||
			(logicEvaluation.is_magic_item(x.replace(/_/g, " ")) && logicEvaluation.has("Magic Meter") && logicEvaluation.has(x)) ||
			(logicEvaluation.is_adult_item(x.replace(/_/g, " ")) && logicEvaluation.is_adult() && logicEvaluation.has(x)) ||
			(logicEvaluation.is_magic_arrow(x.replace(/_/g, " ")) && logicEvaluation.has("Magic Meter") && logicEvaluation.is_adult() && logicEvaluation.has("Bow") && logicEvaluation.has(x)) ||
			(logicEvaluation.is_child_item(x.replace(/_/g, " ")) && logicEvaluation.is_child() && logicEvaluation.has(x)) ||
			(x == "Hookshot" && logicEvaluation.is_adult() && logicEvaluation.has("Progressive Hookshot")) ||
			(x == "Longshot" && logicEvaluation.is_adult() && items.filter(x => x == "Progressive Hookshot").length >= 2) ||
			(x.replace(/_/g, " ") == "Silver Gauntlets" && logicEvaluation.is_adult() && items.filter(x => x == "Progressive Strength Upgrade").length >= 2) ||
			(x.replace(/_/g, " ") == "Golden Gauntlets" && logicEvaluation.is_adult() && items.filter(x => x == "Progressive Strength Upgrade").length >= 3) ||
			(x == "Scarecrow" && logicEvaluation.Ocarina() && logicEvaluation.can_use("Hookshot")) ||
			((x == "Distant Scarecrow" || x == "Distant_Scarecrow") && logicEvaluation.Ocarina() && logicEvaluation.can_use("Longshot")) ||
			(x.replace(/_/g, " ") == "Goron Tunic" || x.replace(/_/g, " ") == "Zora Tunic"),
		is_magic_item: x => x == "Dins Fire" || x == "Farores Wind" || x == "Nayrus Love" || x == "Lens of Truth",
		is_magic_arrow: x => x == "Fire Arrows" || x == "Light Arrows",
		is_adult_item: x => x == "Bow" || x == "Hammer" || x == "Iron Boots" || x == "Hover Boots" || x == "Progressive Hookshot" || x == "Progressive Strength Upgrade" || x == "Scarecrow" || x == "Distant Scarecrow",
		is_child_item: x => x == "Slingshot" || x == "Boomerang" || x == "Kokiri Sword" || x == "Deku Shield",
		can_see_with_lens: () => true,
		has_projectile: x => logicEvaluation.has_explosives() ||
			(x == "child" && (logicEvaluation.has("Slingshot") || logicEvaluation.Boomerang())) ||
			(x == "adult" && (logicEvaluation.Bow() || logicEvaluation.has("Progressive Hookshot"))) ||
			(x == "both" && (logicEvaluation.has("Slingshot") || logicEvaluation.Boomerang()) && (logicEvaluation.Bow() || logicEvaluation.has("Progressive Hookshot"))) ||
			(x == "either" && (logicEvaluation.has("Slingshot") || logicEvaluation.Boomerang() || logicEvaluation.Bow() || logicEvaluation.has("Progressive Hookshot"))),
		has: x => items.includes(x.replace(/_/g, " ")),
		has_explosives: () => logicEvaluation.has("Bomb Bag") || logicEvaluation.has_bombchus(),
		has_bombchus: () => save_file.bombchu_count > 0,
		has_all_stones: () => logicEvaluation.has("Kokiri Emerald") && logicEvaluation.has("Goron Ruby") && logicEvaluation.has("Zora Sapphire"),
		has_all_medallions: () => logicEvaluation.has("Light Medallion") && logicEvaluation.has("Forest Medallion") && logicEvaluation.has("Fire Medallion") && logicEvaluation.has("Water Medallion") && logicEvaluation.has("Spirit Medallion") && logicEvaluation.has("Shadow Medallion"),
		Sticks: () => true,
		Bombs: () => logicEvaluation.has("Bomb Bag"),
		Hammer: () => logicEvaluation.has("Hammer"),
		Bow: () => logicEvaluation.has("Bow"),
		Mirror_Shield: () => logicEvaluation.has("Mirror Shield"),
		Slingshot: () => logicEvaluation.has("Slingshot"),
		Iron_Boots: () => logicEvaluation.has("Iron Boots"),
		Hover_Boots: () => logicEvaluation.has("Hover Boots"),
		Progressive_Wallet: () => logicEvaluation.has("Progressive Wallet"),
		Gerudo_Membership_Card: () => logicEvaluation.has("Gerudo Card") || !logicEvaluation.shuffle_gerudo_card(),
		shuffle_gerudo_card: () => settings.get("shuffle_gerudo_card"),
		shuffle_special_indoor_entrances: () => false,
		Progressive_Hookshot: () => logicEvaluation.has("Progressive Hookshot"),
		Progressive_Strength_Upgrade: () => logicEvaluation.has("Progressive Strength Upgrade"),
		Blue_Fire: () => logicEvaluation.has_bottle(),
		Bonooru: () => true,
		can_play: x => (logicEvaluation.Ocarina()) && logicEvaluation.has(x),
		Boomerang: () => logicEvaluation.has("Boomerang"),
		Kokiri_Sword: () => logicEvaluation.has("Kokiri Sword"),
		Opened_Child_River: () => logicEvaluation.has("Opened Child River"),
		Ocarina: () => logicEvaluation.has("Fairy Ocarina") || logicEvaluation.has("Ocarina of Time") || logicEvaluation.has("Ocarina"),
		Zeldas_Letter: () => logicEvaluation.has("Zeldas Letter"),
		Eyedrops: () => logicEvaluation.has("Eyedrops"),
		Claim_Check: () => items.filter(x => adult_trade.includes(x)).length > 0,
		Forest_Medallion: () => logicEvaluation.has("Forest Medallion"),
		Fire_Medallion: () => logicEvaluation.has("Fire Medallion"),
		Water_Medallion: () => logicEvaluation.has("Water Medallion"),
		Spirit_Medallion: () => logicEvaluation.has("Spirit Medallion"),
		Shadow_Medallion: () => logicEvaluation.has("Shadow Medallion"),
		Light_Medallion: () => logicEvaluation.has("Light Medallion"),
		Big_Poe: () => logicEvaluation.has("Big Poe"),
		Bottle_with_Letter: () => logicEvaluation.has("Bottle with Letter"),
		can_child_attack: () => true,
		has_bottle: () => items.filter(x => x.includes("Bottle")).length > 0,
		can_use_projectile: () => logicEvaluation.has_explosives() || (logicEvaluation.is_adult() && (logicEvaluation.has("Bow") || logicEvaluation.has("Progressive Hookshot"))) || (logicEvaluation.is_child() && (logicEvaluation.has("Progressive Slingshot") || logicEvaluation.has("Boomerang"))),
		here: () => true,
		has_fire_source: () => logicEvaluation.can_use("Dins Fire") || logicEvaluation.can_use("Fire Arrows"),
		has_fire_source_with_torch: () => logicEvaluation.has_fire_source() || logicEvaluation.is_child(),
		can_stun_deku: () => true,
		can_summon_gossip_fairy: () => true,
		can_summon_gossip_fairy_without_suns: () => true,
		can_finish_GerudoFortress: () => true,
		can_blast_or_smash: () => logicEvaluation.has_explosives() || logicEvaluation.can_use("Hammer"),
		can_dive: () => logicEvaluation.has("Progressive Scale"),
		logic_fewer_tunic_requirements: () => true,
		is_child: () => age == "child",
		is_adult: () => age == "adult",
		can_plant_bugs: () => logicEvaluation.is_child() && logicEvaluation.has_bottle(),
		can_plant_bean: () => ((!save_file.settings.get("shuffle_beans") && (logicEvaluation.has("Bomb Bag") || logicEvaluation.has("Progressive Scale"))) || logicEvaluation.has("Magic Bean Pack")),
		can_cut_shrubs: () => logicEvaluation.is_adult() || logicEvaluation.has("Kokiri Sword") || logicEvaluation.Boomerang() || logicEvaluation.has_explosives(),
		can_ride_epona: () => logicEvaluation.is_adult() && logicEvaluation.can_play("Eponas Song"),
		found_bombchus: () => settings.get("bombchus_in_logic") ? items.filter(x => x.includes("Bombchus")).length > 0 : logicEvaluation.has("Bomb Bag"),
		has_shield: () => true, //(logicEvaluation.is_adult() && logicEvaluation.has("Hylian_Shield")) || (logicEvaluation.is_child() && logicEvaluation.has("Deku_Shield")),
		at_night: () => true,
		damage_multiplier: () => true,
		at: () => true,
		keysanity: () => settings.get("shuffle_smallkeys") == "keysanity",
		shuffle_dungeon_entrances: () => false,
		can_trigger_lacs: () => logicEvaluation.has("Shadow Medallion") && logicEvaluation.has("Spirit Medallion"),
		at_day: () => true,
		at_dampe_time: () => true,
		guarantee_trade_path: () => true,
		Song_of_Time: () => logicEvaluation.can_play("Song of Time"),
		Eponas_Song: () => logicEvaluation.can_play("Eponas Song"),
		Suns_Song: () => logicEvaluation.can_play("Suns Song"),
		Song_of_Storms: () => logicEvaluation.can_play("Song of Storms"),
		Zeldas_Lullaby: () => logicEvaluation.can_play("Zeldas Lullaby"),
		bombchus_in_logic: () => true,
		can_open_bomb_grotto: () => logicEvaluation.can_blast_or_smash(),
		can_open_storms_grotto: () => logicEvaluation.can_play("Song of Storms"),
		can_open_storm_grotto: () => logicEvaluation.can_play("Song of Storms"),
		had_night_start: () => true,
		can_leave_forest: () => settings.get("open_forest") != "closed" || logicEvaluation.is_adult() || logicEvaluation.Deku_Tree_Clear(),
		Dins_Fire: () => logicEvaluation.has("Dins Fire"),
		Fairy: () => logicEvaluation.has_bottle(),
		Fire_Arrows: () => logicEvaluation.can_use("Fire Arrows"),
		shuffle_scrubs: () => settings.get("shuffle_scrubs") == "on",
		free_scarecrow: () => true,
		open_gerudo_fortress: () => settings.get("gerudo_fortress") == "open",
		closed_zora_fountain: () => settings.get("zora_fountain") == "closed",
		adult_zora_fountain: () => settings.get("zora_fountain") == "adult",
		Magic_Meter: () => logicEvaluation.has("Magic Meter"),
		Nuts: () => true,
		Child_Water_Temple: () => false,
		shuffle_overworld_entrances: () => settings.get("entrance_shuffle") == "all",
		open_door_of_time: () => settings.get("open_door_of_time"),
		Weird_Egg: () => logicEvaluation.has("Weird Egg"),
		shuffle_weird_egg: () => settings.get("shuffle_weird_egg"),
		can_build_rainbow_bridge: () => (settings.get("bridge") == "open") ||
										(settings.get("bridge") == "vanilla" && logicEvaluation.has("Shadow Medallion") && logicEvaluation.has("Spirit Medallion") && logicEvaluation.has("Light Arrows")) ||
										(settings.get("bridge") == "stones" && logicEvaluation.has_all_stones()) ||
										(settings.get("bridge") == "medallions" && logicEvaluation.has_all_medallions()) ||
										(settings.get("bridge") == "dungeons" && logicEvaluation.has_all_stones() && logicEvaluation.has_all_medallions()) ||
										(settings.get("bridge") == "tokens" && items.filter(x => x == "Gold Skulltula Token").length >= 100),
		Deliver_Letter: () => logicEvaluation.has("Bottle with Letter"),
		open_zora_fountain: () => settings.get("zora_fountain") == "open",
		Fish: () => logicEvaluation.has_bottle(),
		skipped_trial: (x) => save_file.trials.get(x) == "inactive",
		can_reach: (x) => parseLogicRule(save_file, buildRule(save_file, save_file["current_region"], x)),
		has_deku_shield: () => settings.get("shopsanity") == "off" || logicEvaluation.has("Deku Shield"),
		"Showed Mido Sword & Shield": () => parseLogicRule(save_file, "(open_forest or (is_child and Kokiri_Sword and has_deku_shield))"),
		"Odd Mushroom Access": () => parseLogicRule(save_file, "(is_adult and ('Cojiro Access' or Cojiro))"),
		"Poachers Saw Access": () => parseLogicRule(save_file, "(is_adult and 'Odd Potion Access')"),
		"Bonooru": () => parseLogicRule(save_file, "(is_child and Ocarina)"),
		"Eyedrops Access": () => parseLogicRule(save_file, "( is_adult and ('Eyeball Frog Access' or (Eyeball_Frog and disable_trade_revert)))"),
		"Broken Sword Access": () => parseLogicRule(save_file, "(is_adult and ('Poachers Saw Access' or Poachers_Saw))"),
		"Carpenter Rescue": () => parseLogicRule(save_file, "(can_finish_GerudoFortress)"),
		"Gerudo Fortress Gate Open": () => parseLogicRule(save_file, "(is_adult and Gerudo_Membership_Card)"),
		"Sell Big Poe": () => parseLogicRule(save_file, "(is_adult and Bottle_with_Big_Poe)"),
		"Skull Mask": () => parseLogicRule(save_file, "(( is_child and Zeldas_Letter))"),
		"Mask of Truth": () => parseLogicRule(save_file, "('Skull Mask' and ( is_child and can_play(Sarias_Song)) and ( is_child and at_day) and ( is_child and has_all_stones))"),
		"Cojiro Access": () => parseLogicRule(save_file, "(is_adult and 'Wake Up Adult Talon')"),
		"Kakariko Village Gate Open": () => parseLogicRule(save_file, "(is_child and Zeldas_Letter)"),
		"Wake Up Adult Talon": () => parseLogicRule(save_file, "(is_adult and (Pocket_Egg or Pocket_Cucco))"),
		"Drain Well": () => parseLogicRule(save_file, "(is_child and can_play(Song_of_Storms))"),
		"Odd Potion Access": () => parseLogicRule(save_file, "( is_adult and has(Odd_Mushroom))"),
		"Prescription Access": () => parseLogicRule(save_file, "(is_adult and ('Broken Sword Access' or Broken_Sword))"),
		"Goron City Child Fire": () => parseLogicRule(save_file, "(is_child and (can_use(Dins_Fire) or (can_play(Zeldas_Lullaby) and can_use(Sticks))))"),
		"Stop Link the Goron": () => parseLogicRule(save_file, "( is_adult and (Progressive_Strength_Upgrade or has_explosives or Bow or (logic_link_goron_dins and can_use(Dins_Fire))))"),
		"Zora Thawed": () => parseLogicRule(save_file, "(is_adult and Blue_Fire)"),
		"Eyeball Frog Access": () => parseLogicRule(save_file, "( is_adult and 'Zora Thawed' and (Eyedrops or Eyeball_Frog or Prescription or 'Prescription Access'))"),
		"Epona": () => parseLogicRule(save_file, "(can_play(Eponas_Song) and is_adult and at_day)"),
		"Links Cow": () => parseLogicRule(save_file, "(can_play(Eponas_Song) and is_adult and at_day)"),
		"Forest Trial Clear": () => parseLogicRule(save_file, ""),
		"Fire Trial Clear": () => parseLogicRule(save_file, ""),
		"Water Trial Clear": () => parseLogicRule(save_file, ""),
		"Shadow Trial Clear": () => parseLogicRule(save_file, ""),
		"Spirit Trial Clear": () => parseLogicRule(save_file, ""),
		"Light Trial Clear": () => parseLogicRule(save_file, ""),
		"Deku Tree Clear": () => parseLogicRule(save_file, "( (has_shield) and (is_adult or Kokiri_Sword or Sticks))"),
		"Forest Temple Amy and Meg": () => parseLogicRule(save_file, "can_reach('Forest Temple Falling Room') and (can_use(Bow))"),
		"Forest Temple Jo and Beth": () => parseLogicRule(save_file, "can_reach('Forest Temple Bow Region') and (can_use(Bow))"),
		"Child Water Temple": () => parseLogicRule(save_file, "(is_child)"),
		"Water Temple Clear": () => save_file.checked_locations.includes("Morpha"),
		Deku_Tree_Clear: () => save_file.checked_locations.includes("Queen Gohma"),
		Boss_Key_Forest_Temple: () => settings.get("shuffle_bosskeys") == "remove" || logicEvaluation.has("Boss Key (Forest Temple)"),
		Boss_Key_Fire_Temple: () => settings.get("shuffle_bosskeys") == "remove" || logicEvaluation.has("Boss Key (Fire Temple)"),
		Boss_Key_Water_Temple: () => settings.get("shuffle_bosskeys") == "remove" || logicEvaluation.has("Boss Key (Water Temple)"),
		Boss_Key_Spirit_Temple: () => settings.get("shuffle_bosskeys") == "remove" || logicEvaluation.has("Boss Key (Spirit Temple)"),
		Boss_Key_Shadow_Temple: () => settings.get("shuffle_bosskeys") == "remove" || logicEvaluation.has("Boss Key (Shadow Temple)"),
		Boss_Key_Ganons_Castle: () => settings.get("shuffle_ganon_bosskey") == "remove" || logicEvaluation.has("Boss Key (Ganons Castle)"),
	}

	rule = rule.trim();
	var it = 0;

	function evaluate(term, params = []) {
		if (term.includes("Small_Key") || term.startsWith("logic_")) {
			return true;
		}
		if (!(term in logicEvaluation)) {
			throw "Unrecognized term: " + term;
		}
		return logicEvaluation[term](params.length == 1 ? params[0] : params);
	}

	function peekChar(n = 1) {
		return rule.substring(it, it + n);
	}

	function getChar(n = 1) {
		it += n;
		return rule.substring(it - n, it);
	}

	function getNum() {
		var n = 0;
		while (/^[0-9]+$/.test(peekChar(n + 1)) && it + n < rule.length) {
			n++;
		}
		return getChar(n);
	}

	function commaFollowsToken() {
		var n = 1;
		if (peekChar() == "'") {
			while (it + n < rule.length) {
				if (/^'[^']*' *,$/.test(peekChar(n))) {
					return true;
				}
				else if (/^'[^']*' *[^,]$/.test(peekChar(n))) {
					return false;
				}
				n++;
			}
			return false;
		}
		else {
			while (it + n < rule.length) {
				if (/^[A-Za-z_]+ *,$/.test(peekChar(n))) {
					return true;
				}
				else if (/^[A-Za-z_]+ +[^,]$/.test(peekChar(n)) || /^[A-Za-z_]+ *[^,A-Za-z_]$/.test(peekChar(n))) {
					return false;
				}
				n++;
			}
			return false;
		}
	}

	function whitespace() {
		while (peekChar() == ' ') {
			getChar();
		}
	}

	function peekToken() {
		var n = 0;
		if (peekChar() == "'") {
			while (!/^'[^']*'$/.test(peekChar(n + 1)) && it + n < rule.length) {
				n++;
			}
			return peekChar(n + 1).substring(1, n + 1);
		}
		else {
			while (/^[A-Za-z0-9_]+$/.test(peekChar(n + 1)) && it + n < rule.length) {
				n++;
			}
			return peekChar(n);
		}
	}

	function getToken() {
		var n = 0;
		if (peekChar() == "'") {
			while (!/^'[^']*'$/.test(peekChar(n + 1)) && it + n < rule.length) {
				n++;
			}
			getChar();
			var tok = getChar(n - 1);
			getChar();
			return tok;
		}
		else {
			while (/^[A-Za-z0-9_]+$/.test(peekChar(n + 1)) && it + n < rule.length) {
				n++;
			}
			return getChar(n);
		}
	}

	function expression() {
		whitespace();
		var num = term();
		whitespace();
		while (peekToken() == 'and' || peekToken() == 'or') {
			whitespace();
			var op = getToken();
			whitespace();
			if (op == 'and') {
				num = term() && num;
			}
			if (op == 'or') {
				num = term() || num;
			}
			whitespace();
		}
		return num;
	}

	function params() {
		var retval = [];
		retval.push(getToken());
		whitespace();
		while (peekChar() == ',') {
			getChar();
			whitespace();
			retval.push(getToken());
		}
		return retval;
	}

	function tuple() {
		var item = getToken();
		whitespace();
		var comma = getChar();
		whitespace();
		var num = parseInt(getNum());
		if (item.startsWith("Small_Key") || item.startsWith("Boss_Key")) {
			return true;
		}
		return items.filter(x => x == item.replace(/_/g, " ")).length >= num;
	}

	function term() {
		var negate = false;
		if (peekToken() == 'not') {
			negate = true;
			getToken();
			whitespace();
		}
		if (peekChar() == '(') {
			getChar();
			whitespace();
			if (commaFollowsToken()) {
				var expr = tuple();
				whitespace();
				if (getChar() != ")") {
					throw `Expected character in tuple at position ${it}: ')'`;
				}
				return negate ? !expr : expr;
			}
			else {
				var e = expression();
				whitespace();
				if (getChar() != ")") {
					throw `Expected character in expression at position ${it}: ')'`;
				};
				return negate ? !e : e;
			}
		}
		else {
			var token = getToken();
			if (peekChar() == '(') {
				getChar();
				whitespace();
				var parameters = params();
				whitespace();
				if (getChar() != ")") {
					throw `Expected character in function call at position ${it}: ')'`;
				}
				var expr = evaluate(token, parameters);
				return negate ? !expr : expr;
			}
			else {
				var expr = evaluate(token);
				return negate ? !expr : expr;
			}
		}
	}

	var val = expression();
	return val;
}

function buildRule(save_file, region, location) {
	if (!save_file.use_logic) {
		return "True";
	}
	var paths = [];
	var first = save_file.current_subregion;

	var subregions = logic[region];
	if (save_file["dungeons"].has(region)) {
		subregions = logic[region][save_file["dungeons"].get(region)];
	}

	var visited = {}
	var path = {}
	for (subregion in subregions) {
		visited[subregion] = false;
	}

	function findPaths(node, ind) {
		visited[node] = true;
		path[ind] = node;
		ind++;

		if (("locations" in subregions[node] && location in subregions[node]["locations"]) || ("exits" in subregions[node] && location in subregions[node]["exits"]) || node == location) {
			thisPath = [];
			for (var i = 0; i < ind-1; i++) {
				thisPath.push(subregions[path[i]]["exits"][path[i+1]]);
			}
			if ("locations" in subregions[node] && location in subregions[node]["locations"]) {
				thisPath.push(subregions[node]["locations"][location]);
			}
			if ("exits" in subregions[node] && location in subregions[node]["exits"]) {
				thisPath.push(subregions[node]["exits"][location]);
			}
			if (thisPath.length == 0) {
				thisPath.push("True");
			}
			paths.push(`(${thisPath.join(") and (")})`);
		}
		else {
			if ("exits" in subregions[node]) {
				Object.keys(subregions[node]["exits"]).filter(x => x in subregions).forEach(function(exit) {
					if (!visited[exit]) {
						findPaths(exit, ind);
					}
				});
			}
		}

		ind--;
		visited[node] = false;
	}

	findPaths(first, 0);
	if (paths.length == 0) {
		return "False";
	}
	var rule = "(" + paths.join(") or (") + ")";
	if (location.includes("Shop Item") || location.includes("Bazaar Item")) {
		var price = save_file.locations.get(location).price;
		var wallets;
		if (price <= 99) {
			wallets = 0;
		}
		else if (price <= 200) {
			wallets = 1;
		}
		else if (price <= 500) {
			wallets = 2;
		}
		else if (price <= 999) {
			wallets = 3;
		}
		else {
			wallets = 4;
		}
		rule = `(${rule}) and (Progressive_Wallet, ${wallets})`;
		if (save_file.locations.get(location).item.includes("Buy Bombchu")) {
			rule = `(${rule}) and found_bombchus`;
		}
	}
	return rule;
}

function canCheckLocation(save_file, location) {
	if (!save_file.use_logic) {
		return true;
	}
	var rule = buildRule(save_file, save_file["current_region"], location);
	return parseLogicRule(save_file, rule);
}

function isEssentialItem(item) {
	var child_trade = ["Weird Egg", "Chicken", "Zeldas Letter", "Keaton Mask", "Skull Mask", "Spooky Mask", "Bunny Hood", "Mask of Truth"];
	var adult_trade = ["Pocket Egg", "Pocket Cucco", "Cojiro", "Odd Mushroom", "Poachers Saw", "Broken Sword", "Prescription", "Eyeball Frog", "Eyedrops", "Claim Check"];
	var essential_items = [
		"Kokiri Emerald",
		"Goron Ruby",
		"Zora Sapphire",
		"Light Medallion",
		"Forest Medallion",
		"Fire Medallion",
		"Water Medallion",
		"Spirit Medallion",
		"Shadow Medallion",
		"Zeldas Lullaby",
		"Eponas Song",
		"Sarias Song",
		"Song of Time",
		"Suns Song",
		"Song of Storms",
		"Minuet of Forest",
		"Bolero of Fire",
		"Serenade of Water",
		"Requiem of Spirit",
		"Nocturne of Shadow",
		"Prelude of Light",
		"Progressive Strength Upgrade",
		"Progressive Scale",
		"Kokiri Sword",
		"Deku Shield",
		"Hylian Shield",
		"Mirror Shield",
		"Goron Tunic",
		"Zora Tunic",
		"Iron Boots",
		"Hover Boots",
		"Slingshot",
		"Boomerang",
		"Lens of Truth",
		"Bomb Bag",
		"Magic Bean Pack",
		"Bow",
		"Progressive Hookshot",
		"Hammer",
		"Fire Arrows",
		"Light Arrows",
		"Dins Fire",
		"Farores Wind",
		"Nayrus Love",
		"Gerudo Membership Card",
		"Progressive Wallet"
	]
	essential_items = essential_items.concat(child_trade).concat(adult_trade);
	return essential_items.includes(item) || item.includes("Bombchu") || item.includes("Ocarina") || item.includes("Bottle");
}


function getLocations(save_file, region) {
	var location_exceptions = ["Master Sword Pedestal", "Check Pedestal", "Clear Light Trial", "Clear Forest Trial", "Clear Fire Trial", "Clear Water Trial", "Clear Spirit Trial", "Clear Shadow Trial", "Ganondorf Hint", "Ganon"];
	var all_locs = [];
	var subregions = logic[region];
	if (save_file["dungeons"].has(region)) {
		subregions = logic[region][save_file["dungeons"].get(region)];
	}
	for (subregion in subregions) {
		if ("locations" in subregions[subregion]) {
			all_locs = all_locs.concat(Object.keys(subregions[subregion]["locations"]));
		}
	}
	if (region == "Kokiri Forest" && !save_file.settings.get("shuffle_kokiri_sword")) {
		location_exceptions.push("Kokiri Sword Chest");
	}
	if (region == "Temple of Time" && save_file.settings.get("shuffle_ganon_bosskey") == "lacs_medallions") {
		location_exceptions.push("Zelda");
	}
	if (region == "Ganons Castle") {
		var active_trials = Array.from(save_file.trials.keys()).filter(x => save_file.trials.get(x) == "active");
		active_trials = active_trials.map(x => `Clear ${x} Trial`);
		all_locs = all_locs.filter(x => !(/Clear .* Trial/.test(x)) || active_trials.includes(x));
	}
	return all_locs.filter(x => !x.includes("Shop Item") && !x.includes("Bazaar Item") && (location_exceptions.includes(x) || Array.from(save_file.locations.keys()).includes(x) || x.startsWith("GS ") || (x.includes("Gossip Stone") && x != "Gossip Stone Fairy")));
}

var child_only_shops = ["Castle Town Bazaar", "Castle Town Potion Shop", "Bombchu Shop"];
var adult_only_shops = ["Kakariko Bazaar", "Kakariko Potion Shop"];

function getShops(save_file, region, mw_doc) {
	var players = null;
	if (mw_doc) {
		players = {};
		mw_doc.players.forEach(function (player) {
			players[player.get("num")] = player.get("name");
		});
	}
	var all_locs = [];
	var subregions = logic[region];
	for (subregion in subregions) {
		if ("locations" in subregions[subregion]) {
			all_locs = all_locs.concat(Object.keys(subregions[subregion]["locations"]));
		}
	}
	var shop_locs = all_locs.filter(x => save_file.locations.has(x) && (x.includes("Shop Item") || x.includes("Bazaar Item")));
	if (shop_locs.length == 0) {
		return [];
	}
	var shop = shop_locs[0].split(" Item ")[0];
	var shops = {};
	shop_locs.forEach(function(loc) {
		var shop = loc.split(" Item ")[0];
		if (!(shop in shops)) {
			shops[shop] = {};
		}
		shops[shop][loc] = save_file.locations.get(loc);
		if (players) {
			shops[shop][loc]["player"] = players[shops[shop][loc]["player"]];
		}
	});
	for (shop in shops) {
		if ((save_file.current_age == "child" && adult_only_shops.includes(shop)) || (save_file.current_age == "adult" && child_only_shops.includes(shop))) {
			delete shops[shop];
		}
	}
	return shops;
}

function getEntrances(save_file, region) {
	if (save_file.settings.get("entrance_shuffle") == "off") {
		var all_entrances = [];
		var subregions = logic[region];
		if (save_file["dungeons"].has(region)) {
			subregions = logic[region][save_file["dungeons"].get(region)];
		}
		for (subregion in subregions) {
			if (subregion == "Root Exits") {
				continue;
			}
			if ("exits" in subregions[subregion]) {
				all_entrances = all_entrances.concat(Object.keys(subregions[subregion]["exits"]));
			}
		}
		var entrances = [...new Set(all_entrances.filter(x => !(x in subregions)))];
		return entrances;
	}
	else {
		return Array.from(save_file.entrances.keys()).filter(x => x.split("->")[0].trim() == region).map(x => x.split("->")[1].trim());
	}
}

var bosses = {
	'Queen Gohma': 'Deku Tree',
	'King Dodongo': 'Dodongos Cavern',
	'Barinade': 'Jabu Jabus Belly',
	'Phantom Ganon': 'Forest Temple',
	'Volvagia': 'Fire Temple',
	'Morpha': 'Water Temple',
	'Bongo Bongo': 'Shadow Temple',
	'Twinrova': 'Spirit Temple'
};

function checkPedestal(save_file, age, known_medallions) {
	var stones = ["Kokiri Emerald", "Goron Ruby", "Zora Sapphire"];
	var medallions = ["Light Medallion", "Forest Medallion", "Fire Medallion", "Water Medallion", "Spirit Medallion", "Shadow Medallion"];
	if (age == "child") {
		if (save_file.multiworld_id) {
			Object.keys(bosses).filter(x => stones.includes(save_file.locations.get(x).item)).forEach(function (loc) {
				known_medallions.set(bosses[loc], save_file["locations"].get(loc).item);
			})
		}
		else {
			Object.keys(bosses).filter(x => stones.includes(save_file.locations.get(x))).forEach(function (loc) {
				known_medallions.set(bosses[loc], save_file["locations"].get(loc));
			});
		}
	}
	else if (age == "adult") {
		if (save_file.multiworld_id) {
			Object.keys(bosses).filter(x => stones.includes(save_file.locations.get(x).item) || medallions.includes(save_file.locations.get(x).item)).forEach(function (loc) {
				known_medallions.set(bosses[loc], save_file["locations"].get(loc).item);
			});
		}
		else {
			Object.keys(bosses).filter(x => stones.includes(save_file.locations.get(x)) || medallions.includes(save_file.locations.get(x))).forEach(function (loc) {
				known_medallions.set(bosses[loc], save_file["locations"].get(loc));
			});
		}
	}
	return known_medallions;
}

function getParentRegion(subregion) {
	var subregions = {
		"Kokiri Forest": ["Root", "Root Exits", "Kokiri Forest", "Outside Deku Tree", "Links House", "Mido House", "Saria House", "House of Twins", "Know It All House", "Kokiri Shop", "Kokiri Forest Storms Grotto"],
		"Lost Woods": ["Lost Woods Forest Exit", "Lost Woods", "Lost Woods Beyond Mido", "Lost Woods Bridge From Forest", "Lost Woods Bridge", "Lost Woods Generic Grotto", "Deku Theater", "Lost Woods Sales Grotto"],
		"Sacred Forest Meadow": ["Sacred Forest Meadow Entryway", "Sacred Forest Meadow", "Meadow Fairy Grotto", "Meadow Storms Grotto", "Front of Meadow Grotto"],
		"Hyrule Field": ["Hyrule Field", "Remote Southern Grotto", "Field Near Lake Outside Fence Grotto", "Field Near Lake Inside Fence Grotto", "Field Valley Grotto", "Field West Castle Town Grotto", "Field Far West Castle Town Grotto", "Field Kakariko Grotto", "Field North Lon Lon Grotto"],
		"Lake Hylia": ["Lake Hylia", "Lake Hylia Owl Flight", "Lake Hylia Lab", "Fishing Hole", "Lake Hylia Grotto"],
		"Gerudo Valley": ["Gerudo Valley", "Gerudo Valley Stream", "Gerudo Valley Crate Ledge", "Gerudo Valley Far Side", "Carpenter Tent", "Gerudo Valley Octorok Grotto", "Gerudo Valley Storms Grotto"],
		"Gerudo Fortress": ["Gerudo Fortress", "Gerudo Fortress Outside Gate", "Gerudo Fortress Storms Grotto"],
		"Haunted Wasteland": ["Haunted Wasteland Near Fortress", "Haunted Wasteland", "Haunted Wasteland Near Colossus"],
		"Desert Colossus": ["Desert Colossus", "Colossus Fairy", "Desert Colossus Grotto"],
		"Market": ["Castle Town Entrance", "Castle Town", "Castle Town Rupee Room", "Castle Town Bazaar", "Castle Town Mask Shop", "Castle Town Shooting Gallery", "Castle Town Bombchu Bowling", "Castle Town Potion Shop", "Castle Town Treasure Chest Game", "Castle Town Bombchu Shop", "Castle Town Dog Lady", "Castle Town Man in Green House"],
		"Temple of Time": ["Temple of Time Exterior", "Temple of Time", "Beyond Door of Time"],
		"Hyrule Castle": ["Castle Grounds", "Hyrule Castle Grounds", "Hyrule Castle Garden", "Hyrule Castle Fairy", "Castle Storms Grotto"],
		"Outside Ganons Castle": ["Ganons Castle Grounds", "Ganons Castle Fairy"],
		"Kakariko Village": ["Kakariko Village", "Kakariko Impa Ledge", "Kakariko Rooftop", "Kakariko Village Backyard", "Carpenter Boss House", "House of Skulltula", "Impas House", "Impas House Back", "Impas House Near Cow", "Windmill", "Kakariko Bazaar", "Kakariko Shooting Gallery", "Kakariko Potion Shop Front", "Kakariko Potion Shop Back", "Odd Medicine Building", "Kakariko Village Behind Gate", "Kakariko Bombable Grotto", "Kakariko Back Grotto"],
		"Graveyard": ["Graveyard", "Shield Grave", "Heart Piece Grave", "Composer Grave", "Dampes Grave", "Dampes House", "Shadow Temple Warp Region"],
		"Death Mountain Trail": ["Death Mountain", "Death Mountain Summit", "Death Mountain Summit Owl Flight", "Dodongos Cavern Entryway", "Mountain Summit Fairy", "Mountain Bombable Grotto", "Mountain Storms Grotto"],
		"Goron City": ["Goron City", "Goron City Woods Warp", "Darunias Chamber", "Goron Shop", "Goron City Grotto"],
		"Death Mountain Crater": ["Death Mountain Crater Upper Nearby", "Death Mountain Crater Upper Local", "Death Mountain Crater Ladder Area Nearby", "Death Mountain Crater Lower Nearby", "Death Mountain Crater Lower Local", "Death Mountain Crater Central Nearby", "Death Mountain Crater Central Local", "Fire Temple Entrance", "Crater Fairy", "Top of Crater Grotto", "DMC Hammer Grotto"],
		"Zora River": ["Zora River Front", "Zora River", "Zora River Behind Waterfall", "Zora River Plateau Open Grotto", "Zora River Plateau Bombable Grotto", "Zora River Storms Grotto"],
		"Zoras Domain": ["Zoras Domain", "Zoras Domain Behind King Zora", "Zora Shop", "Zoras Domain Storms Grotto"],
		"Zoras Fountain": ["Zoras Fountain", "Zoras Fountain Fairy"],
		"Lon Lon Ranch": ["Lon Lon Ranch", "Talon House", "Ingo Barn", "Lon Lon Corner Tower", "Lon Lon Grotto"],
		"Ganons Castle": ["Ganons Castle Tower", "Ganons Castle Lobby", "Ganons Castle Deku Scrubs", "Ganons Castle Forest Trial", "Ganons Castle Fire Trial", "Ganons Castle Water Trial", "Ganons Castle Shadow Trial", "Ganons Castle Spirit Trial", "Ganons Castle Light Trial"],
		"Bottom of the Well": ["Bottom of the Well", "Bottom of the Well Main Area"],
		"Deku Tree": ["Deku Tree Lobby", "Deku Tree Slingshot Room", "Deku Tree Boss Room"],
		"Dodongos Cavern": ["Dodongos Cavern Beginning", "Dodongos Cavern Lobby", "Dodongos Cavern Climb", "Dodongos Cavern Far Bridge", "Dodongos Cavern Boss Area"],
		"Fire Temple": ["Fire Temple Lower", "Fire Temple Big Lava Room", "Fire Temple Middle", "Fire Temple Upper"],
		"Forest Temple": ["Forest Temple Lobby", "Forest Temple NW Outdoors", "Forest Temple NE Outdoors", "Forest Temple Outdoors High Balconies", "Forest Temple Falling Room", "Forest Temple Block Push Room", "Forest Temple Straightened Hall", "Forest Temple Outside Upper Ledge", "Forest Temple Bow Region", "Forest Temple Boss Region"],
		"Gerudo Training Grounds": ["Gerudo Training Grounds Lobby", "Gerudo Training Grounds Central Maze", "Gerudo Training Grounds Central Maze Right", "Gerudo Training Grounds Lava Room", "Gerudo Training Grounds Hammer Room", "Gerudo Training Grounds Eye Statue Lower", "Gerudo Training Grounds Eye Statue Upper", "Gerudo Training Grounds Heavy Block Room", "Gerudo Training Grounds Like Like Room"],
		"Ice Cavern": ["Ice Cavern Beginning", "Ice Cavern"],
		"Jabu Jabus Belly": ["Jabu Jabus Belly Beginning", "Jabu Jabus Belly Main", "Jabu Jabus Belly Depths", "Jabu Jabus Belly Boss Area"],
		"Shadow Temple": ["Shadow Temple Entryway", "Shadow Temple Beginning", "Shadow Temple First Beamos", "Shadow Temple Huge Pit", "Shadow Temple Wind Tunnel", "Shadow Temple Beyond Boat"],
		"Spirit Temple": ["Spirit Temple Lobby", "Child Spirit Temple", "Child Spirit Temple Climb", "Early Adult Spirit Temple", "Spirit Temple Central Chamber", "Spirit Temple Outdoor Hands", "Spirit Temple Beyond Central Locked Door", "Spirit Temple Beyond Final Locked Door"],
		"Water Temple": ["Water Temple Lobby", "Water Temple Highest Water Level", "Water Temple Dive", "Water Temple North Basement", "Water Temple Cracked Wall", "Water Temple Dragon Statue", "Water Temple Middle Water Level", "Water Temple Dark Link Region"]
	};
	return Object.keys(subregions).filter(x => subregions[x].includes(subregion))[0];
}

function subregionFromLocation(location) {
	var dungeonVariant = location.includes("MQ") ? "mq" : "vanilla";
	for (region in logic) {
		var subregions = logic[region];
		if (dungeonVariant in logic[region]) {
			subregions = logic[region][dungeonVariant];
		}
		for (subregion in subregions) {
			if ("locations" in subregions[subregion]) {
				if (location in subregions[subregion]["locations"]) {
					return subregion;
				}
			}
		}
	}
	throw `Subregion for location ${location} not found.`;
}

function parseHint(save_file, hint) {
	var hintLoc = [];
	var hintItem = [];
	for (loc in hintLocationsMeanings) {
		if (hint.includes(loc)) {
			if (typeof (hintLocationsMeanings[loc]) == 'string') {
				hintLoc = hintLocationsMeanings[loc];
			}
			else {
				hintLoc = hintLocationsMeanings[loc]();
			}
			break;
		}
	}
	for (item in hintItemsMeanings) {
		if (hint.includes(item)) {
			hintItem = hintItemsMeanings[item];
			break;
		}
	}
	if (hintLoc.includes("/")) {
		hintLoc = hintLoc.split("/").filter(x => Array.from(save_file.locations.keys()).includes(x))[0];
	}
	if (hintItem == "Way of the Hero" || hintItem == "Foolish Choice") {
		return [hintItem, hintLoc];
	}
	else {
		return [hintLoc, hintItem];
	}
}

function getHint(save_file, stone) {
	var hint_text = save_file.hints.get(gossipStoneMap[stone]).text.replace(/#/g, "");
	return {hint_text: hint_text, hint: parseHint(save_file, hint_text)};
}

function needChus(save_file, location) {
	var initialCount = save_file.bombchu_count;
	var rule = buildRule(save_file, save_file.current_region, location);
	if (parseLogicRule(save_file, rule)) {
		save_file.bombchu_count = 0;
		if (!parseLogicRule(save_file, rule)) {
			save_file.bombchu_count = initialCount;
			return true;
		}
	}
	save_file.bombchu_count = initialCount;
	return false;
}

function canPlay(save_file, song) {
	return save_file.current_items.filter(x => x.includes("Ocarina")).length > 0 && save_file.current_items.includes(song);
}

var region_changing_checks = {
	'Impa at Castle': ['Hyrule Field', 'Hyrule Field'],
	'Queen Gohma': ['Kokiri Forest', 'Outside Deku Tree'],
	'King Dodongo': ['Death Mountain Trail', 'Death Mountain'],
	'Barinade': ['Zoras Fountain', 'Zoras Fountain'],
	'Phantom Ganon': ['Kokiri Forest', 'Outside Deku Tree'],
	'Volvagia': ['Death Mountain Crater', 'Death Mountain Crater Central Nearby'],
	'Morpha': ['Lake Hylia', 'Lake Hylia'],
	'Bongo Bongo': ['Graveyard', 'Shadow Temple Warp Region'],
	'Twinrova': ['Desert Colossus', 'Desert Colossus'],
};

var noPeekIfCantGet = [
	"Impa House Freestanding PoH",
	"Lake Hylia Freestanding PoH",
	"Gerudo Valley Waterfall Freestanding PoH",
	"Gerudo Valley Crate Freestanding PoH",
	"Dampe Race Freestanding PoH",
	"Goron City Pot Freestanding PoH",
	"DM Crater Wall Freestanding PoH",
	"Zoras Fountain Iceberg Freestanding PoH",
	"Zoras Fountain Bottom Freestanding PoH",
	"Lon Lon Tower Freestanding PoH",
	"Bottom of the Well Freestanding Key",
	"Shadow Temple Freestanding Key",
	"Lake Hylia Sun"
];

module.exports.canCheckLocation = canCheckLocation;
module.exports.getLocations = getLocations;
module.exports.getShops = getShops;
module.exports.getEntrances = getEntrances;
module.exports.buildRule = buildRule;
module.exports.parseLogicRule = parseLogicRule;
module.exports.getHint = getHint;
module.exports.getParentRegion = getParentRegion;
module.exports.checkPedestal = checkPedestal;
module.exports.needChus = needChus;
module.exports.subregionFromLocation = subregionFromLocation;
module.exports.isEssentialItem = isEssentialItem;
module.exports.region_changing_checks = region_changing_checks;
module.exports.canPlay = canPlay;
module.exports.noPeekIfCantGet = noPeekIfCantGet;
