"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button, Input, Card } from "@heroui/react";
import { Link } from "@heroui/link";

// 1) Configure your Supabase environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminImageUpload() {
  // Local state for file, description, and UI feedback
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // 2) Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  // 3) Upload to the "images" bucket & Insert into "tbl_images"
  const handleUpload = async () => {
    if (!file) {
      setStatusMessage("Please choose a file first.");
      return;
    }
    setUploading(true);
    setStatusMessage("");

    try {
      // Construct a unique file path, e.g. "[timestamp]-originalFilename"
      const filePath = `${Date.now()}-${file.name}`;

      // ---- (A) Upload to Supabase Storage bucket "images" ----
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // ---- (B) Insert metadata into "tbl_images" table ----
      // match your column names in the table
      const { data, error: insertError } = await supabase
        .from("tbl_images")
        .insert([
          {
            image_name: file.name,         // from the file object
            image_description: description, // from your text input
            image_path: filePath,
            image_size: file.size,
            content_type: file.type,
            // user_id: <someUserIdIfNeeded>,
            // created_at will default to now() if configured
          },
        ]);

      if (insertError) {
        // (Optional) If you want to delete the file from Storage if DB insert fails
        // you can do that here.
        throw insertError;
      }

      setStatusMessage(`Image uploaded & saved to DB successfully: ${filePath}`);
    } catch (error: any) {
      setStatusMessage(error.message || "Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="flex flex-col gap-4 max-w-lg mx-auto pt-10">
      <h1 className="text-2xl font-bold">Admin - Upload Image</h1>

      <Card className="p-6">
        <p className="text-sm text-neutral-600 mb-3">
          Select an image to upload to your <strong>images</strong> bucket:
        </p>

        {/* File selection */}
        <Input
          type="file"
          label="Choose Image"
          variant="bordered"
          onChange={handleFileChange}
          className="mb-4"
        />

        {/* Optional: Description field */}
        <Input
          type="text"
          label="Description"
          variant="bordered"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />

        {/* Button to trigger upload & insert */}
        <Button color="primary" onPress={handleUpload} isDisabled={uploading}>
          {uploading ? "Uploading..." : "Upload & Save"}
        </Button>

        {statusMessage && (
          <p className="text-sm text-neutral-700 mt-3 font-semibold">
            {statusMessage}
          </p>
        )}

        <hr className="my-6" />

        <Link
          href="/"
          className="underline text-blue-500 hover:opacity-80 text-sm"
        >
          Back to Home
        </Link>
      </Card>
    </section>
  );
}
