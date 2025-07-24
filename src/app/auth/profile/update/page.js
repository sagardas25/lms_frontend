"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";

export default function UpdatePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/update-password",
        { oldPassword: oldPass, newPassword: newPass },
        { withCredentials: true }
      );
      setMsg("Password updated successfully!");
    } catch {
      setMsg("Error updating.");
    }
  };

  return (
    <AuthForm>
      <h2 className="text-2xl font-semibold text-primary mb-6">Change Password</h2>
      {msg && <p className="mb-4 text-textSecondary">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-light"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <Button className="w-full bg-primary text-white hover:bg-primaryLight !py-3">
          Update Password
        </Button>
      </form>
    </AuthForm>
  );
}
