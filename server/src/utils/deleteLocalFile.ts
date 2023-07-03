import fs from 'fs';
export const deleteLocalFile=(filename:any)=>{
    try {
        fs.unlinkSync(filename);
        console.log("Delete File successfully.");
      } catch (error) {
        console.log(error);
      }
}