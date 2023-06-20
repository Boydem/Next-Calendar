type EventColor = { id: string; className: string }

export type EventColors = {
  [color in
    | "red"
    | "pink"
    | "magenta"
    | "indigo"
    | "blue"
    | "cyan"
    | "green"
    | "lime"
    | "yellow"
    | "orange"]: EventColor
}

const eventColorsObj: EventColors = {
  red: { id: "ec1", className: "red-400" },
  pink: { id: "ec2", className: "pink-400" },
  magenta: { id: "ec3", className: "purple-400" },
  indigo: { id: "ec4", className: "indigo-400" },
  blue: { id: "ec5", className: "blue-400" },
  cyan: { id: "ec6", className: "cyan-400" },
  green: { id: "ec7", className: "green-400" },
  lime: { id: "ec8", className: "lime-400" },
  yellow: { id: "ec9", className: "yellow-400" },
  orange: { id: "ec10", className: "orange-400" },
}

export default eventColorsObj
