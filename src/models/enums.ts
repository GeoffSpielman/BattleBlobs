export enum PlayerStatus{
    StartScreen = "On Start Screen",
    ReadingInstructions = "Reading Instructions",
    CreatingProfile = "Creating Profile",
    ReadingCredits = "Reading Credits",
    ReadyToStart = "Ready to Start",
    InGame = "In Game",
    Spectating = "Spectating",
    Disconnected = "Disconnected",
    Hosting = "Hosting",
    ErrorUnknown = "Error (Unknown)"
}

export enum ColourStatus{
    Available = "available",
    Taken = "taken",
    Mine = "mine"
}

export enum ShipStatus{
    Hidden = "Hidden",
    Damaged = "Damaged",
    Sunk = "Sunk",
    Lifeboat = "Lifeboat",
    Incomplete = "Incomplete",
}

export enum GameStatus{
    WaitingOnPlayers = "Waiting on Players",
    GameInProgress= "Game in Progress"
}

export enum PowerupName {
    SneakAPeak = "Sneak-A-Peak",
    BigShot = "Big Shot",
    MoveItMinor = "Move It Minor",
    MoveItMajor = "Move It Major",
    Umbrella = "Umbrella",
    UhOh = "Uh-Oh",
    None = "None",
}

export enum MapType {
    Water = "Water",
    PowerUp = "Powerup",
    Ship = "Ship",
    Whirlpool = "Whirlpool",
}