
export interface Driver {
  id:number;
  name:string;
  license:{
    type:string;
    expDate:Date;
  };
  email:string;
  status:string;
  rating:number;
}
