import {Field} from "./field.type";
export interface PluginDevice {
  id: string
  name: string
  description: string
  image: string
  pairing: string
  settings?: Array<Field>
}
