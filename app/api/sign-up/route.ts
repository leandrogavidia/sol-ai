import { getUser, createUser } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const result = await getUser(email);

    if (result?.id) {
      return Response.json(
        { message: "Account already exists", result: result, success: true },
        { status: 200 }
      );
    }

    const newUser = await createUser(email, password);

    return Response.json(
      { message: "Account successfully created!", result: newUser, success: true },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error creating account:", e);
    return Response.json(
      { message: "Error creating account", result: null, success: false },
      { status: 500 }
    );
  }
}
