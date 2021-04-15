var logic = {
	"Kokiri Forest": {
		"Root": {
			"region_name": "Root",
			"hint": "Link's Pocket",
			"locations": {
				"Links Pocket": "True"
			},
			"exits": {
				"Root Exits": "is_starting_age or Time_Travel"
			}
		},
		"Root Exits": {
			"region_name": "Root Exits",
			"exits": {
				"Links House": "is_child",
				"Temple of Time": " is_adult or (can_play(Prelude_of_Light) and can_leave_forest)",
				"Sacred Forest Meadow": "can_play(Minuet_of_Forest)",
				"Death Mountain Crater Central Local": "can_play(Bolero_of_Fire) and can_leave_forest",
				"Lake Hylia": "can_play(Serenade_of_Water) and can_leave_forest",
				"Shadow Temple Warp Region": "can_play(Nocturne_of_Shadow) and can_leave_forest",
				"Desert Colossus": "can_play(Requiem_of_Spirit) and can_leave_forest"
			}
		},
		"Kokiri Forest": {
			"region_name": "Kokiri Forest",
			"scene": "Kokiri Forest",
			"hint": "Kokiri Forest",
			"events": {
				"Showed Mido Sword & Shield": "open_forest or (is_child and Kokiri_Sword and has(Deku_Shield))"
			},
			"locations": {
				"Kokiri Sword Chest": "is_child",
				"GS Kokiri Know It All House": " is_child and can_child_attack and at_night and (had_night_start or can_leave_forest or can_play(Suns_Song))",
				"GS Kokiri Bean Patch": " can_plant_bugs and can_child_attack",
				"GS Kokiri House of Twins": " is_adult and at_night and (can_use(Hookshot) or (logic_adult_kokiri_gs and can_use(Hover_Boots)))",
				"Kokiri Forest Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy_without_suns and has_bottle",
				"Bean Plant Fairy": "can_plant_bean and can_play(Song_of_Storms) and has_bottle"
			},
			"exits": {
				"Links House": "True",
				"Mido House": "True",
				"Saria House": "True",
				"House of Twins": "True",
				"Know It All House": "True",
				"Kokiri Shop": "True",
				"Outside Deku Tree": "is_adult or 'Showed Mido Sword & Shield'",
				"Lost Woods": "True",
				"Lost Woods Bridge From Forest": "can_leave_forest",
				"Kokiri Forest Storms Grotto": "can_open_storm_grotto"
			}
		},
		"Outside Deku Tree": {
			"region_name": "Outside Deku Tree",
			"scene": "Kokiri Forest",
			"hint": "Kokiri Forest",
			"locations": {
				"Deku Baba Sticks": "(is_adult and not shuffle_dungeon_entrances) or Kokiri_Sword or Boomerang",
				"Deku Baba Nuts": " (is_adult and not shuffle_dungeon_entrances) or Slingshot or Sticks or has_explosives or Kokiri_Sword or can_use(Dins_Fire)",
				"Deku Tree Gossip Stone (Left)": "True",
				"Deku Tree Gossip Stone (Right)": "True"
			},
			"exits": {
				"Deku Tree Lobby": "is_child or (shuffle_dungeon_entrances and 'Showed Mido Sword & Shield')",
				"Kokiri Forest": "True"
			}
		},
		"Links House": {
			"region_name": "Links House",
			"locations": {
				"Links House Cow": "is_adult and can_play(Eponas_Song) and 'Links Cow'"
			},
			"exits": {
				"Kokiri Forest": "True"
			}
		},
		"Mido House": {
			"region_name": "Mido House",
			"locations": {
				"Mido Chest Top Left": "True",
				"Mido Chest Top Right": "True",
				"Mido Chest Bottom Left": "True",
				"Mido Chest Bottom Right": "True"
			},
			"exits": {
				"Kokiri Forest": "True"
			}
		},
		"Saria House": {
			"region_name": "Saria House",
			"exits": {
				"Kokiri Forest": "True"
			}
		},
		"House of Twins": {
			"region_name": "House of Twins",
			"exits": {
				"Kokiri Forest": "True"
			}
		},
		"Know It All House": {
			"region_name": "Know It All House",
			"exits": {
				"Kokiri Forest": "True"
			}
		},
		"Kokiri Shop": {
			"region_name": "Kokiri Shop",
			"locations": {
				"Kokiri Shop Item 1": "True",
				"Kokiri Shop Item 2": "True",
				"Kokiri Shop Item 3": "True",
				"Kokiri Shop Item 4": "True",
				"Kokiri Shop Item 5": "True",
				"Kokiri Shop Item 6": "True",
				"Kokiri Shop Item 7": "True",
				"Kokiri Shop Item 8": "True"
			},
			"exits": {
				"Kokiri Forest": "True"
			}
		},
		"Kokiri Forest Storms Grotto": {
			"region_name": "Kokiri Forest Storms Grotto",
			"locations": {
				"Kokiri Forest Storms Grotto Chest": "True",
				"Kokiri Forest Storms Grotto Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "can_cut_shrubs and has_bottle",
				"Lone Fish": "has_bottle"
			},
			"exits": {
				"Kokiri Forest": "True"
			}
		}
	},
	"Lost Woods": {
		"Lost Woods Forest Exit": {
			"region_name": "Lost Woods Forest Exit",
			"scene": "Lost Woods",
			"exits": {
				"Kokiri Forest": "True"
			}
		},
		"Lost Woods": {
			"region_name": "Lost Woods",
			"scene": "Lost Woods",
			"hint": "the Lost Woods",
			"events": {
				"Odd Mushroom Access": "is_adult and ('Cojiro Access' or Cojiro)",
				"Poachers Saw Access": "is_adult and 'Odd Potion Access'"
			},
			"locations": {
				"Skull Kid": "is_child and can_play(Sarias_Song)",
				"Ocarina Memory Game": "is_child and Ocarina",
				"Target in Woods": "can_use(Slingshot)",
				"LW Deku Scrub Deku Stick Upgrade": "is_child and can_stun_deku",
				"GS Lost Woods Bean Patch Near Bridge": "can_plant_bugs and can_child_attack",
				"Lost Woods Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy_without_suns and has_bottle",
				"Bean Plant Fairy": "can_plant_bean and can_play(Song_of_Storms) and has_bottle",
				"Bug Shrub": "is_child and can_cut_shrubs and has_bottle"
			},
			"exits": {
				"Lost Woods Forest Exit": "True",
				"Goron City": "can_blast_or_smash or can_use(Dins_Fire) or has('Goron City Woods Warp Open')",
				"Lost Woods Bridge": " is_adult and (can_use(Hover_Boots) or can_use(Longshot) or (can_plant_bean) or logic_lost_woods_bridge)",
				"Zora River": "can_leave_forest and (can_dive or can_use(Iron_Boots))",
				"Lost Woods Beyond Mido": "is_child or logic_mido_backflip or can_play(Sarias_Song)",
				"Lost Woods Generic Grotto": "(can_blast_or_smash)"
			}
		},
		"Lost Woods Beyond Mido": {
			"region_name": "Lost Woods Beyond Mido",
			"scene": "Lost Woods",
			"hint": "the Lost Woods",
			"locations": {
				"LW Deku Scrub Deku Nuts": "is_child and can_stun_deku",
				"LW Deku Scrub Deku Sticks": "is_child and can_stun_deku",
				"GS Lost Woods Above Stage": " is_adult and at_night and ((can_plant_bean) or (logic_lost_woods_gs_bean and can_use(Hookshot) and (can_use(Longshot) or can_use(Bow) or has_bombchus or can_use(Dins_Fire))))",
				"GS Lost Woods Bean Patch Near Stage": " can_plant_bugs and (can_child_attack or (not shuffle_scrubs and has(Deku_Shield)))",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle"
			},
			"exits": {
				"Lost Woods Forest Exit": "True",
				"Lost Woods": "is_child or can_play(Sarias_Song)",
				"Sacred Forest Meadow Entryway": "True",
				"Deku Theater": "True",
				"Lost Woods Sales Grotto": "(can_blast_or_smash)"
			}
		},
		"Lost Woods Bridge From Forest": {
			"region_name": "Lost Woods Bridge From Forest",
			"scene": "Lost Woods",
			"hint": "the Lost Woods",
			"locations": {
				"Gift from Saria": "True"
			},
			"exits": {
				"Lost Woods Bridge": "True"
			}
		},
		"Lost Woods Bridge": {
			"region_name": "Lost Woods Bridge",
			"scene": "Lost Woods",
			"hint": "the Lost Woods",
			"exits": {
				"Kokiri Forest": "True",
				"Hyrule Field": "True",
				"Lost Woods": "can_use(Longshot)"
			}
		},
		"Lost Woods Generic Grotto": {
			"region_name": "Lost Woods Generic Grotto",
			"locations": {
				"Lost Woods Generic Grotto Chest": "True",
				"Lost Woods Generic Grotto Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "can_cut_shrubs and has_bottle",
				"Lone Fish": "has_bottle"
			},
			"exits": {
				"Lost Woods": "True"
			}
		},
		"Deku Theater": {
			"region_name": "Deku Theater",
			"locations": {
				"Deku Theater Skull Mask": "is_child and 'Skull Mask'",
				"Deku Theater Mask of Truth": "is_child and 'Mask of Truth'"
			},
			"exits": {
				"Lost Woods Beyond Mido": "True"
			}
		},
		"Lost Woods Sales Grotto": {
			"region_name": "Lost Woods Sales Grotto",
			"locations": {
				"LW Grotto Deku Scrub Arrows": "can_stun_deku",
				"LW Grotto Deku Scrub Deku Nut Upgrade": "can_stun_deku"
			},
			"exits": {
				"Lost Woods Beyond Mido": "True"
			}
		}
	},
	"Sacred Forest Meadow": {
		"Sacred Forest Meadow Entryway": {
			"region_name": "Sacred Forest Meadow Entryway",
			"scene": "Sacred Forest Meadow",
			"hint": "Sacred Forest Meadow",
			"exits": {
				"Lost Woods Beyond Mido": "True",
				"Sacred Forest Meadow": " is_adult or Slingshot or Sticks or Kokiri_Sword or can_use(Dins_Fire)",
				"Front of Meadow Grotto": "can_open_bomb_grotto"
			}
		},
		"Sacred Forest Meadow": {
			"region_name": "Sacred Forest Meadow",
			"scene": "Sacred Forest Meadow",
			"hint": "Sacred Forest Meadow",
			"locations": {
				"Song from Saria": "is_child and Zeldas_Letter",
				"Sheik Forest Song": "is_adult",
				"GS Sacred Forest Meadow": "can_use(Hookshot) and at_night",
				"Sacred Forest Meadow Maze Gossip Stone (Lower)": "True",
				"Sacred Forest Meadow Maze Gossip Stone (Upper)": "True",
				"Sacred Forest Meadow Saria Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy_without_suns and has_bottle"
			},
			"exits": {
				"Sacred Forest Meadow Entryway": "True",
				"Forest Temple Lobby": "can_use(Hookshot)",
				"Meadow Fairy Grotto": "True",
				"Meadow Storms Grotto": "can_open_storm_grotto"
			}
		},
		"Meadow Fairy Grotto": {
			"region_name": "Meadow Fairy Grotto",
			"locations": {
				"Free Fairies": "has_bottle"
			},
			"exits": {
				"Sacred Forest Meadow": "True"
			}
		},
		"Meadow Storms Grotto": {
			"region_name": "Meadow Storms Grotto",
			"locations": {
				"SFM Grotto Deku Scrub Red Potion": "can_stun_deku",
				"SFM Grotto Deku Scrub Green Potion": "can_stun_deku"
			},
			"exits": {
				"Sacred Forest Meadow": "True"
			}
		},
		"Front of Meadow Grotto": {
			"region_name": "Front of Meadow Grotto",
			"locations": {
				"Wolfos Grotto Chest": " is_adult or Slingshot or Sticks or Kokiri_Sword or can_use(Dins_Fire)"
			},
			"exits": {
				"Sacred Forest Meadow Entryway": "True"
			}
		}
	},
	"Hyrule Field": {
		"Hyrule Field": {
			"region_name": "Hyrule Field",
			"scene": "Hyrule Field",
			"hint": "Hyrule Field",
			"time_passes": true,
			"locations": {
				"Ocarina of Time": "is_child and has_all_stones",
				"Song from Ocarina of Time": "is_child and has_all_stones",
				"Big Poe Kill": "can_use(Bow) and can_ride_epona and has_bottle"
			},
			"exits": {
				"Lost Woods Bridge": "True",
				"Lake Hylia": "True",
				"Gerudo Valley": "True",
				"Castle Town Entrance": "True",
				"Kakariko Village": "True",
				"Zora River Front": "True",
				"Lon Lon Ranch": "True",
				"Remote Southern Grotto": "(can_blast_or_smash)",
				"Field Near Lake Outside Fence Grotto": "True",
				"Field Near Lake Inside Fence Grotto": "can_open_bomb_grotto",
				"Field Valley Grotto": "(can_use(Hammer) or is_child) and can_open_bomb_grotto",
				"Field West Castle Town Grotto": "(can_blast_or_smash)",
				"Field Far West Castle Town Grotto": "(can_blast_or_smash)",
				"Field Kakariko Grotto": "can_open_bomb_grotto",
				"Field North Lon Lon Grotto": "can_open_bomb_grotto"
			}
		},
		"Remote Southern Grotto": {
			"region_name": "Remote Southern Grotto",
			"locations": {
				"Remote Southern Grotto Chest": "True",
				"Remote Southern Grotto Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "can_cut_shrubs and has_bottle",
				"Lone Fish": "has_bottle"
			},
			"exits": {
				"Hyrule Field": "True"
			}
		},
		"Field Near Lake Outside Fence Grotto": {
			"region_name": "Field Near Lake Outside Fence Grotto",
			"locations": {
				"Field Near Lake Outside Fence Grotto Chest": "True",
				"Field Near Lake Outside Fence Grotto Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "can_cut_shrubs and has_bottle",
				"Lone Fish": "has_bottle"
			},
			"exits": {
				"Hyrule Field": "True"
			}
		},
		"Field Near Lake Inside Fence Grotto": {
			"region_name": "Field Near Lake Inside Fence Grotto",
			"locations": {
				"HF Grotto Deku Scrub Piece of Heart": "can_stun_deku"
			},
			"exits": {
				"Hyrule Field": "True"
			}
		},
		"Field Valley Grotto": {
			"region_name": "Field Valley Grotto",
			"locations": {
				"GS Hyrule Field Near Gerudo Valley": " has_fire_source and (can_use(Hookshot) or can_use(Boomerang))",
				"HF Grotto Cow": "has_fire_source and can_play(Eponas_Song)",
				"Field Valley Grotto Gossip Stone": "has_fire_source",
				"Gossip Stone Fairy": "has_fire_source and can_summon_gossip_fairy and has_bottle",
				"Bug Shrub": "has_fire_source and can_cut_shrubs and has_bottle",
				"Nut Pot": "has_fire_source"
			},
			"exits": {
				"Hyrule Field": "True"
			}
		},
		"Field West Castle Town Grotto": {
			"region_name": "Field West Castle Town Grotto",
			"locations": {
				"Field West Castle Town Grotto Chest": "True",
				"Field West Castle Town Grotto Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "can_cut_shrubs and has_bottle",
				"Lone Fish": "has_bottle"
			},
			"exits": {
				"Hyrule Field": "True"
			}
		},
		"Field Far West Castle Town Grotto": {
			"region_name": "Field Far West Castle Town Grotto",
			"locations": {
				"Free Fairies": "has_bottle"
			},
			"exits": {
				"Hyrule Field": "True"
			}
		},
		"Field Kakariko Grotto": {
			"region_name": "Field Kakariko Grotto",
			"locations": {
				"GS Hyrule Field near Kakariko": "can_use(Boomerang) or can_use(Hookshot)"
			},
			"exits": {
				"Hyrule Field": "True"
			}
		},
		"Field North Lon Lon Grotto": {
			"region_name": "Field North Lon Lon Grotto",
			"locations": {
				"Tektite Grotto Freestanding PoH": " (Progressive_Scale, 2) or can_use(Iron_Boots)"
			},
			"exits": {
				"Hyrule Field": "True"
			}
		}
	},
	"Lake Hylia": {
		"Lake Hylia": {
			"region_name": "Lake Hylia",
			"scene": "Lake Hylia",
			"hint": "Lake Hylia",
			"time_passes": true,
			"events": {
				"Bonooru": "is_child and Ocarina"
			},
			"locations": {
				"Pierre": "is_adult and Bonooru and not free_scarecrow",
				"Underwater Bottle": "is_child and can_dive",
				"Lake Hylia Sun": " is_adult and (can_use(Distant_Scarecrow) or 'Water Temple Clear') and can_use(Bow)",
				"Lake Hylia Freestanding PoH": " is_adult and (can_use(Scarecrow) or (can_plant_bean))",
				"GS Lake Hylia Bean Patch": "can_plant_bugs and can_child_attack",
				"GS Lake Hylia Lab Wall": " is_child and (Boomerang or (logic_lab_wall_gs and (Sticks or Kokiri_Sword))) and at_night",
				"GS Lake Hylia Small Island": "is_child and can_child_attack and at_night",
				"GS Lake Hylia Giant Tree": "can_use(Longshot) and at_night",
				"Lake Hylia Lab Gossip Stone": "True",
				"Lake Hylia Gossip Stone (Southeast)": "True",
				"Lake Hylia Gossip Stone (Southwest)": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Bean Plant Fairy": "can_plant_bean and can_play(Song_of_Storms) and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "is_child and can_cut_shrubs and has_bottle"
			},
			"exits": {
				"Hyrule Field": "True",
				"Zoras Domain": "is_child and can_dive",
				"Lake Hylia Owl Flight": "is_child",
				"Lake Hylia Lab": "True",
				"Fishing Hole": " is_child or can_use(Scarecrow) or (can_plant_bean) or 'Water Temple Clear'",
				"Water Temple Lobby": " can_use(Hookshot) and (can_use(Iron_Boots) or ((can_use(Longshot) or logic_water_hookshot_entry) and (Progressive_Scale, 2)))",
				"Lake Hylia Grotto": "True"
			}
		},
		"Lake Hylia Owl Flight": {
			"region_name": "Lake Hylia Owl Flight",
			"scene": "Lake Hylia",
			"exits": {
				"Hyrule Field": "True"
			}
		},
		"Lake Hylia Lab": {
			"region_name": "Lake Hylia Lab",
			"events": {
				"Eyedrops Access": " is_adult and ('Eyeball Frog Access' or (Eyeball_Frog and disable_trade_revert))"
			},
			"locations": {
				"Diving in the Lab": " (Progressive_Scale, 2) or (logic_lab_diving and Iron_Boots and can_use(Hookshot))",
				"GS Lab Underwater Crate": "Iron_Boots and can_use(Hookshot)"
			},
			"exits": {
				"Lake Hylia": "True"
			}
		},
		"Fishing Hole": {
			"region_name": "Fishing Hole",
			"locations": {
				"Child Fishing": "is_child",
				"Adult Fishing": "is_adult"
			},
			"exits": {
				"Lake Hylia": "True"
			}
		},
		"Lake Hylia Grotto": {
			"region_name": "Lake Hylia Grotto",
			"locations": {
				"LH Grotto Deku Scrub Deku Nuts": "can_stun_deku",
				"LH Grotto Deku Scrub Bombs": "can_stun_deku",
				"LH Grotto Deku Scrub Arrows": "can_stun_deku"
			},
			"exits": {
				"Lake Hylia": "True"
			}
		}
	},
	"Gerudo Valley": {
		"Gerudo Valley": {
			"region_name": "Gerudo Valley",
			"scene": "Gerudo Valley",
			"hint": "Gerudo Valley",
			"time_passes": true,
			"locations": {
				"GS Gerudo Valley Small Bridge": "can_use(Boomerang) and at_night",
				"Bug Rock": "is_child and has_bottle"
			},
			"exits": {
				"Hyrule Field": "True",
				"Gerudo Valley Stream": "True",
				"Gerudo Valley Crate Ledge": "is_child or can_use(Longshot)",
				"Gerudo Valley Octorok Grotto": "can_use(Silver_Gauntlets)",
				"Gerudo Valley Far Side": " is_adult and (can_ride_epona or can_use(Longshot) or open_gerudo_fortress or 'Carpenter Rescue')"
			}
		},
		"Gerudo Valley Stream": {
			"region_name": "Gerudo Valley Stream",
			"scene": "Gerudo Valley",
			"hint": "Gerudo Valley",
			"time_passes": true,
			"locations": {
				"Gerudo Valley Waterfall Freestanding PoH": "True",
				"GS Gerudo Valley Bean Patch": "can_plant_bugs and can_child_attack",
				"Gerudo Valley Cow": "is_child and can_play(Eponas_Song)",
				"Gerudo Valley Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Bean Plant Fairy": "can_plant_bean and can_play(Song_of_Storms) and has_bottle"
			},
			"exits": {
				"Lake Hylia": "True"
			}
		},
		"Gerudo Valley Crate Ledge": {
			"region_name": "Gerudo Valley Crate Ledge",
			"scene": "Gerudo Valley",
			"hint": "Gerudo Valley",
			"time_passes": true,
			"locations": {
				"Gerudo Valley Crate Freestanding PoH": "True"
			}
		},
		"Gerudo Valley Far Side": {
			"region_name": "Gerudo Valley Far Side",
			"scene": "Gerudo Valley",
			"hint": "Gerudo Valley",
			"time_passes": true,
			"events": {
				"Broken Sword Access": "is_adult and ('Poachers Saw Access' or Poachers_Saw)"
			},
			"locations": {
				"Gerudo Valley Hammer Rocks Chest": "can_use(Hammer)",
				"GS Gerudo Valley Behind Tent": "can_use(Hookshot) and at_night",
				"GS Gerudo Valley Pillar": "can_use(Hookshot) and at_night"
			},
			"exits": {
				"Gerudo Fortress": "True",
				"Gerudo Valley Stream": "True",
				"Gerudo Valley Crate Ledge": " logic_valley_crate_hovers and can_use(Hover_Boots) and (True or Fairy or can_use(Nayrus_Love))",
				"Gerudo Valley": " is_child or can_ride_epona or can_use(Longshot) or open_gerudo_fortress or 'Carpenter Rescue'",
				"Carpenter Tent": "is_adult",
				"Gerudo Valley Storms Grotto": "is_adult and can_open_storm_grotto"
			}
		},
		"Carpenter Tent": {
			"region_name": "Carpenter Tent",
			"exits": {
				"Gerudo Valley Far Side": "True"
			}
		},
		"Gerudo Valley Octorok Grotto": {
			"region_name": "Gerudo Valley Octorok Grotto",
			"exits": {
				"Gerudo Valley": "True"
			}
		},
		"Gerudo Valley Storms Grotto": {
			"region_name": "Gerudo Valley Storms Grotto",
			"locations": {
				"Valley Grotto Deku Scrub Red Potion": "can_stun_deku",
				"Valley Grotto Deku Scrub Green Potion": "can_stun_deku"
			},
			"exits": {
				"Gerudo Valley Far Side": "True"
			}
		}
	},
	"Gerudo Fortress": {
		"Gerudo Fortress": {
			"region_name": "Gerudo Fortress",
			"scene": "Gerudo Fortress",
			"hint": "Gerudo's Fortress",
			"events": {
				"Carpenter Rescue": "can_finish_GerudoFortress",
				"Gerudo Fortress Gate Open": "is_adult and Gerudo_Membership_Card"
			},
			"locations": {
				"Gerudo Fortress Rooftop Chest": " can_use(Hover_Boots) or can_use(Scarecrow) or can_use(Longshot)",
				"Horseback Archery 1000 Points": " Gerudo_Membership_Card and can_ride_epona and Bow and at_day",
				"Horseback Archery 1500 Points": " Gerudo_Membership_Card and can_ride_epona and Bow and at_day",
				"Gerudo Fortress North F1 Carpenter": "is_adult or Kokiri_Sword",
				"Gerudo Fortress North F2 Carpenter": " (is_adult or Kokiri_Sword) and (Gerudo_Membership_Card or can_use(Bow) or can_use(Hookshot) or can_use(Hover_Boots) or logic_gerudo_kitchen)",
				"Gerudo Fortress South F1 Carpenter": "is_adult or Kokiri_Sword",
				"Gerudo Fortress South F2 Carpenter": "is_adult or Kokiri_Sword",
				"Gerudo Fortress Membership Card": "can_finish_GerudoFortress",
				"GS Gerudo Fortress Archery Range": " can_use(Hookshot) and Gerudo_Membership_Card and at_night",
				"GS Gerudo Fortress Top Floor": " is_adult and at_night and (Gerudo_Membership_Card or can_use(Bow) or can_use(Hookshot) or can_use(Hover_Boots) or logic_gerudo_kitchen)"
			},
			"exits": {
				"Gerudo Valley Far Side": "True",
				"Gerudo Fortress Outside Gate": "'Gerudo Fortress Gate Open'",
				"Gerudo Training Grounds Lobby": "Gerudo_Membership_Card and is_adult",
				"Gerudo Fortress Storms Grotto": "is_adult and can_open_storm_grotto"
			}
		},
		"Gerudo Fortress Outside Gate": {
			"region_name": "Gerudo Fortress Outside Gate",
			"scene": "Gerudo Fortress",
			"events": {
				"Gerudo Fortress Gate Open": " is_adult and Gerudo_Membership_Card and (shuffle_gerudo_card or shuffle_overworld_entrances or shuffle_special_indoor_entrances)"
			},
			"exits": {
				"Gerudo Fortress": "is_adult or (shuffle_overworld_entrances and 'Gerudo Fortress Gate Open')",
				"Haunted Wasteland Near Fortress": "True"
			}
		},
		"Gerudo Fortress Storms Grotto": {
			"region_name": "Gerudo Fortress Storms Grotto",
			"locations": {
				"Free Fairies": "has_bottle"
			},
			"exits": {
				"Gerudo Fortress": "True"
			}
		}
	},
	"Haunted Wasteland": {
		"Haunted Wasteland Near Fortress": {
			"region_name": "Haunted Wasteland Near Fortress",
			"scene": "Haunted Wasteland",
			"exits": {
				"Gerudo Fortress Outside Gate": "True",
				"Haunted Wasteland": " logic_wasteland_crossing or can_use(Hover_Boots) or can_use(Longshot)"
			}
		},
		"Haunted Wasteland": {
			"region_name": "Haunted Wasteland",
			"scene": "Haunted Wasteland",
			"hint": "Haunted Wasteland",
			"locations": {
				"Haunted Wasteland Structure Chest": "has_fire_source",
				"Haunted Wasteland Bombchu Salesman": " Progressive_Wallet and (is_adult or Sticks or Kokiri_Sword)",
				"GS Wasteland Ruins": "can_use(Hookshot) or can_use(Boomerang)",
				"Fairy Pot": "has_bottle",
				"Nut Pot": "True"
			},
			"exits": {
				"Haunted Wasteland Near Colossus": "True",
				"Haunted Wasteland Near Fortress": " logic_wasteland_crossing or can_use(Hover_Boots) or can_use(Longshot)"
			}
		},
		"Haunted Wasteland Near Colossus": {
			"region_name": "Haunted Wasteland Near Colossus",
			"scene": "Haunted Wasteland",
			"exits": {
				"Desert Colossus": "True",
				"Haunted Wasteland": "logic_reverse_wasteland"
			}
		}
	},
	"Desert Colossus": {
		"Desert Colossus": {
			"region_name": "Desert Colossus",
			"scene": "Desert Colossus",
			"hint": "Desert Colossus",
			"time_passes": true,
			"locations": {
				"Colossus Freestanding PoH": "is_adult and (can_plant_bean)",
				"Sheik at Colossus": "True",
				"GS Desert Colossus Bean Patch": "can_plant_bugs and can_child_attack",
				"GS Desert Colossus Tree": "can_use(Hookshot) and at_night",
				"GS Desert Colossus Hill": " is_adult and at_night and ((can_plant_bean) or can_use(Longshot) or (logic_colossus_gs and can_use(Hookshot)))",
				"Desert Colossus Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Fairy Pond": "can_play(Song_of_Storms) and has_bottle",
				"Bug Rock": "has_bottle"
			},
			"exits": {
				"Colossus Fairy": "has_explosives",
				"Spirit Temple Lobby": "True",
				"Haunted Wasteland Near Colossus": "True",
				"Desert Colossus Grotto": "can_use(Silver_Gauntlets)"
			}
		},
		"Colossus Fairy": {
			"region_name": "Colossus Fairy",
			"locations": {
				"Desert Colossus Fairy Reward": "can_play(Zeldas_Lullaby)"
			},
			"exits": {
				"Desert Colossus": "True"
			}
		},
		"Desert Colossus Grotto": {
			"region_name": "Desert Colossus Grotto",
			"locations": {
				"Desert Grotto Deku Scrub Red Potion": "can_stun_deku",
				"Desert Grotto Deku Scrub Green Potion": "can_stun_deku"
			},
			"exits": {
				"Desert Colossus": "True"
			}
		}
	},
	"Market": {
		"Castle Town Entrance": {
			"region_name": "Castle Town Entrance",
			"scene": "Castle Town Entrance",
			"hint": "the Market",
			"exits": {
				"Hyrule Field": "is_adult or at_day",
				"Castle Town": "True",
				"Castle Town Rupee Room": "True"
			}
		},
		"Castle Town": {
			"region_name": "Castle Town",
			"scene": "Castle Town",
			"hint": "the Market",
			"exits": {
				"Castle Town Entrance": "True",
				"Temple of Time Exterior": "True",
				"Castle Grounds": "True",
				"Castle Town Bazaar": "is_child and at_day",
				"Castle Town Mask Shop": "is_child and at_day",
				"Castle Town Shooting Gallery": "is_child and at_day",
				"Castle Town Bombchu Bowling": "is_child",
				"Castle Town Potion Shop": "is_child and at_day",
				"Castle Town Treasure Chest Game": "is_child and at_night",
				"Castle Town Bombchu Shop": "is_child and at_night",
				"Castle Town Dog Lady": "is_child",
				"Castle Town Man in Green House": "is_child and at_night"
			}
		},
		"Castle Town Rupee Room": {
			"region_name": "Castle Town Rupee Room",
			"events": {
				"Sell Big Poe": "is_adult and Bottle_with_Big_Poe"
			},
			"locations": {
				"10 Big Poes": " is_adult and has_bottle",
				"GS Castle Market Guard House": "is_child"
			},
			"exits": {
				"Castle Town Entrance": "True"
			}
		},
		"Castle Town Bazaar": {
			"region_name": "Castle Town Bazaar",
			"locations": {
				"Castle Town Bazaar Item 1": "True",
				"Castle Town Bazaar Item 2": "True",
				"Castle Town Bazaar Item 3": "True",
				"Castle Town Bazaar Item 4": "True",
				"Castle Town Bazaar Item 5": "True",
				"Castle Town Bazaar Item 6": "True",
				"Castle Town Bazaar Item 7": "True",
				"Castle Town Bazaar Item 8": "True"
			},
			"exits": {
				"Castle Town": "True"
			}
		},
		"Castle Town Mask Shop": {
			"region_name": "Castle Town Mask Shop",
			"events": {
				"Skull Mask": "( is_child and Zeldas_Letter)",
				"Mask of Truth": "'Skull Mask' and ( is_child and can_play(Sarias_Song)) and ( is_child and at_day) and ( is_child and has_all_stones)"
			},
			"exits": {
				"Castle Town": "True"
			}
		},
		"Castle Town Shooting Gallery": {
			"region_name": "Castle Town Shooting Gallery",
			"locations": {
				"Child Shooting Gallery": "is_child"
			},
			"exits": {
				"Castle Town": "True"
			}
		},
		"Castle Town Bombchu Bowling": {
			"region_name": "Castle Town Bombchu Bowling",
			"locations": {
				"Bombchu Bowling Bomb Bag": "found_bombchus",
				"Bombchu Bowling Piece of Heart": "found_bombchus",
				"Bombchu Bowling Bombchus": "found_bombchus"
			},
			"exits": {
				"Castle Town": "True"
			}
		},
		"Castle Town Potion Shop": {
			"region_name": "Castle Town Potion Shop",
			"locations": {
				"Castle Town Potion Shop Item 1": "True",
				"Castle Town Potion Shop Item 2": "True",
				"Castle Town Potion Shop Item 3": "True",
				"Castle Town Potion Shop Item 4": "True",
				"Castle Town Potion Shop Item 5": "True",
				"Castle Town Potion Shop Item 6": "True",
				"Castle Town Potion Shop Item 7": "True",
				"Castle Town Potion Shop Item 8": "True"
			},
			"exits": {
				"Castle Town": "True"
			}
		},
		"Castle Town Treasure Chest Game": {
			"region_name": "Castle Town Treasure Chest Game",
			"locations": {
				"Treasure Chest Game": "can_use(Lens_of_Truth)"
			},
			"exits": {
				"Castle Town": "True"
			}
		},
		"Castle Town Bombchu Shop": {
			"region_name": "Castle Town Bombchu Shop",
			"locations": {
				"Bombchu Shop Item 1": "True",
				"Bombchu Shop Item 2": "True",
				"Bombchu Shop Item 3": "True",
				"Bombchu Shop Item 4": "True",
				"Bombchu Shop Item 5": "True",
				"Bombchu Shop Item 6": "True",
				"Bombchu Shop Item 7": "True",
				"Bombchu Shop Item 8": "True"
			},
			"exits": {
				"Castle Town": "True"
			}
		},
		"Castle Town Dog Lady": {
			"region_name": "Castle Town Dog Lady",
			"locations": {
				"Dog Lady": "at_night"
			},
			"exits": {
				"Castle Town": "True"
			}
		},
		"Castle Town Man in Green House": {
			"region_name": "Castle Town Man in Green House",
			"exits": {
				"Castle Town": "True"
			}
		}
	},
	"Temple of Time": {
		"Temple of Time Exterior": {
			"region_name": "Temple of Time Exterior",
			"scene": "Temple of Time Exterior",
			"hint": "the Market",
			"locations": {
				"Temple of Time Gossip Stone (Left)": "True",
				"Temple of Time Gossip Stone (Left-Center)": "True",
				"Temple of Time Gossip Stone (Right)": "True",
				"Temple of Time Gossip Stone (Right-Center)": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy_without_suns and has_bottle"
			},
			"exits": {
				"Castle Town": "True",
				"Temple of Time": "True"
			}
		},
		"Temple of Time": {
			"region_name": "Temple of Time",
			"hint": "Temple of Time",
			"locations": {
				"Zelda": "is_adult and can_trigger_lacs",
				"Check Pedestal": "True",
			},
			"exits": {
				"Temple of Time Exterior": "True",
				"Beyond Door of Time": "can_play(Song_of_Time) or open_door_of_time"
			}
		},
		"Beyond Door of Time": {
			"region_name": "Beyond Door of Time",
			"hint": "Temple of Time",
			"locations": {
				"Master Sword Pedestal": "True",
				"Sheik at Temple": "Forest_Medallion and is_adult"
			},
			"exits": {
				"Temple of Time": "True"
			}
		}
	},
	"Hyrule Castle": {
		"Castle Grounds": {
			"region_name": "Castle Grounds",
			"scene": "Castle Grounds",
			"exits": {
				"Castle Town": "True",
				"Hyrule Castle Grounds": "is_child",
				"Ganons Castle Grounds": "is_adult"
			}
		},
		"Hyrule Castle Grounds": {
			"region_name": "Hyrule Castle Grounds",
			"scene": "Castle Grounds",
			"hint": "Hyrule Castle",
			"time_passes": true,
			"locations": {
				"Malon Egg": "True",
				"GS Hyrule Castle Tree": "can_child_attack",
				"Hyrule Castle Malon Gossip Stone": "True",
				"Hyrule Castle Rock Wall Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Rock": "has_bottle"
			},
			"exits": {
				"Castle Grounds": "True",
				"Hyrule Castle Garden": "Weird_Egg or (not shuffle_weird_egg)",
				"Hyrule Castle Fairy": "has_explosives",
				"Castle Storms Grotto": "can_open_storm_grotto"
			}
		},
		"Hyrule Castle Garden": {
			"region_name": "Hyrule Castle Garden",
			"scene": "Castle Grounds",
			"hint": "Hyrule Castle",
			"locations": {
				"Zeldas Letter": "True",
				"Impa at Castle": "True"
			},
			"exits": {
				"Hyrule Castle Grounds": "True"
			}
		},
		"Hyrule Castle Fairy": {
			"region_name": "Hyrule Castle Fairy",
			"locations": {
				"Hyrule Castle Fairy Reward": "can_play(Zeldas_Lullaby)"
			},
			"exits": {
				"Castle Grounds": "True"
			}
		},
		"Castle Storms Grotto": {
			"region_name": "Castle Storms Grotto",
			"locations": {
				"GS Hyrule Castle Grotto": "can_blast_or_smash and (can_use(Boomerang) or can_use(Hookshot))",
				"Castle Storms Grotto Gossip Stone": "can_blast_or_smash",
				"Gossip Stone Fairy": "can_blast_or_smash and can_summon_gossip_fairy and has_bottle",
				"Wandering Bugs": "can_blast_or_smash and has_bottle",
				"Nut Pot": "can_blast_or_smash"
			},
			"exits": {
				"Hyrule Castle Grounds": "True"
			}
		}
	},
	"Outside Ganons Castle": {
		"Ganons Castle Grounds": {
			"region_name": "Ganons Castle Grounds",
			"scene": "Castle Grounds",
			"hint": "outside Ganon's Castle",
			"locations": {
				"GS Outside Ganon's Castle": "True"
			},
			"exits": {
				"Castle Grounds": "at_night",
				"Ganons Castle Fairy": "can_use(Golden_Gauntlets) and at_night",
				"Ganons Castle Lobby": "can_build_rainbow_bridge"
			}
		},
		"Ganons Castle Fairy": {
			"region_name": "Ganons Castle Fairy",
			"locations": {
				"Ganons Castle Fairy Reward": "can_play(Zeldas_Lullaby)"
			},
			"exits": {
				"Castle Grounds": "True"
			}
		}
	},
	"Kakariko Village": {
		"Kakariko Village": {
			"region_name": "Kakariko Village",
			"scene": "Kakariko Village",
			"hint": "Kakariko Village",
			"events": {
				"Cojiro Access": "is_adult and 'Wake Up Adult Talon'",
				"Kakariko Village Gate Open": "is_child and Zeldas_Letter"
			},
			"locations": {
				"Sheik in Kakariko": " is_adult and Forest_Medallion and Fire_Medallion and Water_Medallion",
				"Anju as Adult": "is_adult and at_day",
				"Anjus Chickens": "is_child and at_day",
				"GS Kakariko House Under Construction": "is_child and at_night",
				"GS Kakariko Skulltula House": "is_child and at_night",
				"GS Kakariko Guard's House": "is_child and at_night",
				"GS Kakariko Tree": "is_child and at_night",
				"GS Kakariko Watchtower": " is_child and (Slingshot or has_bombchus or (logic_kakariko_tower_gs and (Sticks or Kokiri_Sword))) and at_night",
				"GS Kakariko Above Impa's House": "can_use(Hookshot) and at_night",
				"Bug Rock": "has_bottle"
			},
			"exits": {
				"Hyrule Field": "True",
				"Carpenter Boss House": "True",
				"House of Skulltula": "True",
				"Impas House": "True",
				"Windmill": "True",
				"Kakariko Bazaar": "is_adult and at_day",
				"Kakariko Shooting Gallery": "is_adult and at_day",
				"Bottom of the Well": " 'Drain Well' and (is_child or shuffle_dungeon_entrances)",
				"Kakariko Potion Shop Front": "is_child or at_day",
				"Kakariko Bombable Grotto": "can_open_bomb_grotto",
				"Kakariko Impa Ledge": " (is_child and at_day) or (is_adult and logic_visible_collisions) or can_use(Hookshot)",
				"Kakariko Rooftop": " can_use(Hookshot) or (logic_man_on_roof and (is_adult or at_day or Slingshot or has_bombchus or (logic_kakariko_tower_gs and (Sticks or Kokiri_Sword))))",
				"Kakariko Village Backyard": "is_adult or (is_child and at_day)",
				"Graveyard": "True",
				"Kakariko Village Behind Gate": "is_adult or 'Kakariko Village Gate Open'"
			}
		},
		"Kakariko Impa Ledge": {
			"region_name": "Kakariko Impa Ledge",
			"scene": "Kakariko Village",
			"hint": "Kakariko Village",
			"exits": {
				"Impas House Back": "True",
				"Kakariko Village": "True"
			}
		},
		"Kakariko Rooftop": {
			"region_name": "Kakariko Rooftop",
			"scene": "Kakariko Village",
			"hint": "Kakariko Village",
			"locations": {
				"Man on Roof": "True"
			},
			"exits": {
				"Kakariko Village Backyard": "True"
			}
		},
		"Kakariko Village Backyard": {
			"region_name": "Kakariko Village Backyard",
			"scene": "Kakariko Village",
			"hint": "Kakariko Village",
			"exits": {
				"Kakariko Village": "True",
				"Kakariko Back Grotto": "True",
				"Odd Medicine Building": "is_adult",
				"Kakariko Potion Shop Back": "is_adult and at_day"
			}
		},
		"Carpenter Boss House": {
			"region_name": "Carpenter Boss House",
			"events": {
				"Wake Up Adult Talon": "is_adult and (Pocket_Egg or Pocket_Cucco)"
			},
			"exits": {
				"Kakariko Village": "True"
			}
		},
		"House of Skulltula": {
			"region_name": "House of Skulltula",
			"locations": {
				"10 Gold Skulltula Reward": "(Gold_Skulltula_Token, 10)",
				"20 Gold Skulltula Reward": "(Gold_Skulltula_Token, 20)",
				"30 Gold Skulltula Reward": "(Gold_Skulltula_Token, 30)",
				"40 Gold Skulltula Reward": "(Gold_Skulltula_Token, 40)",
				"50 Gold Skulltula Reward": "(Gold_Skulltula_Token, 50)"
			},
			"exits": {
				"Kakariko Village": "True"
			}
		},
		"Impas House": {
			"region_name": "Impas House",
			"exits": {
				"Kakariko Village": "True",
				"Impas House Near Cow": "True"
			}
		},
		"Impas House Back": {
			"region_name": "Impas House Back",
			"locations": {
				"Impa House Freestanding PoH": "True"
			},
			"exits": {
				"Kakariko Impa Ledge": "True",
				"Impas House Near Cow": "True"
			}
		},
		"Impas House Near Cow": {
			"region_name": "Impas House Near Cow",
			"locations": {
				"Impas House Cow": "can_play(Eponas_Song)"
			},
			"exits": {
				"Impas House Back": "False"
			}
		},
		"Windmill": {
			"region_name": "Windmill",
			"events": {
				"Drain Well": "is_child and can_play(Song_of_Storms)"
			},
			"locations": {
				"Windmill Freestanding PoH": " can_use(Boomerang) or (logic_windmill_poh and is_adult)",
				"Song at Windmill": "is_adult and Ocarina"
			},
			"exits": {
				"Kakariko Village": "True"
			}
		},
		"Kakariko Bazaar": {
			"region_name": "Kakariko Bazaar",
			"locations": {
				"Kakariko Bazaar Item 1": "True",
				"Kakariko Bazaar Item 2": "True",
				"Kakariko Bazaar Item 3": "True",
				"Kakariko Bazaar Item 4": "True",
				"Kakariko Bazaar Item 5": "True",
				"Kakariko Bazaar Item 6": "True",
				"Kakariko Bazaar Item 7": "True",
				"Kakariko Bazaar Item 8": "True"
			},
			"exits": {
				"Kakariko Village": "True"
			}
		},
		"Kakariko Shooting Gallery": {
			"region_name": "Kakariko Shooting Gallery",
			"locations": {
				"Adult Shooting Gallery": "is_adult and Bow"
			},
			"exits": {
				"Kakariko Village": "True"
			}
		},
		"Kakariko Potion Shop Front": {
			"region_name": "Kakariko Potion Shop Front",
			"locations": {
				"Kakariko Potion Shop Item 1": "is_adult",
				"Kakariko Potion Shop Item 2": "is_adult",
				"Kakariko Potion Shop Item 3": "is_adult",
				"Kakariko Potion Shop Item 4": "is_adult",
				"Kakariko Potion Shop Item 5": "is_adult",
				"Kakariko Potion Shop Item 6": "is_adult",
				"Kakariko Potion Shop Item 7": "is_adult",
				"Kakariko Potion Shop Item 8": "is_adult"
			},
			"exits": {
				"Kakariko Village": "True",
				"Kakariko Potion Shop Back": "is_adult"
			}
		},
		"Kakariko Potion Shop Back": {
			"region_name": "Kakariko Potion Shop Back",
			"exits": {
				"Kakariko Village Backyard": "is_adult",
				"Kakariko Potion Shop Front": "True"
			}
		},
		"Odd Medicine Building": {
			"region_name": "Odd Medicine Building",
			"events": {
				"Odd Potion Access": " is_adult and has(Odd_Mushroom)"
			},
			"exits": {
				"Kakariko Village Backyard": "True"
			}
		},
		"Kakariko Village Behind Gate": {
			"region_name": "Kakariko Village Behind Gate",
			"scene": "Kakariko Village",
			"exits": {
				"Kakariko Village": " is_adult or logic_visible_collisions or 'Kakariko Village Gate Open'",
				"Death Mountain": "True"
			}
		},
		"Kakariko Bombable Grotto": {
			"region_name": "Kakariko Bombable Grotto",
			"locations": {
				"Redead Grotto Chest": " is_adult or (Sticks or Kokiri_Sword or can_use(Dins_Fire))"
			},
			"exits": {
				"Kakariko Village": "True"
			}
		},
		"Kakariko Back Grotto": {
			"region_name": "Kakariko Back Grotto",
			"locations": {
				"Kakariko Back Grotto Chest": "True",
				"Kakariko Back Grotto Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "can_cut_shrubs and has_bottle",
				"Lone Fish": "has_bottle"
			},
			"exits": {
				"Kakariko Village Backyard": "True"
			}
		}
	},
	"Graveyard": {
		"Graveyard": {
			"region_name": "Graveyard",
			"scene": "Graveyard",
			"hint": "the Graveyard",
			"locations": {
				"Graveyard Freestanding PoH": " (is_adult and ((can_plant_bean) or can_use(Longshot))) or (logic_graveyard_poh and can_use(Boomerang))",
				"Gravedigging Tour": "is_child and at_dampe_time",
				"GS Graveyard Wall": "can_use(Boomerang) and at_night",
				"GS Graveyard Bean Patch": "can_plant_bugs and can_child_attack",
				"Butterfly Fairy": "can_use(Sticks) and at_day and has_bottle",
				"Bean Plant Fairy": "can_plant_bean and can_play(Song_of_Storms) and has_bottle",
				"Bug Rock": "has_bottle"
			},
			"exits": {
				"Shield Grave": "is_adult or at_night",
				"Composer Grave": "can_play(Zeldas_Lullaby)",
				"Heart Piece Grave": "is_adult or at_night",
				"Dampes Grave": "is_adult",
				"Dampes House": "is_adult or at_dampe_time",
				"Kakariko Village": "True"
			}
		},
		"Shield Grave": {
			"region_name": "Shield Grave",
			"locations": {
				"Shield Grave Chest": "True",
				"Free Fairies": "can_blast_or_smash and has_bottle"
			},
			"exits": {
				"Graveyard": "True"
			}
		},
		"Heart Piece Grave": {
			"region_name": "Heart Piece Grave",
			"locations": {
				"Heart Piece Grave Chest": "can_play(Suns_Song)"
			},
			"exits": {
				"Graveyard": "True"
			}
		},
		"Composer Grave": {
			"region_name": "Composer Grave",
			"locations": {
				"Composer Grave Chest": "has_fire_source",
				"Song from Composer Grave": " is_adult or (Slingshot or Boomerang or Sticks or has_explosives or Kokiri_Sword)"
			},
			"exits": {
				"Graveyard": "True"
			}
		},
		"Dampes Grave": {
			"region_name": "Dampes Grave",
			"locations": {
				"Hookshot Chest": "True",
				"Dampe Race Freestanding PoH": "is_adult or logic_child_dampe_race_poh",
				"Nut Pot": "True"
			},
			"exits": {
				"Graveyard": "True",
				"Windmill": "is_adult and can_play(Song_of_Time)"
			}
		},
		"Dampes House": {
			"region_name": "Dampes House",
			"exits": {
				"Graveyard": "True"
			}
		},
		"Shadow Temple Warp Region": {
			"region_name": "Shadow Temple Warp Region",
			"scene": "Graveyard",
			"hint": "the Graveyard",
			"locations": {
				"Graveyard Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy_without_suns and has_bottle"
			},
			"exits": {
				"Graveyard": "True",
				"Shadow Temple Entryway": " can_use(Dins_Fire) or (logic_shadow_fire_arrow_entry and can_use(Fire_Arrows))"
			}
		}
	},
	"Death Mountain Trail": {
		"Death Mountain": {
			"region_name": "Death Mountain",
			"scene": "Death Mountain",
			"hint": "Death Mountain Trail",
			"time_passes": true,
			"locations": {
				"Death Mountain Bombable Chest": " can_blast_or_smash or (logic_dmt_bombable and is_child and Progressive_Strength_Upgrade)",
				"DM Trail Freestanding PoH": "True",
				"GS Mountain Trail Bean Patch": " can_plant_bugs and (has_explosives or Progressive_Strength_Upgrade or (logic_dmt_soil_gs and can_use(Boomerang)))",
				"GS Mountain Trail Bomb Alcove": "can_blast_or_smash",
				"GS Mountain Trail Above Dodongo's Cavern": " is_adult and at_night and (can_use(Hammer) or (logic_trail_gs_lower_hookshot and can_use(Hookshot)) or (logic_trail_gs_lower_bean and (can_plant_bean and (has_explosives or Progressive_Strength_Upgrade))))",
				"Bean Plant Fairy": " can_plant_bean and can_play(Song_of_Storms) and has_bottle and (has_explosives or Progressive_Strength_Upgrade)"
			},
			"exits": {
				"Kakariko Village Behind Gate": "True",
				"Goron City": "True",
				"Death Mountain Summit": " (can_blast_or_smash) or (is_adult and (can_plant_bean and Progressive_Strength_Upgrade))",
				"Dodongos Cavern Entryway": " has_explosives or Progressive_Strength_Upgrade or is_adult",
				"Mountain Storms Grotto": "can_open_storm_grotto"
			}
		},
		"Death Mountain Summit": {
			"region_name": "Death Mountain Summit",
			"scene": "Death Mountain",
			"hint": "Death Mountain Trail",
			"time_passes": true,
			"events": {
				"Prescription Access": "is_adult and ('Broken Sword Access' or Broken_Sword)"
			},
			"locations": {
				"Biggoron": " is_adult and (Claim_Check or (guarantee_trade_path and has(Eyedrops)))",
				"GS Mountain Trail Path to Crater": " is_adult and (can_use(Hammer) or logic_trail_gs_upper) and at_night",
				"Death Mountain Trail Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Bug Rock": "is_child and has_bottle"
			},
			"exits": {
				"Death Mountain": "True",
				"Death Mountain Crater Upper Local": "True",
				"Death Mountain Summit Owl Flight": "is_child",
				"Mountain Bombable Grotto": "(can_blast_or_smash)",
				"Mountain Summit Fairy": "(can_blast_or_smash)"
			}
		},
		"Death Mountain Summit Owl Flight": {
			"region_name": "Death Mountain Summit Owl Flight",
			"scene": "Death Mountain",
			"exits": {
				"Kakariko Impa Ledge": "True"
			}
		},
		"Dodongos Cavern Entryway": {
			"region_name": "Dodongos Cavern Entryway",
			"scene": "Death Mountain",
			"exits": {
				"Dodongos Cavern Beginning": "True",
				"Death Mountain": "True"
			}
		},
		"Mountain Summit Fairy": {
			"region_name": "Mountain Summit Fairy",
			"locations": {
				"Mountain Summit Fairy Reward": "can_play(Zeldas_Lullaby)"
			},
			"exits": {
				"Death Mountain Summit": "True"
			}
		},
		"Mountain Bombable Grotto": {
			"region_name": "Mountain Bombable Grotto",
			"locations": {
				"DMT Grotto Cow": "can_play(Eponas_Song)"
			},
			"exits": {
				"Death Mountain Summit": "True"
			}
		},
		"Mountain Storms Grotto": {
			"region_name": "Mountain Storms Grotto",
			"locations": {
				"Mountain Storms Grotto Chest": "True",
				"Mountain Storms Grotto Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "can_cut_shrubs and has_bottle",
				"Lone Fish": "has_bottle"
			},
			"exits": {
				"Death Mountain": "True"
			}
		}
	},
	"Goron City": {
		"Goron City": {
			"region_name": "Goron City",
			"scene": "Goron City",
			"hint": "Goron City",
			"events": {
				"Goron City Child Fire": "is_child and can_use(Dins_Fire)",
				"Goron City Woods Warp Open": " can_blast_or_smash or can_use(Dins_Fire) or can_use(Bow) or Progressive_Strength_Upgrade or 'Goron City Child Fire'",
				"Stop Link the Goron": " is_adult and (Progressive_Strength_Upgrade or has_explosives or Bow or (logic_link_goron_dins and can_use(Dins_Fire)))"
			},
			"locations": {
				"Goron City Leftmost Maze Chest": " can_use(Hammer) or can_use(Silver_Gauntlets) or (logic_goron_city_leftmost and has_explosives and can_use(Hover_Boots))",
				"Goron City Left Maze Chest": " can_blast_or_smash or can_use(Silver_Gauntlets)",
				"Goron City Right Maze Chest": " can_blast_or_smash or can_use(Silver_Gauntlets)",
				"Goron City Pot Freestanding PoH": " is_child and 'Goron City Child Fire' and (Bombs or (Progressive_Strength_Upgrade and logic_goron_city_pot_with_strength) or (has_bombchus and logic_goron_city_pot))",
				"Rolling Goron as Child": " is_child and (has_explosives or (Progressive_Strength_Upgrade and logic_child_rolling_with_strength))",
				"Link the Goron": "'Stop Link the Goron'",
				"GS Goron City Boulder Maze": "is_child and has_explosives",
				"GS Goron City Center Platform": "is_adult",
				"Goron City Maze Gossip Stone": " can_blast_or_smash or can_use(Silver_Gauntlets)",
				"Goron City Medigoron Gossip Stone": " can_blast_or_smash or Progressive_Strength_Upgrade",
				"Gossip Stone Fairy": " can_summon_gossip_fairy_without_suns and has_bottle and (can_blast_or_smash or Progressive_Strength_Upgrade)",
				"Bug Rock": "(can_blast_or_smash or can_use(Silver_Gauntlets)) and has_bottle",
				"Stick Pot": "is_child"
			},
			"exits": {
				"Death Mountain": "True",
				"Lost Woods": "can_blast_or_smash or can_use(Dins_Fire) or can_use(Bow) or Progressive_Strength_Upgrade or 'Goron City Child Fire' or has('Goron City Woods Warp Open')",
				"Goron Shop": " (is_adult and 'Stop Link the Goron') or (is_child and (has_explosives or Progressive_Strength_Upgrade or 'Goron City Child Fire'))",
				"Darunias Chamber": " (is_adult and 'Stop Link the Goron') or (is_child and can_play(Zeldas_Lullaby))",
				"Goron City Grotto": " is_adult and ((can_play(Song_of_Time)) or (can_use(Goron_Tunic) and can_use(Hookshot)) or (can_use(Nayrus_Love) and can_use(Hookshot)))"
			}
		},
		"Goron City Woods Warp": {
			"region_name": "Goron City Woods Warp",
			"scene": "Goron City",
			"events": {
				"Goron City Woods Warp Open From Woods": "can_blast_or_smash or can_use(Dins_Fire)"
			},
			"exits": {
				"Goron City": "can_leave_forest and 'Goron City Woods Warp Open From Woods'",
				"Lost Woods": "True"
			}
		},
		"Darunias Chamber": {
			"region_name": "Darunias Chamber",
			"scene": "Goron City",
			"hint": "Goron City",
			"events": {
				"Goron City Child Fire": "can_use(Sticks)"
			},
			"locations": {
				"Darunias Joy": "is_child and can_play(Sarias_Song)"
			},
			"exits": {
				"Goron City": "True",
				"Death Mountain Crater Lower Local": "is_adult"
			}
		},
		"Goron Shop": {
			"region_name": "Goron Shop",
			"locations": {
				"Goron Shop Item 1": "True",
				"Goron Shop Item 2": "True",
				"Goron Shop Item 3": "True",
				"Goron Shop Item 4": "True",
				"Goron Shop Item 5": "True",
				"Goron Shop Item 6": "True",
				"Goron Shop Item 7": "True",
				"Goron Shop Item 8": "True"
			},
			"exits": {
				"Goron City": "True"
			}
		},
		"Goron City Grotto": {
			"region_name": "Goron City Grotto",
			"locations": {
				"Goron Grotto Deku Scrub Deku Nuts": "can_stun_deku",
				"Goron Grotto Deku Scrub Bombs": "can_stun_deku",
				"Goron Grotto Deku Scrub Arrows": "can_stun_deku"
			},
			"exits": {
				"Goron City": "True"
			}
		}
	},
	"Death Mountain Crater": {
		"Death Mountain Crater Upper Nearby": {
			"region_name": "Death Mountain Crater Upper Nearby",
			"scene": "Death Mountain Crater",
			"hint": "Death Mountain Crater",
			"exits": {
				"Death Mountain Crater Upper Local": "can_use(Goron_Tunic)",
				"Death Mountain Summit": "True",
				"Top of Crater Grotto": "(can_blast_or_smash)"
			}
		},
		"Death Mountain Crater Upper Local": {
			"region_name": "Death Mountain Crater Upper Local",
			"scene": "Death Mountain Crater",
			"hint": "Death Mountain Crater",
			"locations": {
				"DM Crater Wall Freestanding PoH": "True",
				"GS Death Mountain Crater Crate": "is_child and can_child_attack",
				"Death Mountain Crater Gossip Stone": "has_explosives",
				"Gossip Stone Fairy": " has_explosives and can_summon_gossip_fairy_without_suns and has_bottle"
			},
			"exits": {
				"Death Mountain Crater Upper Nearby": "True",
				"Death Mountain Crater Ladder Area Nearby": "True",
				"Death Mountain Crater Central Nearby": " can_use(Goron_Tunic) and can_use(Longshot)"
			}
		},
		"Death Mountain Crater Ladder Area Nearby": {
			"region_name": "Death Mountain Crater Ladder Area Nearby",
			"scene": "Death Mountain Crater",
			"hint": "Death Mountain Crater",
			"locations": {
				"DMC Deku Scrub Bombs": "is_child and can_stun_deku"
			},
			"exits": {
				"Death Mountain Crater Upper Nearby": "is_adult",
				"Death Mountain Crater Lower Nearby": " can_use(Hover_Boots) or (logic_crater_upper_to_lower and can_use(Hammer))"
			}
		},
		"Death Mountain Crater Lower Nearby": {
			"region_name": "Death Mountain Crater Lower Nearby",
			"scene": "Death Mountain Crater",
			"hint": "Death Mountain Crater",
			"exits": {
				"Death Mountain Crater Lower Local": "can_use(Goron_Tunic)",
				"Darunias Chamber": "True",
				"Crater Fairy": "can_use(Hammer)",
				"DMC Hammer Grotto": "can_use(Hammer)"
			}
		},
		"Death Mountain Crater Lower Local": {
			"region_name": "Death Mountain Crater Lower Local",
			"scene": "Death Mountain Crater",
			"hint": "Death Mountain Crater",
			"exits": {
				"Death Mountain Crater Lower Nearby": "True",
				"Death Mountain Crater Ladder Area Nearby": "True",
				"Death Mountain Crater Central Nearby": "can_use(Hover_Boots) or can_use(Hookshot)",
				"Fire Temple Entrance": " (can_use(Hover_Boots) or can_use(Hookshot)) and (logic_fewer_tunic_requirements or can_use(Goron_Tunic))"
			}
		},
		"Death Mountain Crater Central Nearby": {
			"region_name": "Death Mountain Crater Central Nearby",
			"scene": "Death Mountain Crater",
			"hint": "Death Mountain Crater",
			"locations": {
				"DM Crater Volcano Freestanding PoH": " is_adult and ((can_plant_bean) or (logic_crater_bean_poh_with_hovers and Hover_Boots))",
				"Sheik in Crater": "is_adult"
			},
			"exits": {
				"Death Mountain Crater Central Local": "can_use(Goron_Tunic)"
			}
		},
		"Death Mountain Crater Central Local": {
			"region_name": "Death Mountain Crater Central Local",
			"scene": "Death Mountain Crater",
			"hint": "Death Mountain Crater",
			"locations": {
				"GS Mountain Crater Bean Patch": "can_plant_bugs and can_child_attack",
				"Bean Plant Fairy": "can_plant_bean and can_play(Song_of_Storms) and has_bottle"
			},
			"exits": {
				"Death Mountain Crater Central Nearby": "True",
				"Death Mountain Crater Lower Nearby": " is_adult and (can_use(Hover_Boots) or can_use(Hookshot) or (can_plant_bean))",
				"Death Mountain Crater Upper Nearby": "is_adult and (can_plant_bean)",
				"Fire Temple Entrance": " (is_child and shuffle_dungeon_entrances) or (is_adult and (logic_fewer_tunic_requirements or can_use(Goron_Tunic)))"
			}
		},
		"Fire Temple Entrance": {
			"region_name": "Fire Temple Entrance",
			"scene": "Death Mountain Crater",
			"hint": "Death Mountain Crater",
			"exits": {
				"Fire Temple Lower": "True",
				"Death Mountain Crater Central Local": "True",
			}
		},
		"Crater Fairy": {
			"region_name": "Crater Fairy",
			"locations": {
				"Crater Fairy Reward": "can_play(Zeldas_Lullaby)"
			},
			"exits": {
				"Death Mountain Crater Lower Local": "True"
			}
		},
		"Top of Crater Grotto": {
			"region_name": "Top of Crater Grotto",
			"locations": {
				"Top of Crater Grotto Chest": "True",
				"Top of Crater Grotto Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "can_cut_shrubs and has_bottle",
				"Lone Fish": "has_bottle"
			},
			"exits": {
				"Death Mountain Crater Upper Local": "True"
			}
		},
		"DMC Hammer Grotto": {
			"region_name": "DMC Hammer Grotto",
			"locations": {
				"DMC Grotto Deku Scrub Deku Nuts": "can_stun_deku",
				"DMC Grotto Deku Scrub Bombs": "can_stun_deku",
				"DMC Grotto Deku Scrub Arrows": "can_stun_deku"
			},
			"exits": {
				"Death Mountain Crater Lower Local": "True"
			}
		}
	},
	"Zora River": {
		"Zora River Front": {
			"region_name": "Zora River Front",
			"scene": "Zora River",
			"hint": "Zora's River",
			"time_passes": true,
			"locations": {
				"GS Zora River Tree": "is_child and can_child_attack"
			},
			"exits": {
				"Zora River": "is_adult or has_explosives or Opened_Child_River",
				"Hyrule Field": "True"
			}
		},
		"Zora River": {
			"region_name": "Zora River",
			"scene": "Zora River",
			"hint": "Zora's River",
			"time_passes": true,
			"locations": {
				"Magic Bean Salesman": "is_child",
				"Frog Ocarina Game": " is_child and can_play(Zeldas_Lullaby) and can_play(Sarias_Song) and can_play(Suns_Song) and can_play(Eponas_Song) and can_play(Song_of_Time) and can_play(Song_of_Storms)",
				"Frogs in the Rain": "is_child and can_play(Song_of_Storms)",
				"Zora River Lower Freestanding PoH": " is_child or can_use(Hover_Boots) or (is_adult and logic_zora_river_lower)",
				"Zora River Upper Freestanding PoH": " is_child or can_use(Hover_Boots) or (is_adult and logic_zora_river_upper)",
				"GS Zora River Ladder": "is_child and at_night and can_child_attack",
				"GS Zora River Near Raised Grottos": "can_use(Hookshot) and at_night",
				"GS Zora River Above Bridge": "can_use(Hookshot) and at_night",
				"Zoras River Plateau Gossip Stone": "True",
				"Zoras River Waterfall Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Bean Plant Fairy": "can_plant_bean and can_play(Song_of_Storms) and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "can_cut_shrubs and has_bottle"
			},
			"exits": {
				"Zora River Front": "True",
				"Zora River Plateau Open Grotto": "True",
				"Zora River Plateau Bombable Grotto": "(can_blast_or_smash)",
				"Lost Woods": "can_dive or can_use(Iron_Boots)",
				"Zora River Storms Grotto": "can_open_storm_grotto",
				"Zora River Behind Waterfall": " can_play(Zeldas_Lullaby) or (can_use(Hover_Boots) and logic_zora_with_hovers) or (is_child and logic_zora_with_cucco)"
			}
		},
		"Zora River Behind Waterfall": {
			"region_name": "Zora River Behind Waterfall",
			"scene": "Zora River",
			"exits": {
				"Zora River": "True",
				"Zoras Domain": "True"
			}
		},
		"Zora River Plateau Open Grotto": {
			"region_name": "Zora River Plateau Open Grotto",
			"locations": {
				"Zora River Plateau Open Grotto Chest": "True",
				"Zora River Plateau Open Grotto Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and has_bottle",
				"Bug Shrub": "can_cut_shrubs and has_bottle",
				"Lone Fish": "has_bottle"
			},
			"exits": {
				"Zora River": "True"
			}
		},
		"Zora River Plateau Bombable Grotto": {
			"region_name": "Zora River Plateau Bombable Grotto",
			"locations": {
				"Free Fairies": "has_bottle"
			},
			"exits": {
				"Zora River": "True"
			}
		},
		"Zora River Storms Grotto": {
			"region_name": "Zora River Storms Grotto",
			"locations": {
				"ZR Grotto Deku Scrub Red Potion": "can_stun_deku",
				"ZR Grotto Deku Scrub Green Potion": "can_stun_deku"
			},
			"exits": {
				"Zora River": "True"
			}
		}
	},
	"Zoras Domain": {
		"Zoras Domain": {
			"region_name": "Zoras Domain",
			"scene": "Zoras Domain",
			"hint": "Zora's Domain",
			"events": {
				"Zora Thawed": "is_adult and Blue_Fire",
				"Eyeball Frog Access": " is_adult and 'Zora Thawed' and (Eyedrops or Eyeball_Frog or Prescription or 'Prescription Access')"
			},
			"locations": {
				"Diving Minigame": "is_child",
				"Zoras Domain Torch Run": "can_use(Sticks)",
				"Deliver Ruto's Letter": " is_child and Bottle_with_Letter and (closed_zora_fountain or adult_zora_fountain)",
				"King Zora Thawed": "'Zora Thawed'",
				"GS Zora's Domain Frozen Waterfall": " is_adult and at_night and (Progressive_Hookshot or Bow or Magic_Meter)",
				"Zoras Domain Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy_without_suns and has_bottle",
				"Fish Group": "is_child and has_bottle",
				"Stick Pot": "is_child",
				"Nut Pot": "True"
			},
			"exits": {
				"Zora River Behind Waterfall": "True",
				"Lake Hylia": "is_child and can_dive",
				"Zoras Domain Behind King Zora": " Deliver_Letter or open_zora_fountain or (adult_zora_fountain and is_adult)",
				"Zora Shop": "is_child or Blue_Fire",
				"Zoras Domain Storms Grotto": "can_open_storm_grotto"
			}
		},
		"Zoras Domain Behind King Zora": {
			"region_name": "Zoras Domain Behind King Zora",
			"scene": "Zoras Domain",
			"exits": {
				"Zoras Domain": " Deliver_Letter or open_zora_fountain or (adult_zora_fountain and is_adult)",
				"Zoras Fountain": "True"
			}
		},
		"Zora Shop": {
			"region_name": "Zora Shop",
			"locations": {
				"Zora Shop Item 1": "True",
				"Zora Shop Item 2": "True",
				"Zora Shop Item 3": "True",
				"Zora Shop Item 4": "True",
				"Zora Shop Item 5": "True",
				"Zora Shop Item 6": "True",
				"Zora Shop Item 7": "True",
				"Zora Shop Item 8": "True"
			},
			"exits": {
				"Zoras Domain": "True"
			}
		},
		"Zoras Domain Storms Grotto": {
			"region_name": "Zoras Domain Storms Grotto",
			"locations": {
				"Free Fairies": "has_bottle"
			},
			"exits": {
				"Zoras Domain": "True"
			}
		}
	},
	"Zoras Fountain": {
		"Zoras Fountain": {
			"region_name": "Zoras Fountain",
			"scene": "Zoras Fountain",
			"hint": "Zora's Fountain",
			"locations": {
				"Zoras Fountain Iceberg Freestanding PoH": "is_adult",
				"Zoras Fountain Bottom Freestanding PoH": " is_adult and Iron_Boots and (logic_fewer_tunic_requirements or can_use(Zora_Tunic))",
				"GS Zora's Fountain Tree": "is_child",
				"GS Zora's Fountain Above the Log": "can_use(Boomerang) and at_night",
				"GS Zora's Fountain Hidden Cave": " can_use(Silver_Gauntlets) and can_blast_or_smash and can_use(Hookshot) and at_night",
				"Zoras Fountain Fairy Gossip Stone": "True",
				"Zoras Fountain Jabu Gossip Stone": "True",
				"Gossip Stone Fairy": "can_summon_gossip_fairy_without_suns and has_bottle",
				"Butterfly Fairy": "can_use(Sticks) and at_day and has_bottle"
			},
			"exits": {
				"Zoras Domain Behind King Zora": "True",
				"Jabu Jabus Belly Beginning": "is_child and Fish",
				"Ice Cavern Beginning": "is_adult",
				"Zoras Fountain Fairy": "has_explosives"
			}
		},
		"Zoras Fountain Fairy": {
			"region_name": "Zoras Fountain Fairy",
			"locations": {
				"Zoras Fountain Fairy Reward": "can_play(Zeldas_Lullaby)"
			},
			"exits": {
				"Zoras Fountain": "True"
			}
		}
	},
	"Lon Lon Ranch": {
		"Lon Lon Ranch": {
			"region_name": "Lon Lon Ranch",
			"scene": "Lon Lon Ranch",
			"hint": "Lon Lon Ranch",
			"events": {
				"Epona": "can_play(Eponas_Song) and is_adult and at_day",
				"Links Cow": "can_play(Eponas_Song) and is_adult and at_day"
			},
			"locations": {
				"Song from Malon": "is_child and Zeldas_Letter and Ocarina and at_day",
				"GS Lon Lon Ranch Tree": "is_child",
				"GS Lon Lon Ranch Rain Shed": "is_child and at_night",
				"GS Lon Lon Ranch House Window": "can_use(Boomerang) and at_night",
				"GS Lon Lon Ranch Back Wall": "can_use(Boomerang) and at_night"
			},
			"exits": {
				"Hyrule Field": "True",
				"Talon House": "is_adult or at_day",
				"Ingo Barn": "True",
				"Lon Lon Corner Tower": "True",
				"Lon Lon Grotto": "is_child"
			}
		},
		"Talon House": {
			"region_name": "Talon House",
			"locations": {
				"Talons Chickens": "is_child and at_day and Zeldas_Letter"
			},
			"exits": {
				"Lon Lon Ranch": "True"
			}
		},
		"Ingo Barn": {
			"region_name": "Ingo Barn",
			"locations": {
				"LLR Stables Left Cow": "can_play(Eponas_Song)",
				"LLR Stables Right Cow": "can_play(Eponas_Song)"
			},
			"exits": {
				"Lon Lon Ranch": "True"
			}
		},
		"Lon Lon Corner Tower": {
			"region_name": "Lon Lon Corner Tower",
			"locations": {
				"Lon Lon Tower Freestanding PoH": "is_child",
				"LLR Tower Left Cow": "can_play(Eponas_Song)",
				"LLR Tower Right Cow": "can_play(Eponas_Song)"
			},
			"exits": {
				"Lon Lon Ranch": "True"
			}
		},
		"Lon Lon Grotto": {
			"region_name": "Lon Lon Grotto",
			"locations": {
				"LLR Grotto Deku Scrub Deku Nuts": "can_stun_deku",
				"LLR Grotto Deku Scrub Bombs": "can_stun_deku",
				"LLR Grotto Deku Scrub Arrows": "can_stun_deku"
			},
			"exits": {
				"Lon Lon Ranch": "True"
			}
		}
	},
	"Ganons Castle": {
		"vanilla": {
			"Ganons Castle Lobby": {
				"region_name": "Ganons Castle Lobby",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Grounds": "True",
					"Ganons Castle Forest Trial": "True",
					"Ganons Castle Fire Trial": "True",
					"Ganons Castle Water Trial": "True",
					"Ganons Castle Shadow Trial": "True",
					"Ganons Castle Spirit Trial": "True",
					"Ganons Castle Light Trial": "can_use(Golden_Gauntlets)",
					"Ganons Castle Tower": " (skipped_trial(Forest) or has('Clear Forest Trial')) and (skipped_trial(Fire) or has('Clear Fire Trial')) and (skipped_trial(Water) or has('Clear Water Trial')) and (skipped_trial(Shadow) or has('Clear Shadow Trial')) and (skipped_trial(Spirit) or has('Clear Spirit Trial')) and (skipped_trial(Light) or has('Clear Light Trial'))",
					"Ganons Castle Deku Scrubs": "can_see_with_lens"
				}
			},
			"Ganons Castle Deku Scrubs": {
				"region_name": "Ganons Castle Deku Scrubs",
				"dungeon": "Ganons Castle",
				"locations": {
					"GC Deku Scrub Bombs": "True",
					"GC Deku Scrub Arrows": "True",
					"GC Deku Scrub Red Potion": "True",
					"GC Deku Scrub Green Potion": "True",
					"Free Fairies": "has_bottle"
				}
			},
			"Ganons Castle Forest Trial": {
				"region_name": "Ganons Castle Forest Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Ganons Castle Forest Trial Chest": "True",
					"Clear Forest Trial": "(can_use(Light_Arrows) and (Fire_Arrows or Dins_Fire))"
				}
			},
			"Ganons Castle Fire Trial": {
				"region_name": "Ganons Castle Fire Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Clear Fire Trial": "(can_use(Goron_Tunic) and can_use(Golden_Gauntlets) and can_use(Light_Arrows) and can_use(Longshot))"
				}
			},
			"Ganons Castle Water Trial": {
				"region_name": "Ganons Castle Water Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Ganons Castle Water Trial Left Chest": "True",
					"Ganons Castle Water Trial Right Chest": "True",
					"Fairy Pot": "Blue_Fire and has_bottle",
					"Blue Fire": "has_bottle",
					"Clear Water Trial": "(Blue_Fire and Hammer and can_use(Light_Arrows))"
				}
			},
			"Ganons Castle Shadow Trial": {
				"region_name": "Ganons Castle Shadow Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Ganons Castle Shadow Trial First Chest": " can_use(Fire_Arrows) or Progressive_Hookshot or Hover_Boots or can_play(Song_of_Time)",
					"Ganons Castle Shadow Trial Second Chest": " can_use(Fire_Arrows) or (can_use(Longshot) and (Hover_Boots or can_use(Dins_Fire)))",
					"Clear Shadow Trial": "(can_use(Light_Arrows) and Hammer and ((Fire_Arrows and can_see_with_lens) or (can_use(Longshot) and (Hover_Boots or (Dins_Fire and can_see_with_lens)))))"
				}
			},
			"Ganons Castle Spirit Trial": {
				"region_name": "Ganons Castle Spirit Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Ganons Castle Spirit Trial First Chest": " (logic_spirit_trial_hookshot or Progressive_Hookshot)",
					"Ganons Castle Spirit Trial Second Chest": " (logic_spirit_trial_hookshot or Progressive_Hookshot) and has_bombchus and can_see_with_lens",
					"Nut Pot": " (logic_spirit_trial_hookshot or Progressive_Hookshot) and has_bombchus and Bow and Mirror_Shield",
					"Clear Spirit Trial": "(can_use(Light_Arrows) and Mirror_Shield and has_bombchus and (logic_spirit_trial_hookshot or Progressive_Hookshot))"
				}
			},
			"Ganons Castle Light Trial": {
				"region_name": "Ganons Castle Light Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Ganons Castle Light Trial First Left Chest": "True",
					"Ganons Castle Light Trial Second Left Chest": "True",
					"Ganons Castle Light Trial Third Left Chest": "True",
					"Ganons Castle Light Trial First Right Chest": "True",
					"Ganons Castle Light Trial Second Right Chest": "True",
					"Ganons Castle Light Trial Third Right Chest": "True",
					"Ganons Castle Light Trial Invisible Enemies Chest": "can_see_with_lens",
					"Ganons Castle Light Trial Lullaby Chest": " can_play(Zeldas_Lullaby) and (Small_Key_Ganons_Castle, 1)",
					"Clear Light Trial": "(can_use(Light_Arrows) and Progressive_Hookshot and (Small_Key_Ganons_Castle, 2) and can_see_with_lens)"
				}
			},
			"Ganons Castle Tower": {
				"region_name": "Ganons Castle Tower",
				"dungeon": "Ganons Castle",
				"locations": {
					"Ganons Tower Boss Key Chest": "True",
					"Ganondorf Hint": "Boss_Key_Ganons_Castle",
					"Ganon": "Boss_Key_Ganons_Castle and can_use(Light_Arrows)"
				}
			},
		},
		"mq": {
			"Ganons Castle Lobby": {
				"region_name": "Ganons Castle Lobby",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Grounds": "True",
					"Ganons Castle Forest Trial": "True",
					"Ganons Castle Fire Trial": "True",
					"Ganons Castle Water Trial": "True",
					"Ganons Castle Shadow Trial": "True",
					"Ganons Castle Spirit Trial": "True",
					"Ganons Castle Light Trial": "can_use(Golden_Gauntlets)",
					"Ganons Castle Tower": " (skipped_trial(Forest) or has('Clear Forest Trial')) and (skipped_trial(Fire) or has('Clear Fire Trial')) and (skipped_trial(Water) or has('Clear Water Trial')) and (skipped_trial(Shadow) or has('Clear Shadow Trial')) and (skipped_trial(Spirit) or has('Clear Spirit Trial')) and (skipped_trial(Light) or has('Clear Light Trial'))",
					"Ganons Castle Deku Scrubs": "can_see_with_lens"
				}
			},
			"Ganons Castle Deku Scrubs": {
				"region_name": "Ganons Castle Deku Scrubs",
				"dungeon": "Ganons Castle",
				"locations": {
					"GC MQ Deku Scrub Bombs": "True",
					"GC MQ Deku Scrub Arrows": "True",
					"GC MQ Deku Scrub Red Potion": "True",
					"GC MQ Deku Scrub Green Potion": "True",
					"GC MQ Deku Scrub Deku Nuts": "True",
					"Free Fairies": "has_bottle"
				}
			},
			"Ganons Castle Forest Trial": {
				"region_name": "Ganons Castle Forest Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Ganons Castle MQ Forest Trial First Chest": "Bow",
					"Ganons Castle MQ Forest Trial Second Chest": "has_fire_source",
					"Ganons Castle MQ Forest Trial Freestanding Key": "Progressive_Hookshot",
					"Clear Forest Trial": "can_use(Light_Arrows) and can_play(Song_of_Time)"
				}
			},
			"Ganons Castle Fire Trial": {
				"region_name": "Ganons Castle Fire Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Clear Fire Trial": " can_use(Goron_Tunic) and can_use(Golden_Gauntlets) and can_use(Light_Arrows) and (can_use(Longshot) or Hover_Boots)"
				}
			},
			"Ganons Castle Water Trial": {
				"region_name": "Ganons Castle Water Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Ganons Castle MQ Water Trial Chest": "Blue_Fire",
					"Blue Fire": "has_bottle",
					"Clear Water Trial": " Blue_Fire and can_use(Light_Arrows) and (Small_Key_Ganons_Castle, 3)"
				}
			},
			"Ganons Castle Shadow Trial": {
				"region_name": "Ganons Castle Shadow Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Ganons Castle MQ Shadow Trial First Chest": " (Bow and (Progressive_Hookshot or Hover_Boots)) or (Hover_Boots and can_see_with_lens and (has_explosives or Progressive_Strength_Upgrade or can_use(Dins_Fire)))",
					"Ganons Castle MQ Shadow Trial Second Chest": " Bow and can_see_with_lens and (Hover_Boots or (Progressive_Hookshot and (has_fire_source or logic_shadow_trial_mq)))",
					"Clear Shadow Trial": " can_use(Light_Arrows) and can_see_with_lens and (Hover_Boots or (Progressive_Hookshot and (has_fire_source or logic_shadow_trial_mq)))"
				}
			},
			"Ganons Castle Spirit Trial": {
				"region_name": "Ganons Castle Spirit Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Ganons Castle MQ Spirit Trial First Chest": "(Bow or logic_rusted_switches) and Hammer",
					"Ganons Castle MQ Spirit Trial Second Chest": " (Bow or logic_rusted_switches) and Hammer and has_bombchus and can_see_with_lens",
					"Ganons Castle MQ Spirit Trial Sun Front Left Chest": " Hammer and has_bombchus and can_use(Fire_Arrows) and Mirror_Shield",
					"Ganons Castle MQ Spirit Trial Sun Back Left Chest": " Hammer and has_bombchus and can_use(Fire_Arrows) and Mirror_Shield",
					"Ganons Castle MQ Spirit Trial Golden Gauntlets Chest": " Hammer and has_bombchus and can_use(Fire_Arrows) and Mirror_Shield",
					"Ganons Castle MQ Spirit Trial Sun Back Right Chest": " Hammer and has_bombchus and can_use(Fire_Arrows) and Mirror_Shield",
					"Nut Pot": " Hammer and has_bombchus and can_use(Fire_Arrows) and Mirror_Shield",
					"Clear Spirit Trial": " can_use(Light_Arrows) and Hammer and has_bombchus and Fire_Arrows and Mirror_Shield"
				}
			},
			"Ganons Castle Light Trial": {
				"region_name": "Ganons Castle Light Trial",
				"dungeon": "Ganons Castle",
				"exits": {
					"Ganons Castle Lobby": "True"
				},
				"locations": {
					"Ganons Castle MQ Light Trial Lullaby Chest": "can_play(Zeldas_Lullaby)",
					"Clear Light Trial": " can_use(Light_Arrows) and (Small_Key_Ganons_Castle, 3) and can_see_with_lens"
				}
			},
			"Ganons Castle Tower": {
				"region_name": "Ganons Castle Tower",
				"dungeon": "Ganons Castle",
				"locations": {
					"Ganons Tower Boss Key Chest": "True",
					"Ganondorf Hint": "Boss_Key_Ganons_Castle",
					"Ganon": "Boss_Key_Ganons_Castle and can_use(Light_Arrows)"
				}
			},
		}
	},
	"Bottom of the Well": {
		"vanilla": {
			"Bottom of the Well": {
				"region_name": "Bottom of the Well",
				"dungeon": "Bottom of the Well",
				"exits": {
					"Kakariko Village": "True",
					"Bottom of the Well Main Area": "is_child and (can_child_attack or Nuts)"
				}
			},
			"Bottom of the Well Main Area": {
				"region_name": "Bottom of the Well Main Area",
				"dungeon": "Bottom of the Well",
				"locations": {
					"Bottom of the Well Front Left Hidden Wall": "can_see_with_lens",
					"Bottom of the Well Front Center Bombable": "has_explosives",
					"Bottom of the Well Right Bottom Hidden Wall": "can_see_with_lens",
					"Bottom of the Well Center Large Chest": "can_see_with_lens",
					"Bottom of the Well Center Small Chest": "can_see_with_lens",
					"Bottom of the Well Back Left Bombable": "has_explosives",
					"Bottom of the Well Freestanding Key": "Sticks or can_use(Dins_Fire)",
					"Bottom of the Well Defeat Boss": " can_play(Zeldas_Lullaby) and (Kokiri_Sword or (Sticks and logic_child_deadhand))",
					"Bottom of the Well Invisible Chest": "can_play(Zeldas_Lullaby) and can_see_with_lens",
					"Bottom of the Well Underwater Front Chest": "can_play(Zeldas_Lullaby)",
					"Bottom of the Well Underwater Left Chest": "can_play(Zeldas_Lullaby)",
					"Bottom of the Well Basement Chest": " has_explosives or ((((Small_Key_Bottom_of_the_Well, 3) and can_see_with_lens) or can_use(Dins_Fire) or (logic_botw_basement and Sticks)) and Progressive_Strength_Upgrade)",
					"Bottom of the Well Locked Pits": " (Small_Key_Bottom_of_the_Well, 3) and can_see_with_lens",
					"Bottom of the Well Behind Right Grate": " (Small_Key_Bottom_of_the_Well, 3) and can_see_with_lens",
					"GS Well West Inner Room": " Boomerang and can_see_with_lens and (Small_Key_Bottom_of_the_Well, 3)",
					"GS Well East Inner Room": " Boomerang and can_see_with_lens and (Small_Key_Bottom_of_the_Well, 3)",
					"GS Well Like Like Cage": " (Small_Key_Bottom_of_the_Well, 3) and can_see_with_lens and (Boomerang or (logic_botw_cage_gs and can_child_attack))",
					"Stick Pot": "True",
					"Nut Pot": "True"
				},
				"exits": {
					"Bottom of the Well": "True"
				}
			}
		},
		"mq": {
			"Bottom of the Well": {
				"region_name": "Bottom of the Well",
				"dungeon": "Bottom of the Well",
				"exits": {
					"Kakariko Village": "True",
					"Bottom of the Well Main Area": "is_child"
				}
			},
			"Bottom of the Well Main Area": {
				"region_name": "Bottom of the Well Main Area",
				"dungeon": "Bottom of the Well",
				"locations": {
					"Bottom of the Well MQ Compass Chest": " Kokiri_Sword or (Sticks and logic_child_deadhand)",
					"Bottom of the Well MQ Map Chest": " can_play(Zeldas_Lullaby) or has_explosives",
					"Bottom of the Well MQ Lens Chest": " has_explosives and (Small_Key_Bottom_of_the_Well, 2)",
					"Bottom of the Well MQ Dead Hand Freestanding Key": " has_explosives or (logic_botw_mq_dead_hand_key and Boomerang)",
					"Bottom of the Well MQ East Inner Room Freestanding Key": " can_play(Zeldas_Lullaby) or has_explosives",
					"GS Well MQ Basement": "can_child_attack",
					"GS Well MQ West Inner Room": " can_child_attack and (can_play(Zeldas_Lullaby) or has_explosives) and can_see_with_lens",
					"GS Well MQ Coffin Room": " can_child_attack and (Small_Key_Bottom_of_the_Well, 2)",
					"Fairy Pot": "has_bottle and has_explosives and Slingshot"
				},
				"exits": {
					"Bottom of the Well": "True"
				}
			}
		}
	},
	"Deku Tree": {
		"vanilla": {
			"Deku Tree Lobby": {
				"region_name": "Deku Tree Lobby",
				"dungeon": "Deku Tree",
				"locations": {
					"Deku Tree Lobby Chest": "True",
					"Deku Tree Compass Chest": "True",
					"Deku Tree Compass Room Side Chest": "True",
					"Deku Tree Basement Chest": "is_adult or can_child_attack or Nuts",
					"GS Deku Tree Compass Room": "is_adult or can_child_attack",
					"GS Deku Tree Basement Vines": " can_use_projectile or can_use(Dins_Fire) or (logic_deku_basement_gs and (is_adult or Sticks or Kokiri_Sword))",
					"GS Deku Tree Basement Gate": "is_adult or can_child_attack",
					"GS Deku Tree Basement Back Room": " ((has_fire_source_with_torch or (logic_deku_b1_webs_with_bow and can_use(Bow))) and (can_use(Slingshot) or can_use(Bow)) and (can_blast_or_smash) and (can_use(Hookshot) or can_use(Boomerang))) or ((logic_deku_b1_skip or (is_adult)) and is_child and has_explosives and can_use(Boomerang) and (Sticks or can_use(Dins_Fire)))",
					"Deku Baba Sticks": "is_adult or Kokiri_Sword or Boomerang",
					"Deku Baba Nuts": " is_adult or Slingshot or Sticks or has_explosives or Kokiri_Sword or can_use(Dins_Fire)"
				},
				"exits": {
					"Outside Deku Tree": "True",
					"Deku Tree Slingshot Room": "(has_shield)",
					"Deku Tree Boss Room": " (has_fire_source_with_torch or (logic_deku_b1_webs_with_bow and can_use(Bow))) and (logic_deku_b1_skip or (is_adult or can_use(Slingshot)))"
				}
			},
			"Deku Tree Slingshot Room": {
				"region_name": "Deku Tree Slingshot Room",
				"dungeon": "Deku Tree",
				"locations": {
					"Deku Tree Slingshot Chest": "True",
					"Deku Tree Slingshot Room Side Chest": "True"
				},
				"exits": {
					"Deku Tree Lobby": "True"
				}
			},
			"Deku Tree Boss Room": {
				"region_name": "Deku Tree Boss Room",
				"dungeon": "Deku Tree",
				"events": {
					"Deku Tree Clear": " (has_shield) and (is_adult or Kokiri_Sword or Sticks)"
				},
				"locations": {
					"Queen Gohma Heart": " (has_shield) and (is_adult or Kokiri_Sword or Sticks)",
					"Queen Gohma": " (has_shield) and (is_adult or Kokiri_Sword or Sticks)"
				},
				"exits": {
					"Deku Tree Lobby": "True"
				}
			}
		},
		"mq": {
			"Deku Tree Lobby": {
				"region_name": "Deku Tree Lobby",
				"dungeon": "Deku Tree",
				"locations": {
					"Deku Tree MQ Lobby Chest": "True",
					"Deku Tree MQ Slingshot Chest": "is_adult or can_child_attack",
					"Deku Tree MQ Slingshot Room Back Chest": "has_fire_source_with_torch or can_use(Bow)",
					"Deku Tree MQ Basement Chest": "has_fire_source_with_torch or can_use(Bow)",
					"GS Deku Tree MQ Lobby": "is_adult or can_child_attack",
					"Deku Baba Sticks": "is_adult or Kokiri_Sword or Boomerang",
					"Deku Baba Nuts": " is_adult or Slingshot or Sticks or has_explosives or Kokiri_Sword or can_use(Dins_Fire)"
				},
				"exits": {
					"Outside Deku Tree": "True",
					"Deku Tree Compass Room": " (can_use(Slingshot) or can_use(Bow)) and (has_fire_source_with_torch or can_use(Bow))",
					"Deku Tree Basement Water Room": " (can_use(Slingshot) or can_use(Bow)) and (has_fire_source_with_torch)",
					"Deku Tree Basement Ledge": "logic_deku_b1_skip or (is_adult)"
				}
			},
			"Deku Tree Compass Room": {
				"region_name": "Deku Tree Compass Room",
				"dungeon": "Deku Tree",
				"locations": {
					"Deku Tree MQ Compass Chest": "True",
					"GS Deku Tree MQ Compass Room": " (can_use(Hookshot) or can_use(Boomerang)) and (has_bombchus or (Bombs and ((is_adult) or can_play(Song_of_Time))))"
				},
				"exits": {
					"Deku Tree Lobby": "True"
				}
			},
			"Deku Tree Basement Water Room": {
				"region_name": "Deku Tree Basement Water Room",
				"dungeon": "Deku Tree",
				"locations": {
					"Deku Tree MQ Before Spinning Log Chest": "True",
					"Deku Tree MQ After Spinning Log Chest": "can_play(Song_of_Time)"
				},
				"exits": {
					"Deku Tree Basement Back Room": "True",
					"Deku Tree Lobby": "True"
				}
			},
			"Deku Tree Basement Back Room": {
				"region_name": "Deku Tree Basement Back Room",
				"dungeon": "Deku Tree",
				"locations": {
					"GS Deku Tree MQ Basement Ceiling": " can_use(Longshot) or (can_play(Song_of_Time) and (can_use(Boomerang) or can_use(Hookshot)))",
					"GS Deku Tree MQ Basement Back Room": " (has_fire_source_with_torch) and (can_use(Hookshot) or can_use(Boomerang))"
				},
				"exits": {
					"Deku Tree Basement Ledge": "is_child",
					"Deku Tree Basement Water Room": " can_use(Kokiri_Sword) or can_use_projectile or (Nuts and can_use(Sticks))"
				}
			},
			"Deku Tree Basement Ledge": {
				"region_name": "Deku Tree Basement Ledge",
				"dungeon": "Deku Tree",
				"locations": {
					"DT MQ Deku Scrub Deku Shield": "can_stun_deku",
					"Queen Gohma Heart": " (has_fire_source_with_torch) and (has_shield) and (is_adult or Kokiri_Sword or Sticks)",
					"Queen Gohma": " (has_fire_source_with_torch) and (has_shield) and (is_adult or Kokiri_Sword or Sticks)"
				},
				"events": {
					"Deku Tree Clear": " (has_fire_source_with_torch) and (has_shield) and (is_adult or Kokiri_Sword or Sticks)"
				},
				"exits": {
					"Deku Tree Basement Back Room": "is_child",
					"Deku Tree Lobby": "True"
				}
			}
		}
	},
	"Dodongos Cavern": {
		"vanilla": {
			"Dodongos Cavern Beginning": {
				"region_name": "Dodongos Cavern Beginning",
				"dungeon": "Dodongos Cavern",
				"exits": {
					"Dodongos Cavern Entryway": "True",
					"Dodongos Cavern Lobby": " (can_blast_or_smash) or Progressive_Strength_Upgrade"
				}
			},
			"Dodongos Cavern Lobby": {
				"region_name": "Dodongos Cavern Lobby",
				"dungeon": "Dodongos Cavern",
				"locations": {
					"Dodongos Cavern Map Chest": "True",
					"Dodongos Cavern Compass Chest": " is_adult or Sticks or (can_use(Dins_Fire) and (Slingshot or has_explosives or Kokiri_Sword))",
					"GS Dodongo's Cavern East Side Room": " has_explosives or is_adult or Slingshot or Boomerang or Sticks or Kokiri_Sword",
					"GS Dodongo's Cavern Scarecrow": " can_use(Scarecrow) or can_use(Longshot) or (logic_dc_scarecrow_gs and (is_adult or can_child_attack))",
					"DC Deku Scrub Deku Sticks": " is_adult or Slingshot or Sticks or has_explosives or Kokiri_Sword",
					"DC Deku Scrub Deku Shield": "True",
					"Dodongos Cavern Gossip Stone": "True",
					"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle"
				},
				"exits": {
					"Dodongos Cavern Beginning": "True",
					"Dodongos Cavern Climb": " ( (is_adult or ((Sticks or can_use(Dins_Fire)) and (Slingshot or Sticks or has_explosives or Kokiri_Sword)))) and (has_explosives or Progressive_Strength_Upgrade or can_use(Dins_Fire) or (logic_dc_staircase and can_use(Bow)))"
				}
			},
			"Dodongos Cavern Climb": {
				"region_name": "Dodongos Cavern Climb",
				"dungeon": "Dodongos Cavern",
				"locations": {
					"Dodongos Cavern Bomb Flower Platform": "True",
					"GS Dodongo's Cavern Vines Above Stairs": "True",
					"DC Deku Scrub Deku Seeds": "can_blast_or_smash",
					"DC Deku Scrub Deku Nuts": "can_blast_or_smash"
				},
				"exits": {
					"Dodongos Cavern Lobby": "True",
					"Dodongos Cavern Far Bridge": " (is_child and (Slingshot or (logic_dc_slingshot_skip and (Sticks or has_explosives or Kokiri_Sword)))) or (is_adult and (Bow or Hover_Boots or can_use(Longshot) or logic_dc_jump))"
				}
			},
			"Dodongos Cavern Far Bridge": {
				"region_name": "Dodongos Cavern Far Bridge",
				"dungeon": "Dodongos Cavern",
				"locations": {
					"Dodongos Cavern Bomb Bag Chest": "True",
					"Dodongos Cavern End of Bridge Chest": "can_blast_or_smash",
					"GS Dodongo's Cavern Alcove Above Stairs": "can_use(Hookshot) or can_use(Boomerang)"
				},
				"exits": {
					"Dodongos Cavern Boss Area": "has_explosives",
					"Dodongos Cavern Lobby": "True"
				}
			},
			"Dodongos Cavern Boss Area": {
				"region_name": "Dodongos Cavern Boss Area",
				"dungeon": "Dodongos Cavern",
				"locations": {
					"Chest Above King Dodongo": "True",
					"King Dodongo Heart": " (Bombs or Progressive_Strength_Upgrade) and (is_adult or Sticks or Kokiri_Sword)",
					"King Dodongo": " (Bombs or Progressive_Strength_Upgrade) and (is_adult or Sticks or Kokiri_Sword)",
					"GS Dodongo's Cavern Back Room": "True",
					"Fairy Pot": "has_bottle"
				},
				"exits": {
					"Dodongos Cavern Lobby": "True"
				}
			}
		},
		"mq": {
			"Dodongos Cavern Beginning": {
				"region_name": "Dodongos Cavern Beginning",
				"dungeon": "Dodongos Cavern",
				"exits": {
					"Dodongos Cavern Entryway": "True",
					"Dodongos Cavern Lobby": " (can_blast_or_smash or Progressive_Strength_Upgrade)"
				}
			},
			"Dodongos Cavern Lobby": {
				"region_name": "Dodongos Cavern Lobby",
				"dungeon": "Dodongos Cavern",
				"locations": {
					"Deku Baba Sticks": "is_adult or Kokiri_Sword or can_use(Boomerang)",
					"Dodongos Cavern MQ Map Chest": "True",
					"Dodongos Cavern MQ Compass Chest": "is_adult or can_child_attack or Nuts",
					"Dodongos Cavern MQ Larva Room Chest": "can_use(Sticks) or has_fire_source",
					"Dodongos Cavern MQ Torch Puzzle Room Chest": " can_blast_or_smash or can_use(Sticks) or can_use(Dins_Fire) or (is_adult and (logic_dc_jump or Hover_Boots or Progressive_Hookshot))",
					"GS Dodongo's Cavern MQ Song of Time Block Room": " can_play(Song_of_Time) and (can_child_attack or is_adult)",
					"GS Dodongo's Cavern MQ Larva Room": "can_use(Sticks) or has_fire_source",
					"GS Dodongo's Cavern MQ Lizalfos Room": "can_blast_or_smash",
					"DC MQ Deku Scrub Deku Sticks": "can_stun_deku",
					"DC MQ Deku Scrub Deku Seeds": "can_stun_deku",
					"DC MQ Deku Scrub Deku Shield": "can_stun_deku",
					"Dodongos Cavern Gossip Stone": "True",
					"Gossip Stone Fairy": "can_summon_gossip_fairy and has_bottle"
				},
				"exits": {
					"Dodongos Cavern Lower Right Side": " (can_blast_or_smash or ((can_use(Sticks) or can_use(Dins_Fire)) and (True or Fairy or can_use(Nayrus_Love))))",
					"Dodongos Cavern Bomb Bag Area": " is_adult or ((is_adult) and has_explosives) or (logic_dc_mq_child_bombs and (Kokiri_Sword or Sticks) and (True or Fairy or can_use(Nayrus_Love)))",
					"Dodongos Cavern Boss Area": "has_explosives"
				}
			},
			"Dodongos Cavern Lower Right Side": {
				"region_name": "Dodongos Cavern Lower Right Side",
				"dungeon": "Dodongos Cavern",
				"locations": {
					"DC MQ Deku Scrub Red Potion": "can_stun_deku"
				},
				"exits": {
					"Dodongos Cavern Bomb Bag Area": " ((is_adult and can_use(Bow)) or Progressive_Strength_Upgrade or can_use(Dins_Fire) or has_explosives) and (can_use(Slingshot))"
				}
			},
			"Dodongos Cavern Bomb Bag Area": {
				"region_name": "Dodongos Cavern Bomb Bag Area",
				"dungeon": "Dodongos Cavern",
				"locations": {
					"Dodongos Cavern MQ Bomb Bag Chest": "True",
					"GS Dodongo's Cavern MQ Scrub Room": " ((is_adult and can_use(Bow)) or Progressive_Strength_Upgrade or can_use(Dins_Fire) or has_explosives) and (can_use(Hookshot) or can_use(Boomerang))"
				},
				"exits": {
					"Dodongos Cavern Lower Right Side": "True"
				}
			},
			"Dodongos Cavern Boss Area": {
				"region_name": "Dodongos Cavern Boss Area",
				"dungeon": "Dodongos Cavern",
				"locations": {
					"Dodongos Cavern MQ Under Grave Chest": "True",
					"Chest Above King Dodongo": "True",
					"King Dodongo Heart": " (Bombs or Progressive_Strength_Upgrade) and (is_adult or Sticks or Kokiri_Sword)",
					"King Dodongo": " (Bombs or Progressive_Strength_Upgrade) and (is_adult or Sticks or Kokiri_Sword)",
					"GS Dodongo's Cavern MQ Back Area": "True",
					"Fairy Pot": "has_bottle"
				}
			}
		}
	},
	"Fire Temple": {
		"vanilla": {
			"Fire Temple Lower": {
				"region_name": "Fire Temple Lower",
				"dungeon": "Fire Temple",
				"locations": {
					"Fire Temple Chest Near Boss": " logic_fewer_tunic_requirements or can_use(Goron_Tunic)",
					"Fire Temple Fire Dancer Chest": " ((Small_Key_Fire_Temple, 8) or not keysanity) and can_use(Hammer)",
					"Fire Temple Boss Key Chest": " ((Small_Key_Fire_Temple, 8) or not keysanity) and can_use(Hammer)",
					"Volvagia Heart": " can_use(Goron_Tunic) and can_use(Hammer) and Boss_Key_Fire_Temple and (logic_fire_boss_door_jump or Hover_Boots or ( can_play(Song_of_Time) or has_explosives))",
					"Volvagia": " can_use(Goron_Tunic) and can_use(Hammer) and Boss_Key_Fire_Temple and (logic_fire_boss_door_jump or Hover_Boots or ( can_play(Song_of_Time) or has_explosives))",
					"GS Fire Temple Basement": " ((Small_Key_Fire_Temple, 8) or not keysanity) and can_use(Hammer)",
					"Fairy Pot": " has_bottle and (can_use(Hover_Boots) or can_use(Hookshot)) and (logic_fewer_tunic_requirements or can_use(Goron_Tunic))"
				},
				"exits": {
					"Fire Temple Entrance": "True",
					"Fire Temple Big Lava Room": " (Small_Key_Fire_Temple, 2) and (logic_fewer_tunic_requirements or can_use(Goron_Tunic))"
				}
			},
			"Fire Temple Big Lava Room": {
				"region_name": "Fire Temple Big Lava Room",
				"dungeon": "Fire Temple",
				"locations": {
					"Fire Temple Big Lava Room Open Chest": "True",
					"Fire Temple Big Lava Room Bombable Chest": "is_adult and has_explosives",
					"GS Fire Temple Song of Time Room": " is_adult and (can_play(Song_of_Time) or logic_fire_song_of_time)"
				},
				"exits": {
					"Fire Temple Lower": "True",
					"Fire Temple Middle": " can_use(Goron_Tunic) and (Small_Key_Fire_Temple, 4) and (Progressive_Strength_Upgrade or logic_fire_strength) and (has_explosives or Bow or Progressive_Hookshot)"
				}
			},
			"Fire Temple Middle": {
				"region_name": "Fire Temple Middle",
				"dungeon": "Fire Temple",
				"locations": {
					"Fire Temple Boulder Maze Lower Chest": "True",
					"Fire Temple Boulder Maze Upper Chest": "(Small_Key_Fire_Temple, 6)",
					"Fire Temple Boulder Maze Side Room": "True",
					"Fire Temple Boulder Maze Bombable Pit": " (Small_Key_Fire_Temple, 6) and has_explosives",
					"Fire Temple Scarecrow Chest": " (Small_Key_Fire_Temple, 6) and (can_use(Scarecrow) or (logic_fire_scarecrow and can_use(Longshot)))",
					"Fire Temple Map Chest": " (Small_Key_Fire_Temple, 6) or ((Small_Key_Fire_Temple, 5) and can_use(Bow))",
					"Fire Temple Compass Chest": "(Small_Key_Fire_Temple, 7)",
					"GS Fire Temple Unmarked Bomb Wall": "(Small_Key_Fire_Temple, 4) and has_explosives",
					"GS Fire Temple East Tower Climb": " (Small_Key_Fire_Temple, 6) and (can_use(Scarecrow) or (logic_fire_scarecrow and can_use(Longshot)))",
					"GS Fire Temple East Tower Top": " (Small_Key_Fire_Temple, 6) and (can_use(Scarecrow) or (logic_fire_scarecrow and can_use(Longshot)))"
				},
				"exits": {
					"Fire Temple Upper": " (Small_Key_Fire_Temple, 8) or ((Small_Key_Fire_Temple, 7) and ((can_use(Hover_Boots) and can_use(Hammer)) or logic_fire_flame_maze))"
				}
			},
			"Fire Temple Upper": {
				"region_name": "Fire Temple Upper",
				"dungeon": "Fire Temple",
				"locations": {
					"Fire Temple Highest Goron Chest": " can_use(Hammer) and (can_play(Song_of_Time) or (logic_rusted_switches and (can_use(Hover_Boots) or has_explosives)))",
					"Fire Temple Megaton Hammer Chest": "has_explosives"
				}
			}
		},
		"mq": {
			"Fire Temple Lower": {
				"region_name": "Fire Temple Lower",
				"dungeon": "Fire Temple",
				"locations": {
					"Fire Temple MQ Entrance Hallway Small Chest": " is_adult or Kokiri_Sword or can_use(Sticks) or can_use(Slingshot)",
					"Fire Temple MQ Chest Near Boss": " (logic_fewer_tunic_requirements or can_use(Goron_Tunic)) and ( ((can_use(Hover_Boots) or (logic_fire_mq_near_boss and can_use(Bow))) and has_fire_source) or (can_use(Hookshot) and (can_use(Fire_Arrows) or (can_use(Dins_Fire) and ((True and True) or can_use(Goron_Tunic) or can_use(Bow) or (Progressive_Hookshot, 2))))))",
					"Fairy Pot": "has_bottle and (Small_Key_Fire_Temple, 5)"
				},
				"exits": {
					"Fire Temple Entrance": "True",
					"Fire Boss Room": " can_use(Goron_Tunic) and can_use(Hammer) and Boss_Key_Fire_Temple and ((has_fire_source and (logic_fire_boss_door_jump or Hover_Boots)) or ( True))",
					"Fire Lower Locked Door": " (Small_Key_Fire_Temple, 5) and (has_explosives or can_use(Hammer) or can_use(Hookshot))",
					"Fire Big Lava Room": " (logic_fewer_tunic_requirements or can_use(Goron_Tunic)) and can_use(Hammer)"
				}
			},
			"Fire Lower Locked Door": {
				"region_name": "Fire Lower Locked Door",
				"dungeon": "Fire Temple",
				"locations": {
					"Fire Temple MQ Megaton Hammer Chest": "is_adult",
					"Fire Temple MQ Map Chest": "can_use(Hammer)"
				}
			},
			"Fire Big Lava Room": {
				"region_name": "Fire Big Lava Room",
				"dungeon": "Fire Temple",
				"locations": {
					"Fire Temple MQ Boss Key Chest": " has_fire_source and (Bow or logic_fire_mq_bk_chest) and Progressive_Hookshot",
					"Fire Temple MQ Big Lava Room Bombable Chest": " has_fire_source and has_explosives and (Progressive_Hookshot or (logic_fire_mq_bombable_chest and (True or can_use(Nayrus_Love))))",
					"GS Fire Temple MQ Big Lava Room": "True",
					"Fairy Pot": " has_bottle and has_fire_source and (Bow or logic_fire_mq_bk_chest) and (Progressive_Hookshot or logic_fire_song_of_time)"
				},
				"exits": {
					"Fire Lower Maze": " can_use(Goron_Tunic) and (Small_Key_Fire_Temple, 2) and (has_fire_source or (logic_fire_mq_climb and Hover_Boots))"
				}
			},
			"Fire Lower Maze": {
				"region_name": "Fire Lower Maze",
				"dungeon": "Fire Temple",
				"locations": {
					"Fire Temple MQ Maze Lower Chest": "True",
					"Fire Temple MQ Maze Side Room": " has_explosives and (logic_fire_mq_maze_side_room or can_use(Hookshot))"
				},
				"exits": {
					"Fire Upper Maze": " (has_explosives or logic_rusted_switches) and can_use(Hookshot)"
				}
			},
			"Fire Upper Maze": {
				"region_name": "Fire Upper Maze",
				"dungeon": "Fire Temple",
				"locations": {
					"Fire Temple MQ Maze Upper Chest": "True",
					"Fire Temple MQ Compass Chest": "has_explosives",
					"GS Fire Temple MQ East Tower Top": " can_play(Song_of_Time) or can_use(Longshot)",
					"Wall Switch Fairy": " has_bottle and (can_play(Song_of_Time) or can_use(Longshot))"
				},
				"exits": {
					"Fire Temple Upper": "(Small_Key_Fire_Temple, 3) and Bow"
				}
			},
			"Fire Temple Upper": {
				"region_name": "Fire Temple Upper",
				"dungeon": "Fire Temple",
				"locations": {
					"Fire Temple MQ Freestanding Key": "True",
					"Fire Temple MQ West Tower Top Chest": "(Small_Key_Fire_Temple, 4)",
					"GS Fire Temple MQ Fire Wall Maze Side Room": " can_play(Song_of_Time) or Hover_Boots or logic_fire_mq_flame_maze",
					"GS Fire Temple MQ Fire Wall Maze Center": "has_explosives",
					"GS Fire Temple MQ Above Fire Wall Maze": "(Small_Key_Fire_Temple, 5)",
					"Fairy Pot": "has_bottle"
				}
			},
			"Fire Boss Room": {
				"region_name": "Fire Boss Room",
				"dungeon": "Fire Temple",
				"locations": {
					"Volvagia Heart": "True",
					"Volvagia": "True"
				}
			}
		}
	},
	"Forest Temple": {
		"vanilla": {
			"Forest Temple Lobby": {
				"region_name": "Forest Temple Lobby",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple First Chest": "True",
					"Forest Temple Chest Behind Lobby": "is_adult or Kokiri_Sword",
					"GS Forest Temple First Room": "can_use(Dins_Fire) or can_use_projectile",
					"GS Forest Temple Lobby": "can_use(Hookshot) or can_use(Boomerang)",
					"Fairy Pot": "has_bottle and (is_adult or can_child_attack or Nuts)"
				},
				"exits": {
					"Sacred Forest Meadow": "True",
					"Forest Temple NW Outdoors": "can_play(Song_of_Time) or is_child",
					"Forest Temple NE Outdoors": "can_use(Bow) or can_use(Slingshot)",
					"Forest Temple Block Push Room": "(Small_Key_Forest_Temple, 1)",
					"Forest Temple Boss Region": "'Forest Temple Jo and Beth' and 'Forest Temple Amy and Meg'"
				}
			},
			"Forest Temple NW Outdoors": {
				"region_name": "Forest Temple NW Outdoors",
				"dungeon": "Forest Temple",
				"locations": {
					"GS Forest Temple Outdoor West": " can_use(Longshot) or ( can_use(Hookshot))",
					"Deku Baba Sticks": "is_adult or Kokiri_Sword or Boomerang",
					"Deku Baba Nuts": " is_adult or Slingshot or Sticks or has_explosives or Kokiri_Sword or can_use(Dins_Fire)"
				},
				"exits": {
					"Forest Temple Outdoors High Balconies": " is_adult or (has_explosives or ((can_use(Boomerang) or Nuts or has(Deku_Shield)) and (Sticks or Kokiri_Sword or can_use(Slingshot))))"
				}
			},
			"Forest Temple NE Outdoors": {
				"region_name": "Forest Temple NE Outdoors",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple Outside Hookshot Chest": " can_use(Hookshot) or ( True) or (logic_forest_outdoors_ledge and can_use(Hover_Boots) and ( True))",
					"GS Forest Temple Outdoor East": " can_use(Hookshot) or (logic_forest_outdoor_east_gs and can_use(Boomerang)) or ( can_use(Bow) or can_use(Dins_Fire) or has_explosives)",
					"Deku Baba Sticks": "is_adult or Kokiri_Sword or Boomerang",
					"Deku Baba Nuts": " is_adult or Slingshot or Sticks or has_explosives or Kokiri_Sword or can_use(Dins_Fire)"
				},
				"exits": {
					"Forest Temple Outdoors High Balconies": " can_use(Longshot) or (logic_forest_vines and can_use(Hookshot))",
					"Forest Temple NW Outdoors": "can_use(Iron_Boots) or (Progressive_Scale, 2)",
					"Forest Temple Lobby": "True"
				}
			},
			"Forest Temple Outdoors High Balconies": {
				"region_name": "Forest Temple Outdoors High Balconies",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple Well Chest": "True",
					"Forest Temple Map Chest": "True"
				},
				"exits": {
					"Forest Temple NW Outdoors": "True",
					"Forest Temple NE Outdoors": "True",
					"Forest Temple Falling Room": " logic_forest_scarecrow and can_use(Hover_Boots) and can_use(Scarecrow)"
				}
			},
			"Forest Temple Falling Room": {
				"region_name": "Forest Temple Falling Room",
				"dungeon": "Forest Temple",
				"events": {
					"Forest Temple Amy and Meg": "can_use(Bow)"
				},
				"locations": {
					"Forest Temple Falling Room Chest": "True"
				},
				"exits": {
					"Forest Temple NE Outdoors": "True"
				}
			},
			"Forest Temple Block Push Room": {
				"region_name": "Forest Temple Block Push Room",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple Block Push Chest": " Progressive_Strength_Upgrade and (can_use(Bow) or can_use(Slingshot))"
				},
				"exits": {
					"Forest Temple Outside Upper Ledge": " can_use(Hover_Boots) or (logic_forest_outside_backdoor and is_adult and Progressive_Strength_Upgrade)",
					"Forest Temple Bow Region": " Progressive_Strength_Upgrade and (Small_Key_Forest_Temple, 3) and is_adult",
					"Forest Temple Straightened Hall": " Progressive_Strength_Upgrade and (Small_Key_Forest_Temple, 2) and can_use(Bow) and is_adult"
				}
			},
			"Forest Temple Straightened Hall": {
				"region_name": "Forest Temple Straightened Hall",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple Boss Key Chest": "True"
				},
				"exits": {
					"Forest Temple Outside Upper Ledge": "True"
				}
			},
			"Forest Temple Outside Upper Ledge": {
				"region_name": "Forest Temple Outside Upper Ledge",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple Floormaster Chest": "True"
				},
				"exits": {
					"Forest Temple NW Outdoors": "True"
				}
			},
			"Forest Temple Bow Region": {
				"region_name": "Forest Temple Bow Region",
				"dungeon": "Forest Temple",
				"events": {
					"Forest Temple Jo and Beth": "can_use(Bow)"
				},
				"locations": {
					"Forest Temple Bow Chest": "True",
					"Forest Temple Red Poe Chest": "can_use(Bow)",
					"Forest Temple Blue Poe Chest": "can_use(Bow)"
				},
				"exits": {
					"Forest Temple Falling Room": " (Small_Key_Forest_Temple, 5) and (Bow or can_use(Dins_Fire))"
				}
			},
			"Forest Temple Boss Region": {
				"region_name": "Forest Temple Boss Region",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple Near Boss Chest": "True",
					"Phantom Ganon Heart": "Boss_Key_Forest_Temple",
					"Phantom Ganon": "Boss_Key_Forest_Temple",
					"GS Forest Temple Basement": "can_use(Hookshot) or can_use(Boomerang)"
				}
			}
		},
		"mq": {
			"Forest Temple Lobby": {
				"region_name": "Forest Temple Lobby",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple MQ First Chest": " is_adult or Bombs or can_use(Sticks) or Nuts or can_use(Boomerang) or can_use(Dins_Fire) or Kokiri_Sword or can_use(Slingshot)",
					"GS Forest Temple MQ First Hallway": "can_use(Hookshot) or can_use(Boomerang)"
				},
				"exits": {
					"Sacred Forest Meadow": "True",
					"Forest Temple Central Area": " (Small_Key_Forest_Temple, 1) and (is_adult or can_child_attack or Nuts)"
				}
			},
			"Forest Temple Central Area": {
				"region_name": "Forest Temple Central Area",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple MQ Chest Behind Lobby": " (can_play(Song_of_Time) or is_child) and (is_adult or can_use(Dins_Fire) or can_use(Sticks) or can_use(Slingshot) or Kokiri_Sword)",
					"GS Forest Temple MQ Block Push Room": "is_adult or Kokiri_Sword",
					"Fairy Pot": "has_bottle and (can_play(Song_of_Time) or is_child)"
				},
				"exits": {
					"Forest Temple NW Outdoors": "can_use(Bow) or can_use(Slingshot)",
					"Forest Temple NE Outdoors": "can_use(Bow) or can_use(Slingshot)",
					"Forest Temple After Block Puzzle": " (is_adult and Progressive_Strength_Upgrade) or (has_bombchus and logic_forest_mq_block_puzzle and can_use(Hookshot))",
					"Forest Temple Outdoor Ledge": " can_use(Hover_Boots) or (can_use(Hookshot) and (Progressive_Strength_Upgrade or logic_forest_mq_hallway_switch or (has_bombchus and logic_forest_mq_block_puzzle)))",
					"Forest Temple Boss Region": "'Forest Temple Jo and Beth' and 'Forest Temple Amy and Meg'"
				}
			},
			"Forest Temple After Block Puzzle": {
				"region_name": "Forest Temple After Block Puzzle",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple MQ Boss Key Chest": "(Small_Key_Forest_Temple, 3)"
				},
				"exits": {
					"Forest Temple Bow Region": "(Small_Key_Forest_Temple, 4)",
					"Forest Temple Outdoor Ledge": "(Small_Key_Forest_Temple, 3)"
				}
			},
			"Forest Temple Outdoor Ledge": {
				"region_name": "Forest Temple Outdoor Ledge",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple MQ Redead Chest": "True"
				},
				"exits": {
					"Forest Temple NW Outdoors": "True"
				}
			},
			"Forest Temple NW Outdoors": {
				"region_name": "Forest Temple NW Outdoors",
				"dungeon": "Forest Temple",
				"locations": {
					"GS Forest Temple MQ Outdoor West": "True"
				},
				"exits": {
					"Forest Temple NE Outdoors": " can_use(Iron_Boots) or can_use(Longshot) or (Progressive_Scale, 2) or (logic_forest_well_swim and can_use(Hookshot))",
					"Forest Temple Outdoors Top Ledges": "can_use(Fire_Arrows)"
				}
			},
			"Forest Temple NE Outdoors": {
				"region_name": "Forest Temple NE Outdoors",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple MQ Well Chest": "can_use(Bow) or can_use(Slingshot)",
					"GS Forest Temple MQ Outdoor East": "can_use(Hookshot) or can_use(Boomerang)",
					"GS Forest Temple MQ Well": " (can_use(Iron_Boots) and can_use(Hookshot)) or can_use(Bow) or can_use(Slingshot)",
					"Deku Baba Sticks": "is_adult or Kokiri_Sword or Boomerang",
					"Deku Baba Nuts": " is_adult or Slingshot or Sticks or has_explosives or Kokiri_Sword or can_use(Dins_Fire)"
				},
				"exits": {
					"Forest Temple Outdoors Top Ledges": " can_use(Hookshot) and (can_use(Longshot) or can_use(Hover_Boots) or can_play(Song_of_Time) or logic_forest_vines)",
					"Forest Temple NE Outdoors Ledge": "can_use(Longshot)"
				}
			},
			"Forest Temple Outdoors Top Ledges": {
				"region_name": "Forest Temple Outdoors Top Ledges",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple MQ NE Outdoors Upper Chest": "True"
				},
				"exits": {
					"Forest Temple NE Outdoors": "True",
					"Forest Temple NE Outdoors Ledge": "logic_forest_outdoors_ledge and can_use(Hover_Boots)"
				}
			},
			"Forest Temple NE Outdoors Ledge": {
				"region_name": "Forest Temple NE Outdoors Ledge",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple MQ NE Outdoors Lower Chest": "True"
				},
				"exits": {
					"Forest Temple NE Outdoors": "True",
					"Forest Temple Falling Room": "can_play(Song_of_Time)"
				}
			},
			"Forest Temple Bow Region": {
				"region_name": "Forest Temple Bow Region",
				"dungeon": "Forest Temple",
				"events": {
					"Forest Temple Jo and Beth": "can_use(Bow)"
				},
				"locations": {
					"Forest Temple MQ Bow Chest": "True",
					"Forest Temple MQ Map Chest": "can_use(Bow)",
					"Forest Temple MQ Compass Chest": "can_use(Bow)"
				},
				"exits": {
					"Forest Temple Falling Room": " (Small_Key_Forest_Temple, 5) and (can_use(Bow) or can_use(Dins_Fire))"
				}
			},
			"Forest Temple Falling Room": {
				"region_name": "Forest Temple Falling Room",
				"dungeon": "Forest Temple",
				"events": {
					"Forest Temple Amy and Meg": "can_use(Bow) and (Small_Key_Forest_Temple, 6)"
				},
				"locations": {
					"Forest Temple MQ Falling Room Chest": "True"
				},
				"exits": {
					"Forest Temple NE Outdoors Ledge": "True"
				}
			},
			"Forest Temple Boss Region": {
				"region_name": "Forest Temple Boss Region",
				"dungeon": "Forest Temple",
				"locations": {
					"Forest Temple MQ Near Boss Chest": "True",
					"Phantom Ganon Heart": "Boss_Key_Forest_Temple",
					"Phantom Ganon": "Boss_Key_Forest_Temple"
				}
			}
		}
	},
	"Gerudo Training Grounds": {
		"vanilla": {
			"Gerudo Training Grounds Lobby": {
				"region_name": "Gerudo Training Grounds Lobby",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds Lobby Left Chest": "can_use(Bow) or can_use(Slingshot)",
					"Gerudo Training Grounds Lobby Right Chest": "can_use(Bow) or can_use(Slingshot)",
					"Gerudo Training Grounds Stalfos Chest": "is_adult or Kokiri_Sword",
					"Gerudo Training Grounds Beamos Chest": "has_explosives and (is_adult or Kokiri_Sword)"
				},
				"exits": {
					"Gerudo Fortress": "True",
					"Gerudo Training Grounds Heavy Block Room": " (is_adult or Kokiri_Sword) and (can_use(Hookshot) or logic_gtg_without_hookshot)",
					"Gerudo Training Grounds Lava Room": " (has_explosives and (is_adult or Kokiri_Sword))",
					"Gerudo Training Grounds Central Maze": "True"
				}
			},
			"Gerudo Training Grounds Heavy Block Room": {
				"region_name": "Gerudo Training Grounds Heavy Block Room",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds Before Heavy Block Chest": "True"
				},
				"exits": {
					"Gerudo Training Grounds Eye Statue Upper": " can_see_with_lens and (can_use(Hookshot) or (logic_gtg_fake_wall and can_use(Hover_Boots)))",
					"Gerudo Training Grounds Like Like Room": " can_use(Silver_Gauntlets) and can_see_with_lens and (can_use(Hookshot) or (logic_gtg_fake_wall and can_use(Hover_Boots)))"
				}
			},
			"Gerudo Training Grounds Like Like Room": {
				"region_name": "Gerudo Training Grounds Like Like Room",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds Heavy Block First Chest": "True",
					"Gerudo Training Grounds Heavy Block Second Chest": "True",
					"Gerudo Training Grounds Heavy Block Third Chest": "True",
					"Gerudo Training Grounds Heavy Block Fourth Chest": "True"
				}
			},
			"Gerudo Training Grounds Eye Statue Lower": {
				"region_name": "Gerudo Training Grounds Eye Statue Lower",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds Eye Statue Chest": "can_use(Bow)"
				},
				"exits": {
					"Gerudo Training Grounds Hammer Room": "True"
				}
			},
			"Gerudo Training Grounds Eye Statue Upper": {
				"region_name": "Gerudo Training Grounds Eye Statue Upper",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds Near Scarecrow Chest": "can_use(Bow)"
				},
				"exits": {
					"Gerudo Training Grounds Eye Statue Lower": "True"
				}
			},
			"Gerudo Training Grounds Hammer Room": {
				"region_name": "Gerudo Training Grounds Hammer Room",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds Hammer Room Clear Chest": "True",
					"Gerudo Training Grounds Hammer Room Switch Chest": "True"
				},
				"exits": {
					"Gerudo Training Grounds Eye Statue Lower": "can_use(Hammer) and Bow",
					"Gerudo Training Grounds Lava Room": "True"
				}
			},
			"Gerudo Training Grounds Lava Room": {
				"region_name": "Gerudo Training Grounds Lava Room",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds Underwater Silver Rupee Chest": " can_use(Hookshot) and can_play(Song_of_Time) and Iron_Boots and (logic_fewer_tunic_requirements or can_use(Zora_Tunic))"
				},
				"exits": {
					"Gerudo Training Grounds Central Maze Right": "can_play(Song_of_Time) or is_child",
					"Gerudo Training Grounds Hammer Room": " can_use(Longshot) or (can_use(Hookshot) and can_use(Hover_Boots))"
				}
			},
			"Gerudo Training Grounds Central Maze": {
				"region_name": "Gerudo Training Grounds Central Maze",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds Hidden Ceiling Chest": "(Small_Key_Gerudo_Training_Grounds, 3) and can_see_with_lens",
					"Gerudo Training Grounds Maze Path First Chest": "(Small_Key_Gerudo_Training_Grounds, 4)",
					"Gerudo Training Grounds Maze Path Second Chest": "(Small_Key_Gerudo_Training_Grounds, 6)",
					"Gerudo Training Grounds Maze Path Third Chest": "(Small_Key_Gerudo_Training_Grounds, 7)",
					"Gerudo Training Grounds Maze Path Final Chest": "(Small_Key_Gerudo_Training_Grounds, 9)"
				},
				"exits": {
					"Gerudo Training Grounds Central Maze Right": "(Small_Key_Gerudo_Training_Grounds, 9)"
				}
			},
			"Gerudo Training Grounds Central Maze Right": {
				"region_name": "Gerudo Training Grounds Central Maze Right",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds Maze Right Central Chest": "True",
					"Gerudo Training Grounds Maze Right Side Chest": "True",
					"Gerudo Training Grounds Freestanding Key": "True"
				},
				"exits": {
					"Gerudo Training Grounds Hammer Room": "can_use(Hookshot)",
					"Gerudo Training Grounds Lava Room": "True"
				}
			},
		},
		"mq": {
			"Gerudo Training Grounds Lobby": {
				"region_name": "Gerudo Training Grounds Lobby",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds MQ Lobby Left Chest": "True",
					"Gerudo Training Grounds MQ Lobby Right Chest": "True",
					"Gerudo Training Grounds MQ Hidden Ceiling Chest": "can_see_with_lens",
					"Gerudo Training Grounds MQ Maze Path First Chest": "True",
					"Gerudo Training Grounds MQ Maze Path Second Chest": "True",
					"Gerudo Training Grounds MQ Maze Path Third Chest": "(Small_Key_Gerudo_Training_Grounds, 1)"
				},
				"exits": {
					"Gerudo Fortress": "True",
					"Gerudo Training Grounds Left Side": "(has_fire_source)",
					"Gerudo Training Grounds Right Side": "(can_use(Bow) or can_use(Slingshot))"
				}
			},
			"Gerudo Training Grounds Right Side": {
				"region_name": "Gerudo Training Grounds Right Side",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds MQ Dinolfos Chest": "is_adult"
				},
				"exits": {
					"Gerudo Training Grounds Underwater": " (Bow or can_use(Longshot)) and can_use(Hover_Boots)"
				}
			},
			"Gerudo Training Grounds Underwater": {
				"region_name": "Gerudo Training Grounds Underwater",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds MQ Underwater Silver Rupee Chest": " has_fire_source and can_use(Iron_Boots) and (logic_fewer_tunic_requirements or can_use(Zora_Tunic)) and (True or Fairy or can_use(Nayrus_Love))"
				}
			},
			"Gerudo Training Grounds Left Side": {
				"region_name": "Gerudo Training Grounds Left Side",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds MQ First Iron Knuckle Chest": "is_adult or Kokiri_Sword or has_explosives"
				},
				"exits": {
					"Gerudo Training Grounds Stalfos Room": " can_use(Longshot) or logic_gtg_mq_without_hookshot or (logic_gtg_mq_with_hookshot and can_use(Hookshot))"
				}
			},
			"Gerudo Training Grounds Stalfos Room": {
				"region_name": "Gerudo Training Grounds Stalfos Room",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds MQ Before Heavy Block Chest": "is_adult",
					"Gerudo Training Grounds MQ Heavy Block Chest": "can_use(Silver_Gauntlets)",
					"Blue Fire": "has_bottle"
				},
				"exits": {
					"Gerudo Training Grounds Back Areas": " is_adult and can_see_with_lens and Blue_Fire and (can_play(Song_of_Time) or (logic_gtg_fake_wall and can_use(Hover_Boots)))"
				}
			},
			"Gerudo Training Grounds Back Areas": {
				"region_name": "Gerudo Training Grounds Back Areas",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds MQ Eye Statue Chest": "Bow",
					"Gerudo Training Grounds MQ Second Iron Knuckle Chest": "True",
					"Gerudo Training Grounds MQ Flame Circle Chest": "can_use(Hookshot) or Bow or has_explosives"
				},
				"exits": {
					"Gerudo Training Grounds Central Maze Right": "Hammer",
					"Gerudo Training Grounds Right Side": "can_use(Longshot)"
				}
			},
			"Gerudo Training Grounds Central Maze Right": {
				"region_name": "Gerudo Training Grounds Central Maze Right",
				"dungeon": "Gerudo Training Grounds",
				"locations": {
					"Gerudo Training Grounds MQ Maze Right Central Chest": "True",
					"Gerudo Training Grounds MQ Maze Right Side Chest": "True",
					"Gerudo Training Grounds MQ Ice Arrows Chest": " (Small_Key_Gerudo_Training_Grounds, 3)"
				},
				"exits": {
					"Gerudo Training Grounds Underwater": " can_use(Longshot) or (can_use(Hookshot) and Bow)",
					"Gerudo Training Grounds Right Side": "can_use(Hookshot)"
				}
			}
		}
	},
	"Ice Cavern": {
		"vanilla": {
			"Ice Cavern Beginning": {
				"region_name": "Ice Cavern Beginning",
				"dungeon": "Ice Cavern",
				"exits": {
					"Zoras Fountain": "True",
					"Ice Cavern": "(is_adult or has_explosives or can_use(Dins_Fire))"
				}
			},
			"Ice Cavern": {
				"region_name": "Ice Cavern",
				"dungeon": "Ice Cavern",
				"locations": {
					"Ice Cavern Map Chest": "Blue_Fire and is_adult",
					"Ice Cavern Compass Chest": "Blue_Fire",
					"Ice Cavern Iron Boots Chest": " Blue_Fire and (is_adult or Slingshot or Sticks or Kokiri_Sword or can_use(Dins_Fire))",
					"Sheik in Ice Cavern": " Blue_Fire and (is_adult or Slingshot or Sticks or Kokiri_Sword or can_use(Dins_Fire))",
					"Ice Cavern Freestanding PoH": "Blue_Fire",
					"GS Ice Cavern Spinning Scythe Room": "can_use(Hookshot) or can_use(Boomerang)",
					"GS Ice Cavern Heart Piece Room": " Blue_Fire and (can_use(Hookshot) or can_use(Boomerang))",
					"GS Ice Cavern Push Block Room": " Blue_Fire and (can_use(Hookshot) or can_use(Boomerang))",
					"Blue Fire": "is_adult and has_bottle"
				}
			}
		},
		"mq": {
			"Ice Cavern Beginning": {
				"region_name": "Ice Cavern Beginning",
				"dungeon": "Ice Cavern",
				"locations": {
					"Fairy Pot": "has_bottle"
				},
				"exits": {
					"Zoras Fountain": "True",
					"Ice Cavern Map Room": " is_adult or can_use(Dins_Fire) or (has_explosives and (can_use(Sticks) or can_use(Slingshot) or Kokiri_Sword))",
					"Ice Cavern Compass Room": "is_adult and Blue_Fire",
					"Ice Cavern Iron Boots Region": "Blue_Fire"
				}
			},
			"Ice Cavern Map Room": {
				"region_name": "Ice Cavern Map Room",
				"dungeon": "Ice Cavern",
				"locations": {
					"Ice Cavern MQ Map Chest": " Blue_Fire and (is_adult or can_use(Sticks) or Kokiri_Sword or can_use_projectile)",
					"Blue Fire": "is_adult and has_bottle"
				}
			},
			"Ice Cavern Iron Boots Region": {
				"region_name": "Ice Cavern Iron Boots Region",
				"dungeon": "Ice Cavern",
				"locations": {
					"Ice Cavern MQ Iron Boots Chest": "is_adult",
					"Sheik in Ice Cavern": "is_adult",
					"GS Ice Cavern MQ Ice Block": "is_adult or can_child_attack",
					"GS Ice Cavern MQ Scarecrow": " can_use(Scarecrow) or (Hover_Boots and can_use(Longshot)) or (logic_ice_mq_scarecrow and is_adult)"
				}
			},
			"Ice Cavern Compass Room": {
				"region_name": "Ice Cavern Compass Room",
				"dungeon": "Ice Cavern",
				"locations": {
					"Ice Cavern MQ Compass Chest": "True",
					"Ice Cavern MQ Freestanding PoH": "has_explosives",
					"GS Ice Cavern MQ Red Ice": "can_play(Song_of_Time)"
				}
			}
		}
	},
	"Jabu Jabus Belly": {
		"vanilla": {
			"Jabu Jabus Belly Beginning": {
				"region_name": "Jabu Jabus Belly Beginning",
				"dungeon": "Jabu Jabus Belly",
				"exits": {
					"Zoras Fountain": "True",
					"Jabu Jabus Belly Main": "can_use_projectile"
				}
			},
			"Jabu Jabus Belly Main": {
				"region_name": "Jabu Jabus Belly Main",
				"dungeon": "Jabu Jabus Belly",
				"locations": {
					"Boomerang Chest": "True",
					"GS Jabu Jabu Water Switch Room": "True",
					"GS Jabu Jabu Lobby Basement Lower": "can_use(Boomerang) or can_use(Hookshot)",
					"GS Jabu Jabu Lobby Basement Upper": "can_use(Boomerang) or can_use(Hookshot)",
					"Jabu Deku Scrub Deku Nuts": " can_dive or is_child or logic_jabu_scrub_jump_dive or can_use(Iron_Boots)",
					"Fairy Pot": "has_bottle"
				},
				"exits": {
					"Jabu Jabus Belly Beginning": "True",
					"Jabu Jabus Belly Depths": "can_use(Boomerang)",
					"Jabu Jabus Belly Boss Area": "logic_jabu_boss_gs_adult and can_use(Hover_Boots)"
				}
			},
			"Jabu Jabus Belly Depths": {
				"region_name": "Jabu Jabus Belly Depths",
				"dungeon": "Jabu Jabus Belly",
				"locations": {
					"Jabu Jabus Belly Map Chest": "True",
					"Jabu Jabus Belly Compass Chest": "True"
				},
				"exits": {
					"Jabu Jabus Belly Main": "True",
					"Jabu Jabus Belly Boss Area": "Sticks or Kokiri_Sword"
				}
			},
			"Jabu Jabus Belly Boss Area": {
				"region_name": "Jabu Jabus Belly Boss Area",
				"dungeon": "Jabu Jabus Belly",
				"locations": {
					"Barinade Heart": "can_use(Boomerang)",
					"Barinade": "can_use(Boomerang)",
					"GS Jabu Jabu Near Boss": "True",
					"Nut Pot": "True"
				},
				"exits": {
					"Jabu Jabus Belly Main": "True"
				}
			}
		},
		"mq": {
			"Jabu Jabus Belly Beginning": {
				"region_name": "Jabu Jabus Belly Beginning",
				"dungeon": "Jabu Jabus Belly",
				"locations": {
					"Nut Pot": "True",
					"Jabu Jabus Belly MQ Map Chest": "can_blast_or_smash",
					"Jabu Jabus Belly MQ Entry Side Chest": "can_use(Slingshot)"
				},
				"exits": {
					"Zoras Fountain": "True",
					"Jabu Jabus Belly Main": "(is_child and can_use(Slingshot))"
				}
			},
			"Jabu Jabus Belly Main": {
				"region_name": "Jabu Jabus Belly Main",
				"dungeon": "Jabu Jabus Belly",
				"locations": {
					"Jabu Jabus Belly MQ Second Room Lower Chest": "True",
					"Jabu Jabus Belly MQ Second Room Upper Chest": " can_use(Hover_Boots) or can_use(Hookshot) or ( is_child)",
					"Jabu Jabus Belly MQ Compass Chest": "True",
					"Jabu Jabus Belly MQ Basement South Chest": "True",
					"Jabu Jabus Belly MQ Basement North Chest": "True",
					"Jabu Jabus Belly MQ Boomerang Room Small Chest": "True",
					"MQ Boomerang Chest": "True",
					"GS Jabu Jabu MQ Boomerang Room": " can_play(Song_of_Time) or (logic_jabu_mq_sot_gs and can_use(Boomerang))"
				},
				"exits": {
					"Jabu Jabus Belly Beginning": "True",
					"Jabu Jabus Belly Depths": "has_explosives and can_use(Boomerang)"
				}
			},
			"Jabu Jabus Belly Depths": {
				"region_name": "Jabu Jabus Belly Depths",
				"dungeon": "Jabu Jabus Belly",
				"locations": {
					"Jabu Jabus Belly MQ Falling Like Like Room Chest": "True",
					"GS Jabu Jabu MQ Tailpasaran Room": "Sticks or can_use(Dins_Fire)",
					"GS Jabu Jabu MQ Invisible Enemies Room": " can_see_with_lens or ( can_use(Hover_Boots))"
				},
				"exits": {
					"Jabu Jabus Belly Main": "True",
					"Jabu Jabus Belly Boss Area": "Sticks or (can_use(Dins_Fire) and Kokiri_Sword)"
				}
			},
			"Jabu Jabus Belly Boss Area": {
				"region_name": "Jabu Jabus Belly Boss Area",
				"dungeon": "Jabu Jabus Belly",
				"locations": {
					"Jabu Jabus Belly MQ Cow": "can_play(Eponas_Song)",
					"Jabu Jabus Belly MQ Near Boss Chest": "True",
					"Barinade Heart": "True",
					"Barinade": "True",
					"GS Jabu Jabu MQ Near Boss": "True",
					"Fairy Pot": "has_bottle"
				},
				"exits": {
					"Jabu Jabus Belly Main": "True"
				}
			}
		}
	},
	"Shadow Temple": {
		"vanilla": {
			"Shadow Temple Entryway": {
				"region_name": "Shadow Temple Entryway",
				"dungeon": "Shadow Temple",
				"exits": {
					"Shadow Temple Warp Region": "True",
					"Shadow Temple Beginning": " can_see_with_lens and (can_use(Hover_Boots) or can_use(Hookshot))"
				}
			},
			"Shadow Temple Beginning": {
				"region_name": "Shadow Temple Beginning",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple Map Chest": "True",
					"Shadow Temple Hover Boots Chest": "True",
					"Nut Pot": "True"
				},
				"exits": {
					"Shadow Temple Entryway": "True",
					"Shadow Temple First Beamos": "Hover_Boots"
				}
			},
			"Shadow Temple First Beamos": {
				"region_name": "Shadow Temple First Beamos",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple Compass Chest": "True",
					"Shadow Temple Early Silver Rupee Chest": "True"
				},
				"exits": {
					"Shadow Temple Huge Pit": "has_explosives and (Small_Key_Shadow_Temple, 1)"
				}
			},
			"Shadow Temple Huge Pit": {
				"region_name": "Shadow Temple Huge Pit",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple Invisible Blades Visible Chest": "True",
					"Shadow Temple Invisible Blades Invisible Chest": "True",
					"Shadow Temple Falling Spikes Lower Chest": "True",
					"Shadow Temple Falling Spikes Upper Chest": "logic_shadow_umbrella or Progressive_Strength_Upgrade",
					"Shadow Temple Falling Spikes Switch Chest": "logic_shadow_umbrella or Progressive_Strength_Upgrade",
					"Shadow Temple Invisible Spikes Chest": "(Small_Key_Shadow_Temple, 2)",
					"Shadow Temple Freestanding Key": " (Small_Key_Shadow_Temple, 2) and Progressive_Hookshot and (Bombs or Progressive_Strength_Upgrade or (logic_shadow_freestanding_key and has_bombchus))",
					"GS Shadow Temple Like Like Room": "True",
					"GS Shadow Temple Crusher Room": "Progressive_Hookshot",
					"GS Shadow Temple Single Giant Pot": "(Small_Key_Shadow_Temple, 2) and Progressive_Hookshot"
				},
				"exits": {
					"Shadow Temple Wind Tunnel": "Progressive_Hookshot and (Small_Key_Shadow_Temple, 3)"
				}
			},
			"Shadow Temple Wind Tunnel": {
				"region_name": "Shadow Temple Wind Tunnel",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple Wind Hint Chest": "True",
					"Shadow Temple After Wind Enemy Chest": "True",
					"Shadow Temple After Wind Hidden Chest": "True",
					"GS Shadow Temple Near Ship": "can_use(Longshot) and (Small_Key_Shadow_Temple, 4)"
				},
				"exits": {
					"Shadow Temple Beyond Boat": "can_play(Zeldas_Lullaby) and (Small_Key_Shadow_Temple, 4)"
				}
			},
			"Shadow Temple Beyond Boat": {
				"region_name": "Shadow Temple Beyond Boat",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple Spike Walls Left Chest": "can_use(Dins_Fire)",
					"Shadow Temple Boss Key Chest": "can_use(Dins_Fire)",
					"Shadow Temple Hidden Floormaster Chest": "True",
					"Bongo Bongo Heart": " (Small_Key_Shadow_Temple, 5) and Boss_Key_Shadow_Temple and (Bow or can_use(Distant_Scarecrow) or (logic_shadow_statue and has_bombchus))",
					"Bongo Bongo": " (Small_Key_Shadow_Temple, 5) and Boss_Key_Shadow_Temple and (Bow or can_use(Distant_Scarecrow) or (logic_shadow_statue and has_bombchus))",
					"GS Shadow Temple Triple Giant Pot": "True"
				}
			}
		},
		"mq": {
			"Shadow Temple Entryway": {
				"region_name": "Shadow Temple Entryway",
				"dungeon": "Shadow Temple",
				"exits": {
					"Shadow Temple Warp Region": "True",
					"Shadow Temple Beginning": " can_see_with_lens and (can_use(Hover_Boots) or can_use(Hookshot))"
				}
			},
			"Shadow Temple Beginning": {
				"region_name": "Shadow Temple Beginning",
				"dungeon": "Shadow Temple",
				"exits": {
					"Shadow Temple Entryway": "True",
					"Shadow Temple First Beamos": " can_use(Fire_Arrows) or Hover_Boots or (logic_shadow_mq_gap and can_use(Longshot))",
					"Shadow Temple Dead Hand Area": "has_explosives and (Small_Key_Shadow_Temple, 6)"
				}
			},
			"Shadow Temple Dead Hand Area": {
				"region_name": "Shadow Temple Dead Hand Area",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple MQ Compass Chest": "True",
					"Shadow Temple MQ Hover Boots Chest": "can_play(Song_of_Time) and Bow"
				}
			},
			"Shadow Temple First Beamos": {
				"region_name": "Shadow Temple First Beamos",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple MQ Map Chest": "True",
					"Shadow Temple MQ Early Gibdos Chest": "True",
					"Shadow Temple MQ Near Ship Invisible Chest": "True"
				},
				"exits": {
					"Shadow Temple Upper Huge Pit": "has_explosives and (Small_Key_Shadow_Temple, 2)"
				}
			},
			"Shadow Temple Upper Huge Pit": {
				"region_name": "Shadow Temple Upper Huge Pit",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple MQ Invisible Blades Visible Chest": "can_play(Song_of_Time)",
					"Shadow Temple MQ Invisible Blades Invisible Chest": "can_play(Song_of_Time)"
				},
				"exits": {
					"Shadow Temple Lower Huge Pit": "has_fire_source or logic_shadow_mq_huge_pit"
				}
			},
			"Shadow Temple Lower Huge Pit": {
				"region_name": "Shadow Temple Lower Huge Pit",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple MQ Beamos Silver Rupees Chest": "can_use(Longshot)",
					"Shadow Temple MQ Falling Spikes Lower Chest": "True",
					"Shadow Temple MQ Falling Spikes Upper Chest": " (logic_shadow_umbrella and Hover_Boots) or Progressive_Strength_Upgrade",
					"Shadow Temple MQ Falling Spikes Switch Chest": " (logic_shadow_umbrella and Hover_Boots) or Progressive_Strength_Upgrade",
					"Shadow Temple MQ Invisible Spikes Chest": "Hover_Boots and (Small_Key_Shadow_Temple, 3)",
					"Shadow Temple MQ Stalfos Room Chest": " Hover_Boots and (Small_Key_Shadow_Temple, 3) and Progressive_Hookshot",
					"GS Shadow Temple MQ Crusher Room": "Progressive_Hookshot"
				},
				"exits": {
					"Shadow Temple Wind Tunnel": " Hover_Boots and Progressive_Hookshot and (Small_Key_Shadow_Temple, 4)"
				}
			},
			"Shadow Temple Wind Tunnel": {
				"region_name": "Shadow Temple Wind Tunnel",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple MQ Wind Hint Chest": "True",
					"Shadow Temple MQ After Wind Enemy Chest": "True",
					"Shadow Temple MQ After Wind Hidden Chest": "True",
					"GS Shadow Temple MQ Wind Hint Room": "True",
					"GS Shadow Temple MQ After Wind": "True",
					"Nut Pot": "True"
				},
				"exits": {
					"Shadow Temple Beyond Boat": " can_play(Zeldas_Lullaby) and (Small_Key_Shadow_Temple, 5)"
				}
			},
			"Shadow Temple Beyond Boat": {
				"region_name": "Shadow Temple Beyond Boat",
				"dungeon": "Shadow Temple",
				"locations": {
					"Bongo Bongo Heart": " (Bow or (logic_shadow_statue and has_bombchus)) and Boss_Key_Shadow_Temple",
					"Bongo Bongo": " (Bow or (logic_shadow_statue and has_bombchus)) and Boss_Key_Shadow_Temple",
					"GS Shadow Temple MQ After Ship": "True",
					"GS Shadow Temple MQ Near Boss": "Bow or (logic_shadow_statue and has_bombchus)"
				},
				"exits": {
					"Shadow Temple Invisible Maze": " Bow and can_play(Song_of_Time) and can_use(Longshot)"
				}
			},
			"Shadow Temple Invisible Maze": {
				"region_name": "Shadow Temple Invisible Maze",
				"dungeon": "Shadow Temple",
				"locations": {
					"Shadow Temple MQ Spike Walls Left Chest": " can_use(Dins_Fire) and (Small_Key_Shadow_Temple, 6)",
					"Shadow Temple MQ Boss Key Chest": " can_use(Dins_Fire) and (Small_Key_Shadow_Temple, 6)",
					"Shadow Temple MQ Bomb Flower Chest": "True",
					"Shadow Temple MQ Freestanding Key": "True"
				}
			}
		}
	},
	"Spirit Temple": {
		"vanilla": {
			"Spirit Temple Lobby": {
				"region_name": "Spirit Temple Lobby",
				"dungeon": "Spirit Temple",
				"exits": {
					"Desert Colossus": "True",
					"Child Spirit Temple": "is_child",
					"Early Adult Spirit Temple": "can_use(Silver_Gauntlets)"
				}
			},
			"Child Spirit Temple": {
				"region_name": "Child Spirit Temple",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple Child Left Chest": " (Boomerang or Slingshot or (has_bombchus and logic_spirit_child_bombchu)) and (Sticks or has_explosives or ((Nuts or Boomerang) and (Kokiri_Sword or Slingshot)))",
					"Spirit Temple Child Right Chest": " (Boomerang or Slingshot or (has_bombchus and logic_spirit_child_bombchu)) and (Sticks or has_explosives or ((Nuts or Boomerang) and (Kokiri_Sword or Slingshot))) and (Sticks or can_use(Dins_Fire))",
					"GS Spirit Temple Metal Fence": " (Boomerang or Slingshot or (has_bombchus and logic_spirit_child_bombchu)) and (Sticks or has_explosives or ((Nuts or Boomerang) and (Kokiri_Sword or Slingshot)))",
					"Nut Crate": "True"
				},
				"exits": {
					"Child Spirit Temple Climb": "(Small_Key_Spirit_Temple, 1)"
				}
			},
			"Child Spirit Temple Climb": {
				"region_name": "Child Spirit Temple Climb",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple Child Climb East Chest": " has_projectile(both) or (((Small_Key_Spirit_Temple, 3) or ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not shuffle_dungeon_entrances)) and can_use(Silver_Gauntlets) and has_projectile(adult)) or ((Small_Key_Spirit_Temple, 5) and is_child and has_projectile(child))",
					"Spirit Temple Child Climb North Chest": " has_projectile(both) or (((Small_Key_Spirit_Temple, 3) or ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not shuffle_dungeon_entrances)) and can_use(Silver_Gauntlets) and has_projectile(adult)) or ((Small_Key_Spirit_Temple, 5) and is_child and has_projectile(child))",
					"GS Spirit Temple Bomb for Light Room": " has_projectile(both) or can_use(Dins_Fire) or ((True or Fairy or can_use(Nayrus_Love)) and (Sticks or Kokiri_Sword or has_projectile(child))) or (is_child and (Small_Key_Spirit_Temple, 5) and has_projectile(child)) or (((Small_Key_Spirit_Temple, 3) or ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not shuffle_dungeon_entrances)) and can_use(Silver_Gauntlets) and (has_projectile(adult) or True or Fairy or can_use(Nayrus_Love)))"
				},
				"exits": {
					"Spirit Temple Central Chamber": "has_explosives"
				}
			},
			"Early Adult Spirit Temple": {
				"region_name": "Early Adult Spirit Temple",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple Compass Chest": " can_use(Hookshot) and can_play(Zeldas_Lullaby)",
					"Spirit Temple Early Adult Right Chest": " Bow or Progressive_Hookshot or has_bombchus or (Bombs and logic_spirit_lower_adult_switch)",
					"Spirit Temple First Mirror Right Chest": "(Small_Key_Spirit_Temple, 3)",
					"Spirit Temple First Mirror Left Chest": "(Small_Key_Spirit_Temple, 3)",
					"GS Spirit Temple Boulder Room": " can_play(Song_of_Time) and (Bow or Progressive_Hookshot or has_bombchus or (Bombs and logic_spirit_lower_adult_switch))"
				},
				"exits": {
					"Spirit Temple Central Chamber": "(Small_Key_Spirit_Temple, 1)"
				}
			},
			"Spirit Temple Central Chamber": {
				"region_name": "Spirit Temple Central Chamber",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple Map Chest": " ((has_explosives or (Small_Key_Spirit_Temple, 3) or ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not shuffle_dungeon_entrances)) and (can_use(Dins_Fire) or (((Magic_Meter and Fire_Arrows) or logic_spirit_map_chest) and Bow and Sticks))) or ((Small_Key_Spirit_Temple, 5) and has_explosives and can_use(Sticks)) or ((Small_Key_Spirit_Temple, 3) and (can_use(Fire_Arrows) or (logic_spirit_map_chest and Bow)) and can_use(Silver_Gauntlets))",
					"Spirit Temple Sun Block Room Chest": " ((has_explosives or (Small_Key_Spirit_Temple, 3) or ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not shuffle_dungeon_entrances)) and (can_use(Dins_Fire) or (((Magic_Meter and Fire_Arrows) or logic_spirit_sun_chest) and Bow and Sticks))) or ((Small_Key_Spirit_Temple, 5) and has_explosives and can_use(Sticks)) or ((Small_Key_Spirit_Temple, 3) and (can_use(Fire_Arrows) or (logic_spirit_sun_chest and Bow)) and can_use(Silver_Gauntlets))",
					"Spirit Temple Statue Hand Chest": " (Small_Key_Spirit_Temple, 3) and can_use(Silver_Gauntlets) and can_play(Zeldas_Lullaby)",
					"Spirit Temple NE Main Room Chest": " (Small_Key_Spirit_Temple, 3) and can_use(Silver_Gauntlets) and can_play(Zeldas_Lullaby) and (Progressive_Hookshot or Hover_Boots)",
					"GS Spirit Temple Hall to West Iron Knuckle": " (has_explosives and Boomerang and Progressive_Hookshot) or (can_use(Boomerang) and (Small_Key_Spirit_Temple, 5) and has_explosives) or (Progressive_Hookshot and can_use(Silver_Gauntlets) and ((Small_Key_Spirit_Temple, 3) or ((Small_Key_Spirit_Temple, 2) and Boomerang and bombchus_in_logic and not shuffle_dungeon_entrances)))",
					"GS Spirit Temple Lobby": " ((has_explosives or (Small_Key_Spirit_Temple, 3) or ((Small_Key_Spirit_Temple, 2) and bombchus_in_logic and not shuffle_dungeon_entrances)) and logic_spirit_lobby_gs and Boomerang and (Progressive_Hookshot or Hover_Boots)) or (logic_spirit_lobby_gs and (Small_Key_Spirit_Temple, 5) and has_explosives and can_use(Boomerang)) or ((Small_Key_Spirit_Temple, 3) and can_use(Silver_Gauntlets) and (Progressive_Hookshot or Hover_Boots))"
				},
				"exits": {
					"Spirit Temple Outdoor Hands": "True",
					"Spirit Temple Beyond Central Locked Door": " (Small_Key_Spirit_Temple, 4) and can_use(Silver_Gauntlets)",
					"Child Spirit Temple Climb": "True"
				}
			},
			"Spirit Temple Outdoor Hands": {
				"region_name": "Spirit Temple Outdoor Hands",
				"dungeon": "Spirit Temple",
				"locations": {
					"Silver Gauntlets Chest": " ((Small_Key_Spirit_Temple, 3) and (Progressive_Hookshot, 2) and has_explosives) or (Small_Key_Spirit_Temple, 5)",
					"Mirror Shield Chest": " (Small_Key_Spirit_Temple, 4) and can_use(Silver_Gauntlets) and has_explosives"
				},
				"exits": {
					"Desert Colossus": " (is_child and (Small_Key_Spirit_Temple, 5)) or (can_use(Silver_Gauntlets) and (((Small_Key_Spirit_Temple, 3) and has_explosives) or (Small_Key_Spirit_Temple, 5)))"
				}
			},
			"Spirit Temple Beyond Central Locked Door": {
				"region_name": "Spirit Temple Beyond Central Locked Door",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple Near Four Armos Chest": "Mirror_Shield and has_explosives",
					"Spirit Temple Hallway Left Invisible Chest": "can_see_with_lens and has_explosives",
					"Spirit Temple Hallway Right Invisible Chest": "can_see_with_lens and has_explosives"
				},
				"exits": {
					"Spirit Temple Beyond Final Locked Door": " (Small_Key_Spirit_Temple, 5) and (logic_spirit_wall or can_use(Longshot) or has_bombchus or ((Bombs or Nuts or can_use(Dins_Fire)) and (Bow or can_use(Hookshot) or Hammer)))"
				}
			},
			"Spirit Temple Beyond Final Locked Door": {
				"region_name": "Spirit Temple Beyond Final Locked Door",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple Boss Key Chest": " can_play(Zeldas_Lullaby) and Bow and Progressive_Hookshot",
					"Spirit Temple Topmost Chest": "Mirror_Shield",
					"Twinrova Heart": " Mirror_Shield and has_explosives and Progressive_Hookshot and Boss_Key_Spirit_Temple",
					"Twinrova": " Mirror_Shield and has_explosives and Progressive_Hookshot and Boss_Key_Spirit_Temple"
				}
			}
		},
		"mq": {
			"Spirit Temple Lobby": {
				"region_name": "Spirit Temple Lobby",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple MQ Entrance Front Left Chest": "True",
					"Spirit Temple MQ Entrance Back Left Chest": " (can_blast_or_smash) and (can_use(Slingshot) or can_use(Bow))",
					"Spirit Temple MQ Entrance Back Right Chest": " has_bombchus or can_use(Bow) or can_use(Hookshot) or can_use(Slingshot) or can_use(Boomerang)"
				},
				"exits": {
					"Desert Colossus": "True",
					"Child Spirit Temple": "is_child",
					"Adult Spirit Temple": " has_bombchus and can_use(Longshot) and can_use(Silver_Gauntlets)"
				}
			},
			"Child Spirit Temple": {
				"region_name": "Child Spirit Temple",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple MQ Child Center Chest": " ( (Small_Key_Spirit_Temple, 7) and Hammer)",
					"Spirit Temple MQ Child Left Chest": " (Sticks or Kokiri_Sword) and has_bombchus and Slingshot and can_use(Dins_Fire)",
					"Spirit Temple MQ Map Chest": " Sticks or Kokiri_Sword or has_explosives",
					"Spirit Temple MQ Silver Block Hallway Chest": " has_bombchus and (Small_Key_Spirit_Temple, 7) and Slingshot and (can_use(Dins_Fire) or ( (can_use(Fire_Arrows) or (logic_spirit_mq_frozen_eye and can_use(Bow) and can_play(Song_of_Time)))))",
					"Fairy Pot": " has_bottle and (Sticks or Kokiri_Sword) and has_bombchus and Slingshot"
				},
				"exits": {
					"Spirit Temple Shared": "has_bombchus and (Small_Key_Spirit_Temple, 2)"
				}
			},
			"Adult Spirit Temple": {
				"region_name": "Adult Spirit Temple",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple MQ Child Climb South Chest": "(Small_Key_Spirit_Temple, 7)",
					"Spirit Temple MQ Lower NE Main Room Chest": "can_play(Zeldas_Lullaby)",
					"Spirit Temple MQ Upper NE Main Room Chest": "can_see_with_lens",
					"Spirit Temple MQ Beamos Room Chest": "(Small_Key_Spirit_Temple, 5)",
					"Spirit Temple MQ Ice Trap Chest": " (Small_Key_Spirit_Temple, 5) and can_play(Song_of_Time)",
					"Spirit Temple MQ Boss Key Chest": " (Small_Key_Spirit_Temple, 5) and can_play(Song_of_Time) and Mirror_Shield",
					"GS Spirit Temple MQ Iron Knuckle West": "(Small_Key_Spirit_Temple, 7)",
					"GS Spirit Temple MQ Iron Knuckle North": "(Small_Key_Spirit_Temple, 7)"
				},
				"exits": {
					"Lower Adult Spirit Temple": " (can_use(Fire_Arrows) or (logic_spirit_mq_lower_adult and can_use(Dins_Fire) and Bow)) and Mirror_Shield",
					"Spirit Temple Shared": "True",
					"Spirit Temple Boss Area": " (Small_Key_Spirit_Temple, 6) and can_play(Zeldas_Lullaby) and Hammer",
					"Mirror Shield Hand": " (Small_Key_Spirit_Temple, 5) and can_play(Song_of_Time) and can_see_with_lens"
				}
			},
			"Spirit Temple Shared": {
				"region_name": "Spirit Temple Shared",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple MQ Child Climb North Chest": "(Small_Key_Spirit_Temple, 6)",
					"Spirit Temple MQ Compass Chest": " (can_use(Slingshot) and (Small_Key_Spirit_Temple, 7)) or can_use(Bow) or (Bow and Slingshot)",
					"Spirit Temple MQ Sun Block Room Chest": " can_play(Song_of_Time) or is_adult",
					"GS Spirit Temple MQ Sun Block Room": " (logic_spirit_mq_sun_block_gs and can_play(Song_of_Time) and Boomerang) or is_adult"
				},
				"exits": {
					"Silver Gauntlets Hand": " ((Small_Key_Spirit_Temple, 7) and (can_play(Song_of_Time) or is_adult)) or ((Small_Key_Spirit_Temple, 4) and can_play(Song_of_Time) and can_see_with_lens)",
					"Desert Colossus": " ((Small_Key_Spirit_Temple, 7) and (can_play(Song_of_Time) or is_adult)) or ((Small_Key_Spirit_Temple, 4) and can_play(Song_of_Time) and can_see_with_lens and is_adult)"
				}
			},
			"Lower Adult Spirit Temple": {
				"region_name": "Lower Adult Spirit Temple",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple MQ Lower Adult Left Chest": "True",
					"Spirit Temple MQ Lower Adult Right Chest": " (Small_Key_Spirit_Temple, 7) and Hammer and Ocarina and Song_of_Time and Eponas_Song and Suns_Song and Song_of_Storms and Zeldas_Lullaby",
					"Spirit Temple MQ Entrance Front Right Chest": "Hammer",
					"GS Spirit Temple MQ Lower Adult Left": "True",
					"GS Spirit Temple MQ Lower Adult Right": " (Small_Key_Spirit_Temple, 7) and Hammer and Ocarina and Song_of_Time and Eponas_Song and Suns_Song and Song_of_Storms and Zeldas_Lullaby"
				}
			},
			"Spirit Temple Boss Area": {
				"region_name": "Spirit Temple Boss Area",
				"dungeon": "Spirit Temple",
				"locations": {
					"Spirit Temple MQ Mirror Puzzle Invisible Chest": "can_see_with_lens",
					"Twinrova Heart": "Mirror_Shield and Boss_Key_Spirit_Temple",
					"Twinrova": "Mirror_Shield and Boss_Key_Spirit_Temple"
				}
			},
			"Mirror Shield Hand": {
				"region_name": "Mirror Shield Hand",
				"dungeon": "Spirit Temple",
				"locations": {
					"Mirror Shield Chest": "True"
				}
			},
			"Silver Gauntlets Hand": {
				"region_name": "Silver Gauntlets Hand",
				"dungeon": "Spirit Temple",
				"locations": {
					"Silver Gauntlets Chest": "True"
				}
			}
		}
	},
	"Water Temple": {
		"vanilla": {
			"Water Temple Lobby": {
				"region_name": "Water Temple Lobby",
				"dungeon": "Water Temple",
				"events": {
					"Child Water Temple": "is_child"
				},
				"exits": {
					"Lake Hylia": "True",
					"Water Temple Highest Water Level": "is_adult"
				}
			},
			"Water Temple Dive": {
				"region_name": "Water Temple Dive",
				"dungeon": "Water Temple",
				"locations": {
					"Water Temple Map Chest": " can_use(Hover_Boots) or can_use(Hookshot) or can_use(Bow) or (( has_fire_source_with_torch) and ( can_use_projectile))",
					"Water Temple Compass Chest": " (can_play(Zeldas_Lullaby) or Iron_Boots) and can_use(Hookshot)",
					"Water Temple Torches Chest": " (Bow or can_use(Dins_Fire) or (Child_Water_Temple and Sticks and Kokiri_Sword and Magic_Meter)) and can_play(Zeldas_Lullaby)",
					"Water Temple Central Bow Target Chest": " Progressive_Strength_Upgrade and can_play(Zeldas_Lullaby) and ((Bow and (logic_water_central_bow or Hover_Boots or can_use(Longshot))) or (logic_water_central_bow and Child_Water_Temple and Slingshot and ( True)))",
					"GS Water Temple South Basement": " (can_use(Hookshot) or can_use(Hover_Boots)) and has_explosives and can_play(Zeldas_Lullaby) and (can_use(Iron_Boots) or can_dive)"
				},
				"exits": {
					"Water Temple Cracked Wall": " can_play(Zeldas_Lullaby) and (can_use(Hookshot) or can_use(Hover_Boots)) and (logic_water_cracked_wall_nothing or (logic_water_cracked_wall_hovers and can_use(Hover_Boots)))",
					"Water Temple Middle Water Level": " (Bow or can_use(Dins_Fire) or ((Small_Key_Water_Temple, 6) and can_use(Hookshot)) or (Child_Water_Temple and Sticks)) and can_play(Zeldas_Lullaby)",
					"Water Temple North Basement": " (Small_Key_Water_Temple, 5) and (can_use(Longshot) or (logic_water_boss_key_region and can_use(Hover_Boots))) and (can_use(Iron_Boots) or can_play(Zeldas_Lullaby))",
					"Water Temple Dragon Statue": " can_play(Zeldas_Lullaby) and Progressive_Strength_Upgrade and ((Iron_Boots and can_use(Hookshot)) or (logic_water_dragon_bombchu and has_bombchus and can_dive))"
				}
			},
			"Water Temple North Basement": {
				"region_name": "Water Temple North Basement",
				"dungeon": "Water Temple",
				"locations": {
					"Water Temple Boss Key Chest": " (Small_Key_Water_Temple, 6) and (logic_water_bk_jump_dive or can_use(Iron_Boots)) and ((logic_water_bk_chest and Iron_Boots) or logic_water_north_basement_ledge_jump or (has_explosives and Progressive_Strength_Upgrade) or Hover_Boots)",
					"GS Water Temple Near Boss Key Chest": "True",
					"Fairy Pot": " has_bottle and (Small_Key_Water_Temple, 6) and (logic_water_bk_jump_dive or can_use(Iron_Boots)) and ((logic_water_bk_chest and Iron_Boots) or logic_water_north_basement_ledge_jump or (has_explosives and Progressive_Strength_Upgrade) or Hover_Boots)"
				}
			},
			"Water Temple Cracked Wall": {
				"region_name": "Water Temple Cracked Wall",
				"dungeon": "Water Temple",
				"locations": {
					"Water Temple Cracked Wall Chest": "has_explosives"
				}
			},
			"Water Temple Dragon Statue": {
				"region_name": "Water Temple Dragon Statue",
				"dungeon": "Water Temple",
				"locations": {
					"Water Temple Dragon Chest": "True"
				}
			},
			"Water Temple Middle Water Level": {
				"region_name": "Water Temple Middle Water Level",
				"dungeon": "Water Temple",
				"locations": {
					"Water Temple Central Pillar Chest": " can_use(Iron_Boots) and can_use(Zora_Tunic) and can_use(Hookshot) and ((Small_Key_Water_Temple, 6) or can_use(Bow) or can_use(Dins_Fire))",
					"GS Water Temple Central Room": " ((can_use(Longshot) or (can_use(Farores_Wind) and can_use(Hookshot))) and ((Small_Key_Water_Temple, 6) or can_use(Bow) or can_use(Dins_Fire))) or (Child_Water_Temple and Boomerang and can_use(Farores_Wind) and (can_use(Dins_Fire) or Sticks))"
				},
				"exits": {
					"Water Temple Cracked Wall": "True"
				}
			},
			"Water Temple Dark Link Region": {
				"region_name": "Water Temple Dark Link Region",
				"dungeon": "Water Temple",
				"locations": {
					"Water Temple Dark Link Chest": "(Small_Key_Water_Temple, 6)",
					"Water Temple River Chest": " (Small_Key_Water_Temple, 6) and can_play(Song_of_Time) and Bow",
					"GS Water Temple Serpent River": " can_play(Song_of_Time) and (Small_Key_Water_Temple, 6) and (Iron_Boots or (logic_water_river_gs and can_use(Longshot) and (Bow or has_bombchus)))",
					"GS Water Temple Falling Platform Room": " can_use(Longshot) or (logic_water_falling_platform_gs and can_use(Hookshot))",
					"Fairy Pot": "has_bottle and (Small_Key_Water_Temple, 6) and can_play(Song_of_Time)"
				},
				"exits": {
					"Water Temple Dragon Statue": " (Small_Key_Water_Temple, 6) and can_play(Song_of_Time) and Bow and ((Iron_Boots and (can_use(Zora_Tunic) or logic_fewer_tunic_requirements)) or logic_water_dragon_jump_dive or (logic_water_dragon_bombchu and has_bombchus and can_dive))"
				}
			},
			"Water Temple Highest Water Level": {
				"region_name": "Water Temple Highest Water Level",
				"dungeon": "Water Temple",
				"events": {
					"Water Temple Clear": "Boss_Key_Water_Temple and can_use(Longshot)"
				},
				"locations": {
					"Morpha": "Boss_Key_Water_Temple and can_use(Longshot)",
					"Morpha Heart": "Boss_Key_Water_Temple and can_use(Longshot)",
					"Fairy Pot": "has_bottle and can_use(Longshot)"
				},
				"exits": {
					"Water Temple Dark Link Region": "(Small_Key_Water_Temple, 5) and can_use(Hookshot)",
					"Water Temple Dive": " (can_use(Zora_Tunic) or logic_fewer_tunic_requirements) and ((logic_water_temple_torch_longshot and can_use(Longshot)) or Iron_Boots)"
				}
			},
		},
		"mq": {
			"Water Temple Dive": {
				"region_name": "Water Temple Dive",
				"dungeon": "Water Temple",
				"locations": {
					"Water Temple MQ Map Chest": "has_fire_source and can_use(Hookshot)",
					"Water Temple MQ Central Pillar Chest": " can_use(Zora_Tunic) and can_use(Hookshot) and (can_use(Fire_Arrows) or (can_use(Dins_Fire) and can_play(Song_of_Time)))"
				},
				"exits": {
					"Water Temple Lowered Water Levels": "can_play(Zeldas_Lullaby)"
				}
			},
			"Water Temple Lowered Water Levels": {
				"region_name": "Water Temple Lowered Water Levels",
				"dungeon": "Water Temple",
				"locations": {
					"Water Temple MQ Compass Chest": " can_use(Bow) or can_use(Dins_Fire) or ( can_use(Sticks) and has_explosives)",
					"Water Temple MQ Longshot Chest": "can_use(Hookshot)",
					"GS Water Temple MQ Lizalfos Hallway": "can_use(Dins_Fire)",
					"GS Water Temple MQ Before Upper Water Switch": "can_use(Longshot)"
				}
			},
			"Water Temple Dark Link Region": {
				"region_name": "Water Temple Dark Link Region",
				"dungeon": "Water Temple",
				"locations": {
					"Water Temple MQ Boss Key Chest": "can_use(Dins_Fire)",
					"GS Water Temple MQ Serpent River": "True",
					"Fairy Pot": "has_bottle",
					"Nut Pot": "True"
				},
				"exits": {
					"Water Temple Basement Gated Areas": " (can_use(Zora_Tunic) or logic_fewer_tunic_requirements) and can_use(Dins_Fire) and can_use(Iron_Boots)"
				}
			},
			"Water Temple Basement Gated Areas": {
				"region_name": "Water Temple Basement Gated Areas",
				"dungeon": "Water Temple",
				"locations": {
					"Water Temple MQ Freestanding Key": " Hover_Boots or can_use(Scarecrow) or logic_water_north_basement_ledge_jump",
					"GS Water Temple MQ South Basement": " can_use(Fire_Arrows) and (Hover_Boots or can_use(Scarecrow))",
					"GS Water Temple MQ North Basement": " (Small_Key_Water_Temple, 2) and (Hover_Boots or can_use(Scarecrow) or logic_water_north_basement_ledge_jump)"
				}
			},
			"Water Temple Lobby": {
				"region_name": "Water Temple Lobby",
				"dungeon": "Water Temple",
				"events": {
					"Water Temple Clear": "Boss_Key_Water_Temple and can_use(Longshot)"
				},
				"locations": {
					"Morpha Heart": "Boss_Key_Water_Temple and can_use(Longshot)",
					"Morpha": "Boss_Key_Water_Temple and can_use(Longshot)"
				},
				"exits": {
					"Lake Hylia": "True",
					"Water Temple Dive": " (can_use(Zora_Tunic) or logic_fewer_tunic_requirements) and can_use(Iron_Boots)",
					"Water Temple Dark Link Region": " Small_Key_Water_Temple and can_use(Longshot)"
				}
			},
		}
	}
};

