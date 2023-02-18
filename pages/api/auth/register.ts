
import { NextApiRequest, NextApiResponse } from "next";
import { searchUser, updateUser, createUser } from '@/lib/api/user';
import { getSession } from 'next-auth/react';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const { email, password } = req.body;
    const session = await getSession({ req });
    // if (!session || session.user? email: email !== email) {
    //   return res.status(401).json({
    //     error: 'Unauthorized'
    //   });
    // }
    try {
      const result = await createUser(email, password);
      // if (result) {
      //   await res.revalidate(`/${password}`);
      // }
    //   const descMdx = await getMdxSource(desc); // return descMdx to optimistically show updated state
    
    if (!result) {
      res.status(400).send("User already exists");
    } else {
      
      res.status(200).json(result);
    }
    return res.status(200).json("OOK");
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      error: e.toString()
    });
  }
}


