export const typeColor = (type: string) => {
    switch (type) {
        case "water":
            return "84, 158, 222";
        case "fire":
            return "240, 128, 48";
        case "grass":
            return "120, 200, 80";
        case "electric":
            return "248, 208, 48";
        case "poison":
            return "160, 64, 160";
        case "normal":
            return "168, 168, 120"
        case "bug":
            return "168, 184, 32"
        case "fairy":
            return "238, 153, 172"
        case "ground":
            return "224, 192, 104"
        case "psychic":
            return "248, 88, 136"
        case "fighting":
            return "192, 48, 40"
        case "rock":
            return "184, 160, 56"
        case "ghost":
            return "112, 88, 152"
        case "ice":
            return "152, 216, 216"
        case "dragon":
            return "112, 56, 248"
        case "dark":
            return "119, 85, 68"
        case "steel":
            return "170, 170, 187"
        case "flying":
            return "136, 153, 255"
        default:
            return "128, 128, 128";
    }
}
