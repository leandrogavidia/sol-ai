import { getEmailInWhitelist } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const result = await getEmailInWhitelist(email);

    if (!result?.id) {
      return Response.json(
        { message: "Email not whitelisted", result: null, success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Whitelist successfully obtained!", result, success: true },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error getting whitelist:", e);
    return Response.json(
      { message: "Error getting whitelist", result: null, success: false },
      { status: 500 }
    );
  }
}
