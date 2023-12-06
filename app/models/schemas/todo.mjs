export const Todo = {
  "id": "Todo",
  "type": "object",
  "properties": {
    "task": {
      "type": "string"
    },
    "completed": {
      "type": "boolean"
    },
    "created": {
      "type": "string",
      "format": "date-time"
    },
    "key": {
      "type": "string"
    }
  }
}
