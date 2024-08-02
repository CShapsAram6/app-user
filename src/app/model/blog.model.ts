interface blogDto {
    id: number;
    header: string;
    content: string;
    datePush: string;
    images: string;
    accountId: number;
    imageacc:string;
    nameacc:string;
  }
  interface getblogid{
    id:number;
    header: string;
    content: string;  
    datePush: string;
    images: string;
    imageacc:string;
    nameacc:string;  
  }
  interface imageDto {
    id: number;
    link: string;
    isActive: boolean;
  }

  export{blogDto , getblogid}