export const Modes = Object.freeze({
  TRADE: 0,
  TAKE_ONE: 1,
  TAKE_MANY: 2,
  TAKE_CAMELS: 3,
  NONE: -1,
});
export const ACTIONS = Object.freeze({
  trade: "trade",
  takeOne: "takeOne",
  takeCamels: "takeCamels",
  takeMany: "takeMany",
});
export const RESOURCES = Object.freeze({
  camel: "CAMEL",
  gold: "GOLD",
  silver: "SILVER",
  diamond: "DIAMOND",
  silk: "SILK",
  leather: "LEATHER",
  spices: "SPICES",
});
export const RARE_RESOURCES = [
  RESOURCES.diamond,
  RESOURCES.gold,
  RESOURCES.silver,
];
export const COMMON_RESOURCES = [
  RESOURCES.silk,
  RESOURCES.leather,
  RESOURCES.spices,
];
export const MIN_RARE_TRADE = 2;
export const MAX_HAND_SIZE = 7;
export const LARGEST_HERD_BONUS = 5;

// Number of resources present when it ends the game
export const NUM_RESOURCES_END = 3;