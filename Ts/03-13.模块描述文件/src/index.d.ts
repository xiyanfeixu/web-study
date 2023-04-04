declare module "jquery" {
  interface JqueryInstance {
    html: (param: string) => JqueryInstance;
  }
  function $(param: () => void): void;
  function $(selector: string): JqueryInstance;
  export = $;
}
