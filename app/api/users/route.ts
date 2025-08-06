import clientPromise from "../../../lib/mongodb";

export async function GET(request, response) {
    const client = await clientPromise;
    const db = client.db("local");
    const collection = db.collection('users');
    const users = collection.find({}, { Password: 0 }).toArray();
    console.log(users);
    return response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {

    const client = await clientPromise;
    const db = client.db("local");
    const collection = db.collection('users');
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
    const collection = db.collection('users');
    const body = await request.json();
    const { email } = body;
    console.log('deleting user with email', email);

    const result = await collection.deleteOne({ email });
    return new Response(JSON.stringify(result), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}