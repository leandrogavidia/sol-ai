import { getUserWithPassword } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const user = await getUserWithPassword(email, password);

    if (!user?.id) {
      return Response.json(
        { message: "User does not exist", result: null, success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "User found!", result: user, success: true },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error getting user:", e);
    return Response.json(
      { message: "Error getting user", result: null, success: false },
      { status: 500 }
    );
  }
}
