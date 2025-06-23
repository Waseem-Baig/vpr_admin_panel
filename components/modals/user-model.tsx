"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/model";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, Users, Lock } from "lucide-react";

interface UserData {
  id?: string;
  name: string;
  email?: string;
  password?: string;
  mobile: string;
  gender: string;
  role: string;
  created_at: string;
  status: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "view";
  userData?: UserData;
  onSave?: (data: UserData) => void;
}

export function UserModal({
  isOpen,
  onClose,
  mode,
  userData,
  onSave,
}: UserModalProps) {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "", // <-- Add email
    password: "", // <-- Add password
    mobile: "",
    gender: "",
    role: "",
    created_at: new Date().toISOString().split("T")[0],
    status: "Active",
  });

  useEffect(() => {
    if (userData && (mode === "edit" || mode === "view")) {
      setFormData(userData);
    } else if (mode === "add") {
      setFormData({
        name: "",
        email: "", // <-- Add email
        password: "", // <-- Add password
        mobile: "",
        gender: "",
        role: "",
        created_at: new Date().toISOString().split("T")[0],
        status: "Active",
      });
    }
  }, [userData, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isReadOnly = mode === "view";
  const title =
    mode === "add"
      ? "Add New User"
      : mode === "edit"
      ? "Edit User"
      : "User Details";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
            placeholder="Enter full name"
            required
          />
        </div>

        {/* Email Field (only for add) */}
        {mode === "add" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
              placeholder="Enter email"
              required
            />
          </div>
        )}

        {/* Password Field (only for add) */}
        {mode === "add" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
              placeholder="Enter password"
              required
            />
          </div>
        )}

        {/* Mobile Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Mobile Number
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            readOnly={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
            placeholder="+91 9876543210"
            required
          />
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Role Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="citizen">Citizen</option>
          </select>
        </div>

        {/* Created Date Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Join Date
          </label>
          <input
            type="date"
            name="created_at"
            value={formData.created_at}
            onChange={handleChange}
            readOnly={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
          />
        </div>

        {/* Status Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Action Buttons */}
        {!isReadOnly && (
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:yellow-700 text-white"
            >
              {mode === "add" ? "Add User" : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Modal>
  );
}
