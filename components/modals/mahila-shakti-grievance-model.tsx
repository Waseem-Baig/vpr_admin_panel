"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/model";
import { Button } from "@/components/ui/button";

interface MahilaShaktiGrievanceData {
  id?: string;
  user_id?: string;
  fullname: string;
  age: string;
  gender: string;
  mobile: string;
  email: string;
  district: string;
  constituency: string;
  mandal: string;
  ward: string;
  grievance_types: string[];
  grievance_other: string;
  description: string;
  attachments: string[];
  response_modes: string[];
  volunteer: string;
  declaration: boolean;
  submitted_at: string;
  status?: string;
}

interface MahilaShaktiGrievanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "view";
  grievanceData?: MahilaShaktiGrievanceData;
  onSave?: (data: MahilaShaktiGrievanceData) => void;
}

export function MahilaShaktiGrievanceModal({
  isOpen,
  onClose,
  mode,
  grievanceData,
  onSave,
}: MahilaShaktiGrievanceModalProps) {
  const [formData, setFormData] = useState<MahilaShaktiGrievanceData>({
    fullname: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    district: "",
    constituency: "",
    mandal: "",
    ward: "",
    grievance_types: [],
    grievance_other: "",
    description: "",
    attachments: [],
    response_modes: [],
    volunteer: "",
    declaration: false,
    submitted_at: new Date().toISOString().split("T")[0],
    status: "Under Review",
  });

  useEffect(() => {
    if (grievanceData && (mode === "edit" || mode === "view")) {
      setFormData({
        ...grievanceData,
        age: grievanceData.age?.toString() ?? "",
        grievance_types: Array.isArray(grievanceData.grievance_types)
          ? grievanceData.grievance_types
          : grievanceData.grievance_types
          ? [grievanceData.grievance_types]
          : [],
        attachments: Array.isArray(grievanceData.attachments)
          ? grievanceData.attachments
          : grievanceData.attachments
          ? [grievanceData.attachments]
          : [],
        response_modes: Array.isArray(grievanceData.response_modes)
          ? grievanceData.response_modes
          : grievanceData.response_modes
          ? [grievanceData.response_modes]
          : [],
        declaration: grievanceData.declaration ?? false,
        submitted_at: grievanceData.submitted_at
          ? new Date(grievanceData.submitted_at).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        status: grievanceData.status ?? "Under Review",
      });
    } else if (mode === "add") {
      setFormData({
        fullname: "",
        age: "",
        gender: "",
        mobile: "",
        email: "",
        district: "",
        constituency: "",
        mandal: "",
        ward: "",
        grievance_types: [],
        grievance_other: "",
        description: "",
        attachments: [],
        response_modes: [],
        volunteer: "",
        declaration: false,
        submitted_at: new Date().toISOString().split("T")[0],
        status: "Under Review",
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
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
      ? "Add Mahila Shakti Grievance"
      : mode === "edit"
      ? "Edit Mahila Shakti Grievance"
      : "Mahila Shakti Grievance Details";

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
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
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
              District
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Constituency
            </label>
            <input
              type="text"
              name="constituency"
              value={formData.constituency}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mandal
            </label>
            <input
              type="text"
              name="mandal"
              value={formData.mandal}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ward
            </label>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grievance Types
            </label>
            <select
              name="grievance_types"
              multiple
              value={formData.grievance_types}
              onChange={handleMultiChange}
              disabled={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="Education & Skills">Education & Skills</option>
              <option value="Harassment">Harassment</option>
              <option value="Violence">Violence</option>
              <option value="Discrimination">Discrimination</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Grievance
            </label>
            <input
              type="text"
              name="grievance_other"
              value={formData.grievance_other}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              readOnly={isReadOnly}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments (URLs, comma separated)
            </label>
            <input
              type="text"
              name="attachments"
              value={formData.attachments.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  attachments: e.target.value
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
              Response Modes
            </label>
            <select
              name="response_modes"
              multiple
              value={formData.response_modes}
              onChange={handleMultiChange}
              disabled={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="Phone">Phone</option>
              <option value="Email">Email</option>
              <option value="In Person">In Person</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volunteer
            </label>
            <select
              name="volunteer"
              value={formData.volunteer}
              onChange={handleChange}
              disabled={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
              disabled={isReadOnly}
              className="mr-2"
            />
            <label className="block text-sm font-medium text-gray-700">
              I declare the above information is true.
            </label>
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
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
        {!isReadOnly && (
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:yellow-700 text-white"
            >
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
