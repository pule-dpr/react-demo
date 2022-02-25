export interface infotype{
    value:number;
    aname:string;
  }
  export interface RowinfoType {
    key:string;
    label: string;
    info: infotype[];
    components?:any;
    filtrateinfo?:{};
    selectKeys?:number[];
  }
  export interface Groupinfo {
    keys:string;
    components:any;
    datasource: RowinfoType;
    onChange: (key:string,option:any)=>void;
    labelSize?: number;
    selectKeys:number[] |undefined;
  }
  export interface Rowformtype {
    datasource:RowinfoType[],
    onChange:(key:string,option:any)=>void
  }
  export interface OptionType {
    keys:string;
    onChange:(key:string,option:any)=>void
  }