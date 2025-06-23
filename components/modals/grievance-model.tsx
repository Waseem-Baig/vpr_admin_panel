"use client";
import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/model";
import { Button } from "@/components/ui/button";

interface GrievanceData {
  id?: string;
  user_id?: string;
  fullname: string;
  age: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  caste: string;
  aadhaar: string;
  grievance: string;
  grievance_other: string;
  details: string;
  attachments: string[]; // file URLs
  political_sensitive: string;
  parties: string;
  anonymous: string;
  opponent_name: string;
  opponent_phone: string;
  opponent_details: string;
  submitted_at: string;
  status?: string;
}

interface GrievanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "view";
  grievanceData?: GrievanceData;
  onSave?: (data: GrievanceData) => void;
}

export function GrievanceModal({
  isOpen,
  onClose,
  mode,
  grievanceData,
  onSave,
}: GrievanceModalProps) {
  const [formData, setFormData] = useState<GrievanceData>({
    fullname: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    caste: "",
    aadhaar: "",
    grievance: "",
    grievance_other: "",
    details: "",
    attachments: [],
    political_sensitive: "",
    parties: "",
    anonymous: "",
    opponent_name: "",
    opponent_phone: "",
    opponent_details: "",
    submitted_at: new Date().toISOString().split("T")[0],
    status: "Open",
  });

  useEffect(() => {
    if (grievanceData && (mode === "edit" || mode === "view")) {
      setFormData({
        ...grievanceData,
        fullname: grievanceData.fullname ?? "",
        age: grievanceData.age?.toString() ?? "",
        gender: grievanceData.gender ?? "",
        mobile: grievanceData.mobile ?? "",
        email: grievanceData.email ?? "",
        address: grievanceData.address ?? "",
        caste: grievanceData.caste ?? "",
        aadhaar: grievanceData.aadhaar ?? "",
        grievance: grievanceData.grievance ?? "",
        grievance_other: grievanceData.grievance_other ?? "",
        details: grievanceData.details ?? "",
        attachments: grievanceData.attachments ?? [],
        political_sensitive: grievanceData.political_sensitive ?? "",
        parties: grievanceData.parties ?? "",
        anonymous: grievanceData.anonymous ?? "",
        opponent_name: grievanceData.opponent_name ?? "",
        opponent_phone: grievanceData.opponent_phone ?? "",
        opponent_details: grievanceData.opponent_details ?? "",
        submitted_at: grievanceData.submitted_at
          ? new Date(grievanceData.submitted_at).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        status: grievanceData.status ?? "Open",
      });
    } else if (mode === "add") {
      setFormData({
        fullname: "",
        age: "",
        gender: "",
        mobile: "",
        email: "",
        address: "",
        caste: "",
        aadhaar: "",
        grievance: "",
        grievance_other: "",
        details: "",
        attachments: [],
        political_sensitive: "",
        parties: "",
        anonymous: "",
        opponent_name: "",
        opponent_phone: "",
        opponent_details: "",
        submitted_at: new Date().toISOString().split("T")[0],
        status: "Open",
      });
    }
  }, [grievanceData, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(formData);
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
      ? "Add Grievance"
      : mode === "edit"
      ? "Edit Grievance"
      : "Grievance Details";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add all your fields here, similar to previous modals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
            />
          </div>
          {/* Repeat for all other fields... */}
          {/* Example for status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
        {/* Details textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Details
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            readOnly={isReadOnly}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none"
            required
          />
        </div>
        {!isReadOnly && (
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-yellow-600 text-white">
              {mode === "add" ? "Add" : "Save"}
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