var subregions = {
	'Kokiri Forest': ['Root', 'Root Exits', 'Kokiri Forest', 'Outside Deku Tree', 'Links House', 'Mido House', 'Saria House', 'House of Twins', 'Know It All House', 'Kokiri Shop', 'Kokiri Forest Storms Grotto'],
	'Lost Woods': ['Lost Woods Forest Exit', 'Lost Woods', 'Lost Woods Beyond Mido', 'Lost Woods Bridge From Forest', 'Lost Woods Bridge', 'Lost Woods Generic Grotto', 'Deku Theater', 'Lost Woods Sales Grotto'],
	'Sacred Forest Meadow': ['Sacred Forest Meadow Entryway', 'Sacred Forest Meadow', 'Meadow Fairy Grotto', 'Meadow Storms Grotto', 'Front of Meadow Grotto'],
	'Hyrule Field': ['Hyrule Field', 'Remote Southern Grotto', 'Field Near Lake Outside Fence Grotto', 'Field Near Lake Inside Fence Grotto', 'Field Valley Grotto', 'Field West Castle Town Grotto', 'Field Far West Castle Town Grotto', 'Field Kakariko Grotto', 'Field North Lon Lon Grotto'],
	'Lon Lon Ranch': ['Lon Lon Ranch', 'Talon House', 'Ingo Barn', 'Lon Lon Corner Tower', 'Lon Lon Grotto'],
	'Lake Hylia': ['Lake Hylia', 'Lake Hylia Owl Flight', 'Lake Hylia Lab', 'Fishing Hole', 'Lake Hylia Grotto'],
	'Gerudo Valley': ['Gerudo Valley', 'Gerudo Valley Stream', 'Gerudo Valley Crate Ledge', 'Gerudo Valley Far Side', 'Carpenter Tent', 'Gerudo Valley Octorok Grotto', 'Gerudo Valley Storms Grotto'],
	'Gerudo Fortress': ['Gerudo Fortress', 'Gerudo Fortress Outside Gate', 'Gerudo Fortress Storms Grotto'],
	'Haunted Wasteland': ['Haunted Wasteland Near Fortress', 'Haunted Wasteland', 'Haunted Wasteland Near Colossus'],
	'Desert Colossus': ['Desert Colossus', 'Colossus Fairy', 'Desert Colossus Grotto'],
	'Market': ['Castle Town Entrance', 'Castle Town', 'Castle Town Rupee Room', 'Castle Town Bazaar', 'Castle Town Mask Shop', 'Castle Town Shooting Gallery', 'Castle Town Bombchu Bowling', 'Castle Town Potion Shop', 'Castle Town Treasure Chest Game', 'Castle Town Bombchu Shop', 'Castle Town Dog Lady', 'Castle Town Man in Green House'],
	'Temple of Time': ['Temple of Time Exterior', 'Temple of Time', 'Beyond Door of Time'],
	'Hyrule Castle': ['Castle Grounds', 'Hyrule Castle Grounds', 'Hyrule Castle Garden', 'Hyrule Castle Fairy', 'Castle Storms Grotto'],
	'Outside Ganons Castle': ['Ganons Castle Grounds', 'Ganons Castle Fairy'],
	'Kakariko Village': ['Kakariko Village', 'Kakariko Impa Ledge', 'Kakariko Rooftop', 'Kakariko Village Backyard', 'Carpenter Boss House', 'House of Skulltula', 'Impas House', 'Impas House Back', 'Impas House Near Cow', 'Windmill', 'Kakariko Bazaar', 'Kakariko Shooting Gallery', 'Kakariko Potion Shop Front', 'Kakariko Potion Shop Back', 'Odd Medicine Building', 'Kakariko Village Behind Gate', 'Kakariko Bombable Grotto', 'Kakariko Back Grotto'],
	'Graveyard': ['Graveyard', 'Shield Grave', 'Heart Piece Grave', 'Composer Grave', 'Dampes Grave', 'Dampes House', 'Shadow Temple Warp Region'],
	'Death Mountain Trail': ['Death Mountain', 'Death Mountain Summit', 'Death Mountain Summit Owl Flight', 'Dodongos Cavern Entryway', 'Mountain Summit Fairy', 'Mountain Bombable Grotto', 'Mountain Storms Grotto'],
	'Goron City': ['Goron City', 'Goron City Woods Warp', 'Darunias Chamber', 'Goron Shop', 'Goron City Grotto'],
	'Death Mountain Crater': ['Death Mountain Crater Upper Nearby', 'Death Mountain Crater Upper Local', 'Death Mountain Crater Ladder Area Nearby', 'Death Mountain Crater Lower Nearby', 'Death Mountain Crater Lower Local', 'Death Mountain Crater Central Nearby', 'Death Mountain Crater Central Local', 'Fire Temple Entrance', 'Crater Fairy', 'Top of Crater Grotto', 'DMC Hammer Grotto'],
	'Zora River': ['Zora River Front', 'Zora River', 'Zora River Behind Waterfall', 'Zora River Plateau Open Grotto', 'Zora River Plateau Bombable Grotto', 'Zora River Storms Grotto'],
	'Zoras Domain': ['Zoras Domain', 'Zoras Domain Behind King Zora', 'Zora Shop', 'Zoras Domain Storms Grotto'],
	'Zoras Fountain': ['Zoras Fountain', 'Zoras Fountain Fairy'],
	'Ganons Castle': ['Ganons Castle Tower'],
};

module.exports = logic;
