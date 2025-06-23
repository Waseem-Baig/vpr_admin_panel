"use client";
import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/model";
import { Button } from "@/components/ui/button";

interface SocialMediaGrievanceData {
  id?: string;
  user_id?: string;
  fullname: string;
  email: string;
  phone: string;
  location: string;
  platforms: string[];
  platform_other: string;
  grievance: string;
  action: string;
  file_urls: string[];
  warrior_options: string[];
  updates_options: string[];
  submitted_at: string;
  status?: string;
}

interface SocialMediaGrievanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "view";
  grievanceData?: SocialMediaGrievanceData;
  onSave?: (data: SocialMediaGrievanceData) => void;
}

export function SocialMediaGrievanceModal({
  isOpen,
  onClose,
  mode,
  grievanceData,
  onSave,
}: SocialMediaGrievanceModalProps) {
  const [formData, setFormData] = useState<SocialMediaGrievanceData>({
    fullname: "",
    email: "",
    phone: "",
    location: "",
    platforms: [],
    platform_other: "",
    grievance: "",
    action: "",
    file_urls: [],
    warrior_options: [],
    updates_options: [],
    submitted_at: new Date().toISOString().split("T")[0],
    status: "Investigating",
  });

  useEffect(() => {
    if (grievanceData && (mode === "edit" || mode === "view")) {
      setFormData({
        ...grievanceData,
        platforms: Array.isArray(grievanceData.platforms)
          ? grievanceData.platforms
          : grievanceData.platforms
          ? [grievanceData.platforms]
          : [],
        file_urls: Array.isArray(grievanceData.file_urls)
          ? grievanceData.file_urls
          : grievanceData.file_urls
          ? [grievanceData.file_urls]
          : [],
        warrior_options: Array.isArray(grievanceData.warrior_options)
          ? grievanceData.warrior_options
          : grievanceData.warrior_options
          ? [grievanceData.warrior_options]
          : [],
        updates_options: Array.isArray(grievanceData.updates_options)
          ? grievanceData.updates_options
          : grievanceData.updates_options
          ? [grievanceData.updates_options]
          : [],
        submitted_at: grievanceData.submitted_at
          ? new Date(grievanceData.submitted_at).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        status: grievanceData.status ?? "Investigating",
      });
    } else if (mode === "add") {
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        location: "",
        platforms: [],
        platform_other: "",
        grievance: "",
        action: "",
        file_urls: [],
        warrior_options: [],
        updates_options: [],
        submitted_at: new Date().toISOString().split("T")[0],
        status: "Investigating",
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: options,
    }));
  };

  const isReadOnly = mode === "view";
  const title =
    mode === "add"
      ? "Add Social Media Grievance"
      : mode === "edit"
      ? "Edit Social Media Grievance"
      : "Social Media Grievance Details";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platforms
            </label>
            <select
              name="platforms"
              multiple
              value={
                Array.isArray(formData.platforms) ? formData.platforms : []
              }
              onChange={handleMultiChange}
              disabled={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="Facebook">Facebook</option>
              <option value="X (Twitter)">X (Twitter)</option>
              <option value="Instagram">Instagram</option>
              <option value="YouTube">YouTube</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Platform
            </label>
            <input
              type="text"
              name="platform_other"
              value={formData.platform_other}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grievance
            </label>
            <textarea
              name="grievance"
              value={formData.grievance}
              onChange={handleChange}
              readOnly={isReadOnly}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Requested
            </label>
            <input
              type="text"
              name="action"
              value={formData.action}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Files (URLs, comma separated)
            </label>
            <input
              type="text"
              name="file_urls"
              value={formData.file_urls.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  file_urls: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Paste file URLs, separated by commas"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Warrior Options
            </label>
            <select
              name="warrior_options"
              multiple
              value={
                Array.isArray(formData.warrior_options)
                  ? formData.warrior_options
                  : []
              }
              onChange={handleMultiChange}
              disabled={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="Volunteer Online">Volunteer Online</option>
              <option value="Contacted">Contacted</option>
              <option value="Escalated">Escalated</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Updates Options
            </label>
            <select
              name="updates_options"
              multiple
              value={
                Array.isArray(formData.updates_options)
                  ? formData.updates_options
                  : []
              }
              onChange={handleMultiChange}
              disabled={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="Direct Replies">Direct Replies</option>
              <option value="User Notified">User Notified</option>
              <option value="Platform Notified">Platform Notified</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Submitted Date
            </label>
            <input
              type="date"
              name="submitted_at"
              value={formData.submitted_at}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
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
              <option value="Investigating">Investigating</option>
              <option value="Action Taken">Action Taken</option>
            </select>
          </div>
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
