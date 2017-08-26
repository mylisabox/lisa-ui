import {Field} from "./field.type";
export interface PluginDevice {
  id: string
  name: string
  description: string
  pluginName: string
  driver: string
  template: string
  type: string
  image: string
  pairing: string
  settings?: Array<Field>
}
