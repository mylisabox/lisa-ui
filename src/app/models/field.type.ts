export interface Field {
  controlType: string,
  name: string,
  label: string,
  options?: object,
  minLength: number,
  maxLength?: number,
  regexp?: string,
  defaultValue?: string,
  value?: string,
  help?: string,
  type?: string,
  required?: boolean,
  private?: boolean
}
