type fichier = Array<{id: number, titre: string,fichier:string, updatedAt:any,modifierPar:any, typeDocs:number}>;
type  fil = Array<{titre: string, image:any, type:any}>;


export class UpGalerie{
  updatedAt: string;
  titre: string;
  modifiepar: string;
  Docs:fichier;
  files:fil;
  nbDocsInGroupDocs:number;
  hasphoto:boolean;
  hasvideo:boolean;
  id:number;


}
