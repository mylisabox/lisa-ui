export interface WebsocketEvent {
  command: string;
  id?: string;
  type: string;
  item: any;
}
