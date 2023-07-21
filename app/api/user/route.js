import User from "@/model/user";
import { connectToDatabase } from "@/util/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, username, password } = await req.json();

  try {
    await connectToDatabase();
    const user = new User({ email, username, password });
    console.log(user);
    await user.save();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(err);
    return (
      NextResponse.json({ error: "Something went wrong" }), { status: 500 }
    );
  }
};

export const GET = async (req, res) => {
  try {
    await connectToDatabase();
    res.status(200).json({ message: "Hello from GET" });
  } catch (err) {
    console.log(err);
  }
};
