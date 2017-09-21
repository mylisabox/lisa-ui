export interface Device {
  id?: string
  name: string
  roomId?: number
  template?: any
  pluginName?: string
  driver?: string
  type?: string
  data?: any
  privateData?: any
  isFavorite?: boolean
}
