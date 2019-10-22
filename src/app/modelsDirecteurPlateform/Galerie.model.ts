type  fichier = Array<{id: number, titre: string,fichier:string, updatedAt:any, typeDocs:number}>;
type  fil = Array<{titre: string, image:any, type:any}>;
type  partager=Array<{idToShareWith:number, typeShareWith:string}>



export class Galerie{
  updatedAt: string;
  titre: string;
  modifiepar: string;
  Docs:fichier;
  files:fil;
  icone: string;
  nbDocsInGroupDocs:number;
  hasphoto:boolean;
  hasvideo:boolean;
  id:number;
  idEcole:number;
  shareWith:partager;



}
