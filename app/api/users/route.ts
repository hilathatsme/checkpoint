import clientPromise from "../../../lib/mongodb";


export async function POST(request: Request) {

    const client = await clientPromise;
    const db = client.db("local");
    const collection = db.collection('users'); // Replace with your collection name
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    const newUser = { id: Date.now(), firstName, lastName, email, password };
    console.log('new user received in BE:', newUser);

    const result = await collection.insertOne(newUser);


    return new Response(JSON.stringify(newUser), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function DELETE(request: Request) {

    const client = await clientPromise;
    const db = client.db("local");

    // const { db } =  client;
    const collection = db.collection('users'); // Replace with your collection name

    // Parse the request body
    const body = await request.json();
    const { email } = body;

    // e.g. Insert new user into your DB
    console.log('deleting user with email', email);

    const result = await collection.deleteOne({ email });


    return new Response(JSON.stringify(result), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}