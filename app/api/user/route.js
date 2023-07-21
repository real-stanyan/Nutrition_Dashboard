import User from "@/model/user";
import { connectToDatabase } from "@/util/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { email, password } = await req.json();

  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User bot found" }), {
        status: 400,
      });
    }
    if (user.password !== password) {
      return new Response(JSON.stringify({ error: "Incorrect password" }), {
        status: 401,
      });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(err);
  }
};

export const POST = async (req) => {
  const { email, username, password } = await req.json();

  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 400,
      });
    }
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
