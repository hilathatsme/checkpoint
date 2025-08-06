import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("local");
        const users = await db
            .collection("users")
            .find({}, { Password: 0 })
            .sort({ metacritic: -1 })
            .toArray();
        res.json(users);
        console.log(users)
    } catch (e) {
        console.error(e);
    }
}