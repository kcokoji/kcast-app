// app/api/upload.js

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Initialize Supabase client
    const supabase = createClient();

    // Get uploaded file from request body
    const formData = await req.formData();
    const file = formData.get("file") as File;
    console.log(file);

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Prepare file data for Supabase storage
    const fileName = file.name;
    const contentType = file.type;
    const buffer = await file.arrayBuffer();
    const userId = "67e5929a-080e-48b0-9abb-efeef6ba47bc";

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from("podcast-image") // Replace with your bucket name
      .upload(`${userId}/${fileName}`, buffer, { contentType });

    if (error) {
      console.error("Upload error:", error);
      return new NextResponse(
        JSON.stringify({ error: "Error uploading file" }),
        {
          status: 400,
        }
      );
    }

    // Handle successful upload response (data object)
    // You can access the uploaded file URL from data.publicUrl
    console.log("File uploaded successfully:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
