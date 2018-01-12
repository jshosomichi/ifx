interface IfF {
  <T>(condition: boolean,
      _fixed?: boolean,
      _truthy?: boolean,
      _fixedValue?: T): (callback: any) => Ret<T>;
}

interface Ret<T> {
  Get(): T;
  Else(callback:any): T;
  ElseIf(condition:boolean):(callback:any) => Ret<T>;
}

declare var If: IfF;

declare module "ifx" {
  export = If
}

