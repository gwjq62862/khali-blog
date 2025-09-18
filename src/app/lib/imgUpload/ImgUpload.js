import { supabase } from "../supbaseClient";


export const uploadImage= async(file)=>{
    if(!file)return null;
     const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
    .from("images") 
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }


  const { data: signedData } = await supabase.storage
    .from("images")
    .createSignedUrl(fileName, 60 * 60 * 24 * 7);

  return signedData?.signedUrl;
}