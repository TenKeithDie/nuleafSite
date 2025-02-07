"use client";

import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import AdminPdfUpload from "@/components/admin-pdf-upload";
import AdminImageUpload from "@/components/admin-image-upload";

export default function AdminPage() {
  const router = useRouter();

  // Toggle state: true = PDF mode, false = Image mode
  const [showPdfUpload, setShowPdfUpload] = useState(true);

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button color="warning" onPress={handleLogout}>
          Logout
        </Button>

        {/* Buttons to toggle which component is shown */}
        <Button color="primary" onPress={() => setShowPdfUpload(true)}>
          Show PDF Upload
        </Button>
        <Button color="primary" onPress={() => setShowPdfUpload(false)}>
          Show Image Upload
        </Button>
      </div>

      {/* Conditionally render PDF or Image upload */}
      {showPdfUpload ? <AdminPdfUpload /> : <AdminImageUpload />}
    </div>
  );
}
