"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button, Input, Card, Switch } from "@heroui/react";
import { Link } from "@heroui/link";

// 1) Configure your Supabase environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminPdfUploadWithPasscode() {
  // Local state for multiple files
  const [files, setFiles] = useState<File[]>([]);
  const [fileTitle, setFileTitle] = useState("");
  const [description, setDescription] = useState("");

  // Passcode-related state
  const [requirePasscode, setRequirePasscode] = useState(false);
  const [passcode, setPasscode] = useState("");

  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // 2) Handle multiple file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    } else {
      setFiles([]);
    }
  };

  // 3) Upload multiple files to the "documents" bucket & Insert into "tbl_documents"
  const handleUpload = async () => {
    if (files.length === 0) {
      setStatusMessage("Please choose at least one file first.");
      return;
    }
    setUploading(true);
    setStatusMessage("");

    try {
      for (const file of files) {
        const filePath = `${Date.now()}-${file.name}`;

        // (A) Upload to Supabase Storage bucket "documents"
        const uploadResult = await supabase.storage
          .from("documents")
          .upload(filePath, file);

        if (uploadResult.error) {
          throw uploadResult.error;
        }

        // (B) Get the public URL of the uploaded file
        const publicUrlResult = supabase.storage
          .from("documents")
          .getPublicUrl(filePath);

        const fileUrl = publicUrlResult.data.publicUrl || "";

        // (C) Insert metadata into "tbl_documents" table
        // Here we add the `field_passcode` if `requirePasscode` is true
        const insertResult = await supabase
          .from("tbl_documents")
          .insert([
            {
              file_title: fileTitle,
              file_name: file.name,
              file_description: description,
              file_path: filePath,
              file_size: file.size,
              content_type: file.type,
              file_url: fileUrl,
              // The new passcode field:
              field_passcode: requirePasscode ? passcode : null,
            },
          ]);

        if (insertResult.error) {
          // (Optional) If you want to remove the file from Storage on DB failure
          throw insertResult.error;
        }
      }

      setStatusMessage(`Successfully uploaded ${files.length} file(s).`);
      // Clear states if desired
      // setFiles([]);
      // setFileTitle("");
      // setDescription("");
      // setPasscode("");
      // setRequirePasscode(false);
    } catch (error: any) {
      setStatusMessage(error.message || "Error uploading files.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="flex flex-col gap-4 max-w-lg mx-auto pt-10">
      <h1 className="text-2xl font-bold">Admin - Upload Documents (With Passcode)</h1>

      <Card className="p-6">
        <p className="text-sm text-neutral-600 mb-3">
          Select one or more files to upload to your <strong>documents</strong> bucket:
        </p>

        {/* Multiple file selection */}
        <Input
          type="file"
          variant="bordered"
          multiple
          onChange={handleFileChange}
          className="mb-4"
        />

        {/* Title field */}
        <Input
          type="text"
          label="Title"
          variant="bordered"
          value={fileTitle}
          onChange={(e) => setFileTitle(e.target.value)}
          className="mb-4"
        />

        {/* Description field */}
        <Input
          type="text"
          label="Description"
          variant="bordered"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
        />

        {/* Passcode toggle */}
        <div className="flex items-center gap-2">
          <Switch 
            isSelected={requirePasscode}
            onValueChange={setRequirePasscode}
            aria-label="Require Passcode"
          />
          <span>Require Passcode</span>
        </div>

        {/* If passcode is required, show the passcode input */}
        {requirePasscode && (
          <Input
            type="text"
            label="Passcode"
            variant="bordered"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="mt-2"
          />
        )}

        {/* Button to trigger upload & insert */}
        <Button color="primary" className="mt-4" onPress={handleUpload} isDisabled={uploading}>
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
