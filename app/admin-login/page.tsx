"use client"
import Login from "@/components/login";
import { supabase } from "@/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() 
{
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    useEffect(() => {
        const checkUser = async () => {
          const { data: { session } } = await supabase.auth.getSession();
    
          if (!session) {
            return (
                <Login/>
            )
          } else {
            setUser(session.user);
          }
        };
    
        checkUser();
      }, [router]);
      
    return (
      <Login/>
    )
}