import {Field} from "./field.type";
export interface Plugin {
  id: string
  name: string
  description: string
  image: string
  settings?: Array<Field>
  devicesSettings?: Array<object>
}
