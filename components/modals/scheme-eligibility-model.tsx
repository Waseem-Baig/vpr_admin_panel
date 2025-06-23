"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/model";
import { Button } from "@/components/ui/button";

interface SchemeEligibilityData {
  id?: string;
  user_id?: string;
  fullname: string;
  age: string;
  gender: string;
  mobile: string;
  aadhaar: string;
  caste: string;
  marital: string;
  disability: string;
  disability_details: string;
  income: string;
  education: string;
  employment: string;
  skill_training: string;
  skill_training_details: string;
  social_service: string;
  social_service_details: string;
  welfare_member: string;
  schemes: string;
  submitted_at: string;
  status?: string;
}

interface SchemeEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "view";
  eligibilityData?: SchemeEligibilityData;
  onSave?: (data: SchemeEligibilityData) => void;
}

export function SchemeEligibilityModal({
  isOpen,
  onClose,
  mode,
  eligibilityData,
  onSave,
}: SchemeEligibilityModalProps) {
  const [formData, setFormData] = useState<SchemeEligibilityData>({
    fullname: "",
    age: "",
    gender: "",
    mobile: "",
    aadhaar: "",
    caste: "",
    marital: "",
    disability: "",
    disability_details: "",
    income: "",
    education: "",
    employment: "",
    skill_training: "",
    skill_training_details: "",
    social_service: "",
    social_service_details: "",
    welfare_member: "",
    schemes: "",
    submitted_at: new Date().toISOString().split("T")[0],
    status: "",
  });

  useEffect(() => {
    if (eligibilityData && (mode === "edit" || mode === "view")) {
      setFormData({
        ...eligibilityData,
        fullname: eligibilityData.fullname ?? "",
        age: eligibilityData.age?.toString() ?? "",
        gender:
          eligibilityData.gender && typeof eligibilityData.gender === "string"
            ? eligibilityData.gender
                .split("/")[0]
                .trim()
                .charAt(0)
                .toUpperCase() +
              eligibilityData.gender.split("/")[0].trim().slice(1).toLowerCase()
            : "",
        mobile: eligibilityData.mobile ?? "",
        aadhaar: eligibilityData.aadhaar ?? "",
        caste: eligibilityData.caste ?? "",
        marital: eligibilityData.marital ?? "",
        disability: eligibilityData.disability ?? "",
        disability_details: eligibilityData.disability_details ?? "",
        income: eligibilityData.income ?? "",
        education: eligibilityData.education ?? "",
        employment: eligibilityData.employment ?? "",
        skill_training: eligibilityData.skill_training ?? "",
        skill_training_details: eligibilityData.skill_training_details ?? "",
        social_service: eligibilityData.social_service ?? "",
        social_service_details: eligibilityData.social_service_details ?? "",
        welfare_member: eligibilityData.welfare_member ?? "",
        schemes: eligibilityData.schemes ?? "",
        submitted_at:
          eligibilityData.submitted_at &&
          /^\d{4}-\d{2}-\d{2}$/.test(eligibilityData.submitted_at)
            ? eligibilityData.submitted_at
            : eligibilityData.submitted_at &&
              !isNaN(Date.parse(eligibilityData.submitted_at))
            ? new Date(eligibilityData.submitted_at).toISOString().split("T")[0]
            : "",
        status: eligibilityData.status ?? "",
      });
    } else if (mode === "add") {
      setFormData({
        fullname: "",
        age: "",
        gender: "",
        mobile: "",
        aadhaar: "",
        caste: "",
        marital: "",
        disability: "",
        disability_details: "",
        income: "",
        education: "",
        employment: "",
        skill_training: "",
        skill_training_details: "",
        social_service: "",
        social_service_details: "",
        welfare_member: "",
        schemes: "",
        submitted_at: new Date().toISOString().split("T")[0],
        status: "",
      });
    }
  }, [eligibilityData, mode]);

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
      ? "Add Scheme Eligibility"
      : mode === "edit"
      ? "Edit Scheme Eligibility"
      : "Scheme Eligibility Details";

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
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
              Aadhaar
            </label>
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caste
            </label>
            <input
              type="text"
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marital Status
            </label>
            <input
              type="text"
              name="marital"
              value={formData.marital}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disability
            </label>
            <input
              type="text"
              name="disability"
              value={formData.disability}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disability Details
            </label>
            <input
              type="text"
              name="disability_details"
              value={formData.disability_details}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Income
            </label>
            <input
              type="text"
              name="income"
              value={formData.income}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education
            </label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment
            </label>
            <input
              type="text"
              name="employment"
              value={formData.employment}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Training
            </label>
            <input
              type="text"
              name="skill_training"
              value={formData.skill_training}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill Training Details
            </label>
            <input
              type="text"
              name="skill_training_details"
              value={formData.skill_training_details}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Social Service
            </label>
            <input
              type="text"
              name="social_service"
              value={formData.social_service}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Social Service Details
            </label>
            <input
              type="text"
              name="social_service_details"
              value={formData.social_service_details}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Welfare Member
            </label>
            <input
              type="text"
              name="welfare_member"
              value={formData.welfare_member}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schemes
            </label>
            <input
              type="text"
              name="schemes"
              value={formData.schemes}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Submitted At
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
              value={formData.status ?? ""}
              onChange={handleChange}
              disabled={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Under Review">Under Review</option>
              <option value="Beneficiary">Beneficiary</option>
              <option value="Rejected">Rejected</option>
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
