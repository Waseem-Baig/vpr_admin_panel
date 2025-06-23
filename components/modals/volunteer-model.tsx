"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/model";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Calendar,
} from "lucide-react";

interface VolunteerData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  constituency: string;
  message: string;
  submitted_at: string;
}

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "view";
  volunteerData?: VolunteerData;
  onSave?: (data: VolunteerData) => void;
}

export function VolunteerModal({
  isOpen,
  onClose,
  mode,
  volunteerData,
  onSave,
}: VolunteerModalProps) {
  const [formData, setFormData] = useState<VolunteerData>({
    name: "",
    email: "",
    phone: "",
    constituency: "",
    message: "",
    submitted_at: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (volunteerData && (mode === "edit" || mode === "view")) {
      setFormData(volunteerData);
    } else if (mode === "add") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        constituency: "",
        message: "",
        submitted_at: new Date().toISOString().split("T")[0],
      });
    }
  }, [volunteerData, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isReadOnly = mode === "view";
  const title =
    mode === "add"
      ? "Add New Volunteer"
      : mode === "edit"
      ? "Edit Volunteer"
      : "Volunteer Details";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
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

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
            placeholder="email@example.com"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            readOnly={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
            placeholder="+91 9876543210"
            required
          />
        </div>

        {/* Constituency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Constituency
          </label>
          <input
            type="text"
            name="constituency"
            value={formData.constituency}
            onChange={handleChange}
            readOnly={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
            placeholder="Enter constituency"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            readOnly={isReadOnly}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 resize-none"
            placeholder="Why do you want to volunteer?"
            required
          />
        </div>

        {/* Applied Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Applied Date
          </label>
          <input
            type="date"
            name="submitted_at"
            value={formData.submitted_at}
            onChange={handleChange}
            readOnly={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
          />
        </div>

        {/* Action Buttons */}
        {!isReadOnly && (
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:yellow-700 text-white"
            >
              {mode === "add" ? "Add Volunteer" : "Save Changes"}
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
